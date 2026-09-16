import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const app = fs.readFileSync(new URL("../js/app.js", import.meta.url), "utf8");
const storage = fs.readFileSync(new URL("../js/storage.js", import.meta.url), "utf8");
const passcodes = fs.readFileSync(new URL("../js/passcodes.js", import.meta.url), "utf8");

const checks = [
  ["relative stylesheet path", html.includes('href="./css/style.css"')],
  ["relative module path", html.includes('src="./js/app.js"')],
  ["numeric keyboard inputmode", app.includes('inputmode="numeric"')],
  ["numeric input pattern", app.includes('pattern="[0-9]*"')],
  ["single digit maxlength", app.includes('maxlength="1"')],
  ["six real input slots", app.includes('pass-digit-input') && app.includes('Array.from({ length: 6 }')],
  ["automatic six digit validation", app.includes('passValue.length === 6') && app.includes('tryPasscode(true)')],
  ["access localStorage key", storage.includes('"iceberg_access"')],
  ["pass localStorage key", storage.includes('"iceberg_pass"')],
  ["activation date key", storage.includes('"iceberg_activated_at"')],
  ["clear records separate from access", storage.includes("clearRecords") && !/function clearRecords\(\)[\s\S]*iceberg_access/.test(storage)],
  ["clear access separate from records", storage.includes("clearAccess") && !/function clearAccess\(\)[\s\S]*iceberg_records/.test(storage)],
  ["validation layer separated", passcodes.includes("export function validatePasscode")],
  ["no absolute asset paths", !/(href|src)="\/(?!\/)/.test(html)],
  ["soft error language", app.includes("这把钥匙暂时没有打开冰山") && app.includes("#B76E79") === false],
  ["database summary only", passcodes.includes("Iceberg Passcode Database") && !passcodes.includes("console.table")],
  ["pass screen uses layered assets", app.includes("pass-bg.webp") && app.includes("pass-crystal-decor.webp") && app.includes("pass-iceberg.webp")],
  ["reference not used as page background", !app.includes("pass-ui-reference.webp")]
];

const failed = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
}

if (failed.length) {
  process.exitCode = 1;
}
