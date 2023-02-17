import { configLoader } from '.';
import { subscribeLoader as themeSubscribeLoader } from './loader-v2-theme'

describe('Test config loader', () => {
  test('simple loader', async () => {
    const conf = await configLoader({
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
    });
    expect(conf).not.toBeNull()
  })

  test('simple loader V2', async () => {
    const conf = await configLoader({
      "version": "2",
      "name": "test",
      "description": "test",
      "theme": {
        "subscribe": {
          "my": "theme-my.json"
        },
        "active": "my.red",
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
          "active": ["baidu", "google", "bing", "wikipedia"],
          "mirror": {
            "google": {
              "baseUrl": null,
              "baseCompleteUrl": null
            }
          }
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
    });
    expect(conf).not.toBeNull()
  })

  test('simple loader V2 theme subscribe', async () => {
    const conf = await themeSubscribeLoader([
      {
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
    ]);
    expect(conf).not.toBeNull()
  })
})
