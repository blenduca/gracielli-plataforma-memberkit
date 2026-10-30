/* Kit de artes: pré-visualiza e exporta (PNG/ZIP) as peças do cliente.
   Tudo vem dos configs — para mudar uma peça, mude o config, não este arquivo. */

import { applyRootVars } from "../src/js/theme.js";
import { courses, banners } from "../src/js/content.js";
import { esc, absUrl } from "../src/js/util.js";
import {
  SIZES, certificateFront, certificateBack, certSettings, certFieldMap,
  coverArt, heroArt, moduleArt, thumbArt, bannerArt,
} from "../src/js/arts.js";

const P = window.PLATFORM_CONFIG;
applyRootVars();
document.title = `Kit de artes · ${P.brand.name}`;

const root = document.getElementById("kit");
const stage = document.getElementById("stage");
const pad = (n) => String(n).padStart(2, "0");
const state = { course: courses().find((c) => !c.locked)?.slug || courses()[0]?.slug, guides: true };

/* Cada peça: html (função), tamanho, escala de exportação e caminho sugerido no repo.
   Certificado sai em 1x (a Memberkit exige exatamente 1056x816). */
function piecesFor(course) {
  const list = [];
  const s = certSettings(course);
  list.push({ group: "cert", name: "Certificado — frente", path: `assets/certificates/${course.slug}-certificado-frente.png`, size: SIZES.certificate, scale: 1,
    html: (preview) => certificateFront(course, { mode: preview && state.guides ? "guides" : "template" }) });
  if (s.back) list.push({ group: "cert", name: "Certificado — verso", path: `assets/certificates/${course.slug}-certificado-verso.png`, size: SIZES.certificate, scale: 1,
    html: () => certificateBack(course) });
  list.push({ group: "course", name: "Capa do curso", path: `assets/courses/${course.slug}-capa.png`, size: SIZES.cover, scale: 2, html: () => coverArt(course) });
  list.push({ group: "course", name: "Hero do curso", path: `assets/courses/${course.slug}-hero.png`, size: SIZES.hero, scale: 2, html: () => heroArt(course) });
  (course.modules || []).forEach((m, i) => {
    list.push({ group: "modules", name: m.title, path: `assets/courses/${course.slug}-modulo-${pad(i + 1)}.png`, size: SIZES.module, scale: 2, html: () => moduleArt(course, m, i) });
    (m.lessons || []).forEach((l, j) =>
      list.push({ group: "thumbs", name: l.title, path: `assets/courses/${course.slug}-modulo-${pad(i + 1)}-aula-${pad(j + 1)}.png`, size: SIZES.thumb, scale: 2, html: () => thumbArt(l, j) })
    );
  });
  return list;
}

function bannerPieces() {
  return banners().map((b, i) => ({ group: "banners", name: b.title || b.alt || `Banner ${i + 1}`, path: `assets/banners/banner-${pad(i + 1)}.png`, size: SIZES.banner, scale: 2, html: () => bannerArt(b, i) }));
}

const GROUPS = {
  cert: ["Certificado", "1056 × 816 px — padrão Memberkit (Carta paisagem)"],
  course: ["Capa e hero do curso", "432 × 216 e 1152 × 320 — exportados em 2x"],
  modules: ["Pôsteres dos módulos", "300 × 420 — exportados em 2x"],
  thumbs: ["Miniaturas das aulas", "120 × 68 — exportadas em 2x"],
  banners: ["Banners da vitrine", "1440 × 369 — exportados em 2x"],
};

function card(p, i, previewWidth) {
  const [w, h] = p.size;
  const k = previewWidth / w;
  return `<div class="kit-card" style="width:${previewWidth}px">
    <div class="kit-preview" style="width:${previewWidth}px;height:${Math.round(h * k)}px">
      <div style="width:${w}px;height:${h}px;transform:scale(${k});transform-origin:0 0">${p.html(true)}</div>
    </div>
    <div class="kit-meta"><span><strong style="color:hsl(var(--foreground));font-weight:600">${esc(p.name)}</strong><br><code>${esc(p.path)}</code></span>
      <button type="button" class="btn btn-outline btn-sm" data-png="${i}">PNG</button></div>
  </div>`;
}

const PREVIEW_W = { cert: 560, course: 360, modules: 170, thumbs: 120, banners: 560 };

function render() {
  const course = courses().find((c) => c.slug === state.course);
  const pieces = [...(course ? piecesFor(course) : []), ...bannerPieces()];
  state.pieces = pieces;
  const fields = course ? certFieldMap(course) : [];
  const s = course ? certSettings(course) : {};

  root.innerHTML = `
    <header class="kit-head">
      <div>
        <img src="${esc(absUrl(P.brand.logo?.src))}" alt="${esc(P.brand.name)}">
        <p class="eyebrow">${esc(P.brand.name)}</p>
        <h1 class="h1">Kit de artes</h1>
        <p class="text-muted" style="margin-top:.25rem">Capas, banners e certificado gerados com as cores, a fonte e o logo do <code>platform.config.js</code>.</p>
      </div>
      <div class="kit-controls">
        <select class="form-select" data-course style="width:auto">
          ${courses().map((c) => `<option value="${esc(c.slug)}" ${c.slug === state.course ? "selected" : ""}>${esc(c.title)}</option>`).join("")}
        </select>
        <label><input type="checkbox" data-guides ${state.guides ? "checked" : ""}> Mostrar campos dinâmicos</label>
        <button type="button" class="btn btn-outline" data-zip="course">Baixar curso (.zip)</button>
        <button type="button" class="btn btn-primary" data-zip="all">Baixar tudo (.zip)</button>
      </div>
    </header>

    ${P.isTemplate ? `<div class="surface kit-note"><strong>Template neutro.</strong> As peças saem em cinza até os campos <code>[CLIENTE]</code> do <code>platform.config.js</code> serem preenchidos.</div>` : ""}

    ${Object.entries(GROUPS)
      .map(([g, [title, sub]]) => {
        const items = pieces.map((p, i) => [p, i]).filter(([p]) => p.group === g);
        if (!items.length) return "";
        return `<section class="kit-section">
          <h2 class="h2">${title} <small>${sub}</small></h2>
          ${g === "cert" ? certNote(fields, s) : ""}
          <div class="kit-grid">${items.map(([p, i]) => card(p, i, PREVIEW_W[g])).join("")}</div>
        </section>`;
      })
      .join("")}`;

  root.querySelector("[data-course]").addEventListener("change", (e) => { state.course = e.target.value; render(); });
  root.querySelector("[data-guides]").addEventListener("change", (e) => { state.guides = e.target.checked; render(); });
  root.querySelectorAll("[data-png]").forEach((b) => b.addEventListener("click", () => downloadOne(state.pieces[Number(b.dataset.png)], b)));
  root.querySelectorAll("[data-zip]").forEach((b) => b.addEventListener("click", () => downloadZip(b.dataset.zip, b)));
}

function certNote(fields, s) {
  return `<div class="surface kit-note">
    A arte exportada vai <strong>sem</strong> os campos tracejados — eles só mostram onde arrastar cada campo
    dinâmico no editor de certificados da Memberkit. Fixos na arte: curso, carga horária
    (${s.hours} h), instrutor e assinatura.
    <table class="field-map">
      <thead><tr><th>Campo dinâmico</th><th>Posição (x, y)</th><th>Área</th><th>Fonte sugerida</th><th>Cor</th></tr></thead>
      <tbody>${fields
        .map((f) => `<tr><td>${esc(f.label)}</td><td>${Math.round(f.x)}, ${f.y}</td><td>${f.w} × ${f.h}</td><td>${esc(f.font)} · ${esc(f.size)}</td><td>${f.key === "name" ? esc(P.appearance?.sidebarColors?.primary || "") : f.key === "qrCode" ? "—" : "#262626"}</td></tr>`)
        .join("")}</tbody>
    </table>
  </div>`;
}

/* ---------- exportação ---------- */
async function toBlob(piece) {
  const [w, h] = piece.size;
  stage.innerHTML = piece.html(false);
  const node = stage.firstElementChild;
  await Promise.all([...node.querySelectorAll("img")].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
  await document.fonts.ready;
  const blob = await window.htmlToImage.toBlob(node, { width: w, height: h, pixelRatio: piece.scale, cacheBust: true });
  stage.innerHTML = "";
  return blob;
}

function save(blob, filename) {
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: filename });
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

async function busy(btn, fn) {
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Gerando…";
  try { await fn(); } catch (e) { console.error(e); alert("Não foi possível gerar a imagem: " + e.message); }
  btn.disabled = false;
  btn.textContent = label;
}

function downloadOne(piece, btn) {
  return busy(btn, async () => save(await toBlob(piece), piece.path.split("/").pop()));
}

function downloadZip(scope, btn) {
  return busy(btn, async () => {
    const zip = new window.JSZip();
    const list = scope === "all"
      ? [...courses().filter((c) => !c.locked || c.cover).flatMap(piecesFor), ...bannerPieces()]
      : state.pieces;
    for (const p of list) zip.file(p.path, await toBlob(p));
    zip.file("COMO-USAR.txt", howTo(list));
    const slug = String(P.brand.name).toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    save(await zip.generateAsync({ type: "blob" }), `${slug || "plataforma"}-artes${scope === "all" ? "" : "-" + state.course}.zip`);
  });
}

function howTo(list) {
  return [
    `Kit de artes — ${P.brand.name}`,
    "",
    "1. Extraia este .zip na raiz do repositório (as pastas assets/ já batem com o projeto).",
    "2. Aponte os caminhos no content.config.js (cover, heroImage, modules[].cover, lessons[].thumbnail, banners[].src).",
    "3. Certificado na Memberkit: suba o *-certificado-frente.png (1056x816) e, se usar, o verso;",
    "   arraste os campos dinâmicos para as posições mostradas no kit (nome, datas, CPF/CNPJ, QR Code).",
    "",
    "Arquivos:",
    ...list.map((p) => `  ${p.path}  (${p.size[0]}x${p.size[1]} @${p.scale}x)`),
    "",
  ].join("\n");
}

render();
