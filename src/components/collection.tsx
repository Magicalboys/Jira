import React from "react";
import { Rate } from "antd";
// 将 Rete 封装成组件 并对属性进行扩展
interface CollectionProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export const Collection = (props: CollectionProps) => {
  const { checked, onCheckedChange, ...restProps } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      // !!num 就是将 num 强转为 Boolean
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
