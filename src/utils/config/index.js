import source from './source';
import { load as loadV1 } from './loader-v1'
import { load as loadV2 } from './loader-v2'

async function load(obj) {
  // YAML中数字2会被解析为number，故统一转换后再比较
  if (obj && Number(obj['version']) === 2) {
    return await loadV2(obj)
  }
  return await loadV1(obj)
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
