declare type PersonInfo = {
  name: string,
  age: number
}
declare interface ImportMetaEnv {
  VITE_BASE_ROUTE: string;
  VITE_BASE_API: string;
}

declare interface Window {
  $message: MessageApiInjection
}
declare type Nullable<T> = T | null
