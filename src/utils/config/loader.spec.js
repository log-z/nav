import { configLoader } from '.';

describe('Test config loader', () => {
  test('simple loader', () => {
    const conf = configLoader({
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

  test('simple loader V2', () => {
    const conf = configLoader({
      "version": "2",
      "name": "test",
      "description": "test",
      "theme": {
        "subscribe": {
          "my": "theme-my.json"
        },
        "active": "my.red",
        "custom": {
          "primary.color": "#000",
          "base.background.color": "#000",
          "footer.background.color": "#000",
          "hovering.background.color": "#000"
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
})
