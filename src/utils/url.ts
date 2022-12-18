// 返回页面 url 中，指定键的参数值

import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    keys.reduce((prev: { [p: string]: string }, key: string) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParams,
  ] as const;
};
