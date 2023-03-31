import { loader as loaderV1 } from './loader-v1';
import { loader as loaderV2 } from './loader-v2'

export async function configLoader(obj) {
  if (obj && obj['version'] === '2') {
    return await loaderV2(obj)
  } else {
    return await loaderV1(obj)
  }
}
