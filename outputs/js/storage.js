const KEYS = {
  access: "iceberg_access",
  pass: "iceberg_pass",
  activatedAt: "iceberg_activated_at",
  records: "iceberg_records",
  currentEvent: "iceberg_current_event"
};

export function hasAccess() {
  return localStorage.getItem(KEYS.access) === "true";
}

export function activateAccess(passcode) {
  localStorage.setItem(KEYS.access, "true");
  localStorage.setItem(KEYS.pass, passcode);
  localStorage.setItem(KEYS.activatedAt, new Date().toISOString());
}

export function clearAccess() {
  localStorage.removeItem(KEYS.access);
  localStorage.removeItem(KEYS.pass);
  localStorage.removeItem(KEYS.activatedAt);
}

export function saveEventText(text) {
  localStorage.setItem(KEYS.currentEvent, text || "");
}

export function getEventText() {
  return localStorage.getItem(KEYS.currentEvent) || "";
}

export function getRecords() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.records) || "[]");
  } catch {
    return [];
  }
}

export function saveRecord(record) {
  const records = getRecords();
  records.unshift({
    id: `iceberg-${Date.now()}`,
    date: new Date().toISOString(),
    ...record
  });
  localStorage.setItem(KEYS.records, JSON.stringify(records));
}

export function clearRecords() {
  localStorage.removeItem(KEYS.records);
}
