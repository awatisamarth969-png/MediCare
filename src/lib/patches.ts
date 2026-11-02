
import React from "react";

// fetchAPI — global helper generated apps use for external API calls (weather/currency/etc.,
// see lib/ai-provider.ts), CORS-proxied through /api/proxy on failure. Was only defined inline
// in the preview (components/generate/sandpack-preview.tsx); html_code has no local fallback for
// it (unlike useZapplyDB/useZapplyAuth/uploadFile), so it needs a real named export here — a real
// built app calls it as a bare identifier, resolved by preprocessForVite's injected
// `import { fetchAPI } from "./lib/patches"`. Note: the /api/proxy fallback is an Appio route —
// it only resolves for apps still served from appio.in (e.g. a published app), not one built and
// hosted elsewhere via export-zip; the direct (non-proxied) fetch still works either way.
export function fetchAPI(url, options) {
  var opts = Object.assign({}, options || {});
  return fetch(url, opts).then(function(r) { if (r.ok) return r.json(); throw new Error(r.status); }).catch(function() {
    return fetch("/api/proxy", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url, method: (opts.method || "GET") }) }).then(function(r) { return r.json(); }).catch(function() { return null; });
  });
}

// Patch React.createElement to auto-stringify plain data objects passed as children
function _safeChild(c) {
  if (c === null || c === undefined || typeof c !== "object") return c;
  if (c.$$typeof || Array.isArray(c) || c instanceof Date || c instanceof Element || typeof c.then === "function" || c._currentValue || c.Provider || c._store !== undefined) return c;
  try {
    return c.description || c.message || c.title || c.name || c.label || c.text || c.value || JSON.stringify(c);
  } catch(e) { return String(c); }
}
var _origCE = React.createElement;
React.createElement = function() {
  var a = Array.prototype.slice.call(arguments);
  for (var i = 2; i < a.length; i++) {
    a[i] = _safeChild(a[i]);
  }
  return _origCE.apply(React, a);
};

// Runtime safety patches
var _origToLocale = Number.prototype.toLocaleString;
Number.prototype.toLocaleString = function() {
  try { return _origToLocale.apply(this, arguments); } catch(e) { return String(this); }
};

// Patch DOM methods to return safe proxy when element not found
// Prevents "Cannot set properties of null (setting 'onclick')" etc.
var _origGetById = document.getElementById.bind(document);
document.getElementById = function(id) {
  var el = _origGetById(id);
  if (!el) {
    console.warn("[appio] getElementById('" + id + "') returned null — using safe stub");
    return Object.create(HTMLDivElement.prototype);
  }
  return el;
};
var _origQS = document.querySelector.bind(document);
document.querySelector = function(sel) {
  var el = _origQS(sel);
  if (!el) return Object.create(HTMLDivElement.prototype);
  return el;
};

// AI Image Generation — globally available via window
// Uses our own /api/proxy-image which fetches from Pexels (relevant photos)
// with picsum.photos fallback. No CORS issues since it's same-origin.
function _hashSeed(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % 100000;
}
function _getBaseUrl() {
  try { var ao = window.location.ancestorOrigins; if (ao && ao.length > 0 && /^https?:/.test(ao[0])) return ao[0]; } catch(e) {}
  try {
    var ref = document.referrer;
    if (ref) { var u = new URL(ref); if (/^https?:/.test(u.protocol)) return u.origin; }
  } catch(e) {}
  return "https://appio.in";
}
window.generateImageUrl = function(prompt, width, height) {
  var w = width || 400;
  var h = height || 300;
  var base = _getBaseUrl();
  return base + "/api/proxy-image?q=" + encodeURIComponent(prompt) + "&w=" + w + "&h=" + h;
};
window.generateAvatarUrl = function(desc) {
  var seed = _hashSeed(desc || "avatar");
  return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + seed;
};
window.generateHeroUrl = function(desc, w) {
  var width = w || 800;
  var base = _getBaseUrl();
  return base + "/api/proxy-image?q=" + encodeURIComponent(desc || "modern background") + "&w=" + width + "&h=400";
};

// ── ZapplyDB: localStorage-based persistence ──────────────────────────
// All keys prefixed with "zdb_" to avoid collision with Sandpack internals.
var ZapplyDB = {
  save: function(key, data) {
    try { localStorage.setItem("zdb_" + key, JSON.stringify(data)); } catch(e) { console.warn("[ZapplyDB] save failed:", e.message); }
    return data;
  },
  load: function(key, fallback) {
    try {
      var raw = localStorage.getItem("zdb_" + key);
      if (raw === null || raw === undefined || raw === "undefined") return fallback !== undefined ? fallback : null;
      return JSON.parse(raw);
    } catch(e) { return fallback !== undefined ? fallback : null; }
  },
  remove: function(key) { localStorage.removeItem("zdb_" + key); },
  addItem: function(key, item) {
    var list = ZapplyDB.load(key, []);
    if (!Array.isArray(list)) list = [];
    var newItem = {};
    for (var k in item) { if (item.hasOwnProperty(k)) newItem[k] = item[k]; }
    if (!newItem.id) newItem.id = Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
    list.push(newItem);
    ZapplyDB.save(key, list);
    return list;
  },
  removeItem: function(key, id) {
    var list = ZapplyDB.load(key, []);
    if (!Array.isArray(list)) return [];
    var filtered = list.filter(function(x) { return x.id !== id; });
    ZapplyDB.save(key, filtered);
    return filtered;
  },
  updateItem: function(key, id, updates) {
    var list = ZapplyDB.load(key, []);
    if (!Array.isArray(list)) return [];
    var updated = list.map(function(x) {
      if (x.id !== id) return x;
      var merged = {};
      for (var k in x) { if (x.hasOwnProperty(k)) merged[k] = x[k]; }
      for (var k2 in updates) { if (updates.hasOwnProperty(k2)) merged[k2] = updates[k2]; }
      return merged;
    });
    ZapplyDB.save(key, updated);
    return updated;
  },
  clearAll: function() {
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf("zdb_") === 0) localStorage.removeItem(keys[i]);
    }
  }
};
window.ZapplyDB = ZapplyDB;

// ── Background sync to Appio's real backend (/api/app-backend/[appId]/kv/[key]) ──
// localStorage stays the instant, synchronous source of truth (zero change to existing behavior/UX);
// this only adds best-effort cross-device/cross-session persistence underneath it. Fire-and-forget:
// if offline, slow, or the call fails, the app keeps working from localStorage exactly like before.
function _zdbAppId() {
  try { return window.__APPIO_APP_ID__ || null; } catch(e) { return null; }
}
window.__zdbTimers = window.__zdbTimers || {};
function _zdbSyncPut(key, data) {
  var appId = _zdbAppId();
  if (!appId) return;
  var timers = window.__zdbTimers;
  if (timers[key]) clearTimeout(timers[key]);
  timers[key] = setTimeout(function() {
    delete timers[key];
    try {
      fetch("/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(key), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data })
      }).catch(function(){});
    } catch(e) {}
  }, 600);
}
try {
  window.addEventListener("pagehide", function() {
    var appId = _zdbAppId();
    if (!appId) return;
    var timers = window.__zdbTimers;
    for (var k in timers) {
      if (!timers.hasOwnProperty(k)) continue;
      clearTimeout(timers[k]);
      var raw = localStorage.getItem("zdb_" + k);
      if (raw === null) continue;
      try {
        var blob = new Blob([JSON.stringify({ data: JSON.parse(raw) })], { type: "application/json" });
        navigator.sendBeacon("/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(k), blob);
      } catch(e2) {}
    }
    window.__zdbTimers = {};
  });
} catch(e) {}

// ── useZapplyDB: React hook — useState that auto-persists (now local + background-synced) ──
// Wrapped in try-catch so it NEVER crashes — falls back to plain useState.
window.useZapplyDB = function(key, initialValue) {
  try {
    var stored = ZapplyDB.load(key, initialValue);
    var stateArr = React.useState(stored);
    var value = stateArr[0];
    var setValueRaw = stateArr[1];

    React.useEffect(function() {
      var appId = _zdbAppId();
      if (!appId) return;
      var cancelled = false;
      fetch("/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(key))
        .then(function(r) { return r.ok ? r.json() : null; })
        .then(function(res) {
          if (cancelled || !res || !res.found) return;
          var raw = JSON.stringify(res.data);
          if (raw === localStorage.getItem("zdb_" + key)) return;
          try { localStorage.setItem("zdb_" + key, raw); } catch(e2) {}
          setValueRaw(res.data);
        })
        .catch(function() {});
      return function() { cancelled = true; };
    }, []);

    var setValue = function(newVal) {
      if (typeof newVal === "function") {
        setValueRaw(function(prev) {
          var resolved = newVal(prev);
          try { ZapplyDB.save(key, resolved); } catch(e2) {}
          _zdbSyncPut(key, resolved);
          return resolved;
        });
      } else {
        try { ZapplyDB.save(key, newVal); } catch(e3) {}
        setValueRaw(newVal);
        _zdbSyncPut(key, newVal);
      }
    };
    return [value, setValue];
  } catch(e) {
    console.warn("[useZapplyDB] falling back to useState:", e.message);
    return React.useState(initialValue);
  }
};
