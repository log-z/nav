import axios from 'axios';

function target(wd) {
    return 'https://www.bing.com/search?mkt=zh-cn&q=' + encodeURIComponent(wd)
}

function complete(wd, callback) {
    axios.get('https://cors-proxy.logz.ml/www_bing_com/as/suggestions', {
        params: {
            cvid: 0,
            mkt: 'zh-cn',
            qry: wd,
        },
    }).then(resposnse => {
        if (!resposnse.data) return;

        // 解析HTML
        let dom = document.createElement('div');
        dom.innerHTML = resposnse.data;
        
        // 自动完成列表
        let list = []
        dom.querySelectorAll('li').forEach(
            e => list.push(e.innerText)
        )

        callback({
            eng: 'bing',
            wd: wd,
            list: list,
        })
    }).catch(error => console.error(error))
}

export default {
    target,
    complete,
}
