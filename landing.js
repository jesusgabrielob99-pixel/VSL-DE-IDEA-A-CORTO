(() => {
  "use strict";

  const config = window.LANDING_CONFIG || {};
  const slot = document.getElementById("vsl");

  const stageCards = [...document.querySelectorAll("button.stage-card")];
  stageCards.forEach(card => {
    card.addEventListener("click", () => {
      const activate = !card.classList.contains("is-active");
      stageCards.forEach(stage => {
        const active = stage === card && activate;
        stage.classList.toggle("is-active", active);
        stage.setAttribute("aria-pressed", String(active));
      });
    });
  });

  document.querySelectorAll(".process-marquee").forEach(marquee => {
    const toggle = marquee.querySelector(".marquee-toggle");
    if (!toggle) return;
    const label = toggle.querySelector("[data-marquee-label]");
    const updateControl = () => {
      const paused = marquee.classList.contains("is-paused");
      const action = paused ? "Reanudar cinta" : "Pausar cinta";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", action);
      if (label) label.textContent = action;
    };
    toggle.addEventListener("click", () => {
      marquee.classList.toggle("is-paused");
      updateControl();
    });
    updateControl();
  });

  function monitorYouTube(frame, videoId) {
    const embed = new URL(frame.src);
    embed.searchParams.set("enablejsapi", "1");
    if (["http:", "https:"].includes(location.protocol)) embed.searchParams.set("origin", location.origin);
    frame.src = embed.href;
    const connect = () => {
      new window.YT.Player(frame, {
        events: {
          onReady: () => { slot.dataset.playbackStatus = "ready"; },
          onStateChange: event => {
            if (event.data === 1) slot.dataset.playbackStatus = "playing";
          },
          onError: event => {
            slot.dataset.playbackStatus = "error";
            slot.dataset.playbackError = String(event.data);
            const notice = document.createElement("div");
            notice.className = "video-fallback";
            const text = document.createElement("p");
            text.textContent = "Puedes ver la presentación en YouTube.";
            const link = document.createElement("a");
            link.href = `https://www.youtube.com/watch?v=${videoId}`;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "▶ Ver presentación";
            notice.append(text, link);
            slot.replaceChildren(notice);
          }
        }
      });
    };
    if (window.YT?.Player) return connect();
    window.onYouTubeIframeAPIReady = connect;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.append(script);
  }

  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["https:", "http:"].includes(url.protocol) ? url : null;
    } catch { return null; }
  }

  const hotmart = safeUrl(config.hotmartUrl);
  if (hotmart) {
    document.querySelectorAll(".purchase").forEach(link => { link.href = hotmart.href; });
  }

  if (!Object.hasOwn(config, "vslUrl")) return;
  const source = safeUrl(config.vslUrl);
  if (!source) {
    if (config.vslUrl === "") {
      slot.replaceChildren();
      slot.setAttribute("aria-hidden", "true");
    }
    return;
  }

  const host = source.hostname.toLowerCase().replace(/^www\./, "");
  let embedUrl = null;
  let youtubeId = null;
  if (host === "youtu.be") youtubeId = source.pathname.split("/")[1];
  if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
    youtubeId = source.searchParams.get("v") || source.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
  }
  if (youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(youtubeId)) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&playsinline=1`;
  } else if (["vimeo.com", "player.vimeo.com"].includes(host)) {
    const vimeoId = source.pathname.match(/^\/(?:video\/)?(\d+)(?:\/|$)/)?.[1];
    if (vimeoId) {
      const vimeo = new URL(`https://player.vimeo.com/video/${vimeoId}`);
      const privateHash = source.searchParams.get("h") || source.pathname.match(/^\/\d+\/([a-zA-Z0-9]+)/)?.[1];
      if (privateHash) vimeo.searchParams.set("h", privateHash);
      vimeo.searchParams.set("dnt", "1");
      embedUrl = vimeo.href;
    }
  }

  if (embedUrl) {
    const existing = slot.querySelector("iframe");
    if (existing?.src === embedUrl) {
      if (youtubeId) monitorYouTube(existing, youtubeId);
      return;
    }
    const player = document.createElement("iframe");
    player.src = embedUrl;
    player.id = "vsl-player";
    player.title = "De Idea a Corto: video de presentación";
    player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    player.allowFullscreen = true;
    player.referrerPolicy = "strict-origin-when-cross-origin";
    player.loading = "lazy";
    slot.replaceChildren(player);
    if (youtubeId) monitorYouTube(player, youtubeId);
  } else if (/\.(mp4|webm|ogg|ogv|mov)$/i.test(source.pathname)) {
    const player = document.createElement("video");
    player.src = source.href;
    player.id = "vsl-player";
    player.controls = true;
    player.playsInline = true;
    player.preload = "metadata";
    player.setAttribute("aria-label", "De Idea a Corto: video de presentación");
    const fallback = document.createElement("a");
    fallback.href = source.href;
    fallback.textContent = "Ver el video de presentación";
    player.append(fallback);
    slot.replaceChildren(player);
  }
})();
