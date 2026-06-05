/*
 * Holdings — website analytics.
 *
 * GA4 (G-5SRR911ZJR) with Google Consent Mode v2. Analytics storage is
 * DENIED by default: GA sends only cookieless, identifier-free pings until
 * the visitor explicitly accepts via the banner below. A decline is
 * remembered and keeps analytics cookieless. The choice is stored locally
 * (localStorage), never on a server.
 *
 * Shared across every page so the consent logic lives in one place — each
 * page only needs:  <script src="assets/analytics.js" defer></script>
 * (use the correct relative path: "../assets/analytics.js" under /it/).
 */
(function () {
  var GA_ID = 'G-5SRR911ZJR';
  var STORAGE_KEY = 'holdings-cookie-consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // 1. Consent Mode v2 — deny everything that needs storage until opt-in.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // 2. Boot GA. With analytics_storage denied this runs cookieless.
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });

  var lib = document.createElement('script');
  lib.async = true;
  lib.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(lib);

  // 3. Apply a previously stored decision; only show the banner if none.
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

  if (stored === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  if (stored === 'denied') {
    return; // honor prior decline, stay cookieless, no banner
  }

  // 4. Show a minimal consent banner once the DOM is ready.
  function persist(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  function renderBanner() {
    var isItalian = (document.documentElement.lang || '').toLowerCase().indexOf('it') === 0;
    var t = isItalian ? {
      text: 'Usiamo analytics anonimi (Google Analytics) per capire quali pagine sono utili. Nessun dato personale, nessuna pubblicità.',
      accept: 'Accetta',
      decline: 'Rifiuta',
      privacy: 'Privacy',
      privacyHref: 'privacy.html'
    } : {
      text: 'We use anonymous analytics (Google Analytics) to see which pages are useful. No personal data, no advertising.',
      accept: 'Accept',
      decline: 'Decline',
      privacy: 'Privacy',
      privacyHref: 'privacy.html'
    };
    // /it/ pages live one level deep — point the link back up.
    if (isItalian && location.pathname.indexOf('/it/') !== -1) {
      t.privacyHref = '../privacy.html';
    }

    var style = document.createElement('style');
    style.textContent =
      '.hld-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483647;' +
      'max-width:560px;margin:0 auto;background:rgba(255,255,255,0.92);' +
      '-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);' +
      'border:1px solid rgba(0,0,0,0.08);border-radius:18px;padding:18px 20px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.12);' +
      'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;' +
      'color:#1d1d1f;display:flex;flex-direction:column;gap:14px;' +
      'animation:hld-rise .35s ease both;}' +
      '@keyframes hld-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
      '.hld-consent p{margin:0;font-size:13.5px;line-height:1.5;color:#6e6e73;}' +
      '.hld-consent p a{color:#0071e3;text-decoration:none;}' +
      '.hld-consent p a:hover{text-decoration:underline;}' +
      '.hld-consent .hld-actions{display:flex;gap:10px;justify-content:flex-end;align-items:center;}' +
      '.hld-consent button{font:inherit;font-size:14px;font-weight:500;cursor:pointer;' +
      'border-radius:980px;padding:8px 20px;transition:background .2s,opacity .2s;}' +
      '.hld-consent .hld-accept{background:#0071e3;color:#fff;border:none;}' +
      '.hld-consent .hld-accept:hover{background:#0077ed;}' +
      '.hld-consent .hld-decline{background:transparent;color:#1d1d1f;border:1px solid rgba(0,0,0,0.16);}' +
      '.hld-consent .hld-decline:hover{background:rgba(0,0,0,0.04);}' +
      '@media (prefers-color-scheme:dark){' +
      '.hld-consent{background:rgba(30,30,32,0.92);border-color:rgba(255,255,255,0.12);color:#f5f5f7;}' +
      '.hld-consent p{color:#a1a1a6;}' +
      '.hld-consent .hld-decline{color:#f5f5f7;border-color:rgba(255,255,255,0.24);}' +
      '.hld-consent .hld-decline:hover{background:rgba(255,255,255,0.08);}}';
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.className = 'hld-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', isItalian ? 'Consenso cookie' : 'Cookie consent');

    var p = document.createElement('p');
    p.appendChild(document.createTextNode(t.text + ' '));
    var link = document.createElement('a');
    link.href = t.privacyHref;
    link.textContent = t.privacy;
    p.appendChild(link);

    var actions = document.createElement('div');
    actions.className = 'hld-actions';

    var decline = document.createElement('button');
    decline.type = 'button';
    decline.className = 'hld-decline';
    decline.textContent = t.decline;

    var accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'hld-accept';
    accept.textContent = t.accept;

    function close() {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }
    accept.addEventListener('click', function () {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      persist('granted');
      close();
    });
    decline.addEventListener('click', function () {
      persist('denied');
      close();
    });

    actions.appendChild(decline);
    actions.appendChild(accept);
    banner.appendChild(p);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBanner);
  } else {
    renderBanner();
  }
})();
