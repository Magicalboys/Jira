// URL状态管理:返回页面 url 中，指定键的参数值

import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { clearnObject, subset } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // useSearchParams 用于读取 URL param 自带的 hook
  // searchParams:URL后面所带的所有参数的信息,不可以直接读取 需要用 自带的get方法
  const [searchParams] = useSearchParams();

  const setSearchParams = useSetUrlSearchParam();

  const [stateKeys] = useState(keys);

  return [
    // useMemo 避免每一次组件渲染时都会产生一个新的对象 进而导致 循环依赖问题
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      // [ key ] 表示key 是个变量
      // 因为泛型的设置导致了 initvalue 返回的是什么类型,useUrlQueryParam 就会推断为什么类型
      // 如果 不强制 指定 为 string对象类型的话,就默认为 推断空对象 所以需要用 as
      // 依赖项为 searchParams 改变的时候 才会发送渲染
      // 而 searchParams 仅是一个状态 不会因为每次的渲染导致自身发生变化
      [searchParams, stateKeys]
    ),
    //  对 setParam传入的键值 进行限制 只能是初始化的传进useUrlQueryParam键值 即 [key in K]
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    // fromEntries 把url参数转换成一个对象,然后在被 新传入的 param覆盖
    // fromEntries(iterable)
    const o = clearnObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    // 改变url参数·
    return setSearchParams(o);
  };
};
