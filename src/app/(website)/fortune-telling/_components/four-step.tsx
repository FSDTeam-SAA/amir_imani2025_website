import React from "react";

const STEPS_DATA = [
  {
    number: "01",
    title: "Settle",
    desc: "Close the tabs. Take one breath that you feel.",
  },
  {
    number: "02",
    title: "Hold a question",
    desc: "Specific is better than clever. The wheel can tell the difference.",
  },
  {
    number: "03",
    title: "Choose three",
    desc: "First card is the past that carried you. Second is the present. Third is the path.",
  },
  {
    number: "04",
    title: "Read slowly",
    desc: "The reading is a mirror, not a map. The omen is the only instruction.",
  },
];

export default function FourSteps() {
  return (
    <section className="text-[#f2eadf]">
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="block text-[9px] uppercase tracking-[0.26em] text-[#c9803d]">
            — the ritual —
          </span>
          <h2 className="font-serif text-[38px] font-light leading-none tracking-[-0.03em] text-[#efe4d4] sm:text-[46px]">
            Four steps, one circle.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {STEPS_DATA.map((step) => (
            <div
              key={step.number}
              className="flex min-h-[122px] flex-col justify-between border border-[#2a302f] bg-[#1b1e1d]/85 px-5 py-4"
            >
              <div className="space-y-4">
                <span className="block text-[9px] tracking-[0.22em] text-[#c9803d]">
                  {step.number}
                </span>
                <h3 className="font-serif text-[16px] font-light leading-none text-[#efe4d4]">
                  {step.title}
                </h3>
              </div>

              <p className="pt-4 text-[11px] leading-[1.55] text-[#99a39f]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
