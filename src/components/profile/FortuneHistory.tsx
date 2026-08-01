"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Clock3, ScrollText } from "lucide-react";
import { fortuneTellingService } from "@/lib/api/fortune-telling-service";

const formatFortuneDate = (dateString: string) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));

const FortuneHistory = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fortune-telling", "my-history"],
    queryFn: () => fortuneTellingService.getMyHistory(),
  });
  const history = data?.data ?? [];

  if (isLoading) {
    return <div className="py-12 text-center text-sm text-slate-500">Loading fortune history…</div>;
  }

  if (isError) {
    return <div className="py-12 text-center text-sm text-rose-600">Failed to load fortune history.</div>;
  }

  return (
    <section className="w-full">
      <div className="mb-6 border-b border-slate-100 pb-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Fortune history</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">Look back on every fortune you&apos;ve revealed.</p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-sm text-slate-500">
          No fortune readings found yet.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => {
            const isExpanded = expandedId === entry._id;

            return (
              <article key={entry._id} className="overflow-hidden  border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : entry._id)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-slate-50 sm:p-5"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <ScrollText className="h-4 w-4 shrink-0 text-cyan-700" />
                      {entry.symbols.map((symbol) => (
                        <span key={symbol} className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-cyan-800">
                          {symbol}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" />
                      {formatFortuneDate(entry.createdAt)}
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-5 sm:px-5">
                    <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{entry.fortune}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FortuneHistory;
