/* Interactive GMM metabolic maps — vanilla JS replacement for the original
 * jQuery/d3/Bootstrap implementation. Module and hierarchy details are read
 * from gmm-data.js instead of being fetched from absolute server paths. */
(function () {
  "use strict";
  var MODULES = window.GMM_MODULES || {};
  var HIER = window.GMM_HIERARCHY || {};
  var HTITLES = window.GMM_HIERARCHY_TITLES || {};

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- pan & zoom via viewBox ----------
  var maps = [];
  function panZoom(container) {
    var svg = container.querySelector("svg");
    if (!svg) return null;
    svg.removeAttribute("width"); svg.removeAttribute("height");
    var vb0 = svg.getAttribute("viewBox").split(/[\s,]+/).map(Number);
    var vb = vb0.slice();
    var moved = false, start = null;
    function apply() { svg.setAttribute("viewBox", vb.join(" ")); }
    function toSvg(evt) {
      var r = svg.getBoundingClientRect();
      // preserveAspectRatio xMinYMin meet
      var scale = Math.max(vb[2] / r.width, vb[3] / r.height);
      return { x: vb[0] + (evt.clientX - r.left) * scale, y: vb[1] + (evt.clientY - r.top) * scale, scale: scale };
    }
    container.addEventListener("wheel", function (e) {
      e.preventDefault();
      var p = toSvg(e);
      var f = e.deltaY < 0 ? 0.85 : 1 / 0.85;
      var w = vb[2] * f, h = vb[3] * f;
      if (w > vb0[2] * 1.5 || w < vb0[2] / 12) return;
      vb = [p.x - (p.x - vb[0]) * f, p.y - (p.y - vb[1]) * f, w, h];
      apply();
    }, { passive: false });
    container.addEventListener("pointerdown", function (e) {
      start = { x: e.clientX, y: e.clientY, vb: vb.slice(), scale: toSvg(e).scale };
      moved = false;
    });
    window.addEventListener("pointermove", function (e) {
      if (!start) return;
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      moved = true; container.classList.add("dragging");
      vb[0] = start.vb[0] - dx * start.scale; vb[1] = start.vb[1] - dy * start.scale; apply();
    });
    window.addEventListener("pointerup", function () { start = null; container.classList.remove("dragging"); });
    // suppress clicks that were drags
    container.addEventListener("click", function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    return { reset: function () { vb = vb0.slice(); apply(); } };
  }

  // ---------- module map ----------
  var modInfo = document.getElementById("module-info");
  document.querySelectorAll('#map-module [id^="MF"]').forEach(function (el) {
    var sw = parseFloat(el.getAttribute("stroke-width") || (el.style && el.style.strokeWidth) || "0");
    el.addEventListener("mouseenter", function () { if (sw) el.setAttribute("stroke-width", sw * 2); });
    el.addEventListener("mouseleave", function () { if (sw) el.setAttribute("stroke-width", sw); });
    el.addEventListener("click", function () {
      var m = MODULES[el.id];
      if (!m) { modInfo.innerHTML = "<p>No details for " + esc(el.id) + ".</p>"; return; }
      var steps = m.steps.map(function (alts) {
        return "<li>" + alts.map(function (k) { return '<span class="ko">' + esc(k) + "</span>"; }).join(" ") + "</li>";
      }).join("");
      modInfo.innerHTML = "<h3>" + esc(el.id) + "</h3><p>" + esc(m.name) + "</p>" +
        "<p class=\"hint\">Orthologs per reaction step (alternatives on one line):</p><ol>" + steps + "</ol>";
    });
  });

  // ---------- hierarchy map ----------
  var eggInfo = document.getElementById("egg-info");
  document.querySelectorAll("#egg-elements > g").forEach(function (g) {
    g.addEventListener("click", function () {
      var rows = HIER[g.id];
      if (!rows) return;
      eggInfo.innerHTML = "<h3>" + esc(HTITLES[g.id] || "Modules") + "</h3><table>" +
        rows.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table>";
    });
  });

  // ---------- tabs ----------
  var pz = { module: panZoom(document.getElementById("map-module")), hierarchy: panZoom(document.getElementById("map-hierarchy")) };
  var current = "module";
  document.querySelectorAll('[role="tab"]').forEach(function (b) {
    b.addEventListener("click", function () {
      current = b.getAttribute("data-tab");
      document.querySelectorAll('[role="tab"]').forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
      document.getElementById("tab-module").hidden = current !== "module";
      document.getElementById("tab-hierarchy").hidden = current !== "hierarchy";
    });
  });
  document.getElementById("reset-map").addEventListener("click", function () { if (pz[current]) pz[current].reset(); });
})();
