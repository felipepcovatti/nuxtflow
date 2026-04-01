export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/")) return;

  await new Promise((resolve) => setTimeout(resolve, 300));
});
