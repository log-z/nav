const HTTP_URL_PREFIX = /^(http[s]?:)?\/\//

export function httpAbsPath(path, baseUrl) {
  if (HTTP_URL_PREFIX.test(path)) {
    return path
  }
  return baseUrl + path
}

/**
 * 防抖：仅在停止调用wait毫秒后执行一次
 * @param {Function} fn 回调
 * @param {number} wait 等待毫秒数
 */
export function debounce(fn, wait) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}
