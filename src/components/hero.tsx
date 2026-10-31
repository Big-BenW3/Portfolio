"use client";


import { AppLink } from "@/components/app-link";
import { useEffect, useState } from "react";
import { bio, heroSocials, profile } from "@/data/content";
import {
  IconBadge,
  IconClock,
  IconDiscord,
  IconHeart,
  IconMail,
  IconPin,
  IconX,
  SocialIcon,
} from "@/components/icons";
import { Portrait } from "@/components/portrait";
import { Rich, Tooltip, formatClock, useNow } from "@/components/ui";

export function Hero() {
  const now = useNow();
  const [day, setDay] = useState<number | null>(null);
  const [hearted, setHearted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [restart, setRestart] = useState(0);

  const roles = [
    { left: "Blockchain", right: "Engineer" },
    { left: "Mobile   ", right: "Developer" },
    { left: "FullStack", right: "Builder" },
  ];

  useEffect(() => {
    setDay(new Date().getDay());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setRestart((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      <div className="hero-section-banner-outer">
        <div className="hero-section-profile">
          <div className="hero-center-row">
            <span key={`left-${restart}`} className="hero-flank hero-flank-left">{roles[roleIndex].left}</span>
            <div className="hero-section-avatar-wrapper">
              <div className="hero-section-avatar">
                <Portrait />
              </div>
            </div>
            <span key={`right-${restart}`} className="hero-flank hero-flank-right">{roles[roleIndex].right}</span>
          </div>
          <div className="hero-section-content">
            <div className="hero-section-profile-main">
              <h1 className="hero-section-profile-name">
                {profile.name}
                <Tooltip text={hearted ? "Still here" : "A little spark"} position="right">
                  <button
                    type="button"
                    className="heart"
                    aria-label="Heart"
                    onClick={() => setHearted((value) => !value)}
                    style={{ background: "none", border: "none", padding: 0 }}
                  >
                    <IconHeart size={18} />
                  </button>
                </Tooltip>
              </h1>
              <div className="hero-section-profile-username">
                <a href={profile.handleHref} target="_blank" rel="noreferrer">
                  {profile.handle}
                </a>
                <span className="verified" title="Sample badge">
                  <IconBadge size={14} />
                </span>
              </div>
              <div className="hero-section-profile-status-row">
                <a className="availability-text" href={profile.statusHref} target="_blank" rel="noreferrer">
                  <i className="availability-dot" />
                  {profile.status}
                </a>
              </div>
              <div className="hero-section-profile-meta-row">
                <span className="hero-section-profile-meta">
                  <IconPin size={12} /> {profile.location}
                </span>
                <span className="hero-section-profile-dot">•</span>
                <span className="hero-section-profile-meta">
                  <IconClock size={12} /> {formatClock(now)}
                </span>
              </div>
            </div>
            {/* <ul className="about-bio">
              {bio.map((line) => (
                <li key={line} className="about-bio-item">
                  {/* <span className="about-bio-marker" /> *
                  <span>
                    <Rich text={line} />
                  </span>
                </li>
              ))}
            </ul> */}
            <div className="hero-divider" />
            <div className="community-links">
              <a className="twitter-card" href={profile.xHref} target="_blank" rel="noreferrer">
                <div className="twitter-card-left">
                  <IconX className="twitter-icon" size={18} />
                </div>
                <div className="twitter-card-middle">
                  <span className="twitter-name">
                    {profile.xName} <IconBadge size={14} />
                  </span>
                  <span className="twitter-handle">{profile.xHandle}</span>
                </div>
                <div className="twitter-card-right">
                  <span className="twitter-follow-btn">Follow</span>
                </div>
              </a>
              <a className="discord-invite" href={profile.clubHref} target="_blank" rel="noreferrer">
                <div className="discord-invite-left">
                  <IconDiscord size={22} />
                </div>
                <div className="discord-invite-middle">
                  <span className="discord-server-name">{profile.clubName}</span>
                  <span className="discord-server-stats">
                    <i className="discord-online-dot" />
                    {profile.clubOnline}
                    <span style={{ color: "#555" }}>·</span>
                    {profile.clubMeta}
                  </span>
                </div>
                <div className="discord-invite-right">
                  <span className="discord-join-btn">{profile.clubCta}</span>
                </div>
              </a>
            </div>
            <div className="contact-me">
              <a className="contact-btn" href={`mailto:${profile.email}`}>
                <IconMail size={14} /> Email me
              </a>
              {heroSocials.map((item) => {
                const inner = (
                  <Tooltip text={item.name} position="bottom">
                    {item.internal ? (
                      <AppLink to={item.href} className="icon-hit" ariaLabel={item.name}>
                        <span style={{ color: item.color, display: "inline-flex" }}>
                          <SocialIcon name={item.name} />
                        </span>
                      </AppLink>
                    ) : (
                      <a
                        href={item.href}
                        className="icon-hit"
                        aria-label={item.name}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: item.color }}
                      >
                        <SocialIcon name={item.name} />
                      </a>
                    )}
                  </Tooltip>
                );
                return <span key={item.name}>{inner}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
