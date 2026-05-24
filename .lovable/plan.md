## Important finding first

Two things you should know before I touch anything:

**1. The 19-question demo flow is already built.** I checked `LIVE_PROMPT` in `src/components/DollhouseContentStudio.jsx` (lines 1184–1260) — Step 1 (Questionnaire Entry with the verbatim "This isn't a template; it's an engine…" line), Step 2 (Deep Dive on Target Audience / Brand Voice / Mission), Step 3 (Zero-Server generation moment), Step 4 (Custom Blueprint reveal), and the synced `[ACTION: SHOW LAPTOP SCREEN]` markers are all wired up exactly as you described. We added them in the last round.

**2. The GitHub repo `shopdollhouse/thedollhouse-brand-kit` returns 404.** I tried to fetch it to pull the *real* 19 questions verbatim — it's either private, deleted, or under a different URL. So the script currently uses *generic* question names (Target Audience, Brand Voice, Mission). To name the actual exact questions from your engine, I need either:
- A public/accessible repo URL, or
- You paste the 19 questions in chat, or
- You confirm the generic names are fine

## What I'd refine (small, surgical edits)

Even though the structure is right, three things can still be tightened in the `LIVE_PROMPT`:

### A. Make the demo cues flow click-by-click with the script
Right now the `laptop_show` examples are listed as one block. I'll restructure them so the AI is forced to interleave each click with the spoken line *immediately before it* — so you literally never read a sentence that doesn't match what's on screen.

### B. Lock in the Q1 / Q19 progress callouts
Add an explicit instruction that she must call out the progress indicator at three beats:
- "Question 1 of 19" (start of demo)
- "We're already on question 8" (mid-demo, builds momentum)
- "Last one — question 19" (right before generate)
This stops viewers from getting lost in the demo.

### C. Replace generic question names with real ones (BLOCKED on repo access)
Swap the 3 placeholder question names for the actual phrasing from your engine — pending you sharing the questions or a working repo link.

## Files changed
- `src/components/DollhouseContentStudio.jsx` — edits to the `LIVE_PROMPT` template only (lines ~1217–1244). No UI / state / styling changes.

## What I will NOT touch
- The teleprompter modal (already correctly highlights `[ACTION: SHOW FACE]` gold and `[ACTION: SHOW LAPTOP SCREEN]` blue)
- The Launch Mode UI chips ("19-Question Engine Demo", "Custom Blueprint Reveal")
- Pricing logic ($145 → $97)
- The 9-5 hook section
- localStorage / IndexedDB storage
- Any other component

## Recommended next step

Pick one:
- **(a)** Approve and I'll ship A + B now using the current generic question names — fast, ready for launch.
- **(b)** Paste the real 19 questions in chat (or the actual repo URL) and I'll ship A + B + C in one pass — most accurate.
- **(c)** Skip this entirely — the current prompt is already accurate enough. We instead spend the next message on a launch-day dry run.

My honest take: if your launch is soon, **(a)** is the right call. The accuracy gain from (c) is small relative to the launch time you'd burn on it.