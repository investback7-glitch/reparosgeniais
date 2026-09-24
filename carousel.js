/* Reparos Geniais — carrossel de serviços (PT + EN)
   Requer config.js carregado ANTES (CONFIG.whatsappNumber, phoneDial, email).
   Monta-se em <div id="rg-carousel"></div>. Idioma vem de <html lang="..."> */
(function () {
  var L = (document.documentElement.lang || "pt").toLowerCase().indexOf("en") === 0 ? "en" : "pt";
  var i = L === "en" ? 0 : 1;

  var T = {
    h1: ["We take care of your home, from a quick fix to a full renovation.", "Cuidamos da sua casa, do reparo pequeno à reforma completa."],
    sub: ["Pick a service below, tell us what's going on and get a free, no-obligation quote.", "Escolha um serviço abaixo, conte-nos o que se passa e receba um orçamento gratuito e sem compromisso."],
    wa: ["Message on WhatsApp", "Chamar no WhatsApp"], call: ["Call now", "Ligar agora"],
    head: ["What do you need help with?", "Do que precisa?"],
    pick: ["Request a quote", "Pedir orçamento"],
    prev: ["Previous", "Anterior"], next: ["Next", "Seguinte"],
    dTitle: ["Tell us more about it", "Conte-nos mais"],
    name: ["Your name (optional)", "O seu nome (opcional)"],
    msg: ["Describe your problem or add a suggestion", "Descreva o problema ou deixe uma sugestão"],
    ph: ["e.g. the tap in the kitchen keeps dripping…", "ex.: a torneira da cozinha está a pingar…"],
    sendWa: ["Send via WhatsApp", "Enviar por WhatsApp"], sendMail: ["Send by email", "Enviar por e-mail"],
    close: ["Close", "Fechar"],
    hi: ["Hello! I'd like a quote for:", "Olá! Gostaria de um orçamento para:"],
    det: ["Details:", "Detalhes:"], nm: ["Name:", "Nome:"], subj: ["Quote request:", "Pedido de orçamento:"]
  };

  // Categorias = serviços do site. Cada item: [inglês, português, emoji]. Para trocar por foto, veja IMG_PATH abaixo.
  var C = [
    { id: "reno", e: "🏠", c: ["#2f4a63", "#1B2A38"], n: ["General renovations", "Reformas em geral"], s: [
      ["Kitchen renovation", "Reforma de cozinha", "🍳"], ["Bathroom renovation", "Reforma de casa de banho", "🛁"],
      ["Interior painting", "Pintura interior", "🎨"], ["Flooring", "Pavimentos", "🪵"],
      ["Full-space renovation", "Remodelação completa", "🏗️"]] },
    { id: "hand", e: "🔧", c: ["#d98e2b", "#8a5610"], n: ["Handyman & odd jobs", "Bricolagem e trabalhos diversos"], s: [
      ["Shelves & picture mounting", "Prateleiras e quadros", "🖼️"], ["Door & hinge adjustment", "Ajuste de portas e dobradiças", "🚪"],
      ["Lock installation & repair", "Fechaduras: instalação e reparo", "🔑"], ["TV & curtain rod mounting", "Suporte de TV e varões", "📺"],
      ["Other small repairs", "Outros pequenos reparos", "🛠️"]] },
    { id: "furn", e: "🪑", c: ["#7a5a3a", "#3f2d1c"], n: ["Furniture assembly", "Montagem de móveis"], s: [
      ["Wardrobes", "Roupeiros", "👔"], ["Kitchen cabinets", "Armários de cozinha", "🗄️"],
      ["Shelving units", "Estantes", "📚"], ["Beds & desks", "Camas e secretárias", "🛏️"]] },
    { id: "appl", e: "🔌", c: ["#3b6d8c", "#1d3a4e"], n: ["Appliance installation", "Instalação de eletrodomésticos"], s: [
      ["Stove & cooktop", "Fogão e placa", "🔥"], ["Washing machine", "Máquina de lavar", "🧺"],
      ["Microwave & oven", "Micro-ondas e forno", "♨️"], ["Air conditioning", "Ar condicionado", "❄️"]] },
    { id: "clean", e: "🧽", c: ["#3d8f8a", "#1e4f4c"], n: ["General cleaning", "Limpezas gerais"], s: [
      ["Full home cleaning", "Limpeza completa", "🏡"], ["Post-renovation clean-up", "Limpeza pós-obra", "🧹"],
      ["Deep cleaning", "Limpeza profunda", "✨"], ["Windows & glass", "Janelas e vidros", "🪟"]] },
    { id: "plum", e: "🚰", c: ["#2b6cb0", "#173e6b"], n: ["Plumbing repairs", "Reparos hidráulicos"], s: [
      ["Leak repair", "Reparo de fugas", "💧"], ["Faucet & valve replacement", "Troca de torneiras e válvulas", "🚿"],
      ["Drain clearing", "Desentupimentos", "🌀"], ["Toilet & sink repair", "Sanita e lavatório", "🚽"]] },
    { id: "mas", e: "🧱", c: ["#a8553c", "#5e2a1b"], n: ["Masonry repairs", "Reparos de alvenaria"], s: [
      ["Cracks & plastering", "Fissuras e rebocos", "🧑‍🔧"], ["Tiling", "Assentamento de azulejos", "🔲"],
      ["Wall repairs", "Reparo de paredes", "🧱"], ["Small civil works", "Pequenas obras civis", "👷"]] }
  ];
  var IMG_PATH = "/img/carousel/"; // opcional: /img/carousel/<id>-<n>.jpg (ex.: reno-1.jpg). Se não existir, usa o degradê.

  var root = document.getElementById("rg-carousel");
  if (!root) return;
  var cfg = window.CONFIG || {};
  var waBase = "https://wa.me/" + (cfg.whatsappNumber || "") + "?text=";

  root.className = "cg"; root.id = "rg-carousel";
  root.innerHTML =
    '<div class="cg-wrap"><div class="cg-intro"><h1>' + T.h1[i] + '</h1><p>' + T.sub[i] + '</p>' +
    '<div class="cg-cta"><a class="cg-btn p" data-wa target="_blank" rel="noopener">💬 ' + T.wa[i] + '</a>' +
    '<a class="cg-btn o" data-tel>📞 ' + T.call[i] + '</a></div></div>' +
    '<h2 class="cg-head">' + T.head[i] + '</h2>' +
    '<div class="cg-tabs-box"><div class="cg-tabs" role="tablist"></div></div>' +
    '<div class="cg-stage"><button class="cg-arrow l" aria-label="' + T.prev[i] + '">‹</button>' +
    '<div class="cg-track" tabindex="-1"></div><button class="cg-arrow r" aria-label="' + T.next[i] + '">›</button>' +
    '<div class="cg-dots"></div></div></div>' +
    '<dialog class="cg-dlg" aria-labelledby="cgT"><form method="dialog" novalidate>' +
    '<button type="button" class="cg-x" aria-label="' + T.close[i] + '">&times;</button>' +
    '<h3 id="cgT">' + T.dTitle[i] + '</h3><span class="cg-chip"></span>' +
    '<label>' + T.name[i] + '<input name="nm" autocomplete="name"></label>' +
    '<label>' + T.msg[i] + '<textarea name="tx" rows="4" placeholder="' + T.ph[i] + '"></textarea></label>' +
    '<div class="row"><button type="button" class="cg-btn p" data-send="wa">💬 ' + T.sendWa[i] + '</button>' +
    '<button type="button" class="cg-btn o" data-send="mail">✉️ ' + T.sendMail[i] + '</button></div></form></dialog>';

  var $ = function (s) { return root.querySelector(s); };
  var tabs = $(".cg-tabs"), track = $(".cg-track"), dots = $(".cg-dots"), dlg = $("dialog");
  var cur = 0, current = null, timer = null, paused = false;
  root.querySelector("[data-wa]").href = waBase + encodeURIComponent(T.hi[i] + " ");
  root.querySelector("[data-tel]").href = "tel:" + (cfg.phoneDial || "");

  C.forEach(function (c, k) {
    var b = document.createElement("button");
    b.className = "cg-tab"; b.setAttribute("role", "tab"); b.type = "button";
    b.innerHTML = '<span class="i" aria-hidden="true">' + c.e + '</span>' + c.n[i];
    b.addEventListener("click", function () { show(k); });
    b.addEventListener("mouseenter", function () { if (matchMedia("(hover:hover)").matches) show(k); });
    tabs.appendChild(b);
  });

  // Trabalhador ilustrado (aparece enquanto não houver foto real em /img/carousel/)
  function worker(n, tool) {
    var S = ["#f1c9a5", "#d9a074", "#8d5a3b", "#f5d5b8"][n % 4], H = ["#2b1d14", "#6b4423", "#1a1a1a", "#a86b2a"][(n + 1) % 4],
        U = ["#1B2A38", "#2f6fb0", "#d98e2b", "#3d8f8a"][(n + 2) % 4], K = ["#f5b301", "#e5e7eb", "#e2572b", "#f5b301"][n % 4], w = n % 3 === 1;
    return '<svg viewBox="0 0 120 130"><path d="M12 130c0-30 18-46 48-46s48 16 48 46z" fill="' + U + '"/><rect x="78" y="100" width="16" height="10" rx="2" fill="#fff" opacity=".35"/>' +
      '<rect x="50" y="68" width="20" height="22" rx="8" fill="' + S + '"/>' + (w ? '<path d="M32 50v34a9 9 0 0 0 9 5V52zM88 50v34a9 9 0 0 1-9 5V52z" fill="' + H + '"/>' : "") +
      '<circle cx="60" cy="50" r="26" fill="' + S + '"/><circle cx="51" cy="56" r="2.6" fill="#222"/><circle cx="69" cy="56" r="2.6" fill="#222"/>' +
      '<path d="M52 66q8 7 16 0" stroke="#7a3f2a" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M32 46a28 28 0 0 1 56 0z" fill="' + K + '"/><rect x="28" y="44" width="64" height="7" rx="3" fill="' + K + '"/></svg><i class="tb">' + tool + '</i>';
  }

  function show(k) {
    cur = k; var c = C[k];
    Array.prototype.forEach.call(tabs.children, function (t, j) { t.setAttribute("aria-selected", j === k); });
    tabs.children[k].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    track.innerHTML = "";
    c.s.forEach(function (s, j) {
      var a = document.createElement("button");
      a.className = "cg-card"; a.type = "button";
      a.style.setProperty("--a", c.c[0]); a.style.setProperty("--b", c.c[1]);
      a.innerHTML = '<span class="em" aria-hidden="true">' + worker(k + j, s[2]) + '</span><span class="lb"><b>' + s[i] + '</b><span>' + T.pick[i] + ' →</span></span>';
      var url = IMG_PATH + c.id + "-" + (j + 1) + ".jpg", im = new Image();
      im.onload = function () { a.style.backgroundImage = 'url("' + url + '")'; a.querySelector(".em").style.display = "none"; };
      im.src = url;
      a.addEventListener("click", function () { openDlg(c.n[i] + " — " + s[i]); });
      track.appendChild(a);
    });
    track.scrollLeft = 0; dotsUpdate();
  }

  function step(dir) {
    var w = track.firstChild ? track.firstChild.offsetWidth + 16 : 240;
    var end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && end) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: dir * w, behavior: "smooth" });
  }
  function dotsUpdate() {
    var n = track.children.length, x = Math.round(track.scrollLeft / ((track.firstChild || {}).offsetWidth + 16 || 1));
    dots.innerHTML = ""; for (var d = 0; d < n; d++) dots.innerHTML += '<i class="' + (d === x ? "on" : "") + '"></i>';
  }
  track.addEventListener("scroll", function () { clearTimeout(track._t); track._t = setTimeout(dotsUpdate, 80); });
  $(".cg-arrow.l").addEventListener("click", function () { step(-1); });
  $(".cg-arrow.r").addEventListener("click", function () { step(1); });

  // Rotação automática: avança os cartões e depois passa à categoria seguinte. Pausa com rato, foco ou toque.
  function tick() {
    if (paused || dlg.open || document.hidden) return;
    var end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (end) show((cur + 1) % C.length); else step(1);
  }
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) timer = setInterval(tick, 3500);
  ["mouseenter", "focusin", "touchstart"].forEach(function (e) { root.addEventListener(e, function () { paused = true; }, { passive: true }); });
  ["mouseleave", "focusout"].forEach(function (e) { root.addEventListener(e, function () { paused = false; }); });
  root.addEventListener("touchend", function () { setTimeout(function () { paused = false; }, 6000); }, { passive: true });

  function openDlg(name) {
    current = name; $(".cg-chip").textContent = name;
    dlg.showModal(); setTimeout(function () { dlg.querySelector("textarea").focus(); }, 60);
  }
  dlg.querySelector(".cg-x").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  function text() {
    var f = dlg.querySelector("form"), tx = f.tx.value.trim(), nm = f.nm.value.trim();
    return T.hi[i] + " *" + current + "*" + (tx ? "\n" + T.det[i] + " " + tx : "") + (nm ? "\n" + T.nm[i] + " " + nm : "");
  }
  dlg.querySelector('[data-send="wa"]').addEventListener("click", function () {
    window.open(waBase + encodeURIComponent(text()), "_blank", "noopener"); dlg.close();
  });
  dlg.querySelector('[data-send="mail"]').addEventListener("click", function () {
    location.href = "mailto:" + (cfg.email || "") + "?subject=" + encodeURIComponent(T.subj[i] + " " + current) + "&body=" + encodeURIComponent(text());
    dlg.close();
  });

  show(0);
})();
