import { createFileRoute, redirect } from "@tanstack/react-router";

// Brand Room migrated to GoHighLevel (room.shopdollhouse.co).
// This route now redirects to the GHL funnel.
export const Route = createFileRoute("/quiz")({
  beforeLoad: () => {
    throw redirect({ href: "https://room.shopdollhouse.co/quiz" });
  },
});
