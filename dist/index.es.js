const c = [];
let u = /* @__PURE__ */ new Set(), o = !1;
function d() {
  for (const t of u)
    t();
  u.clear(), o = !1;
}
function g(t, e = {}) {
  const { history: s = !0, maxHistory: a = 10 } = e;
  let l = t;
  const f = /* @__PURE__ */ new Set(), n = s ? [t] : [];
  return {
    get value() {
      const r = c[c.length - 1];
      return r && f.add(r), l;
    },
    set value(r) {
      if (l !== r) {
        l = r, s && (n.push(r), n.length > a && n.shift());
        for (const i of f)
          o ? u.add(i) : i();
        o || (o = !0, Promise.resolve().then(d));
      }
    },
    /**
     * Gets the current signal's history upto N snapshots, where N is maxHistory or a historical value of the signal.
     * @param delta - If positive, returns the current value. If negative, returns the historical value `delta` steps back.
     * @returns The requested history or `null` if out of bounds or history is disabled.
     */
    history(r = 0) {
      if (!s)
        return console.warn("History is deactivated for this signal."), null;
      if (r >= 0) return n;
      const i = Math.abs(r);
      return i <= n.length ? n.reverse()[i] : (console.error(
        `state signal error: Requested history index (${r}) exceeds current size (${n.length}). Consider using an index between -${n.length} and -1.`
      ), null);
    }
  };
}
function h(t) {
  const e = () => {
    s(), c.push(e);
    try {
      t();
    } finally {
      c.pop();
    }
  }, s = () => {
    for (const a of e.trackedSignals || [])
      a.subscribers.delete(e);
    e.trackedSignals = [];
  };
  e.trackedSignals = [], e();
}
function v(t) {
  const e = g(null);
  return h(() => {
    e.value = t();
  }), {
    get value() {
      return e.value;
    },
    set value(s) {
      console.error(
        "Error: Derived signals are computed values and cannot be manually updated."
      );
    }
  };
}
export {
  g as createSignal,
  v as derived,
  h as effect
};
//# sourceMappingURL=index.es.js.map
