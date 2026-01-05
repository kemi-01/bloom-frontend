import React from "react";
import { Star, Users, Smartphone, MessageCircle, Heart, Bell } from "lucide-react";

const features = [
  { icon: Star, title: "Awesome Community" },
  { icon: Users, title: "Million Members" },
  { icon: Smartphone, title: "Private Groups" },
  { icon: MessageCircle, title: "Friendly Forums" },
  { icon: Heart, title: "Trusted Matches" },
  { icon: Bell, title: "Instant Updates" },
];

const Us = () => {
  return (
    <div className="bg-black-to-b from-pink-50 to-white py-16 px-6 md:px-12 text-center relative overflow-hidden">
      <h1 className="text-4xl font-bold text-black mb-12">
        The No.1 Trusted  Community
      </h1>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll gap-12">
          {/* Repeat features array twice for seamless loop */}
          {[...features, ...features].map(({ icon: Icon, title }, index) => (
            <div key={`feature-${index}`} className="inline-flex flex-col items-center  w-48">
              <Icon className="text-black w-10 h-10 mb-2" />
              <h3 className="font-semibold text-lg text-black text-center">{title}</h3>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Us;
