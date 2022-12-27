import React from "react";

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);

  // name = 项目管理的项目
  // const arr = strs.split('项目')
  // arr = ,管理的,

  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "rgb(84,219,108)" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
