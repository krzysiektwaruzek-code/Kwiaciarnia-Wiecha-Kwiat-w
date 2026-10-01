/* Kwiaciarnia Wiecha Kwiatów — logika strony (bez bibliotek) */
(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Dane kontaktowe użyte w komunikacie zastępczym formularza */
  var CONTACT_EMAIL = "wiechakwiatow@gmail.com";
  var CONTACT_PHONE_HREF = "tel:+48726560460";
  var CONTACT_PHONE_LABEL = "+48\u00a0726\u00a0560\u00a0460";

  /* ---------- Rok w stopce ---------- */
  var year = doc.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Nagłówek: tło po przewinięciu (bez nasłuchu scroll) ---------- */
  var header = doc.getElementById("site-header");
  var hero = doc.getElementById("top");
  if (header && hero && "IntersectionObserver" in window) {
    var sentinel = doc.createElement("div");
    sentinel.className = "scroll-sentinel";
    sentinel.setAttribute("aria-hidden", "true");
    hero.insertBefore(sentinel, hero.firstChild);
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- Menu mobilne ---------- */
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.getElementById("site-nav");
  if (toggle && nav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Pojawianie się sekcji (reveal on scroll) ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Podświetlanie aktywnej sekcji w menu ---------- */
  var links = doc.querySelectorAll('.nav__link[href^="#"]');
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        } else if (a.getAttribute("aria-current")) {
          a.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var section = doc.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Mapa ładowana na życzenie ---------- */
  var mapBox = doc.getElementById("map");
  var mapBtn = doc.getElementById("map-load");
  if (mapBox && mapBtn) {
    mapBtn.addEventListener("click", function () {
      var frame = doc.createElement("iframe");
      frame.src = mapBox.getAttribute("data-src");
      frame.title = "Mapa Google: Kwiaciarnia Wiecha Kwiatów, ul. Legionów 107K/2U, Gdynia";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.allowFullscreen = true;
      var placeholder = mapBox.querySelector(".map__placeholder");
      mapBox.appendChild(frame);
      if (placeholder) placeholder.hidden = true;
    });
  }

  /* ---------- Formularz kontaktowy ---------- */
  var form = doc.getElementById("contact-form");
  if (!form) return;

  var topic = doc.getElementById("f-topic");
  var status = doc.getElementById("form-status");
  var topicLabels = {};
  Array.prototype.forEach.call(topic.options, function (o) { topicLabels[o.value] = o.textContent; });

  /* Kliknięcie pozycji oferty ustawia temat formularza */
  doc.querySelectorAll("[data-topic]").forEach(function (a) {
    a.addEventListener("click", function () {
      var value = a.getAttribute("data-topic");
      if (topicLabels[value]) topic.value = value;
    });
  });

  var rules = [
    { id: "f-name", msg: "Podaj imię." },
    { id: "f-email", msg: "Podaj poprawny adres e-mail.", test: function (el) { return el.validity.valid && el.value.trim() !== ""; } },
    { id: "f-message", msg: "Napisz, w czym możemy pomóc." },
    { id: "f-consent", msg: "Zgoda jest wymagana, aby wysłać wiadomość.", test: function (el) { return el.checked; } }
  ];

  function validate() {
    var firstInvalid = null;
    rules.forEach(function (rule) {
      var el = doc.getElementById(rule.id);
      var err = doc.getElementById(rule.id + "-err");
      var ok = rule.test ? rule.test(el) : el.value.trim() !== "";
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      err.textContent = ok ? "" : rule.msg;
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    return firstInvalid;
  }

  rules.forEach(function (rule) {
    var el = doc.getElementById(rule.id);
    el.addEventListener("input", function () {
      if (el.getAttribute("aria-invalid") === "true") validate();
    });
  });

  function showStatus(html, isError) {
    status.innerHTML = html;
    status.classList.toggle("form__status--error", Boolean(isError));
  }

  function mailtoHref(data) {
    var subject = "Zapytanie ze strony – " + (topicLabels[data.topic] || "Inne pytanie");
    var body = data.message + "\n\n—\n" + data.name + (data.phone ? "\nTel.: " + data.phone : "") + "\nE-mail: " + data.email;
    return "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    showStatus("", false);

    var invalid = validate();
    if (invalid) {
      invalid.focus();
      return;
    }

    var fd = new FormData(form);
    if (fd.get("website")) return; /* honeypot – bot */

    var data = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      topic: String(fd.get("topic") || "inne"),
      message: String(fd.get("message") || "").trim()
    };
    var endpoint = form.getAttribute("data-endpoint");

    /* Brak skonfigurowanego endpointu: formularz nic nie wysyła, tylko podpowiada kontakt */
    if (!endpoint) {
      showStatus(
        "Formularz nie jest jeszcze podłączony do wysyłki. Możesz " +
        '<a href="' + mailtoHref(data).replace(/&/g, "&amp;") + '">napisać e-mailem</a> (wiadomość zostanie uzupełniona) lub zadzwonić: ' +
        '<a href="' + CONTACT_PHONE_HREF + '">' + CONTACT_PHONE_LABEL + "</a>.",
        false
      );
      return;
    }

    var submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        showStatus("Dziękujemy! Wiadomość została wysłana.", false);
      })
      .catch(function () {
        showStatus(
          'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń: <a href="' + CONTACT_PHONE_HREF + '">' + CONTACT_PHONE_LABEL + "</a>.",
          true
        );
      })
      .then(function () { submit.disabled = false; });
  });
})();
