import { jsonp } from '@/utils/jsonp'

function target(wd) {
  const url = new URL('https://www.baidu.com/s')
  url.searchParams.set('wd', wd)
  return url
}

async function complete(wd) {
  const api = new URL('https://www.baidu.com/sugrec')
  api.searchParams.set('prod', 'wise')
  api.searchParams.set('wd', wd)
  const data = await jsonp(api)
  return {
    eng: 'baidu',
    wd: data.q,
    list: data.g ? data.g.map(g => g.q) : [],
  }
}

export default {
  target,
  complete,
}
