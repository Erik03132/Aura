interface ImportMetaEnv {
  readonly API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Augment NodeJS.ProcessEnv globally to satisfy "process.env.API_KEY" usage
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: string | undefined;
    }
  }
}

export {};