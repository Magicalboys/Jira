import React, { useState } from "react";
import { useMountedRef } from ".";
// 用方便的方式来管理异步操作

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
  //异步操作四个状态:还没发生 正在发生 出现错误 执行成功
}
// 一开始默认的 state
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
export const useAsync = <D>(initialState?: State<D>) => {
  const mountedRef = useMountedRef();

  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // run 用于触发异步请求
  const run = (promise: Promise<D>) => {
    //如果传进来的为空,或者根本不是promise，直接抛出异常
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    // 表示异步操作已经开始
    setState({ ...state, stat: "loading" });

    return (
      promise
        // 如果操作成功 将数据保存下来
        .then((data) => {
          // mountedRef.current 为 true 表示 组件已经被挂载并且不是被卸载的状态
          if (mountedRef.current) {
            setData(data);
          }

          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        })
    );
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSucess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
