import { withInstall } from './compoent'
export const testFn = (a: number, b: Boolean): number => {
  return b ? a + 1 : 1
}
export {
  withInstall
}