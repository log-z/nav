import _ from 'lodash';

const ANY_TOKEN = '*'

/**
 * 检查是否为空
 * @param val 值
 */
function isEmpty(val) {
  if (val === null) {
    return true
  }

  switch (typeof val) {
    case 'undefined':
      return true
    case 'number':
    case 'bigint':
    case 'boolean':
      return false
  }

  return Object.keys(val).length === 0
}

/**
 * 解释配置
 * @param matedata 配置片段的元数据
 * @param obj 配置片段
 * @returns 有效的配置片段
 */
async function parse(matedata, obj) {
  // 0. 若指定了外部加载器，则使用它
  if (matedata.loader && typeof matedata.loader === 'function') {
    return await matedata.loader(obj)
  }

  // 1. 必要值校验和默认值
  if (matedata.required && isEmpty(obj)) {
    throw `is required.`;
  } else if (!matedata.required && isEmpty(obj)) {
    if (matedata.default !== null && matedata.default !== undefined) {
      obj = matedata.default;
    } else if (matedata.type === Array) {
      obj = [];
    } else if (!matedata.type || matedata.type === Object) {
      obj = {};
    } else if (matedata.default === undefined) {
      obj = undefined
    } else {
      obj = null;
    }
  }

  // 2. 类型校验
  let type = (obj === null) ? null : typeof obj;
  if ([String, Number, Boolean].includes(matedata.type)) {
    // 2.1. 基本类型校验（String、Number、Boolean、null和undefined）
    if (type === null) {
      return null;
    } else if (type === 'undefined') {
      return undefined;
    } else if (type === matedata.type.name.toLowerCase()) {
      return obj;
    }
    
    try {
      return new matedata.type(obj).valueOf()
    } catch (e) {
      throw `can not cast \`${obj}\` from [${type}] to [${matedata.type}].`;
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
    let sub_config_promises = obj.map(async (ele, index) => {
      let sub_config = {};
      for (let ele_pname in matedata.element) {
        if (Object.hasOwnProperty.call(matedata.element, ele_pname)) {
          let sub_matedata = matedata.element[ele_pname]
          let sub_obj = ele[ele_pname]

          let ele_pvalue = await tryto(`[${index}].${ele_pname}`, async () => await parse(sub_matedata, sub_obj))
          if (ele_pvalue === undefined) continue
          sub_config[ele_pname] = ele_pvalue
        }
      }
      return sub_config;
    })
    return await Promise.all(sub_config_promises)
  } else {
    // 2.3. 对象递归校验（Object）
    let config = {};
    // 2.3.1. 动态属性
    if (Object.hasOwnProperty.call(matedata.properties, ANY_TOKEN)) {
      let sub_matedata = matedata.properties[ANY_TOKEN]
      for (let pname in obj) {
        if (Object.hasOwnProperty.call(obj, pname)) {
          let sub_obj = obj[pname];

          let pvalue = await tryto(pname, async () => await parse(sub_matedata, sub_obj))
          if (pvalue === undefined) continue
          config[pname] = pvalue
        }
      }
      return config
    }

    // 2.3.2. 固定属性
    for (let pname in matedata.properties) {
      if (Object.hasOwnProperty.call(matedata.properties, pname)) {
        let sub_matedata = matedata.properties[pname]
        let sub_obj = obj[pname]

        let pvalue = await tryto(pname, async () => await parse(sub_matedata, sub_obj))
        if (pvalue === undefined) continue
        config[pname] = pvalue
      }
    }
    return config;
  }
}

async function tryto(name, action) {
  try {
    return await action();
  } catch (e) {
    throw e.startsWith('.') ? `.${name}${e}` : `.${name} ${e}`;
  }
}

export async function parser(matedata, obj) {
  try {
    return await parse(matedata, obj ? obj : {});
  } catch (e) {
    console.error('Failed to load config: ' + (e.startsWith('.') ? e.substring(1) : e));
  }
}
