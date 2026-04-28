import Image from "next/image";

export function TokenIcon({ symbol, size = 96 }: { symbol: string; size?: number }) {
  return (
    <Image
      src={`/tokens/${symbol.toLowerCase()}.svg`}
      alt={symbol}
      width={size}
      height={size}
      unoptimized
    />
  );
}
