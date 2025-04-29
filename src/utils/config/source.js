import axios from 'axios';
import YAML from 'yaml'

// 请求实例
const request = axios.create({
  headers: {
    get: {
      'Accept': 'text/plain',
      'Accept-Language': '',  // 避免 GitHub 阻止使用中文语言的浏览器请求
    }
  },
  transformResponse: httpTransformResponse,
})

// 响应体转换
function httpTransformResponse(data) {
  if (data === null) {
    return null
  }

  data = data.trim()
  if (data.startsWith('{') || data.startsWith('[')) {
    // 识别为JSON
    return JSON.parse(data)
  } else {
    // 识别为YAML
    return YAML.parse(data)
  }
}

/**
 * 以URL作为来源
 * @param {string} url
 */
async function fromUrl(url) {
  const resp = await request.get(url)
  return resp.data
}

/**
 * 以YAML文本作为来源
 * @param {string} url
 */
function fromYaml(yaml) {
  return YAML.parse(yaml)
}

export default {
  fromUrl,
  fromYaml
}
