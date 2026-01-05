import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
 {
    text: "This is the kind of space I’ve been waiting for. No male gaze, no pressure. Just love it.",
    name: "Ama, Ghana",
  },
  {
    text: "Joining Bloom gave me the confidence to be myself online again. Safe and empowering!",
    name: "Sophia, South Africa",
  },
  {
    text: "I feel seen, supported, and protected here. Beautiful idea. Perfect execution.",
    name: "Amina, Nigeria",
  },
  {
    text: "Bloom is the first online space that truly gets me. No drama. Just real love and support.",
    name: "Zara, Kenya",
  },
  {
    text: "Finally, a platform where I can connect without worrying about judgment. Bloom is amazing!",
    name: "Elena, USA",
  },
  {
    text: "A safe space where I can express myself freely and meet other inspiring women.",
    name: "Mei, UK ",
  },
  {
    text: "I’ve never felt more supported online. Bloom really delivers on its promise of privacy and empowerment.",
    name: "Nadia, Kenya",
  },
  {
    text: "It’s refreshing to find a community of women where everyone respects each other. Bloom is gold.",
    name: "Sophia, Germany",
  },
  {
    text: "Finally, a social space built for us. I love the design, the vibe, and the privacy.",
    name: "Lila, USA",
  },
  {
    text: "Bloom is a game-changer. I can connect, share, and grow without any pressure.",
    name: "Aisha, UAE",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3500); // Change testimonial every 3.5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12 px-6   shadow-md text-center mt-10 overflow-hidden max-w-3xl mx-auto">
 <motion.h2
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-md"
>
  <span className="text-purple-400">What</span>{" "}
  <span className="text-pink-400">Women</span>{" "}
  <span className="text-red-400">Are Saying</span>
</motion.h2>


      <div className="relative h-[140px] flex items-center justify-center">
        <motion.div
          key={current}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full flex flex-col items-center px-4"
        >
          <p className="text-lg italic text-black max-w-xl">
            “{testimonials[current].text}”
          </p>
          <p className="mt-2 font-medium text-gray-600">— {testimonials[current].name}</p>
        </motion.div>
      </div>
    </div>
  );
}




