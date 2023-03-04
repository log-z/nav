import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, beforeAll, afterEach, describe, expect, test } from 'vitest'
import { configLoader } from '.';
import { subscribeLoader as themeSubscribeLoader } from './loader-v2-theme'

describe('Test config loader', () => {
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

    const conf = await configLoader(confRaw);
    expect(conf).not.toBeNull()
  })

  test('simple loader V2', async () => {
    const confRaw = {
      "version": "2",
      "name": "test",
      "description": "test",
      "theme": {
        "subscribe": {
          "nav": "config:nav-theme-preset.json"
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
            "url": "https://www.youtube.com/"
          }]
        }]
      }
    }

    const conf = await configLoader(confRaw)
    expect(conf).toMatchObject(confRaw)
  })

  test('simple loader V2 theme subscribe', async () => {
    const themeSubscribe = await themeSubscribeLoader(themeSubscribeData);
    expect(themeSubscribe).toMatchObject(themeSubscribeData)
  })
})


/*
 请求模拟
 */

const themeSubscribeData = [
  {
    "name": "default",
    "custom": {
      "light@primary.color": "#eb7366",
      "light@base.background.color": "#fff8f8",
      "light@footer.background.color": "#fdefef",
      "light@highlight.background.color": "#fddbd6"
    }
  }, {
    "name": "red",
    "custom": {
      "light@primary.color": "#eb7366",
      "light@base.background.color": "#fff8f8",
      "light@footer.background.color": "#fdefef",
      "light@highlight.background.color": "#fddbd6"
    }
  }, {
    "name": "green",
    "custom": {
      "light@primary.color": "#92bf9a",
      "light@base.background.color": "#fdffe0",
      "light@footer.background.color": "#92bf9a",
      "light@highlight.background.color": "#f7f9d6"
    }
  }
]

const restHandlers = [
  rest.get(import.meta.env.VITE_DEFAULT_THEME_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(themeSubscribeData))
  }),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
