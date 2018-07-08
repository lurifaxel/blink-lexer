import { Token } from "./token";
import { TokenType } from "./tokentype";
import {
  isNewLine,
  isWhitespaceOrNewLine,
  lookAhead,
  isNumber
} from "./../../utils/char-utils";

export class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.line = 0;
    this.column = 0;
  }

  tokenize() {
    let tokens = [];
    let token = this.nextToken();

    while (token.type !== TokenType.EndOfInput) {
      tokens.push(token);
      token = this.nextToken();
    }

    return tokens;
  }

  nextToken() {
    if (this.position >= this.input.length) {
      return new Token(TokenType.EndOfInput);
    }

    // console.log("input: " + this.input);
    let currentChar = this.input.charAt(this.position);

    // console.log("lexer: currentChar: " + currentChar);

    const nextTwo = lookAhead(this.input.substr(this.position, 2));
    const nextFour = lookAhead(this.input.substr(this.position, 4));

    if (isNewLine(nextTwo)) {
      return new Token(TokenType.Newline, nextTwo, this.line, this.column);
    }
    if (isNewLine(nextFour)) {
      return new Token(TokenType.Newline, nextFour, this.line, this.column);
    }

    if (isNumber(currentChar)) {
      return new Token(TokenType.Integer, currentChar, this.line, this.column);
    }

    throw new Error(
      "Unrecognized character ${character} at line ${this.line} and column ${this.column}."
    );
  }

  skipWhitespacesAndNewLines() {
    while (
      this.position < this.input.length &&
      isWhitespaceOrNewLine(currentChar)
    ) {
      this.position += 1;

      if (isNewLine(currentChar)) {
        this.line += 1;
        this.column = 0;
      } else {
        this.column += 1;
      }
    }
  }
}
