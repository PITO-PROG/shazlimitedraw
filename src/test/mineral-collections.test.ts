import { describe, expect, it } from "vitest";

import { minerals } from "@/lib/content";
import { mineralCollections, mineralPhotos } from "@/lib/mineral-media";

describe("Mineral collection photo sets", () => {
  it("gives every mineral a collection of at least two photos", () => {
    expect(mineralCollections).toHaveLength(minerals.length);
    for (const group of mineralCollections) {
      expect(group.shots.length).toBeGreaterThanOrEqual(2);
      expect(group.shots.some((shot) => shot.src === group.main)).toBe(true);
    }
  });

  it("shows the collection's main photo as the mineral's tile image", () => {
    mineralCollections.forEach((group, i) => {
      expect(mineralPhotos[i]).toBe(group.main);
    });
  });
});
