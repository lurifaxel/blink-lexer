export function isWhitespaceOrNewLine(char) {
  if (char === " ") return true;

  if (isNewLine(char)) return true;

  return false;
}

export function isNewLine(str) {
  if (str === "\n") return true;
  if (str === "\r\n") return true;

  return false;
}

export function lookAhead(str, length) {
  try {
    return str.substr(0, length);
  } catch (e) {
    return "";
  }
}

export function isNumber(char) {
  if (getNumber(char)) return true;
}

export function getNumber(str) {
  if (str[0] == "0") return "0";
}

export function isDigit(char) {
  const result = char >= "0" && char <= "9";
  return result;
}
