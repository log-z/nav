import { jsonp } from '@/utils/jsonp'

function target(wd) {
  const url = new URL('https://www.google.com/search')
  url.searchParams.set('q', wd)
  return url
}

async function complete(wd) {
  const api = new URL('https://www.google.com/complete/search')
  api.searchParams.set('client', 'psy-ab')
  api.searchParams.set('hl', 'zh-CN')
  api.searchParams.set('q', wd)
  const data = await jsonp(api)
  return {
    eng: 'google',
    wd: data[0],
    list: data[1].map(a => a[0]),
  }
}

export default {
  target,
  complete,
}
