import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-gray-200 py-10 px-6 md:px-12 relative">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 max-w-6xl mx-auto">
        
        {/* Logo + Description */}
        <div>
          <h3 className="text-3xl font-extrabold text-white tracking-wide">BLOOM</h3>
          <p className="mt-3 text-gray-300 max-w-xs">
            A safe digital home built for women to connect, grow, and thrive — free from the male gaze.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/whyBloom" className="hover:text-white transition">Why Bloom?</a></li>
            <li><a href="/privacy1" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.instagram.com/bloom_womxn?igsh=MTAwZjdvY3NzejdkMQ%3D%3D&utm_source=qr" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            {/* <a href="https://www.facebook.com/share/1atDPXthd8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebookF />
            </a> */}
            <a href="https://www.tiktok.com/@bloom.womxnn?_r=1&_t=ZS-94xkqxiHu1U" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400 text-sm">
        © 2024 Bloom. All rights reserved.
      </div>
    </footer>
  );
}
