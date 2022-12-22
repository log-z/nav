const SEARCH_ENGINE_MATEDATA = {
  properties: {
    list: {
      type: Array,
      element: String,
      default: [ 'baidu', 'google', 'bing', 'wikipedia' ],
    },
    placeholder: { type: String, default: '您来点什么？' },
  }
};
const FAVORITES_WEBSITES_MATEDATA = {
  type: Array,
  element: {
    title: { type: String, required: true },
    subtitle: { type: String },
    icon: { type: String },
    url: { type: String, required: true },
  },
};
const FAVORITES_GROUPS_MATEDATA = {
  type: Array,
  element: {
    name: { type: String, required: true },
    websites: FAVORITES_WEBSITES_MATEDATA,
  },
};
const FAVORITES_MATEDATA = {
  properties: {
    iconPrefix: { type: String, default: '' },
    groups: FAVORITES_GROUPS_MATEDATA,
  },
};
const ROOT_MATEDATA = {
  properties: {
    name: { type: String },
    description: { type: String },
    searchEngine: SEARCH_ENGINE_MATEDATA,
    favorites: FAVORITES_MATEDATA,
  }
};


import { parser } from './common'

// 转换到V2版本
function convertToV2 (rootConfig) {
  if (!rootConfig) {
    return rootConfig;
  }

  rootConfig.search = {
    engine: {
      active: rootConfig.searchEngine.list
    },
    placeholder: rootConfig.searchEngine.placeholder
  }
  delete rootConfig.searchEngine
  return rootConfig;
}

export function loader(obj) {
  let rootConfig = parser(ROOT_MATEDATA, obj ? obj : {});
  return convertToV2(rootConfig)
}
