import { motion } from "framer-motion";

const reasons = [
  "Bloom empowers women to express themselves freely, without fear.",
  "We provide safe, moderated spaces for authentic connection.",
  "Every interaction is private, protected, and respectful.",
  "We offer curated resources for mental health, growth, and healing.",
  "Our community is global — everyone belongs and is valued."
];

export default function WhyBloom() {
  return (
    <section className="text-black py-16 px-6 md:px-20 lg:px-32">

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
        Why We Built <span className="text-pink-400">Bloom</span>
      </h1>

      {/* Vision Intro with animated reasons */}
      <div className="text-black py-8 px-6 md:px-10 rounded-xl shadow-xl leading-relaxed space-y-6">
        <h2 className="text-3xl font-bold text-purple-400">Our Mission</h2>
        <p className="text-lg">
          Bloom was born because we believe every woman deserves a space where she can feel
          <span className="text-pink-300 font-semibold"> safe, respected, and fully herself</span> online.
          No noise. No toxicity. Just healing, connection, and empowerment protected through
          privacy-first technology, <span className="font-semibold">built by women, for women.</span>
        </p>

        {/* Animated Reasons */}
        <div className="mt-6 space-y-4">
          {reasons.map((reason, index) => (
            <motion.p
              key={index}
              className="text-lg font-medium text-pink-400"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 3, duration: 3 }} // slower and more staggered
            >
              ✦ {reason}
            </motion.p>
          ))}
        </div>

        <p className="font-medium mt-4">— The Bloom Team</p>
      </div>

      {/* Problems Section */}
      <div className="mt-14 space-y-6">
        <h2 className="text-3xl font-bold text-red-700 text-center">The Problem We’re Solving</h2>
        <ul className="space-y-4 text-lg text-black">
          <li>✦ Tired of being judged, harassed, or ignored online? Most platforms are made for men — leaving women unheard and unsafe.</li>
          <li>✦ Your personal life shouldn’t be on sale. Mainstream sites profit from your data while your safety is neglected.</li>
          <li>✦ You long for real connection, not empty feeds. A space where your voice matters, your feelings are valid, and your stories are shared with care.</li>
          <li>✦ Fake profiles, trolls, and toxicity make it exhausting to be yourself. You deserve a safe corner of the internet where you can breathe, express, and belong.</li>
        </ul>
      </div>

      {/* Promise Section */}
      <div className="mt-14 bg-purple-800 py-10 px-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-red-700">Our Promise</h2>
        <p className="text-lg">
          Bloom is <span className="font-semibold">anonymous by default</span>, protected by
          <span className="font-semibold"> end-to-end encryption</span>, and community-moderated.
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>A space free from ads and tracking — your thoughts and privacy are respected.</li>
          <li>Connect only with verified, real women who understand and celebrate your journey.</li>
          <li>Every chat and interaction is private — share your stories safely and openly.</li>
          <li>Together, we heal, connect, and rise — your voice truly matters here.</li>
        </ul>
      </div>

      {/* Global Impact */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-black">We Stand With Every Woman</h2>
        <p className="text-lg text-red-800 mt-4 max-w-3xl mx-auto">
          Whether you're in Nigeria, Berlin, São Paulo, Nairobi, Mumbai or New York Bloom is
          your space. A global sisterhood where your voice matters, and your safety comes first.
        </p>
      </div>

      {/* CTA */}
   {/* CTA */}
<div className="mt-16 text-center">
  <a href="https://t.me/+AiFJOA7cp1s2ZmE0" target="_blank" rel="noopener noreferrer">
    <button className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded-lg shadow-lg">
      Join the Bloom Community
    </button>
  </a>
  <p className="mt-4 text-sm text-red-900">
    *Every new member goes through a simple selfie verification process. That’s how we keep our space safe.
  </p>
</div>


      {/* What We Offer Section */}
      <div className="mt-16  py-12 px-6 md:px-12 rounded-xl shadow-lg space-y-10">
        <h2 className="text-3xl font-bold text-pink-300 text-center mb-8">What We Offer</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-purple-700 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">A Verified, Womxn-Only Digital Space</h3>
            <p className="text-gray-200">Bloom offers a protected environment where only verified womxn can enter.
              No anonymous lurking. No fake profiles. No male intrusion.
              This is about control over who has access to you.

              Bloom isn’t open to everyone and that’s the point.</p>
          </div>

          <div className="bg-purple-700 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Safety-First Social Interaction</h3>
            <p className="text-gray-200">Every feature is built with safety in mind:

              Controlled visibility

              Moderated interactions

              Clear boundaries around sharing personal information

              Bloom actively discourages oversharing and prioritizes emotional and physical safety over engagement metrics.</p>
          </div>

          <div className="bg-purple-700 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Visibility Without Exploitation</h3>
            <p className="text-gray-200">Bloom allows queer womxn to:

              Exist

              Be seen

              Be heard

              Without being turned into content, trends, or data for ads.
              No algorithm punishing softness. No performative queerness required.</p>
          </div>

          <div className="bg-purple-700 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Intentional Connections (Not Swiping Chaos)</h3>
            <p className="text-gray-200">Bloom is about:

              Conscious discovery

              Slow connection

              Mutual interest
              Whether that becomes friendship, support, or something deeper.

            </p>
          </div>

          <div className="bg-purple-700 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Private Messaging That Respects Boundaries</h3>
            <p className="text-gray-200">Messaging is designed to feel:

              Calm

              Optional

              Non-pressuring

              No harassment culture. No forced replies.
              You choose when, how, and who you talk to.</p>
          </div>

          <div className="bg-purple-700 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-2 text-white">Verified & Private</h3>
            <p className="text-gray-200">Every member is verified, and your privacy is our priority — no ads, no data selling.</p>
          </div>
        </div>
      </div>

    </section>
  );
}
