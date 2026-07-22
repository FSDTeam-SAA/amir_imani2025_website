import Image from "next/image";

const AboutSectionOnly = () => {
  const storyData = {
    aboutTag: "WHO WE ARE",
    aboutTitle: "About",
    aboutTitleHighlight: "DoUndo.",
    aboutDescription: [
      "oUndo is an independent game company based in Canada, creating innovative tabletop games and symbolic experiences that are simple to learn, yet always offer something new to discover.",
      "At the heart of every DoUndo project are thirteen unique symbols — a system that links our games, fortune-telling practices, and accessories into one shared universe.",
      "DoUndo is more than a game publisher. It is a brand with its own identity and language. Our journey is just beginning.",
      "We are developing a collection of original games, from strategic duels and memory challenges to party experiences and symbolic readings. Alongside these games, we are exploring accessories, apparel, and digital projects inspired by the same symbolic system.",
    ],
    lastParagraph: {
      text1: "Every DoUndo experience is designed to spark ",
      boldText: "memorable shared moments that continue beyond the table,",
      text2:
        " as we grow into a global brand that bridges creativity, design, and storytelling.",
    },
    image: {
      src: "/about1.png", // Replace with your exact deck image path
      alt: "DoUndo unique symbols cards and dice",
      width: 450,
      height: 450,
    },
  };

  return (
    <section className="bg-[#faf7f0] py-16 md:py-24 px-6 md:px-12 lg:px-20 min-h-screen flex items-center justify-center font-sans">
      <div className="container mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Title & Image */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          {/* Titles */}
          <div className="space-y-1">
            <span className="text-[10px] md:text-xs font-bold text-[#E96A3D] tracking-[0.25em] block uppercase">
              {storyData.aboutTag}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-none">
              {storyData.aboutTitle}
              <span className="block text-[#0EA5B8] mt-1">
                {storyData.aboutTitleHighlight}
              </span>
            </h2>
          </div>

          {/* Card Deck Image Container */}
          <div className="group relative aspect-square w-full max-w-[480px] overflow-hidden bg-[#2E2E2E] shadow-sm">
            <Image
              src={storyData.image.src}
              alt={storyData.image.alt}
              width={storyData.image.width}
              height={storyData.image.height}
              priority
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />

            {/* Optional dark overlay */}
            <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/0" />
          </div>
        </div>

        {/* Right Column: Text Paragraphs */}
        <div className="lg:col-span-7 space-y-6 lg:pt-[152px] text-sm md:text-[15px] text-gray-700 leading-[1.75] font-normal tracking-wide">
          {/* Paragraph 1 with Big Drop Cap 'D' */}
          <p className="relative">
            <span className="text-5xl md:text-6xl font-bold text-[#E96A3D] float-left mr-2.5 h-12 md:h-14 flex items-center leading-none">
              D
            </span>
            <strong>{storyData.aboutDescription[0].substring(0, 5)}</strong>
            {storyData.aboutDescription[0].substring(5)}
          </p>

          {/* Paragraph 2 with bold text */}
          <p>
            At the heart of every DoUndo project are{" "}
            <strong className="text-gray-900 font-bold">
              thirteen unique symbols
            </strong>{" "}
            — a system that links our games, fortune-telling practices, and
            accessories into one shared universe.
          </p>

          {/* Paragraph 3 */}
          <p>{storyData.aboutDescription[2]}</p>

          {/* Paragraph 4 */}
          <p>{storyData.aboutDescription[3]}</p>

          {/* Paragraph 5 with bold highlight */}
          <p>
            {storyData.lastParagraph.text1}
            <strong className="text-gray-900 font-bold">
              {storyData.lastParagraph.boldText}
            </strong>
            {storyData.lastParagraph.text2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOnly;
