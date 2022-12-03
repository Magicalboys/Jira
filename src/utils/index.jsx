/*清除空对象*/

// 考虑 value 等于0的情况，!!value 意思是将value转化成布尔值
export const isNull = (value) =>value === 0 ? false : !value

// 在一个函数中，改变传入对象本身是不好的
export const clearnObject = (object) =>{
  const result = {...object}// 将传入的对象进行浅拷贝
  Object.keys(result).forEach(keys =>{
    const value  = result[keys]
    //0
    if(isNull(value)){
      delete result[keys]
    }
  })
  return result;
}