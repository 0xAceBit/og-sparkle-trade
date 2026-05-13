import { formatEther } from "viem";

export const truncateAddress = (addr?: string, size = 4) =>
  addr ? `${addr.slice(0, 2 + size)}…${addr.slice(-size)}` : "";

export const formatOG = (wei?: bigint, fractionDigits = 3) => {
  if (wei === undefined) return "—";
  const n = Number(formatEther(wei));
  if (Number.isNaN(n)) return "—";
  return `${n.toLocaleString(undefined, {
    maximumFractionDigits: fractionDigits,
  })} 0G`;
};
