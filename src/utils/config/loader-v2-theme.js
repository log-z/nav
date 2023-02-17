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
      [DEFAULT_SUBSCRIBE_NAME]: process.env.VUE_APP_DEFAULT_THEME_URL
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
import axios from 'axios';
import store from '@/store'
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
    let resp = await axios.get(subscribe_path)
    // 获取订阅成功
    let subscribe_contents = await subscribeLoader(resp.data)
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

export async function subscribeLoader(list) {
  return await parser(theme_subscribe_contents_matedata(), list)
}

export async function loader(obj) {
  let config = await parser(root_matedata(), obj ? obj : {})
  config._final = await loadActiveSubscribe(config)
  return config
}
