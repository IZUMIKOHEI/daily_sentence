declare namespace NodeJS {
  export interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_JWT_SECRET: string;
    BLOCK_URL: string[];
    NODE_ENV: "development" | "production";
  }
}
