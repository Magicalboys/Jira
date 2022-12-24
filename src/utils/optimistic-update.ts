import React from "react";
import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 乐观更新

    // 一旦执行useMutation后就会触发,
    async onMutate(target: any) {
      // 获取更新前的历史数据
      const previousItems = queryClient.getQueryData(queryKey);
      // 更新缓存里的数据
      queryClient.setQueriesData(queryKey, (old?: any[]) => {
        //先查找，在更新 将 project 更新成 target
        return callback(target, old);
      });
      // 将更新前的历史数据返回  可以在 context 属性里面读取
      return { previousItems };
    },
    // 回滚机制
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueriesData(queryKey, context.previousItems);
    },
  };
};
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
