import { useQuery } from "react-query";
import { Kanban } from "../type/kanban";
import { Project } from "../type/project";
import { useHttp } from "./http";
// 获取 kanban 列表的 hook

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // 设置一个id 和一个依赖
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
