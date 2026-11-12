import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { useAtom } from "jotai";
import {
  currentProjectAtom,
  getVisibleProjects,
  projectCategories,
  projectFilterAtom,
} from "./Projects";
import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { SocialLinks } from "./SocialLinks";
import { skillAnchors } from "./skillAnchors";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  relative h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col items-center w-screen">
        <AboutSection setSection={setSection} />
        <SkillsSection />
        <WorkExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </MotionConfig>
  );
};

const MORSE = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....",
  i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.",
  q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-",
  y: "-.--", z: "--..",
};

const HERO_NAME = "Rohan Soni";
const HERO_TAGLINE = "Software engineer from Melbourne, working across GenAI and DevOps.";
const DECODE_START = 0.9;
const LETTER_STEP = 0.1;
const SYMBOL_STEP = 0.05;
const TYPING_START_MS = 1900;
const TYPING_SPEED_MS = 24;

const MorseName = ({ name, play }) => {
  const reduceMotion = useReducedMotion();
  let letterIndex = 0;

  return (
    <span aria-hidden="true" title={`${name} in Morse code`} className="flex flex-wrap items-start">
      {name.split("").map((char, i) => {
        if (char === " ") {
          return <span key={i} className="w-[0.28em]" />;
        }
        const code = MORSE[char.toLowerCase()] ?? "";
        const start = DECODE_START + letterIndex++ * LETTER_STEP;
        return (
          <span key={i} className="inline-flex flex-col items-center">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={play || reduceMotion ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.35,
                delay: start + code.length * SYMBOL_STEP,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
            <span className="mt-1.5 md:mt-2 flex gap-[2px] md:gap-[3px]">
              {code.split("").map((symbol, j) => (
                <motion.span
                  key={j}
                  className={`h-[3px] md:h-1 rounded-full bg-indigo-500 ${
                    symbol === "." ? "w-[3px] md:w-1" : "w-1.5 md:w-2.5"
                  }`}
                  initial={reduceMotion ? false : { opacity: 0.15 }}
                  animate={
                    reduceMotion ? { opacity: 0.6 } : play ? { opacity: [0.15, 1, 0.6] } : undefined
                  }
                  transition={{ duration: 0.5, delay: start + j * SYMBOL_STEP, times: [0, 0.3, 1] }}
                />
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
};

const TypedLine = ({ text, play, onDone, className }) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? text.length : 0);
  const done = count >= text.length;

  useEffect(() => {
    if (!play || done) return;
    const timeout = setTimeout(
      () => setCount((current) => current + 1),
      count === 0 ? TYPING_START_MS : TYPING_SPEED_MS
    );
    return () => clearTimeout(timeout);
  }, [play, count, done]);

  useEffect(() => {
    if (done) onDone();
  }, [done]);

  return (
    <p className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        <span
          className={`ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-indigo-600 motion-reduce:hidden ${
            done ? "animate-caret-blink" : ""
          }`}
        />
      </span>
    </p>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  const introRef = useRef();
  const play = useInView(introRef, { once: true });
  const [taglineDone, setTaglineDone] = useState(false);

  return (
    <Section mobileTop>
      <div ref={introRef}>
        <h1 className="mt-8 md:mt-0">
          <span className="sr-only">Hi, I'm {HERO_NAME}</span>
          <span aria-hidden="true" className="block text-xl md:text-2xl font-semibold text-gray-600">
            Hi, I'm
          </span>
          <span className="mt-1 md:mt-2 block font-serif text-4xl md:text-6xl leading-tight text-indigo-950">
            <MorseName name={HERO_NAME} play={play} />
          </span>
        </h1>
        <div className="mt-5 md:mt-7 max-w-[20rem] md:max-w-[22rem]">
          <TypedLine
            text={HERO_TAGLINE}
            play={play}
            onDone={() => setTaglineDone(true)}
            className="text-lg md:text-xl font-medium leading-snug text-gray-900"
          />
          <motion.p
            className="mt-3 text-[15px] md:text-lg leading-relaxed text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: taglineDone ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            Currently working at the University of Melbourne. Let's connect and build
            something great!
          </motion.p>
        </div>
      </div>
      <motion.div
        className="flex flex-wrap gap-3 mt-6 md:mt-10"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        <button
          onClick={() => setSection(4)}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3.5 px-7 rounded-lg font-semibold text-base md:text-lg"
        >
          Contact me
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 px-7 rounded-lg font-semibold text-base md:text-lg text-indigo-950 ring-2 ring-inset ring-indigo-950 hover:bg-indigo-950 hover:text-white transition-colors"
        >
          Resume
        </a>
      </motion.div>
    </Section>
  );
};

// On large screens each group is pinned to a point on the wireframe avatar.
// `top` and `offset` use vh because the avatar's on-screen size follows viewport height.
const skillGroups = [
  {
    name: "AI & LLMs",
    anchor: "headLeft",
    side: "left",
    top: "24vh",
    offset: "19vh",
    skills: [
      { title: "Generative AI (LLMs, RAG)", level: 85 },
      { title: "Agentic AI / MCP", level: 80 },
    ],
  },
  {
    name: "Languages",
    anchor: "handLeft",
    side: "left",
    top: "52vh",
    offset: "19vh",
    skills: [
      { title: "Python", level: 90 },
      { title: "C++", level: 90 },
      { title: "C#", level: 85 },
      { title: "JavaScript", level: 75 },
    ],
  },
  {
    name: "Cloud & data",
    anchor: "chestRight",
    side: "right",
    top: "43vh",
    offset: "21vh",
    skills: [
      { title: "AWS Cloud", level: 88 },
      { title: "DevOps", level: 70 },
      { title: "MySQL / MongoDB", level: 80 },
    ],
  },
  {
    name: "Web, mobile & 3D",
    anchor: "handRight",
    side: "right",
    top: "70vh",
    offset: "19vh",
    skills: [
      { title: "React / React Native", level: 75 },
      { title: "Three.js / R3F", level: 70 },
    ],
  },
  {
    name: "Testing & telephony",
    anchor: "headRight",
    side: "right",
    top: "21vh",
    offset: "19vh",
    skills: [
      { title: "Software Testing & QA", level: 85 },
      { title: "Asterisk PBX / VoIP", level: 75 },
    ],
  },
];

const METER_SEGMENTS = 10;

const SkillMeter = ({ title, level, delay }) => {
  const segments = Array.from({ length: METER_SEGMENTS });
  return (
    <div
      className="relative flex gap-[3px] w-24 shrink-0 lg:w-full"
      role="meter"
      aria-label={title}
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {segments.map((_, i) => (
        <span key={i} className="h-2 lg:h-2.5 flex-1 rounded-[2px] border border-white/30" />
      ))}
      <motion.div
        className="absolute inset-0 flex gap-[3px]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        variants={{
          visible: {
            clipPath: `inset(0 ${100 - level}% 0 0)`,
            transition: { duration: 0.9, delay, ease: "easeOut" },
          },
        }}
      >
        {segments.map((_, i) => (
          <span key={i} className="flex-1 rounded-[2px] bg-indigo-400" />
        ))}
      </motion.div>
    </div>
  );
};

const SkillCallout = ({ group, cardRef, firstSkillIndex }) => (
  <div
    ref={cardRef}
    className="border-l border-indigo-300/40 pl-3 lg:absolute lg:w-60 lg:rounded-xl lg:border-0 lg:bg-[#212121]/70 lg:p-4 lg:ring-1 lg:ring-white/10 lg:backdrop-blur-sm"
    style={{
      top: group.top,
      [group.side === "left" ? "right" : "left"]: `calc(50% + ${group.offset})`,
    }}
  >
    <h3 className="text-sm font-semibold text-indigo-300">{group.name}</h3>
    <ul className="mt-1.5 space-y-2 lg:mt-3 lg:space-y-3">
      {group.skills.map((skill, i) => (
        <li
          key={skill.title}
          className="flex items-center justify-between gap-4 lg:flex-col lg:items-stretch lg:gap-1.5"
        >
          <span className="text-sm lg:text-[15px] font-semibold text-gray-100">{skill.title}</span>
          <SkillMeter
            title={skill.title}
            level={skill.level}
            delay={1.4 + (firstSkillIndex + i) * 0.06}
          />
        </li>
      ))}
    </ul>
  </div>
);

const firstSkillIndexes = skillGroups.map((_, i) =>
  skillGroups.slice(0, i).reduce((count, group) => count + group.skills.length, 0)
);

const SkillsSection = () => {
  const calloutsRef = useRef();
  const svgRef = useRef();
  const cardRefs = useRef([]);
  const lineRefs = useRef([]);
  const dotRefs = useRef([]);
  const inView = useInView(calloutsRef, { amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const largeScreen = window.matchMedia("(min-width: 1024px)");
    let frame;

    const drawLeaderLines = () => {
      frame = requestAnimationFrame(drawLeaderLines);
      const svg = svgRef.current;
      const show = largeScreen.matches && skillAnchors.visible;
      svg.style.opacity = show ? "1" : "0";
      if (!show) return;

      const origin = svg.getBoundingClientRect();
      const cards = cardRefs.current.map((card) => card.getBoundingClientRect());
      skillGroups.forEach((group, i) => {
        const anchor = skillAnchors.points[group.anchor];
        if (!anchor) return;
        const fromLeft = group.side === "left";
        const startX = (fromLeft ? cards[i].right : cards[i].left) - origin.left;
        const startY = cards[i].top + 26 - origin.top;
        const elbowX = startX + (fromLeft ? 28 : -28);
        const endX = anchor.x - origin.left;
        const endY = anchor.y - origin.top;
        lineRefs.current[i].setAttribute("d", `M${startX} ${startY}H${elbowX}L${endX} ${endY}`);
        dotRefs.current[i].setAttribute("transform", `translate(${endX} ${endY})`);
      });
    };

    drawLeaderLines();
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <Section>
      <div className="lg:absolute lg:left-8 lg:top-[13vh]">
        <h2 className="text-3xl md:text-5xl font-serif text-white">Skills</h2>
        <p className="mt-2 md:mt-3 max-w-xs text-sm md:text-lg text-white/60">
          From the AI in my head to the code in my hands.
        </p>
      </div>
      <motion.div
        ref={calloutsRef}
        whileInView="visible"
        className="mt-5 md:mt-8 -mx-4 w-[calc(100%+2rem)] md:max-w-md space-y-4 rounded-2xl bg-[#212121]/75 p-4 backdrop-blur-sm lg:absolute lg:inset-0 lg:m-0 lg:w-auto lg:max-w-none lg:space-y-0 lg:rounded-none lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
      >
        {skillGroups.map((group, i) => (
          <SkillCallout
            key={group.name}
            group={group}
            cardRef={(el) => (cardRefs.current[i] = el)}
            firstSkillIndex={firstSkillIndexes[i]}
          />
        ))}
        <svg
          ref={svgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible opacity-0 transition-opacity duration-300 lg:block"
        >
          {skillGroups.map((group, i) => (
            <g key={group.name}>
              <motion.path
                ref={(el) => (lineRefs.current[i] = el)}
                fill="none"
                stroke="#a5b4fc"
                strokeOpacity={0.7}
                strokeWidth={1.25}
                initial={{ pathLength: 0 }}
                variants={{
                  visible: {
                    pathLength: 1,
                    transition: { duration: 0.8, delay: 1.1 + i * 0.1, ease: "easeOut" },
                  },
                }}
              />
              <g ref={(el) => (dotRefs.current[i] = el)}>
                <motion.g
                  initial={{ scale: 0 }}
                  variants={{
                    visible: { scale: 1, transition: { duration: 0.3, delay: 1.7 + i * 0.1 } },
                  }}
                >
                  <circle r={5.5} fill="#212121" fillOpacity={0.6} stroke="#a5b4fc" strokeWidth={1.5} />
                  <circle r={2} fill="#c7d2fe" />
                </motion.g>
              </g>
            </g>
          ))}
        </svg>
      </motion.div>
    </Section>
  );
};

const workExperiences = [
  {
    company: "University of Melbourne",
    program: "IT Emerging Talent Graduate Program",
    roles: [
      {
        role: "DevOps Software Engineer",
        period: "Oct 2026 - Present",
        description: "Working as a DevOps Software Engineer on my second graduate program rotation.",
        tags: ["DevOps"],
      },
      {
        role: "GenAI Developer",
        period: "Feb 2026 - Oct 2026",
        description: "Built AI applications in the Product Innovation team using Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), Model Context Protocol (MCP) and Agentic AI.",
        tags: ["RAG", "LLMs", "MCP", "Agentic AI"],
      },
    ],
  },
  {
    role: "Software and Game Test Engineer",
    company: "BMM Testlabs",
    period: "Sep 2025 - Dec 2025",
    description: "Performed game code analysis, regression testing and artwork/UI verification on slot machine games, ensuring releases met gaming industry standards and regulatory requirements.",
    tags: ["Code analysis", "Regression testing", "UI verification"],
  },
  {
    role: "Software Developer - AI Trainer",
    company: "DataAnnotation",
    period: "Feb 2025 - Aug 2025",
    description: "Developed Python applications and real-world software engineering tasks (algorithms, APIs, automation) used to train and fine-tune AI models.",
    tags: ["Python", "APIs", "Automation"],
  },
  {
    role: "Junior Software Developer",
    company: "Smart Ping AI",
    period: "March 2024 - Jan 2025",
    description: "Leveraged the Panoramisk library in Python to interface with AMI, enabling real-time management of PBX operations, including channel monitoring, call origination, call handling, and extension management.",
    tags: ["Python", "Panoramisk", "Asterisk AMI", "PBX"],
  },
  {
    role: "ChatGPT Developer Intern",
    company: "AML Cloud",
    period: "Feb 2023 - May 2023",
    description: "Assisted in the development of AML software, using Python and text-davinci-003 GPT model to perform name matching and sanction screening.",
    tags: ["Python", "OpenAI GPT", "Name matching"],
  },
  {
    role: "Mobile Application Developer Intern",
    company: "Doodel Pty Ltd",
    period: "Aug 2022 - Nov 2022",
    description: "Conceptualised and developed a mobile application using React Native and integrated Shopify storefront API into the mobile app.",
    tags: ["React Native", "Shopify Storefront API"],
  },
  {
    role: "Software Developer Intern",
    company: "Quadrant Televentures Limited",
    period: "Nov 2021 - Dec 2021",
    description: "Assisted in the development of IVR, implemented voice recognition and text-to-speech conversion features.",
    tags: ["IVR", "Voice recognition", "Text-to-speech"],
  },
];

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// Dates are counted in months since year 0 so roles can be laid out on one linear scale.
const parseMonth = (text) => {
  const [month, year] = text.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(month.slice(0, 3).toLowerCase());
};

const parsePeriod = (period) => {
  const [start, end] = period.split(/\s+[-–]\s+/);
  const ongoing = /present/i.test(end);
  const today = new Date();
  return {
    start: parseMonth(start),
    end: ongoing ? today.getFullYear() * 12 + today.getMonth() : parseMonth(end),
    ongoing,
  };
};

const formatDuration = (months) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [
    years && `${years} ${years === 1 ? "year" : "years"}`,
    rest && `${rest} ${rest === 1 ? "month" : "months"}`,
  ]
    .filter(Boolean)
    .join(" ");
};

const careerRoles = workExperiences
  .flatMap((experience) =>
    experience.roles
      ? experience.roles.map((role) => ({
          ...role,
          company: experience.company,
          program: experience.program,
        }))
      : [experience]
  )
  .map((role) => ({ ...role, ...parsePeriod(role.period) }));

const firstYear = Math.floor(Math.min(...careerRoles.map((role) => role.start)) / 12);
const lastYear = Math.floor(Math.max(...careerRoles.map((role) => role.end)) / 12);
const timelineYears = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
const toTimelinePercent = (month) =>
  ((month - firstYear * 12) / ((lastYear + 1 - firstYear) * 12)) * 100;

const TimelineRow = (props) => {
  const { role, index, active, onSelect, buttonRef } = props;
  const left = toTimelinePercent(role.start);
  const width = toTimelinePercent(role.end + 1) - left;

  return (
    <button
      ref={buttonRef}
      role="tab"
      id={`role-tab-${index}`}
      aria-selected={active}
      aria-controls="role-panel"
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      className={`group grid w-full grid-cols-1 md:grid-cols-[13rem_1fr] items-center gap-x-6 gap-y-2 -mx-3 px-3 py-2 md:py-2.5 rounded-lg text-left transition-colors ${
        active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
      }`}
    >
      <span className="flex min-w-0 items-baseline gap-2 md:block">
        <span
          className={`truncate shrink-0 max-w-[70%] md:max-w-none md:block text-sm md:text-[15px] font-semibold transition-colors ${
            active ? "text-white" : "text-white/70 group-hover:text-white"
          }`}
        >
          {role.role}
        </span>
        <span
          className={`truncate min-w-0 md:block text-xs md:text-sm font-medium transition-colors ${
            active ? "text-indigo-200" : "text-indigo-200/75 group-hover:text-indigo-200"
          }`}
        >
          {role.company}
        </span>
      </span>
      <span className="relative h-2 md:h-2.5">
        <span className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
        <span
          className={`absolute inset-y-0 rounded-full transition-colors ${
            active
              ? "bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,0.7)]"
              : "bg-white/35 group-hover:bg-white/70"
          }`}
          style={{ left: `${left}%`, width: `max(${width}%, 6px)` }}
        >
          {role.ongoing && (
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-indigo-300">
              <span className="absolute inset-0 rounded-full bg-indigo-300 motion-safe:animate-ping" />
            </span>
          )}
        </span>
      </span>
    </button>
  );
};

const RoleDetail = ({ role, index }) => (
  <div
    id="role-panel"
    role="tabpanel"
    aria-labelledby={`role-tab-${index}`}
    className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-5 md:p-7"
  >
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <p className="text-base font-semibold text-indigo-200">{role.company}</p>
      {role.program && <p className="text-sm text-white/70">{role.program}</p>}
      <h3 className="mt-3 font-serif text-2xl md:text-3xl leading-tight text-white">
        {role.role}
      </h3>
      <p className="mt-2 flex flex-wrap gap-x-3 text-sm text-white/60">
        <span>{role.period.replace(/\s+-\s+/, " – ")}</span>
        <span className="text-white/40">{formatDuration(role.end - role.start + 1)}</span>
      </p>
      <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80">
        {role.description}
      </p>
      {role.tags?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools and skills">
          {role.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  </div>
);

const WorkExperienceSection = () => {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);

  const focusRole = (index) => {
    const next = (index + careerRoles.length) % careerRoles.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusRole(selected + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusRole(selected - 1);
    }
  };

  return (
    <Section>
      <div className="w-full">
        <h2 className="text-3xl md:text-5xl font-serif text-white">Work Experience</h2>
        <p className="mt-2 md:mt-3 max-w-xl text-sm md:text-lg text-white/60">
          From Game Testing to GenAI apps and DevOps today.
        </p>
        <div className="mt-5 md:mt-10 grid items-start gap-5 lg:gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <div className="grid md:grid-cols-[13rem_1fr] md:gap-x-6" aria-hidden="true">
              <span className="hidden md:block" />
              <div className="relative h-5 text-[11px] md:text-xs tabular-nums text-white/55">
                {timelineYears.map((year) => (
                  <span
                    key={year}
                    className="absolute top-0 pl-1.5"
                    style={{ left: `${toTimelinePercent(year * 12)}%` }}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="relative"
              role="tablist"
              aria-label="Roles over time"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 hidden md:block md:left-[calc(13rem+1.5rem)]"
              >
                {[...timelineYears, lastYear + 1].map((year) => (
                  <span
                    key={year}
                    className="absolute inset-y-0 border-l border-white/10"
                    style={{ left: `${toTimelinePercent(year * 12)}%` }}
                  />
                ))}
              </div>
              {careerRoles.map((role, index) => (
                <TimelineRow
                  key={`${role.company}-${role.role}`}
                  role={role}
                  index={index}
                  active={index === selected}
                  onSelect={() => setSelected(index)}
                  buttonRef={(el) => (tabRefs.current[index] = el)}
                />
              ))}
            </div>
          </div>
          <RoleDetail role={careerRoles[selected]} index={selected} />
        </div>
      </div>
    </Section>
  );
};

const projectLinkLabel = (url) => {
  if (url.includes("github.com")) return "View code on GitHub";
  if (url.includes("linkedin.com")) return "View on LinkedIn";
  if (url.includes("xd.adobe.com")) return "Open prototype";
  return "Open live demo";
};

const stopCanvasClick = (e) => e.stopPropagation();

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [category, setCategory] = useAtom(projectFilterAtom);
  const containerRef = useRef();
  const inView = useInView(containerRef, { amount: 0.6 });
  const visibleProjects = getVisibleProjects(category);
  const project = visibleProjects[currentProject] ?? visibleProjects[0];

  const nextProject = () => {
    setCurrentProject((current) => (current + 1) % visibleProjects.length);
  };

  const previousProject = () => {
    setCurrentProject((current) => (current - 1 + visibleProjects.length) % visibleProjects.length);
  };

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory);
    setCurrentProject(Math.floor(getVisibleProjects(nextCategory).length / 2));
  };

  useEffect(() => {
    if (!inView) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") previousProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inView, visibleProjects.length]);

  return (
    <Section>
      <div ref={containerRef} className="absolute inset-0">
        <div className="absolute left-8 right-8 top-[9vh] md:top-[8vh]" onClick={stopCanvasClick}>
          <h2 className="text-3xl md:text-5xl font-serif text-white">Projects</h2>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {projectCategories.map((name) => {
              const count = getVisibleProjects(name).length;
              const active = name === category;
              return (
                <button
                  key={name}
                  onClick={() => selectCategory(name)}
                  aria-pressed={active}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-white text-gray-900"
                      : "bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20"
                  }`}
                >
                  {name}
                  <span className={`ml-1.5 tabular-nums ${active ? "text-gray-500" : "text-white/60"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="absolute inset-x-6 md:inset-x-8 top-[57vh] md:top-[56vh] flex flex-col items-center text-center"
          onClick={stopCanvasClick}
        >
          <div aria-live="polite">
            <motion.div
              key={project.title}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-serif text-3xl md:text-4xl text-white">{project.title}</h3>
              <p className="mt-2 max-w-md text-[15px] md:text-base leading-relaxed text-white/85">
                {project.description}
              </p>
            </motion.div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={previousProject}
                aria-label="Previous project"
                className="grid h-11 w-11 place-items-center rounded-full text-white ring-1 ring-inset ring-white/40 hover:bg-white hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft aria-hidden="true" />
              </button>
              <span className="w-14 text-sm font-medium tabular-nums text-white/80">
                {currentProject + 1} / {visibleProjects.length}
              </span>
              <button
                onClick={nextProject}
                aria-label="Next project"
                className="grid h-11 w-11 place-items-center rounded-full text-white ring-1 ring-inset ring-white/40 hover:bg-white hover:text-gray-900 transition-colors"
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-indigo-100 transition-colors"
            >
              {projectLinkLabel(project.url)}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

const melbourneTimeFormat = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Melbourne",
  hour: "numeric",
  minute: "2-digit",
});

const MelbourneTime = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm text-gray-800">
      It's <span className="font-semibold tabular-nums">{melbourneTimeFormat.format(now)}</span> in
      Melbourne right now.
    </p>
  );
};

const inputClassName =
  "block w-full rounded-lg border-0 bg-white/90 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600";

const ContactSection = () => {
  const [state, setState] = useState({
    submitting: false,
    succeeded: false,
    errors: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    
    if (!name || !email || !message) {
      setState(prev => ({
        ...prev, 
        errors: ['Fill in your name, email and message to send.']
      }));
      return;
    }

    
    setState(prev => ({ ...prev, submitting: true }));

    try {
      
      const result = await emailjs.send(
        'service_xchakhk',    
        'template_3sm0n4h',   
        {
          from_name: name,
          from_email: email,
          message: message
        },
        'eCqPlqXBogDOH93Fb'     
      );

      
      setState({
        submitting: false,
        succeeded: true,
        errors: []
      });
    } catch (error) {
      
      setState(prev => ({
        ...prev,
        submitting: false,
        errors: ["Your message didn't send. Check your connection and try again, or email me directly."]
      }));
      console.error('Email send error:', error);
    }
  };

  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-serif">Get in Touch</h2>
      <p className="mt-3 max-w-sm text-gray-800">
        Have a role, a project or an idea? Send me a message.
      </p>
      <div className="mt-6 w-96 max-w-full rounded-2xl bg-white/60 p-6 md:p-8 ring-1 ring-white/70 backdrop-blur-md">
        {state.succeeded ? (
          <div role="status">
            <p className="font-serif text-2xl text-gray-900">Message sent</p>
            <p className="mt-2 text-gray-700">Thanks for reaching out. I'll reply to the email you gave.</p>
            <button
              onClick={() => setState({ submitting: false, succeeded: false, errors: [] })}
              className="mt-6 font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {state.errors.length > 0 && (
              <div className="text-red-700 text-sm mb-4" role="alert">
                {state.errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <label htmlFor="name" className="font-medium text-gray-900 block mb-1">Name</label>
            <input type="text" name="name" id="name" autoComplete="name" className={inputClassName} />
            <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-5">Email</label>
            <input type="email" name="email" id="email" autoComplete="email" className={inputClassName} />
            <label htmlFor="message" className="font-medium text-gray-900 block mb-1 mt-5">Message</label>
            <textarea name="message" id="message" className={`h-28 md:h-32 resize-none ${inputClassName}`} />
            <button
              disabled={state.submitting}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition-colors text-white py-3.5 px-8 rounded-lg font-bold text-lg"
            >
              {state.submitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <SocialLinks className="-ml-2" />
        <MelbourneTime />
      </div>
    </Section>
  );
};
