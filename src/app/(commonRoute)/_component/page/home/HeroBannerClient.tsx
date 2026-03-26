"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

interface BannerItem {
  image: string;
  title: string;
  description: string;
  cta: string;
}

interface HeroBannerClientProps {
  bannerData: BannerItem[];
}

export default function HeroBannerClient({ bannerData }: HeroBannerClientProps) {
  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl group"
    >
      <CarouselContent>
        {bannerData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[420px] sm:h-[500px] lg:h-[620px] w-full">
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 flex items-center">
                <div className="w-full px-5 sm:px-10 lg:px-16 max-w-2xl space-y-5 sm:space-y-6">
                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight"
                  >
                    {item.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-lg"
                  >
                    {item.description}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
                  >
                    <Button
                      size="lg"
                      className="rounded-full px-7 py-5 text-base sm:text-lg bg-blue-600 hover:bg-blue-700 shadow-md"
                    >
                      {item.cta}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-7 py-5 text-base sm:text-lg text-white border-white/40 hover:bg-white/10"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Controls */}
      <CarouselPrevious className="left-3 opacity-0 group-hover:opacity-100 transition bg-white/20 hover:bg-white/40 text-white" />
      <CarouselNext className="right-3 opacity-0 group-hover:opacity-100 transition bg-white/20 hover:bg-white/40 text-white" />
    </Carousel>
  );
}
