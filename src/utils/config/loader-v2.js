const THEME_SUBSCRIBE_MATEDATA = {
  type: Object,
  default: { nav: process.env.VUE_APP_DEFAULT_THEME_URL },
  properties: {
    '*': { type: String, required: true },
  }
}
const THEME_CUSTOM_MATEDATA = {
  type: Object,
  properties: {
    'primary.color': { type: String },
    'base.background.color': { type: String },
    'footer.background.color': { type: String },
    'hovering.background.color': { type: String },
  }
}
const THEME_MATEDATA = {
  type: Object,
  properties: {
    subscribe: THEME_SUBSCRIBE_MATEDATA,
    active: { type: String, default: 'nav.default' },
    custom: THEME_CUSTOM_MATEDATA,
  }
}
const SEARCH_ENGIN_MATEDATA = {
  type: Object,
  properties: {
    active: {
      type: Array,
      element: String,
      default: [ 'baidu', 'google', 'bing', 'wikipedia' ],
    },
  }
}
const SEARCH_MATEDATA = {
  type: Object,
  properties: {
    engine: SEARCH_ENGIN_MATEDATA,
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
  type: Object,
  properties: {
    iconPrefix: { type: String, default: '' },
    groups: FAVORITES_GROUPS_MATEDATA,
  },
};
const ROOT_MATEDATA = {
  type: Object,
  properties: {
    version: { type: String },
    name: { type: String },
    description: { type: String },
    theme: THEME_MATEDATA,
    search: SEARCH_MATEDATA,
    favorites: FAVORITES_MATEDATA,
  }
};


import { parser } from './common'

export function loader(obj) {
  return parser(ROOT_MATEDATA, obj ? obj : {});
}
