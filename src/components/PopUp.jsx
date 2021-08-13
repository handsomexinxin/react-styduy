import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PopUp() {
  const [node] = useState(window.document.createElement("div"));
  useEffect(() => {
    window.document.body.appendChild(node);
    return () => {
      window.document.body.removeChild(node);
    };
  }, [node]);

  return createPortal(<div className={['pop_up_box', 'border'].join(" ")} >弹窗</div>, node);
}
