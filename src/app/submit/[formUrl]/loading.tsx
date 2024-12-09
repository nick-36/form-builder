import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="container flex items-center justify-center min-w-full min-h-screen">
      <ImSpinner2 className="animate-spin h-12 w-12 " />
    </div>
  );
};

export default Loading;
