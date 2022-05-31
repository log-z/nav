import engBaidu from './eng-baidu'
import engGoogle from './eng-google'
import engBing from './eng-bing'
import engWikipedia from './eng-wikipedia'

const ENGINES = {
  baidu: engBaidu,
  google: engGoogle,
  bing: engBing,
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
