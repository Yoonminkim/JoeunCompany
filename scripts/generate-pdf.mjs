#!/usr/bin/env node
/**
 * 홈페이지 전체를 묶은 PDF 회사소개서를 만듭니다.  →  public/joeun-company-profile.pdf
 *
 * 동작: (1) 프로덕션 빌드 → (2) 임시 포트에서 `next start` → (3) 설치된 Chrome(헤드리스)으로
 *       /print 페이지를 PDF 로 저장 → (4) 서버 종료. 별도 npm 패키지는 필요 없습니다.
 *
 * 사용법
 *   npm run pdf                 빌드부터 다시 하고 PDF 생성 (기본, 가장 안전)
 *   npm run pdf -- --skip-build 이미 최신 빌드(.next)가 있을 때 빌드 생략
 *
 * 환경변수
 *   CHROME_PATH  Chrome/Chromium/Edge 실행 파일 경로 (자동으로 못 찾을 때)
 *
 * 내용(src/lib/*.ts, 페이지)을 고쳤다면 이 명령을 다시 실행해 PDF 를 갱신한 뒤 함께 배포하세요.
 * 출력 경로는 src/lib/site.ts 의 profilePdf.path 와 같아야 합니다.
 */
import { spawn, spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  statSync,
} from "node:fs";
import { createRequire } from "node:module";
import net from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "public", "joeun-company-profile.pdf");
const skipBuild = process.argv.includes("--skip-build");

const nextBin = createRequire(join(root, "package.json")).resolve(
  "next/dist/bin/next",
);

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    // Linux
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    // Windows
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  return candidates.find((path) => path && existsSync(path));
}

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // 서버가 아직 뜨는 중입니다.
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`서버가 ${timeoutMs / 1000}초 안에 응답하지 않았습니다: ${url}`);
}

function runChrome(chrome, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(chrome, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => (stderr += chunk));
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("Chrome 이 120초 안에 끝나지 않았습니다."));
    }, 120_000);
    child.on("error", reject);
    child.on("exit", (code) => {
      clearTimeout(timer);
      if (code === 0) resolveRun();
      else reject(new Error(`Chrome 종료 코드 ${code}\n${stderr.trim()}`));
    });
  });
}

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    throw new Error(
      "Chrome(또는 Chromium/Edge)을 찾지 못했습니다. 설치하거나 CHROME_PATH 환경변수에 실행 파일 경로를 지정하세요.",
    );
  }

  if (skipBuild && !existsSync(join(root, ".next", "BUILD_ID"))) {
    throw new Error("--skip-build 를 썼지만 .next 빌드 결과가 없습니다. 먼저 `npm run build` 를 실행하세요.");
  }

  if (!skipBuild) {
    console.log("▸ 프로덕션 빌드 중...");
    const build = spawnSync(process.execPath, [nextBin, "build"], {
      cwd: root,
      stdio: "inherit",
    });
    if (build.status !== 0) throw new Error("빌드에 실패했습니다.");
  }

  const port = await freePort();
  const url = `http://127.0.0.1:${port}/print`;
  console.log(`▸ 서버 시작 (포트 ${port})...`);
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: root,
    stdio: ["ignore", "ignore", "inherit"],
  });

  const work = mkdtempSync(join(tmpdir(), "joeun-pdf-"));
  const tmpPdf = join(work, "profile.pdf");

  try {
    await waitForServer(url);

    console.log("▸ PDF 생성 중...");
    await runChrome(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      // 이미 켜져 있는 Chrome 과 섞이지 않도록 임시 프로필 사용
      `--user-data-dir=${join(work, "profile")}`,
      // 쪽 위·아래의 날짜/주소 머리글·바닥글 제거
      "--no-pdf-header-footer",
      // 이미지·폰트 로딩이 끝날 때까지 기다림
      "--virtual-time-budget=20000",
      `--print-to-pdf=${tmpPdf}`,
      url,
    ]);

    if (!existsSync(tmpPdf) || statSync(tmpPdf).size === 0) {
      throw new Error("PDF 파일이 만들어지지 않았습니다.");
    }

    // 생성이 끝난 뒤에만 교체해서, 실패해도 기존 PDF 가 깨지지 않게 합니다.
    mkdirSync(dirname(output), { recursive: true });
    copyFileSync(tmpPdf, output);
    const kb = Math.round(statSync(output).size / 1024);
    console.log(`✔ 완료: ${output} (${kb.toLocaleString()} KB)`);
  } finally {
    server.kill();
    rmSync(work, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`✖ ${error.message}`);
  process.exit(1);
});
