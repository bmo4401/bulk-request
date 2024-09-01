// @ts-ignore
namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DATABASE_URL: string;

    FRONTEND_URL: string;

    NELO_TXT_TOKEN: string;
    NELO_PROJECT_VERSION: string;
    NELO_HOST: string;
  }
}
