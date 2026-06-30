// sectionsBuilderPreview.js
// Same as sectionsBuilder.js, but for the hidden /test-bed page: it renders the
// DRAFT (unpublished) Layout Editor content so you can preview homepage changes
// before publishing. Uses the Sanity "drafts" perspective, which requires a token.
//
// ⚠️  SETUP: paste a Sanity *Viewer* (read-only) token below.
//     Create one at https://www.sanity.io/manage → project orv2fvsx → API → Tokens
//     (Role: Viewer). This page is reachable by URL, so the token is exposed —
//     use a read-only token and rotate it if it ever needs revoking. Also make
//     sure your site origin is in the project's CORS Origins (Allow credentials).

(function () {
  const SANITY_PREVIEW_TOKEN = "skDbZmpluHl75M9FaktFfi3ecvGN6Q4wDmGcrjixxyUzOSdh4BcQuekmuMeZAWVjOjVHsGsSZVLARe0XMft3zwFMXmiw59STB4umkn9uGuLBnXEVXHHd8LTJxlo9aL6peHUQfyxDBgUDN5MSMx98mlK3myjHkcHOiHUgud2DFVCMfWZgFG5k";

  const SANITY_QUERY_BASE =
    "https://orv2fvsx.api.sanity.io/v2025-06-30/data/query/production";

  // schema _type -> { cols: [field names], cls: grid class in the sections CSS }
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
    const hasContent = layout.cols.some((c) => section[c] && section[c].trim());
    if (!hasContent) return "";
    const cols = layout.cols
      .map((c) => `<div class="ps-col tinymce-content">${cleanHtml(section[c])}</div>`)
      .join("");
    return `<section class="page-section"><div class="container"><div class="ps-grid ${layout.cls}">${cols}</div></div></section>`;
  }

  function buildSections() {
    const mount = document.getElementById("page-sections");
    if (!mount) return;

    const groq = `*[_type == "homePage"][0]{ sections }`;
    // perspective=drafts → draft version overlaid on published (i.e. live preview)
    const url = `${SANITY_QUERY_BASE}?query=${encodeURIComponent(
      groq
    )}&perspective=drafts`;

    fetch(url, { headers: { Authorization: `Bearer ${SANITY_PREVIEW_TOKEN}` } })
      .then((r) => r.json())
      .then((data) => {
        const sections = (data && data.result && data.result.sections) || [];
        const html = sections.map(renderSection).join("");
        mount.innerHTML = html;
        mount.style.display = html ? "" : "none";
      })
      .catch((err) => console.error("Preview sections fetch failed:", err));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildSections);
  } else {
    buildSections();
  }
})();
