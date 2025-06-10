import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../Button/Button.jsx";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { slides } from "../../data/slidesData.js";
import LeftArrow from "../Icons/LeftArrow.jsx";
import RightArrow from "../Icons/RightArrow.jsx";

export default function Hero() {
  return (
    <>
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            clickable: true,
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-transparent" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex items-center justify-center h-full">
                  <div className="max-w-screen-xl px-4 md:px-6 flex flex-col items-center justify-center text-center">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white"
                      >
                        <motion.p
                          className="text-amber-400 font-medium mb-2 tracking-wide uppercase text-sm"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {slide.subtitle}
                        </motion.p>
                        <motion.h1
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {slide.title}
                        </motion.h1>
                        <motion.p
                          className="text-xl md:text-2xl mb-8 text-slate-200 max-w-2xl leading-relaxed"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {slide.description}
                        </motion.p>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <Button
                            size="lg"
                            className="px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl"
                            onClick={() => (window.location.href = slide.link)}
                          >
                            <span className="flex items-center">
                              {slide.cta}
                              <HiPlay className="ml-2 h-5 w-5" />
                            </span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="hidden md:block swiper-button-prev-custom absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-white/30">
          <LeftArrow />
        </button>
        <button className="hidden md:block swiper-button-next-custom absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-white/30">
          <RightArrow />
        </button>
      </section>
    </>
  );
}
