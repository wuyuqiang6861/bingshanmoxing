import { ICEBERG_PASSCODES, validatePasscode, validatePasscodeDatabase } from "../js/passcodes.js";

const result = validatePasscodeDatabase();
const failures = [];

if (result.total !== 50) failures.push(`Expected 50 passcodes, got ${result.total}.`);
if (result.duplicates !== 0) failures.push(`Expected 0 duplicates, got ${result.duplicates}.`);
if (result.invalid !== 0) failures.push(`Expected 0 invalid passcodes, got ${result.invalid}.`);
if (!ICEBERG_PASSCODES.every(validatePasscode)) failures.push("Expected all configured passcodes to validate.");
if (validatePasscode("123456")) failures.push("Forbidden or missing passcode should not validate.");
if (validatePasscode("abcdef")) failures.push("Non-numeric passcode should not validate.");
if (validatePasscode("18472")) failures.push("Short passcode should not validate.");

console.log("Iceberg Passcode Database");
console.log(`Total: ${result.total}`);
console.log(`Duplicates: ${result.duplicates}`);
console.log(`Invalid: ${result.invalid}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("All passcode checks passed.");
