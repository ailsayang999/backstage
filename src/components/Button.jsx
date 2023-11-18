import React from "react";
import className from "classnames";

function Button({ children, primary, warning }) {
  const classNames = className(
    "px-3 py-1.5",
    {
      "bg-sky-400": primary,
      "bg-red-600": warning,
    },
    "border border-blue-600",
    { "text-white": primary, "text-amber-400": warning }
  );
  return <button classNameName={classNames}>{children}</button>;
}

export default Button;
