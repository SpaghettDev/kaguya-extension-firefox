(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4311, 8555],
    {
        68564: function (e) {
            function t(e) {
                (this.queue = []),
                    (this.timeslotRequests = 0),
                    (this.interceptors = { request: null, response: null }),
                    (this.handleRequest = this.handleRequest.bind(this)),
                    (this.handleResponse = this.handleResponse.bind(this)),
                    this.enable(e);
            }
            (t.prototype.getMaxRPS = function () {
                var e = this.perMilliseconds / 1e3;
                return this.maxRequests / e;
            }),
                (t.prototype.setMaxRPS = function (e) {
                    this.setRateLimitOptions({
                        maxRequests: e,
                        perMilliseconds: 1e3,
                    });
                }),
                (t.prototype.setRateLimitOptions = function (e) {
                    e.maxRPS
                        ? this.setMaxRPS(e.maxRPS)
                        : ((this.perMilliseconds = e.perMilliseconds),
                          (this.maxRequests = e.maxRequests));
                }),
                (t.prototype.enable = function (e) {
                    function t(e) {
                        return Promise.reject(e);
                    }
                    (this.interceptors.request = e.interceptors.request.use(
                        this.handleRequest,
                        t
                    )),
                        (this.interceptors.response =
                            e.interceptors.response.use(
                                this.handleResponse,
                                t
                            ));
                }),
                (t.prototype.handleRequest = function (e) {
                    return new Promise(
                        function (t) {
                            this.push({
                                resolve: function () {
                                    t(e);
                                },
                            });
                        }.bind(this)
                    );
                }),
                (t.prototype.handleResponse = function (e) {
                    return this.shift(), e;
                }),
                (t.prototype.push = function (e) {
                    this.queue.push(e), this.shiftInitial();
                }),
                (t.prototype.shiftInitial = function () {
                    setTimeout(
                        function () {
                            return this.shift();
                        }.bind(this),
                        0
                    );
                }),
                (t.prototype.shift = function () {
                    this.queue.length &&
                        (this.timeslotRequests !== this.maxRequests
                            ? (this.queue.shift().resolve(),
                              0 === this.timeslotRequests &&
                                  ((this.timeoutId = setTimeout(
                                      function () {
                                          (this.timeslotRequests = 0),
                                              this.shift();
                                      }.bind(this),
                                      this.perMilliseconds
                                  )),
                                  "function" === typeof this.timeoutId.unref &&
                                      0 === this.queue.length &&
                                      this.timeoutId.unref()),
                              (this.timeslotRequests += 1))
                            : this.timeoutId &&
                              "function" === typeof this.timeoutId.ref &&
                              this.timeoutId.ref());
                }),
                (e.exports = function (e, n) {
                    var r = new t(e);
                    return (
                        r.setRateLimitOptions(n),
                        (e.getMaxRPS = t.prototype.getMaxRPS.bind(r)),
                        (e.setMaxRPS = t.prototype.setMaxRPS.bind(r)),
                        (e.setRateLimitOptions =
                            t.prototype.setRateLimitOptions.bind(r)),
                        e
                    );
                });
        },
        25545: function (e, t, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                "/anime/watch/[...params]",
                function () {
                    return n(21948);
                },
            ]);
        },
        75593: function (e, t, n) {
            "use strict";
            var r = n(85893),
                i = n(67294);
            t.Z = function (e) {
                var t = e.children,
                    n = (0, i.useState)(!0),
                    o = n[0],
                    s = n[1],
                    a = (0, i.useState)(!1),
                    u = a[0],
                    c = a[1],
                    l = (0, i.useRef)(null),
                    d = (0, i.useRef)(null);
                return (
                    (0, i.useEffect)(function () {
                        d.current = new Date();
                        var e = function () {
                            var e;
                            new Date().getTime() - d.current.getTime() > 3e3
                                ? (c(!1), clearInterval(l.current), s(!1))
                                : (null === window ||
                                  void 0 === window ||
                                  null === (e = window.__kaguya__) ||
                                  void 0 === e
                                      ? void 0
                                      : e.extId) &&
                                  (c(!0), clearInterval(l.current), s(!1));
                        };
                        return (
                            (l.current = setInterval(e, 100)),
                            e(),
                            function () {
                                clearInterval(l.current);
                            }
                        );
                    }, []),
                    o
                        ? (0, r.jsx)("p", {
                              className: "text-3xl text-center",
                              children: "Checking...",
                          })
                        : (0, r.jsx)(i.Fragment, { children: t(u) })
                );
            };
        },
        85008: function (e, t, n) {
            "use strict";
            var r = n(85893),
                i = (n(67294), n(9008)),
                o = n.n(i),
                s = n(8151),
                a = n(11163),
                u = [
                    "/anime",
                    "/manga",
                    "/scene-search",
                    "/themes",
                    "/donate",
                    "/browse",
                ];
            t.Z = function (e) {
                var t = e.title,
                    n = void 0 === t ? "Kaguya" : t,
                    i = e.description,
                    c =
                        void 0 === i
                            ? "Welcome to Kaguya! Stream the latest anime series and manga anytime, anywhere, with new episodes and chapters added regularly."
                            : i,
                    l = e.image,
                    d =
                        void 0 === l
                            ? "https://small.fileditchstuff.me/s16/TWYgooKvPaNfpPairlF.png"
                            : l,
                    f = (0, a.useRouter)(),
                    m = f.asPath,
                    p = f.locale,
                    v = ""
                        .concat(s.o6)
                        .concat("en" === p ? "" : "/" + p)
                        .concat(m);
                return (0, r.jsxs)(o(), {
                    children: [
                        (0, r.jsx)("title", { children: n }),
                        (0, r.jsx)("link", {
                            rel: "manifest",
                            href: "/manifest.json",
                        }),
                        (0, r.jsx)("link", {
                            rel: "preconnect",
                            href: "https://fonts.googleapis.com/",
                        }),
                        (0, r.jsx)("link", {
                            rel: "dns-prefetch",
                            href: "https://fonts.googleapis.com/",
                        }),
                        (0, r.jsx)("meta", { name: "title", content: n }),
                        (0, r.jsx)("meta", { name: "description", content: c }),
                        !u.includes(m) &&
                            (0, r.jsx)("meta", {
                                name: "robots",
                                content: "noindex,follow",
                            }),
                        (0, r.jsx)("meta", {
                            property: "og:type",
                            content: "website",
                        }),
                        (0, r.jsx)("meta", { property: "og:url", content: v }),
                        (0, r.jsx)("meta", {
                            property: "og:title",
                            content: n,
                        }),
                        (0, r.jsx)("meta", {
                            property: "og:description",
                            content: c,
                        }),
                        (0, r.jsx)("meta", {
                            property: "og:image",
                            content: d,
                        }),
                        (0, r.jsx)("meta", {
                            property: "twitter:card",
                            content: "summary_large_image",
                        }),
                        (0, r.jsx)("meta", {
                            property: "twitter:url",
                            content: v,
                        }),
                        (0, r.jsx)("meta", {
                            property: "twitter:title",
                            content: n,
                        }),
                        (0, r.jsx)("meta", {
                            property: "twitter:description",
                            content: c,
                        }),
                        (0, r.jsx)("meta", {
                            property: "twitter:image",
                            content: d,
                        }),
                        (0, r.jsx)("meta", {
                            name: "mobile-web-app-capable",
                            content: "yes",
                        }),
                        (0, r.jsx)("meta", {
                            name: "apple-mobile-web-app-capable",
                            content: "yes",
                        }),
                        (0, r.jsx)("meta", {
                            name: "application-name",
                            content: "Kaguya",
                        }),
                        (0, r.jsx)("meta", {
                            name: "apple-mobile-web-app-title",
                            content: "Kaguya",
                        }),
                        (0, r.jsx)("meta", {
                            name: "theme-color",
                            content: "#EF4444",
                        }),
                        (0, r.jsx)("meta", {
                            name: "msapplication-navbutton-color",
                            content: "#EF4444",
                        }),
                        (0, r.jsx)("meta", {
                            name: "apple-mobile-web-app-status-bar-style",
                            content: "black-translucent",
                        }),
                        (0, r.jsx)("meta", {
                            name: "msapplication-starturl",
                            content: "/anime",
                        }),
                        (0, r.jsx)("link", { rel: "canonical", href: v }),
                        e.children,
                    ],
                });
            };
        },
        12639: function (e, t, n) {
            "use strict";
            var r = n(85893),
                i = n(67294),
                o = n(8193),
                s = function (e) {
                    var t = e.className,
                        n = void 0 === t ? "" : t,
                        i = "animate-spin text-primary-500";
                    return (
                        n.includes("w-") && n.includes("h-")
                            ? (i += " ".concat(n))
                            : (i += " h-16 w-16"),
                        (0, r.jsx)("div", {
                            className:
                                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            children: (0, r.jsx)(o.Z7b, { className: i }),
                        })
                    );
                };
            t.Z = i.memo(s);
        },
        20165: function (e, t, n) {
            "use strict";
            var r = n(47568),
                i = n(26042),
                o = n(10092),
                s = n(43835),
                a = n(3801),
                u = n(88767),
                c = n(72132),
                l = { animeId: null, extraData: {} },
                d = "use-episodes";
            t.Z = function (e, t, n) {
                return (0, u.useQuery)(
                    ["anime-id", e.id, t],
                    (0, r.Z)(function () {
                        var n, r, i, u;
                        return (0, o.__generator)(this, function (o) {
                            switch (o.label) {
                                case 0:
                                    return (
                                        console.log(
                                            "[web page] fetching anime id"
                                        ),
                                        (
                                            null === (n = (0, a.GE)(e.id, t)) ||
                                            void 0 === n
                                                ? void 0
                                                : n.mediaId
                                        )
                                            ? [
                                                  2,
                                                  {
                                                      animeId: n.mediaId,
                                                      extraData: n.extra,
                                                  },
                                              ]
                                            : (c.Am.loading(
                                                  "Fetching Anime ID...",
                                                  { toastId: d }
                                              ),
                                              [
                                                  4,
                                                  (0, s.b)("get-anime-id", {
                                                      sourceId: t,
                                                      anilist: e,
                                                  }),
                                              ])
                                    );
                                case 1:
                                    return (
                                        (r = o.sent()),
                                        (i = r.data),
                                        (u = r.extraData),
                                        i
                                            ? ((0, a.bI)(e.id, t, i, u),
                                              [2, { animeId: i, extraData: u }])
                                            : (c.Am.error(
                                                  "No anime id was found, please try again or try another source."
                                              ),
                                              c.Am.dismiss(d),
                                              [2, l])
                                    );
                            }
                        });
                    }),
                    (0, i.Z)(
                        {
                            onError: function (e) {
                                c.Am.error(e.message), c.Am.dismiss(d);
                            },
                            enabled: !!t,
                        },
                        n
                    )
                );
            };
        },
        88103: function (e, t, n) {
            "use strict";
            n.d(t, {
                Z: function () {
                    return j;
                },
            });
            var r = n(47568),
                i = n(26042),
                o = n(69396),
                s = n(828),
                a = n(10092),
                u = n(93293),
                c = n(42510),
                l = n(43835),
                d = n(29815),
                f = n(9669),
                m = n.n(f),
                p = n(68564),
                v = n.n(p)()(
                    m().create({ baseURL: "https://api.jikan.moe/v4" }),
                    { maxRPS: 1 }
                ),
                h = (function () {
                    var e = (0, r.Z)(function (e) {
                        var t, n;
                        return (0, a.__generator)(this, function (i) {
                            t = [];
                            try {
                                return (
                                    (n = (function () {
                                        var i = (0, r.Z)(function () {
                                            var r,
                                                i,
                                                o,
                                                s,
                                                u = arguments;
                                            return (0,
                                            a.__generator)(this, function (a) {
                                                switch (a.label) {
                                                    case 0:
                                                        return (
                                                            (r =
                                                                u.length > 0 &&
                                                                void 0 !== u[0]
                                                                    ? u[0]
                                                                    : 1),
                                                            [
                                                                4,
                                                                v.get(
                                                                    "/anime/"
                                                                        .concat(
                                                                            e,
                                                                            "/episodes?page="
                                                                        )
                                                                        .concat(
                                                                            r
                                                                        )
                                                                ),
                                                            ]
                                                        );
                                                    case 1:
                                                        return (
                                                            (s = a.sent().data),
                                                            (i = t).push.apply(
                                                                i,
                                                                (0, d.Z)(
                                                                    null ===
                                                                        s ||
                                                                        void 0 ===
                                                                            s
                                                                        ? void 0
                                                                        : s.data
                                                                )
                                                            ),
                                                            (
                                                                null === s ||
                                                                void 0 === s ||
                                                                null ===
                                                                    (o =
                                                                        s.pagination) ||
                                                                void 0 === o
                                                                    ? void 0
                                                                    : o.has_next_page
                                                            )
                                                                ? [2, n(r + 1)]
                                                                : [2, t]
                                                        );
                                                }
                                            });
                                        });
                                        return function () {
                                            return i.apply(this, arguments);
                                        };
                                    })()),
                                    [2, n(1)]
                                );
                            } catch (o) {
                                return [2, t];
                            }
                            return [2];
                        });
                    });
                    return function (t) {
                        return e.apply(this, arguments);
                    };
                })(),
                g = n(24181),
                x = n(11163),
                b = n(88767),
                y = n(72132),
                w = [],
                I = "use-episodes",
                j = function (e, t) {
                    var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : { animeId: null },
                        d = n.animeId,
                        f = n.extraData,
                        m = arguments.length > 3 ? arguments[3] : void 0,
                        p = (0, x.useRouter)().locale;
                    return (0, b.useQuery)(
                        ["episodes", e.id, t, d, p],
                        (0, r.Z)(function () {
                            var n, r, m, v, x, b;
                            return (0, a.__generator)(this, function (a) {
                                switch (a.label) {
                                    case 0:
                                        return (
                                            console.log(
                                                "[web page] fetching episodes"
                                            ),
                                            y.Am.update(I, {
                                                render: "Fetching episodes...",
                                                isLoading: !0,
                                            }),
                                            [
                                                4,
                                                (0, l.b)("get-episodes", {
                                                    animeId: d,
                                                    sourceId: t,
                                                    extraData: f,
                                                }),
                                            ]
                                        );
                                    case 1:
                                        return (
                                            null === (n = a.sent()) ||
                                            void 0 === n
                                                ? void 0
                                                : n.length
                                        )
                                            ? (y.Am.dismiss(I),
                                              (r = (0, c.rw)(n) || w),
                                              (m = [(0, g.Rm)(e, p)]),
                                              e.idMal && m.push(h(e.idMal)),
                                              [4, (0, u.Ts)(m)])
                                            : (y.Am.error(
                                                  "No episodes were found, please try again or try another source."
                                              ),
                                              [2, w]);
                                    case 2:
                                        return (
                                            (v = s.Z.apply(void 0, [
                                                a.sent(),
                                                2,
                                            ])),
                                            (x = v[0]),
                                            (b = v[1]),
                                            [
                                                2,
                                                r.map(function (e) {
                                                    var t =
                                                            null === x ||
                                                            void 0 === x
                                                                ? void 0
                                                                : x.find(
                                                                      function (
                                                                          t
                                                                      ) {
                                                                          return (
                                                                              t.episodeNumber ===
                                                                              (0,
                                                                              u.ur)(
                                                                                  e.number,
                                                                                  9999
                                                                              )
                                                                          );
                                                                      }
                                                                  ),
                                                        n =
                                                            null === b ||
                                                            void 0 === b
                                                                ? void 0
                                                                : b.find(
                                                                      function (
                                                                          t
                                                                      ) {
                                                                          return (
                                                                              t.mal_id ===
                                                                              (0,
                                                                              u.ur)(
                                                                                  e.number,
                                                                                  9999
                                                                              )
                                                                          );
                                                                      }
                                                                  );
                                                    return (0,
                                                    o.Z)((0, i.Z)({}, e), { thumbnail: e.thumbnail || (null === t || void 0 === t ? void 0 : t.image), title: e.title || (null === t || void 0 === t ? void 0 : t.title) || (null === n || void 0 === n ? void 0 : n.title), description: e.description || (null === t || void 0 === t ? void 0 : t.description), isFiller: e.isFiller || (null === n || void 0 === n ? void 0 : n.filler) });
                                                }),
                                            ]
                                        );
                                }
                            });
                        }),
                        (0, i.Z)(
                            {
                                onError: function (e) {
                                    y.Am.error(e.message), y.Am.dismiss(I);
                                },
                                enabled: !!d,
                            },
                            m
                        )
                    );
                };
        },
        94323: function (e, t, n) {
            "use strict";
            var r = n(86405),
                i = n(88767);
            t.Z = function (e) {
                return (0, i.useQuery)(["watched-episode", e], function () {
                    return (0, r.Tr)(e);
                });
            };
        },
        21948: function (e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, {
                    __N_SSG: function () {
                        return Q;
                    },
                    default: function () {
                        return U;
                    },
                });
            var r = n(85893),
                i = n(26042),
                o = n(69396),
                s = n(828),
                a = n(42106),
                u = n(85008),
                c = n(12639),
                l = n(61766),
                d = n(49057),
                f = n(49482),
                m = n(47568),
                p = n(10092),
                v = n(43835),
                h = n(88767),
                g = n(72132),
                x = function (e, t, n) {
                    return (0, h.useQuery)(
                        (function (e, t) {
                            return "server-".concat(t, "-").concat(e.id);
                        })(e, t),
                        (0, m.Z)(function () {
                            return (0, p.__generator)(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [
                                            4,
                                            (0, v.b)("get-video-servers", {
                                                episodeId: e.id,
                                                sourceId: t,
                                                extraData: e.extra,
                                            }),
                                        ];
                                    case 1:
                                        return [2, n.sent()];
                                }
                            });
                        }),
                        (0, i.Z)(
                            {
                                onError: function (e) {
                                    g.Am.error(e);
                                },
                            },
                            n
                        )
                    );
                },
                b = n(29815),
                y = function (e, t) {
                    return "source-".concat(t, "-").concat(e.id);
                },
                w = n(5357),
                I = n(86405),
                j = function () {
                    return (0, h.useMutation)(
                        (function () {
                            var e = (0, m.Z)(function (e) {
                                return (0, p.__generator)(this, function (t) {
                                    return [2, (0, I._j)(e)];
                                });
                            });
                            return function (t) {
                                return e.apply(this, arguments);
                            };
                        })()
                    );
                },
                _ = n(94323),
                E = n(93293),
                R = n(42510),
                N = n(38555),
                Z = n(48583),
                S = n(21538),
                M = n(5152),
                k = n.n(M),
                q = n(11163),
                T = n(67294),
                L = function (e) {
                    var t = e.errorMessage,
                        n = (0, S.$G)("anime_watch").t;
                    return (0, r.jsx)(l.Z, {
                        selector: ".netplayer-container",
                        children: (0, r.jsxs)("div", {
                            className:
                                "text-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-4",
                            children: [
                                (0, r.jsx)("p", {
                                    className:
                                        "text-xl md:text-4xl font-semibold",
                                    children:
                                        "\uff61\u309c(\uff40\u0414\xb4)\u309c\uff61",
                                }),
                                (0, r.jsx)("p", {
                                    className: "text-sm md:text-xl",
                                    children: n("error_message", { error: t }),
                                }),
                                (0, r.jsx)("p", {
                                    className: "text-sm md:text-lg",
                                    children: n("error_fallback_suggest"),
                                }),
                            ],
                        }),
                    });
                },
                P = T.memo(L),
                D = k()(
                    function () {
                        return Promise.all([
                            n.e(9866),
                            n.e(2013),
                            n.e(216),
                            n.e(6893),
                            n.e(4949),
                            n.e(3254),
                            n.e(4704),
                            n.e(3019),
                        ]).then(n.bind(n, 3019));
                    },
                    {
                        loadableGenerated: {
                            webpack: function () {
                                return [3019];
                            },
                        },
                        ssr: !1,
                    }
                ),
                F = [{ file: { url: "https://cdn.plyr.io/static/blank.mp4" } }];
            T.memo(
                T.forwardRef(function (e, t) {
                    return (0,
                    r.jsx)(D, (0, o.Z)((0, i.Z)({}, e), { videoRef: t }));
                })
            ).displayName = "ForwardRefPlayer";
            var A = function (e) {
                    var t,
                        n = e.episodes,
                        o = e.media,
                        I = e.sourceId,
                        M = (0, T.useRef)(null),
                        k = (0, q.useRouter)(),
                        L = (0, T.useState)(!1),
                        D = L[0],
                        A = L[1],
                        O = (0, T.useState)(!1),
                        C = O[0],
                        J = O[1],
                        G = (0, T.useState)(""),
                        K = G[0],
                        Q = G[1],
                        U = (0, s.Z)((0, Z.KO)(f.c2), 2),
                        $ = U[0],
                        W = U[1],
                        Y = (0, T.useRef)(null),
                        z = j(),
                        X = (0, w.Z)(o).mutate,
                        V = (0, T.useRef)(null),
                        B = (0, T.useRef)([]),
                        H = (0, T.useRef)(!1),
                        ee = (0, Z.Dv)(d.on),
                        te = (0, S.$G)("anime_watch").t,
                        ne = k.query.params,
                        re = (0, T.useMemo)(
                            function () {
                                return (0, R.rw)(n || []);
                            },
                            [n]
                        ),
                        ie = (0, s.Z)(ne, 3),
                        oe = ie[0],
                        se = (ie[1], ie[2]),
                        ae = void 0 === se ? re[0].id : se,
                        ue = (0, _.Z)(Number(oe)),
                        ce = ue.data,
                        le = ue.isLoading,
                        de = ue.isError,
                        fe = ue.refetch,
                        me = (0, T.useMemo)(
                            function () {
                                return de
                                    ? null
                                    : re.find(function (e) {
                                          var t;
                                          return (
                                              e.id ===
                                              (null === ce ||
                                              void 0 === ce ||
                                              null === (t = ce.episode) ||
                                              void 0 === t
                                                  ? void 0
                                                  : t.id)
                                          );
                                      });
                            },
                            [
                                de,
                                re,
                                null === ce ||
                                void 0 === ce ||
                                null === (t = ce.episode) ||
                                void 0 === t
                                    ? void 0
                                    : t.id,
                            ]
                        ),
                        pe = (0, T.useMemo)(
                            function () {
                                var e = n.find(function (e) {
                                    return e.id === ae;
                                });
                                return (
                                    e ||
                                    (g.Am.error(
                                        "The requested episode was not found. It's either deleted or doesn't exist."
                                    ),
                                    n[0])
                                );
                            },
                            [ae, n]
                        ),
                        ve = (0, T.useMemo)(
                            function () {
                                return n.filter(function (e) {
                                    return (
                                        e.section ===
                                        (null === pe || void 0 === pe
                                            ? void 0
                                            : pe.section)
                                    );
                                });
                            },
                            [
                                null === pe || void 0 === pe
                                    ? void 0
                                    : pe.section,
                                n,
                            ]
                        ),
                        he = (0, T.useMemo)(
                            function () {
                                return ve.findIndex(function (e) {
                                    return e.id === ae;
                                });
                            },
                            [ae, ve]
                        ),
                        ge = (0, T.useMemo)(
                            function () {
                                return n.findIndex(function (e) {
                                    return e.id === ae;
                                });
                            },
                            [ae, n]
                        ),
                        xe = (0, T.useMemo)(
                            function () {
                                var e = function (t, r) {
                                    var i = ve[t + 1] || n[r + 1],
                                        o = (0, N.$8)("skipFillers");
                                    return o
                                        ? (console.log(
                                              null === i || void 0 === i
                                                  ? void 0
                                                  : i.isFiller,
                                              o,
                                              i
                                          ),
                                          (
                                              null === i || void 0 === i
                                                  ? void 0
                                                  : i.isFiller
                                          )
                                              ? e(t + 1, r + 1)
                                              : i)
                                        : i;
                                };
                                return e(he, ge);
                            },
                            [ge, he, n, ve]
                        ),
                        be = (0, T.useCallback)(
                            function (e) {
                                e &&
                                    k.replace(
                                        "/anime/watch/"
                                            .concat(oe, "/")
                                            .concat(I, "/")
                                            .concat(e.id),
                                        null,
                                        { shallow: !0 }
                                    );
                            },
                            [oe, k, I]
                        ),
                        ye = x(pe, I),
                        we = ye.data,
                        Ie = ye.isLoading,
                        je = (0, T.useMemo)(
                            function () {
                                return (
                                    !Ie &&
                                    !!$ &&
                                    (!V.current || (0, E.fg)(V.current, $))
                                );
                            },
                            [$, Ie]
                        ),
                        _e = (function (e, t, n, r) {
                            return (0, h.useQuery)(
                                [y(e, t), n],
                                (0, m.Z)(function () {
                                    var e, r, i, o, s, a, u, c;
                                    return (0,
                                    p.__generator)(this, function (l) {
                                        switch (l.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    (0, v.b)(
                                                        "get-video-container",
                                                        {
                                                            videoServer: n,
                                                            extraData:
                                                                n.extraData,
                                                            sourceId: t,
                                                        }
                                                    ),
                                                ];
                                            case 1:
                                                return (
                                                    null === (o = l.sent()) ||
                                                    void 0 === o ||
                                                    null === (e = o.videos) ||
                                                    void 0 === e
                                                        ? void 0
                                                        : e.length
                                                )
                                                    ? ((s =
                                                          o.videos.map(
                                                              function (e) {
                                                                  return e.file;
                                                              }
                                                          ) || []),
                                                      (a =
                                                          (null ===
                                                              (r =
                                                                  o.subtitles) ||
                                                          void 0 === r
                                                              ? void 0
                                                              : r.map(function (
                                                                    e
                                                                ) {
                                                                    return e.file;
                                                                })) || []),
                                                      (u =
                                                          (null ===
                                                              (i = o.fonts) ||
                                                          void 0 === i
                                                              ? void 0
                                                              : i.map(function (
                                                                    e
                                                                ) {
                                                                    return e.file;
                                                                })) || []),
                                                      (
                                                          null ===
                                                              (c = (0, b.Z)(s)
                                                                  .concat(
                                                                      (0, b.Z)(
                                                                          a
                                                                      ),
                                                                      (0, b.Z)(
                                                                          u
                                                                      )
                                                                  )
                                                                  .filter(
                                                                      function (
                                                                          e
                                                                      ) {
                                                                          return e.headers;
                                                                      }
                                                                  )) ||
                                                          void 0 === c
                                                              ? void 0
                                                              : c.length
                                                      )
                                                          ? [
                                                                4,
                                                                (0, v.b)(
                                                                    "update-rules",
                                                                    {
                                                                        fileUrls:
                                                                            c,
                                                                    }
                                                                ),
                                                            ]
                                                          : [3, 3])
                                                    : [
                                                          2,
                                                          {
                                                              videos: [],
                                                              subtitles: [],
                                                              fonts: [],
                                                          },
                                                      ];
                                            case 2:
                                                l.sent(), (l.label = 3);
                                            case 3:
                                                return [2, o];
                                        }
                                    });
                                }),
                                (0, i.Z)(
                                    {
                                        onError: function (e) {
                                            g.Am.error(e);
                                        },
                                        enabled: !!(null === n || void 0 === n
                                            ? void 0
                                            : n.name),
                                    },
                                    r
                                )
                            );
                        })(pe, I, $, { enabled: je }),
                        Ee = _e.data,
                        Re = _e.isLoading,
                        Ne = _e.isError,
                        Ze = _e.error;
                    (0, T.useEffect)(
                        function () {
                            if (Ie) W(null);
                            else if (
                                null === we || void 0 === we
                                    ? void 0
                                    : we.length
                            ) {
                                var e =
                                        localStorage.getItem(
                                            "kaguya_last_server"
                                        ),
                                    t = we[0];
                                if (e) {
                                    var n = we.find(function (t) {
                                        return t.name === e;
                                    });
                                    n && (t = n);
                                }
                                W(t);
                            }
                        },
                        [we, W, Ie]
                    ),
                        (0, T.useEffect)(
                            function () {
                                (0, E.fg)(B.current, we) || (V.current = $),
                                    (B.current = we);
                            },
                            [$, we]
                        ),
                        (0, T.useEffect)(
                            function () {
                                (null === $ || void 0 === $
                                    ? void 0
                                    : $.name) &&
                                    localStorage.setItem(
                                        "kaguya_last_server",
                                        $.name
                                    );
                            },
                            [$]
                        ),
                        (0, T.useEffect)(
                            function () {
                                Q(null);
                            },
                            [we]
                        ),
                        (0, T.useEffect)(
                            function () {
                                fe();
                            },
                            [fe]
                        ),
                        (0, T.useEffect)(
                            function () {
                                pe.id &&
                                    (!me ||
                                        le ||
                                        de ||
                                        C ||
                                        ((0, E.ur)(pe.number) >=
                                        (0, E.ur)(
                                            null === me || void 0 === me
                                                ? void 0
                                                : me.number
                                        )
                                            ? J(!0)
                                            : A(!0)));
                            },
                            [pe.id, pe.number, pe.title, C, de, le, me]
                        ),
                        (0, T.useEffect)(
                            function () {
                                var e = M.current;
                                if (e) {
                                    H.current = !1;
                                    var t = function () {
                                        if (H.current)
                                            return e.removeEventListener(
                                                "timeupdate",
                                                t
                                            );
                                        if (!(e.duration < 10)) {
                                            var n,
                                                r =
                                                    null !==
                                                        (n = (0, N.$8)(
                                                            "watchUpdateProgress"
                                                        )) && void 0 !== n
                                                        ? n
                                                        : 0.75;
                                            (null === e || void 0 === e
                                                ? void 0
                                                : e.currentTime) >=
                                                (null === e || void 0 === e
                                                    ? void 0
                                                    : e.duration) *
                                                    r &&
                                                ((H.current = !0),
                                                X({
                                                    progress: parseInt(
                                                        pe.number
                                                    ),
                                                    mediaId: Number(oe),
                                                }));
                                        }
                                    };
                                    return (
                                        e.addEventListener("timeupdate", t),
                                        function () {
                                            e.removeEventListener(
                                                "timeupdate",
                                                t
                                            );
                                        }
                                    );
                                }
                            },
                            [
                                null === pe || void 0 === pe
                                    ? void 0
                                    : pe.number,
                                oe,
                                M.current,
                            ]
                        ),
                        (0, T.useEffect)(
                            function () {
                                var e = M.current;
                                if (e) {
                                    var t = function () {
                                        Y.current && clearInterval(Y.current),
                                            (Y.current = setInterval(
                                                function () {
                                                    var e;
                                                    z.mutate({
                                                        episode: pe,
                                                        mediaId: Number(oe),
                                                        time:
                                                            null ===
                                                                (e =
                                                                    M.current) ||
                                                            void 0 === e
                                                                ? void 0
                                                                : e.currentTime,
                                                        sourceId: I,
                                                    });
                                                },
                                                3e4
                                            ));
                                    };
                                    return (
                                        e.addEventListener("canplay", t),
                                        function () {
                                            clearInterval(Y.current),
                                                e.removeEventListener(
                                                    "canplay",
                                                    t
                                                );
                                        }
                                    );
                                }
                            },
                            [oe, I, pe, M.current]
                        ),
                        (0, T.useEffect)(
                            function () {
                                var e = M.current;
                                if (e) {
                                    var t = setTimeout(function () {
                                            Q(
                                                "Video cannot be loaded (Timeout: 30 seconds)"
                                            );
                                        }, 3e4),
                                        n = function () {
                                            e.removeEventListener(
                                                "timeupdate",
                                                n
                                            ),
                                                clearTimeout(t),
                                                Q(null);
                                        },
                                        r = function () {
                                            e.addEventListener(
                                                "timeupdate",
                                                n,
                                                { once: !0 }
                                            );
                                        };
                                    return (
                                        e.addEventListener("canplay", r),
                                        function () {
                                            e.removeEventListener("canplay", r),
                                                clearTimeout(t);
                                        }
                                    );
                                }
                            },
                            [M.current]
                        ),
                        (0, T.useEffect)(
                            function () {
                                var e = M.current;
                                if (
                                    e &&
                                    (null === ce || void 0 === ce
                                        ? void 0
                                        : ce.time)
                                ) {
                                    var t = (0, E.ur)(
                                            null === me || void 0 === me
                                                ? void 0
                                                : me.number
                                        ),
                                        n = (0, E.ur)(
                                            null === pe || void 0 === pe
                                                ? void 0
                                                : pe.number
                                        );
                                    if (t && n && n === t) {
                                        var r = function () {
                                            var t = function () {
                                                setTimeout(function () {
                                                    e.currentTime = ce.time;
                                                }, 1e3),
                                                    e.removeEventListener(
                                                        "timeupdate",
                                                        t
                                                    );
                                            };
                                            e.addEventListener("timeupdate", t);
                                        };
                                        return (
                                            e.addEventListener(
                                                "loadedmetadata",
                                                r,
                                                { once: !0 }
                                            ),
                                            function () {
                                                e.removeEventListener(
                                                    "loadedmetadata",
                                                    r
                                                );
                                            }
                                        );
                                    }
                                }
                            },
                            [ce, pe, M.current]
                        ),
                        (0, T.useEffect)(function () {
                            var e;
                            null === (e = M.current) ||
                                void 0 === e ||
                                e.requestFullscreen();
                        }, []);
                    var Se = (0, T.useMemo)(
                            function () {
                                return (0, R.YQ)(o, {
                                    titleType: ee,
                                    locale: k.locale,
                                });
                            },
                            [o, ee, k.locale]
                        ),
                        Me = (0, T.useMemo)(
                            function () {
                                return (0, R.Eb)(o, { locale: k.locale });
                            },
                            [o, k.locale]
                        ),
                        ke = (0, T.useMemo)(
                            function () {
                                var e;
                                return (
                                    null === Ee ||
                                    void 0 === Ee ||
                                    null === (e = Ee.videos) ||
                                    void 0 === e
                                        ? void 0
                                        : e.length
                                )
                                    ? Ee.videos
                                    : F;
                            },
                            [null === Ee || void 0 === Ee ? void 0 : Ee.videos]
                        ),
                        qe = (0, T.useMemo)(
                            function () {
                                var e;
                                return (
                                    null === Ee ||
                                    void 0 === Ee ||
                                    null === (e = Ee.subtitles) ||
                                    void 0 === e
                                        ? void 0
                                        : e.length
                                )
                                    ? Ee.subtitles
                                    : [];
                            },
                            [
                                null === Ee || void 0 === Ee
                                    ? void 0
                                    : Ee.subtitles,
                            ]
                        ),
                        Te = (0, T.useMemo)(
                            function () {
                                var e;
                                return (
                                    null === Ee ||
                                    void 0 === Ee ||
                                    null === (e = Ee.fonts) ||
                                    void 0 === e
                                        ? void 0
                                        : e.length
                                )
                                    ? Ee.fonts
                                    : [];
                            },
                            [null === Ee || void 0 === Ee ? void 0 : Ee.fonts]
                        ),
                        Le = (0, T.useMemo)(
                            function () {
                                var e;
                                return (
                                    null === Ee ||
                                    void 0 === Ee ||
                                    null === (e = Ee.timestamps) ||
                                    void 0 === e
                                        ? void 0
                                        : e.length
                                )
                                    ? Ee.timestamps.filter(function (e) {
                                          return e.startTime < e.endTime;
                                      })
                                    : [];
                            },
                            [
                                null === Ee || void 0 === Ee
                                    ? void 0
                                    : Ee.timestamps,
                            ]
                        );
                    return (
                        (0, f.aG)({
                            playerState: {
                                ref: M,
                                sources: ke,
                                subtitles: qe,
                                className: "object-contain w-full h-full",
                                fonts: Te,
                                timestamps: Le,
                            },
                            playerProps: {
                                anime: o,
                                currentEpisode: pe,
                                currentEpisodeIndex: ge,
                                nextEpisode: xe,
                                episodes: re,
                                setEpisode: be,
                                sourceId: I,
                                sources: ke,
                                servers: we || [],
                            },
                        }),
                        (0, T.useEffect)(
                            function () {
                                o &&
                                    (document.querySelector(
                                        "#syncData"
                                    ).textContent = JSON.stringify({
                                        title: o.title.userPreferred,
                                        aniId: Number(oe),
                                        episode: (0, E.ur)(pe.number),
                                        id: oe,
                                        nextEpUrl: xe
                                            ? "/anime/watch/"
                                                  .concat(oe, "/")
                                                  .concat(I, "/")
                                                  .concat(xe.id)
                                            : null,
                                    }));
                            },
                            [o, oe, pe.number, xe, I]
                        ),
                        (0, T.useEffect)(
                            function () {
                                var e;
                                Ne
                                    ? Q(Ze.message)
                                    : (null === Ee || void 0 === Ee
                                          ? void 0
                                          : Ee.videos) &&
                                      (Re ||
                                          Ie ||
                                          (null === (e = Ee.videos) ||
                                          void 0 === e
                                              ? void 0
                                              : e.length) ||
                                          Q("Failed to extract streams"));
                            },
                            [
                                null === Ee || void 0 === Ee
                                    ? void 0
                                    : Ee.videos,
                                null === Ze || void 0 === Ze
                                    ? void 0
                                    : Ze.message,
                                Ne,
                                Re,
                                Ie,
                            ]
                        ),
                        (0, r.jsxs)(T.Fragment, {
                            children: [
                                (0, r.jsx)(u.Z, {
                                    title: ""
                                        .concat(Se, " (")
                                        .concat(pe.number, ") - Kaguya"),
                                    description: ""
                                        .concat(Me, ". Watch ")
                                        .concat(Se, " online for free."),
                                    image: o.bannerImage,
                                }),
                                (Re || Ie) &&
                                    (0, r.jsx)(l.Z, {
                                        retryInterval: 1e3,
                                        selector: ".netplayer-container",
                                        children: (0, r.jsx)(c.Z, {}),
                                    }),
                                K && (0, r.jsx)(P, { errorMessage: K }),
                                D &&
                                    !C &&
                                    (0, r.jsxs)(l.Z, {
                                        selector: ".netplayer-container",
                                        children: [
                                            (0, r.jsx)("div", {
                                                className:
                                                    "absolute inset-0 z-40 bg-black/70",
                                                onClick: function () {
                                                    A(!1), J(!0);
                                                },
                                            }),
                                            (0, r.jsxs)("div", {
                                                className:
                                                    "absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-2/3 p-8 rounded-md bg-background-900",
                                                children: [
                                                    (0, r.jsx)("h1", {
                                                        className:
                                                            "text-4xl font-bold mb-4",
                                                        children: te(
                                                            "rewatch_heading",
                                                            {
                                                                episodeName:
                                                                    me.number,
                                                            }
                                                        ),
                                                    }),
                                                    (0, r.jsx)("p", {
                                                        className: "",
                                                        children: te(
                                                            "rewatch_description",
                                                            {
                                                                episodeName:
                                                                    me.number,
                                                            }
                                                        ),
                                                    }),
                                                    (0, r.jsx)("p", {
                                                        className: "mb-4",
                                                        children: te(
                                                            "rewatch_question",
                                                            {
                                                                episodeName:
                                                                    me.number,
                                                            }
                                                        ),
                                                    }),
                                                    (0, r.jsxs)("div", {
                                                        className:
                                                            "flex items-center justify-end space-x-4",
                                                        children: [
                                                            (0, r.jsx)(a.Z, {
                                                                onClick:
                                                                    function () {
                                                                        A(!1),
                                                                            J(
                                                                                !0
                                                                            );
                                                                    },
                                                                className:
                                                                    "!bg-transparent hover:!bg-white/20 transition duration-300",
                                                                children: (0,
                                                                r.jsx)("p", {
                                                                    children:
                                                                        te(
                                                                            "rewatch_no"
                                                                        ),
                                                                }),
                                                            }),
                                                            (0, r.jsx)(a.Z, {
                                                                onClick:
                                                                    function () {
                                                                        return be(
                                                                            null ===
                                                                                ce ||
                                                                                void 0 ===
                                                                                    ce
                                                                                ? void 0
                                                                                : ce.episode
                                                                        );
                                                                    },
                                                                primary: !0,
                                                                children: (0,
                                                                r.jsx)("p", {
                                                                    children:
                                                                        te(
                                                                            "rewatch_yes"
                                                                        ),
                                                                }),
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                            ],
                        })
                    );
                },
                O = n(75593),
                C = n(59263),
                J = n(20165),
                G = n(88103),
                K = function (e) {
                    var t = e.media,
                        n = e.sourceId,
                        i = (0, J.Z)(t, n),
                        o = i.data,
                        s = i.isLoading,
                        l = (0, G.Z)(t, n, o),
                        f = l.data,
                        m = l.isLoading,
                        p = (0, C.k6)().back,
                        v = (0, S.$G)("anime_watch").t,
                        h = (0, Z.Dv)(d.on),
                        g = (0, q.useRouter)().locale,
                        x = (0, T.useMemo)(
                            function () {
                                return (0, R.YQ)(t, {
                                    titleType: h,
                                    locale: g,
                                });
                            },
                            [t, h, g]
                        ),
                        b = (0, T.useMemo)(
                            function () {
                                return (0, R.Eb)(t, { locale: g });
                            },
                            [t, g]
                        ),
                        y = (0, T.useMemo)(
                            function () {
                                return (
                                    (null === f || void 0 === f
                                        ? void 0
                                        : f.length) > 0
                                );
                            },
                            [f]
                        );
                    return (0, r.jsxs)(T.Fragment, {
                        children: [
                            (0, r.jsx)(u.Z, {
                                title: "".concat(x, " - Kaguya"),
                                description: ""
                                    .concat(b, ". Watch ")
                                    .concat(x, " online for free."),
                                image: t.bannerImage,
                            }),
                            (0, r.jsx)(O.Z, {
                                children: function (e) {
                                    return e
                                        ? m || s
                                            ? (0, r.jsx)("div", {
                                                  className:
                                                      "flex relative w-full min-h-screen",
                                                  children: (0, r.jsx)(c.Z, {}),
                                              })
                                            : y
                                            ? (0, r.jsx)(A, {
                                                  episodes: f,
                                                  media: t,
                                                  sourceId: n,
                                              })
                                            : (0, r.jsxs)("div", {
                                                  className:
                                                      "flex flex-col items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-4",
                                                  children: [
                                                      (0, r.jsx)("p", {
                                                          className:
                                                              "text-4xl font-semibold text-center",
                                                          children:
                                                              "\uff61\u309c(\uff40\u0414\xb4)\u309c\uff61",
                                                      }),
                                                      (0, r.jsx)("p", {
                                                          className:
                                                              "text-xl text-center",
                                                          children: v(
                                                              "error_message",
                                                              {
                                                                  error: v(
                                                                      "no_episodes_message"
                                                                  ),
                                                              }
                                                          ),
                                                      }),
                                                      (0, r.jsx)(a.Z, {
                                                          className:
                                                              "w-[max-content]",
                                                          primary: !0,
                                                          onClick: p,
                                                          children:
                                                              v("error_goback"),
                                                      }),
                                                  ],
                                              })
                                        : (0, r.jsx)("div", {
                                              className:
                                                  "w-full min-h-screen flex items-center justify-center",
                                              children:
                                                  "This page is not exist...",
                                          });
                                },
                            }),
                        ],
                    });
                };
            K.getLayout = function (e) {
                return e;
            };
            var Q = !0,
                U = K;
        },
        86405: function (e, t, n) {
            "use strict";
            n.d(t, {
                Tr: function () {
                    return s;
                },
                _j: function () {
                    return o;
                },
                nt: function () {
                    return i;
                },
            });
            var r = "kaguya_new";
            function i(e) {
                try {
                    var t = localStorage.getItem(r);
                    if (!t) return [];
                    var n = JSON.parse(t);
                    if (
                        !(null === n || void 0 === n
                            ? void 0
                            : n.watchedEpisodes)
                    )
                        return [];
                    var i = n.watchedEpisodes.sort(function (e, t) {
                        return (
                            new Date(t.updatedAt).getTime() -
                            new Date(e.updatedAt).getTime()
                        );
                    });
                    return e ? i.slice(0, e) : i;
                } catch (o) {
                    return (
                        console.error("Failed to get watched episodes", o), []
                    );
                }
            }
            function o(e) {
                var t = e.episode,
                    n = e.time,
                    o = e.mediaId,
                    s = e.sourceId,
                    a = i(),
                    u =
                        null === a || void 0 === a
                            ? void 0
                            : a.find(function (e) {
                                  return e.mediaId === o;
                              });
                u
                    ? ((u.time = n),
                      (u.episode = t),
                      (u.updatedAt = new Date()))
                    : a.push({
                          episode: t,
                          time: n,
                          mediaId: o,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                          sourceId: s,
                      }),
                    (function (e) {
                        var t = localStorage.getItem(r);
                        if (!t)
                            return void localStorage.setItem(
                                r,
                                JSON.stringify({ watchedEpisodes: e })
                            );
                        try {
                            var n = JSON.parse(t);
                            (n.watchedEpisodes = e),
                                localStorage.setItem(r, JSON.stringify(n));
                        } catch (i) {
                            console.error("save watched episodes", i);
                        }
                    })(a);
            }
            function s(e) {
                return i().find(function (t) {
                    return t.mediaId === e;
                });
            }
        },
        43835: function (e, t, n) {
            "use strict";
            n.d(t, {
                b: function () {
                    return s;
                },
            });
            var r,
                i = n(47568),
                o = n(10092);
            !(function (e) {
                (e.Request = "REQUEST"), (e.Response = "RESPONSE");
            })(r || (r = {}));
            var s = (function () {
                var e = (0, i.Z)(function (e, t) {
                    return (0, o.__generator)(this, function (n) {
                        return [
                            2,
                            new Promise(function (n, i) {
                                window.addEventListener("message", (event) => {
                                    if (event.data && event.data?.type === "extensionResponse") {
                                        const res = event.data.response;
                
                                        if (res?.type === "error") {
                                            console.error(res.error);
                                            i(new Error(res.error));
                                        } else {
                                            n(res.data);
                                        }
                                    }
                                });

                                var o,
                                    s =
                                        null === (o = window.__kaguya__) ||
                                        void 0 === o
                                            ? void 0
                                            : o.extId;
                                s ||
                                    i(
                                        new Error(
                                            "No extension ID is found, please check your extension again."
                                        )
                                    ),
                                    window.postMessage(
                                        { endpoint: e, data: t, type: r.Request },
                                        "https://kaguya.app/"
                                    );
                            }),
                        ];
                    });
                });
                return function (t, n) {
                    return e.apply(this, arguments);
                };
            })();
        },
        3801: function (e, t, n) {
            "use strict";
            n.d(t, {
                GE: function () {
                    return i;
                },
                bI: function () {
                    return o;
                },
            });
            var r = "kaguya_mapping";
            function i(e, t) {
                try {
                    return s().find(function (n) {
                        return (
                            (null === n || void 0 === n
                                ? void 0
                                : n.sourceId) === t && n.anilistId === e
                        );
                    });
                } catch (n) {
                    return console.error("Failed to get mapping", n), null;
                }
            }
            function o(e, t, n, i) {
                try {
                    var o = s(),
                        a = o.find(function (n) {
                            return (
                                (null === n || void 0 === n
                                    ? void 0
                                    : n.sourceId) === t && n.anilistId === e
                            );
                        });
                    return (
                        a
                            ? (a.mediaId = n)
                            : o.push({
                                  anilistId: e,
                                  sourceId: t,
                                  mediaId: n,
                                  extra: i,
                              }),
                        localStorage.setItem(r, JSON.stringify(o)),
                        !0
                    );
                } catch (u) {
                    return console.error("Failed to save mapping", u), !1;
                }
            }
            function s() {
                try {
                    var e = localStorage.getItem(r);
                    if (!e) return [];
                    var t = JSON.parse(e);
                    return (null === t || void 0 === t ? void 0 : t.length)
                        ? t
                        : [];
                } catch (n) {
                    return console.error("Failed to get mappings", n), [];
                }
            }
        },
        38555: function (e, t, n) {
            "use strict";
            n.d(t, {
                $8: function () {
                    return i;
                },
                o1: function () {
                    return o;
                },
            });
            var r = "kaguya_settings",
                i = function (e) {
                    var t = s();
                    return null === t || void 0 === t ? void 0 : t[e];
                },
                o = function (e, t) {
                    var n = s();
                    (n[e] = t), localStorage.setItem(r, JSON.stringify(n));
                },
                s = function () {
                    try {
                        return JSON.parse(localStorage.getItem(r)) || {};
                    } catch (e) {
                        return console.error(e), {};
                    }
                };
        },
        9008: function (e, t, n) {
            e.exports = n(5443);
        },
    },
    function (e) {
        e.O(0, [3415, 2510, 6110, 4181, 5357, 9774, 2888, 179], function () {
            return (t = 25545), e((e.s = t));
            var t;
        });
        var t = e.O();
        _N_E = t;
    },
]);
