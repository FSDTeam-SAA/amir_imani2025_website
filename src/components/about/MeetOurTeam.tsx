import React from 'react';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

// Custom icons to replicate the bottom button UI elements
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default function MeetOurTeam() {
  const founders = [
    {
      name: "Amir Imani",
      role: "FOUNDER",
      image: "/images/Amir_image.JPG", // Replace with your actual image path
      bio: "Amir Imani is the creator of bolindo, a series of games with simple rules and open possibilities. Thirteen unique symbols lie at the heart of his work, each carrying a story that brings depth and meaning to every game.",
      link: "https://www.linkedin.com/in/amir-imani-fazel-5166a359"
    },
    {
      name: "Sara Seydi",
      role: "Co Founder & Director of Strategy and Growth",
      image: "/images/sara_image.jpg", // Replace with your actual image path
      bio: "Sara is the strategic force behind DoUndo, turning ideas into reality and guiding them toward growth. With expertise in management and leadership, she shapes branding, partnerships, strategy, and funding, laying strong foundations for DoUndo’s journey as a global brand.",
            link: "https://www.linkedin.com/in/sara-seydi-7934632a3"
    },
        {
      name: "Shikha Singh",
      role: "Creative Head",
      image: "/images/Shikha.png", // Replace with your actual image path
      bio: "Shikha is the creative force behind DoUndo’s visual identity. As the creative designer, she brings Amir’s vision to life, crafting every symbol, card, and box design with care and imagination. From brainstorming with the team to shaping the game’s look and feel, Shikha ensures that DoUndo’s design truly connects with its players.",
      link: "https://www.linkedin.com/in/shikhasingh100"
    },
      {
      name: "Ashutosh Singh",
      role: "Project Manager",
      image: "/images/AshutoshSingh.png", // Replace with your actual image path
      bio: "Ashutosh is the project manager at Doundo and the person who helps turn big ideas into real, playable games. He works closely with the team, keeps everyone aligned, and makes sure no good idea gets lost along the way. From planning and team syncs to fine-tuning the small details, he helps bring the vision to life. With a background in VFX and experience working on major film projects, he brings a strong creative eye and a problem-solver’s mindset to everything we create.",
      link: "https://www.linkedin.com/in/ashutosh89"
    }
  ];

  return (
    <section className="bg-[#f5f0dd] text-[#222222] font-sans px-6 py-20 md:py-28">
      <div className="container mx-auto text-center mb-16 md:mb-24">
        {/* Top Mini Tag */}
        <span className="text-[10px] tracking-[0.2em] font-bold text-[#E96A3D] uppercase block mb-4">
          The People
        </span>
        
        {/* Main Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Meet Our <span className="text-[#E96A3D]">Founders.</span>
        </h2>
        
        {/* Subtitle Description */}
        <p className="text-sm md:text-base text-[#666666] max-w-xl mx-auto leading-relaxed">
          A small, focused team building bolindo from idea to game table — and beyond.
        </p>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {founders.map((founder, index) => (
          <div key={index} className="flex flex-col">
            {/* Image Wrapper */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 mb-6">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                priority
                className={`object-cover  ${index === 1 ? 'grayscale' : ''}`} 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold tracking-tight text-[#111111]">
                {founder.name}
              </h3>
              
              <span className="text-[10px] tracking-wider font-bold text-[#E96A3D] block mt-1 mb-3 uppercase">
                {founder.role}
              </span>
              
              <p className="text-xs md:text-[13px] text-[#555555] leading-relaxed mb-6 font-normal">
                {founder.bio}
              </p>

              {/* Action/Social Buttons at Bottom */}
              <Link href={founder.link} target='_blank' className="flex gap-2 mt-auto">
                <button 
                  className="w-7 h-7  cursor-pointer flex items-center justify-center "
                  aria-label="LinkedIn"
                >
                  <Linkedin/>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}