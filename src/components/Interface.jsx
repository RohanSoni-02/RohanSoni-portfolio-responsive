import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
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
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <WorkExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Rohan Soni</span>
      </h1>
      <motion.p
        className="text-lg text-black-600 mt-4"
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
          delay: 1.5,
        }}
      >
        I'm a passionate Software Engineer from Melbourne.
        <br />
        Let's connect and build something great!
      </motion.p>
      <motion.button
        onClick={() => setSection(4)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
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
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "C++",
    level: 90,
  },
  {
    title: "Python",
    level: 83,
  },
  {
    title: "C#",
    level: 85,
  },
  {
    title: "JavaScript",
    level: 75,
  },
  {
    title: "Kotlin",
    level: 70,
  },
  {
    title: "React.js",
    level: 75,
  },
  {
    title: "Three.js / R3F",
    level: 70,
  },
  {
    title: "MySQL",
    level: 85,
  },
  {
    title: "MongoDB",
    level: 70,
  },
  {
    title: "AWS Cloud",
    level: 85,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight md:tracking-normal font-serif text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

const workExperiences = [
  {
    role: "Junior Software Developer",
    company: "Smart Ping AI",
    period: "March 2024 - Jan 2025",
    description: "Leveraged the Panoramisk library in Python to interface with AMI, enabling real-time management of PBX operations, including channel monitoring, call origination, call handling, and extension management."
  },
  {
    role: "ChatGPT Developer Intern",
    company: "AML Cloud",
    period: "Feb 2023 - May 2023",
    description: "Assisted in the development of AML software, using Python and text-davinci-003 GPT model to perform name matching and sanction screening."
  },
  {
    role: "Mobile Application Developer Intern",
    company: "Doodel Pty Ltd",
    period: "Aug 2022 - Nov 2022",
    description: "Conceptualised and developed a mobile application using React Native and integrated Shopify storefront API into the mobile app."
  },
  {
    role: "Software Developer Intern",
    company: "Quadrant Televentures Limited",
    period: "Nov 2021 - Dec 2021",
    description: "Assisted in the development of IVR, implemented voice recognition and text-to-speech conversion features."
  },
];

const WorkExperienceSection = () => {
  return (
    <Section>
      <motion.div className="w-full md:pt-0 pt-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight md:tracking-normal font-serif text-white">
          Work Experience
        </h2>
        <div className="mt-6 space-y-6">
          {workExperiences.map((experience, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-20 p-4 md:p-6 rounded-lg backdrop-blur-sm"
              initial={{ 
                opacity: 0, 
                y: 50 
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                y: -50 
              }}
              transition={{ 
                duration: 1, 
                delay: 0.8 + index * 0.08 // Reduced delay for smoother animation
              }}
              viewport={{ 
                once: false, // Allows animation to trigger multiple times
                amount: 0.3 // Triggers when 30% of element is in view
              }}
            >
              <h3 className="text-lg md:text-xl font-bold text-white">{experience.role}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm md:text-base text-indigo-200 font-medium">{experience.company}</span>
                <span className="text-xs md:text-sm text-gray-300">{experience.period}</span>
              </div>
              <p className="mt-3 text-sm md:text-base text-gray-200">{experience.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-white transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight md:tracking-normal font-serif">
  Projects
</h2>

        <button
          className="hover:text-white transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

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
        errors: ['Please fill in all fields']
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
        errors: ['Failed to send message. Please try again.']
      }));
      console.error('Email send error:', error);
    }
  };

  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight md:tracking-normal font-serif">Get in Touch</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {state.errors.length > 0 && (
              <div className="text-red-500 mb-4">
                {state.errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <label htmlFor="name" className="font-medium text-gray-900 block mb-1">Name</label>
            <input type="text" name="name" id="name" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3" />
            <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">Email</label>
            <input type="email" name="email" id="email" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3" />
            <label htmlFor="message" className="font-medium text-gray-900 block mb-1 mt-8">Message</label>
            <textarea name="message" id="message" className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3" />
            <button disabled={state.submitting} className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
              {state.submitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
      <div className="flex space-x-4 mt-4">
        <a href="https://www.linkedin.com/in/rohan-soni-389591203/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-10 h-10 text-blue-600 hover:text-blue-800 transition" />
        </a>
        <a href="https://github.com/RohanSoni-02" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-10 h-10 text-gray-800 hover:text-black transition" />
        </a>
        <a href="mailto:soni.rohanchd@gmail.com">
          <FaEnvelope className="w-10 h-10 text-red-600 hover:text-red-800 transition" />
        </a>
        <a href="https://leetcode.com/RohanS02/">
          <SiLeetcode className="w-10 h-10 text-red-600 hover:text-red-800 transition" />
        </a>
      </div>
    </Section>
  );
};
