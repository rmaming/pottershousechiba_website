(function () {
  "use strict";

  var LANG_KEY = "phc-lang";

  function applyLanguage(lang) {
    var dict = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = dict[key];
      if (value === undefined) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.documentElement.setAttribute("lang", lang === "ja" ? "ja" : "en");
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function initLangToggle() {
    var saved = localStorage.getItem(LANG_KEY) || "en";
    applyLanguage(saved);

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        localStorage.setItem(LANG_KEY, lang);
        applyLanguage(lang);
      });
    });
  }

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  function initGalleryFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll("[data-category]");
    if (!buttons.length || !items.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (item) {
          var show = cat === "all" || item.getAttribute("data-category") === cat;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initGalleryFilter();
    initLangToggle();
  });
})();
