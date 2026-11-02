document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("notices-masonry");
  if (!grid || typeof imagesLoaded === "undefined" || typeof Masonry === "undefined") {
    return;
  }

  var msnry = new Masonry(grid, {
    itemSelector: ".col-md-6.col-sm-12",
    percentPosition: true,
  });

  // Each card's height depends on its thumbnail, which may still be loading
  // (lazy-loaded or slow network) when Masonry first runs its layout. Without
  // this, the initial layout can use wrong (pre-image) heights, and the
  // bricks only correct themselves on the next resize or reload once the
  // images are cached. Re-laying out as each image finishes fixes it on the
  // very first load.
  imagesLoaded(grid).on("progress", function () {
    msnry.layout();
  });
});
