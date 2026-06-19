import { createFileRoute, redirect } from "@tanstack/react-router";

// Brand Room migrated to GoHighLevel (room.shopdollhouse.co).
// This route now redirects to the GHL funnel.
export const Route = createFileRoute("/brand-room_/ai-prompt-kit")({
  beforeLoad: () => {
    throw redirect({ href: "https://room.shopdollhouse.co/ai-prompt-kit" });
  },
});
