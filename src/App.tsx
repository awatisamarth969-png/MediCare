import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext, Fragment, memo, forwardRef } from "react";
import { Award, Bell, Check, ChevronRight, Clock, Home, Info, MessageCircle, Moon, Plus, Search, Settings, Trash, User, Zap } from "./lib/icons";
import { Progress, toast } from "./lib/ui";
var _zdbPfx = "zdb_" + ((typeof window !== "undefined" && window.__APPIO_APP_ID__) ? window.__APPIO_APP_ID__ + "_" : "");
var ZapplyDB = (window.ZapplyDB && typeof window.ZapplyDB.load === "function") ? window.ZapplyDB : {
  save: function(k,d) { try { localStorage.setItem(_zdbPfx+k, JSON.stringify(d)); } catch(e) {} return d; },
  load: function(k,f) { try { var r = localStorage.getItem(_zdbPfx+k); if(r===null||r==="undefined") return f!==undefined?f:null; return JSON.parse(r); } catch(e) { return f!==undefined?f:null; } },
  remove: function(k) { localStorage.removeItem(_zdbPfx+k); },
  addItem: function(k,item) { var l=ZapplyDB.load(k,[]); if(!Array.isArray(l))l=[]; var n={}; for(var p in item){if(item.hasOwnProperty(p))n[p]=item[p];} if(!n.id)n.id=Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,7); l.push(n); ZapplyDB.save(k,l); return l; },
  removeItem: function(k,id) { var l=ZapplyDB.load(k,[]); if(!Array.isArray(l))return[]; var f=l.filter(function(x){return x.id!==id}); ZapplyDB.save(k,f); return f; },
  updateItem: function(k,id,u) { var l=ZapplyDB.load(k,[]); if(!Array.isArray(l))return[]; var m=l.map(function(x){if(x.id!==id)return x; var o={}; for(var p in x){if(x.hasOwnProperty(p))o[p]=x[p];} for(var p2 in u){if(u.hasOwnProperty(p2))o[p2]=u[p2];} return o;}); ZapplyDB.save(k,m); return m; }
};
var _zdbBase = function(){ try { var ao = window.location.ancestorOrigins; if (ao && ao.length > 0 && /^https?:/.test(ao[0])) return ao[0]; } catch(e) {} try { var ref = document.referrer; if (ref) { var u = new URL(ref); if (/^https?:/.test(u.protocol)) return u.origin; } } catch(e) {} return "https://appio.in"; };
var _zdbAppId2 = function(){ try { return window.__APPIO_APP_ID__ || null; } catch(e){ return null; } };
window.__zdbTimers = window.__zdbTimers || {};
var _zdbSyncPut = function(key, data) { var appId = _zdbAppId2(); if (!appId) return; var timers = window.__zdbTimers; if (timers[key]) clearTimeout(timers[key]); timers[key] = setTimeout(function(){ delete timers[key]; try { fetch(_zdbBase() + "/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(key), { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify({data:data}) }).catch(function(){}); } catch(e) {} }, 600); };
if (typeof window !== "undefined" && !window.__zdbPagehideBound) { window.__zdbPagehideBound = true; window.addEventListener("pagehide", function(){ var appId = _zdbAppId2(); if (!appId) return; var timers = window.__zdbTimers; for (var k in timers) { if (!timers.hasOwnProperty(k)) continue; clearTimeout(timers[k]); var raw = null; try { raw = localStorage.getItem(_zdbPfx + k); } catch(e2) {} if (raw === null) continue; try { var blob = new Blob([JSON.stringify({data: JSON.parse(raw)})], {type:"application/json"}); navigator.sendBeacon(_zdbBase() + "/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(k), blob); } catch(e3) {} } window.__zdbTimers = {}; }); }
var useZapplyDB = (window.useZapplyDB && typeof window.useZapplyDB === "function") ? window.useZapplyDB : function(key, initialValue) {
  var stored = ZapplyDB.load(key, initialValue);
  var s = React.useState(stored); var val = s[0]; var setRaw = s[1];
  React.useEffect(function(){ var appId = _zdbAppId2(); if (!appId) return; var cancelled = false; fetch(_zdbBase() + "/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(key)).then(function(r){ return r.ok ? r.json() : null; }).then(function(res){ if (cancelled || !res || !res.found) return; var raw = JSON.stringify(res.data); if (raw === localStorage.getItem(_zdbPfx+key)) return; try { localStorage.setItem(_zdbPfx+key, raw); } catch(e2) {} setRaw(res.data); }).catch(function(){}); return function(){ cancelled = true; }; }, []);
  var setVal = function(nv) { if(typeof nv==="function"){setRaw(function(p){var r=nv(p);ZapplyDB.save(key,r);_zdbSyncPut(key,r);return r;});}else{ZapplyDB.save(key,nv);setRaw(nv);_zdbSyncPut(key,nv);} };
  return [val, setVal];
};
var generateImageUrl = window.generateImageUrl || function(p, w, h) {
  var seed = 0; for (var i = 0; i < p.length; i++) seed = (seed * 31 + p.charCodeAt(i)) % 100000;
  return "https://picsum.photos/seed/" + Math.abs(seed) + "/" + (w || 400) + "/" + (h || 300);
};
var generateAvatarUrl = window.generateAvatarUrl || function(d) {
  var s = d || "avatar"; var seed = 0; for (var i = 0; i < s.length; i++) seed = (seed * 31 + s.charCodeAt(i)) % 100000;
  return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + Math.abs(seed);
};
var generateHeroUrl = window.generateHeroUrl || function(d, w) {
  return generateImageUrl(d || "abstract background", w || 800, 400);
};
var _zdbPfx = "zdb_" + ((typeof window !== "undefined" && window.__APPIO_APP_ID__) ? window.__APPIO_APP_ID__ + "_" : "");
var _zdbBase = function(){ try { var ao = window.location.ancestorOrigins; if (ao && ao.length > 0 && /^https?:/.test(ao[0])) return ao[0]; } catch(e) {} try { var ref = document.referrer; if (ref) { var u = new URL(ref); if (/^https?:/.test(u.protocol)) return u.origin; } } catch(e) {} return "https://appio.in"; };
var _zdbAppId2 = function(){ try { return window.__APPIO_APP_ID__ || null; } catch(e){ return null; } };
window.__zdbTimers = window.__zdbTimers || {};
var _zdbSyncPut = function(key, data) { var appId = _zdbAppId2(); if (!appId) return; var timers = window.__zdbTimers; if (timers[key]) clearTimeout(timers[key]); timers[key] = setTimeout(function(){ delete timers[key]; try { fetch(_zdbBase() + "/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(key), { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify({data:data}) }).catch(function(){}); } catch(e) {} }, 600); };
if (typeof window !== "undefined" && !window.__zdbPagehideBound) { window.__zdbPagehideBound = true; window.addEventListener("pagehide", function(){ var appId = _zdbAppId2(); if (!appId) return; var timers = window.__zdbTimers; for (var k in timers) { if (!timers.hasOwnProperty(k)) continue; clearTimeout(timers[k]); var raw = null; try { raw = localStorage.getItem(_zdbPfx + k); } catch(e2) {} if (raw === null) continue; try { var blob = new Blob([JSON.stringify({data: JSON.parse(raw)})], {type:"application/json"}); navigator.sendBeacon(_zdbBase() + "/api/app-backend/" + encodeURIComponent(appId) + "/kv/" + encodeURIComponent(k), blob); } catch(e3) {} } window.__zdbTimers = {}; }); }
var generateImageUrl = window.generateImageUrl || function(p, w, h) {
  var seed = 0; for (var i = 0; i < p.length; i++) seed = (seed * 31 + p.charCodeAt(i)) % 100000;
  return "https://picsum.photos/seed/" + Math.abs(seed) + "/" + (w || 400) + "/" + (h || 300);
};
var generateAvatarUrl = window.generateAvatarUrl || function(d) {
  var s = d || "avatar"; var seed = 0; for (var i = 0; i < s.length; i++) seed = (seed * 31 + s.charCodeAt(i)) % 100000;
  return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + Math.abs(seed);
};
var generateHeroUrl = window.generateHeroUrl || function(d, w) {
  return generateImageUrl(d || "abstract background", w || 800, 400);
};
// PALETTE: bg=bg-indigo-50 dark:bg-gray-950 accent=indigo-500 card=bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 shadow-sm hero=accent-or-gradient

var SEED_MEDICINES = [
  { id: "m1", name: "Metformin", dosage: "500mg", time: "08:00", category: "morning", taken: false, reminder: true, color: "bg-blue-500", image: generateImageUrl("white pill bottle on table with morning sunlight", 400, 300) },
  { id: "m2", name: "Amoxicillin", dosage: "250mg", time: "09:00", category: "morning", taken: true, reminder: true, color: "bg-green-500", image: generateImageUrl("antibiotic capsules on white surface", 400, 300) },
  { id: "m3", name: "Atorvastatin", dosage: "10mg", time: "12:00", category: "afternoon", taken: false, reminder: true, color: "bg-purple-500", image: generateImageUrl("statin pills blister pack close up", 400, 300) },
  { id: "m4", name: "Omeprazole", dosage: "20mg", time: "13:00", category: "afternoon", taken: false, reminder: true, color: "bg-yellow-500", image: generateImageUrl("omeprazole capsules on wooden table", 400, 300) },
  { id: "m5", name: "Losartan", dosage: "50mg", time: "18:00", category: "evening", taken: false, reminder: true, color: "bg-pink-500", image: generateImageUrl("blood pressure medication pills", 400, 300) },
  { id: "m6", name: "Metoprolol", dosage: "25mg", time: "19:00", category: "evening", taken: false, reminder: true, color: "bg-orange-500", image: generateImageUrl("beta blocker tablets in container", 400, 300) },
  { id: "m7", name: "Vitamin D", dosage: "1000IU", time: "21:00", category: "night", taken: false, reminder: true, color: "bg-teal-500", image: generateImageUrl("vitamin d supplement capsules", 400, 300) },
  { id: "m8", name: "Aspirin", dosage: "75mg", time: "22:00", category: "night", taken: false, reminder: true, color: "bg-red-500", image: generateImageUrl("aspirin tablets on white background", 400, 300) },
  { id: "m9", name: "Cetirizine", dosage: "10mg", time: "07:30", category: "morning", taken: true, reminder: false, color: "bg-cyan-500", image: generateImageUrl("antihistamine allergy pills", 400, 300) },
  { id: "m10", name: "Ibuprofen", dosage: "400mg", time: "15:00", category: "afternoon", taken: true, reminder: false, color: "bg-rose-500", image: generateImageUrl("ibuprofen pain relief tablets", 400, 300) }
];

var SEED_HISTORY = [
  { id: "h1", name: "Metformin", dosage: "500mg", time: "08:00", date: "2026-03-17", taken: true },
  { id: "h2", name: "Amoxicillin", dosage: "250mg", time: "09:00", date: "2026-03-17", taken: true },
  { id: "h3", name: "Atorvastatin", dosage: "10mg", time: "12:00", date: "2026-03-17", taken: true },
  { id: "h4", name: "Omeprazole", dosage: "20mg", time: "13:00", date: "2026-03-16", taken: true },
  { id: "h5", name: "Losartan", dosage: "50mg", time: "18:00", date: "2026-03-16", taken: true },
  { id: "h6", name: "Metoprolol", dosage: "25mg", time: "19:00", date: "2026-03-16", taken: true },
  { id: "h7", name: "Vitamin D", dosage: "1000IU", time: "21:00", date: "2026-03-16", taken: true },
  { id: "h8", name: "Aspirin", dosage: "75mg", time: "22:00", date: "2026-03-15", taken: true },
  { id: "h9", name: "Cetirizine", dosage: "10mg", time: "07:30", date: "2026-03-15", taken: true },
  { id: "h10", name: "Ibuprofen", dosage: "400mg", time: "15:00", date: "2026-03-15", taken: true }
];

var SEED_REMINDERS = [
  { id: "r1", medId: "m1", time: "08:00", enabled: true },
  { id: "r2", medId: "m2", time: "09:00", enabled: true },
  { id: "r3", medId: "m3", time: "12:00", enabled: true },
  { id: "r4", medId: "m4", time: "13:00", enabled: true },
  { id: "r5", medId: "m5", time: "18:00", enabled: true },
  { id: "r6", medId: "m6", time: "19:00", enabled: true },
  { id: "r7", medId: "m7", time: "21:00", enabled: true },
  { id: "r8", medId: "m8", time: "22:00", enabled: true },
  { id: "r9", medId: "m9", time: "07:30", enabled: false },
  { id: "r10", medId: "m10", time: "15:00", enabled: false }
];

function SplashScreen(props) {
  useEffect(function() { setTimeout(props.onFinish, 2000) }, []);
  return (<>
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="text-6xl mb-4">💊</div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">MediCare</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Your daily medicine companion</p>
      </div>
    </div>
  </>);
}

function HomePage(props) {
  var ms = props.data;
  var setMs = props.setData;
  var today = new Date();
  var todayStr = today.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });
  var takenCount = (ms || []).filter(function(m) { return m.taken }).length;
  var totalCount = (ms || []).length;
  var pct = totalCount > 0 ? Math.round(takenCount / totalCount * 100) : 0;
  var categories = ["morning", "afternoon", "evening", "night"];
  var catLabels = { morning: "Morning", afternoon: "Afternoon", evening: "Evening", night: "Night" };
  var catEmojis = { morning: "🌅", afternoon: "☀️", evening: "🌆", night: "🌙" };
  var grouped = {};
  categories.forEach(function(c) {
    grouped[c] = (ms || []).filter(function(m) { return m.category === c });
  });
  var as = useState(false);
  var showAdd = as[0]; var setShowAdd = as[1];
  var ns = useState(""); var nm = ns[0]; var setNm = ns[1];
  var ds = useState(""); var dsVal = ds[0]; var setDs = ds[1];
  var ts = useState("08:00"); var tm = ts[0]; var setTm = ts[1];
  var cs = useState("morning"); var catSel = cs[0]; var setCatSel = cs[1];
  function addMedicine() {
    if (!nm.trim() || !dsVal.trim()) { toast({ title: "Error", description: "Please fill all fields" }); return; }
    var newMed = { id: "m" + Date.now(), name: nm, dosage: dsVal, time: tm, category: catSel, taken: false, reminder: true, color: "bg-indigo-500", image: generateImageUrl(nm + " medicine pills", 400, 300) };
    setMs((ms || []).concat([newMed]));
    toast({ title: "Medicine Added!", description: nm + " " + dsVal + " scheduled at " + tm });
    setNm(""); setDs(""); setTm("08:00"); setCatSel("morning"); setShowAdd(false);
  }
  function toggleTaken(id) {
    setMs((ms || []).map(function(m) {
      if (m.id === id) { return Object.assign({}, m, { taken: !m.taken }) }
      return m;
    }));
  }
  function deleteMed(id) {
    setMs((ms || []).filter(function(m) { return m.id !== id }));
    toast({ title: "Deleted", description: "Medicine removed" });
  }
  return (<>
    <div className="min-h-screen">
      <div className="px-5 pt-6 pb-24">
        <div className="mb-6">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-1">Today</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">{todayStr}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 mb-6 shadow-lg shadow-indigo-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Daily Progress</p>
              <p className="text-white text-4xl font-black mt-1">{takenCount}<span className="text-lg font-semibold text-white/60">/{totalCount}</span></p>
              <p className="text-white/70 text-xs mt-1">{pct}% completed today</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="4" className="opacity-20" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="4" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - pct / 100)} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">{pct}%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-xl px-3 py-1.5">
            <Zap size={14} className="text-indigo-500" />
            <span className="text-xs font-semibold text-gray-900 dark:text-white">Streak: 12 days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-xl px-3 py-1.5">
            <Award size={14} className="text-indigo-500" />
            <span className="text-xs font-semibold text-gray-900 dark:text-white">On Time: 89%</span>
          </div>
        </div>
        {categories.map(function(cat) {
          var items = grouped[cat] || [];
          if (items.length === 0) return null;
          return (<>
            <div key={cat} className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{catEmojis[cat]}</span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">{catLabels[cat]}</span>
              </div>
              {items.map(function(m, i) {
                return (
                  <div key={m.id} className="border-b border-indigo-100 dark:border-gray-800 py-3 animate-fade-in-up" style={{animationDelay: (i * 80) + "ms"}}>
                    <div className="flex items-center gap-3">
                      <div className={"w-10 h-10 rounded-full " + m.color + " flex items-center justify-center text-white text-sm font-bold shrink-0"}>
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{m.name}</p>
                          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{m.dosage}</span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{m.time}</p>
                      </div>
                      <button onClick={function() { toggleTaken(m.id) }} className={"w-8 h-8 rounded-full flex items-center justify-center transition-all " + (m.taken ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500")}>
                        {m.taken ? <Check size={14} /> : <Clock size={14} />}
                      </button>
                      <button onClick={function() { deleteMed(m.id) }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-all">
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>);
        })}
      </div>
      <button onClick={function() { setShowAdd(true) }} className="fixed bottom-20 right-5 w-14 h-14 bg-indigo-600 shadow-lg shadow-indigo-500/30 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all z-40">
        <Plus size={24} />
      </button>
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={function(e) { if (e.target === e.currentTarget) setShowAdd(false) }}>
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 w-full max-w-lg animate-fade-in-up">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Add New Medicine</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Medicine Name</label>
                <input value={nm} onChange={function(e) { setNm(e.target.value) }} placeholder="e.g. Metformin" className={"w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all " + (props.darkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-indigo-500/40" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-indigo-500/30")} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Dosage</label>
                <input value={dsVal} onChange={function(e) { setDs(e.target.value) }} placeholder="e.g. 500mg" className={"w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all " + (props.darkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-indigo-500/40" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-indigo-500/30")} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Time</label>
                <input type="time" value={tm} onChange={function(e) { setTm(e.target.value) }} className={"w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all " + (props.darkMode ? "bg-gray-800/50 border-gray-700 text-white focus:ring-indigo-500/40" : "bg-white border-gray-200 text-gray-900 focus:ring-indigo-500/30")} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Category</label>
                <div className="flex gap-2">
                  {["morning", "afternoon", "evening", "night"].map(function(c) {
                    return (
                      <button key={c} onClick={function() { setCatSel(c) }} className={"px-3 py-2 rounded-xl text-xs font-semibold transition-all " + (catSel === c ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400")}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button onClick={addMedicine} className="w-full bg-indigo-600 text-white rounded-xl py-3.5 font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Add Medicine</button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>);
}

function SearchPage(props) {
  var qs = useState("");
  var query = qs[0]; var setQuery = qs[1];
  var cf = useState("All");
  var activeFilter = cf[0]; var setActiveFilter = cf[1];
  var categories = ["All", "morning", "afternoon", "evening", "night"];
  var filtered = (props.data || []).filter(function(m) {
    var matchName = m.name.toLowerCase().includes(query.toLowerCase());
    var matchCat = activeFilter === "All" || m.category === activeFilter;
    return matchName && matchCat;
  });
  return (<>
    <div className="min-h-screen">
      <div className="px-5 pt-6 pb-24">
        <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-5">Search</h2>
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input value={query} onChange={function(e) { setQuery(e.target.value) }} placeholder="Search medicines..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all" />
        </div>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {categories.map(function(cat) {
            return (
              <button key={cat} onClick={function() { setActiveFilter(cat) }} className={"px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap " + (activeFilter === cat ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 text-gray-600 dark:text-gray-400")}>
                {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            );
          })}
        </div>
        {(filtered || []).length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">No medicines found</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Try a different search term or category</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(filtered || []).map(function(m, i) {
              return (<>
                <div key={m.id} className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-2xl p-3 flex items-center gap-3 w-full animate-fade-in-up" style={{animationDelay: (i * 80) + "ms"}}>
                  <div className={"w-12 h-12 rounded-xl " + m.color + " flex items-center justify-center text-white text-lg font-bold shrink-0"}>
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{m.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{m.dosage} • {m.time}</p>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{m.category}</p>
                  </div>
                  <div className={"px-2.5 py-1 rounded-lg text-[10px] font-semibold " + (m.taken ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500")}>
                    {m.taken ? "Taken" : "Pending"}
                  </div>
                </div>
              </>);
            })}
          </div>
        )}
      </div>
    </div>
  </>);
}

function MessagesPage(props) {
  var hs = useState(SEED_HISTORY);
  var history = hs[0];
  var groupedHistory = {};
  (history || []).forEach(function(h) {
    if (!groupedHistory[h.date]) groupedHistory[h.date] = [];
    groupedHistory[h.date].push(h);
  });
  var dates = Object.keys(groupedHistory).sort().reverse();
  return (<>
    <div className="min-h-screen">
      <div className="px-5 pt-6 pb-24">
        <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-5">History</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">Track your medication history</p>
        {dates.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">No history yet</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500">Start taking medicines to see history</p>
          </div>
        ) : (
          dates.map(function(date) {
            var items = groupedHistory[date] || [];
            return (<>
              <div key={date} className="mb-5">
                <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] mb-3">{date}</div>
                {items.map(function(h, i) {
                  return (
                    <div key={h.id} className="border-b border-indigo-100 dark:border-gray-800 py-3 flex items-center gap-3 animate-fade-in-up" style={{animationDelay: (i * 60) + "ms"}}>
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-bold shrink-0">
                        {h.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{h.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{h.dosage} at {h.time}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs font-semibold">
                        <Check size={12} />
                        <span>Taken</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>);
          })
        )}
      </div>
    </div>
  </>);
}

function NotificationsPage(props) {
  var rs = useState(SEED_REMINDERS);
  var reminders = rs[0]; var setReminders = rs[1];
  function toggleReminder(medId) {
    setReminders((reminders || []).map(function(r) {
      if (r.medId === medId) {
        var newEnabled = !r.enabled;
        toast({ title: newEnabled ? "Reminder On" : "Reminder Off", description: "Notification updated" });
        return Object.assign({}, r, { enabled: newEnabled });
      }
      return r;
    }));
  }
  var medMap = {};
  (props.data || []).forEach(function(m) { medMap[m.id] = m });
  return (<>
    <div className="min-h-screen">
      <div className="px-5 pt-6 pb-24">
        <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Reminders</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Manage your medication notifications</p>
        <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-3xl p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-indigo-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">All Reminders</span>
            </div>
            <button onClick={function() { toast({ title: "Info", description: "Reminders will notify you at medicine time" }) }} className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold">Test</button>
          </div>
          <div className="space-y-3">
            {(reminders || []).map(function(r, i) {
              var med = medMap[r.medId];
              if (!med) return null;
              return (<>
                <div key={r.id} className="flex items-center justify-between animate-fade-in-up" style={{animationDelay: (i * 60) + "ms"}}>
                  <div className="flex items-center gap-3">
                    <div className={"w-8 h-8 rounded-full " + med.color + " flex items-center justify-center text-white text-xs font-bold"}>
                      {med.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{med.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{med.dosage} • {r.time}</p>
                    </div>
                  </div>
                  <button onClick={function() { toggleReminder(r.medId) }} className={"w-10 h-5 rounded-full transition-all " + (r.enabled ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700")}>
                    <div className={"w-4 h-4 rounded-full bg-white shadow transition-transform " + (r.enabled ? "translate-x-5" : "translate-x-0.5")} />
                  </button>
                </div>
              </>);
            })}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-indigo-500" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">Notification Settings</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Reminders appear as push notifications on your device. Make sure notifications are enabled in your device settings for the best experience.</p>
        </div>
      </div>
    </div>
  </>);
}

function ProfilePage(props) {
  var dm = props.darkMode;
  var setDm = props.setDarkMode;
  var ms = props.data;
  var takenCount = (ms || []).filter(function(m) { return m.taken }).length;
  var totalCount = (ms || []).length;
  var as = useState(false);
  var aboutOpen = as[0]; var setAboutOpen = as[1];
  return (<>
    <div className="min-h-screen">
      <div className="px-5 pt-6 pb-24">
        <div className="text-center mb-6">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MediCareUser" className="w-20 h-20 rounded-full mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rahul Sharma</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">rahul@medicare.app</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-3xl p-5 mb-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{totalCount}</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">Medicines</p>
            </div>
            <div className="border-x border-indigo-100 dark:border-gray-800">
              <p className="text-3xl font-black text-gray-900 dark:text-white">{takenCount}</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">Taken</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">12</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">Streak</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 rounded-3xl overflow-hidden mb-5">
          <div className="px-5 py-4 flex items-center justify-between border-b border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Moon size={18} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Dark Mode</span>
            </div>
            <button onClick={function() { setDm(!dm); toast({ title: dm ? "Light Mode" : "Dark Mode" }) }} className={"w-11 h-6 rounded-full transition-all " + (dm ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700")}>
              <div className={"w-5 h-5 rounded-full bg-white shadow transition-transform " + (dm ? "translate-x-5.5" : "translate-x-0.5")} />
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between border-b border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
            </div>
            <button onClick={function() { props.setPage("notifications") }} className="text-gray-400 dark:text-gray-500">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between border-b border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Reminder History</span>
            </div>
            <button onClick={function() { props.setPage("messages") }} className="text-gray-400 dark:text-gray-500">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info size={18} className="text-indigo-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">About MediCare</span>
            </div>
            <button onClick={function() { setAboutOpen(true) }} className="text-gray-400 dark:text-gray-500">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">MediCare v1.0</p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Your daily medicine companion</p>
        </div>
      </div>
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={function(e) { if (e.target === e.currentTarget) setAboutOpen(false) }}>
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 w-full max-w-lg animate-fade-in-up">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">💊</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">MediCare</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Version 1.0</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center mb-5">MediCare helps you manage your daily medications with ease. Set reminders, track your history, and never miss a dose again.</p>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={14} className="text-green-500 shrink-0" />
                <span>Add and manage medicines</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={14} className="text-green-500 shrink-0" />
                <span>Personalized reminder schedules</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={14} className="text-green-500 shrink-0" />
                <span>Track medication history</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={14} className="text-green-500 shrink-0" />
                <span>Daily progress tracking</span>
              </div>
            </div>
            <button onClick={function() { setAboutOpen(false) }} className="w-full bg-indigo-600 text-white rounded-xl py-3.5 font-semibold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Close</button>
          </div>
        </div>
      )}
    </div>
  </>);
}

function BottomNav(props) {
  var tabs = [
    { id: "home", icon: <Home size={20} />, label: "Feed" },
    { id: "search", icon: <Search size={20} />, label: "Search" },
    { id: "messages", icon: <MessageCircle size={20} />, label: "Messages" },
    { id: "notifications", icon: <Bell size={20} />, label: "Alerts" },
    { id: "profile", icon: <User size={20} />, label: "Profile" }
  ];
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-indigo-100 dark:border-gray-800 shadow-sm fixed bottom-0 left-0 right-0 flex justify-around py-2 z-50">
      {tabs.map(function(tab) {
        var active = props.page === tab.id;
        return (<>
          <button key={tab.id} onClick={function() { props.setPage(tab.id) }} className={"flex flex-col items-center gap-1 px-4 py-1 transition-all duration-200 " + (active ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500")}>
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
            {active && <div className="w-1 h-1 rounded-full bg-indigo-500" />}
          </button>
        </>);
      })}
    </div>
  );
}

function App() {
  var ps = useState("splash");
  var page = ps[0]; var setPage = ps[1];
  var dm = useState(false);
  var darkMode = dm[0]; var setDarkMode = dm[1];
  var ms = useZapplyDB("medicines", SEED_MEDICINES);
  var medicines = ms[0]; var setMedicines = ms[1];
  return (
    <div className={(darkMode ? "dark " : "") + "min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300"}>
      {page === "splash" && <SplashScreen onFinish={function() { setPage("home") }} />}
      {page !== "splash" && (
        <div key={page} className="animate__animated animate__fadeIn animate__faster">
          {page === "home" && <HomePage setPage={setPage} data={medicines} setData={setMedicines} darkMode={darkMode} />}
          {page === "search" && <SearchPage setPage={setPage} data={medicines} darkMode={darkMode} />}
          {page === "messages" && <MessagesPage setPage={setPage} data={medicines} darkMode={darkMode} />}
          {page === "notifications" && <NotificationsPage setPage={setPage} data={medicines} darkMode={darkMode} />}
          {page === "profile" && <ProfilePage setPage={setPage} data={medicines} darkMode={darkMode} setDarkMode={setDarkMode} />}
        </div>
      )}
      {page !== "splash" && <BottomNav page={page} setPage={setPage} />}
    </div>
  );
}

export default App;
