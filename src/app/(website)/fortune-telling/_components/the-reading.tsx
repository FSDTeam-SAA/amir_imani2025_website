"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, ScrollText, Sparkles } from "lucide-react";
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
  imageSrc: string;
};

const CARDS_DATA: CardData[] = [
  {
    id: "ahura",
    symbol: "AHURA",
    name: "Ahura",
    title: "Above",
    imageSrc: "/shapes/ahuraa.svg",
  },
  {
    id: "ares",
    symbol: "ARES",
    name: "Ares",
    title: "Arms",
    imageSrc: "/shapes/ares.svg",
  },
  {
    id: "asgard",
    symbol: "ASGARD",
    name: "Asgard",
    title: "Angel",
    imageSrc: "/shapes/asgrad.svg",
  },
  {
    id: "enki",
    symbol: "ENKI",
    name: "Enki",
    title: "Rain",
    imageSrc: "/shapes/enki.svg",
  },
  {
    id: "gaia",
    symbol: "GAIA",
    name: "Gaia",
    title: "Earth",
    imageSrc: "/shapes/gaia.svg",
  },
  {
    id: "hera",
    symbol: "HERA",
    name: "Hera",
    title: "Prize",
    imageSrc: "/shapes/hera.svg",
  },
  {
    id: "laozi",
    symbol: "LAOZI",
    name: "Laozi",
    title: "Leaf",
    imageSrc: "/shapes/laozi.svg",
  },
  {
    id: "mitra",
    symbol: "MITRA",
    name: "Mitra",
    title: "Mist",
    imageSrc: "/shapes/mitra.svg",
  },
  {
    id: "setna",
    symbol: "SETNA",
    name: "Setna",
    title: "Stone",
    imageSrc: "/shapes/setna.svg",
  },
  {
    id: "shaman",
    symbol: "SHAMAN",
    name: "Shaman",
    title: "Stream",
    imageSrc: "/shapes/shaman.svg",
  },
  {
    id: "shiva",
    symbol: "SHIVA",
    name: "Shiva",
    title: "Shot",
    imageSrc: "/shapes/shiva.svg",
  },
  {
    id: "titan",
    symbol: "TITAN",
    name: "Titan",
    title: "Trace",
    imageSrc: "/shapes/titan.svg",
  },
  {
    id: "zigi",
    symbol: "ZIGI",
    name: "Zigi",
    title: "Veil",
    imageSrc: "/shapes/zigi.svg",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

function shuffleCards(cards: CardData[]) {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledCards[index], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[index],
    ];
  }

  return shuffledCards;
}

function createCardRows() {
  const shuffledCards = shuffleCards(CARDS_DATA);

  return [
    shuffledCards.slice(0, 4),
    shuffledCards.slice(4, 9),
    shuffledCards.slice(9, 13),
  ];
}

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

function getCardBySymbol(symbol: string) {
  return CARDS_DATA.find((card) => card.symbol === symbol);
}

export default function TheReading() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [cardRows] = useState<CardData[][]>(() => createCardRows());
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
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
      toast.success("Your fortune has been revealed.");

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
        }
        return;
      }

      toast.error(message);
    },
  });

  const selectedCardDetails = selectedOrder
    .map((id) => CARDS_DATA.find((card) => card.id === id))
    .filter(Boolean) as CardData[];

  const displayedCards = displayedFortune
    ? (displayedFortune.symbols
        .map((symbol) => getCardBySymbol(symbol))
        .filter(Boolean) as CardData[])
    : selectedCardDetails;
  const isResultView = Boolean(displayedFortune);

  const openHistory = () => {
    if (!hasToken) {
      setIsAuthDialogOpen(true);
      return;
    }

    setIsHistoryDialogOpen(true);
  };

  const revealSelectedCards = (nextSelectedOrder: string[]) => {
    if (todayFortune) {
      setActiveFortune(todayFortune);
      return;
    }

    if (!hasToken) {
      setIsAuthDialogOpen(true);
      return;
    }

    if (nextSelectedOrder.length !== 3) {
      return;
    }

    const nextSelectedCards = nextSelectedOrder
      .map((id) => CARDS_DATA.find((card) => card.id === id))
      .filter(Boolean) as CardData[];

    revealMutation.mutate(nextSelectedCards.map((card) => card.symbol));
  };

  const handleCardClick = (id: string) => {
    if (displayedFortune || todayFortune) {
      toast.message(
        "You've already revealed a reading. View it below or browse your history.",
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

    const nextSelectedCards = [...selectedCards, id];
    const nextSelectedOrder = [...selectedOrder, id];

    setSelectedCards(nextSelectedCards);
    setSelectedOrder(nextSelectedOrder);

    if (nextSelectedCards.length === 3) {
      revealSelectedCards(nextSelectedOrder);
    }
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

        <AnimatePresence mode="wait">
          {isResultView ? (
            <motion.div
              key={
                displayedFortune?._id || displayedFortune?.createdAt || "result"
              }
              className="relative isolate mx-auto mt-10 w-full max-w-[900px] overflow-hidden rounded-[2px] border border-[#2b3c40] bg-[#0d1719] p-5 sm:p-6"
              variants={itemVariants}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#101a1c_0%,#0c1416_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(222,148,72,0.08),transparent_68%)]" />

              <div className="relative z-10 flex flex-col gap-4 border-b border-[#243336] pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#c9803d]">
                    <Sparkles className="h-4 w-4" />
                    <span>Revealed fortune</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-6 text-[#a0acab]">
                    {displayedFortune
                      ? `${displayedFortune.symbols.join(" • ")} • ${formatFortuneDate(displayedFortune.createdAt)}`
                      : "Your omen is loading."}
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openHistory}
                  className="rounded-[2px] border border-[#4f5d5e] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#ced4ce] transition-colors hover:border-[#68777a]"
                >
                  View history
                </motion.button>
              </div>

              <div className="relative z-10 mt-6 grid gap-3 md:grid-cols-3">
                {displayedCards.map((card, index) => (
                  <div
                    key={`${card.id}-${index}`}
                    className="group flex min-h-[152px] flex-col justify-center rounded-[2px] border border-[#f0a95d] bg-[linear-gradient(180deg,rgba(58,35,24,0.98),rgba(44,26,18,0.98))] px-4 py-4 text-center shadow-[0_0_0_1px_rgba(240,169,93,0.18)]"
                  >
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#738381]">
                      {index === 0 ? "past" : index === 1 ? "present" : "path"}
                    </p>
                    <div className="mt-4 flex flex-col items-center gap-3">
                      <div className="relative flex h-[54px] w-[54px] items-center justify-center sm:h-[60px] sm:w-[60px]">
                        <Image
                          src={card.imageSrc}
                          alt={card.name}
                          width={60}
                          height={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-[18px] text-[#efe4d4]">
                          {card.name}
                        </p>
                        <p className="mt-1 text-[10px] tracking-[0.18em] text-[#c8a07b]">
                          {card.title}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#ad8f73]">
                          {card.symbol}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <motion.div
                className="relative z-10 mt-6 space-y-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {displayedFortune?.fortune
                  .split("\n")
                  .map((paragraph, index) =>
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
            </motion.div>
          ) : (
            <motion.div
              key="picker"
              className="relative mt-12 flex min-h-[560px] items-center justify-center"
              variants={itemVariants}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
            >
              <div className="pointer-events-none absolute h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(28,87,96,0.24),rgba(13,24,27,0)_72%)] blur-3xl" />

              <motion.div
                className="pointer-events-none absolute h-[560px] w-[560px] rounded-full sm:h-[700px] sm:w-[700px] lg:h-[820px] lg:w-[820px]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 50,
                  ease: EASE_LINEAR,
                  repeat: Infinity,
                }}
              >
                <div className="absolute inset-0 rounded-full border border-[#37545b]/75 shadow-[0_0_120px_rgba(19,60,66,0.18)]" />
                <div className="absolute inset-[42px] rounded-full border border-[#2d464b]/60 sm:inset-[58px] lg:inset-[72px]" />
                <div className="absolute inset-[92px] rounded-full border border-[#25393e]/45 sm:inset-[122px] lg:inset-[150px]" />
                <div className="absolute inset-[145px] rounded-full border border-[#213338]/35 sm:inset-[190px] lg:inset-[230px]" />
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#355157]/45" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#355157]/45" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-[1px] w-4 origin-left bg-[#55777d]/70"
                    style={{
                      transform: `rotate(${i * 30}deg) translateX(clamp(276px, 30vw, 390px))`,
                    }}
                  />
                ))}
              </motion.div>

              <div className="relative z-10 flex w-full max-w-[720px] flex-col items-center gap-3 sm:gap-4">
                <motion.div
                  className="mb-2 flex min-h-[32px] items-center justify-center text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  {revealMutation.isPending ? (
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#d7a167]">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      <span>Revealing your reading</span>
                    </div>
                  ) : (
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#7d8a88]">
                      {selectedCards.length === 0
                        ? "Choose any three cards"
                        : `${selectedCards.length} of 3 cards chosen`}
                    </p>
                  )}
                </motion.div>

                {cardRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-wrap justify-center gap-3 sm:gap-4"
                  >
                    {row.map((card, columnIndex) => {
                      const isSelected = selectedCards.includes(card.id);
                      const isLocked = revealMutation.isPending;
                      const index =
                        cardRows
                          .slice(0, rowIndex)
                          .reduce(
                            (count, currentRow) => count + currentRow.length,
                            0,
                          ) + columnIndex;

                      return (
                        <motion.button
                          key={card.id}
                          type="button"
                          onClick={() => handleCardClick(card.id)}
                          className={`group flex h-[132px] w-[100px] cursor-pointer select-none flex-col items-center justify-center rounded-[2px] border bg-[linear-gradient(180deg,rgba(58,35,24,0.98),rgba(44,26,18,0.98))] px-2 py-3 text-center transition-all duration-200 sm:h-[152px] sm:w-[116px] ${
                            isSelected
                              ? "border-[#f0a95d] bg-[#4b2d1f] shadow-[0_0_0_1px_rgba(240,169,93,0.18)]"
                              : "border-[#6a4530] hover:border-[#9b6a45]"
                          } ${isLocked ? "cursor-not-allowed opacity-80" : ""}`}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{
                            duration: 0.35,
                            ease: EASE_OUT,
                            delay: index * 0.03,
                          }}
                          whileHover={
                            !isLocked ? { y: -4, scale: 1.03 } : undefined
                          }
                          whileTap={!isLocked ? { scale: 0.98 } : undefined}
                          animate={
                            isSelected
                              ? {
                                  y: -6,
                                  boxShadow:
                                    "0 0 44px rgba(240, 169, 93, 0.18)",
                                }
                              : { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                          }
                        >
                          <div className="relative flex h-[36px] w-[36px] items-center justify-center sm:h-[80px] sm:w-[80px]">
                            <Image
                              src={card.imageSrc}
                              alt={card.name}
                              width={1000}
                              height={1000}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <AnimatePresence initial={false}>
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.22, ease: EASE_OUT }}
                                className="mt-3"
                              >
                                <h3 className="font-serif text-[13px] leading-none tracking-[0.01em] text-[#fff3e3]">
                                  {card.name}
                                </h3>

                                <span className="mt-1 block text-[8px] tracking-[0.18em] text-[#c8a07b]">
                                  {card.title}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
