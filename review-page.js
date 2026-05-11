// ── REVIEW PAGE SHARED LOGIC ──────────────────────────

function starsHTML(rating, size) {
  size = size || 14;
  if (!rating) return '';
  const s = rating / 2;
  const full  = Math.floor(s);
  const half  = (s % 1) >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  const star = function(type) {
    if (type === 'full')  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 14 14"><polygon fill="#c9a97e" points="7,1 8.8,5.2 13.3,5.5 10,8.4 11,13 7,10.5 3,13 4,8.4 0.7,5.5 5.2,5.2"/></svg>';
    if (type === 'half')  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 14 14"><polygon fill="#c9a97e" opacity="0.22" points="7,1 8.8,5.2 13.3,5.5 10,8.4 11,13 7,10.5 3,13 4,8.4 0.7,5.5 5.2,5.2"/><polygon fill="#c9a97e" style="clip-path:inset(0 50% 0 0)" points="7,1 8.8,5.2 13.3,5.5 10,8.4 11,13 7,10.5 3,13 4,8.4 0.7,5.5 5.2,5.2"/></svg>';
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 14 14"><polygon fill="#c9a97e" opacity="0.22" points="7,1 8.8,5.2 13.3,5.5 10,8.4 11,13 7,10.5 3,13 4,8.4 0.7,5.5 5.2,5.2"/></svg>';
  };
  var html = '<div class="stars">';
  for (var i=0;i<full;i++)  html += star('full');
  for (var i=0;i<half;i++)  html += star('half');
  for (var i=0;i<empty;i++) html += star('empty');
  html += '</div>';
  return html;
}

function fmtDate(iso) {
  var parts = iso.split('-');
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months[+parts[1]-1] + ' ' + parts[0];
}

function fmtTime(s) {
  return isNaN(s) ? '--:--' : Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
}

function initReviewPage(slug, title, year, type, genre, rating) {
  // ── Hero meta block ───────────────────────────────
  var r = (REVIEWS || []).find(function(x){ return x.slug === slug; });
  var dateStr = r ? fmtDate(r.date) : '';
  var hasAudio = r ? r.audio : false;

  document.getElementById('hero-meta-block').innerHTML =
    '<div class="review-eyebrow">' + type + ' · ' + year + (dateStr ? ' · ' + dateStr : '') + '</div>' +
    '<h1 class="review-title">' + title + '</h1>' +
    '<div class="review-meta-row">' +
      starsHTML(rating, 16) +
      '<span class="badge">' + genre + '</span>' +
      '<span class="badge" style="color:var(--gold);border-color:rgba(201,169,126,0.5);">' + rating + ' / 10</span>' +
    '</div>';

  // ── Audio player ──────────────────────────────────
  var audio = document.getElementById('reviewAudio');
  var playIcon = document.getElementById('playIcon');
  var progressFill = document.getElementById('progressFill');
  var PLAY  = '<polygon points="6,3 17,10 6,17"/>';
  var PAUSE = '<rect x="4" y="3" width="4" height="14" rx="1"/><rect x="12" y="3" width="4" height="14" rx="1"/>';

  // Check if audio source exists
  var srcExists = audio.querySelector('source') !== null;

  if (!srcExists) {
    var pb = document.getElementById('playerBar');
    pb.innerHTML = '<span class="player-bar-label">Listen Along</span>' +
      '<span class="no-audio-note">Audio coming soon — drop ' + slug + '.mp3 into /audio/ and uncomment the source line</span>';
  } else {
    audio.addEventListener('loadedmetadata', function() {
      document.getElementById('totalTime').textContent = fmtTime(audio.duration);
    });
    audio.addEventListener('timeupdate', function() {
      if (!audio.duration) return;
      progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
      document.getElementById('currentTime').textContent = fmtTime(audio.currentTime);
    });
    audio.addEventListener('ended', function() { playIcon.innerHTML = PLAY; });
  }

  window.togglePlay = function() {
    if (!srcExists) return;
    if (audio.paused) { audio.play(); playIcon.innerHTML = PAUSE; }
    else { audio.pause(); playIcon.innerHTML = PLAY; }
  };

  window.seek = function(e) {
    if (!srcExists || !audio.duration) return;
    var rect = document.getElementById('progressBar').getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  // ── Scroll reveal ─────────────────────────────────
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.review-text p').forEach(function(el, i) {
    el.style.cssText += 'opacity:0;transform:translateY(18px);transition:opacity 0.7s '+(i*0.06)+'s cubic-bezier(0.22,1,0.36,1),transform 0.7s '+(i*0.06)+'s cubic-bezier(0.22,1,0.36,1)';
    io.observe(el);
  });
}
