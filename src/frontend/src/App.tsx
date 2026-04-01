import { useEffect, useRef } from "react";

export default function App() {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    initApp();
  }, []);

  return (
    <div id="app-root">
      <div id="main" className="screen fade-in">
        <header>
          <div id="header-row">
            <div id="title-group">
              <h1 id="title">
                Word<span id="cursor"> </span>Finder
              </h1>
              <p id="subtitle">Find every word in your letters</p>
            </div>
            <button
              type="button"
              id="theme-toggle"
              aria-label="Toggle theme"
              data-ocid="theme.toggle"
            >
              <span id="theme-icon">☀️</span>
            </button>
          </div>
        </header>

        <section id="input-section">
          <div id="input-wrapper">
            <input
              type="text"
              id="letter-input"
              maxLength={8}
              placeholder="Enter 3–8 letters…"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
            <span id="letter-count">0/8</span>
          </div>
          <div id="input-hint">Letters only · auto-uppercase · 3–8 chars</div>
        </section>

        <section id="controls">
          <button
            type="button"
            id="scan-btn"
            disabled
            data-ocid="search.primary_button"
          >
            Scan
          </button>
          <button
            type="button"
            id="stop-btn"
            className="hidden"
            data-ocid="search.stop_button"
          >
            Stop
          </button>
          <button
            type="button"
            id="reset-btn"
            className="hidden"
            data-ocid="search.secondary_button"
          >
            New
          </button>
        </section>

        <section id="scan-strip" className="hidden">
          <div id="strip-top">
            <div id="progress-label">Scanning…</div>
            <div id="flash-badge" className="hidden">
              <span id="flash-label">✦</span>
              <span id="flash-word" />
            </div>
          </div>
          <div id="progress-bar-wrapper">
            <div id="progress-bar" />
          </div>
          <div id="strip-bottom">
            <span id="current-word">—</span>
            <div id="stats-inline">
              <span>
                <span id="stat-tested">0</span> tested
              </span>
              <span>
                <span id="stat-found">0</span> found
              </span>
              <span id="stat-duration">0s</span>
            </div>
          </div>
        </section>

        <section id="vault-section" className="hidden">
          <div id="vault-header">
            <span id="vault-title">Results</span>
            <span id="vault-count">0 matches</span>
            <button
              type="button"
              id="copy-btn"
              data-ocid="vault.secondary_button"
            >
              Copy
            </button>
          </div>
          <div id="vault" />
        </section>

        <footer>
          <p>© 2026 GENZ</p>
        </footer>
      </div>
    </div>
  );
}

function initApp() {
  const inputEl = document.getElementById("letter-input") as HTMLInputElement;
  const letterCount = document.getElementById("letter-count")!;
  const scanBtn = document.getElementById("scan-btn") as HTMLButtonElement;
  const stopBtn = document.getElementById("stop-btn")!;
  const resetBtn = document.getElementById("reset-btn")!;
  const scanStrip = document.getElementById("scan-strip")!;
  const progressLabel = document.getElementById("progress-label")!;
  const progressBar = document.getElementById("progress-bar")!;
  const currentWord = document.getElementById("current-word")!;
  const flashBadge = document.getElementById("flash-badge")!;
  const flashWord = document.getElementById("flash-word")!;
  const statTested = document.getElementById("stat-tested")!;
  const statFound = document.getElementById("stat-found")!;
  const statDuration = document.getElementById("stat-duration")!;
  const vaultSection = document.getElementById("vault-section")!;
  const vaultEl = document.getElementById("vault")!;
  const vaultCount = document.getElementById("vault-count")!;
  const copyBtn = document.getElementById("copy-btn")!;
  const themeToggle = document.getElementById("theme-toggle")!;
  const themeIcon = document.getElementById("theme-icon")!;

  // Theme toggle
  let isDark = true;
  themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.textContent = "☀️";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.textContent = "🌙";
    }
  });

  let scanning = false;
  let stopRequested = false;
  let startTime = 0;
  let foundWords: { word: string; def: string; len: number }[] = [];
  let durationTimer: ReturnType<typeof setInterval> | null = null;

  inputEl.addEventListener("input", () => {
    const val = inputEl.value
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 8);
    inputEl.value = val;
    letterCount.textContent = `${val.length}/8`;
    const valid = val.length >= 3 && val.length <= 8;
    scanBtn.disabled = !valid || scanning;
    letterCount.className = val.length > 0 ? (valid ? "valid" : "invalid") : "";
  });

  scanBtn.addEventListener("click", startScan);
  stopBtn.addEventListener("click", () => {
    stopRequested = true;
  });
  resetBtn.addEventListener("click", resetAll);
  copyBtn.addEventListener("click", copyAll);

  function resetAll() {
    inputEl.value = "";
    letterCount.textContent = "0/8";
    letterCount.className = "";
    scanBtn.disabled = true;
    stopBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
    scanBtn.classList.remove("hidden");
    scanStrip.classList.add("hidden");
    vaultSection.classList.add("hidden");
    vaultEl.innerHTML = "";
    vaultCount.textContent = "0 matches";
    progressBar.style.width = "0%";
    foundWords = [];
    document.getElementById("app-root")!.classList.remove("scanning");
  }

  function generatePermutations(letters: string): string[] {
    const chars = letters.split("");
    const results = new Set<string>();
    const n = chars.length;
    for (let len = 3; len <= n; len++) {
      for (const combo of getCombinations(chars, len)) {
        for (const p of getPerms(combo)) {
          results.add(p);
        }
      }
    }
    return Array.from(results);
  }

  function getCombinations(arr: string[], k: number): string[][] {
    if (k === 0) return [[]];
    if (arr.length < k) return [];
    const [first, ...rest] = arr;
    const withFirst = getCombinations(rest, k - 1).map((c) => [first, ...c]);
    const withoutFirst = getCombinations(rest, k);
    return [...withFirst, ...withoutFirst];
  }

  function getPerms(arr: string[]): string[] {
    if (arr.length <= 1) return [arr.join("")];
    const result: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of getPerms(rest)) {
        result.push(arr[i] + p);
      }
    }
    return result;
  }

  async function checkWord(word: string): Promise<string | null> {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return null;
      try {
        const { meanings } = data[0];
        if (meanings?.length > 0) {
          const defs = meanings[0].definitions;
          if (defs?.length > 0) {
            let def: string = defs[0].definition || "";
            if (def.length > 80) def = `${def.slice(0, 77)}...`;
            return def;
          }
        }
      } catch (_) {
        // ignore
      }
      return "";
    } catch (_) {
      return null;
    }
  }

  async function startScan() {
    const letters = inputEl.value.toUpperCase();
    if (letters.length < 3) return;

    scanning = true;
    stopRequested = false;
    foundWords = [];
    vaultEl.innerHTML = "";
    vaultCount.textContent = "0 matches";

    scanBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    resetBtn.classList.add("hidden");
    scanStrip.classList.remove("hidden");
    flashBadge.classList.add("hidden");
    vaultSection.classList.remove("hidden");
    document.getElementById("app-root")!.classList.add("scanning");

    statTested.textContent = "0";
    statFound.textContent = "0";
    statDuration.textContent = "0s";
    progressBar.style.width = "0%";
    flashWord.textContent = "";

    const allPerms = generatePermutations(letters);
    const total = allPerms.length;
    progressLabel.textContent = `Scanning 0/${total}…`;

    startTime = Date.now();
    durationTimer = setInterval(() => {
      statDuration.textContent = `${((Date.now() - startTime) / 1000).toFixed(1)}s`;
    }, 100);

    let tested = 0;
    let found = 0;

    for (const word of allPerms) {
      if (stopRequested) break;

      currentWord.textContent = word;
      const def = await checkWord(word);
      tested++;

      const pct = Math.round((tested / total) * 100);
      progressBar.style.width = `${pct}%`;
      progressLabel.textContent = `Scanning ${tested}/${total} (${pct}%)`;
      statTested.textContent = String(tested);

      if (def !== null) {
        found++;
        foundWords.push({ word, def, len: word.length });
        statFound.textContent = String(found);
        showFlash(word);
        addToVault(word, def);
        vaultCount.textContent = `${found} match${found !== 1 ? "es" : ""}`;
      }

      await sleep(200);
    }

    if (durationTimer) clearInterval(durationTimer);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    statDuration.textContent = `${elapsed}s`;
    currentWord.textContent = stopRequested ? "Stopped." : "Done!";
    progressLabel.textContent = stopRequested
      ? `Stopped — ${tested}/${total}`
      : `Complete — ${tested}/${total}`;

    scanning = false;
    stopBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    document.getElementById("app-root")!.classList.remove("scanning");
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function showFlash(word: string) {
    flashBadge.classList.remove("hidden");
    flashWord.textContent = word;
    flashBadge.classList.remove("flash-active");
    void flashBadge.offsetWidth;
    flashBadge.classList.add("flash-active");
  }

  function addToVault(word: string, def: string) {
    const len = word.length;
    let group = vaultEl.querySelector(
      `[data-len="${len}"]`,
    ) as HTMLElement | null;

    if (!group) {
      group = document.createElement("div");
      group.className = "vault-group";
      group.dataset.len = String(len);

      const header = document.createElement("div");
      header.className = "vault-group-header";
      header.textContent = `${len}-letter`;
      group.appendChild(header);

      const list = document.createElement("div");
      list.className = "vault-list";
      group.appendChild(list);

      const groups = Array.from(
        vaultEl.querySelectorAll(".vault-group"),
      ) as HTMLElement[];
      const insertBefore = groups.find(
        (g) => Number.parseInt(g.dataset.len ?? "0") < len,
      );
      if (insertBefore) {
        vaultEl.insertBefore(group, insertBefore);
      } else {
        vaultEl.appendChild(group);
      }
    }

    const list = group.querySelector(".vault-list")!;
    const entry = document.createElement("div");
    entry.className = "vault-entry vault-entry-new";
    entry.innerHTML = `<span class="vault-word">${word}</span>${def ? `<span class="vault-def">${def}</span>` : ""}`;
    list.appendChild(entry);
    setTimeout(() => entry.classList.remove("vault-entry-new"), 600);
  }

  function copyAll() {
    if (foundWords.length === 0) return;
    const text = [...foundWords]
      .sort((a, b) => b.len - a.len)
      .map((w) => (w.def ? `${w.word} — ${w.def}` : w.word))
      .join("\n");
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
    });
  }
}
