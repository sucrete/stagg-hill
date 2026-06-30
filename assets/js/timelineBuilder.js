// timelineBuilder.js
// Renders event-driven timelines on the category pages from Sanity events.
// Each timeline is a `.consulting-step` element carrying:
//   data-category="openTournaments|mensLeague|ladiesEveningLeague|couplesLeague"
//   data-variant="tournaments|league"  (controls item markup — defaults to "tournaments")
//   data-show-button                    (tournaments only: render a linkDetails button)
// Each variant keeps its own original styling; the only shared addition is the
// `.expired` class on items whose date has passed. Depends on fetchData.js + moment.

(function () {
  const SANITY_QUERY_BASE =
    "https://orv2fvsx.api.sanity.io/v2025-06-30/data/query/production";

  function isExpired(ev) {
    const effEnd =
      ev.multidayEvent && ev.end
        ? moment(ev.end, "YYYY-MM-DD")
        : moment(ev.start, "YYYY-MM-DD");
    return effEnd.isBefore(moment().startOf("day"));
  }

  function dateRange(ev, fmt) {
    let line = moment(ev.start, "YYYY-MM-DD").format(fmt);
    if (ev.multidayEvent && ev.end) {
      line += " – " + moment(ev.end, "YYYY-MM-DD").format(fmt);
    }
    return line;
  }

  function dot() {
    return `<div class="timeline-dot"><div class="time-line-circle"></div></div>`;
  }

  // ── Open Tournaments item: <h4> title, <p> full date, optional linkDetails button ──
  function tournamentItem(ev, showButton) {
    const expired = isExpired(ev);
    let button = "";
    const link = ev.linkDeets;
    if (showButton && ev.linkQuestion && link && link.linkURL) {
      const icon = expired
        ? "assets/images/svgs/results.svg"
        : "assets/images/svgs/register.svg";
      const text = link.linkText || (expired ? "Results" : "Sign Up");
      button = `
                    <a href="${link.linkURL}" class="pillock" target="_blank" rel="noopener">
                      <img class="pillock-icon injectable" src="${icon}" alt="" />
                      ${text}
                    </a>`;
    }
    const sd = ev.scheduleDetails || {};
    const startPart = sd.start ? `, ${sd.start}` : "";
    const formatPart = sd.format ? `<br />${sd.format}` : "";
    return `
                <div class="single-consulting-one${expired ? " expired" : ""}">
                  <div class="right-area">
                    <h4>${ev.title || ""}</h4>
                    <p>${dateRange(ev, "dddd, MMMM Do")}${startPart}${formatPart}</p>${button}
                  </div>
                  ${dot()}
                </div>`;
  }

  // ── League item: <p><span class="date">date</span> - format</p>, no title/button.
  //    Format comes from the event's Schedule Details > Format field. ──
  function leagueItem(ev) {
    const expired = isExpired(ev);
    const format = (ev.scheduleDetails && ev.scheduleDetails.format) || "";
    const tail = format ? ` - ${format}` : "";
    return `
                <div class="single-consulting-one${expired ? " expired" : ""}">
                  <div class="right-area">
                    <p><span class="date">${dateRange(ev, "MMMM Do")}</span>${tail}</p>
                  </div>
                  ${dot()}
                </div>`;
  }

  function buildTimeline(step) {
    const category = step.getAttribute("data-category");
    if (!category) return;
    const variant = step.getAttribute("data-variant") || "tournaments";
    const showButton = step.hasAttribute("data-show-button");

    // Scope each timeline to the current calendar year (date strings sort lexically).
    const year = new Date().getFullYear();
    const yearStart = `${year}-01-01`;
    const yearEnd = `${year}-12-31`;

    const groq = `*[_type == "event" && category == "${category}" && start >= "${yearStart}" && start <= "${yearEnd}"] | order(start asc){
      title, start, end, multidayEvent, eventDescription, linkQuestion, linkDeets, scheduleDetails
    }`;
    const url = `${SANITY_QUERY_BASE}?query=${encodeURIComponent(
      groq
    )}&perspective=published`;

    fetchData(url).then((events) => {
      const list = events || [];
      const items = list
        .map((ev) =>
          variant === "league" ? leagueItem(ev) : tournamentItem(ev, showButton)
        )
        .join("");
      step.innerHTML = `<div class="timeline-line"></div>${items}`;
      if (window.SVGInject) {
        window.SVGInject(step.querySelectorAll("img.injectable"));
      }
    });
  }

  function init() {
    document
      .querySelectorAll(".consulting-step[data-category]")
      .forEach(buildTimeline);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
