
import React from "react";

function _icon() {
  var paths = Array.prototype.slice.call(arguments);
  return function(props) {
    props = props || {};
    var s = props.size || 24;
    var c = props.color || "currentColor";
    var sw = props.strokeWidth || 2;
    var children = paths.map(function(d, i) {
      if (d.indexOf("CIRCLE") === 0) { var ps = d.slice(6).split(","); return React.createElement("circle", { key: i, cx: ps[0], cy: ps[1], r: ps[2] }); }
      if (d.indexOf("RECT") === 0) { var ps = d.slice(4).split(","); return React.createElement("rect", { key: i, x: ps[0], y: ps[1], width: ps[2], height: ps[3], rx: ps[4] || 0 }); }
      if (d.indexOf("LINE") === 0) { var ps = d.slice(4).split(","); return React.createElement("line", { key: i, x1: ps[0], y1: ps[1], x2: ps[2], y2: ps[3] }); }
      if (d.indexOf("POLY") === 0) { return React.createElement("polyline", { key: i, points: d.slice(4) }); }
      if (d.indexOf("PGON") === 0) { return React.createElement("polygon", { key: i, points: d.slice(4) }); }
      return React.createElement("path", { key: i, d: d });
    });
    return React.createElement.apply(React, ["svg", { xmlns: "http://www.w3.org/2000/svg", width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", className: props.className, style: props.style }].concat(children));
  };
}

export var Home = _icon("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10");
export var User = _icon("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "CIRCLE12,7,4");
export var Users = _icon("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "CIRCLE9,7,4", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75");
export var Settings = _icon("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z");
export var Search = _icon("CIRCLE11,11,8", "LINE21,21,16.65,16.65");
export var Heart = _icon("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");
export var Star = _icon("PGON12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2");
export var Bell = _icon("M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0");
export var Mail = _icon("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "POLY22,6 12,13 2,6");
export var Phone = _icon("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
export var Camera = _icon("M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z", "CIRCLE12,13,4");
export var Image = _icon("RECT3,3,18,18,2", "CIRCLE8.5,8.5,1.5", "POLY21,15 16,10 5,21");
export var Play = _icon("PGON5 3 19 12 5 21 5 3");
export var Pause = _icon("RECT6,4,4,16", "RECT14,4,4,16");
export var ChevronRight = _icon("POLY9,18 15,12 9,6");
export var ChevronLeft = _icon("POLY15,18 9,12 15,6");
export var ChevronDown = _icon("POLY6,9 12,15 18,9");
export var ChevronUp = _icon("POLY18,15 12,9 6,15");
export var ArrowLeft = _icon("LINE19,12,5,12", "POLY12,19 5,12 12,5");
export var ArrowRight = _icon("LINE5,12,19,12", "POLY12,5 19,12 12,19");
export var Plus = _icon("LINE12,5,12,19", "LINE5,12,19,12");
export var Minus = _icon("LINE5,12,19,12");
export var X = _icon("LINE18,6,6,18", "LINE6,6,18,18");
export var Check = _icon("POLY20,6 9,17 4,12");
export var Eye = _icon("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "CIRCLE12,12,3");
export var EyeOff = _icon("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24", "LINE1,1,23,23");
export var Lock = _icon("RECT3,11,18,11,2", "M7 11V7a5 5 0 0 1 10 0v4");
export var Calendar = _icon("RECT3,4,18,18,2", "LINE16,2,16,6", "LINE8,2,8,6", "LINE3,10,21,10");
export var Clock = _icon("CIRCLE12,12,10", "POLY12,6 12,12 16,14");
export var MapPin = _icon("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "CIRCLE12,10,3");
export var ShoppingCart = _icon("CIRCLE9,21,1", "CIRCLE20,21,1", "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6");
export var ShoppingBag = _icon("M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", "LINE3,6,21,6", "M16 10a4 4 0 0 1-8 0");
export var CreditCard = _icon("RECT1,4,22,16,2", "LINE1,10,23,10");
export var DollarSign = _icon("LINE12,1,12,23", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6");
export var TrendingUp = _icon("POLY23,6 13.5,15.5 8.5,10.5 1,18");
export var TrendingDown = _icon("POLY23,18 13.5,8.5 8.5,13.5 1,6");
export var BarChart2 = _icon("LINE18,20,18,10", "LINE12,20,12,4", "LINE6,20,6,14");
export var Activity = _icon("POLY1,12 5,12 9,21 15,3 19,12 23,12");
export var Zap = _icon("PGON13 2 3 14 12 14 11 22 21 10 12 10 13 2");
export var Sun = _icon("CIRCLE12,12,5", "LINE12,1,12,3", "LINE12,21,12,23", "LINE4.22,4.22,5.64,5.64", "LINE18.36,18.36,19.78,19.78", "LINE1,12,3,12", "LINE21,12,23,12", "LINE4.22,19.78,5.64,18.36", "LINE18.36,5.64,19.78,4.22");
export var Moon = _icon("M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z");
export var Cloud = _icon("M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z");
export var Download = _icon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "POLY7,10 12,15 17,10", "LINE12,15,12,3");
export var Upload = _icon("M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "POLY17,8 12,3 7,8", "LINE12,3,12,15");
export var Share2 = _icon("CIRCLE18,5,3", "CIRCLE6,12,3", "CIRCLE18,19,3", "LINE8.59,13.51,15.42,17.49", "LINE15.41,6.51,8.59,10.49");
export var Bookmark = _icon("M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z");
export var Filter = _icon("PGON22 3 2 3 10 12.46 10 12.46", "LINE10,12.46,10,21", "LINE14,17.54,14,21", "LINE10,12.46,14,17.54");
export var Edit2 = _icon("M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z");
export var Trash2 = _icon("POLY3,6 5,6 21,6", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "LINE10,11,10,17", "LINE14,11,14,17");
export var Copy = _icon("RECT9,9,13,13,2", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1");
export var Send = _icon("LINE22,2,11,13", "PGON22 2 15 22 2 22 22 2");
export var MessageCircle = _icon("M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z");
export var Globe = _icon("CIRCLE12,12,10", "LINE2,12,22,12", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z");
export var Menu = _icon("LINE3,12,21,12", "LINE3,6,21,6", "LINE3,18,21,18");
export var MoreHorizontal = _icon("CIRCLE12,12,1", "CIRCLE19,12,1", "CIRCLE5,12,1");
export var MoreVertical = _icon("CIRCLE12,12,1", "CIRCLE12,5,1", "CIRCLE12,19,1");
export var RefreshCw = _icon("POLY23,4 23,10 17,10", "POLY1,20 1,14 7,14", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15");
export var LogIn = _icon("M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", "POLY10,17 15,12 10,7", "LINE15,12,3,12");
export var LogOut = _icon("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "POLY16,17 21,12 16,7", "LINE21,12,9,12");
export var UserPlus = _icon("M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "CIRCLE8.5,7,4", "LINE20,8,20,14", "LINE23,11,17,11");
export var Shield = _icon("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z");
export var Award = _icon("CIRCLE12,8,7", "POLY8.21,13.89 7,23 12,20 17,23 15.79,13.88");
export var Target = _icon("CIRCLE12,12,10", "CIRCLE12,12,6", "CIRCLE12,12,2");
export var Flag = _icon("M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "LINE4,22,4,15");
export var AlertCircle = _icon("CIRCLE12,12,10", "LINE12,8,12,12", "LINE12,16,12.01,16");
export var Info = _icon("CIRCLE12,12,10", "LINE12,16,12,12", "LINE12,8,12.01,8");
export var HelpCircle = _icon("CIRCLE12,12,10", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "LINE12,17,12.01,17");
export var Package = _icon("LINE16.5,9.4,7.55,4.24", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", "POLY3.27,6.96 12,12.01 20.73,6.96", "LINE12,22.08,12,12");
export var Gift = _icon("RECT3,8,18,4,1", "M12 8v13", "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", "M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 8 12 8", "M16.5 8a2.5 2.5 0 0 0 0-5C15 3 12 8 12 8");
export var Smile = _icon("CIRCLE12,12,10", "M8 14s1.5 2 4 2 4-2 4-2", "LINE9,9,9.01,9", "LINE15,9,15.01,9");
export var ThumbsUp = _icon("M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z", "M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3");
export var Dumbbell = _icon("M6.5 6.5h11v11h-11z", "LINE6.5,12,2,12", "LINE22,12,17.5,12", "LINE2,9,2,15", "LINE22,9,22,15", "LINE5,7,5,17", "LINE19,7,19,17");
export var Utensils = _icon("M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", "LINE7,2,7,22", "LINE21,15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3", "LINE21,15,21,22");
export var Coffee = _icon("M18 8h1a4 4 0 0 1 0 8h-1", "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z", "LINE6,1,6,4", "LINE10,1,10,4", "LINE14,1,14,4");
export var Wallet = _icon("RECT2,5,20,16,2", "M16 14h.01", "M2 10h20");
export var PiggyBank = _icon("M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-3.5c1.2-1 2-2.5 2-4.5 0-.7-.1-1.4-.3-2", "LINE2,9,5,9", "CIRCLE15,9,1");
export var QrCode = _icon("RECT2,2,8,8", "RECT14,2,8,8", "RECT2,14,8,8", "RECT14,14,4,4", "LINE22,14,22,22", "LINE14,22,22,22", "LINE18,18,18,14");
export var Layers = _icon("PGON12 2 2 7 12 12 22 7 12 2", "POLY2,17 12,22 22,17", "POLY2,12 12,17 22,12");

// Aliases — cleanTsx normalizes numeric suffixes (Edit2→Edit, BarChart2→BarChart, etc.)
// so the generated code imports the canonical names. Point them at the defined icons.
export var BarChart = BarChart2;
export var Edit = Edit2;
export var Trash = Trash2;
export var Share = Share2;

// Fallback icon for undefined components
export var _fallbackIcon = function(props) {
  var s = props && props.size || 24;
  return React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: props && props.color || "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: props && props.className, style: props && props.style },
    React.createElement("circle", { cx: 12, cy: 12, r: 10 }),
    React.createElement("line", { x1: 12, y1: 8, x2: 12, y2: 12 }),
    React.createElement("line", { x1: 12, y1: 16, x2: 12.01, y2: 16 })
  );
};
