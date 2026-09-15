import { SiteContent } from '../types';
import { StoredAuthConfig } from '../data/authConfig';

export interface GitHubSyncConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export interface CommitStepProgress {
  step: 'idle' | 'checking_token' | 'fetching_sha' | 'committing_content' | 'committing_auth' | 'success' | 'error';
  message: string;
  commitUrl?: string;
  actionsUrl?: string;
}

const GITHUB_CONFIG_STORAGE_KEY = 'douzandeh_github_sync_config_v1';

export function getStoredGitHubConfig(): GitHubSyncConfig {
  try {
    const saved = localStorage.getItem(GITHUB_CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        owner: parsed.owner || 'MAJN35',
        repo: parsed.repo || 'HosnaDoozandeh',
        branch: parsed.branch || 'main',
        token: parsed.token || '',
      };
    }
  } catch (e) {
    console.warn('Failed to read GitHub config from localStorage', e);
  }
  return {
    owner: 'MAJN35',
    repo: 'HosnaDoozandeh',
    branch: 'main',
    token: '',
  };
}

export function saveStoredGitHubConfig(config: GitHubSyncConfig): void {
  try {
    localStorage.setItem(GITHUB_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save GitHub config to localStorage', e);
  }
}

/**
 * Encodes a Unicode string to base64 properly
 */
export function toBase64Utf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function generateDefaultSiteContentCode(content: SiteContent): string {
  return `import { SiteContent } from '../types';

export const defaultSiteContent: SiteContent = ${JSON.stringify(content, null, 2)};
`;
}

export function generateAuthConfigCode(config: StoredAuthConfig): string {
  return `export interface StoredAuthConfig {
  usernameHash: string;
  passwordHash: string;
  salt: string;
  isCustomized: boolean;
  updatedAt: string;
}

export const defaultAuthConfig: StoredAuthConfig = ${JSON.stringify(config, null, 2)};
`;
}

async function fetchFileSha(
  token: string,
  owner: string,
  repo: string,
  path: string,
  branch: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data.sha || null;
  }
  if (res.status === 404) {
    return null; // File doesn't exist yet
  }

  const errData = await res.json().catch(() => ({}));
  throw new Error(errData.message || `GitHub API error: HTTP ${res.status}`);
}

async function putFileToGitHub(
  token: string,
  owner: string,
  repo: string,
  path: string,
  branch: string,
  message: string,
  contentStr: string
): Promise<{ commitUrl: string; sha: string }> {
  // 1. Get existing SHA if file exists
  const existingSha = await fetchFileSha(token, owner, repo, path, branch);

  // 2. Put file
  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}`;
  const bodyData: any = {
    message,
    content: toBase64Utf8(contentStr),
    branch,
  };
  if (existingSha) {
    bodyData.sha = existingSha;
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  const data = await res.json();
  if (!res.ok) {
    let errorMsg = data.message || `HTTP ${res.status}`;
    if (res.status === 401) {
      errorMsg = 'توکن وارد شده معتبر نیست یا منقضی شده است (Bad credentials). لطفاً توکن جدیدی ایجاد فرمایید.';
    } else if (res.status === 403) {
      errorMsg = 'دسترسی مجاز نیست. لطفاً بررسی کنید که توکن گیت‌هاب دارای دسترسی Read and Write به Contents مخزن باشد.';
    } else if (res.status === 404) {
      errorMsg = `مخزن ${owner}/${repo} یا شاخه ${branch} یافت نشد. لطفاً نام مخزن یا دسترسی توکن به مخازن خصوصی را بررسی فرمایید.`;
    } else if (res.status === 409) {
      errorMsg = 'تداخل در ثبت کامیت (Conflict SHA). لطفاً چند لحظه بعد مجدداً تلاش کنید.';
    }
    throw new Error(errorMsg);
  }

  return {
    commitUrl: data.commit?.html_url || `https://github.com/${owner}/${repo}/commits/${branch}`,
    sha: data.commit?.sha || '',
  };
}

/**
 * Commits content (and optionally authConfig) directly to the GitHub repository.
 */
export async function pushContentToGitHub(
  config: GitHubSyncConfig,
  content: SiteContent,
  authConfig?: StoredAuthConfig,
  onProgress?: (progress: CommitStepProgress) => void
): Promise<{ commitUrl: string; actionsUrl: string }> {
  const { owner, repo, branch, token } = config;
  if (!token || !token.trim()) {
    throw new Error('لطفاً توکن شخصی گیت‌هاب (Personal Access Token) را وارد فرمایید.');
  }

  const actionsUrl = `https://github.com/${owner}/${repo}/actions`;

  // Step 1: Commit defaultSiteContent.ts
  onProgress?.({
    step: 'committing_content',
    message: 'در حال ثبت تغییرات محتوا در فایل src/data/defaultSiteContent.ts...',
  });

  const contentCode = generateDefaultSiteContentCode(content);
  const result = await putFileToGitHub(
    token,
    owner,
    repo,
    'src/data/defaultSiteContent.ts',
    branch,
    'chore(content): update site content from admin panel',
    contentCode
  );

  // Step 2: Commit authConfig.ts if provided and customized
  if (authConfig && authConfig.isCustomized) {
    onProgress?.({
      step: 'committing_auth',
      message: 'در حال ثبت رمز عبور و تنظیمات امنیتی جدید در فایل src/data/authConfig.ts...',
    });

    const authCode = generateAuthConfigCode(authConfig);
    await putFileToGitHub(
      token,
      owner,
      repo,
      'src/data/authConfig.ts',
      branch,
      'chore(security): update admin security credentials',
      authCode
    );
  }

  onProgress?.({
    step: 'success',
    message: 'تغییرات با موفقیت در مخزن گیت‌هاب ثبت شد و عملیات استقرار خودکار آغاز گردید!',
    commitUrl: result.commitUrl,
    actionsUrl,
  });

  return {
    commitUrl: result.commitUrl,
    actionsUrl,
  };
}
