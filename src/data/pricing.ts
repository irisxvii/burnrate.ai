export interface PlanPricing {
  pricePerSeat: number | null;
  currency: "USD" | "INR";
  isTeamPlan: boolean;
  minSeats?: number;
  customPricing?: boolean;
  tier:
    | "individual"
    | "pro"
    | "team"
    | "enterprise";
}

export const pricing: Record<
  string,
  Record<string, PlanPricing>
> = {
  chatgpt: {
    Go: {
      pricePerSeat: 399,
      currency: "INR",
      isTeamPlan: false,
      tier: "individual",
    },

    Plus: {
      pricePerSeat: 1999,
      currency: "INR",
      isTeamPlan: false,
      tier: "individual",
    },

    Pro: {
      pricePerSeat: 10699,
      currency: "INR",
      isTeamPlan: false,
      tier: "pro",
    },

    Business: {
      pricePerSeat: 1800,
      currency: "INR",
      isTeamPlan: true,
      minSeats: 2,
      tier: "team",
    },

    Enterprise: {
      pricePerSeat: null,
      currency: "INR",
      isTeamPlan: true,
      customPricing: true,
      tier: "enterprise",
    },
  },

  claude: {
    Pro: {
      pricePerSeat: 20,
      currency: "USD",
      isTeamPlan: false,
      tier: "individual",
    },

    Max: {
      pricePerSeat: 100,
      currency: "USD",
      isTeamPlan: false,
      tier: "pro",
    },

    "Team Standard": {
      pricePerSeat: 25,
      currency: "USD",
      isTeamPlan: true,
      minSeats: 5,
      tier: "team",
    },

    "Team Premium": {
      pricePerSeat: 125,
      currency: "USD",
      isTeamPlan: true,
      minSeats: 5,
      tier: "team",
    },

    Enterprise: {
      pricePerSeat: null,
      currency: "USD",
      isTeamPlan: true,
      customPricing: true,
      tier: "enterprise",
    },
  },

  copilot: {
    Pro: {
      pricePerSeat: 10,
      currency: "USD",
      isTeamPlan: false,
      tier: "individual",
    },

    Business: {
      pricePerSeat: 19,
      currency: "USD",
      isTeamPlan: true,
      tier: "team",
    },

    Enterprise: {
      pricePerSeat: 39,
      currency: "USD",
      isTeamPlan: true,
      tier: "enterprise",
    },
  },

  cursor: {
    Pro: {
      pricePerSeat: 20,
      currency: "USD",
      isTeamPlan: false,
      tier: "individual",
    },

    "Pro+": {
      pricePerSeat: 60,
      currency: "USD",
      isTeamPlan: false,
      tier: "pro",
    },

    Ultra: {
      pricePerSeat: 200,
      currency: "USD",
      isTeamPlan: false,
      tier: "pro",
    },

    Teams: {
      pricePerSeat: 40,
      currency: "USD",
      isTeamPlan: true,
      tier: "team",
    },

    Enterprise: {
      pricePerSeat: null,
      currency: "USD",
      isTeamPlan: true,
      customPricing: true,
      tier: "enterprise",
    },
  },

  gemini: {
    "Google AI Plus": {
      pricePerSeat: 399,
      currency: "INR",
      isTeamPlan: false,
      tier: "individual",
    },

    "Google AI Pro": {
      pricePerSeat: 1950,
      currency: "INR",
      isTeamPlan: false,
      tier: "individual",
    },

    "Google AI Ultra": {
      pricePerSeat: 6500,
      currency: "INR",
      isTeamPlan: false,
      tier: "pro",
    },
  },

  windsurf: {
    Pro: {
      pricePerSeat: 20,
      currency: "USD",
      isTeamPlan: false,
      tier: "individual",
    },

    Max: {
      pricePerSeat: 200,
      currency: "USD",
      isTeamPlan: false,
      tier: "pro",
    },

    Teams: {
      pricePerSeat: 40,
      currency: "USD",
      isTeamPlan: true,
      tier: "team",
    },

    Enterprise: {
      pricePerSeat: null,
      currency: "USD",
      isTeamPlan: true,
      customPricing: true,
      tier: "enterprise",
    },
  },

  "anthropic-api": {
    "Opus 4.7": {
      pricePerSeat: null,
      currency: "USD",
      isTeamPlan: false,
      customPricing: true,
      tier: "individual",
    },

    "Sonnet 4.6": {
      pricePerSeat: null,
      currency: "USD",
      isTeamPlan: false,
      customPricing: true,
      tier: "individual",
    },

    "Haiku 4.5": {
      pricePerSeat: null,
      currency: "USD",
      isTeamPlan: false,
      customPricing: true,
      tier: "individual",
    },
  },
};