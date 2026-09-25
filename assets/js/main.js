(function () {
  // ---------- Mobile nav toggle ----------
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // ---------- Scroll reveal ----------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---------- Project card builder ----------
  function chip(t, accent) {
    return '<span style="--chip:' + accent + '">' + t + "</span>";
  }

  function card(p, expandable, base) {
    base = base || "";
    var imgSrc = base + (p.image || "assets/img/screens/screen.svg");
    var img =
      '<div class="shot"><img src="' + imgSrc +
      '" alt="' + (p.name ? p.name + " screenshot" : "") + '" loading="lazy"></div>';
    var tags = (p.tags || []).map(function (t) { return chip(t, p.accent); }).join("");
    var name = p.url
      ? '<a href="' + p.url + '" target="_blank" rel="noopener">' + p.name + "</a>"
      : p.name;
    var story = "";
    if (expandable) {
      story =
        '<div class="expand"><div><div class="story">' +
        '<div class="sblk"><h4>Problem</h4><p>' + p.problem + "</p></div>" +
        '<div class="sblk"><h4>What I did</h4><p>' + p.did + "</p></div>" +
        '<div class="sblk"><h4>Result</h4><p>' + p.result + "</p></div>" +
        '<p class="client">' + p.client + " · " + p.year + "</p>" +
        '<p class="nub">' + (p.url ? "external link ↗" : "▲ expanded") + "</p>" +
        "</div></div></div>";
    }
    return (
      '<article class="pcard reveal" data-name="' + p.name + '">' +
      img +
      '<div class="body">' +
      '<div class="top"><span class="cat">' + p.cat + '</span><span class="year">' + p.year + "</span></div>" +
      "<h3>" + name + "</h3>" +
      '<p class="tagline">' + p.tagline + "</p>" +
      '<div class="tags">' + tags + "</div>" +
      "</div>" +
      story +
      "</article>"
    );
  }

  // Renders into a grid el. mode: "home" (featured, non-expandable) or "all" (expandable).
  window.renderProjects = function (grid, list, opts) {
    opts = opts || {};
    var expandable = !!opts.expandable;
    var base = opts.base || "";
    var list2 = list.filter(function (p) {
      return !opts.cat || opts.cat === "all" || p.cat === opts.cat;
    });
    if (opts.featured) {
      list2 = list2.filter(function (p) { return p.featured; });
    }
    grid.innerHTML = list2.length
      ? list2.map(function (p) { return card(p, expandable, base); }).join("")
      : '<p class="muted center" style="grid-column:1/-1">Nothing here yet.</p>';
    if (expandable) bindExpand(grid);
    revealAfter(grid);
  };

  function revealAfter(grid) {
    requestAnimationFrame(function () {
      grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    });
  }

  function bindExpand(container) {
    container.querySelectorAll(".pcard").forEach(function (el) {
      el.addEventListener("click", function (e) {
        var isAnchor = e.target.closest("a");
        if (isAnchor) return;
        el.classList.toggle("open");
      });
    });
  }

  window.initProjectFilters = function (filtersEl, grid, list, opts) {
    var cats = ["all", "desktop", "scraping", "automation", "opensource", "hardware", "security"];
    var active = "all";

    function drawChips() {
      var chips = "";
      cats.forEach(function (c) {
        var label = c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1);
        chips += '<button class="' + (c === active ? "active" : "") + '" data-cat="' + c + '">' + label + "</button>";
      });
      filtersEl.innerHTML = chips;
    }

    function apply() {
      window.renderProjects(grid, list, Object.assign({ cat: active }, opts));
    }

    drawChips();
    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      active = btn.getAttribute("data-cat");
      drawChips();
      apply();
    });
    apply();
  };

  // ---------- Year ----------
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- Active nav link ----------
  if (links) {
    var page = location.pathname.split("/").pop() || "index.html";
    links.querySelectorAll("a").forEach(function (a) {
      var href = a.getAttribute("href").split("/").pop();
      if (href === page) a.classList.add("active");
    });
  }
})();
