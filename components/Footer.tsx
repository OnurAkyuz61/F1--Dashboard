"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-white/10 backdrop-blur-md bg-black/20 py-8"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {/* Left - Copyright */}
          <div className="text-sm text-white/60 text-center md:text-left">
            © {currentYear} F1 Dashboard. Unofficial Application.
          </div>

          {/* Center - Data Disclaimer */}
          <div className="text-xs text-white/40 text-center max-w-2xl">
            Data provided by Jolpi/Ergast API. F1, FORMULA 1, and related marks
            are trademarks of Formula One Licensing BV.
          </div>

          {/* Right - Credits */}
          <div className="text-sm text-white/60 text-center md:text-right">
            Designed & Built by{" "}
            <Link
              href="https://onurakyuz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 hover:text-f1-red transition-colors"
            >
              Onur Akyuz
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

