import { Bookmark, Check, ChevronLeft, Heart, Lock, MessageCircle, Moon, Send } from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import { CHOC, DISPLAY, GOLD, GRID, IOS_BLUE, IOS_GRAY, Phone, SANS, sampleImg } from "@/components/LaunchAnimatedPreviews";

/**
 * Realistic app and browser mock-ups used as the card pictures in
 * How It Works, Plans and After Purchase. Phones peek up from the bottom
 * of each frame, like product shots on a real marketing site.
 */

function Win({ children, url = "yourbusiness.com", className = "", style }: { children: React.ReactNode; url?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute overflow-hidden rounded-[10px] bg-white ${className}`} style={{ border: "1px solid #e3ddd8", boxShadow: "0 34px 60px -28px rgba(31,17,11,0.55)", fontFamily: SANS, ...style }}>
      <div className="flex items-center gap-1.5 border-b px-2.5 py-1.5" style={{ background: "#f4f1ee", borderColor: "#e6e0db" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />)}
        <span className="mx-2 flex flex-1 items-center justify-center gap-1 rounded-md bg-white py-0.5" style={{ fontSize: "0.55rem", color: "#555" }}><Lock className="h-2 w-2" />{url}</span>
      </div>
      {children}
    </div>
  );
}

function Chip({ children, className = "", float = "launch-float" }: { children: React.ReactNode; className?: string; float?: string }) {
  return (
    <div className={`${float} absolute z-20 flex items-center gap-2 rounded-xl bg-white px-3 py-2 ${className}`} style={{ border: "1px solid rgba(198,178,130,0.5)", boxShadow: "0 18px 36px -16px rgba(31,17,11,0.5)", fontFamily: SANS, fontSize: "0.66rem", color: "#111", lineHeight: 1.25 }}>
      {children}
    </div>
  );
}

function Peek({ children, scale = 0.7, top = 16 }: { children: React.ReactNode; scale?: number; top?: number }) {
  return <div className="absolute left-1/2 -translate-x-1/2" style={{ top }}><Phone scale={scale} height={430}>{children}</Phone></div>;
}

const Avatar = ({ s = 28 }: { s?: number }) => (
  <span className="flex shrink-0 items-center justify-center rounded-full bg-white" style={{ width: s, height: s, border: `1.5px solid ${GOLD}` }}>
    <img src={archMark} alt="" style={{ height: s * 0.5 }} className="w-auto" />
  </span>
);

const hookTile = (i: number, _big = false) => {
  const g = GRID[i];
  return <img src={g.img} alt={g.t} className="block h-full w-full object-cover" />;
};

/* ───────────── How it works ───────────── */
export function MockPostFeed() {
  return (
    <>
      <Peek scale={0.7}>
        <div className="flex items-center gap-2 px-3 pb-2 pt-3">
          <Avatar s={26} />
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#111", lineHeight: 1.1 }}>yourbusiness<br /><span style={{ fontWeight: 400, color: "#777", fontSize: "0.58rem" }}>Your town</span></p>
          <span className="ml-auto" style={{ color: "#111" }}>•••</span>
        </div>
        <div className="aspect-square w-full">{hookTile(1, true)}</div>
        <div className="flex items-center gap-3 px-3 pt-2" style={{ color: "#111" }}>
          <Heart className="h-5 w-5" style={{ color: "#ed4956", fill: "#ed4956" }} />
          <MessageCircle className="h-5 w-5" />
          <Send className="h-5 w-5" />
          <Bookmark className="ml-auto h-5 w-5" />
        </div>
        <p className="px-3 pt-1.5" style={{ fontSize: "0.64rem", color: "#111" }}>Liked by <b>sarah.m</b> and others</p>
        <p className="px-3 pt-0.5" style={{ fontSize: "0.64rem", color: "#111", lineHeight: 1.3 }}><b>yourbusiness</b> The one thing I check before every furnace tune-up.</p>
      </Peek>
      <Chip className="bottom-5 left-4" float="launch-float-slow"><span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: GOLD, color: CHOC }}><Check className="h-3 w-3" strokeWidth={3} /></span><span><b>Posted</b><br /><span style={{ color: "#777" }}>Publishing daily</span></span></Chip>
    </>
  );
}

export function MockQuizWindow() {
  const opt = (l: string, on: boolean) => (
    <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ border: `1.5px solid ${on ? CHOC : "#dcdcdc"}`, background: on ? "#faf6f0" : "#fff" }}>
      <span className="flex h-3 w-3 items-center justify-center rounded-full" style={{ border: `1.5px solid ${on ? CHOC : "#bbb"}` }}>{on && <span className="h-1.5 w-1.5 rounded-full" style={{ background: CHOC }} />}</span>
      <span style={{ fontSize: "0.62rem", color: "#111", fontWeight: on ? 600 : 400 }}>{l}</span>
    </div>
  );
  return (
    <>
      <Win className="left-5 right-5 top-5" url="yourbusiness.com/quote">
        <div className="px-4 pb-3 pt-3">
          <div className="flex items-center gap-1.5"><img src={archMark} alt="" className="h-4 w-auto" /><span style={{ fontFamily: DISPLAY, fontSize: "0.82rem", color: CHOC, fontWeight: 600 }}>Your Business</span></div>
          <div className="mt-2.5 flex gap-1">{[1, 2, 3].map((n) => <span key={n} className="h-[3px] flex-1 rounded-full" style={{ background: n <= 2 ? CHOC : "#e3e3e3" }} />)}</div>
          <p className="mt-2" style={{ fontFamily: DISPLAY, fontSize: "1.02rem", color: "#111", fontWeight: 600, lineHeight: 1.1 }}>What do you need help with?</p>
          <div className="mt-2 grid gap-1.5">{opt("Service one", false)}{opt("Service two", true)}{opt("Not sure yet", false)}</div>
          <div className="mt-2.5 rounded-lg py-1.5 text-center" style={{ background: CHOC, color: "#fff", fontSize: "0.62rem", fontWeight: 600 }}>Continue</div>
        </div>
      </Win>
      <Chip className="bottom-5 right-3" float="launch-float-slow"><Avatar s={22} /><span><b>New inquiry</b><br /><span style={{ color: "#777" }}>Alex Morgan · Service two</span></span></Chip>
    </>
  );
}

export function MockCommentToDm() {
  const bubble = (txt: React.ReactNode, mine: boolean) => (
    <div className={`max-w-[84%] rounded-[16px] px-3 py-2 ${mine ? "ml-auto" : ""}`} style={mine ? { background: "linear-gradient(135deg,#7a5cff,#a14bff)", color: "#fff", fontSize: "0.7rem" } : { background: IOS_GRAY, color: "#111", fontSize: "0.7rem", lineHeight: 1.3 }}>{txt}</div>
  );
  return (
    <>
      <Peek scale={0.7} top={22}>
        <div className="flex items-center gap-2 border-b px-3 pb-2 pt-3" style={{ borderColor: "#eee" }}>
          <ChevronLeft className="h-4 w-4" style={{ color: "#111" }} />
          <Avatar s={26} />
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#111", lineHeight: 1.1 }}>yourbusiness<br /><span style={{ fontWeight: 400, color: "#888", fontSize: "0.58rem" }}>Active now</span></p>
        </div>
        <div className="flex flex-col gap-1.5 px-3 pt-3">
          <p className="text-center" style={{ fontSize: "0.56rem", color: "#999" }}>Today 9:41 PM</p>
          {bubble("Hi! Thanks for asking. Which service are you looking for?", false)}
          {bubble("Service two, please.", true)}
          {bubble("Perfect. Here is the link to book a time that suits you.", false)}
        </div>
      </Peek>
      <Chip className="left-2 top-6" float="launch-float-slow">
        <span className="flex h-6 w-6 shrink-0 rounded-full" style={{ background: "linear-gradient(135deg,#d9a9a3,#c58a85)" }} />
        <span><b>you</b> QUOTE<br /><span style={{ color: "#999", fontSize: "0.56rem" }}>now · Reply</span></span>
        <Heart className="ml-1 h-3.5 w-3.5" style={{ color: "#bbb" }} />
      </Chip>
    </>
  );
}

export function MockBookingText() {
  return (
    <>
      <Peek scale={0.7} top={22}>
        <div className="flex flex-col items-center border-b pb-2 pt-2" style={{ borderColor: "#eee" }}>
          <Avatar s={28} />
          <p className="mt-1" style={{ fontSize: "0.64rem", color: "#111", fontWeight: 600 }}>Your Business</p>
        </div>
        <div className="flex flex-col gap-1.5 px-3 pt-3">
          <p className="text-center" style={{ fontSize: "0.56rem", color: "#999" }}>Today 10:42 PM</p>
          <div className="ml-auto max-w-[78%] rounded-[16px] px-3 py-2" style={{ background: IOS_BLUE, color: "#fff", fontSize: "0.7rem" }}>Hi, do you have availability this week?</div>
          <div className="max-w-[84%] rounded-[16px] p-2" style={{ background: IOS_GRAY }}>
            <p className="px-1 pb-1.5" style={{ fontSize: "0.68rem", color: "#111", lineHeight: 1.3 }}>Thanks for reaching out! Pick a time and you are booked.</p>
            <div className="grid grid-cols-3 gap-1">{["Tue 10:00", "Wed 2:30", "Fri 11:00"].map((s, i) => <span key={s} className="rounded-lg py-1.5 text-center" style={{ fontSize: "0.56rem", background: i === 1 ? IOS_BLUE : "#fff", color: i === 1 ? "#fff" : "#111", fontWeight: i === 1 ? 600 : 500 }}>{s}</span>)}</div>
          </div>
          <div className="ml-auto max-w-[70%] rounded-[16px] px-3 py-2" style={{ background: IOS_BLUE, color: "#fff", fontSize: "0.7rem" }}>Wednesday at 2:30 works!</div>
        </div>
      </Peek>
      <Chip className="right-2 top-5" float="launch-float-slow"><Moon className="h-4 w-4" style={{ color: GOLD }} /><span><b>After hours</b><br /><span style={{ color: "#777" }}>Replied in seconds</span></span></Chip>
      <Chip className="bottom-4 left-3"><span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#34c759", color: "#fff" }}><Check className="h-3 w-3" strokeWidth={3} /></span><span><b>Appointment booked</b><br /><span style={{ color: "#777" }}>Wed 2:30 PM</span></span></Chip>
    </>
  );
}

/* ───────────── Plans ───────────── */
export function MockPlanSingle() {
  return (
    <>
      <Peek scale={0.74} top={18}>
        <div className="flex items-center justify-between px-4 pb-2 pt-3" style={{ color: "#111" }}>
          <span className="flex items-center gap-1" style={{ fontSize: "0.82rem", fontWeight: 700 }}><Lock className="h-3 w-3" strokeWidth={2.5} /> yourbusiness</span>
          <span>≡</span>
        </div>
        <div className="flex items-center gap-4 px-4">
          <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, #e6dcc0, ${GOLD}, #a8946a)` }}><span className="flex h-full w-full items-center justify-center rounded-full bg-white"><img src={archMark} alt="" className="h-6 w-auto" /></span></span>
          <div className="grid flex-1 grid-cols-3 text-center" style={{ color: "#111" }}>
            {[["30", "Posts"], ["2", "Platforms"], ["Daily", "Posting"]].map(([n, l]) => <div key={l}><p style={{ fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.1 }}>{n}</p><p style={{ fontSize: "0.58rem", color: "#666" }}>{l}</p></div>)}
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-[2px] border-t pt-0" style={{ borderColor: "#e8e8e8" }}>
          {GRID.slice(0, 9).map((g, i) => <div key={i} className="aspect-square">{hookTile(i)}</div>)}
        </div>
      </Peek>
      <Chip className="left-6 top-14" float="launch-float-slow"><span style={{ fontFamily: DISPLAY, fontSize: "1.5rem", lineHeight: 1, fontWeight: 600 }}>30</span><span><b>single-image posts</b><br /><span style={{ color: "#777" }}>every month</span></span></Chip>
      <Chip className="bottom-6 right-6"><span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: GOLD, color: CHOC }}><Check className="h-3 w-3" strokeWidth={3} /></span><span><b>Instagram + Facebook</b><br /><span style={{ color: "#777" }}>After your approval</span></span></Chip>
    </>
  );
}

export function MockPlanCarousel() {
  return (
    <>
      <Peek scale={0.74} top={18}>
        <div className="flex items-center gap-2 px-3 pb-2 pt-3">
          <Avatar s={26} />
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#111", lineHeight: 1.1 }}>yourbusiness<br /><span style={{ fontWeight: 400, color: "#777", fontSize: "0.58rem" }}>Your town</span></p>
        </div>
        <div className="relative aspect-square w-full overflow-hidden">
          <img src={sampleImg("hc1-1")} alt="Carousel cover slide" className="absolute inset-0 block h-full w-full object-cover" />
          <img src={sampleImg("hc1-2")} alt="" className="absolute -right-6 bottom-4 top-4 block w-11 rounded-l-xl object-cover" />
          <span className="absolute right-3 top-3 rounded-full px-2 py-0.5" style={{ background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: "0.58rem", fontWeight: 600 }}>1/5</span>
        </div>
        <div className="flex items-center gap-3 px-3 pt-2" style={{ color: "#111" }}>
          <Heart className="h-5 w-5" /><MessageCircle className="h-5 w-5" /><Send className="h-5 w-5" />
          <span className="mx-auto flex gap-1">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? IOS_BLUE : "#ccc" }} />)}</span>
          <Bookmark className="h-5 w-5" />
        </div>
        <p className="px-3 pt-1.5" style={{ fontSize: "0.64rem", color: "#111" }}><b>yourbusiness</b> Swipe for the full story →</p>
      </Peek>
      <Chip className="left-6 top-14" float="launch-float-slow"><span style={{ fontFamily: DISPLAY, fontSize: "1.5rem", lineHeight: 1, fontWeight: 600 }}>15</span><span><b>carousel posts</b><br /><span style={{ color: "#777" }}>swipe to tell a story</span></span></Chip>
      <Chip className="bottom-6 right-6"><span style={{ fontFamily: DISPLAY, fontSize: "1.5rem", lineHeight: 1, fontWeight: 600 }}>+15</span><span><b>single-image posts</b><br /><span style={{ color: "#777" }}>every month</span></span></Chip>
    </>
  );
}

/* ───────────── After purchase ───────────── */
export function MockCheckout() {
  return (
    <>
      <Win className="left-4 top-5 w-[66%]" url="checkout.yourplan.com">
        <div className="flex flex-col items-center px-4 pb-3 pt-3.5 text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#34c759", color: "#fff" }}><Check className="h-5 w-5" strokeWidth={3} /></span>
          <p className="mt-1.5" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111" }}>Payment successful</p>
          <p style={{ fontSize: "0.58rem", color: "#777" }}>Thank you. Your plan is active.</p>
          <div className="mt-2.5 w-full rounded-lg p-2.5 text-left" style={{ border: "1px solid #ece7e2", background: "#fbf9f7" }}>
            <div className="flex justify-between" style={{ fontSize: "0.58rem", color: "#333" }}><span>Dollhouse Launch</span><span>$297.00</span></div>
            <div className="flex justify-between" style={{ fontSize: "0.52rem", color: "#999" }}><span>Single-image posts · monthly</span><span>USD</span></div>
          </div>
        </div>
      </Win>
      <Chip className="bottom-3 right-3 !block w-[150px]" float="launch-float-slow">
        <p style={{ fontSize: "0.6rem", fontWeight: 700 }}>Book your kickoff call</p>
        <div className="mt-1.5 grid grid-cols-2 gap-1">{["Tue 10:00", "Wed 2:30", "Thu 1:00", "Fri 11:00"].map((t, i) => <span key={t} className="rounded-md py-1 text-center" style={{ fontSize: "0.52rem", border: `1px solid ${i === 1 ? CHOC : "#ddd"}`, background: i === 1 ? CHOC : "#fff", color: i === 1 ? "#fff" : "#111", fontWeight: 600 }}>{t}</span>)}</div>
      </Chip>
    </>
  );
}

export function MockCrm() {
  return (
    <Win className="left-4 right-4 top-5" url="my-account.dollhouse">
      <div className="flex" style={{ height: 190 }}>
        <div className="flex w-[84px] shrink-0 flex-col gap-1.5 px-2.5 py-3" style={{ background: CHOC }}>
          <div className="mb-1 flex items-center gap-1"><img src={archMark} alt="" className="h-3.5 w-auto" /><span style={{ fontSize: "0.5rem", color: GOLD, fontWeight: 700, letterSpacing: "0.08em" }}>ACCOUNT</span></div>
          {["Dashboard", "Contacts", "Messages", "Calendar"].map((n, i) => <span key={n} className="rounded-md px-1.5 py-1" style={{ fontSize: "0.56rem", color: i === 0 ? CHOC : "rgba(255,255,255,0.7)", background: i === 0 ? GOLD : "transparent", fontWeight: i === 0 ? 700 : 400 }}>{n}</span>)}
        </div>
        <div className="flex-1 px-3 py-3" style={{ background: "#faf8f6" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#111" }}>Welcome to your account</p>
          <div className="mt-2 rounded-lg bg-white p-2" style={{ border: "1px solid #ece7e2" }}>
            <p style={{ fontSize: "0.56rem", fontWeight: 700, color: "#111" }}>Setup checklist</p>
            {[["Connect Instagram and Facebook", true], ["Add your services", true], ["Book your kickoff call", false]].map(([l, d]) => (
              <div key={String(l)} className="mt-1 flex items-center gap-1.5" style={{ fontSize: "0.54rem", color: "#333" }}>
                <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full" style={{ background: d ? GOLD : "transparent", border: `1px solid ${d ? GOLD : "#bbb"}` }}>{d && <Check className="h-2 w-2" strokeWidth={4} style={{ color: CHOC }} />}</span>{l}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white p-2" style={{ border: "1px solid #ece7e2" }}>
            <span className="h-4 w-4 rounded-full" style={{ background: "linear-gradient(135deg,#d9a9a3,#c58a85)" }} />
            <span style={{ fontSize: "0.54rem", color: "#111" }}><b>Alex Morgan</b> · New inquiry</span>
          </div>
        </div>
      </div>
    </Win>
  );
}

export function MockApprove() {
  return (
    <>
      <Win className="left-4 right-4 top-5" url="yourbusiness.com/review">
        <div className="px-3.5 pb-3 pt-3">
          <div className="flex items-center justify-between">
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#111" }}>Your first posts</p>
            <span className="rounded-full px-2 py-0.5" style={{ background: "#faf3e0", color: "#7a6a3a", fontSize: "0.5rem", fontWeight: 700 }}>Ready for review</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg" style={{ border: "1px solid #ece7e2" }}>
                <div className="aspect-square">{hookTile(i)}</div>
                <div className="m-1.5 rounded-md py-1 text-center" style={{ background: i === 0 ? "#34c759" : CHOC, color: "#fff", fontSize: "0.5rem", fontWeight: 700 }}>{i === 0 ? "✓ Approved" : "Approve"}</div>
              </div>
            ))}
          </div>
          <div className="relative mt-3 flex justify-between px-1">
            <span className="absolute left-3 right-3 top-[5px] h-px" style={{ background: "#ddd" }} />
            {[1, 2, 3, 4, 5].map((d) => (
              <div key={d} className="relative flex flex-col items-center gap-0.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d === 5 ? GOLD : "#fff", border: `1.5px solid ${d === 5 ? GOLD : "#cfcfcf"}` }} />
                <span style={{ fontSize: "0.46rem", color: "#888" }}>Day {d}</span>
              </div>
            ))}
          </div>
        </div>
      </Win>
    </>
  );
}
