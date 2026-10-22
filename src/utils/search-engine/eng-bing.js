import { jsonp } from '@/utils/jsonp'

function target(wd) {
  const url = new URL('https://www.bing.com/search')
  url.searchParams.set('mkt', 'zh-cn')
  url.searchParams.set('q', wd)
  return url
}

async function complete(wd) {
  const api = new URL('https://api.bing.com/qsonhs.aspx')
  api.searchParams.set('type', 'cb')
  api.searchParams.set('mkt', 'zh-cn')
  api.searchParams.set('q', wd)
  const data = await jsonp(api, { callbackParamName: 'cb' })

  const asRes = data.AS.Results
  const list = asRes
    ? asRes.flatMap(r => r.Suggests)
        .sort((s1, s2) => (s1.Sk > s2.Sk) ? 1 : -1)
        .map(s => s.Txt)
    : []

  return {
    eng: 'bing',
    wd: data.AS.Query,
    list,
  }
}

export default {
  target,
  complete,
}
