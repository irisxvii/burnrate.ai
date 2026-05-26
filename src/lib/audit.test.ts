import { describe, it, expect } from "vitest";
import { runAudit } from "./audit";

describe("runAudit", () => {
  it("returns valid recommendations structure", () => {
    const result = runAudit({
      selectedTools: ["chatgpt", "claude"],
      toolDetails: {},
      teamSize: 10,
      useCase: "development",
    });

    expect(Array.isArray(result.recommendations)).toBe(true);

    if (result.recommendations.length > 0) {
      expect(result.recommendations[0]).toHaveProperty("reason");
      expect(typeof result.recommendations[0].reason).toBe("string");
    }
  });

  it("calculates annual savings correctly", () => {
    const result = runAudit({
      selectedTools: ["chatgpt"],
      toolDetails: {},
      teamSize: 5,
      useCase: "writing",
    });

    expect(result.totalAnnualSavings).toBe(
      result.totalMonthlySavings * 12
    );

    expect(Number.isFinite(result.totalMonthlySavings)).toBe(true);
  });

  it("handles empty tool selections", () => {
    const result = runAudit({
      selectedTools: [],
      toolDetails: {},
      teamSize: 1,
      useCase: "general",
    });

    expect(result.recommendations).toEqual([]);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.totalAnnualSavings).toBe(0);
  });

  it("returns numeric savings values", () => {
    const result = runAudit({
      selectedTools: ["cursor"],
      toolDetails: {},
      teamSize: 3,
      useCase: "development",
    });

    expect(Number.isFinite(result.totalMonthlySavings)).toBe(true);
    expect(typeof result.totalMonthlySavings).toBe("number");
  });

  it("generates recommendation reasons", () => {
    const result = runAudit({
      selectedTools: ["copilot"],
      toolDetails: {},
      teamSize: 8,
      useCase: "development",
    });

    expect(Array.isArray(result.recommendations)).toBe(true);

    result.recommendations.forEach((rec) => {
      expect(typeof rec.reason).toBe("string");
      expect(rec.reason.length).toBeGreaterThan(5);
    });
  });
});