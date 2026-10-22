import { setActivePinia, createPinia } from 'pinia'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, beforeEach, afterEach, describe, expect, test } from 'vitest'
import loader from '.';
import source from './source';
import { loadSubscribe as loadThemeSubscribe } from './loader-v2-theme'


/*
 主配置加载测试
 */

describe('Test config loader', () => {
  // V1版本主配置加载测试
  test('simple loader V1', async () => {
    const confRaw = {
      "name": "test",
      "description": "test",
      "searchEngine": {
        "list": ["baidu", "google", "bing", "wikipedia"],
        "placeholder": "👴 来点什么？"
      },
      "favorites": {
        "iconPrefix": "image:website-icon:",
        "groups": [{
          "name": "常用",
          "websites": [{
            "title": "哔哩哔哩",
            "subtitle": "bilibili.com",
            "icon": "bilibili.svg",
            "url": "https://www.bilibili.com/"
          }, {
            "title": "YouTube",
            "subtitle": "youtube.com",
            "icon": "youtube.svg",
            "url": "https://www.youtube.com/"
          }]
        }]
      }
    }

    const conf = await loader.load(confRaw);
    expect(conf).not.toBeNull()
  })
  
  // V2版本主配置加载测试 [JSON]
  const confDataV2 = {
    "version": "2",
    "name": "test",
    "description": "test",
    "theme": {
      "subscribe": {
        "nav": import.meta.env.VITE_DEFAULT_THEME_URL
      },
      "active": "nav.red",
      "custom": {
        "light@primary.color": "#000",
        "light@base.background.color": "#000",
        "light@footer.background.color": "#000",
        "light@highlight.background.color": "#000"
      }
    },
    "search": {
      "placeholder": "👴 来点什么？",
      "engine": {
        "active": ["baidu", "google", "bing", "wikipedia"]
      }
    },
    "favorites": {
      "iconPrefix": "image:website-icon:",
      "groups": [{
        "name": "常用",
        "websites": [{
          "title": "哔哩哔哩",
          "subtitle": "bilibili.com",
          "icon": "bilibili.svg",
          "url": "https://www.bilibili.com/"
        }, {
          "title": "YouTube",
          "subtitle": "youtube.com",
          "icon": "youtube.svg",
          "iconOnDark": "youtube_on_dark.svg",
          "url": "https://www.youtube.com/"
        }]
      }]
    }
  }

  test('simple loader V2 [JSON]', async () => {
    const conf = await loader.load(confDataV2)
    expect(conf).toMatchObject(confDataV2)
    // 订阅主题生效，且自定义项覆盖同名订阅项
    expect(conf.theme._final['light@primary.color']).toBe('#000')
    expect(conf.theme._final['dark@primary.color']).toBe('#eb7366')
  })

  // V2版本主配置加载测试 [YAML]
  const confYamlV2 = `
    version: 2
    name: test
    description: test
    theme:
      subscribe:
        nav: ${import.meta.env.VITE_DEFAULT_THEME_URL}
      active: nav.red
      custom:
        light@primary.color: '#000'
        light@base.background.color: '#000'
        light@footer.background.color: '#000'
        light@highlight.background.color: '#000'
    search:
      placeholder: 👴 来点什么？
      engine:
        active:
        - baidu
        - google
        - bing
        - wikipedia
    favorites:
      iconPrefix: 'image:website-icon:'
      groups:
      - name: 常用
        websites:
        - title: 哔哩哔哩
          subtitle: bilibili.com
          icon: bilibili.svg
          url: https://www.bilibili.com/
        - title: YouTube
          subtitle: youtube.com
          icon: youtube.svg
          iconOnDark: youtube_on_dark.svg
          url: https://www.youtube.com/
  `
  test('simple loader V2 [YAML]', async () => {
    const conf = await loader.loadFromYaml(confYamlV2)
    expect(conf).toMatchObject(confDataV2)
    // 订阅主题生效，且自定义项覆盖同名订阅项
    expect(conf.theme._final['light@primary.color']).toBe('#000')
    expect(conf.theme._final['dark@primary.color']).toBe('#eb7366')
  })
})


/*
 主题订阅加载测试
 */

const themeSubscribeData = {
  "version": "2",
  "name": "test-subscribe",
  "contents": [
    {
      "name": "default",
      "custom": {
        "light@primary.color": "#eb7366",
        "light@base.background.color": "#fff8f8",
        "light@footer.background.color": "#fdefef",
        "light@highlight.background.color": "#fddbd6",
        "dark@primary.color": "#eb7366",
        "dark@base.background.color": "#fff8f8",
        "dark@footer.background.color": "#fdefef",
        "dark@highlight.background.color": "#fddbd6"
      }
    }, {
      "name": "red",
      "custom": {
        "light@primary.color": "#eb7366",
        "light@base.background.color": "#fff8f8",
        "light@footer.background.color": "#fdefef",
        "light@highlight.background.color": "#fddbd6",
        "dark@primary.color": "#eb7366",
        "dark@base.background.color": "#fff8f8",
        "dark@footer.background.color": "#fdefef",
        "dark@highlight.background.color": "#fddbd6"
      }
    }
  ]
}

const themeSubscribeYaml = `
  version: 2
  name: test-subscribe
  contents:
  - name: default
    custom:
      light@primary.color: '#eb7366'
      light@base.background.color: '#fff8f8'
      light@footer.background.color: '#fdefef'
      light@highlight.background.color: '#fddbd6'
      dark@primary.color: '#eb7366'
      dark@base.background.color: '#fff8f8'
      dark@footer.background.color: '#fdefef'
      dark@highlight.background.color: '#fddbd6'
  - name: red
    custom:
      light@primary.color: '#eb7366'
      light@base.background.color: '#fff8f8'
      light@footer.background.color: '#fdefef'
      light@highlight.background.color: '#fddbd6'
      dark@primary.color: '#eb7366'
      dark@base.background.color: '#fff8f8'
      dark@footer.background.color: '#fdefef'
      dark@highlight.background.color: '#fddbd6'
`

describe('Test theme subscribe loader', () => {
  // V2主题订阅加载测试 [JSON]
  test('simple loader V2 theme subscribe [JSON]', async () => {
    const themeSubscribe = await loadThemeSubscribe(themeSubscribeData)
    expect(themeSubscribe).toMatchObject(themeSubscribeData)
  })

  // V2主题订阅加载测试 [YAML]
  test('simple loader V2 theme subscribe [YAML]', async () => {
    const data = source.fromYaml(themeSubscribeYaml)
    const themeSubscribe = await loadThemeSubscribe(data)
    expect(themeSubscribe).toMatchObject(themeSubscribeData)
  })
})


/*
 请求拦截与模拟
 */

const httpHandlers = [
  // CORS预检（happy-dom会先行发出）
  http.options(import.meta.env.VITE_DEFAULT_THEME_URL, () => {
    return new HttpResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    })
  }),
  http.get(import.meta.env.VITE_DEFAULT_THEME_URL, () => {
    return HttpResponse.json(themeSubscribeData, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  }),
]

const server = setupServer(...httpHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Test config source', () => {
  // URL来源加载测试（经由MSW拦截）
  test('load source from URL [mocked]', async () => {
    const data = await source.fromUrl(import.meta.env.VITE_DEFAULT_THEME_URL)
    expect(data).toMatchObject(themeSubscribeData)
  })
})


/*
 初始化Pinia
 */

beforeEach(() => {
  setActivePinia(createPinia())
})
