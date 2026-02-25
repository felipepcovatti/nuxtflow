import { faker } from "@faker-js/faker";
import { CountryVisitsRecord, VisitsByCountry } from "~/types/visits";

export default defineEventHandler(async (): Promise<VisitsByCountry> => {
  faker.seed(1);

  await new Promise((resolve) => {
    setTimeout(() => resolve(""), 1000);
  });

  const countryCodes: string[] = faker.helpers.uniqueArray(
    () => faker.location.countryCode(),
    80,
  );

  const countries: CountryVisitsRecord[] = countryCodes.map((country) => ({
    country,
    visits: faker.number.int({ min: 100, max: 1000 }),
  }));

  return {
    countries,
    total_visits: countries.reduce((total, { visits }) => total + visits, 0),
  };
});
