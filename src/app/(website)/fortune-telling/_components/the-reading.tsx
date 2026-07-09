"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, Sparkles, ScrollText, Swords } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FortuneHistoryItem,
  fortuneTellingService,
} from "@/lib/api/fortune-telling-service";

type CardData = {
  id: string;
  symbol: string;
  name: string;
  title: string;
  icon: React.ReactNode;
};

const CARDS_DATA: CardData[] = [
  {
    id: "ahura",
    symbol: "AHURA",
    name: "Ahura",
    title: "Above",
    icon: (
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
    ),
  },
  {
    id: "ares",
    symbol: "ARES",
    name: "Ares",
    title: "Arms",
    icon: <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />,
  },
  {
    id: "asgard",
    symbol: "ASGARD",
    name: "Asgard",
    title: "Angel",
    icon: <path d="M12 2l9 7-9 7-9-7 9-7zm0 11l9 7-9 7-9-7 9-7z" />,
  },
  {
    id: "enki",
    symbol: "ENKI",
    name: "Enki",
    title: "Rain",
    icon: (
      <path d="M2 12h3a4 4 0 0 1 4 4 4 4 0 0 0 4 4h1a4 4 0 0 0 4-4 4 4 0 0 1 4-4h3M2 6h3a4 4 0 0 1 4 4 4 4 0 0 0 4 4h1a4 4 0 0 0 4-4 4 4 0 0 1 4-4h3" />
    ),
  },
  {
    id: "gaia",
    symbol: "GAIA",
    name: "Gaia",
    title: "Earth",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10M2 12h20" />
      </>
    ),
  },
  {
    id: "hera",
    symbol: "HERA",
    name: "Hera",
    title: "Prize",
    icon: <path d="M6 3h12v3H6zm2 3h8v12H8zm-3 12h14v3H5z" />,
  },
  {
    id: "laozi",
    symbol: "LAOZI",
    name: "Laozi",
    title: "Leaf",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 0 20M2 12h20" />
      </>
    ),
  },
  {
    id: "mitra",
    symbol: "MITRA",
    name: "Mitra",
    title: "Mist",
    icon: (
      <path d="M3 15c2.2-2.2 4.2-3.3 6-3.3 2.1 0 3.4 1.2 5 1.2 1.7 0 3-.9 7-4" />
    ),
  },
  {
    id: "setna",
    symbol: "SETNA",
    name: "Setna",
    title: "Stone",
    icon: (
      <path d="M12 3.5c2.5 3 5.5 6.6 5.5 10.1A5.5 5.5 0 1 1 6.5 13.6c0-3.5 3-7.1 5.5-10.1Z" />
    ),
  },
  {
    id: "shaman",
    symbol: "SHAMAN",
    name: "Shaman",
    title: "Stream",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v20M2 12h20" />
      </>
    ),
  },
  {
    id: "shiva",
    symbol: "SHIVA",
    name: "Shiva",
    title: "Shot",
    icon: <path d="M18 6 6 18M6 6l12 12" />,
  },
  {
    id: "titan",
    symbol: "TITAN",
    name: "Titan",
    title: "Trace",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M12 4v16" />
      </>
    ),
  },
  {
    id: "zigi",
    symbol: "ZIGI",
    name: "Zigi",
    title: "Veil",
    icon: (
      <>
        <path d="M4 12c2.4-4 5-6 8-6s5.6 2 8 6c-2.4 4-5 6-8 6s-5.6-2-8-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_OUT,
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

function isSameLocalDay(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function formatFortuneDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string | string[] }>;
  const message = axiosError.response?.data?.message;

  if (Array.isArray(message)) {
    return message[0] || fallback;
  }

  return message || (error as Error)?.message || fallback;
}

export default function TheReading() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [activeFortune, setActiveFortune] = useState<FortuneHistoryItem | null>(
    null,
  );

  const accessToken =
    session?.accessToken || session?.user?.accessToken || null;
  const hasToken = Boolean(accessToken);

  const historyQuery = useQuery({
    queryKey: ["fortune-telling", "my-history"],
    queryFn: () => fortuneTellingService.getMyHistory(),
    enabled: status === "authenticated" && hasToken,
  });

  const history = historyQuery.data?.data || [];
  const todayFortune = history.find((entry) => isSameLocalDay(entry.createdAt));
  const displayedFortune = activeFortune ?? todayFortune ?? null;

  const revealMutation = useMutation({
    mutationFn: (symbols: string[]) => fortuneTellingService.reveal(symbols),
    onSuccess: async (response) => {
      const revealed: FortuneHistoryItem = {
        _id: `local-${Date.now()}`,
        userId: "me",
        symbols: response.data.symbols,
        fortune: response.data.fortune,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setActiveFortune(revealed);
      setIsResultDialogOpen(true);
      toast.success("Your fortune has been revealed.");
      setSelectedCards([]);
      setSelectedOrder([]);

      await queryClient.invalidateQueries({
        queryKey: ["fortune-telling", "my-history"],
      });
    },
    onError: (error) => {
      const message = getApiErrorMessage(
        error,
        "Unable to reveal your fortune right now.",
      );

      if (
        message.toLowerCase().includes("already received your fortune today")
      ) {
        toast.error(message);
        if (todayFortune) {
          setActiveFortune(todayFortune);
          setIsResultDialogOpen(true);
        }
        return;
      }

      toast.error(message);
    },
  });

  const selectedCardDetails = selectedOrder
    .map((id) => CARDS_DATA.find((card) => card.id === id))
    .filter(Boolean) as CardData[];

  const canReveal = selectedCards.length === 3 && !revealMutation.isPending;
  const openHistory = () => {
    if (!hasToken) {
      setIsAuthDialogOpen(true);
      return;
    }

    setIsHistoryDialogOpen(true);
  };

  const openTodayFortune = () => {
    if (todayFortune) {
      setActiveFortune(todayFortune);
      setIsResultDialogOpen(true);
      return;
    }

    if (!hasToken) {
      setIsAuthDialogOpen(true);
      return;
    }

    if (selectedCardDetails.length !== 3) {
      toast.error("Choose three cards to reveal your fortune.");
      return;
    }

    revealMutation.mutate(selectedCardDetails.map((card) => card.symbol));
  };

  const handleCardClick = (id: string) => {
    if (todayFortune) {
      toast.message(
        "You've already revealed today's fortune. View it from the panel.",
      );
      return;
    }

    if (selectedCards.includes(id)) {
      setSelectedCards((prev) => prev.filter((cardId) => cardId !== id));
      setSelectedOrder((prev) => prev.filter((cardId) => cardId !== id));
      return;
    }

    if (selectedCards.length >= 3) {
      toast.error("You can only choose three cards.");
      return;
    }

    setSelectedCards((prev) => [...prev, id]);
    setSelectedOrder((prev) => [...prev, id]);
  };

  return (
    <>
      <motion.section
        id="fortune-reading"
        className="relative scroll-mt-28 text-[#f2eadf]"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="space-y-3" variants={itemVariants}>
          <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
            — the reading —
          </span>
          <h2 className="font-serif text-[44px] font-light leading-none tracking-[-0.04em] text-[#f3e9da] sm:text-[56px]">
            Step into the circle.
          </h2>
          <p className="max-w-[460px] text-[14px] leading-[1.8] text-[#a7b2ae]">
            Tap a card to claim it. Your first is the past, your second is the
            present, your third is what comes.
          </p>
        </motion.div>

        <AnimatePresence>
          {(selectedOrder.length > 0 ||
            Boolean(todayFortune) ||
            revealMutation.isPending) && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mx-auto mt-6 w-full max-w-[820px] rounded-[2px] border border-[#2b3c40] bg-[linear-gradient(180deg,rgba(16,26,28,0.95),rgba(12,20,22,0.95))] p-4 sm:p-5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[320px]">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#c9803d]">
                    <Sparkles className="h-4 w-4" />
                    <span>Ritual status</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-6 text-[#a0acab]">
                    {todayFortune
                      ? "Today's reading is already sealed. Re-open it or browse your history."
                      : hasToken
                        ? "Your chosen symbols are locked in. Reveal the omen when you are ready."
                        : "Choose your cards first. You will need to log in before the API can reveal and save the reading."}
                  </p>
                </div>

                <div className="grid flex-1 gap-2 sm:grid-cols-3">
                  {[0, 1, 2].map((slotIndex) => {
                    const card = selectedCardDetails[slotIndex];

                    return (
                      <div
                        key={slotIndex}
                        className="flex items-center justify-between border border-[#334244] bg-[#171f21]/90 px-3 py-3"
                      >
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.22em] text-[#738381]">
                            {slotIndex === 0
                              ? "past"
                              : slotIndex === 1
                                ? "present"
                                : "path"}
                          </p>
                          <p className="mt-1 font-serif text-[16px] text-[#efe4d4]">
                            {card?.name || "Awaiting a symbol"}
                          </p>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#ad8f73]">
                          {card?.symbol || "--"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <motion.button
                  type="button"
                  whileHover={canReveal ? { y: -2, scale: 1.01 } : undefined}
                  whileTap={canReveal ? { scale: 0.98 } : undefined}
                  onClick={openTodayFortune}
                  disabled={!canReveal && !todayFortune}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-[#e2974b] bg-[#e2974b] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#1b1713] transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {revealMutation.isPending ? (
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Swords className="h-3.5 w-3.5" />
                  )}
                  {todayFortune ? "View today's fortune" : "Reveal the omen"}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openHistory}
                  className="rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#ced4ce] transition-colors hover:border-[#68777a]"
                >
                  View history
                </motion.button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCards([]);
                    setSelectedOrder([]);
                  }}
                  className="rounded-[2px] border border-transparent px-2 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#7c8a89] transition-colors hover:text-[#efe4d4]"
                >
                  Reset picks
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="relative mt-12 flex min-h-[560px] items-center justify-center"
          variants={itemVariants}
        >
          <div className="pointer-events-none absolute h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(28,87,96,0.24),rgba(13,24,27,0)_72%)] blur-3xl" />

          <motion.div
            className="pointer-events-none absolute h-[430px] w-[430px] rounded-full sm:h-[520px] sm:w-[520px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, ease: EASE_LINEAR, repeat: Infinity }}
          >
            <div className="absolute inset-0 rounded-full border border-[#37545b]/75 shadow-[0_0_90px_rgba(19,60,66,0.16)]" />
            <div className="absolute inset-[34px] rounded-full border border-[#2d464b]/60" />
            <div className="absolute inset-[72px] rounded-full border border-[#25393e]/45" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#355157]/45" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#355157]/45" />
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-[1px] w-4 origin-left bg-[#55777d]/70"
                style={{ transform: `rotate(${i * 30}deg) translateX(210px)` }}
              />
            ))}
          </motion.div>

          <motion.div
            className="pointer-events-none absolute z-20 flex flex-col items-center text-center"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: EASE_IN_OUT }}
          >
            <div className="font-serif text-[28px] font-light tracking-[0.18em] text-[#e9a35b]">
              {todayFortune ? "1/1" : `${selectedCards.length}/3`}
            </div>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.3em] text-[#738381]">
              {todayFortune ? "today sealed" : "selected"}
            </span>
          </motion.div>

          <div className="relative z-10 grid w-full max-w-[580px] grid-cols-4 gap-3 sm:gap-4">
            {CARDS_DATA.map((card, index) => {
              const isSelected = selectedCards.includes(card.id);
              const isLocked = Boolean(todayFortune);
              const needsCenterOffset =
                index === CARDS_DATA.length - 1 && CARDS_DATA.length % 4 === 1;

              return (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card.id)}
                  className={`group flex aspect-[0.76] cursor-pointer select-none flex-col items-center justify-center rounded-[2px] border bg-[linear-gradient(180deg,rgba(58,35,24,0.98),rgba(44,26,18,0.98))] px-2 py-3 text-center transition-all duration-200 ${
                    isSelected
                      ? "border-[#f0a95d] bg-[#4b2d1f] shadow-[0_0_0_1px_rgba(240,169,93,0.18)]"
                      : "border-[#6a4530] hover:border-[#9b6a45]"
                  } ${isLocked ? "cursor-not-allowed opacity-80" : ""} ${
                    needsCenterOffset
                      ? "col-start-2 sm:col-start-auto lg:col-start-2"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.35,
                    ease: EASE_OUT,
                    delay: index * 0.03,
                  }}
                  whileHover={!isLocked ? { y: -4, scale: 1.03 } : undefined}
                  whileTap={!isLocked ? { scale: 0.98 } : undefined}
                  animate={
                    isSelected
                      ? {
                          y: -6,
                          boxShadow: "0 0 44px rgba(240, 169, 93, 0.18)",
                        }
                      : { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                  }
                >
                  <svg
                    className={`h-[18px] w-[18px] fill-none stroke-[1.1] transition-colors ${
                      isSelected
                        ? "stroke-[#f0a95d]"
                        : "stroke-[#f0e0c8]/82 group-hover:stroke-[#fff4e5]"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>

                  <h3
                    className={`mt-3 font-serif text-[13px] leading-none tracking-[0.01em] ${
                      isSelected ? "text-[#fff3e3]" : "text-[#f3e9da]"
                    }`}
                  >
                    {card.name}
                  </h3>

                  <span className="mt-1 text-[8px] tracking-[0.18em] text-[#c8a07b]">
                    {card.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.section>

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="border border-[#2b383a] bg-[#0f191c] text-[#efe4d4] sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-[30px] font-light text-[#efe4d4]">
              Login to reveal your fortune
            </DialogTitle>
            <DialogDescription className="text-[13px] leading-6 text-[#9daba8]">
              The backend saves one reading per day for each user, so this API
              flow needs your account token before it can reveal or load
              history.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="rounded-[2px] border border-[#e2974b] bg-[#e2974b] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#1b1713]"
            >
              Go to login
            </button>
            <Link
              href="/signup"
              className="rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#ced4ce]"
            >
              Create account
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="border border-[#2b383a] bg-[#0f191c] text-[#efe4d4] sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-[32px] font-light text-[#efe4d4]">
              Revealed Fortune
            </DialogTitle>
            <DialogDescription className="text-[12px] uppercase tracking-[0.22em] text-[#c9803d]">
              {displayedFortune
                ? `${displayedFortune.symbols.join(" • ")} • ${formatFortuneDate(displayedFortune.createdAt)}`
                : "Your omen is loading"}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            <motion.div
              key={
                displayedFortune?._id ||
                displayedFortune?.createdAt ||
                "fortune"
              }
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="max-h-[60vh] space-y-4 overflow-y-auto pr-2"
            >
              {displayedFortune?.fortune.split("\n").map((paragraph, index) =>
                paragraph.trim() ? (
                  <p
                    key={`${displayedFortune.createdAt}-${index}`}
                    className={`leading-7 ${
                      index === 0
                        ? "font-serif text-[24px] text-[#dd9448]"
                        : "text-[14px] text-[#cdd5cf]"
                    }`}
                  >
                    {paragraph.trim()}
                  </p>
                ) : null,
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="border border-[#2b383a] bg-[#0f191c] text-[#efe4d4] sm:max-w-[780px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-[30px] font-light text-[#efe4d4]">
              Your Fortune History
            </DialogTitle>
            <DialogDescription className="text-[13px] leading-6 text-[#9daba8]">
              Every revealed reading saved by `/fortune-telling/my-history`.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-2">
            {historyQuery.isLoading ? (
              <div className="flex items-center gap-2 text-[13px] text-[#9daba8]">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Loading your history...
              </div>
            ) : history.length ? (
              history.map((entry) => (
                <button
                  key={entry._id}
                  type="button"
                  onClick={() => {
                    setActiveFortune(entry);
                    setIsHistoryDialogOpen(false);
                    setIsResultDialogOpen(true);
                  }}
                  className="w-full border border-[#233033] bg-[#151f22]/85 p-4 text-left transition-colors hover:border-[#355056]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c9803d]">
                      <ScrollText className="h-3.5 w-3.5" />
                      <span>{entry.symbols.join(" • ")}</span>
                    </div>
                    <span className="text-[11px] text-[#7c8a89]">
                      {formatFortuneDate(entry.createdAt)}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-[#cdd5cf]">
                    {entry.fortune}
                  </p>
                </button>
              ))
            ) : (
              <div className="border border-dashed border-[#2a3335] p-5 text-[13px] leading-6 text-[#9daba8]">
                No saved fortunes yet. Choose three cards and reveal your first
                reading.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
