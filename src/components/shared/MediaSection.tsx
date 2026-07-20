import React from "react";

interface MediaSectionProps {
  productName: string;
  videoLink?: string;
}

export default function MediaSection({
  productName,
  videoLink,
}: MediaSectionProps) {
  // Extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    // If already an embed URL, return as is
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return null;
  };

  const embedUrl = videoLink ? getYouTubeEmbedUrl(videoLink) : null;

  return (
    <section className="my-10 container border-[#EFEFEF]">
      <p className="text-center font-semibold">WATCH - 3 MINUTE OVERVIEW</p>

      <h2 className="text-[#0E1D2B] mt-4 text-2xl md:text-3xl lg:text-5xl mb-10 text-center">
        Learn {productName} in the time it takes to shuffle.
      </h2>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0px_20px_40px_rgba(0,0,0,0.08)] bg-gray-100 mb-8">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>No video available</p>
          </div>
        )}
      </div>
    </section>
  );
}
