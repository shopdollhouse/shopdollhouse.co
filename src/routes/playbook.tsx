import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

/* ─── SVG Icon System ─────────────────────────────────── */
const SVG_ICONS: Record<string, JSX.Element> = {
  target: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  calculator: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>,
  microphone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  "bar-chart": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.98-1.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  clipboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  pen: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  calendar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  "trending-up": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  link: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  heart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  video: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23,7 16,12 23,17"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  bot: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V5"/><circle cx="12" cy="4" r="1"/><line x1="8" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="16" y2="12"/><path d="M9 16s1 1 3 1 3-1 3-1"/></svg>,
  globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  masks: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  megaphone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  "map-pin": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  lock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  send: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>,
  flower: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.5 2.5-1 3.5"/><path d="M12 2a4 4 0 0 0-4 4c0 1.5.5 2.5 1 3.5"/><path d="M12 22a4 4 0 0 0 4-4c0-1.5-.5-2.5-1-3.5"/><path d="M12 22a4 4 0 0 1-4-4c0-1.5.5-2.5 1-3.5"/><path d="M2 12a4 4 0 0 0 4 4c1.5 0 2.5-.5 3.5-1"/><path d="M2 12a4 4 0 0 1 4-4c1.5 0 2.5.5 3.5 1"/><path d="M22 12a4 4 0 0 1-4 4c-1.5 0-2.5-.5-3.5-1"/><path d="M22 12a4 4 0 0 0-4-4c-1.5 0-2.5.5-3.5 1"/></svg>,
  smartphone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>,
  briefcase: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>,
  "trending-up-alt": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  handshake: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  "eye-off": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  mirror: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="16" rx="2"/><path d="M12 18v4"/><path d="M8 22h8"/></svg>,
  sparkle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  flame: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  hourglass: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V6a2 2 0 0 0-2-2h-3"/><rect x="7" y="2" width="10" height="4" rx="1"/></svg>,
  gem: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,3 18,3 22,9 12,22 2,9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="2" y2="9"/><line x1="12" y1="3" x2="22" y2="9"/></svg>,
  "arrow-up": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5,12 12,5 19,12"/></svg>,
  crown: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V9l7-5 7 5v11"/><polyline points="2,9 5,9"/><polyline points="19,9 22,9"/></svg>,
  "sprout": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5 4-6 4-6-4 0-6 3.5-4 6z"/><path d="M14 20c.5-4-4-6-4-6 0 5.5 4 6 4 6z"/><path d="M12 14v6"/></svg>,
  rocket: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  compass: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/></svg>,
  "alert-circle": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  ban: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  "utensils": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="3" x2="9" y2="21"/><path d="M6 3v5a3 3 0 0 0 6 0V3"/><path d="M15 3v18"/></svg>,
  "file-text": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  upload: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  dollar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  "package": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  "lightbulb": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  "shirt": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>,
  "building": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M8 12h.01"/><path d="M16 12h.01"/></svg>,
  "search": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  "inbox": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 16,12 14,15 10,15 8,12 2,12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  "paint": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16s.5-3 4-3 4.5 3 7.5 3 4-3 4-3"/><path d="M2 20h20"/><path d="M9 4.8L12 2l8 8-3.5 3.5c-1.3 1.3-3.3 1.3-4.6 0L9 11a3.3 3.3 0 0 1 0-6.2z"/></svg>,
  "zap": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
  "check-circle": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>,
  "headphones": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  "plus-circle": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  brain: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>,
  "ruler": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 8.7l-8.6 8.6c-.4.4-1 .4-1.4 0l-5.6-5.6c-.4-.4-.4-1 0-1.4l8.6-8.6c.4-.4 1-.4 1.4 0l5.6 5.6c.4.4.4 1 0 1.4z"/><path d="M7.5 12.5l1.5 1.5"/><path d="M11 9l1.5 1.5"/><path d="M14.5 5.5l1.5 1.5"/></svg>,
  "layout": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
};

function SvgIcon({ id, size = 18, style }: { id: string; size?: number; style?: React.CSSProperties }) {
  const icon = SVG_ICONS[id];
  if (!icon) return <span style={style} />;
  if (size === 18 && !style) return <span className="inline-flex items-center justify-center" style={{ width: 18, height: 18, flexShrink: 0 }}>{icon}</span>;
  return (
    <span className="inline-flex items-center justify-center" style={{ width: size, height: size, flexShrink: 0, ...style }}>
      {icon}
    </span>
  );
}

/* ─── Types ───────────────────────────────────────────── */
type Tab = "start" | "workflow" | "monthly" | "prompts" | "outreach" | "growth" | "newhire" | "deals" | "content" | "quote" | "schedule" | "discovery" | "proposal" | "links";

/* ─── Prompt Card ─────────────────────────────────────── */
function PromptCard({ title, tag, prompt }: { title: string; tag: string; prompt: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.6)" }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.18)", color: "#9a7a3a" }}>{tag}</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "#1e0f0a" }}>{title}</span>
        </div>
        <button onClick={copy} className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-lg transition-all" style={{ fontFamily: FONT_LUXE, background: copied ? "#4a7a4a" : "var(--ink)", color: "var(--cream)" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: FONT_BODY, color: "rgba(30,15,10,0.75)", margin: 0 }}>{prompt}</pre>
    </div>
  );
}

/* ─── Check Item ──────────────────────────────────────── */
function CheckItem({ text, sub }: { text: string; sub?: string }) {
  const [done, setDone] = useState(false);
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <button
        onClick={() => setDone(!done)}
        className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all border"
        style={{ background: done ? "var(--gold)" : "transparent", borderColor: done ? "var(--gold)" : "rgba(200,168,100,0.5)" }}
      >
        {done && <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>}
      </button>
      <div>
        <p className="leading-snug" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: done ? "rgba(30,15,10,0.35)" : "rgba(30,15,10,0.85)", textDecoration: done ? "line-through" : "none" }}>{text}</p>
        {sub && <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.4)" }}>{sub}</p>}
      </div>
    </label>
  );
}

/* ─── Section Header ──────────────────────────────────── */
function SectionHeader({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>{label}</p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1.1 }}>{title}</h2>
      {sub && <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.55)" }}>{sub}</p>}
    </div>
  );
}

/* ─── Phase Block ─────────────────────────────────────── */
function Phase({ day, title, items }: { day: string; title: string; items: { text: string; sub?: string }[] }) {
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
      <div className="flex items-center gap-3 mb-5">
        <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>{day}</span>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", color: "var(--ink)" }}>{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => <CheckItem key={i} {...item} />)}
      </div>
    </div>
  );
}

/* ─── Tab: Workflow ───────────────────────────────────── */
function WorkflowTab() {
  return (
    <div className="space-y-6">
      <SectionHeader label="Client Lifecycle" title="From lead to live — step by step." sub="Every step you need to do when a new client signs on. Check items off as you go." />

      <Phase day="Lead Stage" title="Before They Sign" items={[
        { text: "Discovery call booked via contact form or DM", sub: "Use the call to learn about their goals, platforms, budget, and how they're doing content now." },
        { text: "Send proposal within 24 hours of the call", sub: "Include the plan tier, what's covered, ad spend note (minimum $500/mo paid directly to Meta), and contract link." },
        { text: "Follow up if no response in 48 hours", sub: "One follow-up email or DM. Keep it warm, not pushy." },
        { text: "Contract signed + first invoice paid before any work begins" },
      ]} />

      <Phase day="Day 1" title="1-on-1 Kickoff Call" items={[
        { text: "Welcome them and set the tone — make them feel like they made the right decision" },
        { text: "Clarify what problems they want to solve", sub: "Ask: 'What's your biggest problem right now? Missed calls? Not enough leads? No time for content?' Get them talking — the more they say, the better you can tailor the work." },
        { text: "Walk them through the key features of their system", sub: "Show them what's running: content scheduling, automations, missed call text back, comment-to-DM. Make it feel like their business just got a team." },
        { text: "Set expectations for next steps — when content goes live, what they'll see in the app" },
        { text: "Make sure the account is set up A–Z before you hang up:", sub: "✓ Log in together (confirm access works) ✓ Connect their business email/domain ✓ Add their business phone number ✓ Load their calendar or booking link ✓ Import their contact list ✓ Trigger a test workflow (send test SMS so they see it work) ✓ Customize their first message template to sound like their brand ✓ Walk them through the conversations tab" },
      ]} />

      <Phase day="Day 1–2" title="Onboarding" items={[
        { text: "Send welcome email with onboarding questionnaire", sub: "Brand voice, target audience, competitors they love, content pillars, posting goals." },
        { text: "Send the client their launch timeline right away", sub: "They need to know exactly what happens next or they'll feel anxious. See the timeline template below — fill in the real dates and send it with the welcome email." },
        { text: "Request all brand assets", sub: "Logo files (PNG + SVG), brand colours (hex codes), fonts, any existing photos or video. Don't start creating anything until you have these." },
        { text: "Ask for 2–3 competitor accounts they love", sub: "Ask: 'Are there any businesses — local or anywhere — whose social media you really like? I want to understand the vibe you're going for.' This saves you from creating content in the wrong direction." },
        { text: "Get social media logins or request admin access", sub: "Facebook Business Manager, Instagram, TikTok, Google Business if applicable." },
        { text: "Set up client in CRM", sub: "Create contact, pipeline stage, add tags, assign to the correct workflow/automation. Every client must be in the CRM before any work starts." },
        { text: "Verify Meta ad account access + pixel is installed", sub: "If no pixel — walk them through installing it or do it via GTM." },
        { text: "Ask the 4 client interview questions — document the answers:", sub: "1) How did you find out about us?  2) What tools were you using before?  3) What results do you most want to see?  4) How will you know this is working for your business? — These answers shape your strategy and become your case study later." },
      ]} />

      {/* Onboarding Questionnaire Card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Day 1 — Send With the Welcome Email</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>Client Onboarding Questionnaire</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            Send this form right after they sign. Every answer shapes your strategy for Month 1. Don't start creating content until this is filled out. Use the "Client Intake / Onboarding Form" prompt in the Prompts tab to generate a full formatted version — or use these questions directly in a Google Form or the platform's form builder.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { section: "Business Basics", qs: ["Business name + website", "Business type / industry", "City and main service area", "Business phone + primary contact email"] },
              { section: "Social Media", qs: ["All platforms + usernames", "Who manages the accounts now?", "Which platform is most important to them?", "Do we have login access yet?"] },
              { section: "Brand Identity", qs: ["Primary colours (hex codes if available)", "Fonts used (if they know)", "Brand voice: Professional / Friendly / Bold / Fun / Luxury", "Tagline or what they say about themselves"] },
              { section: "Content", qs: ["3–5 topics they want to post about", "Topics to NEVER post about", "Do they have photos/videos we can use?", "Do they want to appear in content?"] },
              { section: "Goals", qs: ["What does success look like in 30 days?", "#1 action they want followers to take", "Any upcoming events or promotions to plan around?", "3 competitors or brands they want to look like"] },
              { section: "Access + Logins", qs: ["Social media access method (login / Business Manager / Creator Studio)", "Google Business Profile access", "Any other tools we need (booking system, e-commerce, etc.)", "Secure password-sharing method (use 1Password or platform vault — never email passwords)"] },
            ].map(({ section, qs }) => (
              <div key={section} className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>{section}</p>
                <div className="space-y-1.5">
                  {qs.map(q => (
                    <div key={q} className="flex items-start gap-2">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "9px", height: "9px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                      <span style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.45 }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onboarding Timeline Card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Send This With the Welcome Email</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>Your Launch Timeline Template</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            Happy clients are informed clients. Send this timeline on Day 1 so they know exactly what to expect and when. Fill in the real dates. This one message stops 90% of "how's it going?" check-in messages before they start.
          </p>
          <div className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
            <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Copy and send — fill in the dates</p>
            <p className="whitespace-pre-line leading-relaxed" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", fontStyle: "italic" }}>{`Hey [NAME]!

So excited to have [BUSINESS NAME] on board. Here's exactly what the next three weeks look like so you always know what's happening:

📋 Today — I'll send you a short onboarding form. Takes about 5 minutes to fill out.

🎨 [DATE +3–4 days] — I'll need your logo, brand colours, and any photos you want to use. I'll remind you.

📅 [DATE +5–7 days] — I'll build your content plan and share it with you for a quick look before anything goes live.

✅ [DATE +14–16 days] — Your content is ready for approval. You'll have 48 hours to review and request any changes.

🚀 [DATE +21 days] — Everything goes live! Your first posts start publishing and your automations are running.

📊 [DATE + end of month] — I'll send your first performance report with a full breakdown of how everything is performing.

Questions at any point? Just reply to this email.

Can't wait to get started!
Mandy`}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What to collect before Day 5</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Logo files — PNG with transparent background + original file if they have it",
                "Brand colours — exact hex codes, or photos of packaging/website",
                "Fonts — if they have specific ones, otherwise you choose",
                "2–3 competitor or inspiration accounts — 'who do you want to look like?'",
                "Any existing photos, videos, or product shots they have",
                "Their Google review link (for the review automation)",
                "Their booking link or main CTA link (for automations and CTAs)",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "10px", height: "10px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Phase day="Day 3–5" title="Account Setup" items={[
        { text: "Audit their existing social profiles", sub: "Bio, profile photo, link in bio, pinned posts, highlight covers if applicable." },
        { text: "Update or optimize profiles where needed" },
        { text: "Set up and verify Meta Pixel on their website", sub: "Install via Events Manager → connect to their website domain. Confirm it's firing using Meta Pixel Helper (Chrome extension). Pixel must be live before any ads run." },
        { text: "Set up the Brand Board in the platform", sub: "Add client's exact colours (hex codes), fonts, logo, and visual style. The platform's AI pulls from this when making content — so everything looks custom, not generic." },
        { text: "Define their 4–5 content pillars", sub: "Education / Behind the Scenes / Social Proof / Promotion / Personality" },
        { text: "Build their brand voice guide (use the Brand Voice prompt below)" },
        { text: "Set up their content calendar template for Month 1" },
        { text: "Confirm posting schedule with client — how many posts/week, what platforms" },
      ]} />

      <Phase day="Day 6–10" title="Content Creation" items={[
        { text: "Write all captions for Month 1", sub: "Use the Caption Writing prompt. Batch all posts at once — never write one at a time." },
        { text: "Design graphics or pull/edit photos", sub: "Match their brand colours, fonts, and style. Use Canva or provided templates." },
        { text: "Create any Reel scripts or video hooks if video is included" },
        { text: "Build 2–4 ad creatives if ads are in their plan", sub: "One image ad, one video/carousel. Use the Ad Copy prompt." },
        { text: "Internal review — does everything sound like them? Is it on-brand?" },
      ]} />

      <Phase day="Day 11–12" title="Client Approval" items={[
        { text: "Send content calendar + all posts to client for review", sub: "Use a shared Google Drive folder or your platform's content approval feature." },
        { text: "Give them a 48-hour window to request changes" },
        { text: "Make revisions — limit to one round of revisions per month" },
        { text: "Get written approval before scheduling anything" },
      ]} />

      <Phase day="Day 13–14" title="Schedule & Launch" items={[
        { text: "Schedule all approved posts through the platform" },
        { text: "Set ads to launch at 12:00am the next day", sub: "Never launch ads mid-day. Starting at midnight gives you a full 24-hour data window from day one — cleaner results and easier to compare day-over-day performance." },
        { text: "Confirm ad campaign settings — budget, audience, placement, creative, pixel event" },
        { text: "Send client a 'You're live!' message with what to expect this month" },
        { text: "Set up keyword-triggered comment automation", sub: "Put a keyword CTA on the last slide of each carousel — e.g. 'Comment GLOW for a free guide.' In the platform, build a workflow: Trigger = comment contains keyword → AI agent DMs them the lead magnet and starts a conversation. No human needed." },
        { text: "Build their AI lead magnet using the platform's AI Studio", sub: "One prompt generates the whole thing: cover page with their branding, tips/value content, and a CTA to book. Deliver it as a PDF or link in the auto-DM. Use the Lead Magnet prompt in the Prompts tab." },
        { text: "Set up missed call text back", sub: "In the platform: any missed call → auto-SMS fires immediately: 'Hey, sorry we missed your call! How can we help?' This alone saves leads the client would have lost. Takes 5 minutes to set up, runs forever." },
        { text: "Set up Comment-to-DM automation (general engagement)", sub: "Separate from the keyword trigger — this fires on any comment. AI agent sends a warm DM, tags the contact in CRM, and creates a task if no reply in 24 hours." },
        { text: "Confirm the DM message is on-brand and points to the right next step", sub: "e.g. 'Hey [name], thanks for engaging! Here's [free resource / booking link / offer].' Customize per client." },
        { text: "Set a reminder for 2-week check-in call" },
      ]} />

      <Phase day="Ongoing" title="Monthly Retention Loop" items={[
        { text: "Mid-month check-in — how are posts performing? Any feedback?", sub: "A quick voice note or DM goes a long way. Clients who feel looked after refer people. Clients who feel forgotten cancel." },
        { text: "Pull end-of-month analytics report", sub: "Reach, engagement rate, follower growth, ad results (CTR, cost per result, ROAS)." },
        { text: "Send the report with a plain-English breakdown — not just numbers", sub: "Translate every metric into what it means for their business. See the 'How to Explain Your Report' card below." },
        { text: "Begin next month's content creation in the last week of the current month", sub: "Never let them see a gap. Always be 2 weeks ahead." },
        { text: "Invoice sent on the same day each month (set up recurring in platform)" },
        { text: "Quarterly review call — bigger picture strategy, upsell opportunities" },
        { text: "At 6 months: pitch the annual deal", sub: `Say: "Hey, you've hit your 6-month mark and you're seeing results — do you want to lock in the next year and save 10%? Same service, same team, just a better rate." This improves your cash flow and locks in retention at the same time.` },
        { text: "After 3–6 months: offer a software upgrade if they're not already on it", sub: "Show the results first (saved X hours, booked X jobs). Then: 'Do you want to continue with the full system for $[PRICE]/month?' — Never pitch the upgrade before they've felt the win." },
        { text: "Ask for a referral after every major win", sub: "Your goal is not just to keep clients — it's to turn each one into a source of new clients. Happy clients who feel the value will refer people without hesitation. Unhappy or ignored clients won't. Do good work and then ask." },
      ]} />

      {/* How to Explain Your Report Card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Monthly Reports — Prove the Value</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>How to Explain Your Report to a Client</h3>
        </div>
        <div className="px-6 py-5 space-y-5">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            Most clients don't know what "reach" or "engagement rate" means. If you just send them a dashboard screenshot, they feel nothing. Your job is to translate the numbers into business language — what the win is, why it matters, and what it means for them going forward.
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7, fontStyle: "italic" }}>
            A great report is what keeps clients long-term. It's also what makes them refer you. When someone sees their business growing on paper — in plain English — they want to share that feeling with other business owners they know.
          </p>

          <div className="space-y-3">
            <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Translate every number — here's how</p>
            {[
              {
                metric: "Reach — e.g. 14,200 people",
                explain: "What it is: how many unique people saw your content this month.",
                business: "What it means for them: '14,200 people in [CITY/NICHE] saw [BUSINESS NAME] this month. Before we started, that number was close to zero.'"
              },
              {
                metric: "Engagement Rate — e.g. 4.8%",
                explain: "What it is: the percentage of people who saw your post and did something (liked, commented, saved, shared).",
                business: "What it means for them: 'An engagement rate above 3% is strong. Yours is 4.8% — that means people aren't just seeing your content, they're reacting to it. That's trust being built.'"
              },
              {
                metric: "New Followers — e.g. +87",
                explain: "What it is: new people who chose to follow the account this month.",
                business: "What it means for them: '87 new people said 'I want to keep seeing this business.' Every one of them is a potential future customer or referral.'"
              },
              {
                metric: "Ad Results — e.g. 32 leads, $18 cost per lead",
                explain: "What it is: people who clicked your ad and took action (booked, filled a form, called).",
                business: "What it means for them: 'We brought in 32 new leads this month at $18 each. If even 10 of those become clients at $[THEIR AVG VALUE], that's $[AMOUNT] in potential new revenue from one month of ads.'"
              },
              {
                metric: "Top Post — e.g. carousel hit 4,200 views",
                explain: "What it is: your best performing piece of content this month.",
                business: "What it means for them: 'This post outperformed everything else. We know this type of content works best for your audience — so we'll lead with more like it next month.'"
              },
            ].map(({ metric, explain, business }) => (
              <div key={metric} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                <div className="px-4 py-3" style={{ background: "var(--ink)" }}>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.08em", color: "var(--gold)" }}>{metric}</p>
                </div>
                <div className="px-4 py-3 space-y-1.5" style={{ background: "rgba(200,168,100,0.04)" }}>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.55 }}>{explain}</p>
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.92rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.6 }}>{business}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
            <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>The 3-Part Report Formula</p>
            <div className="space-y-2">
              {[
                { n: "1", label: "The Win", text: "Start with something good. Always lead with a positive result — even if it was a small month. 'Here's what worked this month.'" },
                { n: "2", label: "What It Means", text: "Explain the numbers in plain English. No jargon. Connect it to their business — leads, bookings, visibility, revenue." },
                { n: "3", label: "What's Next", text: "Tell them what you'll do differently or double down on next month. This shows you're thinking ahead and paying attention." },
              ].map(({ n, label, text }) => (
                <div key={n} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(200,168,100,0.15)", border: "1px solid rgba(200,168,100,0.3)" }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.85rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>{label}</p>
                    <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.65)", lineHeight: 1.6 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.55 }}>Use the 'Monthly Report — Explain the Numbers' prompt in the Prompts tab to generate the full written report in minutes. Then add your own 1–2 sentences of context from what you saw that month.</p>
          </div>
        </div>
      </div>

      {/* Referral Goal Callout */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Bigger Goal</p>
        <p className="italic mb-3" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", color: "var(--cream)", lineHeight: 1.4 }}>
          Your goal is not just to keep clients. It's to turn every client into a referral source.
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.84rem", color: "rgba(250,243,234,0.6)", lineHeight: 1.7 }}>
          A client who sees results, feels looked after, and gets a clear report every month will naturally tell other business owners about you. You don't have to pitch them on referring — they'll do it on their own because you made them look good. Do the work well, send the report on time, and ask for a referral after every win. That's the whole system.
        </p>
      </div>

      {/* Customer Journey Map */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Reference — Customer Journey Map</p>
        <p className="italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)" }}>Every client's automation system should handle all three stages. Set this up during onboarding.</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Trigger", color: "var(--ink)", items: ["Form Fill", "Inbound Call", "Missed Call"] },
            { label: "What Happens Next", color: "var(--gold)", items: ["SMS", "Email", "AI Chatbot", "Booking Link"] },
            { label: "Where It Ends", color: "var(--rose)", items: ["Appointment Booked", "Google Review", "Paid Invoice"] },
          ].map(({ label, color, items }) => (
            <div key={label}>
              <p className="text-[9px] tracking-widest uppercase mb-2 font-semibold" style={{ fontFamily: FONT_LUXE, color }}>{label}</p>
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div key={item} className="px-2 py-1.5 rounded-lg text-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Monthly ────────────────────────────────────── */
function MonthlyTab() {
  return (
    <div className="space-y-6">
      <SectionHeader label="Monthly Rhythm" title="Your weekly schedule — every week." sub="This is how you run each week so you can serve multiple clients without burning out." />

      {[
        {
          day: "Monday",
          title: "Strategy & Planning Day",
          items: [
            { text: "Review all client analytics from prior week", sub: "~15–20 min total. Check reach, engagement, follower growth, ad performance. Flag anything that needs a change." },
            { text: "Check in on any running ads — adjust budgets or creative if needed", sub: "~10–15 min per client. If CTR is under 1% or cost per result is too high — pause the ad and swap creative before Friday." },
            { text: "Update content calendars for any clients needing next-week content", sub: "~20 min per client. Make sure no client has a gap in their schedule this week." },
            { text: "Reply to all client messages or questions", sub: "Do this first thing Monday. Never let a client message sit over a weekend without a reply on Monday morning." },
          ],
        },
        {
          day: "Tuesday–Wednesday",
          title: "Content Creation Days",
          items: [
            { text: "Batch write all captions for the week — use the prompts, don't write from scratch", sub: "~20–30 min per client. Write all captions in one sitting per client — never one at a time." },
            { text: "Design all graphics, edit photos, prep video content", sub: "~1–2 hrs per client depending on post volume. Use templates. Batch all clients back to back." },
            { text: "Create ad creatives if any campaigns are launching", sub: "~30–45 min per client. Build 2 versions minimum — one image, one video or carousel." },
            { text: "No client calls on these days — protect this time", sub: "Block Tuesday and Wednesday on your calendar. Creation time is your most valuable time. Guard it." },
          ],
        },
        {
          day: "Thursday",
          title: "Approval & Scheduling Day",
          items: [
            { text: "Send content to any clients awaiting approval", sub: "~10 min per client. Share via Google Drive folder or the platform's content approval feature." },
            { text: "Schedule all approved content through the platform", sub: "~15–20 min per client. Schedule the whole month at once if possible — not week by week." },
            { text: "Set up any new ad sets launching next week", sub: "~30 min per ad set. Double-check: budget, audience, creative, pixel event, campaign objective." },
            { text: "Pin the 3 best posts to the top of each client's profile", sub: "~10 min per client. Keep the 3 strongest pieces — AI videos or top-performing carousels — pinned at all times. Refresh monthly." },
            { text: "Boost the 3 pinned posts ($50–$100 each)", sub: "~10 min per client. Take posts already performing organically and put a small budget behind them. This turns organic reach into real leads." },
            { text: "Follow up with clients who haven't approved yet", sub: "~5 min per client. One polite message — 'Hey, content is ready for your review! Anything you'd like changed before I schedule it?'" },
          ],
        },
        {
          day: "Friday",
          title: "Admin, Outreach & Growth",
          items: [
            { text: "Send any monthly reports due this week", sub: "~30–45 min per report. Use the 'Monthly Report — Explain the Numbers' prompt to generate the written section. Add 1–2 personal lines about what you saw that month." },
            { text: "Do outreach — cold emails, DMs, or follow-ups to prospects", sub: "~1–2 hrs total. Aim for 10–15 new outreach messages + 5–10 follow-ups on existing leads." },
            { text: "Invoice any clients billed weekly or on the 1st", sub: "~5 min per client. Use recurring invoices in the platform — set these up once during onboarding." },
            { text: "Review your own business metrics — revenue, churn risk, pipeline", sub: "~20 min. How much MRR do you have? Any clients who seem quiet or disengaged? Any deals close to closing?" },
          ],
        },
      ].map((phase) => (
        <Phase key={phase.day} day={phase.day} title={phase.title} items={phase.items} />
      ))}

      <div className="rounded-2xl p-5 mb-2" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.25)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}><SvgIcon id="bar-chart" size={13} /> 2026 Content Insight</p>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)", fontStyle: "italic" }}>Carousels are getting more reach than Reels right now. Focus on carousels (3–7 slides) for education and social proof. Use Reels for reach and new followers. Both in the mix is ideal.</p>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.55)" }}>Carousel structure that works: Hook slide → Value or Education → Testimonial or proof → CTA slide. Use the Carousel prompt to build these in the platform's AI.</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Mandy's Rule</p>
        <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--cream)", lineHeight: 1.4 }}>
          "Never create content for one client at a time. Always batch by task — write all captions Monday, design all graphics Tuesday. It saves 40% of your time."
        </p>
      </div>
    </div>
  );
}

/* ─── Tab: Prompts ────────────────────────────────────── */
function PromptsTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const prompts = [
    {
      title: "AI Graphics — Single Posts (Platform Ask AI)",
      tag: "Platform AI",
      prompt: `Use this prompt inside our platform's Ask AI to create single-image social posts.

Type into Ask AI:

"Act as an elite social media marketer and create 12 Instagram graphics for [BUSINESS NAME]. Do some research to create compelling graphics that will capture attention and are trendy right now. Their website is [WEBSITE URL]. Focus on [1–2 content goals, e.g. lead generation + trust building].

Include a mix of:
- Service spotlight posts
- Free estimate or offer post
- Tip of the week
- Seasonal or timely content
- Customer testimonial graphic
- Behind-the-scenes or brand story

For each graphic, also provide:
- The caption (with hashtags)
- What content strategy goal it serves (lead gen / trust / education / social proof)"

---
💡 Tip: Start with 3–5 posts to review the style. If designs aren't right, respond with: "Act as an elite designer and enhance all the designs to feel more premium and on-brand."`,
    },
    {
      title: "AI Graphics — Carousel Posts (Platform Ask AI)",
      tag: "Platform AI",
      prompt: `Use this prompt inside our platform's Ask AI to create carousel posts.

Type into Ask AI:

"Create a [5 / 7]-slide carousel for [BUSINESS NAME] on the topic: [TOPIC].

Slide structure:
- Slide 1: Hook — grab attention immediately (before/after, bold statement, or curiosity gap)
- Slide 2: Core value or service overview
- Slide 3: Educational or shareable content (tips, reasons, how-to)
- Slide 4: Social proof — customer result or testimonial
- Slide 5: CTA — drive them to [book / DM / visit site / follow]

For each slide include:
- Visual direction (colours, layout style, image type)
- Headline text (under 10 words)
- Supporting copy (1–2 sentences)
- Caption for the full carousel post with hashtags"

---
💡 2026 tip: Carousels are outperforming Reels in engagement right now. Prioritize these for education and social proof content.`,
    },
    {
      title: "Auto-Schedule via Platform AI",
      tag: "Platform AI",
      prompt: `After creating graphics and captions in the platform's Ask AI, use this prompt to schedule everything automatically.

Once the content is approved, type into Ask AI:

"Schedule all of these posts. You choose the best dates and times based on current best practices for [PLATFORM — Instagram / Facebook / TikTok]. Space them out evenly across [X] weeks."

The AI will:
- Pull the graphics already created in the conversation
- Match each graphic with its caption and hashtags
- Select optimal posting times
- Push directly to the Social Planner — scheduled and ready

No downloading. No uploading. No switching tabs.

---
⚠️ Make sure the client's social accounts are connected in Social Planner → Settings before running this step.`,
    },
    {
      title: "Comment-to-DM Automation Setup",
      tag: "Platform AI",
      prompt: `Set up this workflow once per client inside our platform. It runs automatically from then on.

Workflow name: "Comment to DM — [CLIENT NAME]"

Step 1 — Trigger:
Instagram Comments (any published post by this account)

Step 2 — AI Agent Action:
- Response channel: Instagram DM
- Also reply in comments: Yes (short, warm reply — "Thanks! Check your DMs 👋")
- Tag the contact in the CRM
- Create a task if no reply within 24 hours

DM message template (customize per client):
"Hey [first name]! Thanks so much for engaging with our post 😊 We noticed you're interested in [topic/service] — we'd love to help. [Insert offer / free resource / booking link here]. Let us know if you have any questions!"

---
Why this works:
1. Fast replies signal Instagram's algorithm → more reach
2. Every comment becomes a DM conversation → more leads
3. The client doesn't lift a finger — it's all automated
4. You can pitch this as a standalone value-add in your service`,
    },
    {
      title: "Brand Voice Extraction",
      tag: "Onboarding",
      prompt: `You are a brand strategist. Based on the information below, create a brand voice guide for a client.

Client Info:
- Business name: [NAME]
- Industry: [INDUSTRY]
- Target audience: [WHO THEY SERVE — age, gender, lifestyle, problems they have]
- 3 brands they admire: [BRAND 1], [BRAND 2], [BRAND 3]
- Words they'd use to describe their brand: [ADJECTIVES]
- Words they never want associated with their brand: [ANTI-WORDS]

Create:
1. Brand Voice in 3 words
2. Brand Personality Description (3–4 sentences — how they speak, how they come across)
3. Do's and Don'ts (5 of each)
4. Sample sentence in their voice: "We help [audience] do [thing]."
5. Caption tone guide — formal, casual, playful, educational, or inspirational?`,
    },
    {
      title: "Monthly Content Calendar",
      tag: "Planning",
      prompt: `You are a social media strategist. Create a 30-day content calendar for the following client.

Client:
- Business: [NAME + WHAT THEY DO]
- Target audience: [WHO THEY SERVE]
- Content pillars: Education, Behind the Scenes, Social Proof, Promotion, Personality
- Posting schedule: [X] posts per week on [PLATFORMS]
- Current offer or promotion this month: [OFFER/PROMO]
- Brand voice: [PASTE THEIR VOICE GUIDE OR DESCRIBE IT]

For each post include:
1. Day + platform
2. Content pillar
3. Post concept (1 sentence)
4. Caption hook (first line only)
5. Recommended format: static image / carousel / Reel / Story

Prioritize variety — no two consecutive posts should be the same format or pillar.`,
    },
    {
      title: "Instagram Caption Writer",
      tag: "Captions",
      prompt: `Write 5 Instagram captions for [CLIENT NAME], a [BUSINESS TYPE] that serves [TARGET AUDIENCE].

Brand voice: [DESCRIBE — e.g., warm, direct, elevated but approachable]
This week's content pillar: [EDUCATION / PROMOTION / SOCIAL PROOF / BTS / PERSONALITY]
Topic or offer to highlight: [SPECIFIC TOPIC]

For each caption:
- Start with a scroll-stopping first line (the hook)
- 3–5 sentences of body copy
- A clear call to action (comment, DM, click link in bio, save this post)
- 5 relevant hashtags

Format: warm, conversational, no corporate-speak. Write as if the business owner is speaking directly to one person.`,
    },
    {
      title: "Reel Hook Generator",
      tag: "Video",
      prompt: `Generate 10 Reel opening hooks for [CLIENT NAME], a [BUSINESS TYPE].

Target audience: [WHO THEY SERVE]
Topic: [REEL TOPIC]
Goal: [Get saves / Drive DMs / Build trust / Promote offer]

Rules:
- Each hook must be under 8 words
- Should create curiosity, urgency, or immediate relatability
- Should work spoken aloud as the first line of a video
- No clickbait — must be something they can actually deliver on in the video

Format:
1. [Hook]
(Why it works: one sentence)`,
    },
    {
      title: "Facebook / Meta Ad Copy",
      tag: "Ads",
      prompt: `Write 3 versions of Facebook/Instagram ad copy for [CLIENT NAME].

Product/Service being advertised: [WHAT THEY'RE SELLING]
Target audience: [WHO SEES THIS AD — be specific]
Pain point the ad addresses: [THEIR PROBLEM]
Offer or hook: [WHAT MAKES THIS WORTH CLICKING]
Call to action: [LEARN MORE / SHOP NOW / BOOK NOW / DM US]
Budget/price point (if relevant): [PRICE OR DEAL]

For each version write:
- Primary Text (2–4 sentences, conversational)
- Headline (under 7 words, punchy)
- Description (1 sentence supporting the headline)

Version 1: Pain-aware (lead with the problem)
Version 2: Desire-based (lead with the transformation/result)
Version 3: Social proof angle (lead with a result or testimonial hook)`,
    },
    {
      title: "Email Newsletter",
      tag: "Email",
      prompt: `Write a marketing email for [CLIENT NAME] to send to their email list.

Topic / purpose: [WHAT THIS EMAIL IS ABOUT]
Offer included (if any): [OFFER + LINK]
Audience: [WHO IS ON THIS LIST]
Brand voice: [DESCRIBE]
Desired action: [WHAT YOU WANT THEM TO DO]

Email structure:
1. Subject line (write 3 options — one curiosity, one benefit, one direct)
2. Preview text (under 90 characters)
3. Opening (1–2 sentences — personal, warm, not salesy)
4. Body (3–4 short paragraphs — value first, offer second)
5. CTA button text
6. Sign-off (in brand voice)

Keep it under 250 words. Write like a human, not a marketing department.`,
    },
    {
      title: "Story Content Script",
      tag: "Stories",
      prompt: `Create a 5-slide Instagram Story sequence for [CLIENT NAME].

Goal of this story: [EDUCATE / PROMOTE / BUILD TRUST / DRIVE DMs]
Topic: [SPECIFIC TOPIC OR OFFER]
Brand voice: [DESCRIBE]

For each slide:
- Slide number
- Main text (under 15 words — Stories are read fast)
- Visual direction (colour, image type, background — keep it simple)
- Any interactive element: poll / question box / swipe up / link sticker

End with a clear CTA slide. Make it feel like a conversation, not an ad.`,
    },
    {
      title: "Hashtag Strategy",
      tag: "Strategy",
      prompt: `Create a hashtag strategy for [CLIENT NAME], a [BUSINESS TYPE] based in [LOCATION IF LOCAL].

Target audience: [DESCRIBE]
Niche: [THEIR INDUSTRY / NICHE]
Platforms: Instagram / TikTok (specify)

Generate:
- 5 broad hashtags (1M+ posts) — for reach
- 10 mid-size hashtags (100K–1M posts) — for discovery
- 10 niche hashtags (under 100K posts) — for targeted reach
- 5 community hashtags — groups or movements their audience follows
- 3 branded hashtag suggestions they can own

Also recommend: how many hashtags to use per post and whether to put them in caption or first comment.`,
    },
    {
      title: "AI Lead Magnet Creator",
      tag: "Platform AI",
      prompt: `Use this prompt inside the platform's AI Studio to create a branded lead magnet for a client in one shot.

Type into AI Studio:

"Create a lead magnet for [BUSINESS NAME], a [BUSINESS TYPE] serving [TARGET AUDIENCE].

The lead magnet is called: [TITLE — e.g. 'The Summer Glow Guide' / '5 Things to Ask Before Booking a Cleaner' / 'Local Restaurant's Free Date Night Menu']

Include:
1. Cover page — [BUSINESS NAME] logo/branding, lead magnet title, tagline
2. Introduction — 2–3 sentences on why this guide matters to the reader
3. [3–5 tip sections or checklist items relevant to the business]
4. Each section: title + 2–3 sentences of value
5. Final page — CTA to book, call, or visit: [BOOKING LINK / PHONE / WEBSITE]

Brand colours: [HEX CODES]
Tone: [WARM / PROFESSIONAL / FUN — match brand voice]"

---
How it gets delivered:
→ When someone comments the keyword on the carousel post (e.g. "GLOW")
→ The keyword automation triggers
→ AI agent DMs them the lead magnet link automatically
→ No human involvement required`,
    },
    {
      title: "Keyword CTA — Carousel Last Slide",
      tag: "Platform AI",
      prompt: `Use this to write the CTA that goes on the last slide of a keyword-trigger carousel.

Business: [CLIENT NAME]
Offer / lead magnet: [WHAT THEY'RE GETTING — e.g. "free skincare guide," "free estimate," "discount code"]
Keyword: [WHAT THEY SHOULD COMMENT — keep it short, relevant, and memorable: GLOW / QUOTE / MENU / BOOK]

Write 3 options for the last slide text:

Option 1: Direct ask
"Comment [KEYWORD] and we'll send you [OFFER] right to your DMs 👇"

Option 2: Value-first
"Want [BENEFIT]? Drop [KEYWORD] in the comments — we'll send you [OFFER] instantly."

Option 3: Curiosity
"There's a free [OFFER] waiting for you. Just comment [KEYWORD] below 👇"

---
Platform setup reminder:
After posting, go to the platform → Workflows → Create trigger:
Trigger: Instagram comment contains "[KEYWORD]"
Action: AI Agent sends DM with lead magnet link + starts conversation
Tag contact in CRM → create follow-up task`,
    },
    {
      title: "SEO Blog Post Writer",
      tag: "Blogging",
      prompt: `Write a detailed SEO blog post for The Dollhouse Brand Studio targeting the following keyword.

Target keyword: [KEYWORD — e.g. "social media marketing for med spas"]
Target audience: [WHO THIS POST IS FOR — e.g. med spa owners]
Goal: Drive inbound leads from business owners searching this topic

Blog post structure:
1. Title (include the exact keyword, under 65 characters)
2. Meta description (under 155 characters — include keyword, compelling hook)
3. Introduction (2–3 paragraphs — open with a pain point or question, introduce The Dollhouse Brand Studio as the solution, state what the post will cover)
4. 5–7 H2 sections covering: common problems, what good social media looks like for this niche, content ideas, how to measure results, what to look for in an agency
5. Conclusion with CTA (invite them to book a discovery call or visit shopdollhouse.co)

Then I will:
- Add real client examples and results
- Add our own images and screenshots
- Publish to the blog and repurpose as a LinkedIn article

Write in a confident, helpful, expert tone. Not salesy. Genuinely useful first.`,
    },
    {
      title: "Post-Call Proposal, Contract & Invoice — Send Today",
      tag: "Sales",
      prompt: `Use this right after a discovery call. Fill in your notes from the call and paste into ChatGPT to generate a complete, personalised proposal in minutes. Then send it with the contract and invoice — all in one email.

Paste into ChatGPT:

"Write a short, personalised social media proposal for [BUSINESS NAME] from The Dollhouse Brand Studio.

Here are my notes from the discovery call today:
- Business type: [TYPE]
- Their biggest pain point (in their own words): [WHAT THEY SAID]
- What they want most: [THEIR GOAL]
- Platforms they're on: [PLATFORMS]
- Package I recommended: [Starter / Growth / Elite]
- Did I offer the 14-day free trial? [YES / NO]
- Monthly fee: $[AMOUNT] + $500 one-time setup
- Anything specific I promised to address: [NOTES]

Write a proposal with these 5 sections only — keep it under 400 words total:
1. A personalised opening (reference something specific from our call — make them feel heard)
2. The Problem (restate their pain point in their own words — show you listened)
3. Our Solution (describe what we'll do for THEIR business specifically — not generic)
4. What's Included (clean bullet list for the package they chose)
5. Next Steps (Step 1: sign the agreement / Step 2: pay the setup invoice / Step 3: kickoff call within 48 hours)

Tone: warm, confident, specific. Not salesy. Not template-y. Reads like it was written just for them.

After the proposal, also write:
- A short 3-line email subject + body to send the proposal (friendly, excited, not pushy)
- One reminder follow-up message to send 48 hours later if no reply"

---
After ChatGPT gives you the proposal:
1. Copy it into your proposal template (Canva, Google Docs, or PDF)
2. Attach the service agreement (use the contract template in the Contracts prompt)
3. Send the invoice for $500 (setup fee only if they're doing the free trial) or the full setup + first month
4. Send everything in one email — not three separate ones`,
    },
    {
      title: "Pitch Deck Builder",
      tag: "Sales",
      prompt: `Build a 7-slide sales pitch deck for The Dollhouse Brand Studio for a specific prospect.

Prospect info:
- Business name: [BUSINESS NAME]
- Niche: [NICHE]
- City: [CITY]
- Pain points they mentioned on the call: [THEIR EXACT WORDS / PROBLEMS]
- Package they're interested in: [LOW / MID / HIGH TIER — or describe package]
- Monthly price: $[AMOUNT]
- Any setup fee: $[AMOUNT or "none"]

Build 7 slides:

Slide 1 — Introduction
Who we are: The Dollhouse Brand Studio. What we do: done-for-you social media, ads, and automation for [NICHE] businesses. Why we do it: [MANDY'S SHORT WHY — e.g. "We believe every small business deserves to look and run like a big one."]

Slide 2 — Their Problem
Restate [BUSINESS NAME]'s pain points in their own words. Make them feel understood, not sold to.

Slide 3 — Our Solution
Software + service working together. Platform handles the automations, CRM, and scheduling. We handle the content, ads, and strategy. They handle their business.

Slide 4 — Proof
[INSERT CASE STUDY OR TESTIMONIAL] — if no case study yet, use: "We set up a system like this for a [SIMILAR NICHE] business and they [RESULT] in [TIMEFRAME]."

Slide 5 — Their Package
Exactly what's included, listed clearly. Also list 1–2 things NOT included so there are no surprises.

Slide 6 — Investment
Monthly: $[AMOUNT]. Setup (one-time): $[AMOUNT or "none"]. Payment terms: [MONTHLY / UPFRONT / etc.]

Slide 7 — Next Steps
Step 1: Sign the agreement
Step 2: Complete onboarding form (sent same day)
Step 3: Kickoff call within 48 hours — your system goes live

---
Format this as presentation slide content. Keep each slide to 50 words or less. No filler — every word earns its place.`,
    },
    {
      title: "GEO Brand Audit Prompt",
      tag: "GEO",
      prompt: `Run a GEO (Generative Engine Optimization) audit for The Dollhouse Brand Studio.

Our niche: Done-for-you social media marketing for small businesses
Location: [CITY / REGION]
Website: shopdollhouse.co

Check and score us on the following (rate each 1–5, 5 = strong):

1. Brand name consistency — does "The Dollhouse Brand Studio" appear the same way across website, Google Business Profile, Instagram, Facebook, and directories?
2. Niche clarity — is it immediately clear from our online presence exactly who we serve and what we do?
3. Case studies and proof — do we have publicly visible results with specific numbers (follower growth, leads, engagement)?
4. Third-party mentions — are we being mentioned, linked to, or cited by other websites?
5. Review count and quality — how many Google reviews do we have, and do they include specific service details?
6. Content consistency — are we posting regularly across Instagram, Facebook, LinkedIn?
7. AI search visibility — if someone asks ChatGPT or Gemini "best social media agency for [niche]," would we appear?

For each category:
- Current score (1–5)
- What's missing or weak
- Specific action to fix it this month`,
    },
    {
      title: "Monthly Analytics Report Summary",
      tag: "Reporting",
      prompt: `Write a monthly social media report summary to send to a client.

Client: [NAME]
Month: [MONTH]
Platforms: [PLATFORMS]

Data to include (fill in actual numbers):
- Total reach: [X]
- Impressions: [X]
- Engagement rate: [X%]
- New followers: [+X]
- Top performing post: [DESCRIPTION + why it worked]
- Ad results (if applicable): spend $[X], reach [X], clicks [X], cost per result $[X]

Write:
1. Opening sentence (positive, confident — lead with a win)
2. Highlights (3 bullet points — the best results)
3. What we learned this month (1–2 sentences on what content worked best)
4. Focus for next month (2–3 sentences on strategy shift or continuation)
5. Closing (warm, professional)

Tone: confident advisor, not defensive. Never apologize for numbers — contextualise them.`,
    },
    {
      title: "Monthly Report — Explain the Numbers in Plain English",
      tag: "Reporting",
      prompt: `Use this prompt to turn raw analytics data into a clear, plain-English report that a client actually understands. Most clients don't know what 'reach' or 'engagement rate' means. Your job is to translate every number into what it means for their business.

Paste into ChatGPT:

"You are writing a monthly social media report for [CLIENT NAME], owner of [BUSINESS NAME], a [BUSINESS TYPE] in [CITY].

Here are the stats for [MONTH]:
- Reach: [X]
- Impressions: [X]
- Engagement rate: [X%]
- New followers: [+X]
- Top post: [DESCRIBE — what it was, what format, how it performed]
- Ad results (if applicable): spent $[X], generated [X] leads/clicks at $[X] each
- Compared to last month: [better / worse / about the same — note any key changes]

Write a short, easy-to-read report using this structure:

🏆 THE WIN — Start with the best result of the month. Lead with something positive. One sentence.

📊 WHAT THE NUMBERS MEAN — Explain each key metric in plain language:
- Reach [X]: What this number means. What changed vs. last month. What it means for their business in simple terms.
- Engagement rate [X%]: Whether this is strong or average. What it tells us about how people are responding to the content.
- New followers [+X]: What this means. Are these potential customers? Local people? Why it matters.
- Ads (if applicable): How many leads came in, what each cost, and what that's worth to the business.

💡 WHAT WORKED — 2–3 sentences on which type of content performed best and why.

📅 WHAT'S NEXT — What we'll do differently or double down on next month. Show them you're thinking ahead.

Tone: friendly and confident. Write like you're explaining this to a smart person who isn't a marketer. No jargon. No disclaimers. No apologising for numbers — put them in context instead.

End with one sentence that reminds them why showing up consistently online matters for their business."`,
    },
    {
      title: "Lead Gen Research — Find Prospects by Niche + City",
      tag: "Lead Gen",
      prompt: `Act as a B2B Lead Generation Specialist and Market Researcher.

I need to identify 25 small [NICHE — e.g. dental practices / med spas / personal injury law firms / restaurants] in [CITY] who are currently running Google Ads.

Task:
Use Google Search and the Google Ads Transparency Center to confirm which businesses in this area and niche are active advertisers.

For each of the 25 businesses, provide the following in a clean markdown table:
- Practice/Business Name
- Website URL
- Phone Number (publicly listed)
- Email Address (search for 'contact@', 'info@', or listed owner emails — check the Contact and About Us pages if not on homepage)
- Ad Evidence (briefly note if you saw their ad on Search, Maps, or the Ads Transparency Center)

Constraints:
- Only include small to medium-sized independently owned businesses
- Avoid national chains or franchises (e.g. Aspen Dental, Heartland, corporate gyms, etc.)
- All 25 must be unique leads
- Only include verified information — no guesses

---
Swap [NICHE] and [CITY] for each outreach campaign.
These become your cold outreach list.`,
    },
    {
      title: "Lead Gen → CRM Pipeline Setup",
      tag: "Lead Gen",
      prompt: `Act as a B2B Lead Generation Specialist and Market Researcher.

Step 1 — Research:
Identify 25 small [NICHE] businesses in [CITY] who are currently running Google Ads.

Use Google Search and the Google Ads Transparency Center to confirm active advertisers. For each business provide:
- Business Name
- Website URL
- Phone Number
- Email Address
- Ad Evidence (where you saw their ad)

Only include small/independent businesses. Avoid national chains. All 25 must be unique.

Step 2 — CRM Setup:
Once the list is complete:
1. Create a new contact in the CRM for each business using the name, email, phone, and website found above
2. Create a new pipeline called "[NICHE] Cold Outreach — [CITY] [MONTH/YEAR]"
3. Add all 25 contacts to the first stage of the pipeline: "New Lead"
4. Tag each contact with: [NICHE], [CITY], Cold Outreach, Google Ads Advertiser

---
This gives you a ready-to-work pipeline from a single prompt.`,
    },
    {
      title: "Custom Outreach Message Generator",
      tag: "Outreach",
      prompt: `Use this to write a personalised first-touch outreach message for any prospect. Paste into ChatGPT with the details filled in — it will write a custom message that sounds real, not like a template.

Paste into ChatGPT:

"Write a short, personalised first outreach message from Mandy Fortune at The Dollhouse Brand Studio to a business owner.

Here are the details:
- Business name: [NAME]
- Owner's name (if known): [NAME]
- Industry / niche: [NICHE]
- City: [CITY]
- What I noticed about their current social media: [OBSERVATION — e.g., 'they're posting inconsistently and have no engagement' / 'their photos are great but they have no captions' / 'they're running Google Ads but have no Instagram presence']
- What I want to lead with: [AI Clone Pitch / Compliment + question / Free Trial offer / General intro]
- Channel: [DM / Email]

Rules for the message:
- Under 80 words for DM, under 150 words for email
- Sounds like a real person sent it — not a template
- One specific observation about their business (use what I noted above)
- Ends with ONE soft question — not a pitch, just a question
- Warm and confident tone — professional flirting, not sales pressure
- Do NOT mention price
- Do NOT use bullet points in DM version

Write 2 versions: one slightly more casual, one slightly more professional. I'll choose which fits better."`,
    },
    {
      title: "LinkedIn Post Writer",
      tag: "LinkedIn",
      prompt: `Use this to write a LinkedIn post for any client or for The Dollhouse Brand Studio's own brand content. LinkedIn rewards longer, story-based posts with strong personal opinions. Keep the hook strong and the format scannable.

Paste into ChatGPT:

"Write a LinkedIn post for [BUSINESS NAME / THE DOLLHOUSE BRAND STUDIO].

About the author: [WHO IS THIS — e.g., 'Mandy Fortune, founder of a social media studio for small businesses' / 'Dr. [NAME], owner of a dental practice in [CITY]']
Post topic: [WHAT THIS POST IS ABOUT]
Goal: [grow followers / get DMs / build authority / drive leads / share a lesson]
Tone: [professional but human / bold and opinionated / educational / story-based]
Length: [Short — under 150 words / Medium — 200–300 words / Long — 400+ words]

Write the post using this LinkedIn structure:

LINE 1 (the hook — shows before 'see more'):
This line must be a scroll-stopper. Bold, opinionated, or curious. Make someone stop scrolling. Under 15 words.

BODY (3–5 short paragraphs):
Short paragraphs — 1–3 lines each. Plenty of white space. Each paragraph is one idea. Use a real story, a specific result, or a strong point of view. No fluff. No corporate-speak. Reads like a smart human being, not a press release.

CLOSE + CTA:
A memorable last line followed by a simple call to action — 'Follow for more' / 'What do you think?' / 'DM me [WORD]' / 'Comment below'

HASHTAGS:
5 hashtags at the very end — 2 broad (1M+ posts), 3 niche (under 200K)

Also write an alternate hook line so I can A/B test two versions."`,
    },
    {
      title: "AI Video — Multi-Scene Script (Talking Head + Action)",
      tag: "AI Video",
      prompt: `Use this structure to write AI video prompts for tools like Kling, Pika, Veo, or Runway.
Upload a clear headshot or photo of the business owner as your reference image.

---

Scene 1 — [LOCATION: office / storefront / clinic / outdoor]
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. Show [CLIENT DESCRIPTION — e.g. "a sharp personal injury attorney in a navy suit"] standing in [SETTING DESCRIPTION]. Medium shot. Looks directly into camera and speaks with calm confidence. Natural hand gestures, realistic facial movement, clean professional lighting, believable lip sync.
Dialogue: "[OPENING LINE — hook, question, or bold statement]"

Scene 2 — Action Sequence
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. [SETTING]. Show a fast multi-shot sequence:
1. [ACTION SHOT 1 — e.g. client next to a damaged car]
2. [ACTION SHOT 2 — close-up of relevant object]
3. [ACTION SHOT 3 — wide establishing shot]
Smooth camera motion, realistic action, documentary feel.
Dialogue: "[EDUCATIONAL TIP OR KEY POINT]"

Scene 3 — [SETTING]
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. [DESCRIBE SCENE]. Natural body movement, serious but helpful tone, realistic facial sync, clean cinematic motion.
Dialogue: "[WARNING, PROOF POINT, OR NEXT STEP]"

Scene 4 — Close / CTA
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. Back in [ORIGINAL SETTING]. Medium close-up. Client looks directly into camera with a warm, authoritative expression. Subtle hand gesture, professional lighting.
Dialogue: "[CTA — book, follow, call, DM]"

---
Tips:
• Keep each scene's dialogue under 15 seconds — AI video stays sharp at short clips
• Stitch scenes together in CapCut or your editing tool
• Add captions — 85% of social video is watched on mute`,
    },
    {
      title: "AI Video — Single Prompt (Quick Version)",
      tag: "AI Video",
      prompt: `Use this single prompt for a fast one-shot AI video. Best for simple talking head clips.

Paste into your AI video tool with the client's reference photo uploaded.

---

"[CLIENT DESCRIPTION — e.g. 'A sharp personal injury attorney in a navy suit and tie'] standing in [SETTING — e.g. 'a modern law office with bookshelves and framed diplomas behind them']. They look into camera and speak clearly. Show action shots of them [RELEVANT SCENE — e.g. 'on scene at a car accident, photographing damage'].

Dialogue (must match timing, approx [X] seconds):
'[FULL SCRIPT HERE — write in their voice, short and punchy]'

Ensure the audio matches what is being shown. Vertical cinematic realism. Smooth, realistic facial sync. Professional lighting."

---
Example script structure for a [BUSINESS TYPE]:
• Hook (2–3 sec): "If you [SITUATION], here's the first thing you do:"
• Tips (5–8 sec): 2–3 fast action items
• Warning (2 sec): "Whatever you do, don't [COMMON MISTAKE]"
• Close (2 sec): Warm, memorable line or CTA`,
    },
    {
      title: "Carousel — Agency / Results Focused",
      tag: "Platform AI",
      prompt: `Create a stunning Instagram carousel post (1080×1080, 7 slides).

Topic: [YOUR RESULT OR OFFER — e.g. "How to Grow Your Business on Social Media in 2026"]

Slide structure:
- Slide 1 (Hook): "[BOLD RESULT OR CLAIM — e.g. 'Our clients see real leads in 30 days — here's the system we use']"
- Slide 2: Why [TOPIC] is the biggest opportunity right now
- Slide 3: Step 1 — [KEY STRATEGY OR INSIGHT]
- Slide 4: Step 2 — [TOOLS OR PROCESS]
- Slide 5: Step 3 — How to get your first result / first client
- Slide 6: The system — how it all connects (automation + content + ads)
- Slide 7 (CTA): "Follow for more" + "[YOUR OFFER — free quiz / free call / DM us]"

Design direction:
- Dark premium background (deep navy, black, or charcoal)
- Bold typography, gold or rose accent colours — match The Dollhouse brand
- Clean minimal layouts — one big idea per slide
- Branded: include The Dollhouse Brand Studio logo on slide 1 and 7

Make it look professional, eye-catching, and ready to post.

---
Swap in your actual results once you have them. Specific numbers always outperform vague claims.`,
    },

    // ─── Content Sizes ───────────────────────────────────
    {
      title: "Size Cheat Sheet — All Platforms Quick Reference",
      tag: "Sizes",
      prompt: `Use this as your go-to reference before creating any content. Always build at these sizes so nothing gets cropped or distorted when posted.

═══════════════════════════════════
INSTAGRAM
═══════════════════════════════════
Static Post (Square)       1080 × 1080 px  (1:1)
Static Post (Portrait)     1080 × 1350 px  (4:5) ← best for feed reach
Static Post (Landscape)    1080 × 566 px   (1.91:1)
Reel / Video               1080 × 1920 px  (9:16 vertical)
Carousel Slides            1080 × 1080 px  (square) or 1080 × 1350 px (portrait)
Story                      1080 × 1920 px  (9:16 vertical)
Profile Photo              320 × 320 px    (displays at 110px)

═══════════════════════════════════
FACEBOOK
═══════════════════════════════════
Feed Post (Square)         1080 × 1080 px
Feed Post (Landscape)      1200 × 630 px
Reel / Video               1080 × 1920 px  (9:16 vertical)
Story                      1080 × 1920 px  (9:16 vertical)
Cover Photo                820 × 312 px
Profile Photo              170 × 170 px

═══════════════════════════════════
TIKTOK
═══════════════════════════════════
Video                      1080 × 1920 px  (9:16 vertical)
Photo Carousel             1080 × 1920 px  per slide (or 1080 × 1080 square)
Profile Photo              200 × 200 px

═══════════════════════════════════
GOOGLE BUSINESS PROFILE
═══════════════════════════════════
Post Photo                 1200 × 900 px   (4:3 landscape) ← recommended
Logo                       250 × 250 px
Cover Photo                1080 × 608 px
Product Photo              1200 × 900 px

═══════════════════════════════════
LINKEDIN
═══════════════════════════════════
Feed Post (Landscape)      1200 × 627 px
Feed Post (Square)         1200 × 1200 px
Document / Carousel        1080 × 1080 px  per slide
Video                      1080 × 1920 px  (vertical) or 1920 × 1080 (horizontal)
Profile Photo              400 × 400 px
Banner                     1584 × 396 px

═══════════════════════════════════
DESIGN TIPS
═══════════════════════════════════
• Safe zone: keep text and logos 150px from all edges on Stories/Reels
• Portrait (4:5) takes up more feed space than square — use it for static posts
• Export all graphics at 72 DPI, sRGB colour, JPG or PNG
• Keep file sizes under 8MB for fast loading`,
    },
    {
      title: "Instagram Static Post — Design Brief Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to brief an AI image tool, designer, or Canva to create a static Instagram post for a client.

Canvas: 1080 × 1350 px (portrait, 4:5) — this size gets the most feed real estate.
If square is needed: 1080 × 1080 px.
Export: PNG or JPG, max 8MB, sRGB.

---

Paste this into ChatGPT or your AI tool:

"Create a detailed design brief for a static Instagram post for [BUSINESS NAME].

Business type: [e.g., med spa / restaurant / real estate agent]
Post goal: [e.g., promote a service / share a tip / announce a sale / build trust]
Canvas size: 1080 × 1350 px

Include:
- Headline text (under 6 words, big and bold)
- Subheadline or supporting copy (1–2 lines)
- Call to action text (e.g., 'Book Now' / 'Link in Bio' / 'DM us')
- Colour palette direction (pull from their brand colours if known: [BRAND COLOURS])
- Image or background direction (photo, gradient, solid colour, texture)
- Font style direction (bold/modern, script/elegant, clean/minimal)
- Mood/vibe: [e.g., luxury, approachable, clinical, warm, bold]

Give me the layout as: what's at the top, middle, and bottom of the graphic."

---
Once you have the brief — build it in Canva, Adobe Express, or your design tool at the correct canvas size above.`,
    },
    {
      title: "Instagram Reel — Script & Spec Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a full Reel script with the correct video specs for Instagram.

Video Specs:
Canvas: 1080 × 1920 px (9:16 vertical — full screen)
Length: 15–60 seconds ideal (up to 90 sec allowed)
Safe zone for text/graphics: keep all elements 250px from top and bottom edges (UI overlays)
Captions: Always add — 85% of Reels are watched on mute
Export: MP4, H.264, max 4GB

---

Paste this into ChatGPT:

"Write a complete Instagram Reel script for [BUSINESS NAME].

Business type: [e.g., chiropractor / clothing boutique / personal trainer]
Reel goal: [e.g., get viewers to book / educate about a service / show a transformation / drive DMs]
Target length: [15 / 30 / 45 / 60] seconds
Tone: [e.g., fun and energetic / calm and professional / bold and direct]
Hook style: [e.g., question / bold statement / surprising fact / 'Did you know...']

Write it in this format:
- 0:00–0:03 HOOK — [what to say or show to stop the scroll]
- 0:03–0:10 SETUP — [the problem or context]
- 0:10–0:35 VALUE — [tips, transformation, story, or proof]
- 0:35–0:45 CTA — [exactly what to say at the end: DM us / book / follow / comment]

Also include:
- 3 on-screen text overlay suggestions (what to put on the screen at key moments)
- 2 trending audio vibes that would fit this Reel (describe the type, not a specific song)
- Caption for the post (under 150 characters + 5 hashtags)"`,
    },
    {
      title: "Instagram Carousel — 5 Slides (Client Content)",
      tag: "Sizes",
      prompt: `Use this prompt to generate a complete 5-slide carousel for any client. Max 5 slides — clean, scannable, and converts.

Canvas: 1080 × 1080 px (square) or 1080 × 1350 px (portrait)
Each slide is its own graphic — same size for all slides
File: PNG or JPG per slide, export in order (Slide 1, 2, 3, 4, 5)
Max slides: 5 — keep it tight. People swipe less as carousels get longer.

---

Paste this into ChatGPT:

"Create a complete 5-slide Instagram carousel for [BUSINESS NAME].

Business type: [e.g., salon / law firm / fitness coach]
Carousel topic: [e.g., '5 signs you need [SERVICE]' / '3 things to know before [PURCHASE]' / 'Why [BUSINESS NAME] is different']
Canvas size per slide: 1080 × 1080 px
Brand colours: [LIST COLOURS or 'use professional defaults']
Tone: [e.g., educational / motivational / luxury / friendly]

For each of the 5 slides, give me:
• Slide number and type (Hook / Content / Content / Proof / CTA)
• Headline text (under 7 words — big, bold)
• Body copy (1–3 short lines max per slide)
• Visual direction (what image, icon, or background works on this slide)
• Design note (what makes this slide stand out visually)

Slide structure:
- Slide 1 (Hook): Bold claim, question, or result that makes them swipe
- Slide 2: First point / tip / reason
- Slide 3: Second point / tip / reason
- Slide 4: Third point — OR a testimonial / proof / stat
- Slide 5 (CTA): Direct ask — 'Book now' / 'DM us [WORD]' / 'Follow for more'

End with: suggested caption for the post (under 200 characters + 5–8 hashtags)"`,
    },
    {
      title: "Facebook Feed Post — Design Brief Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a Facebook static post brief for any client.

Canvas:
- Square: 1080 × 1080 px (shows well on both desktop and mobile)
- Landscape: 1200 × 630 px (better for link previews and boosted posts)
- Portrait: 1080 × 1350 px (4:5 — max height Facebook allows in feed)

Recommended: 1080 × 1080 px square for most posts.
Export: JPG or PNG, under 8MB, sRGB.

---

Paste this into ChatGPT:

"Create a Facebook static post design brief for [BUSINESS NAME].

Business type: [TYPE]
Post goal: [promote a service / share a testimonial / announce an offer / holiday post]
Canvas: 1080 × 1080 px

Include:
- Primary headline (6 words or fewer, large and bold)
- Supporting copy (2–3 short lines)
- CTA text (e.g., 'Call Now' / 'Get a Free Quote' / 'Book Online')
- Phone number or website to include: [PHONE / URL]
- Visual direction: [photo of the business, before/after, product shot, or text-only]
- Colour palette: [BRAND COLOURS or describe the vibe]
- Mood: [e.g., trustworthy and local / bold and promotional / clean and modern]

Also write the Facebook caption for this post:
- 2–4 sentences max
- Include a CTA at the end
- Add 3–5 relevant hashtags"`,
    },
    {
      title: "TikTok Video — Script & Spec Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a TikTok-specific video script with correct specs.

Video Specs:
Canvas: 1080 × 1920 px (9:16 vertical — ALWAYS vertical for TikTok)
Length: 7–60 seconds for most reach; 3–5 min for educational content
Safe zone: keep text 150px from all 4 edges (TikTok overlays UI on top and bottom)
Captions: essential — add them in CapCut or TikTok's auto-caption tool
Export: MP4, H.264, max 287.6MB

---

Paste this into ChatGPT:

"Write a TikTok script for [BUSINESS NAME] designed to get views and followers.

Business type: [TYPE — e.g., nail tech / HVAC company / life coach]
Goal: [get bookings / go viral / educate / show a before/after / trend participation]
Length: [15 / 30 / 60] seconds
Tone: [real and relatable / professional but approachable / fun and trendy]

TikTok script format:
- 0:00–0:03: HOOK — [the first words. Must be a scroll-stopper. Often a question or bold statement]
- 0:03–0:08: PROMISE — [what they'll learn or see if they keep watching]
- 0:08–0:45: CONTENT — [the actual value, story, or transformation]
- 0:45–0:60: CTA — [follow us / comment / book / DM the word [WORD]]

Also include:
- 2 on-screen text overlays (what words appear on screen at key moments)
- Audio direction (describe the vibe: hype beat, calm background music, trending sound style)
- Caption for TikTok (1–2 punchy lines + 5 hashtags mixing popular and niche)
- Thumbnail text (the 3–5 words shown before they play the video)"`,
    },
    {
      title: "TikTok Carousel / Photo Slideshow — 5 Slides",
      tag: "Sizes",
      prompt: `Use this prompt to generate a TikTok photo carousel (slideshow post). TikTok photo carousels are getting massive organic reach right now.

Canvas: 1080 × 1920 px per slide (9:16 vertical) — TikTok shows them full-screen
OR: 1080 × 1080 px square (also works, shows with black bars)
Max slides: Up to 35 — but 3–7 slides performs best for engagement
File: JPG or PNG per slide

---

Paste this into ChatGPT:

"Create a 5-slide TikTok photo carousel for [BUSINESS NAME].

Business type: [TYPE]
Topic: [e.g., '5 things your [SERVICE PROVIDER] isn't telling you' / '[NUMBER] mistakes to avoid' / 'how we do [PROCESS] step by step']
Canvas: 1080 × 1920 px per slide
Tone: [educational / motivational / behind-the-scenes / trendy list format]

For each of the 5 slides:
• Slide number + type
• Big bold text overlay (under 8 words — this is the main message on screen)
• Brief visual direction (what photo or background works here)

Slide structure:
- Slide 1 (Hook): Bold statement or question — makes them tap to swipe
- Slides 2–4: The content, tips, facts, or steps
- Slide 5 (CTA): 'Follow for more' or 'Comment [WORD] for [OFFER]'

Also write:
- The TikTok caption (1–2 lines + 5 hashtags)
- On-screen text style direction (e.g., big white bold on dark, split layout, minimal)"`,
    },
    {
      title: "Google Business Post — Design & Copy Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a Google Business Profile post for any client. These posts show up in Google Maps and Google Search — very high visibility for local businesses.

Image Specs:
Recommended: 1200 × 900 px (4:3 landscape) — shows best in the GMB interface
Minimum: 400 × 300 px
Max file size: 10MB
Format: JPG or PNG
Post character limit: 1,500 characters (but 150–300 is the sweet spot — most people don't read long GMB posts)

Post types available in Google Business:
• What's New — general update or offer
• Event — for classes, sales, pop-ups (requires start/end date)
• Offer — for promotions with a redemption code or link
• Product — for specific service or product highlights

---

Paste this into ChatGPT:

"Write a Google Business Profile post for [BUSINESS NAME].

Business type: [TYPE — e.g., plumber / dentist / bakery]
Post type: [What's New / Offer / Event / Product]
Goal: [get more calls / promote a service / share a seasonal offer / get more reviews]
Image size for this post: 1200 × 900 px

Write:
1. The post copy (150–300 characters — short, local, conversational. Include the city/neighborhood name.)
2. A call to action suggestion (Book / Call / Learn More / Get Offer)
3. Brief image direction: what photo would work best for this post (interior shot, product, team, before/after, etc.)
4. 3 keywords to naturally include in the post for local SEO

Also suggest: best day/time to post this for a [TYPE] business."`,
    },

    // ─── Platform Automations ────────────────────────────
    {
      title: "Missed Call Text-Back — Automation Setup",
      tag: "Automations",
      prompt: `This is the #1 automation to build for every single client. Set it up during onboarding — every client gets this regardless of package.

WHAT IT DOES:
When a customer calls [CLIENT BUSINESS] and no one answers, the system automatically sends them a text within 60 seconds — so you never lose a lead to a missed call.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Call Status = Missed / No Answer"
Action 1: Wait — 1 minute
Action 2: Send SMS from [CLIENT PHONE NUMBER]
Action 3 (optional): Add tag "Missed Call — Needs Follow-Up" to contact
Action 4 (optional): Add to pipeline stage "New Lead"

---

Paste this into ChatGPT to write the SMS message for your client:

"Write a missed call text-back message for [BUSINESS NAME].

Business type: [TYPE — e.g., dental office / law firm / plumbing company]
Tone: [professional / warm and friendly / urgent]

Requirements:
- Under 160 characters (one SMS credit)
- Acknowledge the missed call
- Include a way to respond or book (link, reply to text, or call back option)
- Sound human — NOT automated

Write 3 versions: one warm/friendly, one direct/professional, one with a light urgency."

---

After the message is written — paste it into the SMS field in the workflow.
Test it by calling the client's number from a separate phone before going live.`,
    },
    {
      title: "New Lead Welcome Sequence — Email + SMS",
      tag: "Automations",
      prompt: `Build this automation the moment a new lead comes in through any form, funnel, or ad. This sequence warms them up before you ever talk to them.

WHAT IT DOES:
When someone submits a form or fills out a lead capture — they immediately receive a welcome message, then a follow-up sequence over the next 4 days to move them toward booking.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Form Submitted" (or "Contact Created" from ad / funnel)
Action 1: Send SMS — immediately (welcome message)
Action 2: Send Email — immediately (welcome email)
Action 3: Wait — 1 day
Action 4: Send Email — follow-up #1 (value + social proof)
Action 5: Wait — 2 days
Action 6: Send SMS — follow-up nudge
Action 7: Wait — 1 day
Action 8: Send Email — follow-up #2 (urgency / CTA to book)
Action 9: Add tag "Lead Sequence Complete"

---

Paste this into ChatGPT to write all the messages:

"Write a 4-touch lead welcome sequence for [BUSINESS NAME].

Business type: [TYPE]
Lead source: [e.g., Facebook ad / website contact form / free trial sign-up]
Offer they responded to: [e.g., free consultation / 14-day trial / discount]
Tone: [warm and personal / professional / energetic]

Write all of the following:

1. WELCOME SMS (immediately after opt-in) — under 160 characters. Warm, personal, confirms they're in the right place.

2. WELCOME EMAIL (immediately after opt-in)
   Subject line + full body. Thank them, remind them what they signed up for, tell them exactly what happens next, include a CTA to book or call.

3. FOLLOW-UP EMAIL — Day 2
   Subject line + body. Share one piece of value (tip, stat, or mini case study). Soft CTA at the end.

4. FOLLOW-UP SMS — Day 3
   Under 160 characters. Casual check-in. Ask if they have questions or are ready to schedule.

5. FINAL EMAIL — Day 4
   Subject line + body. Light urgency (spots filling, offer ending, etc.). Clear CTA: 'Book your call here: [LINK]'

Make every message sound like it's coming from a real person named Mandy, not a company."`,
    },
    {
      title: "Review Request Automation — Post-Service",
      tag: "Automations",
      prompt: `Build this automation for every client immediately after a client onboarding or first service completion. Google reviews are the fastest way to build credibility for local businesses.

WHAT IT DOES:
After a client marks a job complete or an appointment status updates to "Completed" — the system automatically sends a review request via SMS and email.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Appointment Status Changed → Completed" (or "Pipeline Stage = Completed / Job Done")
Action 1: Wait — 2 hours (let them get home and settle)
Action 2: Send SMS (review request)
Action 3: Wait — 1 day
Action 4: If no review link clicked → Send Email (review follow-up)
Action 5: Add tag "Review Requested"

---

Paste this into ChatGPT to write the messages:

"Write a review request sequence for [BUSINESS NAME].

Business type: [TYPE]
Google Review Link: [PASTE CLIENT'S GOOGLE REVIEW LINK HERE]
Tone: [warm / professional / genuine — not salesy]

Write:

1. REVIEW REQUEST SMS (sent 2 hours after service)
Under 160 characters. Personal. Ask how the experience was. Include the Google review link. Do NOT use the word 'automated' or 'system.'

2. REVIEW REQUEST EMAIL (sent next day if no click)
Subject line + full body. Thank them by name for choosing [BUSINESS NAME]. Share the Google review link clearly. Make it feel like a personal note from [OWNER NAME], not a corporate email.

Both messages should feel like they were typed personally, not mass-sent."

---

Note: Always get the client's Google Review shortlink before building this. To find it: Google 'your business name' → click 'Write a Review' → copy that URL → shorten with bit.ly if needed.`,
    },
    {
      title: "Appointment Reminder Sequence",
      tag: "Automations",
      prompt: `Build this for every client who has appointment-based bookings. Reduces no-shows by up to 80%.

WHAT IT DOES:
After an appointment is booked in the system — the contact automatically receives reminders at 24 hours, 2 hours, and 15 minutes before their appointment.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Appointment Booked" (calendar event created)

Reminder 1:
Action: Wait until [24 hours before appointment start time]
Action: Send SMS (24-hour reminder)
Action: Send Email (24-hour reminder)

Reminder 2:
Action: Wait until [2 hours before appointment start time]
Action: Send SMS (2-hour reminder)

Reminder 3:
Action: Wait until [15 minutes before appointment start time]
Action: Send SMS (15-minute reminder)

---

Paste this into ChatGPT to write the messages:

"Write an appointment reminder sequence for [BUSINESS NAME].

Business type: [TYPE — e.g., chiropractor / salon / financial advisor]
Appointment type: [e.g., consultation / adjustment / haircut / onboarding call]
Tone: [warm / professional]
Business address: [ADDRESS] (include in reminders)
Cancellation/reschedule instructions: [e.g., 'Reply CANCEL to cancel' or 'Call us at [PHONE]']

Write:

1. 24-HOUR REMINDER SMS — under 160 characters. Confirm the appointment time and date. Include address or Zoom link. Include how to reschedule.

2. 24-HOUR REMINDER EMAIL — Subject line + body. Friendly tone. Recap what to bring / prepare if applicable. Confirm time, date, address/link.

3. 2-HOUR REMINDER SMS — under 160 characters. Quick reminder. Keep it warm and short.

4. 15-MINUTE REMINDER SMS — under 160 characters. 'We're ready for you!' style. Very short."`,
    },
    {
      title: "Instagram Comment → Auto-DM Trigger",
      tag: "Automations",
      prompt: `This is one of the highest-converting automations for social media. When someone comments a specific keyword on a client's post — they instantly get a DM with the offer or lead magnet. Turns every viral post into a lead generator.

WHAT IT DOES:
Someone comments a trigger word on a post (e.g., "INFO" or "PRICE" or "YES") → they instantly receive a DM with the resource, link, or offer → their contact is created in the CRM automatically.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Instagram Comment Received" — containing keyword [TRIGGER WORD]
Action 1: Send Instagram DM (automated — instant)
Action 2: Create Contact (if not already exists)
Action 3: Add tag "[TRIGGER WORD] — Requested"
Action 4: Add to Pipeline stage "New Lead"

---

Paste this into ChatGPT to write the messages and set up the post:

"Write an Instagram comment-trigger campaign for [BUSINESS NAME].

Business type: [TYPE]
The offer / lead magnet: [e.g., free price guide / free consultation / free checklist / discount code]
Trigger word: [choose one easy word — e.g., GUIDE / INFO / YES / FREE / PRICE]
Tone: [warm / fun / professional]

Write:

1. THE POST CAPTION (for the original Instagram post)
- Hook line that tells them to comment [TRIGGER WORD] to get the thing
- 2–3 lines of value about why the offer matters
- Clear CTA: 'Comment [TRIGGER WORD] below and I'll DM you instantly!'
- 5–8 hashtags

2. THE AUTO-DM (sent instantly when they comment)
Under 300 characters. Personal, warm, instant. Include the link or resource. Ask a soft qualifying question at the end (e.g., 'Are you located in [CITY]?' or 'Have you tried [SERVICE] before?')

3. A FOLLOW-UP DM (send 24 hours later if they don't respond to the first DM)
Short and casual — checking in, still offering the resource."

---

Test this thoroughly before going live: make a test comment on the post from a personal account and confirm the DM fires correctly.`,
    },
    {
      title: "New Client Onboarding Sequence",
      tag: "Automations",
      prompt: `Build this automation the moment a new client pays their invoice or signs their contract. It sets the tone for the entire relationship and makes you look like a premium operation from day one.

WHAT IT DOES:
When a new client signs or pays → they receive a welcome sequence over the first week that introduces them to how the service works, sets expectations, and collects what you need to get started.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Invoice Paid" OR "Contract Signed" OR "Tag Added: New Client"

Action 1: Send SMS — immediately (welcome)
Action 2: Send Email — immediately (welcome + next steps)
Action 3: Create Task — "Send onboarding questionnaire to [CLIENT NAME]" (assign to yourself)
Action 4: Wait — 1 day
Action 5: Send Email — Day 2 (what to expect this week)
Action 6: Wait — 3 days
Action 7: Send Email — Day 5 (check-in + content kickoff)
Action 8: Create Task — "First content draft ready for review" (set due date 7 days)
Action 9: Add tag "Onboarding — Week 1"

---

Paste this into ChatGPT to write the messages:

"Write a new client onboarding sequence for The Dollhouse Brand Studio.

New client name: [NAME]
Business name: [BUSINESS NAME]
Package they signed up for: [Starter / Growth / Elite]
Platform they're on: [Instagram / Facebook / TikTok / etc.]

Write:

1. WELCOME SMS (sent immediately after payment/signing)
Under 160 characters. Exciting, warm, personal. Make them feel like they made the right decision.

2. WELCOME EMAIL (sent immediately)
Subject line + full body. Thank them for joining. Outline exactly what happens in the next 7 days step by step (Day 1, Day 3, Day 7). Include what they need to send you: login access, brand kit, photos, logo. Make them feel taken care of.

3. DAY 2 EMAIL — 'What to Expect This Week'
Subject line + body. Set expectations for content review process, posting schedule, how to give feedback. Keep it simple and reassuring. Light tone.

4. DAY 5 EMAIL — 'We're Getting Started!'
Subject line + body. Let them know content creation has begun. Give them a sneak peek or first deliverable update. Ask if they have any questions or anything they want to make sure we include."`,
    },
    {
      title: "7-Day Lead Nurture Drip Sequence",
      tag: "Automations",
      prompt: `Build this for leads who showed interest but didn't book. This automated sequence keeps you top of mind over 7 days and converts cold leads into warm ones.

WHAT IT DOES:
A lead comes in and doesn't book right away → they enter this 7-day sequence → by day 7 they've received 5 touches and are far more likely to say yes when you follow up manually.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Tag Added: Nurture Sequence" (add this tag manually or from a pipeline stage)

Day 0: SMS — immediate (entered sequence)
Day 1: Email — value content
Day 2: SMS — soft check-in
Day 3: Email — case study or social proof
Day 5: Email — objection-handling
Day 7: SMS + Email — final offer / urgency close
End: Add tag "Nurture Complete" → Create Task "Manual Follow-Up Call"

---

Paste this into ChatGPT to write all messages:

"Write a 7-day lead nurture drip sequence for The Dollhouse Brand Studio targeting [TYPE OF BUSINESS OWNER — e.g., local service businesses / e-commerce brands / restaurant owners].

The lead didn't book after the initial outreach. They're warm but haven't committed. Goal: build trust, show proof, handle objections, and get them to book a call or start the free trial.

Our packages: Starter $1,000/mo, Growth $2,500/mo, Elite $5,000+/mo. All with a $500 one-time setup and 14-day free trial option.

Write:
1. Day 0 SMS — immediate. Short and warm. 'We've got some good stuff coming your way.'
2. Day 1 Email — Subject + body. Share one valuable tip about social media for [THEIR INDUSTRY]. No pitch. Pure value.
3. Day 2 SMS — Check-in. Casual. 'Quick question — what's your biggest frustration with social media right now?'
4. Day 3 Email — Subject + body. Mini case study or proof point. What results a similar business got. Keep it short and real.
5. Day 5 Email — Subject + body. Handle the 3 most common objections: price, timing, 'I tried this before.' Warm and conversational tone.
6. Day 7 SMS — Short urgency nudge. Mention the free trial.
7. Day 7 Email — Subject + body. The final touch. Make the case one more time. Clear CTA: 'Book a 15-minute call' or 'Start your 14-day free trial.' After this — personal follow-up from Mandy."`,
    },
    {
      title: "Re-engagement Campaign — Dormant Contacts",
      tag: "Automations",
      prompt: `Use this automation to re-engage leads who went cold — haven't responded in 30+ days. Run it once a month on any contact with the tag "Cold Lead" or "No Response."

WHAT IT DOES:
Contacts who went dark get a 3-touch re-engagement sequence over 5 days. If they respond — remove from sequence and book them. If no response — tag as "Inactive" and move on.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Tag Added: Re-Engagement" (add manually each month to cold contacts)

Action 1: Send SMS — Day 0 (the pattern interrupt)
Action 2: Wait — 2 days
Action 3: Send Email — Day 2 (the value-add reachout)
Action 4: Wait — 3 days
Action 5: Send SMS — Day 5 (the final nudge)
Action 6: Add tag "Re-Engagement Sent"
Action 7: If no reply within 7 days → Add tag "Inactive — Archive"

---

Paste this into ChatGPT to write the messages:

"Write a 3-touch re-engagement campaign for The Dollhouse Brand Studio targeting leads who went silent 30+ days ago.

Lead type: [local business owners / e-commerce brand owners]
Last touchpoint: [they saw our pricing / had a call / requested info / tried the free trial]
Tone: warm and honest — not desperate, not salesy

Write:

1. RE-ENGAGEMENT SMS — Day 0
Under 160 characters. A pattern interrupt — say something real, honest, and human. Not a generic 'just checking in.' Something like acknowledging time has passed and asking a direct question.

2. RE-ENGAGEMENT EMAIL — Day 2
Subject: something that stands out in an inbox (creative, not a boring 'follow up')
Body: short. Acknowledge you haven't spoken in a while. Share something genuinely new or valuable — a tip, a result, a new offer. Soft CTA.

3. FINAL SMS — Day 5
The breakup text. Short, kind, and honest. Tell them this is the last message. Leave the door open for when timing is better."`,
    },

    // ─── Proposals ───────────────────────────────────────
    {
      title: "Client Proposal — Starter Package ($1,000/mo)",
      tag: "Proposals",
      prompt: `Use this prompt to generate a full professional proposal for any prospective client on the Starter package. Customize all bracketed fields before sending.

Paste this into ChatGPT:

"Write a professional social media management proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Discovery call notes:
- Business type: [TYPE — e.g., dental office / boutique salon / landscaping company]
- Their biggest pain point: [what they told you on the call]
- Their goal: [e.g., more leads / more bookings / more brand awareness]
- Platforms they want: [e.g., Instagram + Facebook]
- Their current social situation: [e.g., posting inconsistently / no presence at all / had someone before but unhappy]

Package: Starter — $1,000/mo + $500 one-time setup fee
Includes:
- 1 platform fully managed (content creation, captions, scheduling)
- AI brand clone — content in their voice without filming
- 12 posts/month (mix of reels, carousels, and static posts)
- Comment keyword trigger + auto-DM automation
- Missed call text-back
- Online booking integration
- Monthly performance report
- 14-day free trial option ($500 setup required, first 2 weeks free)

Format the proposal with these sections:
1. Introduction — personalized, reference their business specifically
2. The Problem We Solve — restate their pain points in their own words
3. Our Solution — describe the Starter package as it applies to THEIR business
4. What's Included — formatted list of deliverables
5. Pricing — $1,000/mo + $500 setup. Mention 14-day free trial option.
6. Next Steps — Step 1 / Step 2 / Step 3 (sign, pay setup, onboarding call)
7. About The Dollhouse Brand Studio — 2–3 sentences on who we are

Tone: professional but warm. Confident, not pushy. Make it feel custom — not like a template.
Length: 400–600 words. Clean, scannable formatting. No fluff."`,
    },
    {
      title: "Client Proposal — Growth Package ($2,500/mo)",
      tag: "Proposals",
      prompt: `Use this prompt to generate a full proposal for the Growth package. Best for clients who want multiple platforms, paid ads, and faster growth.

Paste this into ChatGPT:

"Write a professional social media management proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Discovery call notes:
- Business type: [TYPE]
- Their biggest pain point: [what they told you]
- Their goal: [e.g., scale lead volume / run ads effectively / expand to multiple platforms]
- Platforms they want: [e.g., Instagram + TikTok + Facebook]
- Current situation: [e.g., have one platform but want more / running ads but no results / need full system]

Package: Growth — $2,500/mo + $500 one-time setup fee
Includes:
- Everything in Starter — now across 3 platforms (Instagram, TikTok, Facebook)
- Paid ad management — Facebook & Instagram ads included
- Email + SMS automation sequences for lead follow-up
- 18 posts/month across platforms
- Full CRM pipeline setup and lead management
- Monthly strategy call + performance report
- 14-day free trial option ($500 setup required)

Format the proposal with these sections:
1. Introduction — personal, reference their discovery call
2. The Problem We Solve — restate their pain points (use their exact words if possible)
3. Our Solution — describe Growth package as it applies to their specific business and goals
4. What's Included — clean formatted deliverable list
5. Pricing — $2,500/mo + $500 setup. Mention free trial option.
6. Results You Can Expect — be honest, set realistic expectations for first 30/60/90 days
7. Next Steps — Step 1 / Step 2 / Step 3
8. About The Dollhouse Brand Studio — 2–3 sentences

Tone: premium and results-focused. This client is investing more — the proposal should match that seriousness.
Length: 500–700 words. Scannable, professional, no fluff."`,
    },
    {
      title: "Client Proposal — Elite Package ($5,000+/mo)",
      tag: "Proposals",
      prompt: `Use this prompt for high-ticket prospects. The Elite proposal should feel like it came from a real agency — premium, thorough, and specific to their business.

Paste this into ChatGPT:

"Write a high-end social media and digital marketing proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Discovery call notes:
- Business type: [TYPE — e.g., med spa chain / law firm / e-commerce brand scaling to $1M+]
- Their biggest challenge: [what they told you]
- Their goals: [e.g., dominate local market / build a content machine / scale with ads]
- Platforms: [e.g., all 5: Instagram, TikTok, Facebook, YouTube, LinkedIn or Google Business]
- Budget appetite: [$5,000–$10,000/mo]
- Current operation: [e.g., has marketing person internally / running ads already / large team]

Package: Elite — Starting at $5,000/mo + $500 one-time setup fee
Includes:
- Full-service management across 5 platforms
- AI brand clone + AI voice agent for inbound inquiries
- Full paid ad management (Meta + Google)
- Email + SMS campaigns + advanced automation workflows
- Weekly content production (20–30 pieces/month)
- Dedicated account manager (Mandy personally involved)
- Monthly strategy meeting + detailed reporting dashboard
- Priority support and same-day response SLA

Format this proposal with:
1. Executive Summary — 1 powerful paragraph on the opportunity and what we'll build together
2. Situation Analysis — their current position and what's being left on the table
3. Our Strategy — a high-level content + paid ads + automation game plan specific to their business
4. Full Scope of Work — detailed deliverable list by category
5. Investment — $5,000/mo starting rate (note: final quote based on scope) + $500 setup
6. Timeline — what happens in weeks 1, 2, 3, 4 after they start
7. Why The Dollhouse Brand Studio — 3–4 sentences. Confident. Why us, not anyone else.
8. Next Steps — exactly how to move forward today

Tone: premium agency tone. Polished, data-aware, strategic. This is a high-ticket close — every word should earn trust.
Length: 700–1,000 words. Well-formatted sections, clean and professional."`,
    },
    {
      title: "Custom Proposal Builder — Any Client, Any Package",
      tag: "Proposals",
      prompt: `Use this when you need a proposal built fast for a client who doesn't fit neatly into one package, or when you want to customize pricing for a specific situation.

Paste this into ChatGPT:

"Build a custom social media management proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Here's everything from the discovery call:
[PASTE YOUR NOTES FROM THE CALL — be as detailed as possible: what they said, what they need, their budget reaction, what got them excited, what concerned them]

Based on my notes above, do the following:

1. Recommend the best package for this client (Starter $1k, Growth $2.5k, or Elite $5k+) and explain why in 2–3 sentences. If they should start on one and upgrade, note that.

2. Write a complete custom proposal with these sections:
   - Personal intro referencing something specific from our call
   - Their problem, in their own words
   - Our custom solution (tailor the deliverables to what they actually need — not just the standard list)
   - Pricing and what's included
   - 14-day free trial mention if applicable
   - Exact next steps to sign and start
   - A closing line that feels personal, not template-y

3. Suggest: should I mention the free trial in this proposal based on what you know about this client? Why or why not?

Tone: match their energy from the call. If they were formal — be polished. If they were casual — be warm and conversational. This proposal should feel like it was written specifically for them."`,
    },

    // ─── Contracts ───────────────────────────────────────
    {
      title: "Service Agreement — Template",
      tag: "Contracts",
      prompt: `Use this prompt to generate a clean, professional service agreement. Have a lawyer review before using for clients over $2,000/mo.

Paste this into ChatGPT:

"Draft a social media management service agreement for The Dollhouse Brand Studio with the following terms:

Details to include:
- Service Provider: The Dollhouse Brand Studio (Mandy Fortune, Owner)
- Client: [CLIENT FULL NAME or BUSINESS LEGAL NAME]
- Service Start Date: [DATE]
- Services Provided: [LIST — e.g., social media management for Instagram, content creation, scheduling, monthly reporting]
- Package: [Content Starter / Starter / Growth / Elite]
- Monthly Fee: $[AMOUNT]/month
- Contract Term: [6-month minimum / 12-month annual] — specify which applies
- One-Time Setup Fee: $500 (due before work begins, non-refundable)
- Billing Date: [e.g., 1st of each month / same date as signup]
- Payment Method: [e.g., credit card on file / ACH / invoice]

Write a complete agreement with these sections:
1. Services — what The Dollhouse Brand Studio will provide
2. Term & Minimum Commitment — minimum 6-month initial term; after the minimum term, either party may cancel with 30 days' written notice; 12-month contracts are available at a 10% discount and have their own minimum term
3. Fees & Payment — monthly fee, setup fee, late payment policy (add 10% after 7 days late)
4. Client Responsibilities — what the client must provide (logins, photos, feedback within 48 hrs)
5. Intellectual Property — content created belongs to the client after payment
6. Confidentiality — both parties agree not to share proprietary information
7. Limitation of Liability — The Dollhouse Brand Studio is not liable for platform algorithm changes, ad performance fluctuations, or results beyond our direct control
8. No Guarantee of Results — The Client acknowledges that social media marketing results vary based on industry, market conditions, product or service quality, audience, and other factors outside of The Dollhouse Brand Studio's control. The Dollhouse Brand Studio makes no guarantee of specific outcomes including but not limited to follower growth, leads, bookings, or revenue. Our commitment is to deliver the agreed services with skill, care, and consistency.
9. Termination — after the minimum term, either party may cancel with 30 days' written notice in writing; early termination of a fixed-term contract requires payment of remaining balance
10. Governing Law — Ontario, Canada
11. Signatures — Client signature, date / The Dollhouse Brand Studio signature, date

Tone: professional and clear. Plain English where possible — not overly legalese. Client should be able to read and understand it in under 5 minutes."`,
    },
    {
      title: "14-Day Free Trial Agreement",
      tag: "Contracts",
      prompt: `Use this prompt to generate a simple free trial agreement. This is a lighter document — not a full contract — but it protects you and sets expectations before the client converts to monthly billing.

Paste this into ChatGPT:

"Write a 14-day free trial agreement for The Dollhouse Brand Studio.

Details:
- Service Provider: The Dollhouse Brand Studio (Mandy Fortune)
- Client: [NAME / BUSINESS NAME]
- Trial Start Date: [DATE]
- Trial End Date: [DATE + 14 days]
- Setup Fee (collected upfront, non-refundable): $500
- Platform Managed During Trial: [e.g., Instagram]
- Monthly Fee After Trial (if they continue): $[AMOUNT]/month
- Billing Starts: Automatically on Day 15 unless client cancels in writing before trial end

Write this agreement with:
1. Trial Description — what's included during the 14 days (full Starter service, or subset — specify)
2. Setup Fee — $500 is collected before work begins. Non-refundable. Covers AI clone build, content system setup, and automation configuration.
3. Trial Period — 14 days of service at no additional charge
4. Conversion to Monthly — unless client cancels in writing [48 hours] before trial end, monthly billing of $[AMOUNT] begins automatically
5. Cancellation During Trial — client may cancel at end of trial with no obligation beyond the $500 setup fee
6. Client Responsibilities — provide logins, brand assets, and feedback promptly
7. Signatures — Client / The Dollhouse Brand Studio / Date

Tone: friendly and clear. This should feel like a simple, honest agreement — not intimidating. Client should sign this in under 2 minutes."`,
    },
    {
      title: "Client Intake / Onboarding Form — Questions",
      tag: "Contracts",
      prompt: `Use this prompt to create the onboarding intake form that every new client fills out. Build this as a form in the platform or send as a fillable PDF/Google Form.

Paste this into ChatGPT:

"Create a detailed new client onboarding intake form for The Dollhouse Brand Studio.

This form is filled out by new clients after they sign and pay. It collects everything we need to start creating their content and setting up their automations.

Write a complete form with the following sections:

SECTION 1 — Business Basics
- Business legal name
- Business type / industry
- Website URL
- Location(s) — city/state
- Business phone number
- Primary contact name and email
- Who should we contact for content approvals?

SECTION 2 — Social Media Accounts
- List all platforms and usernames
- Who currently manages their accounts?
- Do we have login access? (Yes / Need to share)
- Which platform is most important to them right now?

SECTION 3 — Brand Identity
- Do you have a brand kit? (Yes — attach / No — we'll build one)
- Primary colours (hex codes if available)
- Fonts used (if known)
- Tagline or brand statement
- Tone of voice: check all that apply [Professional / Friendly / Bold / Luxurious / Fun / Educational / Authoritative]

SECTION 4 — Content Preferences
- What topics should we post about? (List 3–5)
- What topics should we NEVER post about?
- Do you have existing photos/videos we can use? (Yes — please submit / No)
- Do you want to be in the content? (Yes / Sometimes / No — use stock/AI)
- Competitors you admire (if any):

SECTION 5 — Goals & Strategy
- What does success look like in the first 30 days?
- What's the #1 action you want followers to take? (Book / Call / Buy / DM / Follow)
- Any upcoming events, promotions, or launches we should plan content around?

SECTION 6 — Access & Logins
(Remind client to use the secure password-sharing method — never send passwords in email)
- Social media account access method: [Creator Studio / Direct login / Two-factor via their phone]
- Any other tools or apps we'll need access to?

Format as a clean intake form with clear section headers, short answer fields, and multiple choice where appropriate. Tone: professional, warm, easy to fill out."`,
    },

    // ─── Additional Services ─────────────────────────────
    {
      title: "AI Website Builder — Full Site in One Prompt",
      tag: "Platform AI",
      prompt: `Use this inside the platform's AI Studio to build a full, professional website for a client in one shot. The AI researches the business, generates industry-matched imagery, and writes conversion-focused copy — all from a single prompt.

Type into AI Studio:

"Act as an elite web designer and developer. Build a complete, professional website for [BUSINESS NAME], a [BUSINESS TYPE] located in [CITY].

Here is their Google Business listing for context: [PASTE THE GOOGLE MAPS LINK OR LISTING URL]

Their website is: [WEBSITE URL — or write 'they have no website currently']

Build a full site that includes:
1. Homepage — with a strong headline, hero section, and above-the-fold CTA ('Book Now' / 'Get a Free Quote' / 'Call Us')
2. About page — who they are, how long they've been in business, why they're the best choice
3. Services page — list each service with a 2–3 sentence description
4. Gallery or before/after section (if applicable to their industry)
5. Testimonials / Reviews section — pull from their Google reviews if available
6. Contact page — form, phone number, address, Google Maps embed, hours

Design direction:
- Colours: [BRAND COLOURS or 'pull from their existing branding']
- Tone: [PROFESSIONAL / WARM / LUXURY / MODERN / APPROACHABLE]
- Mobile-responsive layout
- Fast-loading, clean, conversion-focused

Make the copy feel like a real copywriter spent hours on it — specific to their services, their city, and their customers. No filler. Every line earns its place."

---
After the site is built:
→ Review all copy and images for accuracy
→ Set up their custom domain
→ Connect the contact form to their CRM pipeline
→ Charge: $500 build fee + $97/mo hosting (set up as a recurring invoice)`,
    },
    {
      title: "AI Revenue Audit — Find the Hidden Money",
      tag: "Strategy",
      prompt: `Use this to run a deep AI analysis of a client's (or your own) CRM pipeline, workflows, and lead data. The AI finds missed opportunities, stalled leads, and 'silent money problems' — then tells you exactly what to do about them. Charge $1,000–$2,500 for this as a standalone service, or include it as a monthly retainer add-on.

Type into the platform's Ask AI (with the client sub-account open):

"Review all of the data in this account and tell me how to generate the maximum revenue in the next 30 days.

Specifically, I need you to:

1. PIPELINE AUDIT
Scan all pipelines and stages. Identify:
- Leads with buying signals (requested pricing, had a call, received a proposal but never signed)
- Leads that have been in a stage for more than 14 days with no movement
- Any contacts with opportunity values set to zero or blank
- Any pipeline stages that have no clear next action

2. WORKFLOW AUDIT
Review all workflows and automations. Flag:
- Workflows that were built but never published (still in draft)
- Workflows that have been paused or disabled
- Any workflows with errors or contacts stuck in sequences
- Automations missing key steps (e.g., no follow-up SMS after email, no task created after stage move)

3. COMMUNICATION AUDIT
Check all unread messages, missed conversations, and contacts with no recent activity. Flag:
- Leads who messaged and never got a reply
- Contacts who clicked a link or booked but were never followed up
- Any contacts tagged 'cold' or 'lost' in the last 90 days who could be re-engaged

4. SOCIAL MEDIA AUDIT
Review active social channels. Flag:
- Any channels that haven't posted in 7+ days
- Posts with low engagement that could be boosted
- Any campaigns running that should be paused or optimised

5. REVENUE PROJECTION
Based on everything you found, give me:
- An estimate of how much monthly recurring revenue could be unlocked if we acted on the top 3 findings
- A prioritised 30-day action plan (what to do first, second, third)
- A confidence rating for each recommendation (High / Medium / Low)

Present the findings as a client-ready report with section headers, bullet points, and clear language. No jargon."

---
Deliver the output as a PDF or Google Doc.
Charge $1,000–$2,500 for a one-time audit.
Or offer a monthly retainer to implement the recommendations ongoing.`,
    },
    {
      title: "AI Digital Product Creator — Build a Lead Gen Tool",
      tag: "Platform AI",
      prompt: `Use this to build a simple interactive digital product for a client — a quiz, calculator, or checklist that they can sell for $27–$97, or give away free as a lead magnet. The sale covers ad spend, and the buyer becomes a warm lead for the higher-ticket service.

Type into AI Studio:

"Build an interactive [QUIZ / CALCULATOR / CHECKLIST] for [BUSINESS NAME], a [BUSINESS TYPE].

The tool is called: [TITLE — e.g., 'Tax Strategy Score Card' / 'Home Value Calculator' / 'Skin Type Quiz']

Target user: [DESCRIBE — e.g., 'small business owners who want to reduce their tax bill' / 'homeowners in [CITY] thinking about selling' / 'women looking for the right skincare routine']

What the tool does:
[DESCRIBE — e.g., 'asks 5 questions about the user's business finances and gives them a personalised tax strategy score + recommendations' / 'asks for address and home details and estimates value range + equity' / 'asks about skin type and concerns and recommends a product routine']

After they complete the tool, they should get:
1. A personalised result or score (based on their answers)
2. 2–3 specific recommendations relevant to their result
3. A clear CTA: [BOOK A CALL / BUY THE PRODUCT / DM US / DOWNLOAD THE GUIDE]

Design:
- Clean, simple, mobile-first
- [BRAND COLOURS and LOGO]
- Progress bar showing how far through the tool they are
- Final result page should feel like a personalised report — not a generic 'thanks for completing this'

Also build:
- A thank-you page with the next step clearly shown
- An automated email that delivers the result and the CTA
- A CRM tag applied to everyone who completes the tool: '[TOOL NAME] — Completed'

---
How to use this to liquidate ad spend:
→ Client runs a $300–$500 ad to the tool
→ Tool sells for $27–$97 — sales cover the ad cost
→ Everyone who bought = warm lead already inside the CRM
→ Run a follow-up sequence to pitch the $1,000+/mo service
→ Leads are essentially free once the product pays for the ads`,
    },

    // ─── 4x4 Video Strategy ──────────────────────────────
    {
      title: "4x4 Method — Overview & Framework Reference",
      tag: "4x4 Method",
      prompt: `This is the content strategy framework hardcoded into every video we create for clients. Read this before using any other 4x4 prompt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE GOAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is not just a formula — it walks the viewer through five steps.
Curiosity → Recognition → Trust → Belief → Action.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU SCRIPT: SET YOUR INTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start with a STRONG topic — not a weak one.

Weak: "Why you need discipline"       → Generic. No one reacts.
Strong: "Why your low self-esteem is disguised as waiting for motivation" → Exposes a pattern. Everyone reacts.

A strong topic:
✓ Calls out a specific behaviour
✓ Challenges the viewer's identity
✓ Interrupts a delusion they're holding
✓ Makes the ideal client say "this is for ME"
✓ Nobody is confused about who it's speaking to

Define your psychological target before scripting:
— Who is this for?
— What identities does this confront in them?
— What pain or frustration am I bringing to light?
— What transformation am I offering?
— Why does this matter to them? Why does it matter to me to say it?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE 4x4 STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1 — HOOK (First 4 seconds)
The hook is an INTERRUPTION. The brain decides in 1–3 seconds: is this about me?
First two sentences must DISRUPT, ACCUSE, REVEAL, or EXPOSE.

Why two sentences?
→ Sentence 1 = pattern interruption (shock)
→ Sentence 2 = personal relevance (clarity)
Shock without clarity → they leave. Clarity without shock → they scroll. You need BOTH.

On-screen title + subtitle:
→ Title anchors the theme — does NOT repeat the hook
→ Subtitle adds context (include in caption)
Example: Hook: "You don't have a content problem — you have a courage problem."
Title on screen: "The Psychology of Inconsistent Creators"
Subtitle in caption: "How low self-esteem sabotages visibility"

STEP 2 — PROOF (External validation, early in the video)
Back up the hook immediately. Nobody cares until you prove it.
→ A stat or study
→ A testimonial or case study
→ Your own real personal results

STEP 3 — VALUE / PROBLEM (The mirror and the story)
People don't connect to information — they connect to mirrors.
Hold a mirror up to expose their patterns (not to shame — to make them aware).

Use a personal story. Stories do three things:
1. Build trust
2. Build emotional connection
3. Lower resistance

Teach from your scars, not just from theory.

Emotional triggers that work (NOT shame — pattern exposure):
→ Shame exposure: "You say you want wealth but avoid responsibility."
→ Hope: "You're closer than you think."
→ Identity challenge: "You don't lack a skill — you lack a belief system."
→ Fear of regret: "You're wasting your potential."
→ Aspiration/exposure: Showing what's possible through your lifestyle or results.

KEY RULE: Don't shame people. Expose their patterns. That is authority.

STEP 4 — CALL TO ACTION (Last 4 seconds)
End every video with a clear CTA. This boosts engagement and feeds the algorithm.
→ "Comment [WORD] and I'll DM you [RESOURCE]"
→ "Follow for [OUTCOME] content"
→ "Share this with someone who [SITUATION]"
→ "Book a free call — link in bio"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUICK REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hook     → First 4 seconds  → Interrupt, expose, make it personal
Proof    → Right after hook → Stat / testimonial / personal results
Value    → Middle           → Mirror, story, pain points, takeaways
CTA      → Last 4 seconds   → Drive engagement, feed the algorithm`,
    },
    {
      title: "Strong Topic Generator — 20 Topics for Any Niche",
      tag: "4x4 Method",
      prompt: `Use this before scripting any video. Paste into ChatGPT to generate 20 strong, pattern-exposing topics that will stop the scroll for your client's ideal audience.

Paste this into ChatGPT:

"You are a viral content strategist trained in psychology-based video scripting. I need 20 STRONG video topics for [BUSINESS NAME / NICHE].

Business type: [e.g., life coach / med spa / personal trainer / restaurant / real estate agent]
Ideal client: [DESCRIBE — e.g., 'women 30–45 who want to lose weight but keep starting over' / 'small business owners who are invisible online']
Content goal: [e.g., get DMs / build trust / sell a service / grow followers / go viral]

STRONG topic criteria:
✓ Calls out a specific behaviour or pattern
✓ Challenges the viewer's identity
✓ Interrupts a delusion they're holding
✓ Speaks directly to the ideal client — no one else is confused
✓ Exposes something the viewer already knows but hasn't admitted

WEAK → STRONG examples:
❌ 'Why you need to work harder'
✓ 'The reason you call yourself 'disciplined' but your results say otherwise'

❌ 'How to get more clients'
✓ 'The type of clients you're attracting is a direct reflection of how much you charge yourself'

❌ 'Social media tips for small businesses'
✓ 'You're not posting consistently because deep down you don't believe your business is worth the attention'

For EACH of the 20 topics, give me:
1. The STRONG topic (specific, pattern-exposing, identity-confronting)
2. The WEAK version it replaces (what everyone else would say)
3. The identity it confronts in the viewer
4. The transformation it points to
5. Pain activation score 1–10 (how hard will this hit for the ideal client)

Sort by pain activation score, highest first. Do NOT make these generic. They should feel like they were written specifically for [BUSINESS TYPE] and their audience."`,
    },
    {
      title: "Hook Writer — First 4 Seconds + Title & Subtitle",
      tag: "4x4 Method",
      prompt: `Use this to write the opening hook for any video — plus the on-screen title and caption subtitle. The hook is everything. Get this wrong and no one watches. Get it right and they can't look away.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method for psychology-based video content.

I need 10 hook variations for this video topic: [PASTE THE STRONG TOPIC]

Context:
Business type: [TYPE]
Ideal client: [DESCRIBE — be specific]
Tone of the video: [e.g., bold and confrontational / warm and vulnerable / educational / raw and honest]

Hook formula — two sentences only:
→ Sentence 1: Pattern interruption. This is the SHOCK. It disrupts, accuses, reveals, or exposes. The viewer's brain should say 'wait, what?'
→ Sentence 2: Personal relevance. This is the CLARITY. It tells them exactly who this is for. The viewer should say 'this is about me.'

Without both: they leave or scroll. With both: they're hooked.

Write 10 hook options. Each one should feel DIFFERENT in approach:
- 2 hooks that START with an accusation
- 2 hooks that START with a question
- 2 hooks that START with a statistic or bold claim
- 2 hooks that START with 'If you...'
- 2 hooks that are vulnerable and personal

For EACH hook, also write:
→ ON-SCREEN TITLE (3–7 words, anchors the theme of the video — does NOT repeat the hook)
→ SUBTITLE for caption (one punchy line that adds specificity or context)

Example of the format I want:
Hook: 'You don't have a content problem — you have a courage problem. And if you've been posting inconsistently, you already know what I'm talking about.'
Title: The Psychology of Inconsistent Creators
Subtitle: How low self-esteem sabotages visibility

After all 10 hooks, tell me which 3 you'd recommend and why."`,
    },
    {
      title: "Full 4x4 Script — Master Template (Any Business)",
      tag: "4x4 Method",
      prompt: `Use this to write a complete video script for any client using the full 4x4 Method. This is the master prompt — it applies to any niche, any platform.

Paste this into ChatGPT:

"You are a viral content strategist and scriptwriter trained in the 4x4 Method — a psychology-based nervous system sequencing approach to video content that guides viewers through: Curiosity → Recognition → Regulation → Belief → Action.

Write a complete short-form video script for [BUSINESS NAME].

Business type: [TYPE]
Ideal client: [DESCRIBE — be specific about who they are, what they want, what's stopping them]
Video topic (STRONG — not generic): [PASTE THE STRONG TOPIC]
Platform: [Instagram Reel / TikTok / Facebook Reel]
Target length: [30 / 45 / 60 seconds]
Tone: [bold and confrontational / warm and vulnerable / educational / raw and real]

Deliver the script in the exact 4x4 structure below:

━━ STEP 1: HOOK — First 4 seconds ━━
Two sentences maximum.
Sentence 1: Pattern interruption — shock, disrupt, accuse, reveal, or expose.
Sentence 2: Personal relevance — narrow to the exact viewer this is for.
The viewer must think 'this is about ME' or they scroll.

ON-SCREEN TEXT:
Title (anchors the theme — does not repeat the hook):
Subtitle (1 line, goes in the caption):

━━ STEP 2: PROOF — Right after the hook ━━
Immediately validate the hook with proof. This earns the right to be heard.
Use ONE of: a real statistic / a testimonial / personal results / a case study.
Keep it short — 1–3 sentences. The viewer is still deciding if they trust you.

━━ STEP 3: VALUE — The mirror and the story ━━
This is the body of the video. Hold a mirror up to expose their pattern without shaming them.

Use a story from real life (client story, personal experience, a scenario they'll recognize).
Stories build trust, build emotional connection, and lower resistance.
Teach from scars, not theory.

Then deliver the actual value — the insight, strategy, or truth that moves them.
Include at least ONE emotional trigger:
→ Shame exposure (expose the pattern, not the person)
→ Hope ('you're closer than you think')
→ Identity challenge ('you don't lack a skill — you lack a belief system')
→ Fear of regret ('you're wasting your potential')
→ Aspiration exposure (what's possible when they change)

━━ STEP 4: CALL TO ACTION — Last 4 seconds ━━
One clear action. Make it feel like the natural next step, not a sales pitch.
Options: Comment [WORD] / Follow for [OUTCOME] / Book a call / Share with someone who [SITUATION]

━━ AFTER THE SCRIPT ━━
Also give me:
1. The full CAPTION for this post (2–4 sentences + CTA + 5–8 hashtags)
2. 3 on-screen text overlays to show during the video (beyond the title — key phrases to flash on screen)
3. Audio direction (what vibe/style of background music fits this video)
4. One suggestion for what to show visually while talking (b-roll, environment, action shot)"`,
    },
    {
      title: "4x4 Script — Local Service Business",
      tag: "4x4 Method",
      prompt: `Use this to write a 4x4 video script specifically for local service businesses — salons, dentists, chiropractors, HVAC, plumbers, landscapers, gyms, med spas, restaurants, etc.

These clients aren't personal brands — but the 4x4 method still applies. The business owner becomes the face, and the content exposes patterns in how their customers behave.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. Write a complete short-form video script for a local [BUSINESS TYPE] called [BUSINESS NAME] located in [CITY].

Ideal customer: [DESCRIBE — e.g., 'homeowners 35–65 who keep ignoring their HVAC until it breaks' / 'women who want to feel confident but keep postponing self-care']
Video goal: [get more bookings / build local trust / get more DMs / go viral in the community]
Topic (STRONG — expose a pattern): [PASTE STRONG TOPIC — or ask AI to suggest one first]
Platform: [Instagram Reel / TikTok / Facebook Reel]
Length: [30 / 45 / 60 seconds]
Tone: [warm and local / bold and direct / educational]
Owner's name (if they'll be on camera): [NAME]

Use the full 4x4 structure:

HOOK (First 4 sec):
→ Sentence 1: Expose or interrupt — call out the behaviour their customers have
→ Sentence 2: Make it personal to their specific audience (locals who need this service)

Example hook for a dentist:
'You've been putting off that appointment for three years. Not because you can't afford it — because you're scared of what they'll find.'

PROOF:
→ A local stat, a before/after, a number of years in business, or a real customer result
→ Something that builds instant local credibility

VALUE (The mirror + story):
→ Expose the pattern the ideal customer has (e.g., DIY-ing something until it becomes a bigger problem / avoiding the dentist until the pain is unbearable)
→ Tell a real story: a customer who waited and what happened vs. one who acted early
→ Give them 1–3 actionable tips or the one truth they need to hear
→ Use an emotional trigger: hope, identity challenge, fear of regret, or aspiration

CTA (Last 4 sec):
→ 'Comment [WORD] and I'll DM you [our special offer]'
→ 'Book your appointment — link in bio'
→ 'Call us at [NUMBER]'
→ 'Tag someone who needs to hear this'

After the script:
1. Caption for the post (local, conversational, include city name, 5 hashtags — mix of local and niche)
2. On-screen text overlays (2–3 key phrases to flash on screen)
3. What visual to show while talking (clinic/shop interior, the service being performed, before/after, team at work)"`,
    },
    {
      title: "4x4 Script — Personal Brand / Coach / Creator",
      tag: "4x4 Method",
      prompt: `Use this for personal brand clients — coaches, consultants, course creators, thought leaders, or for building Mandy's own brand content. This is where the 4x4 method is most powerful — because the content IS the person.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method — a psychology-based nervous system sequencing approach to video content.

Write a complete short-form video script for [NAME], a [THEIR IDENTITY — e.g., 'business coach for first-generation entrepreneurs' / 'social media strategist for women-owned small businesses' / 'life coach who teaches high-achievers to stop self-sabotaging'].

Ideal viewer: [DESCRIBE — be deeply specific: their age range, what they want, what's stopping them, what they secretly believe about themselves]
Topic (STRONG — must expose a pattern the ideal viewer has): [PASTE STRONG TOPIC]
Platform: [Instagram Reel / TikTok]
Length: [30 / 45 / 60 seconds]
Tone: [raw and real / bold and confrontational / warm and mentoring / vulnerable and honest]
Key personal story or credential to weave in: [e.g., 'I used to post from a shelter with $11 in my account' / 'I hit six figures before I dealt with my imposter syndrome']

The FULL 4x4 structure:

HOOK (First 4 sec):
→ Sentence 1: A bold pattern interrupt — accuse, expose, reveal something they know but haven't admitted. This is a confrontation, not a conversation.
→ Sentence 2: Personal relevance — narrow it to exactly who this is for. They should feel caught.

The hook should feel like [NAME] is talking directly to one specific person, not a crowd.

ON-SCREEN:
Title (anchors the video theme — does not repeat the hook):
Subtitle (in the caption — adds more context):

PROOF (Right after hook — earn the right to be heard):
→ Personal result, a transformation they went through, or a client's result
→ Something specific and real — not vague. Numbers, timelines, before/after.

VALUE (The mirror + story + emotional trigger):
→ Hold the mirror up. Expose the pattern — gently but honestly. Don't shame, expose.
→ Tell the real story: something from your own journey or a client's journey that the viewer will recognize themselves in
→ This is where you teach from your SCARS, not just your strategy
→ Choose and use one emotional trigger:
   • Shame exposure: call out the gap between what they say they want and what they do
   • Hope: show them the light — 'you are closer than you think'
   • Identity challenge: 'you don't lack a skill — you lack a belief system'
   • Fear of regret: 'you are wasting your potential and somewhere deep down you know it'
   • Aspiration/Exposure: show what's possible when someone makes the shift

CTA (Last 4 sec):
→ Be direct. One ask. Should feel like the natural next step from the video's transformation.
→ Options: 'Comment [WORD]' / 'Follow for more of this' / 'Share with someone who needs this' / 'DM me [WORD] and I'll send you [RESOURCE]'

After the script give me:
1. Caption (3–5 punchy lines, sounds like them talking, not marketing. CTA at the end. 5–8 hashtags.)
2. 3 on-screen text overlays (the phrases that need to LAND on screen visually)
3. The one piece of advice on how to DELIVER this video — what energy, what body language, what does their face need to say"`,
    },
    {
      title: "4x4 Script — E-Commerce / Product Brand",
      tag: "4x4 Method",
      prompt: `Use this for product-based brands — e-commerce, clothing, beauty, food, lifestyle products, etc. The 4x4 method works for product content by tying the product to an identity shift or emotional truth — not just showing the product.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. Write a short-form video script for [BRAND NAME], an e-commerce brand that sells [PRODUCT TYPE].

Ideal customer: [DESCRIBE — e.g., 'women 20–35 who want to feel premium and put-together but are on a budget' / 'men who care about their appearance but don't want to look like they're trying too hard']
Product being featured: [SPECIFIC PRODUCT]
Video goal: [drive sales / build brand identity / go viral / grow following]
Topic (STRONG — tie it to an identity or pattern, not just the product): [PASTE STRONG TOPIC or describe what the product represents emotionally]
Platform: [TikTok / Instagram Reel]
Length: [15 / 30 / 45 seconds]
Tone: [aspirational and luxury / fun and relatable / raw and honest / lifestyle-focused]

Important: Do NOT make this a product demo. Make it a MIRROR that the ideal customer holds up and sees themselves — with the product as the vehicle for their transformation.

THE FULL 4x4 STRUCTURE:

HOOK (First 4 sec):
→ Sentence 1: Expose the pattern or identity the viewer has around the type of person who uses this product
→ Sentence 2: Make it personal — tie it directly to who they are or who they want to be
→ Example for a luxury skin care brand: 'You keep buying cheap skincare and wondering why you don't feel like a priority. You already know what the real problem is.'

PROOF:
→ A before/after, a number (% of customers who see X result), a viral moment, a testimonial
→ Or a lifestyle exposure that makes the product feel aspirational and attainable at the same time

VALUE (The mirror + emotional trigger):
→ Connect the product to a transformation — not just a feature
→ Use ASPIRATION EXPOSURE: show what this product represents for someone who has the life they want
→ Or use IDENTITY CHALLENGE: 'you don't buy cheap because you can't afford better — you buy cheap because you don't think you deserve better'
→ Tell a short real story: a customer's experience, or your own relationship to the product

CTA (Last 4 sec):
→ 'Shop now — link in bio'
→ 'Comment [WORD] and I'll DM you a discount code'
→ 'Tag someone who needs this'
→ 'Follow — we drop new [PRODUCT] every [DAY]'

After the script:
1. Caption (2–3 lines, sounds human, includes CTA, 5–8 hashtags — niche + product-specific)
2. Visual direction: what to show on screen? Product close-up, lifestyle shot, unboxing, before/after, luxury styling?
3. On-screen text overlays (2–3 phrases that land visually)
4. Hook-to-product ratio advice: how much time showing product vs. talking to the viewer?"`,
    },
    {
      title: "Emotional Trigger Map — Choose the Right One",
      tag: "4x4 Method",
      prompt: `Use this before scripting any video to identify WHICH emotional trigger will work best for your client's specific audience. Different triggers work for different people. Choose the wrong one and the content falls flat. Choose the right one and it goes viral.

Paste this into ChatGPT:

"You are a content psychologist and viral video strategist. I need you to identify the best emotional triggers to use in a video for [BUSINESS NAME / CREATOR NAME].

Their ideal viewer: [DESCRIBE in detail — age, situation, what they want, what's stopping them, what they secretly believe]
Video topic: [PASTE THE STRONG TOPIC]
Tone: [bold / warm / vulnerable / educational]

Here are the 6 core emotional triggers used in viral video content:

1. SHAME EXPOSURE — Expose the gap between what they say and what they do. Not to shame them — to help them see their own pattern. Example: 'You say you want wealth but you avoid every conversation about money.'

2. HOPE — You are closer than you think. This activates people who are tired and about to give up. Example: 'Most people quit 3 feet from the gold.'

3. IDENTITY CHALLENGE — Challenge who they believe they are. Example: 'You don't lack a skill — you lack a belief system.' This is powerful for high-achievers in a rut.

4. FEAR OF REGRET — Activate the fear that they are wasting their potential, their time, or their chance. Example: 'The version of you that started five years ago would be disappointed in where you are standing right now.'

5. ASPIRATION / EXPOSURE — Show what is possible. Expose the life or result that's available to them. This is powerful with lifestyle content — showing the house, the body, the business, the freedom — and letting them feel the gap between where they are and where they could be.

6. BELONGING / RECOGNITION — Make them feel seen and understood in a way that nobody else has. They feel 'finally someone who gets it.' This is powerful for communities and niche audiences.

Based on the ideal viewer I described:
1. Rank all 6 triggers from most effective to least effective for THIS audience and explain why
2. Give me an example of how each of the top 3 triggers would sound as a HOOK sentence for this specific video topic
3. Tell me which one trigger you would bet on for this video and why
4. Warn me about any trigger that could backfire or feel manipulative with this particular audience

After your analysis, use the #1 trigger to write 3 hook options for this video."`,
    },
    {
      title: "Story-to-Script Converter — Turn Any Story Into a 4x4 Video",
      tag: "4x4 Method",
      prompt: `The most powerful content comes from real stories. Use this to turn ANY personal story — yours or a client's — into a complete 4x4 video script. Stories lower resistance, build trust, and make content that people save and share.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. I need you to turn a real story into a complete short-form video script.

THE STORY:
[Paste the real story here — it doesn't have to be perfect or polished. Write it raw. Include: the situation, the emotional low point, what changed, and the result or lesson. The messier and more honest, the better material it gives us.]

Example of the kind of detail that makes great content:
'I was posting three times a day from a homeless shelter. I had $11 in my bank account. Every time I looked at my phone and saw zero comments, I wanted to quit. But I kept posting because I had nothing else. Three months later those videos brought in my first $5,000 client.'

Context:
Creator / Business: [NAME]
Ideal viewer: [DESCRIBE — who needs to hear this story to feel less alone?]
Platform: [Instagram Reel / TikTok]
Length: [30 / 45 / 60 seconds]
Tone: [vulnerable and raw / hopeful / direct]

WHAT I NEED YOU TO DO:

1. FIND THE HOOK
What is the single most pattern-interrupting line in this story?
Write Sentence 1 (the shock / the exposure) and Sentence 2 (who this is for).
The hook should make the ideal viewer think 'this is about ME.'

2. FIND THE PROOF
What part of this story provides the external validation that makes the hook believable?
Pull it out and sharpen it (make any numbers or timelines specific).

3. FIND THE MIRROR
What pattern in the viewer's life does this story expose?
Write the transition from the story into the VALUE — the universal truth that the viewer can apply to themselves.

4. WRITE THE CTA
Based on where the video ends emotionally — what is the most natural next step to ask them to take?

Then write the FULL COMPLETE SCRIPT with all 4 sections labeled and timed.

Also give me:
— The on-screen TITLE and SUBTITLE
— The full CAPTION (3–4 lines + CTA + hashtags)
— One note on how to DELIVER this video — what energy, pacing, or emotion to bring"`,
    },
    {
      title: "30-Day 4x4 Content Calendar — Monthly Video Plan",
      tag: "4x4 Method",
      prompt: `Use this to plan a full month of short-form video content for any client using the 4x4 Method. Every video in the calendar follows the psychology-based structure — strong topics, pattern-exposing hooks, emotional triggers, and clear CTAs.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. Build a 30-day short-form video content calendar for [BUSINESS NAME / CREATOR NAME].

Business type / niche: [TYPE]
Ideal viewer: [DESCRIBE specifically]
Primary platform: [Instagram Reels / TikTok / both]
Posting frequency: [3x per week / 5x per week / daily]
Content goals this month: [e.g., grow following / get DMs / drive bookings / sell a product / build authority]
Any upcoming promotions or events: [LIST — or write 'none']
Tone of the account: [bold / warm and educational / raw and personal / luxury lifestyle]

Create a 30-day calendar where each video entry includes:

▸ Date / Day #
▸ Strong Topic (specific, pattern-exposing — NOT generic)
▸ Hook (2 sentences: pattern interrupt + personal relevance)
▸ On-Screen Title
▸ Caption Subtitle
▸ Emotional Trigger Used (shame exposure / hope / identity challenge / fear of regret / aspiration)
▸ Proof Element (what to use as validation — stat, testimonial, personal result)
▸ CTA for this video

Organize the 30 days with intentional variation:
— Week 1: Establish authority (educational + credibility content)
— Week 2: Build emotional connection (story-based + vulnerable content)
— Week 3: Handle objections + build desire (identity challenge content)
— Week 4: Drive action (aspiration + direct CTA content)

At the end, give me:
1. The 3 videos from this calendar you think have the highest viral potential — and why
2. The 3 videos most likely to drive DMs or bookings — and why
3. One piece of advice on how to batch-film all 30 of these efficiently"`,
    },
    {
      title: "Caption + CTA Writer — 4x4 Aligned",
      tag: "4x4 Method",
      prompt: `The caption is the second hook. After someone watches the video — the caption either deepens their connection or loses them. Use this to write a 4x4-aligned caption and CTA for any video.

Paste this into ChatGPT:

"You are a social media copywriter trained in the 4x4 Method for psychology-based content.

Write the full caption + CTA package for this video:

Video topic: [PASTE THE STRONG TOPIC]
Hook used in the video: [PASTE THE TWO-SENTENCE HOOK]
On-screen title: [PASTE]
Subtitle (to go in caption): [PASTE]
Business / Creator: [NAME and TYPE]
Platform: [Instagram / TikTok / Facebook]
Primary CTA for this video: [e.g., comment / DM / follow / book / share]
Emotional trigger used in the video: [which one?]

Write the caption in 3 parts:

PART 1 — SUBTITLE LINE (first line of caption, appears before 'more' cutoff)
This is ONE line that deepens the hook without repeating it.
It should feel like a direct extension — the viewer reads it right after the video ends and it lands harder.
Examples:
'How low self-esteem sabotages visibility.'
'The pattern you keep calling strategy.'
'Your consistency problem is not a schedule problem.'

PART 2 — CAPTION BODY (3–5 lines max)
Conversational. No fluff. No generic motivational filler.
Continue the pattern exposure from the video — give them one more thing to sit with.
Should feel like a continuation of the conversation, not a sales pitch.
Include ONE specific line they'll want to screenshot or save.

PART 3 — CALL TO ACTION
One clear ask. Direct and natural — not desperate.
Match the CTA to the emotional state the video left them in.
Options:
→ 'Comment [WORD] and I'll DM you [SPECIFIC RESOURCE]'
→ 'Follow for more content like this'
→ 'Share this with someone who needs to hear it'
→ 'Book a free call — link in bio'
→ 'Tag someone who's been saying this about themselves'

HASHTAGS:
Give me 8 hashtags — a mix of:
- 2 large popular tags (1M+ posts)
- 3 medium niche tags (100K–1M posts)
- 3 small specific tags (under 100K — high signal for the right audience)

After everything — give me one note on WHY this caption works for this specific audience and video topic."`,
    },

    // ─── Graphics ────────────────────────────────────────
    {
      title: "Create 9 Instagram Graphics — Reach & Followers",
      tag: "Graphics",
      prompt: `Act as an elite social media marketer and create 9 Instagram graphics for this business. Do some research to create compelling graphics that will capture attention and are trendy right now. The goal for each post is more reach, more followers.

Business Name: [NAME]
Niche/Industry: [NICHE]
Location: [CITY]
Brand Colours: [HEX CODES or describe from website — e.g. navy blue + gold + white]
Target Audience: [WHO THEY WANT TO REACH — e.g. homeowners in Atlanta / women 25–45 / local business owners]
Tone: [Professional / Playful / Bold / Luxurious / Friendly / Educational]

For each of the 9 graphics, provide:
1. Format: 1080×1080 (square) or 1080×1350 (portrait — better for feed reach)
2. Headline / hook text (bold, thumb-stopping, max 8 words)
3. Supporting text or subheadline (optional, 1 line)
4. Visual concept description (what should be in the image — colours, layout, imagery, text placement)
5. Caption direction (1–2 sentences — what the post copy should say)
6. Goal of this specific post: Reach / Save / Follow / Share / Comment / Click

Mix content types:
- 2–3 educational (tips, how-tos, myth busting)
- 2 promotional (offer, result, or service highlight)
- 2 social proof (client win, stat, testimonial-style)
- 1–2 brand personality (relatable, behind the scenes, or trending format)

Make each one feel like it was designed by a premium creative agency — not a template.`,
    },
    {
      title: "Enhance Graphics for Mobile — Stop the Scroll",
      tag: "Graphics",
      prompt: `Act as an elite graphic designer and review all the social media posts listed below. Find ways to enhance the designs even further so that people on their phones will stop scrolling and pay attention.

Business website: [URL — the AI will check brand colours, fonts, and style]
Platform: [Instagram / Facebook / TikTok]
Posts to review: [PASTE LIST or describe the current post designs]

For each post, provide:
1. Current design assessment (what's working / what's not)
2. 2–3 specific design enhancements — be precise:
   - Typography: font size, weight, contrast improvements
   - Visual hierarchy: what the eye should hit first
   - Colour usage: is the brand consistent with the website?
   - Mobile readability: can it be read at 3 inches wide?
   - Thumb-stopping factor: does the first frame make someone stop?
3. Flag: "Minor tweak" or "Redesign recommended"
4. One scroll-stopping headline rewrite (if applicable)

Priority rules:
- Keep brand colours consistent with the business website at all times
- Every graphic must be readable on a 4-inch phone screen at a glance
- Bold typography beats beautiful typography every time for reach`,
    },
    {
      title: "Schedule Posts for the Month",
      tag: "Graphics",
      prompt: `Schedule all posts for the month of [MONTH YEAR] to the connected [Facebook / Instagram] page.

Posts ready to schedule:
[PASTE YOUR POST LIST — include content type (video / carousel / static), caption, and any specific timing notes]

Platform: [Instagram / Facebook / Both]
Posting frequency goal: [e.g. Daily / 5x per week / Every other day]
Business niche: [NICHE]
Time zone: [TIMEZONE]

Create a complete posting schedule based on best practices:
- Post at peak engagement times for [NICHE] businesses (research optimal times)
- Vary content types throughout the week — no two same-format posts back to back
- Space posts evenly with no dead weeks
- Pin the strongest content at the start of the month for first impressions
- Spread promotional posts evenly — no more than 1 in every 3 posts

Output format — clean week-by-week table:
| Date | Day | Time | Platform | Content Type | Post Title/Description | Goal | Notes |

Also flag:
⭐ Which single post should be boosted with the $150 Meta ad budget — choose the most shareable or highest-reach type for the niche.
📌 Which post should be pinned to the top of the profile this month.`,
    },

    // ─── Mascot / AI Character ────────────────────────────
    {
      title: "Mascot / AI Character — OpenArt AI Full Workflow",
      tag: "AI Video",
      prompt: `WORKFLOW GUIDE — Creating a Client Mascot with OpenArt AI
Use this step by step to build a branded AI mascot for a client, then bring it to life as a video.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — CREATE THE MASCOT IMAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tool: OpenArt.ai → Image Generation
Option A: ChatGPT (Image creation tab) — good for realistic human characters
Option B: Nanabana — good for stylised/cartoon mascots

Upload a reference image of:
- The business owner (for a human AI clone mascot)
- Their logo or brand asset (for a brand character)
- A photo that captures the vibe you want

Prompt to generate the mascot on OpenArt:
"I will be adding a reference image. Bring this image to life making [him/her/them] a real life character as a mascot for [BUSINESS NAME]. [DESCRIBE STYLE — e.g. photorealistic / 3D rendered / illustrated / cartoon]. Wearing [OUTFIT that matches the brand]. Background: [branded setting — e.g. a modern dental office / a luxury salon / outdoors]. Professional, likeable, memorable."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — ANIMATE THE MASCOT (IMAGE TO VIDEO)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tool: OpenArt.ai → Image to Video → Select Seedance 2.0

Upload your mascot image as the reference.

Example video prompt structure:
"Show [CHARACTER DESCRIPTION] in [SETTING — e.g. a modern home / dental chair / salon]. The character is moving, talking, and demonstrating [ACTION — e.g. how to change an air filter / proper brushing technique / a skincare routine]. Include action shots. Character should be expressive, engaging, and natural. Cinematic realism."

Output quality settings:
- Start at 480p — saves credits while testing prompts
- Once you're happy with the motion and script → click UPSCALE
- Upscale improves quality from 480p to 4K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — THE OUTREACH HOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Once the video is ready, send this DM or email to the business owner:

DM/Email:
"Hey [NAME] 👋 — I brought [BUSINESS NAME]'s mascot to life and it can promote your business 24/7. Would you like to see it?"

If they say yes:
Option A: Send the video right away — let it speak for itself.
Option B: "Great — it's ready. When do you have 5 minutes to take a look?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — THE MEETING PITCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When you get them on a meeting or Zoom, show them the mascot video and say:

"What I'd love to do for [BUSINESS NAME] is create 3–4 pillar mascot videos a month — these get pinned at the top of your page so every new visitor sees them first. Then for the rest of the month, we fill your feed with daily posts that our AI creates for you.

On top of that, we boost your best-performing mascot video with a small Meta ad budget — even $150 a month goes a long way. People start seeing your mascot everywhere on social media — it builds brand recognition fast. Then from there, we can grow into ad management, Google Business, email marketing — whatever makes sense for where your business is at."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MASCOT CLIENT PRICING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Social media posts (with mascot content): $500–$750/mo
Meta / Facebook Ads Management:          $500/mo
Google Business Profile:                 $500 (one-time setup)
Email Marketing:                         $500/mo
                                        ─────────────
Potential monthly per client:            ~$2,000/mo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT STRATEGY FOR MASCOT CLIENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Week 1: Drop the first pillar mascot video — pinned to top of profile
Week 2–4: Daily AI-generated branded posts fill the feed
Monthly: Create 3–4 new mascot videos, boost the best one as a Meta ad
Retargeting: People who engaged with the mascot post get shown the ad again — they keep seeing the mascot everywhere → brand recognition builds → trust → they book.`,
    },

    // ─── Mascot / AI Clone Outreach ──────────────────────
    {
      title: "AI Clone Cold Email — Personalised Intro",
      tag: "Outreach",
      prompt: `Use this to write a short personalised cold email for any prospect asking if they'd be interested in seeing an AI clone of themselves that promotes their business without them recording content.

Paste into ChatGPT:

"Create a short personalised email from Mandy Fortune at The Dollhouse Brand Studio.

Recipient name: [NAME]
Business name: [BUSINESS NAME]
Niche: [NICHE — e.g. dental practice / med spa / personal injury law]
City: [CITY]
What I noticed about them: [OBSERVATION — e.g. 'they're running Google Ads but have no organic social presence' / 'their photos look great but they barely post' / 'they have 200 followers but their Google reviews are amazing']

Rules:
- Under 100 words
- Subject line: something curiosity-driven — no clickbait
- Warm and genuine — not salesy
- Lead with something specific about their business (shows you did research)
- One clear, easy question at the end — make it a yes/no
- Sound like a human, not a template
- Do NOT mention price
- Goal: get a reply that says 'yes I'm interested' or 'tell me more'

The hook: ask if they'd be interested in seeing an AI version of themselves that can promote their business online 24/7 — without them ever recording content."`,
    },
    {
      title: "Mascot Outreach — \"I Brought Your Mascot to Life\"",
      tag: "Outreach",
      prompt: `Use this DM or email after you've built a prospect's mascot/AI character using OpenArt AI. Send BEFORE pitching — let the video do the selling.

━━━ DM VERSION (Instagram / Facebook) ━━━
"Hey [NAME] 👋

I brought [BUSINESS NAME]'s mascot to life — and it can promote your business 24/7 without you ever having to record anything.

Would you like to see it?"

━━━ EMAIL VERSION ━━━
Subject: I made something for [BUSINESS NAME]

Hi [NAME],

I know this is a bit different from a normal outreach email — but hear me out.

I was looking at [BUSINESS NAME]'s social media and thought there was an opportunity to do something really cool for your brand.

So I went ahead and created an AI mascot character for your business that can show up on your social media, talk about your services, and build brand recognition — completely on autopilot.

Would you want to see it?

[YOUR NAME]
The Dollhouse Brand Studio

━━━ IF THEY SAY YES ━━━
Option A — Send the video immediately: attach or link the video and let it speak.
Option B — Build curiosity: "Great — it's ready. When do you have 5 minutes to take a look? I want to show you what it could do for [BUSINESS NAME]."

━━━ FOLLOW-UP IF NO RESPONSE (3–5 days later) ━━━
"Hey [NAME], just checking — did you see my message about the [BUSINESS NAME] mascot? I'd love to show it to you this week if you have a few minutes."`,
    },
    {
      title: "Mascot Cold Call Script",
      tag: "Outreach",
      prompt: `Use this when calling a prospect who hasn't responded to your initial email or DM about the AI clone/mascot.

━━━ OPENING ━━━
"Hey [NAME], this is [YOUR NAME] — I reached out by email a few days ago. I'm the one who creates AI video clones of business owners for their social media.

I'd love to make one of you for free, just to show you what it looks like. Would you be open to seeing it?"

━━━ IF THEY SAY YES ━━━
"Amazing. I can have it ready within 24 hours. What's the best email to send it to?

[OR] — Do you have 10 minutes this week for a quick Zoom? I'd rather show you in person — it makes way more sense when you can see it running."

━━━ IF THEY SAY "WHAT IS IT EXACTLY?" ━━━
"So basically — we take a photo of you and use AI to create a video of you talking, moving, promoting your business. It looks completely real. You never have to film anything. Your content just goes out every day on autopilot.

Most business owners have never seen anything like it until I show them. That's why I'd rather just send it to you — want me to put one together for you for free?"

━━━ IF THEY SAY "I'M NOT INTERESTED" ━━━
"No worries at all — can I ask, is it just the timing, or is social media not something you're focused on right now? [Let them answer. This tells you if it's a no forever or a not now.]"

━━━ IF THEY WANT TO THINK ABOUT IT ━━━
"Of course — how about this: I'll put the free sample together anyway and just send it over. No strings. You can see it and decide from there. Fair enough?"

━━━ NOTES ━━━
• Always offer the free sample — it's a zero-resistance yes
• The free sample isn't a full build — it's a 15–20 second demo video
• Your goal on this call: get a yes to see the sample, then book the meeting from there
• Calls work best between 10am–12pm and 2pm–4pm local time`,
    },

    // ─── Meta Boost ──────────────────────────────────────
    {
      title: "Meta Boost — How to Recommend the $150 Monthly Boost",
      tag: "Ads",
      prompt: `Use this to explain the $150 Meta boost recommendation to clients. This is the baseline ad spend you recommend to every client — even those not on a full ads management plan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every month, we identify the single best-performing post from your feed — highest reach, most engagement, most saves — and put $150 behind it as a Meta boost.

This is the minimum effective budget to get meaningful reach outside of your current followers.

The $150 goes directly from the client to Meta (Facebook/Instagram) — it is NOT paid to us. It's the client's own ad spend.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW TO PITCH IT TO A CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"One thing I always recommend alongside the content plan is a small monthly boost budget — $150 directly to Meta, paid by you. Every month we take your best-performing post and push it out to a targeted audience in [CITY] who match your ideal customer.

For context — organic reach gets you in front of people who already follow you. The boost gets you in front of people who don't know you yet. At $150, you're getting thousands of new eyes on your best content every single month.

That's separate from what you pay us — it goes straight to Meta. But it makes everything we're creating for you work 5x harder."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOR MASCOT / AI CHARACTER CLIENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For mascot clients: boost the best-performing mascot video as a retargeting ad. People who engaged with the original post (liked, saved, watched) get shown the ad again — they keep seeing the same character over and over. Brand recognition builds. Trust builds. They book.

"$150 a month and your mascot is everywhere on social media in [CITY]. People start to feel like they already know your business before they ever reach out."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN TO INCLUDE IN YOUR PROPOSAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Always include a line in the quote:
"Recommended: $150/mo Meta boost (client pays directly to Meta) — boosts your best post each month for maximum reach."

Add it to the 'Ad Spend' field in the Quote Builder — it does not affect your fees.`,
    },

    // ─── Lead Gen — Mascot Niche ─────────────────────────
    {
      title: "Lead Gen — Find Niche Clients Running Google Ads (Detailed)",
      tag: "Lead Gen",
      prompt: `Act as a B2B Lead Generation Specialist and Market Researcher. I need to identify 25 small [NICHE] businesses in [CITY] who are currently running Google Ads.

EXAMPLE (swap for your niche + city):
Niche: Dental practices (general dentistry, cosmetic dentistry, pediatric dentistry, or orthodontics)
City: Atlanta, GA

Task:
Use Google Search and the Google Ads Transparency Center to confirm which practices in this area and niche are active advertisers.

For each of the 25 businesses, provide the following in a clean markdown table:
| Business Name | Website URL | Phone Number | Email Address | Ad Evidence |

Email rules: Search for 'contact@', 'info@', or listed owner/doctor emails — check Contact and About Us pages if not on homepage.

Ad Evidence: briefly note if you saw their ad on Search, Maps, or the Google Ads Transparency Center.

Constraints:
- Only small to medium independently owned businesses
- Avoid national chains or franchises (e.g. Aspen Dental, Heartland, Pacific Dental, corporate gyms, etc.)
- If an email isn't on the homepage, check the Contact or About Us page
- All 25 must be unique leads
- Only include verified information — no guesses

---
After the table, output a second section:

NEXT STEP — CRM PIPELINE SETUP:
1. Create a new contact in the CRM for each business using the name, email, phone, and website
2. Create a new pipeline called "[NICHE] Cold Outreach — [CITY] [MONTH/YEAR]"
3. Add all 25 contacts to the first stage: "New Lead"
4. Tag each contact: [NICHE], [CITY], Cold Outreach, Google Ads Advertiser

This gives you a ready-to-work outreach pipeline from a single prompt.`,
    },
  ];

  const GROUPS = [
    { label: "Platform AI", icon: "bot", tags: ["Platform AI"] },
    { label: "4x4 Video Strategy", icon: "brain", tags: ["4x4 Method"] },
    { label: "Content Creation", icon: "pen", tags: ["Captions", "Video", "Stories", "Planning"] },
    { label: "LinkedIn", icon: "briefcase", tags: ["LinkedIn"] },
    { label: "Content Sizes", icon: "ruler", tags: ["Sizes"] },
    { label: "Ads & Email", icon: "megaphone", tags: ["Ads", "Email"] },
    { label: "Strategy & Reporting", icon: "bar-chart", tags: ["Strategy", "Reporting", "Onboarding", "Business Consulting"] },
    { label: "AI Video", icon: "video", tags: ["AI Video"] },
    { label: "Graphics & Scheduling", icon: "paint", tags: ["Graphics"] },
    { label: "Platform Automations", icon: "zap", tags: ["Automations"] },
    { label: "Outreach Generators", icon: "upload", tags: ["Outreach"] },
    { label: "Lead Generation", icon: "target", tags: ["Lead Gen"] },
    { label: "Proposals & Contracts", icon: "file-text", tags: ["Proposals", "Contracts"] },
    { label: "Sales", icon: "dollar", tags: ["Sales"] },
    { label: "SEO & Blogging", icon: "globe", tags: ["Blogging", "GEO"] },
  ];

  const q = search.toLowerCase().trim();

  // Pool of prompts after category filter
  const catPrompts = activeCategory
    ? prompts.filter(p => { const g = GROUPS.find(g => g.label === activeCategory); return g ? g.tags.includes(p.tag) : true; })
    : prompts;

  // Further filter by search
  const searchFiltered = q
    ? catPrompts.filter(p => p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q))
    : null;

  // Groups to render in browse mode
  const visibleGroups = activeCategory ? GROUPS.filter(g => g.label === activeCategory) : GROUPS;

  return (
    <div className="space-y-5">
      <SectionHeader label="Prompt Library" title="Copy. Paste. Fill in the blanks. Done." sub="Every prompt you need to create client work. Swap out the bracketed parts with client details. Never write from scratch." />

      {/* Category nav */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-xl text-[10px] tracking-wider uppercase transition-all"
            style={{ fontFamily: FONT_LUXE, background: !activeCategory ? "var(--ink)" : "rgba(255,255,255,0.65)", color: !activeCategory ? "var(--gold)" : "rgba(30,15,10,0.5)", border: !activeCategory ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)" }}
          >
            All Prompts
          </button>
          {GROUPS.map(g => {
            const count = prompts.filter(p => g.tags.includes(p.tag)).length;
            const active = activeCategory === g.label;
            return (
              <button
                key={g.label}
                onClick={() => { setActiveCategory(active ? null : g.label); setSearch(""); }}
                className="px-4 py-2 rounded-xl text-[10px] tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5"
                style={{ fontFamily: FONT_LUXE, background: active ? "var(--ink)" : "rgba(255,255,255,0.65)", color: active ? "var(--gold)" : "rgba(30,15,10,0.5)", border: active ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)" }}
              >
                <SvgIcon id={g.icon} size={14} />
                <span>{g.label}</span>
                <span className="opacity-50">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder={activeCategory ? `Search in ${activeCategory}...` : "Search all prompts by title, tag, or keyword..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl px-5 py-3 focus:outline-none text-sm"
          style={{ fontFamily: FONT_BODY, color: "var(--ink)", background: "rgba(255,255,255,0.88)", border: "1px solid rgba(200,168,100,0.3)", paddingLeft: "2.75rem" }}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.45 }}><SvgIcon id="search" size={15} /></span>
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>Clear</button>
        )}
      </div>

      {searchFiltered ? (
        <div>
          <p className="mb-4" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>
            {searchFiltered.length} result{searchFiltered.length !== 1 ? "s" : ""}{activeCategory ? ` in ${activeCategory}` : ""} for &ldquo;{search}&rdquo;
          </p>
          {searchFiltered.length === 0 ? (
            <div className="text-center py-14 rounded-2xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px dashed rgba(200,168,100,0.3)" }}>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "rgba(30,15,10,0.35)", fontStyle: "italic" }}>No prompts found.</p>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.3)" }}>Try a different keyword or clear the search.</p>
            </div>
          ) : (
            <div className="space-y-4">{searchFiltered.map(p => <PromptCard key={p.title} {...p} />)}</div>
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {visibleGroups.map(g => {
            const gp = prompts.filter(p => g.tags.includes(p.tag));
            if (!gp.length) return null;
            return (
              <div key={g.label}>
                <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.2)" }}>
                  <SvgIcon id={g.icon} size={18} />
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)", fontWeight: 400 }}>{g.label}</h3>
                  <span className="px-2 py-0.5 rounded-full" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", background: "rgba(200,168,100,0.12)", color: "var(--gold)" }}>{gp.length} prompt{gp.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-4">
                  {gp.map(p => <PromptCard key={p.title} {...p} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Service Tiers ───────────────────────────────────── */
function ServiceTiers() {
  const tiers = [
    {
      label: "Starter",
      price: "$1,000/mo",
      setup: "$500 one-time setup",
      tag: "Start here",
      tagColor: "var(--gold)",
      items: [
        "1 platform fully managed — nothing to post, nothing to schedule",
        "AI clone or custom brand character — content that sounds like you, without filming",
        "Reels, carousels & static posts — 3x per week (12 posts/mo)",
        "Comment keyword triggers — auto-DM lead magnet when they comment a word",
        "DM automation — every inquiry gets an instant reply that guides them to book or buy",
        "Online booking system — clients book directly from the page",
        "Lead funnels & automations that turn followers into booked appointments",
        "Missed call text back — auto-texts anyone who calls and doesn't get answered",
      ],
      note: "Best starting point. Gets the client online, consistent, and converting. Build trust here, then upgrade.",
    },
    {
      label: "Growth",
      price: "$2,500/mo",
      setup: "$500 one-time setup",
      tag: "Most popular",
      tagColor: "var(--rose)",
      items: [
        "Everything in Starter — AI clone content now running across 3 platforms: Instagram, TikTok & Facebook",
        "Paid ads — Facebook & Instagram ad management included",
        "Email & SMS automations that follow up with every lead while you sleep",
        "Automated appointment reminders — reduce no-shows before they happen",
        "Reputation & review management — 5-star presence built on autopilot",
        "More content, more reach — 3–5x per week (up to 20 posts/mo)",
        "Monthly strategy call to double down on what's working",
      ],
      note: "Best for clients who want to scale. The ads + AI clone content combo is what drives real consistent inbound.",
    },
    {
      label: "Elite",
      price: "$5,000+/mo",
      setup: "$500 one-time setup",
      tag: "Full system",
      tagColor: "#4a7a4a",
      items: [
        "Everything in Growth — expanded to 5 platforms: Instagram, TikTok, Facebook, LinkedIn & Threads",
        "AI voice agent — answers calls, handles inquiries & books appointments 24/7",
        "Full AI booking system — chat, reminders, follow-up & review collection automated",
        "AI website design & build — a complete conversion-ready site done for you",
        "Google, Facebook, Instagram & TikTok ad management — all platforms, fully managed",
        "Daily content — 5–7x per week (up to 28 posts/mo) across every platform",
        "Monthly email newsletter — written, designed & sent for you",
        "Bi-weekly strategy calls & weekly performance reports",
      ],
      note: "For high-LTV clients who want their entire online presence fully managed. Goal: 5 Elite clients = $25,000+/mo.",
    },
  ];

  return (
    <div className="space-y-5 mb-10">
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Service Packages</p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1.1 }}>What We Offer</h2>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.55)" }}>Three plans — same as the main website. Every plan starts at $1,000/mo and includes the AI clone. All plans have a $500 one-time setup fee. Use the 14-day free trial to close clients who are on the fence.</p>
      </div>

      {/* Free Trial Banner */}
      <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: "linear-gradient(135deg, var(--ink) 0%, #2a1a10 100%)", border: "1px solid rgba(200,168,100,0.3)" }}>
        <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>🎁</span>
        <div>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "4px" }}>Lead Closer</p>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--cream)", fontWeight: 400 }}>14-Day Free Trial — available on any plan</p>
          <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.65)", lineHeight: 1.65 }}>
            When someone is unsure, offer the 14-day free trial. Full service, no monthly commitment yet. The $500 setup fee is still paid upfront — this protects our time and shows they're serious. After 14 days they move to the monthly plan automatically.
          </p>
        </div>
      </div>

      {tiers.map((t) => (
        <div key={t.label} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: t.tagColor, color: "#fff" }}>{t.tag}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--ink)" }}>{t.label}</span>
            </div>
            <div className="text-right">
              <span className="italic block" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--gold)" }}>{t.price}</span>
              <span style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>{t.setup}</span>
            </div>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-2 mb-4">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "12px", height: "12px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.8)" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "rgba(30,15,10,0.5)" }}>{t.note}</p>
          </div>
        </div>
      ))}

      <div className="rounded-2xl p-5" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Upgrade Path</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(250,243,234,0.75)", lineHeight: 1.7 }}>
          Start most clients on Starter. Once they see real results — usually 30–60 days — bring up Growth or Elite. Never push an upgrade before they've seen the win. The AI clone and content system sells itself once it's running.
        </p>
      </div>
    </div>
  );
}

/* ─── Script Card ─────────────────────────────────────── */
type SLine = { type: "send" | "if_say" | "you_say" | "note" | "subhead" | "warn"; label?: string; text: string };
function ScriptCard({ step, title, tag, lines }: { step?: string; title: string; tag?: string; lines: SLine[] }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
      <div className="px-6 py-4 flex items-center gap-3 flex-wrap" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
        {step && <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase shrink-0" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>{step}</span>}
        {tag && <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.18)", color: "#9a7a3a" }}>{tag}</span>}
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--ink)" }}>{title}</h3>
      </div>
      <div className="px-6 py-5 space-y-3">
        {lines.map((l, i) => {
          if (l.type === "send") return (
            <div key={i} className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
              <p className="mb-2.5" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>{l.label ?? "Send this"}</p>
              <p className="whitespace-pre-line leading-relaxed" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", fontStyle: "italic" }}>{l.text}</p>
            </div>
          );
          if (l.type === "if_say") return (
            <div key={i} className="flex items-baseline gap-2 pt-1 flex-wrap">
              <span className="shrink-0" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rose)" }}>If they say:</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.6)", fontStyle: "italic" }}>"{l.text}"</span>
            </div>
          );
          if (l.type === "you_say") return (
            <div key={i} className="rounded-xl p-4 ml-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
              <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>You say</p>
              <p className="whitespace-pre-line leading-relaxed" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)", fontStyle: "italic" }}>{l.text}</p>
            </div>
          );
          if (l.type === "note") return (
            <p key={i} style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.7 }}>{l.text}</p>
          );
          if (l.type === "subhead") return (
            <p key={i} style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", borderTop: "1px solid rgba(200,168,100,0.18)", paddingTop: "12px", marginTop: "8px" }}>{l.text}</p>
          );
          if (l.type === "warn") return (
            <div key={i} className="rounded-xl p-4" style={{ background: "rgba(201,122,122,0.07)", border: "1px solid rgba(201,122,122,0.2)" }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(150,40,40,0.85)", lineHeight: 1.65 }}>{l.text}</p>
            </div>
          );
          return null;
        })}
      </div>
    </div>
  );
}

/* ─── Tab: Outreach ───────────────────────────────────── */
function OutreachTab() {
  const [section, setSection] = useState<"blueprint"|"aipitch"|"cold"|"salescall"|"objections"|"referral"|"mascot">("blueprint");
  const _scripts = [
    {
      title: "Cold Email — Local Business",
      tag: "Email",
      prompt: `Subject: quick question about [BUSINESS NAME]'s social

Hi [FIRST NAME],

I was looking at [BUSINESS NAME] online and noticed you're doing [SOMETHING POSITIVE — e.g., "great work in the [industry] space"] — but your social media presence doesn't seem to match the quality of what you actually offer.

I run The Dollhouse Brand Studio. We handle done-for-you social media for small businesses — content creation, posting, ads, all of it — so you don't have to think about it.

I'd love to put together a quick look at what we'd do for you specifically. No pitch deck, no pressure — just a 15-minute call to see if it's even a fit.

Would [DAY] or [DAY] this week work for you?

— Mandy
The Dollhouse Brand Studio
shopdollhouse.co`,
    },
    {
      title: "Cold Email — E-Commerce Brand",
      tag: "Email",
      prompt: `Subject: your content could be converting more

Hi [FIRST NAME],

I came across [BRAND NAME] and love what you're selling — but I noticed your social content isn't doing the heavy lifting it could be for a brand at your level.

At The Dollhouse Brand Studio, we specialize in social media and paid ads for product-based businesses. We've helped brands go from inconsistent posting to a full content engine running every day — without the owner touching it.

If you're open to it, I'd love to share what that could look like for [BRAND NAME] specifically. 15 minutes, no obligation.

Here's my calendar: [LINK]

— Mandy Fortune
The Dollhouse Brand Studio`,
    },
    {
      title: "Cold DM — Instagram",
      tag: "DM",
      prompt: `Hey [NAME] 👋

Love what you're doing with [BUSINESS NAME] — [specific genuine compliment about their product/service/brand].

Quick question: are you handling your own social content right now, or do you have someone helping you?

I run a done-for-you social media studio and I had a couple ideas for your page that I think could really perform. Happy to share them — no strings attached.`,
    },
    {
      title: "DM Follow-Up (No Response After 3 Days)",
      tag: "DM",
      prompt: `Hey [NAME] — just wanted to bump this up in case it got buried!

No worries if now isn't the right time. I just genuinely think there's an opportunity here for [BUSINESS NAME] and wanted to make sure you saw it.

If you're curious, I'm happy to do a free quick audit of your current social media and share what I'd change. Totally free, no pitch.

Just reply "audit" and I'll get it to you. 🙂`,
    },
    {
      title: "Cold Call Script",
      tag: "Phone",
      prompt: `[WHEN THEY PICK UP]

"Hi, is this [NAME]? Hey — this is Mandy calling from The Dollhouse Brand Studio. I know this is a bit out of the blue — do you have like 90 seconds?"

[IF YES]

"Perfect. So I was doing some research on [INDUSTRY] businesses in [AREA / NICHE] and came across [BUSINESS NAME]. You're doing [GENUINE COMPLIMENT].

I reach out to businesses like yours specifically because a lot of times the social media side doesn't match the quality of what they're actually doing — and that's leaving money on the table.

We handle everything for you — content, posting, ads — so you can focus on running the business.

Is that something that's on your radar at all, or are you already handled on that front?"

[IF INTERESTED]
"Awesome. I'd love to set up a quick 15-minute call — I can show you exactly what I'd do for your business specifically. What does your schedule look like this week?"

[IF NOT INTERESTED]
"Totally fair. Can I ask — is it a timing thing or is social media just not a priority right now?" [LISTEN — often opens a door]

[IF GOES TO VOICEMAIL]
"Hey [NAME], this is Mandy from The Dollhouse Brand Studio. I had a few ideas specifically for [BUSINESS NAME]'s social media that I think you'd find valuable. I'll send you a quick email too — talk soon."`,
    },
    {
      title: "Follow-Up Email Sequence (After No Response)",
      tag: "Email",
      prompt: `--- EMAIL 2 (3 days after first email) ---

Subject: Re: quick question about [BUSINESS NAME]'s social

Hi [NAME],

Just bumping this up — I know inboxes get busy.

I actually put together a few quick ideas for [BUSINESS NAME] based on what I can see from your current pages. Happy to send them over — no strings, just genuine ideas.

Worth a 15-minute call?

— Mandy

---

EMAIL 3 (5 days after email 2) ---

Subject: last one from me

Hi [NAME],

I don't want to be that person who emails five times — so this is my last one.

If now isn't the right time for [BUSINESS NAME], I completely understand. But if things change and social media / content becomes something you want handled, I'd love to be the first call you make.

Wishing you a great [MONTH] regardless.

— Mandy
The Dollhouse Brand Studio
shopdollhouse.co`,
    },
    {
      title: "Full Service Pitch — What to Say on a Discovery Call",
      tag: "Sales",
      prompt: `Use this as your talking track when a prospect is on the phone or on a call. Customize to their business.

---

"So here's exactly what working with us looks like:

First, we handle all your content — we create the graphics, write every caption, add the hashtags. You don't touch any of it.

Then we schedule everything directly to your Instagram, Facebook, [TikTok / Google Business / wherever they're active]. One month of posts, fully planned and queued up. Done.

But here's the part most social media agencies don't offer: we also set up an automation so that any time someone comments on one of your posts, they automatically get a DM from your account within seconds. So instead of those comments just sitting there, we're turning them into conversations — and conversations into booked appointments.

And every month we send you a report so you can see exactly what's working — reach, engagement, what content your audience loved — so we keep getting smarter about your strategy.

All of this, done for you, every single month.

We charge $[PRICE]/month. There's a 6-month minimum to start — that's how long it takes to build the momentum and really see results. You can also lock in 12 months for 10% off. But what I can tell you is that the businesses we work with stay because they see it working.

Does that sound like something that would take a load off your plate?"

Pricing — start high, work down only if needed:
- Starter: $1,000/mo + $500 one-time setup (1 platform, AI clone, automations)
- Growth: $2,500/mo + $500 one-time setup (3 platforms, ads, email/SMS automations)
- Elite: $5,000+/mo + $500 one-time setup (5 platforms, AI voice agent, full system)

If they hesitate on price: "We do offer a 14-day free trial. The $500 setup still applies so we can build everything out — but the first two weeks are on us so you can see the results before committing."`,
    },
    {
      title: "Referral Ask (Existing Client)",
      tag: "Retention",
      prompt: `Hey [CLIENT NAME],

Loving working with you on [BUSINESS NAME] — seeing [SPECIFIC WIN, e.g., "that reach spike last month"] was a great moment.

Quick ask: if you know any other business owners who are struggling with their social media or just don't have time for it, I'd love an introduction. I'm selectively taking on a few new clients this month and a referral from you carries a lot of weight.

If you send someone my way who signs, I'll give you [INCENTIVE — e.g., "a free month of reporting" or "$50 credit on your next invoice"].

No pressure at all — just thought I'd ask. 😊

Thanks again for trusting me with [BUSINESS NAME].

— Mandy`,
    },
  ];

  const sections: { id: typeof section; label: string; icon: string; sub: string }[] = [
    { id: "blueprint",  icon: "map",        label: "The Blueprint",      sub: "Strategy, mindset, the numbers game" },
    { id: "aipitch",   icon: "bot",         label: "AI Clone Pitch",     sub: "Our lead strategy — start here" },
    { id: "cold",      icon: "send",        label: "Cold Outreach",      sub: "DM, email, and call scripts" },
    { id: "salescall", icon: "phone",       label: "The Sales Call",     sub: "CLOSER, discovery call, pitch deck" },
    { id: "objections",icon: "shield",      label: "Objections & Close", sub: "Handle pushback and close the deal" },
    { id: "referral",  icon: "handshake",   label: "Referrals",          sub: "Turn clients into your best leads" },
    { id: "mascot",    icon: "masks",       label: "Mascot Strategy",    sub: "AI character hook — full workflow" },
  ];

  return (
    <div className="space-y-6">
      <ServiceTiers />
      <SectionHeader label="Outreach Scripts" title="How to get clients." sub="Follow these steps in order. Each section is its own guide. Start with the Blueprint, lead with the AI Clone, and work your way through from there." />

      {/* Sub-navigation */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max">
          {sections.map(s => {
            const active = section === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className="flex flex-col items-start px-4 py-3 rounded-2xl transition-all text-left"
                style={{ background: active ? "var(--ink)" : "rgba(255,255,255,0.65)", border: active ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)", minWidth: "140px" }}
              >
                <span style={{ lineHeight: 1, marginBottom: "4px" }}><SvgIcon id={s.icon} size={18} /></span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "var(--gold)" : "var(--ink)", fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: "0.68rem", color: active ? "rgba(250,243,234,0.5)" : "rgba(30,15,10,0.38)", marginTop: "2px", lineHeight: 1.3 }}>{s.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Blueprint ─────────────────────────────────── */}
      {section === "blueprint" && <>
      <SectionHeader label="Step 0 — Before You Start" title="The Blueprint." sub="Know the numbers and the mindset before you send a single message." />
      {/* Numbers Game */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Blueprint — It's a Numbers Game</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { num: "400", label: "Potential clients to reach" },
            { num: "4×", label: "Follow-ups per contact" },
            { num: "20", label: "Conversations you'll have" },
            { num: "2", label: "Will become paying clients" },
          ].map(({ num, label }) => (
            <div key={num} className="rounded-xl p-4 text-center" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.2)" }}>
              <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--gold)", lineHeight: 1 }}>{num}</p>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(250,243,234,0.6)" }}>{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.5)" }}>
          Don't overthink it. Even if most businesses don't respond — it's okay. There are a lot of businesses. Volume beats hesitation every time. Use DMs and emails so you can do it fast.
        </p>
      </div>

      {/* Golden Rules */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Read Before You Send Anything</p>
        <h3 className="mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>The 5 Golden Rules</h3>
        <div className="space-y-3">
          {[
            { n: "1", text: "Never pitch on the first message. Create curiosity. The goal of message one is just to get message two." },
            { n: "2", text: "Professional flirting — pull, don't push. You are offering something genuinely amazing. Go in with confidence, not desperation." },
            { n: "3", text: "Research before you reach out. Know their name, niche, and one specific thing about their social media. Generic messages get ignored instantly." },
            { n: "4", text: "Price comes last — always. Reveal the monthly rate only after they've seen the AI clone and said yes to the trial. The wow moment does the selling." },
            { n: "5", text: "Follow up 4 times minimum. Most closes happen on the 3rd or 4th touch. Most people quit after one. Don't be most people." },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.25)" }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
              </div>
              <p className="leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.75)", lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Activity Targets */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Daily Outreach Targets</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>What to Do Every Single Day</h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { value: "10–15", label: "New outreach sent", sub: "DMs, emails, or calls" },
              { value: "5–10",  label: "Follow-ups sent",   sub: "People who haven't replied yet" },
              { value: "15–20", label: "Leads researched",  sub: "Added to your pipeline" },
              { value: "7–14",  label: "Days to close",     sub: "Average from first touch to signed" },
            ].map(({ value, label, sub }) => (
              <div key={label} className="rounded-xl p-4 text-center" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.15)" }}>
                <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.9rem", color: "var(--rose)", lineHeight: 1 }}>{value}</p>
                <p className="mt-1" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{label}</p>
                <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.73rem", color: "rgba(30,15,10,0.4)" }}>{sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.7 }}>
            These are targets, not rules. Some days you'll do less — that's fine. The key is consistency over perfection. One solid week of outreach beats one massive day every time. Build the habit first, scale the numbers later.
          </p>
        </div>
      </div>

      {/* Which strategy to lead with */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Which Strategy to Lead With</p>
        <div className="space-y-2">
          {[
            { trigger: "They have a face or personal brand",              lead: "AI Clone Pitch — make an AI version of them" },
            { trigger: "They're a business with a mascot or character",   lead: "AI Clone Pitch — use the character instead" },
            { trigger: "They're already running Google or Facebook ads",  lead: "Lead Gen approach — they're already paying to grow" },
            { trigger: "You've visited their location or ordered from them", lead: "Compliment approach — warmest and most disarming open" },
            { trigger: "You have their email from a directory or listing", lead: "Cold Email 3-Part Sequence" },
          ].map(({ trigger, lead }) => (
            <div key={trigger} className="flex gap-3 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,168,100,0.12)" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "11px", height: "11px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
              <div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.7)", lineHeight: 1.4 }}>{trigger}</p>
                <p className="mt-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>→ {lead}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Maps Prospecting Method */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Find Prospects in 5 Minutes</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>The Google Maps Method</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            You don't need a paid lead tool to find prospects. Google Maps alone can fill your pipeline for months. Here's how to do it in under 10 minutes.
          </p>
          <div className="space-y-2">
            {[
              { n: "1", text: `Open Google Maps and search: "[NICHE] near [CITY]" — e.g. "dentists in Calgary" or "plumbers in Toronto"` },
              { n: "2", text: "Click any result and find their social media link on the Google Business Profile or their website" },
              { n: "3", text: "Look for these red flags: fewer than 200 followers, last post was 4+ weeks ago, no profile photo, bad quality graphics, generic captions" },
              { n: "4", text: "That business is your prospect. They already know they need help — they just haven't found the right person yet" },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-3 rounded-xl p-3" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.1)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)" }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.82rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.72)", lineHeight: 1.55 }}>{text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.18)" }}>
            <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What to look for before you reach out</p>
            <div className="grid sm:grid-cols-3 gap-2">
              {[
                { label: "Are they active?", check: "Check reviews, website, Google listing — are they actually open and operating?" },
                { label: "Budget signals?", check: "Nice location, premium service, running any ads, website looks like money was spent?" },
                { label: "AI clone potential?", check: "Does the owner have a face or personal brand? Mascot or character? Or is it fully logo-based?" },
              ].map(({ label, check }) => (
                <div key={label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,100,0.1)" }}>
                  <p className="mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{label}</p>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.5 }}>{check}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background: "var(--ink)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "var(--cream)", fontStyle: "italic", lineHeight: 1.55 }}>
              Volume tip: use the "Lead Gen Research" prompt in the Prompts tab to generate 25 qualified prospects for any niche + city in one AI prompt. Run it once and you'll have a full week of outreach ready to go.
            </p>
          </div>
        </div>
      </div>

      </>}

      {/* ── Sales Call ─────────────────────────────────── */}
      {section === "salescall" && <>
      <SectionHeader label="Step 4 — The Sales Call" title="Run the call like a pro." sub="Use the CLOSER method to guide every call. Present your proposal, then ask for the close. In that order, every time." />
      {/* CLOSER Framework */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Sales Call Framework</p>
        <h3 className="mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>The CLOSER Method</h3>
        <div className="space-y-4">
          {[
            { letter: "C", word: "Clarify the Pain", body: `Ask: "What's your biggest problem right now? Missed calls? No-shows? Not enough leads?" Get them talking. The more they share, the better you can tailor what you say.` },
            { letter: "L", word: "Label Them as a Fit", body: `Show them you were listening. Repeat their pain back to them: "So if I'm hearing you right, the main issue is missed calls and you're losing jobs because of it?"` },
            { letter: "O", word: "Outline Your Solution", body: `Connect the dots to what you offer: "That's exactly why we set up a missed-call text-back system. Every time a call is missed, the customer gets a text instantly — you never lose a lead again."` },
            { letter: "S", word: "Share a Case Study", body: `Back it up with a real result. Even one example works: "We set this up for another [NICHE] business and they booked [X] new clients in the first month."` },
            { letter: "E", word: "Explain the Offer", body: `Show them the 3 pricing tiers. Always start with the highest tier first — it anchors the value. Only go down if needed. Never open with the cheapest option.` },
            { letter: "R", word: "Request the Sale", body: `Don't leave the call open. Ask directly: "Do you want to get started today?" Then stop talking. Let them answer. Silence is not yours to fill.` },
          ].map(({ letter, word, body }) => (
            <div key={letter} className="flex gap-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)" }}>
                <span className="italic font-bold" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--gold)" }}>{letter}</span>
              </div>
              <div>
                <p className="font-medium" style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{word}</p>
                <p className="mt-0.5 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)" }}>On every call: focus on learning about their business. Understand what they need. Help them see the solution. You're a consultant, not a salesperson.</p>
        </div>
      </div>

      {/* Pricing Spectrum */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Our Packages — Know These Cold</p>
        <h3 className="mb-2" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>Dollhouse Pricing</h3>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.6 }}>Always start by presenting Elite. Work your way down only if needed. All packages include a $500 one-time setup fee — never waived. Present the free trial after they say yes to a package, not before.</p>
        <div className="space-y-3">
          {[
            {
              range: "$5,000+/mo", label: "Elite", color: "#7b68ee",
              items: ["Full-service across 5 platforms (Instagram, TikTok, Facebook, YouTube, LinkedIn)", "AI brand clone + AI voice agent for inbound inquiries", "Full paid ad management — Meta + Google", "20–30 posts/month + email and SMS campaigns", "Dedicated account manager, weekly production, monthly strategy meeting"],
            },
            {
              range: "$2,500/mo", label: "Growth", color: "#c97a7a",
              items: ["Everything in Starter — expanded to 3 platforms", "Paid ad management — Facebook and Instagram ads included", "Email and SMS automation sequences for lead follow-up", "18 posts/month across platforms", "Full CRM pipeline setup and monthly strategy call"],
            },
            {
              range: "$1,000/mo", label: "Starter", color: "var(--gold)",
              items: ["1 platform fully managed — content, captions, scheduling", "AI brand clone built out in their voice", "12 posts/month (Reels, carousels, static mix)", "Comment keyword trigger + auto-DM + missed call text-back", "Monthly performance report with plain-English breakdown"],
            },
          ].map(({ range, label, color, items }) => (
            <div key={label} className="flex gap-4 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <div className="shrink-0 w-20 text-center">
                <p className="font-bold" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color }}>{range}</p>
                <p className="mt-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>{label}</p>
              </div>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "10px", height: "10px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.7)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pitch Deck Guide */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 3 in the Sales Process</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>The Pitch Deck</h3>
        </div>
        <div className="px-6 py-6 space-y-5">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
            After the discovery call, send a pitch deck before asking for the close. It shows you're professional, takes away hesitation, and gives them something real to look at. Keep it under 15 slides. It should feel like a proposal, not a big formal presentation.
          </p>

          <div>
            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What your deck must include</p>
            <div className="space-y-2">
              {[
                { n: "1", title: "Introduction", body: "Who you are, what you do, and why you do it. Keep it personal — 1 slide." },
                { n: "2", title: "Their Problem", body: "Restate their pain points in their own words (from what they told you on the call). This shows you actually listened." },
                { n: "3", title: "Your Solution", body: "Software + service together. Show them it's not just posts — it's a full system running for their business." },
                { n: "4", title: "Case Study or Testimonials", body: "Real results with real numbers. Even one example from an early client or your own brand counts." },
                { n: "5", title: "The Package They Chose", body: "Outline the specific tier — what's included, what's not. Be clear. Vague proposals lose deals." },
                { n: "6", title: "Pricing", body: "Monthly fee, any one-time setup fee, and payment terms. No surprises." },
                { n: "7", title: "Clear Next Steps", body: "Step 1 / Step 2 / Step 3 — what happens after they say yes. Make it easy to move forward." },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-4 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)" }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.85rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{title}</p>
                    <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.6)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "var(--ink)" }}>
            <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", lineHeight: 1.5 }}>
              Use the "Pitch Deck Builder" prompt in the Content Prompts tab to generate a complete customized deck for any prospect in minutes.
            </p>
          </div>
        </div>
      </div>

      </>}

      {/* ── AI Clone Pitch ─────────────────────────────── */}
      {section === "aipitch" && <>
      <SectionHeader label="Step 1 — Always Lead With This" title="The AI Clone Pitch." sub="This is our main strategy. Every outreach starts here. Be professionally curious. The goal of each message is to get the next one. Price comes last — always." />

      {/* Mindset card */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Before You Reach Out to Anyone — Read This First</p>
        <div className="space-y-3">
          {[
            { n: "1", text: "You are not bothering anyone. You're offering something that could genuinely help their business. Go in with complete confidence." },
            { n: "2", text: "Think of every outreach as professional flirting. Your job is to create curiosity and desire — not to close them on the first message. Pull, don't push." },
            { n: "3", text: "The goal of the first message is to get a reply. The goal of the reply is to get a meeting. The goal of the meeting is to blow their mind. The close comes after that — in that order." },
            { n: "4", text: "Never reveal the price until after they've already fallen in love with what you do. The AI Clone changes everything — let the wow moment do the selling." },
            { n: "5", text: "Research before you message. Know their business name, what they sell, and one specific thing about their current social media before you send a single word." },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(200,168,100,0.15)", border: "1px solid rgba(200,168,100,0.3)" }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
              </div>
              <p className="leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(250,243,234,0.75)", lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <ScriptCard
        step="Primary Strategy — Always Lead With This"
        title="The AI Clone Pitch — Full Funnel"
        tag="DM · Email · Meeting · Proposal · Close"
        lines={[
          { type: "note", text: "This is our #1 lead strategy. The entire funnel is built around one idea: show them something they've never seen before, and let the wow moment close the deal. Never pitch the price until they're already in love. Professional flirting — every touch has one goal: get to the next touch." },
          { type: "subhead", text: "Touch 1 — Create Curiosity (DM or Email)" },
          { type: "note", text: "Research the business first. Find their name, their niche, their city, whether they have a face or a brand character. Then send this. Short, specific, human. No dashes, no brackets, no pitch." },
          { type: "send", label: "DM — Instagram / Facebook / TikTok", text: "Hey [NAME] 👀\n\nWe made an AI version of you for [BUSINESS NAME]. It posts content for your business automatically every week and you never have to film anything.\n\nWould you want to see it?" },
          { type: "note", text: "If they have a mascot or character: swap 'an AI version of you' with 'an AI version of [MASCOT NAME] for [BUSINESS NAME].' Same energy, same message." },
          { type: "send", label: "Email Version", text: "Subject: we made an AI version of you for [BUSINESS NAME]\n\nHi [FIRST NAME],\n\nWe actually built an AI version of you for [BUSINESS NAME]. It posts video content to your social media every week automatically. You never have to film anything or show up on camera.\n\nWould you want to see what it looks like?\n\nMandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "note", text: "Short, human, direct. Reads like a real person sent it. That's the goal." },
          { type: "subhead", text: "Touch 2 — When They Say Yes (Get the Meeting)" },
          { type: "note", text: "Their reply is the green light. Now your only goal is to get them on a 10 minute call or meet in person. Still no pitch. Still no price." },
          { type: "if_say", text: "Yes! / Wait, what? / How did you do that? / I want to see it!" },
          { type: "you_say", text: "So glad you're curious! It honestly looks way better in person than over text. Can we grab 10 minutes on Zoom? I'll show you exactly what it looks like and you can tell me what you think." },
          { type: "you_say", label: "If they're local", text: "So glad you're curious! Are you in [CITY]? I can swing by for 10 minutes and show you in person. You're going to love it." },
          { type: "warn", text: "Do NOT send the AI Clone video in the DM or email. The reveal happens face to face. That is where the magic lands. Get the meeting first." },
          { type: "if_say", text: "Can you just tell me what it is? / What kind of thing did you make?" },
          { type: "you_say", text: "It's an AI video of you that we created for [BUSINESS NAME]. It honestly won't do it justice over text though. Can we do 10 minutes on Zoom so you can actually see it?" },
          { type: "subhead", text: "Touch 3 — The Meeting (Before They Arrive)" },
          { type: "note", text: "Before the call: Make the AI Clone. Use their best photo or headshot (from their website, social media, or Google). If they have a mascot or character — use that. Build a short 15–30 second AI video using your video tool. Have the proposal ready — customized for their business." },
          { type: "note", text: "Note: Them saying 'yes' to the meeting is their consent to seeing the AI version of them. If they later want to use it, they'll sign the contract which covers image rights. You don't need to ask permission to build it beforehand — you're building it as a demo." },
          { type: "subhead", text: "Touch 3 — The Meeting (What to Say)" },
          { type: "send", label: "How to open — say exactly this", text: "Thanks for making time — I'm going to keep this super short. I just want you to see something first, and then you can tell me what you think. Here it is.\n\n[PLAY THE AI CLONE VIDEO — share your screen or show your phone]" },
          { type: "note", text: "Then stop talking. Let them watch the entire video. Let the reaction happen. Don't fill the silence. Their face will tell you everything." },
          { type: "if_say", text: "Oh wow... / Wait, that's me?! / How did you do that? / This is incredible" },
          { type: "you_say", text: "That's your AI clone — a digital version of you [or your brand character]. We make one of these every week for [BUSINESS NAME]. It posts on your social media, promotes your services, answers FAQs — whatever we script for it. You never have to film anything, plan anything, or think about content again.\n\nI actually put together a proposal for [BUSINESS NAME] specifically. Would you want to take a look?" },
          { type: "note", text: "Show the proposal now. Walk through it page by page. Let them ask questions. Don't rush. This is where they go from 'wow' to 'I want this.'" },
          { type: "subhead", text: "Touch 4 — The Trial Close (Not the Price Close)" },
          { type: "note", text: "After they've seen the clone and the proposal — offer the trial. This is your close. Don't ask them to commit to a year or even a month yet. Just ask: want to try it?" },
          { type: "send", label: "How to introduce the trial", text: "Here's what I'd love to do — rather than asking you to commit right now, I want to offer you a 14-day free trial. We run everything for [BUSINESS NAME] — the AI clone content, the automations, everything you just saw — for two weeks. You see real results before you decide anything.\n\nThe only thing upfront is a one-time $500 setup fee. That covers building everything out for your specific business. The first two weeks are completely on us.\n\nDoes that feel like something worth trying?" },
          { type: "if_say", text: "Yeah, that sounds good / I'd like to try it / Let's do it" },
          { type: "you_say", text: "Amazing — I'm so excited for you to see this running for [BUSINESS NAME]. So the monthly investment going forward is $1,000 a month — and since you're starting with the trial, all you pay today is the $500 setup fee. First two weeks are free. After that, if you love it — and you will — we just continue into monthly. Sound good?\n\n[Send the invoice for $500 and the agreement]" },
          { type: "warn", text: "PRICE ORDER MATTERS: You reveal the monthly price ($1,000) only AFTER they've already agreed to try the trial. They're already emotionally in — the $1k feels reasonable after the wow moment and the free trial. Never lead with price. Ever." },
          { type: "subhead", text: "If They Ask Price Before You're Ready to Tell Them" },
          { type: "if_say", text: "How much is it? / What does it cost? / What's the monthly?" },
          { type: "you_say", text: "I'd rather show you what you're getting first — the price makes a lot more sense after you actually see it. Can we do the 10 minutes on Zoom?" },
          { type: "note", text: "If they absolutely won't meet without knowing: 'Packages start at $1,000/mo — but I'd love to show you what that includes before you make any decisions. The meeting is what sells it, not me telling you.'" },
          { type: "subhead", text: "After They Sign — Getting Them on Monthly Retainer" },
          { type: "note", text: "The trial is 14 days. On day 10–12, send this — before the trial ends. Don't wait for them to bring it up." },
          { type: "send", label: "Day 10–12 of the trial — send this check-in", text: "Hey [NAME] 😊\n\nWe're about halfway through your trial and I just looked at [BUSINESS NAME]'s numbers — [SHARE A SPECIFIC RESULT, e.g., 'your reel hit 2.3k views' or 'we got 4 new inquiries through the automation'].\n\nI'd love to keep this going for you. To continue after the 14 days, it's just $1,000/mo. We start with a 6-month minimum — you'll see real results within the first 90 days, and months 4 through 6 are where it really compounds. After your 6 months you can stay month-to-month or lock in 12 months for 10% off.\n\nShould I send over the agreement and first invoice?" },
          { type: "note", text: "They've been watching it work for 10 days. They don't want to stop. The retainer sell is easy from here — they're already sold." },
        ]}
      />

      {/* AI Clone Video Script Templates */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Build Before the Meeting</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>AI Clone Video Script Templates</h3>
        </div>
        <div className="px-6 py-5 space-y-5">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            Build the AI clone before you get on the call — not after. Use a clear headshot or photo from their website, Instagram, or Google Business profile. Then write the script below and generate the video using your AI video tool. The reveal is the close. Keep it under 30 seconds.
          </p>

          <div>
            <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Script Structure — Every Clone Uses This</p>
            <div className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
              <div className="space-y-3">
                {[
                  { t: "Hook (0–3 sec)",    body: "One bold sentence about what they do or who they help. Make it specific to their business." },
                  { t: "Value (3–18 sec)",  body: "2–3 sentences about what they offer and why it matters. Write in their voice — casual, confident, professional, whatever matches their brand." },
                  { t: "CTA (18–25 sec)",   body: "One clear action. Book a call, visit the website, DM us, call us. That's it." },
                ].map(({ t, body }) => (
                  <div key={t} className="flex gap-3">
                    <div className="shrink-0 px-2 py-0.5 rounded-md" style={{ background: "rgba(200,168,100,0.2)", height: "fit-content", marginTop: "2px" }}>
                      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", whiteSpace: "nowrap" }}>{t}</p>
                    </div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.65)", lineHeight: 1.6 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[9px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Example Scripts by Niche — Customize These</p>
            {[
              {
                niche: "Lawyer / Law Firm",
                script: `"If you've been in an accident and you don't know where to start — I do.\n\nI'm [NAME] from [FIRM NAME]. We've helped hundreds of clients in [CITY] get the compensation they deserve — without the stress of figuring it out alone.\n\nCall us today for a free consultation. We don't get paid unless you do."`,
              },
              {
                niche: "Med Spa / Beauty",
                script: `"You deserve to feel confident in your skin — and I can help you get there.\n\nI'm [NAME] at [SPA NAME] in [CITY]. We specialize in [TREATMENT] and have helped hundreds of clients look and feel their absolute best.\n\nBook your complimentary consultation this week. Spots are limited."`,
              },
              {
                niche: "Restaurant / Food",
                script: `"The best meal in [CITY] is waiting for you — and I'm not being modest.\n\nI'm [NAME], owner of [RESTAURANT NAME]. We use [SIGNATURE THING — fresh local ingredients / a family recipe / house-made everything] and every dish is made to order.\n\nCome see us this week. Your table is ready."`,
              },
              {
                niche: "Service Business (HVAC / Plumbing / Landscaping)",
                script: `"If your [problem — AC is making noise / pipes are leaking / lawn is out of control], don't wait.\n\nI'm [NAME] from [BUSINESS NAME]. We serve [CITY] and surrounding areas with fast, reliable [SERVICE TYPE] — same day when you need it most.\n\nCall or text us right now and we'll get you sorted."`,
              },
            ].map(({ niche, script }) => (
              <div key={niche} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                <div className="px-4 py-2.5" style={{ background: "rgba(200,168,100,0.08)" }}>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{niche}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="whitespace-pre-line italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "rgba(30,15,10,0.75)", lineHeight: 1.65 }}>{script}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.65 }}>
              Use the <span style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--ink)" }}>AI Video — Single Prompt</span> or <span style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--ink)" }}>AI Video — Multi-Scene Script</span> prompts in the Content Prompts tab to generate the actual video prompt for your AI tool. Upload their photo, paste the script, and render the clone before the meeting.
            </p>
          </div>
        </div>
      </div>

      </>}

      {/* ── Cold Outreach ──────────────────────────────── */}
      {section === "cold" && <>
      <SectionHeader label="Step 2 — Start the Conversation" title="Cold Outreach Scripts." sub="DM first, email second, call third. Pick what fits. Every script is word for word. Fill in the bracketed parts and send." />

      <ScriptCard
        step="Step 1 — Start Here"
        title="Cold DM Script"
        tag="Instagram / Facebook / TikTok"
        lines={[
          { type: "note", text: "Find a local business or brand. Look at their profile. Find something real and specific to mention. Then send this:" },
          { type: "send", label: "Your first message — send exactly this", text: "Hey [NAME] 👋\n\nLove what you're doing with [BUSINESS NAME] — [one specific genuine compliment, e.g., 'the packaging on your products is so clean' or 'that reel you posted last week was really well done'].\n\nQuick question — are you handling your social media yourself right now, or do you have someone helping you with it?" },
          { type: "note", text: "Then stop. Don't explain yourself. Don't pitch. Just send that and wait. The question is intentional — it starts a conversation." },
          { type: "subhead", text: "When they reply" },
          { type: "if_say", text: "I do it myself" },
          { type: "you_say", text: "Got it — how's that going? Are you finding time to post consistently, or does it kind of fall off when you get busy?" },
          { type: "note", text: "Let them talk. Ask follow-up questions. When they admit it's hard or inconsistent — that's your opening to pitch." },
          { type: "if_say", text: "I have someone / we have a team" },
          { type: "you_say", text: "Oh nice! Are you happy with what they're doing, or is there something you wish was different?" },
          { type: "note", text: "If they're happy, move on. If they have any complaints at all — that's your opening. Listen for it." },
          { type: "if_say", text: "What do you do exactly?" },
          { type: "you_say", text: "We're a done-for-you social media studio — we handle all the content, captions, posting, and ads. You don't touch any of it. We also build an AI version of you so the content actually sounds like your brand, and we set up automations so every comment or message gets responded to automatically.\n\nWould it be worth a quick 15-minute call? I can show you exactly what it would look like for [BUSINESS NAME] specifically." },
          { type: "if_say", text: "How much is it?" },
          { type: "you_say", text: "It depends on what makes sense for your business — packages start at $1,000/mo. We also have a 14-day free trial if you want to see it working before you commit.\n\nWould a quick 15-minute call help? I can walk you through it and figure out what fits." },
          { type: "if_say", text: "Just send me your info / can you send me a link?" },
          { type: "you_say", text: "Of course! Here's our site: shopdollhouse.co\n\nI'll follow up in a couple days too — sometimes a quick 10-minute call makes way more sense than reading through everything. But take a look and let me know what you think!" },
          { type: "warn", text: "Don't just send the link and disappear. Always follow up 2–3 days later if they go quiet. Most people who say 'send me info' forget to look — your follow-up is what actually closes it." },
          { type: "subhead", text: "If they don't reply — follow up after 3 days" },
          { type: "send", label: "Follow-up DM", text: "Hey [NAME] — just wanted to bump this in case it got buried!\n\nNo pressure at all — I just think there's a real opportunity here for [BUSINESS NAME] and didn't want to leave it hanging. Happy to do a free quick audit of your current social media if that's helpful. Totally free, no strings.\n\nJust reply 'audit' and I'll put it together for you. 😊" },
          { type: "note", text: "If still no reply after the follow-up, move on. Two touches is enough for a cold DM. Your time is better spent on the next prospect." },
        ]}
      />

      <ScriptCard
        step="Step 2"
        title="Cold Email — Full 3-Part Sequence"
        tag="Email"
        lines={[
          { type: "note", text: "Use this when you have their email address. Send all 3 emails over about 10 days. Customize the bracketed fields for every single person — never send a generic blast." },
          { type: "subhead", text: "Email 1 — The Opener" },
          { type: "send", label: "Subject line", text: "quick question about [BUSINESS NAME]'s social" },
          { type: "send", label: "Email body", text: "Hi [FIRST NAME],\n\nI was looking at [BUSINESS NAME] online — [one specific genuine observation, e.g., 'really love the quality of your product photography'] — but I noticed your social media presence doesn't quite match the quality of what you're actually offering.\n\nI run The Dollhouse Brand Studio. We handle done-for-you social media for small businesses — content, posting, ads, automations — so you don't have to think about it.\n\nI'd love to put together a quick look at what we'd do for you specifically. No pitch deck, no pressure — just a 15-minute call to see if it's even a fit.\n\nWould [DAY] or [DAY] this week work for you?\n\n— Mandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "subhead", text: "Email 2 — The Follow-Up (send 3 days after Email 1 if no reply)" },
          { type: "send", label: "Subject line", text: "Re: quick question about [BUSINESS NAME]'s social" },
          { type: "send", label: "Email body", text: "Hi [FIRST NAME],\n\nJust bumping this up — I know inboxes get busy.\n\nI actually had a few quick ideas for [BUSINESS NAME] based on what I can see from your current pages. Happy to share them — no strings, just genuine ideas.\n\nWorth a 15-minute call?\n\n— Mandy" },
          { type: "subhead", text: "Email 3 — The Breakup (send 5 days after Email 2 if still no reply)" },
          { type: "send", label: "Subject line", text: "last one from me" },
          { type: "send", label: "Email body", text: "Hi [FIRST NAME],\n\nI don't want to be that person who emails five times — so this is my last one.\n\nIf now isn't the right time for [BUSINESS NAME], I completely understand. But if things change and social media becomes something you want fully handled, I'd love to be the first call you make.\n\nWishing you a great month regardless. 😊\n\n— Mandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "note", text: "After the 3-email sequence with no reply — switch channels. Send a DM or make a phone call. Some people just don't respond to email. That doesn't mean they're not interested." },
        ]}
      />

      <ScriptCard
        step="Step 3"
        title="Cold Call Script"
        tag="Phone"
        lines={[
          { type: "note", text: "This feels scary at first. That's completely normal. Read this out loud 5 times before your first call. By call #10, you'll have it memorized and it'll feel natural." },
          { type: "subhead", text: "When they pick up" },
          { type: "send", label: "Your opening — say exactly this", text: "Hi, is this [NAME]? Hey — this is Mandy calling from The Dollhouse Brand Studio. I know this is a bit out of the blue — do you have like 60 seconds?" },
          { type: "if_say", text: "Not right now / I'm in the middle of something" },
          { type: "you_say", text: "Totally understand — I'll be super quick, I promise. I was looking at [BUSINESS NAME] and had a couple of ideas I think you'd genuinely want to hear. Could I get 60 seconds?" },
          { type: "note", text: "If they still say no: 'No problem at all — what's a better time to call back?' Get a specific time. Don't just say 'I'll try again later.'" },
          { type: "if_say", text: "Sure, go ahead / What's this about?" },
          { type: "send", label: "Your pitch — say this naturally, conversationally", text: "I appreciate it. So I was doing some research on [industry] businesses in [area] and came across [BUSINESS NAME]. You're doing [genuine compliment — their product, their service, something real].\n\nI noticed your social media presence doesn't quite match the quality of what you're actually doing — and honestly, that's leaving real money on the table.\n\nWe handle everything for businesses like yours — content, posting, ads, automations — completely done for you so you can focus on running your business.\n\nIs that something that's on your radar at all?" },
          { type: "if_say", text: "Yeah actually / Tell me more / How does that work?" },
          { type: "you_say", text: "I'd love to show you exactly what that would look like for [BUSINESS NAME] specifically. Can we get 15 minutes on the calendar this week? I can do [DAY] or [DAY] — which works better for you?" },
          { type: "note", text: "Give them two specific options. Not 'whenever works for you' — that puts the work on them and people procrastinate. Two days, let them pick one." },
          { type: "if_say", text: "Not interested / We're already handled on that / No thanks" },
          { type: "you_say", text: "Totally fair — can I ask, is it a timing thing, or is social media just not a priority right now?" },
          { type: "note", text: "Listen carefully. 'Not a priority right now' often means 'I don't see the value yet.' 'Timing' means they might be ready in 30–60 days. This one question often opens the door." },
          { type: "subhead", text: "If they don't pick up — voicemail script" },
          { type: "send", label: "Voicemail — under 20 seconds", text: "Hey [NAME], this is Mandy from The Dollhouse Brand Studio. I had a couple of ideas specifically for [BUSINESS NAME]'s social media that I think you'd genuinely find valuable. I'll shoot you a quick email too — talk soon!" },
          { type: "note", text: "Always send an email right after leaving a voicemail — same day. Reference that you just called. It shows you're real and serious, not a robo-dialer." },
        ]}
      />

      </>}

      {/* ── Discovery Call added to salescall section ──── */}
      {section === "salescall" && <>
      <ScriptCard
        step="Step 4"
        title="The Discovery Call — Full Conversation Guide"
        tag="Video Call or Phone"
        lines={[
          { type: "note", text: "This is your most important conversation. Your goal: listen first, pitch second. The more they talk, the better you can tailor what you say. Budget 20–30 minutes." },
          { type: "subhead", text: "Step 1 — Break the Ice Before Anything Else" },
          { type: "note", text: "Before you talk business, warm them up. This takes 60 seconds and makes the rest of the call 10x easier. Cold calls close less. Warm people do." },
          { type: "send", label: "First thing you say when they show up", text: "Hey [NAME]! So glad we got to connect today. Quick question before we dive in — where in the world are you joining from?" },
          { type: "if_say", text: "[City / Town / Country]" },
          { type: "you_say", text: "Oh I love that! What's the weather like over there right now? [Let them answer. Laugh. Share something back about where you are too.]\n\n[Give it 30–60 seconds. Be real. Ask a follow-up if something interesting comes up.]" },
          { type: "note", text: "This is not small talk — it's strategy. Warm people buy. Cold people don't. Always do this, even if it feels awkward at first. By call #5 it's second nature." },
          { type: "subhead", text: "Step 2 — The Opening" },
          { type: "send", label: "Transition into the call", text: "Okay so — I'm excited to learn more about [BUSINESS NAME]. Before I tell you anything about us, I'd love to hear about where you're at first. That way whatever I share actually makes sense for your situation. Sound good?" },
          { type: "subhead", text: "Questions to Ask — Listen More Than You Talk" },
          { type: "note", text: "Ask these one at a time. Let them answer fully before moving on. Take notes. Their answers become your pitch." },
          { type: "send", label: "Your questions", text: "1. How are you currently handling your social media?\n\n2. Is posting consistently something you struggle with, or do you have a good system?\n\n3. What platforms are you on — Instagram, Facebook, TikTok?\n\n4. Are you running any paid ads right now, or just organic?\n\n5. What's the biggest frustration with social media for your business right now?\n\n6. What would winning look like for you? More leads, more sales, more visibility — what matters most?" },
          { type: "subhead", text: "The Pitch — After You've Listened" },
          { type: "send", label: "Transition into your pitch — say this", text: "Okay, so based on what you just told me — [restate their main pain point in their own words] — here's exactly what I'd do for [BUSINESS NAME]:\n\nFirst, we handle all your content. Every graphic, every caption, every post — done for you. You never have to think about what to post again.\n\nWe schedule everything directly to your [PLATFORMS THEY MENTIONED] — a full month of content, queued up and ready.\n\nWe also build your AI brand clone so the content actually sounds like you, not generic. And we set up automations so anyone who comments or messages your page gets responded to automatically — turning engagement into conversations, and conversations into bookings.\n\nEvery month, you get a report showing what's working — reach, engagement, what your audience responded to — so we keep getting smarter about your strategy.\n\nAll of this, completely done for you." },
          { type: "subhead", text: "Presenting the Packages — Always Start High" },
          { type: "send", label: "How to introduce pricing", text: "So we have three ways to work together, depending on what makes sense right now.\n\nThe most popular for businesses at your stage is our Starter package — $1,000 a month. That gets you one platform fully managed, your AI brand clone built out, all the automations set up, and your monthly performance report. There's a one-time $500 setup fee that covers building everything out for your specific business.\n\nIf you want to scale faster — multiple platforms, paid ads, email and SMS automations — that's our Growth package at $2,500 a month.\n\nAnd for businesses that want the full system — AI voice agent, five platforms, the works — that's Elite, starting at $5,000 a month.\n\nBased on what you told me, I think [RECOMMEND ONE] makes the most sense for where you are right now. What's your gut reaction to that?" },
          { type: "if_say", text: "Which one do you recommend?" },
          { type: "you_say", text: "Honestly — based on everything you told me, especially the [specific pain point they mentioned] — I'd start with [Starter/Growth]. It gets you everything you need without overcomplicating it. You can always add more once you see it working." },
          { type: "subhead", text: "The Close — Ask Directly" },
          { type: "send", label: "Ask for the sale — say exactly this", text: "So — does this feel like the right fit for [BUSINESS NAME]? Are you ready to get started?" },
          { type: "warn", text: "After you ask that closing question, stop talking. Do not fill the silence. Do not say 'I know it's a big decision' or 'no pressure.' Ask, then wait. Let them answer. Whoever speaks next loses the power in that moment — don't let it be you." },
          { type: "subhead", text: "After the Call — Send Everything Within 2 Hours" },
          { type: "note", text: "Speed is part of the impression. Sending your proposal the same day shows you are professional, prepared, and excited about their business. Most people wait 2–3 days. Don't be that person — send everything today." },
          { type: "send", label: "Your follow-up message — send this right after you hang up", text: "Hey [NAME]! So great talking to you today.\n\nAs promised, here's the proposal for [BUSINESS NAME] — I kept it short and specific to what we talked about.\n\n[ATTACH PROPOSAL]\n\nOnce you're happy with everything, I'll send over the service agreement and invoice so we can get your 14-day trial started.\n\nLet me know if you have any questions at all. I'm really excited about this one.\n\nMandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "note", text: "Use the 'Post-Call Proposal Generator' prompt in the Prompts tab to build a custom proposal in minutes using your notes from the call. Then send the proposal, contract, and invoice all in one go — never make them chase you for three separate things." },
          { type: "warn", text: "If you said 14-day free trial on the call — the invoice is for $500 only (setup fee). The monthly starts after they see results. Make sure the invoice matches what you promised." },
        ]}
      />

      </>}

      {/* ── Objections & Close ─────────────────────────── */}
      {section === "objections" && <>
      <SectionHeader label="Step 5 — Handle Pushback" title="Objections and the Close." sub="Every objection has an answer. Stay calm. Don't drop your price right away. Use the free trial to close when they hesitate." />
      <ScriptCard
        step="Step 5"
        title="Handling Objections — Exact Words"
        lines={[
          { type: "note", text: "Every objection has an answer. The key is to stay calm, don't panic, and never discount immediately. These exact words work." },
          { type: "subhead", text: `"It's too expensive / I can't afford that right now"` },
          { type: "you_say", text: "I totally get it — $1,000/mo is a real investment. Can I ask — if social media was fully handled for you and brought in even one or two new clients a month, would that more than pay for itself?\n\n[Let them answer. Usually the answer is yes.]\n\nWe also have a 14-day free trial. The $500 setup still applies — that's how we build everything out for you — but the first two weeks are completely free so you can see real results before committing to the monthly. Does that change anything?" },
          { type: "subhead", text: `"Let me think about it / I need to talk to my partner"` },
          { type: "you_say", text: "Of course — I want this to be the right decision for you. Can I ask — what's the main thing you're weighing? Is it the price, the timing, or something you're unsure about with the service?" },
          { type: "note", text: "'Let me think about it' almost always means there's a specific concern they haven't said out loud. Your job is to find it." },
          { type: "you_say", label: "After they explain", text: "That makes total sense. How about this — let me schedule a quick follow-up for [specific day], give you time to talk it over, and if it's a yes we can get everything kicked off same day. Does [DAY] at [TIME] work?" },
          { type: "subhead", text: `"I tried social media before and it didn't work"` },
          { type: "you_say", text: "I hear that a lot — and honestly, most agencies drop the ball because they post generic content and call it done.\n\nWhat we do is different. We build your AI brand clone so the content actually sounds like you. We set up automations so leads don't fall through the cracks. And every month you see the actual numbers, not just pretty graphics.\n\nWhat specifically didn't work last time? I want to make sure we address that directly." },
          { type: "subhead", text: `"I already have someone doing my social media"` },
          { type: "you_say", text: "That's great — are you happy with what they're doing? What are the results looking like?\n\n[Let them answer.]\n\nIf they're delivering and you're genuinely happy, I wouldn't change a thing. But if there's something you wish was different — the consistency, the results, the communication — that's usually exactly where we come in." },
          { type: "subhead", text: `"Just send me some info and I'll take a look"` },
          { type: "you_say", text: "Absolutely — I'll send that right over. Can I also grab 10 minutes with you later this week? Most people find a quick call way more useful than reading through a bunch of info — I can answer questions in real time and show you exactly what it would look like for [BUSINESS NAME].\n\nI can do [DAY] or [DAY] — which is better for you?" },
          { type: "subhead", text: `"What if it doesn't work?"` },
          { type: "you_say", text: "That's exactly why we have the 14-day free trial — so you can see it working before you commit to anything.\n\nOnce you sign on, there's a 6-month minimum — and honestly, that's for your benefit. You'll start seeing real results within the first 90 days. But months 4, 5, and 6 are where things really compound — that's when the algorithm knows you, your audience trusts you, and leads start coming in consistently.\n\nAfter your 6 months, you can cancel with 30 days' written notice. We stay because we work, not because you're stuck.\n\nHonestly, the only real risk is staying where you are while your competitors keep showing up online every single day." },
        ]}
      />

      <ScriptCard
        title="The Free Trial Close — When and How to Use It"
        lines={[
          { type: "note", text: "The 14-day free trial is your secret weapon for hesitant leads. Use it when someone is interested but nervous about committing, when they want to 'think about it,' or when price is the main concern." },
          { type: "subhead", text: "Exact words to introduce the free trial" },
          { type: "send", label: "Say this", text: "Here's something I can offer you — we have a 14-day free trial.\n\nThe $500 setup fee still applies, because that's how we actually build everything out for your business — your AI brand clone, your content calendar, your automation workflows. That part is real work and it takes real time.\n\nBut the first two weeks of the monthly service are completely free. So you get real content going live on your pages, real automations running, real results — before you pay a single dollar of the monthly fee.\n\nIf you love it, we continue. If not, you paid $500 and walked away with a fully built content system for your brand.\n\nDoes that feel like something worth trying?" },
          { type: "warn", text: "The $500 setup fee is never negotiable and never waived. It covers real work — building the AI brand clone, setting up automations, creating the content system. If they push back on the $500, explain what it covers calmly and firmly. Do not offer to skip it. Ever." },
          { type: "subhead", text: `If they push back: "Can you waive the setup fee?"` },
          { type: "you_say", text: "I wish I could, but the setup fee covers the actual labor of building everything out for your business. Your AI clone, your content templates, your automation workflows — that takes real work, and it's the foundation that everything else runs on. Without it, we'd just be posting generic content, and that's not what we do.\n\nWhat I can do is apply the $500 as a credit toward your second month if you decide to continue after the trial. So it's not gone — it's credit." },
        ]}
      />

      </>}

      {/* ── Referrals ──────────────────────────────────── */}
      {section === "referral" && <>
      <SectionHeader label="Step 6 — Grow Without Cold Outreach" title="Referrals." sub="Your happiest clients are your best salespeople. Ask right after a win — when they're excited. One message can bring in 2 or 3 warm leads who already trust you." />

      {/* Timing Guide */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>When to Ask</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>Referral Timing Guide</h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            Timing is everything. Ask too early and they haven't felt the results yet. Ask too late and the excitement has faded. The sweet spot is right after a visible win.
          </p>
          <div className="space-y-2">
            {[
              { timing: "✅ Perfect time to ask", items: ["A reel or post went viral or hit a personal best", "They got a new booking or lead directly from your content", "Their follower count hit a milestone they cared about", "They just said 'wow, I've been getting so many compliments on my page'", "End of month report and the numbers look great"] },
              { timing: "❌ Not the right time", items: ["First 30 days — too soon, they haven't felt the full value yet", "Right after a complaint or revision request", "During a slow month where results are below average", "Right after sending an invoice — feels transactional"] },
            ].map(({ timing, items }) => (
              <div key={timing} className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: timing.startsWith("✅") ? "#4a9970" : "#c97a7a" }}>{timing}</p>
                <div className="space-y-1">
                  {items.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <span style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "var(--gold)", lineHeight: 1.8, flexShrink: 0 }}>·</span>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.55 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incentive Framework */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>How to Reward Referrals</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>Incentive Framework</h3>
        </div>
        <div className="px-6 py-5 space-y-3">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7 }}>
            Incentives make clients feel appreciated and give them a reason to act now. Keep them simple and specific — vague rewards don't motivate. Pick the right one for the relationship.
          </p>
          <div className="space-y-2">
            {[
              { tier: "Standard", reward: "One free extra post that month", when: "Good for any client — low cost to you, high perceived value to them" },
              { tier: "Valued", reward: "$100–$150 credit toward their next invoice", when: "For clients on $1,000+/mo who are strong referral sources" },
              { tier: "Power Referrer", reward: "One free month of performance reporting ($150 value)", when: "For clients who refer multiple people — reward the behaviour you want to see more of" },
              { tier: "Best Friend", reward: "A full extra content batch — 4 bonus posts", when: "For your all-time favourite client who sends you a high-ticket referral" },
            ].map(({ tier, reward, when }) => (
              <div key={tier} className="flex gap-4 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                <div className="shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)", whiteSpace: "nowrap" }}>{tier}</span>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.85)", lineHeight: 1.5, fontWeight: 500 }}>{reward}</p>
                  <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.45)", lineHeight: 1.5 }}>{when}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4 mt-2" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.55 }}>Always pay the incentive as soon as the referred client signs — not after 30 days. Pay it fast and they'll refer again. Make them wait and they'll forget about it.</p>
          </div>
        </div>
      </div>

      <ScriptCard
        title="Referral Ask — For Existing Clients"
        tag="Use right after a win"
        lines={[
          { type: "note", text: "The best time to ask for a referral is right after a client sees a win — a spike in reach, a new booking, a viral post. Strike while they're excited about the results." },
          { type: "send", label: "Text or DM your client", text: "Hey [CLIENT NAME] 😊\n\nI was just looking at [BUSINESS NAME]'s numbers and [specific win — e.g., 'that reel last week hit over 4k views'] — seriously so great to see that working!\n\nQuick ask: if you know any other business owners who struggle with their social media or just don't have time for it, I would love a warm introduction. I'm selectively bringing on a few new clients this month and a referral from you carries a lot of weight.\n\nIf you send someone my way who signs on, I'll take care of you — [INCENTIVE — e.g., 'a free extra month of performance reporting' or '$100 off your next invoice'].\n\nAbsolutely no pressure — just thought I'd ask! And honestly, thank you for trusting me with [BUSINESS NAME]. It means a lot. 🙏" },
          { type: "subhead", text: "After the referral signs — send this thank-you" },
          { type: "send", label: "Thank-you message to the referring client", text: "Hey [CLIENT NAME]!\n\nI just wanted to say a HUGE thank you. [REFERRED PERSON'S NAME] just signed on and I'm so excited to work with them.\n\nAs promised — [YOUR INCENTIVE, e.g., 'I'm adding a free extra post to your content plan this month' / 'I've applied a $100 credit to your next invoice'].\n\nYou didn't have to do that and it honestly means the world. Referrals from people I trust carry so much more weight than cold outreach — I'm genuinely grateful. 🙏\n\nIf you ever know of anyone else who could use us, I'd love the introduction. And if there's ever anything extra I can do for [BUSINESS NAME] — just ask.\n\nThank you again, seriously." },
          { type: "subhead", text: "If they refer but the person doesn't sign" },
          { type: "you_say", text: "Hey [CLIENT NAME] — I reached out to [REFERRED NAME] and we had a great chat! The timing just wasn't right for them right now, but I let them know the door is always open.\n\nThank you so much for the introduction — it means a lot that you thought of me. 🙏" },
          { type: "note", text: "Always acknowledge the referral attempt whether or not the person signs. The client went out of their way to help you — honour that. It keeps them in referral mode for the next person." },
        ]}
      />
      </>}

      {/* ─── Mascot Strategy ─────────────────────────────────── */}
      {section === "mascot" && <>
      <SectionHeader label="Mascot Strategy" title="The AI Character Hook." sub="Build a mascot or AI character for a prospect before you ever pitch them. The reveal is the close. Use this as a lead magnet, a conversation starter, and a retention strategy." />

      {/* Revenue model */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Revenue Model — Mascot Clients</p>
        <p className="mb-5 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--cream)", lineHeight: 1.5 }}>
          "3–4 pillar mascot videos pinned to the top. Daily posts filling the feed. Best video boosted with $150 Meta ads. People see the mascot everywhere — trust builds, leads follow."
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            { label: "Social Media Posts (with mascot)", price: "$500–$750/mo", note: "Daily branded posts + 3–4 mascot videos/mo" },
            { label: "Meta / Facebook Ads Management", price: "$500/mo", note: "$150 client ad spend to Meta (separate)" },
            { label: "Google Business Profile Setup", price: "$500", note: "One-time setup + weekly posts" },
            { label: "Email Marketing", price: "$500/mo", note: "Done-for-you campaigns + nurture sequences" },
          ] as const).map(({ label, price, note }) => (
            <div key={label} className="rounded-xl p-3" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.2)" }}>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", color: "var(--gold)" }}>{price}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "var(--cream)", marginTop: "2px" }}>{label}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(200,168,100,0.2)" }}>
          <div className="flex justify-between items-center">
            <span style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", color: "rgba(200,168,100,0.7)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Potential Per Client Monthly</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--gold)", fontWeight: 600 }}>~$2,000/mo</span>
          </div>
        </div>
      </div>

      {/* Step-by-step workflow */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Full Workflow</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>Build → Reveal → Close</h3>
        </div>
        <div className="px-6 py-5 space-y-6">

          {/* Step 1 */}
          <div>
            <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 1 — Build the mascot (OpenArt AI)</p>
            <div className="space-y-2">
              {([
                { n: "1", title: "Choose your tool", body: "OpenArt.ai → Image Generation. Options: ChatGPT Image tab (realistic humans) or Nanabana (stylised/cartoon). Upload a clear reference photo of the business owner or their logo." },
                { n: "2", title: "Generate the character", body: "Prompt: \"I will be adding a reference image. Bring this image to life making [him/her] a real life character as a mascot for [BUSINESS NAME].\" Describe their outfit, setting, and brand style." },
                { n: "3", title: "Animate it (Image to Video)", body: "OpenArt → Image to Video → Select Seedance 2.0. Upload the mascot image. Write a video prompt: \"Show [character] in [setting] explaining [service tip]. Character is moving, talking, demonstrating — natural and engaging.\"" },
                { n: "4", title: "Quality settings", body: "Start at 480p — saves credits while testing prompts. Once happy → click Upscale → improves from 480p to 4K. Keep testing until the motion and lip sync look natural." },
              ] as const).map(({ n, title, body }) => (
                <div key={n} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,100,0.12)" }}>
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold" style={{ background: "var(--gold)", color: "var(--ink)" }}>{n}</div>
                  <div>
                    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.82rem", color: "var(--ink)", fontWeight: 500 }}>{title}</p>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.65)", marginTop: "3px", lineHeight: 1.6 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 — Outreach */}
          <div>
            <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 2 — Send the hook</p>
            <ScriptCard
              title="I Brought Your Mascot to Life — DM / Email"
              tag="Send after building the video"
              lines={[
                { type: "note", text: "Don't pitch. Just tease. The video does the selling." },
                { type: "send", label: "DM (Instagram / Facebook)", text: "Hey [NAME] 👋\n\nI brought [BUSINESS NAME]'s mascot to life — and it can promote your business 24/7 without you ever having to record anything.\n\nWould you like to see it?" },
                { type: "send", label: "Email version", text: "Subject: I made something for [BUSINESS NAME]\n\nHi [NAME],\n\nI was looking at [BUSINESS NAME]'s social media and thought there was an opportunity to do something really cool for your brand.\n\nSo I went ahead and created an AI mascot character for your business — it can show up on your social media, talk about your services, and build brand recognition on autopilot.\n\nWould you want to see it?\n\nMandy\nThe Dollhouse Brand Studio" },
                { type: "subhead", text: "When they say yes" },
                { type: "you_say", text: "Option A — Send the video immediately and let it speak for itself.\n\nOption B — \"Great — it's ready. When do you have 5 minutes to take a look? I want to show you what it could do for [BUSINESS NAME].\"" },
                { type: "subhead", text: "Follow-up if no response (3–5 days)" },
                { type: "send", label: "Follow-up message", text: "Hey [NAME], just checking — did you see my message about the [BUSINESS NAME] mascot? I'd love to show it to you this week if you have a few minutes 😊" },
              ]}
            />
          </div>

          {/* Step 3 — Cold Call */}
          <div>
            <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 3 — Cold call (if no email reply)</p>
            <ScriptCard
              title="Mascot Cold Call Script"
              tag="Call 3–5 days after no reply"
              lines={[
                { type: "you_say", text: "\"Hey [NAME], this is [YOUR NAME] — I reached out by email a few days ago. I'm the one who creates AI video clones of business owners for their social media.\n\nI'd love to make one of you for free, just to show you what it looks like. Would you be open to seeing it?\"" },
                { type: "subhead", text: "If they ask \"what is it exactly?\"" },
                { type: "you_say", text: "\"So basically — we take a photo of you and use AI to create a video of you talking, moving, promoting your business. It looks completely real. You never have to film anything.\n\nMost business owners have never seen anything like it until I show them. That's why I'd rather just send it to you — want me to put one together for free?\"" },
                { type: "subhead", text: "If they say they're not interested" },
                { type: "you_say", text: "\"No worries at all — can I ask, is it just the timing, or is social media not something you're focused on right now?\" [Let them answer — tells you if it's a no forever or a not now.]" },
                { type: "subhead", text: "If they want to think about it" },
                { type: "you_say", text: "\"Of course — how about this: I'll put the free sample together anyway and just send it over. No strings. You can see it and decide from there. Fair enough?\"" },
                { type: "warn", text: "Always offer the free sample — it's a zero-resistance yes. The sample is a 15–20 second demo video, not a full build. Your only goal on this call: get them to agree to see it." },
              ]}
            />
          </div>

          {/* Step 4 — Meeting close */}
          <div>
            <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 4 — The meeting pitch</p>
            <ScriptCard
              title="Mascot Meeting — What to Say"
              tag="Zoom or in-person"
              lines={[
                { type: "note", text: "Show the mascot video first. Let them react. Then pitch." },
                { type: "you_say", text: "\"What I'd love to do for [BUSINESS NAME] is create 3–4 pillar mascot videos a month — these get pinned at the top of your page so every new visitor sees them first. Then for the rest of the month, we fill your feed with daily posts that our AI creates for you.\n\nOn top of that, we boost your best-performing mascot video with a small Meta budget — even $150 a month goes a long way. People start seeing your mascot everywhere on social media. They see the same character showing up over and over — brand recognition builds, trust builds, they book.\n\nThen from there we can layer in ad management, Google Business setup, email marketing — whatever makes sense for where your business is at right now.\n\nThe base package starts at $500 to $750 a month for the content. Add-ons from there.\"" },
                { type: "subhead", text: "Content strategy breakdown" },
                { type: "note", text: "Week 1: Drop the first pillar mascot video — pin it to the top of the profile.\nWeeks 2–4: Daily AI-generated branded posts fill the feed.\nEach month: Create 3–4 new mascot videos, boost the best one as a Meta ad.\nRetargeting: People who engaged get shown the ad again → they keep seeing the mascot → trust builds → they book." },
                { type: "subhead", text: "The $150 Meta boost — say this" },
                { type: "you_say", text: "\"The $150 goes directly from you to Meta — not to us. We just manage it. But every month we take your best mascot video and push it out to a targeted audience in [CITY] who match your exact ideal customer. At $150, you're getting thousands of fresh eyes on your best content every single month. It makes everything we're creating work 5x harder.\"" },
              ]}
            />
          </div>

        </div>
      </div>
      </>}

      {/* ─── Platform Downsell ─────────────────────────────── */}
      <SectionHeader
        label="Step 7 — Retention"
        title="Don't lose them completely."
        sub="When a DFY client wants to cancel, offer the platform. Keep the relationship, keep the revenue — even if they're not ready for full service."
      />

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Internal — Downsell Script</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>The Platform Downsell — 3 Tiers</h3>
          <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.5)" }}>Never mention the platform by name. Always say "our platform" or "the platform."</p>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.07)", border: "1px solid rgba(200,168,100,0.18)" }}>
            <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>When to use this</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.65 }}>
              A client says they want to cancel or pause their DFY service. Before you let them walk, offer the platform as a self-serve option. This keeps them in your ecosystem, keeps monthly recurring revenue flowing, and leaves the door wide open to upsell them back to full service when they're ready.
            </p>
          </div>

          {/* Tier Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {([
              { name: "Basic", price: "$97/mo", color: "#b8a070", items: ["CRM & contact management", "Automated follow-up sequences", "Calendar + booking system", "2-way SMS & email", "Pipeline tracking", "Mobile app access"] },
              { name: "Growth", price: "$297/mo", color: "var(--rose)", items: ["Everything in Basic", "Social media scheduler", "AI content tools", "Review request automation", "Email & SMS broadcast", "Funnel & landing pages", "Missed call text-back"] },
              { name: "Elite", price: "$497/mo", color: "var(--ink)", items: ["Everything in Growth", "AI voice agent (phone)", "DM auto-responder (IG/FB)", "Advanced reporting dashboard", "Workflow automation builder", "Priority support", "White-glove onboarding call"] },
            ] as const).map(tier => (
              <div key={tier.name} className="rounded-xl p-4" style={{ background: tier.name === "Elite" ? "var(--ink)" : "rgba(255,255,255,0.7)", border: `1.5px solid ${tier.color}40` }}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: tier.name === "Elite" ? "var(--gold)" : tier.color, fontWeight: 500 }}>{tier.name}</p>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "1.3rem", color: tier.name === "Elite" ? "var(--cream)" : "var(--ink)", fontWeight: 700, marginTop: "2px" }}>{tier.price}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", color: tier.name === "Elite" ? "rgba(255,255,255,0.4)" : "rgba(30,15,10,0.4)", marginTop: "2px", marginBottom: "10px" }}>per month</p>
                <div className="space-y-1.5">
                  {tier.items.map((item, i) => (
                    <p key={i} style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: tier.name === "Elite" ? "rgba(255,255,255,0.7)" : "rgba(30,15,10,0.65)", display: "flex", gap: "6px" }}>
                      <span style={{ color: tier.name === "Elite" ? "var(--gold)" : tier.color, flexShrink: 0 }}>✓</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Downsell scripts */}
          <div className="space-y-4">
            <p className="text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Word-for-Word Scripts</p>

            <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <p className="text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.4)" }}>When they say: "I need to cancel / pause / can't afford it right now"</p>
              <div className="rounded-lg p-3" style={{ background: "var(--ink)" }}>
                <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>You say</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{`"I completely understand — and I appreciate you being upfront with me.

Before we close everything out, I want to make sure you know this doesn't have to be all-or-nothing.

We have a self-serve option where you keep access to our platform — the same system your automations have been running on. You keep your CRM, your contacts, your booking system, your follow-up sequences — everything your business depends on — for just $97 a month.

If you want more — the social scheduler, the AI tools, the review automation — that's $297. And if you ever want the voice agent and DM responder back, that's $497.

It's not the full done-for-you service, but it keeps everything running and keeps the door open. A lot of clients who step back end up coming back to the full service once things settle.

Would that work as a middle ground for right now?"`}
                </p>
              </div>
            </div>

            <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <p className="text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.4)" }}>If they want to know more before deciding</p>
              <div className="rounded-lg p-3" style={{ background: "var(--ink)" }}>
                <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>You say</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{`"So there are three tiers.

The Basic at $97 keeps your CRM, automations, calendar, and 2-way messaging live. That's the core of everything.

The Growth at $297 adds the content scheduling tools, email and SMS broadcasting, your review automation, and funnel pages — so you can still do some of your own marketing through the platform.

The Elite at $497 puts the AI voice agent and DM responder back on — so leads never fall through the cracks even if you're managing the rest yourself.

I'd start at whichever level makes sense for where you are right now. You can upgrade anytime."`}
                </p>
              </div>
            </div>

            <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <p className="text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.4)" }}>If they still say no to everything</p>
              <div className="rounded-lg p-3" style={{ background: "rgba(30,15,10,0.07)" }}>
                <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.4)" }}>You say</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{`"No worries at all — I appreciate you giving us the chance. When the timing is better, the door is always open. I'll keep your account on file so getting back up and running is easy.

And if you ever refer someone our way who signs on, I'll make sure you're taken care of.

Thank you for the time we had — I genuinely wish you the best with [BUSINESS NAME]."`}
                </p>
              </div>
              <div className="rounded-lg p-3" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "var(--ink)", lineHeight: 1.6 }}>
                  <strong>After they leave:</strong> Keep them warm. Follow up in 60–90 days with a win story or a relevant tip. Clients who leave and come back are often the most loyal ones. Never burn bridges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─── Tab: Inbound Growth ────────────────────────────── */
function GrowthTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Inbound Growth Strategy"
        title="Make clients come to you."
        sub="Cold outreach gets your first clients. This system brings 20+ leads a month to you without paying for ads. The sooner you start, the better it gets."
      />

      {/* Philosophy callout */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Shift</p>
        <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--cream)", lineHeight: 1.5 }}>
          Cold outreach is the fastest way to start from zero. But if you stop reaching out, clients stop coming. Inbound flips that. Build it once and it keeps working.
        </p>
        <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.5)" }}>
          Use cold outreach to land your first 3–5 clients. Use this system to grow beyond that without spending all your time chasing leads.
        </p>
      </div>

      {/* Strategy 1: GEO */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 1</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>GEO — Generative Engine Optimization</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          People now search for services on ChatGPT, Gemini, and Perplexity — not just Google. When someone asks "who can help me with social media for my restaurant?" an AI gives them an answer. GEO is how you become that answer.
        </p>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Regular SEO is about keywords and page titles. GEO is about trust. AI tools look at how well-known your brand is, how consistently you show up online, whether you have real results with real numbers, and whether other websites mention you.
        </p>

        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What to do</p>
        <div className="space-y-3">
          <CheckItem
            text="Pick a niche — and own it"
            sub='Instead of "social media agency," become "social media for med spas" or "social media for local restaurants." Niche = less competition, faster recommendations, better-fit clients who stay longer.'
          />
          <CheckItem
            text="Make your brand name appear consistently everywhere"
            sub="Website, Google Business Profile, Instagram bio, Facebook page, Yelp, directories — same name, same services, same city. AI models are trained on this data. Consistency = credibility."
          />
          <CheckItem
            text="Add real case studies with specific numbers"
            sub={"Not \"great results\" — actual outcomes. \"Grew follower count by 340% in 60 days.\" \"Generated 47 inbound leads in one month.\" AI platforms cite specific outcomes because that's what searchers want."}
          />
          <CheckItem
            text="Get third-party mentions and backlinks"
            sub="Being mentioned on other websites, featured in articles, or appearing on podcasts signals trust to AI models. This is the signal most people skip — and the one that matters most."
          />
          <CheckItem
            text="Post on social media consistently — it feeds GEO"
            sub="Every post with your business name, services, and location is another brand mention the internet indexes. Social media and GEO work hand-in-hand. Posting consistently is not just for leads — it's for authority."
          />
        </div>
      </div>

      {/* Strategy 2: Organic Social + Boost */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 2</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>Organic Social Media + the $150 Boost</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Post consistently on Instagram, Facebook, and LinkedIn — content about what you do, who you help, and the results you get. When someone is finally ready to hire a social media agency, you're the first person they think of because they've been seeing your content.
        </p>
        <div className="space-y-3">
          <CheckItem
            text="Post for your own brand every single day — use the platform AI to batch it"
            sub="Use the same AI content creation prompts from the Content Prompts tab. Create a full month of your own content in 15 minutes. If you're selling social media, your own pages need to be proof."
          />
          <CheckItem
            text="The $150/month boost — amplify what's already working"
            sub="Don't run complex ad campaigns for yourself. Take your 2–3 best organic posts each month (the ones already getting engagement) and put $50 behind each to extend their reach. That's it. Proven content, bigger audience."
          />
          <CheckItem
            text="Your content pillars for your own brand"
            sub="1) Client results / case studies  2) Behind the scenes — how you work  3) Education — social media tips for business owners  4) Your story / personality  5) Offers and services. Rotate through all five."
          />
        </div>
      </div>

      {/* Strategy 3: Blogging + LinkedIn */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 3</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>SEO Blogging + LinkedIn Articles</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          A single well-written blog post can drive traffic for years. This is the strategy with the highest long-term ROI — it takes the most time to start working, but once it does, it runs on autopilot.
        </p>
        <div className="space-y-3">
          <CheckItem
            text="Find niche keywords your ideal clients are actually searching"
            sub='Examples if your niche is med spas: "social media marketing for med spas," "how to get more med spa clients from Instagram," "best content ideas for med spas." Low competition, high-intent searchers.'
          />
          <CheckItem
            text="Write one blog post per week that answers a real question"
            sub="Use AI to draft it, then add your own experience, real client examples, and actual results. AI-generated content that's just copy-pasted doesn't rank — originality and first-hand data does."
          />
          <CheckItem
            text="Publish LinkedIn articles using the same blog content"
            sub="LinkedIn is indexed by Google. Articles you publish there show up in search results, get shared by your network, and position you as an authority. Repurpose each blog post into a LinkedIn article — minimal extra effort, double the reach."
          />
          <CheckItem
            text="Include a CTA at the end of every post"
            sub='"Book a free call," "DM us to see what this would look like for your business," or a link to your contact page. Every post should have a next step.'
          />
        </div>
      </div>

      {/* Strategy 4: YouTube */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 4</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>YouTube / Long-Form Video</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          YouTube videos now show up in Google search results and are being cited in AI search results on ChatGPT and Gemini. A video you make today can be driving leads 5 years from now. This is the hardest strategy to stay consistent with — but the payoff is massive if you do.
        </p>
        <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", fontStyle: "italic", color: "var(--ink)" }}>You don't need to post 3× a week. You don't need thousands of subscribers. 10 really good videos that answer the specific questions your ideal clients are asking is enough to start driving strong, qualified inbound leads.</p>
        </div>
        <div className="space-y-3">
          <CheckItem
            text="Pick 10 questions your ideal clients are Googling right now"
            sub='Example niche: salons. Videos: "How to get more salon clients from Instagram," "Social media ideas for hair salons," "Should my salon run Facebook ads?" — these are exact searches your clients make.'
          />
          <CheckItem
            text="Make one video per topic — thorough, real, useful"
            sub="Use AI to write the script. The leads from video are your best leads — they watched you, they trust you, they're already sold before they reach out."
          />
          <CheckItem
            text="Every video trains AI models to associate your brand with that topic"
            sub="Showing up on YouTube + Google + AI search for the same niche topic is compounding authority. It takes time, but it becomes impossible to ignore."
          />
        </div>
      </div>

      {/* Strategy 5: Guest Blogging + Podcasts */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 5</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>Guest Blogging, Features & Podcasts</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Getting mentioned on other websites is the fastest way to build third-party credibility — which is exactly what AI search engines are looking for. Every feature or backlink is another signal that your brand is real and trustworthy.
        </p>
        <div className="space-y-3">
          <CheckItem
            text="Reach out to industry blogs in your niche and offer a guest post"
            sub='Example: if you serve restaurants, pitch a post to a restaurant industry blog: "5 Social Media Mistakes Restaurants Make (And How to Fix Them)." They get free content. You get a backlink and credibility.'
          />
          <CheckItem
            text="Pitch yourself to podcasts — even small ones count"
            sub="Find podcasts your ideal clients listen to. Pitch a specific topic you can speak on. Podcast appearances get shared, indexed, and cited. Every appearance is a backlink and a brand mention."
          />
          <CheckItem
            text="Track your mentions — set up a Google Alert for your business name"
            sub="Free. Takes 2 minutes. Alerts you any time your name appears online — so you can see your GEO footprint growing and respond to any mentions."
          />
        </div>
      </div>

      {/* Additional Revenue Lines */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Revenue Upsells</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>Additional Services You Can Sell Right Now</h3>
        </div>
        <p className="mb-6" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.6)", lineHeight: 1.7 }}>
          Beyond core social media packages, these are adjacent services that increase revenue per client and attract new ones. All validated by agencies doing $1M+ a year. Pick the ones that fit where you're at.
        </p>
        <div className="space-y-4">
          {[
            {
              name: "AI Website Build + Hosting",
              price: "$500 build · $97/mo passive",
              color: "#4a90d9",
              how: "Use the platform's AI Studio to build a full, professional website from one prompt. It researches the business, generates industry-matched imagery, and writes conversion-focused copy — in one shot. Takes about 30–45 minutes to build. Once it's live, $97/mo is passive income just to host and maintain it.",
              best: "Best for businesses with no website, or one that's embarrassingly outdated. Pitch it as: 'I noticed your website hasn't been updated in a while — let me show you what we can build in an afternoon.'",
              prompt: "Use the 'AI Website Builder' prompt in the Prompts tab to generate the full site in one shot.",
            },
            {
              name: "AI Revenue Audit / Business Consultation",
              price: "$1,000–$2,500 one-time · or monthly retainer",
              color: "#7b68ee",
              how: "Run a deep AI analysis of a client's CRM pipeline, workflows, automations, and lead sources. The AI finds 'silent money problems' — leads that were never followed up, workflows that were built but never activated, opportunity values set to zero. Package the findings as a 30-day action plan with projected ROI.",
              best: "Best for established clients already in your system with data to analyse. It can be a standalone paid audit, or a monthly retainer to implement and keep optimising. This is a premium upsell — it requires access to their CRM data and a solid understanding of how their pipeline works.",
              prompt: "Use the 'AI Revenue Audit' prompt in the Prompts tab to run the analysis and format the deliverable.",
            },
            {
              name: "AI Digital Product / Lead Gen Tool",
              price: "$97–$500 build fee (client keeps the revenue)",
              color: "#4a9970",
              how: "Build a simple interactive quiz, calculator, or checklist for a client in their niche. Clients use these as low-ticket digital products ($27–$97) to sell, or give them away as lead magnets for ads. The product sale covers ad spend — so their leads are essentially free. Works on any platform, takes under an hour to build.",
              best: "Best for: accountants (tax calculators), coaches (readiness quizzes), fitness businesses, real estate agents. Use the platform's AI Studio to build the tool. Then build the automation that captures leads and starts the follow-up sequence.",
              prompt: "Use the 'AI Digital Product Creator' prompt in the Prompts tab to build the product and the supporting automation.",
            },
            {
              name: "AI Avatar / Video Upgrade Package",
              price: "+$500–$1,500/mo added on top of existing package",
              color: "#c8a864",
              how: "Clients start on the Starter ($1,000/mo) for image posts and AI clone videos. When they see results and want more: upsell to weekly talking head clips, animated mascot content, or time-lapse videos. Video outperforms static images on every platform. Once they've seen their image content working, the upsell is easy.",
              best: "Video content is where the market is going. Businesses know they need video — they just don't know how to create it affordably. You have the AI tools to make it fast and profitable. This is the conversation: 'Your posts are performing well. Want to see what happens when we add video to the mix?'",
              prompt: "Use the 'AI Video — Multi-Scene Script' or 'AI Video — Single Prompt' in the Prompts tab to produce the content.",
            },
          ].map(({ name, price, color, how, best, prompt }) => (
            <div key={name} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${color}33` }}>
              <div className="px-5 py-3.5 flex items-center justify-between gap-3 flex-wrap" style={{ background: `${color}12`, borderBottom: `1px solid ${color}22` }}>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--ink)" }}>{name}</h4>
                <span className="px-3 py-1 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: color, color: "#fff" }}>{price}</span>
              </div>
              <div className="px-5 py-4 space-y-2.5" style={{ background: "rgba(255,255,255,0.5)" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.72)", lineHeight: 1.65 }}>{how}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.81rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.55, fontStyle: "italic" }}>{best}</p>
                <p className="text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color }}>{prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GEO Checklist summary */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Your GEO Starter Checklist</p>
        <p className="italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--cream)", lineHeight: 1.4 }}>Do these once to lay the foundation. Then create content consistently and let it compound.</p>
        <div className="space-y-2">
          {[
            "Pick a clear niche — one industry, one type of business",
            "Claim and fully fill out your Google Business Profile",
            "Make sure your name, services, and city match on every platform (Instagram, Facebook, website, directories)",
            "Write 3 detailed case studies with real numbers — add them to your website",
            "Collect 10+ Google reviews (ask every happy client)",
            "Publish your first blog post targeting a niche keyword",
            "Create a LinkedIn company page and publish your first article",
            "Post on your own social media 5x a week minimum",
            "Reach out to one podcast or blog for a guest feature this month",
            "Set up a Google Alert for your business name",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "12px", height: "12px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(250,243,234,0.78)" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: New Hire ───────────────────────────────────── */
function NewHireTab() {
  return (
    <div className="space-y-8">
      <SectionHeader label="New Hire Guide" title="Welcome to The Dollhouse." sub="Read this before you touch any client account. Everything you need to know is right here." />

      {[
        {
          title: "Who We Are",
          content: `The Dollhouse Brand Studio is a done-for-you social media agency. We handle content creation, scheduling, paid ads, and strategy for small business owners who don't have time to do it themselves.

Our clients pay a monthly fee and trust us to show up for their brand every single day. That means consistent quality, on-brand content, and clear communication — no excuses.

We are a small, close-knit team. Every client gets a premium experience. We do not cut corners.`,
        },
        {
          title: "Our Brand Standards",
          content: `Everything we send to a client must be reviewed against these questions before it goes out:

✓ Does this sound like the client — not like a template?
✓ Is the grammar and spelling perfect? (Use Grammarly — no exceptions.)
✓ Does this match the brand colours, fonts, and visual style?
✓ Would we be proud if a competitor saw this?
✓ Is the CTA clear — does the audience know exactly what to do next?

If the answer to any of those is "no" or "not sure" — fix it before it goes out.`,
        },
        {
          title: "Tools We Use",
          content: `• Our platform — CRM, pipeline, automations, SMS, email marketing. All client communication and task management lives here. Never use personal email or DMs for client work.
• Canva — graphic design for all social posts, ad creatives, story templates.
• Meta Business Suite / Meta Ads Manager — for running and managing Facebook and Instagram ads.
• Google Drive — shared client folders for content approvals, brand assets, reports.
• ChatGPT / Claude — for drafting captions and copy using the prompts in this playbook. Always review and humanize AI output before sending.

Ask for login credentials on Day 1. Do not create your own accounts on behalf of clients.`,
        },
        {
          title: "Client Communication Rules",
          content: `1. Reply to all client messages within 4 business hours — same day, always.
2. Never promise something you can't deliver. If you're not sure, say "Let me check on that and get back to you."
3. Bring problems to Mandy first. Do not try to fix things on active client accounts without approval.
4. Monthly reports go out within the first 3 days of the new month. No exceptions.
5. If a client is unhappy, listen first. Do not get defensive. Tell Mandy right away.
6. Never talk pricing, contracts, or upgrades with a client. That always goes through Mandy.`,
        },
        {
          title: "Content Creation Rules",
          content: `1. Always use the prompts in the Prompt Library. Do not write captions from scratch.
2. All AI-generated copy must be read, edited, and made to sound human before it goes anywhere.
3. Never copy content from other brands — not even as a starting point.
4. Batch your work — never create for one client at a time. Write all captions first, then design, then schedule.
5. Get written client approval before anything is scheduled or posted.
6. You get ONE round of revisions per content batch. Be clear about that upfront.`,
        },
        {
          title: "What Will Get You Let Go",
          content: `• Missing deadlines without giving a heads up first
• Sending content to a client without checking it internally first
• Making changes to a live ad without approval
• Talking negatively about any client — to other clients, online, or anywhere
• Sharing client info, content, or logins outside the team
• Going silent — on a client, on Mandy, or on a deadline

We are a small team. Trust and showing up are non-negotiable.`,
        },
      ].map(({ title, content }) => (
        <div key={title} className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <h3 className="mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>{title}</h3>
          <p className="leading-relaxed whitespace-pre-line" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.75)" }}>{content}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Tab: 4x4 Content Strategy ─────────────────────── */
function ContentStrategyTab() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const steps = [
    {
      n: "01",
      label: "Hook",
      timing: "First 4 seconds",
      color: "var(--rose)",
      icon: "zap",
      tagline: "Interrupt. Disrupt. Make it personal.",
      body: `The hook is not an intro — it is a disruption. In 1–3 seconds, the viewer decides: is this about me? If they're not sure, they scroll. You never get them back.

Your hook is two sentences. Two. Not three. Not a paragraph. Two sentences — and each one has one job.`,
      details: [
        {
          label: "Sentence 1 — The Pattern Interrupt",
          text: `This is the shock. It disrupts, accuses, reveals, or exposes something. The viewer's brain should fire with "wait, what?" It challenges them, calls them out, or says something they weren't expecting. It is confrontational without being mean.

Examples of what works:
"You don't have a content problem — you have a courage problem."
"You've been posting for a year and you still have 300 followers — and you know why."
"The reason you're not booking clients isn't your price. It's your visibility."`,
        },
        {
          label: "Sentence 2 — The Personal Relevance",
          text: `This is the clarity. It tells the viewer exactly who this video is for. It makes them feel seen, heard, and understood. Without this sentence, they leave after the shock. Without sentence 1, they scroll before sentence 2 even registers.

You need both. Together they do this:
Shock without clarity → they leave confused.
Clarity without shock → they scroll before they feel anything.
Both together → they stop, lean in, and watch.

Example of the pair:
S1: "You don't have a content problem — you have a courage problem."
S2: "And if you've been posting inconsistently for months, you already know what I'm talking about."`,
        },
        {
          label: "On-Screen Title + Subtitle",
          text: `After the two-sentence hook, show a title on screen. The title anchors the theme of the video — it does NOT repeat what you just said in the hook. Think of it as a chapter title.

The subtitle adds one more layer of specificity. Put it in the caption.

Example:
Hook: "You don't have a content problem — you have a courage problem. And if you've been posting inconsistently, you already know exactly what I mean."
On-Screen Title: The Psychology of Inconsistent Creators
Caption Subtitle: How low self-esteem sabotages visibility

The hook grabs them. The title grounds them. The subtitle tells them this is educational, worth watching to the end.`,
        },
      ],
      example: {
        label: "Hook Example — For a Business Account",
        hook: "You've been in business for three years and you still don't have a consistent online presence. And the reason isn't time. It's fear.",
        title: "Why Local Businesses Stay Invisible Online",
        subtitle: "And what low visibility is actually costing you every month",
      },
    },
    {
      n: "02",
      label: "Proof",
      timing: "Right after the hook",
      color: "var(--gold)",
      icon: "bar-chart",
      tagline: "Earn the right to be heard.",
      body: `Nobody cares what you say in the hook until you back it up. The hook creates curiosity. The proof creates trust. Without proof, you're just another person online making big claims. With it, you're someone worth listening to.

Proof doesn't have to be complicated. It just has to be real.`,
      details: [
        {
          label: "What counts as proof",
          text: `A relevant stat or study (cited, real, specific — not vague).
A client result (name the niche, name the outcome, name the timeline).
Your own personal results (be specific — not 'I grew a lot,' but 'I went from 300 to 12,000 followers in 4 months while working from a shelter').
A before/after that the viewer can see or feel.
A testimonial — what a real person said after working with you.

The more specific the proof, the more it lands. "Most businesses see results" means nothing. "A dental office in Phoenix went from 0 bookings through social media to 14 a month in 6 weeks" means everything.`,
        },
        {
          label: "How to deliver proof without bragging",
          text: `Don't announce it. Slide it in. Make it feel like a natural part of the story — not a credential flex.

Wrong: "I've helped over 500 businesses and I have 10 years of experience."
Right: "I've watched the same pattern in hundreds of businesses — and it always starts the same way."

The second version carries proof without feeling like a resume. It positions you as someone who has seen enough to recognise patterns — which is real authority.`,
        },
      ],
      example: {
        label: "Proof in Context",
        hook: "Most small businesses that struggle with social media think it's a content problem. It's not.",
        proof: "I've set up content systems for over 40 local businesses in the past year. The ones that grew weren't posting more — they were posting differently. There's a reason for that.",
      },
    },
    {
      n: "03",
      label: "Value",
      timing: "The body — longest section",
      color: "#8a6cb0",
      icon: "mirror",
      tagline: "Hold up the mirror. Tell the story. Expose the pattern.",
      body: `People don't connect to information. They connect to themselves. Your job here is to hold up a mirror so the viewer can see their own patterns and blind spots — without making them feel bad about it.

This is where the video earns saves, shares, and comments. This is where trust is built or lost. Everything before this gets them watching. This section makes them feel something.`,
      details: [
        {
          label: "The Mirror Technique",
          text: `Describe the viewer's experience back to them in a way they've never heard it put before. Name the behaviour. Name the feeling. Name the pattern. When someone hears themselves described — not judged, described — the walls come down.

Example: "You said you wanted to go viral. But when the views came, you got nervous. You second-guessed every caption. You almost deleted the post. Because you weren't actually scared of failure — you were scared of being seen."

That's a mirror. Nobody told them they were scared of being seen. But they know it's true the second they hear it. That recognition is what drives comments. It's what makes them screenshot the caption. It's what makes them share it with someone who needs to hear it.

The rule: do not shame people. Expose their patterns. Exposing a pattern is authority. Shaming is alienation.`,
        },
        {
          label: "Stories — Why They Are Not Optional",
          text: `Stories do three things that no list, stat, or tip can do:
1. Build trust (you lived this — you didn't just read it)
2. Build emotional connection (they feel it with you)
3. Lower resistance (their guard comes down and they actually receive what you say)

Don't teach from theory. Teach from scars that you turned into strategy.

The story doesn't have to be dramatic. It has to be real. The detail that seems embarrassing or too specific to share is often the exact detail that makes someone feel less alone. Your story is the thing that separates you from every other creator in your niche posting the same tips.

Tell it like a scene. Not a summary. "I remember sitting in the parking lot of the shelter, posting from my phone at 10pm, refreshing the page every 5 minutes" hits differently than "I posted while going through a hard time."`,
        },
        {
          label: "Emotional Triggers — Use Intentionally",
          text: `Triggers are not tricks. They are the real reason people take action — or stay stuck. If content doesn't trigger a feeling, people watch it and forget it.

The 6 core triggers to use (never shame — always expose the pattern):

SHAME EXPOSURE — Expose the gap between what they say they want and what they actually do. "You say you want to grow your business, but you haven't posted in 6 weeks."

HOPE — They are closer than they think. This activates people on the edge of quitting. "Most people quit three feet from the gold. You might be there right now."

IDENTITY CHALLENGE — Challenge who they believe they are. "You don't lack a skill. You lack a belief system." This hits high-achievers especially hard.

FEAR OF REGRET — Activate the fear that time is being wasted. "The version of you that started five years ago would be disappointed in where you're still standing."

ASPIRATION / EXPOSURE — Show what is possible. Let them feel the gap between where they are and what's available to them. This is what luxury lifestyle content does — it doesn't shame, it exposes possibility.

BELONGING / RECOGNITION — Make them feel seen in a way nobody else has. "Finally someone who gets it." This is what builds communities.

Pick one. Use it with purpose. Never layer shame on top of a trigger — expose the pattern, not the person. That's the difference between authority and aggression.`,
        },
      ],
      example: {
        label: "Value in Context — Personal Brand",
        hook: "You've been posting for eight months and you still feel invisible.",
        value: "Here's what I see when I look at your content: you're hiding. The posts that got 12 likes are the ones where you shared an opinion. The ones that got 0 are the ones where you played it safe. You already know which version of you people actually respond to. You're just scared to be her consistently. I know this because I spent a year posting content that looked professional and said nothing. Then I posted one video from my car, crying, talking about something real — and it hit 40,000 people in a week. That video cost me nothing but honesty. The polished ones cost me everything and gave me nothing.",
      },
    },
    {
      n: "04",
      label: "Call to Action",
      timing: "Last 4 seconds",
      color: "var(--ink)",
      icon: "target",
      tagline: "One ask. Say it directly. Stop talking.",
      body: `The last 4 seconds of every video must have one clear ask. This is not optional. It feeds the algorithm and turns viewers into followers, leads, and clients.

One CTA. Not three. Not "like, comment, share, AND follow, AND DM me, AND check the link in bio." Pick one. The most important one.`,
      details: [
        {
          label: "CTA options — pick the one that fits",
          text: `COMMENT — "Comment [WORD] below and I'll DM you [RESOURCE]."
This is the highest-performing CTA for algorithm reach. Comments signal engagement. The keyword trigger turns comments into automatic DMs, which turns DMs into leads.

FOLLOW — "Follow for more content like this."
Use when the video is specifically designed to grow your audience. Best for broad, viral-targeted content.

SHARE — "Share this with someone who needs to hear it."
Use when the content hits an emotional truth that people recognise in someone they love. This is how videos spread outside your audience.

DM — "DM me the word [WORD] and I'll send you [SPECIFIC THING]."
Lower volume than comment, higher intent. Someone who DMs you is further along than someone who just comments.

SAVE — "Save this — you're going to want to come back to it."
Saves signal to the algorithm that your content has long-term value. Use for educational, instructional, or reference content.

BOOK / BUY — "Book a free call — link in bio." / "Shop — link in bio."
Use when the video has already done the selling. Don't use this if you haven't fully earned it in the previous 3 sections.`,
        },
        {
          label: "How to deliver the CTA",
          text: `Say it like you mean it. Not apologetically. Not in a rushed whisper at the end like you're embarrassed to ask.

Say it directly, with the same energy you brought to the hook. Look into the camera. Pause after you say it. Let it land.

Wrong: "Um, and if you liked this, maybe follow me or whatever, and you can also leave a comment I guess."
Right: "Comment 'GUIDE' below and I'll send you the full framework directly in your DMs. Right now. Let's go."

Urgency is okay. Desperation isn't. The difference is confidence.`,
        },
      ],
      example: {
        label: "CTA in Context",
        cta: "If this hit you — share it with someone in your world who's been playing small. And follow me because we go deeper than this every single week.",
      },
    },
  ];

  const triggers = [
    { name: "Shame Exposure", icon: "mirror", desc: "Expose the gap between what they say they want and what they actually do.", ex: '"You say you want wealth but you avoid every money conversation."', note: "Expose the pattern. Never shame the person." },
    { name: "Hope", icon: "sparkle", desc: "They are closer than they think. Activates people on the edge of quitting.", ex: '"You are closer than you think. Most people quit three feet from the gold."', note: "Use this when the audience is tired and almost ready to give up." },
    { name: "Identity Challenge", icon: "flame", desc: "Challenge who they believe they are at a fundamental level.", ex: '"You don\'t lack a skill. You lack a belief system."', note: "Hits hardest for high-achievers in a rut." },
    { name: "Fear of Regret", icon: "hourglass", desc: "Activate the fear that they are wasting their potential or their time.", ex: '"The version of you that started five years ago would be disappointed."', note: "Use sparingly — very powerful but can feel heavy if overused." },
    { name: "Aspiration / Exposure", icon: "trophy", desc: "Show what is possible. Let them feel the gap between now and what's available.", ex: "Showing your lifestyle, results, or client wins — and letting the contrast do the work.", note: "This is what luxury creators do. The exposure IS the trigger." },
    { name: "Belonging / Recognition", icon: "heart", desc: "Make them feel seen in a way nobody else has. Finally, someone who gets it.", ex: `"If you've been thinking this for years and didn't know how to say it — this is for you."`, note: "Builds the deepest loyalty. Creates community." },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        label="The 4x4 Method"
        title="How to Make Videos People Can't Stop Watching."
        sub="Every video we make follows this exact formula. It walks the viewer through five steps: curiosity → recognition → trust → belief → action. Skip a step and the video won't work."
      />

      {/* Nervous System Flow */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Viewer's Journey — Every Video Must Hit All 5 Steps</p>
        <div className="flex flex-wrap gap-0">
          {[
            { label: "Curiosity", sub: "Hook lands", dot: true },
            { label: "Recognition", sub: "They see themselves", dot: true },
            { label: "Regulation", sub: "Their guard drops", dot: true },
            { label: "Belief", sub: "They trust you", dot: true },
            { label: "Action", sub: "They move", dot: false },
          ].map(({ label, sub, dot }) => (
            <div key={label} className="flex items-center gap-0">
              <div className="flex flex-col items-center px-3 py-2">
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "var(--gold)", fontStyle: "italic" }}>{label}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", color: "rgba(250,243,234,0.4)", marginTop: "2px" }}>{sub}</p>
              </div>
              {dot && <span style={{ color: "rgba(200,168,100,0.35)", fontSize: "1.2rem", padding: "0 2px" }}>→</span>}
            </div>
          ))}
        </div>
        <p className="mt-5 pt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.45)", lineHeight: 1.7, borderTop: "1px solid rgba(200,168,100,0.12)" }}>If any step is missing, the video won't work. No curiosity = they scroll away. No recognition = they don't see themselves. No trust = they don't believe you. No belief = no action. No action = no clients.</p>
      </div>

      {/* Before You Script */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Before You Script Anything</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--ink)" }}>Start With a Strong Topic — Before You Write Anything</h3>
        </div>
        <div className="px-6 py-6 space-y-6">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.75 }}>Your topic is everything. A weak topic makes a weak video — no matter how good the script is. A strong topic calls out a real pattern. It makes the right viewer think "this is about me." Pick a topic that genuinely frustrates you, or that you know most people are getting wrong.</p>

          {/* Weak vs Strong */}
          <div>
            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.4)" }}>Weak vs. Strong</p>
            <div className="grid gap-3">
              {[
                { weak: "Why you need discipline", strong: "Why your low self-esteem is disguised as waiting for motivation", why: "The weak version is generic advice anyone could give. The strong version exposes a specific, uncomfortable pattern — and names it in a way the viewer recognises immediately." },
                { weak: "How to grow your business on social media", strong: "You're not posting consistently because deep down you don't believe your business is worth the attention", why: "The weak version is a tutorial. The strong version is a confrontation with a belief system. That confrontation is what makes people stop scrolling." },
                { weak: "Why you need to post more content", strong: "The real reason you keep starting over every Monday is that you're performing productivity instead of building a system", why: "The weak version gives advice. The strong version calls out a specific behaviour — 'performing productivity' — that the right audience immediately recognises in themselves." },
              ].map(({ weak, strong, why }) => (
                <div key={weak} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                  <div className="grid sm:grid-cols-2">
                    <div className="p-4" style={{ background: "rgba(201,122,122,0.05)", borderRight: "1px solid rgba(200,168,100,0.1)" }}>
                      <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "rgba(180,80,80,0.7)" }}>Weak — generic, no one cares</p>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "rgba(30,15,10,0.5)", fontStyle: "italic" }}>{weak}</p>
                    </div>
                    <div className="p-4" style={{ background: "rgba(200,168,100,0.04)" }}>
                      <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Strong — exposes a pattern</p>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "var(--ink)", fontStyle: "italic" }}>{strong}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3" style={{ background: "rgba(200,168,100,0.04)", borderTop: "1px solid rgba(200,168,100,0.1)" }}>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.6 }}>{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Psychological target */}
          <div className="rounded-xl p-5" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Answer These Questions Before You Write Anything</p>
            <div className="space-y-2">
              {[
                "Who is this video for? Be specific — not 'business owners,' but 'women who started a business 2 years ago and still feel invisible online.'",
                "What belief does this challenge in them? What are they telling themselves that this video is going to shake up?",
                "What pain am I surfacing? Not creating new pain — just bringing up what's already there.",
                "What does their life look like after they watch this? What changes for them?",
                "Why does this matter to ME to say it? Content that comes from real passion is felt. Content that doesn't come from passion is forgotten.",
              ].map((q, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5" style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--gold)", fontStyle: "italic" }}>{i + 1}.</span>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.65 }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Steps */}
      <div>
        <p className="text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.35)" }}>The Four Steps — Tap to expand each one</p>
        <div className="space-y-3">
          {steps.map((s, idx) => {
            const open = openStep === idx;
            return (
              <div key={s.n} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${s.color}22`, background: "rgba(255,255,255,0.65)" }}>
                {/* Header — always visible, clickable */}
                <button
                  onClick={() => setOpenStep(open ? null : idx)}
                  className="w-full px-6 py-5 flex items-center gap-4 text-left"
                  style={{ background: open ? `${s.color}08` : "transparent" }}
                >
                  <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0" style={{ background: "var(--ink)" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: `${s.color}`, opacity: 0.7 }}>Step</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: s.color, fontStyle: "italic", lineHeight: 1 }}>{s.n}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>{s.label}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] tracking-wider uppercase" style={{ fontFamily: FONT_LUXE, background: `${s.color}14`, color: s.color }}>{s.timing}</span>
                    </div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>{s.tagline}</p>
                  </div>
                  <span style={{ fontFamily: FONT_LUXE, fontSize: "11px", color: "rgba(30,15,10,0.3)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                </button>

                {/* Expanded content */}
                {open && (
                  <div className="px-6 pb-7 space-y-5" style={{ borderTop: `1px solid ${s.color}18` }}>
                    {/* Intro paragraph */}
                    <p className="pt-5" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.8 }}>{s.body}</p>

                    {/* Detail blocks */}
                    {s.details.map((d) => (
                      <div key={d.label} className="rounded-xl p-5" style={{ background: `${s.color}07`, border: `1px solid ${s.color}18` }}>
                        <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: s.color }}>{d.label}</p>
                        <p className="whitespace-pre-line" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.75 }}>{d.text}</p>
                      </div>
                    ))}

                    {/* Example */}
                    {"example" in s && s.example && (
                      <div className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
                        <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>{s.example.label}</p>
                        {Object.entries(s.example).filter(([k]) => k !== "label").map(([k, v]) => (
                          <div key={k} className="mb-3">
                            <p className="mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,168,100,0.5)" }}>{k}</p>
                            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", fontStyle: "italic", lineHeight: 1.6 }}>{String(v)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emotional Triggers Reference */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 3 Reference</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--ink)" }}>The 6 Emotional Triggers</h3>
          <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.5)" }}>If a video doesn't make the viewer feel something, they forget it. Pick one trigger per video. Never shame — expose the pattern.</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          {triggers.map((t) => (
            <div key={t.name} className="rounded-xl p-5" style={{ background: "rgba(200,168,100,0.05)", border: "1px solid rgba(200,168,100,0.12)" }}>
              <div className="flex items-start gap-3">
                <SvgIcon id={t.icon} size={20} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{t.name}</p>
                  <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.65 }}>{t.desc}</p>
                  <div className="mt-2 rounded-lg px-4 py-2.5" style={{ background: "var(--ink)" }}>
                    <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--cream)", fontStyle: "italic" }}>{t.ex}</p>
                  </div>
                  <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.4)", lineHeight: 1.5 }}>Note: {t.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story principle */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Story Principle — Non-Negotiable</p>
        <p className="italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.35rem", color: "var(--cream)", lineHeight: 1.45 }}>"Teach from the scars you turned into strategy — not just from theory."</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Stories build trust", body: "You lived it. You didn't just read it or study it. That lived experience is the thing that separates you from every other person saying the same words." },
            { label: "Stories build emotional connection", body: "Data doesn't move people. Emotion moves people. Stories create the emotional bridge between your content and your viewer's life." },
            { label: "Stories lower resistance", body: "When someone hears a real story they recognise — a struggle, a low point, a moment of doubt — their walls come down. They stop judging and start listening." },
          ].map(({ label, body }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>{label}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.65)", lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
          <p className="text-[9px] tracking-widest uppercase mb-1.5" style={{ fontFamily: FONT_LUXE, color: "rgba(200,168,100,0.5)" }}>How to tell a story in a short-form video</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(250,243,234,0.6)", lineHeight: 1.7 }}>Tell it like a scene, not a summary. "I remember sitting in the parking lot at 10pm, refreshing the page every 5 minutes, with $11 in my account" lands completely differently than "I posted while going through a hard time." The specific detail is the emotional truth. The more specific, the more universal.</p>
        </div>
      </div>

      {/* Quick Reference Card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.25)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ background: "var(--ink)", borderBottom: "1px solid rgba(200,168,100,0.15)" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Quick Reference — Print This Out</p>
        </div>
        <div className="grid sm:grid-cols-4">
          {[
            { n: "01", label: "Hook", time: "First 4 sec", color: "var(--rose)", items: ["Pattern interrupt (shock)", "Personal relevance (clarity)", "On-screen title anchors theme", "Subtitle goes in caption"] },
            { n: "02", label: "Proof", time: "Right after hook", color: "var(--gold)", items: ["Stat or study", "Client result (specific)", "Your own results (with numbers)", "Earns the right to be heard"] },
            { n: "03", label: "Value", time: "The body", color: "#8a6cb0", items: ["Hold up the mirror", "Tell a real story", "Expose patterns (not shame)", "Use one emotional trigger"] },
            { n: "04", label: "CTA", time: "Last 4 sec", color: "var(--ink)", items: ["One ask only", "Say it with confidence", "Comment / Follow / Share / DM", "Algorithm rewards engagement"] },
          ].map(({ n, label, time, color, items }, i) => (
            <div key={n} className="p-5" style={{ borderRight: i < 3 ? "1px solid rgba(200,168,100,0.12)" : "none" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: color === "var(--ink)" ? "var(--ink)" : `${color}15`, border: `1px solid ${color}30` }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: color === "var(--ink)" ? "var(--gold)" : color, fontStyle: "italic" }}>{n}</span>
              </div>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)" }}>{label}</p>
              <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)", marginTop: "2px" }}>{time}</p>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "9px", height: "9px", color }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.6)", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Deal Tracker ───────────────────────────────────── */

type PStage = "new_lead" | "sent" | "responded" | "call_set" | "proposal" | "negotiating" | "won" | "lost";

const STAGE_INFO: Record<PStage, { label: string; color: string; guide: string; nextStage?: PStage; nextLabel?: string }> = {
  new_lead:    { label: "New Lead",        color: "#c8a864", nextStage: "sent",        nextLabel: "✓ Outreach Sent",     guide: "LEAD WITH THE AI CLONE — but do NOT mention price yet. Step 1: send the AI Clone DM or Email. Goal: get them curious enough to say yes to seeing it. Step 2: once they say yes — get a 10-min Zoom or in-person meeting. Step 3: at the meeting, show the clone (build it beforehand), then show the proposal. Step 4: offer the 14-day free trial ($500 setup, first 2 weeks free). Step 5: AFTER they agree to the trial — tell them the monthly is $1,000. Price comes last. The wow moment does the selling." },
  sent:        { label: "Outreach Sent",   color: "#4a90d9", nextStage: "responded",   nextLabel: "✓ They Responded",    guide: "Outreach is out. Wait 2–3 business days. No response? Generate a follow-up — keep it to one sentence. It's all about volume and follow-through." },
  responded:   { label: "They Responded!", color: "#4a9970", nextStage: "call_set",    nextLabel: "✓ Call Booked",       guide: "They replied — green light! Do this in order: Step 1: BUILD THEIR AI CLONE NOW while the excitement is fresh. Grab their photo from their website, Instagram, or Google. Write a 20–25 second script in their voice. Generate the video using your AI video tool. Step 2: Use 'Build Their AI Clone' prompts below to write the script fast. Step 3: Book a 10-minute Zoom or in-person meeting using the 'Book the 10-Min Show & Tell' template. Step 4: Do NOT send the clone before the meeting — the reveal is face to face. That's where the wow moment happens and the deal closes." },
  call_set:    { label: "Call Scheduled",  color: "#7b68ee", nextStage: "proposal",    nextLabel: "✓ Proposal Sent",     guide: "Prep using the CLOSER notes below. Listen first, pitch second. Send the proposal within 24 hours of the call ending — while you're still fresh in their mind." },
  proposal:    { label: "Proposal Sent",   color: "#e08030", nextStage: "negotiating", nextLabel: "✓ They're Interested", guide: "Wait 24–48 hours. No reply? Follow up once. Don't resend the deck — just ask if they had a chance to look at it." },
  negotiating: { label: "Negotiating",     color: "#b8860b", nextStage: "won",         nextLabel: "✓ Mark as Won 🎉",   guide: "Price is the most common objection. First offer: the 14-day free trial ($500 setup upfront, first 2 weeks free, then monthly). If they want a longer commitment discount, offer 10% off a 12-month agreement. Don't drop the monthly price — protect your rate and add value instead." },
  won:         { label: "🎉 Won!",         color: "#2a8a50",                                                              guide: "Send the agreement and onboarding form TODAY. Schedule the kickoff call within 48 hours. Strike while they're excited." },
  lost:        { label: "Not Now",         color: "#888",    nextStage: "new_lead",    nextLabel: "↩ Re-Open",           guide: "Send a warm break-up email. Leave the door open. Set a 30-60 day reminder to circle back — people's situations change." },
};

const STAGE_MSGS: Record<PStage, { label: string; key: string }[]> = {
  new_lead:    [{ label: "🤖 AI Clone Email — Curiosity", key: "ai_clone_pitch" }, { label: "🤖 AI Clone DM — Curiosity", key: "ai_clone_dm" }, { label: "🎁 14-Day Free Trial Email", key: "free_trial" }, { label: "Free Trial DM", key: "free_trial_dm" }, { label: "Cold Email", key: "cold_email" }, { label: "Cold DM", key: "cold_dm" }, { label: "Compliment Email", key: "compliment" }],
  sent:        [{ label: "Follow-Up Email", key: "followup_email" }, { label: "Follow-Up DM", key: "followup_dm" }, { label: "Free AI Video Offer", key: "free_video" }],
  responded:   [{ label: "🎬 Build Their AI Clone", key: "ai_clone_create" }, { label: "📅 Book the 10-Min Show & Tell", key: "book_show_tell" }, { label: "Book the Call", key: "book_call" }, { label: "Reply + Calendar", key: "call_reply" }],
  call_set:    [{ label: "CLOSER Prep Notes", key: "closer_prep" }, { label: "Pitch Deck Outline", key: "pitch_outline" }],
  proposal:    [{ label: "Proposal Follow-Up", key: "proposal_followup" }, { label: "Objection Handling", key: "objections" }],
  negotiating: [{ label: "Annual Deal Offer", key: "annual_deal" }, { label: "Objection Response", key: "obj_response" }],
  won:         [{ label: "Welcome Email", key: "welcome" }, { label: "Kickoff Invite", key: "kickoff" }],
  lost:        [{ label: "Graceful Break-Up", key: "breakup" }, { label: "30-Day Re-Engagement", key: "reengage" }],
};

interface PNote { id: string; text: string; at: string; }
interface PMsg  { id: string; label: string; body: string; at: string; }
interface Prospect {
  id: string; biz: string; contact: string; email: string; phone: string;
  niche: string; city: string; pain: string; source: string;
  stage: PStage; notes: PNote[]; savedMsgs: PMsg[]; created: string;
  quoteSentAt?: string; // ISO — set when quote is saved; auto-expires to "lost" after 7 days
}

const PKEY = "dh_deals_v1";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const loadProspects = (): Prospect[] => {
  try {
    const raw: Prospect[] = JSON.parse(localStorage.getItem(PKEY) || "[]");
    const now = Date.now();
    // Auto-move proposals to "lost" if quote is older than 7 days and no response
    return raw.map(p => {
      if (p.stage === "proposal" && p.quoteSentAt) {
        if (now - new Date(p.quoteSentAt).getTime() > SEVEN_DAYS_MS) {
          return { ...p, stage: "lost" as PStage };
        }
      }
      return p;
    });
  } catch { return []; }
};
const saveAllProspects = (list: Prospect[]) => localStorage.setItem(PKEY, JSON.stringify(list));
const uid = () => Math.random().toString(36).slice(2);
const fmt = (d: string) => new Date(d).toLocaleDateString("en-CA", { month: "short", day: "numeric" });

function genMessage(key: string, p: Prospect): string {
  const fn  = p.contact ? p.contact.split(" ")[0] : "there";
  const biz  = p.biz  || "your business";
  const niche = p.niche || "local business";
  const city  = p.city  || "your area";
  const pain  = p.pain  || "managing social media and getting more leads";

  const t: Record<string, string> = {
    ai_clone_pitch:
`Subject: we made an AI version of you for ${biz}

Hi ${fn},

We actually built an AI version of you for ${biz}. It posts video content to your social media every week automatically. You never have to film anything or show up on camera.

Would you want to see what it looks like?

Mandy
The Dollhouse Brand Studio
shopdollhouse.co`,

    ai_clone_dm:
`Hey ${fn} 👀

We made an AI version of you for ${biz}. It posts content for your business automatically every week and you never have to film anything.

Would you want to see it?`,

    cold_email:
`Subject: quick question about ${biz}

Hi ${fn},

I came across ${biz} online and I love what you're doing in the ${niche} space. One thing I noticed though is that your social media presence doesn't really match the quality of what you're actually offering.

I run The Dollhouse Brand Studio. We handle done-for-you social media for ${niche} businesses in ${city}. Content, posting, ads, automations, all of it. You never have to think about any of it.

Would you be open to a quick 15 minute call? I'd love to show you what we'd do specifically for ${biz}.

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    cold_dm:
`Hey ${fn} 👋

Love what you're doing with ${biz}! Quick question, are you handling your own social content right now or does someone help you with it?

I run a done-for-you social media studio and I already have a couple ideas for ${biz} that I think could really perform. Happy to share them for free, no strings at all.`,

    compliment:
`Subject: compliments to your team at ${biz}

Hi ${fn},

Just wanted to shoot you a quick note. I came across ${biz} and was genuinely impressed with what you're doing in the ${niche} space.

I wanted to share you on social media but noticed ${biz} isn't doing much on Instagram or Facebook. Any reason? I really think more people need to hear about you.

Also where can I leave you a review? I'd love to spread the word.

Mandy Fortune
shopdollhouse.co


(Send this follow-up 2 days later if they reply positively)

Hey ${fn}! Thanks for getting back to me, so glad you liked it.

For the social media side I would genuinely love to help. A lot of other ${niche} businesses in ${city} are using it to get more clients right now and I think we could do the same for ${biz} pretty quickly.

Would love to chat for a few minutes if you're open to it!

Mandy`,

    free_trial:
`Subject: something for ${biz}, no strings

Hi ${fn},

We do done-for-you social media for ${niche} businesses. AI clone content, automations, booking systems, all of it. And right now we're offering a 14 day free trial so you can see real results before committing to anything.

Would it be worth a quick 10 minute call to see what that looks like for ${biz}?

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    free_trial_dm:
`Hey ${fn}! Quick question.

We're offering a 14 day free trial for ${niche} businesses right now. Done-for-you social media, AI clone content, automations, the whole thing. So you can see it actually working before you decide anything.

Worth a 10 minute chat?`,

    followup_email:
`Subject: Re: ${biz}

Hi ${fn},

Just bumping this up in case my last email got buried!

I had a few specific ideas for ${biz} that I think could really move things forward. Happy to run through them on a quick 15 minute call.

Would any time this week work for you?

Mandy`,

    followup_dm:
`Hey ${fn}! Just wanted to bump this in case it got buried.

I genuinely think there's something here for ${biz}. Happy to share a couple of specific ideas for your page, no strings at all.

Just reply yes and I'll send them over 🙂`,

    free_video:
`Hey ${fn}! I reached out a few days ago. I'm the one who builds AI video clones for business owners.

I'd love to make one for ${biz} for free just to show you what it looks like. Would you be open to seeing it?`,

    ai_clone_create:
`AI CLONE CREATION GUIDE — ${biz}
Contact: ${fn}   Niche: ${niche}   City: ${city}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — GET THEIR PHOTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Find the clearest photo of ${fn} from:
  • Their website About page or team page
  • Their Instagram or Facebook profile photo
  • Their Google Business Profile photo
  • LinkedIn headshot

Save the best quality version. A clear, well-lit front-facing photo works best.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — WRITE THEIR SCRIPT (20–25 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use this structure. Fill in the blanks for ${biz}:

HOOK (0–4 sec):
"[One bold sentence about what they do or who they help.
Example: 'If you need a [NICHE SERVICE] in ${city}, you found the right person.']"

VALUE (4–18 sec):
"I'm [NAME] from ${biz}. We [WHAT THEY DO — 1 sentence].
[PROOF OR RESULT — e.g. 'We've helped hundreds of ${niche} clients in ${city} [OUTCOME].']"

CTA (18–25 sec):
"[One clear action — book a call / visit the website / DM us / call us today.]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — GENERATE THE VIDEO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Go to your AI video tool (Kling, Pika, Veo, Runway, or HeyGen).
Upload the photo.
Paste this prompt with the script filled in:

"[${fn} description — e.g. 'A professional ${niche} business owner in business casual attire'] standing in [SETTING — their office, storefront, or clean neutral background]. They look directly into camera and speak naturally with confidence. Vertical cinematic realism. Realistic facial sync. Professional lighting. Natural hand gestures.

Dialogue:
'[PASTE THE FULL SCRIPT HERE]'

Make it feel real, not robotic. Smooth lip sync. Warm and professional energy."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — HAVE EVERYTHING READY FOR THE CALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ AI clone video saved and ready to play (test it first)
✓ Proposal built and customized for ${biz}
✓ Meeting booked — Zoom link or in-person address confirmed
✓ Do NOT send the video before the call — the reveal is face to face`,

    book_show_tell:
`Hi ${fn}!

So great to hear from you. I have something really exciting to show you for ${biz} — it honestly looks way better in person than I could ever describe over text.

Can we grab 10 minutes? I just want to show you something specific we built for ${biz} and get your reaction. That's it.

Would any of these work for you?
→ [DAY], [TIME]
→ [DAY], [TIME]

(Or grab a time directly here: [CALENDAR LINK])

Either a quick Zoom or in person works — whatever is easier for you!

Can't wait to show you.

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co

---
(If they're local, use this version instead)

Hey ${fn}! Great to hear back from you.

I built something specific for ${biz} that I think you're going to love. Would you be open to me swinging by for 10 minutes to show you in person? I'd rather show you than try to explain it over text — it's way more impressive live.

I'm free [DAY] or [DAY] this week — what works for you?`,

    book_call:
`Hi ${fn},

So glad you replied! I would love to show you exactly what we'd do for ${biz}.

Would you be open to a quick 15 minute call? I can walk you through what we're doing for other ${niche} businesses in ${city} and share a few ideas I already have for your page.

Just let me know what day works best for you this week!

Mandy`,

    call_reply:
`Hi ${fn},

So great to hear from you. I think there's a real opportunity here for ${biz}, especially around ${pain}. I would love to show you what that could look like.

What day works best for you this week for a quick 15 minute call? I'll show you exactly what the results look like for other ${niche} businesses.

Mandy Fortune
The Dollhouse Brand Studio`,

    closer_prep:
`CLOSER PREP — ${biz}
Contact: ${p.contact}   Niche: ${niche}   City: ${city}
Their pain point: ${pain}


CLARIFY THE PAIN
Open with this and really listen: "What's your biggest challenge right now with ${pain}? Walk me through what that actually looks like day to day for ${biz}."

LABEL THEM AS A FIT
Reflect it back so they feel heard: "So if I'm understanding you right, the main issue is [their words] and that's costing ${biz} [leads / time / revenue]?"

OUTLINE YOUR SOLUTION
"That's exactly why we built this for ${niche} businesses. We handle the content, the ads, the automations, all of it. ${biz} doesn't touch any of it. You just run your business."

SHARE A RESULT
"We set this up for another ${niche} in ${city} and they [result — e.g. booked 12 new clients in 30 days]. That's what we're going for here."

EXPLAIN THE OFFER
Present all 3 plans. Always start with Elite or Growth. Walk down to Starter only if needed. Never open with the cheapest option. Every plan includes a $500 one-time setup fee. If they hesitate on price say: "We do offer a 14-day free trial — the $500 setup applies but the first two weeks are completely free so you can see results before committing."

ASK FOR THE SALE
"Based on everything you've told me, I think [TIER] is the right fit for ${biz}. Do you want to get started?" Then stop talking. Let them answer.

Listen first. The more they talk, the better you can close.`,

    pitch_outline:
`PITCH DECK OUTLINE — ${biz}

Slide 1 — Introduction
The Dollhouse Brand Studio. Done-for-you social media, ads, and automation for ${niche} businesses.

Slide 2 — Their Problem
Use ${fn}'s exact words from the call: "${pain}". Make them feel understood, not sold to.

Slide 3 — Our Solution
Software and service working together. We handle the content, the ads, the automations. ${biz} handles their business.

Slide 4 — Proof
[INSERT RESULT] — another ${niche} business we helped in ${city}.

Slide 5 — Their Package
Exactly what's included for ${biz}, listed clearly. Also list 1 or 2 things not included so there are zero surprises.

Slide 6 — Investment
$[PRICE]/month + $500 one-time setup · Payment terms: [MONTHLY / UPFRONT]

Slide 7 — Next Steps
Step 1: Sign the agreement   Step 2: Complete the onboarding form (sent same day)   Step 3: Kickoff call within 48 hours`,

    proposal_followup:
`Subject: Re: ${biz} proposal

Hi ${fn},

Just checking in to see if you had a chance to look over the proposal.

Happy to answer any questions or jump on a quick call if it helps. No rush at all, I just want to make sure you have everything you need.

Mandy`,

    objections:
`OBJECTION GUIDE — ${biz}

"It's too expensive."
→ "What's it worth if we book ${biz} [X] new ${niche} clients this month? Most clients make it back in the first month."
→ Offer a term discount: "If budget's a concern, I can do 10% off if ${biz} locks in for the full year — works out to [DISCOUNTED PRICE]/mo."

"I need to think about it."
→ "Of course — what's the one thing you're not sure about? I'd rather talk through it now."

"I'm already working with someone."
→ "How's that going? Are you seeing the results you want?" [Listen] "That's actually why clients come to us — [what we do differently]."

"I don't have time to deal with this right now."
→ "That's exactly the point — you won't have to. We handle everything. The only thing ${fn} will do is approve content once a month."`,

    annual_deal:
`Hi ${fn},

Quick thought. Would ${biz} want to lock in the rate for the year? I can do 10% off your monthly rate if you commit to a 12-month plan — which works out to [ANNUAL PRICE]/mo.

If a full year feels like a lot, we also offer 10% off on a 6-month agreement. Either way you're saving money and locking in the same rate with no surprises.

Most of our clients who go annual save a few hundred dollars and honestly just love not having to think about it month to month.

Let me know and I'll put together the annual agreement today.

Mandy`,

    obj_response:
`Hi ${fn},

Totally get it. [Restate their objection in one short line here.]

Here's what I'd say to that. The businesses we work with who had the same concern typically saw [RESULT] within the first [TIMEFRAME]. And honestly if it's not working for ${biz} in the first 30 days I want to know that too.

What would you need to see to feel good about moving forward?

Mandy`,

    welcome:
`Subject: Welcome to The Dollhouse, ${fn}!

Hi ${fn},

So excited to have ${biz} on board. This is going to be great.

Here's what happens next. I'm sending over the agreement and onboarding form today and just need you to complete it within 24 hours so we can move fast. We'll get your kickoff call scheduled within 48 hours and your first content goes live within 14 days.

So glad you're here!
Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    kickoff:
`Hi ${fn},

Ready to kick things off for ${biz}!

Let's get a 30-minute onboarding call on the calendar. We'll walk through your brand assets and voice, set up your automations together live, confirm your posting schedule and content pillars, and make sure everything is running before we hang up.

Grab a time here: [CALENDAR LINK]

Can't wait to get started. See you soon!
Mandy`,

    breakup:
`Subject: All the best, ${fn}

Hi ${fn},

No worries at all. I know the timing isn't always right.

If things ever change and ${biz} is ready to grow its social presence, I genuinely hope you'll think of us. We'll be here.

Wishing you a great rest of the [MONTH / QUARTER].

Mandy
The Dollhouse Brand Studio`,

    reengage:
`Subject: checking in on ${biz}

Hi ${fn},

It's been a little while since we talked and I wanted to check back in.

A lot has shifted on the social media side recently. [Mention one thing: carousels are outperforming Reels / AI video is changing how ${niche} businesses generate leads / etc.] and ${biz} came to mind right away.

Still happy to put together a quick look at what we'd do. No pressure at all, just wanted to make sure the door was still open.

Mandy`,
  };
  return t[key] ?? "Message template not found.";
}

/* ─── Deal Tracker UI ─────────────────────────────────── */

const EMPTY_FORM = { biz: "", contact: "", email: "", phone: "", niche: "", city: "", pain: "", source: "Cold Email" };

function DealTrackerTab({ prospects, persist, onBuildQuote }: {
  prospects: Prospect[];
  persist: (list: Prospect[]) => void;
  onBuildQuote: (id: string) => void;
}) {
  const [view, setView] = useState<"list" | "detail" | "add">("list");
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [genKey, setGenKey] = useState<string | null>(null);
  const [genBody, setGenBody] = useState("");
  const [copied, setCopied] = useState(false);
  const [msgSaved, setMsgSaved] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [stageFilter, setStageFilter] = useState<PStage | "all">("all");

  function addProspect() {
    if (!form.biz.trim()) return;
    const np: Prospect = { id: uid(), ...form, stage: "new_lead", notes: [], savedMsgs: [], created: new Date().toISOString() };
    const updated = editingId
      ? prospects.map(p => p.id === editingId ? { ...p, biz: form.biz, contact: form.contact, email: form.email, phone: form.phone, niche: form.niche, city: form.city, pain: form.pain, source: form.source } : p)
      : [np, ...prospects];
    persist(updated);
    setForm({ ...EMPTY_FORM }); setEditingId(null); setView("list");
  }

  function deleteProspect(id: string) {
    if (!confirm("Delete this prospect?")) return;
    persist(prospects.filter(p => p.id !== id));
    if (selected === id) { setView("list"); setSelected(null); }
  }

  function advanceStage(id: string) {
    persist(prospects.map(p => { if (p.id !== id) return p; const ns = STAGE_INFO[p.stage].nextStage; return ns ? { ...p, stage: ns } : p; }));
  }

  function markStage(id: string, stage: PStage) {
    persist(prospects.map(p => p.id === id ? { ...p, stage } : p));
  }

  function generate(key: string, p: Prospect) {
    setGenKey(key);
    setGenBody(genMessage(key, p));
    setCopied(false); setMsgSaved(false);
  }

  function copyGen() { navigator.clipboard.writeText(genBody); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  function saveMsg(pid: string) {
    const lbl = STAGE_MSGS[prospects.find(p => p.id === pid)!.stage].find(m => m.key === genKey)?.label ?? genKey ?? "";
    persist(prospects.map(p => p.id === pid ? { ...p, savedMsgs: [{ id: uid(), label: lbl!, body: genBody, at: new Date().toISOString() }, ...p.savedMsgs] } : p));
    setMsgSaved(true); setTimeout(() => setMsgSaved(false), 2000);
  }

  function addNote(pid: string) {
    if (!noteText.trim()) return;
    persist(prospects.map(p => p.id === pid ? { ...p, notes: [{ id: uid(), text: noteText.trim(), at: new Date().toISOString() }, ...p.notes] } : p));
    setNoteText("");
  }

  function deleteNote(pid: string, nid: string) { persist(prospects.map(p => p.id === pid ? { ...p, notes: p.notes.filter(n => n.id !== nid) } : p)); }
  function deleteMsg(pid: string, mid: string) { persist(prospects.map(p => p.id === pid ? { ...p, savedMsgs: p.savedMsgs.filter(m => m.id !== mid) } : p)); }

  const openEdit = (p: Prospect) => { setForm({ biz: p.biz, contact: p.contact, email: p.email, phone: p.phone, niche: p.niche, city: p.city, pain: p.pain, source: p.source }); setEditingId(p.id); setView("add"); };
  const openDetail = (id: string) => { setSelected(id); setGenKey(null); setGenBody(""); setView("detail"); };

  const prospect = prospects.find(p => p.id === selected);
  const stage = prospect ? STAGE_INFO[prospect.stage] : null;
  const filtered = stageFilter === "all" ? prospects : prospects.filter(p => p.stage === stageFilter);

  const inputCls = "w-full rounded-xl px-4 py-2.5 focus:outline-none text-sm";
  const inputStyle = { fontFamily: FONT_BODY, color: "var(--ink)", background: "rgba(255,255,255,0.85)", border: "1px solid rgba(200,168,100,0.3)" };

  /* ── Add / Edit Form ── */
  if (view === "add") return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => { setView("list"); setEditingId(null); setForm({ ...EMPTY_FORM }); }} className="hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>← Back</button>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>{editingId ? "Edit Prospect" : "Add New Prospect"}</h2>
      </div>
      <div className="rounded-2xl p-7 space-y-4" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="grid sm:grid-cols-2 gap-4">
          {([["biz","Business Name *","text"],["contact","Contact Name","text"],["email","Email Address","email"],["phone","Phone Number","tel"],["niche","Niche / Industry *","text"],["city","City","text"]] as [keyof typeof form, string, string][]).map(([k, ph, t]) => (
            <div key={k}>
              <label className="block mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>{ph}</label>
              <input type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph} className={inputCls} style={inputStyle} />
            </div>
          ))}
        </div>
        <div>
          <label className="block mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>How Did You Find Them</label>
          <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} className={inputCls} style={inputStyle}>
            {["Cold Email","Cold DM","Cold Call","Referral","Google Ads Research","Walked In","Social Media","Other"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Their Pain Points / Notes</label>
          <textarea value={form.pain} onChange={e => setForm(f => ({ ...f, pain: e.target.value }))} placeholder="What problems do they have? What did they say on the call? The more detail, the better the generated messages." rows={3} className={inputCls} style={{ ...inputStyle, resize: "vertical" as const }} />
        </div>
        <button onClick={addProspect} disabled={!form.biz.trim()} className="w-full rounded-xl py-3 transition-all hover:opacity-90 disabled:opacity-40" style={{ background: "var(--ink)", fontFamily: FONT_DISPLAY, fontSize: "1.05rem", fontStyle: "italic", fontWeight: 700, color: "var(--gold)" }}>
          {editingId ? "Save Changes" : "Add to Pipeline →"}
        </button>
      </div>
    </div>
  );

  /* ── Detail View ── */
  if (view === "detail" && prospect && stage) return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={() => { setView("list"); setSelected(null); setGenKey(null); setGenBody(""); }} className="hover:opacity-60 transition-opacity shrink-0" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>← Pipeline</button>
          <div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: "var(--rose)", lineHeight: 1 }}>{prospect.biz}</h2>
            {prospect.contact && <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.5)" }}>{prospect.contact}{prospect.email ? ` · ${prospect.email}` : ""}{prospect.phone ? ` · ${prospect.phone}` : ""}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium" style={{ fontFamily: FONT_LUXE, background: `${stage.color}22`, color: stage.color, border: `1px solid ${stage.color}44` }}>{stage.label}</span>
          <button onClick={() => openEdit(prospect)} className="px-3 py-1 rounded-lg hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)", border: "1px solid rgba(200,168,100,0.2)" }}>Edit</button>
          <button onClick={() => deleteProspect(prospect.id)} className="px-3 py-1 rounded-lg hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c97a7a", border: "1px solid rgba(201,122,122,0.2)" }}>Delete</button>
        </div>
      </div>

      {/* Stage Guide */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)", border: `1px solid ${stage.color}33` }}>
        <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: stage.color }}>What to do right now</p>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(250,243,234,0.8)", lineHeight: 1.7 }}>{stage.guide}</p>
        <div className="flex flex-wrap gap-2">
          {stage.nextStage && (
            <button onClick={() => advanceStage(prospect.id)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90" style={{ background: stage.color, fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>
              {stage.nextLabel}
            </button>
          )}
          <select onChange={e => markStage(prospect.id, e.target.value as PStage)} value={prospect.stage} className="px-3 py-2 rounded-xl text-xs" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", background: "rgba(255,255,255,0.08)", color: "rgba(250,243,234,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {(Object.keys(STAGE_INFO) as PStage[]).map(s => <option key={s} value={s}>{STAGE_INFO[s].label}</option>)}
          </select>
          <button onClick={() => onBuildQuote(prospect.id)} className="px-4 py-2 rounded-xl transition-all hover:opacity-90 flex items-center gap-1.5" style={{ background: "rgba(200,168,100,0.2)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", border: "1px solid rgba(200,168,100,0.4)" }}>
            🧮 Build Quote →
          </button>
        </div>
      </div>

      {/* Message Generator */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Message Generator</p>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-4">
            {STAGE_MSGS[prospect.stage].map(m => (
              <button key={m.key} onClick={() => generate(m.key, prospect)} className="px-4 py-2 rounded-xl transition-all hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", background: genKey === m.key ? "var(--ink)" : "rgba(200,168,100,0.12)", color: genKey === m.key ? "var(--gold)" : "rgba(30,15,10,0.65)", border: "1px solid rgba(200,168,100,0.25)" }}>
                {m.label}
              </button>
            ))}
          </div>
          {genBody && (
            <div className="space-y-3">
              <textarea value={genBody} onChange={e => setGenBody(e.target.value)} rows={10} className="w-full rounded-xl px-4 py-3 text-sm leading-relaxed focus:outline-none" style={{ fontFamily: FONT_BODY, color: "var(--ink)", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(200,168,100,0.3)", resize: "vertical" as const }} />
              <div className="flex gap-2">
                <button onClick={copyGen} className="flex-1 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: copied ? "#4a7a4a" : "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: copied ? "#fff" : "var(--gold)" }}>{copied ? "✓ Copied!" : "Copy"}</button>
                <button onClick={() => saveMsg(prospect.id)} className="flex-1 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: msgSaved ? "#4a7a4a" : "rgba(200,168,100,0.15)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: msgSaved ? "#fff" : "var(--gold)", border: "1px solid rgba(200,168,100,0.3)" }}>{msgSaved ? "✓ Saved!" : "Save to History"}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Notes</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-2">
            <input value={noteText} onChange={e => setNoteText(e.target.value)} onKeyDown={e => e.key === "Enter" && addNote(prospect.id)} placeholder="Add a note — what happened, what they said, next step..." className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <button onClick={() => addNote(prospect.id)} disabled={!noteText.trim()} className="px-4 py-2.5 rounded-xl disabled:opacity-40 hover:opacity-90 transition" style={{ background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>Add</button>
          </div>
          {prospect.notes.length === 0 && <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.35)" }}>No notes yet. Log what happened after each touchpoint.</p>}
          {prospect.notes.map(n => (
            <div key={n.id} className="flex items-start justify-between gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
              <div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.8)" }}>{n.text}</p>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)", marginTop: "2px" }}>{fmt(n.at)}</p>
              </div>
              <button onClick={() => deleteNote(prospect.id, n.id)} className="shrink-0 hover:opacity-50 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", color: "rgba(201,122,122,0.6)" }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Messages */}
      {prospect.savedMsgs.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
            <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Saved Messages</p>
          </div>
          <div className="p-5 space-y-3">
            {prospect.savedMsgs.map(m => (
              <div key={m.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ background: "rgba(200,168,100,0.06)", borderBottom: "1px solid rgba(200,168,100,0.1)" }}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.18)", color: "#9a7a3a" }}>{m.label}</span>
                    <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>{fmt(m.at)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { navigator.clipboard.writeText(m.body); }} className="hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>Copy</button>
                    <button onClick={() => deleteMsg(prospect.id, m.id)} className="hover:opacity-50 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", color: "rgba(201,122,122,0.5)" }}>✕</button>
                  </div>
                </div>
                <pre className="px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: FONT_BODY, color: "rgba(30,15,10,0.65)", margin: 0 }}>{m.body}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ── List View ── */
  const stages = Object.keys(STAGE_INFO) as PStage[];
  const counts = stages.reduce((acc, s) => ({ ...acc, [s]: prospects.filter(p => p.stage === s).length }), {} as Record<PStage, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionHeader label="Deal Pipeline" title="Close your next client." sub="Every prospect in one place. Click to open, generate personalized messages, log notes, and track every deal from first contact to signed." />
        <button onClick={() => { setForm({ ...EMPTY_FORM }); setEditingId(null); setView("add"); }} className="px-5 py-2.5 rounded-xl shrink-0 hover:opacity-90 transition" style={{ background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
          + Add Prospect
        </button>
      </div>

      {/* Lead Strategy Spotlight */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, var(--ink) 0%, #2a1a10 100%)", border: "1px solid rgba(200,168,100,0.3)" }}>
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <SvgIcon id="bot" size={18} />
              <p className="text-[9px] tracking-[0.25em] uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Lead Strategy #1 · Featured Offer</p>
            </div>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--cream)", fontWeight: 400, lineHeight: 1.1 }}>AI Clone / Character Package — <span style={{ color: "var(--gold)" }}>$1,000/mo</span> <span style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(250,243,234,0.45)", fontStyle: "normal" }}>+ $500 one-time setup</span></h3>
            <p className="mt-2 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(250,243,234,0.7)" }}>
              We build a custom AI avatar of the business owner — a digital twin that looks, sounds, and speaks like them — and use it to post branded video content automatically every week. It's included in every plan starting at $1,000/mo with a $500 one-time setup. Hesitant prospects get the 14-day free trial pitch: $500 setup upfront, first two weeks free, then monthly.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {["Custom AI avatar built to look & sound like the owner","Branded video content scripted + produced weekly","Posted to their platforms automatically — nothing for them to do","Comments & DMs handled by AI — no lead goes cold"].map(f => (
                <div key={f} className="flex items-start gap-2">
                  <span style={{ color: "var(--gold)", marginTop: "1px", flexShrink: 0 }}>✓</span>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(250,243,234,0.65)" }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4 text-center shrink-0" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.25)", minWidth: "120px" }}>
            <p style={{ fontFamily: FONT_SCRIPT, fontSize: "1.1rem", color: "var(--gold)" }}>open a prospect</p>
            <p className="mt-1" style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,243,234,0.4)" }}>to generate the</p>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,243,234,0.4)" }}>AI clone pitch</p>
          </div>
        </div>
      </div>

      {/* Stage filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setStageFilter("all")} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", background: stageFilter === "all" ? "var(--ink)" : "rgba(255,255,255,0.6)", color: stageFilter === "all" ? "var(--gold)" : "rgba(30,15,10,0.5)", border: "1px solid rgba(200,168,100,0.2)" }}>
          All ({prospects.length})
        </button>
        {stages.filter(s => counts[s] > 0).map(s => (
          <button key={s} onClick={() => setStageFilter(s)} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", background: stageFilter === s ? STAGE_INFO[s].color : "rgba(255,255,255,0.6)", color: stageFilter === s ? "#fff" : "rgba(30,15,10,0.5)", border: `1px solid ${STAGE_INFO[s].color}44` }}>
            {STAGE_INFO[s].label} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Stale Deal Protocol */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-5 py-3.5" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", display: "flex", alignItems: "center", gap: "5px" }}><SvgIcon id="clock" size={12} /> Stale Deal Protocol — What to Do When a Deal Isn't Moving</p>
        </div>
        <div className="px-5 py-4">
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { stage: "7+ days — no reply after outreach", action: "Switch channels. If you emailed → DM. If you DM'd → call. If you called → email. People live in different inboxes. Don't give up, just change the door." },
              { stage: "14+ days — responded but call not booked", action: "They're warm but stalling. Send the 'Book the 10-Min Show & Tell' message. Lead with what they'll actually see — the AI clone. Curiosity closes more than urgency." },
              { stage: "21+ days — call had, proposal sent, gone quiet", action: "This is usually a soft no or cold feet. Send one warm check-in: 'Still thinking about it? Happy to answer any questions.' Then set a 30-day re-engage reminder and move on." },
            ].map(({ stage, action }) => (
              <div key={stage} className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                <p className="mb-1.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c8a864" }}>{stage}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.55 }}>{action}</p>
              </div>
            ))}
          </div>
          <p className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontSize: "0.88rem", color: "rgba(30,15,10,0.5)", fontStyle: "italic", lineHeight: 1.5 }}>Rule of thumb: if a deal hasn't moved in 14 days and you haven't done anything about it — it's your fault, not theirs. One follow-up is all it takes most of the time.</p>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px dashed rgba(200,168,100,0.3)" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "rgba(30,15,10,0.35)", fontStyle: "italic" }}>No prospects yet.</p>
          <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.3)" }}>Add your first prospect to start the pipeline.</p>
          <button onClick={() => { setForm({ ...EMPTY_FORM }); setEditingId(null); setView("add"); }} className="mt-5 px-6 py-2.5 rounded-xl hover:opacity-90 transition" style={{ background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
            + Add First Prospect
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => {
          const s = STAGE_INFO[p.stage];
          // Days remaining on quote
          const daysLeft = p.quoteSentAt && p.stage === "proposal"
            ? Math.max(0, Math.ceil((new Date(p.quoteSentAt).getTime() + SEVEN_DAYS_MS - Date.now()) / 86400000))
            : null;
          const expiryColor = daysLeft !== null ? (daysLeft <= 1 ? "#e05555" : daysLeft <= 3 ? "#e0943a" : "#4a9970") : null;
          return (
            <button key={p.id} onClick={() => openDetail(p.id)} className="text-left rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.2)", boxShadow: "0 4px 16px -8px rgba(160,110,95,0.15)" }}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] tracking-widest uppercase font-medium" style={{ fontFamily: FONT_LUXE, background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>{s.label}</span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>{fmt(p.created)}</span>
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--ink)", lineHeight: 1.2 }}>{p.biz}</h3>
              {p.contact && <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>{p.contact}</p>}
              {p.niche && <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.45)", marginTop: "1px" }}>{p.niche}{p.city ? ` · ${p.city}` : ""}</p>}
              {daysLeft !== null && expiryColor && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: `${expiryColor}18`, border: `1px solid ${expiryColor}44` }}>
                  <span style={{ fontFamily: FONT_LUXE, fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: expiryColor }}>
                    {daysLeft === 0 ? "⚠ Expires today" : `⏳ Quote expires in ${daysLeft}d`}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(200,168,100,0.12)" }}>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)" }}>{p.notes.length} note{p.notes.length !== 1 ? "s" : ""}</span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)" }}>{p.savedMsgs.length} saved msg{p.savedMsgs.length !== 1 ? "s" : ""}</span>
                <span className="ml-auto" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "var(--gold)" }}>Open →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
const PW_HASH = "cdc132ff0a47a81b6e95dbc1b9e16b8df2a97e39f580e110ad02359dca43acef";
const ADMIN_EMAIL = "fortuneamanda@hotmail.com";

async function hashString(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const h = await hashString(pw);
    if (email.toLowerCase().trim() === ADMIN_EMAIL && h === PW_HASH) {
      sessionStorage.setItem("dh_admin", "1");
      onAuth();
    } else {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p style={{ fontFamily: FONT_SCRIPT, fontSize: "1.6rem", color: "rgba(30,15,10,0.4)" }}>the</p>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--rose)", fontWeight: 400, letterSpacing: "0.06em", marginTop: "-6px" }}>DOLLHOUSE</h1>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>Brand Studio · Admin</p>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.25)", backdropFilter: "blur(12px)" }}>
          <input
            type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full rounded-xl px-4 py-3 focus:outline-none"
            style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink)", background: "rgba(255,255,255,0.85)", border: `1px solid ${error ? "#c97a7a" : "rgba(200,168,100,0.35)"}` }}
          />
          <input
            type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} required
            className="w-full rounded-xl px-4 py-3 focus:outline-none"
            style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink)", background: "rgba(255,255,255,0.85)", border: `1px solid ${error ? "#c97a7a" : "rgba(200,168,100,0.35)"}` }}
          />
          {error && <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "#c97a7a" }}>Incorrect email or password.</p>}
          <button
            type="submit" disabled={loading}
            className="w-full rounded-xl py-3 transition-all hover:opacity-90 disabled:opacity-60 mt-2"
            style={{ background: "var(--ink)", fontFamily: FONT_DISPLAY, fontSize: "1rem", fontStyle: "italic", fontWeight: 700, color: "var(--gold)" }}
          >
            {loading ? "Checking..." : "Enter the Playbook →"}
          </button>
        </form>
      </div>
    </main>
  );
}

/* ─── Start Here Tab ─────────────────────────────────── */
function StartHereTab() {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const week1: { day: number; title: string; colour: string; warning: string; tasks: { task: string; detail: string }[] }[] = [
    {
      day: 1, colour: "#c8a864", title: "Foundation — Get Every Account Set Up",
      warning: "Don't send a single DM until Day 7. Build the infrastructure first.",
      tasks: [
        { task: "Create your agency profile inside the platform", detail: "Name: The Dollhouse Brand Studio. Upload your logo, set your brand colours, add a professional photo. This is the first thing clients see when they're onboarded — make it look like a real business." },
        { task: "Connect all 4 social media accounts to the platform", detail: "TikTok, Instagram, Facebook, Threads. You need these connected to post content for your own brand AND to eventually link client accounts. Do this once, benefit forever." },
        { task: "Set up Stripe (or the platform's built-in payments)", detail: "You cannot get paid without this. Takes 10 minutes. You need a bank account and a government ID. Once connected, you can send invoices and collect setup fees instantly." },
        { task: "Set up a professional email", detail: "hello@shopdollhouse.co — forward it to your personal Gmail for now. Free to set up with Google Workspace or just use a Gmail alias until you're ready to pay." },
        { task: "Create a booking link", detail: "Use Calendly (free) or your platform's built-in calendar. Set up one slot: 'Discovery Call — 30 minutes.' This link goes in every single DM when someone says they're interested. Never make them figure out your schedule." },
        { task: "Download Canva (free)", detail: "You'll use Canva to design client content and create your own social media graphics. The free plan is enough to start. Set up a Canva account with your business email. (The brand kit product is already built — Canva is for your agency work.)" },
      ],
    },
    {
      day: 2, colour: "#c97a7a", title: "Build Your AI Avatar Demo",
      warning: "This is the close. It needs to exist and look good before you contact anyone.",
      tasks: [
        { task: "Take a clean, well-lit photo of yourself", detail: "Front-facing, single person, neutral or simple background. Good lighting matters — face a window or use a ring light. Portrait mode on an iPhone works perfectly. This is the photo the AI uses to generate your avatar, so quality directly affects the result." },
        { task: "Write 3 avatar scripts (15–20 seconds each)", detail: "Script 1 — Social media pitch: 'Hi, I'm [NAME] from The Dollhouse Brand Studio. We do done-for-you social media for local businesses — content, posting, automations — everything runs for you every single day. DM SOCIAL to see what we'd do for your business.' Script 2 — AI avatar demo: 'What you're watching right now is an AI avatar — a digital version of a real business owner. We build one of these for every client. It posts content automatically, promotes their services, and they never have to film a thing.' Script 3 — Brand awareness: 'I'm Mandy, and I run The Dollhouse Brand Studio. We help local businesses show up online every single day — without the owner ever touching a phone.'" },
        { task: "Generate each avatar video in your AI video tool", detail: "Upload your photo. Paste the script. Choose a natural-sounding voice (not robotic — listen to a few samples before you pick). Generate. Download. Watch the full video before saving — check that the lip sync looks natural and the voice sounds real. Regenerate if anything looks off." },
        { task: "Save all 3 organized by name", detail: "Create a folder: Dollhouse → Demo Videos → [Date]. You'll be building these for prospects too — stay organized from day 1 so you're never hunting for the right file during a call." },
        { task: "Send yourself the demo on your phone", detail: "You need to be able to pull it up in under 10 seconds during a live or a call. Save it to your camera roll. Test playing it with sound. This is your most important tool." },
      ],
    },
    {
      day: 3, colour: "#7b68ee", title: "Build Your Own Brand Content",
      warning: "If you're selling social media, your own pages must look like proof. This is non-negotiable.",
      tasks: [
        { task: "Write your bio for every platform (same formula, slightly different)", detail: "Formula: What you do + who you help + one CTA. Example: 'Done-for-you social media for local businesses 🌸 AI-powered content, posted every day 📲 DM SOCIAL to get started — link below ↓'" },
        { task: "Design 7 posts in Canva — one week of content", detail: "Use these 7 themes in order: 1) What The Dollhouse does (introduce the service) 2) Show your AI avatar demo video 3) Before/after concept — 'what your social media looks like vs. what it could look like' 4) Pricing transparency — 'here's what $1,000/mo gets you' 5) Behind the scenes — setting up the platform for a client 6) A tip for business owners — 'the one social media mistake costing you clients' 7) Your story — why you started this." },
        { task: "Write 7 captions using the prompts in the Content Prompts tab", detail: "Open the Content Prompts tab. Use the Caption Writing prompt. Give it the post concept and your brand voice. Edit the first line to sound like you — AI writes well, but the opening always needs your personality. Batch all 7 in one sitting. Never write one at a time." },
        { task: "Schedule all 7 posts across all 4 platforms right now", detail: "Post times that work: 9am, 12pm, or 6pm. Spread across Mon–Sun. Use your platform's scheduler or each platform's native scheduling. Don't post them all today — stagger them so you have content going live all week even when you're busy." },
        { task: "Set up your link in bio on every platform", detail: "Use Linktree (free) or Stan.store's link page. Add three links: 1) 'Book a Free Discovery Call' (your Calendly link) 2) 'Get the Brand Kit — $97' (your Stan.store product link — already live) 3) Your website (shopdollhouse.co). This link goes in every single bio. Update it as you add more." },
      ],
    },
    {
      day: 4, colour: "#4a9970", title: "Brand Kit Is Live — Activate & Start Selling",
      warning: "✅ Already built. The interactive brand builder is live at shopdollhouse.co/brand-room and the product is set up on Stan.store. Today is about testing the experience, getting your links, and filming the content that sells it.",
      tasks: [
        { task: "Go to your Stan.store dashboard and copy your Brand Kit product link", detail: "This is the link you will paste everywhere: in the chat during every TikTok LIVE, in your link-in-bio, in DMs when someone says they want to start a business. Save it as a note on your phone. You should be able to copy-paste it in under 5 seconds." },
        { task: "Buy your own product as a test customer", detail: "Use a real card (you can refund yourself). Go through the entire purchase flow: click buy, enter payment, check what email comes, click every link. If anything is slow, confusing, or broken — fix it before you send real customers through it. One bad buying experience will cost you more than it costs to fix." },
        { task: "Open the brand builder at shopdollhouse.co/brand-room and screen record a 60-second walkthrough", detail: "This is your product demo video. Walk through the interactive tool — show how it works, what they can customise, what they get. Talk over it: 'I built this for anyone who wants to start a business but doesn't know where to begin. For $97 you get a full interactive brand builder — logo, colours, fonts, social templates, and a first-sale checklist. Everything you need to look professional and make your first sale this week.' Post this to TikTok and Instagram tomorrow." },
        { task: "Set up the KIT keyword automation on TikTok, Instagram, and Facebook", detail: "Keyword: KIT → auto-DM: 'Here's your link to the Dollhouse Brand Kit 🌸 $97 and you get instant access to the full interactive brand builder — logos, colours, fonts, social templates, and your first-sale checklist: [YOUR STAN.STORE LINK]' This automation runs 24/7. Every person who comments KIT on any of your posts gets the link instantly." },
        { task: "Add the Stan.store link to every single bio and link-in-bio page", detail: "Your link-in-bio should have three links minimum: 1) Book a Free Discovery Call 2) Get the Brand Kit — $97 (Stan.store link) 3) shopdollhouse.co. Check TikTok, Instagram, Facebook, and Threads. Update them all right now while you're thinking about it — not later." },
      ],
    },
    {
      day: 5, colour: "#4a90d9", title: "Get Your Tech Running",
      warning: "None of this needs to be perfect. It just needs to work before your first client signs.",
      tasks: [
        { task: "Set up missed call text-back in the platform for your own number", detail: "Any missed call → auto-SMS fires immediately → 'Hey! Sorry we missed you — how can we help?' Takes 5 minutes to build and runs forever. This is also what you'll set up for every client on day 1 of their onboarding. Do it for yourself first so you know the steps cold." },
        { task: "Build a simple lead capture form in the platform", detail: "Fields: Name, Email, Phone, 'What's your biggest social media challenge right now?' When filled out → contact created in CRM → auto-DM or email fires → task created for follow-up. This is your first workflow. Clients get the same thing built during their onboarding." },
        { task: "Build your proposal template in the Quote Builder", detail: "Open the Quote Builder tab. Select the Starter package. Add typical add-ons. Generate the quote. Copy it. Save it somewhere. This is your starting point — you'll personalize 4 fields and it's done. Never start a proposal from scratch." },
        { task: "Set up your comment keyword automations on your own social", detail: "Keyword: SOCIAL → auto-DM: 'Hey! I'm so glad you're interested 🌸 Here's my booking link to chat about your social media: [LINK]' Keyword: AVATAR → auto-DM: 'I love that you asked! I'd love to show you what an AI avatar would look like for your business. Book a free 10-minute call here: [LINK]' Keyword: KIT → auto-DM: 'Here's the link to the Brand Kit: [LINK] — everything you need to look professional and launch this week!' Test all three before going live." },
        { task: "Practice sending a test invoice", detail: "Create a $500 invoice in your platform or Stripe. Send it to yourself. Pay it with a test card. Make sure it works end to end. Sending an invoice should take you 90 seconds. If it takes longer, practice until it doesn't." },
      ],
    },
    {
      day: 6, colour: "#d48e28", title: "Practice Your First TikTok LIVE",
      warning: "Your first live will be awkward. Do it today — not tomorrow in front of real leads.",
      tasks: [
        { task: "Do a private practice live for 20 minutes", detail: "Go live on TikTok. Check everything: Is the lighting flattering? Can you hear yourself clearly? Does your background look clean? Is your phone stable on a stand? Fix these things now — not when you're live with viewers." },
        { task: "Practice your opening out loud 5 times", detail: "'Hey, welcome! If you're just joining — I'm Mandy from The Dollhouse Brand Studio. We go live here every day at 8:30am. Today I'm going to show you [TOPIC]. Drop a wave in the chat so I can see who's here!' Practice until it feels natural, not scripted." },
        { task: "Practice showing your AI avatar demo on camera", detail: "Pull up the avatar video on your phone or computer and show it during the practice live. Practice saying: 'What you're seeing right now is an AI avatar — a digital version of a real business owner. We build one of these for every client. They never have to film anything.' Practice the pause after. Let the video do the work." },
        { task: "Write your live outline on a sticky note you can see off-camera", detail: "0–5 min: Welcome. 5–20 min: Value (teach one useful thing). 20–35 min: Engagement (ask a question, respond to comments). 35–50 min: AI avatar demo + DM CTA. 50–60 min: Brand kit offer + link in chat. 60 min: Wrap + 'follow for tomorrow.' You don't read it — it's just a safety net so you never blank." },
        { task: "Set up your physical live space for tomorrow morning", detail: "Clean background or simple decor. Ring light or face a bright window. Phone on a stand at eye level. Charger plugged in (lives drain battery fast — you cannot go dead mid-live). Glass of water. Notifications silenced. Everything ready before 8:15am." },
      ],
    },
    {
      day: 7, colour: "#c97a7a", title: "Go Live + Send Your First 10 DMs",
      warning: "Day 7 is when the business starts. Everything before this was setup. This is real.",
      tasks: [
        { task: "Post a 'going live tomorrow' story on IG and Facebook TONIGHT", detail: "'I'm going live tomorrow morning at 8:30am — I'm going to show you something you've never seen before. Set a reminder.' This primes your audience even before you have one. Even 1 viewer who comes back tomorrow is proof it works." },
        { task: "Go live at exactly 8:30am", detail: "Even if 0 people are watching. The algorithm needs to see that you show up at the same time every day before it starts showing you to more people. Consistency comes first, audience comes second. Talk to the camera like there are 500 people watching — because eventually there will be." },
        { task: "Research 20 leads using the Google Maps Method", detail: "Open the Outreach Scripts tab → Blueprint section. Follow the Google Maps Method. Find 20 businesses with weak social (under 200 followers, last post 4+ weeks ago, bad graphics). Write: their name, Instagram handle, one specific thing about their business. This is your outreach list." },
        { task: "Send your first 10 cold DMs", detail: "Use the AI Clone Pitch from the Outreach Scripts tab → AI Clone Pitch section. Personalize the business name and the compliment. Send exactly 10 today. The number feels small — good. This is about building the habit, not hitting volume. Volume comes next week." },
        { task: "Add all 10 leads to the Deal Pipeline", detail: "Open the Deal Pipeline tab. Create a deal for each lead — name, business, platform. Set stage to 'Contacted.' This is how you track who replied, who ghosted, who said yes. If it's not tracked, it doesn't exist." },
      ],
    },
  ];

  const liveStructure = [
    { time: "0–5 min", label: "Welcome & Hook", colour: "#dc2626", type: "LIVE",
      what: "Start talking the second you go live — don't wait for viewers. 'Hey! Welcome! If you're just joining, I'm Mandy from The Dollhouse Brand Studio and we go live here every day at 8:30am.' Then immediately tease what you're covering: 'Today I'm going to show you something I guarantee you've never seen — stick around for the full thing.'",
      cta: "Ask them to drop a wave or their city in the comments. Every comment boosts your reach." },
    { time: "5–20 min", label: "Teach One Valuable Thing", colour: "#4a64c8", type: "Value",
      what: "Pick ONE topic. Examples that perform: '3 social media mistakes that are costing local businesses clients right now' / 'What $1,000/mo in done-for-you social media actually looks like' / 'I'm going to rebuild this business's entire social presence live right now' / 'How the comment-to-DM automation works (and why it books appointments while you sleep).' Give real value. People who learn something stay — and come back tomorrow.",
      cta: "Every 5 minutes: 'Drop your business type in the comments — I'm going to give you specific feedback.'" },
    { time: "20–35 min", label: "Engage the Room", colour: "#4a9970", type: "Outreach",
      what: "Stop teaching. Start asking. 'What's the hardest part of social media for your business right now?' 'Has anyone ever worked with a social media agency before? What was your experience?' Read the comments out loud and respond to each one. This is where you identify hot leads — the person who comments 'I've been struggling with this for months' is your next client.",
      cta: "Watch for business owners in the comments. DM them during the live while they're still watching." },
    { time: "35–50 min", label: "🔴 The AI Avatar Demo", colour: "#dc2626", type: "Close",
      what: "'Okay — I promised I'd show you something you've never seen. Here it is.' Play your AI avatar demo video. Let it play all the way through without talking over it. Then: 'That is an AI avatar — a digital version of a real business owner. I build one of these for every client. It posts content for their business every week and they never have to film a single thing. If you want to see what one would look like for YOUR business — DM me the word AVATAR right now.'",
      cta: "Drop 'DM me AVATAR' in the chat. Say it out loud. Say it again at the end of the demo. This is your primary B2B CTA." },
    { time: "50–58 min", label: "Brand Kit Offer (B2C)", colour: "#7b68ee", type: "Offer",
      what: "Shift the audience. 'For those of you who are watching and you're not a business yet — you're thinking about starting something but you don't know where to begin — this next part is for you.' Pull up shopdollhouse.co/brand-room on your screen and show the interactive brand builder live. 'I built this for $97. You get a full interactive brand builder — you pick your logo, your colours, your fonts — plus social media templates and a first-sale checklist. Everything you need to look professional and make your first sale this week. The link is going in the chat right now.'",
      cta: "Drop your Stan.store link in the chat. Say the price. Say what they get. Show them clicking through the brand builder — the demo sells itself. Keep it under 3 minutes." },
    { time: "58–60 min", label: "Wrap + Tomorrow's CTA", colour: "#c8a864", type: "Close",
      what: "'Thank you so much for being here today. If you're a business owner who wants to hand off your social media — DM me SOCIAL and let's talk. If you want to start your business and you need the brand kit — link is in the chat. And follow this account right now because I'm here every single morning at 8:30am.' Wave. End the live.",
      cta: "Within 30 minutes: DM every person who commented. Clip 3-5 moments from the live. Post the best clip as a TikTok right now." },
  ];

  const noproofScripts = [
    {
      scenario: "They ask: 'Can I see some examples of your work?'",
      scripts: [
        { label: "Option 1 — Use your own brand", text: "Absolutely — actually, everything you're seeing on my page right now is built with the exact same system I'd build for you. My TikTok, my Instagram, my content — it's all created using the AI tools I use for clients. That IS the portfolio. And the AI avatar I just showed you? That was built for my own brand first." },
        { label: "Option 2 — The trial IS the proof", text: "Honestly? The best example I can give you is your own business. That's why we have the 14-day trial. Instead of showing you someone else's results, we'll build it for YOUR business and you'll see it working in real time. That's more valuable than any case study." },
        { label: "Option 3 — Free mini-audit (builds trust)", text: "What I'll do is put together a quick look at [BUSINESS NAME]'s current social presence — what you're posting, what's missing, and what I'd change first. Takes me 15 minutes and I'll send it to you completely free. That way you can see how I think before we talk about working together." },
        { label: "Option 4 — The honest close (most trust)", text: "I'm being selective about who I take on right now because I want to build case studies I'm genuinely proud of. That's actually WHY I offer the 14-day free trial — you get real results without any financial risk, and I get a case study I can use to show the next person. It's the best deal for both of us. Want to be one of the first?" },
      ],
    },
    {
      scenario: "CLOSER — 'S' step: you have no case study to share",
      scripts: [
        { label: "Use yourself as the case study", text: "I'll be transparent with you — I'm building my own client base right now and the first case study I have is my own. I built the entire Dollhouse Brand Studio system for myself first. Everything I'm showing you — the AI avatar, the automations, the content system — I set all of it up from scratch. So you're not getting someone who's theorizing. You're getting someone who built it and uses it every day." },
        { label: "Use a concept case study", text: "I want to show you what this would look like for a [THEIR NICHE] business specifically. I've been thinking about exactly how I'd approach [BUSINESS NAME] and I actually put some ideas together. [Share a few specific ideas tailored to their business.] Does this match what you're looking for?" },
      ],
    },
  ];

  const platformSetup = [
    { step: "Agency profile", detail: "Business name, logo, contact email, business phone. This is what clients see in the platform. Make it look like a real agency." },
    { step: "Payment processing", detail: "Connect Stripe or the platform's payment gateway. Test it with a $1 transaction before you need it for real." },
    { step: "Calendar / booking system", detail: "Set up one booking type: Discovery Call, 30 minutes. Connect your Google Calendar. Test the booking flow from a private browser." },
    { step: "Your own social media connected", detail: "TikTok, Instagram, Facebook, Threads. You'll post your own content through the platform so you know how it works before doing it for clients." },
    { step: "Brand board (yours)", detail: "Your colours: Blush #f4dcdc, Rose #c97a7a, Gold #c8a864, Ink #1e0f0a, Cream #fdf6ef. Your fonts. Your logo. The platform pulls from this when creating AI content." },
    { step: "Missed call text-back", detail: "Go to workflows. Create trigger: missed call. Action: send SMS immediately → 'Hey! Sorry we missed you — how can we help? Reply here and we'll be right with you.' Publish it. Test by calling yourself and not answering." },
    { step: "Lead capture form", detail: "Build a simple form: Name, Email, Phone, biggest social media challenge. Set automation: form submit → create contact → add tag 'New Lead' → send welcome email. Test it." },
    { step: "CRM pipeline stages", detail: "Set up your stages to match the Deal Pipeline tab: New Lead → Contacted → Responded → Call Set → Proposal Sent → Trial → Client → Lost. These are already in the Deal Tracker — match your CRM to them." },
    { step: "Test everything end-to-end", detail: "Fill out your own lead form. Watch the automation fire. Book a fake discovery call. Send a test invoice. Everything should work before your first real lead hits it." },
  ];

  const brandKitPitches = [
    { platform: "TikTok LIVE", script: "'For those of you who've been thinking about starting a business but you don't know where to begin — I made something for you. It's called the Dollhouse Brand Kit. For $97, you get your logo templates, your brand colours, your social media templates, and a first-sale checklist. Everything you need to look professional and make your first sale this week. Link is going in the chat RIGHT NOW.'" },
    { platform: "TikTok Video Caption", script: "She wanted to start a business. She didn't know how to make it look real. So I gave her everything. The logo. The colours. The social media templates. The checklist for getting her first sale. $97. Everything you need to launch this week. Link in bio ✨ #smallbusiness #womeninbusiness #brandkit #startabusiness" },
    { platform: "Instagram Story", script: "Slide 1: 'Wanting to start a business but don't know where to start?' Slide 2: 'I made this for you →' Slide 3: Show the kit contents. Slide 4: '$97. Instant download.' Slide 5: Link sticker → Stan.store" },
    { platform: "DM (when someone says they want to start a business)", script: "Oh my gosh that's so exciting! I actually built something specifically for this. It's called the Dollhouse Brand Kit — for $97 you get your logo templates, brand colours, social media templates, and a step-by-step checklist for making your first sale. A lot of women use it to go from 'I want to start something' to 'I'm actually launching this week.' Want the link?" },
  ];

  return (
    <div>
      <SectionHeader
        label="Read This First"
        title="Start Here — Your First 7 Days"
        sub="You have zero clients, zero followers, and zero proof. This tab tells you exactly what to do before you send your first DM, go live, or say a price out loud. Follow this in order."
      />

      {/* ── Week 1 Checklist ── */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Days 1–7</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>Zero-Client Survival Checklist</h3>
        <p className="mb-6" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>Each day has a specific job. Do them in order. By Day 7 you're live, you have a product, and you've sent your first DMs.</p>
        <div className="space-y-2">
          {week1.map((d) => {
            const isOpen = openDay === d.day;
            return (
              <div key={d.day} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${d.colour}35`, background: isOpen ? `${d.colour}10` : "rgba(255,255,255,0.55)" }}>
                <button onClick={() => setOpenDay(isOpen ? null : d.day)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: d.colour }}>
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "#fff", fontStyle: "italic", fontWeight: 600 }}>{d.day}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "var(--ink)" }}>Day {d.day} — {d.title}</p>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.45)", marginTop: "1px" }}>{d.tasks.length} tasks</p>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0 ml-3 transition-transform" style={{ color: "rgba(30,15,10,0.3)", transform: isOpen ? "rotate(180deg)" : "none" }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1">
                    <div className="rounded-xl px-4 py-2.5 mb-4" style={{ background: `${d.colour}20`, border: `1px solid ${d.colour}40` }}>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.7)", fontStyle: "italic" }}>⚠️ {d.warning}</p>
                    </div>
                    <div className="space-y-3">
                      {d.tasks.map((t, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${d.colour}22`, border: `1px solid ${d.colour}45` }}>
                            <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", color: d.colour, fontWeight: 700 }}>{i + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", color: "var(--ink)", fontWeight: 500, marginBottom: "3px" }}>{t.task}</p>
                            <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.6 }}>{t.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Platform Setup ── */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Do This Once</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>Platform Setup Checklist</h3>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>Every client references 'the platform' — you need to know it cold before your first client signs. Set yours up exactly like this.</p>
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <div className="space-y-3">
            {platformSetup.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)" }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.8rem", color: "var(--gold)", fontStyle: "italic" }}>{i + 1}</span>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "3px" }}>{item.step}</p>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.6)", lineHeight: 1.55 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── No Proof Scripts ── */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Critical Early-Stage Sales Skill</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>No Proof? No Problem — Exact Words</h3>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>Every beginner hits the moment someone asks 'can I see your work?' Here are 4 responses that turn that question into an advantage, not a wall.</p>
        <div className="space-y-5">
          {noproofScripts.map((section, si) => (
            <div key={si} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
              <div className="px-6 py-4" style={{ background: "rgba(200,168,100,0.08)", borderBottom: "1px solid rgba(200,168,100,0.15)" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "var(--ink)", fontStyle: "italic" }}>"{section.scenario}"</p>
              </div>
              <div className="p-5 space-y-3">
                {section.scripts.map((s, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                    <div className="px-4 py-2" style={{ background: "var(--ink)" }}>
                      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>{s.label}</p>
                    </div>
                    <div className="px-4 py-3" style={{ background: "rgba(200,168,100,0.04)" }}>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.65 }}>"{s.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-2xl p-5" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--gold)", fontStyle: "italic", lineHeight: 1.5 }}>The rule: never apologise for being new. Position it as "I'm selective about who I start with because I want results I'm proud of." That's not a weakness — that's a standard. It makes you more attractive, not less.</p>
          </div>
        </div>
      </div>

      {/* ── TikTok LIVE Playbook ── */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Your Primary Lead Engine</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>TikTok LIVE Playbook — 60 Minutes</h3>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>Every live follows this structure. Two audiences, two offers, one hour. B2B (business owners → social media service) and B2C (women starting a business → brand kit).</p>

        {/* Pre-live */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Before You Go Live — Do All 5</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Post a 'going live in 10 min' story on Instagram and Facebook",
              "Have your AI avatar demo video pulled up and ready to play",
              "Charger plugged in — lives kill batteries fast",
              "Stan.store brand kit link copied and ready to paste in chat",
              "Your live outline sticky note visible off-camera",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(200,168,100,0.2)", border: "1px solid rgba(200,168,100,0.35)" }}>
                  <span style={{ fontFamily: FONT_LUXE, fontSize: "0.55rem", color: "var(--gold)", fontWeight: 700 }}>{i + 1}</span>
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live segments */}
        <div className="space-y-3">
          {liveStructure.map((seg, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${seg.colour}35` }}>
              <div className="px-5 py-3 flex items-center gap-4" style={{ background: `${seg.colour}14` }}>
                <div className="shrink-0 text-right" style={{ minWidth: "60px" }}>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", color: seg.colour, fontWeight: 600 }}>{seg.time}</p>
                </div>
                <div className="w-px h-8 shrink-0" style={{ background: `${seg.colour}40` }} />
                <div>
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)" }}>{seg.label}</p>
                  <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ fontFamily: FONT_LUXE, background: `${seg.colour}20`, color: seg.colour }}>{seg.type}</span>
                </div>
              </div>
              <div className="px-5 py-4 space-y-3" style={{ background: "rgba(255,255,255,0.5)" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.65 }}>{seg.what}</p>
                <div className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ background: `${seg.colour}10`, border: `1px solid ${seg.colour}25` }}>
                  <span style={{ color: seg.colour, fontSize: "0.75rem", marginTop: "1px", flexShrink: 0 }}>→</span>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.06em", color: seg.colour }}>{seg.cta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post-live */}
        <div className="rounded-2xl p-5 mt-4" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>After Every Live — Do All 4 Within 30 Minutes</p>
          <div className="space-y-2">
            {[
              { n: "1", t: "DM every person who commented during the live", d: "Even just 'Hey! Thanks so much for watching today — are you a business owner?' This is warm outreach. These people already know you." },
              { n: "2", t: "Clip the best 60-second moment and post it as a TikTok immediately", d: "The live creates the content. The clip extends the reach. One live = one post. Do this every time." },
              { n: "3", t: "Post an Instagram story: 'Missed the live? Here's what we covered + link below'", d: "Link to your booking page. Even people who didn't watch will see the story." },
              { n: "4", t: "Reply to every comment the live generated", d: "Reply rate affects how often TikTok shows you to new people. Every reply counts." },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(200,168,100,0.15)", border: "1px solid rgba(200,168,100,0.3)" }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.82rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "var(--cream)", marginBottom: "2px" }}>{t}</p>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(250,243,234,0.5)", lineHeight: 1.5 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand Kit Product (B2C) ── */}
      <div className="mb-4">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Separate B2C Offer — Different Audience</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>The Brand Kit Digital Product</h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1.5 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(74,153,112,0.12)", color: "#4a9970", border: "1px solid rgba(74,153,112,0.3)" }}>✅ Already Live on Stan.store</span>
          <span className="px-3 py-1.5 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(74,100,200,0.1)", color: "#4a64c8", border: "1px solid rgba(74,100,200,0.2)" }}>Interactive Web App @ /brand-room</span>
        </div>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>This is NOT for your agency clients. Sold directly to women who want to start a business and don't know where to begin. $97. The brand builder is live at shopdollhouse.co/brand-room and instant delivery is already configured on Stan.store. Two completely different audiences, two different revenue streams.</p>

        {/* What's in it */}
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[9px] tracking-widest uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What's Inside the Kit</p>
            <div className="space-y-2.5">
              {[
                { emoji: "paint", item: "5 logo template options", sub: "Interactive — they pick a style, swap the name, change the colour, done" },
                { emoji: "paint", item: "Brand colour palette", sub: "5 colours that work together, with hex codes and usage guide" },
                { emoji: "pen", item: "Font pairing guide", sub: "3 combinations: heading + body font, with real visual examples" },
                { emoji: "smartphone", item: "Social media profile kit", sub: "IG profile, highlight covers, story template, feed post template" },
                { emoji: "file-text", item: "10 fill-in-the-blank caption templates", sub: "Intro, offer, testimonial, tip, story — the 5 posts every new business needs" },
                { emoji: "check-circle", item: "First Sale Checklist (the real value)", sub: "7 steps from 'I want to start something' to 'I just made my first sale'" },
              ].map(({ emoji, item, sub }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ flexShrink: 0, marginTop: "1px" }}><SvgIcon id={emoji} size={16} /></span>
                  <div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "var(--ink)" }}>{item}</p>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.45)", lineHeight: 1.45 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
              <p className="text-[9px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Pricing + Where to Sell</p>
              <div className="space-y-2">
                {[
                  { label: "Price", val: "$97 — impulse buy, no-brainer for the value" },
                  { label: "Stan.store", val: "✅ Live — grab your product link from your dashboard" },
                  { label: "Brand Builder", val: "shopdollhouse.co/brand-room — this is what you demo on LIVE" },
                  { label: "Delivery", val: "Instant access link sent automatically after purchase" },
                  { label: "Where you sell it", val: "TikTok LIVE (primary), TikTok videos, IG Stories, DMs" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-start gap-3">
                    <span style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(200,168,100,0.55)", flexShrink: 0 }}>{label}</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.8)", textAlign: "right" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.25)" }}>
              <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Upsell Path</p>
              <div className="flex items-center gap-2 flex-wrap">
                {["$97 Brand Kit", "→", "$297 Brand Strategy Call", "→", "$1,000/mo Social Media Service"].map((step, i) => (
                  <span key={i} style={{ fontFamily: step === "→" ? FONT_BODY : FONT_LUXE, fontSize: step === "→" ? "1rem" : "0.72rem", letterSpacing: step === "→" ? 0 : "0.06em", color: step === "→" ? "rgba(30,15,10,0.4)" : "var(--ink)", textTransform: step === "→" ? "none" : "uppercase" }}>{step}</span>
                ))}
              </div>
              <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.5 }}>The brand kit buyer already trusts you. They paid $97. After they use it and see results — that's your warmest possible lead for the full service.</p>
            </div>
          </div>
        </div>

        {/* How to pitch it */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
          <div className="px-6 py-4" style={{ background: "rgba(200,168,100,0.08)", borderBottom: "1px solid rgba(200,168,100,0.15)" }}>
            <p className="text-[9px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Word-for-Word Pitches</p>
            <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--ink)" }}>How to Sell the Brand Kit on Each Platform</h4>
          </div>
          <div className="p-5 space-y-3">
            {brandKitPitches.map((p, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                <div className="px-4 py-2" style={{ background: "var(--ink)" }}>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>{p.platform}</p>
                </div>
                <div className="px-4 py-3" style={{ background: "rgba(200,168,100,0.04)" }}>
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.92rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.7 }}>"{p.script}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Schedule Tab ───────────────────────────────────── */
const BLOCK_COLORS: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  live:     { bg: "rgba(220,38,38,0.1)",    border: "rgba(220,38,38,0.28)",    dot: "#dc2626", label: "LIVE" },
  content:  { bg: "rgba(74,100,200,0.09)",  border: "rgba(74,100,200,0.22)",   dot: "#4a64c8", label: "Content" },
  outreach: { bg: "rgba(201,122,122,0.1)",  border: "rgba(201,122,122,0.25)",  dot: "#c97a7a", label: "Outreach" },
  sales:    { bg: "rgba(74,153,112,0.1)",   border: "rgba(74,153,112,0.28)",   dot: "#4a9970", label: "Sales" },
  client:   { bg: "rgba(200,168,100,0.1)",  border: "rgba(200,168,100,0.28)",  dot: "#c8a864", label: "Clients" },
  admin:    { bg: "rgba(110,110,130,0.07)", border: "rgba(110,110,130,0.18)",  dot: "#8a8a9a", label: "Admin" },
  personal: { bg: "rgba(240,170,80,0.09)",  border: "rgba(240,170,80,0.22)",   dot: "#d48e28", label: "Mindset" },
  rest:     { bg: "rgba(255,255,255,0.38)", border: "rgba(200,168,100,0.12)",  dot: "#b0a898", label: "Rest" },
  bella:    { bg: "rgba(232,149,90,0.1)",   border: "rgba(232,149,90,0.25)",   dot: "#e8955a", label: "Bella 🐾" },
};

interface TimeBlock {
  time: string;
  label: string;
  desc: string;
  type: keyof typeof BLOCK_COLORS;
  duration: string;
}

const DAILY_BLOCKS: TimeBlock[] = [
  {
    time: "7:30am", duration: "20 min", type: "bella",
    label: "🐾 Bella — Morning Balcony",
    desc: "First thing before your own coffee: take Bella to the balcony. Stay with her — don't rush back inside. The moment she goes, celebrate big: 'Good girl!' and give a treat immediately. Timing is everything with potty training — the reward has to happen right as she finishes, not after. She's 45 in human years and transitioning from pee pad to balcony, so patience and repetition are the whole game. Fill her water bowl now so she stays hydrated. Feeding comes later in the day.",
  },
  {
    time: "8:00am", duration: "30 min", type: "personal",
    label: "Wake Up & Mindset",
    desc: "Coffee now — you've earned it. Read your goals out loud. 5 minutes of visualisation: see yourself on the call, see the client saying yes. No social media, no news, no scrolling. This 30 minutes sets the tone for everything that follows.",
  },
  {
    time: "8:30am", duration: "60–90 min", type: "live",
    label: "🔴 TikTok LIVE",
    desc: "Show up every single day without fail. Even if 4 people are watching — those 4 could become clients. Lead with value first: a tip, a transformation, behind-the-scenes. Drop your offer naturally every 10 minutes: 'If you want me to build your AI avatar, DM me AVATAR.' Show the AI clone demo at least once per live. The algorithm rewards consistency more than virality. The live IS your storefront.",
  },
  {
    time: "10:00am", duration: "30 min", type: "content",
    label: "Live Wrap-Up & DM Blitz",
    desc: "Save your best live moments to drafts — clip them for TikTok and Reels immediately. Reply to every comment from the live. DM every person who followed during the live: 'Hey! Thanks for joining today — were you curious about the AI avatar or the social media service?' This is warm outreach. These people already know you. Don't skip it.",
  },
  {
    time: "10:30am", duration: "90 min", type: "content",
    label: "Content Creation Block",
    desc: "Create today's content across all 4 platforms: TikTok, Instagram, Facebook, Threads. One concept, five pieces — the video becomes a Reel, a Threads post, a Facebook post, and a story. Priority themes: AI avatar demos, client transformations, pricing transparency ('Here's what $1,000/mo gets you'), behind-the-scenes of what you do, and direct calls to action.",
  },
  {
    time: "12:00pm", duration: "45 min", type: "rest",
    label: "Lunch + Bella Midday Break + Feed",
    desc: "Take Bella to the balcony first — she's been in for about 3 hours. Wait for her to go, reward her, then come back inside. This is also when you put down her one daily meal. Same time every day keeps her digestive rhythm consistent, which directly helps with the potty training — she'll need to go again about 1–2 hours after eating, which lines up perfectly with the 3pm balcony break. Remove the bowl after 20 minutes whether she finished or not. Then eat your own lunch, screens off. You both need this break.",
  },
  {
    time: "12:45pm", duration: "75 min", type: "outreach",
    label: "Outreach Block",
    desc: "15–20 new cold DMs every single day using the Google Maps method and Outreach Scripts tab. Then follow up with every lead in your pipeline who hasn't replied in 48+ hours. This is the highest-revenue activity of your day — not content, not live, not admin. Consistent outreach closes consistent deals. Don't skip this because you feel like creating instead.",
  },
  {
    time: "2:00pm", duration: "60–90 min", type: "sales",
    label: "Sales Calls & Demos",
    desc: "Money time. Run your Zoom discovery calls and demos here. Show the AI avatar demo live on every single call — the wow moment is your close. Have your packages memorised. Send the proposal within 1 hour of hanging up while they're still excited. Aim for 1 call per day, 5 per week minimum.",
  },
  {
    time: "3:00pm", duration: "10 min", type: "bella",
    label: "🐾 Bella — Afternoon Balcony Break",
    desc: "This is the post-meal window — she ate at noon and this is right when she needs to go. Taking her out consistently at this time reinforces the habit faster than almost anything else. Reward every single time, no exceptions. Keep a small jar of treats right by the balcony door so the reward is instant — not after you've walked back to the kitchen.",
  },
  {
    time: "3:30pm", duration: "60 min", type: "admin",
    label: "Pipeline + Platform Admin",
    desc: "Update every deal in the Deal Tracker — it only works if it's current. Schedule today's content using the platform. Reply to DMs and emails (fast replies build trust faster than anything). Send any pending onboarding questionnaires or overdue proposals.",
  },
  {
    time: "4:30pm", duration: "60 min", type: "client",
    label: "Client Deliverables",
    desc: "Once you have clients: create their content, submit for approval, make edits, send monthly reports. Always deliver before the promised deadline — your first clients become your best testimonials. No clients yet? Use this time for extra lead research — find 10 more leads, study their brands, personalise your outreach for tomorrow.",
  },
  {
    time: "5:30pm", duration: "30 min", type: "bella",
    label: "🐾 Bella — Evening Walk",
    desc: "Clip the leash and get outside. Bella needs this for mental stimulation and physical health — she may be 45 in human years but she still needs to sniff, explore, and move. Let her lead and sniff everything she wants. This is also one of the best outdoor potty opportunities of the day. This is your decompression too — leave the phone in your pocket, just walk. 20–30 minutes of real movement clears your head more than anything else. You'll think more clearly and close more calls because of this walk.",
  },
  {
    time: "6:00pm", duration: "60 min", type: "content",
    label: "Second Content Push",
    desc: "Film 2–3 short videos while energy is still there. Write Threads and Facebook posts for tomorrow. This second push is what separates the accounts that grow fast from the ones that plateau — the algorithm loves volume and consistency together. Done is better than perfect.",
  },
  {
    time: "7:00pm", duration: "30 min", type: "admin",
    label: "Analytics Check",
    desc: "15 minutes per platform. What performed today? Note the format, topic, and time — do more of that tomorrow. Check follower growth, DM volume, profile visits. Don't spiral into overthinking — in and out in 30 minutes total.",
  },
  {
    time: "7:30pm", duration: "30 min", type: "admin",
    label: "Daily Wrap + Tomorrow Prep",
    desc: "Write your 3 priorities for tomorrow. Set your TikTok LIVE topic. Lay out your outreach targets. Write 3 wins from today — even small ones count: 'Sent 15 DMs,' 'Got one reply,' '10 people on the live.' Last thing before you shut down: take Bella for her final balcony trip of the night. Same routine, same reward. This last trip is important — it's the one that prevents 3am accidents while she's still learning. Then close every tab and silence all work notifications.",
  },
  {
    time: "8:00pm", duration: "30 min", type: "rest",
    label: "Wind-Down + Bella Bedtime",
    desc: "Get Bella settled in her crate — blanket inside, maybe a small toy. Keep it calm and consistent: same words, same soft tone every night ('Bedtime, baby girl'). She may fuss a little at first while she adjusts to the crate being her safe space — that's normal and will stop within 1–2 weeks if you're consistent. Don't go back in when she cries or it resets the training. Once she's settled: dinner, TV, skincare, music, whatever fills your cup. You are fully off the clock. Rest is not laziness. Recovery is part of the strategy.",
  },
  {
    time: "8:30pm", duration: "—", type: "rest",
    label: "🚫 Business Ends Here",
    desc: "Hard boundary, every day. No DMs. No content ideas. No strategy planning before bed. The work will be there tomorrow. This line is the difference between building a sustainable business and burning out at month 3. Hold it.",
  },
];

interface WeekDay {
  day: string;
  emoji: string;
  theme: string;
  color: string;
  focus: string;
  blocks: string[];
}

const WEEK_DAYS: WeekDay[] = [
  {
    day: "Monday", emoji: "calendar", theme: "Plan + Batch", color: "#c8a864",
    focus: "Start with direction, not chaos. What gets planned on Monday gets done all week.",
    blocks: [
      "Write this week's content pillars — pick 3 themes to rotate across all platforms",
      "Batch-film 3–5 videos in one session (saves 5+ hours across the week)",
      "Plan your TikTok LIVE topic for every day this week so you never scramble",
      "Review last week: what content performed? What fell flat? Do more of what worked.",
      "Send 10 Monday outreach DMs — people check messages on Monday mornings",
    ],
  },
  {
    day: "Tuesday", emoji: "send", theme: "Heavy Outreach Day", color: "#c97a7a",
    focus: "Maximum new lead generation. This is your full cold-outreach day. Nothing else competes.",
    blocks: [
      "Google Maps method: research and list 20 new leads in your target niches",
      "Send 20 personalised cold DMs using the scripts from the Outreach Scripts tab",
      "Follow up with every lead who hasn't replied in 48+ hours",
      "Book sales calls for Wednesday and Thursday — aim for 3 calls minimum",
      "Post your Monday-batched content to all 4 platforms",
    ],
  },
  {
    day: "Wednesday", emoji: "phone", theme: "Sales Call Day", color: "#7b68ee",
    focus: "Block 2–4 hours for calls. This is your highest-value activity. Protect it fiercely.",
    blocks: [
      "Run all booked discovery calls and Zoom demos — aim for 2–3 today",
      "Show the AI avatar demo live on every single call — this moment closes deals",
      "Send proposals within 1 hour of every call while excitement is still high",
      "Follow up with Tuesday leads who opened your message but haven't replied",
      "Update the Deal Tracker after every call — move every deal to its correct stage",
    ],
  },
  {
    day: "Thursday", emoji: "video", theme: "Content Production Day", color: "#4a90d9",
    focus: "Your creative day. Film more than you think you need — excess content is never a problem.",
    blocks: [
      "Film your big weekly piece: educational, storytelling, or a client transformation",
      "Record 2 AI avatar demo videos to post as social proof this week",
      "Film behind-the-scenes content — people buy you before they buy the service",
      "Edit and schedule the remaining content for the week's queue",
      "Write 5 Threads posts to go out Monday through Friday next week",
    ],
  },
  {
    day: "Friday", emoji: "dollar", theme: "Close + Clean Up", color: "#4a9970",
    focus: "Turn open deals into closed deals. Follow up on everything. Collect what you're owed.",
    blocks: [
      "Send a warm follow-up on every open proposal — 'Just checking in — any questions?'",
      "Move all stale deals to the correct stage or archive them to keep the pipeline clean",
      "Collect any outstanding setup fees and send invoices",
      "Review this week's revenue number vs. your monthly goal — adjust next week if needed",
      "Write down your 3 biggest wins this week. Celebrate them. You showed up.",
    ],
  },
  {
    day: "Saturday", emoji: "bar-chart", theme: "Light Review Day", color: "#9a8080",
    focus: "Analyse, plan, and breathe. No heavy execution — you've earned a lighter Saturday.",
    blocks: [
      "Weekly analytics review: follower growth, engagement rate, top-performing content",
      "Write 3 things that worked this week + 3 things to change next week",
      "Pre-plan Monday's batch content topics so you start strong",
      "Optional: reply to comments and DMs if you feel like it — no pressure",
      "Do one thing that is purely for you. You earned it.",
    ],
  },
  {
    day: "Sunday", emoji: "moon", theme: "Full Rest — No Exceptions", color: "#6a5a8a",
    focus: "Complete rest. This is the rule, not the suggestion. You cannot build $1M while burned out.",
    blocks: [
      "No posting. No DMs. No strategy sessions. The business will survive one day off.",
      "Journal: what do you want next week to look and feel like?",
      "Visualise your next client saying yes on the call",
      "Set Monday's TikTok LIVE topic — 5 minutes max, then close it",
      "Sleep. You are building something that requires your absolute best self every single day.",
    ],
  },
];

interface Milestone {
  period: string;
  goal: string;
  cad: string;
  emoji: string;
  color: string;
  label: string;
  targets: string[];
  math: string;
}

const MILESTONES: Milestone[] = [
  {
    period: "First 30 Days", goal: "$2,000–$5,000 USD", cad: "≈ $2,700–$6,750 CAD", emoji: "sprout", color: "#c8a864", label: "First Revenue In",
    targets: [
      "Sign first 1–3 clients (Starter package or brand kits)",
      "Post daily on all 4 platforms — no gap days, no excuses",
      "TikTok LIVE every morning at 8:30am, even if 3 people are watching",
      "Send 300+ outreach DMs total (15/day × 20 weekdays)",
      "Book and run 5–10 discovery calls",
      "Show AI avatar demo on every single call and every live",
      "Secure first client testimonial — this is your social proof engine",
    ],
    math: "2 Starter clients = $2,000 USD/mo recurring + $1,000 USD in setup fees collected day 1. Add 3 brand kits at $97 each = +$291 USD. Total month 1: ~$3,300–$5,000 USD — that's roughly $4,500–$6,750 CAD hitting your bank account. Completely achievable with 15 DMs/day from the start.",
  },
  {
    period: "60–90 Days", goal: "$10,000–$33,000 USD/mo", cad: "≈ $13,500–$44,500 CAD/mo", emoji: "rocket", color: "#c97a7a", label: "Six-Figure Pace",
    targets: [
      "5–10 active recurring clients (Starter and Growth mix)",
      "Upsell AI avatar add-on to at least half your clients",
      "First organic referral comes in from a happy client",
      "Hire a VA or editor (10–15 hrs/week) to free up your delivery time",
      "Revenue audit upsell offered to your best-fit clients",
      "First month at $10,000+ USD in recurring monthly revenue",
      "Sales call → proposal → close cycle running in under 7 days",
    ],
    math: "6 Growth clients × $2,500 USD = $15,000 USD/mo. Add 2 Elite × $5,000 USD = $25,000 USD/mo. Add-ons bring it to $30,000+ USD/mo = roughly $40,500+ CAD/mo. Setup fees + one-time services add $5k–$10k USD/month on top. At $33k USD/mo you're earning more CAD than most Canadians make in a year — every single month.",
  },
  {
    period: "4–12 Months", goal: "$83,000–$100,000+ USD/mo", cad: "≈ $112,000–$135,000+ CAD/mo", emoji: "crown", color: "#7b68ee", label: "The Million-Dollar Year",
    targets: [
      "20+ active clients across all tiers",
      "Team of 3–5: account manager, content creator, sales closer, VA",
      "Your TikTok LIVE becomes a full inbound funnel — clients come to you",
      "Digital product or AI course revenue stream running in the background",
      "Referral engine running — clients are sending clients without you asking",
      "White-label partnerships generating additional passive income",
      "Your personal brand IS the business — you are a known face in this space",
    ],
    math: "10 Elite × $5,000 USD = $50,000 USD. 10 Growth × $2,500 USD = $25,000 USD. Add-ons + AI video packages = $10,000 USD. Digital products/course = $5,000–$15,000 USD/mo. Total: $90,000–$100,000 USD/mo recurring = $121,500–$135,000 CAD/mo. Multiply by 12 months = $1M+ USD / $1.35M+ CAD. You are a Canadian charging in US dollars. That exchange rate is your built-in advantage.",
  },
];

const GROUND_RULES = [
  { emoji: "alert-circle", rule: "Live at 8:30am. Every single day.", desc: "The algorithm and your audience reward reliability over perfection. Show up even when the room is empty. Especially then. Those are the lives that build the habit." },
  { emoji: "ban", rule: "8:30pm is the hard stop.", desc: "No exceptions. Close the laptop. Silence the notifications. Rest is how you sustain this for 12 months instead of burning out at 6 weeks." },
  { emoji: "utensils", rule: "Lunch is mandatory — 45 minutes, screens away.", desc: "You cannot close clients on a depleted brain. Hunger is not hustle. You eat, you rest, you come back sharper." },
  { emoji: "bar-chart", rule: "Every lead goes in the Deal Tracker.", desc: "If it's not tracked, it doesn't exist. Leads fall through the cracks when they live only in your head or buried in DMs." },
  { emoji: "gem", rule: "Do outstanding work for client number one.", desc: "One raving client is worth 50 cold DMs. Their testimonial, their referral, and their case study are your best marketing. Prioritise their experience." },
  { emoji: "smartphone", rule: "Post every day. Imperfectly.", desc: "An imperfect post beats no post every single time. You are building a personal brand — disappearing for 3 days resets your momentum to zero." },
  { emoji: "compass", rule: "Your revenue goal is your daily filter.", desc: "Every evening ask: 'Did what I did today move me toward $X?' If the answer is no two days running, something has to change tomorrow." },
];

function LinksTab() {
  const categories = [
    {
      title: "Your Website Pages",
      icon: "flower",
      links: [
        { label: "Main Website", url: "https://www.shopdollhouse.co/", desc: "Your public-facing homepage" },
        { label: "Brand Room", url: "https://www.shopdollhouse.co/brand-room", desc: "The brand room page" },
      ],
    },
    {
      title: "Send to Clients",
      icon: "send",
      links: [
        { label: "Client Onboarding Questionnaire", url: "https://www.shopdollhouse.co/onboarding", desc: "Send this to every client the moment they sign — gets you everything you need to build their marketing plan" },
        { label: "Get a Free Proposal", url: "https://www.shopdollhouse.co/#contact", desc: "Direct link to the proposal form for cold outreach" },
      ],
    },
    {
      title: "Your Social Media",
      icon: "smartphone",
      links: [
        { label: "Instagram", url: "https://instagram.com/mandyxdoll", desc: "@mandyxdoll" },
        { label: "TikTok", url: "https://www.tiktok.com/@mandyxdoll", desc: "@mandyxdoll" },
        { label: "Threads", url: "https://www.threads.com/@mandyxdoll", desc: "@mandyxdoll" },
        { label: "Facebook", url: "https://www.facebook.com/shopdollhouseco/", desc: "Dollhouse Brand Studio page" },
      ],
    },
    {
      title: "Business Tools",
      icon: "settings",
      links: [
        { label: "The Platform (CRM & Automations)", url: "https://app.gohighlevel.com", desc: "Your client CRM, automation builder, calendar, and pipeline — log in here to manage all client accounts" },
        { label: "OpenArt (AI Mascot / Clone)", url: "https://openart.ai", desc: "AI image and video generation for mascot content and AI clone visuals" },
        { label: "Formspree (Contact Form)", url: "https://formspree.io", desc: "Where proposal form and onboarding form submissions are managed" },
        { label: "Google Drive", url: "https://drive.google.com", desc: "Client file storage — one folder per client" },
        { label: "Vercel (Site Hosting)", url: "https://vercel.com", desc: "Your website is auto-deployed here from GitHub" },
        { label: "GitHub (Site Code)", url: "https://github.com/shopdollhouse/shopdollhouse.co", desc: "Source code for your website" },
      ],
    },
    {
      title: "Internal Pages",
      icon: "lock",
      links: [
        { label: "This Playbook", url: "https://www.shopdollhouse.co/playbook", desc: "Your full business operating system — admin only" },
        { label: "Brand Room Page", url: "https://www.shopdollhouse.co/brand-room", desc: "Internal brand room builder" },
      ],
    },
  ];

  const copy = (url: string) => { navigator.clipboard.writeText(url); };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 space-y-10">
      <div>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>✦ Quick Links</p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--ink)", fontStyle: "italic", marginBottom: 6 }}>All Your Important Links</h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.6 }}>Every link you need — organized in one place. Click to open or copy to share.</p>
      </div>

      {categories.map(cat => (
        <div key={cat.title}>
          <div className="flex items-center gap-2 mb-4">
            <SvgIcon id={cat.icon} size={16} />
            <h3 style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>{cat.title}</h3>
          </div>
          <div className="space-y-2">
            {cat.links.map(link => (
              <div key={link.url} className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,168,100,0.15)" }}>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.82rem", color: "var(--ink)", fontWeight: 600, marginBottom: 2 }}>{link.label}</p>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.45)", lineHeight: 1.4 }}>{link.desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copy(link.url)}
                    className="px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase transition-all hover:opacity-80"
                    style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.12)", color: "var(--gold)", border: "1px solid rgba(200,168,100,0.25)" }}
                    title="Copy link"
                  >
                    Copy
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase transition-all hover:opacity-80"
                    style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)", textDecoration: "none" }}
                  >
                    Open →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScheduleTab() {
  const [expandedDay, setExpandedDay] = useState<string | null>("Monday");

  // Date-keyed checkmark system — auto-resets every new day
  const todayKey = new Date().toISOString().slice(0, 10);
  const storageKey = `dh_schedule_${todayKey}`;

  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  function toggleCheck(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch {}
      return next;
    });
  }

  function resetDay() {
    setChecked(new Set<string>());
    try { localStorage.removeItem(storageKey); } catch {}
  }

  const checkableBlocks = DAILY_BLOCKS.filter(b => b.type !== "rest");
  const doneCount = checkableBlocks.filter(b => checked.has(`${b.time}-${b.label}`)).length;
  const totalBlocks = checkableBlocks.length;
  const pct = totalBlocks > 0 ? Math.round((doneCount / totalBlocks) * 100) : 0;
  const allDone = doneCount === totalBlocks && totalBlocks > 0;

  return (
    <div>
      <SectionHeader
        label="Daily Schedule"
        title="Your Day, Week & 90-Day Roadmap"
        sub="You are the entire business right now. This schedule is built to get your first clients, grow the Dollhouse brand across all four platforms, protect you from burnout — and keep Bella on track too."
      />

      {/* Revenue North Stars */}
      <div className="mb-10">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Your Revenue Targets</p>
          <span className="px-3 py-1 rounded-full text-[9px] tracking-wider uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(74,153,112,0.1)", color: "#4a9970", border: "1px solid rgba(74,153,112,0.28)" }}>🇨🇦 All prices in USD — you earn ~35% more in CAD</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {MILESTONES.map((m) => (
            <div key={m.period} className="rounded-2xl p-5" style={{ background: `${m.color}18`, border: `1px solid ${m.color}45` }}>
              <div className="flex items-center gap-3 mb-2">
                <SvgIcon id={m.emoji} size={22} />
                <div>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: m.color }}>{m.period}</p>
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)", fontWeight: 600, lineHeight: 1.2 }}>{m.goal}</p>
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", color: "#4a9970", marginTop: "2px" }}>{m.cad}</p>
                </div>
              </div>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ground Rules */}
      <div className="rounded-2xl p-6 md:p-8 mb-12" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Non-Negotiables — Hold These or Nothing Else Works</p>
        <div className="grid md:grid-cols-2 gap-5">
          {GROUND_RULES.map((r, i) => (
            <div key={i} className="flex gap-4">
              <SvgIcon id={r.emoji} size={18} />
              <div>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "0.85rem", color: "var(--gold)", fontWeight: 500, marginBottom: "4px" }}>{r.rule}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Time Blocks */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Your Daily Schedule</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>7:30am → 8:30pm · Amanda + Bella</h3>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>Tap any block to check it off as you go. Resets automatically each new day.</p>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.entries(BLOCK_COLORS).map(([key, val]) => (
            <span key={key} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] tracking-wider uppercase" style={{ fontFamily: FONT_LUXE, background: val.bg, border: `1px solid ${val.border}`, color: val.dot }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: val.dot }} />
              {val.label}
            </span>
          ))}
        </div>

        {/* Progress strip */}
        <div className="rounded-2xl p-4 mb-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.38)" }}>Today's Progress</p>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: allDone ? "#4a9970" : "var(--ink)", fontWeight: 500, lineHeight: 1.2 }}>
                {allDone ? "You crushed today! 🎉" : `${doneCount} of ${totalBlocks} blocks done`}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", fontWeight: 600, color: allDone ? "#4a9970" : "var(--gold)" }}>{pct}%</p>
              <button
                onClick={resetDay}
                className="px-3 py-1.5 rounded-lg text-[10px] tracking-wider uppercase transition-all"
                style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.08)", color: "rgba(30,15,10,0.38)", border: "1px solid rgba(200,168,100,0.18)", cursor: "pointer" }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(200,168,100,0.15)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: allDone ? "#4a9970" : "linear-gradient(90deg, var(--gold), #e8955a)",
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {DAILY_BLOCKS.map((block, i) => {
            const c = BLOCK_COLORS[block.type];
            const blockId = `${block.time}-${block.label}`;
            const isDone = checked.has(blockId);
            const isRest = block.type === "rest";
            return (
              <div
                key={i}
                className="rounded-2xl p-4 md:p-5 transition-all duration-300"
                style={{
                  background: isDone ? "rgba(74,153,112,0.07)" : c.bg,
                  border: isDone ? "1px solid rgba(74,153,112,0.28)" : `1px solid ${c.border}`,
                  opacity: isDone ? 0.65 : 1,
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Tap-to-check circle */}
                  {!isRest ? (
                    <button
                      onClick={() => toggleCheck(blockId)}
                      aria-label={isDone ? "Mark undone" : "Mark done"}
                      className="shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all"
                      style={{
                        background: isDone ? "#4a9970" : "rgba(255,255,255,0.75)",
                        border: isDone ? "none" : `1.5px solid ${c.dot}66`,
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      {isDone && (
                        <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                          <path d="M2.5 8.5L6 12L13.5 4.5" />
                        </svg>
                      )}
                    </button>
                  ) : (
                    <div className="w-6 shrink-0" />
                  )}
                  <div className="shrink-0 text-right pt-0.5" style={{ minWidth: "62px" }}>
                    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", color: isDone ? "#4a9970" : c.dot, fontWeight: 600 }}>{block.time}</p>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.65rem", color: "rgba(30,15,10,0.38)" }}>{block.duration}</p>
                  </div>
                  <div className="w-px self-stretch shrink-0" style={{ background: isDone ? "rgba(74,153,112,0.25)" : c.border, minHeight: "24px" }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p style={{
                        fontFamily: FONT_DISPLAY, fontSize: "1rem",
                        color: isDone ? "#4a9970" : "var(--ink)",
                        fontWeight: 500,
                        textDecoration: isDone ? "line-through" : "none",
                      }}>{block.label}</p>
                      <span className="px-2 py-0.5 rounded-full text-[8px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: c.border, color: c.dot }}>{c.label}</span>
                      {isDone && (
                        <span className="px-2 py-0.5 rounded-full text-[8px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(74,153,112,0.12)", color: "#4a9970", border: "1px solid rgba(74,153,112,0.28)" }}>✓ Done</span>
                      )}
                    </div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: isDone ? "rgba(30,15,10,0.35)" : "rgba(30,15,10,0.65)", lineHeight: 1.65 }}>{block.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Rhythm */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Weekly Rhythm</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>Every Day Has a Job</h3>
        <p className="mb-6" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>Each day has a primary focus. This prevents decision fatigue and keeps you moving forward without burning out on the same tasks every single day.</p>
        <div className="space-y-2">
          {WEEK_DAYS.map((d) => {
            const isOpen = expandedDay === d.day;
            return (
              <div key={d.day} className="rounded-2xl overflow-hidden transition-all" style={{ border: `1px solid ${d.color}35`, background: isOpen ? `${d.color}10` : "rgba(255,255,255,0.55)" }}>
                <button
                  onClick={() => setExpandedDay(isOpen ? null : d.day)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <SvgIcon id={d.emoji} size={20} />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)" }}>{d.day}</p>
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: `${d.color}22`, color: d.color, border: `1px solid ${d.color}45` }}>{d.theme}</span>
                      </div>
                      <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>{d.focus}</p>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0 ml-3 transition-transform" style={{ color: "rgba(30,15,10,0.3)", transform: isOpen ? "rotate(180deg)" : "none" }}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 space-y-3" style={{ borderTop: `1px solid ${d.color}20` }}>
                    {d.blocks.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${d.color}22`, border: `1px solid ${d.color}45` }}>
                          <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", color: d.color, fontWeight: 700 }}>{i + 1}</span>
                        </div>
                        <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.75)", lineHeight: 1.55 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 30/90/12mo Milestones */}
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The 30 / 90 / 12-Month Plan</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)", fontWeight: 400, marginBottom: "6px" }}>How You Get to $1M</h3>
        <p className="mb-6" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.5)" }}>The math works. Here's exactly what needs to happen at each stage and why the numbers add up.</p>
        <div className="space-y-5">
          {MILESTONES.map((m) => (
            <div key={m.period} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${m.color}35` }}>
              <div className="px-6 py-5" style={{ background: `${m.color}18` }}>
                <div className="flex items-center gap-3">
                  <SvgIcon id={m.emoji} size={24} />
                  <div>
                    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: m.color }}>{m.period}</p>
                    <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--ink)", fontWeight: 600, lineHeight: 1.15 }}>{m.goal} <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(30,15,10,0.5)" }}>— {m.label}</span></p>
                    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", color: "#4a9970", marginTop: "3px", letterSpacing: "0.05em" }}>{m.cad}</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr,340px] gap-0" style={{ background: "rgba(255,255,255,0.5)" }}>
                <div className="px-6 py-5" style={{ borderRight: "1px solid rgba(200,168,100,0.12)" }}>
                  <p className="mb-3 text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.38)" }}>What You're Doing</p>
                  <div className="space-y-2">
                    {m.targets.map((t, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span style={{ color: m.color, flexShrink: 0, marginTop: "3px", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                        <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.75)", lineHeight: 1.55 }}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-5">
                  <p className="mb-3 text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: m.color }}>The Math</p>
                  <div className="rounded-xl p-4" style={{ background: `${m.color}12`, border: `1px solid ${m.color}30` }}>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>{m.math}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Quote Builder ───────────────────────────────────── */
const QB_PACKAGES = {
  content_starter: {
    name: "Content Starter", monthly: 500, setup: 500, emoji: "sprout", color: "#a8b87a",
    tagline: "Entry-level done-for-you content — branded posts, scheduled and managed.",
    includes: [
      "8 branded posts/month (static & carousels)",
      "1 platform managed",
      "Branded, scheduled, and done for you",
      "No AI avatar, no automation — text & image posts only",
      "Monthly performance report",
    ],
  },
  starter: {
    name: "Starter", monthly: 1000, setup: 500, emoji: "sparkle", color: "#c8a864",
    tagline: "Perfect for local businesses getting started with done-for-you social.",
    includes: [
      "3–4 branded posts/week (Instagram + Facebook)",
      "1 platform managed (Instagram or Facebook)",
      "Monthly content calendar",
      "Basic hashtag + caption strategy",
      "Monthly performance report",
      "Platform access for scheduling + analytics",
    ],
  },
  growth: {
    name: "Growth", monthly: 2500, setup: 500, emoji: "rocket", color: "#c97a7a",
    tagline: "Multi-platform management for businesses ready to scale their presence.",
    includes: [
      "Daily posts across 2–3 platforms",
      "Instagram, Facebook + TikTok or LinkedIn",
      "Reels / short-form video content",
      "Story creation + highlights",
      "Community engagement + DM monitoring",
      "Bi-weekly strategy check-ins",
      "Full analytics dashboard access",
    ],
  },
  elite: {
    name: "Elite", monthly: 5000, setup: 500, emoji: "crown", color: "#7b68ee",
    tagline: "White-glove, full-service brand presence across every major platform.",
    includes: [
      "Daily content across all major platforms",
      "AI avatar video content included",
      "Full ad campaign management",
      "Custom brand strategy + content direction",
      "Dedicated account manager",
      "Weekly strategy calls",
      "Priority support + same-day response",
    ],
  },
} as const;

type PkgKey = keyof typeof QB_PACKAGES;

interface QBAddon {
  key: string;
  type: "monthly" | "onetime";
  price: number;
  name: string;
  desc: string;
  emoji: string;
}

const QB_ADDONS: QBAddon[] = [
  // ── Monthly Add-Ons ──────────────────────────────────────────────────────
  { key: "ai_video_std",      type: "monthly", price: 800,  emoji: "video",       name: "AI Avatar Video — Standard",          desc: "4 branded AI avatar videos/month" },
  { key: "ai_video_prem",     type: "monthly", price: 1800, emoji: "video",       name: "AI Avatar Video — Premium",           desc: "8 videos/month + custom scripts + full editing" },
  { key: "ai_voice",          type: "monthly", price: 400,  emoji: "phone",       name: "AI Voice Agent",                      desc: "Never miss a call. Your AI answers 24/7, qualifies leads, and books appointments — in your brand voice." },
  { key: "reputation",        type: "monthly", price: 300,  emoji: "star",        name: "Review & Reputation Management",      desc: "Automatically request reviews, respond to feedback, and build your 5-star presence on Google and beyond." },
  { key: "email_sms",         type: "monthly", price: 500,  emoji: "mail",        name: "Email & SMS Marketing",               desc: "Done-for-you campaigns, broadcasts, and nurture sequences that keep your audience warm and ready to buy." },
  { key: "extra_content",     type: "monthly", price: 600,  emoji: "smartphone",  name: "Additional Content Creation",         desc: "Need more posts or platforms? Extra content created and scheduled for you — same quality, more volume." },
  { key: "linkedin",          type: "monthly", price: 500,  emoji: "briefcase",   name: "LinkedIn Management",                 desc: "Daily posts + connection outreach + content" },
  { key: "gbp",               type: "monthly", price: 250,  emoji: "map-pin",     name: "Google Business Profile",             desc: "Weekly posts + review monitoring + Q&A" },
  { key: "extra_platform",    type: "monthly", price: 400,  emoji: "plus-circle", name: "Extra Platform Add-On",               desc: "Add Pinterest, YouTube, or X management" },
  { key: "fb_ads",            type: "monthly", price: 500,  emoji: "megaphone",   name: "Meta / Facebook Ads Management",      desc: "Ad campaign setup, audience targeting, creative, and monthly optimisation. Recommended: $150/mo client boost budget paid direct to Meta." },
  { key: "google_ads",        type: "monthly", price: 700,  emoji: "target",      name: "Google Ads Management",               desc: "Campaign setup, copy, optimisation (ad spend separate)" },
  { key: "mascot_content",    type: "monthly", price: 600,  emoji: "masks",       name: "Mascot / AI Character Content",        desc: "3–4 pillar mascot videos/mo + daily branded posts featuring your AI character. Pinned content + feed filler." },
  { key: "website_hosting",   type: "monthly", price: 97,   emoji: "globe",       name: "Website Hosting & Maintenance",       desc: "Hosting, updates, uptime monitoring" },
  // ── One-Time Services ────────────────────────────────────────────────────
  { key: "website_build",     type: "onetime", price: 2000, emoji: "building",    name: "Website & Landing Page Design",       desc: "A conversion-ready website or landing page — designed for your brand and built to turn visitors into clients." },
  { key: "revenue_audit",     type: "onetime", price: 1500, emoji: "search",      name: "AI Revenue Audit",                    desc: "Full pipeline + social + workflow audit with growth plan" },
  { key: "digital_product",   type: "onetime", price: 500,  emoji: "package",     name: "AI Digital Product / Lead Gen Tool",  desc: "Quiz, calculator, or checklist built in your branding" },
  { key: "digital_product_build", type: "onetime", price: 2500, emoji: "lightbulb", name: "Digital Product Build",           desc: "Fully interactive web app — not a PDF. The next level of digital products." },
  { key: "merch_design",      type: "onetime", price: 500,  emoji: "shirt",       name: "Merch & Brand Design",                desc: "On-brand merch, apparel, and print-ready assets designed to match your business identity." },
];

function QuoteBuilderTab({ prospects, persist, prospectId, onGoToDeals, onClearProspect }: {
  prospects: Prospect[];
  persist: (list: Prospect[]) => void;
  prospectId: string | null;
  onGoToDeals: () => void;
  onClearProspect: () => void;
}) {
  const [clientName, setClientName] = useState("");
  const [bizName, setBizName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [pkg, setPkg] = useState<PkgKey | null>(null);
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const [trial, setTrial] = useState(false);
  const [contractLen, setContractLen] = useState<"6mo" | "12mo">("6mo");
  const [adSpend, setAdSpend] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState<"quote" | "email" | null>(null);
  const [saved, setSaved] = useState(false);

  const linkedProspect = prospectId ? prospects.find(p => p.id === prospectId) : null;

  // Pre-fill form when a prospect is passed in from Deal Pipeline
  useEffect(() => {
    if (linkedProspect) {
      setClientName(linkedProspect.contact || "");
      setBizName(linkedProspect.biz || "");
      setEmail(linkedProspect.email || "");
      setPhone(linkedProspect.phone || "");
      setNiche(linkedProspect.niche || "");
      setCity(linkedProspect.city || "");
      setWebsite("");
    }
  }, [prospectId]);

  const selectedPkg = pkg ? QB_PACKAGES[pkg] : null;
  const monthlyAddons = QB_ADDONS.filter(a => a.type === "monthly" && addons.has(a.key));
  const onetimeAddons = QB_ADDONS.filter(a => a.type === "onetime" && addons.has(a.key));

  const monthlyBase = selectedPkg?.monthly ?? 0;
  const monthlyAddonsTotal = monthlyAddons.reduce((s, a) => s + a.price, 0);
  const monthlySubtotal = monthlyBase + monthlyAddonsTotal;
  const discountPct = contractLen === "12mo" ? 0.10 : 0;
  const discount = Math.round(monthlySubtotal * discountPct);
  const monthlyTotal = monthlySubtotal - discount;
  const setupFee = selectedPkg ? 500 : 0;
  const onetimeTotal = onetimeAddons.reduce((s, a) => s + a.price, 0);
  const dueToday = trial
    ? setupFee + onetimeTotal
    : setupFee + onetimeTotal + monthlyTotal;

  function toggleAddon(key: string) {
    setAddons(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function dotLine(label: string, val: string, width = 52) {
    const dots = ".".repeat(Math.max(2, width - label.length - val.length));
    return `${label}${dots}${val}`;
  }

  function generateQuote(mode: "quote" | "email") {
    if (!selectedPkg) return "";
    const p = selectedPkg;
    const lines: string[] = [];
    const name = clientName || "there";
    const biz = bizName || "your business";

    if (mode === "email") {
      lines.push(`Subject: Here's Everything We're Going to Do for ${biz} ✨`);
      lines.push("");
      lines.push(`Hi ${name},`);
      lines.push("");
      lines.push(`It was so great connecting with you! I put this together just for ${biz} — every single thing we talked about is in here.`);
      lines.push("");
      lines.push(`Take a read through. I think you're going to love it.`);
      lines.push("");
    }

    lines.push("═".repeat(54));
    lines.push("  THE DOLLHOUSE BRAND STUDIO");
    lines.push(`  Your Custom Proposal${bizName ? ` — ${biz}` : ""}`);
    if (city) lines.push(`  ${city}${niche ? ` · ${niche}` : ""}`);
    if (website) lines.push(`  ${website}`);
    lines.push("═".repeat(54));
    lines.push("");

    // --- The Big Promise ---
    lines.push("  HERE'S WHAT'S GOING TO HAPPEN:");
    lines.push("─".repeat(54));
    lines.push("");
    lines.push(`  We are going to take ${biz} and make it look`);
    lines.push("  amazing online — every single day.");
    lines.push("");
    lines.push("  You won't have to film anything.");
    lines.push("  You won't have to write a single caption.");
    lines.push("  You won't have to touch your phone to post.");
    lines.push("");
    lines.push("  We handle ALL of it. 100% done for you.");
    lines.push("");

    // --- The Plan ---
    lines.push(`  ✦  YOUR PLAN: ${p.name.toUpperCase()}`);
    lines.push("─".repeat(54));
    lines.push("");
    lines.push(`  ${p.tagline}`);
    lines.push("");
    lines.push("  What we do for you every single month:");
    lines.push("");
    p.includes.forEach(item => lines.push(`    ✓  ${item}`));

    if (monthlyAddons.length > 0 || onetimeAddons.length > 0) {
      lines.push("");
      lines.push("  EXTRAS WE'RE ADDING FOR YOU:");
      lines.push("");
      monthlyAddons.forEach(a => {
        lines.push(`    + ${a.name}  ($${a.price} USD/mo)`);
        lines.push(`      ${a.desc}`);
      });
      onetimeAddons.forEach(a => {
        lines.push(`    + ${a.name}  ($${a.price} USD — one time)`);
        lines.push(`      ${a.desc}`);
      });
    }

    lines.push("");
    lines.push("─".repeat(54));
    lines.push("  WHY THIS WORKS:");
    lines.push("─".repeat(54));
    lines.push("");
    lines.push("  Most business owners never show up online because");
    lines.push("  it takes too much time. We fix that.");
    lines.push("");
    lines.push("  Your content goes out every week — on time, on brand,");
    lines.push("  without you doing a thing.");
    lines.push("");
    lines.push("  People start seeing your business everywhere.");
    lines.push("  They trust you. They reach out. You get more clients.");
    lines.push("");

    // --- Pricing ---
    lines.push("─".repeat(54));
    lines.push("  WHAT IT COSTS:");
    lines.push("─".repeat(54));
    lines.push("");

    if (trial) {
      lines.push("  ★  YOU HAVE A FREE 14-DAY TRIAL!");
      lines.push("");
      lines.push("  Try the full service for 2 weeks — completely free.");
      lines.push("  You only pay the setup fee today to lock in your spot.");
      lines.push("");
    }

    lines.push(dotLine(`  ${p.name} Plan`, `$${p.monthly.toLocaleString()} USD/mo`));
    if (monthlyAddons.length > 0) {
      monthlyAddons.forEach(a => lines.push(dotLine(`  + ${a.name}`, `$${a.price} USD/mo`)));
    }
    if (contractLen === "12mo") {
      lines.push(dotLine("  Subtotal", `$${monthlySubtotal.toLocaleString()} USD/mo`));
      lines.push(dotLine("  12-Month Discount (10% off)", `−$${discount} USD/mo`));
    }
    lines.push(dotLine("  Monthly Total", `$${monthlyTotal.toLocaleString()} USD/mo`));
    lines.push("");
    lines.push("  One-Time Setup Fee (charged only once, ever):");
    lines.push(dotLine("  Build-out & account setup", `$${setupFee} USD`));
    if (onetimeAddons.length > 0) {
      onetimeAddons.forEach(a => lines.push(dotLine(`  + ${a.name}`, `$${a.price} USD`)));
    }
    if (adSpend) {
      lines.push("");
      lines.push(`  * Ad budget (paid directly by you to the platform): ${adSpend}`);
      lines.push("    This is NOT paid to us — it goes straight to your ads.");
    } else if (addons.has("fb_ads") || addons.has("google_ads")) {
      lines.push("");
      lines.push("  * Recommended: $150/mo Meta budget to boost your best-performing post each month.");
      lines.push("    This is paid directly to Meta by you — not included in your retainer.");
    }
    lines.push("");
    lines.push("─".repeat(54));
    if (trial) {
      lines.push(dotLine("  DUE TODAY (to lock in your spot)", `$${dueToday.toLocaleString()} USD`));
      lines.push(dotLine("  First 14 days", "FREE — on us"));
      lines.push(dotLine("  Then monthly starting Day 15", `$${monthlyTotal.toLocaleString()} USD/mo`));
    } else {
      lines.push(dotLine("  DUE TODAY (to get started)", `$${dueToday.toLocaleString()} USD`));
      lines.push(dotLine("  Then every month", `$${monthlyTotal.toLocaleString()} USD/mo`));
    }
    lines.push("─".repeat(54));
    lines.push("");

    // --- Contract Terms ---
    const contractLabel = contractLen === "12mo" ? "12-Month Agreement (10% discount applied)" : "6-Month Minimum";
    lines.push("─".repeat(54));
    lines.push("  COMMITMENT & CANCELLATION:");
    lines.push("─".repeat(54));
    lines.push("");
    lines.push(`  Contract: ${contractLabel}`);
    lines.push("  After your minimum term: cancel with 30 days' written notice.");
    if (contractLen === "12mo") lines.push("  Discount locked for the full term. Rate does not change.");
    lines.push("  Billing: Monthly · 3.7% payment processing fee applies.");
    lines.push("");

    // --- Timeline ---
    lines.push("  WHAT HAPPENS AFTER YOU SAY YES:");
    lines.push("─".repeat(54));
    lines.push("");
    lines.push("  Week 1–2  →  We learn your brand, set everything up");
    lines.push("  Week 2–3  →  Your first content is created + you approve it");
    lines.push("  Week 3–4  →  Everything goes live and starts working for you");
    lines.push("  Month 2+  →  Fully running on autopilot. Reports every month.");
    lines.push("");

    // --- Next Steps ---
    lines.push("─".repeat(54));
    lines.push("  HOW TO GET STARTED:");
    lines.push("─".repeat(54));
    lines.push("");
    lines.push("  Step 1 — Read this and ask me anything");
    lines.push("  Step 2 — Tell me your start date");
    lines.push("  Step 3 — Pay the one-time setup fee to lock in your spot");
    if (trial) lines.push("  Step 4 — Your free 14-day trial starts right away");
    lines.push(`  Step ${trial ? "5" : "4"} — We get to work. That's it.`);
    lines.push("");
    lines.push("  This offer is held for 7 days.");
    lines.push("");

    if (note) {
      lines.push("─".repeat(54));
      lines.push("  A NOTE FROM AMANDA:");
      lines.push("");
      lines.push(`  ${note}`);
      lines.push("");
    }

    lines.push("═".repeat(54));
    lines.push("  The Dollhouse Brand Studio");
    lines.push("  hello@shopdollhouse.co");
    lines.push("  shopdollhouse.co");
    lines.push("═".repeat(54));

    if (mode === "email") {
      lines.push("");
      lines.push(`I'm genuinely excited about what we can do for ${biz}.`);
      lines.push("If you have any questions at all — just reply to this email.");
      lines.push("");
      lines.push("Ready when you are! 🤍");
      lines.push("");
      lines.push("Amanda");
      lines.push("The Dollhouse Brand Studio");
    }

    return lines.join("\n");
  }

  function copyText(mode: "quote" | "email") {
    navigator.clipboard.writeText(generateQuote(mode));
    setCopied(mode);
    setTimeout(() => setCopied(null), 2500);
  }

  function saveToPipeline() {
    if (!selectedPkg) return;
    const now = new Date().toISOString();
    const quoteMsg = {
      id: uid(),
      label: `Quote — ${selectedPkg.name} · $${monthlyTotal.toLocaleString()}/mo`,
      body: generateQuote("quote"),
      at: now,
    };

    if (prospectId) {
      // Attach quote to existing prospect — move to Proposal stage, no duplicate
      persist(prospects.map(p =>
        p.id === prospectId
          ? { ...p, stage: "proposal" as PStage, quoteSentAt: now, savedMsgs: [quoteMsg, ...p.savedMsgs] }
          : p
      ));
    } else {
      // No existing prospect — create a new one
      const newProspect: Prospect = {
        id: uid(),
        biz: bizName || "Unknown Business",
        contact: clientName || "",
        email,
        phone,
        niche,
        city,
        pain: "",
        source: "Quote Builder",
        stage: "proposal",
        notes: [],
        savedMsgs: [quoteMsg],
        created: now,
        quoteSentAt: now,
      };
      persist([newProspect, ...prospects]);
    }
    setSaved(true);
  }

  const quoteReady = !!selectedPkg;

  const inputStyle = {
    fontFamily: FONT_BODY, fontSize: "0.875rem",
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(200,168,100,0.3)",
    color: "var(--ink)",
  };

  function AddonRow({ a, isOnetime }: { a: QBAddon; isOnetime?: boolean }) {
    const checked = addons.has(a.key);
    const accentColor = isOnetime ? "#7b68ee" : "var(--gold)";
    return (
      <label
        className="flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all"
        style={{
          background: checked ? (isOnetime ? "rgba(123,104,238,0.08)" : "rgba(200,168,100,0.1)") : "rgba(255,255,255,0.4)",
          border: checked ? `1px solid ${isOnetime ? "rgba(123,104,238,0.3)" : "rgba(200,168,100,0.35)"}` : "1px solid rgba(200,168,100,0.1)",
        }}
      >
        <input type="checkbox" checked={checked} onChange={() => toggleAddon(a.key)} className="sr-only" />
        <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all" style={{ background: checked ? accentColor : "rgba(255,255,255,0.7)", border: checked ? "none" : "1px solid rgba(200,168,100,0.4)" }}>
          {checked && <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>}
        </div>
        <SvgIcon id={a.emoji} size={16} />
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", color: "var(--ink)" }}>{a.name}</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.5)" }}>{a.desc}</p>
        </div>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.875rem", fontWeight: 600, whiteSpace: "nowrap", color: checked ? accentColor : "rgba(30,15,10,0.4)" }}>
          {isOnetime ? `+$${a.price}` : `+$${a.price}/mo`}
        </p>
      </label>
    );
  }

  function Toggle({ active, onToggle, label, sub, activeColor = "var(--gold)" }: { active: boolean; onToggle: () => void; label: string; sub: string; activeColor?: string }) {
    return (
      <div className="flex items-center justify-between p-4 rounded-xl transition-all" style={{ background: active ? `${activeColor}18` : "rgba(255,255,255,0.4)", border: active ? `1px solid ${activeColor}55` : "1px solid rgba(200,168,100,0.15)" }}>
        <div>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", color: "var(--ink)" }}>{label}</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>{sub}</p>
        </div>
        <button onClick={onToggle} className="w-12 h-6 rounded-full relative transition-all shrink-0 ml-4" style={{ background: active ? activeColor : "rgba(200,168,100,0.25)" }}>
          <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: active ? "28px" : "4px" }} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        label="Quote Builder"
        title="Build a Custom Client Quote"
        sub="Fill in the details, pick a package and add-ons — a professional proposal generates instantly, ready to copy and send."
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-start">

        {/* ── LEFT: Controls ── */}
        <div className="space-y-6">

          {/* Step 1 — Client Info */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 1 — Client Info</p>
              {linkedProspect && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ fontFamily: FONT_LUXE, background: "rgba(74,153,112,0.12)", color: "#4a9970", border: "1px solid rgba(74,153,112,0.3)" }}>
                    🔗 Linked: {linkedProspect.biz}
                  </span>
                  <button onClick={onClearProspect} className="hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", color: "rgba(30,15,10,0.4)", letterSpacing: "0.1em" }}>× unlink</button>
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                { label: "Client Name", val: clientName, set: setClientName, placeholder: "e.g. Sarah" },
                { label: "Business Name", val: bizName, set: setBizName, placeholder: "e.g. Bloom Med Spa" },
                { label: "Email Address", val: email, set: setEmail, placeholder: "e.g. sarah@blomspa.com" },
                { label: "Phone Number", val: phone, set: setPhone, placeholder: "e.g. 416-555-0100" },
                { label: "Website", val: website, set: setWebsite, placeholder: "e.g. blomspa.com" },
                { label: "Industry / Niche", val: niche, set: setNiche, placeholder: "e.g. Medical Aesthetics" },
                { label: "City", val: city, set: setCity, placeholder: "e.g. Toronto, ON" },
              ] as const).map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block mb-1.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(30,15,10,0.5)", textTransform: "uppercase" }}>{label}</label>
                  <input
                    value={val}
                    onChange={e => (set as (v: string) => void)(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl outline-none"
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 — Package */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 2 — Choose a Package</p>
            <div className="space-y-3">
              {(Object.entries(QB_PACKAGES) as [PkgKey, (typeof QB_PACKAGES)[PkgKey]][]).map(([key, p]) => {
                const isSelected = pkg === key;
                return (
                  <div
                    key={key}
                    onClick={() => setPkg(isSelected ? null : key)}
                    className="rounded-xl p-4 cursor-pointer transition-all"
                    style={{ border: isSelected ? `2px solid ${p.color}` : "1px solid rgba(200,168,100,0.2)", background: isSelected ? `${p.color}15` : "rgba(255,255,255,0.5)" }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <SvgIcon id={p.emoji} size={20} />
                        <div>
                          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: p.color, fontWeight: 600 }}>{p.name}</p>
                          <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)" }}>{p.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p style={{ fontFamily: FONT_LUXE, fontSize: "1.05rem", color: p.color, fontWeight: 600 }}>${p.monthly.toLocaleString()}/mo</p>
                        <p style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", color: "rgba(30,15,10,0.4)" }}>+ $500 setup</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${p.color}30` }}>
                        <p className="mb-2 text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: p.color }}>Includes</p>
                        <div className="grid sm:grid-cols-2 gap-1">
                          {p.includes.map((item, i) => (
                            <p key={i} style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.7)" }}>✓ {item}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3 — Add-Ons */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 3 — Add-On Services</p>
            <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>Monthly Add-Ons</p>
            <div className="space-y-2 mb-6">
              {QB_ADDONS.filter(a => a.type === "monthly").map(a => <AddonRow key={a.key} a={a} />)}
            </div>
            <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>One-Time Services</p>
            <div className="space-y-2">
              {QB_ADDONS.filter(a => a.type === "onetime").map(a => <AddonRow key={a.key} a={a} isOnetime />)}
            </div>
          </div>

          {/* Step 4 — Options */}
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 4 — Options & Notes</p>
            <div className="space-y-4">
              <Toggle
                active={trial} onToggle={() => setTrial(!trial)}
                label="14-Day Free Trial"
                sub="$500 setup collected today · first 2 weeks free · month 1 billed on day 15"
                activeColor="#4a9970"
              />
              {/* Contract Length Selector */}
              <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(200,168,100,0.2)" }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.875rem", color: "var(--ink)" }}>Contract Length</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>6-month minimum · 10% off 12 months</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {([
                    { val: "6mo", label: "6 Months", sub: "Standard" },
                    { val: "12mo", label: "12 Months", sub: "10% off" },
                  ] as const).map(opt => {
                    const active = contractLen === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => setContractLen(opt.val)}
                        className="py-2.5 px-2 rounded-xl text-center transition-all"
                        style={{
                          background: active ? "var(--gold)" : "rgba(255,255,255,0.6)",
                          border: active ? "2px solid var(--gold)" : "1px solid rgba(200,168,100,0.25)",
                        }}
                      >
                        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", color: active ? "var(--cream)" : "var(--ink)", fontWeight: active ? 600 : 400 }}>{opt.label}</p>
                        <p style={{ fontFamily: FONT_BODY, fontSize: "0.68rem", color: active ? "rgba(250,243,234,0.75)" : "#4a9970", marginTop: "2px" }}>{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(30,15,10,0.5)", textTransform: "uppercase" }}>Client Ad Spend Budget <span style={{ fontWeight: 300 }}>(optional)</span></label>
                <input
                  value={adSpend}
                  onChange={e => setAdSpend(e.target.value)}
                  placeholder="e.g. $150/mo Meta boost (recommended minimum) · $500/mo Google (paid directly by client)"
                  className="w-full px-4 py-2.5 rounded-xl outline-none"
                  style={inputStyle}
                />
                <p className="mt-1.5" style={{ fontFamily: FONT_BODY, fontSize: "0.72rem", color: "rgba(30,15,10,0.38)" }}>Ad spend is paid directly to the platform — not included in your retainer.</p>
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(30,15,10,0.5)", textTransform: "uppercase" }}>Custom Note <span style={{ fontWeight: 300 }}>(optional)</span></label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Add a personal note — it'll appear at the bottom of the proposal."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl outline-none resize-none"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        <div className="lg:sticky lg:top-24 space-y-4">

          {/* Summary Card */}
          <div className="rounded-2xl p-6" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Investment Summary</p>
              <span className="text-[9px] tracking-wider uppercase px-2 py-1 rounded-full" style={{ fontFamily: FONT_LUXE, background: "rgba(74,153,112,0.15)", color: "#4a9970", border: "1px solid rgba(74,153,112,0.3)" }}>🇺🇸 USD</span>
            </div>
            {!selectedPkg ? (
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "2rem 0" }}>← Select a package to see pricing</p>
            ) : (
              <>
                {/* Monthly breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "6px" }}><SvgIcon id={selectedPkg.emoji} size={14} />{selectedPkg.name}</span>
                    <span style={{ fontFamily: FONT_LUXE, fontSize: "0.85rem", color: "var(--cream)" }}>${selectedPkg.monthly.toLocaleString()}/mo</span>
                  </div>
                  {monthlyAddons.map(a => (
                    <div key={a.key} className="flex justify-between items-center">
                      <span style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>+ {a.name}</span>
                      <span style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>+${a.price}/mo</span>
                    </div>
                  ))}
                  {contractLen === "12mo" && (
                    <div className="flex justify-between items-center pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      <span style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "#4a9970" }}>12-Month Discount (10%)</span>
                      <span style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", color: "#4a9970" }}>−${discount.toLocaleString()}/mo</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center py-3 mb-4" style={{ borderTop: "1px solid rgba(200,168,100,0.2)", borderBottom: "1px solid rgba(200,168,100,0.2)" }}>
                  <span style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Monthly Total</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: "var(--gold)", fontWeight: 600 }}>${monthlyTotal.toLocaleString()}/mo</span>
                </div>
                {/* One-time breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>Setup Fee</span>
                    <span style={{ fontFamily: FONT_LUXE, fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>$500</span>
                  </div>
                  {onetimeAddons.map(a => (
                    <div key={a.key} className="flex justify-between items-center">
                      <span style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>+ {a.name}</span>
                      <span style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>${a.price}</span>
                    </div>
                  ))}
                </div>
                {/* Due Today */}
                <div className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.15)", border: "1px solid rgba(200,168,100,0.3)" }}>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{trial ? "Due Today (Setup)" : "Due Today"}</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--gold)", fontWeight: 700 }}>${dueToday.toLocaleString()}</span>
                  </div>
                  {trial && <p style={{ fontFamily: FONT_BODY, fontSize: "0.72rem", color: "rgba(200,168,100,0.6)", marginTop: "4px" }}>First 2 weeks free · ${monthlyTotal.toLocaleString()}/mo starts day 15</p>}
                </div>
                {adSpend && (
                  <p className="mt-3 text-center" style={{ fontFamily: FONT_BODY, fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>* Client pays ad spend directly: {adSpend}</p>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => quoteReady && copyText("quote")}
              className="py-3 rounded-xl text-[11px] tracking-widest uppercase transition-all"
              style={{
                fontFamily: FONT_LUXE,
                background: copied === "quote" ? "#4a7a4a" : (quoteReady ? "var(--ink)" : "rgba(30,15,10,0.1)"),
                color: quoteReady ? "var(--gold)" : "rgba(30,15,10,0.25)",
                cursor: quoteReady ? "pointer" : "not-allowed",
                border: "1px solid rgba(200,168,100,0.2)",
              }}
            >
              {copied === "quote" ? "✓ Copied!" : "📋 Copy Quote"}
            </button>
            <button
              onClick={() => quoteReady && copyText("email")}
              className="py-3 rounded-xl text-[11px] tracking-widest uppercase transition-all"
              style={{
                fontFamily: FONT_LUXE,
                background: copied === "email" ? "#4a7a4a" : (quoteReady ? "rgba(200,168,100,0.14)" : "rgba(30,15,10,0.05)"),
                color: quoteReady ? "var(--gold)" : "rgba(30,15,10,0.25)",
                cursor: quoteReady ? "pointer" : "not-allowed",
                border: quoteReady ? "1px solid rgba(200,168,100,0.35)" : "1px solid rgba(200,168,100,0.1)",
              }}
            >
              {copied === "email" ? "✓ Copied!" : "📧 Copy as Email"}
            </button>
          </div>

          {/* Save to Pipeline */}
          {!saved ? (
            <button
              onClick={() => quoteReady && saveToPipeline()}
              className="w-full py-3.5 rounded-xl text-[11px] tracking-widest uppercase transition-all"
              style={{
                fontFamily: FONT_LUXE,
                background: quoteReady ? "rgba(74,153,112,0.12)" : "rgba(30,15,10,0.04)",
                color: quoteReady ? "#4a9970" : "rgba(30,15,10,0.2)",
                cursor: quoteReady ? "pointer" : "not-allowed",
                border: quoteReady ? "1px solid rgba(74,153,112,0.35)" : "1px solid rgba(30,15,10,0.08)",
              }}
            >
              {linkedProspect ? `➕ Attach Quote to ${linkedProspect.biz}` : "➕ Save to Pipeline"}
            </button>
          ) : (
            <div className="rounded-xl p-4 text-center space-y-3" style={{ background: "rgba(74,153,112,0.1)", border: "1px solid rgba(74,153,112,0.3)" }}>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a9970" }}>
                ✓ {linkedProspect ? `Quote attached to ${linkedProspect.biz}` : "Saved to pipeline"} — expires in 7 days
              </p>
              <button
                onClick={onGoToDeals}
                className="w-full py-2.5 rounded-xl text-[11px] tracking-widest uppercase transition-all hover:opacity-90"
                style={{ fontFamily: FONT_LUXE, background: "#4a9970", color: "#fff" }}
              >
                Go to Deal Pipeline →
              </button>
            </div>
          )}

          {/* Live Quote Preview */}
          {quoteReady && (
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.6)" }}>
              <div className="px-4 py-2.5" style={{ background: "rgba(200,168,100,0.08)", borderBottom: "1px solid rgba(200,168,100,0.15)" }}>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>Quote Preview</p>
              </div>
              <pre className="p-4 text-[11px] leading-relaxed overflow-auto max-h-[500px]" style={{ fontFamily: "ui-monospace, monospace", color: "rgba(30,15,10,0.7)", whiteSpace: "pre-wrap", margin: 0 }}>
                {generateQuote("quote")}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Discovery Call Script Generator ────────────── */

type DStep = "setup" | "opening" | "source" | "situation" | "pain" | "pitch" | "package" | "reaction" | "close" | "done";

function DiscoveryCallTab() {
  const [clientName, setClientName] = useState("");
  const [bizName, setBizName] = useState("");
  const [step, setStep] = useState<DStep>("setup");
  const [history, setHistory] = useState<DStep[]>([]);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const firstName = clientName.split(" ")[0] || "them";
  const biz = bizName || "your business";

  function choose(key: string, value: string, next: DStep) {
    setChoices(c => ({ ...c, [key]: value }));
    setHistory(h => [...h, step]);
    setStep(next);
  }
  function advance(next: DStep) { setHistory(h => [...h, step]); setStep(next); }
  function goBack() { const prev = history[history.length - 1]; if (prev) { setHistory(h => h.slice(0, -1)); setStep(prev); } }
  function reset() { setStep("setup"); setHistory([]); setChoices({}); setCopied(false); }

  const STEPS: DStep[] = ["setup","opening","source","situation","pain","pitch","package","reaction","close","done"];
  const stepIndex = STEPS.indexOf(step);

  const STAGE_LABELS: Partial<Record<DStep, { label: string; color: string }>> = {
    setup:     { label: "Setup",     color: "rgba(200,168,100,0.9)" },
    opening:   { label: "Opening",   color: "#4a9970" },
    source:    { label: "Discovery", color: "#5a8ad0" },
    situation: { label: "Discovery", color: "#5a8ad0" },
    pain:      { label: "Discovery", color: "#5a8ad0" },
    pitch:     { label: "The Pitch", color: "var(--rose)" },
    package:   { label: "Pricing",   color: "#c8a864" },
    reaction:  { label: "Reaction",  color: "#a068d0" },
    close:     { label: "Close",     color: "#4a9970" },
    done:      { label: "Complete",  color: "#4a9970" },
  };

  // Scripts —— dynamically constructed from choices
  const scripts: Partial<Record<DStep, { heading: string; script: string; choices?: { label: string; key: string; value: string; next: DStep }[]; next?: DStep }>> = {

    opening: {
      heading: "Open the call",
      script: `"Hey ${firstName}! Thanks so much for making the time — I really appreciate it. I want to make sure this call is actually useful for you, so before I talk about anything on our end, I'd love to ask a couple quick questions about ${biz}. Is that okay?"\n\n[Wait for yes]\n\n"Perfect. So tell me — what's going on with ${biz} right now? Like what made you want to look into this?"`,
      next: "source",
    },

    source: {
      heading: "How did they find you?",
      script: `Listen to their answer, then pick what applies:`,
      choices: [
        { label: "They came inbound (found our site / form)", key: "source", value: "inbound", next: "situation" },
        { label: "Referral sent them", key: "source", value: "referral", next: "situation" },
        { label: "I reached out to them cold", key: "source", value: "cold", next: "situation" },
      ],
    },

    situation: {
      heading: "Understand their current situation",
      script: choices.source === "inbound"
        ? `"I'm glad you found us! Before I tell you anything about what we do — what's going on right now with your marketing and social media? Like what does that currently look like for ${biz}?"`
        : choices.source === "referral"
        ? `"Love it — [name] is great. So tell me, what did they say to you about us? And what's going on right now with ${biz}'s online presence?"`
        : `"So I came across ${biz} and honestly, I thought — incredible business, but the online presence doesn't match the quality of what you're actually doing. Does that resonate at all? Tell me what the marketing side of things looks like for you right now."`,
      choices: [
        { label: "Nothing — too busy, it just doesn't happen", key: "situation", value: "nothing", next: "pain" },
        { label: "Posting here and there, but no consistency", key: "situation", value: "inconsistent", next: "pain" },
        { label: "Working with someone else, not happy with results", key: "situation", value: "unhappy_agency", next: "pain" },
        { label: "Just starting out, nothing set up yet", key: "situation", value: "starting_out", next: "pain" },
      ],
    },

    pain: {
      heading: "Find the real pain",
      script: choices.situation === "nothing"
        ? `"Okay so right now social media is basically not happening. You know it matters, but between running ${biz} there's just no time. Does that sound right?"\n\n[Pause — let them confirm or add to it]\n\n"So if I could fix one thing for ${biz} right now, what would make the biggest difference?"`
        : choices.situation === "inconsistent"
        ? `"So you're posting but it's whenever you get a chance — no real strategy, no consistency. Some weeks are great, some weeks nothing goes up. And you're probably not seeing the results you'd hope for.\n\n[Pause] What would feel like a win to you? Like what's the actual goal here — more clients, more visibility, something else?"`
        : choices.situation === "unhappy_agency"
        ? `"Got it — so you've got something in place but it's not working. What's been the biggest frustration with it?\n\n[Listen fully]\n\nYeah, that's honestly one of the most common things we hear. What would it need to look like for you to actually feel good about it?"`
        : `"So you're basically building from zero. That's actually a great position to be in — we get to set everything up right from the start. What's the most important thing for you to get out of this — like if we nail one thing, what is it?"`,
      choices: [
        { label: "More leads / more booked clients", key: "pain", value: "leads", next: "pitch" },
        { label: "More time — they're overwhelmed doing it themselves", key: "pain", value: "time", next: "pitch" },
        { label: "Look more professional / credible online", key: "pain", value: "credibility", next: "pitch" },
        { label: "Beat competitors who are outranking them online", key: "pain", value: "competition", next: "pitch" },
        { label: "Build brand awareness in their area", key: "pain", value: "awareness", next: "pitch" },
      ],
    },

    pitch: {
      heading: "Deliver the pitch",
      script: choices.pain === "leads"
        ? `"Okay so here's exactly what I'd do for ${biz}. We build your full done-for-you content system — your AI clone so your face and voice is showing up every day without you filming, automated follow-up so nobody falls through the cracks, and your ads running and optimised to bring in real leads. The whole thing runs in the background while you focus on serving clients. People start seeing you everywhere, trusting you, reaching out.\n\nBasically — a consistent, predictable flow of new clients. That's the goal, right?"`
        : choices.pain === "time"
        ? `"So here's how we solve that. We take the entire marketing side of ${biz} completely off your plate. Content? We do it. Posting? We do it. DMs and comments? We handle them. Follow-up when someone shows interest? Automated. You literally never have to think about what to post again. It all runs on autopilot.\n\nHow much time are you spending on this stuff right now?"`
        : choices.pain === "credibility"
        ? `"So what we build for ${biz} is a complete branded content system — everything designed to look premium and consistent with who you actually are. Your AI brand character shows up professionally online every single day. When someone looks you up, it immediately says 'this is a serious, established business.'\n\nRight now when people find you online — what do they see?"`
        : choices.pain === "competition"
        ? `"Here's the thing — ${biz} showing up online every single day, with high-quality branded content and ads targeting your exact local audience? That's how you take the space your competitors are currently owning. You become the one people see first, trust first, and call first. While they're posting once a week, you're everywhere.\n\nWho's the main competitor you're thinking about right now?"`
        : `"So we build your content system and run your local awareness push. Every week, new content going out. Every month, more people in your area who've seen your name, trust your brand, know what you do. ${biz} becomes the business people think of first.\n\nWhat area are you targeting — like just [city] or a wider region?"`,
      next: "package",
    },

    package: {
      heading: "Present your package",
      script: `Based on everything they told you — pick the right plan:`,
      choices: [
        { label: "Content Starter — $500/mo", key: "package", value: "content_starter", next: "reaction" },
        { label: "Starter — $1,000/mo", key: "package", value: "starter", next: "reaction" },
        { label: "Growth — $2,500/mo", key: "package", value: "growth", next: "reaction" },
        { label: "Elite — $5,000+/mo", key: "package", value: "elite", next: "reaction" },
      ],
    },

    reaction: {
      heading: "What was their reaction?",
      script: choices.package === "content_starter"
        ? `"So there's actually a perfect entry-point for this. It's called our Content Starter — $500 a month. We create 8 branded posts for you every month, schedule everything, and it's completely done for you. No AI avatar, no automation — just really clean, on-brand content going out consistently. There's a one-time $500 setup fee to get everything built out, and we start with a 6-month minimum — you'll see results within 90 days and months 4 through 6 are where it really compounds. After that you can stay month-to-month or lock in 12 months for 10% off.\n\nWhat do you think?"`
        : choices.package === "starter"
        ? `"So the plan I'd recommend for ${biz} is our Starter. It's $1,000 a month — and you get your full AI clone built so your face and voice is showing up in content without you filming, one platform fully managed, all your automations set up, and a monthly performance report. There's a one-time $500 setup fee to build everything out, and we start with a 3-month minimum — that's what it takes to really see it working. After that it's flexible.\n\nWant me to walk you through what that specifically looks like for ${biz}?"`
        : choices.package === "growth"
        ? `"For ${biz}, I'd actually go with our Growth plan. It's $2,500 a month — and this gets you across three platforms fully managed, Instagram, TikTok, and Facebook. Your AI clone running, paid ad management, email and SMS automation so leads get followed up automatically. One-time $500 setup fee to kick things off. Based on what you told me about [pain], this is the one that's really going to move the needle.\n\nDoes that feel like the right level for where you want to take ${biz}?"`
        : `"Honestly, based on everything you've told me, I think Elite is the right move for ${biz}. It's $5,000 a month — and it's the full system. Five platforms, AI clone, AI voice agent so your phone is never unmanned, full ad management, everything. Your business completely dominating online, nothing left to chance. One-time $500 setup fee.\n\nThis is what we build for businesses that are serious about growth. What's your reaction to that?"`,
      choices: [
        { label: "Sounds great — they want to move forward", key: "reaction", value: "ready", next: "close" },
        { label: "That's more than they expected / too expensive", key: "reaction", value: "price", next: "close" },
        { label: "Need to think about it", key: "reaction", value: "think", next: "close" },
        { label: "Need to talk to their partner / spouse", key: "reaction", value: "partner", next: "close" },
        { label: "Not interested right now", key: "reaction", value: "no", next: "close" },
      ],
    },

    close: {
      heading: "Close the call",
      script: choices.reaction === "ready"
        ? `"Perfect! So here's exactly what happens next. I'll send you over a full proposal today — it'll have everything we talked about laid out clearly with all the numbers. All you need to do is confirm and we collect the $500 setup fee to lock in your spot. Once that's in, we start your buildout immediately and your content goes live within the first month.\n\nDoes today or tomorrow work to get that moving?"`
        : choices.reaction === "price"
        ? `"I totally get it — it's a real investment and I respect that you're being careful with it. Can I ask — what are you currently spending to get new clients? Because for most of the businesses we work with, one or two new clients from this system pays for the entire month.\n\nBut I hear you. A couple options — we could start you on the [lower plan] and upgrade once you see results. Or we do have a 14-day free trial where you only pay the $500 setup today and your first two weeks are completely on us. That way there's basically zero risk. Does either of those feel like a better fit?"`
        : choices.reaction === "think"
        ? `"Absolutely — this is a real decision and I want you to feel good about it. Can I ask, what specifically are you wanting to think through? [Listen] Okay that makes sense.\n\nHere's what I'll do — I'll send you the full proposal today so you have everything in writing with all the details. What's a good day for a quick 10-minute check-in? I just want to make sure all your questions get answered and nothing falls through the cracks.\n\nDoes [2 days from now] work?"`
        : choices.reaction === "partner"
        ? `"Of course — big decisions are always better made together. I'm going to send you the full proposal right now so you both have something to look at together.\n\nWould it make sense to get your partner on a quick 20-minute call? A lot of times it helps to hear it directly from us and get questions answered on the spot. When do you think you'd both have a few minutes?"`
        : `"No worries at all — I really appreciate your honesty, it saves us both time. Can I ask what made it not feel like a fit right now? [Listen]\n\nGot it. Well look — if anything changes or the timing gets better down the road, the door is completely open. I'll send you our info so you have it. And if you know anyone who might be a good fit for this, I'd love a referral. Thanks so much for your time, ${firstName} — I genuinely wish you the best with ${biz}."`,
      next: "done",
    },

    done: {
      heading: "Call complete",
      script: `Great work. Here's what to do right now:\n\n1. Send the proposal (go to Quote Builder, build it for ${biz})\n2. Add them to the Deal Pipeline at the right stage\n3. Log a note on what they said\n4. Follow up in ${choices.reaction === "think" || choices.reaction === "partner" ? "2–3 days" : "24 hours"} if you haven't heard back`,
    },
  };

  const current = scripts[step];
  const stageInfo = STAGE_LABELS[step];

  const S = { fontFamily: FONT_BODY } as const;
  const SL = { fontFamily: FONT_LUXE } as const;

  // Setup screen
  if (step === "setup") return (
    <div>
      <SectionHeader label="Discovery Call" title="Script Generator" sub="Enter the client's name and business — then follow each step. Every button generates exactly what to say next." />
      <div className="max-w-lg mx-auto mt-8 rounded-2xl p-8 space-y-5" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div>
          <label className="block mb-1.5" style={{ ...SL, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.5)" }}>Client First Name</label>
          <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Sarah" className="w-full px-4 py-3 rounded-xl outline-none" style={{ ...S, fontSize: "1rem", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(200,168,100,0.3)", color: "var(--ink)" }} />
        </div>
        <div>
          <label className="block mb-1.5" style={{ ...SL, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.5)" }}>Business Name</label>
          <input value={bizName} onChange={e => setBizName(e.target.value)} placeholder="e.g. Bloom Med Spa" className="w-full px-4 py-3 rounded-xl outline-none" style={{ ...S, fontSize: "1rem", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(200,168,100,0.3)", color: "var(--ink)" }} />
        </div>
        <button onClick={() => advance("opening")} className="w-full py-4 rounded-xl transition-all hover:opacity-90" style={{ background: "var(--ink)", ...SL, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
          Start the Call →
        </button>
        <p style={{ ...S, fontSize: "0.75rem", color: "rgba(30,15,10,0.35)", textAlign: "center" }}>You can also start without filling these in — scripts will use placeholders.</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button onClick={goBack} style={{ ...SL, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }} className="hover:opacity-60 transition-opacity">← Back</button>
          )}
          <div className="flex items-center gap-2">
            {stageInfo && (
              <span className="px-3 py-1 rounded-full text-[9px] tracking-widest uppercase" style={{ ...SL, background: `${stageInfo.color}22`, color: stageInfo.color, border: `1px solid ${stageInfo.color}44` }}>
                {stageInfo.label}
              </span>
            )}
            <span style={{ ...S, fontSize: "0.75rem", color: "rgba(30,15,10,0.4)" }}>Step {stepIndex} of {STEPS.length - 1}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ ...S, fontSize: "0.8rem", color: "rgba(30,15,10,0.4)" }}>{firstName} · {biz}</span>
          <button onClick={reset} style={{ ...SL, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)" }} className="hover:opacity-60 transition-opacity ml-2">✕ Reset</button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-8" style={{ background: "rgba(200,168,100,0.15)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%`, background: "linear-gradient(90deg, var(--gold), var(--rose))" }} />
      </div>

      {current && (
        <div className="space-y-5">
          {/* Heading */}
          <p style={{ ...SL, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}>{current.heading}</p>

          {/* Script block */}
          <div className="rounded-2xl p-7 relative" style={{ background: "var(--ink)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--cream)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {current.script}
            </p>
            <button
              onClick={() => { navigator.clipboard.writeText(current.script); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
              style={{ ...SL, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", background: copied ? "rgba(74,153,112,0.3)" : "rgba(200,168,100,0.12)", color: copied ? "#4a9970" : "rgba(200,168,100,0.7)", border: `1px solid ${copied ? "rgba(74,153,112,0.3)" : "rgba(200,168,100,0.2)"}` }}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          {/* Choices or advance button */}
          {current.choices ? (
            <div className="space-y-2.5">
              <p style={{ ...SL, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>They said / situation is →</p>
              {current.choices.map(c => (
                <button
                  key={c.value}
                  onClick={() => choose(c.key, c.value, c.next)}
                  className="w-full text-left px-5 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(200,168,100,0.25)", ...S, fontSize: "0.9rem", color: "var(--ink)" }}
                >
                  <span style={{ color: "var(--gold)", marginRight: "10px" }}>→</span>{c.label}
                </button>
              ))}
            </div>
          ) : current.next ? (
            <button
              onClick={() => advance(current.next!)}
              className="w-full py-4 rounded-xl transition-all hover:opacity-90"
              style={{ background: stageInfo ? `${stageInfo.color}` : "var(--ink)", ...SL, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: step === "opening" ? "var(--ink)" : "#fff" }}
            >
              {step === "opening" ? "They said yes — continue →" : step === "pitch" ? "They're listening — present pricing →" : "Continue →"}
            </button>
          ) : step === "done" ? (
            <button onClick={reset} className="w-full py-4 rounded-xl transition-all hover:opacity-90" style={{ background: "rgba(74,153,112,0.15)", ...SL, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a9970", border: "1px solid rgba(74,153,112,0.3)" }}>
              ✓ Start a New Call
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ─── Proposal Deck Tab ────────────────────────────────────────────────────────

// Media storage — IndexedDB for images and videos (no size limit vs localStorage)
const MEDIA_DB_NAME = "dh_proposal_media_v1";
const MEDIA_KEYS_LS  = "dh_proposal_media_keys_v1";

interface MediaItem { url: string; isVideo: boolean; }

function openMediaDB(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(MEDIA_DB_NAME, 1);
    r.onupgradeneeded = () => r.result.createObjectStore("media");
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbSave(key: string, file: File): Promise<void> {
  const db = await openMediaDB();
  return new Promise((res, rej) => {
    const tx = db.transaction("media", "readwrite");
    tx.objectStore("media").put(file, key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
async function idbLoad(key: string): Promise<File | null> {
  const db = await openMediaDB();
  return new Promise(res => {
    const tx = db.transaction("media", "readonly");
    const req = tx.objectStore("media").get(key);
    req.onsuccess = () => res((req.result as File) ?? null);
    req.onerror = () => res(null);
  });
}
async function idbDelete(key: string): Promise<void> {
  const db = await openMediaDB();
  return new Promise(res => {
    const tx = db.transaction("media", "readwrite");
    tx.objectStore("media").delete(key);
    tx.oncomplete = () => res();
  });
}

interface PStep { n: string; title: string; desc: string; }
interface PPrice { name: string; price: string; tag?: string; }
interface PSlide {
  layout: "title" | "headline" | "bullets" | "steps" | "image" | "pricing" | "cta";
  bg: "dark" | "light" | "blush" | "rose";
  heading: string;
  sub?: string;
  body?: string;
  bullets?: string[];
  steps?: PStep[];
  imageSlot?: true;
  imageLabel?: string;
  prices?: PPrice[];
  script: string;
}
interface PDeck { id: string; name: string; icon: string; tagline: string; slides: PSlide[]; }

const PROPOSAL_DECKS: PDeck[] = [
  /* ── AI Clone ──────────────────────────────────────────────────────────── */
  {
    id: "ai_clone", name: "AI Clone Proposal", icon: "bot",
    tagline: "The done-for-you content system powered by your AI clone",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "Your AI-Powered\nBrand System",
        sub: "The Dollhouse Brand Studio",
        script: "Thank you so much for having me today. What I'm about to show you has completely transformed how our clients grow online — and by the end of this, I think you're going to see exactly why this is different from anything you've tried before.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "You're great at what you do.",
        sub: "Does your online presence show it?",
        body: "The best businesses are often the most invisible online. That's the gap we close.",
        script: "Here's the truth. You are incredible at what you do. Your clients love you. But if someone who doesn't know you looked you up right now — what would they see? Probably not the full picture. That gap between your actual quality and what shows up online? That's exactly what we're here to fix.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "What silence costs you",
        bullets: [
          "Your competitors are posting every single day",
          "They might not be as good as you — but they're getting the call",
          "Visibility builds trust. Trust builds clients.",
          "Every day without content is a missed opportunity",
          "The businesses winning online aren't luckier — they're just showing up",
        ],
        script: "Think about your top competitor right now. Are they active online? Even if they're not as talented as you — if they're showing up every day and you're not, who does a new customer choose? This is about making sure that customer chooses you. Every time.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "Meet Your AI Clone",
        sub: "Your face. Your voice. Your brand.",
        body: "Showing up online every single day — without you filming a thing.",
        script: "So here's what we build for you. Your AI clone. A digital version of you — trained on your face, your voice, your personality — that creates content on your behalf. You record once, and we handle everything from there. It posts every day while you're focused on running your business.",
      },
      {
        layout: "steps", bg: "light",
        heading: "How it works",
        steps: [
          { n: "01", title: "You record once", desc: "One 30-minute session. That's it. We capture your voice, your face, your energy." },
          { n: "02", title: "We build your clone", desc: "Our team builds your AI model — trained to look and sound exactly like you." },
          { n: "03", title: "Content goes live", desc: "We script, generate, schedule, and post everything. Done for you, every week." },
        ],
        script: "The process is incredibly simple. You do one recording session with us — about 30 minutes. We use that to build your AI model. From there, we write the scripts, generate your content, and post it for you every single week. You never have to film, edit, or think about what to post again.",
      },
      {
        layout: "image", bg: "dark",
        heading: "See it in action",
        imageSlot: true,
        imageLabel: "Upload an AI clone example — screenshot or sample content",
        sub: "Real AI-generated content — created for our clients",
        script: "This is what it actually looks like. [Pause and let them take it in] This is real content created by an AI clone we built for one of our clients. Notice the quality — the branding, the messaging, how natural it looks. Can you picture this for your business?",
      },
      {
        layout: "image", bg: "blush",
        heading: "Your branded content",
        imageSlot: true,
        imageLabel: "Upload static post or carousel example",
        sub: "Branded posts and carousels — scheduled and posted every month",
        script: "Beyond the AI video content, we create all of your branded static posts too — carousels, graphics, promotional content — everything your audience sees is polished, on-brand, and designed to build trust and drive action. Nothing generic. Everything made specifically for you.",
      },
      {
        layout: "image", bg: "light",
        heading: "More examples",
        imageSlot: true,
        imageLabel: "Upload additional content samples",
        sub: "Different brands, same quality — all completely done for them",
        script: "Here are a few more examples of work we've done for clients across different industries. Different looks, different audiences — but every single one done completely for them. Scripted, designed, scheduled, posted. This is what your feed could look like.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "More than content — it's a full system",
        bullets: [
          "AI clone video content — your face, your voice, no filming required",
          "Branded posts & carousels — static and animated, every month",
          "Automated follow-up — no lead ever falls through the cracks",
          "Full content calendar — scheduled and posted for you",
          "Monthly performance report — see exactly what's working",
        ],
        script: "But what we build is more than just content. It's a complete system. When someone reaches out, they hear from you automatically. Every lead is nurtured. Every post goes out on schedule. You're building trust and momentum in the background while you focus on serving the clients you already have.",
      },
      {
        layout: "pricing", bg: "light",
        heading: "Our plans",
        prices: [
          { name: "Content Starter", price: "$500/mo", tag: "Entry level" },
          { name: "Starter", price: "$1,000/mo", tag: "Most popular" },
          { name: "Growth", price: "$2,500/mo", tag: "Best results" },
          { name: "Elite", price: "$5,000+/mo", tag: "Full system" },
        ],
        script: "We have four plans depending on where you're at and where you want to go. I'll be honest — based on what you've told me today, I already have one in mind for you. But let me walk you through all of them so you can see the full picture.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "What you get from day one",
        bullets: [
          "Your AI clone built and trained on your voice and face",
          "Full platform setup — profile, bio, branding done right",
          "Content scripted, generated, and posted every week",
          "Branded posts and carousels every month",
          "Automated DM responses and lead follow-up",
          "Monthly report — results, reach, and engagement",
        ],
        script: "Here's exactly what you get from the moment we start. Everything is handled by us — you don't need to brief a designer, write a single caption, or figure out what to post. We own the entire content operation for your business. You just show up to serve the clients it brings in.",
      },
      {
        layout: "steps", bg: "dark",
        heading: "What happens when you say yes",
        steps: [
          { n: "Today", title: "Setup locked in", desc: "Setup fee secured. Onboarding call scheduled within 48 hours." },
          { n: "Week 1", title: "Deep dive + recording", desc: "Brand call, recording session booked, AI model starts building." },
          { n: "Month 1", title: "Live and running", desc: "Content is live, system is working, results start coming in." },
        ],
        script: "So here's exactly what the next 30 days look like. Today, we lock in your setup — it moves fast because we want to get you results as quickly as possible. This week, we go deep on your brand and get your recording booked. Within the first month, your content is live. The earlier we start, the earlier you see results.",
      },
      {
        layout: "headline", bg: "light",
        heading: "The math is simple.",
        sub: "One new client covers your entire month.",
        body: "What is one new client worth to your business? That's your answer.",
        script: "Let me put this in perspective for you. What is one new client worth to your business — not over a year, just from one sale. Take that number. Now compare it to what this costs. For most of our clients, one or two new clients in the first month means the entire system has paid for itself. This isn't an expense. It's the most efficient investment you can make in your business right now.",
      },
      {
        layout: "cta", bg: "rose",
        heading: "Try it free for 14 days.",
        sub: "$500 setup fee  ·  14-day free trial  ·  6-month minimum  ·  30-day cancellation notice",
        script: "Here's the offer. 14-day free trial. You only pay the $500 setup fee today — that covers the buildout. Your first two full weeks of content and service are completely on us. After the trial, we start with a 6-month minimum — you'll see real results within the first 90 days, and months 4 through 6 are where it really compounds. After your 6 months, 30 days' notice and you're out. I'm confident enough in what we deliver that I'm willing to put my money where my mouth is.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Let's build\nyour brand.",
        sub: "The Dollhouse Brand Studio",
        script: "So — based on everything I've shown you today, can you see this working for your business? [Pause. Let them respond. Do not fill the silence. Whoever speaks first, loses. This moment is the most important part of the entire pitch.]",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for your time today. I genuinely believe in what we can build together — and I'm excited about what's possible for your business. The door is always open. Reach out any time. [Smile. Give them your card. Let them leave feeling great.]",
      },
    ],
  },

  /* ── Website Proposal ──────────────────────────────────────────────────── */
  {
    id: "website", name: "Website Proposal", icon: "globe",
    tagline: "A high-converting website that works while you sleep",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "Your Website Should\nBe Working For You",
        sub: "The Dollhouse Brand Studio",
        script: "Thank you for sitting down with me today. What I want to show you is how a well-built website completely changes the way clients find you, trust you, and reach out — without you having to chase anyone.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "Your website is your storefront.",
        sub: "Is it open — or is it turning people away?",
        body: "Most business websites lose leads before a single word is read.",
        script: "Think of your website as the front door of your business. When someone Googles you, finds your Instagram, or hears about you from a friend — the first thing they do is go to your website. And in about three seconds, they've decided whether to stay or leave. We build websites that make them stay.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "What a bad website costs you",
        bullets: [
          "Looks unprofessional — kills trust before they read a word",
          "Slow or broken — they leave before the page even loads",
          "No clear call to action — they don't know what to do next",
          "Not mobile-friendly — over 80% of your traffic is on phones",
          "Not showing up on Google — invisible to people actively searching for you",
        ],
        script: "This is what most business websites are doing wrong. And the worst part is — you might not even know it's happening, because the people leaving never tell you. They just go to your competitor instead.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "We build websites that convert.",
        sub: "Designed for your brand. Built to generate leads.",
        body: "Fast, mobile-first, and built to turn visitors into clients.",
        script: "What we build is a premium, fully custom website designed around your brand — and more importantly, designed to get visitors to take action. Book a call. Fill out a form. Buy a product. That's what a website is actually for, and that's what we build.",
      },
      {
        layout: "image", bg: "light",
        heading: "Our work",
        imageSlot: true,
        imageLabel: "Upload a website screenshot or mockup",
        sub: "Real websites built by The Dollhouse Brand Studio",
        script: "Here's what our work actually looks like. [Let them look] Notice the quality of the design — how clean it is, how easy it is to understand what the business does within seconds. This is the standard we build to. This is what your website could look like.",
      },
      {
        layout: "image", bg: "blush",
        heading: "More examples",
        imageSlot: true,
        imageLabel: "Upload another website example",
        sub: "Different businesses, different brands — same standard of quality",
        script: "Here's another example — completely different industry, completely different brand, but the same level of quality. Clean, clear, and purposeful. Every element on the page is there for a reason, and that reason is to turn visitors into leads for your business.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "What's included",
        bullets: [
          "Custom design — built around your brand, not a template",
          "Mobile-first — looks perfect on every device",
          "Contact forms, booking links, and lead capture built in",
          "SEO foundation — so Google can actually find you",
          "Fast load times — built for performance",
          "Ongoing support — we handle updates and fixes",
        ],
        script: "Here's exactly what's included. This is not a template or a website builder. This is a fully custom site built by our team from the ground up, designed specifically for your business and your ideal clients.",
      },
      {
        layout: "steps", bg: "light",
        heading: "Our process",
        steps: [
          { n: "01", title: "Discovery", desc: "We learn your brand, your clients, and exactly what action you want visitors to take." },
          { n: "02", title: "Design & Build", desc: "We create your full site — you review, we refine. Usually 2–3 weeks." },
          { n: "03", title: "Launch & Support", desc: "Your site goes live. We handle updates and keep everything running." },
        ],
        script: "The process is clear and fast. We start with a deep-dive to understand your brand and your goals. Then we design and build — you'll see the site before it goes live and can request changes. Once you approve it, we launch. And we don't disappear after that — we're here for ongoing support.",
      },
      {
        layout: "pricing", bg: "blush",
        heading: "Investment",
        prices: [
          { name: "Landing Page", price: "From $1,500", tag: "Single page" },
          { name: "Business Site", price: "From $3,000", tag: "Most popular" },
          { name: "E-commerce", price: "From $5,000", tag: "Full shop" },
          { name: "Custom", price: "Let's talk", tag: "Complete brand" },
        ],
        script: "Investment depends on the scope of what you need. I'll walk you through the options — but honestly, based on what you've told me, I already have a recommendation in mind for you.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Ready to open\nyour best storefront?",
        sub: "The Dollhouse Brand Studio",
        script: "So — what do you think? Does this feel like what your business needs right now? [Pause and let them answer. Don't rush this moment.]",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for your time today. I'm really excited about what we can build together. Reach out any time — I'm here. [Smile. Hand over your card. Let them leave on a high note.]",
      },
    ],
  },

  /* ── Merch Proposal ────────────────────────────────────────────────────── */
  {
    id: "merch", name: "Merch Proposal", icon: "shirt",
    tagline: "Branded merchandise that turns customers into walking billboards",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "Your Brand.\nOn Everything.",
        sub: "The Dollhouse Brand Studio",
        script: "Thank you for sitting down with me. Today I want to show you something our clients absolutely love — and something most businesses in your space aren't doing yet. Which means there's a real opportunity for you right now.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "Your best clients love your brand.",
        sub: "Give them a way to show it.",
        body: "Branded merchandise turns loyal customers into walking billboards — and creates a new revenue stream at the same time.",
        script: "Think about your best clients. They love what you do. They talk about you. They refer people. Now imagine if they were also wearing your brand everywhere they go — the gym, grabbing coffee, running errands. That's what we build. A merchandise line your clients actually want.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "Why branded merch works",
        bullets: [
          "Turns loyal customers into brand ambassadors — for free",
          "Creates a new revenue stream with no inventory risk",
          "Builds perceived brand value and premium positioning",
          "Free walking advertising every time someone wears it",
          "Deepens the emotional connection clients have with your brand",
          "Works for any industry — fitness, beauty, food, services, retail",
        ],
        script: "Here's why this works. It's not just about selling T-shirts. It's about creating something your clients feel proud to be associated with. When they wear your brand, they're telling the world — I trust these people. That's the most powerful marketing there is.",
      },
      {
        layout: "image", bg: "light",
        heading: "What we create",
        imageSlot: true,
        imageLabel: "Upload merch examples or product mockups",
        sub: "Custom branded merchandise — designed for your brand",
        script: "This is what we design and produce for our clients. [Let them look] Premium quality products — hoodies, tees, hats, tote bags, branded boxes, whatever fits your brand. Everything custom designed to match your look perfectly.",
      },
      {
        layout: "image", bg: "blush",
        heading: "More examples",
        imageSlot: true,
        imageLabel: "Upload more merch or packaging examples",
        sub: "Real products, real brands, real quality",
        script: "Here's more of what's possible. Different brands, different products, but the same level of craft in every single one. The goal is always the same — when someone holds this product, they feel the premium quality of your brand.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "Everything handled for you",
        bullets: [
          "Full custom design — apparel, accessories, packaging, and more",
          "Premium suppliers — quality that actually reflects your brand",
          "Print-on-demand option — zero inventory, zero risk",
          "Custom online storefront — sell directly to your audience",
          "Order fulfillment — we handle shipping and logistics",
          "Brand consistency — everything matches your existing look",
        ],
        script: "We handle the entire process — design, production, fulfillment. You don't have to deal with a single supplier or worry about inventory. We set up your store, manage your orders, and you collect the revenue. Some of our clients are making two to five thousand dollars a month from merch alone.",
      },
      {
        layout: "steps", bg: "light",
        heading: "How it works",
        steps: [
          { n: "01", title: "Design", desc: "We design your full merch line — concepts to final production-ready files." },
          { n: "02", title: "Setup", desc: "Your branded store goes live. Products listed, pricing set, ready to sell." },
          { n: "03", title: "Sell & Scale", desc: "You promote to your audience. We handle fulfillment. You earn the revenue." },
        ],
        script: "The process is really simple. We design everything first — you approve the products before anything is printed. We set up your store and handle all the technical setup. Then you promote it to your audience and we handle every order from there.",
      },
      {
        layout: "pricing", bg: "blush",
        heading: "Investment",
        prices: [
          { name: "Merch Launch", price: "From $997", tag: "5 products" },
          { name: "Brand Store", price: "From $1,997", tag: "10+ products" },
          { name: "Full Collection", price: "Custom", tag: "Complete line" },
          { name: "Bundle + Social", price: "Let's talk", tag: "Best value" },
        ],
        script: "Here's how the investment breaks down. The setup pays for itself with your first couple hundred in sales, and then it's pure profit after that. Let me show you what makes the most sense for your brand.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "Your brand deserves to be everywhere.",
        sub: "Let's put it there.",
        body: "Branded merchandise. Custom store. Full fulfillment. Done for you.",
        script: "Imagine your clients walking around with your brand on them every single day. Going to the gym. Grabbing coffee. Running errands. That's free advertising in the places your next client lives. That's what this builds.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Ready to turn your\nbrand into a movement?",
        sub: "The Dollhouse Brand Studio",
        script: "So — can you see this for your brand? What does your gut tell you? [Pause and let them respond. Don't fill the silence.]",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for your time today. This is going to be something really special. The door is always open — reach out any time. [Smile. Give them your card. Let them go excited.]",
      },
    ],
  },

  /* ── All-in-One Brand ──────────────────────────────────────────────────── */
  {
    id: "brand", name: "All-in-One Brand", icon: "sparkle",
    tagline: "The complete brand system — content, website, merch, and automation",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "The Complete\nBrand System",
        sub: "The Dollhouse Brand Studio",
        script: "Thank you so much for being here. What I'm about to show you is the full picture — not just one piece of the puzzle, but the entire system we use to build brands that completely dominate in their space. This is what we've built for businesses just like yours.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "Most businesses are built on a great service.",
        sub: "The ones that dominate are built on a complete brand.",
        body: "There's a difference between a business and a brand. One survives. The other grows.",
        script: "Let me ask you something. When you think about the businesses in your industry that are really winning — not just doing okay, but genuinely dominating — what do they all have in common? They have a brand. A consistent, recognizable, trusted presence everywhere their customer goes. That's what we build.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "The four pillars of a dominant brand",
        bullets: [
          "Content — shows up every day, builds trust, drives awareness",
          "Website — converts visitors into leads and clients around the clock",
          "Merch — turns loyal clients into brand ambassadors",
          "Automation — follows up instantly, nurtures every lead, never sleeps",
        ],
        script: "Here's how we think about it. A truly dominant brand operates on four pillars — and when all four are working together, the results compound. Content brings people in. Your website converts them. Merch deepens the relationship. And automation makes sure no opportunity is ever missed.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "Pillar 1 — AI Content System",
        sub: "Your face. Your voice. Online every day — without filming.",
        body: "AI clone video content + branded posts, every single week.",
        script: "Pillar one is your content system. We build your AI clone — a digital version of you that creates content without you having to film a thing. Combined with branded posts and carousels, you're showing up online every day, building trust with your audience consistently.",
      },
      {
        layout: "image", bg: "light",
        heading: "Content examples",
        imageSlot: true,
        imageLabel: "Upload content examples — AI clone, posts, carousels",
        sub: "AI-generated content + branded posts — done for you every month",
        script: "This is what that content actually looks like. [Pause] Real content, created by our team using your AI clone. Your audience sees you — every day, professionally, consistently — without you having to lift a finger.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "Pillar 2 — A Website That Works",
        sub: "Your 24/7 salesperson. Always open. Never misses a lead.",
        body: "Premium custom website — designed to convert visitors into clients.",
        script: "Pillar two is your website. Not just a nice-looking page — a conversion machine. When someone finds you online and lands on your site, everything about it should be moving them toward contacting you, booking with you, or buying from you. That's what we build.",
      },
      {
        layout: "image", bg: "dark",
        heading: "Website examples",
        imageSlot: true,
        imageLabel: "Upload website screenshot or mockup",
        sub: "Custom-built, premium design — built to convert",
        script: "Here's what our website work looks like. [Let them take it in] Premium design, clear messaging, fast, and built to get people to take action. This is the standard we hold every website to.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "Pillar 3 — Branded Merchandise",
        sub: "Turn loyal clients into walking billboards.",
        body: "A custom merch line + online store — a new revenue stream that grows your brand.",
        script: "Pillar three is your merchandise. Branded products your clients actually want to wear and use. This does two things — it creates a new revenue stream, and it turns your most loyal clients into brand ambassadors who spread your name everywhere they go.",
      },
      {
        layout: "image", bg: "light",
        heading: "Merch examples",
        imageSlot: true,
        imageLabel: "Upload merch or product examples",
        sub: "Custom branded merchandise — designed, produced, fulfilled",
        script: "Here's what that looks like in real life. Quality products, beautifully designed, perfectly on-brand. Your clients will want these — and every time they use them, your brand reaches new people.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "Pillar 4 — Automation",
        bullets: [
          "Every new lead gets an instant follow-up — automatically",
          "Missed calls trigger a text response within seconds",
          "Email sequences nurture leads over days and weeks",
          "Appointment reminders reduce no-shows",
          "Review requests sent automatically after every great experience",
          "No lead ever falls through the cracks again",
        ],
        script: "Pillar four is your automation. This is the behind-the-scenes engine that makes everything else compound. When someone reaches out — at any hour, any day — they hear from you immediately. Leads are nurtured automatically. Appointments get confirmed. Your business is working even when you're not.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "The full picture — done for you",
        bullets: [
          "AI clone live — your content created automatically every week",
          "Custom website — designed, built, launched, and maintained",
          "Branded merch line + online store — fully set up and running",
          "Full automation suite — follow-up, reminders, review requests",
          "Monthly reporting — results across every platform",
          "Dedicated account manager — one person who knows your brand inside out",
        ],
        script: "Here's the full picture of what you get when everything is running together. This is what a real brand system looks like — and this is what separates the businesses that are visible, trusted, and growing from the ones that are scrambling.",
      },
      {
        layout: "pricing", bg: "light",
        heading: "Investment",
        prices: [
          { name: "Growth", price: "$2,500/mo", tag: "3 platforms" },
          { name: "Elite", price: "$5,000+/mo", tag: "Full system" },
          { name: "Website", price: "From $3,000", tag: "One-time add-on" },
          { name: "Merch Store", price: "From $997", tag: "One-time add-on" },
        ],
        script: "Here's how the all-in-one system is priced. The monthly plan covers your ongoing content, automation, and management. Website and merch are one-time buildouts on top of that. Based on what you've told me today, I have a specific recommendation — let me walk you through it.",
      },
      {
        layout: "steps", bg: "dark",
        heading: "What happens next",
        steps: [
          { n: "Today", title: "Setup secured", desc: "$500 setup fee locked in. Onboarding scheduled within 48 hours." },
          { n: "Week 1–2", title: "Build phase", desc: "Brand deep-dive, AI recording, website design started, merch concepts." },
          { n: "Month 1", title: "Everything live", desc: "Content running, website launched, store live, automation active." },
        ],
        script: "Here's what the launch timeline looks like. We move fast — and the reason we move fast is because every day your brand isn't fully operational online is a day you're potentially missing clients. Within 30 days, your entire brand system is live and working for you.",
      },
      {
        layout: "cta", bg: "rose",
        heading: "Try it free for 14 days.",
        sub: "$500 setup fee  ·  14-day free trial  ·  6-month minimum  ·  30-day cancellation notice",
        script: "And here's the offer to make this as easy a decision as possible. 14-day free trial. You only pay the $500 setup fee today. Your first two weeks are completely on us. After the trial, there's a 6-month minimum — you'll see real results within 90 days, and months 4 through 6 are where it really compounds for your brand. After your 6 months, 30 days' notice and you're free to leave. I'm confident in what we build, which is why I'm willing to put the first two weeks on us.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Let's build\nsomething real.",
        sub: "The Dollhouse Brand Studio",
        script: "So — based on everything I've shown you today, can you see this system working for your business? What's your honest reaction? [Pause. Let them speak. Do not fill the silence. This is the moment that matters most.]",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for your time today. I'm genuinely excited about what we can do for your business. The door is always open — I'm here whenever you're ready. [Smile. Give them your card. End on warmth.]",
      },
    ],
  },

  /* ── Logo + Brand Refresh ──────────────────────────────────────────────── */
  {
    id: "logo_refresh", name: "Logo + Brand Refresh", icon: "paint",
    tagline: "A brand identity that commands attention and builds instant trust",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "Your Brand,\nRefreshed.",
        sub: "The Dollhouse Brand Studio",
        script: "Thank you for being here. Before I say anything — I want to ask you something. When someone looks at your logo or visits your website for the first time, what do you want them to feel? Because right now, is it communicating that? That's what we're here to fix.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "You have 0.05 seconds to make a first impression.",
        sub: "Most businesses are losing that moment.",
        body: "Your logo and website are either building trust or costing you clients — there's no middle ground.",
        script: "Research shows it takes 50 milliseconds — literally a blink — for someone to form an opinion about your brand. Before they've read a word. Before they know your prices. That judgment is based entirely on how you look. So the question is: what does your brand say about you in that moment?",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "What an outdated brand costs you",
        bullets: [
          "Looks amateur — clients assume your service is too",
          "Inconsistent branding confuses people and loses trust",
          "A bad website loses 88% of visitors — they never come back",
          "You can't charge premium prices with a budget brand",
          "Your competitors look more established, even if they're not",
          "Every day you look unprofessional is revenue walking out the door",
        ],
        script: "Here's the hard truth. People judge books by their covers. Your brand IS your cover. If it looks outdated, DIY, or inconsistent — the price you can charge drops, the trust you have to build goes up, and clients you should be landing choose someone who looks the part. This is the most fixable problem in your business.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "A brand that looks like a leader gets treated like one.",
        sub: "We design brand identities that command premium pricing.",
        body: "Logo, colour palette, typography, brand guidelines — everything aligned and intentional.",
        script: "What we build is a complete brand identity. Not just a logo. A full visual language — the colours, the fonts, the style, the feel. Everything coordinated so that every time someone encounters your brand, it communicates the same thing: this is a professional, premium, trustworthy business. That's what we build.",
      },
      {
        layout: "image", bg: "light",
        heading: "Logo work",
        imageSlot: true,
        imageLabel: "Upload logo design examples or brand identity samples",
        sub: "Brand identities designed by The Dollhouse Brand Studio",
        script: "This is our work. [Let them take it in] Look at the quality — the intentionality in every element. These aren't just logos. They're visual statements about who this business is and what they stand for. Notice how immediately you understand the personality of each brand just from looking at it. That's what we're going to build for you.",
      },
      {
        layout: "image", bg: "blush",
        heading: "More brand identities",
        imageSlot: true,
        imageLabel: "Upload more branding examples",
        sub: "Different industries, same level of craft and intention",
        script: "Here's more of our work across different industries. Every single one is completely custom — built around the personality, the audience, and the positioning of that specific business. No templates. No shortcuts. Yours would be the same.",
      },
      {
        layout: "headline", bg: "dark",
        heading: "And the website to match.",
        sub: "Because a great logo without a great website is a missed opportunity.",
        body: "We design and build the website to match your new brand — fast, mobile-first, and built to convert.",
        script: "The logo is just the start. Once your brand identity is built, we carry it through your entire digital presence — your website, your social profiles, your content, everything. Consistent. Professional. Everywhere someone looks, they see the same elevated brand. That's when trust compounds.",
      },
      {
        layout: "image", bg: "light",
        heading: "Website designs",
        imageSlot: true,
        imageLabel: "Upload website design examples",
        sub: "Custom websites — designed to match the brand and convert visitors",
        script: "Here's what that looks like on a website. [Pause] The brand identity flows through every page — the colours, the fonts, the imagery style, the whole feel. It's not a website and a logo. It's one unified brand experience. When someone lands on your site, they know immediately they're dealing with a premium business.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "What's included",
        bullets: [
          "Primary logo + alternate versions (horizontal, stacked, icon)",
          "Brand colour palette — primary, secondary, and accent colours",
          "Typography system — heading, body, and accent fonts",
          "Brand guidelines document — so everything stays consistent",
          "Custom website — built to match your new brand identity",
          "Social media templates — ready to use immediately",
        ],
        script: "Here's exactly what you get. This is not just a logo file. It's a complete brand system — every asset you need to look consistent and professional across every platform. Logo variations, colour codes, font files, usage guidelines, social templates. Everything handed over and ready to use.",
      },
      {
        layout: "steps", bg: "dark",
        heading: "Our process",
        steps: [
          { n: "01", title: "Brand discovery", desc: "We learn your values, your audience, your competitors, and what makes you different." },
          { n: "02", title: "Design & refine", desc: "We present concepts. You give feedback. We refine until it's exactly right." },
          { n: "03", title: "Deliver & launch", desc: "Full brand kit delivered. Website live. Everything ready to use immediately." },
        ],
        script: "The process is collaborative and clear. We start by going deep on your brand — who you are, who you serve, what makes you different. From there we build and present concepts. You review, you give feedback, we refine. Once it's exactly right, we deliver everything and you're ready to launch. Most projects are complete in two to three weeks.",
      },
      {
        layout: "pricing", bg: "light",
        heading: "Investment",
        prices: [
          { name: "Logo Only", price: "From $497", tag: "Brand mark" },
          { name: "Brand Identity", price: "From $997", tag: "Full kit" },
          { name: "Brand + Website", price: "From $2,997", tag: "Most popular" },
          { name: "Full Rebrand", price: "Custom", tag: "Complete brand" },
        ],
        script: "Here's how the investment breaks down. Based on what you've told me today, I'd actually recommend the Brand plus Website package — because a new logo without the website to match only solves half the problem. But let me walk you through all the options.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Ready to look like\nthe business you are?",
        sub: "The Dollhouse Brand Studio",
        script: "So — when you imagine your brand looking like the examples I just showed you — how does that feel? Can you see it? [Pause and let them sit with it. This is an emotional decision. Give them space to feel it.]",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for sitting with me today. I can already picture what your brand is going to look like — and I'm excited to build it. Reach out whenever you're ready. [Smile. Give them your card. End warm.]",
      },
    ],
  },

  /* ── We Made This For You ──────────────────────────────────────────────── */
  {
    id: "made_for_you", name: "We Made This For You", icon: "video",
    tagline: "Personalised reveal deck — show the AI clone you built, then close on the $1,000/mo Starter",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "We built something\nfor you.",
        sub: "The Dollhouse Brand Studio",
        script: "[Say nothing at first. Let them read the slide. Full 5 seconds.] Before I say a word — I want to show you something we did before this meeting. We went ahead and built your AI content system. What you're about to see is real content we created specifically for your business. This isn't a demo. This isn't an example of someone else. This is yours.",
      },
      {
        layout: "image", bg: "dark",
        heading: "This is you.",
        imageSlot: true,
        imageLabel: "⭐ Upload their AI clone video here — this is the moment the deal closes. Play it. Stay silent.",
        sub: "Your AI clone — built specifically for your brand before this meeting",
        script: "[Hit play. Say absolutely nothing. Watch their reaction — this is the most powerful moment in the entire pitch. Do not talk over this slide. Let them experience it fully. After a beat:] That's you. Your face. Your voice. Built by our AI — without you ever having to pick up a camera. This is what shows up on your social media every single day. Completely done for you.",
      },
      {
        layout: "image", bg: "blush",
        heading: "Your branded posts",
        imageSlot: true,
        imageLabel: "Upload branded post examples designed for their business — carousels, graphics, announcements",
        sub: "Branded content made for your business — ready to publish",
        script: "And alongside your AI clone, we built out supporting content. Branded posts, carousels, announcements — every single thing designed around your brand. Your colours, your fonts, your messaging, your audience. This is what your feed looks like every week.",
      },
      {
        layout: "image", bg: "light",
        heading: "More of your content",
        imageSlot: true,
        imageLabel: "Upload more examples — stories, quote cards, product or service posts",
        sub: "More branded content — every piece made specifically for you",
        script: "Here's more of what we created. [Let them look.] Every piece of this was made for your business — not adapted from a template. Not repurposed. Made. For. You. This is what our team builds every single month for the businesses we work with.",
      },
      {
        layout: "image", bg: "blush",
        heading: "One more example",
        imageSlot: true,
        imageLabel: "Upload a reel cover, carousel, or second AI clone example — drive the point home",
        sub: "This content is already done — it goes live the moment you say yes",
        script: "[Let them absorb this slide quietly.] I want to be completely clear: everything you've seen so far — it exists right now. It's done. It's sitting ready to be scheduled. All that needs to happen is you say yes, and this goes live for your business.",
      },
      {
        layout: "headline", bg: "dark",
        heading: "This is what your\nsocial media looks like\nevery single week.",
        sub: "Professionally managed. Completely done for you. Zero effort on your end.",
        script: "This isn't a one-time thing. This is what we deliver every month — new content, new clone videos, new branded posts, all built around what's working for your audience. Consistently. On brand. Every week. Without you touching it.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "What changes for your business",
        bullets: [
          "You show up professionally online every single day — without filming",
          "New people discover your business through consistent content",
          "You build trust before anyone has even spoken to you",
          "Your competitors wonder how you're posting so much",
          "Automations follow up with leads so none fall through the cracks",
          "You focus on your clients — we run your entire marketing",
        ],
        script: "Here's what actually changes. You stop being invisible online. You start showing up every day — professionally, consistently — while you're doing the actual work you're good at. People discover you. They see you everywhere. They trust you before they've ever spoken to you. And the automated follow-up system means every inquiry gets responded to instantly, even when you're busy.",
      },
      {
        layout: "bullets", bg: "light",
        heading: "The Starter Plan — what's included",
        bullets: [
          "Your custom AI brand clone — your face and voice, without filming",
          "1 platform fully managed (Instagram, Facebook, or TikTok)",
          "16–20 pieces of content per month — planned, created, and posted",
          "Automated DM follow-up — every comment turns into a conversation",
          "Lead capture and booking automation set up",
          "Monthly performance report — reach, engagement, what's working",
          "$500 one-time setup fee — everything built before your first month begins",
        ],
        script: "So here's exactly what you get. Your AI clone is built — your face and voice showing up in content without you doing a thing. We manage one platform completely — Instagram, Facebook, or TikTok, whichever is right for your audience. We create, plan, and post 16 to 20 pieces of content every single month. Every comment on your posts triggers an automatic DM, turning engagement into conversations. And every month you get a full report showing exactly what's working. All of this, done for you.",
      },
      {
        layout: "pricing", bg: "dark",
        heading: "The investment",
        prices: [
          { name: "One-Time Setup Fee", price: "$500", tag: "Charged once — never again" },
          { name: "Starter Plan", price: "$1,000/mo", tag: "Everything, done for you, every month" },
          { name: "14-Day Free Trial", price: "On us", tag: "$500 setup today · 2 weeks free · then $1,000/mo" },
        ],
        script: "Here's the investment. One-time $500 setup fee — that covers building your AI clone, your content system, your automations, everything. Then $1,000 a month, and we handle all of it every single month. And because I want you to see results before you commit to anything, we offer a 14-day free trial. You pay the $500 setup today to lock in your spot, and your first two weeks of service are completely on us. You see it working before your first monthly invoice.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "One new client pays\nfor the whole month.",
        sub: "What's a single new client worth to your business?",
        body: "For most businesses we work with, one or two new bookings from this system covers the entire investment — every month.",
        script: "Let me put this in perspective. What's one new client worth to your business? Not over a year — just one. Take that number. Now compare it to $1,000 a month. For most of the businesses we work with, the system pays for itself in the first month. This isn't a marketing expense. It's the most efficient investment you can make in your business right now.",
      },
      {
        layout: "image", bg: "light",
        heading: "Your results start here",
        imageSlot: true,
        imageLabel: "Optional — upload a before/after comparison, a result screenshot, or a client win to add social proof",
        sub: "Real results from real businesses — this is what consistent content does",
        script: "[If you have a result to show — show it here. A reach screenshot, a booking spike, an engagement win from another client.] This is what we see when a business commits to showing up consistently. Reach goes up. Engagement goes up. Bookings go up. Because when people see you everywhere, they trust you — and when they trust you, they reach out.",
      },
      {
        layout: "steps", bg: "dark",
        heading: "What happens after you say yes",
        steps: [
          { n: "Today", title: "Lock in your spot", desc: "$500 setup fee collected. Onboarding call scheduled within 48 hours." },
          { n: "Week 1–2", title: "We build everything", desc: "Quick brand call, final approvals on your clone and content. Trial begins." },
          { n: "Month 1", title: "You go live", desc: "Your content is live, automations are running, leads are being followed up." },
          { n: "Month 2+", title: "Full momentum", desc: "Monthly reports, ongoing content, refining what works. Fully on autopilot." },
        ],
        script: "Here's exactly what happens from here. Today — you confirm, we collect the $500 setup fee, and your onboarding call is in the calendar within 48 hours. Week one and two — we finalise everything, get your approvals, and your trial begins. By month one, your content is live and your automations are running. By month two, you're in full momentum — reporting every month, content running on autopilot, leads being followed up automatically. It moves fast because we want you seeing results as quickly as possible.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "Let's be real about what you're choosing between",
        bullets: [
          "Keep doing what you're doing — hoping it eventually picks up",
          "Hire someone in-house — $3,000–$6,000/mo + benefits + management",
          "DIY it yourself — hours every week, inconsistent results",
          "Work with us — $1,000/mo, fully done for you, starting today",
          "Your content is already built. It costs you nothing to look at it.",
          "Every day you wait is a day your competitors keep showing up.",
        ],
        script: "I want to put this in context. You've got a few options. Keep doing what you're doing and hope things pick up on their own. Hire someone in-house — which runs $3,000 to $6,000 a month once you factor in salary and benefits, and you still have to manage them. Do it yourself — which costs you the most valuable thing you have, your time. Or work with us for $1,000 a month, and we handle everything. Your content is already built and sitting there. The only question is whether you use it.",
      },
      {
        layout: "cta", bg: "rose",
        heading: "This is already built.\nAll you have to do\nis say yes.",
        sub: "$500 setup fee  ·  14-day free trial  ·  6-month minimum  ·  30-day cancellation notice",
        script: "I want to be direct with you. We built this before you walked in today because we believed in your business enough to invest in it first. Everything you saw — it exists, it's ready, it can go live this week. The only thing standing between your business and this content running is one decision. We start with a 6-month minimum — you'll see real results within 90 days, and months 4 through 6 are where the growth really compounds — and after that, 30 days' notice if you ever need to stop. But I'm confident enough in what we build that I'm willing to put the first two weeks on us. So — what do you think?",
      },
      {
        layout: "title", bg: "dark",
        heading: "All that's left\nis one decision.",
        sub: "The Dollhouse Brand Studio",
        script: "[Say nothing. Let them sit with everything they've seen. If they ask a question, answer it calmly. If they go quiet — let them. Do not fill the silence. You've done the work. You showed them what's possible. Now let them decide. The first person to speak after this slide loses.]",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for your time today. We built all of this for you because we genuinely believe in your business — and I hope you can feel that. I'm excited for what comes next. The door is always open. [Smile. Give them your card. Let them leave on a high.]",
      },
    ],
  },

  /* ── AI Automations ────────────────────────────────────────────────────── */
  {
    id: "automations", name: "AI Automations", icon: "zap",
    tagline: "Voice agent, DM responder, and full automation — your business runs 24/7",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "What if your business\nnever missed a lead?",
        sub: "The Dollhouse Brand Studio",
        script: "I want to ask you a question before we start. How many calls did you miss last week? How many DMs did you not reply to fast enough? How many leads reached out and didn't hear back within the hour — and just moved on? Because that's happening, whether you can see it or not. And today I'm going to show you how to stop it.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "The leads you're losing right now",
        bullets: [
          "78% of customers buy from the first business that responds to them",
          "After 5 minutes, your chance of reaching a new lead drops by 80%",
          "The average business takes 47 hours to respond to an inquiry",
          "Every missed call is a potential client calling your competitor next",
          "Every unanswered DM is a relationship that never started",
          "You're not losing to better businesses — you're losing to faster ones",
        ],
        script: "These are real numbers. 78% of people go with the first business that responds. Not the best. The first. So if someone fills out your contact form at 9pm and you reply the next morning — you've already lost them to whoever replied at 9:05pm. This is the single biggest silent killer of revenue in small businesses. And it's completely fixable.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "Meet your AI Voice Agent.",
        sub: "Answers every call. Books every appointment. Never takes a day off.",
        body: "A natural AI voice that responds to missed calls, answers questions, and books clients into your calendar — 24 hours a day.",
        script: "So here's what we build for you. An AI Voice Agent — a natural-sounding AI that answers your phone when you can't. Not a voicemail. Not a menu of options. An actual conversation. It answers questions about your business, captures lead information, and books appointments directly into your calendar. While you're with a client, asleep, on vacation — it doesn't matter. Your phone is always answered.",
      },
      {
        layout: "steps", bg: "light",
        heading: "How the Voice Agent works",
        steps: [
          { n: "01", title: "Call comes in", desc: "Someone calls your business. You're busy. Normally — voicemail. Now — instant answer." },
          { n: "02", title: "AI responds naturally", desc: "The voice agent introduces your business, answers questions, and captures their details." },
          { n: "03", title: "Lead booked or followed up", desc: "Appointment booked automatically, or you get a summary notification to follow up." },
        ],
        script: "Here's exactly how it works. Someone calls. Instead of getting your voicemail, they get a natural, friendly voice that represents your business. It has a conversation with them — answers their questions, finds out what they need, and books them into your calendar automatically. You get a notification with all their details. You never have to call back a cold lead again.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "The DM Responder.",
        sub: "Every Instagram and Facebook message — answered in seconds.",
        body: "Automatically replies to DMs with your brand voice, answers questions, and moves people toward booking.",
        script: "Now let's talk about your DMs. How many messages do you get every week that you haven't replied to yet? Every single one of those is a person who was interested enough to reach out — and the longer they wait for a reply, the colder they get. Our DM Responder replies to every message within seconds. Day or night. With your brand voice. Moving them from interested to booked.",
      },
      {
        layout: "image", bg: "dark",
        heading: "DM Responder in action",
        imageSlot: true,
        imageLabel: "Upload a screenshot of the DM responder workflow or example conversation",
        sub: "Automated replies that sound human — built around your brand voice",
        script: "Here's what it actually looks like. [Show the image] Real conversations, automated responses — but notice how natural it reads. It's not robotic. It's not obviously a bot. It sounds like you — because we train it on your brand voice, your services, your FAQs. The person on the other end thinks they're talking to your team. Within seconds of sending a message.",
      },
      {
        layout: "bullets", bg: "dark",
        heading: "Full follow-up automation",
        bullets: [
          "Instant response to every web form submission — within 2 minutes",
          "3-part SMS sequence that nurtures leads over 7 days",
          "Email follow-up for leads who don't convert immediately",
          "Re-engagement campaign for old leads who went cold",
          "Automated 'no-show' follow-up for missed appointments",
          "Everything personalised with their name and what they enquired about",
        ],
        script: "But it goes beyond just the first response. We build a complete follow-up system. When someone reaches out, they hear from you immediately — then again in a few hours — then again tomorrow. A sequence of messages that keeps your business top of mind until they're ready to book. Most businesses give up after one follow-up. Ours follows up until they say yes or no — automatically.",
      },
      {
        layout: "headline", bg: "rose",
        heading: "AI Review Automation.",
        sub: "More 5-star reviews. Zero effort.",
        body: "After every completed service, your system automatically requests a review — at exactly the right moment.",
        script: "Here's one more thing this system does for you. After every client you serve, the system automatically sends them a review request — at exactly the right moment when they're happiest with your work. You know how you always mean to ask clients for reviews but never remember? This does it for you. Every single time. No exceptions. For most of our clients, their review count doubles within 90 days.",
      },
      {
        layout: "steps", bg: "light",
        heading: "Appointment automation",
        steps: [
          { n: "Book", title: "Online booking 24/7", desc: "Clients book themselves directly into your calendar — no back and forth." },
          { n: "Remind", title: "Automated reminders", desc: "SMS and email reminders sent automatically to reduce no-shows by up to 80%." },
          { n: "Follow up", title: "Post-appointment nurture", desc: "Automatic check-ins, review requests, and rebooking prompts after every service." },
        ],
        script: "And then there's appointment automation. Your booking link goes in your bio, your website, your DMs — anywhere. Clients book themselves in without you lifting a finger. They get automatic reminders so they actually show up. And after the appointment, the system checks in, asks for a review, and nudges them to rebook. Your entire client lifecycle, automated.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "Your complete automation stack",
        bullets: [
          "AI Voice Agent — answers calls, books appointments, 24/7",
          "DM Responder — instant replies on Instagram and Facebook",
          "Lead follow-up sequences — SMS and email, fully automated",
          "Review requests — sent automatically after every service",
          "Appointment booking + reminders — no-shows eliminated",
          "Re-engagement campaigns — wake up cold leads automatically",
        ],
        script: "So here's the full picture of what your automation system looks like when it's all running together. Every entry point into your business — phone, DMs, web form, email — covered. Every stage of the client journey — first contact, follow-up, booking, reminder, review — automated. You focus on delivering your service. The system handles everything else.",
      },
      {
        layout: "image", bg: "dark",
        heading: "Results",
        imageSlot: true,
        imageLabel: "Upload automation results screenshot, stats, or workflow diagram",
        sub: "Real results from businesses running our automation stack",
        script: "[Show the results] These are real numbers from businesses running our automation system. Look at the response rates, the review counts, the appointment bookings. This is what happens when you stop relying on yourself to follow up and let the system do it consistently, every single time, for every single lead.",
      },
      {
        layout: "pricing", bg: "light",
        heading: "Automation is included in Growth + Elite",
        prices: [
          { name: "Starter", price: "$1,000/mo", tag: "Content only" },
          { name: "Growth", price: "$2,500/mo", tag: "Includes automation" },
          { name: "Elite", price: "$5,000+/mo", tag: "Full system" },
          { name: "Setup fee", price: "$500", tag: "One-time, all plans" },
        ],
        script: "Here's how the packages break down. The Starter plan covers your content — AI clone, posts, managed platforms. The Growth and Elite plans are where the full automation stack comes in — voice agent, DM responder, follow-up sequences, review automation, everything. Based on what you've told me about the leads you're currently missing, I think Growth is the level that would genuinely transform what's happening in your business.",
      },
      {
        layout: "headline", bg: "blush",
        heading: "One saved lead pays for the entire system.",
        sub: "Most businesses save 10–20 leads in the first month.",
        body: "What is one missed lead worth to your business? Multiply that by twelve.",
        script: "Let me put this in perspective. What does one new client mean to your revenue? Take that number. Now think about the leads you're currently losing — the missed calls, the unanswered DMs, the form submissions you got to 6 hours later. If this system saves you even one of those leads per month — it's paid for itself. Most of our clients see a return in the first two weeks.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Your business should\nbe running 24/7.",
        sub: "The Dollhouse Brand Studio",
        script: "So — how many leads do you think you're losing right now every week? And what would it mean for your business if you stopped losing them? [Let them answer. This question plants the seed. Whatever number they say — agree with it. That's your ROI argument. Then ask: 'What would you say if I could show you exactly how to fix that today?']",
      },
      {
        layout: "title", bg: "dark",
        heading: "Thank you.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "Thank you so much for your time today. The system I showed you — it works. And I'd love to build it for your business. I'm here whenever you're ready. [Smile. Give them your card. End warm and confident.]",
      },
    ],
  },

  /* ── Client Onboarding Call ─────────────────────────────────────────────── */
  {
    id: "onboarding", name: "Client Onboarding Call", icon: "heart",
    tagline: "Walk every new client through their first call — A to Z",
    slides: [
      {
        layout: "title", bg: "dark",
        heading: "Welcome to\nThe Dollhouse.",
        sub: "[CLIENT BUSINESS NAME]  ·  Onboarding Call",
        script: "Welcome, and congratulations — you made a great decision. Today we're going to walk through everything together so you know exactly what's happening, what we need from you, and what to expect over the next few weeks. This is going to be a great call. Let's get into it.",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "Today's Kickoff — What We're Covering",
        bullets: [
          "Welcome you and set the tone — you made the right decision",
          "Review your plan and every deliverable included",
          "Learn everything about your business, brand, and goals",
          "Build out your Brand Room and AI Clone setup",
          "Configure your automation system",
          "Set expectations for communication and next steps",
          "Make sure everything is set up from A to Z before we hang up",
        ],
        script: "Here's everything we're covering today. This call usually runs 45 to 60 minutes. I want us to leave with everything we need to build your brand room and get your content live as fast as possible. So let's dive right in.",
      },
      {
        layout: "bullets", bg: "light",
        heading: "Your Plan — What You're Getting",
        bullets: [
          "Plan: [STARTER / GROWTH / ELITE]",
          "Platforms: [LIST PLATFORMS — e.g. Instagram · TikTok · Facebook]",
          "Monthly content: [NUMBER] posts per month",
          "Content types: Reels · Carousels · Static posts",
          "AI Clone or Brand Character — included and being built for you",
          "Automation: DM replies · Comment triggers · Booking system · Follow-up sequences",
          "Setup fee: $500 one-time — already paid ✓",
          "Monthly: $[AMOUNT] — first billing date: [DATE]",
        ],
        script: "Let's confirm exactly what's included in your plan so we're on the same page. [Walk through each item and confirm with the client.] Do you have any questions about what's included before we move on?",
      },
      {
        layout: "bullets", bg: "light",
        heading: "Tell Me About Your Business",
        bullets: [
          "What do you offer — and who is it specifically for?",
          "What makes you different from your competitors?",
          "What is your #1 goal for social media right now?",
          "What does success look like for you in the next 90 days?",
          "Any upcoming launches, events, or promotions to plan content around?",
          "Have you worked with a social media agency before? What worked — what didn't?",
        ],
        script: "The better I know your business, the better your content performs. These aren't just formalities — your answers shape everything we create for you. [Take notes. Really listen. This is gold.]",
      },
      {
        layout: "bullets", bg: "light",
        heading: "Your Ideal Client",
        bullets: [
          "Who is your ideal customer? (age, gender, lifestyle, income level)",
          "What problem do they have that you solve?",
          "Where do they spend their time online?",
          "What makes them choose you over a competitor?",
          "What does their buying journey typically look like?",
          "Are there any audience groups we should make sure we're reaching?",
        ],
        script: "Every post, every reel, every caption — it's written for one specific person. The more clearly we can picture your ideal client, the more your content speaks directly to them and converts. Who are we talking to?",
      },
      {
        layout: "steps", bg: "rose",
        heading: "Building Your Brand Room",
        steps: [
          { n: "01", title: "Aesthetic & Vibe", desc: "What does your brand feel like? Luxury, warm, clinical, bold, playful, minimal? Share 3–5 Instagram pages you love the look of." },
          { n: "02", title: "Colours & Fonts", desc: "Do you have brand colours or fonts? If yes — share your hex codes. If no — we'll build your brand identity from scratch." },
          { n: "03", title: "Your Visual Assets", desc: "Logo, professional photos, treatment room shots, product images — send everything to your media folder within 48 hours of this call." },
        ],
        script: "Your brand room is the visual world we build around your business. Every piece of content lives inside this room — the colours, the fonts, the aesthetic, the feeling. It needs to feel completely, unmistakably like you. Let's define it right now.",
      },
      {
        layout: "steps", bg: "dark",
        heading: "Your AI Clone Setup",
        steps: [
          { n: "01", title: "Your Recording Session", desc: "One 20–30 minute video recording — speak naturally. Talk about your services, your story, and speak directly to your ideal client. No script needed." },
          { n: "02", title: "Photo Assets", desc: "Send 10–20 photos of yourself and your space. Variety matters — different outfits, angles, settings, and expressions." },
          { n: "03", title: "Your Brand Voice", desc: "Any words or claims you never want used? Any specific language your brand always uses? Let us know so your clone sounds exactly like you." },
        ],
        script: "Your AI clone is built from you — the more we have to work with, the more authentic and on-brand your content will be. [Walk through each step and note their answers. Confirm when and where they'll send their recording.]",
      },
      {
        layout: "bullets", bg: "blush",
        heading: "Your Automation System",
        bullets: [
          "DM trigger word — what keyword triggers an auto-reply? (e.g. BOOK · INFO · PRICE)",
          "What should the auto-reply say? (booking link · menu · consultation form)",
          "Comment trigger — any keyword in comments that should send a DM?",
          "Booking system — confirm your calendar link is connected and live",
          "Lead follow-up — automated sequence for every new inquiry",
          "Review request — auto-sent after every completed appointment",
        ],
        script: "This is what makes your business run while you sleep. Your automation system means no lead ever goes unanswered — even at 2am on a Sunday. Let's make sure it's configured exactly right for how your business works. [Go through each item and take notes.]",
      },
      {
        layout: "bullets", bg: "light",
        heading: "What We Need From You — 48 Hours",
        bullets: [
          "Upload everything to your media folder — link is in your onboarding email",
          "Name your files clearly (e.g. 'logo-main.png' · 'photo-studio.jpg')",
          "Include: logo · brand photos · hex codes · recording · any brand guidelines",
          "If assets aren't received in 48 hours, we proceed with AI-generated content",
          "Late assets directly impact your launch timeline",
          "Delays caused by missing content do not result in credits or refunds",
        ],
        script: "We move fast — because the faster we get your assets, the faster your content goes live. The 48-hour window is real and firm. After that, we start building with what we have. Either way — we don't stop.",
      },
      {
        layout: "steps", bg: "blush",
        heading: "Access & Permissions",
        steps: [
          { n: "01", title: "Instagram & Facebook", desc: "Open Meta Business Suite → Settings → People → Add People. Enter hello@shopdollhouse.co and assign Admin access. We never need your password — this is the safe, official way." },
          { n: "02", title: "TikTok", desc: "Open TikTok Business Center → Members → Invite Member. Enter hello@shopdollhouse.co and assign Operator access. Let's do this together right now." },
          { n: "03", title: "Google Business Profile", desc: "Open your Google Business Profile → Managers → Add. Enter hello@shopdollhouse.co as a Manager. Takes 30 seconds and keeps your account secure." },
        ],
        script: "Let's do this right now while we're both here — it takes about 5 minutes and means we can start work immediately. I never need your passwords for any platform. You're adding me as an official admin or manager — which you can remove at any time. Pull up Instagram first and I'll walk you through it. [Go through each platform together on the call. Don't end without at least Instagram and Facebook access confirmed.]",
      },
      {
        layout: "bullets", bg: "light",
        heading: "How We Work Together",
        bullets: [
          "Best way to reach me: hello@shopdollhouse.co",
          "Response time: within 24 hours, Monday to Friday",
          "Urgent issues (account access, errors): reply directly to any email from us",
          "Monthly check-in call included — book anytime via your calendar link",
          "Content approval: you'll see everything before it goes live",
          "Revisions: submit all feedback within 48 hours of receiving your content draft",
        ],
        script: "I want this to feel easy and completely stress-free for you. Here's exactly how I communicate — no surprises. [Walk through each point.] Any questions about how we stay in touch?",
      },
      {
        layout: "bullets", bg: "light",
        heading: "Special Requests",
        bullets: [
          "You have 48 hours from this call to submit any special requests",
          "Special requests include: specific fonts · hex codes · themes · imagery · motifs",
          "Service spotlight: want us to focus on a specific treatment or product launch?",
          "Requests submitted after 48 hours are actioned in the following content cycle",
          "Use of stock content may limit our ability to fulfil very specific requests",
          "Your account manager will flag any limitations before delivery",
        ],
        script: "If there's anything specific you want prioritized in your first month of content — now is the time. After 48 hours we're in full production mode and changes move to the next cycle. What would you like us to focus on?",
      },
      {
        layout: "steps", bg: "dark",
        heading: "What Happens Next",
        steps: [
          { n: "48h", title: "Send your assets", desc: "Upload everything to your media folder. Photos, logo, recording, brand colours. The faster we get it, the faster you launch." },
          { n: "Wk 1", title: "Brand Room & AI Clone", desc: "We build your brand room — your aesthetic, your content calendar, your AI clone or brand character. Everything built to match your vision." },
          { n: "Wk 2", title: "Content draft & approval", desc: "You receive your first batch of content for review. You approve or request revisions within 48 hours. Then we finalise." },
          { n: "Wk 2–3", title: "Launch", desc: "Your content goes live. Your automations are running. Your brand is active online every single day — without you lifting a finger." },
        ],
        script: "Here's the exact timeline from this moment forward. We move fast — I want you fully launched in 2 to 3 weeks. Your only job right now is to send us your assets within 48 hours. After that, we take it completely from here.",
      },
      {
        layout: "title", bg: "dark",
        heading: "Let's build something\nbeautiful.",
        sub: "The Dollhouse Brand Studio  ·  hello@shopdollhouse.co",
        script: "That's everything for today. You're officially a Dollhouse client and I am so excited to build your brand room. Check your email — your onboarding follow-up will have your media folder link, your calendar link, and a full summary of everything we covered today. Any last questions before I let you go? [Pause. Smile. End warm and confident. They should feel excited, not overwhelmed.]",
      },
    ],
  },
];

/* ── Slide visual renderer (1280 × 720 internal canvas) ─────────────────── */
function renderSlideVisual(
  slide: PSlide,
  mediaItem: MediaItem | undefined,
  onUpload?: (file: File) => void,
  onRemove?: () => void,
) {
  const C = slide.bg === "dark"
    ? { bg: "#1e1210", fg: "#f5e8e0", fg2: "rgba(245,232,224,0.65)", acc: "#c4a87a", line: "rgba(196,168,122,0.35)", cardBg: "rgba(255,255,255,0.06)" }
    : slide.bg === "rose"
    ? { bg: "#6b2d30", fg: "#f5e8e0", fg2: "rgba(245,232,224,0.75)", acc: "#f0c898", line: "rgba(240,200,152,0.35)", cardBg: "rgba(255,255,255,0.1)" }
    : slide.bg === "light"
    ? { bg: "#f5e8e0", fg: "#1e1210", fg2: "rgba(30,18,16,0.58)", acc: "#b8956a", line: "rgba(184,149,106,0.4)", cardBg: "rgba(0,0,0,0.04)" }
    : { bg: "#f7e4df", fg: "#1e1210", fg2: "rgba(30,18,16,0.58)", acc: "#b87060", line: "rgba(184,112,96,0.4)", cardBg: "rgba(0,0,0,0.04)" };

  const SERIF = "'Cormorant Garamond', serif";
  const SANS  = "'DM Sans', sans-serif";
  const LUXE  = "'Jost', sans-serif";

  const base: React.CSSProperties = {
    width: "100%", height: "100%",
    backgroundColor: C.bg,
    position: "relative", overflow: "hidden",
    boxSizing: "border-box",
    padding: "60px 80px",
    fontFamily: SANS,
  };

  // Reusable media slot — supports images and videos
  const ImgSlot = ({ w, h }: { w: number; h: number }) => (
    <div style={{ width: w, height: h, borderRadius: 16, overflow: "hidden", position: "relative", background: "rgba(128,80,60,0.12)", border: `2px dashed ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, flexShrink: 0 }}>
      {mediaItem ? (
        <>
          {mediaItem.isVideo ? (
            <video
              src={mediaItem.url}
              controls
              style={{ width: "100%", height: "100%", objectFit: "contain", position: "absolute", inset: 0, background: "#000" }}
            />
          ) : (
            <img src={mediaItem.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          )}
          {onRemove && (
            <button onClick={onRemove} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)", color: "#fff", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>×</button>
          )}
        </>
      ) : (
        <>
          <div style={{ fontSize: 52, opacity: 0.25 }}>📷</div>
          <div style={{ color: C.fg2, fontFamily: SANS, fontSize: 14, textAlign: "center", padding: "0 24px", lineHeight: 1.5 }}>
            {slide.imageLabel || "Upload an image or video for this slide"}
          </div>
          {onUpload && (
            <label style={{ cursor: "pointer", background: C.acc, color: C.bg, fontFamily: LUXE, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px 26px", borderRadius: 9999, marginTop: 4 }}>
              + Upload Image / Video
              <input type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) onUpload(e.target.files[0]); }} />
            </label>
          )}
        </>
      )}
    </div>
  );

  if (slide.layout === "title") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ position: "absolute", top: 44, left: 54, width: 72, height: 1, background: C.acc }} />
      <div style={{ position: "absolute", top: 44, left: 54, width: 1, height: 72, background: C.acc }} />
      <div style={{ position: "absolute", bottom: 44, right: 54, width: 72, height: 1, background: C.acc }} />
      <div style={{ position: "absolute", bottom: 44, right: 54, width: 1, height: 72, background: C.acc }} />
      <div style={{ fontFamily: LUXE, fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: C.acc, marginBottom: 28 }}>
        {slide.sub || "The Dollhouse Brand Studio"}
      </div>
      <div style={{ width: 36, height: 1, background: C.acc, marginBottom: 32 }} />
      <div style={{ fontFamily: SERIF, fontSize: 84, fontWeight: 400, color: C.fg, lineHeight: 1.08, whiteSpace: "pre-line" }}>
        {slide.heading}
      </div>
    </div>
  );

  if (slide.layout === "cta") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ position: "absolute", top: 44, left: 54, width: 72, height: 1, background: C.acc }} />
      <div style={{ position: "absolute", top: 44, left: 54, width: 1, height: 72, background: C.acc }} />
      <div style={{ position: "absolute", bottom: 44, right: 54, width: 72, height: 1, background: C.acc }} />
      <div style={{ position: "absolute", bottom: 44, right: 54, width: 1, height: 72, background: C.acc }} />
      <div style={{ fontFamily: SERIF, fontSize: 72, fontWeight: 400, color: C.fg, lineHeight: 1.1, marginBottom: 20 }}>
        {slide.heading}
      </div>
      <div style={{ width: 160, height: 1, background: C.line, marginBottom: 24 }} />
      <div style={{ fontFamily: SANS, fontSize: 22, color: C.fg2, marginBottom: 40, lineHeight: 1.5 }}>
        {slide.sub}
      </div>
      <div style={{ border: `1px solid ${C.acc}`, color: C.acc, fontFamily: LUXE, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", padding: "16px 44px", borderRadius: 9999 }}>
        The Dollhouse Brand Studio
      </div>
    </div>
  );

  if (slide.layout === "headline") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: LUXE, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.acc, marginBottom: 28 }}>
        The Dollhouse Brand Studio
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 58, fontWeight: 400, color: C.fg, lineHeight: 1.15, maxWidth: 880, marginBottom: 20 }}>
        {slide.heading}
      </div>
      {slide.sub && (
        <div style={{ fontFamily: SERIF, fontSize: 34, fontStyle: "italic", color: C.acc, marginBottom: 20, maxWidth: 780 }}>
          {slide.sub}
        </div>
      )}
      {slide.body && (
        <div style={{ fontFamily: SANS, fontSize: 22, color: C.fg2, lineHeight: 1.65, maxWidth: 680 }}>
          {slide.body}
        </div>
      )}
      <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ width: 3, height: 100, background: C.line }} />
        <div style={{ width: 56, height: 3, background: C.line }} />
      </div>
    </div>
  );

  if (slide.layout === "bullets") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: `linear-gradient(180deg, ${C.acc}, ${C.acc}44)` }} />
      <div style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 400, color: C.fg, marginBottom: 8, maxWidth: 860 }}>
        {slide.heading}
      </div>
      <div style={{ width: 56, height: 2, background: C.acc, marginBottom: 36 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {(slide.bullets || []).map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.acc, marginTop: 10, flexShrink: 0 }} />
            <div style={{ fontFamily: SANS, fontSize: 20, color: C.fg2, lineHeight: 1.55 }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (slide.layout === "steps") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: LUXE, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.acc, marginBottom: 16 }}>
        The Dollhouse Brand Studio
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 400, color: C.fg, marginBottom: 50 }}>
        {slide.heading}
      </div>
      <div style={{ display: "flex", gap: 36 }}>
        {(slide.steps || []).map((step, i) => (
          <div key={i} style={{ flex: 1, borderTop: `2px solid ${C.acc}`, paddingTop: 24 }}>
            <div style={{ fontFamily: SERIF, fontSize: 54, color: C.acc, lineHeight: 1, marginBottom: 18 }}>
              {step.n}
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 26, color: C.fg, marginBottom: 12 }}>
              {step.title}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 17, color: C.fg2, lineHeight: 1.6 }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (slide.layout === "image") return (
    <div style={{ ...base, padding: 0, display: "flex" }}>
      <div style={{ flex: "0 0 520px", padding: "60px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: LUXE, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.acc, marginBottom: 24 }}>
          The Dollhouse Brand Studio
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 400, color: C.fg, lineHeight: 1.15, marginBottom: 20 }}>
          {slide.heading}
        </div>
        {slide.sub && (
          <div style={{ fontFamily: SANS, fontSize: 17, color: C.fg2, lineHeight: 1.6, maxWidth: 360 }}>
            {slide.sub}
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 56px 40px 0" }}>
        <ImgSlot w={580} h={580} />
      </div>
    </div>
  );

  if (slide.layout === "pricing") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: LUXE, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.acc, marginBottom: 12 }}>
        The Dollhouse Brand Studio
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 400, color: C.fg, marginBottom: 8 }}>
        {slide.heading}
      </div>
      <div style={{ width: 48, height: 2, background: C.acc, marginBottom: 40 }} />
      <div style={{ display: "flex", gap: 20 }}>
        {(slide.prices || []).map((p, i) => (
          <div key={i} style={{ flex: 1, background: C.cardBg, border: `1px solid ${C.line}`, borderRadius: 18, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
            {p.tag && (
              <div style={{ fontFamily: LUXE, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.acc }}>
                {p.tag}
              </div>
            )}
            <div style={{ fontFamily: SERIF, fontSize: 22, color: C.fg, lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 500, color: C.acc, lineHeight: 1 }}>{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 32, color: C.fg }}>Slide</div>;
}

function ProposalTab() {
  const [deck, setDeck] = useState<PDeck | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [mode, setMode] = useState<"select" | "overview" | "present">("select");
  const [media, setMedia] = useState<Record<string, MediaItem>>({});
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const slideWrapRef = useRef<HTMLDivElement>(null);
  const presentRef = useRef<HTMLDivElement>(null);
  const revokeUrls = useRef<string[]>([]);

  // Load all saved media from IndexedDB on mount
  useEffect(() => {
    const keys: string[] = (() => { try { return JSON.parse(localStorage.getItem(MEDIA_KEYS_LS) || "[]"); } catch { return []; } })();
    if (!keys.length) return;
    (async () => {
      const loaded: Record<string, MediaItem> = {};
      for (const key of keys) {
        const file = await idbLoad(key);
        if (file) {
          const url = URL.createObjectURL(file);
          revokeUrls.current.push(url);
          loaded[key] = { url, isVideo: file.type.startsWith("video/") };
        }
      }
      setMedia(loaded);
    })();
  }, []);

  // Revoke object URLs on unmount
  useEffect(() => () => { revokeUrls.current.forEach(u => URL.revokeObjectURL(u)); }, []);

  // Scale observer
  useEffect(() => {
    const el = slideWrapRef.current;
    if (!el || mode !== "present") return;
    const update = () => setScale(el.offsetWidth / 1280);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, [mode, deck, isFullscreen]);

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (fs) setShowNotes(false);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (mode !== "present" || !deck) return;
    const fn = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setSlideIdx(i => Math.min(i + 1, deck.slides.length - 1)); }
      else if (e.key === "ArrowLeft") setSlideIdx(i => Math.max(i - 1, 0));
      else if (e.key === "s" || e.key === "S") setShowNotes(n => !n);
      else if (e.key === "Escape" && !isFullscreen) setMode("overview");
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [mode, deck, isFullscreen]);

  const enterFullscreen = async () => {
    try { if (presentRef.current) await presentRef.current.requestFullscreen(); } catch {}
  };

  const saveMediaFile = async (deckId: string, idx: number, file: File) => {
    const key = `${deckId}_${idx}`;
    if (media[key]) URL.revokeObjectURL(media[key].url);
    await idbSave(key, file);
    const url = URL.createObjectURL(file);
    revokeUrls.current.push(url);
    setMedia(prev => ({ ...prev, [key]: { url, isVideo: file.type.startsWith("video/") } }));
    try {
      const keys: string[] = JSON.parse(localStorage.getItem(MEDIA_KEYS_LS) || "[]");
      if (!keys.includes(key)) { keys.push(key); localStorage.setItem(MEDIA_KEYS_LS, JSON.stringify(keys)); }
    } catch {}
  };

  const clearMediaFile = async (deckId: string, idx: number) => {
    const key = `${deckId}_${idx}`;
    if (media[key]) URL.revokeObjectURL(media[key].url);
    await idbDelete(key);
    setMedia(prev => { const n = { ...prev }; delete n[key]; return n; });
    try {
      const keys: string[] = JSON.parse(localStorage.getItem(MEDIA_KEYS_LS) || "[]").filter((k: string) => k !== key);
      localStorage.setItem(MEDIA_KEYS_LS, JSON.stringify(keys));
    } catch {}
  };

  /* ── SELECT mode ─────────────────────────────────────────────────────── */
  if (mode === "select") return (
    <div style={{ padding: "40px 48px" }}>
      <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
        The Dollhouse Brand Studio
      </p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--ink)", fontWeight: 400, marginBottom: 6 }}>
        Proposal Decks
      </h2>
      <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,18,16,0.55)", marginBottom: 40, lineHeight: 1.6 }}>
        Choose a deck to set up or present. Upload images or videos in the overview, then hit Present.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {PROPOSAL_DECKS.map(d => {
          const mediaCount = d.slides.filter((_, i) => media[`${d.id}_${i}`]).length;
          const slotCount = d.slides.filter(s => s.imageSlot).length;
          return (
            <button
              key={d.id}
              onClick={() => { setDeck(d); setSlideIdx(0); setMode("overview"); }}
              style={{ textAlign: "left", padding: "28px 32px", background: "var(--cream)", border: "1px solid rgba(196,168,122,0.25)", borderRadius: 20, cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px -10px rgba(60,30,20,0.18)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
            >
              <div style={{ marginBottom: 16, color: "var(--gold)" }}><SvgIcon id={d.icon} size={32} /></div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--ink)", marginBottom: 8, fontWeight: 400 }}>{d.name}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,18,16,0.55)", lineHeight: 1.55, marginBottom: 20 }}>{d.tagline}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>
                  {d.slides.length} slides
                </div>
                {slotCount > 0 && (
                  <div style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: mediaCount === slotCount ? "#4a9970" : "rgba(30,18,16,0.35)" }}>
                    {mediaCount}/{slotCount} media
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── OVERVIEW mode ───────────────────────────────────────────────────── */
  if (mode === "overview" && deck) return (
    <div style={{ padding: "32px 48px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <button
            onClick={() => setMode("select")}
            style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer", padding: "0 0 10px 0", display: "block" }}
          >
            ← All Decks
          </button>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.7rem", color: "var(--ink)", fontWeight: 400, margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
            <SvgIcon id={deck.icon} size={24} /> {deck.name}
          </h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,18,16,0.5)", marginTop: 4 }}>
            {deck.slides.length} slides · Click a thumbnail to jump to that slide · Upload images or videos below
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", alignSelf: "flex-end" }}>
          <button
            onClick={() => { setSlideIdx(0); setMode("present"); enterFullscreen(); }}
            style={{ padding: "12px 24px", background: "var(--ink)", border: "none", borderRadius: 9999, color: "var(--gold)", fontFamily: FONT_LUXE, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer" }}
          >
            ⛶ Fullscreen
          </button>
          <button
            onClick={() => { setSlideIdx(0); setMode("present"); }}
            className="btn-ink"
          >
            ▶ &nbsp;Present
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {deck.slides.map((slide, i) => {
          const mKey = `${deck.id}_${i}`;
          const mItem = media[mKey];
          const hasBg = slide.bg === "dark" || slide.bg === "rose";
          const bgColor = slide.bg === "dark" ? "#1e1210" : slide.bg === "rose" ? "#6b2d30" : slide.bg === "light" ? "#f5e8e0" : "#f7e4df";
          const textColor = hasBg ? "#f5e8e0" : "#1e1210";
          return (
            <div key={i} style={{ background: "var(--cream)", border: "1px solid rgba(196,168,122,0.18)", borderRadius: 14, overflow: "hidden" }}>
              <div
                style={{ aspectRatio: "16/9", backgroundColor: bgColor, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px 14px", position: "relative", cursor: "pointer" }}
                onClick={() => { setSlideIdx(i); setMode("present"); }}
              >
                {mItem && slide.imageSlot && (
                  mItem.isVideo
                    ? <video src={mItem.url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} muted />
                    : <img src={mItem.url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
                )}
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: textColor, textAlign: "center", lineHeight: 1.3, position: "relative", zIndex: 1, whiteSpace: "pre-line", maxWidth: "100%" }}>
                  {slide.heading.length > 42 ? slide.heading.slice(0, 42) + "…" : slide.heading}
                </div>
                <div style={{ position: "absolute", top: 6, left: 8, fontFamily: "'Jost', sans-serif", fontSize: 9, color: "#c4a87a", letterSpacing: "0.1em" }}>{i + 1}</div>
                <div style={{ position: "absolute", top: 6, right: 8, fontFamily: "'Jost', sans-serif", fontSize: 9, color: "rgba(196,168,122,0.6)", letterSpacing: "0.06em", textTransform: "capitalize" }}>{slide.layout}</div>
              </div>
              <div style={{ padding: "8px 12px", minHeight: 44 }}>
                {slide.imageSlot ? (
                  mItem ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 4, overflow: "hidden", flexShrink: 0, background: "#ccc" }}>
                        {mItem.isVideo
                          ? <video src={mItem.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                          : <img src={mItem.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        }
                      </div>
                      <span style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", color: "rgba(30,18,16,0.5)", flex: 1 }}>
                        {mItem.isVideo ? "🎬 Video" : "🖼 Image"}
                      </span>
                      <button onClick={() => clearMediaFile(deck.id, i)} style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)", background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>✕</button>
                    </div>
                  ) : (
                    <label style={{ cursor: "pointer", fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", display: "flex", alignItems: "center", gap: 5 }}>
                      <span>📷 Upload</span>
                      <input type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) saveMediaFile(deck.id, i, e.target.files[0]); }} />
                    </label>
                  )
                ) : (
                  <div style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", color: "rgba(30,18,16,0.3)" }}>—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── PRESENT mode ────────────────────────────────────────────────────── */
  if (mode === "present" && deck) {
    const curSlide = deck.slides[slideIdx];
    const mKey = `${deck.id}_${slideIdx}`;
    const mItem = media[mKey];

    return (
      <div
        ref={presentRef}
        style={{ background: "#100808", display: "flex", flexDirection: "column", height: isFullscreen ? "100vh" : "calc(100vh - 120px)", overflow: "hidden", position: "relative" }}
      >
        {/* Top bar */}
        <div style={{ padding: "9px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, zIndex: 10 }}>
          <div style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
            {deck.name} &nbsp;·&nbsp; {slideIdx + 1}/{deck.slides.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Notes toggle — always available, subtle. Press S or click to peek at script. */}
            <button
              onClick={() => setShowNotes(n => !n)}
              title="Toggle speaker notes (S key)"
              style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: showNotes ? "#c4a87a" : "rgba(255,255,255,0.18)", background: "none", border: `1px solid ${showNotes ? "rgba(196,168,122,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}
            >
              📋
            </button>
            {/* Fullscreen toggle */}
            {!isFullscreen && (
              <button
                onClick={enterFullscreen}
                style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}
              >
                ⛶ Fullscreen
              </button>
            )}
            {/* Exit fullscreen or overview */}
            <button
              onClick={() => isFullscreen ? document.exitFullscreen() : setMode("overview")}
              title={isFullscreen ? "Exit fullscreen (Esc)" : "Back to overview"}
              style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Slide area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: isFullscreen ? "12px 16px 0" : "14px 24px 0", overflow: "hidden", position: "relative", minHeight: 0 }}>
          {/* Scaled slide */}
          <div
            ref={slideWrapRef}
            style={{ width: "100%", maxWidth: isFullscreen ? "none" : 1120, flex: "0 0 auto", position: "relative", borderRadius: isFullscreen ? 8 : 12, overflow: "hidden", boxShadow: "0 40px 120px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05)" }}
          >
            <div style={{ paddingBottom: "56.25%" }} />
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <div style={{ width: 1280, height: 720, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                {renderSlideVisual(
                  curSlide,
                  mItem,
                  (file) => saveMediaFile(deck.id, slideIdx, file),
                  () => clearMediaFile(deck.id, slideIdx),
                )}
              </div>
            </div>
          </div>

          {/* Speaker notes overlay — hidden by default. Press S or click 📋 to peek. Client never sees this. */}
          {showNotes && (
            <div style={{ position: "absolute", bottom: isFullscreen ? 56 : 0, left: 0, right: 0, background: "rgba(8,4,4,0.93)", backdropFilter: "blur(20px)", padding: "14px 40px 12px", borderTop: "1px solid rgba(196,168,122,0.18)", zIndex: 20 }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: "0.86rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, maxWidth: 1000, margin: "0 auto" }}>
                {curSlide.script}
              </div>
              <div style={{ marginTop: 4, textAlign: "right", fontFamily: FONT_LUXE, fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.12em" }}>Press S or 📋 to hide</div>
            </div>
          )}
        </div>

        {/* Nav bar */}
        <div style={{ padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexShrink: 0, zIndex: 10 }}>
          <button
            onClick={() => setSlideIdx(i => Math.max(i - 1, 0))}
            disabled={slideIdx === 0}
            style={{ padding: "8px 20px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9999, color: slideIdx === 0 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.75)", fontFamily: FONT_LUXE, fontSize: "11px", letterSpacing: "0.15em", cursor: slideIdx === 0 ? "default" : "pointer" }}
          >
            ← Prev
          </button>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {deck.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                style={{ width: i === slideIdx ? 20 : 6, height: 6, borderRadius: 9999, background: i === slideIdx ? "#c4a87a" : "rgba(255,255,255,0.16)", border: "none", cursor: "pointer", transition: "all 0.2s ease", padding: 0 }}
              />
            ))}
          </div>
          <button
            onClick={() => setSlideIdx(i => Math.min(i + 1, deck.slides.length - 1))}
            disabled={slideIdx === deck.slides.length - 1}
            style={{ padding: "8px 20px", background: slideIdx === deck.slides.length - 1 ? "rgba(255,255,255,0.06)" : "#c4a87a", border: "none", borderRadius: 9999, color: slideIdx === deck.slides.length - 1 ? "rgba(255,255,255,0.14)" : "#1e1210", fontFamily: FONT_LUXE, fontSize: "11px", letterSpacing: "0.15em", cursor: slideIdx === deck.slides.length - 1 ? "default" : "pointer" }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function PlaybookPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("dh_admin") === "1");
  const [tab, setTab] = useState<Tab>("deals");
  const [refOpen, setRefOpen] = useState(false);
  const refDropdownRef = useRef<HTMLDivElement>(null);

  // Shared prospect state — single source of truth for both Deal Pipeline and Quote Builder
  const [prospects, setProspects] = useState<Prospect[]>(() => loadProspects());
  const persist = (list: Prospect[]) => { setProspects(list); saveAllProspects(list); };

  // Which prospect to pre-fill in Quote Builder (null = blank/new)
  const [quoteProspectId, setQuoteProspectId] = useState<string | null>(null);

  function openQuoteFor(id: string) {
    setQuoteProspectId(id);
    setTab("quote");
    setRefOpen(false);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (refDropdownRef.current && !refDropdownRef.current.contains(e.target as Node)) {
        setRefOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  const primaryTabs: { id: Tab; label: string; icon: string }[] = [
    { id: "deals",     label: "Deal Pipeline",    icon: "target" },
    { id: "quote",     label: "Quote Builder",    icon: "calculator" },
    { id: "discovery", label: "Discovery Call",   icon: "microphone" },
    { id: "proposal",  label: "Proposal Deck",    icon: "bar-chart" },
    { id: "outreach",  label: "Outreach Scripts", icon: "phone" },
    { id: "workflow",  label: "Client Workflow",  icon: "clipboard" },
    { id: "prompts",   label: "Content Prompts",  icon: "pen" },
  ];

  const referenceTabs: { id: Tab; label: string; icon: string }[] = [
    { id: "start",    label: "Start Here",       icon: "star" },
    { id: "monthly",  label: "Monthly Process",  icon: "calendar" },
    { id: "content",  label: "4x4 Strategy",     icon: "brain" },
    { id: "growth",   label: "Inbound Growth",   icon: "trending-up" },
    { id: "newhire",  label: "New Hire Guide",   icon: "users" },
    { id: "schedule", label: "Daily Schedule",   icon: "clock" },
    { id: "links",    label: "Quick Links",      icon: "link" },
  ];

  const activeRefTab = referenceTabs.find(t => t.id === tab);

  return (
    <main className="min-h-screen text-[var(--ink)]" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>

      {/* Header */}
      <header className="px-6 md:px-12 py-8 border-b border-[var(--gold)]/15" style={{ background: "rgba(247,230,220,0.8)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Internal Operations</p>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1 }}>
              The Dollhouse Playbook
            </h1>
            <p style={{ fontFamily: FONT_SCRIPT, fontSize: "1rem", color: "rgba(30,15,10,0.4)", marginTop: "2px" }}>brand studio</p>
          </div>
          <div className="px-4 py-2 rounded-full" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.3)" }}>
            <p className="text-[10px] tracking-widest uppercase flex items-center gap-1.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}><SvgIcon id="lock" size={13} /> Internal Use Only</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-30 flex items-center" style={{ background: "rgba(247,230,220,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(200,168,100,0.12)" }}>

        {/* Primary tabs — scrollable */}
        <div className="flex-1 overflow-x-auto px-6 md:px-12 py-3">
          <div className="flex gap-2 min-w-max">
            {primaryTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setRefOpen(false); }}
                className="px-4 py-2 rounded-xl text-[11px] tracking-wider uppercase transition-all whitespace-nowrap"
                style={{
                  fontFamily: FONT_LUXE,
                  background: tab === t.id ? "var(--ink)" : "rgba(255,255,255,0.5)",
                  color: tab === t.id ? "var(--gold)" : "rgba(30,15,10,0.55)",
                  border: tab === t.id ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)",
                }}
              >
                <SvgIcon id={t.icon} size={14} style={{ opacity: 0.9 }} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reference dropdown — outside overflow container so it's never clipped */}
        <div className="shrink-0 pr-6 md:pr-12 py-3 relative" ref={refDropdownRef} style={{ borderLeft: "1px solid rgba(200,168,100,0.15)" }}>
          <button
            onClick={() => setRefOpen(o => !o)}
            className="px-4 py-2 rounded-xl text-[11px] tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5"
            style={{
              fontFamily: FONT_LUXE,
              background: activeRefTab ? "var(--ink)" : (refOpen ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)"),
              color: activeRefTab ? "var(--gold)" : "rgba(30,15,10,0.55)",
              border: activeRefTab ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)",
              marginLeft: "8px",
            }}
          >
            {activeRefTab ? <><SvgIcon id={activeRefTab.icon} size={14} style={{ opacity: 0.9 }} /> <span>{activeRefTab.label}</span></> : <><SvgIcon id="book" size={14} style={{ opacity: 0.9 }} /> <span>Reference</span></>}
            <span style={{ fontSize: "8px", opacity: 0.6 }}>{refOpen ? "▲" : "▼"}</span>
          </button>

          {refOpen && (
            <div className="absolute top-full right-0 mt-1.5 rounded-xl overflow-hidden shadow-xl z-50" style={{ background: "rgba(252,244,238,0.98)", border: "1px solid rgba(200,168,100,0.25)", minWidth: "190px", backdropFilter: "blur(12px)" }}>
              {referenceTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setRefOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-[11px] tracking-wider uppercase transition-all flex items-center gap-2.5"
                  style={{
                    fontFamily: FONT_LUXE,
                    background: tab === t.id ? "rgba(200,168,100,0.15)" : "transparent",
                    color: tab === t.id ? "var(--gold)" : "rgba(30,15,10,0.6)",
                    borderLeft: tab === t.id ? "2px solid var(--gold)" : "2px solid transparent",
                  }}
                >
                  <SvgIcon id={t.icon} size={14} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {tab === "start" && <StartHereTab />}
        {tab === "workflow" && <WorkflowTab />}
        {tab === "monthly" && <MonthlyTab />}
        {tab === "prompts" && <PromptsTab />}
        {tab === "outreach" && <OutreachTab />}
        {tab === "growth" && <GrowthTab />}
        {tab === "content" && <ContentStrategyTab />}
        {tab === "deals" && <DealTrackerTab prospects={prospects} persist={persist} onBuildQuote={openQuoteFor} />}
        {tab === "discovery" && <DiscoveryCallTab />}
        {tab === "proposal" && <ProposalTab />}
        {tab === "newhire" && <NewHireTab />}
        {tab === "quote" && <QuoteBuilderTab prospects={prospects} persist={persist} prospectId={quoteProspectId} onGoToDeals={() => { setQuoteProspectId(null); setTab("deals"); }} onClearProspect={() => setQuoteProspectId(null)} />}
        {tab === "schedule" && <ScheduleTab />}
        {tab === "links" && <LinksTab />}
      </div>

      <footer className="px-6 py-8 text-center border-t border-[var(--gold)]/10">
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.3)" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio · Internal Operations Playbook
        </p>
      </footer>
    </main>
  );
}
