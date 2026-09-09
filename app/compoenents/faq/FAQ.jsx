import styles from "./FAQ.module.css";

const FAQS = [
  {
    category: "Voyage brief",
    question: "What is ODYSSEY?",
    answer: (
      <p>
        ODYSSEY is a 32-hour innovation and development hackathon that takes
        participants from real-world problem discovery through research,
        ideation, validation, development, and final demonstration.
      </p>
    ),
  },
  {
    category: "The crew",
    question: "Who can participate?",
    answer: (
      <p>
        Students from colleges and higher education institutions can
        participate.
      </p>
    ),
  },
  {
    category: "The crew",
    question: "What is the team size?",
    answer: <p>Teams can have 1 to 4 members.</p>,
  },
  {
    category: "The course",
    question: "Is there a specific theme?",
    answer: (
      <p>
        No. ODYSSEY follows an open-theme format, allowing teams to explore
        problems across software, hardware, AI, and emerging technologies.
      </p>
    ),
  },
  {
    category: "Before departure",
    question: "Do I need to have a fully developed idea before the event?",
    answer: (
      <p>
        No. Participants will be guided through problem discovery, research,
        and ideation. Your initial concept can evolve as you conduct research
        and receive feedback.
      </p>
    ),
  },
  {
    category: "Course correction",
    question: "Can I change or improve my original idea?",
    answer: (
      <p>
        Yes. ODYSSEY encourages teams to refine, improve, or pivot their ideas
        based on research, validation, and feedback.
      </p>
    ),
  },
  {
    category: "Navigation tools",
    question: "What technologies can I use?",
    answer: (
      <p>
        Participants can explore technologies including Gemini API, Google AI
        Studio, Google Antigravity, Firebase, Google Cloud, Google Maps
        Platform, Android, Flutter, ML Kit, Google AI Edge, Coral, and other
        relevant tools.
      </p>
    ),
  },
  {
    category: "Navigation tools",
    question: "Do I have to use Google technologies?",
    answer: (
      <p>
        ODYSSEY is designed around the Google developer ecosystem, and
        participants are encouraged to meaningfully explore and integrate
        Google technologies into their solutions.
      </p>
    ),
  },
  {
    category: "Guidance",
    question: "Will mentors be available?",
    answer: (
      <p>
        The event includes technical sessions, mentorship, and expert guidance
        to support participants throughout the development journey.
      </p>
    ),
  },
  {
    category: "Voyage brief",
    question: "How long is the hackathon?",
    answer: (
      <p>
        ODYSSEY is a 32-hour continuous innovation sprint conducted from
        19–20 September 2026.
      </p>
    ),
  },
  {
    category: "Coordinates",
    question: "Where is the event happening?",
    answer: (
      <>
        <p>The event will be held at:</p>
        <address className={styles.address}>
          College of Engineering Chengannur (CEC)
          <br />
          Alappuzha, Kerala
        </address>
      </>
    ),
  },
  {
    category: "Provisions",
    question: "Will food be provided?",
    answer: (
      <p>
        Yes. <strong>4 meals and 2 snacks</strong> will be provided throughout
        the 32-hour hackathon.
      </p>
    ),
  },
  {
    category: "Packing list",
    question: "What should I bring?",
    answer: (
      <p>
        Participants should bring their laptops, chargers, and any other
        equipment required for their project development.
      </p>
    ),
  },
  {
    category: "Judging bearings",
    question: "How will projects be evaluated?",
    answer: (
      <>
        <p>Projects will be evaluated on:</p>
        <ul className={styles.criteriaList}>
          <li>Innovation</li>
          <li>Problem understanding</li>
          <li>Functionality</li>
          <li>Technical execution</li>
          <li>Effective use of Google and AI technologies</li>
          <li>User experience</li>
          <li>Real-world impact</li>
          <li>Scalability</li>
        </ul>
      </>
    ),
  },
  {
    category: "The destination",
    question: "What happens after the final demo?",
    answer: (
      <p>
        Following the final presentations, the judging panel will evaluate the
        solutions and the strongest teams will be recognized as the ODYSSEY
        winners.
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
          <div className={styles.briefingCopy}>
            <div className={styles.eyebrow}>
              <span>BEFORE YOU SET SAIL</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            <h2 className={styles.sectionTitle} id="faq-title">
              Questions for
              <span>the voyage.</span>
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
                    <span className={styles.question}>{faq.question}</span>
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
