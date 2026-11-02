
import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext, Fragment, memo, forwardRef } from "react";

// localStorage polyfill
var _s = {};
var _fakeLs = { getItem: function(k) { return _s[k] || null; }, setItem: function(k, v) { _s[k] = String(v); }, removeItem: function(k) { delete _s[k]; }, clear: function() { _s = {}; } };
if (typeof localStorage === "undefined" || !localStorage) { window.localStorage = _fakeLs; }

// cn utility — merges class names
export function cn() { return Array.prototype.slice.call(arguments).filter(Boolean).join(" "); }

// Common aliases
export var Omit = function() { return null; };
export var IconContainer = function(p) { return React.createElement("div", { className: p.className, style: p.style }, p.children); };

export function Button({ className, variant, size, children, ...props }) {
  variant = variant || "default";
  size = size || "default";
  var v = {
    default: "bg-gray-900 text-white shadow-lg hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-100",
    ghost: "hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-800 dark:text-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:border-gray-700",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700",
    primary: "bg-blue-600 text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    link: "underline-offset-4 hover:underline text-blue-600 dark:text-blue-400 bg-transparent shadow-none"
  };
  var s = { sm: "h-9 px-3.5 text-xs", default: "h-11 px-5 text-sm", lg: "h-13 px-8 text-base", icon: "h-10 w-10 p-0 flex items-center justify-center" };
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40", v[variant] || v.default, s[size] || s.default, className)} {...props}>{children}</button>;
}

export function Card({ className, children, ...props }) { return <div className={cn("rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-800 dark:bg-gray-900", className)} {...props}>{children}</div>; }
export function CardHeader({ className, children, ...props }) { return <div className={cn("flex flex-col space-y-1.5 p-5 pb-3", className)} {...props}>{children}</div>; }
export function CardContent({ className, children, ...props }) { return <div className={cn("px-5 pb-5", className)} {...props}>{children}</div>; }
export function CardFooter({ className, children, ...props }) { return <div className={cn("flex items-center px-5 pb-5 pt-0", className)} {...props}>{children}</div>; }
export function CardTitle({ className, children, ...props }) { return <h3 className={cn("text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100", className)} {...props}>{children}</h3>; }
export function CardDescription({ className, children, ...props }) { return <p className={cn("text-sm text-gray-500 dark:text-gray-400 leading-relaxed", className)} {...props}>{children}</p>; }

export function Input({ className, label, error, icon, ...props }) {
  return <div className="w-full">{label && <label className="mb-1.5 block text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>}<div className="relative">{icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">{icon}</div>}<input className={cn("h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400", icon && "pl-11", error && "border-red-400 focus:border-red-500 focus:ring-red-500/20", className)} {...props} /></div>{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}</div>;
}

export function Textarea({ className, label, error, ...props }) {
  return <div className="w-full">{label && <label className="mb-1.5 block text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>}<textarea className={cn("w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500", error && "border-red-400", className)} {...props} />{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}</div>;
}

export function Badge({ className, variant, children, ...props }) {
  variant = variant || "default";
  var v = { default: "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800", secondary: "bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700", outline: "border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300", destructive: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800", success: "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800", warning: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800", premium: "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800" };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", v[variant] || v.default, className)} {...props}>{children}</span>;
}

export function Select({ label, options, error, className, children, value, onValueChange, onChange, ...props }) {
  options = options || [];
  var h = function(e) { if (onValueChange) onValueChange(e.target.value); if (onChange) onChange(e); };
  return <div className="w-full">{label && <label className="mb-1.5 block text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</label>}<select value={value} onChange={h} className={cn("h-12 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-900 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100", className)} {...props}>{options.map(function(o) { return <option key={o.value} value={o.value}>{o.label}</option>; })}{children}</select>{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}</div>;
}

export function Dialog({ open, onClose, children }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in"><div className="fixed inset-0 bg-black/60 dark:bg-black/70" onClick={onClose} /><div className="relative z-50 w-full max-w-md mx-4 animate-slide-up">{children}</div></div>;
}
export function DialogContent({ className, children, ...props }) { return <div className={cn("rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800", className)} {...props}>{children}</div>; }
export function DialogHeader({ className, children, ...props }) { return <div className={cn("mb-5", className)} {...props}>{children}</div>; }
export function DialogTitle({ className, children, ...props }) { return <h2 className={cn("text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100", className)} {...props}>{children}</h2>; }
export function DialogDescription({ className, children, ...props }) { return <p className={cn("mt-1.5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed", className)} {...props}>{children}</p>; }
export function DialogFooter({ className, children, ...props }) { return <div className={cn("mt-6 flex gap-3", className)} {...props}>{children}</div>; }

var TabsCtx = createContext({ value: "", onChange: function() {} });
export function Tabs({ defaultValue, value: cv, onValueChange, className, children, ...props }) {
  var s = useState(defaultValue || "");
  return <TabsCtx.Provider value={{ value: cv !== undefined ? cv : s[0], onChange: onValueChange || s[1] }}><div className={cn("w-full", className)} {...props}>{children}</div></TabsCtx.Provider>;
}
export function TabsList({ className, children, ...props }) { return <div className={cn("flex gap-1 rounded-2xl bg-gray-100 p-1.5 border border-gray-200 dark:bg-gray-800 dark:border-gray-700", className)} {...props}>{children}</div>; }
export function TabsTrigger({ value, className, children, ...props }) {
  var c = useContext(TabsCtx);
  return <button onClick={function() { c.onChange(value); }} className={cn("flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300", c.value === value ? "bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", className)} {...props}>{children}</button>;
}
export function TabsContent({ value, className, children, ...props }) {
  var c = useContext(TabsCtx);
  if (c.value !== value) return null;
  return <div className={cn("mt-4 animate-fade-in", className)} {...props}>{children}</div>;
}

// Toast system
var _globalToast = function(m, t) { console.log("Toast:", m); };
export var toast = function(m, t) { _globalToast(m, t); };
var ToastCtx = createContext({ toast: function() {} });
export function useToast() { return useContext(ToastCtx); }
export function ToastProvider({ children }) {
  var s = useState([]);
  var toastFn = useCallback(function(m, t) {
    if (m && typeof m === "object") { t = m.variant === "destructive" ? "error" : m.variant || m.type || "success"; m = m.description || m.title || m.message || JSON.stringify(m); }
    t = t || "success";
    var id = Date.now();
    s[1](function(p) { return p.concat([{ id: id, message: String(m), type: t }]); });
    setTimeout(function() { s[1](function(p) { return p.filter(function(x) { return x.id !== id; }); }); }, 3000);
  }, []);
  _globalToast = toastFn;
  toast = toastFn;
  return <ToastCtx.Provider value={{ toast: toastFn }}>{children}<div className="fixed bottom-20 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">{s[0].map(function(t) { return <div key={t.id} className={cn("pointer-events-auto flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-xl animate-slide-up border", t.type === "success" && "bg-emerald-500 text-white border-emerald-400", t.type === "error" && "bg-red-500 text-white border-red-400", t.type === "info" && "bg-gray-800 text-white border-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-200")}><span className="flex-1 text-sm font-semibold">{t.message}</span></div>; })}</div></ToastCtx.Provider>;
}

export function Progress({ value, max, color, className }) {
  max = max || 100;
  var p = Math.min(100, Math.max(0, (value / max) * 100));
  return <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700", className)}><div className={cn("h-full rounded-full transition-all duration-700 ease-out", color || "bg-blue-500")} style={{ width: p + "%" }} /></div>;
}

export function Avatar({ src, alt, fallback, size, className }) {
  var e = useState(false);
  size = size || "default";
  var fb = fallback || "?";
  var sz = { sm: "h-8 w-8 text-xs", default: "h-11 w-11 text-sm", lg: "h-14 w-14 text-lg", xl: "h-20 w-20 text-xl" };
  return <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold ring-2 ring-gray-200 dark:ring-gray-700 shadow-md", sz[size], className)}>{src && !e[0] ? <img src={src} alt={alt || fb} className="h-full w-full object-cover" onError={function() { e[1](true); }} /> : <span>{fb.slice(0, 2).toUpperCase()}</span>}</div>;
}

export function Switch({ checked, onCheckedChange, className }) {
  return <button onClick={function() { onCheckedChange && onCheckedChange(!checked); }} className={cn("relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300", checked ? "bg-blue-500 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600", className)}><span className={cn("inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300", checked ? "translate-x-6 scale-100" : "translate-x-1 scale-95")} /></button>;
}

export function Separator({ className }) { return <div className={cn("h-px w-full bg-gray-200 dark:bg-gray-700", className)} />; }
export function ScrollArea({ className, children, ...props }) { return <div className={cn("overflow-auto scrollbar-none", className)} {...props}>{children}</div>; }

export function Chip({ className, active, children, ...props }) {
  return <button className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200", active ? "bg-gray-900 text-white shadow-md dark:bg-gray-100 dark:text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700", className)} {...props}>{children}</button>;
}

export function IconButton({ className, variant, children, ...props }) {
  variant = variant || "default";
  var v = { default: "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700", primary: "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50", danger: "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50" };
  return <button className={cn("h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90", v[variant] || v.default, className)} {...props}>{children}</button>;
}

export function Skeleton({ className, ...props }) { return <div className={cn("animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700", className)} {...props} />; }

export function Stat({ label, value, trend, trendUp, icon, className }) {
  return <div className={cn("flex flex-col gap-1 rounded-2xl bg-white border border-gray-200 p-4 shadow-sm dark:bg-gray-900 dark:border-gray-800", className)}>{icon && <div className="mb-1">{icon}</div>}<span className="text-2xl font-black tracking-tight font-mono dark:text-gray-100">{value}</span><div className="flex items-center gap-2"><span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold">{label}</span>{trend && <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded-md", trendUp ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400")}>{trend}</span>}</div></div>;
}

export function Accordion({ children, className, ...props }) { return <div className={cn("divide-y divide-gray-200 rounded-2xl border border-gray-200 overflow-hidden dark:divide-gray-700 dark:border-gray-700", className)} {...props}>{children}</div>; }
export function AccordionItem({ title, children, defaultOpen, className }) {
  var s = useState(defaultOpen || false);
  return <div className={cn("bg-white dark:bg-gray-900", className)}><button onClick={function() { s[1](!s[0]); }} className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-gray-100"><span>{title}</span><span className={cn("text-gray-400 transition-transform duration-200", s[0] && "rotate-180")}>\u25BC</span></button>{s[0] && <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 animate-fade-in">{children}</div>}</div>;
}

export function AlertDialog({ open, onClose, title, description, confirmText, cancelText, onConfirm, variant }) {
  if (!open) return null;
  variant = variant || "default";
  var btnClass = variant === "destructive" ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900";
  return <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"><div className="fixed inset-0 bg-black/60 dark:bg-black/70" onClick={onClose} /><div className="relative z-50 w-full max-w-sm mx-4 bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800 animate-slide-up"><h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>{description && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>}<div className="mt-6 flex gap-3 justify-end"><button onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">{cancelText || "Cancel"}</button><button onClick={function() { onConfirm && onConfirm(); onClose && onClose(); }} className={cn("px-4 py-2.5 rounded-xl text-sm font-semibold", btnClass)}>{confirmText || "Confirm"}</button></div></div></div>;
}

export function Sheet({ open, onClose, side, children, className }) {
  if (!open) return null;
  side = side || "right";
  var pos = { right: "right-0 top-0 h-full w-80 animate-slide-left", left: "left-0 top-0 h-full w-80 animate-slide-right", bottom: "bottom-0 left-0 w-full max-h-[80vh] rounded-t-3xl animate-slide-up" };
  return <div className="fixed inset-0 z-50"><div className="fixed inset-0 bg-black/60 dark:bg-black/70" onClick={onClose} /><div className={cn("fixed bg-white shadow-2xl border border-gray-200 p-6 overflow-auto z-50 dark:bg-gray-900 dark:border-gray-800", pos[side] || pos.right, className)}>{children}</div></div>;
}

export function Tooltip({ children, content, className }) {
  var s = useState(false);
  return <div className="relative inline-block" onMouseEnter={function() { s[1](true); }} onMouseLeave={function() { s[1](false); }}>{children}{s[0] && <div className={cn("absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium whitespace-nowrap shadow-lg z-50 animate-fade-in", className)}>{content}<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" /></div>}</div>;
}

export function Checkbox({ checked, onCheckedChange, label, className }) {
  return <label className={cn("flex items-center gap-3 cursor-pointer group", className)}><button onClick={function() { onCheckedChange && onCheckedChange(!checked); }} className={cn("h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 text-xs", checked ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500")}>{checked && "\u2713"}</button>{label && <span className="text-sm font-medium select-none dark:text-gray-200">{label}</span>}</label>;
}

export function RadioGroup({ value, onValueChange, options, className }) {
  options = options || [];
  return <div className={cn("flex flex-col gap-3", className)}>{options.map(function(o) { return <label key={o.value} className="flex items-center gap-3 cursor-pointer"><button onClick={function() { onValueChange && onValueChange(o.value); }} className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200", value === o.value ? "border-blue-500" : "border-gray-300 hover:border-gray-400 dark:border-gray-600")}>{value === o.value && <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />}</button><span className="text-sm font-medium dark:text-gray-200">{o.label}</span></label>; })}</div>;
}

export function Slider({ value, onValueChange, min, max, step, className }) {
  min = min || 0; max = max || 100; step = step || 1;
  var pct = ((value - min) / (max - min)) * 100;
  return <div className={cn("relative w-full", className)}><div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-blue-500 dark:bg-blue-400 transition-all" style={{ width: pct + "%" }} /></div><input type="range" min={min} max={max} step={step} value={value} onChange={function(e) { onValueChange && onValueChange(Number(e.target.value)); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /></div>;
}

export function DropdownMenu({ trigger, items, className }) {
  var s = useState(false);
  var ref = useRef(null);
  useEffect(function() { function h(e) { if (ref.current && !ref.current.contains(e.target)) s[1](false); } document.addEventListener("mousedown", h); return function() { document.removeEventListener("mousedown", h); }; }, []);
  return <div className="relative inline-block" ref={ref}><div onClick={function() { s[1](!s[0]); }}>{trigger}</div>{s[0] && <div className={cn("absolute right-0 top-full mt-2 min-w-[180px] rounded-xl bg-white border border-gray-200 shadow-xl py-1.5 z-50 animate-fade-in dark:bg-gray-900 dark:border-gray-700", className)}>{(items || []).map(function(item, i) { if (item.separator) return <div key={i} className="h-px bg-gray-200 dark:bg-gray-700 my-1.5" />; return <button key={i} onClick={function() { item.onClick && item.onClick(); s[1](false); }} className={cn("w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2", item.destructive ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-200")}>{item.icon && <span>{item.icon}</span>}{item.label}</button>; })}</div>}</div>;
}

export function EmptyState({ icon, title, description, action, className }) {
  return <div className={cn("flex flex-col items-center justify-center py-12 px-6 text-center", className)}>{icon && <div className="text-4xl mb-4">{icon}</div>}<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>{description && <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{description}</p>}{action && <div className="mt-4">{action}</div>}</div>;
}

export function FAB({ icon, onClick, className, ...props }) {
  return <button onClick={onClick} className={cn("fixed bottom-24 right-6 h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center text-xl hover:bg-blue-700 active:scale-90 transition-all z-40 dark:bg-blue-500 dark:hover:bg-blue-400 dark:shadow-blue-900/30", className)} {...props}>{icon || "+"}</button>;
}

// Drawer — mobile-friendly bottom sheet with drag handle
export function Drawer({ open, onClose, children, className }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50"><div className="fixed inset-0 bg-black/60 dark:bg-black/70" onClick={onClose} /><div className={cn("fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl overflow-auto z-50 animate-slide-up dark:bg-gray-900", className)}><div className="sticky top-0 flex justify-center pt-3 pb-2 bg-white dark:bg-gray-900 rounded-t-3xl"><div className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" /></div><div className="px-6 pb-6">{children}</div></div></div>;
}
export function DrawerHeader({ className, children, ...props }) { return <div className={cn("mb-4", className)} {...props}>{children}</div>; }
export function DrawerTitle({ className, children, ...props }) { return <h2 className={cn("text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100", className)} {...props}>{children}</h2>; }
export function DrawerDescription({ className, children, ...props }) { return <p className={cn("mt-1 text-sm text-gray-500 dark:text-gray-400", className)} {...props}>{children}</p>; }
export function DrawerFooter({ className, children, ...props }) { return <div className={cn("mt-6 flex gap-3", className)} {...props}>{children}</div>; }

// Table — data table with proper styling
export function Table({ className, children, ...props }) { return <div className={cn("w-full overflow-auto rounded-2xl border border-gray-200 dark:border-gray-700", className)}><table className="w-full text-sm" {...props}>{children}</table></div>; }
export function TableHeader({ className, children, ...props }) { return <thead className={cn("bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700", className)} {...props}>{children}</thead>; }
export function TableBody({ className, children, ...props }) { return <tbody className={cn("divide-y divide-gray-100 dark:divide-gray-800", className)} {...props}>{children}</tbody>; }
export function TableRow({ className, children, ...props }) { return <tr className={cn("hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", className)} {...props}>{children}</tr>; }
export function TableHead({ className, children, ...props }) { return <th className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400", className)} {...props}>{children}</th>; }
export function TableCell({ className, children, ...props }) { return <td className={cn("px-4 py-3 text-sm text-gray-700 dark:text-gray-300", className)} {...props}>{children}</td>; }

// ListItem — reusable list row with icon, title, subtitle, trailing
export function ListItem({ icon, title, subtitle, trailing, onClick, className }) {
  return <div onClick={onClick} className={cn("flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer", className)}>{icon && <div className="flex-shrink-0">{icon}</div>}<div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</p>{subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{subtitle}</p>}</div>{trailing && <div className="flex-shrink-0 text-sm text-gray-400 dark:text-gray-500">{trailing}</div>}</div>;
}

// CircularProgress — SVG ring for stats, timers, health scores
export function CircularProgress({ value = 0, size = 80, strokeWidth = 8, color = "text-blue-500", trackColor = "text-gray-200", label, sublabel, className }) {
  var r = (size / 2) - (strokeWidth / 2);
  var c = 2 * Math.PI * r;
  var offset = c - (c * Math.min(value, 100) / 100);
  return <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
    <svg width={size} height={size} className="-rotate-90"><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" className={trackColor} strokeWidth={strokeWidth}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" className={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} style={{transition:"stroke-dashoffset 1s ease"}}/></svg>
    {(label !== undefined) && <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-lg font-bold dark:text-gray-100">{label}</span>{sublabel && <span className="text-[10px] text-gray-500 dark:text-gray-400">{sublabel}</span>}</div>}
  </div>;
}

// StarRating — 1-5 star display for reviews, ratings
export function StarRating({ rating = 0, size = 16, className }) {
  return <div className={cn("flex gap-0.5", className)}>{[1,2,3,4,5].map(function(i) {
    var filled = i <= Math.round(rating);
    return <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className={filled ? "text-amber-400" : "text-gray-300"}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>;
  })}</div>;
}

// MiniBarChart — small inline bar chart for quick stats visualization
export function MiniBarChart({ values = [], color = "bg-blue-500", height = 40, barWidth = 6, className }) {
  var max = Math.max.apply(null, values.length ? values : [1]);
  return <div className={cn("flex items-end gap-1", className)} style={{ height: height }}>{values.map(function(v, i) {
    return <div key={i} className={cn("rounded-full transition-all duration-500", color)} style={{ width: barWidth, height: Math.max(4, (v / max) * height) }} />;
  })}</div>;
}

// GradientText — text with gradient fill for premium headings
export function GradientText({ children, from = "from-blue-500", to = "to-purple-600", className }) {
  return <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", from, to, className)}>{children}</span>;
}

// StatCard — number stat with label, icon, and optional trend
export function StatCard({ value, label, icon, trend, trendUp, className }) {
  return <div className={cn("rounded-3xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.06)] dark:bg-gray-900 dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_6px_16px_rgba(0,0,0,0.3)]", className)}>
    {icon && <div className="mb-2">{icon}</div>}
    <p className="text-3xl font-black tracking-tight dark:text-gray-100">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    {trend && <p className={cn("text-xs font-semibold mt-1", trendUp ? "text-emerald-500" : "text-red-500")}>{trendUp ? "↑" : "↓"} {trend}</p>}
  </div>;
}

// Every dashboard stat is told (lib/ai-provider.ts "Pattern V") to animate its number in with
// CountUp — was only defined inline in the preview (components/generate/sandpack-preview.tsx),
// so exported/built apps had no source for it. Same animation: counts 0 -> props.to over
// props.duration (default 900ms) at a 16ms tick, formatted with the en-IN locale grouping.
export function CountUp({ to, duration, prefix, suffix, className }) {
  var cs = useState(0); var count = cs[0]; var setCount = cs[1];
  useEffect(function () {
    var target = Number(to) || 0; var start = Date.now(); var dur = duration || 900;
    var id = setInterval(function () {
      var elapsed = Date.now() - start;
      if (elapsed >= dur) { setCount(target); clearInterval(id); return; }
      setCount(Math.round(target * (elapsed / dur)));
    }, 16);
    return function () { clearInterval(id); };
  }, [to, duration]);
  return <span className={className}>{prefix || ""}{count.toLocaleString("en-IN")}{suffix || ""}</span>;
}
