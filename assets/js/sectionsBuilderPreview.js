// sectionsBuilderPreview.js
// Same as sectionsBuilder.js, but for hidden preview pages: it renders the
// DRAFT (unpublished) Layout Editor content so you can preview changes before
// publishing. Uses the Sanity "drafts" perspective, which requires a token.
// Defaults to the homepage's sections; set data-doc-type="membersSection" (or
// any other singleton document with a `sections` field) on #page-sections to
// preview a different one.
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

  // Shown instead of hiding #page-sections when there's a draft in progress
  // but it currently renders nothing — keyed by data-doc-type.
  const DRAFT_EMPTY_FALLBACKS = {
    membersSection: `<section class="page-section"><div class="container"><div class="ps-grid ps-2">
      <div class="ps-col tinymce-content"><img src="https://cdn.sanity.io/images/orv2fvsx/production/015b7f1e593930fc6fbc91f6eb5aad24dfc9a61a-653x960.jpg" alt="" /></div>
      <div class="ps-col tinymce-content"><h2>Nothing to see here</h2><p>Member's only information will be added here once it becomes available. Thank you!</p></div>
    </div></div></section>`,
  };

  // Shown when there's no draft in progress and nothing published either —
  // keyed by data-doc-type.
  const PUBLISHED_EMPTY_FALLBACKS = {
    membersSection: `<section class="page-section"><div class="container"><div class="ps-grid ps-1">
      <div class="ps-col tinymce-content" style="text-align: center;"><p style="opacity: 0.5;">Currently no content</p></div>
    </div></div></section>`,
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

    const docType = mount.dataset.docType || "homePage";
    // Looked up by _id (not _type) so we can tell a real in-progress draft
    // (id "drafts.<docType>") apart from the published doc (id "<docType>") —
    // the "Preview page" toast should only show when a draft actually exists.
    const groq = `{
      "published": *[_id == "${docType}"][0]{ sections },
      "draft": *[_id == "drafts.${docType}"][0]{ sections }
    }`;
    // perspective=raw → exact documents by _id, no draft/published overlay
    const url = `${SANITY_QUERY_BASE}?query=${encodeURIComponent(
      groq
    )}&perspective=raw`;

    fetch(url, { headers: { Authorization: `Bearer ${SANITY_PREVIEW_TOKEN}` } })
      .then((r) => r.json())
      .then((data) => {
        const result = (data && data.result) || {};
        const hasDraft = Boolean(result.draft);
        const sections = ((hasDraft ? result.draft : result.published) || {}).sections || [];
        const fallbacks = hasDraft ? DRAFT_EMPTY_FALLBACKS : PUBLISHED_EMPTY_FALLBACKS;
        const html = sections.map(renderSection).join("") || fallbacks[docType] || "";
        mount.innerHTML = html;
        mount.style.display = html ? "" : "none";

        const notice = document.querySelector(".preview-notice");
        if (notice) notice.style.display = hasDraft ? "" : "none";
      })
      .catch((err) => console.error("Preview sections fetch failed:", err));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildSections);
  } else {
    buildSections();
  }
})();
