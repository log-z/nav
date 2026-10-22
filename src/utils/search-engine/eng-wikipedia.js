import { jsonp } from '@/utils/jsonp'

function target(wd) {
  const url = new URL('https://zh.wikipedia.org/w/index.php')
  url.searchParams.set('search', wd)
  return url
}

async function complete(wd) {
  const api = new URL('https://zh.wikipedia.org/w/api.php')
  api.searchParams.set('action', 'opensearch')
  api.searchParams.set('format', 'json')
  api.searchParams.set('formatversion', '2')
  api.searchParams.set('limit', '10')
  api.searchParams.set('search', wd)
  const data = await jsonp(api)
  return {
    eng: 'wikipedia',
    wd: data[0],
    list: data[1],
  }
}

export default {
  target,
  complete,
}
