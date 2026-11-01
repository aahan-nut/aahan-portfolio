import type { Project } from "./types";

/**
 * Featured projects, in homepage order. Every statement here comes from
 * Aahan's notes and checklist answers. Figures without `src` render as
 * marked placeholders until the image is uploaded.
 *
 * Competition robots (Khronos, Orca) live in ./robotics.ts.
 */
export const projects: Project[] = [
  {
    slug: "robotic-hand",
    title: "Camera-Controlled Robotic Hand",
    tagline: "A robotic hand that mirrors hand movements detected by a camera",
    period: "2025–26",
    domains: ["Robotics", "Computer Vision"],
    status: "in-progress",
    composition: "hardware",
    featured: true,
    pageReady: true,
    summary:
      "A camera tracks a hand with MediaPipe and OpenCV, and a 3D-printed robotic hand driven by an Arduino mirrors its movements. In progress: recognising and signing ASL.",
    media: {
      labels: ["Photo", "CAD"],
      a: {
        kind: "photo",
        src: "/projects/robotic-hand/photo.webp",
        alt: "The built robotic hand and forearm, with servos and wiring visible inside the forearm",
        caption: "The finished hand. Servos sit inside the open forearm.",
        aspect: "16 / 9",
      },
      b: {
        kind: "cad",
        src: "/projects/robotic-hand/cad.webp",
        alt: "Rendered CAD parts of the robotic hand: palm, finger segments, thumb, servo horns, servo holder, and forearm pieces",
        caption: "The 3D-printed parts, rendered from the STL files. Custom design inspired by a combination of several existing models.",
        aspect: "16 / 9",
        annotations: [
          { x: 24.0, y: 33.4, label: "Palm" },
          { x: 53.2, y: 23.3, label: "Finger segments" },
          { x: 65.8, y: 22.4, label: "Thumb" },
          { x: 78.2, y: 23.7, label: "Servo horns" },
          { x: 90.8, y: 21.0, label: "Servo holder" },
          { x: 53.2, y: 55.1, label: "Forearm shell" },
          { x: 65.8, y: 64.4, label: "Forearm cap" },
          { x: 78.2, y: 61.5, label: "Forearm base" },
          { x: 90.8, y: 60.4, label: "Rotation base" },
        ],
      },
    },
    secondary: {
      kind: "screenshot",
      src: "/projects/robotic-hand/gesture-open.webp",
      alt: "Camera view with MediaPipe's 21 hand landmarks drawn over an open hand, labelled OPEN",
      caption: "The vision program tracking 21 landmarks and classifying the gesture as OPEN.",
      aspect: "16 / 9",
    },
    stack: ["MediaPipe", "OpenCV", "Arduino Uno", "Servos", "3D printing"],
    facts: [
      { label: "Role", value: "Independent project" },
      { label: "Vision", value: "MediaPipe hand landmarks + OpenCV" },
      { label: "Controller", value: "Arduino Uno Rev3, over USB 2.0 (A/B)" },
      { label: "Actuation", value: "5 standard servos + 1 MG90S micro servo" },
      { label: "Build", value: "3D-printed fingers; custom CAD" },
    ],
    milestones: [
      { label: "Mirror camera-detected hand movements", state: "completed" },
      { label: "ASL integration: detect and mirror ASL signs", state: "in-progress" },
      { label: "Audio translation of detected signs", state: "planned" },
      { label: "Program the hand to respond in ASL", state: "planned" },
    ],
    overview: [
      "The robotic hand copies the movements of a human hand in front of a camera. A vision program finds the hand in each frame, and an Arduino drives servos to reproduce the pose — including wrist rotation.",
      "It was my first project covering every layer myself, from the CAD and wiring to the computer vision and control code.",
    ],
    contribution: {
      items: [
        "Designed the hand in CAD — a custom design inspired by a combination of several existing models — and 3D printed the fingers.",
        "Wired the servos to an Arduino Uno Rev3.",
        "Programmed the computer vision that detects the hand and the code that turns detections into physical movement.",
      ],
      note: "Independent project.",
    },
    howItWorks: {
      body: [
        "A camera feeds frames to a program built on OpenCV and MediaPipe. MediaPipe reports landmarks — numbered points on the hand — and the program turns them into servo commands, sent to the Arduino over a USB cable. The Arduino then moves the fingers, thumb, and wrist.",
      ],
      diagram: "hand-landmarks",
      explainers: [
        {
          title: "Computer vision — MediaPipe + OpenCV",
          body: [
            "OpenCV handles the camera feed and MediaPipe detects the hand, returning its 21 landmarks. The landmark positions are what the rest of the system works from.",
            "The program also classifies gestures — such as open, point, and pinch — and shows both a raw and a stable gesture reading on screen.",
          ],
        },
        {
          title: "Computer to Arduino",
          body: ["The computer talks to an Arduino Uno Rev3 through a USB 2.0 Type A/B cable."],
        },
        {
          title: "Actuation",
          body: [
            "Five standard servos drive finger movement and wrist rotation. A separate MG90S micro servo drives the thumb.",
          ],
        },
        {
          title: "Mechanical design",
          body: ["The fingers are 3D printed from a custom CAD design, inspired by a combination of several existing models. The parts include the palm, finger segments, thumb, servo horns, a servo holder, and a multi-piece forearm on a rotating base."],
        },
      ],
      gallery: [
        {
          kind: "screenshot",
          src: "/projects/robotic-hand/gesture-point.webp",
          alt: "Camera view with hand landmarks, gesture classified as POINT",
          caption: "Gesture classified as POINT.",
          aspect: "16 / 9",
        },
        {
          kind: "screenshot",
          src: "/projects/robotic-hand/gesture-pinch.webp",
          alt: "Camera view with hand landmarks, gesture classified as PINCH",
          caption: "Gesture classified as PINCH.",
          aspect: "16 / 9",
        },
      ],
    },
    planned: [
      "ASL integration: detect and mirror ASL signs through camera detection.",
      "Audio translation of the detected signs.",
      "Program the robotic hand to respond in ASL.",
    ],
    reflection: [
      "This was the hardest of my projects: the first time I handled every aspect myself, from software to hardware.",
    ],
  },

  {
    slug: "unspoken",
    title: "Unspoken",
    tagline: "Mental health resource website",
    period: "2026",
    domains: ["Software"],
    status: "completed",
    composition: "app",
    featured: true,
    pageReady: true,
    summary:
      "A mental health resource site for teens and young adults who find it hard to open up — with AI-assisted check-ins, a “Help me say it” tool, nearby resource search, and a parent support section.",
    media: {
      kind: "screenshot",
      src: "/projects/unspoken/home.webp",
      alt: "Unspoken homepage: “Find the words when it’s hard to speak”, with a Start a check-in button",
      caption: "Unspoken homepage.",
      aspect: "1800 / 1079",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zod", "Supabase", "PostgreSQL", "Gemini", "Google Places", "Vercel"],
    facts: [
      { label: "Role", value: "Solo" },
      { label: "Frontend", value: "Next.js, React, TypeScript, Tailwind CSS" },
      { label: "Backend", value: "Next.js API routes; Zod validates inputs and AI responses" },
      { label: "Data + auth", value: "Supabase (authentication, PostgreSQL)" },
      { label: "AI", value: "Gemini — check-ins and “Help me say it”" },
      { label: "Location", value: "Google Places for nearby resources" },
    ],
    highlights: [
      "65+ hours of programming",
      "Layered crisis detection that routes users to human support",
      "Parent support section with personalised resources",
    ],
    overview: [
      "Unspoken is designed for teenagers and young adults who may be struggling emotionally but feel uncomfortable opening up or asking for help. It aims to bridge the gap between recognising that you're struggling and reaching out.",
      "I built it after my own mental health struggles, and after learning that friends had found it just as hard to open up. It also includes a parent support section with personalised resources and guidance for supporting children with conditions such as autism and ADHD.",
    ],
    contribution: {
      items: ["Designed and built the whole application solo — 65+ hours of programming."],
    },
    howItWorks: {
      body: [
        "The site is built with Next.js, React, TypeScript, and Tailwind CSS. Next.js also runs the backend through server-side API routes, which call Gemini and Google Places, with Zod validating inputs and AI responses. Supabase handles authentication and the PostgreSQL database. The app is deployed on Vercel.",
      ],
      system: {
        title: "Application architecture.",
        stages: [
          {
            label: "Website",
            nodes: [
              { label: "Next.js + React UI", sub: "TypeScript · Tailwind CSS", detail: "The pages and tools users interact with." },
              { label: "Supabase", sub: "Auth · PostgreSQL", detail: "Authentication and the PostgreSQL database, called from the website." },
            ],
          },
          {
            label: "API routes",
            nodes: [
              {
                label: "Next.js API routes",
                sub: "Zod validation",
                detail: "Server-side routes; Zod validates incoming inputs and the AI's responses.",
              },
            ],
          },
          {
            label: "External services",
            nodes: [
              { label: "Gemini", sub: "AI features", detail: "Powers user check-ins, the “Help me say it” tool, and uncertain safety checks." },
              { label: "Google Places", sub: "Nearby search", detail: "Finds mental health resources near the user." },
            ],
          },
        ],
        footer: "Deployed on Vercel",
      },
      explainers: [
        {
          title: "Crisis safety",
          body: [
            "Because Unspoken deals with sensitive situations, safety was a major priority. If a possible crisis is detected, the normal support flow stops and the user is directed toward immediate human support, such as 988, emergency services, or a trusted adult.",
            "The safety system is layered so it never depends on a single AI call. Pattern checks run first, and only uncertain cases reach Gemini. If the AI fails or returns an invalid response, the app falls back to the safer result already found by the rule-based checks.",
          ],
        },
        {
          title: "AI features with Gemini",
          body: [
            "Gemini powers user check-ins and the “Help me say it” tool. Every AI response is validated with Zod before the app uses it.",
          ],
        },
        {
          title: "Parent support",
          body: [
            "A parent support section offers personalised resources and educational guidance for supporting children with conditions such as autism and ADHD.",
          ],
        },
      ],
      gallery: [
        { kind: "video", youtube: "AXg9piApBys", alt: "Unspoken video walkthrough", caption: "Video summary and demo of Unspoken.", aspect: "16 / 9" },
        { kind: "photo", src: "/projects/unspoken/cover.webp", alt: "Unspoken cover art: a glowing butterfly with the words “Find the words. Find support.”", caption: "Cover art.", aspect: "16 / 9" },
      ],
    },
    decisions: [
      {
        title: "Layered safety instead of a single AI call",
        body: "Rule-based pattern checks run first and only uncertain cases go to Gemini. If the AI fails or returns something invalid, the app keeps the safer rule-based result — so a crisis response never depends on the AI working.",
      },
    ],
    links: [
      { label: "Live site", href: "https://unspoken-nine.vercel.app/" },
      { label: "Video demo", href: "https://youtu.be/AXg9piApBys" },
      { label: "GitHub", href: "https://github.com/aahan-nut/unspoken" },
    ],
  },

  {
    slug: "aiea-research",
    title: "Self-Explainable Deep Neural Networks",
    tagline: "UCSC AIEA Lab, led by Professor Leilani Gilpin",
    period: "2026",
    domains: ["Research", "Software"],
    status: "in-progress",
    composition: "research",
    featured: true,
    pageReady: true,
    summary:
      "Can changing the examples a neural network references help explain its mistakes — and sometimes correct them? I tested how different sets of reference images changed a Memory Wrap model's predictions on SVHN.",
    media: {
      kind: "diagram",
      src: "/projects/aiea-research/memory-figure.webp",
      alt: "SVHN test image of a 3, misclassified as 9, shown with its ten highest-weighted correct-class reference images; the new prediction is 3",
      caption: "Index 68, correct-class memory: the model first predicted 9; with 100 class-3 reference images it predicted 3. Each reference image shows its weight.",
      aspect: "2000 / 906",
      fit: "contain",
    },
    secondary: {
      kind: "code",
      src: "/projects/aiea-research/code.webp",
      alt: "Python code for select_excluding_prediction: picks the most similar training images while excluding the originally predicted class",
      caption: "Selecting the nearest reference images while excluding the original predicted class (PyTorch).",
      aspect: "1400 / 1117",
    },
    stack: ["Python", "PyTorch", "Memory Wrap", "SVHN"],
    facts: [
      { label: "Lab", value: "AIEA Lab, UC Santa Cruz" },
      { label: "Advisor", value: "Professor Leilani Gilpin" },
      { label: "Model", value: "Pretrained Memory Wrap" },
      { label: "Dataset", value: "SVHN" },
      { label: "Tools", value: "Python, PyTorch" },
    ],
    overview: [
      "Can changing the examples a neural network references help explain its mistakes — and sometimes correct them?",
      "I investigated how different sets of reference images influenced a model's predictions, including whether a consistent selection strategy could correct errors without knowing the right answer beforehand.",
    ],
    contribution: {
      items: [
        "Implemented and ran experiments in Python and PyTorch that changed the reference images supplied to a pretrained Memory Wrap model.",
        "Tested 1,802 random memory sets and compared systematic selection strategies across 20 misclassified images, keeping the correct answers separate from the selection process.",
        "Analysed prediction changes, correction rates, and the weights assigned to individual reference images.",
        "Created the explanatory figures and wrote reports documenting the results and limitations.",
      ],
    },
    howItWorks: {
      body: [
        "Memory Wrap models predict with the help of a memory set: reference images the model consults, each given a weight. Changing which images are in the memory set changes what the model can draw on. For each of 20 misclassified SVHN images, I supplied memory sets chosen by different strategies and recorded whether the prediction changed — and whether it became correct.",
      ],
      system: {
        title: "Experiment setup.",
        stages: [
          {
            label: "Input",
            nodes: [{ label: "Misclassified image", sub: "SVHN · 20 images", detail: "A test image the model originally got wrong." }],
          },
          {
            label: "Memory set (100 images)",
            nodes: [
              { label: "Correct class", sub: "diagnostic", detail: "100 images from the correct class. Deliberately uses the known answer, so it is a diagnostic, not a usable method." },
              { label: "Random", sub: "up to 100 tries", detail: "Randomly selected sets, up to 100 attempts per input (1,802 sets in total)." },
              { label: "Most similar", sub: "cosine similarity", detail: "The 100 training images closest to the input in the model's embedding space." },
              { label: "Balanced similar", sub: "10 per class", detail: "The 10 most similar training images from each of the 10 classes." },
              { label: "Excluding predicted class", sub: "most similar", detail: "The 100 most similar images, excluding the model's original predicted class." },
            ],
          },
          {
            label: "Model",
            nodes: [{ label: "Memory Wrap", sub: "pretrained", detail: "Predicts using the memory set, and assigns a weight to each reference image." }],
          },
          {
            label: "Measured",
            nodes: [
              { label: "Prediction change", sub: "changed / corrected", detail: "Whether the prediction changed, and whether it became correct." },
              { label: "Reference weights", sub: "explanation", detail: "Which reference images the model relied on." },
            ],
          },
        ],
      },
      explainers: [
        {
          title: "Selecting similar examples without the answer",
          body: [
            "The similarity strategies use the model's image embeddings and cosine similarity to find training images close to the input. They never look at the input's correct label — only the correct-class experiment does, and it's labelled as a diagnostic.",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Keeping the answer out of selection",
        body: "Every practical strategy chooses reference images without the correct label. Using the label would make a correction meaningless outside the experiment, so the one strategy that does is treated only as a diagnostic.",
      },
    ],
    results: {
      metrics: [
        { value: "3 / 20", label: "Corrected — correct-class examples", context: "Diagnostic: used the known answer" },
        { value: "2 / 20", label: "Corrected — random sets", context: "Across 1,802 memory sets" },
        { value: "1 / 20", label: "Corrected — most similar", context: "2 predictions changed" },
        { value: "1 / 20", label: "Corrected — balanced similar", context: "2 predictions changed" },
        { value: "1 / 20", label: "Corrected — excluding predicted class", context: "4 predictions changed" },
      ],
      notes: [
        "Supplying 100 reference images from the correct class corrected 3 of the 20 mistaken predictions.",
        "Excluding the original predicted class changed the most predictions (4) but corrected only one — changing an answer does not necessarily make it more accurate.",
      ],
    },
    links: [{ label: "SENN-research on GitHub", href: "https://github.com/aahan-nut/SENN-research" }],
  },

  {
    slug: "thunderstatistics",
    title: "ThunderStatistics",
    tagline: "NFL season predictions",
    period: "2026–27 season",
    domains: ["Software"],
    status: "completed",
    composition: "data",
    featured: true,
    pageReady: true,
    keyFigure: { value: "10,000", label: "Monte Carlo iterations" },
    summary:
      "Predicts the 2026–27 NFL season from past metrics, data and patterns, plus the strength of each roster — with an interactive simulator to test your own assumptions.",
    media: {
      kind: "screenshot",
      src: "/projects/thunderstatistics/super-bowl.webp",
      alt: "ThunderStats Super Bowl LXI projection: Houston Texans 27, Detroit Lions 24, with an interactive matchup adjuster below",
      caption: "Projected Super Bowl LXI matchup, with the interactive matchup adjuster below.",
      aspect: "16 / 10",
    },
    facts: [
      { label: "Role", value: "Solo — model, simulation, and website" },
      { label: "Engine", value: "10,000 Monte Carlo iterations" },
      {
        label: "Inputs",
        value:
          "Play-by-play EPA trends, late-game high-leverage execution indices, starter WAR, offensive-line pass-block win probabilities",
      },
    ],
    highlights: [
      "Projected Super Bowl matchup",
      "NFL Honors predictions",
      "Record and breakdown for every team, with its X-factor player",
      "Breakdown of the worst team",
      "Interactive predictive simulator",
    ],
    overview: [
      "ThunderStatistics predicts the upcoming NFL season using past metrics, data and patterns, along with the strength of each roster.",
      "It projects the Super Bowl matchup, NFL Honors, and every team's record — with a breakdown and X-factor player for each — and includes an interactive simulator.",
    ],
    contribution: {
      items: ["Built it solo: the prediction model, the Monte Carlo simulation, and the website."],
    },
    howItWorks: {
      body: [
        "Predictions are driven by 10,000 Monte Carlo iterations that combine play-by-play EPA trends, late-game high-leverage execution indices, starter WAR, and offensive-line pass-block win probabilities.",
      ],
      system: {
        title: "Prediction pipeline.",
        stages: [
          {
            label: "Inputs",
            nodes: [
              { label: "EPA trends", sub: "play-by-play", detail: "Expected points added, from play-by-play data." },
              { label: "High-leverage execution", sub: "late-game index", detail: "Indices of late-game, high-leverage execution." },
              { label: "Starter WAR", sub: "roster strength", detail: "Wins above replacement for starters." },
              { label: "Pass-block win rate", sub: "offensive line", detail: "Offensive-line pass-block win probabilities." },
            ],
          },
          {
            label: "Simulation",
            nodes: [{ label: "Monte Carlo", sub: "10,000 iterations", detail: "The season is simulated 10,000 times." }],
          },
          {
            label: "Outputs",
            nodes: [
              { label: "Super Bowl matchup", sub: "projected", detail: "The projected Super Bowl matchup." },
              { label: "NFL Honors", sub: "projected", detail: "Projected NFL Honors." },
              { label: "Team breakdowns", sub: "every team", detail: "Projected record and breakdown for each team, including its X-factor player, plus a breakdown of the worst team." },
              { label: "Simulator", sub: "interactive", detail: "Sliders that reshape the win distribution in real time." },
            ],
          },
        ],
      },
      explainers: [
        {
          title: "The interactive simulator",
          body: [
            "Sliders for quarterback EPA, pass defense win rate, schedule difficulty, and a health and depth index directly modify the Monte Carlo win-distribution curve in real time.",
          ],
        },
      ],
    },
    links: [
      { label: "Live site", href: "https://aahan-nut.github.io/thunder-stats/" },
      { label: "GitHub", href: "https://github.com/aahan-nut/thunder-stats" },
    ],
  },

  {
    slug: "mousetrap-car",
    title: "Forrest Gump",
    tagline: "Distance mousetrap car",
    period: "2026",
    domains: ["Mechanical"],
    status: "completed",
    composition: "build",
    featured: true,
    pageReady: true,
    summary:
      "Built with Suryaa for AP Physics C: Mechanics from household materials, using a pulley system to maximise distance.",
    media: {
      labels: ["Photo", "Video"],
      a: {
        kind: "photo",
        src: "/projects/mousetrap-car/car.webp",
        alt: "The mousetrap car: balsa frame, mousetrap, white Styrofoam pulley, and CD wheels",
        caption: "Forrest Gump: balsa frame, mousetrap, Styrofoam pulley, CD wheels.",
        aspect: "4 / 5",
      },
      b: {
        kind: "video",
        src: "/projects/mousetrap-car/run.mp4",
        poster: "/projects/mousetrap-car/car.webp",
        alt: "Video of the mousetrap car",
        caption: "Video of the car.",
        aspect: "4 / 5",
        fit: "contain",
      },
    },
    facts: [
      { label: "Course", value: "AP Physics C: Mechanics" },
      { label: "Team", value: "With Suryaa — 50/50 split" },
      { label: "Mechanism", value: "Pulley system (Styrofoam) to maximise distance" },
      { label: "Wheels", value: "4 CDs, with balloons for traction" },
    ],
    highlights: ["Set the class record: 80 ft"],
    overview: [
      "Forrest Gump is a distance mousetrap car built for AP Physics C: Mechanics with Suryaa, from household materials. It uses a pulley system to maximise distance, and set the class record for farthest distance traveled: 80 feet.",
    ],
    contribution: {
      items: ["Designed and built the car with Suryaa, splitting the work 50/50."],
    },
    howItWorks: {
      body: [
        "The mousetrap's spring provides the energy, and a Styrofoam pulley system is used to maximise how far that energy carries the car. CDs serve as wheels, with balloons on them for traction.",
      ],
      explainers: [
        {
          title: "Materials and tools",
          body: [
            "Materials: one mousetrap, ruler-shaped balsa wood, 4 CDs (wheels), wooden axles, balloons (traction on the wheels), Styrofoam (pulley), duct tape, string, dental floss, zip ties, straws, hot glue, and super glue.",
            "Tools: a drill and an X-Acto knife.",
          ],
        },
      ],
      gallery: [
        {
          kind: "photo",
          src: "/projects/mousetrap-car/car-floor.webp",
          alt: "The mousetrap car from above, showing the string, pulley, and CD wheels",
          caption: "From above: the string runs from the trap's arm to the pulley.",
          aspect: "3 / 4",
        },
      ],
    },
    results: {
      metrics: [{ value: "80 ft", label: "Class record — farthest distance traveled" }],
    },
    links: [
      {
        label: "Report — materials, instructions, function",
        href: "https://docs.google.com/document/d/1gEDEtTpEQwY1XNFKociHDMFEacmL_vjX_SjZi_BqneU/edit?usp=sharing",
      },
    ],
  },

  {
    slug: "tandem-go-kart",
    title: "Tandem Go-Kart",
    tagline: "A two-seat go-kart — in progress",
    period: "2026",
    domains: ["Mechanical"],
    status: "in-progress",
    composition: "in-progress",
    featured: true,
    pageReady: true,
    summary:
      "Designing and building a tandem go-kart that carries two people, with a metal frame, engine, steering system, brakes, and wheels.",
    facts: [
      { label: "Role", value: "Lead designer" },
      { label: "Team", value: "Group of 4" },
      { label: "Seats", value: "Two, in tandem" },
      { label: "Target finish", value: "Late Nov – early Dec 2026" },
    ],
    milestones: [
      { label: "Metal frame", state: "completed", part: "frame" },
      { label: "Wheels", state: "completed", part: "wheels" },
      { label: "Engine", state: "in-progress", part: "engine" },
      { label: "Steering system", state: "in-progress", part: "steering" },
      { label: "Brakes", state: "in-progress", part: "brakes" },
    ],
    overview: [
      "A tandem go-kart that can carry two people, built with a metal frame, engine, steering system, brakes, and wheels. I'm the lead designer in a group of four.",
      "The frame and wheels are done; the engine, steering, and brakes are in progress, with a projected finish of late November to early December 2026.",
    ],
    contribution: {
      items: ["Lead designer, working in a group of four."],
    },
    howItWorks: {
      body: ["The schematic shows which parts of the kart are finished and which are still being built."],
      diagram: "tandem-kart",
      gallery: [
        {
          kind: "photo",
          src: "/projects/tandem-go-kart/inspiration-1.webp",
          alt: "Inspiration: an existing long-frame go-kart with a bench seat",
          caption: "Inspiration — not our build.",
          aspect: "4 / 3",
        },
        {
          kind: "photo",
          src: "/projects/tandem-go-kart/inspiration-2.webp",
          alt: "Inspiration: an existing single-seat go-kart with a rear engine",
          caption: "Inspiration — not our build.",
          aspect: "4 / 3",
        },
      ],
    },
    planned: [
      "Finish the engine, steering system, and brakes (in progress).",
      "Projected finish: late November – early December 2026.",
    ],
  },
];
