"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The work carousel pulls in 8 project hero images + carousel JS. Mount it only
// when the user scrolls near it, so none of that touches the initial mobile load.
const Work = dynamic(() => import("@/components/Work"), {
  ssr: false,
  loading: () => <div aria-hidden className="min-h-[600px]" />,
});

export default function LazyWork() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? <Work /> : <div aria-hidden className="min-h-[600px]" />}
    </div>
  );
}
