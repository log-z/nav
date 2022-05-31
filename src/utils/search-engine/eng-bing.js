import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

function target(wd) {
  return 'https://www.bing.com/search?mkt=zh-cn&q=' + encodeURIComponent(wd)
}

function complete(wd, callback) {
  axios.get('https://api.bing.com/qsonhs.aspx', {
    params: {
      type: 'cb',
      mkt: 'zh-cn',
      q: wd,
    },
    adapter: jsonpAdapter,
    callbackParamName: 'cb'
  }).then(resp => {
    const list = resp.data.AS.Results
      .map(r => r.Suggests)
      .reduce(
        (sa1, sa2) => sa1.concat(sa2),
        []
      )
      .sort(
        (s1, s2) => (s1.Sk > s2.Sk) ? 1 : -1
      )
      .map(s => s.Txt)

    callback({
      eng: 'bing',
      wd: resp.data.AS.Query,
      list: list,
    })
  }).catch(error => console.error(error))
}

export default {
  target,
  complete,
}
