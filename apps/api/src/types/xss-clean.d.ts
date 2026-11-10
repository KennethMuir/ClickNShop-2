declare module "xss-clean" {
  const xssClean: () => import("express").RequestHandler
  export default xssClean
}