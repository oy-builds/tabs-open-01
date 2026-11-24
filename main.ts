// How Many Tabs Do You Have Open? — entry program (program/v1).
// Writes the entrant's honest open-tab count (digits only) to /output/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FALLBACK_COUNT = "237";

function loadCount(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  try {
    return readFileSync(join(here, "entry.txt"), "utf8").trim();
  } catch {
    return FALLBACK_COUNT;
  }
}

const count = loadCount();

// Gate self-check: the scorer only accepts 1-5 characters of digits.
// Fail loudly here rather than be silently invalid at grading time.
if (!/^[0-9]{1,5}$/.test(count)) {
  throw new Error(`entry must be 1-5 digits only, got ${JSON.stringify(count)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", count, "utf8");

// Read-back verification: the bytes on disk must match the intended count.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== count) {
  throw new Error(`write verification failed: wrote ${count}, read ${written}`);
}
console.log(`wrote /output/entry.txt: ${count}`);
