import { VisitsByDevice } from "~/types/visits";
import visitsByDevice from "~~/server/data/visits-by-device";

export default defineEventHandler(async (): Promise<VisitsByDevice> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return visitsByDevice;
});
