"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Github } from "lucide-react";
import Link from "next/link";
import OrbitingSkills from "./skill-onboarding";

export const HeroSection = () => {
  return (
    <div id="home" className="pt-16 relative z-10">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-effect rounded-2xl p-8 mb-12 relative overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                TARIF AL HASAN
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-slate-300 mb-8 text-lg leading-relaxed max-w-2xl"
              >
                Specializing in Full-Stack development with React & Next.js, I
                create fast, scalable, and responsive web applications. I also
                automate workflows using n8n to streamline backend processes and
                improve business efficiency.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={"#contact"} className="cursor-pointer">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg px-8"
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Explore Full-Stack Development
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    passHref
                    target="_blank"
                    href={"http://github.com/tarifalhasan/"}
                    className="cursor-pointer"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent backdrop-blur-sm px-8"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View Projects
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Subtle rotating rings */}
            {/* <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 lg:right-0 w-80 h-80 border border-indigo-300/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 40,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-8 w-64 h-64 border border-purple-400/10 rounded-full"
            /> */}

            {/* Professional photo container */}

            <OrbitingSkills />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
