// GitHub 专用请求头
// 避免 GitHub 阻止使用中文语言的浏览器请求
const GH_HEADERS = {
  'Accept-Language': '',
}

// 检查是否是 GitHub URL
const ghUrlPrefix = [
  'http://raw.githubusercontent.com/',
  'https://raw.githubusercontent.com/',
  'http://gist.githubusercontent.com/',
  'https://gist.githubusercontent.com/',
]
export function isGithubUrl(url) {
  return typeof url === 'string' &&
    ghUrlPrefix.some(prefix => url.startsWith(prefix))
}

/**
 * 请求文本类资源
 * @param {string} url
 * @returns {Promise<string>} 响应文本
 */
export async function fetchText(url) {
  const resp = await fetch(url, {
    headers: isGithubUrl(url) ? GH_HEADERS : undefined,
  })
  if (!resp.ok) {
    throw new Error(`Request failed (${resp.status}): ${url}`)
  }
  return resp.text()
}
