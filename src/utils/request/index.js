import axios from 'axios'

// 通用客户端
export const commCli = axios.create()

// GitHub 客户端
// 避免 GitHub 阻止使用中文语言的浏览器请求
export const ghCli = axios.create({
  headers: {
    common: {
      'Accept-Language': '',
    }
  }
})

// 检查是否是 GitHub URL
const ghUrlPrefix = [
  'http://raw.githubusercontent.com/',
  'https://raw.githubusercontent.com/',
  'http://gist.githubusercontent.com/',
  'https://gist.githubusercontent.com/',
]
export function isGithubUrl(url) {
  return typeof url === "string" &&
    ghUrlPrefix.find(prefix => url.startsWith(prefix)) !== undefined
}

// 图片请求API
export function imgApi(url) {
  return isGithubUrl(url) ? ghCli.get(url) : commCli.get(url)
}
