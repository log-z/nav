import { configLoader } from '@/utils/config';

describe('Test config loader', () => {
    it('simple loader', () => {
        const conf = configLoader({
            "name": "default",
            "searchEngine": {
                "list": ["baidu", "google", "wikipedia"]
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
    })
})