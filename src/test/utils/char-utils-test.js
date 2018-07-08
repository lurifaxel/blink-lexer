import * as assert from "assert";
import * as charUtils from "../../utils/char-utils";

describe("Char utils", () => {
  describe("isNewline", () => {
    it("should return true for input \\n ", () => {
      const result = charUtils.isNewLine("\n");

      assert.equal(result, true);
    });

    it("should return \\r\\n for input (\\r\\n, 4) ", () => {
      const result = charUtils.isNewLine("\r\n");

      assert.equal(result, true);
    });
  });

  describe("lookAhead", () => {
    it("should return \\n for input (\\n, 2)", () => {
      const result = charUtils.lookAhead("\n", 2);

      assert.equal(result, "\n");
    });

    it("should return true for input \\r\\n ", () => {
      const result = charUtils.isNewLine("\r\n");

      assert.equal(result, true);
    });
  });
});
