const NAMESPACE_DELIMITER = '.'
const DEFAULT_SUBSCRIBE_NAME = 'nav'
const DEFAULT_THEME_NAME = DEFAULT_SUBSCRIBE_NAME + NAMESPACE_DELIMITER + 'default'

// 根元数据
function root_matedata() {
  return {
    type: Object,
    properties: {
      subscribe: theme_subscribe_matedata(),
      active: { type: String, default: DEFAULT_THEME_NAME },
      custom: theme_custom_matedata(),
    }
  }
}
// 元数据：订阅
function theme_subscribe_matedata() {
  return {
    type: Object,
    default: {
      [DEFAULT_SUBSCRIBE_NAME]: import.meta.env.VITE_DEFAULT_THEME_URL
    },
    properties: {
      '*': { type: String, required: true },
    }
  }
}
// 元数据：自定义
function theme_custom_matedata() {
  return {
    type: Object,
    properties: {
      'light@primary.color': { type: String },
      'light@base.background.color': { type: String },
      'light@footer.background.color': { type: String },
      'light@highlight.background.color': { type: String },
      'dark@primary.color': { type: String },
      'dark@base.background.color': { type: String },
      'dark@footer.background.color': { type: String },
      'dark@highlight.background.color': { type: String },
    }
  }
}

// 元数据：订阅根元数据
function theme_subscribe_root_matedata() {
  return {
    type: Object,
    properties: {
      version: { type: String },
      name: { type: String },
      contents: theme_subscribe_contents_matedata(),
    }
  }
}
// 元数据：订阅内容列表
function theme_subscribe_contents_matedata() {
  return {
    type: Array,
    element: {
      name: { type: String },
      custom: theme_custom_matedata(),
    }
  }
}


import $_ from 'lodash'
import store from '@/store'
import source from './source';
import { parser } from './common'
import { httpAbsPath } from '@/utils/common'

// 加载订阅的主题
async function loadActiveSubscribe(config) {
  let [ subscribe_name, theme_name ] = config.active.split(NAMESPACE_DELIMITER, 2)
  let subscribe_path = config.subscribe[subscribe_name]
  
  // 相对路径转为绝对路径
  let base_url = store.getters['config/baseUrl'];
  subscribe_path = httpAbsPath(subscribe_path, base_url)

  try {
    // 获取订阅
    let data = await source.fromUrl(subscribe_path)
    let subscribe = await loadSubscribe(data)
    let subscribe_contents = subscribe.contents
    let subscribe_content = $_.find(subscribe_contents, sc => sc.name === theme_name)
    
    // 检查订阅内容
    let subscribe_custom
    if (subscribe_content === undefined) {
      console.warn(`Not found theme "${config.active}" of ${subscribe_path}`)
      subscribe_custom = {}
    } else {
      subscribe_custom = subscribe_content.custom
    }
    
    // 优先使用自定义
    return Object.assign(subscribe_custom, config.custom)
  } catch (error) {
    // 获取订阅失败，回落到自定义
    console.error(`Failed to download theme subscribe "${subscribe_name}" of ${subscribe_path}`, error)
    return config.custom
  }
}

export async function loadSubscribe(config) {
  return await parser(theme_subscribe_root_matedata(), config)
}

export async function load(obj) {
  let config = await parser(root_matedata(), obj ? obj : {})
  config._final = await loadActiveSubscribe(config)
  return config
}
