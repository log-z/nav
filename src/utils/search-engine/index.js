import engBaidu from './eng-baidu'
import engGoogle from './eng-google'
import engWikipedia from './eng-wikipedia'

const ENGINES = {
    baidu: engBaidu,
    google: engGoogle,
    wikipedia: engWikipedia,
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
