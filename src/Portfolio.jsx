import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Code2,
  User,
  Award,
  ChevronDown,
  Terminal,
  Database,
  Cpu,
} from "lucide-react";

/* =========================
   Utility Components
========================= */

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-14 text-center">
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
      {children}
    </h2>
    {subtitle && (
      <p className="text-slate-400 max-w-3xl mx-auto">{subtitle}</p>
    )}
  </div>
);

const Card = ({ children }) => (
  <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 transition hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/10">
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
    {children}
  </span>
);
const SkillBar = ({ name, level }) => {
  const levelWidth =
    level === "Advanced"
      ? "90%"
      : level === "Proficient"
      ? "75%"
      : "60%";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-slate-300">
        <span>{name}</span>
        <span className="text-slate-400">{level}</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
          style={{ width: levelWidth }}
        />
      </div>
    </div>
  );
};


/* =========================
   Reveal on Scroll
========================= */

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const FadeIn = ({ children }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

/* =========================
   Main Portfolio
========================= */

export default function Portfolio() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handler = () => {
      const ids = [
        "home",
        "about",
        "experience",
        "skills",
        "projects",
        "education",
        "certifications",
        "contact",
      ];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <span
            onClick={() => scrollTo("home")}
            className="font-bold text-lg cursor-pointer bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          >
            Achudhan M
          </span>
          <div className="hidden md:flex gap-8 text-sm">
            {[
              "home",
              "about",
              "experience",
              "skills",
              "projects",
              "contact",
            ].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`capitalize transition ${
                  active === id ? "text-blue-400" : "text-slate-400"
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 text-center"
      >
        <div>
          <Badge>Open to Opportunities</Badge>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold">
            Backend-Focused <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto">
            Final-year Computer Science undergraduate specializing in Java,
            Spring Boot, Microservices, and scalable backend systems.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
            onClick={() => scrollTo("projects")}
            className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              View Projects
              </button>
            <a
    href="/Achudhan_M_Resume.pdf"
    download
    className="px-8 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500/10 transition"
  >
    Download Resume
  </a>

  <button
    onClick={() => scrollTo("contact")}
    className="px-8 py-3 border border-slate-700 rounded-full hover:bg-slate-800 transition"
  >
    Contact
  </button>
</div>

          <ChevronDown className="mx-auto mt-20 animate-bounce text-slate-500" />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24">
        <FadeIn>
          <SectionHeading subtitle="Who I am">About Me</SectionHeading>
          <div className="max-w-4xl mx-auto text-slate-400 space-y-6 text-lg">
            <p>
              I am a Computer Science undergraduate at SRM University with a
              strong foundation in Data Structures, Object-Oriented Programming,
              and backend system design.
            </p>
            <p>
              I build enterprise-grade REST APIs and microservices using Java,
              Spring Boot, Apache Kafka, Docker, and PostgreSQL, and integrate
              Python-based ML services when required.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="py-24 bg-slate-900/50">
        <FadeIn>
          <SectionHeading subtitle="Industry exposure & virtual experiences">
            Experience
          </SectionHeading>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-l-2 border-slate-700 pl-6">
              <h3 className="text-xl font-bold">
                Software Development Engineer – Virtual Experience
              </h3>
              <p className="text-blue-400">
                JPMorgan Chase & Co. · July 2025
              </p>
              <ul className="mt-2 text-slate-400 list-disc list-inside">
                <li>
                  Designed and implemented RESTful APIs using Spring Boot
                  integrated with Kafka for event-driven architecture.
                </li>
                <li>
                  Used H2 in-memory database for rapid prototyping and backend
                  validation.
                </li>
                <li>
                  Tested backend controllers using Postman, gaining exposure to
                  enterprise-grade microservices.
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-slate-700 pl-6">
              <h3 className="text-xl font-bold">
                Software Engineering – Virtual Experience
              </h3>
              <p className="text-blue-400">Accenture · June 2025</p>
              <ul className="mt-2 text-slate-400 list-disc list-inside">
                <li>
                  Completed full SDLC tasks including architecture design,
                  security considerations, and unit testing.
                </li>
                <li>
                  Followed Agile methodology and enterprise development best
                  practices.
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-slate-700 pl-6">
              <h3 className="text-xl font-bold">
                Data Analyst – Virtual Experience
              </h3>
              <p className="text-blue-400">Quantium · May 2025</p>
              <ul className="mt-2 text-slate-400 list-disc list-inside">
                <li>
                  Performed customer segmentation and uplift modeling using
                  Python (Pandas, NumPy).
                </li>
                <li>
                  Conducted A/B testing and hypothesis testing to derive business
                  insights.
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-24">
  <FadeIn>
    <SectionHeading subtitle="Technical strengths and proficiency levels">
      Skills
    </SectionHeading>

    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Backend & Core Engineering */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-100">
          Backend & Core Engineering
        </h3>

        <SkillBar name="Java" level="Proficient" />
        <SkillBar name="Spring Boot" level="Proficient" />
        <SkillBar name="Apache Kafka" level="Proficient" />
        <SkillBar name="PostgreSQL / MySQL" level="Proficient" />
        <SkillBar name="Docker" level="Working Knowledge" />
        <SkillBar name="REST API Design" level="Advanced" />
      </div>

      {/* Programming, Data & Frontend */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-100">
          Programming, Data & Frontend
        </h3>

        <SkillBar name="Python" level="Advanced" />
        <SkillBar name="React.js" level="Proficient" />
        <SkillBar name="Git & Version Control" level="Proficient" />
        <SkillBar name="AWS (EC2, S3)" level="Working Knowledge" />
        <SkillBar name="FastAPI" level="Working Knowledge" />
      </div>
    </div>

    <p className="text-sm text-slate-500 text-center mt-10">
      Proficiency levels reflect hands-on project and implementation experience.
    </p>
  </FadeIn>
</section>


      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-24 bg-slate-900/50">
        <FadeIn>
          <SectionHeading subtitle="Academic & personal work">
            Projects
          </SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card>
              <h3 className="font-bold text-xl">
                Intelligent Financial Analytics Platform
              </h3>
              <p className="text-slate-400 mt-2">
                Microservices-based fraud detection platform using Spring Boot
                and PostgreSQL with a Python ML service for real-time fraud
                scoring.
              </p>
              <p className="text-slate-400 mt-2">
                Dockerized backend, ML, and database services using Docker
                Compose for scalable deployment.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-xl">
                MidasCore Banking Platform
              </h3>
              <p className="text-slate-400 mt-2">
                Core banking microservice built with Spring Boot and REST APIs
                for account and transaction management.
              </p>
              <p className="text-slate-400 mt-2">
                Integrated Apache Kafka and implemented testing using Mockito
                and Postman.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-xl">BigMart Sales Prediction</h3>
              <p className="text-slate-400 mt-2">
                End-to-end regression pipeline using XGBoost to predict product
                sales across retail outlets.
              </p>
              <p className="text-slate-400 mt-2">
                Performed EDA and feature engineering using Pandas and
                Scikit-Learn.
              </p>
            </Card>
          </div>
        </FadeIn>
      </section>

      {/* ================= EDUCATION ================= */}
      <section id="education" className="py-24">
        <FadeIn>
          <SectionHeading subtitle="Academic background">
            Education
          </SectionHeading>
          <div className="max-w-3xl mx-auto text-center text-slate-400">
            <h3 className="text-xl font-bold text-slate-100">
              SRM University, Chennai
            </h3>
            <p>B.Tech in Computer Science Engineering</p>
            <p>CGPA: 8.75 · 2022 – 2026</p>
          </div>
        </FadeIn>
      </section>

      {/* ================= CERTIFICATIONS ================= */}
      <section id="certifications" className="py-24 bg-slate-900/50">
        <FadeIn>
          <SectionHeading subtitle="Continuous learning">
            Certifications
          </SectionHeading>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              "Introduction to Transformer-Based Natural Language Processing",
              "React.js Complete Course",
              "Python for Machine Learning",
              "Programming in HTML5 with JavaScript and CSS3",
            ].map((c) => (
              <Card key={c}>
                <div className="flex items-center gap-4">
                  <Award className="text-purple-400" />
                  <span>{c}</span>
                </div>
              </Card>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24">
        <FadeIn>
          <SectionHeading subtitle="Reach out">
            Contact
          </SectionHeading>
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <p className="flex items-center gap-2">
              <Mail /> amachudhan10@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone /> +91 88255 94424
            </p>
            <div className="flex gap-6 mt-4">
  <a
    href="https://github.com/soulviper18"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition"
  >
    <Github size={22} />
  </a>

  <a
    href="https://www.linkedin.com/in/achudhan-m-9a49062b3"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition"
  >
    <Linkedin size={22} />
  </a>
</div>

          </div>
        </FadeIn>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-slate-500 border-t border-slate-800">
        © {new Date().getFullYear()} Achudhan M · Chennai, India
      </footer>
    </div>
  );
}
