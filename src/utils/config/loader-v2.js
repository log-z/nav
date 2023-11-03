// 根元数据
function root_matedata() {
  return {
    type: Object,
    properties: {
      version: { type: String },
      name: { type: String },
      description: { type: String },
      theme: { loader: themeLoader },
      search: search_matedata(),
      favorites: favorites_matedata(),
    }
  }
}

// 元数据：搜索
function search_matedata() {
  return {
    type: Object,
    properties: {
      engine: search_engin_matedata(),
      placeholder: { type: String, default: '您来点什么？' },
    }
  }
}
// 元数据：搜索-引擎
function search_engin_matedata() {
  return {
    type: Object,
    properties: {
      active: {
        type: Array,
        element: String,
        default: [ 'baidu', 'google', 'bing', 'wikipedia' ],
      },
    }
  }
}

// 元数据：收藏
function favorites_matedata() {
  return {
    type: Object,
    properties: {
      iconPrefix: { type: String, default: '' },
      groups: favorites_groups_matedata(),
    }
  }
}
// 元数据：收藏-分组
function favorites_groups_matedata() {
  return {
    type: Array,
    element: {
      name: { type: String, required: true },
      websites: favorites_websites_matedata(),
    }
  }
}
// 元数据：收藏-分组-站点
function favorites_websites_matedata() {
  return {
    type: Array,
    element: {
      title: { type: String, required: true },
      subtitle: { type: String },
      icon: { type: String },
      iconOnDark: { type: String },
      url: { type: String, required: true },
    }
  }
}


import { parser } from './common'
import { loader as themeLoader } from './loader-v2-theme'

export async function loader(obj) {
  return await parser(root_matedata(), obj ? obj : {})
}
