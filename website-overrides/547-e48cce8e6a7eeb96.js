"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [547, 8555],
  {
    59942: function (e, n, t) {
      t.d(n, {
        Z: function () {
          return h;
        },
      });
      var r = t(85893),
        a = t(51649),
        i = t(66653),
        s = t(79386),
        l = t(94184),
        o = t.n(l),
        c = t(48827),
        u = t(85008),
        d = t(11163),
        m = t(5434),
        f = t(47516),
        x = [
          { name: "General", href: "/settings", icon: a.Fnt },
          { name: "Storage", href: "/settings/storage", icon: i.QC3 },
          { name: "Anime", href: "/settings/anime", icon: m.efm },
          { name: "Manga", href: "/settings/manga", icon: f.KbO },
        ];
      function h(e) {
        var n = e.children,
          t = (0, d.useRouter)();
        return (0, r.jsxs)(s.Z, {
          children: [
            (0, r.jsx)(u.Z, { title: "Settings" }),
            (0, r.jsxs)(c.Z, {
              className: "mx-auto pt-16 lg:flex lg:gap-x-16 lg:px-8",
              children: [
                (0, r.jsx)("aside", {
                  className:
                    "flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20",
                  children: (0, r.jsx)("nav", {
                    className: "flex-none px-4 sm:px-6 lg:px-0",
                    children: (0, r.jsx)("ul", {
                      role: "list",
                      className:
                        "flex gap-x-3 gap-y-2 whitespace-nowrap lg:flex-col",
                      children: x.map(function (e) {
                        var n = t.asPath === e.href;
                        return (0,
                        r.jsx)("li", { children: (0, r.jsxs)("a", { href: e.href, className: o()(n ? "bg-white/20 text-primary-300" : "bg-background-900 text-white hover:bg-white/20", "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"), children: [(0, r.jsx)(e.icon, { className: o()(n ? "text-primary-300" : "text-gray-100 group-hover:text-primary-300", "h-6 w-6 shrink-0"), "aria-hidden": "true" }), e.name] }) }, e.name);
                      }),
                    }),
                  }),
                }),
                (0, r.jsx)("main", {
                  className:
                    "min-h-screen px-4 py-16 sm:px-6 lg:flex-auto lg:px-4 lg:py-20",
                  children: (0, r.jsx)("div", {
                    className:
                      "h-full mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none text-white",
                    children: n,
                  }),
                }),
              ],
            }),
          ],
        });
      }
    },
    47621: function (e, n, t) {
      var r = t(85893),
        a = t(94184),
        i = t.n(a),
        s = t(46513),
        l = t(60153),
        o = t(21190),
        c = t(32192),
        u = t(67294),
        d = t(53990),
        m = t(61766),
        f = { enter: { opacity: 1 }, exit: { opacity: 0 } },
        x = { enter: { y: 0 }, exit: { y: "100%" } },
        h = { ease: [0.33, 1, 0.68, 1], duration: 0.6 },
        g = u.forwardRef(function (e, n) {
          var t = e.afterClose,
            a = e.children,
            g = e.className,
            v = e.onClose,
            p = e.visible,
            j = e.onOpen,
            b = (0, u.useState)(!1),
            y = b[0],
            N = b[1],
            w = function (e) {
              "visible" === e
                ? (N(!0), null === j || void 0 === j || j())
                : (N(!1), null === v || void 0 === v || v());
            };
          (0, u.useImperativeHandle)(n, function () {
            return {
              open: function () {
                w("visible");
              },
              close: function () {
                w("hidden");
              },
            };
          }),
            (0, u.useEffect)(
              function () {
                N(p);
              },
              [p]
            );
          var Z = (0, u.useRef)(),
            I = (0, u.useRef)(),
            C = (0, s._)(),
            k = (0, l.o)(),
            _ = function (e) {
              return e.classList.contains("bottom-sheet-scroll-handle");
            };
          return (0, r.jsx)(m.Z, {
            children: (0, r.jsx)(o.M, {
              exitBeforeEnter: !0,
              onExitComplete: t,
              children:
                y &&
                (0, r.jsxs)(r.Fragment, {
                  children: [
                    (0, r.jsx)(c.E.div, {
                      className: "z-20 fixed inset-0 bg-black/70",
                      initial: "exit",
                      animate: "enter",
                      exit: "exit",
                      variants: f,
                      transition: h,
                    }),
                    (0, r.jsx)(c.E.div, {
                      className:
                        "bottom-sheet-container flex items-end z-50 fixed inset-0 overflow-hidden",
                      initial: "exit",
                      animate: "enter",
                      exit: "exit",
                      variants: x,
                      transition: h,
                      onClick: function (e) {
                        e.target === e.currentTarget && w("hidden");
                      },
                      ref: I,
                      children: (0, r.jsxs)(c.E.div, {
                        onPan: function (e, n) {
                          var t = e.target;
                          if (!_(t)) {
                            var r = -n.delta.y;
                            I.current.scrollTop += r;
                          }
                        },
                        animate: C,
                        transition: h,
                        className: i()(
                          "relative mx-auto w-full h-4/6 bg-background-800 rounded-2xl",
                          g
                        ),
                        dragControls: k,
                        drag: "y",
                        onDragEnd: function (e, n) {
                          var t = Z.current.clientHeight;
                          n.velocity.y > 1500 ||
                          (n.velocity.y >= 0 && n.offset.y > t / 2.5)
                            ? (C.start({ y: "100%" }), w("hidden"))
                            : C.start({ y: 0 });
                        },
                        onDragStart: function (e, n) {
                          var t = e.target;
                          _(t) ||
                            k.componentControls.forEach(function (t) {
                              t.stop(e, n);
                            });
                        },
                        dragConstraints: { top: 0 },
                        dragElastic: 0.2,
                        ref: Z,
                        children: [
                          (0, r.jsx)("div", {
                            className:
                              "md:hidden bottom-sheet-scroll-handle absolute h-16 top-0 left-0 right-0 flex items-center justify-center bg-background-800",
                            children: (0, r.jsx)("div", {
                              className:
                                "w-16 h-1 bg-gray-500 rounded-full bottom-sheet-scroll-handle",
                            }),
                          }),
                          (0, r.jsx)("button", {
                            className:
                              "absolute top-2 right-2 rounded-full p-4",
                            onClick: function () {
                              return w("hidden");
                            },
                            children: (0, r.jsx)(d.sQZ, {
                              className:
                                "w-4 h-4 text-gray-700 dark:text-gray-300",
                            }),
                          }),
                          (0, r.jsx)("div", {
                            className:
                              "py-16 px-4 h-full overflow-auto bg-background-800",
                            children: a,
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
            }),
          });
        });
      (g.displayName = "BottomSheet"), (n.Z = g);
    },
    56092: function (e, n, t) {
      var r = t(85893),
        a = t(22302),
        i = t(42510),
        s = t(56172),
        l = t(11163),
        o = t(67294),
        c = t(93293),
        u = function (e) {
          var n = e.characterEdge,
            t = (0, l.useRouter)().locale;
          return (0, r.jsx)(s.Z, {
            href: (0, c.ue)(n.node),
            children: (0, r.jsx)("a", {
              children: (0, r.jsxs)("div", {
                className:
                  "text-gray-300 space-x-4 col-span-1 flex w-full h-24 bg-background-900 hover:bg-white/20 transtion duration-300",
                children: [
                  (0, r.jsx)("div", {
                    className: "relative h-full w-16",
                    children: (0, r.jsx)(a.Z, {
                      src: n.node.image.large,
                      fill: !0,
                      className: "object-cover",
                      alt: "".concat(n.node.name.userPreferred),
                    }),
                  }),
                  (0, r.jsxs)("div", {
                    className: "py-2 flex flex-col justify-between",
                    children: [
                      (0, r.jsx)("p", {
                        className: "font-semibold",
                        children: n.node.name.userPreferred,
                      }),
                      (0, r.jsx)("p", {
                        children: (0, i.OQ)(n.role, "characterRole", {
                          locale: t,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        };
      n.Z = o.memo(u);
    },
    75593: function (e, n, t) {
      var r = t(85893),
        a = t(67294);
      n.Z = function (e) {
        var n = e.children,
          t = (0, a.useState)(!0),
          i = t[0],
          s = t[1],
          l = (0, a.useState)(!1),
          o = l[0],
          c = l[1],
          u = (0, a.useRef)(null),
          d = (0, a.useRef)(null);
        return (
          (0, a.useEffect)(function () {
            d.current = new Date();
            var e = function () {
              var e;
              new Date().getTime() - d.current.getTime() > 3e3
                ? (c(!1), clearInterval(u.current), s(!1))
                : (null === window ||
                  void 0 === window ||
                  null === (e = window.__kaguya__) ||
                  void 0 === e
                    ? void 0
                    : e.extId) && (c(!0), clearInterval(u.current), s(!1));
            };
            return (
              (u.current = setInterval(e, 100)),
              e(),
              function () {
                clearInterval(u.current);
              }
            );
          }, []),
          i
            ? (0, r.jsx)("p", {
                className: "text-3xl text-center",
                children: "Checking...",
              })
            : (0, r.jsx)(a.Fragment, { children: n(o) })
        );
      };
    },
    67559: function (e, n, t) {
      var r = t(85893),
        a = (t(67294), t(22302));
      n.Z = function (e) {
        var n = e.image,
          t = e.children;
        return (0, r.jsxs)("div", {
          className: "relative z-0 w-full h-[200px] md:h-[400px]",
          children: [
            n &&
              (0, r.jsx)(a.Z, {
                src: n,
                fill: !0,
                style: { objectFit: "cover", objectPosition: "50% 35%" },
                alt: "Details banner",
              }),
            (0, r.jsx)("div", {
              className: "banner__overlay absolute inset-0 z-10",
            }),
            t,
          ],
        });
      };
    },
    35133: function (e, n, t) {
      var r = t(85893),
        a = t(94184),
        i = t.n(a);
      t(67294);
      n.Z = function (e) {
        var n = e.title,
          t = e.children,
          a = e.className,
          s = e.containerClassName;
        return (0, r.jsxs)("div", {
          className: i()("space-y-4", s),
          children: [
            (0, r.jsx)("p", {
              className: "font-semibold text-2xl",
              children: n,
            }),
            (0, r.jsx)("div", { className: i()(a), children: t }),
          ],
        });
      };
    },
    97597: function (e, n, t) {
      var r = t(85893),
        a = t(67294),
        i = t(42106),
        s = t(85518),
        l = t(8193),
        o = t(79352),
        c = t(56172);
      n.Z = function () {
        var e = (0, a.useMemo)(function () {
          return s.i7 ? l.CRw : s.un ? o.IyC : s.f0 ? o.JQX : null;
        }, []);
        return (0, r.jsxs)("div", {
          className: "flex flex-col justify-center items-center",
          children: [
            (0, r.jsxs)("p", {
              className: "text-2xl font-semibold text-center mb-2",
              children: ["Extension is not installed", " "],
            }),
            (0, r.jsx)("p", {
              className: "text-xl text-center mb-4",
              children:
                "The installation of the extension is now required to watch anime or read manga",
            }),
            (0, r.jsxs)("div", {
              className: "flex items-center gap-2 flex-wrap justify-center",
              children: [
                e
                  ? (0, r.jsx)("a", {
                      target: "_blank",
                      href: "https://chrome.google.com/webstore/detail/kaguya/jhinkdokgbijplmedcpkjdbcmjgockgc",
                      rel: "noreferrer",
                      children: (0, r.jsx)(i.Z, {
                        primary: !0,
                        outline: !0,
                        LeftIcon: e,
                        children: "Install from Chrome Web Store",
                      }),
                    })
                  : (0, r.jsx)(i.Z, {
                      primary: !0,
                      outline: !0,
                      children:
                        "Extension only available for Chromium-based browsers (Chrome, Edge, Opera)",
                    }),
                (0, r.jsx)(c.Z, {
                  href: "/extension-install",
                  children: (0, r.jsx)("a", {
                    children: (0, r.jsx)(i.Z, {
                      secondary: !0,
                      className: "underline underline-offset-4",
                      children: "Learn more",
                    }),
                  }),
                }),
              ],
            }),
          ],
        });
      };
    },
    49115: function (e, n, t) {
      var r = t(85893),
        a = t(94184),
        i = t.n(a);
      t(67294);
      n.Z = function (e) {
        var n = e.title,
          t = e.value,
          a = e.className;
        return t
          ? (0, r.jsxs)("div", {
              className: i()("text-gray-400", a),
              children: [
                (0, r.jsx)("p", { className: "font-semibold", children: n }),
                (0, r.jsx)("div", {
                  className:
                    "whitespace-pre-line flex flex-row md:flex-col gap-2",
                  children: t,
                }),
              ],
            })
          : null;
      };
    },
    578: function (e, n, t) {
      var r = t(26042),
        a = t(99534),
        i = t(85893),
        s = t(94184),
        l = t.n(s),
        o = t(67294),
        c = o.forwardRef(function (e, n) {
          var t = e.label,
            s = e.containerClassName,
            o = e.containerInputClassName,
            c = e.labelClassName,
            u = e.LeftIcon,
            d = e.RightIcon,
            m = e.className,
            f = (0, a.Z)(e, [
              "label",
              "containerClassName",
              "containerInputClassName",
              "labelClassName",
              "LeftIcon",
              "RightIcon",
              "className",
            ]);
          return (0,
          i.jsxs)("div", { className: s, children: [t && (0, i.jsx)("p", { className: l()("mb-2 font-semibold", c), children: t }), (0, i.jsxs)("div", { className: l()("shadow flex items-center space-x-2 bg-background-800 focus:ring focus:ring-primary-500 focus:shadow-outline rounded", u || d ? "px-3 py-2" : "py-1", o), children: [u && (0, i.jsx)(u, { className: "w-6 h-6" }), (0, i.jsx)("input", (0, r.Z)({ ref: n, className: l()("bg-transparent appearance-none w-full text-gray-300 focus:outline-none leading-tight", m) }, f)), d && (0, i.jsx)(d, { className: "w-6 h-6" })] })] });
        });
      (c.displayName = "Input"), (n.Z = o.memo(c));
    },
    12639: function (e, n, t) {
      var r = t(85893),
        a = t(67294),
        i = t(8193),
        s = function (e) {
          var n = e.className,
            t = void 0 === n ? "" : n,
            a = "animate-spin text-primary-500";
          return (
            t.includes("w-") && t.includes("h-")
              ? (a += " ".concat(t))
              : (a += " h-16 w-16"),
            (0, r.jsx)("div", {
              className:
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              children: (0, r.jsx)(i.Z7b, { className: a }),
            })
          );
        };
      n.Z = a.memo(s);
    },
    62756: function (e, n, t) {
      var r = t(26042),
        a = t(99534),
        i = t(85893),
        s = t(22302),
        l = t(94184),
        o = t.n(l),
        c = t(67294),
        u = function (e) {
          var n = e.className,
            t = (0, a.Z)(e, ["className"]);
          return (0, i.jsx)("div", {
            className: "relative aspect-w-2 aspect-h-3",
            children: (0, i.jsx)(
              s.Z,
              (0, r.Z)(
                {
                  quality: 80,
                  style: { objectFit: "cover" },
                  fill: !0,
                  className: o()("rounded-md", n),
                },
                t
              )
            ),
          });
        };
      n.Z = c.memo(u);
    },
    14176: function (e, n, t) {
      var r = t(85893),
        a = t(94184),
        i = t.n(a),
        s = t(67294),
        l = t(8193),
        o = function (e) {
          var n = e.className,
            t =
              (null === n || void 0 === n ? void 0 : n.includes("w-")) &&
              (null === n || void 0 === n ? void 0 : n.includes("h-"))
                ? n
                : i()("w-16 h-16 animate-spin text-primary-500", n);
          return (0, r.jsx)(l.Z7b, { className: t });
        };
      n.Z = s.memo(o);
    },
    68655: function (e, n, t) {
      t.d(n, {
        Z: function () {
          return R;
        },
      });
      var r = t(26042),
        a = t(85893),
        i = t(56852),
        s = t(67294),
        l = t(1552),
        o = t(85518),
        c = t(47568),
        u = t(10092),
        d = t(43835),
        m = t(88767),
        f = t(72132),
        x = function (e, n) {
          var t = e.anilist,
            a = e.mediaType,
            s = e.sourceId,
            l = e.query;
          return (0, m.useQuery)(
            ["source-search", t.id, s, a, l],
            (0, c.Z)(function () {
              var e;
              return (0, u.__generator)(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      (e = a === i.DD.Anime ? "search-anime" : "search-manga"),
                      [4, (0, d.b)(e, { sourceId: s, anilist: t, query: l })]
                    );
                  case 1:
                    return [2, n.sent()];
                }
              });
            }),
            (0, r.Z)(
              {
                onError: function (e) {
                  f.Am.error(e.message);
                },
              },
              n
            )
          );
        },
        h = t(20233),
        g = t(69396),
        v = t(99534),
        p = t(22302),
        j = t(94184),
        b = t.n(j),
        y = function (e) {
          var n = e.data,
            t = (0, v.Z)(e, ["data"]);
          return (0, a.jsxs)(
            "div",
            (0, g.Z)((0, r.Z)({ title: n.title }, t), {
              children: [
                (0, a.jsx)("div", {
                  className: b()("relative aspect-w-2 aspect-h-3"),
                  children: (0, a.jsx)(p.Z, {
                    src:
                      n.thumbnail ||
                      "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/default.jpg",
                    fill: !0,
                    unoptimized: !0,
                    className: "object-cover rounded-md",
                    alt: n.title,
                    quality: 80,
                  }),
                }),
                (0, a.jsx)("p", {
                  className: "mt-1 text-base font-semibold",
                  children: n.title,
                }),
              ],
            })
          );
        },
        N = s.memo(y),
        w = t(30337),
        Z = t(47621),
        I = t(578),
        C = t(8193),
        k = t(93293),
        _ = t(3801),
        E = t(21538),
        S = function (e) {
          var n = e.sourceId,
            t = e.mediaType,
            r = e.anilist,
            o = (0, s.useState)(!1),
            c = o[0],
            u = o[1],
            d = (0, s.useState)(""),
            f = d[0],
            g = d[1],
            v = (0, E.$G)("wrong_title").t,
            p = x(
              { anilist: r, sourceId: n, mediaType: t, query: f },
              { enabled: c }
            ),
            j = p.data,
            b = p.isLoading,
            y = p.isError,
            Z = p.error,
            S = (0, m.useQueryClient)(),
            D = (0, s.useRef)(null),
            R = (0, s.useCallback)(function () {
              var e;
              null === (e = D.current) || void 0 === e || e.open(), u(!0);
            }, []),
            A = (0, s.useCallback)(function () {
              u(!1);
            }, []),
            Q = (0, k.Ds)(function (e) {
              return g(e.target.value);
            }, 500),
            P = (0, s.useCallback)(
              function (e) {
                var a,
                  s =
                    t === i.DD.Anime
                      ? ["anime-id", r.id, n]
                      : ["manga-id", r.id, n],
                  l =
                    t === i.DD.Anime
                      ? { animeId: e.id, extraData: e.extra }
                      : { mangaId: e.id, extraData: e.extra };
                S.setQueryData(s, l),
                  (0, _.bI)(r.id, n, e.id, e.extra),
                  null === D ||
                    void 0 === D ||
                    null === (a = D.current) ||
                    void 0 === a ||
                    a.close();
              },
              [r.id, t, S, n]
            );
          return (0, a.jsxs)(s.Fragment, {
            children: [
              (0, a.jsx)("p", {
                onClick: R,
                className: "text-right cursor-pointer font-semibold underline",
                children: v("wrong_title_label"),
              }),
              (0, a.jsxs)(l.Z, {
                onClose: A,
                ref: D,
                children: [
                  (0, a.jsx)(I.Z, {
                    containerInputClassName: "border border-white/80",
                    LeftIcon: C.RB5,
                    onChange: Q,
                    defaultValue: null,
                    placeholder: r.title.english || r.title.romaji,
                  }),
                  (0, a.jsx)("h1", {
                    className: "font-semibold text-2xl my-8",
                    children: (0, a.jsx)(E.cC, {
                      t: v,
                      i18nKey: "search_results_heading",
                      defaults:
                        "Search result for: <italic>{{searchQuery}}</italic>",
                      values: {
                        searchQuery:
                          f ||
                          r.title.english ||
                          r.title.romaji ||
                          r.title.userPreferred,
                      },
                      components: {
                        italic: (0, a.jsx)("i", { className: "italic" }),
                      },
                    }),
                  }),
                  b
                    ? (0, a.jsx)(w.Z, {})
                    : y
                    ? (0, a.jsx)("p", {
                        className: "text-center font-bold text-2l",
                        children: (0, a.jsx)(E.cC, {
                          t: v,
                          i18nKey: "wrong_title_error",
                          defaults: "Something went wrong ({{errorMessage}})",
                          values: { errorMessage: Z.message },
                        }),
                      })
                    : (null === j || void 0 === j ? void 0 : j.length)
                    ? (0, a.jsx)(h.Z, {
                        data: j,
                        children: function (e) {
                          return (0, a.jsx)(N, {
                            className: "cursor-pointer",
                            data: e,
                            onClick: function () {
                              return P(e);
                            },
                          });
                        },
                      })
                    : (0, a.jsx)("p", {
                        className: "text-center font-bold text-2xl",
                        children: v("no_search_results"),
                      }),
                ],
              }),
            ],
          });
        },
        D = function (e) {
          var n = e.sourceId,
            t = e.mediaType,
            r = e.anilist,
            l = (0, s.useState)(!1),
            o = l[0],
            c = l[1],
            u = (0, s.useState)(""),
            d = u[0],
            f = u[1],
            g = x(
              { anilist: r, sourceId: n, mediaType: t, query: d },
              { enabled: o }
            ),
            v = g.data,
            p = g.isLoading,
            j = g.isError,
            b = g.error,
            y = (0, m.useQueryClient)(),
            _ = (0, s.useRef)(null),
            E = (0, s.useCallback)(function () {
              var e;
              null === (e = _.current) || void 0 === e || e.open(), c(!0);
            }, []),
            S = (0, s.useCallback)(function () {
              c(!1);
            }, []),
            D = (0, k.Ds)(function (e) {
              return f(e.target.value);
            }, 500),
            R = (0, s.useCallback)(
              function (e) {
                var a,
                  s =
                    t === i.DD.Anime
                      ? ["anime-id", r.id, n]
                      : ["manga-id", r.id, n],
                  l = t === i.DD.Anime ? { animeId: e.id } : { mangaId: e.id };
                y.setQueryData(s, l),
                  null === _ ||
                    void 0 === _ ||
                    null === (a = _.current) ||
                    void 0 === a ||
                    a.close();
              },
              [r.id, t, y, n]
            );
          return (0, a.jsxs)(s.Fragment, {
            children: [
              (0, a.jsx)("p", {
                onClick: E,
                className: "text-right cursor-pointer font-semibold underline",
                children: "Wrong title?",
              }),
              (0, a.jsxs)(Z.Z, {
                onClose: S,
                ref: _,
                children: [
                  (0, a.jsx)(I.Z, {
                    containerInputClassName: "border border-white/80",
                    LeftIcon: C.RB5,
                    onChange: D,
                    defaultValue: null,
                    placeholder: r.title.english || r.title.romaji,
                  }),
                  (0, a.jsxs)("h1", {
                    className: "font-semibold text-2xl my-8",
                    children: [
                      "Search result for:",
                      " ",
                      (0, a.jsx)("i", {
                        className: "italic",
                        children: d || r.title.english || r.title.romaji,
                      }),
                    ],
                  }),
                  p
                    ? (0, a.jsx)(w.Z, {})
                    : j
                    ? (0, a.jsxs)("p", {
                        className: "text-center font-bold text-xl",
                        children: ["Something went wrong (", b.message, ")"],
                      })
                    : (null === v || void 0 === v ? void 0 : v.length)
                    ? (0, a.jsx)(h.Z, {
                        data: v,
                        children: function (e) {
                          return (0, a.jsx)(N, {
                            className: "cursor-pointer",
                            data: e,
                            onClick: function () {
                              return R(e);
                            },
                          });
                        },
                      })
                    : (0, a.jsx)("p", {
                        className: "text-center font-bold text-xl",
                        children: "No results",
                      }),
                ],
              }),
            ],
          });
        },
        R = function (e) {
          return o.nI
            ? (0, a.jsx)(S, (0, r.Z)({}, e))
            : (0, a.jsx)(D, (0, r.Z)({}, e));
        };
    },
    81012: function (e, n, t) {
      var r = t(26042),
        a = t(85893),
        i = t(11163),
        s = t(67294);
      n.Z = function (e, n) {
        var t = function (t) {
          var l = (0, i.useRouter)(),
            o = (0, s.useMemo)(
              function () {
                return n(l, t);
              },
              [t, l]
            );
          return (
            (0, s.useEffect)(function () {
              if (o) {
                var e = o.url,
                  n = o.as,
                  t = o.options;
                l.replace(e, n, t);
              }
            }, []),
            (0, a.jsx)(e, (0, r.Z)({}, t))
          );
        };
        return (t.getInitialProps = e.getInitialProps), t;
      };
    },
    26005: function (e, n, t) {
      t.d(n, {
        P: function () {
          return r;
        },
      });
      var r,
        a = t(47568),
        i = t(10092),
        s = t(43835),
        l = t(88767),
        o = t(72132);
      !(function (e) {
        (e.Anime = "ANIME"), (e.Manga = "MANGA");
      })(r || (r = {}));
      n.Z = function (e) {
        return (0, l.useQuery)(
          ["sources", e],
          (0, a.Z)(function () {
            var n, t;
            return (0, i.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (n =
                      e === r.Anime
                        ? "get-anime-sources"
                        : "get-manga-sources"),
                    [4, (0, s.b)(n, null)]
                  );
                case 1:
                  return (
                    (null === (t = a.sent()) || void 0 === t
                      ? void 0
                      : t.length) ||
                      o.Am.error(
                        "No sources were found, please check again your extension."
                      ),
                    [2, t || []]
                  );
              }
            });
          })
        );
      };
    },
    43835: function (e, n, t) {
      t.d(n, {
        b: function () {
          return s;
        },
      });
      var r,
        a = t(47568),
        i = t(10092);
      !(function (e) {
        (e.Request = "REQUEST"), (e.Response = "RESPONSE");
      })(r || (r = {}));
      var s = (function () {
        var e = (0, a.Z)(function (e, n) {
          return (0, i.__generator)(this, function (t) {
            return [
              2,
              new Promise(function (t, a) {
                window.addEventListener("message", (event) => {
                    if (event.data && event.data?.type === "extensionResponse") {
                        const res = event.data.response;

                        if (res?.type === "error") {
                            console.error(res.error);
                            a(new Error(res.error));
                        } else {
                            t(res.data);
                        }
                    }
                });

                var i,
                s =
                null === (i = window.__kaguya__) || void 0 === i
                ? void 0
                : i.extId;
                s ||
                a(
                    new Error(
                        "No extension ID is found, please check your extension again."
                    )
                ),
                window.postMessage(
                    { endpoint: e, data: n, type: r.Request },
                    "https://kaguya.app/"
                );
              }),
            ];
          });
        });
        return function (n, t) {
          return e.apply(this, arguments);
        };
      })();
    },
    3801: function (e, n, t) {
      t.d(n, {
        GE: function () {
          return a;
        },
        bI: function () {
          return i;
        },
      });
      var r = "kaguya_mapping";
      function a(e, n) {
        try {
          return s().find(function (t) {
            return (
              (null === t || void 0 === t ? void 0 : t.sourceId) === n &&
              t.anilistId === e
            );
          });
        } catch (t) {
          return console.error("Failed to get mapping", t), null;
        }
      }
      function i(e, n, t, a) {
        try {
          var i = s(),
            l = i.find(function (t) {
              return (
                (null === t || void 0 === t ? void 0 : t.sourceId) === n &&
                t.anilistId === e
              );
            });
          return (
            l
              ? (l.mediaId = t)
              : i.push({ anilistId: e, sourceId: n, mediaId: t, extra: a }),
            localStorage.setItem(r, JSON.stringify(i)),
            !0
          );
        } catch (o) {
          return console.error("Failed to save mapping", o), !1;
        }
      }
      function s() {
        try {
          var e = localStorage.getItem(r);
          if (!e) return [];
          var n = JSON.parse(e);
          return (null === n || void 0 === n ? void 0 : n.length) ? n : [];
        } catch (t) {
          return console.error("Failed to get mappings", t), [];
        }
      }
    },
    38555: function (e, n, t) {
      t.d(n, {
        $8: function () {
          return a;
        },
        o1: function () {
          return i;
        },
      });
      var r = "kaguya_settings",
        a = function (e) {
          var n = s();
          return null === n || void 0 === n ? void 0 : n[e];
        },
        i = function (e, n) {
          var t = s();
          (t[e] = n), localStorage.setItem(r, JSON.stringify(t));
        },
        s = function () {
          try {
            return JSON.parse(localStorage.getItem(r)) || {};
          } catch (e) {
            return console.error(e), {};
          }
        };
    },
  },
]);
