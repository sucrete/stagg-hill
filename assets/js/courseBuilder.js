const courseVideoQuery = `*[_type == "video" && defined(video.asset->playbackId)]{
  _id,
  title,
  "playbackId": video.asset->playbackId,
  "status": video.asset->status,
  "aspectRatio": video.asset->data.aspect_ratio
}`;

const courseVideoUrl =
  "https://orv2fvsx.api.sanity.io/v2025-06-30/data/query/production?query=" +
  encodeURIComponent(courseVideoQuery) +
  "&perspective=published";

document.addEventListener("DOMContentLoaded", function () {
  fetchData(courseVideoUrl).then((videos) => {
    if (!videos) return;

    videos.forEach((video) => {
      const match = video.title && video.title.match(/hole\s*(\d+)/i);
      if (!match) return;

      const holeNumber = match[1];
      const slot = document.querySelector(
        '.embla__slide__wrapper[data-hole="' + holeNumber + '"] .video-slot'
      );
      if (!slot) return;

      if (video.status === "ready" && video.playbackId) {
        const aspectRatio = video.aspectRatio
          ? video.aspectRatio.replace(":", " / ")
          : "16 / 9";

        slot.innerHTML =
          '<mux-player playback-id="' +
          video.playbackId +
          '" metadata-video-title="' +
          video.title +
          '" stream-type="on-demand" style="aspect-ratio: ' +
          aspectRatio +
          '; width: 100%; height: 100%;"></mux-player>';
      } else {
        slot.innerHTML =
          '<div class="video-processing">' +
          '<span class="processing-dot"></span>' +
          '<span class="placeholder-note">Video processing&hellip;</span>' +
          "</div>";
      }
    });
  });
});
