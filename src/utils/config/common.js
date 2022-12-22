import _ from 'lodash';

const ANY_TOKEN = '*'

function parse(matedata, obj) {
  // 1. 必要值校验和默认值
  if (matedata.required && _.isEmpty(obj)) {
    throw `is required.`;
  } else if (!matedata.required && _.isEmpty(obj)) {
    if (matedata.default !== null && matedata.default !== undefined) {
      obj = matedata.default;
    } else if (matedata.type === Array) {
      obj = [];
    } else if (!matedata.type || matedata.type === Object) {
      obj = {};
    } else {
      obj = null;
    }
  }

  // 2. 类型校验
  let type = (obj === null || obj === undefined) ? null : typeof obj;
  if ([String, Number, Boolean].includes(matedata.type)) {
    // 2.1. 基本类型校验（String、Number、Boolean和null）
    if (type === null) {
      return null;
    } else if (type === matedata.type.name.toLowerCase()) {
      return obj;
    } else {
      throw `${obj} is not a ${matedata.type}, type "${type}".`;
    }
  } else if (matedata.type === Array) {
    // 2.2. 数组校验（Array）
    if (!Array.isArray(obj)) {
      throw `${obj} is not a Array, type "${type}".`;
    }

    // 2.2.1. 数组元素校验：基本类型
    if ([String, Number, Boolean].includes(matedata.element)) {
      let ele_type = matedata.element.name.toLowerCase();
      let error_num = obj.filter(ele => typeof ele !== ele_type).length;
      if (error_num === 0) {
        return obj;
      } else {
        throw `${obj} is not a Array[${matedata.element}].`;
      }
    }

    // 2.2.2. 数组元素校验：对象
    return obj.map((ele, index) => {
      let sub_config = {};
      for (let ele_pname in matedata.element) {
        if (Object.hasOwnProperty.call(matedata.element, ele_pname)) {
          let sub_matedata = matedata.element[ele_pname];
          let sub_obj = ele[ele_pname];
          sub_config[ele_pname] = tryto(`[${index}].${ele_pname}`, () => parse(sub_matedata, sub_obj));
        }
      }
      return sub_config;
    });
  } else {
    // 2.3. 对象递归校验（Object）
    let config = {};
    // 2.3.1. 动态属性
    if (Object.hasOwnProperty.call(matedata.properties, ANY_TOKEN)) {
      let sub_matedata = matedata.properties[ANY_TOKEN]
      for (let ele_pname in obj) {
        if (Object.hasOwnProperty.call(obj, ele_pname)) {
          let sub_obj = obj[ele_pname];
          config[ele_pname] = tryto(ele_pname, () => parse(sub_matedata, sub_obj));
        }
      }
      return config
    }

    // 2.3.2. 固定属性
    for (let ele_pname in matedata.properties) {
      if (Object.hasOwnProperty.call(matedata.properties, ele_pname)) {
        let sub_matedata = matedata.properties[ele_pname];
        let sub_obj = obj[ele_pname];
        config[ele_pname] = tryto(ele_pname, () => parse(sub_matedata, sub_obj));
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

export function parser(matedata, obj) {
  try {
    return parse(matedata, obj ? obj : {});
  } catch (e) {
    console.error('Failed to load config: ' + (e.startsWith('.') ? e.substring(1) : e));
  }
}
