export interface StoredAuthConfig {
  usernameHash: string;
  passwordHash: string;
  salt: string;
  isCustomized: boolean;
  updatedAt: string;
}

export const defaultAuthConfig: StoredAuthConfig = {
  "usernameHash": "5ab2e6e7bda6291b617f9fc94a4dd8dffc795ef3a6f28f497b53d88d0ddb9803",
  "passwordHash": "2f81d42404e92b0fbcd39065136953b5c9c94de0321dd97f5c5db5be4b0f7a00",
  "salt": "salt_w11veuqrcu_1789397195974",
  "isCustomized": true,
  "updatedAt": "2026-09-14T14:46:35.975Z"
};
