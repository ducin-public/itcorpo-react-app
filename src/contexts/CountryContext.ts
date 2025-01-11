import { Nationality } from '../contract-types/data-contracts'

const flags = {
  US: "🇺🇸",
  UK: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  NL: "🇳🇱",
  PL: "🇵🇱",
  IT: "🇮🇹",
  ES: "🇪🇸"
}

export const flag = (nat: Nationality) => flags[nat]
