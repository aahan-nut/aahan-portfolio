import type { Link, Text } from "./types";

export const site: {
  name: string;
  role: string;
  intro: Text[];
  about: Text[];
  aspirations: Text[];
  contact: Link[];
} = {
  name: "Aahan Nellutla",
  role: "Robotics · Computer Vision · Research · Software",
  intro: [
    "A student engineer interested in how machines perceive, reason, and interact with the world. I explore those questions through robotics, computer vision, neural network research, and software projects.",
  ],
  about: [
    "My interest in engineering grew through competing in FIRST Tech Challenge, where I became my team’s programming lead and developed autonomous robot behavior. Seeing code translate into physical movement drew me toward the connections between software, sensors, and mechanical design.",
    "That curiosity led me to independent projects, including a robotic hand that mirrors camera-detected movements, and research into how neural networks make predictions. I enjoy working across disciplines, figuring out how individual components come together to create a functioning system. Along the way, I’ve learned to approach uncertainty by building, testing, and adjusting rather than waiting until I have every answer.",
  ],
  aspirations: [
    "I want to study robotics and the computer science, electrical engineering, and mechanical design that make intelligent systems possible. I’m especially interested in how robots connect perception with decision-making and physical action, allowing them to adapt to unfamiliar environments.",
    "Looking ahead, I hope to work on autonomous and assistive technologies that respond to people’s needs and function reliably beyond controlled settings.",
  ],
  contact: [
    { label: "Email", href: "mailto:aahan.nellutla@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aahan-nellutla-689211414/" },
    { label: "GitHub", href: "https://github.com/aahan-nut" },
  ],
};
