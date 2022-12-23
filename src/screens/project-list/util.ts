import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

// 项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

//  URL全局状态管理
export const useProjectsModel = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  // 当返回值较多时，使用对象来传递
  return {
    projectModalOpen: projectCreate == "true",
    open,
    close,
  };
};
