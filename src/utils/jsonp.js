let callbackSeq = 0

/**
 * 以JSONP方式请求不支持CORS的旧式接口
 * @param {URL} url 目标URL（回调参数将被追加或覆盖）
 * @param {object} [options]
 * @param {string} [options.callbackParamName='callback'] 回调参数名
 * @returns {Promise<any>} 响应数据
 */
export function jsonp(url, { callbackParamName = 'callback' } = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `__jsonp_callback_${++callbackSeq}`

    const script = document.createElement('script')
    const cleanup = () => {
      delete window[callbackName]
      script.remove()
    }

    window[callbackName] = (data) => {
      cleanup()
      resolve(data)
    }
    script.onerror = () => {
      cleanup()
      reject(new Error(`JSONP request failed: ${url}`))
    }

    url.searchParams.set(callbackParamName, callbackName)
    script.src = url
    document.head.append(script)
  })
}
