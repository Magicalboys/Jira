import React from "react";
import { Raw } from "../../type";
import { Select } from "antd";
// typeof Select
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "options" | "value" | "onChange"> {
  value: Raw | null | undefined;
  // 将传进来的id 无论什么类型都转成 number
  onChange: (value?: number) => void;
  // 默认值
  defaultOptionName?: string;
  //
  options?: { name: string; id: number }[];
}

// value 可以传入多种类型的值
// onChang只会回调 number 、undefined 类型
// 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
// 当 选择默认类型的时候,onChange 会回调 undefined

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}> {defaultOptionName} </Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
