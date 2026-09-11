import styles from "./FAQ.module.css";

const FAQS = [
  {
    category: "Voyage brief",
    question: "What is ODYSSEY, and who can participate?",
    answer: (
      <p>
        ODYSSEY is a 32-hour innovation and development hackathon for college
        and higher education students, taking teams from problem discovery and
        research to ideation, validation, development, and final demonstration.
      </p>
    ),
  },
  {
    category: "Crew and course",
    question: "What is the team size and theme?",
    answer: (
      <p>
        Teams can have 1–4 members. ODYSSEY follows an open-theme format,
        allowing participants to work on problems across software, hardware,
        AI, and emerging technologies.
      </p>
    ),
  },
  {
    category: "Before departure",
    question: "Do I need an idea beforehand? Can I change it later?",
    answer: (
      <p>
        No. You can discover and develop your idea during the hackathon. Teams
        are encouraged to refine, improve, or pivot their ideas based on
        research, validation, and feedback.
      </p>
    ),
  },
  {
    category: "Navigation tools",
    question: "What technologies can I use?",
    answer: (
      <p>
        Participants can use relevant technologies, with opportunities to
        explore the Google developer ecosystem, including Gemini API, Google AI
        Studio, Firebase, Google Cloud, Google Maps Platform, Android, Flutter,
        ML Kit, Google AI Edge, Coral, and more. Meaningful use of Google
        technologies is encouraged.
      </p>
    ),
  },
  {
    category: "Guidance",
    question: "Will guidance and mentorship be provided?",
    answer: (
      <p>
        Yes. Technical sessions, mentors, and expert guidance will be available
        throughout the development journey.
      </p>
    ),
  },
  {
    category: "Coordinates",
    question: "When and where is ODYSSEY happening?",
    answer: (
      <p>
        The hackathon will be conducted as a 32-hour continuous sprint from
        19–20 September 2026 at College of Engineering Chengannur (CEC),
        Alappuzha, Kerala.
      </p>
    ),
  },
  {
    category: "Provisions",
    question:
      "Will food and other facilities be provided? What should I bring?",
    answer: (
      <p>
        Yes. 4 meals and 2 snacks will be provided. Participants should bring
        their laptops, chargers, and any project-specific equipment they need.
      </p>
    ),
  },
  {
    category: "Judging bearings",
    question:
      "How will projects be evaluated and what happens after the demo?",
    answer: (
      <p>
        Projects will be judged on innovation, problem understanding,
        functionality, technical execution, use of Google/AI technologies,
        user experience, real-world impact, and scalability. After the final
        demos, the judging panel will evaluate the solutions and recognize the
        ODYSSEY winners.
      </p>
    ),
  },
];

export default function FAQ() {
  return (
    <section
      className={styles.faqSection}
      id="faq"
      aria-labelledby="faq-title"
    >
      <span className={styles.chartArcOne} aria-hidden="true" />
      <span className={styles.chartArcTwo} aria-hidden="true" />

      <div className={styles.faqInner}>
        <aside className={styles.briefing}>
          <div>
            <div className={styles.eyebrow}>
              <span>BEFORE YOU SET SAIL</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            <h2 className={styles.sectionTitle} id="faq-title">
              Frequently Asked
              <span>Questions</span>
            </h2>

            <p className={styles.intro}>
              Every expedition begins with a clear chart. Open a dispatch for
              the details you need before joining ODYSSEY.
            </p>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.compass} aria-hidden="true">
              <span className={styles.compassNorth}>N</span>
              <span className={styles.compassEast}>E</span>
              <span className={styles.compassSouth}>S</span>
              <span className={styles.compassWest}>W</span>
              <span className={styles.compassTicks} />
              <span className={styles.compassNeedle} />
              <span className={styles.compassPin} />
            </div>

            <p className={styles.compassMotto}>
              True north: build something that matters.
            </p>

            <dl className={styles.voyageFacts}>
              <div>
                <dt>Duration</dt>
                <dd>32 hours</dd>
              </div>
              <div>
                <dt>Crew</dt>
                <dd>1–4 members</dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>19–20 Sep 2026</dd>
              </div>
              <div>
                <dt>Port</dt>
                <dd>CEC, Kerala</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div className={styles.archive}>
          <div className={styles.archiveHeader}>
            <div>
              <span className={styles.archiveKicker}>Navigator’s archive</span>
              <p>Select a dispatch to reveal its field notes.</p>
            </div>
            <span className={styles.dispatchCount}>
              <strong>{FAQS.length}</strong>
              dispatches
            </span>
          </div>

          <div className={styles.faqList}>
            {FAQS.map((faq, index) => (
              <details
                className={styles.faqItem}
                key={faq.question}
                name="odyssey-faq"
                open={index === 0}
              >
                <summary className={styles.questionRow}>
                  <span className={styles.logNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.questionCopy}>
                    <span className={styles.category}>{faq.category}</span>
                    <h3 className={styles.question}>{faq.question}</h3>
                  </span>

                  <span className={styles.toggle} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </summary>

                <div className={styles.answer}>
                  <div className={styles.answerInner}>{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>

          <div className={styles.archiveFooter}>
            <span className={styles.archiveStar} aria-hidden="true">
              ✦
            </span>
            <p>
              Still looking for a bearing? Write to{" "}
              <a href="mailto:iedcbootcampcec@ceconline.edu">
                iedcbootcampcec@ceconline.edu
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
