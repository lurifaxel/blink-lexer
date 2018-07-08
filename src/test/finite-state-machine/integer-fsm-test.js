import * as assert from "assert";
import { integerFsm } from "../../main/finite-state-machine/integer-fsm";

describe("integer-fsm", () => {
  describe("run", () => {
    it("should recognize a single digit string as an integer", () => {
      const result = integerFsm.run("5");
      assert.equal(result.parsedInput, "5");
      assert.equal(result.successful, true);
    });

    it("should recognize a four digit string as an integer", () => {
      const result = integerFsm.run("5332");
      assert.equal(result.parsedInput, "5332");
      assert.equal(result.successful, true);
    });

    it("should ignore starting zeroes and recognize a two digit string as an integer", () => {
      const result = integerFsm.run("0032");
      assert.equal(result.ignoredLeadingZerosCount, 2);
      assert.equal(result.parsedInput, "32");
      assert.equal(result.successful, false);
    });

    it("should not ignore starting zero if the input is '0'", () => {
      const result = integerFsm.run("0");
      assert.equal(result.ignoredLeadingZerosCount, 0);
      assert.equal(result.parsedInput, "0");
      assert.equal(result.successful, true);
    });

    it("should not ignore all zeros if the input is multiple zeros only", () => {
      const result = integerFsm.run("0000");
      assert.equal(result.ignoredLeadingZerosCount, 3);
      assert.equal(result.parsedInput, "0");
      assert.equal(result.successful, false);
    });
  });
});
