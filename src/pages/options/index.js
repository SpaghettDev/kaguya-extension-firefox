import "../../../assets/js/modulepreload-polyfill.0c213636.js";
import {
    d as Ld,
    AnimeServices,
    MangaServices,
} from "../../../assets/js/index.8404c945.js";
function Td(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const l in r)
                if (l !== "default" && !(l in e)) {
                    const o = Object.getOwnPropertyDescriptor(r, l);
                    o &&
                        Object.defineProperty(
                            e,
                            l,
                            o.get ? o : { enumerable: !0, get: () => r[l] }
                        );
                }
        }
    }
    return Object.freeze(
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
    );
}
var F = { exports: {} },
    V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zr = Symbol.for("react.element"),
    Md = Symbol.for("react.portal"),
    Od = Symbol.for("react.fragment"),
    Fd = Symbol.for("react.strict_mode"),
    Ud = Symbol.for("react.profiler"),
    jd = Symbol.for("react.provider"),
    Id = Symbol.for("react.context"),
    Ad = Symbol.for("react.forward_ref"),
    Bd = Symbol.for("react.suspense"),
    $d = Symbol.for("react.memo"),
    Hd = Symbol.for("react.lazy"),
    ya = Symbol.iterator;
function Vd(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (ya && e[ya]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var Ks = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    Ys = Object.assign,
    Xs = {};
function qn(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Xs),
        (this.updater = n || Ks);
}
qn.prototype.isReactComponent = {};
qn.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
qn.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Gs() {}
Gs.prototype = qn.prototype;
function fu(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = Xs),
        (this.updater = n || Ks);
}
var du = (fu.prototype = new Gs());
du.constructor = fu;
Ys(du, qn.prototype);
du.isPureReactComponent = !0;
var wa = Array.isArray,
    Js = Object.prototype.hasOwnProperty,
    pu = { current: null },
    Zs = { key: !0, ref: !0, __self: !0, __source: !0 };
function qs(e, t, n) {
    var r,
        l = {},
        o = null,
        i = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (i = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
            Js.call(t, r) && !Zs.hasOwnProperty(r) && (l[r] = t[r]);
    var u = arguments.length - 2;
    if (u === 1) l.children = n;
    else if (1 < u) {
        for (var a = Array(u), s = 0; s < u; s++) a[s] = arguments[s + 2];
        l.children = a;
    }
    if (e && e.defaultProps)
        for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
    return {
        $$typeof: Zr,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: pu.current,
    };
}
function Wd(e, t) {
    return {
        $$typeof: Zr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
    };
}
function hu(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Zr;
}
function Qd(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var Sa = /\/+/g;
function Bo(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? Qd("" + e.key)
        : t.toString(36);
}
function Pl(e, t, n, r, l) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var i = !1;
    if (e === null) i = !0;
    else
        switch (o) {
            case "string":
            case "number":
                i = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case Zr:
                    case Md:
                        i = !0;
                }
        }
    if (i)
        return (
            (i = e),
            (l = l(i)),
            (e = r === "" ? "." + Bo(i, 0) : r),
            wa(l)
                ? ((n = ""),
                  e != null && (n = e.replace(Sa, "$&/") + "/"),
                  Pl(l, t, n, "", function (s) {
                      return s;
                  }))
                : l != null &&
                  (hu(l) &&
                      (l = Wd(
                          l,
                          n +
                              (!l.key || (i && i.key === l.key)
                                  ? ""
                                  : ("" + l.key).replace(Sa, "$&/") + "/") +
                              e
                      )),
                  t.push(l)),
            1
        );
    if (((i = 0), (r = r === "" ? "." : r + ":"), wa(e)))
        for (var u = 0; u < e.length; u++) {
            o = e[u];
            var a = r + Bo(o, u);
            i += Pl(o, t, n, a, l);
        }
    else if (((a = Vd(e)), typeof a == "function"))
        for (e = a.call(e), u = 0; !(o = e.next()).done; )
            (o = o.value), (a = r + Bo(o, u++)), (i += Pl(o, t, n, a, l));
    else if (o === "object")
        throw (
            ((t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                    (t === "[object Object]"
                        ? "object with keys {" + Object.keys(e).join(", ") + "}"
                        : t) +
                    "). If you meant to render a collection of children, use an array instead."
            ))
        );
    return i;
}
function al(e, t, n) {
    if (e == null) return e;
    var r = [],
        l = 0;
    return (
        Pl(e, r, "", "", function (o) {
            return t.call(n, o, l++);
        }),
        r
    );
}
function Kd(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                }
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var Le = { current: null },
    _l = { transition: null },
    Yd = {
        ReactCurrentDispatcher: Le,
        ReactCurrentBatchConfig: _l,
        ReactCurrentOwner: pu,
    };
V.Children = {
    map: al,
    forEach: function (e, t, n) {
        al(
            e,
            function () {
                t.apply(this, arguments);
            },
            n
        );
    },
    count: function (e) {
        var t = 0;
        return (
            al(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            al(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!hu(e))
            throw Error(
                "React.Children.only expected to receive a single React element child."
            );
        return e;
    },
};
V.Component = qn;
V.Fragment = Od;
V.Profiler = Ud;
V.PureComponent = fu;
V.StrictMode = Fd;
V.Suspense = Bd;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Yd;
V.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
                e +
                "."
        );
    var r = Ys({}, e.props),
        l = e.key,
        o = e.ref,
        i = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((o = t.ref), (i = pu.current)),
            t.key !== void 0 && (l = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var u = e.type.defaultProps;
        for (a in t)
            Js.call(t, a) &&
                !Zs.hasOwnProperty(a) &&
                (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
    }
    var a = arguments.length - 2;
    if (a === 1) r.children = n;
    else if (1 < a) {
        u = Array(a);
        for (var s = 0; s < a; s++) u[s] = arguments[s + 2];
        r.children = u;
    }
    return { $$typeof: Zr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
V.createContext = function (e) {
    return (
        (e = {
            $$typeof: Id,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: jd, _context: e }),
        (e.Consumer = e)
    );
};
V.createElement = qs;
V.createFactory = function (e) {
    var t = qs.bind(null, e);
    return (t.type = e), t;
};
V.createRef = function () {
    return { current: null };
};
V.forwardRef = function (e) {
    return { $$typeof: Ad, render: e };
};
V.isValidElement = hu;
V.lazy = function (e) {
    return { $$typeof: Hd, _payload: { _status: -1, _result: e }, _init: Kd };
};
V.memo = function (e, t) {
    return { $$typeof: $d, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function (e) {
    var t = _l.transition;
    _l.transition = {};
    try {
        e();
    } finally {
        _l.transition = t;
    }
};
V.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
};
V.useCallback = function (e, t) {
    return Le.current.useCallback(e, t);
};
V.useContext = function (e) {
    return Le.current.useContext(e);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (e) {
    return Le.current.useDeferredValue(e);
};
V.useEffect = function (e, t) {
    return Le.current.useEffect(e, t);
};
V.useId = function () {
    return Le.current.useId();
};
V.useImperativeHandle = function (e, t, n) {
    return Le.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function (e, t) {
    return Le.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function (e, t) {
    return Le.current.useLayoutEffect(e, t);
};
V.useMemo = function (e, t) {
    return Le.current.useMemo(e, t);
};
V.useReducer = function (e, t, n) {
    return Le.current.useReducer(e, t, n);
};
V.useRef = function (e) {
    return Le.current.useRef(e);
};
V.useState = function (e) {
    return Le.current.useState(e);
};
V.useSyncExternalStore = function (e, t, n) {
    return Le.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function () {
    return Le.current.useTransition();
};
V.version = "18.2.0";
(function (e) {
    e.exports = V;
})(F);
const Xd = Ld(F.exports),
    bs = Td({ __proto__: null, default: Xd }, [F.exports]);
/**
 * @remix-run/router v1.7.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function te() {
    return (
        (te = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        te.apply(this, arguments)
    );
}
var ce;
(function (e) {
    (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(ce || (ce = {}));
const ka = "popstate";
function Gd(e) {
    e === void 0 && (e = {});
    function t(l, o) {
        let {
            pathname: i = "/",
            search: u = "",
            hash: a = "",
        } = mt(l.location.hash.substr(1));
        return Tr(
            "",
            { pathname: i, search: u, hash: a },
            (o.state && o.state.usr) || null,
            (o.state && o.state.key) || "default"
        );
    }
    function n(l, o) {
        let i = l.document.querySelector("base"),
            u = "";
        if (i && i.getAttribute("href")) {
            let a = l.location.href,
                s = a.indexOf("#");
            u = s === -1 ? a : a.slice(0, s);
        }
        return u + "#" + (typeof o == "string" ? o : fn(o));
    }
    function r(l, o) {
        cn(
            l.pathname.charAt(0) === "/",
            "relative pathnames are not supported in hash history.push(" +
                JSON.stringify(o) +
                ")"
        );
    }
    return Zd(t, n, r, e);
}
function H(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function cn(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t);
        } catch {}
    }
}
function Jd() {
    return Math.random().toString(36).substr(2, 8);
}
function xa(e, t) {
    return { usr: e.state, key: e.key, idx: t };
}
function Tr(e, t, n, r) {
    return (
        n === void 0 && (n = null),
        te(
            {
                pathname: typeof e == "string" ? e : e.pathname,
                search: "",
                hash: "",
            },
            typeof t == "string" ? mt(t) : t,
            { state: n, key: (t && t.key) || r || Jd() }
        )
    );
}
function fn(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return (
        n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
        r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
        t
    );
}
function mt(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
        let r = e.indexOf("?");
        r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
            e && (t.pathname = e);
    }
    return t;
}
function Zd(e, t, n, r) {
    r === void 0 && (r = {});
    let { window: l = document.defaultView, v5Compat: o = !1 } = r,
        i = l.history,
        u = ce.Pop,
        a = null,
        s = p();
    s == null && ((s = 0), i.replaceState(te({}, i.state, { idx: s }), ""));
    function p() {
        return (i.state || { idx: null }).idx;
    }
    function v() {
        u = ce.Pop;
        let _ = p(),
            d = _ == null ? null : _ - s;
        (s = _), a && a({ action: u, location: S.location, delta: d });
    }
    function m(_, d) {
        u = ce.Push;
        let c = Tr(S.location, _, d);
        n && n(c, _), (s = p() + 1);
        let h = xa(c, s),
            f = S.createHref(c);
        try {
            i.pushState(h, "", f);
        } catch (E) {
            if (E instanceof DOMException && E.name === "DataCloneError")
                throw E;
            l.location.assign(f);
        }
        o && a && a({ action: u, location: S.location, delta: 1 });
    }
    function k(_, d) {
        u = ce.Replace;
        let c = Tr(S.location, _, d);
        n && n(c, _), (s = p());
        let h = xa(c, s),
            f = S.createHref(c);
        i.replaceState(h, "", f),
            o && a && a({ action: u, location: S.location, delta: 0 });
    }
    function w(_) {
        let d =
                l.location.origin !== "null"
                    ? l.location.origin
                    : l.location.href,
            c = typeof _ == "string" ? _ : fn(_);
        return (
            H(
                d,
                "No window.location.(origin|href) available to create URL for href: " +
                    c
            ),
            new URL(c, d)
        );
    }
    let S = {
        get action() {
            return u;
        },
        get location() {
            return e(l, i);
        },
        listen(_) {
            if (a)
                throw new Error("A history only accepts one active listener");
            return (
                l.addEventListener(ka, v),
                (a = _),
                () => {
                    l.removeEventListener(ka, v), (a = null);
                }
            );
        },
        createHref(_) {
            return t(l, _);
        },
        createURL: w,
        encodeLocation(_) {
            let d = w(_);
            return { pathname: d.pathname, search: d.search, hash: d.hash };
        },
        push: m,
        replace: k,
        go(_) {
            return i.go(_);
        },
    };
    return S;
}
var de;
(function (e) {
    (e.data = "data"),
        (e.deferred = "deferred"),
        (e.redirect = "redirect"),
        (e.error = "error");
})(de || (de = {}));
const qd = new Set([
    "lazy",
    "caseSensitive",
    "path",
    "id",
    "index",
    "children",
]);
function bd(e) {
    return e.index === !0;
}
function hi(e, t, n, r) {
    return (
        n === void 0 && (n = []),
        r === void 0 && (r = {}),
        e.map((l, o) => {
            let i = [...n, o],
                u = typeof l.id == "string" ? l.id : i.join("-");
            if (
                (H(
                    l.index !== !0 || !l.children,
                    "Cannot specify children on an index route"
                ),
                H(
                    !r[u],
                    'Found a route id collision on id "' +
                        u +
                        `".  Route id's must be globally unique within Data Router usages`
                ),
                bd(l))
            ) {
                let a = te({}, l, t(l), { id: u });
                return (r[u] = a), a;
            } else {
                let a = te({}, l, t(l), { id: u, children: void 0 });
                return (
                    (r[u] = a),
                    l.children && (a.children = hi(l.children, t, i, r)),
                    a
                );
            }
        })
    );
}
function Cn(e, t, n) {
    n === void 0 && (n = "/");
    let r = typeof t == "string" ? mt(t) : t,
        l = bn(r.pathname || "/", n);
    if (l == null) return null;
    let o = ec(e);
    ep(o);
    let i = null;
    for (let u = 0; i == null && u < o.length; ++u) i = sp(o[u], dp(l));
    return i;
}
function ec(e, t, n, r) {
    t === void 0 && (t = []),
        n === void 0 && (n = []),
        r === void 0 && (r = "");
    let l = (o, i, u) => {
        let a = {
            relativePath: u === void 0 ? o.path || "" : u,
            caseSensitive: o.caseSensitive === !0,
            childrenIndex: i,
            route: o,
        };
        a.relativePath.startsWith("/") &&
            (H(
                a.relativePath.startsWith(r),
                'Absolute route path "' +
                    a.relativePath +
                    '" nested under path ' +
                    ('"' +
                        r +
                        '" is not valid. An absolute child route path ') +
                    "must start with the combined path of all its parent routes."
            ),
            (a.relativePath = a.relativePath.slice(r.length)));
        let s = xt([r, a.relativePath]),
            p = n.concat(a);
        o.children &&
            o.children.length > 0 &&
            (H(
                o.index !== !0,
                "Index routes must not have child routes. Please remove " +
                    ('all child routes from route path "' + s + '".')
            ),
            ec(o.children, t, p, s)),
            !(o.path == null && !o.index) &&
                t.push({ path: s, score: up(s, o.index), routesMeta: p });
    };
    return (
        e.forEach((o, i) => {
            var u;
            if (o.path === "" || !((u = o.path) != null && u.includes("?")))
                l(o, i);
            else for (let a of tc(o.path)) l(o, i, a);
        }),
        t
    );
}
function tc(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t,
        l = n.endsWith("?"),
        o = n.replace(/\?$/, "");
    if (r.length === 0) return l ? [o, ""] : [o];
    let i = tc(r.join("/")),
        u = [];
    return (
        u.push(...i.map((a) => (a === "" ? o : [o, a].join("/")))),
        l && u.push(...i),
        u.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
    );
}
function ep(e) {
    e.sort((t, n) =>
        t.score !== n.score
            ? n.score - t.score
            : ap(
                  t.routesMeta.map((r) => r.childrenIndex),
                  n.routesMeta.map((r) => r.childrenIndex)
              )
    );
}
const tp = /^:\w+$/,
    np = 3,
    rp = 2,
    lp = 1,
    op = 10,
    ip = -2,
    Ea = (e) => e === "*";
function up(e, t) {
    let n = e.split("/"),
        r = n.length;
    return (
        n.some(Ea) && (r += ip),
        t && (r += rp),
        n
            .filter((l) => !Ea(l))
            .reduce((l, o) => l + (tp.test(o) ? np : o === "" ? lp : op), r)
    );
}
function ap(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
        ? e[e.length - 1] - t[t.length - 1]
        : 0;
}
function sp(e, t) {
    let { routesMeta: n } = e,
        r = {},
        l = "/",
        o = [];
    for (let i = 0; i < n.length; ++i) {
        let u = n[i],
            a = i === n.length - 1,
            s = l === "/" ? t : t.slice(l.length) || "/",
            p = cp(
                {
                    path: u.relativePath,
                    caseSensitive: u.caseSensitive,
                    end: a,
                },
                s
            );
        if (!p) return null;
        Object.assign(r, p.params);
        let v = u.route;
        o.push({
            params: r,
            pathname: xt([l, p.pathname]),
            pathnameBase: vp(xt([l, p.pathnameBase])),
            route: v,
        }),
            p.pathnameBase !== "/" && (l = xt([l, p.pathnameBase]));
    }
    return o;
}
function cp(e, t) {
    typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = fp(e.path, e.caseSensitive, e.end),
        l = t.match(n);
    if (!l) return null;
    let o = l[0],
        i = o.replace(/(.)\/+$/, "$1"),
        u = l.slice(1);
    return {
        params: r.reduce((s, p, v) => {
            if (p === "*") {
                let m = u[v] || "";
                i = o.slice(0, o.length - m.length).replace(/(.)\/+$/, "$1");
            }
            return (s[p] = pp(u[v] || "", p)), s;
        }, {}),
        pathname: o,
        pathnameBase: i,
        pattern: e,
    };
}
function fp(e, t, n) {
    t === void 0 && (t = !1),
        n === void 0 && (n = !0),
        cn(
            e === "*" || !e.endsWith("*") || e.endsWith("/*"),
            'Route path "' +
                e +
                '" will be treated as if it were ' +
                ('"' +
                    e.replace(/\*$/, "/*") +
                    '" because the `*` character must ') +
                "always follow a `/` in the pattern. To get rid of this warning, " +
                ('please change the route path to "' +
                    e.replace(/\*$/, "/*") +
                    '".')
        );
    let r = [],
        l =
            "^" +
            e
                .replace(/\/*\*?$/, "")
                .replace(/^\/*/, "/")
                .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
                .replace(/\/:(\w+)/g, (i, u) => (r.push(u), "/([^\\/]+)"));
    return (
        e.endsWith("*")
            ? (r.push("*"),
              (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
            : n
            ? (l += "\\/*$")
            : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
        [new RegExp(l, t ? void 0 : "i"), r]
    );
}
function dp(e) {
    try {
        return decodeURI(e);
    } catch (t) {
        return (
            cn(
                !1,
                'The URL path "' +
                    e +
                    '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
                    ("encoding (" + t + ").")
            ),
            e
        );
    }
}
function pp(e, t) {
    try {
        return decodeURIComponent(e);
    } catch (n) {
        return (
            cn(
                !1,
                'The value for the URL param "' +
                    t +
                    '" will not be decoded because' +
                    (' the string "' +
                        e +
                        '" is a malformed URL segment. This is probably') +
                    (" due to a bad percent encoding (" + n + ").")
            ),
            e
        );
    }
}
function bn(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/";
}
function hp(e, t) {
    t === void 0 && (t = "/");
    let {
        pathname: n,
        search: r = "",
        hash: l = "",
    } = typeof e == "string" ? mt(e) : e;
    return {
        pathname: n ? (n.startsWith("/") ? n : mp(n, t)) : t,
        search: gp(r),
        hash: yp(l),
    };
}
function mp(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return (
        e.split("/").forEach((l) => {
            l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
        }),
        n.length > 1 ? n.join("/") : "/"
    );
}
function $o(e, t, n, r) {
    return (
        "Cannot include a '" +
        e +
        "' character in a manually specified " +
        ("`to." +
            t +
            "` field [" +
            JSON.stringify(r) +
            "].  Please separate it out to the ") +
        ("`to." +
            n +
            "` field. Alternatively you may provide the full path as ") +
        'a string in <Link to="..."> and the router will parse it for you.'
    );
}
function fo(e) {
    return e.filter(
        (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
    );
}
function mu(e, t, n, r) {
    r === void 0 && (r = !1);
    let l;
    typeof e == "string"
        ? (l = mt(e))
        : ((l = te({}, e)),
          H(
              !l.pathname || !l.pathname.includes("?"),
              $o("?", "pathname", "search", l)
          ),
          H(
              !l.pathname || !l.pathname.includes("#"),
              $o("#", "pathname", "hash", l)
          ),
          H(
              !l.search || !l.search.includes("#"),
              $o("#", "search", "hash", l)
          ));
    let o = e === "" || l.pathname === "",
        i = o ? "/" : l.pathname,
        u;
    if (r || i == null) u = n;
    else {
        let v = t.length - 1;
        if (i.startsWith("..")) {
            let m = i.split("/");
            for (; m[0] === ".."; ) m.shift(), (v -= 1);
            l.pathname = m.join("/");
        }
        u = v >= 0 ? t[v] : "/";
    }
    let a = hp(l, u),
        s = i && i !== "/" && i.endsWith("/"),
        p = (o || i === ".") && n.endsWith("/");
    return !a.pathname.endsWith("/") && (s || p) && (a.pathname += "/"), a;
}
const xt = (e) => e.join("/").replace(/\/\/+/g, "/"),
    vp = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    gp = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
    yp = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class vu {
    constructor(t, n, r, l) {
        l === void 0 && (l = !1),
            (this.status = t),
            (this.statusText = n || ""),
            (this.internal = l),
            r instanceof Error
                ? ((this.data = r.toString()), (this.error = r))
                : (this.data = r);
    }
}
function nc(e) {
    return (
        e != null &&
        typeof e.status == "number" &&
        typeof e.statusText == "string" &&
        typeof e.internal == "boolean" &&
        "data" in e
    );
}
const rc = ["post", "put", "patch", "delete"],
    wp = new Set(rc),
    Sp = ["get", ...rc],
    kp = new Set(Sp),
    xp = new Set([301, 302, 303, 307, 308]),
    Ep = new Set([307, 308]),
    Ho = {
        state: "idle",
        location: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
    },
    Cp = {
        state: "idle",
        data: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
    },
    ir = {
        state: "unblocked",
        proceed: void 0,
        reset: void 0,
        location: void 0,
    },
    lc = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Rp = (e) => ({ hasErrorBoundary: Boolean(e.hasErrorBoundary) });
function Pp(e) {
    const t = e.window ? e.window : typeof window < "u" ? window : void 0,
        n =
            typeof t < "u" &&
            typeof t.document < "u" &&
            typeof t.document.createElement < "u",
        r = !n;
    H(
        e.routes.length > 0,
        "You must provide a non-empty routes array to createRouter"
    );
    let l;
    if (e.mapRouteProperties) l = e.mapRouteProperties;
    else if (e.detectErrorBoundary) {
        let g = e.detectErrorBoundary;
        l = (y) => ({ hasErrorBoundary: g(y) });
    } else l = Rp;
    let o = {},
        i = hi(e.routes, l, void 0, o),
        u,
        a = e.basename || "/",
        s = te(
            { v7_normalizeFormMethod: !1, v7_prependBasename: !1 },
            e.future
        ),
        p = null,
        v = new Set(),
        m = null,
        k = null,
        w = null,
        S = e.hydrationData != null,
        _ = Cn(i, e.history.location, a),
        d = null;
    if (_ == null) {
        let g = Qe(404, { pathname: e.history.location.pathname }),
            { matches: y, route: x } = za(i);
        (_ = y), (d = { [x.id]: g });
    }
    let c =
            !_.some((g) => g.route.lazy) &&
            (!_.some((g) => g.route.loader) || e.hydrationData != null),
        h,
        f = {
            historyAction: e.history.action,
            location: e.history.location,
            matches: _,
            initialized: c,
            navigation: Ho,
            restoreScrollPosition: e.hydrationData != null ? !1 : null,
            preventScrollReset: !1,
            revalidation: "idle",
            loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
            actionData: (e.hydrationData && e.hydrationData.actionData) || null,
            errors: (e.hydrationData && e.hydrationData.errors) || d,
            fetchers: new Map(),
            blockers: new Map(),
        },
        E = ce.Pop,
        P = !1,
        R,
        D = !1,
        W = !1,
        I = [],
        ye = [],
        X = new Map(),
        Lt = 0,
        wn = -1,
        Dt = new Map(),
        qe = new Set(),
        ut = new Map(),
        N = new Map(),
        O = new Map(),
        B = !1;
    function re() {
        return (
            (p = e.history.listen((g) => {
                let { action: y, location: x, delta: z } = g;
                if (B) {
                    B = !1;
                    return;
                }
                cn(
                    O.size === 0 || z != null,
                    "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
                );
                let A = ha({
                    currentLocation: f.location,
                    nextLocation: x,
                    historyAction: y,
                });
                if (A && z != null) {
                    (B = !0),
                        e.history.go(z * -1),
                        ll(A, {
                            state: "blocked",
                            location: x,
                            proceed() {
                                ll(A, {
                                    state: "proceeding",
                                    proceed: void 0,
                                    reset: void 0,
                                    location: x,
                                }),
                                    e.history.go(z);
                            },
                            reset() {
                                let U = new Map(f.blockers);
                                U.set(A, ir), b({ blockers: U });
                            },
                        });
                    return;
                }
                return zt(y, x);
            })),
            f.initialized || zt(ce.Pop, f.location),
            h
        );
    }
    function se() {
        p && p(),
            v.clear(),
            R && R.abort(),
            f.fetchers.forEach((g, y) => Oo(y)),
            f.blockers.forEach((g, y) => pa(y));
    }
    function Sn(g) {
        return v.add(g), () => v.delete(g);
    }
    function b(g) {
        (f = te({}, f, g)), v.forEach((y) => y(f));
    }
    function vt(g, y) {
        var x, z;
        let A =
                f.actionData != null &&
                f.navigation.formMethod != null &&
                tt(f.navigation.formMethod) &&
                f.navigation.state === "loading" &&
                ((x = g.state) == null ? void 0 : x._isRedirect) !== !0,
            U;
        y.actionData
            ? Object.keys(y.actionData).length > 0
                ? (U = y.actionData)
                : (U = null)
            : A
            ? (U = f.actionData)
            : (U = null);
        let j = y.loaderData
                ? Da(f.loaderData, y.loaderData, y.matches || [], y.errors)
                : f.loaderData,
            M = f.blockers;
        M.size > 0 && ((M = new Map(M)), M.forEach((G, K) => M.set(K, ir)));
        let T =
            P === !0 ||
            (f.navigation.formMethod != null &&
                tt(f.navigation.formMethod) &&
                ((z = g.state) == null ? void 0 : z._isRedirect) !== !0);
        u && ((i = u), (u = void 0)),
            D ||
                E === ce.Pop ||
                (E === ce.Push
                    ? e.history.push(g, g.state)
                    : E === ce.Replace && e.history.replace(g, g.state)),
            b(
                te({}, y, {
                    actionData: U,
                    loaderData: j,
                    historyAction: E,
                    location: g,
                    initialized: !0,
                    navigation: Ho,
                    revalidation: "idle",
                    restoreScrollPosition: va(g, y.matches || f.matches),
                    preventScrollReset: T,
                    blockers: M,
                })
            ),
            (E = ce.Pop),
            (P = !1),
            (D = !1),
            (W = !1),
            (I = []),
            (ye = []);
    }
    async function at(g, y) {
        if (typeof g == "number") {
            e.history.go(g);
            return;
        }
        let x = mi(
                f.location,
                f.matches,
                a,
                s.v7_prependBasename,
                g,
                y == null ? void 0 : y.fromRouteId,
                y == null ? void 0 : y.relative
            ),
            {
                path: z,
                submission: A,
                error: U,
            } = Ca(s.v7_normalizeFormMethod, !1, x, y),
            j = f.location,
            M = Tr(f.location, z, y && y.state);
        M = te({}, M, e.history.encodeLocation(M));
        let T = y && y.replace != null ? y.replace : void 0,
            G = ce.Push;
        T === !0
            ? (G = ce.Replace)
            : T === !1 ||
              (A != null &&
                  tt(A.formMethod) &&
                  A.formAction === f.location.pathname + f.location.search &&
                  (G = ce.Replace));
        let K =
                y && "preventScrollReset" in y
                    ? y.preventScrollReset === !0
                    : void 0,
            je = ha({ currentLocation: j, nextLocation: M, historyAction: G });
        if (je) {
            ll(je, {
                state: "blocked",
                location: M,
                proceed() {
                    ll(je, {
                        state: "proceeding",
                        proceed: void 0,
                        reset: void 0,
                        location: M,
                    }),
                        at(g, y);
                },
                reset() {
                    let me = new Map(f.blockers);
                    me.set(je, ir), b({ blockers: me });
                },
            });
            return;
        }
        return await zt(G, M, {
            submission: A,
            pendingError: U,
            preventScrollReset: K,
            replace: y && y.replace,
        });
    }
    function kn() {
        if (
            (Mo(),
            b({ revalidation: "loading" }),
            f.navigation.state !== "submitting")
        ) {
            if (f.navigation.state === "idle") {
                zt(f.historyAction, f.location, {
                    startUninterruptedRevalidation: !0,
                });
                return;
            }
            zt(E || f.historyAction, f.navigation.location, {
                overrideNavigation: f.navigation,
            });
        }
    }
    async function zt(g, y, x) {
        R && R.abort(),
            (R = null),
            (E = g),
            (D = (x && x.startUninterruptedRevalidation) === !0),
            Pd(f.location, f.matches),
            (P = (x && x.preventScrollReset) === !0);
        let z = u || i,
            A = x && x.overrideNavigation,
            U = Cn(z, y, a);
        if (!U) {
            let me = Qe(404, { pathname: y.pathname }),
                { matches: ze, route: st } = za(z);
            Fo(),
                vt(y, { matches: ze, loaderData: {}, errors: { [st.id]: me } });
            return;
        }
        if (
            f.initialized &&
            !W &&
            zp(f.location, y) &&
            !(x && x.submission && tt(x.submission.formMethod))
        ) {
            vt(y, { matches: U });
            return;
        }
        R = new AbortController();
        let j = ar(e.history, y, R.signal, x && x.submission),
            M,
            T;
        if (x && x.pendingError) T = { [Rn(U).route.id]: x.pendingError };
        else if (x && x.submission && tt(x.submission.formMethod)) {
            let me = await wd(j, y, x.submission, U, { replace: x.replace });
            if (me.shortCircuited) return;
            (M = me.pendingActionData),
                (T = me.pendingActionError),
                (A = sl(y, x.submission)),
                (j = new Request(j.url, { signal: j.signal }));
        }
        let {
            shortCircuited: G,
            loaderData: K,
            errors: je,
        } = await Sd(
            j,
            y,
            U,
            A,
            x && x.submission,
            x && x.fetcherSubmission,
            x && x.replace,
            M,
            T
        );
        G ||
            ((R = null),
            vt(
                y,
                te({ matches: U }, M ? { actionData: M } : {}, {
                    loaderData: K,
                    errors: je,
                })
            ));
    }
    async function wd(g, y, x, z, A) {
        A === void 0 && (A = {}), Mo();
        let U = Up(y, x);
        b({ navigation: U });
        let j,
            M = gi(z, y);
        if (!M.route.action && !M.route.lazy)
            j = {
                type: de.error,
                error: Qe(405, {
                    method: g.method,
                    pathname: y.pathname,
                    routeId: M.route.id,
                }),
            };
        else if (((j = await ur("action", g, M, z, o, l, a)), g.signal.aborted))
            return { shortCircuited: !0 };
        if (In(j)) {
            let T;
            return (
                A && A.replace != null
                    ? (T = A.replace)
                    : (T =
                          j.location ===
                          f.location.pathname + f.location.search),
                await rr(f, j, { submission: x, replace: T }),
                { shortCircuited: !0 }
            );
        }
        if (xr(j)) {
            let T = Rn(z, M.route.id);
            return (
                (A && A.replace) !== !0 && (E = ce.Push),
                {
                    pendingActionData: {},
                    pendingActionError: { [T.route.id]: j.error },
                }
            );
        }
        if (rn(j)) throw Qe(400, { type: "defer-action" });
        return { pendingActionData: { [M.route.id]: j.data } };
    }
    async function Sd(g, y, x, z, A, U, j, M, T) {
        let G = z || sl(y, A),
            K = A || U || Oa(G),
            je = u || i,
            [me, ze] = Ra(e.history, f, x, K, y, W, I, ye, ut, qe, je, a, M, T);
        if (
            (Fo(
                (ee) =>
                    !(x && x.some((We) => We.route.id === ee)) ||
                    (me && me.some((We) => We.route.id === ee))
            ),
            me.length === 0 && ze.length === 0)
        ) {
            let ee = fa();
            return (
                vt(
                    y,
                    te(
                        { matches: x, loaderData: {}, errors: T || null },
                        M ? { actionData: M } : {},
                        ee ? { fetchers: new Map(f.fetchers) } : {}
                    )
                ),
                { shortCircuited: !0 }
            );
        }
        if (!D) {
            ze.forEach((We) => {
                let xn = f.fetchers.get(We.key),
                    we = sr(void 0, xn ? xn.data : void 0);
                f.fetchers.set(We.key, we);
            });
            let ee = M || f.actionData;
            b(
                te(
                    { navigation: G },
                    ee
                        ? Object.keys(ee).length === 0
                            ? { actionData: null }
                            : { actionData: ee }
                        : {},
                    ze.length > 0 ? { fetchers: new Map(f.fetchers) } : {}
                )
            );
        }
        (wn = ++Lt),
            ze.forEach((ee) => {
                X.has(ee.key) && Tt(ee.key),
                    ee.controller && X.set(ee.key, ee.controller);
            });
        let st = () => ze.forEach((ee) => Tt(ee.key));
        R && R.signal.addEventListener("abort", st);
        let {
            results: lr,
            loaderResults: Uo,
            fetcherResults: ol,
        } = await sa(f.matches, x, me, ze, g);
        if (g.signal.aborted) return { shortCircuited: !0 };
        R && R.signal.removeEventListener("abort", st),
            ze.forEach((ee) => X.delete(ee.key));
        let gt = Ta(lr);
        if (gt) return await rr(f, gt, { replace: j }), { shortCircuited: !0 };
        let { loaderData: il, errors: jo } = La(f, x, me, Uo, T, ze, ol, N);
        N.forEach((ee, We) => {
            ee.subscribe((xn) => {
                (xn || ee.done) && N.delete(We);
            });
        });
        let Io = fa(),
            Ao = da(wn),
            ul = Io || Ao || ze.length > 0;
        return te(
            { loaderData: il, errors: jo },
            ul ? { fetchers: new Map(f.fetchers) } : {}
        );
    }
    function aa(g) {
        return f.fetchers.get(g) || Cp;
    }
    function kd(g, y, x, z) {
        if (r)
            throw new Error(
                "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
            );
        X.has(g) && Tt(g);
        let A = u || i,
            U = mi(
                f.location,
                f.matches,
                a,
                s.v7_prependBasename,
                x,
                y,
                z == null ? void 0 : z.relative
            ),
            j = Cn(A, U, a);
        if (!j) {
            rl(g, y, Qe(404, { pathname: U }));
            return;
        }
        let {
            path: M,
            submission: T,
            error: G,
        } = Ca(s.v7_normalizeFormMethod, !0, U, z);
        if (G) {
            rl(g, y, G);
            return;
        }
        let K = gi(j, M);
        if (((P = (z && z.preventScrollReset) === !0), T && tt(T.formMethod))) {
            xd(g, y, M, K, j, T);
            return;
        }
        ut.set(g, { routeId: y, path: M }), Ed(g, y, M, K, j, T);
    }
    async function xd(g, y, x, z, A, U) {
        if ((Mo(), ut.delete(g), !z.route.action && !z.route.lazy)) {
            let we = Qe(405, { method: U.formMethod, pathname: x, routeId: y });
            rl(g, y, we);
            return;
        }
        let j = f.fetchers.get(g),
            M = jp(U, j);
        f.fetchers.set(g, M), b({ fetchers: new Map(f.fetchers) });
        let T = new AbortController(),
            G = ar(e.history, x, T.signal, U);
        X.set(g, T);
        let K = await ur("action", G, z, A, o, l, a);
        if (G.signal.aborted) {
            X.get(g) === T && X.delete(g);
            return;
        }
        if (In(K)) {
            X.delete(g), qe.add(g);
            let we = sr(U);
            return (
                f.fetchers.set(g, we),
                b({ fetchers: new Map(f.fetchers) }),
                rr(f, K, { submission: U, isFetchActionRedirect: !0 })
            );
        }
        if (xr(K)) {
            rl(g, y, K.error);
            return;
        }
        if (rn(K)) throw Qe(400, { type: "defer-action" });
        let je = f.navigation.location || f.location,
            me = ar(e.history, je, T.signal),
            ze = u || i,
            st =
                f.navigation.state !== "idle"
                    ? Cn(ze, f.navigation.location, a)
                    : f.matches;
        H(st, "Didn't find any matches after fetcher action");
        let lr = ++Lt;
        Dt.set(g, lr);
        let Uo = sr(U, K.data);
        f.fetchers.set(g, Uo);
        let [ol, gt] = Ra(
            e.history,
            f,
            st,
            U,
            je,
            W,
            I,
            ye,
            ut,
            qe,
            ze,
            a,
            { [z.route.id]: K.data },
            void 0
        );
        gt
            .filter((we) => we.key !== g)
            .forEach((we) => {
                let or = we.key,
                    ga = f.fetchers.get(or),
                    Nd = sr(void 0, ga ? ga.data : void 0);
                f.fetchers.set(or, Nd),
                    X.has(or) && Tt(or),
                    we.controller && X.set(or, we.controller);
            }),
            b({ fetchers: new Map(f.fetchers) });
        let il = () => gt.forEach((we) => Tt(we.key));
        T.signal.addEventListener("abort", il);
        let {
            results: jo,
            loaderResults: Io,
            fetcherResults: Ao,
        } = await sa(f.matches, st, ol, gt, me);
        if (T.signal.aborted) return;
        T.signal.removeEventListener("abort", il),
            Dt.delete(g),
            X.delete(g),
            gt.forEach((we) => X.delete(we.key));
        let ul = Ta(jo);
        if (ul) return rr(f, ul);
        let { loaderData: ee, errors: We } = La(
            f,
            f.matches,
            ol,
            Io,
            void 0,
            gt,
            Ao,
            N
        );
        if (f.fetchers.has(g)) {
            let we = Nl(K.data);
            f.fetchers.set(g, we);
        }
        let xn = da(lr);
        f.navigation.state === "loading" && lr > wn
            ? (H(E, "Expected pending action"),
              R && R.abort(),
              vt(f.navigation.location, {
                  matches: st,
                  loaderData: ee,
                  errors: We,
                  fetchers: new Map(f.fetchers),
              }))
            : (b(
                  te(
                      { errors: We, loaderData: Da(f.loaderData, ee, st, We) },
                      xn || gt.length > 0
                          ? { fetchers: new Map(f.fetchers) }
                          : {}
                  )
              ),
              (W = !1));
    }
    async function Ed(g, y, x, z, A, U) {
        let j = f.fetchers.get(g),
            M = sr(U, j ? j.data : void 0);
        f.fetchers.set(g, M), b({ fetchers: new Map(f.fetchers) });
        let T = new AbortController(),
            G = ar(e.history, x, T.signal);
        X.set(g, T);
        let K = await ur("loader", G, z, A, o, l, a);
        if (
            (rn(K) && (K = (await uc(K, G.signal, !0)) || K),
            X.get(g) === T && X.delete(g),
            G.signal.aborted)
        )
            return;
        if (In(K)) {
            qe.add(g), await rr(f, K);
            return;
        }
        if (xr(K)) {
            let me = Rn(f.matches, y);
            f.fetchers.delete(g),
                b({
                    fetchers: new Map(f.fetchers),
                    errors: { [me.route.id]: K.error },
                });
            return;
        }
        H(!rn(K), "Unhandled fetcher deferred data");
        let je = Nl(K.data);
        f.fetchers.set(g, je), b({ fetchers: new Map(f.fetchers) });
    }
    async function rr(g, y, x) {
        let {
            submission: z,
            replace: A,
            isFetchActionRedirect: U,
        } = x === void 0 ? {} : x;
        y.revalidate && (W = !0);
        let j = Tr(
            g.location,
            y.location,
            te({ _isRedirect: !0 }, U ? { _isFetchActionRedirect: !0 } : {})
        );
        if (
            (H(j, "Expected a location on the redirect navigation"),
            lc.test(y.location) && n)
        ) {
            let G = e.history.createURL(y.location),
                K = bn(G.pathname, a) == null;
            if (t.location.origin !== G.origin || K) {
                A
                    ? t.location.replace(y.location)
                    : t.location.assign(y.location);
                return;
            }
        }
        R = null;
        let M = A === !0 ? ce.Replace : ce.Push,
            T = z || Oa(g.navigation);
        if (Ep.has(y.status) && T && tt(T.formMethod))
            await zt(M, j, {
                submission: te({}, T, { formAction: y.location }),
                preventScrollReset: P,
            });
        else if (U)
            await zt(M, j, {
                overrideNavigation: sl(j),
                fetcherSubmission: T,
                preventScrollReset: P,
            });
        else {
            let G = sl(j, T);
            await zt(M, j, { overrideNavigation: G, preventScrollReset: P });
        }
    }
    async function sa(g, y, x, z, A) {
        let U = await Promise.all([
                ...x.map((T) => ur("loader", A, T, y, o, l, a)),
                ...z.map((T) =>
                    T.matches && T.match && T.controller
                        ? ur(
                              "loader",
                              ar(e.history, T.path, T.controller.signal),
                              T.match,
                              T.matches,
                              o,
                              l,
                              a
                          )
                        : {
                              type: de.error,
                              error: Qe(404, { pathname: T.path }),
                          }
                ),
            ]),
            j = U.slice(0, x.length),
            M = U.slice(x.length);
        return (
            await Promise.all([
                Ma(
                    g,
                    x,
                    j,
                    j.map(() => A.signal),
                    !1,
                    f.loaderData
                ),
                Ma(
                    g,
                    z.map((T) => T.match),
                    M,
                    z.map((T) => (T.controller ? T.controller.signal : null)),
                    !0
                ),
            ]),
            { results: U, loaderResults: j, fetcherResults: M }
        );
    }
    function Mo() {
        (W = !0),
            I.push(...Fo()),
            ut.forEach((g, y) => {
                X.has(y) && (ye.push(y), Tt(y));
            });
    }
    function rl(g, y, x) {
        let z = Rn(f.matches, y);
        Oo(g),
            b({ errors: { [z.route.id]: x }, fetchers: new Map(f.fetchers) });
    }
    function Oo(g) {
        let y = f.fetchers.get(g);
        X.has(g) && !(y && y.state === "loading" && Dt.has(g)) && Tt(g),
            ut.delete(g),
            Dt.delete(g),
            qe.delete(g),
            f.fetchers.delete(g);
    }
    function Tt(g) {
        let y = X.get(g);
        H(y, "Expected fetch controller: " + g), y.abort(), X.delete(g);
    }
    function ca(g) {
        for (let y of g) {
            let x = aa(y),
                z = Nl(x.data);
            f.fetchers.set(y, z);
        }
    }
    function fa() {
        let g = [],
            y = !1;
        for (let x of qe) {
            let z = f.fetchers.get(x);
            H(z, "Expected fetcher: " + x),
                z.state === "loading" && (qe.delete(x), g.push(x), (y = !0));
        }
        return ca(g), y;
    }
    function da(g) {
        let y = [];
        for (let [x, z] of Dt)
            if (z < g) {
                let A = f.fetchers.get(x);
                H(A, "Expected fetcher: " + x),
                    A.state === "loading" && (Tt(x), Dt.delete(x), y.push(x));
            }
        return ca(y), y.length > 0;
    }
    function Cd(g, y) {
        let x = f.blockers.get(g) || ir;
        return O.get(g) !== y && O.set(g, y), x;
    }
    function pa(g) {
        f.blockers.delete(g), O.delete(g);
    }
    function ll(g, y) {
        let x = f.blockers.get(g) || ir;
        H(
            (x.state === "unblocked" && y.state === "blocked") ||
                (x.state === "blocked" && y.state === "blocked") ||
                (x.state === "blocked" && y.state === "proceeding") ||
                (x.state === "blocked" && y.state === "unblocked") ||
                (x.state === "proceeding" && y.state === "unblocked"),
            "Invalid blocker state transition: " + x.state + " -> " + y.state
        );
        let z = new Map(f.blockers);
        z.set(g, y), b({ blockers: z });
    }
    function ha(g) {
        let { currentLocation: y, nextLocation: x, historyAction: z } = g;
        if (O.size === 0) return;
        O.size > 1 && cn(!1, "A router only supports one blocker at a time");
        let A = Array.from(O.entries()),
            [U, j] = A[A.length - 1],
            M = f.blockers.get(U);
        if (
            !(M && M.state === "proceeding") &&
            j({ currentLocation: y, nextLocation: x, historyAction: z })
        )
            return U;
    }
    function Fo(g) {
        let y = [];
        return (
            N.forEach((x, z) => {
                (!g || g(z)) && (x.cancel(), y.push(z), N.delete(z));
            }),
            y
        );
    }
    function Rd(g, y, x) {
        if (((m = g), (w = y), (k = x || null), !S && f.navigation === Ho)) {
            S = !0;
            let z = va(f.location, f.matches);
            z != null && b({ restoreScrollPosition: z });
        }
        return () => {
            (m = null), (w = null), (k = null);
        };
    }
    function ma(g, y) {
        return (
            (k &&
                k(
                    g,
                    y.map((z) => Fp(z, f.loaderData))
                )) ||
            g.key
        );
    }
    function Pd(g, y) {
        if (m && w) {
            let x = ma(g, y);
            m[x] = w();
        }
    }
    function va(g, y) {
        if (m) {
            let x = ma(g, y),
                z = m[x];
            if (typeof z == "number") return z;
        }
        return null;
    }
    function _d(g) {
        (o = {}), (u = hi(g, l, void 0, o));
    }
    return (
        (h = {
            get basename() {
                return a;
            },
            get state() {
                return f;
            },
            get routes() {
                return i;
            },
            initialize: re,
            subscribe: Sn,
            enableScrollRestoration: Rd,
            navigate: at,
            fetch: kd,
            revalidate: kn,
            createHref: (g) => e.history.createHref(g),
            encodeLocation: (g) => e.history.encodeLocation(g),
            getFetcher: aa,
            deleteFetcher: Oo,
            dispose: se,
            getBlocker: Cd,
            deleteBlocker: pa,
            _internalFetchControllers: X,
            _internalActiveDeferreds: N,
            _internalSetRoutes: _d,
        }),
        h
    );
}
function _p(e) {
    return (
        e != null &&
        (("formData" in e && e.formData != null) ||
            ("body" in e && e.body !== void 0))
    );
}
function mi(e, t, n, r, l, o, i) {
    let u, a;
    if (o != null && i !== "path") {
        u = [];
        for (let p of t)
            if ((u.push(p), p.route.id === o)) {
                a = p;
                break;
            }
    } else (u = t), (a = t[t.length - 1]);
    let s = mu(
        l || ".",
        fo(u).map((p) => p.pathnameBase),
        bn(e.pathname, n) || e.pathname,
        i === "path"
    );
    return (
        l == null && ((s.search = e.search), (s.hash = e.hash)),
        (l == null || l === "" || l === ".") &&
            a &&
            a.route.index &&
            !gu(s.search) &&
            (s.search = s.search
                ? s.search.replace(/^\?/, "?index&")
                : "?index"),
        r &&
            n !== "/" &&
            (s.pathname = s.pathname === "/" ? n : xt([n, s.pathname])),
        fn(s)
    );
}
function Ca(e, t, n, r) {
    if (!r || !_p(r)) return { path: n };
    if (r.formMethod && !Op(r.formMethod))
        return { path: n, error: Qe(405, { method: r.formMethod }) };
    let l = () => ({ path: n, error: Qe(400, { type: "invalid-body" }) }),
        o = r.formMethod || "get",
        i = e ? o.toUpperCase() : o.toLowerCase(),
        u = ic(n);
    if (r.body !== void 0) {
        if (r.formEncType === "text/plain") {
            if (!tt(i)) return l();
            let m =
                typeof r.body == "string"
                    ? r.body
                    : r.body instanceof FormData ||
                      r.body instanceof URLSearchParams
                    ? Array.from(r.body.entries()).reduce((k, w) => {
                          let [S, _] = w;
                          return (
                              "" +
                              k +
                              S +
                              "=" +
                              _ +
                              `
`
                          );
                      }, "")
                    : String(r.body);
            return {
                path: n,
                submission: {
                    formMethod: i,
                    formAction: u,
                    formEncType: r.formEncType,
                    formData: void 0,
                    json: void 0,
                    text: m,
                },
            };
        } else if (r.formEncType === "application/json") {
            if (!tt(i)) return l();
            try {
                let m = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
                return {
                    path: n,
                    submission: {
                        formMethod: i,
                        formAction: u,
                        formEncType: r.formEncType,
                        formData: void 0,
                        json: m,
                        text: void 0,
                    },
                };
            } catch {
                return l();
            }
        }
    }
    H(
        typeof FormData == "function",
        "FormData is not available in this environment"
    );
    let a, s;
    if (r.formData) (a = vi(r.formData)), (s = r.formData);
    else if (r.body instanceof FormData) (a = vi(r.body)), (s = r.body);
    else if (r.body instanceof URLSearchParams) (a = r.body), (s = Na(a));
    else if (r.body == null) (a = new URLSearchParams()), (s = new FormData());
    else
        try {
            (a = new URLSearchParams(r.body)), (s = Na(a));
        } catch {
            return l();
        }
    let p = {
        formMethod: i,
        formAction: u,
        formEncType:
            (r && r.formEncType) || "application/x-www-form-urlencoded",
        formData: s,
        json: void 0,
        text: void 0,
    };
    if (tt(p.formMethod)) return { path: n, submission: p };
    let v = mt(n);
    return (
        t && v.search && gu(v.search) && a.append("index", ""),
        (v.search = "?" + a),
        { path: fn(v), submission: p }
    );
}
function Np(e, t) {
    let n = e;
    if (t) {
        let r = e.findIndex((l) => l.route.id === t);
        r >= 0 && (n = e.slice(0, r));
    }
    return n;
}
function Ra(e, t, n, r, l, o, i, u, a, s, p, v, m, k) {
    let w = k ? Object.values(k)[0] : m ? Object.values(m)[0] : void 0,
        S = e.createURL(t.location),
        _ = e.createURL(l),
        d = k ? Object.keys(k)[0] : void 0,
        h = Np(n, d).filter((E, P) => {
            if (E.route.lazy) return !0;
            if (E.route.loader == null) return !1;
            if (
                Lp(t.loaderData, t.matches[P], E) ||
                i.some((W) => W === E.route.id)
            )
                return !0;
            let R = t.matches[P],
                D = E;
            return Pa(
                E,
                te(
                    {
                        currentUrl: S,
                        currentParams: R.params,
                        nextUrl: _,
                        nextParams: D.params,
                    },
                    r,
                    {
                        actionResult: w,
                        defaultShouldRevalidate:
                            o ||
                            S.pathname + S.search === _.pathname + _.search ||
                            S.search !== _.search ||
                            oc(R, D),
                    }
                )
            );
        }),
        f = [];
    return (
        a.forEach((E, P) => {
            if (!n.some((X) => X.route.id === E.routeId)) return;
            let R = Cn(p, E.path, v);
            if (!R) {
                f.push({
                    key: P,
                    routeId: E.routeId,
                    path: E.path,
                    matches: null,
                    match: null,
                    controller: null,
                });
                return;
            }
            let D = t.fetchers.get(P),
                W = D && D.state !== "idle" && D.data === void 0 && !s.has(P),
                I = gi(R, E.path);
            (u.includes(P) ||
                W ||
                Pa(
                    I,
                    te(
                        {
                            currentUrl: S,
                            currentParams:
                                t.matches[t.matches.length - 1].params,
                            nextUrl: _,
                            nextParams: n[n.length - 1].params,
                        },
                        r,
                        { actionResult: w, defaultShouldRevalidate: o }
                    )
                )) &&
                f.push({
                    key: P,
                    routeId: E.routeId,
                    path: E.path,
                    matches: R,
                    match: I,
                    controller: new AbortController(),
                });
        }),
        [h, f]
    );
}
function Lp(e, t, n) {
    let r = !t || n.route.id !== t.route.id,
        l = e[n.route.id] === void 0;
    return r || l;
}
function oc(e, t) {
    let n = e.route.path;
    return (
        e.pathname !== t.pathname ||
        (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
    );
}
function Pa(e, t) {
    if (e.route.shouldRevalidate) {
        let n = e.route.shouldRevalidate(t);
        if (typeof n == "boolean") return n;
    }
    return t.defaultShouldRevalidate;
}
async function _a(e, t, n) {
    if (!e.lazy) return;
    let r = await e.lazy();
    if (!e.lazy) return;
    let l = n[e.id];
    H(l, "No route found in manifest");
    let o = {};
    for (let i in r) {
        let a = l[i] !== void 0 && i !== "hasErrorBoundary";
        cn(
            !a,
            'Route "' +
                l.id +
                '" has a static property "' +
                i +
                '" defined but its lazy function is also returning a value for this property. ' +
                ('The lazy route property "' + i + '" will be ignored.')
        ),
            !a && !qd.has(i) && (o[i] = r[i]);
    }
    Object.assign(l, o), Object.assign(l, te({}, t(l), { lazy: void 0 }));
}
async function ur(e, t, n, r, l, o, i, u) {
    u === void 0 && (u = {});
    let a,
        s,
        p,
        v = (w) => {
            let S,
                _ = new Promise((d, c) => (S = c));
            return (
                (p = () => S()),
                t.signal.addEventListener("abort", p),
                Promise.race([
                    w({
                        request: t,
                        params: n.params,
                        context: u.requestContext,
                    }),
                    _,
                ])
            );
        };
    try {
        let w = n.route[e];
        if (n.route.lazy)
            if (w) s = (await Promise.all([v(w), _a(n.route, o, l)]))[0];
            else if ((await _a(n.route, o, l), (w = n.route[e]), w))
                s = await v(w);
            else if (e === "action") {
                let S = new URL(t.url),
                    _ = S.pathname + S.search;
                throw Qe(405, {
                    method: t.method,
                    pathname: _,
                    routeId: n.route.id,
                });
            } else return { type: de.data, data: void 0 };
        else if (w) s = await v(w);
        else {
            let S = new URL(t.url),
                _ = S.pathname + S.search;
            throw Qe(404, { pathname: _ });
        }
        H(
            s !== void 0,
            "You defined " +
                (e === "action" ? "an action" : "a loader") +
                " for route " +
                ('"' +
                    n.route.id +
                    "\" but didn't return anything from your `" +
                    e +
                    "` ") +
                "function. Please return a value or `null`."
        );
    } catch (w) {
        (a = de.error), (s = w);
    } finally {
        p && t.signal.removeEventListener("abort", p);
    }
    if (Mp(s)) {
        let w = s.status;
        if (xp.has(w)) {
            let d = s.headers.get("Location");
            if (
                (H(
                    d,
                    "Redirects returned/thrown from loaders/actions must have a Location header"
                ),
                !lc.test(d))
            )
                d = mi(new URL(t.url), r.slice(0, r.indexOf(n) + 1), i, !0, d);
            else if (!u.isStaticRequest) {
                let c = new URL(t.url),
                    h = d.startsWith("//")
                        ? new URL(c.protocol + d)
                        : new URL(d),
                    f = bn(h.pathname, i) != null;
                h.origin === c.origin &&
                    f &&
                    (d = h.pathname + h.search + h.hash);
            }
            if (u.isStaticRequest) throw (s.headers.set("Location", d), s);
            return {
                type: de.redirect,
                status: w,
                location: d,
                revalidate: s.headers.get("X-Remix-Revalidate") !== null,
            };
        }
        if (u.isRouteRequest) throw { type: a || de.data, response: s };
        let S,
            _ = s.headers.get("Content-Type");
        return (
            _ && /\bapplication\/json\b/.test(_)
                ? (S = await s.json())
                : (S = await s.text()),
            a === de.error
                ? {
                      type: a,
                      error: new vu(w, s.statusText, S),
                      headers: s.headers,
                  }
                : {
                      type: de.data,
                      data: S,
                      statusCode: s.status,
                      headers: s.headers,
                  }
        );
    }
    if (a === de.error) return { type: a, error: s };
    if (Tp(s)) {
        var m, k;
        return {
            type: de.deferred,
            deferredData: s,
            statusCode: (m = s.init) == null ? void 0 : m.status,
            headers:
                ((k = s.init) == null ? void 0 : k.headers) &&
                new Headers(s.init.headers),
        };
    }
    return { type: de.data, data: s };
}
function ar(e, t, n, r) {
    let l = e.createURL(ic(t)).toString(),
        o = { signal: n };
    if (r && tt(r.formMethod)) {
        let { formMethod: i, formEncType: u } = r;
        (o.method = i.toUpperCase()),
            u === "application/json"
                ? ((o.headers = new Headers({ "Content-Type": u })),
                  (o.body = JSON.stringify(r.json)))
                : u === "text/plain"
                ? (o.body = r.text)
                : u === "application/x-www-form-urlencoded" && r.formData
                ? (o.body = vi(r.formData))
                : (o.body = r.formData);
    }
    return new Request(l, o);
}
function vi(e) {
    let t = new URLSearchParams();
    for (let [n, r] of e.entries())
        t.append(n, typeof r == "string" ? r : r.name);
    return t;
}
function Na(e) {
    let t = new FormData();
    for (let [n, r] of e.entries()) t.append(n, r);
    return t;
}
function Dp(e, t, n, r, l) {
    let o = {},
        i = null,
        u,
        a = !1,
        s = {};
    return (
        n.forEach((p, v) => {
            let m = t[v].route.id;
            if (
                (H(
                    !In(p),
                    "Cannot handle redirect results in processLoaderData"
                ),
                xr(p))
            ) {
                let k = Rn(e, m),
                    w = p.error;
                r && ((w = Object.values(r)[0]), (r = void 0)),
                    (i = i || {}),
                    i[k.route.id] == null && (i[k.route.id] = w),
                    (o[m] = void 0),
                    a || ((a = !0), (u = nc(p.error) ? p.error.status : 500)),
                    p.headers && (s[m] = p.headers);
            } else
                rn(p)
                    ? (l.set(m, p.deferredData), (o[m] = p.deferredData.data))
                    : (o[m] = p.data),
                    p.statusCode != null &&
                        p.statusCode !== 200 &&
                        !a &&
                        (u = p.statusCode),
                    p.headers && (s[m] = p.headers);
        }),
        r && ((i = r), (o[Object.keys(r)[0]] = void 0)),
        { loaderData: o, errors: i, statusCode: u || 200, loaderHeaders: s }
    );
}
function La(e, t, n, r, l, o, i, u) {
    let { loaderData: a, errors: s } = Dp(t, n, r, l, u);
    for (let p = 0; p < o.length; p++) {
        let { key: v, match: m, controller: k } = o[p];
        H(
            i !== void 0 && i[p] !== void 0,
            "Did not find corresponding fetcher result"
        );
        let w = i[p];
        if (!(k && k.signal.aborted))
            if (xr(w)) {
                let S = Rn(e.matches, m == null ? void 0 : m.route.id);
                (s && s[S.route.id]) ||
                    (s = te({}, s, { [S.route.id]: w.error })),
                    e.fetchers.delete(v);
            } else if (In(w)) H(!1, "Unhandled fetcher revalidation redirect");
            else if (rn(w)) H(!1, "Unhandled fetcher deferred data");
            else {
                let S = Nl(w.data);
                e.fetchers.set(v, S);
            }
    }
    return { loaderData: a, errors: s };
}
function Da(e, t, n, r) {
    let l = te({}, t);
    for (let o of n) {
        let i = o.route.id;
        if (
            (t.hasOwnProperty(i)
                ? t[i] !== void 0 && (l[i] = t[i])
                : e[i] !== void 0 && o.route.loader && (l[i] = e[i]),
            r && r.hasOwnProperty(i))
        )
            break;
    }
    return l;
}
function Rn(e, t) {
    return (
        (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
            .reverse()
            .find((r) => r.route.hasErrorBoundary === !0) || e[0]
    );
}
function za(e) {
    let t = e.find((n) => n.index || !n.path || n.path === "/") || {
        id: "__shim-error-route__",
    };
    return {
        matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
        route: t,
    };
}
function Qe(e, t) {
    let { pathname: n, routeId: r, method: l, type: o } = t === void 0 ? {} : t,
        i = "Unknown Server Error",
        u = "Unknown @remix-run/router error";
    return (
        e === 400
            ? ((i = "Bad Request"),
              l && n && r
                  ? (u =
                        "You made a " +
                        l +
                        ' request to "' +
                        n +
                        '" but ' +
                        ('did not provide a `loader` for route "' + r + '", ') +
                        "so there is no way to handle the request.")
                  : o === "defer-action"
                  ? (u = "defer() is not supported in actions")
                  : o === "invalid-body" &&
                    (u = "Unable to encode submission body"))
            : e === 403
            ? ((i = "Forbidden"),
              (u = 'Route "' + r + '" does not match URL "' + n + '"'))
            : e === 404
            ? ((i = "Not Found"), (u = 'No route matches URL "' + n + '"'))
            : e === 405 &&
              ((i = "Method Not Allowed"),
              l && n && r
                  ? (u =
                        "You made a " +
                        l.toUpperCase() +
                        ' request to "' +
                        n +
                        '" but ' +
                        ('did not provide an `action` for route "' +
                            r +
                            '", ') +
                        "so there is no way to handle the request.")
                  : l &&
                    (u = 'Invalid request method "' + l.toUpperCase() + '"')),
        new vu(e || 500, i, new Error(u), !0)
    );
}
function Ta(e) {
    for (let t = e.length - 1; t >= 0; t--) {
        let n = e[t];
        if (In(n)) return n;
    }
}
function ic(e) {
    let t = typeof e == "string" ? mt(e) : e;
    return fn(te({}, t, { hash: "" }));
}
function zp(e, t) {
    return e.pathname !== t.pathname || e.search !== t.search
        ? !1
        : e.hash === ""
        ? t.hash !== ""
        : e.hash === t.hash
        ? !0
        : t.hash !== "";
}
function rn(e) {
    return e.type === de.deferred;
}
function xr(e) {
    return e.type === de.error;
}
function In(e) {
    return (e && e.type) === de.redirect;
}
function Tp(e) {
    let t = e;
    return (
        t &&
        typeof t == "object" &&
        typeof t.data == "object" &&
        typeof t.subscribe == "function" &&
        typeof t.cancel == "function" &&
        typeof t.resolveData == "function"
    );
}
function Mp(e) {
    return (
        e != null &&
        typeof e.status == "number" &&
        typeof e.statusText == "string" &&
        typeof e.headers == "object" &&
        typeof e.body < "u"
    );
}
function Op(e) {
    return kp.has(e.toLowerCase());
}
function tt(e) {
    return wp.has(e.toLowerCase());
}
async function Ma(e, t, n, r, l, o) {
    for (let i = 0; i < n.length; i++) {
        let u = n[i],
            a = t[i];
        if (!a) continue;
        let s = e.find((v) => v.route.id === a.route.id),
            p = s != null && !oc(s, a) && (o && o[a.route.id]) !== void 0;
        if (rn(u) && (l || p)) {
            let v = r[i];
            H(
                v,
                "Expected an AbortSignal for revalidating fetcher deferred result"
            ),
                await uc(u, v, l).then((m) => {
                    m && (n[i] = m || n[i]);
                });
        }
    }
}
async function uc(e, t, n) {
    if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
        if (n)
            try {
                return { type: de.data, data: e.deferredData.unwrappedData };
            } catch (l) {
                return { type: de.error, error: l };
            }
        return { type: de.data, data: e.deferredData.data };
    }
}
function gu(e) {
    return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Fp(e, t) {
    let { route: n, pathname: r, params: l } = e;
    return {
        id: n.id,
        pathname: r,
        params: l,
        data: t[n.id],
        handle: n.handle,
    };
}
function gi(e, t) {
    let n = typeof t == "string" ? mt(t).search : t.search;
    if (e[e.length - 1].route.index && gu(n || "")) return e[e.length - 1];
    let r = fo(e);
    return r[r.length - 1];
}
function Oa(e) {
    let {
        formMethod: t,
        formAction: n,
        formEncType: r,
        text: l,
        formData: o,
        json: i,
    } = e;
    if (!(!t || !n || !r)) {
        if (l != null)
            return {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: void 0,
                json: void 0,
                text: l,
            };
        if (o != null)
            return {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: o,
                json: void 0,
                text: void 0,
            };
        if (i !== void 0)
            return {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: void 0,
                json: i,
                text: void 0,
            };
    }
}
function sl(e, t) {
    return t
        ? {
              state: "loading",
              location: e,
              formMethod: t.formMethod,
              formAction: t.formAction,
              formEncType: t.formEncType,
              formData: t.formData,
              json: t.json,
              text: t.text,
          }
        : {
              state: "loading",
              location: e,
              formMethod: void 0,
              formAction: void 0,
              formEncType: void 0,
              formData: void 0,
              json: void 0,
              text: void 0,
          };
}
function Up(e, t) {
    return {
        state: "submitting",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
    };
}
function sr(e, t) {
    return e
        ? {
              state: "loading",
              formMethod: e.formMethod,
              formAction: e.formAction,
              formEncType: e.formEncType,
              formData: e.formData,
              json: e.json,
              text: e.text,
              data: t,
              " _hasFetcherDoneAnything ": !0,
          }
        : {
              state: "loading",
              formMethod: void 0,
              formAction: void 0,
              formEncType: void 0,
              formData: void 0,
              json: void 0,
              text: void 0,
              data: t,
              " _hasFetcherDoneAnything ": !0,
          };
}
function jp(e, t) {
    return {
        state: "submitting",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t ? t.data : void 0,
        " _hasFetcherDoneAnything ": !0,
    };
}
function Nl(e) {
    return {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: e,
        " _hasFetcherDoneAnything ": !0,
    };
}
var po = { exports: {} },
    ho = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ip = F.exports,
    Ap = Symbol.for("react.element"),
    Bp = Symbol.for("react.fragment"),
    $p = Object.prototype.hasOwnProperty,
    Hp =
        Ip.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Vp = { key: !0, ref: !0, __self: !0, __source: !0 };
function ac(e, t, n) {
    var r,
        l = {},
        o = null,
        i = null;
    n !== void 0 && (o = "" + n),
        t.key !== void 0 && (o = "" + t.key),
        t.ref !== void 0 && (i = t.ref);
    for (r in t) $p.call(t, r) && !Vp.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: Ap,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: Hp.current,
    };
}
ho.Fragment = Bp;
ho.jsx = ac;
ho.jsxs = ac;
(function (e) {
    e.exports = ho;
})(po);
const sc = po.exports.Fragment,
    $ = po.exports.jsx,
    Ot = po.exports.jsxs;
/**
 * React Router v6.14.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Al() {
    return (
        (Al = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        Al.apply(this, arguments)
    );
}
const mo = F.exports.createContext(null),
    cc = F.exports.createContext(null),
    er = F.exports.createContext(null),
    vo = F.exports.createContext(null),
    Zt = F.exports.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1,
    }),
    fc = F.exports.createContext(null);
function Wp(e, t) {
    let { relative: n } = t === void 0 ? {} : t;
    qr() || H(!1);
    let { basename: r, navigator: l } = F.exports.useContext(er),
        { hash: o, pathname: i, search: u } = pc(e, { relative: n }),
        a = i;
    return (
        r !== "/" && (a = i === "/" ? r : xt([r, i])),
        l.createHref({ pathname: a, search: u, hash: o })
    );
}
function qr() {
    return F.exports.useContext(vo) != null;
}
function go() {
    return qr() || H(!1), F.exports.useContext(vo).location;
}
function dc(e) {
    F.exports.useContext(er).static || F.exports.useLayoutEffect(e);
}
function Qp() {
    let { isDataRoute: e } = F.exports.useContext(Zt);
    return e ? lh() : Kp();
}
function Kp() {
    qr() || H(!1);
    let e = F.exports.useContext(mo),
        { basename: t, navigator: n } = F.exports.useContext(er),
        { matches: r } = F.exports.useContext(Zt),
        { pathname: l } = go(),
        o = JSON.stringify(fo(r).map((a) => a.pathnameBase)),
        i = F.exports.useRef(!1);
    return (
        dc(() => {
            i.current = !0;
        }),
        F.exports.useCallback(
            function (a, s) {
                if ((s === void 0 && (s = {}), !i.current)) return;
                if (typeof a == "number") {
                    n.go(a);
                    return;
                }
                let p = mu(a, JSON.parse(o), l, s.relative === "path");
                e == null &&
                    t !== "/" &&
                    (p.pathname = p.pathname === "/" ? t : xt([t, p.pathname])),
                    (s.replace ? n.replace : n.push)(p, s.state, s);
            },
            [t, n, o, l, e]
        )
    );
}
function Yp() {
    let { matches: e } = F.exports.useContext(Zt),
        t = e[e.length - 1];
    return t ? t.params : {};
}
function pc(e, t) {
    let { relative: n } = t === void 0 ? {} : t,
        { matches: r } = F.exports.useContext(Zt),
        { pathname: l } = go(),
        o = JSON.stringify(fo(r).map((i) => i.pathnameBase));
    return F.exports.useMemo(
        () => mu(e, JSON.parse(o), l, n === "path"),
        [e, o, l, n]
    );
}
function Xp(e, t, n) {
    qr() || H(!1);
    let { navigator: r } = F.exports.useContext(er),
        { matches: l } = F.exports.useContext(Zt),
        o = l[l.length - 1],
        i = o ? o.params : {};
    o && o.pathname;
    let u = o ? o.pathnameBase : "/";
    o && o.route;
    let a = go(),
        s;
    if (t) {
        var p;
        let S = typeof t == "string" ? mt(t) : t;
        u === "/" ||
            ((p = S.pathname) == null ? void 0 : p.startsWith(u)) ||
            H(!1),
            (s = S);
    } else s = a;
    let v = s.pathname || "/",
        m = u === "/" ? v : v.slice(u.length) || "/",
        k = Cn(e, { pathname: m }),
        w = bp(
            k &&
                k.map((S) =>
                    Object.assign({}, S, {
                        params: Object.assign({}, i, S.params),
                        pathname: xt([
                            u,
                            r.encodeLocation
                                ? r.encodeLocation(S.pathname).pathname
                                : S.pathname,
                        ]),
                        pathnameBase:
                            S.pathnameBase === "/"
                                ? u
                                : xt([
                                      u,
                                      r.encodeLocation
                                          ? r.encodeLocation(S.pathnameBase)
                                                .pathname
                                          : S.pathnameBase,
                                  ]),
                    })
                ),
            l,
            n
        );
    return t && w
        ? $(vo.Provider, {
              value: {
                  location: Al(
                      {
                          pathname: "/",
                          search: "",
                          hash: "",
                          state: null,
                          key: "default",
                      },
                      s
                  ),
                  navigationType: ce.Pop,
              },
              children: w,
          })
        : w;
}
function Gp() {
    let e = rh(),
        t = nc(e)
            ? e.status + " " + e.statusText
            : e instanceof Error
            ? e.message
            : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null;
    return Ot(sc, {
        children: [
            $("h2", { children: "Unexpected Application Error!" }),
            $("h3", { style: { fontStyle: "italic" }, children: t }),
            n
                ? $("pre", {
                      style: {
                          padding: "0.5rem",
                          backgroundColor: "rgba(200,200,200, 0.5)",
                      },
                      children: n,
                  })
                : null,
            null,
        ],
    });
}
const Jp = $(Gp, {});
class Zp extends F.exports.Component {
    constructor(t) {
        super(t),
            (this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error,
            });
    }
    static getDerivedStateFromError(t) {
        return { error: t };
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location ||
            (n.revalidation !== "idle" && t.revalidation === "idle")
            ? {
                  error: t.error,
                  location: t.location,
                  revalidation: t.revalidation,
              }
            : {
                  error: t.error || n.error,
                  location: n.location,
                  revalidation: t.revalidation || n.revalidation,
              };
    }
    componentDidCatch(t, n) {
        console.error(
            "React Router caught the following error during render",
            t,
            n
        );
    }
    render() {
        return this.state.error
            ? $(Zt.Provider, {
                  value: this.props.routeContext,
                  children: $(fc.Provider, {
                      value: this.state.error,
                      children: this.props.component,
                  }),
              })
            : this.props.children;
    }
}
function qp(e) {
    let { routeContext: t, match: n, children: r } = e,
        l = F.exports.useContext(mo);
    return (
        l &&
            l.static &&
            l.staticContext &&
            (n.route.errorElement || n.route.ErrorBoundary) &&
            (l.staticContext._deepestRenderedBoundaryId = n.route.id),
        $(Zt.Provider, { value: t, children: r })
    );
}
function bp(e, t, n) {
    var r;
    if ((t === void 0 && (t = []), n === void 0 && (n = null), e == null)) {
        var l;
        if ((l = n) != null && l.errors) e = n.matches;
        else return null;
    }
    let o = e,
        i = (r = n) == null ? void 0 : r.errors;
    if (i != null) {
        let u = o.findIndex(
            (a) => a.route.id && (i == null ? void 0 : i[a.route.id])
        );
        u >= 0 || H(!1), (o = o.slice(0, Math.min(o.length, u + 1)));
    }
    return o.reduceRight((u, a, s) => {
        let p = a.route.id ? (i == null ? void 0 : i[a.route.id]) : null,
            v = null;
        n && (v = a.route.errorElement || Jp);
        let m = t.concat(o.slice(0, s + 1)),
            k = () => {
                let w;
                return (
                    p
                        ? (w = v)
                        : a.route.Component
                        ? (w = F.exports.createElement(a.route.Component, null))
                        : a.route.element
                        ? (w = a.route.element)
                        : (w = u),
                    $(qp, {
                        match: a,
                        routeContext: {
                            outlet: u,
                            matches: m,
                            isDataRoute: n != null,
                        },
                        children: w,
                    })
                );
            };
        return n && (a.route.ErrorBoundary || a.route.errorElement || s === 0)
            ? $(Zp, {
                  location: n.location,
                  revalidation: n.revalidation,
                  component: v,
                  error: p,
                  children: k(),
                  routeContext: { outlet: null, matches: m, isDataRoute: !0 },
              })
            : k();
    }, null);
}
var yi;
(function (e) {
    (e.UseBlocker = "useBlocker"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate");
})(yi || (yi = {}));
var Mr;
(function (e) {
    (e.UseBlocker = "useBlocker"),
        (e.UseLoaderData = "useLoaderData"),
        (e.UseActionData = "useActionData"),
        (e.UseRouteError = "useRouteError"),
        (e.UseNavigation = "useNavigation"),
        (e.UseRouteLoaderData = "useRouteLoaderData"),
        (e.UseMatches = "useMatches"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate"),
        (e.UseRouteId = "useRouteId");
})(Mr || (Mr = {}));
function eh(e) {
    let t = F.exports.useContext(mo);
    return t || H(!1), t;
}
function th(e) {
    let t = F.exports.useContext(cc);
    return t || H(!1), t;
}
function nh(e) {
    let t = F.exports.useContext(Zt);
    return t || H(!1), t;
}
function hc(e) {
    let t = nh(),
        n = t.matches[t.matches.length - 1];
    return n.route.id || H(!1), n.route.id;
}
function rh() {
    var e;
    let t = F.exports.useContext(fc),
        n = th(Mr.UseRouteError),
        r = hc(Mr.UseRouteError);
    return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function lh() {
    let { router: e } = eh(yi.UseNavigateStable),
        t = hc(Mr.UseNavigateStable),
        n = F.exports.useRef(!1);
    return (
        dc(() => {
            n.current = !0;
        }),
        F.exports.useCallback(
            function (l, o) {
                o === void 0 && (o = {}),
                    n.current &&
                        (typeof l == "number"
                            ? e.navigate(l)
                            : e.navigate(l, Al({ fromRouteId: t }, o)));
            },
            [e, t]
        )
    );
}
const oh = "startTransition",
    Fa = bs[oh];
function ih(e) {
    let { fallbackElement: t, router: n, future: r } = e,
        [l, o] = F.exports.useState(n.state),
        { v7_startTransition: i } = r || {},
        u = F.exports.useCallback(
            (v) => {
                i && Fa ? Fa(() => o(v)) : o(v);
            },
            [o, i]
        );
    F.exports.useLayoutEffect(() => n.subscribe(u), [n, u]);
    let a = F.exports.useMemo(
            () => ({
                createHref: n.createHref,
                encodeLocation: n.encodeLocation,
                go: (v) => n.navigate(v),
                push: (v, m, k) =>
                    n.navigate(v, {
                        state: m,
                        preventScrollReset:
                            k == null ? void 0 : k.preventScrollReset,
                    }),
                replace: (v, m, k) =>
                    n.navigate(v, {
                        replace: !0,
                        state: m,
                        preventScrollReset:
                            k == null ? void 0 : k.preventScrollReset,
                    }),
            }),
            [n]
        ),
        s = n.basename || "/",
        p = F.exports.useMemo(
            () => ({ router: n, navigator: a, static: !1, basename: s }),
            [n, a, s]
        );
    return $(sc, {
        children: $(mo.Provider, {
            value: p,
            children: $(cc.Provider, {
                value: l,
                children: $(ah, {
                    basename: s,
                    location: l.location,
                    navigationType: l.historyAction,
                    navigator: a,
                    children: l.initialized
                        ? $(uh, { routes: n.routes, state: l })
                        : t,
                }),
            }),
        }),
    });
}
function uh(e) {
    let { routes: t, state: n } = e;
    return Xp(t, void 0, n);
}
function ah(e) {
    let {
        basename: t = "/",
        children: n = null,
        location: r,
        navigationType: l = ce.Pop,
        navigator: o,
        static: i = !1,
    } = e;
    qr() && H(!1);
    let u = t.replace(/^\/*/, "/"),
        a = F.exports.useMemo(
            () => ({ basename: u, navigator: o, static: i }),
            [u, o, i]
        );
    typeof r == "string" && (r = mt(r));
    let {
            pathname: s = "/",
            search: p = "",
            hash: v = "",
            state: m = null,
            key: k = "default",
        } = r,
        w = F.exports.useMemo(() => {
            let S = bn(s, u);
            return S == null
                ? null
                : {
                      location: {
                          pathname: S,
                          search: p,
                          hash: v,
                          state: m,
                          key: k,
                      },
                      navigationType: l,
                  };
        }, [u, s, p, v, m, k, l]);
    return w == null
        ? null
        : $(er.Provider, {
              value: a,
              children: $(vo.Provider, { children: n, value: w }),
          });
}
var Ua;
(function (e) {
    (e[(e.pending = 0)] = "pending"),
        (e[(e.success = 1)] = "success"),
        (e[(e.error = 2)] = "error");
})(Ua || (Ua = {}));
new Promise(() => {});
function sh(e) {
    let t = {
        hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
    };
    return (
        e.Component &&
            Object.assign(t, {
                element: F.exports.createElement(e.Component),
                Component: void 0,
            }),
        e.ErrorBoundary &&
            Object.assign(t, {
                errorElement: F.exports.createElement(e.ErrorBoundary),
                ErrorBoundary: void 0,
            }),
        t
    );
}
/**
 * React Router DOM v6.14.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Bl() {
    return (
        (Bl = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        Bl.apply(this, arguments)
    );
}
function ch(e, t) {
    if (e == null) return {};
    var n = {},
        r = Object.keys(e),
        l,
        o;
    for (o = 0; o < r.length; o++)
        (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
    return n;
}
function fh(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function dh(e, t) {
    return e.button === 0 && (!t || t === "_self") && !fh(e);
}
const ph = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
];
function hh(e, t) {
    return Pp({
        basename: t == null ? void 0 : t.basename,
        future: Bl({}, t == null ? void 0 : t.future, {
            v7_prependBasename: !0,
        }),
        history: Gd({ window: t == null ? void 0 : t.window }),
        hydrationData: (t == null ? void 0 : t.hydrationData) || mh(),
        routes: e,
        mapRouteProperties: sh,
    }).initialize();
}
function mh() {
    var e;
    let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
    return t && t.errors && (t = Bl({}, t, { errors: vh(t.errors) })), t;
}
function vh(e) {
    if (!e) return null;
    let t = Object.entries(e),
        n = {};
    for (let [r, l] of t)
        if (l && l.__type === "RouteErrorResponse")
            n[r] = new vu(l.status, l.statusText, l.data, l.internal === !0);
        else if (l && l.__type === "Error") {
            let o = new Error(l.message);
            (o.stack = ""), (n[r] = o);
        } else n[r] = l;
    return n;
}
const gh = "startTransition";
bs[gh];
const yh =
        typeof window < "u" &&
        typeof window.document < "u" &&
        typeof window.document.createElement < "u",
    wh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Sh = F.exports.forwardRef(function (t, n) {
        let {
                onClick: r,
                relative: l,
                reloadDocument: o,
                replace: i,
                state: u,
                target: a,
                to: s,
                preventScrollReset: p,
            } = t,
            v = ch(t, ph),
            { basename: m } = F.exports.useContext(er),
            k,
            w = !1;
        if (typeof s == "string" && wh.test(s) && ((k = s), yh))
            try {
                let c = new URL(window.location.href),
                    h = s.startsWith("//")
                        ? new URL(c.protocol + s)
                        : new URL(s),
                    f = bn(h.pathname, m);
                h.origin === c.origin && f != null
                    ? (s = f + h.search + h.hash)
                    : (w = !0);
            } catch {}
        let S = Wp(s, { relative: l }),
            _ = kh(s, {
                replace: i,
                state: u,
                target: a,
                preventScrollReset: p,
                relative: l,
            });
        function d(c) {
            r && r(c), c.defaultPrevented || _(c);
        }
        return $("a", {
            ...v,
            href: k || S,
            onClick: w || o ? r : d,
            ref: n,
            target: a,
        });
    });
var ja;
(function (e) {
    (e.UseScrollRestoration = "useScrollRestoration"),
        (e.UseSubmit = "useSubmit"),
        (e.UseSubmitFetcher = "useSubmitFetcher"),
        (e.UseFetcher = "useFetcher");
})(ja || (ja = {}));
var Ia;
(function (e) {
    (e.UseFetchers = "useFetchers"),
        (e.UseScrollRestoration = "useScrollRestoration");
})(Ia || (Ia = {}));
function kh(e, t) {
    let {
            target: n,
            replace: r,
            state: l,
            preventScrollReset: o,
            relative: i,
        } = t === void 0 ? {} : t,
        u = Qp(),
        a = go(),
        s = pc(e, { relative: i });
    return F.exports.useCallback(
        (p) => {
            if (dh(p, n)) {
                p.preventDefault();
                let v = r !== void 0 ? r : fn(a) === fn(s);
                u(e, {
                    replace: v,
                    state: l,
                    preventScrollReset: o,
                    relative: i,
                });
            }
        },
        [a, u, s, r, l, n, e, o, i]
    );
}
const Aa = ({ name: e, quality: t, languages: n, id: r, logo: l }) =>
        $(Sh, {
            to: `/source-details/${r}`,
            children: Ot("div", {
                className:
                    "p-4 col-span-1 bg-background-800 space-y-2 rounded-md hover:bg-white/20 transition duration-300",
                children: [
                    Ot("div", {
                        className: "flex items-center gap-2",
                        children: [
                            Ot("div", {
                                className: "relative w-6 h-6 rounded-full",
                                children: [
                                    $("img", {
                                        src: l,
                                        alt: e,
                                        className:
                                            "absolute z-10 w-full h-full object-cover",
                                    }),
                                    $("div", {
                                        className:
                                            "absolute w-full h-full z-0 animate-pulse bg-white/20 rounded-full",
                                    }),
                                ],
                            }),
                            $("h1", {
                                className: "text-xl font-semibold",
                                children: e,
                            }),
                        ],
                    }),
                    Ot("div", {
                        className: "space-y-2",
                        children: [
                            (t == null ? void 0 : t.length) &&
                                Ot("div", {
                                    className:
                                        "flex items-center gap-1 flex-wrap",
                                    children: [
                                        $("p", {
                                            className: "text-sm font-semibold",
                                            children: "Quality:",
                                        }),
                                        t.map((o) =>
                                            $(
                                                "p",
                                                {
                                                    className:
                                                        "bg-gray-600 font-semibold rounded-md p-1",
                                                    children: o,
                                                },
                                                o
                                            )
                                        ),
                                    ],
                                }),
                            Ot("div", {
                                className: "flex items-center gap-1 flex-wrap",
                                children: [
                                    $("p", {
                                        className: "text-sm font-semibold",
                                        children: "Language:",
                                    }),
                                    n.map((o) =>
                                        $(
                                            "p",
                                            {
                                                className:
                                                    "bg-gray-600 font-semibold rounded-md p-1",
                                                children: o,
                                            },
                                            o
                                        )
                                    ),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        }),
    xh = () =>
        $("div", {
            className: "min-h-[inherit] flex items-center justify-center",
            children: Ot("div", {
                className: "w-2/3",
                children: [
                    $("h1", {
                        className: "text-3xl font-semibold mb-8",
                        children: "Your sources",
                    }),
                    $("h2", {
                        className: "text-xl mb-2 font-semibold",
                        children: "Anime",
                    }),
                    $("div", {
                        className: "grid grid-cols-3 gap-4 mb-4",
                        children: Object.entries(AnimeServices).map(([e, t]) =>
                            $(
                                Aa,
                                {
                                    name: e,
                                    languages: t.languages,
                                    quality: t.quality,
                                    id: e,
                                    logo: t.logo,
                                },
                                e
                            )
                        ),
                    }),
                    $("h2", {
                        className: "text-xl mb-2 font-semibold",
                        children: "Manga",
                    }),
                    $("div", {
                        className: "grid grid-cols-3 gap-4",
                        children: Object.entries(MangaServices).map(([e, t]) =>
                            $(
                                Aa,
                                {
                                    name: e,
                                    languages: t.languages,
                                    id: e,
                                    logo: t.logo,
                                },
                                e
                            )
                        ),
                    }),
                ],
            }),
        });
var mc = { exports: {} },
    He = {},
    vc = { exports: {} },
    gc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(N, O) {
        var B = N.length;
        N.push(O);
        e: for (; 0 < B; ) {
            var re = (B - 1) >>> 1,
                se = N[re];
            if (0 < l(se, O)) (N[re] = O), (N[B] = se), (B = re);
            else break e;
        }
    }
    function n(N) {
        return N.length === 0 ? null : N[0];
    }
    function r(N) {
        if (N.length === 0) return null;
        var O = N[0],
            B = N.pop();
        if (B !== O) {
            N[0] = B;
            e: for (var re = 0, se = N.length, Sn = se >>> 1; re < Sn; ) {
                var b = 2 * (re + 1) - 1,
                    vt = N[b],
                    at = b + 1,
                    kn = N[at];
                if (0 > l(vt, B))
                    at < se && 0 > l(kn, vt)
                        ? ((N[re] = kn), (N[at] = B), (re = at))
                        : ((N[re] = vt), (N[b] = B), (re = b));
                else if (at < se && 0 > l(kn, B))
                    (N[re] = kn), (N[at] = B), (re = at);
                else break e;
            }
        }
        return O;
    }
    function l(N, O) {
        var B = N.sortIndex - O.sortIndex;
        return B !== 0 ? B : N.id - O.id;
    }
    if (
        typeof performance == "object" &&
        typeof performance.now == "function"
    ) {
        var o = performance;
        e.unstable_now = function () {
            return o.now();
        };
    } else {
        var i = Date,
            u = i.now();
        e.unstable_now = function () {
            return i.now() - u;
        };
    }
    var a = [],
        s = [],
        p = 1,
        v = null,
        m = 3,
        k = !1,
        w = !1,
        S = !1,
        _ = typeof setTimeout == "function" ? setTimeout : null,
        d = typeof clearTimeout == "function" ? clearTimeout : null,
        c = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function h(N) {
        for (var O = n(s); O !== null; ) {
            if (O.callback === null) r(s);
            else if (O.startTime <= N)
                r(s), (O.sortIndex = O.expirationTime), t(a, O);
            else break;
            O = n(s);
        }
    }
    function f(N) {
        if (((S = !1), h(N), !w))
            if (n(a) !== null) (w = !0), qe(E);
            else {
                var O = n(s);
                O !== null && ut(f, O.startTime - N);
            }
    }
    function E(N, O) {
        (w = !1), S && ((S = !1), d(D), (D = -1)), (k = !0);
        var B = m;
        try {
            for (
                h(O), v = n(a);
                v !== null && (!(v.expirationTime > O) || (N && !ye()));

            ) {
                var re = v.callback;
                if (typeof re == "function") {
                    (v.callback = null), (m = v.priorityLevel);
                    var se = re(v.expirationTime <= O);
                    (O = e.unstable_now()),
                        typeof se == "function"
                            ? (v.callback = se)
                            : v === n(a) && r(a),
                        h(O);
                } else r(a);
                v = n(a);
            }
            if (v !== null) var Sn = !0;
            else {
                var b = n(s);
                b !== null && ut(f, b.startTime - O), (Sn = !1);
            }
            return Sn;
        } finally {
            (v = null), (m = B), (k = !1);
        }
    }
    var P = !1,
        R = null,
        D = -1,
        W = 5,
        I = -1;
    function ye() {
        return !(e.unstable_now() - I < W);
    }
    function X() {
        if (R !== null) {
            var N = e.unstable_now();
            I = N;
            var O = !0;
            try {
                O = R(!0, N);
            } finally {
                O ? Lt() : ((P = !1), (R = null));
            }
        } else P = !1;
    }
    var Lt;
    if (typeof c == "function")
        Lt = function () {
            c(X);
        };
    else if (typeof MessageChannel < "u") {
        var wn = new MessageChannel(),
            Dt = wn.port2;
        (wn.port1.onmessage = X),
            (Lt = function () {
                Dt.postMessage(null);
            });
    } else
        Lt = function () {
            _(X, 0);
        };
    function qe(N) {
        (R = N), P || ((P = !0), Lt());
    }
    function ut(N, O) {
        D = _(function () {
            N(e.unstable_now());
        }, O);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (N) {
            N.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            w || k || ((w = !0), qe(E));
        }),
        (e.unstable_forceFrameRate = function (N) {
            0 > N || 125 < N
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (W = 0 < N ? Math.floor(1e3 / N) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return m;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(a);
        }),
        (e.unstable_next = function (N) {
            switch (m) {
                case 1:
                case 2:
                case 3:
                    var O = 3;
                    break;
                default:
                    O = m;
            }
            var B = m;
            m = O;
            try {
                return N();
            } finally {
                m = B;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (N, O) {
            switch (N) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    N = 3;
            }
            var B = m;
            m = N;
            try {
                return O();
            } finally {
                m = B;
            }
        }),
        (e.unstable_scheduleCallback = function (N, O, B) {
            var re = e.unstable_now();
            switch (
                (typeof B == "object" && B !== null
                    ? ((B = B.delay),
                      (B = typeof B == "number" && 0 < B ? re + B : re))
                    : (B = re),
                N)
            ) {
                case 1:
                    var se = -1;
                    break;
                case 2:
                    se = 250;
                    break;
                case 5:
                    se = 1073741823;
                    break;
                case 4:
                    se = 1e4;
                    break;
                default:
                    se = 5e3;
            }
            return (
                (se = B + se),
                (N = {
                    id: p++,
                    callback: O,
                    priorityLevel: N,
                    startTime: B,
                    expirationTime: se,
                    sortIndex: -1,
                }),
                B > re
                    ? ((N.sortIndex = B),
                      t(s, N),
                      n(a) === null &&
                          N === n(s) &&
                          (S ? (d(D), (D = -1)) : (S = !0), ut(f, B - re)))
                    : ((N.sortIndex = se),
                      t(a, N),
                      w || k || ((w = !0), qe(E))),
                N
            );
        }),
        (e.unstable_shouldYield = ye),
        (e.unstable_wrapCallback = function (N) {
            var O = m;
            return function () {
                var B = m;
                m = O;
                try {
                    return N.apply(this, arguments);
                } finally {
                    m = B;
                }
            };
        });
})(gc);
(function (e) {
    e.exports = gc;
})(vc);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yc = F.exports,
    $e = vc.exports;
function C(e) {
    for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
            n = 1;
        n < arguments.length;
        n++
    )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var wc = new Set(),
    Or = {};
function gn(e, t) {
    Qn(e, t), Qn(e + "Capture", t);
}
function Qn(e, t) {
    for (Or[e] = t, e = 0; e < t.length; e++) wc.add(t[e]);
}
var Ct = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
    ),
    wi = Object.prototype.hasOwnProperty,
    Eh =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Ba = {},
    $a = {};
function Ch(e) {
    return wi.call($a, e)
        ? !0
        : wi.call(Ba, e)
        ? !1
        : Eh.test(e)
        ? ($a[e] = !0)
        : ((Ba[e] = !0), !1);
}
function Rh(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r
                ? !1
                : n !== null
                ? !n.acceptsBooleans
                : ((e = e.toLowerCase().slice(0, 5)),
                  e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function Ph(e, t, n, r) {
    if (t === null || typeof t > "u" || Rh(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function De(e, t, n, r, l, o, i) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = l),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = i);
}
var xe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        xe[e] = new De(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    xe[t] = new De(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    xe[e] = new De(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
].forEach(function (e) {
    xe[e] = new De(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        xe[e] = new De(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    xe[e] = new De(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    xe[e] = new De(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    xe[e] = new De(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    xe[e] = new De(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var yu = /[\-:]([a-z])/g;
function wu(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(yu, wu);
        xe[t] = new De(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(yu, wu);
        xe[t] = new De(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(yu, wu);
    xe[t] = new De(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    xe[e] = new De(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
xe.xlinkHref = new De(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
    xe[e] = new De(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Su(e, t, n, r) {
    var l = xe.hasOwnProperty(t) ? xe[t] : null;
    (l !== null
        ? l.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (Ph(t, n, l, r) && (n = null),
        r || l === null
            ? Ch(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
            : l.mustUseProperty
            ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
            : ((t = l.attributeName),
              (r = l.attributeNamespace),
              n === null
                  ? e.removeAttribute(t)
                  : ((l = l.type),
                    (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Nt = yc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    cl = Symbol.for("react.element"),
    Pn = Symbol.for("react.portal"),
    _n = Symbol.for("react.fragment"),
    ku = Symbol.for("react.strict_mode"),
    Si = Symbol.for("react.profiler"),
    Sc = Symbol.for("react.provider"),
    kc = Symbol.for("react.context"),
    xu = Symbol.for("react.forward_ref"),
    ki = Symbol.for("react.suspense"),
    xi = Symbol.for("react.suspense_list"),
    Eu = Symbol.for("react.memo"),
    Ft = Symbol.for("react.lazy"),
    xc = Symbol.for("react.offscreen"),
    Ha = Symbol.iterator;
function cr(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (Ha && e[Ha]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var ie = Object.assign,
    Vo;
function yr(e) {
    if (Vo === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Vo = (t && t[1]) || "";
        }
    return (
        `
` +
        Vo +
        e
    );
}
var Wo = !1;
function Qo(e, t) {
    if (!e || Wo) return "";
    Wo = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (s) {
                    var r = s;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (s) {
                    r = s;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (s) {
                r = s;
            }
            e();
        }
    } catch (s) {
        if (s && r && typeof s.stack == "string") {
            for (
                var l = s.stack.split(`
`),
                    o = r.stack.split(`
`),
                    i = l.length - 1,
                    u = o.length - 1;
                1 <= i && 0 <= u && l[i] !== o[u];

            )
                u--;
            for (; 1 <= i && 0 <= u; i--, u--)
                if (l[i] !== o[u]) {
                    if (i !== 1 || u !== 1)
                        do
                            if ((i--, u--, 0 > u || l[i] !== o[u])) {
                                var a =
                                    `
` + l[i].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        a.includes("<anonymous>") &&
                                        (a = a.replace(
                                            "<anonymous>",
                                            e.displayName
                                        )),
                                    a
                                );
                            }
                        while (1 <= i && 0 <= u);
                    break;
                }
        }
    } finally {
        (Wo = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? yr(e) : "";
}
function _h(e) {
    switch (e.tag) {
        case 5:
            return yr(e.type);
        case 16:
            return yr("Lazy");
        case 13:
            return yr("Suspense");
        case 19:
            return yr("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = Qo(e.type, !1)), e;
        case 11:
            return (e = Qo(e.type.render, !1)), e;
        case 1:
            return (e = Qo(e.type, !0)), e;
        default:
            return "";
    }
}
function Ei(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case _n:
            return "Fragment";
        case Pn:
            return "Portal";
        case Si:
            return "Profiler";
        case ku:
            return "StrictMode";
        case ki:
            return "Suspense";
        case xi:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case kc:
                return (e.displayName || "Context") + ".Consumer";
            case Sc:
                return (e._context.displayName || "Context") + ".Provider";
            case xu:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ""),
                        (e =
                            e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case Eu:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : Ei(e.type) || "Memo"
                );
            case Ft:
                (t = e._payload), (e = e._init);
                try {
                    return Ei(e(t));
                } catch {}
        }
    return null;
}
function Nh(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName ||
                    (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Ei(t);
        case 8:
            return t === ku ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function Gt(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function Ec(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function Lh(e) {
    var t = Ec(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
    ) {
        var l = n.get,
            o = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return l.call(this);
                },
                set: function (i) {
                    (r = "" + i), o.call(this, i);
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (i) {
                    r = "" + i;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                },
            }
        );
    }
}
function fl(e) {
    e._valueTracker || (e._valueTracker = Lh(e));
}
function Cc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = Ec(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function $l(e) {
    if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function Ci(e, t) {
    var n = t.checked;
    return ie({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n != null ? n : e._wrapperState.initialChecked,
    });
}
function Va(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = Gt(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null,
        });
}
function Rc(e, t) {
    (t = t.checked), t != null && Su(e, "checked", t, !1);
}
function Ri(e, t) {
    Rc(e, t);
    var n = Gt(t.value),
        r = t.type;
    if (n != null)
        r === "number"
            ? ((n === 0 && e.value === "") || e.value != n) &&
              (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
    }
    t.hasOwnProperty("value")
        ? Pi(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Pi(e, t.type, Gt(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function Wa(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
            !(
                (r !== "submit" && r !== "reset") ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        (t = "" + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n);
}
function Pi(e, t, n) {
    (t !== "number" || $l(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var wr = Array.isArray;
function An(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            (l = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== l && (e[n].selected = l),
                l && r && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + Gt(n), t = null, l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                (e[l].selected = !0), r && (e[l].defaultSelected = !0);
                return;
            }
            t !== null || e[l].disabled || (t = e[l]);
        }
        t !== null && (t.selected = !0);
    }
}
function _i(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
    return ie({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
    });
}
function Qa(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(C(92));
            if (wr(n)) {
                if (1 < n.length) throw Error(C(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Gt(n) };
}
function Pc(e, t) {
    var n = Gt(t.value),
        r = Gt(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r);
}
function Ka(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
}
function _c(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function Ni(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? _c(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
}
var dl,
    Nc = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, l) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, l);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (
                dl = dl || document.createElement("div"),
                    dl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = dl.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function Fr(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Er = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    Dh = ["Webkit", "ms", "Moz", "O"];
Object.keys(Er).forEach(function (e) {
    Dh.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Er[t] = Er[e]);
    });
});
function Lc(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
          typeof t != "number" ||
          t === 0 ||
          (Er.hasOwnProperty(e) && Er[e])
        ? ("" + t).trim()
        : t + "px";
}
function Dc(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                l = Lc(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, l) : (e[n] = l);
        }
}
var zh = ie(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    }
);
function Li(e, t) {
    if (t) {
        if (zh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(C(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(C(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(C(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(C(62));
    }
}
function Di(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var zi = null;
function Cu(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var Ti = null,
    Bn = null,
    $n = null;
function Ya(e) {
    if ((e = tl(e))) {
        if (typeof Ti != "function") throw Error(C(280));
        var t = e.stateNode;
        t && ((t = xo(t)), Ti(e.stateNode, e.type, t));
    }
}
function zc(e) {
    Bn ? ($n ? $n.push(e) : ($n = [e])) : (Bn = e);
}
function Tc() {
    if (Bn) {
        var e = Bn,
            t = $n;
        if ((($n = Bn = null), Ya(e), t))
            for (e = 0; e < t.length; e++) Ya(t[e]);
    }
}
function Mc(e, t) {
    return e(t);
}
function Oc() {}
var Ko = !1;
function Fc(e, t, n) {
    if (Ko) return e(t, n);
    Ko = !0;
    try {
        return Mc(e, t, n);
    } finally {
        (Ko = !1), (Bn !== null || $n !== null) && (Oc(), Tc());
    }
}
function Ur(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = xo(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(
                    e === "button" ||
                    e === "input" ||
                    e === "select" ||
                    e === "textarea"
                ))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(C(231, t, typeof n));
    return n;
}
var Mi = !1;
if (Ct)
    try {
        var fr = {};
        Object.defineProperty(fr, "passive", {
            get: function () {
                Mi = !0;
            },
        }),
            window.addEventListener("test", fr, fr),
            window.removeEventListener("test", fr, fr);
    } catch {
        Mi = !1;
    }
function Th(e, t, n, r, l, o, i, u, a) {
    var s = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, s);
    } catch (p) {
        this.onError(p);
    }
}
var Cr = !1,
    Hl = null,
    Vl = !1,
    Oi = null,
    Mh = {
        onError: function (e) {
            (Cr = !0), (Hl = e);
        },
    };
function Oh(e, t, n, r, l, o, i, u, a) {
    (Cr = !1), (Hl = null), Th.apply(Mh, arguments);
}
function Fh(e, t, n, r, l, o, i, u, a) {
    if ((Oh.apply(this, arguments), Cr)) {
        if (Cr) {
            var s = Hl;
            (Cr = !1), (Hl = null);
        } else throw Error(C(198));
        Vl || ((Vl = !0), (Oi = s));
    }
}
function yn(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function Uc(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null &&
                ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function Xa(e) {
    if (yn(e) !== e) throw Error(C(188));
}
function Uh(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = yn(e)), t === null)) throw Error(C(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null) break;
        var o = l.alternate;
        if (o === null) {
            if (((r = l.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (l.child === o.child) {
            for (o = l.child; o; ) {
                if (o === n) return Xa(l), e;
                if (o === r) return Xa(l), t;
                o = o.sibling;
            }
            throw Error(C(188));
        }
        if (n.return !== r.return) (n = l), (r = o);
        else {
            for (var i = !1, u = l.child; u; ) {
                if (u === n) {
                    (i = !0), (n = l), (r = o);
                    break;
                }
                if (u === r) {
                    (i = !0), (r = l), (n = o);
                    break;
                }
                u = u.sibling;
            }
            if (!i) {
                for (u = o.child; u; ) {
                    if (u === n) {
                        (i = !0), (n = o), (r = l);
                        break;
                    }
                    if (u === r) {
                        (i = !0), (r = o), (n = l);
                        break;
                    }
                    u = u.sibling;
                }
                if (!i) throw Error(C(189));
            }
        }
        if (n.alternate !== r) throw Error(C(190));
    }
    if (n.tag !== 3) throw Error(C(188));
    return n.stateNode.current === n ? e : t;
}
function jc(e) {
    return (e = Uh(e)), e !== null ? Ic(e) : null;
}
function Ic(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = Ic(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Ac = $e.unstable_scheduleCallback,
    Ga = $e.unstable_cancelCallback,
    jh = $e.unstable_shouldYield,
    Ih = $e.unstable_requestPaint,
    ae = $e.unstable_now,
    Ah = $e.unstable_getCurrentPriorityLevel,
    Ru = $e.unstable_ImmediatePriority,
    Bc = $e.unstable_UserBlockingPriority,
    Wl = $e.unstable_NormalPriority,
    Bh = $e.unstable_LowPriority,
    $c = $e.unstable_IdlePriority,
    yo = null,
    pt = null;
function $h(e) {
    if (pt && typeof pt.onCommitFiberRoot == "function")
        try {
            pt.onCommitFiberRoot(
                yo,
                e,
                void 0,
                (e.current.flags & 128) === 128
            );
        } catch {}
}
var lt = Math.clz32 ? Math.clz32 : Wh,
    Hh = Math.log,
    Vh = Math.LN2;
function Wh(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Hh(e) / Vh) | 0)) | 0;
}
var pl = 64,
    hl = 4194304;
function Sr(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function Ql(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        l = e.suspendedLanes,
        o = e.pingedLanes,
        i = n & 268435455;
    if (i !== 0) {
        var u = i & ~l;
        u !== 0 ? (r = Sr(u)) : ((o &= i), o !== 0 && (r = Sr(o)));
    } else (i = n & ~l), i !== 0 ? (r = Sr(i)) : o !== 0 && (r = Sr(o));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        (t & l) === 0 &&
        ((l = r & -r),
        (o = t & -t),
        l >= o || (l === 16 && (o & 4194240) !== 0))
    )
        return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - lt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
    return r;
}
function Qh(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function Kh(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            l = e.expirationTimes,
            o = e.pendingLanes;
        0 < o;

    ) {
        var i = 31 - lt(o),
            u = 1 << i,
            a = l[i];
        a === -1
            ? ((u & n) === 0 || (u & r) !== 0) && (l[i] = Qh(u, t))
            : a <= t && (e.expiredLanes |= u),
            (o &= ~u);
    }
}
function Fi(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function Hc() {
    var e = pl;
    return (pl <<= 1), (pl & 4194240) === 0 && (pl = 64), e;
}
function Yo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function br(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - lt(t)),
        (e[t] = n);
}
function Yh(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - lt(n),
            o = 1 << l;
        (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
    }
}
function Pu(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - lt(n),
            l = 1 << r;
        (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
}
var Y = 0;
function Vc(e) {
    return (
        (e &= -e),
        1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
}
var Wc,
    _u,
    Qc,
    Kc,
    Yc,
    Ui = !1,
    ml = [],
    $t = null,
    Ht = null,
    Vt = null,
    jr = new Map(),
    Ir = new Map(),
    jt = [],
    Xh =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " "
        );
function Ja(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            $t = null;
            break;
        case "dragenter":
        case "dragleave":
            Ht = null;
            break;
        case "mouseover":
        case "mouseout":
            Vt = null;
            break;
        case "pointerover":
        case "pointerout":
            jr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Ir.delete(t.pointerId);
    }
}
function dr(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: o,
              targetContainers: [l],
          }),
          t !== null && ((t = tl(t)), t !== null && _u(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          l !== null && t.indexOf(l) === -1 && t.push(l),
          e);
}
function Gh(e, t, n, r, l) {
    switch (t) {
        case "focusin":
            return ($t = dr($t, e, t, n, r, l)), !0;
        case "dragenter":
            return (Ht = dr(Ht, e, t, n, r, l)), !0;
        case "mouseover":
            return (Vt = dr(Vt, e, t, n, r, l)), !0;
        case "pointerover":
            var o = l.pointerId;
            return jr.set(o, dr(jr.get(o) || null, e, t, n, r, l)), !0;
        case "gotpointercapture":
            return (
                (o = l.pointerId),
                Ir.set(o, dr(Ir.get(o) || null, e, t, n, r, l)),
                !0
            );
    }
    return !1;
}
function Xc(e) {
    var t = ln(e.target);
    if (t !== null) {
        var n = yn(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = Uc(n)), t !== null)) {
                    (e.blockedOn = t),
                        Yc(e.priority, function () {
                            Qc(n);
                        });
                    return;
                }
            } else if (
                t === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
            ) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function Ll(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = ji(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (zi = r), n.target.dispatchEvent(r), (zi = null);
        } else return (t = tl(n)), t !== null && _u(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function Za(e, t, n) {
    Ll(e) && n.delete(t);
}
function Jh() {
    (Ui = !1),
        $t !== null && Ll($t) && ($t = null),
        Ht !== null && Ll(Ht) && (Ht = null),
        Vt !== null && Ll(Vt) && (Vt = null),
        jr.forEach(Za),
        Ir.forEach(Za);
}
function pr(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        Ui ||
            ((Ui = !0),
            $e.unstable_scheduleCallback($e.unstable_NormalPriority, Jh)));
}
function Ar(e) {
    function t(l) {
        return pr(l, e);
    }
    if (0 < ml.length) {
        pr(ml[0], e);
        for (var n = 1; n < ml.length; n++) {
            var r = ml[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        $t !== null && pr($t, e),
            Ht !== null && pr(Ht, e),
            Vt !== null && pr(Vt, e),
            jr.forEach(t),
            Ir.forEach(t),
            n = 0;
        n < jt.length;
        n++
    )
        (r = jt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < jt.length && ((n = jt[0]), n.blockedOn === null); )
        Xc(n), n.blockedOn === null && jt.shift();
}
var Hn = Nt.ReactCurrentBatchConfig,
    Kl = !0;
function Zh(e, t, n, r) {
    var l = Y,
        o = Hn.transition;
    Hn.transition = null;
    try {
        (Y = 1), Nu(e, t, n, r);
    } finally {
        (Y = l), (Hn.transition = o);
    }
}
function qh(e, t, n, r) {
    var l = Y,
        o = Hn.transition;
    Hn.transition = null;
    try {
        (Y = 4), Nu(e, t, n, r);
    } finally {
        (Y = l), (Hn.transition = o);
    }
}
function Nu(e, t, n, r) {
    if (Kl) {
        var l = ji(e, t, n, r);
        if (l === null) ri(e, t, r, Yl, n), Ja(e, r);
        else if (Gh(l, e, t, n, r)) r.stopPropagation();
        else if ((Ja(e, r), t & 4 && -1 < Xh.indexOf(e))) {
            for (; l !== null; ) {
                var o = tl(l);
                if (
                    (o !== null && Wc(o),
                    (o = ji(e, t, n, r)),
                    o === null && ri(e, t, r, Yl, n),
                    o === l)
                )
                    break;
                l = o;
            }
            l !== null && r.stopPropagation();
        } else ri(e, t, r, null, n);
    }
}
var Yl = null;
function ji(e, t, n, r) {
    if (((Yl = null), (e = Cu(r)), (e = ln(e)), e !== null))
        if (((t = yn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = Uc(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (Yl = e), null;
}
function Gc(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (Ah()) {
                case Ru:
                    return 1;
                case Bc:
                    return 4;
                case Wl:
                case Bh:
                    return 16;
                case $c:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var At = null,
    Lu = null,
    Dl = null;
function Jc() {
    if (Dl) return Dl;
    var e,
        t = Lu,
        n = t.length,
        r,
        l = "value" in At ? At.value : At.textContent,
        o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
    return (Dl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function zl(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function vl() {
    return !0;
}
function qa() {
    return !1;
}
function Ve(e) {
    function t(n, r, l, o, i) {
        (this._reactName = n),
            (this._targetInst = l),
            (this.type = r),
            (this.nativeEvent = o),
            (this.target = i),
            (this.currentTarget = null);
        for (var u in e)
            e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
        return (
            (this.isDefaultPrevented = (
                o.defaultPrevented != null
                    ? o.defaultPrevented
                    : o.returnValue === !1
            )
                ? vl
                : qa),
            (this.isPropagationStopped = qa),
            this
        );
    }
    return (
        ie(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = vl));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = vl));
            },
            persist: function () {},
            isPersistent: vl,
        }),
        t
    );
}
var tr = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    Du = Ve(tr),
    el = ie({}, tr, { view: 0, detail: 0 }),
    bh = Ve(el),
    Xo,
    Go,
    hr,
    wo = ie({}, el, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: zu,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== hr &&
                      (hr && e.type === "mousemove"
                          ? ((Xo = e.screenX - hr.screenX),
                            (Go = e.screenY - hr.screenY))
                          : (Go = Xo = 0),
                      (hr = e)),
                  Xo);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : Go;
        },
    }),
    ba = Ve(wo),
    em = ie({}, wo, { dataTransfer: 0 }),
    tm = Ve(em),
    nm = ie({}, el, { relatedTarget: 0 }),
    Jo = Ve(nm),
    rm = ie({}, tr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    lm = Ve(rm),
    om = ie({}, tr, {
        clipboardData: function (e) {
            return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
        },
    }),
    im = Ve(om),
    um = ie({}, tr, { data: 0 }),
    es = Ve(um),
    am = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
    },
    sm = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
    },
    cm = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
    };
function fm(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = cm[e])
        ? !!t[e]
        : !1;
}
function zu() {
    return fm;
}
var dm = ie({}, el, {
        key: function (e) {
            if (e.key) {
                var t = am[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = zl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                ? sm[e.keyCode] || "Unidentified"
                : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: zu,
        charCode: function (e) {
            return e.type === "keypress" ? zl(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress"
                ? zl(e)
                : e.type === "keydown" || e.type === "keyup"
                ? e.keyCode
                : 0;
        },
    }),
    pm = Ve(dm),
    hm = ie({}, wo, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    ts = Ve(hm),
    mm = ie({}, el, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: zu,
    }),
    vm = Ve(mm),
    gm = ie({}, tr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ym = Ve(gm),
    wm = ie({}, wo, {
        deltaX: function (e) {
            return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    Sm = Ve(wm),
    km = [9, 13, 27, 32],
    Tu = Ct && "CompositionEvent" in window,
    Rr = null;
Ct && "documentMode" in document && (Rr = document.documentMode);
var xm = Ct && "TextEvent" in window && !Rr,
    Zc = Ct && (!Tu || (Rr && 8 < Rr && 11 >= Rr)),
    ns = String.fromCharCode(32),
    rs = !1;
function qc(e, t) {
    switch (e) {
        case "keyup":
            return km.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function bc(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Nn = !1;
function Em(e, t) {
    switch (e) {
        case "compositionend":
            return bc(t);
        case "keypress":
            return t.which !== 32 ? null : ((rs = !0), ns);
        case "textInput":
            return (e = t.data), e === ns && rs ? null : e;
        default:
            return null;
    }
}
function Cm(e, t) {
    if (Nn)
        return e === "compositionend" || (!Tu && qc(e, t))
            ? ((e = Jc()), (Dl = Lu = At = null), (Nn = !1), e)
            : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (
                !(t.ctrlKey || t.altKey || t.metaKey) ||
                (t.ctrlKey && t.altKey)
            ) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return Zc && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var Rm = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function ls(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Rm[e.type] : t === "textarea";
}
function ef(e, t, n, r) {
    zc(r),
        (t = Xl(t, "onChange")),
        0 < t.length &&
            ((n = new Du("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t }));
}
var Pr = null,
    Br = null;
function Pm(e) {
    df(e, 0);
}
function So(e) {
    var t = zn(e);
    if (Cc(t)) return e;
}
function _m(e, t) {
    if (e === "change") return t;
}
var tf = !1;
if (Ct) {
    var Zo;
    if (Ct) {
        var qo = "oninput" in document;
        if (!qo) {
            var os = document.createElement("div");
            os.setAttribute("oninput", "return;"),
                (qo = typeof os.oninput == "function");
        }
        Zo = qo;
    } else Zo = !1;
    tf = Zo && (!document.documentMode || 9 < document.documentMode);
}
function is() {
    Pr && (Pr.detachEvent("onpropertychange", nf), (Br = Pr = null));
}
function nf(e) {
    if (e.propertyName === "value" && So(Br)) {
        var t = [];
        ef(t, Br, e, Cu(e)), Fc(Pm, t);
    }
}
function Nm(e, t, n) {
    e === "focusin"
        ? (is(), (Pr = t), (Br = n), Pr.attachEvent("onpropertychange", nf))
        : e === "focusout" && is();
}
function Lm(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return So(Br);
}
function Dm(e, t) {
    if (e === "click") return So(t);
}
function zm(e, t) {
    if (e === "input" || e === "change") return So(t);
}
function Tm(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var it = typeof Object.is == "function" ? Object.is : Tm;
function $r(e, t) {
    if (it(e, t)) return !0;
    if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
    )
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!wi.call(t, l) || !it(e[l], t[l])) return !1;
    }
    return !0;
}
function us(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function as(e, t) {
    var n = us(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = us(n);
    }
}
function rf(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? rf(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function lf() {
    for (var e = window, t = $l(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = $l(e.document);
    }
    return t;
}
function Mu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function Mm(e) {
    var t = lf(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        rf(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && Mu(n)) {
            if (
                ((t = r.start),
                (e = r.end),
                e === void 0 && (e = t),
                "selectionStart" in n)
            )
                (n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e =
                    ((t = n.ownerDocument || document) && t.defaultView) ||
                    window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var l = n.textContent.length,
                    o = Math.min(r.start, l);
                (r = r.end === void 0 ? o : Math.min(r.end, l)),
                    !e.extend && o > r && ((l = r), (r = o), (o = l)),
                    (l = as(n, o));
                var i = as(n, r);
                l &&
                    i &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== l.node ||
                        e.anchorOffset !== l.offset ||
                        e.focusNode !== i.node ||
                        e.focusOffset !== i.offset) &&
                    ((t = t.createRange()),
                    t.setStart(l.node, l.offset),
                    e.removeAllRanges(),
                    o > r
                        ? (e.addRange(t), e.extend(i.node, i.offset))
                        : (t.setEnd(i.node, i.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
            typeof n.focus == "function" && n.focus(), n = 0;
            n < t.length;
            n++
        )
            (e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
    }
}
var Om = Ct && "documentMode" in document && 11 >= document.documentMode,
    Ln = null,
    Ii = null,
    _r = null,
    Ai = !1;
function ss(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ai ||
        Ln == null ||
        Ln !== $l(r) ||
        ((r = Ln),
        "selectionStart" in r && Mu(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
              ).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
              })),
        (_r && $r(_r, r)) ||
            ((_r = r),
            (r = Xl(Ii, "onSelect")),
            0 < r.length &&
                ((t = new Du("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = Ln))));
}
function gl(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var Dn = {
        animationend: gl("Animation", "AnimationEnd"),
        animationiteration: gl("Animation", "AnimationIteration"),
        animationstart: gl("Animation", "AnimationStart"),
        transitionend: gl("Transition", "TransitionEnd"),
    },
    bo = {},
    of = {};
Ct &&
    ((of = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete Dn.animationend.animation,
        delete Dn.animationiteration.animation,
        delete Dn.animationstart.animation),
    "TransitionEvent" in window || delete Dn.transitionend.transition);
function ko(e) {
    if (bo[e]) return bo[e];
    if (!Dn[e]) return e;
    var t = Dn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in of) return (bo[e] = t[n]);
    return e;
}
var uf = ko("animationend"),
    af = ko("animationiteration"),
    sf = ko("animationstart"),
    cf = ko("transitionend"),
    ff = new Map(),
    cs =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " "
        );
function qt(e, t) {
    ff.set(e, t), gn(t, [e]);
}
for (var ei = 0; ei < cs.length; ei++) {
    var ti = cs[ei],
        Fm = ti.toLowerCase(),
        Um = ti[0].toUpperCase() + ti.slice(1);
    qt(Fm, "on" + Um);
}
qt(uf, "onAnimationEnd");
qt(af, "onAnimationIteration");
qt(sf, "onAnimationStart");
qt("dblclick", "onDoubleClick");
qt("focusin", "onFocus");
qt("focusout", "onBlur");
qt(cf, "onTransitionEnd");
Qn("onMouseEnter", ["mouseout", "mouseover"]);
Qn("onMouseLeave", ["mouseout", "mouseover"]);
Qn("onPointerEnter", ["pointerout", "pointerover"]);
Qn("onPointerLeave", ["pointerout", "pointerover"]);
gn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " "
    )
);
gn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
    )
);
gn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
gn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
gn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
gn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var kr =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " "
        ),
    jm = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(kr)
    );
function fs(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), Fh(r, t, void 0, e), (e.currentTarget = null);
}
function df(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            l = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var u = r[i],
                        a = u.instance,
                        s = u.currentTarget;
                    if (((u = u.listener), a !== o && l.isPropagationStopped()))
                        break e;
                    fs(l, u, s), (o = a);
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (
                        ((u = r[i]),
                        (a = u.instance),
                        (s = u.currentTarget),
                        (u = u.listener),
                        a !== o && l.isPropagationStopped())
                    )
                        break e;
                    fs(l, u, s), (o = a);
                }
        }
    }
    if (Vl) throw ((e = Oi), (Vl = !1), (Oi = null), e);
}
function Z(e, t) {
    var n = t[Wi];
    n === void 0 && (n = t[Wi] = new Set());
    var r = e + "__bubble";
    n.has(r) || (pf(t, e, 2, !1), n.add(r));
}
function ni(e, t, n) {
    var r = 0;
    t && (r |= 4), pf(n, e, r, t);
}
var yl = "_reactListening" + Math.random().toString(36).slice(2);
function Hr(e) {
    if (!e[yl]) {
        (e[yl] = !0),
            wc.forEach(function (n) {
                n !== "selectionchange" &&
                    (jm.has(n) || ni(n, !1, e), ni(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[yl] || ((t[yl] = !0), ni("selectionchange", !1, t));
    }
}
function pf(e, t, n, r) {
    switch (Gc(t)) {
        case 1:
            var l = Zh;
            break;
        case 4:
            l = qh;
            break;
        default:
            l = Nu;
    }
    (n = l.bind(null, t, n, e)),
        (l = void 0),
        !Mi ||
            (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
            (l = !0),
        r
            ? l !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: l })
                : e.addEventListener(t, n, !0)
            : l !== void 0
            ? e.addEventListener(t, n, { passive: l })
            : e.addEventListener(t, n, !1);
}
function ri(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
        e: for (;;) {
            if (r === null) return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
                if (i === 4)
                    for (i = r.return; i !== null; ) {
                        var a = i.tag;
                        if (
                            (a === 3 || a === 4) &&
                            ((a = i.stateNode.containerInfo),
                            a === l || (a.nodeType === 8 && a.parentNode === l))
                        )
                            return;
                        i = i.return;
                    }
                for (; u !== null; ) {
                    if (((i = ln(u)), i === null)) return;
                    if (((a = i.tag), a === 5 || a === 6)) {
                        r = o = i;
                        continue e;
                    }
                    u = u.parentNode;
                }
            }
            r = r.return;
        }
    Fc(function () {
        var s = o,
            p = Cu(n),
            v = [];
        e: {
            var m = ff.get(e);
            if (m !== void 0) {
                var k = Du,
                    w = e;
                switch (e) {
                    case "keypress":
                        if (zl(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        k = pm;
                        break;
                    case "focusin":
                        (w = "focus"), (k = Jo);
                        break;
                    case "focusout":
                        (w = "blur"), (k = Jo);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        k = Jo;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        k = ba;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        k = tm;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        k = vm;
                        break;
                    case uf:
                    case af:
                    case sf:
                        k = lm;
                        break;
                    case cf:
                        k = ym;
                        break;
                    case "scroll":
                        k = bh;
                        break;
                    case "wheel":
                        k = Sm;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        k = im;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        k = ts;
                }
                var S = (t & 4) !== 0,
                    _ = !S && e === "scroll",
                    d = S ? (m !== null ? m + "Capture" : null) : m;
                S = [];
                for (var c = s, h; c !== null; ) {
                    h = c;
                    var f = h.stateNode;
                    if (
                        (h.tag === 5 &&
                            f !== null &&
                            ((h = f),
                            d !== null &&
                                ((f = Ur(c, d)),
                                f != null && S.push(Vr(c, f, h)))),
                        _)
                    )
                        break;
                    c = c.return;
                }
                0 < S.length &&
                    ((m = new k(m, w, null, n, p)),
                    v.push({ event: m, listeners: S }));
            }
        }
        if ((t & 7) === 0) {
            e: {
                if (
                    ((m = e === "mouseover" || e === "pointerover"),
                    (k = e === "mouseout" || e === "pointerout"),
                    m &&
                        n !== zi &&
                        (w = n.relatedTarget || n.fromElement) &&
                        (ln(w) || w[Rt]))
                )
                    break e;
                if (
                    (k || m) &&
                    ((m =
                        p.window === p
                            ? p
                            : (m = p.ownerDocument)
                            ? m.defaultView || m.parentWindow
                            : window),
                    k
                        ? ((w = n.relatedTarget || n.toElement),
                          (k = s),
                          (w = w ? ln(w) : null),
                          w !== null &&
                              ((_ = yn(w)),
                              w !== _ || (w.tag !== 5 && w.tag !== 6)) &&
                              (w = null))
                        : ((k = null), (w = s)),
                    k !== w)
                ) {
                    if (
                        ((S = ba),
                        (f = "onMouseLeave"),
                        (d = "onMouseEnter"),
                        (c = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((S = ts),
                            (f = "onPointerLeave"),
                            (d = "onPointerEnter"),
                            (c = "pointer")),
                        (_ = k == null ? m : zn(k)),
                        (h = w == null ? m : zn(w)),
                        (m = new S(f, c + "leave", k, n, p)),
                        (m.target = _),
                        (m.relatedTarget = h),
                        (f = null),
                        ln(p) === s &&
                            ((S = new S(d, c + "enter", w, n, p)),
                            (S.target = h),
                            (S.relatedTarget = _),
                            (f = S)),
                        (_ = f),
                        k && w)
                    )
                        t: {
                            for (S = k, d = w, c = 0, h = S; h; h = En(h)) c++;
                            for (h = 0, f = d; f; f = En(f)) h++;
                            for (; 0 < c - h; ) (S = En(S)), c--;
                            for (; 0 < h - c; ) (d = En(d)), h--;
                            for (; c--; ) {
                                if (
                                    S === d ||
                                    (d !== null && S === d.alternate)
                                )
                                    break t;
                                (S = En(S)), (d = En(d));
                            }
                            S = null;
                        }
                    else S = null;
                    k !== null && ds(v, m, k, S, !1),
                        w !== null && _ !== null && ds(v, _, w, S, !0);
                }
            }
            e: {
                if (
                    ((m = s ? zn(s) : window),
                    (k = m.nodeName && m.nodeName.toLowerCase()),
                    k === "select" || (k === "input" && m.type === "file"))
                )
                    var E = _m;
                else if (ls(m))
                    if (tf) E = zm;
                    else {
                        E = Lm;
                        var P = Nm;
                    }
                else
                    (k = m.nodeName) &&
                        k.toLowerCase() === "input" &&
                        (m.type === "checkbox" || m.type === "radio") &&
                        (E = Dm);
                if (E && (E = E(e, s))) {
                    ef(v, E, n, p);
                    break e;
                }
                P && P(e, m, s),
                    e === "focusout" &&
                        (P = m._wrapperState) &&
                        P.controlled &&
                        m.type === "number" &&
                        Pi(m, "number", m.value);
            }
            switch (((P = s ? zn(s) : window), e)) {
                case "focusin":
                    (ls(P) || P.contentEditable === "true") &&
                        ((Ln = P), (Ii = s), (_r = null));
                    break;
                case "focusout":
                    _r = Ii = Ln = null;
                    break;
                case "mousedown":
                    Ai = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (Ai = !1), ss(v, n, p);
                    break;
                case "selectionchange":
                    if (Om) break;
                case "keydown":
                case "keyup":
                    ss(v, n, p);
            }
            var R;
            if (Tu)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var D = "onCompositionStart";
                            break e;
                        case "compositionend":
                            D = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            D = "onCompositionUpdate";
                            break e;
                    }
                    D = void 0;
                }
            else
                Nn
                    ? qc(e, n) && (D = "onCompositionEnd")
                    : e === "keydown" &&
                      n.keyCode === 229 &&
                      (D = "onCompositionStart");
            D &&
                (Zc &&
                    n.locale !== "ko" &&
                    (Nn || D !== "onCompositionStart"
                        ? D === "onCompositionEnd" && Nn && (R = Jc())
                        : ((At = p),
                          (Lu = "value" in At ? At.value : At.textContent),
                          (Nn = !0))),
                (P = Xl(s, D)),
                0 < P.length &&
                    ((D = new es(D, e, null, n, p)),
                    v.push({ event: D, listeners: P }),
                    R
                        ? (D.data = R)
                        : ((R = bc(n)), R !== null && (D.data = R)))),
                (R = xm ? Em(e, n) : Cm(e, n)) &&
                    ((s = Xl(s, "onBeforeInput")),
                    0 < s.length &&
                        ((p = new es(
                            "onBeforeInput",
                            "beforeinput",
                            null,
                            n,
                            p
                        )),
                        v.push({ event: p, listeners: s }),
                        (p.data = R)));
        }
        df(v, t);
    });
}
function Vr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function Xl(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e,
            o = l.stateNode;
        l.tag === 5 &&
            o !== null &&
            ((l = o),
            (o = Ur(e, n)),
            o != null && r.unshift(Vr(e, o, l)),
            (o = Ur(e, t)),
            o != null && r.push(Vr(e, o, l))),
            (e = e.return);
    }
    return r;
}
function En(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function ds(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
        var u = n,
            a = u.alternate,
            s = u.stateNode;
        if (a !== null && a === r) break;
        u.tag === 5 &&
            s !== null &&
            ((u = s),
            l
                ? ((a = Ur(n, o)), a != null && i.unshift(Vr(n, a, u)))
                : l || ((a = Ur(n, o)), a != null && i.push(Vr(n, a, u)))),
            (n = n.return);
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
}
var Im = /\r\n?/g,
    Am = /\u0000|\uFFFD/g;
function ps(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            Im,
            `
`
        )
        .replace(Am, "");
}
function wl(e, t, n) {
    if (((t = ps(t)), ps(e) !== t && n)) throw Error(C(425));
}
function Gl() {}
var Bi = null,
    $i = null;
function Hi(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var Vi = typeof setTimeout == "function" ? setTimeout : void 0,
    Bm = typeof clearTimeout == "function" ? clearTimeout : void 0,
    hs = typeof Promise == "function" ? Promise : void 0,
    $m =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof hs < "u"
            ? function (e) {
                  return hs.resolve(null).then(e).catch(Hm);
              }
            : Vi;
function Hm(e) {
    setTimeout(function () {
        throw e;
    });
}
function li(e, t) {
    var n = t,
        r = 0;
    do {
        var l = n.nextSibling;
        if ((e.removeChild(n), l && l.nodeType === 8))
            if (((n = l.data), n === "/$")) {
                if (r === 0) {
                    e.removeChild(l), Ar(t);
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = l;
    } while (n);
    Ar(t);
}
function Wt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function ms(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var nr = Math.random().toString(36).slice(2),
    dt = "__reactFiber$" + nr,
    Wr = "__reactProps$" + nr,
    Rt = "__reactContainer$" + nr,
    Wi = "__reactEvents$" + nr,
    Vm = "__reactListeners$" + nr,
    Wm = "__reactHandles$" + nr;
function ln(e) {
    var t = e[dt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[Rt] || n[dt])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = ms(e); e !== null; ) {
                    if ((n = e[dt])) return n;
                    e = ms(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function tl(e) {
    return (
        (e = e[dt] || e[Rt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function zn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(C(33));
}
function xo(e) {
    return e[Wr] || null;
}
var Qi = [],
    Tn = -1;
function bt(e) {
    return { current: e };
}
function q(e) {
    0 > Tn || ((e.current = Qi[Tn]), (Qi[Tn] = null), Tn--);
}
function J(e, t) {
    Tn++, (Qi[Tn] = e.current), (e.current = t);
}
var Jt = {},
    Pe = bt(Jt),
    Oe = bt(!1),
    dn = Jt;
function Kn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Jt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
        o;
    for (o in n) l[o] = t[o];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = l)),
        l
    );
}
function Fe(e) {
    return (e = e.childContextTypes), e != null;
}
function Jl() {
    q(Oe), q(Pe);
}
function vs(e, t, n) {
    if (Pe.current !== Jt) throw Error(C(168));
    J(Pe, t), J(Oe, n);
}
function hf(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(C(108, Nh(e) || "Unknown", l));
    return ie({}, n, r);
}
function Zl(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            Jt),
        (dn = Pe.current),
        J(Pe, e),
        J(Oe, Oe.current),
        !0
    );
}
function gs(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(C(169));
    n
        ? ((e = hf(e, t, dn)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          q(Oe),
          q(Pe),
          J(Pe, e))
        : q(Oe),
        J(Oe, n);
}
var wt = null,
    Eo = !1,
    oi = !1;
function mf(e) {
    wt === null ? (wt = [e]) : wt.push(e);
}
function Qm(e) {
    (Eo = !0), mf(e);
}
function en() {
    if (!oi && wt !== null) {
        oi = !0;
        var e = 0,
            t = Y;
        try {
            var n = wt;
            for (Y = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (wt = null), (Eo = !1);
        } catch (l) {
            throw (wt !== null && (wt = wt.slice(e + 1)), Ac(Ru, en), l);
        } finally {
            (Y = t), (oi = !1);
        }
    }
    return null;
}
var Mn = [],
    On = 0,
    ql = null,
    bl = 0,
    Ke = [],
    Ye = 0,
    pn = null,
    St = 1,
    kt = "";
function tn(e, t) {
    (Mn[On++] = bl), (Mn[On++] = ql), (ql = e), (bl = t);
}
function vf(e, t, n) {
    (Ke[Ye++] = St), (Ke[Ye++] = kt), (Ke[Ye++] = pn), (pn = e);
    var r = St;
    e = kt;
    var l = 32 - lt(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var o = 32 - lt(t) + l;
    if (30 < o) {
        var i = l - (l % 5);
        (o = (r & ((1 << i) - 1)).toString(32)),
            (r >>= i),
            (l -= i),
            (St = (1 << (32 - lt(t) + l)) | (n << l) | r),
            (kt = o + e);
    } else (St = (1 << o) | (n << l) | r), (kt = e);
}
function Ou(e) {
    e.return !== null && (tn(e, 1), vf(e, 1, 0));
}
function Fu(e) {
    for (; e === ql; )
        (ql = Mn[--On]), (Mn[On] = null), (bl = Mn[--On]), (Mn[On] = null);
    for (; e === pn; )
        (pn = Ke[--Ye]),
            (Ke[Ye] = null),
            (kt = Ke[--Ye]),
            (Ke[Ye] = null),
            (St = Ke[--Ye]),
            (Ke[Ye] = null);
}
var Be = null,
    Ae = null,
    ne = !1,
    rt = null;
function gf(e, t) {
    var n = Xe(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function ys(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (Be = e), (Ae = Wt(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Be = e), (Ae = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = pn !== null ? { id: St, overflow: kt } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824,
                      }),
                      (n = Xe(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Be = e),
                      (Ae = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function Ki(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Yi(e) {
    if (ne) {
        var t = Ae;
        if (t) {
            var n = t;
            if (!ys(e, t)) {
                if (Ki(e)) throw Error(C(418));
                t = Wt(n.nextSibling);
                var r = Be;
                t && ys(e, t)
                    ? gf(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (ne = !1), (Be = e));
            }
        } else {
            if (Ki(e)) throw Error(C(418));
            (e.flags = (e.flags & -4097) | 2), (ne = !1), (Be = e);
        }
    }
}
function ws(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    Be = e;
}
function Sl(e) {
    if (e !== Be) return !1;
    if (!ne) return ws(e), (ne = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== "head" && t !== "body" && !Hi(e.type, e.memoizedProps))),
        t && (t = Ae))
    ) {
        if (Ki(e)) throw (yf(), Error(C(418)));
        for (; t; ) gf(e, t), (t = Wt(t.nextSibling));
    }
    if ((ws(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(C(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Ae = Wt(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            Ae = null;
        }
    } else Ae = Be ? Wt(e.stateNode.nextSibling) : null;
    return !0;
}
function yf() {
    for (var e = Ae; e; ) e = Wt(e.nextSibling);
}
function Yn() {
    (Ae = Be = null), (ne = !1);
}
function Uu(e) {
    rt === null ? (rt = [e]) : rt.push(e);
}
var Km = Nt.ReactCurrentBatchConfig;
function et(e, t) {
    if (e && e.defaultProps) {
        (t = ie({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var eo = bt(null),
    to = null,
    Fn = null,
    ju = null;
function Iu() {
    ju = Fn = to = null;
}
function Au(e) {
    var t = eo.current;
    q(eo), (e._currentValue = t);
}
function Xi(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function Vn(e, t) {
    (to = e),
        (ju = Fn = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            ((e.lanes & t) !== 0 && (Me = !0), (e.firstContext = null));
}
function Je(e) {
    var t = e._currentValue;
    if (ju !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), Fn === null)) {
            if (to === null) throw Error(C(308));
            (Fn = e), (to.dependencies = { lanes: 0, firstContext: e });
        } else Fn = Fn.next = e;
    return t;
}
var on = null;
function Bu(e) {
    on === null ? (on = [e]) : on.push(e);
}
function wf(e, t, n, r) {
    var l = t.interleaved;
    return (
        l === null ? ((n.next = n), Bu(t)) : ((n.next = l.next), (l.next = n)),
        (t.interleaved = n),
        Pt(e, r)
    );
}
function Pt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var Ut = !1;
function $u(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function Sf(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            });
}
function Et(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
    };
}
function Qt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (Q & 2) !== 0)) {
        var l = r.pending;
        return (
            l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
            (r.pending = t),
            Pt(e, n)
        );
    }
    return (
        (l = r.interleaved),
        l === null ? ((t.next = t), Bu(r)) : ((t.next = l.next), (l.next = t)),
        (r.interleaved = t),
        Pt(e, n)
    );
}
function Tl(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Pu(e, n);
    }
}
function Ss(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var l = null,
            o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
            } while (n !== null);
            o === null ? (l = o = t) : (o = o.next = t);
        } else l = o = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects,
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function no(e, t, n, r) {
    var l = e.updateQueue;
    Ut = !1;
    var o = l.firstBaseUpdate,
        i = l.lastBaseUpdate,
        u = l.shared.pending;
    if (u !== null) {
        l.shared.pending = null;
        var a = u,
            s = a.next;
        (a.next = null), i === null ? (o = s) : (i.next = s), (i = a);
        var p = e.alternate;
        p !== null &&
            ((p = p.updateQueue),
            (u = p.lastBaseUpdate),
            u !== i &&
                (u === null ? (p.firstBaseUpdate = s) : (u.next = s),
                (p.lastBaseUpdate = a)));
    }
    if (o !== null) {
        var v = l.baseState;
        (i = 0), (p = s = a = null), (u = o);
        do {
            var m = u.lane,
                k = u.eventTime;
            if ((r & m) === m) {
                p !== null &&
                    (p = p.next =
                        {
                            eventTime: k,
                            lane: 0,
                            tag: u.tag,
                            payload: u.payload,
                            callback: u.callback,
                            next: null,
                        });
                e: {
                    var w = e,
                        S = u;
                    switch (((m = t), (k = n), S.tag)) {
                        case 1:
                            if (((w = S.payload), typeof w == "function")) {
                                v = w.call(k, v, m);
                                break e;
                            }
                            v = w;
                            break e;
                        case 3:
                            w.flags = (w.flags & -65537) | 128;
                        case 0:
                            if (
                                ((w = S.payload),
                                (m =
                                    typeof w == "function"
                                        ? w.call(k, v, m)
                                        : w),
                                m == null)
                            )
                                break e;
                            v = ie({}, v, m);
                            break e;
                        case 2:
                            Ut = !0;
                    }
                }
                u.callback !== null &&
                    u.lane !== 0 &&
                    ((e.flags |= 64),
                    (m = l.effects),
                    m === null ? (l.effects = [u]) : m.push(u));
            } else
                (k = {
                    eventTime: k,
                    lane: m,
                    tag: u.tag,
                    payload: u.payload,
                    callback: u.callback,
                    next: null,
                }),
                    p === null ? ((s = p = k), (a = v)) : (p = p.next = k),
                    (i |= m);
            if (((u = u.next), u === null)) {
                if (((u = l.shared.pending), u === null)) break;
                (m = u),
                    (u = m.next),
                    (m.next = null),
                    (l.lastBaseUpdate = m),
                    (l.shared.pending = null);
            }
        } while (1);
        if (
            (p === null && (a = v),
            (l.baseState = a),
            (l.firstBaseUpdate = s),
            (l.lastBaseUpdate = p),
            (t = l.shared.interleaved),
            t !== null)
        ) {
            l = t;
            do (i |= l.lane), (l = l.next);
            while (l !== t);
        } else o === null && (l.shared.lanes = 0);
        (mn |= i), (e.lanes = i), (e.memoizedState = v);
    }
}
function ks(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                l = r.callback;
            if (l !== null) {
                if (((r.callback = null), (r = n), typeof l != "function"))
                    throw Error(C(191, l));
                l.call(r);
            }
        }
}
var kf = new yc.Component().refs;
function Gi(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : ie({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Co = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? yn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Ne(),
            l = Yt(e),
            o = Et(r, l);
        (o.payload = t),
            n != null && (o.callback = n),
            (t = Qt(e, o, l)),
            t !== null && (ot(t, e, l, r), Tl(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Ne(),
            l = Yt(e),
            o = Et(r, l);
        (o.tag = 1),
            (o.payload = t),
            n != null && (o.callback = n),
            (t = Qt(e, o, l)),
            t !== null && (ot(t, e, l, r), Tl(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Ne(),
            r = Yt(e),
            l = Et(n, r);
        (l.tag = 2),
            t != null && (l.callback = t),
            (t = Qt(e, l, r)),
            t !== null && (ot(t, e, r, n), Tl(t, e, r));
    },
};
function xs(e, t, n, r, l, o, i) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, o, i)
            : t.prototype && t.prototype.isPureReactComponent
            ? !$r(n, r) || !$r(l, o)
            : !0
    );
}
function xf(e, t, n) {
    var r = !1,
        l = Jt,
        o = t.contextType;
    return (
        typeof o == "object" && o !== null
            ? (o = Je(o))
            : ((l = Fe(t) ? dn : Pe.current),
              (r = t.contextTypes),
              (o = (r = r != null) ? Kn(e, l) : Jt)),
        (t = new t(n, o)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Co),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = l),
            (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
    );
}
function Es(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Co.enqueueReplaceState(t, t.state, null);
}
function Ji(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = kf), $u(e);
    var o = t.contextType;
    typeof o == "object" && o !== null
        ? (l.context = Je(o))
        : ((o = Fe(t) ? dn : Pe.current), (l.context = Kn(e, o))),
        (l.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (Gi(e, t, o, n), (l.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof l.getSnapshotBeforeUpdate == "function" ||
            (typeof l.UNSAFE_componentWillMount != "function" &&
                typeof l.componentWillMount != "function") ||
            ((t = l.state),
            typeof l.componentWillMount == "function" && l.componentWillMount(),
            typeof l.UNSAFE_componentWillMount == "function" &&
                l.UNSAFE_componentWillMount(),
            t !== l.state && Co.enqueueReplaceState(l, l.state, null),
            no(e, n, l, r),
            (l.state = e.memoizedState)),
        typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function mr(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(C(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(C(147, e));
            var l = r,
                o = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (i) {
                      var u = l.refs;
                      u === kf && (u = l.refs = {}),
                          i === null ? delete u[o] : (u[o] = i);
                  }),
                  (t._stringRef = o),
                  t);
        }
        if (typeof e != "string") throw Error(C(284));
        if (!n._owner) throw Error(C(290, e));
    }
    return e;
}
function kl(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            C(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e
            )
        ))
    );
}
function Cs(e) {
    var t = e._init;
    return t(e._payload);
}
function Ef(e) {
    function t(d, c) {
        if (e) {
            var h = d.deletions;
            h === null ? ((d.deletions = [c]), (d.flags |= 16)) : h.push(c);
        }
    }
    function n(d, c) {
        if (!e) return null;
        for (; c !== null; ) t(d, c), (c = c.sibling);
        return null;
    }
    function r(d, c) {
        for (d = new Map(); c !== null; )
            c.key !== null ? d.set(c.key, c) : d.set(c.index, c),
                (c = c.sibling);
        return d;
    }
    function l(d, c) {
        return (d = Xt(d, c)), (d.index = 0), (d.sibling = null), d;
    }
    function o(d, c, h) {
        return (
            (d.index = h),
            e
                ? ((h = d.alternate),
                  h !== null
                      ? ((h = h.index), h < c ? ((d.flags |= 2), c) : h)
                      : ((d.flags |= 2), c))
                : ((d.flags |= 1048576), c)
        );
    }
    function i(d) {
        return e && d.alternate === null && (d.flags |= 2), d;
    }
    function u(d, c, h, f) {
        return c === null || c.tag !== 6
            ? ((c = di(h, d.mode, f)), (c.return = d), c)
            : ((c = l(c, h)), (c.return = d), c);
    }
    function a(d, c, h, f) {
        var E = h.type;
        return E === _n
            ? p(d, c, h.props.children, f, h.key)
            : c !== null &&
              (c.elementType === E ||
                  (typeof E == "object" &&
                      E !== null &&
                      E.$$typeof === Ft &&
                      Cs(E) === c.type))
            ? ((f = l(c, h.props)), (f.ref = mr(d, c, h)), (f.return = d), f)
            : ((f = Il(h.type, h.key, h.props, null, d.mode, f)),
              (f.ref = mr(d, c, h)),
              (f.return = d),
              f);
    }
    function s(d, c, h, f) {
        return c === null ||
            c.tag !== 4 ||
            c.stateNode.containerInfo !== h.containerInfo ||
            c.stateNode.implementation !== h.implementation
            ? ((c = pi(h, d.mode, f)), (c.return = d), c)
            : ((c = l(c, h.children || [])), (c.return = d), c);
    }
    function p(d, c, h, f, E) {
        return c === null || c.tag !== 7
            ? ((c = sn(h, d.mode, f, E)), (c.return = d), c)
            : ((c = l(c, h)), (c.return = d), c);
    }
    function v(d, c, h) {
        if ((typeof c == "string" && c !== "") || typeof c == "number")
            return (c = di("" + c, d.mode, h)), (c.return = d), c;
        if (typeof c == "object" && c !== null) {
            switch (c.$$typeof) {
                case cl:
                    return (
                        (h = Il(c.type, c.key, c.props, null, d.mode, h)),
                        (h.ref = mr(d, null, c)),
                        (h.return = d),
                        h
                    );
                case Pn:
                    return (c = pi(c, d.mode, h)), (c.return = d), c;
                case Ft:
                    var f = c._init;
                    return v(d, f(c._payload), h);
            }
            if (wr(c) || cr(c))
                return (c = sn(c, d.mode, h, null)), (c.return = d), c;
            kl(d, c);
        }
        return null;
    }
    function m(d, c, h, f) {
        var E = c !== null ? c.key : null;
        if ((typeof h == "string" && h !== "") || typeof h == "number")
            return E !== null ? null : u(d, c, "" + h, f);
        if (typeof h == "object" && h !== null) {
            switch (h.$$typeof) {
                case cl:
                    return h.key === E ? a(d, c, h, f) : null;
                case Pn:
                    return h.key === E ? s(d, c, h, f) : null;
                case Ft:
                    return (E = h._init), m(d, c, E(h._payload), f);
            }
            if (wr(h) || cr(h)) return E !== null ? null : p(d, c, h, f, null);
            kl(d, h);
        }
        return null;
    }
    function k(d, c, h, f, E) {
        if ((typeof f == "string" && f !== "") || typeof f == "number")
            return (d = d.get(h) || null), u(c, d, "" + f, E);
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
                case cl:
                    return (
                        (d = d.get(f.key === null ? h : f.key) || null),
                        a(c, d, f, E)
                    );
                case Pn:
                    return (
                        (d = d.get(f.key === null ? h : f.key) || null),
                        s(c, d, f, E)
                    );
                case Ft:
                    var P = f._init;
                    return k(d, c, h, P(f._payload), E);
            }
            if (wr(f) || cr(f))
                return (d = d.get(h) || null), p(c, d, f, E, null);
            kl(c, f);
        }
        return null;
    }
    function w(d, c, h, f) {
        for (
            var E = null, P = null, R = c, D = (c = 0), W = null;
            R !== null && D < h.length;
            D++
        ) {
            R.index > D ? ((W = R), (R = null)) : (W = R.sibling);
            var I = m(d, R, h[D], f);
            if (I === null) {
                R === null && (R = W);
                break;
            }
            e && R && I.alternate === null && t(d, R),
                (c = o(I, c, D)),
                P === null ? (E = I) : (P.sibling = I),
                (P = I),
                (R = W);
        }
        if (D === h.length) return n(d, R), ne && tn(d, D), E;
        if (R === null) {
            for (; D < h.length; D++)
                (R = v(d, h[D], f)),
                    R !== null &&
                        ((c = o(R, c, D)),
                        P === null ? (E = R) : (P.sibling = R),
                        (P = R));
            return ne && tn(d, D), E;
        }
        for (R = r(d, R); D < h.length; D++)
            (W = k(R, d, D, h[D], f)),
                W !== null &&
                    (e &&
                        W.alternate !== null &&
                        R.delete(W.key === null ? D : W.key),
                    (c = o(W, c, D)),
                    P === null ? (E = W) : (P.sibling = W),
                    (P = W));
        return (
            e &&
                R.forEach(function (ye) {
                    return t(d, ye);
                }),
            ne && tn(d, D),
            E
        );
    }
    function S(d, c, h, f) {
        var E = cr(h);
        if (typeof E != "function") throw Error(C(150));
        if (((h = E.call(h)), h == null)) throw Error(C(151));
        for (
            var P = (E = null), R = c, D = (c = 0), W = null, I = h.next();
            R !== null && !I.done;
            D++, I = h.next()
        ) {
            R.index > D ? ((W = R), (R = null)) : (W = R.sibling);
            var ye = m(d, R, I.value, f);
            if (ye === null) {
                R === null && (R = W);
                break;
            }
            e && R && ye.alternate === null && t(d, R),
                (c = o(ye, c, D)),
                P === null ? (E = ye) : (P.sibling = ye),
                (P = ye),
                (R = W);
        }
        if (I.done) return n(d, R), ne && tn(d, D), E;
        if (R === null) {
            for (; !I.done; D++, I = h.next())
                (I = v(d, I.value, f)),
                    I !== null &&
                        ((c = o(I, c, D)),
                        P === null ? (E = I) : (P.sibling = I),
                        (P = I));
            return ne && tn(d, D), E;
        }
        for (R = r(d, R); !I.done; D++, I = h.next())
            (I = k(R, d, D, I.value, f)),
                I !== null &&
                    (e &&
                        I.alternate !== null &&
                        R.delete(I.key === null ? D : I.key),
                    (c = o(I, c, D)),
                    P === null ? (E = I) : (P.sibling = I),
                    (P = I));
        return (
            e &&
                R.forEach(function (X) {
                    return t(d, X);
                }),
            ne && tn(d, D),
            E
        );
    }
    function _(d, c, h, f) {
        if (
            (typeof h == "object" &&
                h !== null &&
                h.type === _n &&
                h.key === null &&
                (h = h.props.children),
            typeof h == "object" && h !== null)
        ) {
            switch (h.$$typeof) {
                case cl:
                    e: {
                        for (var E = h.key, P = c; P !== null; ) {
                            if (P.key === E) {
                                if (((E = h.type), E === _n)) {
                                    if (P.tag === 7) {
                                        n(d, P.sibling),
                                            (c = l(P, h.props.children)),
                                            (c.return = d),
                                            (d = c);
                                        break e;
                                    }
                                } else if (
                                    P.elementType === E ||
                                    (typeof E == "object" &&
                                        E !== null &&
                                        E.$$typeof === Ft &&
                                        Cs(E) === P.type)
                                ) {
                                    n(d, P.sibling),
                                        (c = l(P, h.props)),
                                        (c.ref = mr(d, P, h)),
                                        (c.return = d),
                                        (d = c);
                                    break e;
                                }
                                n(d, P);
                                break;
                            } else t(d, P);
                            P = P.sibling;
                        }
                        h.type === _n
                            ? ((c = sn(h.props.children, d.mode, f, h.key)),
                              (c.return = d),
                              (d = c))
                            : ((f = Il(
                                  h.type,
                                  h.key,
                                  h.props,
                                  null,
                                  d.mode,
                                  f
                              )),
                              (f.ref = mr(d, c, h)),
                              (f.return = d),
                              (d = f));
                    }
                    return i(d);
                case Pn:
                    e: {
                        for (P = h.key; c !== null; ) {
                            if (c.key === P)
                                if (
                                    c.tag === 4 &&
                                    c.stateNode.containerInfo ===
                                        h.containerInfo &&
                                    c.stateNode.implementation ===
                                        h.implementation
                                ) {
                                    n(d, c.sibling),
                                        (c = l(c, h.children || [])),
                                        (c.return = d),
                                        (d = c);
                                    break e;
                                } else {
                                    n(d, c);
                                    break;
                                }
                            else t(d, c);
                            c = c.sibling;
                        }
                        (c = pi(h, d.mode, f)), (c.return = d), (d = c);
                    }
                    return i(d);
                case Ft:
                    return (P = h._init), _(d, c, P(h._payload), f);
            }
            if (wr(h)) return w(d, c, h, f);
            if (cr(h)) return S(d, c, h, f);
            kl(d, h);
        }
        return (typeof h == "string" && h !== "") || typeof h == "number"
            ? ((h = "" + h),
              c !== null && c.tag === 6
                  ? (n(d, c.sibling), (c = l(c, h)), (c.return = d), (d = c))
                  : (n(d, c), (c = di(h, d.mode, f)), (c.return = d), (d = c)),
              i(d))
            : n(d, c);
    }
    return _;
}
var Xn = Ef(!0),
    Cf = Ef(!1),
    nl = {},
    ht = bt(nl),
    Qr = bt(nl),
    Kr = bt(nl);
function un(e) {
    if (e === nl) throw Error(C(174));
    return e;
}
function Hu(e, t) {
    switch ((J(Kr, t), J(Qr, e), J(ht, nl), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Ni(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = Ni(t, e));
    }
    q(ht), J(ht, t);
}
function Gn() {
    q(ht), q(Qr), q(Kr);
}
function Rf(e) {
    un(Kr.current);
    var t = un(ht.current),
        n = Ni(t, e.type);
    t !== n && (J(Qr, e), J(ht, n));
}
function Vu(e) {
    Qr.current === e && (q(ht), q(Qr));
}
var le = bt(0);
function ro(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated),
                n === null || n.data === "$?" || n.data === "$!")
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var ii = [];
function Wu() {
    for (var e = 0; e < ii.length; e++)
        ii[e]._workInProgressVersionPrimary = null;
    ii.length = 0;
}
var Ml = Nt.ReactCurrentDispatcher,
    ui = Nt.ReactCurrentBatchConfig,
    hn = 0,
    oe = null,
    pe = null,
    ve = null,
    lo = !1,
    Nr = !1,
    Yr = 0,
    Ym = 0;
function Ee() {
    throw Error(C(321));
}
function Qu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!it(e[n], t[n])) return !1;
    return !0;
}
function Ku(e, t, n, r, l, o) {
    if (
        ((hn = o),
        (oe = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Ml.current = e === null || e.memoizedState === null ? Zm : qm),
        (e = n(r, l)),
        Nr)
    ) {
        o = 0;
        do {
            if (((Nr = !1), (Yr = 0), 25 <= o)) throw Error(C(301));
            (o += 1),
                (ve = pe = null),
                (t.updateQueue = null),
                (Ml.current = bm),
                (e = n(r, l));
        } while (Nr);
    }
    if (
        ((Ml.current = oo),
        (t = pe !== null && pe.next !== null),
        (hn = 0),
        (ve = pe = oe = null),
        (lo = !1),
        t)
    )
        throw Error(C(300));
    return e;
}
function Yu() {
    var e = Yr !== 0;
    return (Yr = 0), e;
}
function ft() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    return ve === null ? (oe.memoizedState = ve = e) : (ve = ve.next = e), ve;
}
function Ze() {
    if (pe === null) {
        var e = oe.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = pe.next;
    var t = ve === null ? oe.memoizedState : ve.next;
    if (t !== null) (ve = t), (pe = e);
    else {
        if (e === null) throw Error(C(310));
        (pe = e),
            (e = {
                memoizedState: pe.memoizedState,
                baseState: pe.baseState,
                baseQueue: pe.baseQueue,
                queue: pe.queue,
                next: null,
            }),
            ve === null ? (oe.memoizedState = ve = e) : (ve = ve.next = e);
    }
    return ve;
}
function Xr(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function ai(e) {
    var t = Ze(),
        n = t.queue;
    if (n === null) throw Error(C(311));
    n.lastRenderedReducer = e;
    var r = pe,
        l = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (l !== null) {
            var i = l.next;
            (l.next = o.next), (o.next = i);
        }
        (r.baseQueue = l = o), (n.pending = null);
    }
    if (l !== null) {
        (o = l.next), (r = r.baseState);
        var u = (i = null),
            a = null,
            s = o;
        do {
            var p = s.lane;
            if ((hn & p) === p)
                a !== null &&
                    (a = a.next =
                        {
                            lane: 0,
                            action: s.action,
                            hasEagerState: s.hasEagerState,
                            eagerState: s.eagerState,
                            next: null,
                        }),
                    (r = s.hasEagerState ? s.eagerState : e(r, s.action));
            else {
                var v = {
                    lane: p,
                    action: s.action,
                    hasEagerState: s.hasEagerState,
                    eagerState: s.eagerState,
                    next: null,
                };
                a === null ? ((u = a = v), (i = r)) : (a = a.next = v),
                    (oe.lanes |= p),
                    (mn |= p);
            }
            s = s.next;
        } while (s !== null && s !== o);
        a === null ? (i = r) : (a.next = u),
            it(r, t.memoizedState) || (Me = !0),
            (t.memoizedState = r),
            (t.baseState = i),
            (t.baseQueue = a),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        l = e;
        do (o = l.lane), (oe.lanes |= o), (mn |= o), (l = l.next);
        while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function si(e) {
    var t = Ze(),
        n = t.queue;
    if (n === null) throw Error(C(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        l = n.pending,
        o = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var i = (l = l.next);
        do (o = e(o, i.action)), (i = i.next);
        while (i !== l);
        it(o, t.memoizedState) || (Me = !0),
            (t.memoizedState = o),
            t.baseQueue === null && (t.baseState = o),
            (n.lastRenderedState = o);
    }
    return [o, r];
}
function Pf() {}
function _f(e, t) {
    var n = oe,
        r = Ze(),
        l = t(),
        o = !it(r.memoizedState, l);
    if (
        (o && ((r.memoizedState = l), (Me = !0)),
        (r = r.queue),
        Xu(Df.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (ve !== null && ve.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            Gr(9, Lf.bind(null, n, r, l, t), void 0, null),
            ge === null)
        )
            throw Error(C(349));
        (hn & 30) !== 0 || Nf(n, t, l);
    }
    return l;
}
function Nf(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = oe.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (oe.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Lf(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), zf(t) && Tf(e);
}
function Df(e, t, n) {
    return n(function () {
        zf(t) && Tf(e);
    });
}
function zf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !it(e, n);
    } catch {
        return !0;
    }
}
function Tf(e) {
    var t = Pt(e, 1);
    t !== null && ot(t, e, 1, -1);
}
function Rs(e) {
    var t = ft();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Xr,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Jm.bind(null, oe, e)),
        [t.memoizedState, e]
    );
}
function Gr(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = oe.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (oe.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e))),
        e
    );
}
function Mf() {
    return Ze().memoizedState;
}
function Ol(e, t, n, r) {
    var l = ft();
    (oe.flags |= e),
        (l.memoizedState = Gr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ro(e, t, n, r) {
    var l = Ze();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (pe !== null) {
        var i = pe.memoizedState;
        if (((o = i.destroy), r !== null && Qu(r, i.deps))) {
            l.memoizedState = Gr(t, n, o, r);
            return;
        }
    }
    (oe.flags |= e), (l.memoizedState = Gr(1 | t, n, o, r));
}
function Ps(e, t) {
    return Ol(8390656, 8, e, t);
}
function Xu(e, t) {
    return Ro(2048, 8, e, t);
}
function Of(e, t) {
    return Ro(4, 2, e, t);
}
function Ff(e, t) {
    return Ro(4, 4, e, t);
}
function Uf(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function jf(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), Ro(4, 4, Uf.bind(null, t, e), n)
    );
}
function Gu() {}
function If(e, t) {
    var n = Ze();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Qu(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function Af(e, t) {
    var n = Ze();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Qu(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Bf(e, t, n) {
    return (hn & 21) === 0
        ? (e.baseState && ((e.baseState = !1), (Me = !0)),
          (e.memoizedState = n))
        : (it(n, t) ||
              ((n = Hc()), (oe.lanes |= n), (mn |= n), (e.baseState = !0)),
          t);
}
function Xm(e, t) {
    var n = Y;
    (Y = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = ui.transition;
    ui.transition = {};
    try {
        e(!1), t();
    } finally {
        (Y = n), (ui.transition = r);
    }
}
function $f() {
    return Ze().memoizedState;
}
function Gm(e, t, n) {
    var r = Yt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        }),
        Hf(e))
    )
        Vf(t, n);
    else if (((n = wf(e, t, n, r)), n !== null)) {
        var l = Ne();
        ot(n, e, r, l), Wf(n, t, r);
    }
}
function Jm(e, t, n) {
    var r = Yt(e),
        l = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        };
    if (Hf(e)) Vf(t, l);
    else {
        var o = e.alternate;
        if (
            e.lanes === 0 &&
            (o === null || o.lanes === 0) &&
            ((o = t.lastRenderedReducer), o !== null)
        )
            try {
                var i = t.lastRenderedState,
                    u = o(i, n);
                if (((l.hasEagerState = !0), (l.eagerState = u), it(u, i))) {
                    var a = t.interleaved;
                    a === null
                        ? ((l.next = l), Bu(t))
                        : ((l.next = a.next), (a.next = l)),
                        (t.interleaved = l);
                    return;
                }
            } catch {
            } finally {
            }
        (n = wf(e, t, l, r)),
            n !== null && ((l = Ne()), ot(n, e, r, l), Wf(n, t, r));
    }
}
function Hf(e) {
    var t = e.alternate;
    return e === oe || (t !== null && t === oe);
}
function Vf(e, t) {
    Nr = lo = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function Wf(e, t, n) {
    if ((n & 4194240) !== 0) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Pu(e, n);
    }
}
var oo = {
        readContext: Je,
        useCallback: Ee,
        useContext: Ee,
        useEffect: Ee,
        useImperativeHandle: Ee,
        useInsertionEffect: Ee,
        useLayoutEffect: Ee,
        useMemo: Ee,
        useReducer: Ee,
        useRef: Ee,
        useState: Ee,
        useDebugValue: Ee,
        useDeferredValue: Ee,
        useTransition: Ee,
        useMutableSource: Ee,
        useSyncExternalStore: Ee,
        useId: Ee,
        unstable_isNewReconciler: !1,
    },
    Zm = {
        readContext: Je,
        useCallback: function (e, t) {
            return (ft().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Je,
        useEffect: Ps,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                Ol(4194308, 4, Uf.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return Ol(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return Ol(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = ft();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = ft();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Gm.bind(null, oe, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = ft();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: Rs,
        useDebugValue: Gu,
        useDeferredValue: function (e) {
            return (ft().memoizedState = e);
        },
        useTransition: function () {
            var e = Rs(!1),
                t = e[0];
            return (e = Xm.bind(null, e[1])), (ft().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = oe,
                l = ft();
            if (ne) {
                if (n === void 0) throw Error(C(407));
                n = n();
            } else {
                if (((n = t()), ge === null)) throw Error(C(349));
                (hn & 30) !== 0 || Nf(r, t, n);
            }
            l.memoizedState = n;
            var o = { value: n, getSnapshot: t };
            return (
                (l.queue = o),
                Ps(Df.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                Gr(9, Lf.bind(null, r, o, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = ft(),
                t = ge.identifierPrefix;
            if (ne) {
                var n = kt,
                    r = St;
                (n = (r & ~(1 << (32 - lt(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = Yr++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = Ym++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    qm = {
        readContext: Je,
        useCallback: If,
        useContext: Je,
        useEffect: Xu,
        useImperativeHandle: jf,
        useInsertionEffect: Of,
        useLayoutEffect: Ff,
        useMemo: Af,
        useReducer: ai,
        useRef: Mf,
        useState: function () {
            return ai(Xr);
        },
        useDebugValue: Gu,
        useDeferredValue: function (e) {
            var t = Ze();
            return Bf(t, pe.memoizedState, e);
        },
        useTransition: function () {
            var e = ai(Xr)[0],
                t = Ze().memoizedState;
            return [e, t];
        },
        useMutableSource: Pf,
        useSyncExternalStore: _f,
        useId: $f,
        unstable_isNewReconciler: !1,
    },
    bm = {
        readContext: Je,
        useCallback: If,
        useContext: Je,
        useEffect: Xu,
        useImperativeHandle: jf,
        useInsertionEffect: Of,
        useLayoutEffect: Ff,
        useMemo: Af,
        useReducer: si,
        useRef: Mf,
        useState: function () {
            return si(Xr);
        },
        useDebugValue: Gu,
        useDeferredValue: function (e) {
            var t = Ze();
            return pe === null
                ? (t.memoizedState = e)
                : Bf(t, pe.memoizedState, e);
        },
        useTransition: function () {
            var e = si(Xr)[0],
                t = Ze().memoizedState;
            return [e, t];
        },
        useMutableSource: Pf,
        useSyncExternalStore: _f,
        useId: $f,
        unstable_isNewReconciler: !1,
    };
function Jn(e, t) {
    try {
        var n = "",
            r = t;
        do (n += _h(r)), (r = r.return);
        while (r);
        var l = n;
    } catch (o) {
        l =
            `
Error generating stack: ` +
            o.message +
            `
` +
            o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
}
function ci(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n != null ? n : null,
        digest: t != null ? t : null,
    };
}
function Zi(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var ev = typeof WeakMap == "function" ? WeakMap : Map;
function Qf(e, t, n) {
    (n = Et(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            uo || ((uo = !0), (uu = r)), Zi(e, t);
        }),
        n
    );
}
function Kf(e, t, n) {
    (n = Et(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        (n.payload = function () {
            return r(l);
        }),
            (n.callback = function () {
                Zi(e, t);
            });
    }
    var o = e.stateNode;
    return (
        o !== null &&
            typeof o.componentDidCatch == "function" &&
            (n.callback = function () {
                Zi(e, t),
                    typeof r != "function" &&
                        (Kt === null ? (Kt = new Set([this])) : Kt.add(this));
                var i = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: i !== null ? i : "",
                });
            }),
        n
    );
}
function _s(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new ev();
        var l = new Set();
        r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = hv.bind(null, e, t, n)), t.then(e, e));
}
function Ns(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function Ls(e, t, n, r, l) {
    return (e.mode & 1) === 0
        ? (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = Et(-1, 1)), (t.tag = 2), Qt(n, t, 1))),
                (n.lanes |= 1)),
          e)
        : ((e.flags |= 65536), (e.lanes = l), e);
}
var tv = Nt.ReactCurrentOwner,
    Me = !1;
function _e(e, t, n, r) {
    t.child = e === null ? Cf(t, null, n, r) : Xn(t, e.child, n, r);
}
function Ds(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
        Vn(t, l),
        (r = Ku(e, t, n, r, o, l)),
        (n = Yu()),
        e !== null && !Me
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~l),
              _t(e, t, l))
            : (ne && n && Ou(t), (t.flags |= 1), _e(e, t, r, l), t.child)
    );
}
function zs(e, t, n, r, l) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" &&
            !ra(o) &&
            o.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = o), Yf(e, t, o, r, l))
            : ((e = Il(n.type, null, r, t, t.mode, l)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((o = e.child), (e.lanes & l) === 0)) {
        var i = o.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : $r),
            n(i, r) && e.ref === t.ref)
        )
            return _t(e, t, l);
    }
    return (
        (t.flags |= 1),
        (e = Xt(o, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function Yf(e, t, n, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if ($r(o, r) && e.ref === t.ref)
            if (((Me = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
                (e.flags & 131072) !== 0 && (Me = !0);
            else return (t.lanes = e.lanes), _t(e, t, l);
    }
    return qi(e, t, n, r, l);
}
function Xf(e, t, n) {
    var r = t.pendingProps,
        l = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if ((t.mode & 1) === 0)
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                J(jn, Ie),
                (Ie |= n);
        else {
            if ((n & 1073741824) === 0)
                return (
                    (e = o !== null ? o.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null,
                    }),
                    (t.updateQueue = null),
                    J(jn, Ie),
                    (Ie |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                (r = o !== null ? o.baseLanes : n),
                J(jn, Ie),
                (Ie |= r);
        }
    else
        o !== null
            ? ((r = o.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            J(jn, Ie),
            (Ie |= r);
    return _e(e, t, l, n), t.child;
}
function Gf(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function qi(e, t, n, r, l) {
    var o = Fe(n) ? dn : Pe.current;
    return (
        (o = Kn(t, o)),
        Vn(t, l),
        (n = Ku(e, t, n, r, o, l)),
        (r = Yu()),
        e !== null && !Me
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~l),
              _t(e, t, l))
            : (ne && r && Ou(t), (t.flags |= 1), _e(e, t, n, l), t.child)
    );
}
function Ts(e, t, n, r, l) {
    if (Fe(n)) {
        var o = !0;
        Zl(t);
    } else o = !1;
    if ((Vn(t, l), t.stateNode === null))
        Fl(e, t), xf(t, n, r), Ji(t, n, r, l), (r = !0);
    else if (e === null) {
        var i = t.stateNode,
            u = t.memoizedProps;
        i.props = u;
        var a = i.context,
            s = n.contextType;
        typeof s == "object" && s !== null
            ? (s = Je(s))
            : ((s = Fe(n) ? dn : Pe.current), (s = Kn(t, s)));
        var p = n.getDerivedStateFromProps,
            v =
                typeof p == "function" ||
                typeof i.getSnapshotBeforeUpdate == "function";
        v ||
            (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
                typeof i.componentWillReceiveProps != "function") ||
            ((u !== r || a !== s) && Es(t, i, r, s)),
            (Ut = !1);
        var m = t.memoizedState;
        (i.state = m),
            no(t, r, i, l),
            (a = t.memoizedState),
            u !== r || m !== a || Oe.current || Ut
                ? (typeof p == "function" &&
                      (Gi(t, n, p, r), (a = t.memoizedState)),
                  (u = Ut || xs(t, n, u, r, m, a, s))
                      ? (v ||
                            (typeof i.UNSAFE_componentWillMount != "function" &&
                                typeof i.componentWillMount != "function") ||
                            (typeof i.componentWillMount == "function" &&
                                i.componentWillMount(),
                            typeof i.UNSAFE_componentWillMount == "function" &&
                                i.UNSAFE_componentWillMount()),
                        typeof i.componentDidMount == "function" &&
                            (t.flags |= 4194308))
                      : (typeof i.componentDidMount == "function" &&
                            (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = a)),
                  (i.props = r),
                  (i.state = a),
                  (i.context = s),
                  (r = u))
                : (typeof i.componentDidMount == "function" &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (i = t.stateNode),
            Sf(e, t),
            (u = t.memoizedProps),
            (s = t.type === t.elementType ? u : et(t.type, u)),
            (i.props = s),
            (v = t.pendingProps),
            (m = i.context),
            (a = n.contextType),
            typeof a == "object" && a !== null
                ? (a = Je(a))
                : ((a = Fe(n) ? dn : Pe.current), (a = Kn(t, a)));
        var k = n.getDerivedStateFromProps;
        (p =
            typeof k == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function") ||
            (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
                typeof i.componentWillReceiveProps != "function") ||
            ((u !== v || m !== a) && Es(t, i, r, a)),
            (Ut = !1),
            (m = t.memoizedState),
            (i.state = m),
            no(t, r, i, l);
        var w = t.memoizedState;
        u !== v || m !== w || Oe.current || Ut
            ? (typeof k == "function" &&
                  (Gi(t, n, k, r), (w = t.memoizedState)),
              (s = Ut || xs(t, n, s, r, m, w, a) || !1)
                  ? (p ||
                        (typeof i.UNSAFE_componentWillUpdate != "function" &&
                            typeof i.componentWillUpdate != "function") ||
                        (typeof i.componentWillUpdate == "function" &&
                            i.componentWillUpdate(r, w, a),
                        typeof i.UNSAFE_componentWillUpdate == "function" &&
                            i.UNSAFE_componentWillUpdate(r, w, a)),
                    typeof i.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate == "function" &&
                        (t.flags |= 1024))
                  : (typeof i.componentDidUpdate != "function" ||
                        (u === e.memoizedProps && m === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof i.getSnapshotBeforeUpdate != "function" ||
                        (u === e.memoizedProps && m === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = w)),
              (i.props = r),
              (i.state = w),
              (i.context = a),
              (r = s))
            : (typeof i.componentDidUpdate != "function" ||
                  (u === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                  (u === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return bi(e, t, n, r, o, l);
}
function bi(e, t, n, r, l, o) {
    Gf(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && gs(t, n, !1), _t(e, t, o);
    (r = t.stateNode), (tv.current = t);
    var u =
        i && typeof n.getDerivedStateFromError != "function"
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && i
            ? ((t.child = Xn(t, e.child, null, o)),
              (t.child = Xn(t, null, u, o)))
            : _e(e, t, u, o),
        (t.memoizedState = r.state),
        l && gs(t, n, !0),
        t.child
    );
}
function Jf(e) {
    var t = e.stateNode;
    t.pendingContext
        ? vs(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && vs(e, t.context, !1),
        Hu(e, t.containerInfo);
}
function Ms(e, t, n, r, l) {
    return Yn(), Uu(l), (t.flags |= 256), _e(e, t, n, r), t.child;
}
var eu = { dehydrated: null, treeContext: null, retryLane: 0 };
function tu(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Zf(e, t, n) {
    var r = t.pendingProps,
        l = le.current,
        o = !1,
        i = (t.flags & 128) !== 0,
        u;
    if (
        ((u = i) ||
            (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
        u
            ? ((o = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (l |= 1),
        J(le, l & 1),
        e === null)
    )
        return (
            Yi(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? ((t.mode & 1) === 0
                      ? (t.lanes = 1)
                      : e.data === "$!"
                      ? (t.lanes = 8)
                      : (t.lanes = 1073741824),
                  null)
                : ((i = r.children),
                  (e = r.fallback),
                  o
                      ? ((r = t.mode),
                        (o = t.child),
                        (i = { mode: "hidden", children: i }),
                        (r & 1) === 0 && o !== null
                            ? ((o.childLanes = 0), (o.pendingProps = i))
                            : (o = No(i, r, 0, null)),
                        (e = sn(e, r, n, null)),
                        (o.return = t),
                        (e.return = t),
                        (o.sibling = e),
                        (t.child = o),
                        (t.child.memoizedState = tu(n)),
                        (t.memoizedState = eu),
                        e)
                      : Ju(t, i))
        );
    if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
        return nv(e, t, i, r, u, l, n);
    if (o) {
        (o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling);
        var a = { mode: "hidden", children: r.children };
        return (
            (i & 1) === 0 && t.child !== l
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = a),
                  (t.deletions = null))
                : ((r = Xt(l, a)),
                  (r.subtreeFlags = l.subtreeFlags & 14680064)),
            u !== null
                ? (o = Xt(u, o))
                : ((o = sn(o, i, n, null)), (o.flags |= 2)),
            (o.return = t),
            (r.return = t),
            (r.sibling = o),
            (t.child = r),
            (r = o),
            (o = t.child),
            (i = e.child.memoizedState),
            (i =
                i === null
                    ? tu(n)
                    : {
                          baseLanes: i.baseLanes | n,
                          cachePool: null,
                          transitions: i.transitions,
                      }),
            (o.memoizedState = i),
            (o.childLanes = e.childLanes & ~n),
            (t.memoizedState = eu),
            r
        );
    }
    return (
        (o = e.child),
        (e = o.sibling),
        (r = Xt(o, { mode: "visible", children: r.children })),
        (t.mode & 1) === 0 && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function Ju(e, t) {
    return (
        (t = No({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function xl(e, t, n, r) {
    return (
        r !== null && Uu(r),
        Xn(t, e.child, null, n),
        (e = Ju(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function nv(e, t, n, r, l, o, i) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = ci(Error(C(422)))), xl(e, t, i, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (l = t.mode),
              (r = No({ mode: "visible", children: r.children }, l, 0, null)),
              (o = sn(o, l, i, null)),
              (o.flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              (t.mode & 1) !== 0 && Xn(t, e.child, null, i),
              (t.child.memoizedState = tu(i)),
              (t.memoizedState = eu),
              o);
    if ((t.mode & 1) === 0) return xl(e, t, i, null);
    if (l.data === "$!") {
        if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
        return (
            (r = u), (o = Error(C(419))), (r = ci(o, r, void 0)), xl(e, t, i, r)
        );
    }
    if (((u = (i & e.childLanes) !== 0), Me || u)) {
        if (((r = ge), r !== null)) {
            switch (i & -i) {
                case 4:
                    l = 2;
                    break;
                case 16:
                    l = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    l = 32;
                    break;
                case 536870912:
                    l = 268435456;
                    break;
                default:
                    l = 0;
            }
            (l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l),
                l !== 0 &&
                    l !== o.retryLane &&
                    ((o.retryLane = l), Pt(e, l), ot(r, e, l, -1));
        }
        return na(), (r = ci(Error(C(421)))), xl(e, t, i, r);
    }
    return l.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = mv.bind(null, e)),
          (l._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (Ae = Wt(l.nextSibling)),
          (Be = t),
          (ne = !0),
          (rt = null),
          e !== null &&
              ((Ke[Ye++] = St),
              (Ke[Ye++] = kt),
              (Ke[Ye++] = pn),
              (St = e.id),
              (kt = e.overflow),
              (pn = t)),
          (t = Ju(t, r.children)),
          (t.flags |= 4096),
          t);
}
function Os(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Xi(e.return, t, n);
}
function fi(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: l,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = l));
}
function qf(e, t, n) {
    var r = t.pendingProps,
        l = r.revealOrder,
        o = r.tail;
    if ((_e(e, t, r.children, n), (r = le.current), (r & 2) !== 0))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && (e.flags & 128) !== 0)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && Os(e, n, t);
                else if (e.tag === 19) Os(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((J(le, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
        switch (l) {
            case "forwards":
                for (n = t.child, l = null; n !== null; )
                    (e = n.alternate),
                        e !== null && ro(e) === null && (l = n),
                        (n = n.sibling);
                (n = l),
                    n === null
                        ? ((l = t.child), (t.child = null))
                        : ((l = n.sibling), (n.sibling = null)),
                    fi(t, !1, l, n, o);
                break;
            case "backwards":
                for (n = null, l = t.child, t.child = null; l !== null; ) {
                    if (((e = l.alternate), e !== null && ro(e) === null)) {
                        t.child = l;
                        break;
                    }
                    (e = l.sibling), (l.sibling = n), (n = l), (l = e);
                }
                fi(t, !0, n, null, o);
                break;
            case "together":
                fi(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function Fl(e, t) {
    (t.mode & 1) === 0 &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function _t(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (mn |= t.lanes),
        (n & t.childLanes) === 0)
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(C(153));
    if (t.child !== null) {
        for (
            e = t.child, n = Xt(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = Xt(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function rv(e, t, n) {
    switch (t.tag) {
        case 3:
            Jf(t), Yn();
            break;
        case 5:
            Rf(t);
            break;
        case 1:
            Fe(t.type) && Zl(t);
            break;
        case 4:
            Hu(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                l = t.memoizedProps.value;
            J(eo, r._currentValue), (r._currentValue = l);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (J(le, le.current & 1), (t.flags |= 128), null)
                    : (n & t.child.childLanes) !== 0
                    ? Zf(e, t, n)
                    : (J(le, le.current & 1),
                      (e = _t(e, t, n)),
                      e !== null ? e.sibling : null);
            J(le, le.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
                if (r) return qf(e, t, n);
                t.flags |= 128;
            }
            if (
                ((l = t.memoizedState),
                l !== null &&
                    ((l.rendering = null),
                    (l.tail = null),
                    (l.lastEffect = null)),
                J(le, le.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), Xf(e, t, n);
    }
    return _t(e, t, n);
}
var bf, nu, ed, td;
bf = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
nu = function () {};
ed = function (e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        (e = t.stateNode), un(ht.current);
        var o = null;
        switch (n) {
            case "input":
                (l = Ci(e, l)), (r = Ci(e, r)), (o = []);
                break;
            case "select":
                (l = ie({}, l, { value: void 0 })),
                    (r = ie({}, r, { value: void 0 })),
                    (o = []);
                break;
            case "textarea":
                (l = _i(e, l)), (r = _i(e, r)), (o = []);
                break;
            default:
                typeof l.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = Gl);
        }
        Li(n, r);
        var i;
        n = null;
        for (s in l)
            if (!r.hasOwnProperty(s) && l.hasOwnProperty(s) && l[s] != null)
                if (s === "style") {
                    var u = l[s];
                    for (i in u)
                        u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
                } else
                    s !== "dangerouslySetInnerHTML" &&
                        s !== "children" &&
                        s !== "suppressContentEditableWarning" &&
                        s !== "suppressHydrationWarning" &&
                        s !== "autoFocus" &&
                        (Or.hasOwnProperty(s)
                            ? o || (o = [])
                            : (o = o || []).push(s, null));
        for (s in r) {
            var a = r[s];
            if (
                ((u = l != null ? l[s] : void 0),
                r.hasOwnProperty(s) && a !== u && (a != null || u != null))
            )
                if (s === "style")
                    if (u) {
                        for (i in u)
                            !u.hasOwnProperty(i) ||
                                (a && a.hasOwnProperty(i)) ||
                                (n || (n = {}), (n[i] = ""));
                        for (i in a)
                            a.hasOwnProperty(i) &&
                                u[i] !== a[i] &&
                                (n || (n = {}), (n[i] = a[i]));
                    } else n || (o || (o = []), o.push(s, n)), (n = a);
                else
                    s === "dangerouslySetInnerHTML"
                        ? ((a = a ? a.__html : void 0),
                          (u = u ? u.__html : void 0),
                          a != null && u !== a && (o = o || []).push(s, a))
                        : s === "children"
                        ? (typeof a != "string" && typeof a != "number") ||
                          (o = o || []).push(s, "" + a)
                        : s !== "suppressContentEditableWarning" &&
                          s !== "suppressHydrationWarning" &&
                          (Or.hasOwnProperty(s)
                              ? (a != null &&
                                    s === "onScroll" &&
                                    Z("scroll", e),
                                o || u === a || (o = []))
                              : (o = o || []).push(s, a));
        }
        n && (o = o || []).push("style", n);
        var s = o;
        (t.updateQueue = s) && (t.flags |= 4);
    }
};
td = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function vr(e, t) {
    if (!ne)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function Ce(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            (n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags & 14680064),
                (r |= l.flags & 14680064),
                (l.return = e),
                (l = l.sibling);
    else
        for (l = e.child; l !== null; )
            (n |= l.lanes | l.childLanes),
                (r |= l.subtreeFlags),
                (r |= l.flags),
                (l.return = e),
                (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function lv(e, t, n) {
    var r = t.pendingProps;
    switch ((Fu(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Ce(t), null;
        case 1:
            return Fe(t.type) && Jl(), Ce(t), null;
        case 3:
            return (
                (r = t.stateNode),
                Gn(),
                q(Oe),
                q(Pe),
                Wu(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (Sl(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated &&
                              (t.flags & 256) === 0) ||
                          ((t.flags |= 1024),
                          rt !== null && (cu(rt), (rt = null)))),
                nu(e, t),
                Ce(t),
                null
            );
        case 5:
            Vu(t);
            var l = un(Kr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                ed(e, t, n, r, l),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(C(166));
                    return Ce(t), null;
                }
                if (((e = un(ht.current)), Sl(t))) {
                    (r = t.stateNode), (n = t.type);
                    var o = t.memoizedProps;
                    switch (
                        ((r[dt] = t), (r[Wr] = o), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case "dialog":
                            Z("cancel", r), Z("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            Z("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (l = 0; l < kr.length; l++) Z(kr[l], r);
                            break;
                        case "source":
                            Z("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            Z("error", r), Z("load", r);
                            break;
                        case "details":
                            Z("toggle", r);
                            break;
                        case "input":
                            Va(r, o), Z("invalid", r);
                            break;
                        case "select":
                            (r._wrapperState = { wasMultiple: !!o.multiple }),
                                Z("invalid", r);
                            break;
                        case "textarea":
                            Qa(r, o), Z("invalid", r);
                    }
                    Li(n, o), (l = null);
                    for (var i in o)
                        if (o.hasOwnProperty(i)) {
                            var u = o[i];
                            i === "children"
                                ? typeof u == "string"
                                    ? r.textContent !== u &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          wl(r.textContent, u, e),
                                      (l = ["children", u]))
                                    : typeof u == "number" &&
                                      r.textContent !== "" + u &&
                                      (o.suppressHydrationWarning !== !0 &&
                                          wl(r.textContent, u, e),
                                      (l = ["children", "" + u]))
                                : Or.hasOwnProperty(i) &&
                                  u != null &&
                                  i === "onScroll" &&
                                  Z("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            fl(r), Wa(r, o, !0);
                            break;
                        case "textarea":
                            fl(r), Ka(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = Gl);
                    }
                    (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (i = l.nodeType === 9 ? l : l.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = _c(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = i.createElement("div")),
                                  (e.innerHTML = "<script></script>"),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == "string"
                                ? (e = i.createElement(n, { is: r.is }))
                                : ((e = i.createElement(n)),
                                  n === "select" &&
                                      ((i = e),
                                      r.multiple
                                          ? (i.multiple = !0)
                                          : r.size && (i.size = r.size)))
                            : (e = i.createElementNS(e, n)),
                        (e[dt] = t),
                        (e[Wr] = r),
                        bf(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((i = Di(n, r)), n)) {
                            case "dialog":
                                Z("cancel", e), Z("close", e), (l = r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                Z("load", e), (l = r);
                                break;
                            case "video":
                            case "audio":
                                for (l = 0; l < kr.length; l++) Z(kr[l], e);
                                l = r;
                                break;
                            case "source":
                                Z("error", e), (l = r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                Z("error", e), Z("load", e), (l = r);
                                break;
                            case "details":
                                Z("toggle", e), (l = r);
                                break;
                            case "input":
                                Va(e, r), (l = Ci(e, r)), Z("invalid", e);
                                break;
                            case "option":
                                l = r;
                                break;
                            case "select":
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple,
                                }),
                                    (l = ie({}, r, { value: void 0 })),
                                    Z("invalid", e);
                                break;
                            case "textarea":
                                Qa(e, r), (l = _i(e, r)), Z("invalid", e);
                                break;
                            default:
                                l = r;
                        }
                        Li(n, l), (u = l);
                        for (o in u)
                            if (u.hasOwnProperty(o)) {
                                var a = u[o];
                                o === "style"
                                    ? Dc(e, a)
                                    : o === "dangerouslySetInnerHTML"
                                    ? ((a = a ? a.__html : void 0),
                                      a != null && Nc(e, a))
                                    : o === "children"
                                    ? typeof a == "string"
                                        ? (n !== "textarea" || a !== "") &&
                                          Fr(e, a)
                                        : typeof a == "number" && Fr(e, "" + a)
                                    : o !== "suppressContentEditableWarning" &&
                                      o !== "suppressHydrationWarning" &&
                                      o !== "autoFocus" &&
                                      (Or.hasOwnProperty(o)
                                          ? a != null &&
                                            o === "onScroll" &&
                                            Z("scroll", e)
                                          : a != null && Su(e, o, a, i));
                            }
                        switch (n) {
                            case "input":
                                fl(e), Wa(e, r, !1);
                                break;
                            case "textarea":
                                fl(e), Ka(e);
                                break;
                            case "option":
                                r.value != null &&
                                    e.setAttribute("value", "" + Gt(r.value));
                                break;
                            case "select":
                                (e.multiple = !!r.multiple),
                                    (o = r.value),
                                    o != null
                                        ? An(e, !!r.multiple, o, !1)
                                        : r.defaultValue != null &&
                                          An(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0
                                          );
                                break;
                            default:
                                typeof l.onClick == "function" &&
                                    (e.onclick = Gl);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return Ce(t), null;
        case 6:
            if (e && t.stateNode != null) td(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(C(166));
                if (((n = un(Kr.current)), un(ht.current), Sl(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[dt] = t),
                        (o = r.nodeValue !== n) && ((e = Be), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                wl(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    wl(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    o && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[dt] = t),
                        (t.stateNode = r);
            }
            return Ce(t), null;
        case 13:
            if (
                (q(le),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (
                    ne &&
                    Ae !== null &&
                    (t.mode & 1) !== 0 &&
                    (t.flags & 128) === 0
                )
                    yf(), Yn(), (t.flags |= 98560), (o = !1);
                else if (((o = Sl(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!o) throw Error(C(318));
                        if (
                            ((o = t.memoizedState),
                            (o = o !== null ? o.dehydrated : null),
                            !o)
                        )
                            throw Error(C(317));
                        o[dt] = t;
                    } else
                        Yn(),
                            (t.flags & 128) === 0 && (t.memoizedState = null),
                            (t.flags |= 4);
                    Ce(t), (o = !1);
                } else rt !== null && (cu(rt), (rt = null)), (o = !0);
                if (!o) return t.flags & 65536 ? t : null;
            }
            return (t.flags & 128) !== 0
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      (t.mode & 1) !== 0 &&
                          (e === null || (le.current & 1) !== 0
                              ? he === 0 && (he = 3)
                              : na())),
                  t.updateQueue !== null && (t.flags |= 4),
                  Ce(t),
                  null);
        case 4:
            return (
                Gn(),
                nu(e, t),
                e === null && Hr(t.stateNode.containerInfo),
                Ce(t),
                null
            );
        case 10:
            return Au(t.type._context), Ce(t), null;
        case 17:
            return Fe(t.type) && Jl(), Ce(t), null;
        case 19:
            if ((q(le), (o = t.memoizedState), o === null)) return Ce(t), null;
            if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
                if (r) vr(o, !1);
                else {
                    if (he !== 0 || (e !== null && (e.flags & 128) !== 0))
                        for (e = t.child; e !== null; ) {
                            if (((i = ro(e)), i !== null)) {
                                for (
                                    t.flags |= 128,
                                        vr(o, !1),
                                        r = i.updateQueue,
                                        r !== null &&
                                            ((t.updateQueue = r),
                                            (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (o = n),
                                        (e = r),
                                        (o.flags &= 14680066),
                                        (i = o.alternate),
                                        i === null
                                            ? ((o.childLanes = 0),
                                              (o.lanes = e),
                                              (o.child = null),
                                              (o.subtreeFlags = 0),
                                              (o.memoizedProps = null),
                                              (o.memoizedState = null),
                                              (o.updateQueue = null),
                                              (o.dependencies = null),
                                              (o.stateNode = null))
                                            : ((o.childLanes = i.childLanes),
                                              (o.lanes = i.lanes),
                                              (o.child = i.child),
                                              (o.subtreeFlags = 0),
                                              (o.deletions = null),
                                              (o.memoizedProps =
                                                  i.memoizedProps),
                                              (o.memoizedState =
                                                  i.memoizedState),
                                              (o.updateQueue = i.updateQueue),
                                              (o.type = i.type),
                                              (e = i.dependencies),
                                              (o.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext:
                                                                e.firstContext,
                                                        })),
                                        (n = n.sibling);
                                return J(le, (le.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    o.tail !== null &&
                        ae() > Zn &&
                        ((t.flags |= 128),
                        (r = !0),
                        vr(o, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = ro(i)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            vr(o, !0),
                            o.tail === null &&
                                o.tailMode === "hidden" &&
                                !i.alternate &&
                                !ne)
                        )
                            return Ce(t), null;
                    } else
                        2 * ae() - o.renderingStartTime > Zn &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            vr(o, !1),
                            (t.lanes = 4194304));
                o.isBackwards
                    ? ((i.sibling = t.child), (t.child = i))
                    : ((n = o.last),
                      n !== null ? (n.sibling = i) : (t.child = i),
                      (o.last = i));
            }
            return o.tail !== null
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = ae()),
                  (t.sibling = null),
                  (n = le.current),
                  J(le, r ? (n & 1) | 2 : n & 1),
                  t)
                : (Ce(t), null);
        case 22:
        case 23:
            return (
                ta(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && (t.mode & 1) !== 0
                    ? (Ie & 1073741824) !== 0 &&
                      (Ce(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : Ce(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(C(156, t.tag));
}
function ov(e, t) {
    switch ((Fu(t), t.tag)) {
        case 1:
            return (
                Fe(t.type) && Jl(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Gn(),
                q(Oe),
                q(Pe),
                Wu(),
                (e = t.flags),
                (e & 65536) !== 0 && (e & 128) === 0
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return Vu(t), null;
        case 13:
            if (
                (q(le),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(C(340));
                Yn();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return q(le), null;
        case 4:
            return Gn(), null;
        case 10:
            return Au(t.type._context), null;
        case 22:
        case 23:
            return ta(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var El = !1,
    Re = !1,
    iv = typeof WeakSet == "function" ? WeakSet : Set,
    L = null;
function Un(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                ue(e, t, r);
            }
        else n.current = null;
}
function ru(e, t, n) {
    try {
        n();
    } catch (r) {
        ue(e, t, r);
    }
}
var Fs = !1;
function uv(e, t) {
    if (((Bi = Kl), (e = lf()), Mu(e))) {
        if ("selectionStart" in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset,
                        o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, o.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var i = 0,
                        u = -1,
                        a = -1,
                        s = 0,
                        p = 0,
                        v = e,
                        m = null;
                    t: for (;;) {
                        for (
                            var k;
                            v !== n ||
                                (l !== 0 && v.nodeType !== 3) ||
                                (u = i + l),
                                v !== o ||
                                    (r !== 0 && v.nodeType !== 3) ||
                                    (a = i + r),
                                v.nodeType === 3 && (i += v.nodeValue.length),
                                (k = v.firstChild) !== null;

                        )
                            (m = v), (v = k);
                        for (;;) {
                            if (v === e) break t;
                            if (
                                (m === n && ++s === l && (u = i),
                                m === o && ++p === r && (a = i),
                                (k = v.nextSibling) !== null)
                            )
                                break;
                            (v = m), (m = v.parentNode);
                        }
                        v = k;
                    }
                    n = u === -1 || a === -1 ? null : { start: u, end: a };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        $i = { focusedElem: e, selectionRange: n }, Kl = !1, L = t;
        L !== null;

    )
        if (
            ((t = L),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (L = e);
        else
            for (; L !== null; ) {
                t = L;
                try {
                    var w = t.alternate;
                    if ((t.flags & 1024) !== 0)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (w !== null) {
                                    var S = w.memoizedProps,
                                        _ = w.memoizedState,
                                        d = t.stateNode,
                                        c = d.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? S
                                                : et(t.type, S),
                                            _
                                        );
                                    d.__reactInternalSnapshotBeforeUpdate = c;
                                }
                                break;
                            case 3:
                                var h = t.stateNode.containerInfo;
                                h.nodeType === 1
                                    ? (h.textContent = "")
                                    : h.nodeType === 9 &&
                                      h.documentElement &&
                                      h.removeChild(h.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(C(163));
                        }
                } catch (f) {
                    ue(t, t.return, f);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (L = e);
                    break;
                }
                L = t.return;
            }
    return (w = Fs), (Fs = !1), w;
}
function Lr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var l = (r = r.next);
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                (l.destroy = void 0), o !== void 0 && ru(t, n, o);
            }
            l = l.next;
        } while (l !== r);
    }
}
function Po(e, t) {
    if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function lu(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function nd(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), nd(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[dt],
                delete t[Wr],
                delete t[Wi],
                delete t[Vm],
                delete t[Wm])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function rd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Us(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || rd(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function ou(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = Gl));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (ou(e, t, n), e = e.sibling; e !== null; )
            ou(e, t, n), (e = e.sibling);
}
function iu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (iu(e, t, n), e = e.sibling; e !== null; )
            iu(e, t, n), (e = e.sibling);
}
var Se = null,
    nt = !1;
function Mt(e, t, n) {
    for (n = n.child; n !== null; ) ld(e, t, n), (n = n.sibling);
}
function ld(e, t, n) {
    if (pt && typeof pt.onCommitFiberUnmount == "function")
        try {
            pt.onCommitFiberUnmount(yo, n);
        } catch {}
    switch (n.tag) {
        case 5:
            Re || Un(n, t);
        case 6:
            var r = Se,
                l = nt;
            (Se = null),
                Mt(e, t, n),
                (Se = r),
                (nt = l),
                Se !== null &&
                    (nt
                        ? ((e = Se),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : Se.removeChild(n.stateNode));
            break;
        case 18:
            Se !== null &&
                (nt
                    ? ((e = Se),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? li(e.parentNode, n)
                          : e.nodeType === 1 && li(e, n),
                      Ar(e))
                    : li(Se, n.stateNode));
            break;
        case 4:
            (r = Se),
                (l = nt),
                (Se = n.stateNode.containerInfo),
                (nt = !0),
                Mt(e, t, n),
                (Se = r),
                (nt = l);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !Re &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                l = r = r.next;
                do {
                    var o = l,
                        i = o.destroy;
                    (o = o.tag),
                        i !== void 0 &&
                            ((o & 2) !== 0 || (o & 4) !== 0) &&
                            ru(n, t, i),
                        (l = l.next);
                } while (l !== r);
            }
            Mt(e, t, n);
            break;
        case 1:
            if (
                !Re &&
                (Un(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function")
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (u) {
                    ue(n, t, u);
                }
            Mt(e, t, n);
            break;
        case 21:
            Mt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((Re = (r = Re) || n.memoizedState !== null),
                  Mt(e, t, n),
                  (Re = r))
                : Mt(e, t, n);
            break;
        default:
            Mt(e, t, n);
    }
}
function js(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new iv()),
            t.forEach(function (r) {
                var l = vv.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(l, l));
            });
    }
}
function be(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var o = e,
                    i = t,
                    u = i;
                e: for (; u !== null; ) {
                    switch (u.tag) {
                        case 5:
                            (Se = u.stateNode), (nt = !1);
                            break e;
                        case 3:
                            (Se = u.stateNode.containerInfo), (nt = !0);
                            break e;
                        case 4:
                            (Se = u.stateNode.containerInfo), (nt = !0);
                            break e;
                    }
                    u = u.return;
                }
                if (Se === null) throw Error(C(160));
                ld(o, i, l), (Se = null), (nt = !1);
                var a = l.alternate;
                a !== null && (a.return = null), (l.return = null);
            } catch (s) {
                ue(l, t, s);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) od(t, e), (t = t.sibling);
}
function od(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if ((be(t, e), ct(e), r & 4)) {
                try {
                    Lr(3, e, e.return), Po(3, e);
                } catch (S) {
                    ue(e, e.return, S);
                }
                try {
                    Lr(5, e, e.return);
                } catch (S) {
                    ue(e, e.return, S);
                }
            }
            break;
        case 1:
            be(t, e), ct(e), r & 512 && n !== null && Un(n, n.return);
            break;
        case 5:
            if (
                (be(t, e),
                ct(e),
                r & 512 && n !== null && Un(n, n.return),
                e.flags & 32)
            ) {
                var l = e.stateNode;
                try {
                    Fr(l, "");
                } catch (S) {
                    ue(e, e.return, S);
                }
            }
            if (r & 4 && ((l = e.stateNode), l != null)) {
                var o = e.memoizedProps,
                    i = n !== null ? n.memoizedProps : o,
                    u = e.type,
                    a = e.updateQueue;
                if (((e.updateQueue = null), a !== null))
                    try {
                        u === "input" &&
                            o.type === "radio" &&
                            o.name != null &&
                            Rc(l, o),
                            Di(u, i);
                        var s = Di(u, o);
                        for (i = 0; i < a.length; i += 2) {
                            var p = a[i],
                                v = a[i + 1];
                            p === "style"
                                ? Dc(l, v)
                                : p === "dangerouslySetInnerHTML"
                                ? Nc(l, v)
                                : p === "children"
                                ? Fr(l, v)
                                : Su(l, p, v, s);
                        }
                        switch (u) {
                            case "input":
                                Ri(l, o);
                                break;
                            case "textarea":
                                Pc(l, o);
                                break;
                            case "select":
                                var m = l._wrapperState.wasMultiple;
                                l._wrapperState.wasMultiple = !!o.multiple;
                                var k = o.value;
                                k != null
                                    ? An(l, !!o.multiple, k, !1)
                                    : m !== !!o.multiple &&
                                      (o.defaultValue != null
                                          ? An(
                                                l,
                                                !!o.multiple,
                                                o.defaultValue,
                                                !0
                                            )
                                          : An(
                                                l,
                                                !!o.multiple,
                                                o.multiple ? [] : "",
                                                !1
                                            ));
                        }
                        l[Wr] = o;
                    } catch (S) {
                        ue(e, e.return, S);
                    }
            }
            break;
        case 6:
            if ((be(t, e), ct(e), r & 4)) {
                if (e.stateNode === null) throw Error(C(162));
                (l = e.stateNode), (o = e.memoizedProps);
                try {
                    l.nodeValue = o;
                } catch (S) {
                    ue(e, e.return, S);
                }
            }
            break;
        case 3:
            if (
                (be(t, e),
                ct(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    Ar(t.containerInfo);
                } catch (S) {
                    ue(e, e.return, S);
                }
            break;
        case 4:
            be(t, e), ct(e);
            break;
        case 13:
            be(t, e),
                ct(e),
                (l = e.child),
                l.flags & 8192 &&
                    ((o = l.memoizedState !== null),
                    (l.stateNode.isHidden = o),
                    !o ||
                        (l.alternate !== null &&
                            l.alternate.memoizedState !== null) ||
                        (bu = ae())),
                r & 4 && js(e);
            break;
        case 22:
            if (
                ((p = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((Re = (s = Re) || p), be(t, e), (Re = s))
                    : be(t, e),
                ct(e),
                r & 8192)
            ) {
                if (
                    ((s = e.memoizedState !== null),
                    (e.stateNode.isHidden = s) && !p && (e.mode & 1) !== 0)
                )
                    for (L = e, p = e.child; p !== null; ) {
                        for (v = L = p; L !== null; ) {
                            switch (((m = L), (k = m.child), m.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Lr(4, m, m.return);
                                    break;
                                case 1:
                                    Un(m, m.return);
                                    var w = m.stateNode;
                                    if (
                                        typeof w.componentWillUnmount ==
                                        "function"
                                    ) {
                                        (r = m), (n = m.return);
                                        try {
                                            (t = r),
                                                (w.props = t.memoizedProps),
                                                (w.state = t.memoizedState),
                                                w.componentWillUnmount();
                                        } catch (S) {
                                            ue(r, n, S);
                                        }
                                    }
                                    break;
                                case 5:
                                    Un(m, m.return);
                                    break;
                                case 22:
                                    if (m.memoizedState !== null) {
                                        As(v);
                                        continue;
                                    }
                            }
                            k !== null ? ((k.return = m), (L = k)) : As(v);
                        }
                        p = p.sibling;
                    }
                e: for (p = null, v = e; ; ) {
                    if (v.tag === 5) {
                        if (p === null) {
                            p = v;
                            try {
                                (l = v.stateNode),
                                    s
                                        ? ((o = l.style),
                                          typeof o.setProperty == "function"
                                              ? o.setProperty(
                                                    "display",
                                                    "none",
                                                    "important"
                                                )
                                              : (o.display = "none"))
                                        : ((u = v.stateNode),
                                          (a = v.memoizedProps.style),
                                          (i =
                                              a != null &&
                                              a.hasOwnProperty("display")
                                                  ? a.display
                                                  : null),
                                          (u.style.display = Lc("display", i)));
                            } catch (S) {
                                ue(e, e.return, S);
                            }
                        }
                    } else if (v.tag === 6) {
                        if (p === null)
                            try {
                                v.stateNode.nodeValue = s
                                    ? ""
                                    : v.memoizedProps;
                            } catch (S) {
                                ue(e, e.return, S);
                            }
                    } else if (
                        ((v.tag !== 22 && v.tag !== 23) ||
                            v.memoizedState === null ||
                            v === e) &&
                        v.child !== null
                    ) {
                        (v.child.return = v), (v = v.child);
                        continue;
                    }
                    if (v === e) break e;
                    for (; v.sibling === null; ) {
                        if (v.return === null || v.return === e) break e;
                        p === v && (p = null), (v = v.return);
                    }
                    p === v && (p = null),
                        (v.sibling.return = v.return),
                        (v = v.sibling);
                }
            }
            break;
        case 19:
            be(t, e), ct(e), r & 4 && js(e);
            break;
        case 21:
            break;
        default:
            be(t, e), ct(e);
    }
}
function ct(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (rd(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(C(160));
            }
            switch (r.tag) {
                case 5:
                    var l = r.stateNode;
                    r.flags & 32 && (Fr(l, ""), (r.flags &= -33));
                    var o = Us(e);
                    iu(e, o, l);
                    break;
                case 3:
                case 4:
                    var i = r.stateNode.containerInfo,
                        u = Us(e);
                    ou(e, u, i);
                    break;
                default:
                    throw Error(C(161));
            }
        } catch (a) {
            ue(e, e.return, a);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function av(e, t, n) {
    (L = e), id(e);
}
function id(e, t, n) {
    for (var r = (e.mode & 1) !== 0; L !== null; ) {
        var l = L,
            o = l.child;
        if (l.tag === 22 && r) {
            var i = l.memoizedState !== null || El;
            if (!i) {
                var u = l.alternate,
                    a = (u !== null && u.memoizedState !== null) || Re;
                u = El;
                var s = Re;
                if (((El = i), (Re = a) && !s))
                    for (L = l; L !== null; )
                        (i = L),
                            (a = i.child),
                            i.tag === 22 && i.memoizedState !== null
                                ? Bs(l)
                                : a !== null
                                ? ((a.return = i), (L = a))
                                : Bs(l);
                for (; o !== null; ) (L = o), id(o), (o = o.sibling);
                (L = l), (El = u), (Re = s);
            }
            Is(e);
        } else
            (l.subtreeFlags & 8772) !== 0 && o !== null
                ? ((o.return = l), (L = o))
                : Is(e);
    }
}
function Is(e) {
    for (; L !== null; ) {
        var t = L;
        if ((t.flags & 8772) !== 0) {
            var n = t.alternate;
            try {
                if ((t.flags & 8772) !== 0)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            Re || Po(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !Re)
                                if (n === null) r.componentDidMount();
                                else {
                                    var l =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : et(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        l,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate
                                    );
                                }
                            var o = t.updateQueue;
                            o !== null && ks(t, o, r);
                            break;
                        case 3:
                            var i = t.updateQueue;
                            if (i !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                ks(t, i, n);
                            }
                            break;
                        case 5:
                            var u = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = u;
                                var a = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        a.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        a.src && (n.src = a.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var s = t.alternate;
                                if (s !== null) {
                                    var p = s.memoizedState;
                                    if (p !== null) {
                                        var v = p.dehydrated;
                                        v !== null && Ar(v);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(C(163));
                    }
                Re || (t.flags & 512 && lu(t));
            } catch (m) {
                ue(t, t.return, m);
            }
        }
        if (t === e) {
            L = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (L = n);
            break;
        }
        L = t.return;
    }
}
function As(e) {
    for (; L !== null; ) {
        var t = L;
        if (t === e) {
            L = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (L = n);
            break;
        }
        L = t.return;
    }
}
function Bs(e) {
    for (; L !== null; ) {
        var t = L;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Po(4, t);
                    } catch (a) {
                        ue(t, n, a);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var l = t.return;
                        try {
                            r.componentDidMount();
                        } catch (a) {
                            ue(t, l, a);
                        }
                    }
                    var o = t.return;
                    try {
                        lu(t);
                    } catch (a) {
                        ue(t, o, a);
                    }
                    break;
                case 5:
                    var i = t.return;
                    try {
                        lu(t);
                    } catch (a) {
                        ue(t, i, a);
                    }
            }
        } catch (a) {
            ue(t, t.return, a);
        }
        if (t === e) {
            L = null;
            break;
        }
        var u = t.sibling;
        if (u !== null) {
            (u.return = t.return), (L = u);
            break;
        }
        L = t.return;
    }
}
var sv = Math.ceil,
    io = Nt.ReactCurrentDispatcher,
    Zu = Nt.ReactCurrentOwner,
    Ge = Nt.ReactCurrentBatchConfig,
    Q = 0,
    ge = null,
    fe = null,
    ke = 0,
    Ie = 0,
    jn = bt(0),
    he = 0,
    Jr = null,
    mn = 0,
    _o = 0,
    qu = 0,
    Dr = null,
    Te = null,
    bu = 0,
    Zn = 1 / 0,
    yt = null,
    uo = !1,
    uu = null,
    Kt = null,
    Cl = !1,
    Bt = null,
    ao = 0,
    zr = 0,
    au = null,
    Ul = -1,
    jl = 0;
function Ne() {
    return (Q & 6) !== 0 ? ae() : Ul !== -1 ? Ul : (Ul = ae());
}
function Yt(e) {
    return (e.mode & 1) === 0
        ? 1
        : (Q & 2) !== 0 && ke !== 0
        ? ke & -ke
        : Km.transition !== null
        ? (jl === 0 && (jl = Hc()), jl)
        : ((e = Y),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Gc(e.type))),
          e);
}
function ot(e, t, n, r) {
    if (50 < zr) throw ((zr = 0), (au = null), Error(C(185)));
    br(e, n, r),
        ((Q & 2) === 0 || e !== ge) &&
            (e === ge && ((Q & 2) === 0 && (_o |= n), he === 4 && It(e, ke)),
            Ue(e, r),
            n === 1 &&
                Q === 0 &&
                (t.mode & 1) === 0 &&
                ((Zn = ae() + 500), Eo && en()));
}
function Ue(e, t) {
    var n = e.callbackNode;
    Kh(e, t);
    var r = Ql(e, e === ge ? ke : 0);
    if (r === 0)
        n !== null && Ga(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && Ga(n), t === 1))
            e.tag === 0 ? Qm($s.bind(null, e)) : mf($s.bind(null, e)),
                $m(function () {
                    (Q & 6) === 0 && en();
                }),
                (n = null);
        else {
            switch (Vc(r)) {
                case 1:
                    n = Ru;
                    break;
                case 4:
                    n = Bc;
                    break;
                case 16:
                    n = Wl;
                    break;
                case 536870912:
                    n = $c;
                    break;
                default:
                    n = Wl;
            }
            n = hd(n, ud.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function ud(e, t) {
    if (((Ul = -1), (jl = 0), (Q & 6) !== 0)) throw Error(C(327));
    var n = e.callbackNode;
    if (Wn() && e.callbackNode !== n) return null;
    var r = Ql(e, e === ge ? ke : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = so(e, r);
    else {
        t = r;
        var l = Q;
        Q |= 2;
        var o = sd();
        (ge !== e || ke !== t) && ((yt = null), (Zn = ae() + 500), an(e, t));
        do
            try {
                dv();
                break;
            } catch (u) {
                ad(e, u);
            }
        while (1);
        Iu(),
            (io.current = o),
            (Q = l),
            fe !== null ? (t = 0) : ((ge = null), (ke = 0), (t = he));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((l = Fi(e)), l !== 0 && ((r = l), (t = su(e, l)))),
            t === 1)
        )
            throw ((n = Jr), an(e, 0), It(e, r), Ue(e, ae()), n);
        if (t === 6) It(e, r);
        else {
            if (
                ((l = e.current.alternate),
                (r & 30) === 0 &&
                    !cv(l) &&
                    ((t = so(e, r)),
                    t === 2 &&
                        ((o = Fi(e)), o !== 0 && ((r = o), (t = su(e, o)))),
                    t === 1))
            )
                throw ((n = Jr), an(e, 0), It(e, r), Ue(e, ae()), n);
            switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(C(345));
                case 2:
                    nn(e, Te, yt);
                    break;
                case 3:
                    if (
                        (It(e, r),
                        (r & 130023424) === r &&
                            ((t = bu + 500 - ae()), 10 < t))
                    ) {
                        if (Ql(e, 0) !== 0) break;
                        if (((l = e.suspendedLanes), (l & r) !== r)) {
                            Ne(), (e.pingedLanes |= e.suspendedLanes & l);
                            break;
                        }
                        e.timeoutHandle = Vi(nn.bind(null, e, Te, yt), t);
                        break;
                    }
                    nn(e, Te, yt);
                    break;
                case 4:
                    if ((It(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, l = -1; 0 < r; ) {
                        var i = 31 - lt(r);
                        (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
                    }
                    if (
                        ((r = l),
                        (r = ae() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                ? 480
                                : 1080 > r
                                ? 1080
                                : 1920 > r
                                ? 1920
                                : 3e3 > r
                                ? 3e3
                                : 4320 > r
                                ? 4320
                                : 1960 * sv(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = Vi(nn.bind(null, e, Te, yt), r);
                        break;
                    }
                    nn(e, Te, yt);
                    break;
                case 5:
                    nn(e, Te, yt);
                    break;
                default:
                    throw Error(C(329));
            }
        }
    }
    return Ue(e, ae()), e.callbackNode === n ? ud.bind(null, e) : null;
}
function su(e, t) {
    var n = Dr;
    return (
        e.current.memoizedState.isDehydrated && (an(e, t).flags |= 256),
        (e = so(e, t)),
        e !== 2 && ((t = Te), (Te = n), t !== null && cu(t)),
        e
    );
}
function cu(e) {
    Te === null ? (Te = e) : Te.push.apply(Te, e);
}
function cv(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r],
                        o = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!it(o(), l)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function It(e, t) {
    for (
        t &= ~qu,
            t &= ~_o,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - lt(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function $s(e) {
    if ((Q & 6) !== 0) throw Error(C(327));
    Wn();
    var t = Ql(e, 0);
    if ((t & 1) === 0) return Ue(e, ae()), null;
    var n = so(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Fi(e);
        r !== 0 && ((t = r), (n = su(e, r)));
    }
    if (n === 1) throw ((n = Jr), an(e, 0), It(e, t), Ue(e, ae()), n);
    if (n === 6) throw Error(C(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        nn(e, Te, yt),
        Ue(e, ae()),
        null
    );
}
function ea(e, t) {
    var n = Q;
    Q |= 1;
    try {
        return e(t);
    } finally {
        (Q = n), Q === 0 && ((Zn = ae() + 500), Eo && en());
    }
}
function vn(e) {
    Bt !== null && Bt.tag === 0 && (Q & 6) === 0 && Wn();
    var t = Q;
    Q |= 1;
    var n = Ge.transition,
        r = Y;
    try {
        if (((Ge.transition = null), (Y = 1), e)) return e();
    } finally {
        (Y = r), (Ge.transition = n), (Q = t), (Q & 6) === 0 && en();
    }
}
function ta() {
    (Ie = jn.current), q(jn);
}
function an(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Bm(n)), fe !== null))
        for (n = fe.return; n !== null; ) {
            var r = n;
            switch ((Fu(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && Jl();
                    break;
                case 3:
                    Gn(), q(Oe), q(Pe), Wu();
                    break;
                case 5:
                    Vu(r);
                    break;
                case 4:
                    Gn();
                    break;
                case 13:
                    q(le);
                    break;
                case 19:
                    q(le);
                    break;
                case 10:
                    Au(r.type._context);
                    break;
                case 22:
                case 23:
                    ta();
            }
            n = n.return;
        }
    if (
        ((ge = e),
        (fe = e = Xt(e.current, null)),
        (ke = Ie = t),
        (he = 0),
        (Jr = null),
        (qu = _o = mn = 0),
        (Te = Dr = null),
        on !== null)
    ) {
        for (t = 0; t < on.length; t++)
            if (((n = on[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var l = r.next,
                    o = n.pending;
                if (o !== null) {
                    var i = o.next;
                    (o.next = l), (r.next = i);
                }
                n.pending = r;
            }
        on = null;
    }
    return e;
}
function ad(e, t) {
    do {
        var n = fe;
        try {
            if ((Iu(), (Ml.current = oo), lo)) {
                for (var r = oe.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null), (r = r.next);
                }
                lo = !1;
            }
            if (
                ((hn = 0),
                (ve = pe = oe = null),
                (Nr = !1),
                (Yr = 0),
                (Zu.current = null),
                n === null || n.return === null)
            ) {
                (he = 1), (Jr = t), (fe = null);
                break;
            }
            e: {
                var o = e,
                    i = n.return,
                    u = n,
                    a = t;
                if (
                    ((t = ke),
                    (u.flags |= 32768),
                    a !== null &&
                        typeof a == "object" &&
                        typeof a.then == "function")
                ) {
                    var s = a,
                        p = u,
                        v = p.tag;
                    if (
                        (p.mode & 1) === 0 &&
                        (v === 0 || v === 11 || v === 15)
                    ) {
                        var m = p.alternate;
                        m
                            ? ((p.updateQueue = m.updateQueue),
                              (p.memoizedState = m.memoizedState),
                              (p.lanes = m.lanes))
                            : ((p.updateQueue = null),
                              (p.memoizedState = null));
                    }
                    var k = Ns(i);
                    if (k !== null) {
                        (k.flags &= -257),
                            Ls(k, i, u, o, t),
                            k.mode & 1 && _s(o, s, t),
                            (t = k),
                            (a = s);
                        var w = t.updateQueue;
                        if (w === null) {
                            var S = new Set();
                            S.add(a), (t.updateQueue = S);
                        } else w.add(a);
                        break e;
                    } else {
                        if ((t & 1) === 0) {
                            _s(o, s, t), na();
                            break e;
                        }
                        a = Error(C(426));
                    }
                } else if (ne && u.mode & 1) {
                    var _ = Ns(i);
                    if (_ !== null) {
                        (_.flags & 65536) === 0 && (_.flags |= 256),
                            Ls(_, i, u, o, t),
                            Uu(Jn(a, u));
                        break e;
                    }
                }
                (o = a = Jn(a, u)),
                    he !== 4 && (he = 2),
                    Dr === null ? (Dr = [o]) : Dr.push(o),
                    (o = i);
                do {
                    switch (o.tag) {
                        case 3:
                            (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                            var d = Qf(o, a, t);
                            Ss(o, d);
                            break e;
                        case 1:
                            u = a;
                            var c = o.type,
                                h = o.stateNode;
                            if (
                                (o.flags & 128) === 0 &&
                                (typeof c.getDerivedStateFromError ==
                                    "function" ||
                                    (h !== null &&
                                        typeof h.componentDidCatch ==
                                            "function" &&
                                        (Kt === null || !Kt.has(h))))
                            ) {
                                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                                var f = Kf(o, u, t);
                                Ss(o, f);
                                break e;
                            }
                    }
                    o = o.return;
                } while (o !== null);
            }
            fd(n);
        } catch (E) {
            (t = E), fe === n && n !== null && (fe = n = n.return);
            continue;
        }
        break;
    } while (1);
}
function sd() {
    var e = io.current;
    return (io.current = oo), e === null ? oo : e;
}
function na() {
    (he === 0 || he === 3 || he === 2) && (he = 4),
        ge === null ||
            ((mn & 268435455) === 0 && (_o & 268435455) === 0) ||
            It(ge, ke);
}
function so(e, t) {
    var n = Q;
    Q |= 2;
    var r = sd();
    (ge !== e || ke !== t) && ((yt = null), an(e, t));
    do
        try {
            fv();
            break;
        } catch (l) {
            ad(e, l);
        }
    while (1);
    if ((Iu(), (Q = n), (io.current = r), fe !== null)) throw Error(C(261));
    return (ge = null), (ke = 0), he;
}
function fv() {
    for (; fe !== null; ) cd(fe);
}
function dv() {
    for (; fe !== null && !jh(); ) cd(fe);
}
function cd(e) {
    var t = pd(e.alternate, e, Ie);
    (e.memoizedProps = e.pendingProps),
        t === null ? fd(e) : (fe = t),
        (Zu.current = null);
}
function fd(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), (t.flags & 32768) === 0)) {
            if (((n = lv(n, t, Ie)), n !== null)) {
                fe = n;
                return;
            }
        } else {
            if (((n = ov(n, t)), n !== null)) {
                (n.flags &= 32767), (fe = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (he = 6), (fe = null);
                return;
            }
        }
        if (((t = t.sibling), t !== null)) {
            fe = t;
            return;
        }
        fe = t = e;
    } while (t !== null);
    he === 0 && (he = 5);
}
function nn(e, t, n) {
    var r = Y,
        l = Ge.transition;
    try {
        (Ge.transition = null), (Y = 1), pv(e, t, n, r);
    } finally {
        (Ge.transition = l), (Y = r);
    }
    return null;
}
function pv(e, t, n, r) {
    do Wn();
    while (Bt !== null);
    if ((Q & 6) !== 0) throw Error(C(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(C(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var o = n.lanes | n.childLanes;
    if (
        (Yh(e, o),
        e === ge && ((fe = ge = null), (ke = 0)),
        ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
            Cl ||
            ((Cl = !0),
            hd(Wl, function () {
                return Wn(), null;
            })),
        (o = (n.flags & 15990) !== 0),
        (n.subtreeFlags & 15990) !== 0 || o)
    ) {
        (o = Ge.transition), (Ge.transition = null);
        var i = Y;
        Y = 1;
        var u = Q;
        (Q |= 4),
            (Zu.current = null),
            uv(e, n),
            od(n, e),
            Mm($i),
            (Kl = !!Bi),
            ($i = Bi = null),
            (e.current = n),
            av(n),
            Ih(),
            (Q = u),
            (Y = i),
            (Ge.transition = o);
    } else e.current = n;
    if (
        (Cl && ((Cl = !1), (Bt = e), (ao = l)),
        (o = e.pendingLanes),
        o === 0 && (Kt = null),
        $h(n.stateNode),
        Ue(e, ae()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (l = t[n]),
                r(l.value, { componentStack: l.stack, digest: l.digest });
    if (uo) throw ((uo = !1), (e = uu), (uu = null), e);
    return (
        (ao & 1) !== 0 && e.tag !== 0 && Wn(),
        (o = e.pendingLanes),
        (o & 1) !== 0 ? (e === au ? zr++ : ((zr = 0), (au = e))) : (zr = 0),
        en(),
        null
    );
}
function Wn() {
    if (Bt !== null) {
        var e = Vc(ao),
            t = Ge.transition,
            n = Y;
        try {
            if (((Ge.transition = null), (Y = 16 > e ? 16 : e), Bt === null))
                var r = !1;
            else {
                if (((e = Bt), (Bt = null), (ao = 0), (Q & 6) !== 0))
                    throw Error(C(331));
                var l = Q;
                for (Q |= 4, L = e.current; L !== null; ) {
                    var o = L,
                        i = o.child;
                    if ((L.flags & 16) !== 0) {
                        var u = o.deletions;
                        if (u !== null) {
                            for (var a = 0; a < u.length; a++) {
                                var s = u[a];
                                for (L = s; L !== null; ) {
                                    var p = L;
                                    switch (p.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Lr(8, p, o);
                                    }
                                    var v = p.child;
                                    if (v !== null) (v.return = p), (L = v);
                                    else
                                        for (; L !== null; ) {
                                            p = L;
                                            var m = p.sibling,
                                                k = p.return;
                                            if ((nd(p), p === s)) {
                                                L = null;
                                                break;
                                            }
                                            if (m !== null) {
                                                (m.return = k), (L = m);
                                                break;
                                            }
                                            L = k;
                                        }
                                }
                            }
                            var w = o.alternate;
                            if (w !== null) {
                                var S = w.child;
                                if (S !== null) {
                                    w.child = null;
                                    do {
                                        var _ = S.sibling;
                                        (S.sibling = null), (S = _);
                                    } while (S !== null);
                                }
                            }
                            L = o;
                        }
                    }
                    if ((o.subtreeFlags & 2064) !== 0 && i !== null)
                        (i.return = o), (L = i);
                    else
                        e: for (; L !== null; ) {
                            if (((o = L), (o.flags & 2048) !== 0))
                                switch (o.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Lr(9, o, o.return);
                                }
                            var d = o.sibling;
                            if (d !== null) {
                                (d.return = o.return), (L = d);
                                break e;
                            }
                            L = o.return;
                        }
                }
                var c = e.current;
                for (L = c; L !== null; ) {
                    i = L;
                    var h = i.child;
                    if ((i.subtreeFlags & 2064) !== 0 && h !== null)
                        (h.return = i), (L = h);
                    else
                        e: for (i = c; L !== null; ) {
                            if (((u = L), (u.flags & 2048) !== 0))
                                try {
                                    switch (u.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Po(9, u);
                                    }
                                } catch (E) {
                                    ue(u, u.return, E);
                                }
                            if (u === i) {
                                L = null;
                                break e;
                            }
                            var f = u.sibling;
                            if (f !== null) {
                                (f.return = u.return), (L = f);
                                break e;
                            }
                            L = u.return;
                        }
                }
                if (
                    ((Q = l),
                    en(),
                    pt && typeof pt.onPostCommitFiberRoot == "function")
                )
                    try {
                        pt.onPostCommitFiberRoot(yo, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            (Y = n), (Ge.transition = t);
        }
    }
    return !1;
}
function Hs(e, t, n) {
    (t = Jn(n, t)),
        (t = Qf(e, t, 1)),
        (e = Qt(e, t, 1)),
        (t = Ne()),
        e !== null && (br(e, 1, t), Ue(e, t));
}
function ue(e, t, n) {
    if (e.tag === 3) Hs(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Hs(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (Kt === null || !Kt.has(r)))
                ) {
                    (e = Jn(n, e)),
                        (e = Kf(t, e, 1)),
                        (t = Qt(t, e, 1)),
                        (e = Ne()),
                        t !== null && (br(t, 1, e), Ue(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function hv(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = Ne()),
        (e.pingedLanes |= e.suspendedLanes & n),
        ge === e &&
            (ke & n) === n &&
            (he === 4 ||
            (he === 3 && (ke & 130023424) === ke && 500 > ae() - bu)
                ? an(e, 0)
                : (qu |= n)),
        Ue(e, t);
}
function dd(e, t) {
    t === 0 &&
        ((e.mode & 1) === 0
            ? (t = 1)
            : ((t = hl), (hl <<= 1), (hl & 130023424) === 0 && (hl = 4194304)));
    var n = Ne();
    (e = Pt(e, t)), e !== null && (br(e, t, n), Ue(e, n));
}
function mv(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), dd(e, n);
}
function vv(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                l = e.memoizedState;
            l !== null && (n = l.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(C(314));
    }
    r !== null && r.delete(t), dd(e, n);
}
var pd;
pd = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Oe.current) Me = !0;
        else {
            if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
                return (Me = !1), rv(e, t, n);
            Me = (e.flags & 131072) !== 0;
        }
    else (Me = !1), ne && (t.flags & 1048576) !== 0 && vf(t, bl, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            Fl(e, t), (e = t.pendingProps);
            var l = Kn(t, Pe.current);
            Vn(t, n), (l = Ku(null, t, r, e, l, n));
            var o = Yu();
            return (
                (t.flags |= 1),
                typeof l == "object" &&
                l !== null &&
                typeof l.render == "function" &&
                l.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Fe(r) ? ((o = !0), Zl(t)) : (o = !1),
                      (t.memoizedState =
                          l.state !== null && l.state !== void 0
                              ? l.state
                              : null),
                      $u(t),
                      (l.updater = Co),
                      (t.stateNode = l),
                      (l._reactInternals = t),
                      Ji(t, r, e, n),
                      (t = bi(null, t, r, !0, o, n)))
                    : ((t.tag = 0),
                      ne && o && Ou(t),
                      _e(null, t, l, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (Fl(e, t),
                    (e = t.pendingProps),
                    (l = r._init),
                    (r = l(r._payload)),
                    (t.type = r),
                    (l = t.tag = yv(r)),
                    (e = et(r, e)),
                    l)
                ) {
                    case 0:
                        t = qi(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Ts(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Ds(null, t, r, e, n);
                        break e;
                    case 14:
                        t = zs(null, t, r, et(r.type, e), n);
                        break e;
                }
                throw Error(C(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : et(r, l)),
                qi(e, t, r, l, n)
            );
        case 1:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : et(r, l)),
                Ts(e, t, r, l, n)
            );
        case 3:
            e: {
                if ((Jf(t), e === null)) throw Error(C(387));
                (r = t.pendingProps),
                    (o = t.memoizedState),
                    (l = o.element),
                    Sf(e, t),
                    no(t, r, null, n);
                var i = t.memoizedState;
                if (((r = i.element), o.isDehydrated))
                    if (
                        ((o = {
                            element: r,
                            isDehydrated: !1,
                            cache: i.cache,
                            pendingSuspenseBoundaries:
                                i.pendingSuspenseBoundaries,
                            transitions: i.transitions,
                        }),
                        (t.updateQueue.baseState = o),
                        (t.memoizedState = o),
                        t.flags & 256)
                    ) {
                        (l = Jn(Error(C(423)), t)), (t = Ms(e, t, r, n, l));
                        break e;
                    } else if (r !== l) {
                        (l = Jn(Error(C(424)), t)), (t = Ms(e, t, r, n, l));
                        break e;
                    } else
                        for (
                            Ae = Wt(t.stateNode.containerInfo.firstChild),
                                Be = t,
                                ne = !0,
                                rt = null,
                                n = Cf(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((Yn(), r === l)) {
                        t = _t(e, t, n);
                        break e;
                    }
                    _e(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                Rf(t),
                e === null && Yi(t),
                (r = t.type),
                (l = t.pendingProps),
                (o = e !== null ? e.memoizedProps : null),
                (i = l.children),
                Hi(r, l)
                    ? (i = null)
                    : o !== null && Hi(r, o) && (t.flags |= 32),
                Gf(e, t),
                _e(e, t, i, n),
                t.child
            );
        case 6:
            return e === null && Yi(t), null;
        case 13:
            return Zf(e, t, n);
        case 4:
            return (
                Hu(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = Xn(t, null, r, n)) : _e(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : et(r, l)),
                Ds(e, t, r, l, n)
            );
        case 7:
            return _e(e, t, t.pendingProps, n), t.child;
        case 8:
            return _e(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return _e(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (l = t.pendingProps),
                    (o = t.memoizedProps),
                    (i = l.value),
                    J(eo, r._currentValue),
                    (r._currentValue = i),
                    o !== null)
                )
                    if (it(o.value, i)) {
                        if (o.children === l.children && !Oe.current) {
                            t = _t(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            o = t.child, o !== null && (o.return = t);
                            o !== null;

                        ) {
                            var u = o.dependencies;
                            if (u !== null) {
                                i = o.child;
                                for (var a = u.firstContext; a !== null; ) {
                                    if (a.context === r) {
                                        if (o.tag === 1) {
                                            (a = Et(-1, n & -n)), (a.tag = 2);
                                            var s = o.updateQueue;
                                            if (s !== null) {
                                                s = s.shared;
                                                var p = s.pending;
                                                p === null
                                                    ? (a.next = a)
                                                    : ((a.next = p.next),
                                                      (p.next = a)),
                                                    (s.pending = a);
                                            }
                                        }
                                        (o.lanes |= n),
                                            (a = o.alternate),
                                            a !== null && (a.lanes |= n),
                                            Xi(o.return, n, t),
                                            (u.lanes |= n);
                                        break;
                                    }
                                    a = a.next;
                                }
                            } else if (o.tag === 10)
                                i = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (((i = o.return), i === null))
                                    throw Error(C(341));
                                (i.lanes |= n),
                                    (u = i.alternate),
                                    u !== null && (u.lanes |= n),
                                    Xi(i, n, t),
                                    (i = o.sibling);
                            } else i = o.child;
                            if (i !== null) i.return = o;
                            else
                                for (i = o; i !== null; ) {
                                    if (i === t) {
                                        i = null;
                                        break;
                                    }
                                    if (((o = i.sibling), o !== null)) {
                                        (o.return = i.return), (i = o);
                                        break;
                                    }
                                    i = i.return;
                                }
                            o = i;
                        }
                _e(e, t, l.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (l = t.type),
                (r = t.pendingProps.children),
                Vn(t, n),
                (l = Je(l)),
                (r = r(l)),
                (t.flags |= 1),
                _e(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (l = et(r, t.pendingProps)),
                (l = et(r.type, l)),
                zs(e, t, r, l, n)
            );
        case 15:
            return Yf(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (l = t.pendingProps),
                (l = t.elementType === r ? l : et(r, l)),
                Fl(e, t),
                (t.tag = 1),
                Fe(r) ? ((e = !0), Zl(t)) : (e = !1),
                Vn(t, n),
                xf(t, r, l),
                Ji(t, r, l, n),
                bi(null, t, r, !0, e, n)
            );
        case 19:
            return qf(e, t, n);
        case 22:
            return Xf(e, t, n);
    }
    throw Error(C(156, t.tag));
};
function hd(e, t) {
    return Ac(e, t);
}
function gv(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
                null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Xe(e, t, n, r) {
    return new gv(e, t, n, r);
}
function ra(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function yv(e) {
    if (typeof e == "function") return ra(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === xu)) return 11;
        if (e === Eu) return 14;
    }
    return 2;
}
function Xt(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Xe(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function Il(e, t, n, r, l, o) {
    var i = 2;
    if (((r = e), typeof e == "function")) ra(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else
        e: switch (e) {
            case _n:
                return sn(n.children, l, o, t);
            case ku:
                (i = 8), (l |= 8);
                break;
            case Si:
                return (
                    (e = Xe(12, n, t, l | 2)),
                    (e.elementType = Si),
                    (e.lanes = o),
                    e
                );
            case ki:
                return (
                    (e = Xe(13, n, t, l)),
                    (e.elementType = ki),
                    (e.lanes = o),
                    e
                );
            case xi:
                return (
                    (e = Xe(19, n, t, l)),
                    (e.elementType = xi),
                    (e.lanes = o),
                    e
                );
            case xc:
                return No(n, l, o, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case Sc:
                            i = 10;
                            break e;
                        case kc:
                            i = 9;
                            break e;
                        case xu:
                            i = 11;
                            break e;
                        case Eu:
                            i = 14;
                            break e;
                        case Ft:
                            (i = 16), (r = null);
                            break e;
                    }
                throw Error(C(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = Xe(i, n, t, l)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = o),
        t
    );
}
function sn(e, t, n, r) {
    return (e = Xe(7, e, r, t)), (e.lanes = n), e;
}
function No(e, t, n, r) {
    return (
        (e = Xe(22, e, r, t)),
        (e.elementType = xc),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function di(e, t, n) {
    return (e = Xe(6, e, null, t)), (e.lanes = n), e;
}
function pi(e, t, n) {
    return (
        (t = Xe(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function wv(e, t, n, r, l) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
                null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Yo(0)),
        (this.expirationTimes = Yo(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = Yo(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = l),
        (this.mutableSourceEagerHydrationData = null);
}
function la(e, t, n, r, l, o, i, u, a) {
    return (
        (e = new wv(e, t, n, u, a)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Xe(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        $u(o),
        e
    );
}
function Sv(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Pn,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function md(e) {
    if (!e) return Jt;
    e = e._reactInternals;
    e: {
        if (yn(e) !== e || e.tag !== 1) throw Error(C(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Fe(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(C(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Fe(n)) return hf(e, n, t);
    }
    return t;
}
function vd(e, t, n, r, l, o, i, u, a) {
    return (
        (e = la(n, r, !0, e, l, o, i, u, a)),
        (e.context = md(null)),
        (n = e.current),
        (r = Ne()),
        (l = Yt(n)),
        (o = Et(r, l)),
        (o.callback = t != null ? t : null),
        Qt(n, o, l),
        (e.current.lanes = l),
        br(e, l, r),
        Ue(e, r),
        e
    );
}
function Lo(e, t, n, r) {
    var l = t.current,
        o = Ne(),
        i = Yt(l);
    return (
        (n = md(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = Et(o, i)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Qt(l, t, i)),
        e !== null && (ot(e, l, i, o), Tl(e, l, i)),
        i
    );
}
function co(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function Vs(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function oa(e, t) {
    Vs(e, t), (e = e.alternate) && Vs(e, t);
}
function kv() {
    return null;
}
var gd =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function ia(e) {
    this._internalRoot = e;
}
Do.prototype.render = ia.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(C(409));
    Lo(e, t, null, null);
};
Do.prototype.unmount = ia.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        vn(function () {
            Lo(null, e, null, null);
        }),
            (t[Rt] = null);
    }
};
function Do(e) {
    this._internalRoot = e;
}
Do.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Kc();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < jt.length && t !== 0 && t < jt[n].priority; n++);
        jt.splice(n, 0, e), n === 0 && Xc(e);
    }
};
function ua(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function zo(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== " react-mount-point-unstable "))
    );
}
function Ws() {}
function xv(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var o = r;
            r = function () {
                var s = co(i);
                o.call(s);
            };
        }
        var i = vd(t, r, e, 0, null, !1, !1, "", Ws);
        return (
            (e._reactRootContainer = i),
            (e[Rt] = i.current),
            Hr(e.nodeType === 8 ? e.parentNode : e),
            vn(),
            i
        );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == "function") {
        var u = r;
        r = function () {
            var s = co(a);
            u.call(s);
        };
    }
    var a = la(e, 0, !1, null, null, !1, !1, "", Ws);
    return (
        (e._reactRootContainer = a),
        (e[Rt] = a.current),
        Hr(e.nodeType === 8 ? e.parentNode : e),
        vn(function () {
            Lo(t, a, n, r);
        }),
        a
    );
}
function To(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
        var i = o;
        if (typeof l == "function") {
            var u = l;
            l = function () {
                var a = co(i);
                u.call(a);
            };
        }
        Lo(t, i, e, l);
    } else i = xv(n, t, e, l, r);
    return co(i);
}
Wc = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Sr(t.pendingLanes);
                n !== 0 &&
                    (Pu(t, n | 1),
                    Ue(t, ae()),
                    (Q & 6) === 0 && ((Zn = ae() + 500), en()));
            }
            break;
        case 13:
            vn(function () {
                var r = Pt(e, 1);
                if (r !== null) {
                    var l = Ne();
                    ot(r, e, 1, l);
                }
            }),
                oa(e, 1);
    }
};
_u = function (e) {
    if (e.tag === 13) {
        var t = Pt(e, 134217728);
        if (t !== null) {
            var n = Ne();
            ot(t, e, 134217728, n);
        }
        oa(e, 134217728);
    }
};
Qc = function (e) {
    if (e.tag === 13) {
        var t = Yt(e),
            n = Pt(e, t);
        if (n !== null) {
            var r = Ne();
            ot(n, e, t, r);
        }
        oa(e, t);
    }
};
Kc = function () {
    return Y;
};
Yc = function (e, t) {
    var n = Y;
    try {
        return (Y = e), t();
    } finally {
        Y = n;
    }
};
Ti = function (e, t, n) {
    switch (t) {
        case "input":
            if ((Ri(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        "input[name=" +
                            JSON.stringify("" + t) +
                            '][type="radio"]'
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var l = xo(r);
                        if (!l) throw Error(C(90));
                        Cc(r), Ri(r, l);
                    }
                }
            }
            break;
        case "textarea":
            Pc(e, n);
            break;
        case "select":
            (t = n.value), t != null && An(e, !!n.multiple, t, !1);
    }
};
Mc = ea;
Oc = vn;
var Ev = { usingClientEntryPoint: !1, Events: [tl, zn, xo, zc, Tc, ea] },
    gr = {
        findFiberByHostInstance: ln,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom",
    },
    Cv = {
        bundleType: gr.bundleType,
        version: gr.version,
        rendererPackageName: gr.rendererPackageName,
        rendererConfig: gr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Nt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = jc(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: gr.findFiberByHostInstance || kv,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Rl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Rl.isDisabled && Rl.supportsFiber)
        try {
            (yo = Rl.inject(Cv)), (pt = Rl);
        } catch {}
}
He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ev;
He.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ua(t)) throw Error(C(200));
    return Sv(e, t, null, n);
};
He.createRoot = function (e, t) {
    if (!ua(e)) throw Error(C(299));
    var n = !1,
        r = "",
        l = gd;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = la(e, 1, !1, null, null, n, !1, r, l)),
        (e[Rt] = t.current),
        Hr(e.nodeType === 8 ? e.parentNode : e),
        new ia(t)
    );
};
He.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(C(188))
            : ((e = Object.keys(e).join(",")), Error(C(268, e)));
    return (e = jc(t)), (e = e === null ? null : e.stateNode), e;
};
He.flushSync = function (e) {
    return vn(e);
};
He.hydrate = function (e, t, n) {
    if (!zo(t)) throw Error(C(200));
    return To(null, e, t, !0, n);
};
He.hydrateRoot = function (e, t, n) {
    if (!ua(e)) throw Error(C(405));
    var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = "",
        i = gd;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (l = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        (t = vd(t, null, e, 1, n != null ? n : null, l, !1, o, i)),
        (e[Rt] = t.current),
        Hr(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (l = n._getVersion),
                (l = l(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, l])
                    : t.mutableSourceEagerHydrationData.push(n, l);
    return new Do(t);
};
He.render = function (e, t, n) {
    if (!zo(t)) throw Error(C(200));
    return To(null, e, t, !1, n);
};
He.unmountComponentAtNode = function (e) {
    if (!zo(e)) throw Error(C(40));
    return e._reactRootContainer
        ? (vn(function () {
              To(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[Rt] = null);
              });
          }),
          !0)
        : !1;
};
He.unstable_batchedUpdates = ea;
He.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!zo(n)) throw Error(C(200));
    if (e == null || e._reactInternals === void 0) throw Error(C(38));
    return To(e, t, n, !1, r);
};
He.version = "18.2.0-next-9e3b772b8-20220608";
(function (e) {
    function t() {
        if (
            !(
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
            )
        )
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
            } catch (n) {
                console.error(n);
            }
    }
    t(), (e.exports = He);
})(mc);
var yd,
    Qs = mc.exports;
(yd = Qs.createRoot), Qs.hydrateRoot;
const Rv = () => {
        const { id: e } = Yp();
        return $("div", { children: e });
    },
    Pv = hh([
        { path: "/", element: $(xh, {}) },
        { path: "/source-details/:id", element: $(Rv, {}) },
    ]);
function _v() {
    const e = document.querySelector("#app-container");
    if (!e) throw new Error("Can not find #app-container");
    yd(e).render($(ih, { router: Pv }));
}
_v();
