import { motion, Variants } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const SkillSection = () => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-effect rounded-xl p-8 mb-12"
    >
      <div className="section-eyebrow mb-6">Skills & Capabilities</div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-violet-200 dark:text-violet-300 font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">💻</span>
              Technical Skills
            </h3>
            <div className="space-y-4">
              {[
                { name: "JavaScript/TypeScript", level: 95 },
                { name: "React/Next.js", level: 90 },
                { name: "Node.js/Express", level: 85 },
                { name: "Python/Django", level: 80 },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between text-sm mb-2 text-slate-800 dark:text-slate-300">
                    <span>{skill.name}</span>
                    <span className="text-sky-500 dark:text-sky-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/70 dark:bg-white/10 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-[#9d7bff] via-[#7dd3fc] to-[#34d399] h-2 rounded-full shadow-[0_5px_15px_rgba(125,211,252,0.4)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-cyan-600 dark:text-cyan-200 font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">🚀</span>
              Core Expertise
            </h3>
            <div className="space-y-3">
              {[
                "Frontend Architecture",
                "API Development",
                "Database Design",
                "DevOps & Deployment",
                "UI/UX Design",
                "Performance Optimization",
              ].map((expertise, index) => (
                <motion.div
                  key={expertise}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                  />
                  {expertise}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillSection;
