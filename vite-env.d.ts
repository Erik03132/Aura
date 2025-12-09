// Fix: Cannot find type definition file for 'vite/client'.
// /// <reference types="vite/client" />

// Fix: Cannot redeclare block-scoped variable 'process'.
declare var process: {
  env: {
    [key: string]: string | undefined;
    API_KEY: string;
  }
};