const SkillSection = () => {
  return (
    <div id="about" className="mb-12">
      <div className="section-eyebrow mb-6"></div>
      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
        Skills & Capabilities
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
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
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2 text-slate-800 dark:text-slate-300">
                    <span>{skill.name}</span>
                    <span className="text-sky-500 dark:text-sky-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/70 dark:bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#9d7bff] via-[#7dd3fc] to-[#34d399] h-2 rounded-full shadow-[0_5px_15px_rgba(125,211,252,0.4)]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
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
                <div
                  key={expertise}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  {expertise}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSection;
