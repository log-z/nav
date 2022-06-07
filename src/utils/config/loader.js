const SEARCH_ENGINE_MATEDATA = {
  properties: {
    list: {
      type: Array,
      element: String,
      default: [ 'baidu', 'google', 'bing', 'wikipedia' ],
    },
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
  properties: {
    iconPrefix: { type: String, default: '' },
    groups: FAVORITES_GROUPS_MATEDATA,
  },
};
const ROOT_MATEDATA = {
  properties: {
    name: { type: String },
    description: { type: String },
    searchEngine: SEARCH_ENGINE_MATEDATA,
    favorites: FAVORITES_MATEDATA,
  }
};


import _ from 'lodash';

function load(matedata, obj) {
  // Required config
  if (matedata.required && _.isEmpty(obj)) {
    throw `is required.`;
  } else if (!matedata.required && _.isEmpty(obj)) {
    if (matedata.default !== undefined && matedata.default !== undefined) {
      obj = matedata.default;
    } else if (matedata.type === Array) {
      obj = [];
    } else if (!matedata.type || matedata.type === Object) {
      obj = {};
    } else {
      obj = null;
    }
  }

  let type = (obj === null || obj === undefined) ? null : typeof obj;
  if ([String, Number, Boolean].includes(matedata.type)) {
    // String or Number or Boolean or null
    if (type === null) {
      return null;
    } else if (type === matedata.type.name.toLowerCase()) {
      return obj;
    } else {
      throw `${obj} is not a String, type "${type}".`;
    }
  } else if (matedata.type === Array) {
    // Array
    if (!Array.isArray(obj)) {
      throw `${obj} is not a Array, type "${type}".`;
    }
    if ([String, Number, Boolean].includes(matedata.element)) {
      let ele_type = matedata.element.name.toLowerCase();
      let error_num = obj.filter(ele => typeof ele !== ele_type).length;
      if (error_num === 0) {
        return obj;
      } else {
        throw `${obj} is not a ${ele_type} Array.`;
      }
    }

    return obj.map((ele, index) => {
      let sub_config = {};
      for (let ele_pname in matedata.element) {
        if (Object.hasOwnProperty.call(matedata.element, ele_pname)) {
          let sub_matedata = matedata.element[ele_pname];
          let sub_obj = ele[ele_pname];
          sub_config[ele_pname] = tryto(`[${index}].${ele_pname}`, () => load(sub_matedata, sub_obj));
        }
      }
      return sub_config;
    });
  } else {
    // Object
    let config = {};
    for (let ele_pname in matedata.properties) {
      if (Object.hasOwnProperty.call(matedata.properties, ele_pname)) {
        let sub_matedata = matedata.properties[ele_pname];
        let sub_obj = obj[ele_pname];
        config[ele_pname] = tryto(ele_pname, () => load(sub_matedata, sub_obj));
      }
    }
    return config;
  }
}

function tryto(name, action) {
  try {
    return action();
  } catch (e) {
    throw e.startsWith('.') ? `.${name}${e}` : `.${name} ${e}`;
  }
}

export function loader(obj) {
  try {
    return load(ROOT_MATEDATA, obj ? obj : {});
  } catch (e) {
    console.error('Failed to load config: ' + (e.startsWith('.') ? e.substring(1) : e));
  }
}
