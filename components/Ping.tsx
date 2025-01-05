import React from "react";

const Ping = () => {
  return (
    <div className="relative inline-flex">
      <div className="size-3 rounded-full bg-red-500" />
      <div className="absolute left-0 top-0 size-3 animate-ping rounded-full bg-red-500" />
      <div className="absolute left-0 top-0 size-3 animate-pulse rounded-full bg-red-500" />
    </div>
  );
};

export default Ping;
