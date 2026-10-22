import { jsonp } from '@/utils/jsonp'

function target(wd) {
  const url = new URL('https://www.qiuwenbaike.cn/index.php')
  url.searchParams.set('search', wd)
  return url
}

async function complete(wd) {
  const api = new URL('https://www.qiuwenbaike.cn/api.php')
  api.searchParams.set('action', 'opensearch')
  api.searchParams.set('format', 'json')
  api.searchParams.set('formatversion', '2')
  api.searchParams.set('limit', '10')
  api.searchParams.set('search', wd)
  const data = await jsonp(api)
  return {
    eng: 'qiuwenbaike',
    wd: data[0],
    list: data[1],
  }
}

export default {
  target,
  complete,
}
