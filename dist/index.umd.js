(function(t,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(t=typeof globalThis<"u"?globalThis:t||self,n(t["add-lib"]={}))})(this,function(t){"use strict";const n=[];let a=new Set,c=!1;function u(){for(const r of a)r();a.clear(),c=!1}function f(r){let e=r;const s=new Set;return{get value(){const i=n[n.length-1];return i&&s.add(i),e},set value(i){if(e!==i){e=i;for(const o of s)c?a.add(o):o();c||(c=!0,Promise.resolve().then(u))}}}}function l(r){const e=()=>{s(),n.push(e);try{r()}finally{n.pop()}},s=()=>{for(const i of e.trackedSignals||[])i.subscribers.delete(e);e.trackedSignals=[]};e.trackedSignals=[],e()}function d(r){const e=f(null);return l(()=>{e.value=r()}),{get value(){return e.value},set value(s){console.error("Error: Derived signals are computed values and cannot be manually updated.")}}}t.createSignal=f,t.derived=d,t.effect=l,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=index.umd.js.map
