// sectionsBuilder.js
// Renders the homepage "Layout Editor" sections (authored in the Sanity Studio via the
// columnar layout picker) into #page-sections, just below the hero. Depends on fetchData.js.

(function () {
  const SANITY_QUERY_BASE =
    "https://orv2fvsx.api.sanity.io/v2025-06-30/data/query/production";

  // schema _type -> { cols: [field names], cls: grid class in sanity-sections.css }
  const LAYOUTS = {
    sectionSingleColumn: { cols: ["col1"], cls: "ps-1" },
    sectionTwoColumn: { cols: ["col1", "col2"], cls: "ps-2" },
    sectionOneThirdTwoThirds: { cols: ["col1", "col2"], cls: "ps-3366" },
    sectionTwoThirdsOneThird: { cols: ["col1", "col2"], cls: "ps-6633" },
    sectionThreeColumn: { cols: ["col1", "col2", "col3"], cls: "ps-3" },
    sectionFourColumn: { cols: ["col1", "col2", "col3", "col4"], cls: "ps-4" },
  };

  // Drop TinyMCE editing-only artifacts (image resize handles / bogus nodes) that can
  // get saved into the column HTML — otherwise they become the column's :last-child.
  function cleanHtml(html) {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("[data-mce-bogus]").forEach((el) => el.remove());
    return doc.body.innerHTML;
  }

  function renderSection(section) {
    const layout = LAYOUTS[section._type];
    if (!layout) return "";
    // Keep every configured column so layout ratios hold, but skip wholly-empty sections.
    const hasContent = layout.cols.some((c) => section[c] && section[c].trim());
    if (!hasContent) return "";
    const cols = layout.cols
      .map(
        (c) =>
          `<div class="ps-col tinymce-content">${cleanHtml(section[c])}</div>`
      )
      .join("");
    return `<section class="page-section"><div class="container"><div class="ps-grid ${layout.cls}">${cols}</div></div></section>`;
  }

  function buildSections() {
    const mount = document.getElementById("page-sections");
    if (!mount) return;

    const groq = `*[_type == "homePage"][0]{ sections }`;
    const url = `${SANITY_QUERY_BASE}?query=${encodeURIComponent(
      groq
    )}&perspective=published`;

    fetchData(url).then((data) => {
      const sections = (data && data.sections) || [];
      const html = sections.map(renderSection).join("");
      mount.innerHTML = html;
      // Hide the whole section (incl. its padding) when there's nothing to show.
      mount.style.display = html ? "" : "none";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildSections);
  } else {
    buildSections();
  }
})();
