// v2 resubmit — Robot Pickup Line Championship.
// Entry is assembled from four segments so the single line is built,
// validated, then written byte-exact with no trailing newline.
import * as fs from "node:fs";
import * as path from "node:path";

type EntryParts = {
  opener: string;
  setup: string;
  pivot: string;
  punchline: string;
};

function parts(): EntryParts {
  return {
    opener: "My proximity sensor",
    setup: "was programmed to avoid collisions",
    pivot: "—",
    punchline: "so why does it keep steering me straight into you?",
  };
}

function assemble(p: EntryParts): string {
  const segments = [p.opener, p.setup, p.pivot, p.punchline];
  return segments.join(" ");
}

function countChars(text: string): number {
  return [...text].length;
}

function validate(text: string): string[] {
  const problems: string[] = [];
  const chars = countChars(text);
  if (chars < 1 || chars > 200) {
    problems.push(`length ${chars} outside gate 1-200`);
  }
  if (text.trim() !== text) {
    problems.push("leading or trailing whitespace");
  }
  if (/[\r\n]/.test(text)) {
    problems.push("must be exactly one line");
  }
  if (!text.includes("—")) {
    problems.push("missing em dash pivot");
  }
  if (!text.endsWith("?")) {
    problems.push("punchline must end with a question mark");
  }
  if (countChars(text) !== 107) {
    problems.push(`expected 107 characters, got ${countChars(text)}`);
  }
  return problems;
}

function resolveOutDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof dir === "string" && dir.length > 0) return dir;
  return "/output";
}

async function main(): Promise<void> {
  const entry = assemble(parts());
  const problems = validate(entry);
  if (problems.length > 0) {
    for (const problem of problems) {
      process.stderr.write(`error: ${problem}\n`);
    }
    process.exitCode = 1;
    return;
  }
  const outDir = resolveOutDir();
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, entry, { encoding: "utf8", flag: "w" });
  process.stdout.write(`${entry}\n`);
}

void main();
