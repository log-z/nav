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
    throw new Error('is required.')
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
  const type = (obj === null) ? null : typeof obj;
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
    } catch {
      throw new Error(`can not cast \`${obj}\` from [${type}] to [${matedata.type}].`);
    }
  } else if (matedata.type === Array) {
    // 2.2. 数组校验（Array）
    if (!Array.isArray(obj)) {
      throw new Error(`${obj} is not a Array, type "${type}".`);
    }

    // 2.2.1. 数组元素校验：基本类型
    if ([String, Number, Boolean].includes(matedata.element)) {
      const eleType = matedata.element.name.toLowerCase();
      const errorNum = obj.filter(ele => typeof ele !== eleType).length;
      if (errorNum !== 0) {
        throw new Error(`${obj} is not a Array[${matedata.element}].`);
      }
      return obj;
    }

    // 2.2.2. 数组元素校验：对象
    const subConfigPromises = obj.map(async (ele, index) => {
      const subConfig = {};
      for (const [elePname, subMatedata] of Object.entries(matedata.element)) {
        const elePvalue = await tryto(`[${index}].${elePname}`, () => parse(subMatedata, ele[elePname]))
        if (elePvalue === undefined) continue
        subConfig[elePname] = elePvalue
      }
      return subConfig;
    })
    return await Promise.all(subConfigPromises)
  } else {
    // 2.3. 对象递归校验（Object）
    const config = {};
    // 2.3.1. 动态属性
    if (Object.hasOwn(matedata.properties, ANY_TOKEN)) {
      const subMatedata = matedata.properties[ANY_TOKEN]
      for (const [pname, subObj] of Object.entries(obj)) {
        const pvalue = await tryto(pname, () => parse(subMatedata, subObj))
        if (pvalue === undefined) continue
        config[pname] = pvalue
      }
      return config
    }

    // 2.3.2. 固定属性
    for (const [pname, subMatedata] of Object.entries(matedata.properties)) {
      const pvalue = await tryto(pname, () => parse(subMatedata, obj[pname]))
      if (pvalue === undefined) continue
      config[pname] = pvalue
    }
    return config;
  }
}

async function tryto(name, action) {
  try {
    return await action();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw new Error(msg.startsWith('.') ? `.${name}${msg}` : `.${name} ${msg}`);
  }
}

export async function parser(matedata, obj) {
  try {
    return await parse(matedata, obj ?? {});
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('Failed to load config: ' + (msg.startsWith('.') ? msg.substring(1) : msg));
  }
}
