import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohan-soni-389591203/",
    Icon: FaLinkedin,
    hoverColor: "hover:text-[#0A66C2]",
  },
  {
    label: "GitHub",
    href: "https://github.com/RohanSoni-02",
    Icon: FaGithub,
    hoverColor: "hover:text-black",
  },
  {
    label: "Email",
    href: "mailto:soni.rohanchd@gmail.com",
    Icon: FaEnvelope,
    hoverColor: "hover:text-indigo-600",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/RohanS02/",
    Icon: SiLeetcode,
    hoverColor: "hover:text-[#FFA116]",
  },
];

export const SocialLinks = ({ className = "" }) => (
  <ul className={`flex items-center gap-1 ${className}`}>
    {links.map(({ label, href, Icon, hoverColor }) => (
      <li key={label}>
        <a
          href={href}
          aria-label={label}
          title={label}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={`block rounded-lg p-2 text-gray-800 transition-colors ${hoverColor}`}
        >
          <Icon className="h-7 w-7" />
        </a>
      </li>
    ))}
  </ul>
);
