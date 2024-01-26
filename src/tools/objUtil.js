// 判断对象是否不为空或未定义
export function isNotEmpty(obj) {
  return obj !== undefined && obj !== null && Object.keys(obj).length > 0;
}

// 转换checkbox列表为 obj
export function arrayToObject(arr, keyField, valueField) {
  return arr.reduce((acc, item) => {
    acc[item[keyField]] = item[valueField];
    return acc;
  }, {});
}
