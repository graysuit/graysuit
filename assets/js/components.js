(function () {
  var NAV = [
    ["index.html", "Home"],
    ["pages/projects.html", "Projects"],
    ["pages/about.html", "About"],
    ["pages/skills.html", "Skills"],
    ["pages/contact.html", "Contact"]
  ];

  var header =
    '<header class="site-header"><nav class="nav">' +
    '<a class="brand" href="index.html">syed<b>ibrahim</b>ali</a>' +
    '<button class="nav-toggle" aria-label="Menu">&#9776;</button>' +
    '<div class="nav-links">' +
    NAV.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + "</a>"; }).join("") +
    "</div></nav></header>";

  var footer =
    '<footer class="site-footer"><div class="container"><p>Syed Ibrahim Ali &middot; self-taught developer in Islamabad &middot; &copy; <span data-year></span> &middot; built by hand, no templates</p></div></footer>';

  var h = document.querySelector("[data-header]");
  var f = document.querySelector("[data-footer]");
  if (h) h.innerHTML = header;
  if (f) f.innerHTML = footer;
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
