"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  isActive?: boolean;
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-white/5 p-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, onClick, isActive }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all
        ${isActive 
          ? "bg-f1-red text-white shadow-sm" 
          : "text-white/60 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, isActive }: TabsContentProps) {
  if (!isActive) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      {children}
    </motion.div>
  );
}

