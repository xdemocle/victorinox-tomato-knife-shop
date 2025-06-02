/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@remix-run/cloudflare/dist/globals" />

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.css?url' {
  const url: string;
  export default url;
}
