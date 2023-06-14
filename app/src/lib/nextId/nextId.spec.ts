import { expect } from "chai";
import nextId from "./index";
import { Document } from "mongoose";

// npm run test:local -- --grep "nextId"

describe("nextId: returns either null or _id", () => {
  it("Positive outcome", () => {
    const collection: { _id: string }[] = [
      { _id: "12345" },
      { _id: "12344" },
      { _id: "12333" },
    ];
    const limit = 2;

    expect(nextId(collection as Document[], limit)).to.eq("12333");
  });

  it("Collection is less than `limit`", () => {
    const collection: { _id: string }[] = [
      { _id: "12345" },
      { _id: "12344" },
      { _id: "12333" },
    ];
    const limit = 4;

    expect(nextId(collection as Document[], limit)).to.be.null;
  });

  it("Empty collection", () => {
    const collection: { _id: string }[] = [];
    const limit = 2;

    expect(nextId(collection as Document[], limit)).to.be.null;
  });

  it("Null is passed instead of an array", () => {
    const limit = 2;

    expect(nextId(null as unknown as Document[], limit)).to.be.null;
  });
});
