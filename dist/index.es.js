const c = [];
let a = /* @__PURE__ */ new Set(), s = !1;
function o() {
  for (const t of a)
    t();
  a.clear(), s = !1;
}
function u(t) {
  let e = t;
  const n = /* @__PURE__ */ new Set();
  return {
    get value() {
      const r = c[c.length - 1];
      return r && n.add(r), e;
    },
    set value(r) {
      if (e !== r) {
        e = r;
        for (const l of n)
          s ? a.add(l) : l();
        s || (s = !0, Promise.resolve().then(o));
      }
    }
  };
}
function i(t) {
  const e = () => {
    n(), c.push(e);
    try {
      t();
    } finally {
      c.pop();
    }
  }, n = () => {
    for (const r of e.trackedSignals || [])
      r.subscribers.delete(e);
    e.trackedSignals = [];
  };
  e.trackedSignals = [], e();
}
function f(t) {
  const e = u(null);
  return i(() => {
    e.value = t();
  }), {
    get value() {
      return e.value;
    },
    set value(n) {
      console.error(
        "Error: Derived signals are computed values and cannot be manually updated."
      );
    }
  };
}
export {
  u as createSignal,
  f as derived,
  i as effect
};
//# sourceMappingURL=index.es.js.map
