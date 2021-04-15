import engBaidu from './eng-baidu'

const ENGINES = {
    baidu: {
        target: engBaidu.target,
        complete: engBaidu.complete,
    },
}

function target(eng, wd) {
    return ENGINES[eng].target(wd);
}

function complete(eng, wd, callback) {
    return ENGINES[eng].complete(wd, callback);
}

export default {
    target,
    complete,
}
