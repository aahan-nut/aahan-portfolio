import type { Link, RoboticsSeason, Text } from "./types";

/** Competition robotics, condensed on the homepage; details live on the team site. */
export const competitionRobotics: {
  title: string;
  intro: Text;
  program: Text;
  site: Link;
  seasons: RoboticsSeason[];
} = {
  title: "Competition Robotics",
  intro: "Two seasons of competition robots: vision, object detection, and autonomous pathing.",
  program: "FIRST Tech Challenge · Team #23441, CSK Develop3rs · Programming Head & Drive Team Coach",
  site: { label: "Team 23441 robots", href: "https://team23441.com/robots.html" },
  seasons: [
    {
      robot: "Khronos",
      season: "2025–26",
      summary:
        "ArcCV vision, an object-detection model trained on 1,000+ images, and PedroPathing for autonomous paths.",
      highlights: [
        { value: "Top 5.5%", label: "OPR, global" },
        { value: "#276", label: "Autonomous, worldwide" },
        { value: "Finalist", label: "Alliance, Palmdale ILT" },
        { value: "2×", label: "Think Award" },
      ],
      tools: ["ArcCV", "Object detection", "PedroPathing"],
      photos: [
        { kind: "photo", src: "/projects/robotics/khronos-field.webp", alt: "Khronos on the field among game balls", caption: "Khronos.", aspect: "4 / 3" },
        { kind: "photo", src: "/projects/robotics/khronos-awards.webp", alt: "Khronos with its Think Award and Finalist Alliance trophies from Palmdale 2026", caption: "Think Award and Finalist Alliance, Palmdale 2026.", aspect: "4 / 3" },
        { kind: "photo", src: "/projects/robotics/arccv.webp", alt: "ArcCV sorting visualization tracking an AprilTag and game balls", caption: "ArcCV visualization — telemetry in the image is simulated.", aspect: "4 / 3" },
      ],
    },
    {
      robot: "Orca",
      season: "2024–25",
      summary: "Programmed the autonomous using Roadrunner for pathing.",
      highlights: [],
      tools: ["Roadrunner"],
      photos: [{ kind: "photo", src: "/projects/robotics/orca.webp", alt: "Orca, the 2024–25 robot", caption: "Orca.", aspect: "4 / 3" }],
    },
  ],
};
