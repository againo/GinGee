// 判断对象是否不为空或未定义
export function isNotEmpty(obj) {
  return obj !== undefined && obj !== null && Object.keys(obj).length > 0;
}

