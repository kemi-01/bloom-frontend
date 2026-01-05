import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import TestimonialSlider from "../components/TestimonialSlider";

function BloomInfo2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="py-20">
      <div
        ref={ref}
        className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto"
      >
        {/* Image with Slide-in From Left */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ x: -200, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764329147/girl_o6dcg9.jpg"
            alt="Bloom women"
            className="rounded-xl shadow-lg w-[500px] h-[400px] object-cover"
          />
        </motion.div>

        {/* Text with Slide-in From Right */}
        <motion.div
          className="flex-1 space-y-4 text-lg text-gray-800 font-medium text-center lg:text-left mx-auto flex flex-col items-center lg:items-start"
          initial={{ x: 200, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xl font-bold text-black leading-relaxed">
            Bloom is built by women, for women.
            <br />No spam. No chaos. No harassment.
            <br />Just a private, respectful community
            <br />made to protect your peace.
          </p>
        </motion.div>
      </div>
      <TestimonialSlider />

      <li>
  <a
    href="/whyBloom"
    className="text-purple-600 hover:text-black transition"
  >
    Why Bloom?
  </a>
</li>

    </div>
  );
}

export default BloomInfo2;
