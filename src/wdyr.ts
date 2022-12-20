import React from "react";
// 出现无线循环的原因是因为 依赖是新创建的对象

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    // 指定不是跟踪所有的组件 而是确定的某一组件
    trackAllPureComponents: true,
  });
}
