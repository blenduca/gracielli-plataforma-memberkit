/* =============================================================
 * ARTES NA IDENTIDADE DO CLIENTE — certificado (frente/verso) e capas.
 * IMUTÁVEL: layout das peças. Cores, fonte, logos e textos vêm de
 * platform.config.js e content.config.js (os mesmos [CLIENTE] da plataforma).
 *
 * Usado por:
 *   kit/index.html            → pré-visualiza e exporta PNG (capas + certificado)
 *   #/certificado/:slug       → certificado do aluno dentro da plataforma
 *
 * Certificado segue o padrão da Memberkit:
 *   1056 x 816 px (Carta paisagem a 96 dpi), arte com os textos FIXOS
 *   (curso, carga horária, instrutor, assinatura) e ESPAÇO LIVRE para os
 *   campos que a Memberkit insere: nome, datas, CPF/CNPJ e QR Code.
 * ============================================================= */

import { esc, absUrl } from "./util.js";
import { flatLessons } from "./content.js";

export const SIZES = {
  certificate: [1056, 816],
  banner: [1440, 369],
  cover: [432, 216],
  hero: [1152, 320],
  module: [300, 420],
  thumb: [120, 68],
};

/* Mapa dos campos dinâmicos (px na imagem 1056x816) — é onde arrastar
   cada campo no editor de certificados da Memberkit. */
export const CERT_FIELDS = {
  name: { label: "Nome do aluno", x: 148, y: 298, w: 760, h: 72, font: "Allura ou Helvetica", size: "40–48px" },
  startDate: { label: "Data de início", x: 0, y: 538, w: 180, h: 28, font: "Helvetica", size: "15px" },
  endDate: { label: "Data de conclusão", x: 0, y: 538, w: 180, h: 28, font: "Helvetica", size: "15px" },
  document: { label: "CPF/CNPJ", x: 0, y: 538, w: 180, h: 28, font: "Helvetica", size: "15px" },
  qrCode: { label: "QR Code", x: 852, y: 594, w: 112, h: 112, font: "—", size: "112px" },
};

const cfg = () => window.PLATFORM_CONFIG;

export function certSettings(course) {
  const base = cfg().certificate || {};
  const own = course?.certificate || {};
  const fields = { startDate: false, endDate: true, document: false, qrCode: true, ...(base.fields || {}) };
  return {
    title: base.title || "Certificado",
    subtitle: base.subtitle || "de conclusão",
    background: base.background || "#FFFFFF",
    instructor: own.instructor || base.instructor || "",
    instructorRole: own.instructorRole || base.instructorRole || "",
    signature: own.signature || base.signature || "",
    hours: own.hours || courseHours(course),
    back: base.back !== false,
    fields,
  };
}

function courseHours(course) {
  const secs = flatLessons(course).reduce((acc, l) => {
    const parts = String(l.duration || "").split(":").map(Number);
    return acc + (parts.length > 1 ? parts.reduce((a, n) => a * 60 + (n || 0), 0) : 0);
  }, 0);
  return Math.max(1, Math.ceil(secs / 3600));
}

/* posições X dos campos da linha de datas/documento (centralizados) */
function rowFields(fields) {
  const keys = ["startDate", "endDate", "document"].filter((k) => fields[k]);
  const w = 180, gap = 32;
  const total = keys.length * w + (keys.length - 1) * gap;
  let x = (1056 - total) / 2;
  return keys.map((k) => {
    const f = { key: k, ...CERT_FIELDS[k], x };
    x += w + gap;
    return f;
  });
}

/* layout completo dos campos dinâmicos ativos (para o mapa do kit) */
export function certFieldMap(course) {
  const s = certSettings(course);
  const out = [{ key: "name", ...CERT_FIELDS.name }, ...rowFields(s.fields)];
  if (s.fields.qrCode) out.push({ key: "qrCode", ...CERT_FIELDS.qrCode });
  return out;
}

const logo = (dark = false) => {
  const l = cfg().brand.logo || {};
  return esc(absUrl((dark && l.srcDark) || l.src));
};

const box = (x, y, w, h, extra = "") => `left:${x}px;top:${y}px;width:${w}px;height:${h}px;${extra}`;

/* ---------- certificado: frente ----------
   mode: "template" (arte para subir na Memberkit, campos vazios)
         "guides"   (arte + caixas tracejadas mostrando onde vão os campos)
         "filled"   (preenchido com os dados do aluno — usado na plataforma) */
export function certificateFront(course, { mode = "template", student = {} } = {}) {
  const s = certSettings(course);
  const brand = cfg().brand;
  const row = rowFields(s.fields);
  const guide = (f, text) =>
    mode === "guides" ? `<div class="art-guide" style="${box(f.x, f.y, f.w, f.h)}"><span>${esc(text || f.label)}</span></div>` : "";

  const filledRow = (f) => {
    if (mode !== "filled") return "";
    const v = { startDate: student.startDate, endDate: student.endDate, document: student.document }[f.key];
    return v ? `<div class="cert-slot-value" style="${box(f.x, f.y, f.w, f.h)}">${esc(v)}</div>` : "";
  };

  return `<div class="art art-cert" style="width:1056px;height:816px;background:${esc(s.background)}">
    <div class="cert-band"></div>
    <div class="cert-corner"></div>
    <div class="cert-frame"></div>

    <img class="cert-logo" src="${logo()}" alt="${esc(brand.name)}">
    <p class="cert-eyebrow">${esc(s.title)}</p>
    <p class="cert-title">${esc(s.subtitle)}</p>
    <p class="cert-lead">Certificamos que</p>

    ${mode === "filled" ? `<div class="cert-name" style="${box(148, 298, 760, 72)}">${esc(student.name || "")}</div>` : ""}
    ${guide({ ...CERT_FIELDS.name }, "NOME DO ALUNO — campo dinâmico")}
    <div class="cert-name-line"></div>

    <p class="cert-body">concluiu com êxito o curso <strong>${esc(course.title)}</strong>,
      com carga horária de <strong>${s.hours} ${s.hours === 1 ? "hora" : "horas"}</strong>.</p>

    ${row.map((f) => `<p class="cert-label" style="left:${f.x}px;width:${f.w}px">${esc(f.label)}</p>${guide(f)}${filledRow(f)}<div class="cert-slot-line" style="left:${f.x}px;width:${f.w}px"></div>`).join("")}

    <div class="cert-sign">
      ${s.signature ? `<img src="${esc(absUrl(s.signature))}" alt="">` : ""}
      <div class="cert-sign-line"></div>
      <p class="cert-sign-name">${esc(s.instructor || brand.name)}</p>
      ${s.instructorRole ? `<p class="cert-sign-role">${esc(s.instructorRole)}</p>` : ""}
    </div>

    ${s.fields.qrCode && mode !== "filled"
      ? `${guide(CERT_FIELDS.qrCode, "QR CODE")}<p class="cert-qr-label">Valide este certificado</p>`
      : ""}
    <p class="cert-footer">${esc(brand.name)}</p>
  </div>`;
}

/* ---------- certificado: verso (conteúdo programático) ---------- */
export function certificateBack(course) {
  const s = certSettings(course);
  const mods = course.modules || [];
  const perModule = mods.length > 6 ? 3 : 5;
  return `<div class="art art-cert" style="width:1056px;height:816px;background:${esc(s.background)}">
    <div class="cert-band"></div>
    <div class="cert-corner"></div>
    <div class="cert-frame"></div>
    <p class="cert-eyebrow" style="top:84px">Conteúdo programático</p>
    <p class="cert-back-title">${esc(course.title)}</p>
    <div class="cert-back-grid ${mods.length > 4 ? "cols-3" : ""}">
      ${mods
        .slice(0, 9)
        .map((m, i) => {
          const ls = m.lessons || [];
          return `<div class="cert-back-mod">
            <p class="cert-back-mod-title"><span>${String(i + 1).padStart(2, "0")}</span>${esc(m.title)}</p>
            <ul>${ls.slice(0, perModule).map((l) => `<li>${esc(l.title)}</li>`).join("")}
              ${ls.length > perModule ? `<li class="more">+ ${ls.length - perModule} ${ls.length - perModule === 1 ? "aula" : "aulas"}</li>` : ""}</ul>
          </div>`;
        })
        .join("")}
    </div>
    <p class="cert-back-hours">Carga horária total: <strong>${s.hours} ${s.hours === 1 ? "hora" : "horas"}</strong></p>
    <img class="cert-back-logo" src="${logo()}" alt="">
  </div>`;
}

/* ---------- capas ---------- */
const pad = (n) => String(n).padStart(2, "0");

export function coverArt(course) {
  return `<div class="art art-dark art-cover" style="width:432px;height:216px">
    <div class="art-glow" style="width:260px;height:260px;right:-90px;bottom:-130px"></div>
    <span class="art-accent" style="left:24px;top:26px"></span>
    <img class="art-logo" src="${logo(true)}" alt="" style="right:24px;top:20px;height:20px">
    <div class="art-cover-text">
      <p class="art-title" style="font-size:${course.title.length > 28 ? 24 : 30}px">${esc(course.title)}</p>
      ${course.subtitle ? `<p class="art-sub">${esc(course.subtitle)}</p>` : ""}
    </div>
  </div>`;
}

export function heroArt(course) {
  return `<div class="art art-dark art-hero" style="width:1152px;height:320px">
    <div class="art-glow" style="width:520px;height:520px;right:-120px;top:-100px"></div>
    <div class="art-ring" style="width:300px;height:300px;right:90px;top:10px"></div>
    <div class="art-ring" style="width:190px;height:190px;right:145px;top:65px;opacity:.5"></div>
    <img class="art-logo" src="${logo(true)}" alt="" style="right:150px;top:138px;height:44px;width:180px;object-fit:contain">
  </div>`;
}

export function moduleArt(course, mod, index) {
  return `<div class="art art-dark art-module" style="width:300px;height:420px">
    <div class="art-glow" style="width:320px;height:320px;left:-120px;top:-120px"></div>
    <p class="art-module-num">${pad(index + 1)}</p>
    <p class="art-eyebrow" style="left:24px;top:28px">Módulo ${pad(index + 1)}</p>
    <div class="art-module-text">
      <span class="art-accent" style="position:static;display:block;margin-bottom:14px"></span>
      <p class="art-title" style="font-size:${mod.title.length > 22 ? 24 : 28}px">${esc(mod.title)}</p>
      <p class="art-sub">${esc(course.title)}</p>
    </div>
  </div>`;
}

export function thumbArt(lesson, index) {
  return `<div class="art art-dark art-thumb" style="width:120px;height:68px">
    <div class="art-glow" style="width:120px;height:120px;right:-50px;bottom:-60px"></div>
    <p class="art-thumb-num">${pad(index + 1)}</p>
    <svg class="art-thumb-play" viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
  </div>`;
}

export function bannerArt(banner, index) {
  const b = cfg().brand;
  const title = banner.title || banner.alt || b.name;
  return `<div class="art art-dark art-banner" style="width:1440px;height:369px">
    <div class="art-glow" style="width:700px;height:700px;right:-160px;top:-200px"></div>
    <div class="art-ring" style="width:360px;height:360px;right:140px;top:4px"></div>
    <img class="art-logo" src="${logo(true)}" alt="" style="right:200px;top:150px;height:64px;width:240px;object-fit:contain">
    <div class="art-banner-text">
      <p class="art-eyebrow" style="position:static">${esc(b.name)}</p>
      <p class="art-title" style="font-size:56px;margin-top:14px">${esc(title)}</p>
      ${banner.subtitle ? `<p class="art-sub" style="font-size:20px;margin-top:12px">${esc(banner.subtitle)}</p>` : ""}
      <span class="art-cta">${esc(banner.cta || "Acessar agora")}</span>
    </div>
  </div>`;
}
