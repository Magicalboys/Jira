import { useEffect, useRef, useState } from "react";

//1. 清除空对象。

// 考虑 value 等于0的情况，!!value 意思是将value转化成布尔值
export const isNull = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数中，改变传入对象本身是不好的。

//先声明键的类型 再声明值的类型
export const clearnObject = (object?: { [key: string]: unknown }) => {
  const result = { ...object }; // 将传入的对象进行浅拷贝
  Object.keys(result).forEach((keys) => {
    const value = result[keys];
    //0
    if (isVoid(value)) {
      delete result[keys];
    }
  });
  return result;
};

// 2.初始化users
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO:依赖
  }, []);
};

//3.通过自定义hook实现Debounce
export const useDebounce = <V,>(value: V, delay?: number): V => {
  // 为value 设置一个新的状态，改变其更新频率
  const [deboucedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次在value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    //每次在上一个userEffect处理完以后再在运行,
    //意味着每次都清理上一个userEffect设置的定时器，只有最后设置的定时器没被清理，会被保留下来
    return () => clearTimeout(timeout);
  }, [value, delay]); //每当 value 变化时执行

  // 将 value 成功转化成了 deboucedValue ,也降低了其更新频率
  return deboucedValue;
};

// 自动显示标题 当页面回退后 标题需要自动退回
export const useDocumentTitle = (
  title: string,
  keepOnumount: boolean = true
) => {
  // 页面刚加载的标题
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnumount) {
        document.title = oldTitle;
      }
    };
  });
};
// 重置路由，切换值跟路由
export const resetRoute = () => {
  window.location.href = window.location.origin;
};

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
