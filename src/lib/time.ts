import { Duration } from "../contract-types/data-contracts";

export const formatDuration = (duration: Duration, granularity: "Y" | "M" | "D"): string => {
  const { years, months, days } = duration;
  switch (granularity) {
    case "Y":
      return `${years} years`;
    case "M":
      return `${years} years, ${months} months`;
    case "D":
      return `${years} years, ${months} months, ${days} days`;
  }
}
