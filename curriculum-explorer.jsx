import { useState, useEffect, useRef } from "react";

const YEARS = [
  {
    id: 1,
    title: "Spatial Literacy & Narrative Foundations",
    shortTitle: "Foundations",
    color: "#E8C872",
    accent: "#F5E6B8",
    description: "Develop spatial literacy: the ability to perceive, analyse, represent, and author space with intention. Year One creates a shared creative language, introducing spatial composition, narrative theory, and digital tools — moving from analogue to digital.",
    outcomes: [
      "Read and represent spatial environments through sketching, model-making, and digital tools",
      "Articulate the narrative and emotional logic of a designed space",
      "Understand the historical and cultural lineage of scenography",
      "Produce basic digital fabrication output",
      "Develop a personal creative methodology grounded in observation"
    ],
    units: [
      {
        id: 1,
        title: "Perceiving, Representing, Imagining Space",
        courses: [
          { name: "Studio 1: The Inhabited Space", type: "Core Studio", desc: "Observe, analyse, and re-imagine inhabited spaces. Establish the foundational question: what does a space feel like, and why? Work through cycles of observation, representation, and proposition — from intimate human scale to sequences of rooms." },
          { name: "History & Theory of Scenography I", type: "Theory", desc: "Trace scenography's intellectual genealogy from ancient spatial spectacle to the 21st century. Study theories of light and space, spatial experiments — each historical moment as a living argument about space, story, audience, and power." },
          { name: "Spatial Drawing & Representation", type: "Skills", desc: "Draw space with precision and intention: orthographic projection, perspective, axonometric, and freehand sketch. Representation taught as an act of argument — the drawing is itself a design proposal." },
          { name: "Foundations of Digital Tools", type: "Skills", desc: "Intensive introduction to essential digital instruments — 3D modelling and 2D illustration software. Tool-agnostic philosophy: evaluate which tool serves a given design task." },
          { name: "Materials & Making", type: "Workshop", desc: "Hands-on material experiments with cardboard, foam, wood, fabric, wire. Explore how material choice generates atmosphere, meaning, and spatial experience. Introduction to laser cutting, CNC, and 3D printing." }
        ]
      },
      {
        id: 2,
        title: "Body, Story, and the Language of Atmosphere",
        courses: [
          { name: "Studio 2: Body, Atmosphere & Narrative Sequence", type: "Core Studio", desc: "Design spatial sequences where the emotional journey of a moving body is the primary design driver. Introduce atmosphere as a designed quality — the sensory condition a space imposes upon its visitor." },
          { name: "History & Theory of Scenography II", type: "Theory", desc: "Examine the emergence of installation art, immersive experience, experiential retail, and digital scenography. Engage with discourse around experience economy, spectacle, and ethics of immersive environments." },
          { name: "Storytelling for Spatial Designers", type: "Theory", desc: "Narrative theory as spatial design tool — story arc, tension, transformation, hypertext logics. Learn to develop a narrative brief before beginning any spatial design. Every great environment is a story." },
          { name: "Light, Shadow & Atmosphere", type: "Skills", desc: "The physics and phenomenology of light — natural and artificial. Work with physical light models, study lighting designers, and learn to notate light as a spatial medium." },
          { name: "Digital Fabrication Foundations", type: "Workshop", desc: "Complete workflow from digital model to fabricated object — laser cutting, 3D printing, CNC milling. Design intelligence for translating 3D concepts into fabrication-ready files." }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Technology Integration & Systems Thinking",
    shortTitle: "Technology",
    color: "#72A8E8",
    accent: "#B8D4F5",
    description: "The pivotal technological year. Encounter the full suite of computational and digital tools that define contemporary practice — parametric systems, XR, real-time rendering, generative systems, responsive environments, and spatial sound. Narrative intention remains the non-negotiable frame.",
    outcomes: [
      "Design spatially coherent environments in both physical and digital media",
      "Apply parametric and computational design tools to generate spatial proposals",
      "Produce XR (AR/VR) spatial experiences",
      "Use real-time rendering environments to design and communicate space",
      "Integrate multisensory thinking — light, sound, material — into spatial proposals"
    ],
    units: [
      {
        id: 3,
        title: "Computation, Immersion & the Extended Environment",
        courses: [
          { name: "Studio 3: Immersive Environments", type: "Core Studio", desc: "Design immersive spatial experiences — environments where visitors are surrounded, enveloped, and emotionally transformed. Briefs from real-world sectors: museums, urban installations, brand environments." },
          { name: "Computational Design I: Parametric Systems", type: "Skills", desc: "Parametric and algorithmic spatial design using visual programming. Design through rules, relationships, and parameters — creating systems that respond to inputs and generate form through logic." },
          { name: "XR Fundamentals: AR, VR & Mixed Reality", type: "Skills", desc: "Theory, technology, and creative potential of extended reality. Produce spatial XR experiences exploring different relationships between digital content and physical context." },
          { name: "Performance & Event Scenography", type: "Theory", desc: "Design challenges of live event spaces: concert staging, theatrical set, festival installations. Study the relationship between designer and performer, temporal arc, and technical constraints." },
          { name: "Material Ecologies & Sustainable Design", type: "Theory", desc: "Design with ecological intelligence — circular design, bio-materials, carbon assessment, design for disassembly. Explore mycelium composites, bacterial cellulose, and grown structures." }
        ]
      },
      {
        id: 4,
        title: "Real-Time Worlds, Responsive Space & Sensory Intelligence",
        courses: [
          { name: "Studio 4: Responsive & Adaptive Environments", type: "Core Studio", desc: "Design environments that change in response to human presence, behaviour, or data. Create not a single spatial state but a dynamic range — the environment as a score unfolding differently for each visitor." },
          { name: "Computational Design II: Generative Systems", type: "Skills", desc: "Scripting and programming as design tools — generative coding, cellular automata, agent-based systems, L-systems. Collaborative project with Computer Science department." },
          { name: "Real-Time Rendering & Virtual Production", type: "Skills", desc: "Game engine training for spatial visualisation, virtual production, and spatial computing. Environment building, lighting simulation, material application, and real-time walkthroughs." },
          { name: "Spatial Sound & Multisensory Design", type: "Theory", desc: "Spatial acoustics, sound design for environments, and multisensory experiences integrating sound, light, material, smell, and tactile qualities. Design complete multisensory briefs." },
          { name: "Cultural Theory & Ethics of Spatial Design", type: "Seminar", desc: "Position the designer as cultural agent: What does it mean to design someone else's experience? Whose stories are told? Engage with surveillance, power, and designer responsibility." }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Specialisation, Advanced Practice & Global Fluency",
    shortTitle: "Specialisation",
    color: "#E87272",
    accent: "#F5B8B8",
    description: "Develop mastery in at least one domain of advanced practice. Encounter Generative AI as a spatial design instrument, Digital Twins, and robotic fabrication. Pursue international exchange, industry placement, or deep elective specialisation alongside real-world studio projects.",
    outcomes: [
      "Deploy Generative AI tools fluently as creative instruments in spatial design",
      "Operate advanced fabrication: CNC milling, robotic arm, SLS/resin printing",
      "Design large-scale spatial experiences with high presentation standards",
      "Demonstrate a defined area of advanced specialisation",
      "Direct experience with cultural institutions or industry partners"
    ],
    units: [
      {
        id: 5,
        title: "Generative Intelligence, Advanced Fabrication & Scale",
        courses: [
          { name: "Studio 5: AI-Augmented Scenography", type: "Core Studio", desc: "First industry-linked studio. Real brief from cultural institution, brand, or city authority. Generative AI integrated as creative co-instrument. Explore creative authorship in AI-assisted design." },
          { name: "Generative AI for Spatial Design", type: "Skills", desc: "Comprehensive treatment of GenAI in spatial design: text-to-image, video generation, 3D generation (Gaussian Splatting), LLM collaboration, and agentic systems. Be discerning directors of AI systems." },
          { name: "Digital Twins & Smart Environments", type: "Theory", desc: "Real-time, data-connected virtual replicas of physical environments. Build digital twins using NVIDIA Omniverse and similar platforms. Explore how data drives spatial decisions." },
          { name: "Advanced Fabrication: Robotics & CNC", type: "Workshop", desc: "Highest-resolution fabrication: 5-axis CNC milling, industrial robotic arm (KUKA), SLS and resin 3D printing. The fabrication machine as design partner." },
          { name: "Exhibition Design: Theory & Practice", type: "Seminar", desc: "Comprehensive introduction to exhibition design — from world exhibitions to contemporary immersive shows. Narrative coherence, accessibility, interpretation, and audience design." }
        ]
      },
      {
        id: 6,
        title: "Specialisation, Scale & Global Dialogue",
        courses: [
          { name: "Studio 6: Urban Scale Scenography", type: "Core Studio", desc: "Design at city scale — urban screens, civic installations, festival environments, night-time activations. Real Shanghai contexts. Engage with social, logistical, and political dimensions." },
          { name: "Elective Track A: Performance & Live Experience", type: "Elective", desc: "Advanced scenographic practice for contemporary performance — devised theatre, immersive performance, concert staging, ceremony, and hybrid live-digital events." },
          { name: "Elective Track B: Digital Environments & Spatial Computing", type: "Elective", desc: "Design for spatial computing platforms (Apple Vision Pro, Meta). Persistent digital environments, spatial interaction design, world-building, aesthetics of digital habitation." },
          { name: "Elective Track C: Cultural Heritage & Immersive Storytelling", type: "Elective", desc: "Design experiences carrying cultural memory and community identity — museums, heritage sites, memorial environments. Partnership with cultural institutions." }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Integration, Applied Research & Career Readiness",
    shortTitle: "Capstone",
    color: "#9B72E8",
    accent: "#D0B8F5",
    description: "Synthesis and original contribution. Develop your Capstone — an ambitious, independently authored, publicly exhibited work of spatial and narrative design. Your most complete statement of practice, values, and vision of the future.",
    outcomes: [
      "Produce and publicly exhibit a major independent Capstone Project",
      "Develop a structured research methodology for practice-based inquiry",
      "Position your work within the field and larger cultural moment",
      "Demonstrate entrepreneurial readiness to define your professional path",
      "Contribute a distinct original voice to Environments + Scenography"
    ],
    units: [
      {
        id: 7,
        title: "Research, Development & Synthesis",
        courses: [
          { name: "Studio 7: Pre-Capstone R&D", type: "Core Studio", desc: "Preparatory engine for the Capstone. Develop research question, narrative premise, and design concept through iterative testing. Produce research brief, concept document, and tested prototype." },
          { name: "Research Methodologies for Creative Practice", type: "Seminar", desc: "Practice-based research methods: ethnographic, phenomenological, speculative. Develop your individual Capstone research framework." },
          { name: "Entrepreneurship for Creative Technologists", type: "Seminar", desc: "Independent practice, studio founding, pitching commissions, IP, crowdfunding. Pitch Day: present business concept to industry panel." },
          { name: "Special Topics: Emerging Frontiers", type: "Seminar", desc: "Rotating topics: Spatial AI, Neuroscience of Experience, Haptic Design, Post-Anthropocentric Environments, Climate Emergency, Biomimetic Systems, Affective Computing." },
          { name: "Advanced Portfolio & Design Communication", type: "Workshop", desc: "Graduate-quality portfolio development — curation, visual language, case studies, digital and print formats. Mock Portfolio Review with industry guests." }
        ]
      },
      {
        id: 8,
        title: "Capstone: The Final Work",
        courses: [
          { name: "Capstone Studio: Final Design Project", type: "Capstone", desc: "Culminating expression of four years. A fully realised design proposal — installation, XR experience, scenographic environment, spatial intervention, AI-driven system, or performance design. Three formal reviews, public exhibition." },
          { name: "Capstone Written Thesis", type: "Research", desc: "150–200 page scholarly thesis book contextualising and critically reflecting on the Capstone work. An original contribution to spatial design discourse." },
          { name: "Final Year Exhibition Production", type: "Collaborative", desc: "Collectively design, plan, and produce the Final Year Show — a major cultural event. Curation strategy, spatial design, graphic identity, and professional documentation." }
        ]
      }
    ]
  }
];

const CAREERS = [
  { title: "Scenographic Designer", desc: "Performance, event, experience", icon: "🎭" },
  { title: "Immersive Experience Designer", desc: "XR, spatial computing, interactive installation", icon: "🌐" },
  { title: "Exhibition & Museum Designer", desc: "Cultural institutions, galleries", icon: "🏛" },
  { title: "Brand Environment Designer", desc: "Retail, experiential, commercial", icon: "✦" },
  { title: "AI Spatial Storyteller", desc: "Creative technology, GenAI", icon: "⚡" },
  { title: "Urban Experience Designer", desc: "Public space, civic design", icon: "🏙" },
  { title: "Virtual Production Designer", desc: "Film, live broadcast, LED volume", icon: "🎬" },
  { title: "Cultural Consultant", desc: "Narrative strategy, heritage", icon: "◈" },
  { title: "Computational Designer", desc: "Architecture, urban practice", icon: "◇" },
  { title: "New Media Artist", desc: "Space, technology, narrative", icon: "◉" }
];

const PRINCIPLES = [
  { title: "Narrative is the Foundation", short: "Every spatial decision originates in a story, an idea, an emotional intention. Technology and material serve narrative, never the reverse." },
  { title: "The Studio is PBL and Classroom", short: "Learning happens primarily through creating. The studio is the intellectual engine — where theory becomes real through iterative practice." },
  { title: "Physical + Digital = One Continuum", short: "We refuse the false binary. Our students move fluidly between fabricated surfaces and generative AI, hand-drawn sections and real-time renders." },
  { title: "Technology as Creative Material", short: "GenAI, XR, computational design, real-time rendering are primary creative materials — as fundamental as light, material, or proportion." },
  { title: "Designing for Humanity", short: "All spatial and technological ambition serves human experience: the body in space, the mind moved by story, the community shaped by environment." },
  { title: "Cross-Disciplinary Collaboration", short: "Collaborate across programs through SPINOVATION — partnering with Media & Entertainment, Engineering, Management, Computer Science, HMI, and other disciplines to foster innovation at the intersection of multiple fields." }
];

const TYPE_COLORS = {
  "Core Studio": { bg: "rgba(232,200,114,0.15)", border: "#E8C872", text: "#E8C872" },
  "Theory": { bg: "rgba(114,168,232,0.12)", border: "#72A8E8", text: "#90B8E8" },
  "Skills": { bg: "rgba(114,232,160,0.12)", border: "#72E8A0", text: "#72E8A0" },
  "Workshop": { bg: "rgba(232,114,114,0.12)", border: "#E87272", text: "#E89090" },
  "Seminar": { bg: "rgba(155,114,232,0.12)", border: "#9B72E8", text: "#B090E8" },
  "Elective": { bg: "rgba(232,180,114,0.12)", border: "#E8B472", text: "#E8C090" },
  "Capstone": { bg: "rgba(232,200,114,0.2)", border: "#E8C872", text: "#E8C872" },
  "Research": { bg: "rgba(155,114,232,0.12)", border: "#9B72E8", text: "#B090E8" },
  "Collaborative": { bg: "rgba(114,232,160,0.12)", border: "#72E8A0", text: "#72E8A0" }
};

function App() {
  const [activeYear, setActiveYear] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [section, setSection] = useState("overview");
  const [scrollY, setScrollY] = useState(0);
  const [entered, setEntered] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "careers", label: "Careers" },
    { id: "principles", label: "Principles" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "futures", label: "Futures" }
  ];

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "#0A0A0C",
      color: "#E8E4DC",
      fontFamily: "'Outfit', sans-serif",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse 800px 600px at 20% 20%, rgba(232,200,114,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 80%, rgba(114,168,232,0.03) 0%, transparent 70%),
          radial-gradient(ellipse 500px 500px at 50% 50%, rgba(155,114,232,0.02) 0%, transparent 70%)
        `
      }} />

      {/* Top Navigation Bar */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 28px",
        borderBottom: "1px solid rgba(232,228,220,0.08)",
        backdropFilter: "blur(20px)",
        background: "rgba(10,10,12,0.8)",
        zIndex: 100,
        flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #E8C872, #E87272, #72A8E8, #9B72E8)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#0A0A0C"
          }}>E+S</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.02em", lineHeight: 1.2 }}>
              Environments + Scenography
            </div>
            <div style={{ fontSize: 10, color: "rgba(232,228,220,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              SUES School of Design · Shanghai
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setSection(item.id);
                setActiveYear(null);
                setActiveUnit(null);
                setExpandedCourse(null);
              }}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                border: section === item.id ? "1px solid rgba(232,200,114,0.3)" : "1px solid transparent",
                background: section === item.id ? "rgba(232,200,114,0.08)" : "transparent",
                color: section === item.id ? "#E8C872" : "rgba(232,228,220,0.5)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                letterSpacing: "0.02em"
              }}
            >{item.label}</button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", position: "relative", zIndex: 1 }}>

        {/* ============ OVERVIEW ============ */}
        {section === "overview" && (
          <div style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.22,1,0.36,1)"
          }}>
            {/* Hero */}
            <div style={{
              padding: "80px 28px 60px",
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(232,228,220,0.35)",
                marginBottom: 20,
                fontWeight: 500
              }}>BA Four-Year Undergraduate Program · 2026–2030</div>

              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(24px, 4.5vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.12,
                margin: "0 auto 24px",
                maxWidth: 700,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                background: "linear-gradient(135deg, #E8E4DC 0%, #E8C872 50%, #E8E4DC 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Environments<br/>+ Scenography
              </h1>

              <p style={{
                fontSize: "clamp(15px, 2.5vw, 19px)",
                lineHeight: 1.6,
                color: "rgba(232,228,220,0.55)",
                maxWidth: 560,
                margin: "0 auto 40px",
                fontWeight: 300,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif"
              }}>
                Narrative-Driven Spatial Technology
              </p>

              <p style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "rgba(232,228,220,0.5)",
                maxWidth: 620,
                margin: "0 auto 50px",
                fontWeight: 300
              }}>
                Designing experiences where physical space, digital intelligence, and human story converge. A discipline that treats space as a medium for narrative, and narrative as the very logic of space.
              </p>

              {/* Identity badge */}
              <div style={{
                display: "inline-block",
                padding: "16px 28px",
                border: "1px solid rgba(232,200,114,0.2)",
                borderRadius: 8,
                background: "rgba(232,200,114,0.04)",
                maxWidth: 560
              }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#E8C872", marginBottom: 8, fontWeight: 500 }}>
                  Graduate Identity
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(232,228,220,0.7)", fontWeight: 300 }}>
                  E+S graduates are <strong style={{ color: "#E8E4DC", fontWeight: 500 }}>Narrative Spatial Technologists</strong> — designers who unite environmental composition, computational systems, and storytelling into meaningful human experiences across real, virtual, and hybrid space.
                </div>
              </div>
            </div>

            {/* Year Overview Cards */}
            <div style={{ padding: "20px 28px 60px" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
                maxWidth: 1100,
                margin: "0 auto"
              }}>
                {YEARS.map((year, i) => (
                  <button
                    key={year.id}
                    onClick={() => { setSection("curriculum"); setActiveYear(year.id); setActiveUnit(null); }}
                    style={{
                      padding: 24,
                      background: "rgba(232,228,220,0.02)",
                      border: `1px solid rgba(232,228,220,0.06)`,
                      borderRadius: 10,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      fontFamily: "inherit",
                      position: "relative",
                      overflow: "hidden",
                      opacity: entered ? 1 : 0,
                      transform: entered ? "translateY(0)" : "translateY(20px)",
                      transitionDelay: `${i * 0.1 + 0.3}s`
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = year.color + "40";
                      e.currentTarget.style.background = year.color + "08";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(232,228,220,0.06)";
                      e.currentTarget.style.background = "rgba(232,228,220,0.02)";
                    }}
                  >
                    <div style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: year.color,
                      marginBottom: 10,
                      fontWeight: 500
                    }}>Year {year.id}</div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#E8E4DC",
                      marginBottom: 10,
                      lineHeight: 1.25
                    }}>{year.shortTitle}</div>
                    <div style={{
                      fontSize: 12,
                      lineHeight: 1.65,
                      color: "rgba(232,228,220,0.4)",
                      fontWeight: 300
                    }}>
                      Units {year.units[0].id}–{year.units[1].id} · {year.units[0].courses.length + year.units[1].courses.length} courses
                    </div>
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, ${year.color}, transparent)`
                    }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              padding: "40px 28px 80px",
              maxWidth: 1100,
              margin: "0 auto"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 1,
                background: "rgba(232,228,220,0.06)",
                borderRadius: 10,
                overflow: "hidden"
              }}>
                {[
                  { val: "4", label: "Years" },
                  { val: "8", label: "PBL Units" },
                  { val: "8", label: "Core Studios" },
                  { val: "3", label: "Elective Tracks" },
                  { val: "10+", label: "Career Paths" },
                  { val: "1", label: "Capstone Thesis" }
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "24px 20px",
                    background: "#0A0A0C",
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 28,
                      color: "#E8C872",
                      marginBottom: 4
                    }}>{s.val}</div>
                    <div style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(232,228,220,0.35)",
                      fontWeight: 500
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ CURRICULUM ============ */}
        {section === "curriculum" && (
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px" }}>
            {/* Year selector tabs */}
            <div style={{
              display: "flex",
              gap: 6,
              marginBottom: 32,
              flexWrap: "wrap"
            }}>
              {YEARS.map(year => (
                <button
                  key={year.id}
                  onClick={() => { setActiveYear(activeYear === year.id ? null : year.id); setActiveUnit(null); setExpandedCourse(null); }}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: `1px solid ${activeYear === year.id ? year.color + "50" : "rgba(232,228,220,0.08)"}`,
                    background: activeYear === year.id ? year.color + "12" : "rgba(232,228,220,0.02)",
                    color: activeYear === year.id ? year.color : "rgba(232,228,220,0.5)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: year.color,
                    opacity: activeYear === year.id ? 1 : 0.3,
                    transition: "opacity 0.3s"
                  }} />
                  Year {year.id}: {year.shortTitle}
                </button>
              ))}
            </div>

            {/* Timeline visualization */}
            {!activeYear && (
              <div style={{ padding: "20px 0 40px" }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 28,
                  marginBottom: 8,
                  color: "#E8E4DC"
                }}>Four Years, Eight Units</div>
                <p style={{ fontSize: 14, color: "rgba(232,228,220,0.45)", marginBottom: 40, fontWeight: 300, lineHeight: 1.6, maxWidth: 600 }}>
                  Select a year above to explore its units and courses. Each year builds upon the last — from spatial literacy through technology, specialisation, and finally your independent Capstone.
                </p>

                {/* Visual Timeline */}
                <div style={{ position: "relative", paddingLeft: 40 }}>
                  {YEARS.map((year, yi) => (
                    <div key={year.id} style={{ marginBottom: 40, position: "relative" }}>
                      <div style={{
                        position: "absolute", left: -40, top: 0,
                        width: 24, height: 24, borderRadius: "50%",
                        background: year.color + "20",
                        border: `2px solid ${year.color}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: year.color
                      }}>{year.id}</div>
                      {yi < YEARS.length - 1 && (
                        <div style={{
                          position: "absolute", left: -29, top: 28, width: 2, height: "calc(100% + 16px)",
                          background: `linear-gradient(to bottom, ${year.color}40, ${YEARS[yi+1].color}40)`
                        }} />
                      )}
                      <div
                        onClick={() => { setActiveYear(year.id); setActiveUnit(null); }}
                        style={{ cursor: "pointer", paddingBottom: 8 }}
                      >
                        <div style={{
                          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em",
                          color: year.color, marginBottom: 6, fontWeight: 500
                        }}>Year {year.id} · Units {year.units[0].id}–{year.units[1].id}</div>
                        <div style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 19, color: "#E8E4DC", marginBottom: 8
                        }}>{year.title}</div>
                        <div style={{ fontSize: 13, color: "rgba(232,228,220,0.4)", lineHeight: 1.6, fontWeight: 300, maxWidth: 600 }}>
                          {year.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Year Detail */}
            {activeYear && (() => {
              const year = YEARS.find(y => y.id === activeYear);
              return (
                <div>
                  {/* Year header */}
                  <div style={{ marginBottom: 32 }}>
                    <div style={{
                      fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
                      color: year.color, marginBottom: 8, fontWeight: 500
                    }}>Year {year.id} of 4</div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(24px, 4vw, 34px)",
                      color: "#E8E4DC",
                      marginBottom: 12
                    }}>{year.title}</div>
                    <p style={{
                      fontSize: 14, color: "rgba(232,228,220,0.5)",
                      lineHeight: 1.7, fontWeight: 300, maxWidth: 680
                    }}>{year.description}</p>
                  </div>

                  {/* Learning Outcomes */}
                  <div style={{
                    padding: 20,
                    background: year.color + "06",
                    border: `1px solid ${year.color}15`,
                    borderRadius: 10,
                    marginBottom: 32
                  }}>
                    <div style={{
                      fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em",
                      color: year.color, marginBottom: 14, fontWeight: 500
                    }}>Graduate Outcomes</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {year.outcomes.map((o, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{
                            width: 5, height: 5, borderRadius: "50%",
                            background: year.color, marginTop: 7, flexShrink: 0
                          }} />
                          <span style={{ fontSize: 13, color: "rgba(232,228,220,0.6)", lineHeight: 1.6, fontWeight: 300 }}>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Units */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {year.units.map(unit => {
                      const isOpen = activeUnit === unit.id;
                      return (
                        <div key={unit.id} style={{
                          border: `1px solid ${isOpen ? year.color + "30" : "rgba(232,228,220,0.06)"}`,
                          borderRadius: 10,
                          overflow: "hidden",
                          transition: "all 0.4s ease",
                          background: isOpen ? year.color + "04" : "transparent"
                        }}>
                          <button
                            onClick={() => { setActiveUnit(isOpen ? null : unit.id); setExpandedCourse(null); }}
                            style={{
                              width: "100%",
                              padding: "20px 24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "inherit",
                              textAlign: "left"
                            }}
                          >
                            <div>
                              <div style={{
                                fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em",
                                color: year.color, marginBottom: 6, fontWeight: 500
                              }}>Unit {unit.id} · Semester {unit.id % 2 === 1 ? "A" : "B"}</div>
                              <div style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                fontSize: 18, color: "#E8E4DC"
                              }}>{unit.title}</div>
                            </div>
                            <div style={{
                              color: year.color,
                              fontSize: 20,
                              transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                              transition: "transform 0.3s ease",
                              fontWeight: 300,
                              flexShrink: 0,
                              marginLeft: 16
                            }}>+</div>
                          </button>

                          {isOpen && (
                            <div style={{ padding: "0 24px 24px" }}>
                              <div style={{
                                fontSize: 11, color: "rgba(232,228,220,0.35)",
                                marginBottom: 16, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em"
                              }}>{unit.courses.length} Courses</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {unit.courses.map((course, ci) => {
                                  const isExpanded = expandedCourse === `${unit.id}-${ci}`;
                                  const tc = TYPE_COLORS[course.type] || TYPE_COLORS["Theory"];
                                  return (
                                    <div
                                      key={ci}
                                      onClick={() => setExpandedCourse(isExpanded ? null : `${unit.id}-${ci}`)}
                                      style={{
                                        padding: "14px 18px",
                                        background: isExpanded ? tc.bg : "rgba(232,228,220,0.02)",
                                        border: `1px solid ${isExpanded ? tc.border + "40" : "rgba(232,228,220,0.05)"}`,
                                        borderRadius: 8,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease"
                                      }}
                                    >
                                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                                            <span style={{ fontSize: 14, color: "#E8E4DC", fontWeight: 500 }}>{course.name}</span>
                                            <span style={{
                                              fontSize: 10,
                                              padding: "2px 8px",
                                              borderRadius: 10,
                                              background: tc.bg,
                                              color: tc.text,
                                              border: `1px solid ${tc.border}30`,
                                              fontWeight: 500,
                                              letterSpacing: "0.03em",
                                              whiteSpace: "nowrap"
                                            }}>{course.type}</span>
                                          </div>
                                          {isExpanded && (
                                            <p style={{
                                              fontSize: 13, lineHeight: 1.7,
                                              color: "rgba(232,228,220,0.55)",
                                              marginTop: 10, fontWeight: 300
                                            }}>{course.desc}</p>
                                          )}
                                        </div>
                                        <span style={{
                                          color: "rgba(232,228,220,0.25)",
                                          fontSize: 16,
                                          transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                                          transition: "transform 0.3s",
                                          flexShrink: 0,
                                          marginTop: 2
                                        }}>›</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============ CAREERS ============ */}
        {section === "careers" && (
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px 80px" }}>
            <div style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "#E8C872", marginBottom: 10, fontWeight: 500
            }}>Professional Futures</div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 34px)",
              color: "#E8E4DC", marginBottom: 12
            }}>Where E+S Graduates Go</div>
            <p style={{
              fontSize: 14, color: "rgba(232,228,220,0.5)", lineHeight: 1.7,
              fontWeight: 300, maxWidth: 620, marginBottom: 40
            }}>
              The program cultivates adaptability for roles that don't yet fully exist — alongside established creative professions at the intersection of space, technology, and narrative.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 10
            }}>
              {CAREERS.map((career, i) => (
                <div
                  key={i}
                  style={{
                    padding: "22px 20px",
                    background: "rgba(232,228,220,0.02)",
                    border: "1px solid rgba(232,228,220,0.06)",
                    borderRadius: 10,
                    transition: "all 0.4s ease",
                    cursor: "default"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(232,200,114,0.2)";
                    e.currentTarget.style.background = "rgba(232,200,114,0.04)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(232,228,220,0.06)";
                    e.currentTarget.style.background = "rgba(232,228,220,0.02)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 12 }}>{career.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#E8E4DC", marginBottom: 4 }}>
                    {career.title}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(232,228,220,0.4)", fontWeight: 300 }}>
                    {career.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Elective Tracks */}
            <div style={{ marginTop: 56 }}>
              <div style={{
                fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
                color: "#E87272", marginBottom: 10, fontWeight: 500
              }}>Year 3 Specialisation</div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 22, color: "#E8E4DC", marginBottom: 24
              }}>Three Elective Tracks</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {[
                  { track: "A", title: "Performance & Live Experience", desc: "Advanced scenographic practice for contemporary performance — devised theatre, immersive shows, concert staging, ceremony, and hybrid live-digital events.", color: "#E87272" },
                  { track: "B", title: "Digital Environments & Spatial Computing", desc: "Design for spatial computing platforms — persistent digital environments, world-building, spatial interaction design, and the aesthetics of digital habitation.", color: "#72A8E8" },
                  { track: "C", title: "Cultural Heritage & Immersive Storytelling", desc: "Design experiences carrying cultural memory and community identity — museums, heritage sites, memorial environments, with cultural institution partners.", color: "#9B72E8" }
                ].map((t, i) => (
                  <div key={i} style={{
                    padding: 24,
                    background: t.color + "06",
                    border: `1px solid ${t.color}20`,
                    borderRadius: 10
                  }}>
                    <div style={{
                      fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em",
                      color: t.color, marginBottom: 10, fontWeight: 600
                    }}>Track {t.track}</div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 17, color: "#E8E4DC", marginBottom: 10
                    }}>{t.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(232,228,220,0.5)", lineHeight: 1.65, fontWeight: 300 }}>
                      {t.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ PRINCIPLES ============ */}
        {section === "principles" && (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 28px 80px" }}>
            <div style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "#E8C872", marginBottom: 10, fontWeight: 500
            }}>Guiding Philosophy</div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 34px)",
              color: "#E8E4DC", marginBottom: 12
            }}>Six Founding Principles</div>
            <p style={{
              fontSize: 14, color: "rgba(232,228,220,0.5)", lineHeight: 1.7,
              fontWeight: 300, maxWidth: 560, marginBottom: 48
            }}>
              These principles are the intellectual DNA of the program — present in every studio, every module, every critique.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PRINCIPLES.map((p, i) => {
                const colors = ["#E8C872", "#72A8E8", "#72E8A0", "#E87272", "#9B72E8", "#E8B472"];
                const c = colors[i];
                return (
                  <div key={i} style={{
                    padding: "28px 28px",
                    background: c + "05",
                    border: `1px solid ${c}18`,
                    borderRadius: 10,
                    borderLeft: `3px solid ${c}`,
                    transition: "all 0.3s ease"
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
                      <span style={{
                        fontSize: 11,
                        color: c,
                        fontWeight: 600,
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        opacity: 0.7
                      }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 19,
                        color: "#E8E4DC"
                      }}>{p.title}</span>
                    </div>
                    <div style={{
                      fontSize: 14, lineHeight: 1.7,
                      color: "rgba(232,228,220,0.5)",
                      fontWeight: 300,
                      paddingLeft: 38
                    }}>{p.short}</div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ============ INFRASTRUCTURE ============ */}
        {section === "infrastructure" && (
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px 80px" }}>
            <div style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "#72E8A0", marginBottom: 10, fontWeight: 500
            }}>Pedagogical Infrastructure</div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 34px)",
              color: "#E8E4DC", marginBottom: 12
            }}>How We Teach</div>
            <p style={{
              fontSize: 14, color: "rgba(232,228,220,0.5)", lineHeight: 1.7,
              fontWeight: 300, maxWidth: 620, marginBottom: 48
            }}>
              The program's pedagogical architecture is designed to mirror the conditions of professional creative practice — iterative, collaborative, demanding, and grounded in making.
            </p>

            {/* Studio Model */}
            {[
              {
                title: "The Studio Model",
                subtitle: "Learning by Creating",
                color: "#E8C872",
                icon: "◈",
                content: [
                  "The studio is the heart and engine of the E+S program — not simply a space or a module, but a pedagogical philosophy. Learning happens through iterative creative practice: proposing, making, testing, reviewing, revising, and proposing again. The public review — presenting and defending work before peers, tutors, and external critics — is the central pedagogical ritual.",
                  "Studios are intensive, immersive, and demanding. They require students to tolerate ambiguity, fail productively, and develop creative resilience. Studio culture is explicitly collaborative — students learn as much from each other and the critical community as from their tutors. The program cultivates rigorous intellectual generosity: high standards, mutual challenge, and genuine care for each other's development."
                ]
              },
              {
                title: "Assessment Philosophy",
                subtitle: "Portfolio-Based & Continuous",
                color: "#72A8E8",
                icon: "◇",
                content: [
                  "Assessment is continuous, formative, and portfolio-based. Students are evaluated by the accumulating body of work they produce across four years — reflecting professional practice, where the designer is judged by their work and their ability to communicate and defend it."
                ],
                items: [
                  { label: "Studio modules", detail: "Iterative project work, public reviews, and process documentation — 60% of all program assessment" },
                  { label: "Theory & seminar", detail: "Essays, annotated bibliographies, research journals, and verbal presentations" },
                  { label: "Skills & workshop", detail: "Practical skill demonstrations, fabricated outputs, and technical documentation" },
                  { label: "Capstone", detail: "Complete three-part submission: design project, thesis, and exhibition contribution" }
                ]
              },
              {
                title: "Digital Prototyping Lab",
                subtitle: "State-of-the-Art Making",
                color: "#E87272",
                icon: "⬡",
                content: [
                  "A signature resource embodying the program's commitment to physical-digital integration. Access levels and machine training scale with student experience from Year One through Year Four."
                ],
                equipment: [
                  "CNC 3-axis milling", "5-axis CNC router", "Industrial robotic arm (KUKA/ABB)",
                  "FDM 3D printers (multi-scale)", "SLS 3D printers", "Resin 3D printers",
                  "Laser cutter/engravers", "Vinyl plotter", "Large-format digital printing",
                  "Vacuum forming machine", "Electronics bench (Arduino, RPi)", "VR/AR hardware testing station"
                ]
              },
              {
                title: "Research Lab",
                subtitle: "Future Scenography & Immersive Environments",
                color: "#9B72E8",
                icon: "◉",
                content: [
                  "A dedicated research centre connecting undergraduates with the most advanced and speculative work in the field. The lab conducts applied research into AI-driven spatial narrative, spatial computing, biometric and neuro-responsive environments, climate-adaptive design, and posthuman scenography.",
                  "Undergraduate students may participate from Year Three onward, and Year Four Capstone projects can be formally affiliated with ongoing research lab initiatives."
                ]
              },
              {
                title: "Industry Integration",
                subtitle: "Structurally Embedded",
                color: "#E8B472",
                icon: "⬢",
                content: [
                  "Industry connection is not an add-on — it is structurally embedded. From Year Two onward, every year includes at least one industry-linked studio brief."
                ],
                items: [
                  { label: "Partners include", detail: "Cultural institutions, experience design studios, event production companies, XR/AI tech enterprises, brand experience agencies, architecture studios, media art studios, curators, and urban cultural organisations" },
                  { label: "Partners contribute", detail: "Real briefs, studio reviews, site access, Capstone co-supervision, and placement hosting" },
                  { label: "Partners gain", detail: "Early access to the most technically current design talent in China" }
                ]
              },
              {
                title: "Global Partnership Framework",
                subtitle: "Internationally Connected",
                color: "#72A8E8",
                icon: "◎",
                content: [
                  "The program is globally connected from inception, with formal academic partnerships across scenography, spatial design, media arts, and experience design."
                ],
                items: [
                  { label: "Partner contributions", detail: "International visiting faculty, joint workshops and intensive studios, student exchange in Unit Six, joint research initiatives, and shared symposia" },
                  { label: "Target regions", detail: "Europe (UK, Germany, France), North America (USA), South Korea, and Japan" }
                ]
              }
            ].map((block, bi) => (
              <div key={bi} style={{
                marginBottom: 16,
                padding: "28px 28px",
                background: block.color + "05",
                border: `1px solid ${block.color}15`,
                borderRadius: 10,
                borderLeft: `3px solid ${block.color}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 18, opacity: 0.6 }}>{block.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 19, color: "#E8E4DC"
                    }}>{block.title}</div>
                    <div style={{
                      fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
                      color: block.color, fontWeight: 500, marginTop: 2
                    }}>{block.subtitle}</div>
                  </div>
                </div>

                {block.content.map((para, pi) => (
                  <p key={pi} style={{
                    fontSize: 13, lineHeight: 1.75, color: "rgba(232,228,220,0.55)",
                    fontWeight: 300, marginTop: 14
                  }}>{para}</p>
                ))}

                {block.items && (
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    {block.items.map((item, ii) => (
                      <div key={ii} style={{
                        padding: "10px 14px",
                        background: "rgba(10,10,12,0.4)",
                        borderRadius: 6,
                        border: `1px solid ${block.color}10`
                      }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: block.color }}>{item.label}: </span>
                        <span style={{ fontSize: 12, color: "rgba(232,228,220,0.5)", fontWeight: 300 }}>{item.detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {block.equipment && (
                  <div style={{
                    marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6
                  }}>
                    {block.equipment.map((eq, ei) => (
                      <span key={ei} style={{
                        padding: "5px 12px",
                        background: block.color + "10",
                        border: `1px solid ${block.color}20`,
                        borderRadius: 20,
                        fontSize: 11, color: "rgba(232,228,220,0.6)", fontWeight: 400
                      }}>{eq}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ============ FUTURES ============ */}
        {section === "futures" && (
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px 80px" }}>
            <div style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "#E8B472", marginBottom: 10, fontWeight: 500
            }}>Futures-Oriented Strategy</div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 4vw, 34px)",
              color: "#E8E4DC", marginBottom: 12
            }}>Designing for the Next 10–15 Years</div>
            <p style={{
              fontSize: 14, color: "rgba(232,228,220,0.5)", lineHeight: 1.7,
              fontWeight: 300, maxWidth: 620, marginBottom: 48
            }}>
              Any design program that does not actively prepare students for a world that does not yet fully exist is already obsolete. This is how E+S stays ahead.
            </p>

            {/* Emerging Landscape */}
            <div style={{
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em",
              color: "#E8B472", marginBottom: 20, fontWeight: 500
            }}>The Emerging Landscape</div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 12,
              marginBottom: 56
            }}>
              {[
                { title: "Spatial Computing", desc: "Apple Vision Pro, Meta Horizon, and successors will create an entirely new category of spatial design practice — persistent digital environments coexisting with physical space from the personal to the urban scale.", icon: "🌐" },
                { title: "AI as Creative Collaborator", desc: "Within 5 years, no professional design workflow will be unaffected by AI. Within 10, AI-generated spatial proposals will be a standard starting point. Our graduates must be fluent directors of AI systems — not displaced by them.", icon: "⚡" },
                { title: "The Experience Economy", desc: "As physical commerce is outcompeted by digital delivery, physical spaces compete on quality and memorability of experience. The designed experience is becoming the primary value proposition of physical space.", icon: "✦" },
                { title: "Convergence of Entertainment & Infrastructure", desc: "Theme parks, museums, cultural districts, sports venues, and transit spaces are converging into hybrid experience environments requiring designers fluent in narrative, technology, spatial composition, and human experience.", icon: "◈" },
                { title: "Climate Emergency", desc: "The era of resource-intensive experiential design is ending. The next generation must be radical innovators in circular materials, bio-fabrication, minimal-footprint spectacle, and intelligence over material intensity.", icon: "◇" },
                { title: "Live Experience Professionalisation", desc: "Concert touring, festivals, brand activation, and live entertainment are investing heavily in scenographic design — a sector with a global shortage of people with the right combination of skills.", icon: "◉" },
                { title: "Neuro-Design & Biometrics", desc: "Real-time feedback on physiological and neurological responses to designed environments creates new possibilities for evidence-based design and new ethical challenges around the manipulation of experience.", icon: "⬡" }
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "22px 20px",
                  background: "rgba(232,180,114,0.03)",
                  border: "1px solid rgba(232,180,114,0.1)",
                  borderRadius: 10,
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(232,180,114,0.25)";
                  e.currentTarget.style.background = "rgba(232,180,114,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(232,180,114,0.1)";
                  e.currentTarget.style.background = "rgba(232,180,114,0.03)";
                }}
                >
                  <div style={{ fontSize: 20, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: 16, color: "#E8E4DC", marginBottom: 8
                  }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(232,228,220,0.45)", lineHeight: 1.7, fontWeight: 300 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Future-Proofing Strategies */}
            <div style={{
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em",
              color: "#72E8A0", marginBottom: 20, fontWeight: 500
            }}>Curriculum Future-Proofing Strategies</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
              {[
                { num: "01", title: "The Rotating Frontier Module", desc: "The Special Topics module rotates content annually, tracking the developing edge. A Curriculum Review Panel — faculty, industry partners, and recent graduates — meets annually to assess and recommend adjustments. No structural reform needed to absorb emerging developments.", color: "#72E8A0" },
                { num: "02", title: "The Living Studio Brief", desc: "Studio briefs at Year Three and Four evolve each year in response to the actual state of the field and each cohort's interests. Pedagogical structures are stable; design challenges shift with emerging typologies, technologies, and cultural conditions.", color: "#72A8E8" },
                { num: "03", title: "Industry-Embedded Learning", desc: "Deep, active industry partnerships ensure students always work with organisations navigating the emerging field in real time — making the curriculum a live site of professional emergence rather than retrospective documentation.", color: "#E8C872" },
                { num: "04", title: "Faculty Development as Strategic Imperative", desc: "An annual faculty development week — technical workshops, industry site visits, and international guest lectures — ensures faculty remain at the active edge and continuously refresh their pedagogical practice.", color: "#E87272" },
                { num: "05", title: "Research Lab as Curriculum Antenna", desc: "The Future Scenography Research Lab explores the most speculative and advanced work without undergraduate constraints. Insights feed back into the curriculum through Special Topics, studio briefs, and Capstone supervision.", color: "#9B72E8" }
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "24px 24px",
                  background: s.color + "05",
                  border: `1px solid ${s.color}15`,
                  borderRadius: 10,
                  borderLeft: `3px solid ${s.color}`,
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start"
                }}>
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    color: s.color,
                    opacity: 0.4,
                    flexShrink: 0,
                    lineHeight: 1,
                    marginTop: 2
                  }}>{s.num}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 17, color: "#E8E4DC", marginBottom: 8
                    }}>{s.title}</div>
                    <div style={{
                      fontSize: 13, lineHeight: 1.75, color: "rgba(232,228,220,0.5)", fontWeight: 300
                    }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Long View closing statement */}
            <div style={{
              padding: "32px 28px",
              border: "1px solid rgba(232,200,114,0.15)",
              borderRadius: 10,
              background: "linear-gradient(135deg, rgba(232,200,114,0.04), rgba(155,114,232,0.04))",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em",
                color: "#E8C872", marginBottom: 14, fontWeight: 500
              }}>The Long View</div>
              <p style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 600,
                fontSize: 16, lineHeight: 1.65, color: "rgba(232,228,220,0.75)",
                maxWidth: 640, margin: "0 auto"
              }}>
                This curriculum produces graduates who are not simply competent practitioners but genuine innovators — designers who understand their field deeply enough to redefine it. The world of spatial design in 2035 will be shaped by people making decisions today. Our graduates will be among those people.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

      </div>
    </div>
  );
}

export default App;
