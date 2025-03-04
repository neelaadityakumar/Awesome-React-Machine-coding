import React from "react";

import { useState } from "react";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

function ImageCarousel({ images }) {
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <div
      className={`relative flex w-[384px] h-96 bg-black rounded-lg translate-x-(${
        -currIndex * 384
      }px)`}
    >
      {/* Image */}

      {images.map((img) => (
        <img
          alt={img.alt}
          src={img.src}
          key={img.src}
          className={`min-w-full h-full object-contain transition-opacity duration-500 `}
        />
      ))}

      {/* Previous Button */}
      <button
        aria-label="Previous image"
        className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
        onClick={() =>
          setCurrIndex((currIndex - 1 + images.length) % images.length)
        }
      >
        &#10094;
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-2 rounded-lg">
        {images.map(({ alt, src }, index) => (
          <button
            key={src}
            aria-label={`Navigate to ${alt}`}
            onClick={() => setCurrIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currIndex ? "bg-white" : "bg-gray-500 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        aria-label="Next image"
        className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
        onClick={() => setCurrIndex((currIndex + 1) % images.length)}
      >
        &#10095;
      </button>
    </div>
  );
}

const SmoothCarousel = () => {
  return <ImageCarousel images={images} />;
};

export default SmoothCarousel;
