"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const stableKey = useMemo(() => pathname, [pathname]);

  return (
    <motion.div
      key={stableKey}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.4 },
        scale: { duration: 0.5 },
      }}
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {children}
    </motion.div>
  );
}
