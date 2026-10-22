import YAML from 'yaml'
import { fetchText } from '@/utils/request'

// 解析响应体（自动识别JSON或YAML）
function parseContent(data) {
  if (data === null) {
    return null
  }

  data = data.trim()
  if (data.startsWith('{') || data.startsWith('[')) {
    // 识别为JSON
    return JSON.parse(data)
  }
  // 识别为YAML
  return YAML.parse(data)
}

/**
 * 以URL作为来源
 * @param {string} url
 */
async function fromUrl(url) {
  return parseContent(await fetchText(url))
}

/**
 * 以YAML文本作为来源
 * @param {string} yaml
 */
function fromYaml(yaml) {
  return YAML.parse(yaml)
}

export default {
  fromUrl,
  fromYaml,
}
