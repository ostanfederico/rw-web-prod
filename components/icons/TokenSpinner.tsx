"use client";

import { useEffect, useState, type ReactNode } from "react";

export function TokenSpinner({
  size = 120,
  bgColor,
  label,
  children,
}: {
  size?: number;
  bgColor: string;
  label: string;
  children: ReactNode;
}) {
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let spinTimeout: ReturnType<typeof setTimeout>;
    let pauseTimeout: ReturnType<typeof setTimeout>;

    function startCycle() {
      setSpinning(true);
      spinTimeout = setTimeout(() => {
        setSpinning(false);
        pauseTimeout = setTimeout(startCycle, 5000);
      }, 1500);
    }

    startCycle();
    return () => {
      clearTimeout(spinTimeout);
      clearTimeout(pauseTimeout);
    };
  }, []);

  return (
    <div style={{ display: "inline-block" }}>
      <style>{`
        @keyframes spin10 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(3600deg); }
        }
        .token-spin {
          animation: spin10 1.5s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
      `}</style>
      <svg
        key={spinning ? "spinning" : "idle"}
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={spinning ? "token-spin" : ""}
        aria-label={label}
      >
        <circle cx="32" cy="32" r="32" fill={bgColor} />
        {children}
      </svg>
    </div>
  );
}
