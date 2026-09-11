import styles from "./Footer.module.css";

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const MailIcon = () => (
  <svg width="14" height="14" {...stroke}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" {...stroke}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" {...stroke}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" {...stroke}>
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <path d="M17.6 6.4h.01" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" {...stroke}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" {...stroke}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CONTACT = [
  {
    icon: <MailIcon />,
    label: "iedcbootcampcec@ceconline.edu",
    href: "mailto:iedcbootcampcec@ceconline.edu",
  },
  {
    icon: <PhoneIcon />,
    label: "+91 70126 84869",
    href: "tel:+917012684869",
  },
  {
    icon: <MapPinIcon />,
    label: (
      <>
        College of Engineering Chengannur,
        <br />
        Alappuzha, Kerala
      </>
    ),
  },
];

const SOCIALS = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <TwitterIcon />, href: "#", label: "Twitter" },
  { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bg} aria-hidden="true" />
      <span className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          {/* ── Brand ── */}
          <div className={styles.brand}>
            <p className={styles.eyebrow}>
              IEDC BOOTCAMP CEC × <span className={styles.mu}>μ</span>LEARN CHN
            </p>
            <h2 className={styles.wordmark}>ODYSSEY</h2>
            <span className={styles.brandRule} aria-hidden="true" />
            <p className={styles.tagline}>
              Endless possibilities. A creative expedition for curious minds.
            </p>
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <div className={styles.contact}>
            <h3 className={styles.contactTitle}>Get in Touch</h3>

            <ul className={styles.contactList}>
              {CONTACT.map((item, i) => (
                <li key={i} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className={styles.contactLink}>
                      {item.label}
                    </a>
                  ) : (
                    <span className={styles.contactText}>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.socials}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.social}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <span className={styles.hairline} aria-hidden="true" />

        <p className={styles.copyright}>© 2026 ODYSSEY. All rights reserved.</p>
      </div>
    </footer>
  );
}
