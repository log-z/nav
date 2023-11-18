import source from './source';
import { load as loadV1 } from './loader-v1'
import { load as loadV2 } from './loader-v2'

async function load(obj) {
  if (obj && obj['version'] == '2') {
    return await loadV2(obj)
  } else {
    return await loadV1(obj)
  }
}

async function loadFromUrl(url) {
  const data = await source.fromUrl(url)
  return await load(data)
}

async function loadFromYaml(yaml) {
  const data = source.fromYaml(yaml)
  return await load(data)
}

export default {
  load,
  loadFromUrl,
  loadFromYaml,
}
