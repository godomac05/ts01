import fs from "fs";
import path from "path";
import type { ConversationTurn } from "../types";

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const STORE_FILE = path.join(DATA_DIR, "conversations.json");
const MAX_TURNS_PER_USER = 20;

type Store = Record<string, ConversationTurn[]>;

let store: Store = {};

function loadFromDisk(): void {
  try {
    if (fs.existsSync(STORE_FILE)) {
      store = JSON.parse(fs.readFileSync(STORE_FILE, "utf-8"));
    }
  } catch {
    store = {};
  }
}

function saveToDisk(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_FILE, JSON.stringify(store), "utf-8");
}

loadFromDisk();

export function getHistory(phoneNumber: string): ConversationTurn[] {
  return store[phoneNumber] ?? [];
}

export function appendTurns(
  phoneNumber: string,
  turns: ConversationTurn[],
): void {
  const existing = store[phoneNumber] ?? [];
  const updated = [...existing, ...turns].slice(-MAX_TURNS_PER_USER);
  store[phoneNumber] = updated;
  saveToDisk();
}

export function clearHistory(phoneNumber: string): void {
  delete store[phoneNumber];
  saveToDisk();
}
