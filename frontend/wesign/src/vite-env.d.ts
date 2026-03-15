/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // Tambahkan env variables lainnya di sini
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
