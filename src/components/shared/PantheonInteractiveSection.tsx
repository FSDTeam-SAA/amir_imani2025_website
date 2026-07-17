"use client";

import React, { useState } from "react";
import Image from "next/image";

const pantheonData = [
  {
    id: "ahura",
    name: "Ahura",
    title: "LIGHT & TRUTH",
    subtitle: "HOME OF THE LIGHT",
    number: "No. 01 / 12",
    description: `The breath of truth after confusion breaks.
clarity • truth • awakening
Ahura walks barefoot in blinding light, not
to blind but to burn illusion. His crown is
simple, no gold, no gems, only truth.
This card is a call to rise with clarity, not
ego. It asks if you’re ready to lose comfort for
absolute truth.`,
    iconImage: "/symbol_AHURA.png",
    cardImage: "/card/Cards-1.jpg",
    color: "#5EA3A3",
  },
  {
    id: "ares",
    name: "Ares",
    title: "WAR & COURAGE",
    subtitle: "EMBODIMENT OF CONFLICT",
    number: "No. 02 / 12",
    description: `The instant hesitation dies.
courage • action • force
Ares is not strategy. He is the raw fire beneath
what you silence. His form curves like two
forces in collision, not enemies but truth
confronting itself. The red isn’t just for blood.
It’s for life refusing to stay numb.`,
    iconImage: "/symbol_ARES.png",
    cardImage: "/card/Cards-2.jpg",
    color: "#D32F2F",
  },
  {
    id: "asgard",
    name: "Asgard",
    title: "HOME OF THE GODS",
    subtitle: "HOME OF THE GODS",
    number: "No. 03 / 12",
    description: `The silent structure behind enduring things.
legacy • vision • endurance

Asgard is not just a sky kingdom, but a memory of who you were before pain changed you. Its
shape is a roof, rising like a shelter built inside you. This card is about return, not to the past but
to the self before the world made you forget.`,

    iconImage: "/symbol_ASGARD.png",
    cardImage: "/card/Cards-3.jpg",
    color: "#F6D021",
  },
  {
    id: "enki",
    name: "Enki",
    title: "WATER & WISDOM",
    subtitle: "LORD OF THE ABYSS",
    number: "No. 04 / 12",
    description: `The hidden current beneath survival.
wisdom • adaptation • intelligence
He has no edges, only movement. Like water, he solves without force. His form is a circle, with a
line inside, calm outside, creation within. Enki doesn’t repair. He begins again, without fear,
without shame.`,
    iconImage: "/symbol_ENKI.png",
    cardImage: "/card/Cards-4.jpg",
    color: "#C37BB0",
  },
  {
    id: "gaia",
    name: "Gaia",
    title: "EARTH & CREATION",
    subtitle: "MOTHER OF LANDSCAPES",
    number: "No. 05 / 12",
    description: `What remains when chaos passes.
grounding • patience • life
She holds life in her curve, not just one child but the memory of all birth. Her green form is
shelter, womb, and earth itself. Gaia is where everything begins and where everything longs to
return.`,
    iconImage: "/symbol_GAIA.png",
    cardImage: "/card/Cards-5.jpg",
    color: "#2E7D32",
  },
  {
    id: "hera",
    name: "Hera",
    title: "SOVEREIGNTY",
    subtitle: "QUEEN OF ARCHETYPES",
    number: "No. 06 / 12",
    description: `The value that no longer waits to be chosen.
sovereignty • dignity • presence
One side holds color. The other reveals it. Together they don’t merge. They define each other.
Hera is the space between union and distance, the birth of language and law.`,
    iconImage: "/symbol_HERA.png",
    cardImage: "/card/Cards-6.jpg",
    color: "#6A1B9A",
  },
  {
    id: "laozi",
    name: "Laozi",
    title: "WAY & BALANCE",
    subtitle: "FLOW OF THE TAO",
    number: "No. 07 / 12",
    description: `The wisdom of not forcing the river.
balance • softness • flow
Laozi sits by a river and says nothing, but somehow changes everything. His shape holds a
quiet fire, and a small window through which another world can be seen. This card suggests
that stillness, not action, brings transformation.`,
    iconImage: "/symbol_LAOZI.png",
    cardImage: "/card/Cards-7.jpg",
    color: "#E67E22",
  },
  {
    id: "mitra",
    name: "Mitra",
    title: "COVENANT & ORDER",
    subtitle: "KEEPER OF OATHS",
    number: "No. 08 / 12",
    description: `The unseen thread between souls.
trust • memory • bond
In ancient Persia, Mitra watched over promises, not through power but presence. A circle and a
square, different in every way but joined at one point. That one point is not sameness. It’s
friendship. He sees who stays loyal even when no one is watching.`,
    iconImage: "/symbol_MITRA.png",
    cardImage: "/card/Cards-8.jpg",
    color: "#95A5A6",
  },
  {
    id: "setna",
    name: "Setna",
    title: "MEMORY & SCRIPT",
    subtitle: "SCRIBE OF TRADITION",
    number: "No. 09 / 12",
    description: `The revelation that changes everything once seen.
illusion • discovery • insight
Setna is the illusionist who once fooled death. His shape feels balanced, but only from one
angle. Spin it and what seemed real begins to twist. This card asks what masks do you wear,
and who would you be without them.`,
    iconImage: "/symbol_SETNA.png",
    cardImage: "/card/Cards-9.jpg",
    color: "#9CCC65",
  },
  {
    id: "shaman",
    name: "Shaman",
    title: "VISION & TRANCE",
    subtitle: "WALKER BETWEEN WORLDS",
    number: "No. 10 / 12",
    description: `The voice beneath explanation.
intuition • vision • listening
Shaman appears in black because he carries the others. Eleven colours from the other symbols
sit inside him, silent but alive. His shape pulls you inward, as if he already knows what you're
hiding. He doesn’t walk the path. He is where it begins.`,
    iconImage: "/symbol_SHAMAN.png",
    cardImage: "/card/Cards-10.jpg",
    color: "#D4AC0D",
  },
  {
    id: "shiva",
    name: "Shiva",
    title: "TRANSFORMATION",
    subtitle: "DESTROYER & REBUILDER",
    number: "No. 11 / 12",
    description: `The collapse that creates space for rebirth.
release • transformation • renewal
Shiva dances where things fall apart, not to end them but to set them free. His shape is a third
eye, closed to the world but open to truth. This card marks the end of what you’ve outgrown.
Step into the fire. See what stays.`,
    iconImage: "/symbol_SHIVA.png",
    cardImage: "/card/Cards-11.jpg",
    color: "#1565C0",
  },
  {
    id: "titan",
    name: "Titan",
    title: "ELDER STRENGTH",
    subtitle: "PILLAR OF AXIS",
    number: "No. 12 / 12",
    description: `The weight carried by those becoming more than their past.
strength • burden • ambition
Titan is the rebel who lost everything but still stood tall. His power is not in size, but in refusal to
kneel. Pulling Titan means you're being asked to stop apologizing for being too much. Be
thunder. Own it.`,
    iconImage: "/symbol_TITAN.png",
    cardImage: "/card/Cards-012.jpg",
    color: "#795548",
  },
];

export default function PantheonCombinedSection() {
  const [activeGod, setActiveGod] = useState(pantheonData[2]);

  return (
    <section className="bg-[#FAF6EE] text-stone-900 py-16 px-4 md:px-12 lg:px-24 min-h-screen flex items-center justify-center font-sans antialiased">
      <div className=" mx-auto container">
        {/* Header Section */}
        <div className="mb-10">
          <span className="text-stone-400 text-[10px] font-bold tracking-[0.25em] uppercase block mb-3">
            THE PANTHEON • TWELVE SYMBOLS
          </span>
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-stone-950 mb-4 max-w-2xl leading-tight">
            Twelve gods. Six cards each. One shared language of play.
          </h2>
          <p className="text-stone-500 text-xs md:text-sm max-w-2xl leading-relaxed">
            Every symbol in Doundo draws from a living tradition — Norse, Vedic,
            Greek, Egyptian, Mesopotamian, Persian, Daoist. They are not
            decoration. They are the vocabulary of the match.
          </p>
        </div>

        {/* 6x2 Grid For Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border border-stone-200/60 bg-white shadow-xs mb-16">
          {pantheonData.map((god) => {
            const isActive = activeGod.id === god.id;
            return (
              <button
                key={god.id}
                onClick={() => setActiveGod(god)}
                className={`flex flex-col items-center justify-between p-5 min-h-[160px] border border-stone-100 transition-all duration-300 relative focus:outline-none group ${
                  isActive
                    ? "bg-[#171513] text-white border-[#171513] z-10 shadow-lg"
                    : "bg-[#FAF6EE]/30 hover:bg-[#FAF6EE]/80 text-stone-900"
                }`}
              >
                {/* Top Mini Icon Grid */}
                <div className="flex-1 flex items-center justify-center relative w-10 h-10">
                  <Image
                    src={god.iconImage}
                    alt={`${god.name} icon`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Name Labels */}
                <div className="text-center w-full mt-3">
                  <div
                    className={`text-xs font-bold tracking-wide ${isActive ? "text-white" : "text-stone-950"}`}
                  >
                    {god.name}
                  </div>
                  <div className="text-[8px] font-bold tracking-widest uppercase mt-1 text-stone-400">
                    {god.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Preview Section */}
        <div className="flex  items-center gap-36 ">
          {/* Left: Selected card image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[280px] h-[400px] shadow-xl overflow-hidden">
              <Image
                key={activeGod.cardImage}
                src={activeGod.cardImage}
                alt={`${activeGod.name} card`}
                fill
                sizes="280px"
                className="object-contain animate-fade-in"
                priority
              />
            </div>
          </div>

          {/* Right Text Details */}
          <div className=" space-y-4">
            <span className="text-[#5EA3A3] text-xs font-mono font-semibold tracking-wider block">
              {activeGod.number}
            </span>

            <h3 className="text-4xl font-normal text-stone-950 tracking-tight">
              {activeGod.name}
            </h3>

            <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">
              — {activeGod.subtitle}
            </div>

            <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-lg pt-2">
              {activeGod.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
