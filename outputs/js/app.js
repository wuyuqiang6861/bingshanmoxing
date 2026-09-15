import { CARDS, JOURNEY_LAYERS, randomCard, randomCardByLayer } from "./cards.js";
import { validatePasscode, reportPasscodeDatabase, ICEBERG_PASSCODES } from "./passcodes.js";
import {
  activateAccess,
  clearAccess,
  clearRecords,
  getEventText,
  getRecords,
  hasAccess,
  saveEventText,
  saveRecord
} from "./storage.js";

const app = document.querySelector("#app");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let passValue = "";
let drawCard = null;
let journeyIndex = 0;
let journeyCards = [];
let journeyAnswers = {};

if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.search.includes("dev=1")) {
  reportPasscodeDatabase();
}

function screen(className, content) {
  app.className = `phone-shell ${className || ""}`;
  app.innerHTML = content;
}

function icebergMarkup() {
  return document.querySelector("#iceberg-template").innerHTML;
}

function focusPassInput() {
  const input = document.querySelector("#passInput");
  if (input) input.focus({ preventScroll: true });
}

function renderPass() {
  passValue = "";
  screen("", `
    <section class="screen pass-screen center">
      <div class="spacer"></div>
      <div class="stack">
        <div class="pass-title">
          <p class="english eyebrow">ICEBERG PASS</p>
          <h1>冰山探索通行码</h1>
        </div>
        <p class="subcopy">每一座冰山，<br>都有一把通往内在的钥匙。</p>
        <div class="iceberg-wrap success-orbit">${icebergMarkup()}</div>
        <p class="soft">请输入随产品获得的<br>6位数字通行码。</p>
        <input id="passInput" class="pass-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="one-time-code" aria-label="冰山探索通行码">
        <button id="digitRow" class="digit-row" type="button" aria-label="输入冰山探索通行码">
          ${Array.from({ length: 6 }, (_, i) => `<span class="digit-box empty" data-digit="${i}"></span>`).join("")}
        </button>
        <div id="passMessage" class="pass-error" aria-live="polite"></div>
        <button id="openButton" class="primary" type="button">开启冰山探索</button>
        <p class="tiny">通行码随实体产品提供。</p>
      </div>
      <div class="spacer"></div>
    </section>
  `);

  const input = document.querySelector("#passInput");
  document.querySelector("#digitRow").addEventListener("click", focusPassInput);
  document.querySelector("#openButton").addEventListener("click", () => tryPasscode(false));
  input.addEventListener("input", () => {
    passValue = input.value.replace(/\D/g, "").slice(0, 6);
    input.value = passValue;
    paintDigits();
    if (passValue.length === 6) tryPasscode(true);
  });
  setTimeout(focusPassInput, 240);
}

function paintDigits() {
  document.querySelectorAll(".digit-box").forEach((box, index) => {
    const value = passValue[index] || "";
    box.textContent = value;
    box.classList.toggle("empty", !value);
  });
}

function tryPasscode(auto) {
  if (passValue.length < 6) {
    if (!auto) showPassError("请输入完整的6位数字通行码。");
    return;
  }

  if (validatePasscode(passValue)) {
    activateAccess(passValue);
    document.querySelector("#digitRow")?.classList.add("fade-out");
    document.querySelector(".iceberg-wrap")?.classList.add("success-orbit");
    setTimeout(renderPassSuccess, prefersReducedMotion ? 20 : 800);
    return;
  }

  showPassError("这个通行码似乎没有找到对应的冰山。", "请检查数字是否输入正确，<br>再试一次。");
}

function showPassError(title, detail = "") {
  const row = document.querySelector("#digitRow");
  const message = document.querySelector("#passMessage");
  message.innerHTML = `<strong>${title}</strong>${detail ? `<br><span>${detail}</span>` : ""}<div style="height:10px"></div><button id="retryPass" class="secondary" type="button">重新输入</button>`;
  row.classList.remove("shake");
  void row.offsetWidth;
  row.classList.add("shake");
  document.querySelector("#retryPass").addEventListener("click", () => {
    passValue = "";
    document.querySelector("#passInput").value = "";
    message.innerHTML = "";
    paintDigits();
    focusPassInput();
  });
}

function renderPassSuccess() {
  screen("", `
    <section class="screen center">
      <div class="spacer"></div>
      <div class="stack success-copy">
        <div class="iceberg-wrap success-orbit">${icebergMarkup()}</div>
        <p class="eyebrow">ICEBERG PASS</p>
        <h2>通行码验证成功</h2>
        <p class="subcopy">欢迎来到冰山之下。</p>
        <p class="soft">愿这一次探索，<br>让你更靠近真实的自己。</p>
      </div>
      <div class="spacer"></div>
    </section>
  `);
  setTimeout(renderHome, prefersReducedMotion ? 20 : 1800);
}

function renderHome() {
  screen("", `
    <section class="screen">
      <div class="topbar">
        <p class="eyebrow">ICEBERG EXPLORATION</p>
        <button class="ghost-icon" id="recordsBtn" type="button" aria-label="我的探索">○</button>
      </div>
      <div class="stack center" style="margin-top: 18px;">
        <h1>看见冰山下的我</h1>
        <p class="soft">萨提亚冰山探索卡</p>
        <p class="subcopy">每一次向内探索，<br>都是靠近真实自己的旅程。</p>
        <div class="iceberg-wrap">${icebergMarkup()}</div>
        <p class="subcopy">带着今天发生的一件事，<br>轻轻触碰冰山。</p>
      </div>
      <div class="spacer"></div>
      <div class="split-actions">
        <button class="secondary" id="aboutBtn" type="button">关于冰山探索</button>
      </div>
    </section>
  `);
  document.querySelector(".iceberg-button").addEventListener("click", () => {
    const button = document.querySelector(".iceberg-button");
    button.classList.add("pressed");
    setTimeout(renderEventEntry, prefersReducedMotion ? 20 : 760);
  });
  document.querySelector("#recordsBtn").addEventListener("click", renderRecords);
  document.querySelector("#aboutBtn").addEventListener("click", renderAbout);
}

function renderEventEntry() {
  screen("", `
    <section class="screen">
      <div class="topbar">
        <button class="ghost-icon" type="button" id="backHome" aria-label="返回">‹</button>
      </div>
      <div class="stack" style="margin-top: 34px;">
        <h2>此刻，什么正在触动你？</h2>
        <textarea id="eventText" class="field" placeholder="用一句话写下今天发生的事……">${escapeHtml(getEventText())}</textarea>
        <p class="tiny">例如：“今天他说了一句话，让我很难受。”</p>
      </div>
      <div class="spacer"></div>
      <div class="bottom-actions">
        <button class="primary" id="startModes" type="button">带着这件事，开始探索</button>
        <p class="tiny center">暂时不想写，也可以直接开始。</p>
      </div>
    </section>
  `);
  document.querySelector("#backHome").addEventListener("click", renderHome);
  document.querySelector("#startModes").addEventListener("click", () => {
    saveEventText(document.querySelector("#eventText").value.trim());
    renderModes();
  });
}

function renderModes() {
  screen("", `
    <section class="screen">
      <div class="topbar">
        <button class="ghost-icon" type="button" id="backEvent" aria-label="返回">‹</button>
      </div>
      <div class="stack" style="margin-top: 26px;">
        <h2>选择今天的探索方式</h2>
        <button class="mode-card" id="drawMode" type="button">
          <h3>今日一抽</h3>
          <p class="subcopy">今天，<br>只看见自己一点点。</p>
          <span class="time">约1-3分钟</span>
          <span class="primary">抽一张</span>
        </button>
        <button class="mode-card" id="journeyMode" type="button">
          <h3>完整冰山探索</h3>
          <p class="subcopy">从水面之上，<br>一层层回到自己。</p>
          <span class="time">约10-15分钟</span>
          <span class="primary">开始探索</span>
        </button>
      </div>
    </section>
  `);
  document.querySelector("#backEvent").addEventListener("click", renderEventEntry);
  document.querySelector("#drawMode").addEventListener("click", renderDrawBack);
  document.querySelector("#journeyMode").addEventListener("click", startJourney);
}

function renderDrawBack() {
  drawCard = randomCard();
  screen("", `
    <section class="screen center">
      <div class="topbar" style="width:100%;">
        <button class="ghost-icon" type="button" id="backModes" aria-label="返回">‹</button>
      </div>
      <div class="card-back" id="flipCard" role="button" tabindex="0">
        <div class="iceberg-wrap" style="min-height:210px;">${icebergMarkup()}</div>
        <h2>看见冰山下的我</h2>
        <p class="soft">轻触卡牌</p>
      </div>
    </section>
  `);
  document.querySelector("#backModes").addEventListener("click", renderModes);
  const flipCard = document.querySelector("#flipCard");
  flipCard.addEventListener("click", () => renderDrawCard(drawCard));
  flipCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") renderDrawCard(drawCard);
  });
}

function renderDrawCard(card) {
  screen(`page-${card.layer}`, `
    <section class="screen">
      <div class="topbar">
        <button class="ghost-icon" type="button" id="backDraw" aria-label="返回">‹</button>
      </div>
      ${cardMarkup(card, "flip-in")}
      <div class="bottom-actions">
        <button class="primary" id="answerCard" type="button">写下我的答案</button>
      </div>
    </section>
  `);
  document.querySelector("#backDraw").addEventListener("click", renderDrawBack);
  document.querySelector("#answerCard").addEventListener("click", () => openAnswerSheet({
    title: card.title,
    onSave: (answer) => {
      saveRecord({
        type: "今日一抽",
        mode: "draw",
        event: getEventText(),
        card,
        answer
      });
      toast("已经为此刻的自己留下记录 ♡");
    }
  }));
}

function startJourney() {
  journeyIndex = 0;
  journeyAnswers = {};
  journeyCards = JOURNEY_LAYERS.map((layer) => randomCardByLayer(layer.key));
  renderJourney();
}

function renderJourney(leaving = false) {
  const card = journeyCards[journeyIndex];
  const layer = JOURNEY_LAYERS[journeyIndex];
  screen(`page-${card.layer}`, `
    <section class="screen">
      <div class="topbar">
        <button class="ghost-icon" type="button" id="backModes" aria-label="返回">‹</button>
      </div>
      <div class="journey-progress">
        <div class="depth"><span class="depth-dot" style="top:${9 + journeyIndex * 13.6}%"></span></div>
        <div>
          <p class="eyebrow">${journeyIndex + 1} / 7</p>
          <h2>${layer.name}</h2>
        </div>
      </div>
      ${cardMarkup(card, `journey-card${leaving ? " leaving" : ""}`)}
      <div class="bottom-actions">
        <button class="secondary" id="saveLayer" type="button">写下这一层</button>
        <button class="primary" id="nextLayer" type="button">${journeyIndex === 6 ? "进入新的选择" : "继续向下一层 ↓"}</button>
      </div>
    </section>
  `);
  document.querySelector("#backModes").addEventListener("click", renderModes);
  document.querySelector("#saveLayer").addEventListener("click", () => openAnswerSheet({
    title: card.title,
    onSave: (answer) => {
      journeyAnswers[card.layer] = { card, answer };
      toast("这一层已经被温柔地保存。");
    }
  }));
  document.querySelector("#nextLayer").addEventListener("click", () => {
    if (journeyIndex === 6) {
      renderFinalReflection();
      return;
    }
    document.querySelector(".journey-card").classList.add("leaving");
    setTimeout(() => {
      journeyIndex += 1;
      renderJourney();
    }, prefersReducedMotion ? 20 : 520);
  });
}

function cardMarkup(card, extraClass = "") {
  return `
    <article class="card-face ${extraClass}">
      <p class="card-meta">NO. ${String(card.id).padStart(2, "0")} · ${card.layerName}</p>
      <h2 class="card-title">${card.title}</h2>
      <p class="soft">${card.healingText}</p>
      <p class="question">${card.question}</p>
      <p class="section-label">再向下一点</p>
      <p class="subcopy">${card.deeperQuestion}</p>
      <p class="section-label">给自己一个小行动</p>
      <p class="subcopy">${card.microAction}</p>
    </article>
  `;
}

function renderFinalReflection() {
  screen("page-self", `
    <section class="screen">
      <div class="stack" style="margin-top: 34px;">
        <p class="subcopy">你已经来到冰山更深的地方。</p>
        <h2>现在，不急着改变什么。</h2>
        <p class="soft">只是问问自己——</p>
        <div class="final-fields">
          <textarea class="answer-area" data-final="seen" placeholder="这一次，我看见了自己什么？"></textarea>
          <textarea class="answer-area" data-final="release" placeholder="有什么，是我愿意慢慢放下的？"></textarea>
          <textarea class="answer-area" data-final="choice" placeholder="今天，我愿意为自己做的一个小选择是什么？"></textarea>
        </div>
      </div>
      <div class="bottom-actions">
        <button class="primary" id="finishJourney" type="button">完成我的冰山探索</button>
      </div>
    </section>
  `);
  document.querySelector("#finishJourney").addEventListener("click", () => {
    const answers = Object.fromEntries(Array.from(document.querySelectorAll("[data-final]")).map((el) => [el.dataset.final, el.value.trim()]));
    saveRecord({
      type: "完整冰山探索",
      mode: "journey",
      event: getEventText(),
      layers: journeyAnswers,
      final: answers
    });
    renderComplete(answers.choice);
  });
}

function renderComplete(choice = "") {
  const today = new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("/", ".");
  screen("page-self", `
    <section class="screen center">
      <div class="final-card">
        <p class="soft">今天，</p>
        <h2>我看见了自己。</h2>
        <div class="iceberg-wrap" style="min-height:190px;">${icebergMarkup()}</div>
        <p class="tiny">${today}</p>
        <p class="question">${escapeHtml(choice || "我愿意慢慢靠近真实的自己。")}</p>
        <p class="subcopy">我看见我。<br>我接纳我。<br>我选择我。</p>
        <p class="eyebrow">A DEEPER YOU</p>
      </div>
      <div class="spacer"></div>
      <div class="split-actions" style="width:100%;">
        <button class="primary" id="saveExplore" type="button">保存这次探索</button>
        <button class="secondary" id="restart" type="button">重新开始</button>
      </div>
    </section>
  `);
  document.querySelector("#saveExplore").addEventListener("click", () => toast("这次探索已经保存在本机。"));
  document.querySelector("#restart").addEventListener("click", renderHome);
}

function openAnswerSheet({ title, onSave }) {
  const backdrop = document.createElement("div");
  backdrop.className = "sheet-backdrop";
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.innerHTML = `
    <h2>${title}</h2>
    <textarea id="sheetAnswer" class="answer-area" placeholder="把此刻浮现的话写下来……"></textarea>
    <div class="split-actions">
      <button id="saveSheet" class="primary" type="button">保存</button>
      <button id="closeSheet" class="secondary" type="button">稍后再写</button>
    </div>
  `;
  document.body.append(backdrop, sheet);
  const close = () => {
    backdrop.remove();
    sheet.remove();
  };
  document.querySelector("#closeSheet").addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.querySelector("#saveSheet").addEventListener("click", () => {
    onSave(document.querySelector("#sheetAnswer").value.trim());
    close();
  });
  document.querySelector("#sheetAnswer").focus();
}

function renderRecords() {
  const records = getRecords();
  screen("", `
    <section class="screen">
      <div class="topbar">
        <button class="ghost-icon" id="backHome" type="button" aria-label="返回">‹</button>
        <button class="ghost-icon" id="settings" type="button" aria-label="设置">⌁</button>
      </div>
      <div class="stack" style="margin-top: 22px;">
        <h2>我的探索</h2>
        <p class="tiny">你的探索记录默认仅保存在这台设备中。</p>
        <div class="record-list">
          ${records.length ? records.map(recordButton).join("") : `<p class="soft">这里还没有记录。等你准备好，冰山一直在。</p>`}
        </div>
      </div>
    </section>
  `);
  document.querySelector("#backHome").addEventListener("click", renderHome);
  document.querySelector("#settings").addEventListener("click", renderSettings);
  document.querySelectorAll("[data-record]").forEach((button) => {
    button.addEventListener("click", () => renderRecordDetail(records.find((record) => record.id === button.dataset.record)));
  });
}

function recordButton(record) {
  const date = formatDate(record.date);
  const label = record.mode === "draw" ? `今日一抽 · ${record.card.layerName}` : "完整冰山探索";
  return `<button class="record-card" type="button" data-record="${record.id}"><strong>${date}</strong><br><span class="soft">${label}</span></button>`;
}

function renderRecordDetail(record) {
  if (!record) return renderRecords();
  const body = record.mode === "draw"
    ? `<h2>${record.card.title}</h2><p class="question">${record.card.question}</p><p class="subcopy">${escapeHtml(record.answer || "没有写下答案。")}</p>`
    : `<h2>完整冰山探索</h2><p class="question">${escapeHtml(record.final?.choice || "今天，我愿意为自己做一个小选择。")}</p>`;
  screen("", `
    <section class="screen">
      <div class="topbar"><button class="ghost-icon" id="backRecords" type="button" aria-label="返回">‹</button></div>
      <article class="about-panel" style="margin-top: 24px;">
        <p class="eyebrow">${formatDate(record.date)}</p>
        ${body}
        ${record.event ? `<p class="section-label">触动我的事件</p><p class="subcopy">${escapeHtml(record.event)}</p>` : ""}
      </article>
    </section>
  `);
  document.querySelector("#backRecords").addEventListener("click", renderRecords);
}

function renderSettings() {
  screen("", `
    <section class="screen">
      <div class="topbar"><button class="ghost-icon" id="backRecords" type="button" aria-label="返回">‹</button></div>
      <div class="stack" style="margin-top: 28px;">
        <h2>设置</h2>
        <button class="danger-soft" id="clearRecords" type="button">清除我的全部记录</button>
        <p class="tiny">只清除探索记录，不会取消本机的通行权限。</p>
        <button class="secondary" id="clearAccess" type="button">重新验证通行码</button>
        <p class="tiny">这会清除本机的通行码授权状态，下次进入需要重新输入冰山探索通行码。</p>
      </div>
    </section>
  `);
  document.querySelector("#backRecords").addEventListener("click", renderRecords);
  document.querySelector("#clearRecords").addEventListener("click", () => {
    clearRecords();
    toast("探索记录已清除，通行权限仍然保留。");
  });
  document.querySelector("#clearAccess").addEventListener("click", () => {
    clearAccess();
    toast("本机通行权限已清除。");
    setTimeout(renderPass, 850);
  });
}

function renderAbout() {
  screen("", `
    <section class="screen">
      <div class="topbar"><button class="ghost-icon" id="backHome" type="button" aria-label="返回">‹</button></div>
      <article class="about-panel" style="margin-top: 28px;">
        <h2>关于冰山探索</h2>
        <p class="subcopy">本工具用于自我觉察、教练式反思与个人成长，不用于心理疾病诊断，也不能替代心理治疗、医疗服务或危机支持。</p>
        <p class="subcopy">如果你正处于严重心理危机，请及时寻求当地专业支持或紧急服务。</p>
        <p class="tiny">所有探索记录默认仅保存在这台设备中。</p>
      </article>
    </section>
  `);
  document.querySelector("#backHome").addEventListener("click", renderHome);
}

function toast(message) {
  const note = document.createElement("div");
  note.className = "sheet";
  note.style.minHeight = "auto";
  note.style.textAlign = "center";
  note.innerHTML = `<p class="subcopy" style="margin:0;">${message}</p>`;
  document.body.append(note);
  setTimeout(() => note.remove(), 1500);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("/", ".");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.IcebergPass = {
  validatePasscode,
  databaseTotal: ICEBERG_PASSCODES.length
};

if (hasAccess()) renderHome();
else renderPass();
