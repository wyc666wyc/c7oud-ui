import type { App, Plugin } from "vue";

export const withInstall =  <T>(comp: T) => {
  type SFCWithInstall<T> = T & Plugin
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component((comp as any).name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}