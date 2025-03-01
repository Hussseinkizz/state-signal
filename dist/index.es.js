const V = [];
let Me = null;
const Ye = /* @__PURE__ */ new Map();
let He = /* @__PURE__ */ new Set(), Re = !1;
function lt() {
  for (const w of He)
    w();
  He.clear(), Re = !1;
}
function dt(w, a = {}) {
  const { history: $ = !0, maxHistory: k = 10 } = a;
  let P = w;
  const T = /* @__PURE__ */ new Set(), j = $ ? [w] : [];
  let N = null;
  return {
    get value() {
      const R = V[V.length - 1];
      R && T.add(R);
      const S = V[V.length - 1], O = Ye.get(S);
      return O == null || O.add(this), P;
    },
    set value(R) {
      if (N) {
        console.error("Signal locked!");
        return;
      }
      if (P !== R) {
        P = R, $ && (j.push(R), j.length > k && j.shift());
        for (const S of T) {
          if (S === Me) {
            console.log("we are inside effect!", R), Me = null;
            continue;
          }
          Re ? He.add(S) : S();
        }
        Re || (Re = !0, Promise.resolve().then(lt));
      }
    },
    /**
     * Gets the current signal's history upto N snapshots, where N is maxHistory or a historical value of the signal.
     * @param delta - If positive, returns the current value. If negative, returns the historical value `delta` steps back.
     * @returns The requested history or `null` if out of bounds or history is disabled.
     */
    history(R = 0) {
      if (!$)
        return console.warn("History is deactivated for this signal."), null;
      if (R >= 0) return j;
      const S = Math.abs(R);
      return S <= j.length ? j.reverse()[S] : (console.error(
        `State signal error: Requested history index (${R}) exceeds current size (${j.length}).`
      ), null);
    },
    /**
     * Locks and makes the given signal immutable until it's unlocked, useful when passing it to external sources that you don't wish to modify it.
     * @returns lock_key: This should be used with signal's unlock method to make the signal mutable again.
     */
    lock() {
      return N ? (console.error("Signal already has a lock!"), null) : (N = Symbol(), N);
    },
    /**
     * Unlocks and makes the given immutable signal mutable.
     * @param lock_key - The signal's unlock key returned from it's lock method.
     * @returns bool - True if unlocked or false otherwise.
     */
    unlock(R) {
      return N ? R !== N ? (console.error("Unlock key does not match signal lock key!"), !1) : (N = null, !0) : (console.error("Signal has no lock!"), !1);
    },
    /**
     * Immutable set of subscribers.
     */
    get subscribers() {
      return Object.freeze(new Set(T));
    }
  };
}
function st(w) {
  const a = () => {
    $(), V.push(a), Me = a, Ye.set(a, /* @__PURE__ */ new Set());
    try {
      w();
    } finally {
      const k = Ye.get(a);
      k && k.clear(), V.pop();
    }
  }, $ = () => {
    for (const k of a.trackedSignals || [])
      k.subscribers.delete(a);
    a.trackedSignals = [];
  };
  a.trackedSignals = [], a();
}
function yt(w) {
  const a = dt(null);
  return st(() => {
    a.value = w();
  }), {
    get value() {
      return a.value;
    },
    set value($) {
      console.error(
        "Error: Derived signals are computed values and cannot be manually updated."
      );
    }
  };
}
var Le = { exports: {} }, d = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ot;
function pt() {
  if (ot) return d;
  ot = 1;
  var w = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), $ = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), T = Symbol.for("react.consumer"), j = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), J = Symbol.iterator;
  function se(n) {
    return n === null || typeof n != "object" ? null : (n = J && n[J] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ie = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ae = Object.assign, x = {};
  function U(n, o, f) {
    this.props = n, this.context = o, this.refs = x, this.updater = f || ie;
  }
  U.prototype.isReactComponent = {}, U.prototype.setState = function(n, o) {
    if (typeof n != "object" && typeof n != "function" && n != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, n, o, "setState");
  }, U.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function G() {
  }
  G.prototype = U.prototype;
  function q(n, o, f) {
    this.props = n, this.context = o, this.refs = x, this.updater = f || ie;
  }
  var K = q.prototype = new G();
  K.constructor = q, ae(K, U.prototype), K.isPureReactComponent = !0;
  var ce = Array.isArray, g = { H: null, A: null, T: null, S: null }, Q = Object.prototype.hasOwnProperty;
  function F(n, o, f, l, h, m) {
    return f = m.ref, {
      $$typeof: w,
      type: n,
      key: o,
      ref: f !== void 0 ? f : null,
      props: m
    };
  }
  function fe(n, o) {
    return F(
      n.type,
      o,
      void 0,
      void 0,
      void 0,
      n.props
    );
  }
  function M(n) {
    return typeof n == "object" && n !== null && n.$$typeof === w;
  }
  function le(n) {
    var o = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(f) {
      return o[f];
    });
  }
  var de = /\/+/g;
  function ee(n, o) {
    return typeof n == "object" && n !== null && n.key != null ? le("" + n.key) : o.toString(36);
  }
  function X() {
  }
  function pe(n) {
    switch (n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw n.reason;
      default:
        switch (typeof n.status == "string" ? n.then(X, X) : (n.status = "pending", n.then(
          function(o) {
            n.status === "pending" && (n.status = "fulfilled", n.value = o);
          },
          function(o) {
            n.status === "pending" && (n.status = "rejected", n.reason = o);
          }
        )), n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw n.reason;
        }
    }
    throw n;
  }
  function z(n, o, f, l, h) {
    var m = typeof n;
    (m === "undefined" || m === "boolean") && (n = null);
    var p = !1;
    if (n === null) p = !0;
    else
      switch (m) {
        case "bigint":
        case "string":
        case "number":
          p = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case w:
            case a:
              p = !0;
              break;
            case O:
              return p = n._init, z(
                p(n._payload),
                o,
                f,
                l,
                h
              );
          }
      }
    if (p)
      return h = h(n), p = l === "" ? "." + ee(n, 0) : l, ce(h) ? (f = "", p != null && (f = p.replace(de, "$&/") + "/"), z(h, o, f, "", function(te) {
        return te;
      })) : h != null && (M(h) && (h = fe(
        h,
        f + (h.key == null || n && n.key === h.key ? "" : ("" + h.key).replace(
          de,
          "$&/"
        ) + "/") + p
      )), o.push(h)), 1;
    p = 0;
    var H = l === "" ? "." : l + ":";
    if (ce(n))
      for (var _ = 0; _ < n.length; _++)
        l = n[_], m = H + ee(l, _), p += z(
          l,
          o,
          f,
          m,
          h
        );
    else if (_ = se(n), typeof _ == "function")
      for (n = _.call(n), _ = 0; !(l = n.next()).done; )
        l = l.value, m = H + ee(l, _++), p += z(
          l,
          o,
          f,
          m,
          h
        );
    else if (m === "object") {
      if (typeof n.then == "function")
        return z(
          pe(n),
          o,
          f,
          l,
          h
        );
      throw o = String(n), Error(
        "Objects are not valid as a React child (found: " + (o === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : o) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return p;
  }
  function Y(n, o, f) {
    if (n == null) return n;
    var l = [], h = 0;
    return z(n, l, "", "", function(m) {
      return o.call(f, m, h++);
    }), l;
  }
  function Z(n) {
    if (n._status === -1) {
      var o = n._result;
      o = o(), o.then(
        function(f) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = f);
        },
        function(f) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = f);
        }
      ), n._status === -1 && (n._status = 0, n._result = o);
    }
    if (n._status === 1) return n._result.default;
    throw n._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(n) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var o = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof n == "object" && n !== null && typeof n.message == "string" ? String(n.message) : String(n),
        error: n
      });
      if (!window.dispatchEvent(o)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", n);
      return;
    }
    console.error(n);
  };
  function C() {
  }
  return d.Children = {
    map: Y,
    forEach: function(n, o, f) {
      Y(
        n,
        function() {
          o.apply(this, arguments);
        },
        f
      );
    },
    count: function(n) {
      var o = 0;
      return Y(n, function() {
        o++;
      }), o;
    },
    toArray: function(n) {
      return Y(n, function(o) {
        return o;
      }) || [];
    },
    only: function(n) {
      if (!M(n))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return n;
    }
  }, d.Component = U, d.Fragment = $, d.Profiler = P, d.PureComponent = q, d.StrictMode = k, d.Suspense = R, d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = g, d.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, d.cache = function(n) {
    return function() {
      return n.apply(null, arguments);
    };
  }, d.cloneElement = function(n, o, f) {
    if (n == null)
      throw Error(
        "The argument must be a React element, but you passed " + n + "."
      );
    var l = ae({}, n.props), h = n.key, m = void 0;
    if (o != null)
      for (p in o.ref !== void 0 && (m = void 0), o.key !== void 0 && (h = "" + o.key), o)
        !Q.call(o, p) || p === "key" || p === "__self" || p === "__source" || p === "ref" && o.ref === void 0 || (l[p] = o[p]);
    var p = arguments.length - 2;
    if (p === 1) l.children = f;
    else if (1 < p) {
      for (var H = Array(p), _ = 0; _ < p; _++)
        H[_] = arguments[_ + 2];
      l.children = H;
    }
    return F(n.type, h, void 0, void 0, m, l);
  }, d.createContext = function(n) {
    return n = {
      $$typeof: j,
      _currentValue: n,
      _currentValue2: n,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, n.Provider = n, n.Consumer = {
      $$typeof: T,
      _context: n
    }, n;
  }, d.createElement = function(n, o, f) {
    var l, h = {}, m = null;
    if (o != null)
      for (l in o.key !== void 0 && (m = "" + o.key), o)
        Q.call(o, l) && l !== "key" && l !== "__self" && l !== "__source" && (h[l] = o[l]);
    var p = arguments.length - 2;
    if (p === 1) h.children = f;
    else if (1 < p) {
      for (var H = Array(p), _ = 0; _ < p; _++)
        H[_] = arguments[_ + 2];
      h.children = H;
    }
    if (n && n.defaultProps)
      for (l in p = n.defaultProps, p)
        h[l] === void 0 && (h[l] = p[l]);
    return F(n, m, void 0, void 0, null, h);
  }, d.createRef = function() {
    return { current: null };
  }, d.forwardRef = function(n) {
    return { $$typeof: N, render: n };
  }, d.isValidElement = M, d.lazy = function(n) {
    return {
      $$typeof: O,
      _payload: { _status: -1, _result: n },
      _init: Z
    };
  }, d.memo = function(n, o) {
    return {
      $$typeof: S,
      type: n,
      compare: o === void 0 ? null : o
    };
  }, d.startTransition = function(n) {
    var o = g.T, f = {};
    g.T = f;
    try {
      var l = n(), h = g.S;
      h !== null && h(f, l), typeof l == "object" && l !== null && typeof l.then == "function" && l.then(C, ve);
    } catch (m) {
      ve(m);
    } finally {
      g.T = o;
    }
  }, d.unstable_useCacheRefresh = function() {
    return g.H.useCacheRefresh();
  }, d.use = function(n) {
    return g.H.use(n);
  }, d.useActionState = function(n, o, f) {
    return g.H.useActionState(n, o, f);
  }, d.useCallback = function(n, o) {
    return g.H.useCallback(n, o);
  }, d.useContext = function(n) {
    return g.H.useContext(n);
  }, d.useDebugValue = function() {
  }, d.useDeferredValue = function(n, o) {
    return g.H.useDeferredValue(n, o);
  }, d.useEffect = function(n, o) {
    return g.H.useEffect(n, o);
  }, d.useId = function() {
    return g.H.useId();
  }, d.useImperativeHandle = function(n, o, f) {
    return g.H.useImperativeHandle(n, o, f);
  }, d.useInsertionEffect = function(n, o) {
    return g.H.useInsertionEffect(n, o);
  }, d.useLayoutEffect = function(n, o) {
    return g.H.useLayoutEffect(n, o);
  }, d.useMemo = function(n, o) {
    return g.H.useMemo(n, o);
  }, d.useOptimistic = function(n, o) {
    return g.H.useOptimistic(n, o);
  }, d.useReducer = function(n, o, f) {
    return g.H.useReducer(n, o, f);
  }, d.useRef = function(n) {
    return g.H.useRef(n);
  }, d.useState = function(n) {
    return g.H.useState(n);
  }, d.useSyncExternalStore = function(n, o, f) {
    return g.H.useSyncExternalStore(
      n,
      o,
      f
    );
  }, d.useTransition = function() {
    return g.H.useTransition();
  }, d.version = "19.0.0", d;
}
var ue = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
ue.exports;
var ut;
function vt() {
  return ut || (ut = 1, function(w, a) {
    process.env.NODE_ENV !== "production" && function() {
      function $(e, t) {
        Object.defineProperty(T.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              t[0],
              t[1]
            );
          }
        });
      }
      function k(e) {
        return e === null || typeof e != "object" ? null : (e = Ue && e[Ue] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function P(e, t) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var r = e + "." + t;
        Ie[r] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          t,
          e
        ), Ie[r] = !0);
      }
      function T(e, t, r) {
        this.props = e, this.context = t, this.refs = ke, this.updater = r || We;
      }
      function j() {
      }
      function N(e, t, r) {
        this.props = e, this.context = t, this.refs = ke, this.updater = r || We;
      }
      function R(e) {
        return "" + e;
      }
      function S(e) {
        try {
          R(e);
          var t = !1;
        } catch {
          t = !0;
        }
        if (t) {
          t = console;
          var r = t.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return r.call(
            t,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            u
          ), R(e);
        }
      }
      function O(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === at ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case _:
            return "Fragment";
          case H:
            return "Portal";
          case Se:
            return "Profiler";
          case te:
            return "StrictMode";
          case Ee:
            return "Suspense";
          case Ae:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case Oe:
              return (e.displayName || "Context") + ".Provider";
            case he:
              return (e._context.displayName || "Context") + ".Consumer";
            case ye:
              var t = e.render;
              return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case ne:
              return t = e.displayName || null, t !== null ? t : O(e.type) || "Memo";
            case re:
              t = e._payload, e = e._init;
              try {
                return O(e(t));
              } catch {
              }
          }
        return null;
      }
      function J(e) {
        return typeof e == "string" || typeof e == "function" || e === _ || e === Se || e === te || e === Ee || e === Ae || e === it || typeof e == "object" && e !== null && (e.$$typeof === re || e.$$typeof === ne || e.$$typeof === Oe || e.$$typeof === he || e.$$typeof === ye || e.$$typeof === ct || e.getModuleId !== void 0);
      }
      function se() {
      }
      function ie() {
        if (oe === 0) {
          qe = console.log, ze = console.info, xe = console.warn, De = console.error, Be = console.group, Ge = console.groupCollapsed, Ke = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: se,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        oe++;
      }
      function ae() {
        if (oe--, oe === 0) {
          var e = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: I({}, e, { value: qe }),
            info: I({}, e, { value: ze }),
            warn: I({}, e, { value: xe }),
            error: I({}, e, { value: De }),
            group: I({}, e, { value: Be }),
            groupCollapsed: I({}, e, { value: Ge }),
            groupEnd: I({}, e, { value: Ke })
          });
        }
        0 > oe && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function x(e) {
        if (je === void 0)
          try {
            throw Error();
          } catch (r) {
            var t = r.stack.trim().match(/\n( *(at )?)/);
            je = t && t[1] || "", Qe = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + je + e + Qe;
      }
      function U(e, t) {
        if (!e || Ne) return "";
        var r = $e.get(e);
        if (r !== void 0) return r;
        Ne = !0, r = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var u = null;
        u = v.H, v.H = null, ie();
        try {
          var s = {
            DetermineComponentFrameRoot: function() {
              try {
                if (t) {
                  var L = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(L.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(L, []);
                    } catch (W) {
                      var Te = W;
                    }
                    Reflect.construct(e, [], L);
                  } else {
                    try {
                      L.call();
                    } catch (W) {
                      Te = W;
                    }
                    e.call(L.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (W) {
                    Te = W;
                  }
                  (L = e()) && typeof L.catch == "function" && L.catch(function() {
                  });
                }
              } catch (W) {
                if (W && Te && typeof W.stack == "string")
                  return [W.stack, Te.stack];
              }
              return [null, null];
            }
          };
          s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var c = Object.getOwnPropertyDescriptor(
            s.DetermineComponentFrameRoot,
            "name"
          );
          c && c.configurable && Object.defineProperty(
            s.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var i = s.DetermineComponentFrameRoot(), E = i[0], y = i[1];
          if (E && y) {
            var b = E.split(`
`), A = y.split(`
`);
            for (i = c = 0; c < b.length && !b[c].includes(
              "DetermineComponentFrameRoot"
            ); )
              c++;
            for (; i < A.length && !A[i].includes(
              "DetermineComponentFrameRoot"
            ); )
              i++;
            if (c === b.length || i === A.length)
              for (c = b.length - 1, i = A.length - 1; 1 <= c && 0 <= i && b[c] !== A[i]; )
                i--;
            for (; 1 <= c && 0 <= i; c--, i--)
              if (b[c] !== A[i]) {
                if (c !== 1 || i !== 1)
                  do
                    if (c--, i--, 0 > i || b[c] !== A[i]) {
                      var B = `
` + b[c].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && $e.set(e, B), B;
                    }
                  while (1 <= c && 0 <= i);
                break;
              }
          }
        } finally {
          Ne = !1, v.H = u, ae(), Error.prepareStackTrace = r;
        }
        return b = (b = e ? e.displayName || e.name : "") ? x(b) : "", typeof e == "function" && $e.set(e, b), b;
      }
      function G(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var t = e.prototype;
          return U(
            e,
            !(!t || !t.isReactComponent)
          );
        }
        if (typeof e == "string") return x(e);
        switch (e) {
          case Ee:
            return x("Suspense");
          case Ae:
            return x("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case ye:
              return e = U(e.render, !1), e;
            case ne:
              return G(e.type);
            case re:
              t = e._payload, e = e._init;
              try {
                return G(e(t));
              } catch {
              }
          }
        return "";
      }
      function q() {
        var e = v.A;
        return e === null ? null : e.getOwner();
      }
      function K(e) {
        if (_e.call(e, "key")) {
          var t = Object.getOwnPropertyDescriptor(e, "key").get;
          if (t && t.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function ce(e, t) {
        function r() {
          Xe || (Xe = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            t
          ));
        }
        r.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: r,
          configurable: !0
        });
      }
      function g() {
        var e = O(this.type);
        return Ve[e] || (Ve[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function Q(e, t, r, u, s, c) {
        return r = c.ref, e = {
          $$typeof: p,
          type: e,
          key: t,
          props: c,
          _owner: s
        }, (r !== void 0 ? r : null) !== null ? Object.defineProperty(e, "ref", {
          enumerable: !1,
          get: g
        }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(e, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
      }
      function F(e, t) {
        return t = Q(
          e.type,
          t,
          void 0,
          void 0,
          e._owner,
          e.props
        ), t._store.validated = e._store.validated, t;
      }
      function fe(e, t) {
        if (typeof e == "object" && e && e.$$typeof !== ft) {
          if (me(e))
            for (var r = 0; r < e.length; r++) {
              var u = e[r];
              M(u) && le(u, t);
            }
          else if (M(e))
            e._store && (e._store.validated = 1);
          else if (r = k(e), typeof r == "function" && r !== e.entries && (r = r.call(e), r !== e))
            for (; !(e = r.next()).done; )
              M(e.value) && le(e.value, t);
        }
      }
      function M(e) {
        return typeof e == "object" && e !== null && e.$$typeof === p;
      }
      function le(e, t) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, t = de(t), !Je[t])) {
          Je[t] = !0;
          var r = "";
          e && e._owner != null && e._owner !== q() && (r = null, typeof e._owner.tag == "number" ? r = O(e._owner.type) : typeof e._owner.name == "string" && (r = e._owner.name), r = " It was passed a child from " + r + ".");
          var u = v.getCurrentStack;
          v.getCurrentStack = function() {
            var s = G(e.type);
            return u && (s += u() || ""), s;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            t,
            r
          ), v.getCurrentStack = u;
        }
      }
      function de(e) {
        var t = "", r = q();
        return r && (r = O(r.type)) && (t = `

Check the render method of \`` + r + "`."), t || (e = O(e)) && (t = `

Check the top-level render call using <` + e + ">."), t;
      }
      function ee(e) {
        var t = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(r) {
          return t[r];
        });
      }
      function X(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? (S(e.key), ee("" + e.key)) : t.toString(36);
      }
      function pe() {
      }
      function z(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(pe, pe) : (e.status = "pending", e.then(
              function(t) {
                e.status === "pending" && (e.status = "fulfilled", e.value = t);
              },
              function(t) {
                e.status === "pending" && (e.status = "rejected", e.reason = t);
              }
            )), e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
            }
        }
        throw e;
      }
      function Y(e, t, r, u, s) {
        var c = typeof e;
        (c === "undefined" || c === "boolean") && (e = null);
        var i = !1;
        if (e === null) i = !0;
        else
          switch (c) {
            case "bigint":
            case "string":
            case "number":
              i = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case p:
                case H:
                  i = !0;
                  break;
                case re:
                  return i = e._init, Y(
                    i(e._payload),
                    t,
                    r,
                    u,
                    s
                  );
              }
          }
        if (i) {
          i = e, s = s(i);
          var E = u === "" ? "." + X(i, 0) : u;
          return me(s) ? (r = "", E != null && (r = E.replace(et, "$&/") + "/"), Y(s, t, r, "", function(b) {
            return b;
          })) : s != null && (M(s) && (s.key != null && (i && i.key === s.key || S(s.key)), r = F(
            s,
            r + (s.key == null || i && i.key === s.key ? "" : ("" + s.key).replace(
              et,
              "$&/"
            ) + "/") + E
          ), u !== "" && i != null && M(i) && i.key == null && i._store && !i._store.validated && (r._store.validated = 2), s = r), t.push(s)), 1;
        }
        if (i = 0, E = u === "" ? "." : u + ":", me(e))
          for (var y = 0; y < e.length; y++)
            u = e[y], c = E + X(u, y), i += Y(
              u,
              t,
              r,
              c,
              s
            );
        else if (y = k(e), typeof y == "function")
          for (y === e.entries && (Fe || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Fe = !0), e = y.call(e), y = 0; !(u = e.next()).done; )
            u = u.value, c = E + X(u, y++), i += Y(
              u,
              t,
              r,
              c,
              s
            );
        else if (c === "object") {
          if (typeof e.then == "function")
            return Y(
              z(e),
              t,
              r,
              u,
              s
            );
          throw t = String(e), Error(
            "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return i;
      }
      function Z(e, t, r) {
        if (e == null) return e;
        var u = [], s = 0;
        return Y(e, u, "", "", function(c) {
          return t.call(r, c, s++);
        }), u;
      }
      function ve(e) {
        if (e._status === -1) {
          var t = e._result;
          t = t(), t.then(
            function(r) {
              (e._status === 0 || e._status === -1) && (e._status = 1, e._result = r);
            },
            function(r) {
              (e._status === 0 || e._status === -1) && (e._status = 2, e._result = r);
            }
          ), e._status === -1 && (e._status = 0, e._result = t);
        }
        if (e._status === 1)
          return t = e._result, t === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            t
          ), "default" in t || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            t
          ), t.default;
        throw e._result;
      }
      function C() {
        var e = v.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function n() {
      }
      function o(e) {
        if (we === null)
          try {
            var t = ("require" + Math.random()).slice(0, 7);
            we = (w && w[t]).call(
              w,
              "timers"
            ).setImmediate;
          } catch {
            we = function(u) {
              nt === !1 && (nt = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var s = new MessageChannel();
              s.port1.onmessage = u, s.port2.postMessage(void 0);
            };
          }
        return we(e);
      }
      function f(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function l(e, t) {
        t !== be - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), be = t;
      }
      function h(e, t, r) {
        var u = v.actQueue;
        if (u !== null)
          if (u.length !== 0)
            try {
              m(u), o(function() {
                return h(e, t, r);
              });
              return;
            } catch (s) {
              v.thrownErrors.push(s);
            }
          else v.actQueue = null;
        0 < v.thrownErrors.length ? (u = f(v.thrownErrors), v.thrownErrors.length = 0, r(u)) : t(e);
      }
      function m(e) {
        if (!Pe) {
          Pe = !0;
          var t = 0;
          try {
            for (; t < e.length; t++) {
              var r = e[t];
              do {
                v.didUsePromise = !1;
                var u = r(!1);
                if (u !== null) {
                  if (v.didUsePromise) {
                    e[t] = r, e.splice(0, t);
                    return;
                  }
                  r = u;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (s) {
            e.splice(0, t + 1), v.thrownErrors.push(s);
          } finally {
            Pe = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var p = Symbol.for("react.transitional.element"), H = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), Se = Symbol.for("react.profiler"), he = Symbol.for("react.consumer"), Oe = Symbol.for("react.context"), ye = Symbol.for("react.forward_ref"), Ee = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), it = Symbol.for("react.offscreen"), Ue = Symbol.iterator, Ie = {}, We = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(e) {
          P(e, "forceUpdate");
        },
        enqueueReplaceState: function(e) {
          P(e, "replaceState");
        },
        enqueueSetState: function(e) {
          P(e, "setState");
        }
      }, I = Object.assign, ke = {};
      Object.freeze(ke), T.prototype.isReactComponent = {}, T.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, t, "setState");
      }, T.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      var D = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, ge;
      for (ge in D)
        D.hasOwnProperty(ge) && $(ge, D[ge]);
      j.prototype = T.prototype, D = N.prototype = new j(), D.constructor = N, I(D, T.prototype), D.isPureReactComponent = !0;
      var me = Array.isArray, at = Symbol.for("react.client.reference"), v = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      }, _e = Object.prototype.hasOwnProperty, ct = Symbol.for("react.client.reference"), oe = 0, qe, ze, xe, De, Be, Ge, Ke;
      se.__reactDisabledLog = !0;
      var je, Qe, Ne = !1, $e = new (typeof WeakMap == "function" ? WeakMap : Map)(), ft = Symbol.for("react.client.reference"), Xe, Ze, Ve = {}, Je = {}, Fe = !1, et = /\/+/g, tt = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(t)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, nt = !1, we = null, be = 0, Ce = !1, Pe = !1, rt = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : o;
      a.Children = {
        map: Z,
        forEach: function(e, t, r) {
          Z(
            e,
            function() {
              t.apply(this, arguments);
            },
            r
          );
        },
        count: function(e) {
          var t = 0;
          return Z(e, function() {
            t++;
          }), t;
        },
        toArray: function(e) {
          return Z(e, function(t) {
            return t;
          }) || [];
        },
        only: function(e) {
          if (!M(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, a.Component = T, a.Fragment = _, a.Profiler = Se, a.PureComponent = N, a.StrictMode = te, a.Suspense = Ee, a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v, a.act = function(e) {
        var t = v.actQueue, r = be;
        be++;
        var u = v.actQueue = t !== null ? t : [], s = !1;
        try {
          var c = e();
        } catch (y) {
          v.thrownErrors.push(y);
        }
        if (0 < v.thrownErrors.length)
          throw l(t, r), e = f(v.thrownErrors), v.thrownErrors.length = 0, e;
        if (c !== null && typeof c == "object" && typeof c.then == "function") {
          var i = c;
          return rt(function() {
            s || Ce || (Ce = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(y, b) {
              s = !0, i.then(
                function(A) {
                  if (l(t, r), r === 0) {
                    try {
                      m(u), o(function() {
                        return h(
                          A,
                          y,
                          b
                        );
                      });
                    } catch (L) {
                      v.thrownErrors.push(L);
                    }
                    if (0 < v.thrownErrors.length) {
                      var B = f(
                        v.thrownErrors
                      );
                      v.thrownErrors.length = 0, b(B);
                    }
                  } else y(A);
                },
                function(A) {
                  l(t, r), 0 < v.thrownErrors.length && (A = f(
                    v.thrownErrors
                  ), v.thrownErrors.length = 0), b(A);
                }
              );
            }
          };
        }
        var E = c;
        if (l(t, r), r === 0 && (m(u), u.length !== 0 && rt(function() {
          s || Ce || (Ce = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), v.actQueue = null), 0 < v.thrownErrors.length)
          throw e = f(v.thrownErrors), v.thrownErrors.length = 0, e;
        return {
          then: function(y, b) {
            s = !0, r === 0 ? (v.actQueue = u, o(function() {
              return h(
                E,
                y,
                b
              );
            })) : y(E);
          }
        };
      }, a.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, a.cloneElement = function(e, t, r) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var u = I({}, e.props), s = e.key, c = e._owner;
        if (t != null) {
          var i;
          e: {
            if (_e.call(t, "ref") && (i = Object.getOwnPropertyDescriptor(
              t,
              "ref"
            ).get) && i.isReactWarning) {
              i = !1;
              break e;
            }
            i = t.ref !== void 0;
          }
          i && (c = q()), K(t) && (S(t.key), s = "" + t.key);
          for (E in t)
            !_e.call(t, E) || E === "key" || E === "__self" || E === "__source" || E === "ref" && t.ref === void 0 || (u[E] = t[E]);
        }
        var E = arguments.length - 2;
        if (E === 1) u.children = r;
        else if (1 < E) {
          i = Array(E);
          for (var y = 0; y < E; y++)
            i[y] = arguments[y + 2];
          u.children = i;
        }
        for (u = Q(e.type, s, void 0, void 0, c, u), s = 2; s < arguments.length; s++)
          fe(arguments[s], u.type);
        return u;
      }, a.createContext = function(e) {
        return e = {
          $$typeof: Oe,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: he,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, a.createElement = function(e, t, r) {
        if (J(e))
          for (var u = 2; u < arguments.length; u++)
            fe(arguments[u], e);
        else {
          if (u = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var s = "null";
          else
            me(e) ? s = "array" : e !== void 0 && e.$$typeof === p ? (s = "<" + (O(e.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            s,
            u
          );
        }
        var c;
        if (u = {}, s = null, t != null)
          for (c in Ze || !("__self" in t) || "key" in t || (Ze = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), K(t) && (S(t.key), s = "" + t.key), t)
            _e.call(t, c) && c !== "key" && c !== "__self" && c !== "__source" && (u[c] = t[c]);
        var i = arguments.length - 2;
        if (i === 1) u.children = r;
        else if (1 < i) {
          for (var E = Array(i), y = 0; y < i; y++)
            E[y] = arguments[y + 2];
          Object.freeze && Object.freeze(E), u.children = E;
        }
        if (e && e.defaultProps)
          for (c in i = e.defaultProps, i)
            u[c] === void 0 && (u[c] = i[c]);
        return s && ce(
          u,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), Q(e, s, void 0, void 0, q(), u);
      }, a.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, a.forwardRef = function(e) {
        e != null && e.$$typeof === ne ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof e != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          e === null ? "null" : typeof e
        ) : e.length !== 0 && e.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), e != null && e.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var t = { $$typeof: ye, render: e }, r;
        return Object.defineProperty(t, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return r;
          },
          set: function(u) {
            r = u, e.name || e.displayName || (Object.defineProperty(e, "name", { value: u }), e.displayName = u);
          }
        }), t;
      }, a.isValidElement = M, a.lazy = function(e) {
        return {
          $$typeof: re,
          _payload: { _status: -1, _result: e },
          _init: ve
        };
      }, a.memo = function(e, t) {
        J(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), t = {
          $$typeof: ne,
          type: e,
          compare: t === void 0 ? null : t
        };
        var r;
        return Object.defineProperty(t, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return r;
          },
          set: function(u) {
            r = u, e.name || e.displayName || (Object.defineProperty(e, "name", { value: u }), e.displayName = u);
          }
        }), t;
      }, a.startTransition = function(e) {
        var t = v.T, r = {};
        v.T = r, r._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var u = e(), s = v.S;
          s !== null && s(r, u), typeof u == "object" && u !== null && typeof u.then == "function" && u.then(n, tt);
        } catch (c) {
          tt(c);
        } finally {
          t === null && r._updatedFibers && (e = r._updatedFibers.size, r._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), v.T = t;
        }
      }, a.unstable_useCacheRefresh = function() {
        return C().useCacheRefresh();
      }, a.use = function(e) {
        return C().use(e);
      }, a.useActionState = function(e, t, r) {
        return C().useActionState(
          e,
          t,
          r
        );
      }, a.useCallback = function(e, t) {
        return C().useCallback(e, t);
      }, a.useContext = function(e) {
        var t = C();
        return e.$$typeof === he && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), t.useContext(e);
      }, a.useDebugValue = function(e, t) {
        return C().useDebugValue(e, t);
      }, a.useDeferredValue = function(e, t) {
        return C().useDeferredValue(e, t);
      }, a.useEffect = function(e, t) {
        return C().useEffect(e, t);
      }, a.useId = function() {
        return C().useId();
      }, a.useImperativeHandle = function(e, t, r) {
        return C().useImperativeHandle(e, t, r);
      }, a.useInsertionEffect = function(e, t) {
        return C().useInsertionEffect(e, t);
      }, a.useLayoutEffect = function(e, t) {
        return C().useLayoutEffect(e, t);
      }, a.useMemo = function(e, t) {
        return C().useMemo(e, t);
      }, a.useOptimistic = function(e, t) {
        return C().useOptimistic(e, t);
      }, a.useReducer = function(e, t, r) {
        return C().useReducer(e, t, r);
      }, a.useRef = function(e) {
        return C().useRef(e);
      }, a.useState = function(e) {
        return C().useState(e);
      }, a.useSyncExternalStore = function(e, t, r) {
        return C().useSyncExternalStore(
          e,
          t,
          r
        );
      }, a.useTransition = function() {
        return C().useTransition();
      }, a.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(ue, ue.exports)), ue.exports;
}
process.env.NODE_ENV === "production" ? Le.exports = pt() : Le.exports = vt();
var ht = Le.exports;
function Et(w) {
  function a(T) {
    return st(() => {
      const j = w.value;
      T();
    }), () => {
    };
  }
  function $() {
    return w.value;
  }
  const k = ht.useSyncExternalStore(a, $);
  function P(T) {
    typeof T == "function" ? w.value = T(w.value) : w.value = T;
  }
  return [k, P];
}
export {
  dt as createSignal,
  yt as derived,
  st as effect,
  Et as useSignal
};
//# sourceMappingURL=index.es.js.map
