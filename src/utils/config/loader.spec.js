import { loader } from './loader';

describe('Test config loader', () => {
  test('simple loader', () => {
    const conf = loader({
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
})
