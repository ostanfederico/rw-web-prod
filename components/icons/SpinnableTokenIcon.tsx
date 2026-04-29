"use client";

import { useState } from "react";
import { TokenIcon } from "./TokenIcon";

export function SpinnableTokenIcon({ symbol, size = 96 }: { symbol: string; size?: number }) {
  const [spinning, setSpinning] = useState(false);

  return (
    <>
      <style>{`
        @keyframes token-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(3600deg); }
        }
        .token-spin {
          animation: token-spin 0.8s cubic-bezier(0.2, 0, 0.4, 1) forwards;
        }
      `}</style>
      <div
        className={spinning ? "token-spin" : ""}
        key={spinning ? "spinning" : "idle"}
        onAnimationEnd={() => setSpinning(false)}
        onClick={() => { if (!spinning) setSpinning(true); }}
        style={{ cursor: "pointer", display: "inline-flex" }}
      >
        <TokenIcon symbol={symbol} size={size} />
      </div>
    </>
  );
}
