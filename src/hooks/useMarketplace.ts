import { useMemo } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from "wagmi";
import { ogMainnet } from "@/lib/chain";
import {
  MARKETPLACE_ADDRESS,
  marketplaceAbi,
  DEMO_AGENTS,
  type Agent,
} from "@/lib/contracts/marketplace";

const ZERO = "0x0000000000000000000000000000000000000000";
const isContractDeployed = MARKETPLACE_ADDRESS.toLowerCase() !== ZERO;

export function useAgents() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getAllAgents",
    query: { enabled: isContractDeployed },
  });

  const agents = useMemo<Agent[]>(() => {
    if (!isContractDeployed) return DEMO_AGENTS;
    return (data ?? []) as unknown as Agent[];
  }, [data]);

  return {
    agents,
    isLoading: isContractDeployed ? isLoading : false,
    error,
    refetch,
    isDemo: !isContractDeployed,
  };
}

export function useAgent(id: bigint | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: marketplaceAbi,
    functionName: "getAgent",
    args: id !== undefined ? [id] : undefined,
    query: { enabled: isContractDeployed && id !== undefined },
  });

  const agent: Agent | undefined = useMemo(() => {
    if (!isContractDeployed) return DEMO_AGENTS.find((a) => a.id === id);
    return data as unknown as Agent | undefined;
  }, [data, id]);

  return { agent, isLoading: isContractDeployed ? isLoading : false, error, isDemo: !isContractDeployed };
}

export function usePurchaseAgent() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const purchase = (agent: Agent) =>
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "purchaseAgent",
      args: [agent.id],
      value: agent.price,
    });

  return {
    purchase,
    hash,
    isPending,
    isConfirming: receipt.isLoading,
    isSuccess: receipt.isSuccess,
    error: error ?? receipt.error,
    reset,
    isDemo: !isContractDeployed,
  };
}

export function useListAgent() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const list = (input: { name: string; description: string; category: string; priceWei: bigint }) =>
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: marketplaceAbi,
      functionName: "listAgent",
      args: [input.name, input.description, input.category, input.priceWei],
    });

  return {
    list,
    hash,
    isPending,
    isConfirming: receipt.isLoading,
    isSuccess: receipt.isSuccess,
    error: error ?? receipt.error,
    reset,
    isDemo: !isContractDeployed,
  };
}

export function useEnsureOgChain() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const onCorrectChain = chainId === ogMainnet.id;
  const ensure = () => {
    if (!onCorrectChain) switchChain({ chainId: ogMainnet.id });
  };
  return { onCorrectChain, ensure, isPending };
}
