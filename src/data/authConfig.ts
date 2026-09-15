export interface StoredAuthConfig {
  usernameHash: string;
  passwordHash: string;
  salt: string;
  isCustomized: boolean;
  updatedAt: string;
}

export const defaultAuthConfig: StoredAuthConfig = {
  // Default username: admin
  usernameHash: '1fa722a5c48bdfb1b8aa404f2f45ea0f22d9df8dfef2a8740aa1296c096dbcae',
  // Default password: admin
  passwordHash: '626d7f4fcaeec69c6f2df4cf0ca58a649d10e828453ea13c19f5df40713bdf2d',
  salt: 'douzandeh_secure_salt_2026',
  isCustomized: false,
  updatedAt: '2026-01-01T00:00:00.000Z',
};
