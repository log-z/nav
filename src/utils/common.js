const HTTP_URL_PREFIX = /^(http[s]?:)?\/\//

export function httpAbsPath(path, baseUrl) {
  if (HTTP_URL_PREFIX.test(path)) {
    return path
  }
  return baseUrl + path
}
