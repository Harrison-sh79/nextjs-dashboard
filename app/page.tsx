"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const item = localStorage.getItem("selectedTitle");
    let url = "/dashboard"
    if (item && item === "Orders"){
      url = "/dashboard/orders"
    }
    const timeout = setTimeout(() => {
      router.push(url);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-fuchsia-200">
      <motion.div
        className="bg-white/30 rounded-full p-16"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delayChildren: 1,
        }}
      >
        <motion.div
          className="bg-white/30 rounded-full p-16"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delayChildren: 1,
          }}
        >
          <motion.div
            className="bg-fuchsia-200 rounded-full h-40 w-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="h-20 bg-fuchsia-200"
              src="/images/VMAX_Logo_Main.png"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col items-center gap-3 mt-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          V-MAX Dashboard
        </motion.h1>
        <motion.h2
          className="text-2xl font-bold text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Anything is possible on everywhere
        </motion.h2>
      </motion.div>
    </main>
  );
}
