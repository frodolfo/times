import { describe, expect, it } from "vitest";

import { getSignificantTimeParts } from "./index";

describe("getSignificantTimeParts", () => {
  it("should return 2 significant parts by default", () => {
    const elapsed = {
      days: 2,
      hours: 5,
      minutes: 30,
      seconds: 45,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([
      { label: "days", value: 2 },
      { label: "hours", value: 5 },
    ]);
  });

  it("should return custom number of significant parts", () => {
    const elapsed = {
      days: 1,
      hours: 2,
      minutes: 30,
      seconds: 45,
    };

    const result = getSignificantTimeParts(elapsed, 3);

    expect(result).toEqual([
      { label: "days", value: 1 },
      { label: "hours", value: 2 },
      { label: "minutes", value: 30 },
    ]);
  });

  it("should return only 1 significant part when requested", () => {
    const elapsed = {
      days: 5,
      hours: 10,
      minutes: 30,
      seconds: 45,
    };

    const result = getSignificantTimeParts(elapsed, 1);

    expect(result).toEqual([{ label: "days", value: 5 }]);
  });
});

describe("Leading zero handling", () => {
  it("should skip leading zero values except for seconds", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 30,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([
      { label: "minutes", value: 5 },
      { label: "seconds", value: 30 },
    ]);
  });

  it("should include seconds even when it is zero if no other values are present", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([{ label: "seconds", value: 0 }]);
  });

  it("should include zero values after the first non-zero value is found", () => {
    const elapsed = {
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 30,
    };

    const result = getSignificantTimeParts(elapsed, 4);

    expect(result).toEqual([
      { label: "days", value: 1 },
      { label: "hours", value: 0 },
      { label: "minutes", value: 0 },
      { label: "seconds", value: 30 },
    ]);
  });

  it("should handle only seconds remaining", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 45,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([{ label: "seconds", value: 45 }]);
  });

  it("should handle only minutes and seconds", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 15,
      seconds: 0,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([
      { label: "minutes", value: 15 },
      { label: "seconds", value: 0 },
    ]);
  });
});

describe("Edge cases", () => {
  it("should handle significant parts greater than available time units", () => {
    const elapsed = {
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    };

    const result = getSignificantTimeParts(elapsed, 10);

    expect(result).toEqual([
      { label: "days", value: 1 },
      { label: "hours", value: 2 },
      { label: "minutes", value: 3 },
      { label: "seconds", value: 4 },
    ]);
  });
});

describe("Order verification", () => {
  it("should maintain correct order: days, hours, minutes, seconds", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 30,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([
      { label: "minutes", value: 1 },
      { label: "seconds", value: 30 },
    ]);
  });

  it("should maintain order even with all non-zero values", () => {
    const elapsed = {
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    };

    const result = getSignificantTimeParts(elapsed, 4);

    expect(result).toEqual([
      { label: "days", value: 1 },
      { label: "hours", value: 2 },
      { label: "minutes", value: 3 },
      { label: "seconds", value: 4 },
    ]);
  });
});

describe("Specific interview examples", () => {
  it("should handle example 1: 2 days, 3 hours, 0 minutes, 45 seconds, show 2 significant parts", () => {
    const elapsed = {
      days: 2,
      hours: 3,
      minutes: 0,
      seconds: 45,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([
      { label: "days", value: 2 },
      { label: "hours", value: 3 },
    ]);
  });

  it("should handle example 2: 0 days, 0 hours, 5 minutes, 30 seconds, show 2 significant parts", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 30,
    };

    const result = getSignificantTimeParts(elapsed, 2);

    expect(result).toEqual([
      { label: "minutes", value: 5 },
      { label: "seconds", value: 30 },
    ]);
  });

  it("should handle example 3: 0 days, 0 hours, 0 minutes, 15 seconds, show 1 significant part", () => {
    const elapsed = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 15,
    };

    const result = getSignificantTimeParts(elapsed, 1);

    expect(result).toEqual([{ label: "seconds", value: 15 }]);
  });

  it("should handle example 4: 1 day, 0 hours, 0 minutes, 0 seconds, show 3 significant parts", () => {
    const elapsed = {
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const result = getSignificantTimeParts(elapsed, 3);

    expect(result).toEqual([
      { label: "days", value: 1 },
      { label: "hours", value: 0 },
      { label: "minutes", value: 0 },
    ]);
  });

  it("should handle example 4: 1 day, 0 hours, 0 minutes, 0 seconds, show 3 significant parts with unordered time parts", () => {
    const elapsed = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 1,
    };

    const result = getSignificantTimeParts(elapsed, 3);

    expect(result).toEqual([
      { label: "days", value: 1 },
      { label: "hours", value: 0 },
      { label: "minutes", value: 0 },
    ]);
  });
});
