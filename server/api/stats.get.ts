import type { Stats } from "../../app/types/stats";
import stats from "../data/stats";

export default defineEventHandler(async () => {
  return stats satisfies Stats;
});
