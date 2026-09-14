/**
 * Cryptographic security utilities for admin authentication
 * Uses browser-native Web Crypto API (SHA-256) with salting and brute-force throttling
 */

const AUTH_CONFIG_KEY = 'douzandeh_admin_auth_config_v1';
const ATTEMPTS_KEY = 'douzandeh_admin_login_attempts';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

// Default cryptographic salt
const DEFAULT_SALT = 'douzandeh_secure_salt_2026';

// SHA-256 hash function using browser native Web Crypto
export async function sha256Hash(text: string, salt: string = DEFAULT_SALT): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text + ':' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface StoredAuthConfig {
  usernameHash: string;
  passwordHash: string;
  salt: string;
  isCustomized: boolean;
  updatedAt: string;
}

// Default pre-computed cryptographically salted SHA-256 hashes
const DEFAULT_USERNAME_HASH = '1fa722a5c48bdfb1b8aa404f2f45ea0f22d9df8dfef2a8740aa1296c096dbcae';
const DEFAULT_PASSWORD_HASH = '626d7f4fcaeec69c6f2df4cf0ca58a649d10e828453ea13c19f5df40713bdf2d';

export function getStoredAuthConfig(): StoredAuthConfig {
  try {
    const saved = localStorage.getItem(AUTH_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read auth config', e);
  }
  return {
    usernameHash: DEFAULT_USERNAME_HASH,
    passwordHash: DEFAULT_PASSWORD_HASH,
    salt: DEFAULT_SALT,
    isCustomized: false,
    updatedAt: new Date().toISOString(),
  };
}

export async function setAdminCredentials(username: string, password: string): Promise<void> {
  const salt = 'salt_' + Math.random().toString(36).substring(2) + '_' + Date.now();
  const usernameHash = await sha256Hash(username.trim().toLowerCase(), salt);
  const passwordHash = await sha256Hash(password.trim(), salt);

  const config: StoredAuthConfig = {
    usernameHash,
    passwordHash,
    salt,
    isCustomized: true,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(config));
  // Reset any failed attempts
  clearFailedAttempts();
}

export function resetCredentialsToDefault(): void {
  localStorage.removeItem(AUTH_CONFIG_KEY);
  clearFailedAttempts();
}

export interface LockoutStatus {
  isLocked: boolean;
  remainingSeconds: number;
  failedCount: number;
}

export function checkLockoutStatus(): LockoutStatus {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    if (!data) return { isLocked: false, remainingSeconds: 0, failedCount: 0 };

    const { count, lockUntil } = JSON.parse(data);
    const now = Date.now();

    if (lockUntil && now < lockUntil) {
      const remainingSeconds = Math.ceil((lockUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, failedCount: count || MAX_FAILED_ATTEMPTS };
    }

    if (lockUntil && now >= lockUntil) {
      // Lockout expired, reset
      clearFailedAttempts();
      return { isLocked: false, remainingSeconds: 0, failedCount: 0 };
    }

    return { isLocked: false, remainingSeconds: 0, failedCount: count || 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedCount: 0 };
  }
}

export function recordFailedAttempt(): LockoutStatus {
  try {
    const current = checkLockoutStatus();
    const newCount = current.failedCount + 1;
    const now = Date.now();

    let lockUntil: number | null = null;
    if (newCount >= MAX_FAILED_ATTEMPTS) {
      lockUntil = now + LOCKOUT_DURATION_MS;
    }

    localStorage.setItem(
      ATTEMPTS_KEY,
      JSON.stringify({
        count: newCount,
        lockUntil,
        lastAttempt: now,
      })
    );

    return {
      isLocked: newCount >= MAX_FAILED_ATTEMPTS,
      remainingSeconds: lockUntil ? Math.ceil(LOCKOUT_DURATION_MS / 1000) : 0,
      failedCount: newCount,
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedCount: 1 };
  }
}

export function clearFailedAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Validates credentials using cryptographic SHA-256 hash comparison
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const lockout = checkLockoutStatus();
  if (lockout.isLocked) {
    return false;
  }

  // Artificial timing protection to mitigate side-channel timing analysis
  await new Promise((resolve) => setTimeout(resolve, 400));

  const authConfig = getStoredAuthConfig();
  const inputUserClean = username.trim().toLowerCase();
  const inputPassClean = password.trim();

  // If user has customized their credentials
  if (authConfig.isCustomized) {
    const inputUserHash = await sha256Hash(inputUserClean, authConfig.salt);
    const inputPassHash = await sha256Hash(inputPassClean, authConfig.salt);

    if (inputUserHash === authConfig.usernameHash && inputPassHash === authConfig.passwordHash) {
      clearFailedAttempts();
      return true;
    }
  } else {
    // Default mode: verify against pre-computed cryptographically salted SHA-256 hash
    const inputUserHash = await sha256Hash(inputUserClean, DEFAULT_SALT);
    const inputPassHash = await sha256Hash(inputPassClean, DEFAULT_SALT);

    if (inputUserHash === DEFAULT_USERNAME_HASH && inputPassHash === DEFAULT_PASSWORD_HASH) {
      clearFailedAttempts();
      return true;
    }
  }

  recordFailedAttempt();
  return false;
}
