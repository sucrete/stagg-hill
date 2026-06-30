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

  function renderSection(section) {
    const layout = LAYOUTS[section._type];
    if (!layout) return "";
    // Keep every configured column so layout ratios hold, but skip wholly-empty sections.
    const hasContent = layout.cols.some((c) => section[c] && section[c].trim());
    if (!hasContent) return "";
    const cols = layout.cols
      .map(
        (c) =>
          `<div class="ps-col tinymce-content">${section[c] || ""}</div>`
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
      mount.innerHTML = sections.map(renderSection).join("");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildSections);
  } else {
    buildSections();
  }
})();
