import { describe, it, expect } from "vitest";
import { runAudit } from "./audit";

describe("runAudit", () => {
  it("returns recommendation array",
  () => {
    const result = runAudit({

      selectedTools: [
        "chatgpt",
        "claude",
      ],

      toolDetails: {},

      teamSize: 10,

      useCase: "development",
    });

    expect(Array.isArray(result.recommendations)).toBe(true);
  }
);

  it("calculates annual savings correctly",
    () => {

      const result = runAudit({

        selectedTools: [
          "chatgpt",
        ],

        toolDetails: {},

        teamSize: 5,

        useCase: "writing",
      });

      expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
    }
  );

  it("handles empty tool selections",
    () => {

      const result = runAudit({

        selectedTools: [],

        toolDetails: {},

        teamSize: 1,

        useCase: "general",
      });

      expect(result.recommendations).toEqual([]);
    }
  );

  it("returns numeric savings values",
    () => {

      const result = runAudit({

        selectedTools: [
          "cursor",
        ],

        toolDetails: {},

        teamSize: 3,

        useCase: "development",
      });

      expect(typeof result.totalMonthlySavings).toBe("number");
    }
  );

  it("generates recommendation reasons",
    () => {

      const result = runAudit({

        selectedTools: [
          "copilot",
        ],

        toolDetails: {},

        teamSize: 8,

        useCase: "development",
      });

      if (result.recommendations.length > 0) {
        expect(result.recommendations[0].reason.length).toBeGreaterThan(0);
      }
    }
  );

});