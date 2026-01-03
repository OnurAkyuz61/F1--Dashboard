"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/standings", label: "Standings" },
    { href: "/races", label: "Races" },
    { href: "/teams", label: "Teams" },
    { href: "/stats", label: "Stats" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Image
                src="/f1-logo.png"
                alt="F1 Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h1 className="text-2xl font-display font-bold tracking-wider">
                DASHBOARD
              </h1>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-sm font-medium transition-colors relative
                    ${isActive 
                      ? "text-f1-red" 
                      : "text-white/80 hover:text-f1-red"
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-f1-red"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          
          <button className="md:hidden p-2 hover:text-f1-red transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
