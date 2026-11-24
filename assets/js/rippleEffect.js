// rippleEffect.js
// True ripple effect for every .rts-btn on the site, triggered on hover —
// the ripple starts from wherever the cursor enters the button. Bound
// directly to each button (rather than delegated) since mouseenter is only
// guaranteed to fire exactly once per genuine entry — vs. the button's own
// box — when listened for on the element itself; delegating it from a
// shared ancestor would also re-fire for every inner child (e.g. the
// button's text span) the cursor crosses while already hovering.
(function () {
  function createRipple(button, event) {
    const existing = button.querySelector(".rts-ripple-circle");
    if (existing) existing.remove();

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Distance from the entry point to the button's farthest corner, so the
    // ripple always grows large enough to cover the whole button.
    const radius = Math.sqrt(
      Math.max(x, rect.width - x) ** 2 + Math.max(y, rect.height - y) ** 2
    );
    const diameter = radius * 2;

    const circle = document.createElement("span");
    circle.className = "rts-ripple-circle";
    circle.style.width = circle.style.height = diameter + "px";
    circle.style.left = x - radius + "px";
    circle.style.top = y - radius + "px";

    button.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
  }

  function init() {
    document.querySelectorAll(".rts-btn").forEach(function (button) {
      button.addEventListener("mouseenter", function (event) {
        createRipple(button, event);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
