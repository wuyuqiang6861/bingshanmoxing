export const ICEBERG_PASSCODES = Object.freeze([
  "184726", "593814", "271945", "846251", "315879",
  "729463", "461582", "938175", "524691", "682357",
  "157934", "793526", "248671", "615482", "874319",
  "362795", "951648", "437216", "586923", "714358",
  "269583", "835147", "492761", "671935", "318624",
  "947532", "526418", "783261", "154682", "639475",
  "821594", "375826", "964173", "218659", "547381",
  "692814", "431957", "758423", "916285", "283746",
  "645219", "179568", "832674", "496135", "721849",
  "354918", "968421", "513762", "687294", "245839"
]);

const SIX_DIGITS = /^\d{6}$/;
const FORBIDDEN = new Set([
  "000000", "111111", "222222", "888888", "999999",
  "123456", "234567", "654321", "010101", "202609"
]);

export function validatePasscode(code) {
  const normalized = String(code || "").trim();
  return SIX_DIGITS.test(normalized) && ICEBERG_PASSCODES.includes(normalized);
}

export function validatePasscodeDatabase(codes = ICEBERG_PASSCODES) {
  const seen = new Set();
  const duplicates = new Set();
  const invalid = [];

  codes.forEach((code, index) => {
    const normalized = String(code || "");
    const isInvalid = !SIX_DIGITS.test(normalized) || FORBIDDEN.has(normalized);

    if (!normalized) invalid.push({ index, reason: "empty" });
    else if (isInvalid) invalid.push({ index, reason: "invalid_format_or_forbidden" });

    if (seen.has(normalized)) duplicates.add(normalized);
    seen.add(normalized);
  });

  return {
    total: codes.length,
    duplicates: duplicates.size,
    invalid: invalid.length
  };
}

export function reportPasscodeDatabase() {
  const result = validatePasscodeDatabase();
  console.info("Iceberg Passcode Database");
  console.info(`Total: ${result.total}`);
  console.info(`Duplicates: ${result.duplicates}`);
  console.info(`Invalid: ${result.invalid}`);
  return result;
}
