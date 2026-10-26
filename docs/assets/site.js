/* Companion site behaviour — vanilla JS, no external dependencies.
 *
 * Data files live in ../supplementary/ (tracked with Git LFS). GitHub Pages
 * does not serve LFS content, so download links point to GitHub's "raw"
 * endpoint (which resolves LFS objects). When the site is opened from a local
 * checkout (file://) the links are rewritten to the relative path instead.
 */
(function () {
  "use strict";

  function meta(name) {
    var m = document.querySelector('meta[name="' + name + '"]');
    return m ? m.getAttribute("content") : "";
  }

  // ---- Download links ------------------------------------------------------
  var repo = meta("companion:repo");
  var branch = meta("companion:branch") || "main";
  var dataDir = meta("companion:data-dir") || "supplementary";
  var local = location.protocol === "file:" ||
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  document.querySelectorAll("a[data-file]").forEach(function (a) {
    var path = a.getAttribute("data-file");
    a.href = local
      ? "../" + dataDir + "/" + path
      : "https://github.com/" + repo + "/raw/" + branch + "/" + dataDir + "/" + path;
  });

  // ---- Lightbox for figures ------------------------------------------------
  var dlg = document.getElementById("lightbox");
  if (dlg && typeof dlg.showModal === "function") {
    var img = dlg.querySelector("img");
    var title = dlg.querySelector("h3");
    var cap = dlg.querySelector(".lb-cap");
    var pdf = dlg.querySelector("a.lb-pdf");
    document.querySelectorAll("button.thumb").forEach(function (b) {
      b.addEventListener("click", function () {
        var fig = b.closest(".fig");
        img.src = b.getAttribute("data-large");
        img.alt = fig.querySelector("h3").textContent;
        title.textContent = fig.querySelector("h3").textContent;
        cap.textContent = fig.getAttribute("data-caption") || "";
        var src = fig.querySelector("a[data-file]");
        if (src) { pdf.href = src.href; pdf.hidden = false; } else { pdf.hidden = true; }
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
  }

  // ---- Copy BibTeX ---------------------------------------------------------
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.textContent;
      var done = function () {
        var old = btn.textContent; btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = old; }, 1500);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var r = document.createRange(); r.selectNodeContents(target);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        s.removeAllRanges();
      }
    });
  });

  // ---- Highlight current section in navbar ---------------------------------
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && byId[en.target.id]) {
          links.forEach(function (l) { l.classList.remove("active"); });
          byId[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id); if (el) obs.observe(el);
    });
  }
})();
