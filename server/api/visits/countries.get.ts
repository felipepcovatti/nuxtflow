import { VisitsByCountry } from "~/types/visits";
import visitsByCountry from "../../data/visits-by-country.json";

export default defineEventHandler(async (): Promise<VisitsByCountry> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return visitsByCountry;
});
