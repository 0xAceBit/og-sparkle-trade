import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Agent } from "@/lib/contracts/marketplace";
import { formatOG, truncateAddress } from "@/lib/format";

export function AgentCard({ agent, index = 0 }: { agent: Agent; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/agents/$id"
        params={{ id: agent.id.toString() }}
        className="group flex h-full flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-foreground"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {agent.category}
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </div>
          <h3 className="mt-6 font-display text-3xl leading-tight">{agent.name}</h3>
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {agent.description}
          </p>
        </div>
        <div className="mt-8 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Price</p>
            <p className="mt-1 font-display text-xl">{formatOG(agent.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Owner</p>
            <p className="mt-1 font-mono text-xs text-foreground">
              {truncateAddress(agent.owner)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function AgentCardSkeleton() {
  return (
    <div className="h-72 animate-pulse border border-border bg-muted/40" />
  );
}
