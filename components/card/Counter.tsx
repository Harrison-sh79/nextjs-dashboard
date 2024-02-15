import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function Counter({ from = 0, to, toFixedVal = 0 }: any) {
  const nodeRef = useRef();

  useEffect(() => {
    const node: any = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Number(value.toFixed(toFixedVal)).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef as any} />;
}
