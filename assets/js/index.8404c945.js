var fi = Object.defineProperty;
var hi = (e, t, r) =>
    t in e
        ? fi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (e[t] = r);
var Ne = (e, t, r) => (hi(e, typeof t != "symbol" ? t + "" : t, r), r);
class BaseAnimeMangaService {
    constructor({ id: t, isNSFW: r, languages: a, logo: n, name: s, url: u }) {
        Ne(this, "name");
        Ne(this, "url");
        Ne(this, "id");
        Ne(this, "isNSFW");
        Ne(this, "languages");
        Ne(this, "logo");
        Ne(this, "rules");
        (this.id = t),
            (this.isNSFW = r),
            (this.languages = a),
            (this.logo = n),
            (this.name = s),
            (this.url = u);
    }
    async search(t, r) {
        throw new Error("Method not implemented.");
    }
    async totalSearch(t, r) {
        var n, s;
        if (r) return this.search(r, t);
        const a = [
            ...new Set([
                (n = t == null ? void 0 : t.title) == null ? void 0 : n.english,
                (s = t == null ? void 0 : t.title) == null ? void 0 : s.romaji,
            ]),
        ];
        if (!(a != null && a.length)) return [];
        for (const u of a)
            try {
                const o = await this.search(u, t);
                if (!(o != null && o.length)) continue;
                return o;
            } catch (o) {
                console.error(o);
            }
        return [];
    }
}
class AnimeService extends BaseAnimeMangaService {
    constructor({ quality: r, ...a }) {
        var n;
        super(a);
        Ne(this, "quality");
        Ne(this, "isHardsubbed");
        (this.quality = r),
            (this.isHardsubbed = (n = a.isHardsubbed) != null ? n : !0);
    }
    async getAnimeId(r) {
        throw new Error("Method not implemented.");
    }
    async loadEpisodes(r, a) {
        throw new Error("Method not implemented.");
    }
    async loadVideoServers(r, a) {
        throw new Error("Method not implemented.");
    }
    async loadVideoContainer(r, a) {
        throw new Error("Method not implemented.");
    }
}
var ya = ((e) => (
    (e.HLS = "hls"), (e.DASH = "dash"), (e.CONTAINER = "container"), e
))(ya || {});
const ge = (e, t, r) => {
    let a = [];
    return (a = e.split(t)), (a = a[1].split(r)), a[0];
};
function Ei(e) {
    const t = [];
    for (const r in e)
        if (e.hasOwnProperty(r)) {
            const a = e[r];
            Array.isArray(a)
                ? a.forEach((n) => {
                      t.push(
                          `${encodeURIComponent(r)}=${encodeURIComponent(n)}`
                      );
                  })
                : t.push(`${encodeURIComponent(r)}=${encodeURIComponent(a)}`);
        }
    return t.join("&");
}
function getHostname(e) {
    try {
        return new URL(e).hostname;
    } catch (t) {
        return console.error("Error parsing URL:", t), null;
    }
}
const pi = (e, t = null) => {
        const r = e.match(/\d+([\.,][\d{1,2}])?/g);
        return r ? r.map(Number) : [t];
    },
    Me = (e, t = null) => pi(e, t)[0];
function removeDuplicates(e, t) {
    const r = [];
    for (const a of e) r.some((s) => t(s, a)) || r.push(a);
    return r;
}
function compareNestedObjects(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return obj1 === obj2;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        if (!compareNestedObjects(val1, val2)) return false;
    }

    return true;
}
const er = async (e) => (
        (await browser.offscreen.hasDocument()) ||
            (await browser.offscreen.createDocument({
                justification: "Eval scripts",
                reasons: [browser.offscreen.Reason.IFRAME_SCRIPTING],
                url: browser.runtime.getURL("src/pages/offscreen/index.html"),
            })),
        new Promise(async (r) => {
            const a = (n, s) => {
                (n == null ? void 0 : n.target) !== "background" ||
                    (n == null ? void 0 : n.type) !== "SANDBOX_EVAL" ||
                    (browser.runtime.onMessage.removeListener(a),
                    r(n == null ? void 0 : n.result));
            };
            browser.runtime.onMessage.addListener(a),
                browser.runtime.sendMessage({
                    target: "offscreen",
                    data: e,
                    type: "SANDBOX_EVAL",
                });
        })
    ),
    Oa = { xml: !1, decodeEntities: !0 },
    hn = { _useHtmlParser2: !0, xmlMode: !0 };
function ba(e) {
    return e != null && e.xml
        ? typeof e.xml == "boolean"
            ? hn
            : { ...hn, ...e.xml }
        : e != null
        ? e
        : void 0;
}
var te;
(function (e) {
    (e.Root = "root"),
        (e.Text = "text"),
        (e.Directive = "directive"),
        (e.Comment = "comment"),
        (e.Script = "script"),
        (e.Style = "style"),
        (e.Tag = "tag"),
        (e.CDATA = "cdata"),
        (e.Doctype = "doctype");
})(te || (te = {}));
function Ti(e) {
    return e.type === te.Tag || e.type === te.Script || e.type === te.Style;
}
const bi = te.Root,
    xi = te.Text,
    _i = te.Directive,
    gi = te.Comment,
    Ai = te.Script,
    Ci = te.Style,
    Ni = te.Tag,
    Ii = te.CDATA,
    Si = te.Doctype;
class Ds {
    constructor() {
        (this.parent = null),
            (this.prev = null),
            (this.next = null),
            (this.startIndex = null),
            (this.endIndex = null);
    }
    get parentNode() {
        return this.parent;
    }
    set parentNode(t) {
        this.parent = t;
    }
    get previousSibling() {
        return this.prev;
    }
    set previousSibling(t) {
        this.prev = t;
    }
    get nextSibling() {
        return this.next;
    }
    set nextSibling(t) {
        this.next = t;
    }
    cloneNode(t = !1) {
        return tr(this, t);
    }
}
class La extends Ds {
    constructor(t) {
        super(), (this.data = t);
    }
    get nodeValue() {
        return this.data;
    }
    set nodeValue(t) {
        this.data = t;
    }
}
class kt extends La {
    constructor() {
        super(...arguments), (this.type = te.Text);
    }
    get nodeType() {
        return 3;
    }
}
class Da extends La {
    constructor() {
        super(...arguments), (this.type = te.Comment);
    }
    get nodeType() {
        return 8;
    }
}
class Pa extends La {
    constructor(t, r) {
        super(r), (this.name = t), (this.type = te.Directive);
    }
    get nodeType() {
        return 1;
    }
}
class Ba extends Ds {
    constructor(t) {
        super(), (this.children = t);
    }
    get firstChild() {
        var t;
        return (t = this.children[0]) !== null && t !== void 0 ? t : null;
    }
    get lastChild() {
        return this.children.length > 0
            ? this.children[this.children.length - 1]
            : null;
    }
    get childNodes() {
        return this.children;
    }
    set childNodes(t) {
        this.children = t;
    }
}
class Ps extends Ba {
    constructor() {
        super(...arguments), (this.type = te.CDATA);
    }
    get nodeType() {
        return 4;
    }
}
class ze extends Ba {
    constructor() {
        super(...arguments), (this.type = te.Root);
    }
    get nodeType() {
        return 9;
    }
}
class ka extends Ba {
    constructor(
        t,
        r,
        a = [],
        n = t === "script" ? te.Script : t === "style" ? te.Style : te.Tag
    ) {
        super(a), (this.name = t), (this.attribs = r), (this.type = n);
    }
    get nodeType() {
        return 1;
    }
    get tagName() {
        return this.name;
    }
    set tagName(t) {
        this.name = t;
    }
    get attributes() {
        return Object.keys(this.attribs).map((t) => {
            var r, a;
            return {
                name: t,
                value: this.attribs[t],
                namespace:
                    (r = this["x-attribsNamespace"]) === null || r === void 0
                        ? void 0
                        : r[t],
                prefix:
                    (a = this["x-attribsPrefix"]) === null || a === void 0
                        ? void 0
                        : a[t],
            };
        });
    }
}
function Q(e) {
    return Ti(e);
}
function dr(e) {
    return e.type === te.CDATA;
}
function De(e) {
    return e.type === te.Text;
}
function fr(e) {
    return e.type === te.Comment;
}
function xa(e) {
    return e.type === te.Directive;
}
function Ke(e) {
    return e.type === te.Root;
}
function fe(e) {
    return Object.prototype.hasOwnProperty.call(e, "children");
}
function tr(e, t = !1) {
    let r;
    if (De(e)) r = new kt(e.data);
    else if (fr(e)) r = new Da(e.data);
    else if (Q(e)) {
        const a = t ? Sr(e.children) : [],
            n = new ka(e.name, { ...e.attribs }, a);
        a.forEach((s) => (s.parent = n)),
            e.namespace != null && (n.namespace = e.namespace),
            e["x-attribsNamespace"] &&
                (n["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }),
            e["x-attribsPrefix"] &&
                (n["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }),
            (r = n);
    } else if (dr(e)) {
        const a = t ? Sr(e.children) : [],
            n = new Ps(a);
        a.forEach((s) => (s.parent = n)), (r = n);
    } else if (Ke(e)) {
        const a = t ? Sr(e.children) : [],
            n = new ze(a);
        a.forEach((s) => (s.parent = n)),
            e["x-mode"] && (n["x-mode"] = e["x-mode"]),
            (r = n);
    } else if (xa(e)) {
        const a = new Pa(e.name, e.data);
        e["x-name"] != null &&
            ((a["x-name"] = e["x-name"]),
            (a["x-publicId"] = e["x-publicId"]),
            (a["x-systemId"] = e["x-systemId"])),
            (r = a);
    } else throw new Error(`Not implemented yet: ${e.type}`);
    return (
        (r.startIndex = e.startIndex),
        (r.endIndex = e.endIndex),
        e.sourceCodeLocation != null &&
            (r.sourceCodeLocation = e.sourceCodeLocation),
        r
    );
}
function Sr(e) {
    const t = e.map((r) => tr(r, !0));
    for (let r = 1; r < t.length; r++)
        (t[r].prev = t[r - 1]), (t[r - 1].next = t[r]);
    return t;
}
const En = { withStartIndices: !1, withEndIndices: !1, xmlMode: !1 };
class Ri {
    constructor(t, r, a) {
        (this.dom = []),
            (this.root = new ze(this.dom)),
            (this.done = !1),
            (this.tagStack = [this.root]),
            (this.lastNode = null),
            (this.parser = null),
            typeof r == "function" && ((a = r), (r = En)),
            typeof t == "object" && ((r = t), (t = void 0)),
            (this.callback = t != null ? t : null),
            (this.options = r != null ? r : En),
            (this.elementCB = a != null ? a : null);
    }
    onparserinit(t) {
        this.parser = t;
    }
    onreset() {
        (this.dom = []),
            (this.root = new ze(this.dom)),
            (this.done = !1),
            (this.tagStack = [this.root]),
            (this.lastNode = null),
            (this.parser = null);
    }
    onend() {
        this.done ||
            ((this.done = !0), (this.parser = null), this.handleCallback(null));
    }
    onerror(t) {
        this.handleCallback(t);
    }
    onclosetag() {
        this.lastNode = null;
        const t = this.tagStack.pop();
        this.options.withEndIndices && (t.endIndex = this.parser.endIndex),
            this.elementCB && this.elementCB(t);
    }
    onopentag(t, r) {
        const a = this.options.xmlMode ? te.Tag : void 0,
            n = new ka(t, r, void 0, a);
        this.addNode(n), this.tagStack.push(n);
    }
    ontext(t) {
        const { lastNode: r } = this;
        if (r && r.type === te.Text)
            (r.data += t),
                this.options.withEndIndices &&
                    (r.endIndex = this.parser.endIndex);
        else {
            const a = new kt(t);
            this.addNode(a), (this.lastNode = a);
        }
    }
    oncomment(t) {
        if (this.lastNode && this.lastNode.type === te.Comment) {
            this.lastNode.data += t;
            return;
        }
        const r = new Da(t);
        this.addNode(r), (this.lastNode = r);
    }
    oncommentend() {
        this.lastNode = null;
    }
    oncdatastart() {
        const t = new kt(""),
            r = new Ps([t]);
        this.addNode(r), (t.parent = r), (this.lastNode = t);
    }
    oncdataend() {
        this.lastNode = null;
    }
    onprocessinginstruction(t, r) {
        const a = new Pa(t, r);
        this.addNode(a);
    }
    handleCallback(t) {
        if (typeof this.callback == "function") this.callback(t, this.dom);
        else if (t) throw t;
    }
    addNode(t) {
        const r = this.tagStack[this.tagStack.length - 1],
            a = r.children[r.children.length - 1];
        this.options.withStartIndices &&
            (t.startIndex = this.parser.startIndex),
            this.options.withEndIndices && (t.endIndex = this.parser.endIndex),
            r.children.push(t),
            a && ((t.prev = a), (a.next = t)),
            (t.parent = r),
            (this.lastNode = null);
    }
}
const pn = /["&'<>$\x80-\uFFFF]/g,
    vi = new Map([
        [34, "&quot;"],
        [38, "&amp;"],
        [39, "&apos;"],
        [60, "&lt;"],
        [62, "&gt;"],
    ]),
    yi =
        String.prototype.codePointAt != null
            ? (e, t) => e.codePointAt(t)
            : (e, t) =>
                  (e.charCodeAt(t) & 64512) === 55296
                      ? (e.charCodeAt(t) - 55296) * 1024 +
                        e.charCodeAt(t + 1) -
                        56320 +
                        65536
                      : e.charCodeAt(t);
function Bs(e) {
    let t = "",
        r = 0,
        a;
    for (; (a = pn.exec(e)) !== null; ) {
        const n = a.index,
            s = e.charCodeAt(n),
            u = vi.get(s);
        u !== void 0
            ? ((t += e.substring(r, n) + u), (r = n + 1))
            : ((t += `${e.substring(r, n)}&#x${yi(e, n).toString(16)};`),
              (r = pn.lastIndex += Number((s & 64512) === 55296)));
    }
    return t + e.substr(r);
}
function ks(e, t) {
    return function (a) {
        let n,
            s = 0,
            u = "";
        for (; (n = e.exec(a)); )
            s !== n.index && (u += a.substring(s, n.index)),
                (u += t.get(n[0].charCodeAt(0))),
                (s = n.index + 1);
        return u + a.substring(s);
    };
}
const Oi = ks(
        /["&\u00A0]/g,
        new Map([
            [34, "&quot;"],
            [38, "&amp;"],
            [160, "&nbsp;"],
        ])
    ),
    Li = ks(
        /[&<>\u00A0]/g,
        new Map([
            [38, "&amp;"],
            [60, "&lt;"],
            [62, "&gt;"],
            [160, "&nbsp;"],
        ])
    ),
    Di = new Map(
        [
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "clipPath",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feDropShadow",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "foreignObject",
            "glyphRef",
            "linearGradient",
            "radialGradient",
            "textPath",
        ].map((e) => [e.toLowerCase(), e])
    ),
    Pi = new Map(
        [
            "definitionURL",
            "attributeName",
            "attributeType",
            "baseFrequency",
            "baseProfile",
            "calcMode",
            "clipPathUnits",
            "diffuseConstant",
            "edgeMode",
            "filterUnits",
            "glyphRef",
            "gradientTransform",
            "gradientUnits",
            "kernelMatrix",
            "kernelUnitLength",
            "keyPoints",
            "keySplines",
            "keyTimes",
            "lengthAdjust",
            "limitingConeAngle",
            "markerHeight",
            "markerUnits",
            "markerWidth",
            "maskContentUnits",
            "maskUnits",
            "numOctaves",
            "pathLength",
            "patternContentUnits",
            "patternTransform",
            "patternUnits",
            "pointsAtX",
            "pointsAtY",
            "pointsAtZ",
            "preserveAlpha",
            "preserveAspectRatio",
            "primitiveUnits",
            "refX",
            "refY",
            "repeatCount",
            "repeatDur",
            "requiredExtensions",
            "requiredFeatures",
            "specularConstant",
            "specularExponent",
            "spreadMethod",
            "startOffset",
            "stdDeviation",
            "stitchTiles",
            "surfaceScale",
            "systemLanguage",
            "tableValues",
            "targetX",
            "targetY",
            "textLength",
            "viewBox",
            "viewTarget",
            "xChannelSelector",
            "yChannelSelector",
            "zoomAndPan",
        ].map((e) => [e.toLowerCase(), e])
    ),
    Bi = new Set([
        "style",
        "script",
        "xmp",
        "iframe",
        "noembed",
        "noframes",
        "plaintext",
        "noscript",
    ]);
function ki(e) {
    return e.replace(/"/g, "&quot;");
}
function wi(e, t) {
    var r;
    if (!e) return;
    const a =
        ((r = t.encodeEntities) !== null && r !== void 0
            ? r
            : t.decodeEntities) === !1
            ? ki
            : t.xmlMode || t.encodeEntities !== "utf8"
            ? Bs
            : Oi;
    return Object.keys(e)
        .map((n) => {
            var s, u;
            const o = (s = e[n]) !== null && s !== void 0 ? s : "";
            return (
                t.xmlMode === "foreign" &&
                    (n = (u = Pi.get(n)) !== null && u !== void 0 ? u : n),
                !t.emptyAttrs && !t.xmlMode && o === "" ? n : `${n}="${a(o)}"`
            );
        })
        .join(" ");
}
const mn = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
function hr(e, t = {}) {
    const r = "length" in e ? e : [e];
    let a = "";
    for (let n = 0; n < r.length; n++) a += Mi(r[n], t);
    return a;
}
function Mi(e, t) {
    switch (e.type) {
        case bi:
            return hr(e.children, t);
        case Si:
        case _i:
            return qi(e);
        case gi:
            return Wi(e);
        case Ii:
            return $i(e);
        case Ai:
        case Ci:
        case Ni:
            return Ui(e, t);
        case xi:
            return Yi(e, t);
    }
}
const Hi = new Set([
        "mi",
        "mo",
        "mn",
        "ms",
        "mtext",
        "annotation-xml",
        "foreignObject",
        "desc",
        "title",
    ]),
    Fi = new Set(["svg", "math"]);
function Ui(e, t) {
    var r;
    t.xmlMode === "foreign" &&
        ((e.name = (r = Di.get(e.name)) !== null && r !== void 0 ? r : e.name),
        e.parent && Hi.has(e.parent.name) && (t = { ...t, xmlMode: !1 })),
        !t.xmlMode && Fi.has(e.name) && (t = { ...t, xmlMode: "foreign" });
    let a = `<${e.name}`;
    const n = wi(e.attribs, t);
    return (
        n && (a += ` ${n}`),
        e.children.length === 0 &&
        (t.xmlMode
            ? t.selfClosingTags !== !1
            : t.selfClosingTags && mn.has(e.name))
            ? (t.xmlMode || (a += " "), (a += "/>"))
            : ((a += ">"),
              e.children.length > 0 && (a += hr(e.children, t)),
              (t.xmlMode || !mn.has(e.name)) && (a += `</${e.name}>`)),
        a
    );
}
function qi(e) {
    return `<${e.data}>`;
}
function Yi(e, t) {
    var r;
    let a = e.data || "";
    return (
        ((r = t.encodeEntities) !== null && r !== void 0
            ? r
            : t.decodeEntities) !== !1 &&
            !(!t.xmlMode && e.parent && Bi.has(e.parent.name)) &&
            (a = t.xmlMode || t.encodeEntities !== "utf8" ? Bs(a) : Li(a)),
        a
    );
}
function $i(e) {
    return `<![CDATA[${e.children[0].data}]]>`;
}
function Wi(e) {
    return `<!--${e.data}-->`;
}
function ws(e, t) {
    return hr(e, t);
}
function Gi(e, t) {
    return fe(e) ? e.children.map((r) => ws(r, t)).join("") : "";
}
function Zt(e) {
    return Array.isArray(e)
        ? e.map(Zt).join("")
        : Q(e)
        ? e.name === "br"
            ? `
`
            : Zt(e.children)
        : dr(e)
        ? Zt(e.children)
        : De(e)
        ? e.data
        : "";
}
function lt(e) {
    return Array.isArray(e)
        ? e.map(lt).join("")
        : fe(e) && !fr(e)
        ? lt(e.children)
        : De(e)
        ? e.data
        : "";
}
function rr(e) {
    return Array.isArray(e)
        ? e.map(rr).join("")
        : fe(e) && (e.type === te.Tag || dr(e))
        ? rr(e.children)
        : De(e)
        ? e.data
        : "";
}
function Er(e) {
    return fe(e) ? e.children : [];
}
function Ms(e) {
    return e.parent || null;
}
function Hs(e) {
    const t = Ms(e);
    if (t != null) return Er(t);
    const r = [e];
    let { prev: a, next: n } = e;
    for (; a != null; ) r.unshift(a), ({ prev: a } = a);
    for (; n != null; ) r.push(n), ({ next: n } = n);
    return r;
}
function Vi(e, t) {
    var r;
    return (r = e.attribs) === null || r === void 0 ? void 0 : r[t];
}
function Qi(e, t) {
    return (
        e.attribs != null &&
        Object.prototype.hasOwnProperty.call(e.attribs, t) &&
        e.attribs[t] != null
    );
}
function Xi(e) {
    return e.name;
}
function wa(e) {
    let { next: t } = e;
    for (; t !== null && !Q(t); ) ({ next: t } = t);
    return t;
}
function Ma(e) {
    let { prev: t } = e;
    for (; t !== null && !Q(t); ) ({ prev: t } = t);
    return t;
}
function Ze(e) {
    if (
        (e.prev && (e.prev.next = e.next),
        e.next && (e.next.prev = e.prev),
        e.parent)
    ) {
        const t = e.parent.children,
            r = t.lastIndexOf(e);
        r >= 0 && t.splice(r, 1);
    }
    (e.next = null), (e.prev = null), (e.parent = null);
}
function zi(e, t) {
    const r = (t.prev = e.prev);
    r && (r.next = t);
    const a = (t.next = e.next);
    a && (a.prev = t);
    const n = (t.parent = e.parent);
    if (n) {
        const s = n.children;
        (s[s.lastIndexOf(e)] = t), (e.parent = null);
    }
}
function ji(e, t) {
    if ((Ze(t), (t.next = null), (t.parent = e), e.children.push(t) > 1)) {
        const r = e.children[e.children.length - 2];
        (r.next = t), (t.prev = r);
    } else t.prev = null;
}
function Ki(e, t) {
    Ze(t);
    const { parent: r } = e,
        a = e.next;
    if (((t.next = a), (t.prev = e), (e.next = t), (t.parent = r), a)) {
        if (((a.prev = t), r)) {
            const n = r.children;
            n.splice(n.lastIndexOf(a), 0, t);
        }
    } else r && r.children.push(t);
}
function Zi(e, t) {
    if ((Ze(t), (t.parent = e), (t.prev = null), e.children.unshift(t) !== 1)) {
        const r = e.children[1];
        (r.prev = t), (t.next = r);
    } else t.next = null;
}
function Ji(e, t) {
    Ze(t);
    const { parent: r } = e;
    if (r) {
        const a = r.children;
        a.splice(a.indexOf(e), 0, t);
    }
    e.prev && (e.prev.next = t),
        (t.parent = r),
        (t.prev = e.prev),
        (t.next = e),
        (e.prev = t);
}
function pr(e, t, r = !0, a = 1 / 0) {
    return Ha(e, Array.isArray(t) ? t : [t], r, a);
}
function Ha(e, t, r, a) {
    const n = [],
        s = [t],
        u = [0];
    for (;;) {
        if (u[0] >= s[0].length) {
            if (u.length === 1) return n;
            s.shift(), u.shift();
            continue;
        }
        const o = s[0][u[0]++];
        if (e(o) && (n.push(o), --a <= 0)) return n;
        r &&
            fe(o) &&
            o.children.length > 0 &&
            (u.unshift(0), s.unshift(o.children));
    }
}
function eu(e, t) {
    return t.find(e);
}
function Fa(e, t, r = !0) {
    let a = null;
    for (let n = 0; n < t.length && !a; n++) {
        const s = t[n];
        if (Q(s))
            e(s)
                ? (a = s)
                : r && s.children.length > 0 && (a = Fa(e, s.children, !0));
        else continue;
    }
    return a;
}
function Fs(e, t) {
    return t.some((r) => Q(r) && (e(r) || Fs(e, r.children)));
}
function tu(e, t) {
    const r = [],
        a = [t],
        n = [0];
    for (;;) {
        if (n[0] >= a[0].length) {
            if (a.length === 1) return r;
            a.shift(), n.shift();
            continue;
        }
        const s = a[0][n[0]++];
        !Q(s) ||
            (e(s) && r.push(s),
            s.children.length > 0 && (n.unshift(0), a.unshift(s.children)));
    }
}
const ar = {
    tag_name(e) {
        return typeof e == "function"
            ? (t) => Q(t) && e(t.name)
            : e === "*"
            ? Q
            : (t) => Q(t) && t.name === e;
    },
    tag_type(e) {
        return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
    },
    tag_contains(e) {
        return typeof e == "function"
            ? (t) => De(t) && e(t.data)
            : (t) => De(t) && t.data === e;
    },
};
function Us(e, t) {
    return typeof t == "function"
        ? (r) => Q(r) && t(r.attribs[e])
        : (r) => Q(r) && r.attribs[e] === t;
}
function ru(e, t) {
    return (r) => e(r) || t(r);
}
function qs(e) {
    const t = Object.keys(e).map((r) => {
        const a = e[r];
        return Object.prototype.hasOwnProperty.call(ar, r)
            ? ar[r](a)
            : Us(r, a);
    });
    return t.length === 0 ? null : t.reduce(ru);
}
function au(e, t) {
    const r = qs(e);
    return r ? r(t) : !0;
}
function nu(e, t, r, a = 1 / 0) {
    const n = qs(e);
    return n ? pr(n, t, r, a) : [];
}
function su(e, t, r = !0) {
    return Array.isArray(t) || (t = [t]), Fa(Us("id", e), t, r);
}
function ft(e, t, r = !0, a = 1 / 0) {
    return pr(ar.tag_name(e), t, r, a);
}
function iu(e, t, r = !0, a = 1 / 0) {
    return pr(ar.tag_type(e), t, r, a);
}
function uu(e) {
    let t = e.length;
    for (; --t >= 0; ) {
        const r = e[t];
        if (t > 0 && e.lastIndexOf(r, t - 1) >= 0) {
            e.splice(t, 1);
            continue;
        }
        for (let a = r.parent; a; a = a.parent)
            if (e.includes(a)) {
                e.splice(t, 1);
                break;
            }
    }
    return e;
}
var Se;
(function (e) {
    (e[(e.DISCONNECTED = 1)] = "DISCONNECTED"),
        (e[(e.PRECEDING = 2)] = "PRECEDING"),
        (e[(e.FOLLOWING = 4)] = "FOLLOWING"),
        (e[(e.CONTAINS = 8)] = "CONTAINS"),
        (e[(e.CONTAINED_BY = 16)] = "CONTAINED_BY");
})(Se || (Se = {}));
function Ys(e, t) {
    const r = [],
        a = [];
    if (e === t) return 0;
    let n = fe(e) ? e : e.parent;
    for (; n; ) r.unshift(n), (n = n.parent);
    for (n = fe(t) ? t : t.parent; n; ) a.unshift(n), (n = n.parent);
    const s = Math.min(r.length, a.length);
    let u = 0;
    for (; u < s && r[u] === a[u]; ) u++;
    if (u === 0) return Se.DISCONNECTED;
    const o = r[u - 1],
        l = o.children,
        c = r[u],
        d = a[u];
    return l.indexOf(c) > l.indexOf(d)
        ? o === t
            ? Se.FOLLOWING | Se.CONTAINED_BY
            : Se.FOLLOWING
        : o === e
        ? Se.PRECEDING | Se.CONTAINS
        : Se.PRECEDING;
}
function ht(e) {
    return (
        (e = e.filter((t, r, a) => !a.includes(t, r + 1))),
        e.sort((t, r) => {
            const a = Ys(t, r);
            return a & Se.PRECEDING ? -1 : a & Se.FOLLOWING ? 1 : 0;
        }),
        e
    );
}
function ou(e) {
    const t = nr(hu, e);
    return t ? (t.name === "feed" ? cu(t) : lu(t)) : null;
}
function cu(e) {
    var t;
    const r = e.children,
        a = {
            type: "atom",
            items: ft("entry", r).map((u) => {
                var o;
                const { children: l } = u,
                    c = { media: $s(l) };
                be(c, "id", "id", l), be(c, "title", "title", l);
                const d =
                    (o = nr("link", l)) === null || o === void 0
                        ? void 0
                        : o.attribs.href;
                d && (c.link = d);
                const h = Ye("summary", l) || Ye("content", l);
                h && (c.description = h);
                const f = Ye("updated", l);
                return f && (c.pubDate = new Date(f)), c;
            }),
        };
    be(a, "id", "id", r), be(a, "title", "title", r);
    const n =
        (t = nr("link", r)) === null || t === void 0 ? void 0 : t.attribs.href;
    n && (a.link = n), be(a, "description", "subtitle", r);
    const s = Ye("updated", r);
    return s && (a.updated = new Date(s)), be(a, "author", "email", r, !0), a;
}
function lu(e) {
    var t, r;
    const a =
            (r =
                (t = nr("channel", e.children)) === null || t === void 0
                    ? void 0
                    : t.children) !== null && r !== void 0
                ? r
                : [],
        n = {
            type: e.name.substr(0, 3),
            id: "",
            items: ft("item", e.children).map((u) => {
                const { children: o } = u,
                    l = { media: $s(o) };
                be(l, "id", "guid", o),
                    be(l, "title", "title", o),
                    be(l, "link", "link", o),
                    be(l, "description", "description", o);
                const c = Ye("pubDate", o) || Ye("dc:date", o);
                return c && (l.pubDate = new Date(c)), l;
            }),
        };
    be(n, "title", "title", a),
        be(n, "link", "link", a),
        be(n, "description", "description", a);
    const s = Ye("lastBuildDate", a);
    return (
        s && (n.updated = new Date(s)),
        be(n, "author", "managingEditor", a, !0),
        n
    );
}
const du = ["url", "type", "lang"],
    fu = [
        "fileSize",
        "bitrate",
        "framerate",
        "samplingrate",
        "channels",
        "duration",
        "height",
        "width",
    ];
function $s(e) {
    return ft("media:content", e).map((t) => {
        const { attribs: r } = t,
            a = { medium: r.medium, isDefault: !!r.isDefault };
        for (const n of du) r[n] && (a[n] = r[n]);
        for (const n of fu) r[n] && (a[n] = parseInt(r[n], 10));
        return r.expression && (a.expression = r.expression), a;
    });
}
function nr(e, t) {
    return ft(e, t, !0, 1)[0];
}
function Ye(e, t, r = !1) {
    return lt(ft(e, t, r, 1)).trim();
}
function be(e, t, r, a, n = !1) {
    const s = Ye(r, a, n);
    s && (e[t] = s);
}
function hu(e) {
    return e === "rss" || e === "feed" || e === "rdf:RDF";
}
const mr = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            isTag: Q,
            isCDATA: dr,
            isText: De,
            isComment: fr,
            isDocument: Ke,
            hasChildren: fe,
            getOuterHTML: ws,
            getInnerHTML: Gi,
            getText: Zt,
            textContent: lt,
            innerText: rr,
            getChildren: Er,
            getParent: Ms,
            getSiblings: Hs,
            getAttributeValue: Vi,
            hasAttrib: Qi,
            getName: Xi,
            nextElementSibling: wa,
            prevElementSibling: Ma,
            removeElement: Ze,
            replaceElement: zi,
            appendChild: ji,
            append: Ki,
            prependChild: Zi,
            prepend: Ji,
            filter: pr,
            find: Ha,
            findOneChild: eu,
            findOne: Fa,
            existsOne: Fs,
            findAll: tu,
            testElement: au,
            getElements: nu,
            getElementById: su,
            getElementsByTagName: ft,
            getElementsByTagType: iu,
            removeSubsets: uu,
            get DocumentPosition() {
                return Se;
            },
            compareDocumentPosition: Ys,
            uniqueSort: ht,
            getFeed: ou,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
function Ws(e, t, r) {
    return e
        ? e(t != null ? t : e._root.children, null, void 0, r).toString()
        : "";
}
function Eu(e, t) {
    return (
        !t &&
        typeof e == "object" &&
        e != null &&
        !("length" in e) &&
        !("type" in e)
    );
}
function pu(e, t) {
    const r = Eu(e) ? ((t = e), void 0) : e,
        a = {
            ...Oa,
            ...(this === null || this === void 0 ? void 0 : this._options),
            ...ba(t != null ? t : {}),
        };
    return Ws(this, r, a);
}
function mu(e) {
    const t = { ...this._options, xmlMode: !0 };
    return Ws(this, e, t);
}
function wt(e) {
    const t = e || (this ? this.root() : []);
    let r = "";
    for (let a = 0; a < t.length; a++) r += lt(t[a]);
    return r;
}
function Tu(e, t, r = typeof t == "boolean" ? t : !1) {
    if (!e || typeof e != "string") return null;
    typeof t == "boolean" && (r = t);
    const a = this.load(e, Oa, !1);
    return r || a("script").remove(), a.root()[0].children.slice();
}
function bu() {
    return this(this._root);
}
function Gs(e, t) {
    if (t === e) return !1;
    let r = t;
    for (; r && r !== r.parent; ) if (((r = r.parent), r === e)) return !0;
    return !1;
}
function xu(e, t) {
    if (!Tn(e) || !Tn(t)) return;
    let r = e.length;
    const a = +t.length;
    for (let n = 0; n < a; n++) e[r++] = t[n];
    return (e.length = r), e;
}
function Tn(e) {
    if (Array.isArray(e)) return !0;
    if (
        typeof e != "object" ||
        !Object.prototype.hasOwnProperty.call(e, "length") ||
        typeof e.length != "number" ||
        e.length < 0
    )
        return !1;
    for (let t = 0; t < e.length; t++) if (!(t in e)) return !1;
    return !0;
}
const _u = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            html: pu,
            xml: mu,
            text: wt,
            parseHTML: Tu,
            root: bu,
            contains: Gs,
            merge: xu,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
function Pe(e) {
    return e.cheerio != null;
}
function gu(e) {
    return e.replace(/[_.-](\w|$)/g, (t, r) => r.toUpperCase());
}
function Au(e) {
    return e.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function le(e, t) {
    const r = e.length;
    for (let a = 0; a < r; a++) t(e[a], a);
    return e;
}
function _a(e) {
    const t =
            "length" in e
                ? Array.prototype.map.call(e, (a) => tr(a, !0))
                : [tr(e, !0)],
        r = new ze(t);
    return (
        t.forEach((a) => {
            a.parent = r;
        }),
        t
    );
}
var Qe;
(function (e) {
    (e[(e.LowerA = 97)] = "LowerA"),
        (e[(e.LowerZ = 122)] = "LowerZ"),
        (e[(e.UpperA = 65)] = "UpperA"),
        (e[(e.UpperZ = 90)] = "UpperZ"),
        (e[(e.Exclamation = 33)] = "Exclamation");
})(Qe || (Qe = {}));
function ga(e) {
    const t = e.indexOf("<");
    if (t < 0 || t > e.length - 3) return !1;
    const r = e.charCodeAt(t + 1);
    return (
        ((r >= Qe.LowerA && r <= Qe.LowerZ) ||
            (r >= Qe.UpperA && r <= Qe.UpperZ) ||
            r === Qe.Exclamation) &&
        e.includes(">", t + 2)
    );
}
const ot = Object.prototype.hasOwnProperty,
    Mt = /\s+/,
    Rr = "data-",
    bn = { null: null, true: !0, false: !1 },
    Ua =
        /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    Cu = /^{[^]*}$|^\[[^]*]$/;
function sr(e, t, r) {
    var a;
    if (!(!e || !Q(e))) {
        if (
            (((a = e.attribs) !== null && a !== void 0) || (e.attribs = {}), !t)
        )
            return e.attribs;
        if (ot.call(e.attribs, t)) return !r && Ua.test(t) ? t : e.attribs[t];
        if (e.name === "option" && t === "value") return wt(e.children);
        if (
            e.name === "input" &&
            (e.attribs.type === "radio" || e.attribs.type === "checkbox") &&
            t === "value"
        )
            return "on";
    }
}
function ct(e, t, r) {
    r === null ? Vs(e, t) : (e.attribs[t] = `${r}`);
}
function Nu(e, t) {
    if (typeof e == "object" || t !== void 0) {
        if (typeof t == "function") {
            if (typeof e != "string")
                throw new Error("Bad combination of arguments.");
            return le(this, (r, a) => {
                Q(r) && ct(r, e, t.call(r, a, r.attribs[e]));
            });
        }
        return le(this, (r) => {
            !Q(r) ||
                (typeof e == "object"
                    ? Object.keys(e).forEach((a) => {
                          const n = e[a];
                          ct(r, a, n);
                      })
                    : ct(r, e, t));
        });
    }
    return arguments.length > 1 ? this : sr(this[0], e, this.options.xmlMode);
}
function xn(e, t, r) {
    return t in e
        ? e[t]
        : !r && Ua.test(t)
        ? sr(e, t, !1) !== void 0
        : sr(e, t, r);
}
function vr(e, t, r, a) {
    t in e ? (e[t] = r) : ct(e, t, !a && Ua.test(t) ? (r ? "" : null) : `${r}`);
}
function Iu(e, t) {
    var r;
    if (typeof e == "string" && t === void 0) {
        const a = this[0];
        if (!a || !Q(a)) return;
        switch (e) {
            case "style": {
                const n = this.css(),
                    s = Object.keys(n);
                return (
                    s.forEach((u, o) => {
                        n[o] = u;
                    }),
                    (n.length = s.length),
                    n
                );
            }
            case "tagName":
            case "nodeName":
                return a.name.toUpperCase();
            case "href":
            case "src": {
                const n =
                    (r = a.attribs) === null || r === void 0 ? void 0 : r[e];
                return typeof URL < "u" &&
                    ((e === "href" &&
                        (a.tagName === "a" || a.name === "link")) ||
                        (e === "src" &&
                            (a.tagName === "img" ||
                                a.tagName === "iframe" ||
                                a.tagName === "audio" ||
                                a.tagName === "video" ||
                                a.tagName === "source"))) &&
                    n !== void 0 &&
                    this.options.baseURI
                    ? new URL(n, this.options.baseURI).href
                    : n;
            }
            case "innerText":
                return rr(a);
            case "textContent":
                return lt(a);
            case "outerHTML":
                return this.clone().wrap("<container />").parent().html();
            case "innerHTML":
                return this.html();
            default:
                return xn(a, e, this.options.xmlMode);
        }
    }
    if (typeof e == "object" || t !== void 0) {
        if (typeof t == "function") {
            if (typeof e == "object")
                throw new Error("Bad combination of arguments.");
            return le(this, (a, n) => {
                Q(a) &&
                    vr(
                        a,
                        e,
                        t.call(a, n, xn(a, e, this.options.xmlMode)),
                        this.options.xmlMode
                    );
            });
        }
        return le(this, (a) => {
            !Q(a) ||
                (typeof e == "object"
                    ? Object.keys(e).forEach((n) => {
                          const s = e[n];
                          vr(a, n, s, this.options.xmlMode);
                      })
                    : vr(a, e, t, this.options.xmlMode));
        });
    }
}
function _n(e, t, r) {
    var a;
    const n = e;
    ((a = n.data) !== null && a !== void 0) || (n.data = {}),
        typeof t == "object"
            ? Object.assign(n.data, t)
            : typeof t == "string" && r !== void 0 && (n.data[t] = r);
}
function gn(e, t) {
    let r, a, n;
    t == null
        ? ((r = Object.keys(e.attribs).filter((s) => s.startsWith(Rr))),
          (a = r.map((s) => gu(s.slice(Rr.length)))))
        : ((r = [Rr + Au(t)]), (a = [t]));
    for (let s = 0; s < r.length; ++s) {
        const u = r[s],
            o = a[s];
        if (ot.call(e.attribs, u) && !ot.call(e.data, o)) {
            if (((n = e.attribs[u]), ot.call(bn, n))) n = bn[n];
            else if (n === String(Number(n))) n = Number(n);
            else if (Cu.test(n))
                try {
                    n = JSON.parse(n);
                } catch {}
            e.data[o] = n;
        }
    }
    return t == null ? e.data : n;
}
function Su(e, t) {
    var r;
    const a = this[0];
    if (!a || !Q(a)) return;
    const n = a;
    return (
        ((r = n.data) !== null && r !== void 0) || (n.data = {}),
        e
            ? typeof e == "object" || t !== void 0
                ? (le(this, (s) => {
                      Q(s) && (typeof e == "object" ? _n(s, e) : _n(s, e, t));
                  }),
                  this)
                : ot.call(n.data, e)
                ? n.data[e]
                : gn(n, e)
            : gn(n)
    );
}
function Ru(e) {
    const t = arguments.length === 0,
        r = this[0];
    if (!r || !Q(r)) return t ? void 0 : this;
    switch (r.name) {
        case "textarea":
            return this.text(e);
        case "select": {
            const a = this.find("option:selected");
            if (!t) {
                if (this.attr("multiple") == null && typeof e == "object")
                    return this;
                this.find("option").removeAttr("selected");
                const n = typeof e != "object" ? [e] : e;
                for (let s = 0; s < n.length; s++)
                    this.find(`option[value="${n[s]}"]`).attr("selected", "");
                return this;
            }
            return this.attr("multiple")
                ? a.toArray().map((n) => wt(n.children))
                : a.attr("value");
        }
        case "input":
        case "option":
            return t ? this.attr("value") : this.attr("value", e);
    }
}
function Vs(e, t) {
    !e.attribs || !ot.call(e.attribs, t) || delete e.attribs[t];
}
function ir(e) {
    return e ? e.trim().split(Mt) : [];
}
function vu(e) {
    const t = ir(e);
    for (let r = 0; r < t.length; r++)
        le(this, (a) => {
            Q(a) && Vs(a, t[r]);
        });
    return this;
}
function yu(e) {
    return this.toArray().some((t) => {
        const r = Q(t) && t.attribs.class;
        let a = -1;
        if (r && e.length)
            for (; (a = r.indexOf(e, a + 1)) > -1; ) {
                const n = a + e.length;
                if (
                    (a === 0 || Mt.test(r[a - 1])) &&
                    (n === r.length || Mt.test(r[n]))
                )
                    return !0;
            }
        return !1;
    });
}
function Qs(e) {
    if (typeof e == "function")
        return le(this, (a, n) => {
            if (Q(a)) {
                const s = a.attribs.class || "";
                Qs.call([a], e.call(a, n, s));
            }
        });
    if (!e || typeof e != "string") return this;
    const t = e.split(Mt),
        r = this.length;
    for (let a = 0; a < r; a++) {
        const n = this[a];
        if (!Q(n)) continue;
        const s = sr(n, "class", !1);
        if (!s) ct(n, "class", t.join(" ").trim());
        else {
            let u = ` ${s} `;
            for (let o = 0; o < t.length; o++) {
                const l = `${t[o]} `;
                u.includes(` ${l}`) || (u += l);
            }
            ct(n, "class", u.trim());
        }
    }
    return this;
}
function Xs(e) {
    if (typeof e == "function")
        return le(this, (n, s) => {
            Q(n) && Xs.call([n], e.call(n, s, n.attribs.class || ""));
        });
    const t = ir(e),
        r = t.length,
        a = arguments.length === 0;
    return le(this, (n) => {
        if (!!Q(n))
            if (a) n.attribs.class = "";
            else {
                const s = ir(n.attribs.class);
                let u = !1;
                for (let o = 0; o < r; o++) {
                    const l = s.indexOf(t[o]);
                    l >= 0 && (s.splice(l, 1), (u = !0), o--);
                }
                u && (n.attribs.class = s.join(" "));
            }
    });
}
function zs(e, t) {
    if (typeof e == "function")
        return le(this, (u, o) => {
            Q(u) && zs.call([u], e.call(u, o, u.attribs.class || "", t), t);
        });
    if (!e || typeof e != "string") return this;
    const r = e.split(Mt),
        a = r.length,
        n = typeof t == "boolean" ? (t ? 1 : -1) : 0,
        s = this.length;
    for (let u = 0; u < s; u++) {
        const o = this[u];
        if (!Q(o)) continue;
        const l = ir(o.attribs.class);
        for (let c = 0; c < a; c++) {
            const d = l.indexOf(r[c]);
            n >= 0 && d < 0 ? l.push(r[c]) : n <= 0 && d >= 0 && l.splice(d, 1);
        }
        o.attribs.class = l.join(" ");
    }
    return this;
}
const Ou = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            attr: Nu,
            prop: Iu,
            data: Su,
            val: Ru,
            removeAttr: vu,
            hasClass: yu,
            addClass: Qs,
            removeClass: Xs,
            toggleClass: zs,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
var G;
(function (e) {
    (e.Attribute = "attribute"),
        (e.Pseudo = "pseudo"),
        (e.PseudoElement = "pseudo-element"),
        (e.Tag = "tag"),
        (e.Universal = "universal"),
        (e.Adjacent = "adjacent"),
        (e.Child = "child"),
        (e.Descendant = "descendant"),
        (e.Parent = "parent"),
        (e.Sibling = "sibling"),
        (e.ColumnCombinator = "column-combinator");
})(G || (G = {}));
var de;
(function (e) {
    (e.Any = "any"),
        (e.Element = "element"),
        (e.End = "end"),
        (e.Equals = "equals"),
        (e.Exists = "exists"),
        (e.Hyphen = "hyphen"),
        (e.Not = "not"),
        (e.Start = "start");
})(de || (de = {}));
const An = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,
    Lu = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
    Du = new Map([
        [126, de.Element],
        [94, de.Start],
        [36, de.End],
        [42, de.Any],
        [33, de.Not],
        [124, de.Hyphen],
    ]),
    Pu = new Set([
        "has",
        "not",
        "matches",
        "is",
        "where",
        "host",
        "host-context",
    ]);
function vt(e) {
    switch (e.type) {
        case G.Adjacent:
        case G.Child:
        case G.Descendant:
        case G.Parent:
        case G.Sibling:
        case G.ColumnCombinator:
            return !0;
        default:
            return !1;
    }
}
const Bu = new Set(["contains", "icontains"]);
function ku(e, t, r) {
    const a = parseInt(t, 16) - 65536;
    return a !== a || r
        ? t
        : a < 0
        ? String.fromCharCode(a + 65536)
        : String.fromCharCode((a >> 10) | 55296, (a & 1023) | 56320);
}
function Nt(e) {
    return e.replace(Lu, ku);
}
function yr(e) {
    return e === 39 || e === 34;
}
function Cn(e) {
    return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
}
function Tr(e) {
    const t = [],
        r = js(t, `${e}`, 0);
    if (r < e.length) throw new Error(`Unmatched selector: ${e.slice(r)}`);
    return t;
}
function js(e, t, r) {
    let a = [];
    function n(f) {
        const m = t.slice(r + f).match(An);
        if (!m) throw new Error(`Expected name, found ${t.slice(r)}`);
        const [p] = m;
        return (r += f + p.length), Nt(p);
    }
    function s(f) {
        for (r += f; r < t.length && Cn(t.charCodeAt(r)); ) r++;
    }
    function u() {
        r += 1;
        const f = r;
        let m = 1;
        for (; m > 0 && r < t.length; r++)
            t.charCodeAt(r) === 40 && !o(r)
                ? m++
                : t.charCodeAt(r) === 41 && !o(r) && m--;
        if (m) throw new Error("Parenthesis not matched");
        return Nt(t.slice(f, r - 1));
    }
    function o(f) {
        let m = 0;
        for (; t.charCodeAt(--f) === 92; ) m++;
        return (m & 1) === 1;
    }
    function l() {
        if (a.length > 0 && vt(a[a.length - 1]))
            throw new Error("Did not expect successive traversals.");
    }
    function c(f) {
        if (a.length > 0 && a[a.length - 1].type === G.Descendant) {
            a[a.length - 1].type = f;
            return;
        }
        l(), a.push({ type: f });
    }
    function d(f, m) {
        a.push({
            type: G.Attribute,
            name: f,
            action: m,
            value: n(1),
            namespace: null,
            ignoreCase: "quirks",
        });
    }
    function h() {
        if (
            (a.length && a[a.length - 1].type === G.Descendant && a.pop(),
            a.length === 0)
        )
            throw new Error("Empty sub-selector");
        e.push(a);
    }
    if ((s(0), t.length === r)) return r;
    e: for (; r < t.length; ) {
        const f = t.charCodeAt(r);
        switch (f) {
            case 32:
            case 9:
            case 10:
            case 12:
            case 13: {
                (a.length === 0 || a[0].type !== G.Descendant) &&
                    (l(), a.push({ type: G.Descendant })),
                    s(1);
                break;
            }
            case 62: {
                c(G.Child), s(1);
                break;
            }
            case 60: {
                c(G.Parent), s(1);
                break;
            }
            case 126: {
                c(G.Sibling), s(1);
                break;
            }
            case 43: {
                c(G.Adjacent), s(1);
                break;
            }
            case 46: {
                d("class", de.Element);
                break;
            }
            case 35: {
                d("id", de.Equals);
                break;
            }
            case 91: {
                s(1);
                let m,
                    p = null;
                t.charCodeAt(r) === 124
                    ? (m = n(1))
                    : t.startsWith("*|", r)
                    ? ((p = "*"), (m = n(2)))
                    : ((m = n(0)),
                      t.charCodeAt(r) === 124 &&
                          t.charCodeAt(r + 1) !== 61 &&
                          ((p = m), (m = n(1)))),
                    s(0);
                let x = de.Exists;
                const C = Du.get(t.charCodeAt(r));
                if (C) {
                    if (((x = C), t.charCodeAt(r + 1) !== 61))
                        throw new Error("Expected `=`");
                    s(2);
                } else t.charCodeAt(r) === 61 && ((x = de.Equals), s(1));
                let S = "",
                    _ = null;
                if (x !== "exists") {
                    if (yr(t.charCodeAt(r))) {
                        const v = t.charCodeAt(r);
                        let y = r + 1;
                        for (
                            ;
                            y < t.length && (t.charCodeAt(y) !== v || o(y));

                        )
                            y += 1;
                        if (t.charCodeAt(y) !== v)
                            throw new Error("Attribute value didn't end");
                        (S = Nt(t.slice(r + 1, y))), (r = y + 1);
                    } else {
                        const v = r;
                        for (
                            ;
                            r < t.length &&
                            ((!Cn(t.charCodeAt(r)) && t.charCodeAt(r) !== 93) ||
                                o(r));

                        )
                            r += 1;
                        S = Nt(t.slice(v, r));
                    }
                    s(0);
                    const A = t.charCodeAt(r) | 32;
                    A === 115
                        ? ((_ = !1), s(1))
                        : A === 105 && ((_ = !0), s(1));
                }
                if (t.charCodeAt(r) !== 93)
                    throw new Error("Attribute selector didn't terminate");
                r += 1;
                const g = {
                    type: G.Attribute,
                    name: m,
                    action: x,
                    value: S,
                    namespace: p,
                    ignoreCase: _,
                };
                a.push(g);
                break;
            }
            case 58: {
                if (t.charCodeAt(r + 1) === 58) {
                    a.push({
                        type: G.PseudoElement,
                        name: n(2).toLowerCase(),
                        data: t.charCodeAt(r) === 40 ? u() : null,
                    });
                    continue;
                }
                const m = n(1).toLowerCase();
                let p = null;
                if (t.charCodeAt(r) === 40)
                    if (Pu.has(m)) {
                        if (yr(t.charCodeAt(r + 1)))
                            throw new Error(
                                `Pseudo-selector ${m} cannot be quoted`
                            );
                        if (
                            ((p = []),
                            (r = js(p, t, r + 1)),
                            t.charCodeAt(r) !== 41)
                        )
                            throw new Error(
                                `Missing closing parenthesis in :${m} (${t})`
                            );
                        r += 1;
                    } else {
                        if (((p = u()), Bu.has(m))) {
                            const x = p.charCodeAt(0);
                            x === p.charCodeAt(p.length - 1) &&
                                yr(x) &&
                                (p = p.slice(1, -1));
                        }
                        p = Nt(p);
                    }
                a.push({ type: G.Pseudo, name: m, data: p });
                break;
            }
            case 44: {
                h(), (a = []), s(1);
                break;
            }
            default: {
                if (t.startsWith("/*", r)) {
                    const x = t.indexOf("*/", r + 2);
                    if (x < 0) throw new Error("Comment was not terminated");
                    (r = x + 2), a.length === 0 && s(0);
                    break;
                }
                let m = null,
                    p;
                if (f === 42) (r += 1), (p = "*");
                else if (f === 124) {
                    if (((p = ""), t.charCodeAt(r + 1) === 124)) {
                        c(G.ColumnCombinator), s(2);
                        break;
                    }
                } else if (An.test(t.slice(r))) p = n(0);
                else break e;
                t.charCodeAt(r) === 124 &&
                    t.charCodeAt(r + 1) !== 124 &&
                    ((m = p),
                    t.charCodeAt(r + 1) === 42
                        ? ((p = "*"), (r += 2))
                        : (p = n(1))),
                    a.push(
                        p === "*"
                            ? { type: G.Universal, namespace: m }
                            : { type: G.Tag, name: p, namespace: m }
                    );
            }
        }
    }
    return h(), r;
}
var j =
    typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {};
function Ah(e) {
    return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
}
function wu(e) {
    var t = e.default;
    if (typeof t == "function") {
        var r = function () {
            return t.apply(this, arguments);
        };
        r.prototype = t.prototype;
    } else r = {};
    return (
        Object.defineProperty(r, "__esModule", { value: !0 }),
        Object.keys(e).forEach(function (a) {
            var n = Object.getOwnPropertyDescriptor(e, a);
            Object.defineProperty(
                r,
                a,
                n.get
                    ? n
                    : {
                          enumerable: !0,
                          get: function () {
                              return e[a];
                          },
                      }
            );
        }),
        r
    );
}
var X = {
    trueFunc: function () {
        return !0;
    },
    falseFunc: function () {
        return !1;
    },
};
const Ks = new Map([
    [G.Universal, 50],
    [G.Tag, 30],
    [G.Attribute, 1],
    [G.Pseudo, 0],
]);
function qa(e) {
    return !Ks.has(e.type);
}
const Mu = new Map([
    [de.Exists, 10],
    [de.Equals, 8],
    [de.Not, 7],
    [de.Start, 6],
    [de.End, 6],
    [de.Any, 5],
]);
function Hu(e) {
    const t = e.map(Zs);
    for (let r = 1; r < e.length; r++) {
        const a = t[r];
        if (!(a < 0))
            for (let n = r - 1; n >= 0 && a < t[n]; n--) {
                const s = e[n + 1];
                (e[n + 1] = e[n]), (e[n] = s), (t[n + 1] = t[n]), (t[n] = a);
            }
    }
}
function Zs(e) {
    var t, r;
    let a = (t = Ks.get(e.type)) !== null && t !== void 0 ? t : -1;
    return (
        e.type === G.Attribute
            ? ((a = (r = Mu.get(e.action)) !== null && r !== void 0 ? r : 4),
              e.action === de.Equals && e.name === "id" && (a = 9),
              e.ignoreCase && (a >>= 1))
            : e.type === G.Pseudo &&
              (e.data
                  ? e.name === "has" || e.name === "contains"
                      ? (a = 0)
                      : Array.isArray(e.data)
                      ? ((a = Math.min(
                            ...e.data.map((n) => Math.min(...n.map(Zs)))
                        )),
                        a < 0 && (a = 0))
                      : (a = 2)
                  : (a = 3)),
        a
    );
}
const Fu = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Nn(e) {
    return e.replace(Fu, "\\$&");
}
const Uu = new Set([
    "accept",
    "accept-charset",
    "align",
    "alink",
    "axis",
    "bgcolor",
    "charset",
    "checked",
    "clear",
    "codetype",
    "color",
    "compact",
    "declare",
    "defer",
    "dir",
    "direction",
    "disabled",
    "enctype",
    "face",
    "frame",
    "hreflang",
    "http-equiv",
    "lang",
    "language",
    "link",
    "media",
    "method",
    "multiple",
    "nohref",
    "noresize",
    "noshade",
    "nowrap",
    "readonly",
    "rel",
    "rev",
    "rules",
    "scope",
    "scrolling",
    "selected",
    "shape",
    "target",
    "text",
    "type",
    "valign",
    "valuetype",
    "vlink",
]);
function Ve(e, t) {
    return typeof e.ignoreCase == "boolean"
        ? e.ignoreCase
        : e.ignoreCase === "quirks"
        ? !!t.quirksMode
        : !t.xmlMode && Uu.has(e.name);
}
const qu = {
        equals(e, t, r) {
            const { adapter: a } = r,
                { name: n } = t;
            let { value: s } = t;
            return Ve(t, r)
                ? ((s = s.toLowerCase()),
                  (u) => {
                      const o = a.getAttributeValue(u, n);
                      return (
                          o != null &&
                          o.length === s.length &&
                          o.toLowerCase() === s &&
                          e(u)
                      );
                  })
                : (u) => a.getAttributeValue(u, n) === s && e(u);
        },
        hyphen(e, t, r) {
            const { adapter: a } = r,
                { name: n } = t;
            let { value: s } = t;
            const u = s.length;
            return Ve(t, r)
                ? ((s = s.toLowerCase()),
                  function (l) {
                      const c = a.getAttributeValue(l, n);
                      return (
                          c != null &&
                          (c.length === u || c.charAt(u) === "-") &&
                          c.substr(0, u).toLowerCase() === s &&
                          e(l)
                      );
                  })
                : function (l) {
                      const c = a.getAttributeValue(l, n);
                      return (
                          c != null &&
                          (c.length === u || c.charAt(u) === "-") &&
                          c.substr(0, u) === s &&
                          e(l)
                      );
                  };
        },
        element(e, t, r) {
            const { adapter: a } = r,
                { name: n, value: s } = t;
            if (/\s/.test(s)) return X.falseFunc;
            const u = new RegExp(
                `(?:^|\\s)${Nn(s)}(?:$|\\s)`,
                Ve(t, r) ? "i" : ""
            );
            return function (l) {
                const c = a.getAttributeValue(l, n);
                return c != null && c.length >= s.length && u.test(c) && e(l);
            };
        },
        exists(e, { name: t }, { adapter: r }) {
            return (a) => r.hasAttrib(a, t) && e(a);
        },
        start(e, t, r) {
            const { adapter: a } = r,
                { name: n } = t;
            let { value: s } = t;
            const u = s.length;
            return u === 0
                ? X.falseFunc
                : Ve(t, r)
                ? ((s = s.toLowerCase()),
                  (o) => {
                      const l = a.getAttributeValue(o, n);
                      return (
                          l != null &&
                          l.length >= u &&
                          l.substr(0, u).toLowerCase() === s &&
                          e(o)
                      );
                  })
                : (o) => {
                      var l;
                      return (
                          !!(
                              !(
                                  (l = a.getAttributeValue(o, n)) === null ||
                                  l === void 0
                              ) && l.startsWith(s)
                          ) && e(o)
                      );
                  };
        },
        end(e, t, r) {
            const { adapter: a } = r,
                { name: n } = t;
            let { value: s } = t;
            const u = -s.length;
            return u === 0
                ? X.falseFunc
                : Ve(t, r)
                ? ((s = s.toLowerCase()),
                  (o) => {
                      var l;
                      return (
                          ((l = a.getAttributeValue(o, n)) === null ||
                          l === void 0
                              ? void 0
                              : l.substr(u).toLowerCase()) === s && e(o)
                      );
                  })
                : (o) => {
                      var l;
                      return (
                          !!(
                              !(
                                  (l = a.getAttributeValue(o, n)) === null ||
                                  l === void 0
                              ) && l.endsWith(s)
                          ) && e(o)
                      );
                  };
        },
        any(e, t, r) {
            const { adapter: a } = r,
                { name: n, value: s } = t;
            if (s === "") return X.falseFunc;
            if (Ve(t, r)) {
                const u = new RegExp(Nn(s), "i");
                return function (l) {
                    const c = a.getAttributeValue(l, n);
                    return (
                        c != null && c.length >= s.length && u.test(c) && e(l)
                    );
                };
            }
            return (u) => {
                var o;
                return (
                    !!(
                        !(
                            (o = a.getAttributeValue(u, n)) === null ||
                            o === void 0
                        ) && o.includes(s)
                    ) && e(u)
                );
            };
        },
        not(e, t, r) {
            const { adapter: a } = r,
                { name: n } = t;
            let { value: s } = t;
            return s === ""
                ? (u) => !!a.getAttributeValue(u, n) && e(u)
                : Ve(t, r)
                ? ((s = s.toLowerCase()),
                  (u) => {
                      const o = a.getAttributeValue(u, n);
                      return (
                          (o == null ||
                              o.length !== s.length ||
                              o.toLowerCase() !== s) &&
                          e(u)
                      );
                  })
                : (u) => a.getAttributeValue(u, n) !== s && e(u);
        },
    },
    Yu = new Set([9, 10, 12, 13, 32]),
    In = "0".charCodeAt(0),
    $u = "9".charCodeAt(0);
function Wu(e) {
    if (((e = e.trim().toLowerCase()), e === "even")) return [2, 0];
    if (e === "odd") return [2, 1];
    let t = 0,
        r = 0,
        a = s(),
        n = u();
    if (
        (t < e.length &&
            e.charAt(t) === "n" &&
            (t++,
            (r = a * (n != null ? n : 1)),
            o(),
            t < e.length ? ((a = s()), o(), (n = u())) : (a = n = 0)),
        n === null || t < e.length)
    )
        throw new Error(`n-th rule couldn't be parsed ('${e}')`);
    return [r, a * n];
    function s() {
        return e.charAt(t) === "-"
            ? (t++, -1)
            : (e.charAt(t) === "+" && t++, 1);
    }
    function u() {
        const l = t;
        let c = 0;
        for (; t < e.length && e.charCodeAt(t) >= In && e.charCodeAt(t) <= $u; )
            (c = c * 10 + (e.charCodeAt(t) - In)), t++;
        return t === l ? null : c;
    }
    function o() {
        for (; t < e.length && Yu.has(e.charCodeAt(t)); ) t++;
    }
}
function Gu(e) {
    const t = e[0],
        r = e[1] - 1;
    if (r < 0 && t <= 0) return X.falseFunc;
    if (t === -1) return (s) => s <= r;
    if (t === 0) return (s) => s === r;
    if (t === 1) return r < 0 ? X.trueFunc : (s) => s >= r;
    const a = Math.abs(t),
        n = ((r % a) + a) % a;
    return t > 1 ? (s) => s >= r && s % a === n : (s) => s <= r && s % a === n;
}
function Vt(e) {
    return Gu(Wu(e));
}
function Qt(e, t) {
    return (r) => {
        const a = t.getParent(r);
        return a != null && t.isTag(a) && e(r);
    };
}
const Aa = {
    contains(e, t, { adapter: r }) {
        return function (n) {
            return e(n) && r.getText(n).includes(t);
        };
    },
    icontains(e, t, { adapter: r }) {
        const a = t.toLowerCase();
        return function (s) {
            return e(s) && r.getText(s).toLowerCase().includes(a);
        };
    },
    "nth-child"(e, t, { adapter: r, equals: a }) {
        const n = Vt(t);
        return n === X.falseFunc
            ? X.falseFunc
            : n === X.trueFunc
            ? Qt(e, r)
            : function (u) {
                  const o = r.getSiblings(u);
                  let l = 0;
                  for (let c = 0; c < o.length && !a(u, o[c]); c++)
                      r.isTag(o[c]) && l++;
                  return n(l) && e(u);
              };
    },
    "nth-last-child"(e, t, { adapter: r, equals: a }) {
        const n = Vt(t);
        return n === X.falseFunc
            ? X.falseFunc
            : n === X.trueFunc
            ? Qt(e, r)
            : function (u) {
                  const o = r.getSiblings(u);
                  let l = 0;
                  for (let c = o.length - 1; c >= 0 && !a(u, o[c]); c--)
                      r.isTag(o[c]) && l++;
                  return n(l) && e(u);
              };
    },
    "nth-of-type"(e, t, { adapter: r, equals: a }) {
        const n = Vt(t);
        return n === X.falseFunc
            ? X.falseFunc
            : n === X.trueFunc
            ? Qt(e, r)
            : function (u) {
                  const o = r.getSiblings(u);
                  let l = 0;
                  for (let c = 0; c < o.length; c++) {
                      const d = o[c];
                      if (a(u, d)) break;
                      r.isTag(d) && r.getName(d) === r.getName(u) && l++;
                  }
                  return n(l) && e(u);
              };
    },
    "nth-last-of-type"(e, t, { adapter: r, equals: a }) {
        const n = Vt(t);
        return n === X.falseFunc
            ? X.falseFunc
            : n === X.trueFunc
            ? Qt(e, r)
            : function (u) {
                  const o = r.getSiblings(u);
                  let l = 0;
                  for (let c = o.length - 1; c >= 0; c--) {
                      const d = o[c];
                      if (a(u, d)) break;
                      r.isTag(d) && r.getName(d) === r.getName(u) && l++;
                  }
                  return n(l) && e(u);
              };
    },
    root(e, t, { adapter: r }) {
        return (a) => {
            const n = r.getParent(a);
            return (n == null || !r.isTag(n)) && e(a);
        };
    },
    scope(e, t, r, a) {
        const { equals: n } = r;
        return !a || a.length === 0
            ? Aa.root(e, t, r)
            : a.length === 1
            ? (s) => n(a[0], s) && e(s)
            : (s) => a.includes(s) && e(s);
    },
    hover: Or("isHovered"),
    visited: Or("isVisited"),
    active: Or("isActive"),
};
function Or(e) {
    return function (r, a, { adapter: n }) {
        const s = n[e];
        return typeof s != "function"
            ? X.falseFunc
            : function (o) {
                  return s(o) && r(o);
              };
    };
}
const Sn = {
    empty(e, { adapter: t }) {
        return !t.getChildren(e).some((r) => t.isTag(r) || t.getText(r) !== "");
    },
    "first-child"(e, { adapter: t, equals: r }) {
        if (t.prevElementSibling) return t.prevElementSibling(e) == null;
        const a = t.getSiblings(e).find((n) => t.isTag(n));
        return a != null && r(e, a);
    },
    "last-child"(e, { adapter: t, equals: r }) {
        const a = t.getSiblings(e);
        for (let n = a.length - 1; n >= 0; n--) {
            if (r(e, a[n])) return !0;
            if (t.isTag(a[n])) break;
        }
        return !1;
    },
    "first-of-type"(e, { adapter: t, equals: r }) {
        const a = t.getSiblings(e),
            n = t.getName(e);
        for (let s = 0; s < a.length; s++) {
            const u = a[s];
            if (r(e, u)) return !0;
            if (t.isTag(u) && t.getName(u) === n) break;
        }
        return !1;
    },
    "last-of-type"(e, { adapter: t, equals: r }) {
        const a = t.getSiblings(e),
            n = t.getName(e);
        for (let s = a.length - 1; s >= 0; s--) {
            const u = a[s];
            if (r(e, u)) return !0;
            if (t.isTag(u) && t.getName(u) === n) break;
        }
        return !1;
    },
    "only-of-type"(e, { adapter: t, equals: r }) {
        const a = t.getName(e);
        return t
            .getSiblings(e)
            .every((n) => r(e, n) || !t.isTag(n) || t.getName(n) !== a);
    },
    "only-child"(e, { adapter: t, equals: r }) {
        return t.getSiblings(e).every((a) => r(e, a) || !t.isTag(a));
    },
};
function Rn(e, t, r, a) {
    if (r === null) {
        if (e.length > a)
            throw new Error(`Pseudo-class :${t} requires an argument`);
    } else if (e.length === a)
        throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
}
const Vu = {
        "any-link": ":is(a, area, link)[href]",
        link: ":any-link:not(:visited)",
        disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
        enabled: ":not(:disabled)",
        checked:
            ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
        required: ":is(input, select, textarea)[required]",
        optional: ":is(input, select, textarea):not([required])",
        selected:
            "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
        checkbox: "[type=checkbox]",
        file: "[type=file]",
        password: "[type=password]",
        radio: "[type=radio]",
        reset: "[type=reset]",
        image: "[type=image]",
        submit: "[type=submit]",
        parent: ":not(:empty)",
        header: ":is(h1, h2, h3, h4, h5, h6)",
        button: ":is(button, input[type=button])",
        input: ":is(input, textarea, select, button)",
        text: "input:is(:not([type!='']), [type=text])",
    },
    Js = {};
function Qu(e, t) {
    return e === X.falseFunc ? X.falseFunc : (r) => t.isTag(r) && e(r);
}
function e0(e, t) {
    const r = t.getSiblings(e);
    if (r.length <= 1) return [];
    const a = r.indexOf(e);
    return a < 0 || a === r.length - 1 ? [] : r.slice(a + 1).filter(t.isTag);
}
function Ca(e) {
    return {
        xmlMode: !!e.xmlMode,
        lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
        lowerCaseTags: !!e.lowerCaseTags,
        quirksMode: !!e.quirksMode,
        cacheResults: !!e.cacheResults,
        pseudos: e.pseudos,
        adapter: e.adapter,
        equals: e.equals,
    };
}
const Lr = (e, t, r, a, n) => {
        const s = n(t, Ca(r), a);
        return s === X.trueFunc
            ? e
            : s === X.falseFunc
            ? X.falseFunc
            : (u) => s(u) && e(u);
    },
    Dr = {
        is: Lr,
        matches: Lr,
        where: Lr,
        not(e, t, r, a, n) {
            const s = n(t, Ca(r), a);
            return s === X.falseFunc
                ? e
                : s === X.trueFunc
                ? X.falseFunc
                : (u) => !s(u) && e(u);
        },
        has(e, t, r, a, n) {
            const { adapter: s } = r,
                u = Ca(r);
            u.relativeSelector = !0;
            const o = t.some((d) => d.some(qa)) ? [Js] : void 0,
                l = n(t, u, o);
            if (l === X.falseFunc) return X.falseFunc;
            const c = Qu(l, s);
            if (o && l !== X.trueFunc) {
                const { shouldTestNextSiblings: d = !1 } = l;
                return (h) => {
                    if (!e(h)) return !1;
                    o[0] = h;
                    const f = s.getChildren(h),
                        m = d ? [...f, ...e0(h, s)] : f;
                    return s.existsOne(c, m);
                };
            }
            return (d) => e(d) && s.existsOne(c, s.getChildren(d));
        },
    };
function Xu(e, t, r, a, n) {
    var s;
    const { name: u, data: o } = t;
    if (Array.isArray(o)) {
        if (!(u in Dr)) throw new Error(`Unknown pseudo-class :${u}(${o})`);
        return Dr[u](e, o, r, a, n);
    }
    const l = (s = r.pseudos) === null || s === void 0 ? void 0 : s[u],
        c = typeof l == "string" ? l : Vu[u];
    if (typeof c == "string") {
        if (o != null)
            throw new Error(`Pseudo ${u} doesn't have any arguments`);
        const d = Tr(c);
        return Dr.is(e, d, r, a, n);
    }
    if (typeof l == "function") return Rn(l, u, o, 1), (d) => l(d, o) && e(d);
    if (u in Aa) return Aa[u](e, o, r, a);
    if (u in Sn) {
        const d = Sn[u];
        return Rn(d, u, o, 2), (h) => d(h, r, o) && e(h);
    }
    throw new Error(`Unknown pseudo-class :${u}`);
}
function Pr(e, t) {
    const r = t.getParent(e);
    return r && t.isTag(r) ? r : null;
}
function zu(e, t, r, a, n) {
    const { adapter: s, equals: u } = r;
    switch (t.type) {
        case G.PseudoElement:
            throw new Error("Pseudo-elements are not supported by css-select");
        case G.ColumnCombinator:
            throw new Error(
                "Column combinators are not yet supported by css-select"
            );
        case G.Attribute: {
            if (t.namespace != null)
                throw new Error(
                    "Namespaced attributes are not yet supported by css-select"
                );
            return (
                (!r.xmlMode || r.lowerCaseAttributeNames) &&
                    (t.name = t.name.toLowerCase()),
                qu[t.action](e, t, r)
            );
        }
        case G.Pseudo:
            return Xu(e, t, r, a, n);
        case G.Tag: {
            if (t.namespace != null)
                throw new Error(
                    "Namespaced tag names are not yet supported by css-select"
                );
            let { name: o } = t;
            return (
                (!r.xmlMode || r.lowerCaseTags) && (o = o.toLowerCase()),
                function (c) {
                    return s.getName(c) === o && e(c);
                }
            );
        }
        case G.Descendant: {
            if (r.cacheResults === !1 || typeof WeakSet > "u")
                return function (c) {
                    let d = c;
                    for (; (d = Pr(d, s)); ) if (e(d)) return !0;
                    return !1;
                };
            const o = new WeakSet();
            return function (c) {
                let d = c;
                for (; (d = Pr(d, s)); )
                    if (!o.has(d)) {
                        if (s.isTag(d) && e(d)) return !0;
                        o.add(d);
                    }
                return !1;
            };
        }
        case "_flexibleDescendant":
            return function (l) {
                let c = l;
                do if (e(c)) return !0;
                while ((c = Pr(c, s)));
                return !1;
            };
        case G.Parent:
            return function (l) {
                return s.getChildren(l).some((c) => s.isTag(c) && e(c));
            };
        case G.Child:
            return function (l) {
                const c = s.getParent(l);
                return c != null && s.isTag(c) && e(c);
            };
        case G.Sibling:
            return function (l) {
                const c = s.getSiblings(l);
                for (let d = 0; d < c.length; d++) {
                    const h = c[d];
                    if (u(l, h)) break;
                    if (s.isTag(h) && e(h)) return !0;
                }
                return !1;
            };
        case G.Adjacent:
            return s.prevElementSibling
                ? function (l) {
                      const c = s.prevElementSibling(l);
                      return c != null && e(c);
                  }
                : function (l) {
                      const c = s.getSiblings(l);
                      let d;
                      for (let h = 0; h < c.length; h++) {
                          const f = c[h];
                          if (u(l, f)) break;
                          s.isTag(f) && (d = f);
                      }
                      return !!d && e(d);
                  };
        case G.Universal: {
            if (t.namespace != null && t.namespace !== "*")
                throw new Error(
                    "Namespaced universal selectors are not yet supported by css-select"
                );
            return e;
        }
    }
}
function t0(e) {
    return (
        e.type === G.Pseudo &&
        (e.name === "scope" ||
            (Array.isArray(e.data) && e.data.some((t) => t.some(t0))))
    );
}
const ju = { type: G.Descendant },
    Ku = { type: "_flexibleDescendant" },
    Zu = { type: G.Pseudo, name: "scope", data: null };
function Ju(e, { adapter: t }, r) {
    const a = !!(
        r != null &&
        r.every((n) => {
            const s = t.isTag(n) && t.getParent(n);
            return n === Js || (s && t.isTag(s));
        })
    );
    for (const n of e) {
        if (!(n.length > 0 && qa(n[0]) && n[0].type !== G.Descendant))
            if (a && !n.some(t0)) n.unshift(ju);
            else continue;
        n.unshift(Zu);
    }
}
function r0(e, t, r) {
    var a;
    e.forEach(Hu), (r = (a = t.context) !== null && a !== void 0 ? a : r);
    const n = Array.isArray(r),
        s = r && (Array.isArray(r) ? r : [r]);
    if (t.relativeSelector !== !1) Ju(e, t, s);
    else if (e.some((l) => l.length > 0 && qa(l[0])))
        throw new Error(
            "Relative selectors are not allowed when the `relativeSelector` option is disabled"
        );
    let u = !1;
    const o = e
        .map((l) => {
            if (l.length >= 2) {
                const [c, d] = l;
                c.type !== G.Pseudo ||
                    c.name !== "scope" ||
                    (n && d.type === G.Descendant
                        ? (l[1] = Ku)
                        : (d.type === G.Adjacent || d.type === G.Sibling) &&
                          (u = !0));
            }
            return eo(l, t, s);
        })
        .reduce(to, X.falseFunc);
    return (o.shouldTestNextSiblings = u), o;
}
function eo(e, t, r) {
    var a;
    return e.reduce(
        (n, s) => (n === X.falseFunc ? X.falseFunc : zu(n, s, t, r, r0)),
        (a = t.rootFunc) !== null && a !== void 0 ? a : X.trueFunc
    );
}
function to(e, t) {
    return t === X.falseFunc || e === X.trueFunc
        ? e
        : e === X.falseFunc || t === X.trueFunc
        ? t
        : function (a) {
              return e(a) || t(a);
          };
}
const a0 = (e, t) => e === t,
    ro = { adapter: mr, equals: a0 };
function ao(e) {
    var t, r, a, n;
    const s = e != null ? e : ro;
    return (
        ((t = s.adapter) !== null && t !== void 0) || (s.adapter = mr),
        ((r = s.equals) !== null && r !== void 0) ||
            (s.equals =
                (n =
                    (a = s.adapter) === null || a === void 0
                        ? void 0
                        : a.equals) !== null && n !== void 0
                    ? n
                    : a0),
        s
    );
}
function no(e) {
    return function (r, a, n) {
        const s = ao(a);
        return e(r, s, n);
    };
}
const Ya = no(r0);
function n0(e, t, r = !1) {
    return (
        r && (e = so(e, t)),
        Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e)
    );
}
function so(e, t) {
    const r = Array.isArray(e) ? e.slice(0) : [e],
        a = r.length;
    for (let n = 0; n < a; n++) {
        const s = e0(r[n], t);
        r.push(...s);
    }
    return r;
}
const io = new Set(["first", "last", "eq", "gt", "nth", "lt", "even", "odd"]);
function ur(e) {
    return e.type !== "pseudo"
        ? !1
        : io.has(e.name)
        ? !0
        : e.name === "not" && Array.isArray(e.data)
        ? e.data.some((t) => t.some(ur))
        : !1;
}
function uo(e, t, r) {
    const a = t != null ? parseInt(t, 10) : NaN;
    switch (e) {
        case "first":
            return 1;
        case "nth":
        case "eq":
            return isFinite(a) ? (a >= 0 ? a + 1 : 1 / 0) : 0;
        case "lt":
            return isFinite(a) ? (a >= 0 ? Math.min(a, r) : 1 / 0) : 0;
        case "gt":
            return isFinite(a) ? 1 / 0 : 0;
        case "odd":
            return 2 * r;
        case "even":
            return 2 * r - 1;
        case "last":
        case "not":
            return 1 / 0;
    }
}
function oo(e) {
    for (; e.parent; ) e = e.parent;
    return e;
}
function $a(e) {
    const t = [],
        r = [];
    for (const a of e) a.some(ur) ? t.push(a) : r.push(a);
    return [r, t];
}
const co = { type: G.Universal, namespace: null },
    lo = { type: G.Pseudo, name: "scope", data: null };
function s0(e, t, r = {}) {
    return i0([e], t, r);
}
function i0(e, t, r = {}) {
    if (typeof t == "function") return e.some(t);
    const [a, n] = $a(Tr(t));
    return (
        (a.length > 0 && e.some(Ya(a, r))) ||
        n.some((s) => c0(s, e, r).length > 0)
    );
}
function fo(e, t, r, a) {
    const n = typeof r == "string" ? parseInt(r, 10) : NaN;
    switch (e) {
        case "first":
        case "lt":
            return t;
        case "last":
            return t.length > 0 ? [t[t.length - 1]] : t;
        case "nth":
        case "eq":
            return isFinite(n) && Math.abs(n) < t.length
                ? [n < 0 ? t[t.length + n] : t[n]]
                : [];
        case "gt":
            return isFinite(n) ? t.slice(n + 1) : [];
        case "even":
            return t.filter((s, u) => u % 2 === 0);
        case "odd":
            return t.filter((s, u) => u % 2 === 1);
        case "not": {
            const s = new Set(o0(r, t, a));
            return t.filter((u) => !s.has(u));
        }
    }
}
function u0(e, t, r = {}) {
    return o0(Tr(e), t, r);
}
function o0(e, t, r) {
    if (t.length === 0) return [];
    const [a, n] = $a(e);
    let s;
    if (a.length) {
        const u = Ia(t, a, r);
        if (n.length === 0) return u;
        u.length && (s = new Set(u));
    }
    for (
        let u = 0;
        u < n.length && (s == null ? void 0 : s.size) !== t.length;
        u++
    ) {
        const o = n[u];
        if ((s ? t.filter((d) => Q(d) && !s.has(d)) : t).length === 0) break;
        const c = c0(o, t, r);
        if (c.length)
            if (s) c.forEach((d) => s.add(d));
            else {
                if (u === n.length - 1) return c;
                s = new Set(c);
            }
    }
    return typeof s < "u"
        ? s.size === t.length
            ? t
            : t.filter((u) => s.has(u))
        : [];
}
function c0(e, t, r) {
    var a;
    if (e.some(vt)) {
        const n = (a = r.root) !== null && a !== void 0 ? a : oo(t[0]),
            s = { ...r, context: t, relativeSelector: !1 };
        return e.push(lo), or(n, e, s, !0, t.length);
    }
    return or(t, e, r, !1, t.length);
}
function ho(e, t, r = {}, a = 1 / 0) {
    if (typeof e == "function") return l0(t, e);
    const [n, s] = $a(Tr(e)),
        u = s.map((o) => or(t, o, r, !0, a));
    return (
        n.length && u.push(Na(t, n, r, a)),
        u.length === 0
            ? []
            : u.length === 1
            ? u[0]
            : ht(u.reduce((o, l) => [...o, ...l]))
    );
}
function or(e, t, r, a, n) {
    const s = t.findIndex(ur),
        u = t.slice(0, s),
        o = t[s],
        l = t.length - 1 === s ? n : 1 / 0,
        c = uo(o.name, o.data, l);
    if (c === 0) return [];
    const h = (
        u.length === 0 && !Array.isArray(e)
            ? Er(e).filter(Q)
            : u.length === 0
            ? (Array.isArray(e) ? e : [e]).filter(Q)
            : a || u.some(vt)
            ? Na(e, [u], r, c)
            : Ia(e, [u], r)
    ).slice(0, c);
    let f = fo(o.name, h, o.data, r);
    if (f.length === 0 || t.length === s + 1) return f;
    const m = t.slice(s + 1),
        p = m.some(vt);
    if (p) {
        if (vt(m[0])) {
            const { type: x } = m[0];
            (x === G.Sibling || x === G.Adjacent) && (f = n0(f, mr, !0)),
                m.unshift(co);
        }
        r = { ...r, relativeSelector: !1, rootFunc: (x) => f.includes(x) };
    } else
        r.rootFunc &&
            r.rootFunc !== X.trueFunc &&
            (r = { ...r, rootFunc: X.trueFunc });
    return m.some(ur)
        ? or(f, m, r, !1, n)
        : p
        ? Na(f, [m], r, n)
        : Ia(f, [m], r);
}
function Na(e, t, r, a) {
    const n = Ya(t, r, e);
    return l0(e, n, a);
}
function l0(e, t, r = 1 / 0) {
    const a = n0(e, mr, t.shouldTestNextSiblings);
    return Ha((n) => Q(n) && t(n), a, !0, r);
}
function Ia(e, t, r) {
    const a = (Array.isArray(e) ? e : [e]).filter(Q);
    if (a.length === 0) return a;
    const n = Ya(t, r);
    return n === X.trueFunc ? a : a.filter(n);
}
const Eo = /^\s*[~+]/;
function po(e) {
    var t;
    if (!e) return this._make([]);
    const r = this.toArray();
    if (typeof e != "string") {
        const s = Pe(e) ? e.toArray() : [e];
        return this._make(s.filter((u) => r.some((o) => Gs(o, u))));
    }
    const a = Eo.test(e) ? r : this.children().toArray(),
        n = {
            context: r,
            root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
            xmlMode: this.options.xmlMode,
            lowerCaseTags: this.options.lowerCaseTags,
            lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
            pseudos: this.options.pseudos,
            quirksMode: this.options.quirksMode,
        };
    return this._make(ho(e, a, n));
}
function Wa(e) {
    return function (t, ...r) {
        return function (a) {
            var n;
            let s = e(t, this);
            return (
                a &&
                    (s = Qa(
                        s,
                        a,
                        this.options.xmlMode,
                        (n = this._root) === null || n === void 0
                            ? void 0
                            : n[0]
                    )),
                this._make(
                    this.length > 1 && s.length > 1
                        ? r.reduce((u, o) => o(u), s)
                        : s
                )
            );
        };
    };
}
const Ft = Wa((e, t) => {
        const r = [];
        for (let a = 0; a < t.length; a++) {
            const n = e(t[a]);
            r.push(n);
        }
        return new Array().concat(...r);
    }),
    Ga = Wa((e, t) => {
        const r = [];
        for (let a = 0; a < t.length; a++) {
            const n = e(t[a]);
            n !== null && r.push(n);
        }
        return r;
    });
function Va(e, ...t) {
    let r = null;
    const a = Wa((n, s) => {
        const u = [];
        return (
            le(s, (o) => {
                for (let l; (l = n(o)) && !(r != null && r(l, u.length)); o = l)
                    u.push(l);
            }),
            u
        );
    })(e, ...t);
    return function (n, s) {
        r =
            typeof n == "string"
                ? (o) => s0(o, n, this.options)
                : n
                ? Ut(n)
                : null;
        const u = a.call(this, s);
        return (r = null), u;
    };
}
function Et(e) {
    return Array.from(new Set(e));
}
const mo = Ga(({ parent: e }) => (e && !Ke(e) ? e : null), Et),
    To = Ft(
        (e) => {
            const t = [];
            for (; e.parent && !Ke(e.parent); )
                t.push(e.parent), (e = e.parent);
            return t;
        },
        ht,
        (e) => e.reverse()
    ),
    bo = Va(
        ({ parent: e }) => (e && !Ke(e) ? e : null),
        ht,
        (e) => e.reverse()
    );
function xo(e) {
    var t;
    const r = [];
    if (!e) return this._make(r);
    const a = {
            xmlMode: this.options.xmlMode,
            root: (t = this._root) === null || t === void 0 ? void 0 : t[0],
        },
        n = typeof e == "string" ? (s) => s0(s, e, a) : Ut(e);
    return (
        le(this, (s) => {
            for (; s && Q(s); ) {
                if (n(s, 0)) {
                    r.includes(s) || r.push(s);
                    break;
                }
                s = s.parent;
            }
        }),
        this._make(r)
    );
}
const _o = Ga((e) => wa(e)),
    go = Ft((e) => {
        const t = [];
        for (; e.next; ) (e = e.next), Q(e) && t.push(e);
        return t;
    }, Et),
    Ao = Va((e) => wa(e), Et),
    Co = Ga((e) => Ma(e)),
    No = Ft((e) => {
        const t = [];
        for (; e.prev; ) (e = e.prev), Q(e) && t.push(e);
        return t;
    }, Et),
    Io = Va((e) => Ma(e), Et),
    So = Ft((e) => Hs(e).filter((t) => Q(t) && t !== e), ht),
    Ro = Ft((e) => Er(e).filter(Q), Et);
function vo() {
    const e = this.toArray().reduce(
        (t, r) => (fe(r) ? t.concat(r.children) : t),
        []
    );
    return this._make(e);
}
function yo(e) {
    let t = 0;
    const r = this.length;
    for (; t < r && e.call(this[t], t, this[t]) !== !1; ) ++t;
    return this;
}
function Oo(e) {
    let t = [];
    for (let r = 0; r < this.length; r++) {
        const a = this[r],
            n = e.call(a, r, a);
        n != null && (t = t.concat(n));
    }
    return this._make(t);
}
function Ut(e) {
    return typeof e == "function"
        ? (t, r) => e.call(t, r, t)
        : Pe(e)
        ? (t) => Array.prototype.includes.call(e, t)
        : function (t) {
              return e === t;
          };
}
function Lo(e) {
    var t;
    return this._make(
        Qa(
            this.toArray(),
            e,
            this.options.xmlMode,
            (t = this._root) === null || t === void 0 ? void 0 : t[0]
        )
    );
}
function Qa(e, t, r, a) {
    return typeof t == "string"
        ? u0(t, e, { xmlMode: r, root: a })
        : e.filter(Ut(t));
}
function Do(e) {
    const t = this.toArray();
    return typeof e == "string"
        ? i0(t.filter(Q), e, this.options)
        : e
        ? t.some(Ut(e))
        : !1;
}
function Po(e) {
    let t = this.toArray();
    if (typeof e == "string") {
        const r = new Set(u0(e, t, this.options));
        t = t.filter((a) => !r.has(a));
    } else {
        const r = Ut(e);
        t = t.filter((a, n) => !r(a, n));
    }
    return this._make(t);
}
function Bo(e) {
    return this.filter(
        typeof e == "string"
            ? `:has(${e})`
            : (t, r) => this._make(r).find(e).length > 0
    );
}
function ko() {
    return this.length > 1 ? this._make(this[0]) : this;
}
function wo() {
    return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function Mo(e) {
    var t;
    return (
        (e = +e),
        e === 0 && this.length <= 1
            ? this
            : (e < 0 && (e = this.length + e),
              this._make((t = this[e]) !== null && t !== void 0 ? t : []))
    );
}
function Ho(e) {
    return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
function Fo() {
    return Array.prototype.slice.call(this);
}
function Uo(e) {
    let t, r;
    return (
        e == null
            ? ((t = this.parent().children()), (r = this[0]))
            : typeof e == "string"
            ? ((t = this._make(e)), (r = this[0]))
            : ((t = this), (r = Pe(e) ? e[0] : e)),
        Array.prototype.indexOf.call(t, r)
    );
}
function qo(e, t) {
    return this._make(Array.prototype.slice.call(this, e, t));
}
function Yo() {
    var e;
    return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
function $o(e, t) {
    const r = this._make(e, t),
        a = ht([...this.get(), ...r.get()]);
    return this._make(a);
}
function Wo(e) {
    return this.prevObject
        ? this.add(e ? this.prevObject.filter(e) : this.prevObject)
        : this;
}
const Go = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            find: po,
            parent: mo,
            parents: To,
            parentsUntil: bo,
            closest: xo,
            next: _o,
            nextAll: go,
            nextUntil: Ao,
            prev: Co,
            prevAll: No,
            prevUntil: Io,
            siblings: So,
            children: Ro,
            contents: vo,
            each: yo,
            map: Oo,
            filter: Lo,
            filterArray: Qa,
            is: Do,
            not: Po,
            has: Bo,
            first: ko,
            last: wo,
            eq: Mo,
            get: Ho,
            toArray: Fo,
            index: Uo,
            slice: qo,
            end: Yo,
            add: $o,
            addBack: Wo,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
function Vo(e) {
    return function (r, a, n, s) {
        if (
            (typeof Buffer < "u" && Buffer.isBuffer(r) && (r = r.toString()),
            typeof r == "string")
        )
            return e(r, a, n, s);
        const u = r;
        if (!Array.isArray(u) && Ke(u)) return u;
        const o = new ze([]);
        return je(u, o), o;
    };
}
function je(e, t) {
    const r = Array.isArray(e) ? e : [e];
    t ? (t.children = r) : (t = null);
    for (let a = 0; a < r.length; a++) {
        const n = r[a];
        n.parent && n.parent.children !== r && Ze(n),
            t
                ? ((n.prev = r[a - 1] || null), (n.next = r[a + 1] || null))
                : (n.prev = n.next = null),
            (n.parent = t);
    }
    return t;
}
function Qo(e, t) {
    return e == null
        ? []
        : Pe(e)
        ? t
            ? _a(e.get())
            : e.get()
        : Array.isArray(e)
        ? e.reduce((r, a) => r.concat(this._makeDomArray(a, t)), [])
        : typeof e == "string"
        ? this._parse(e, this.options, !1, null).children
        : t
        ? _a([e])
        : [e];
}
function d0(e) {
    return function (...t) {
        const r = this.length - 1;
        return le(this, (a, n) => {
            if (!fe(a)) return;
            const s =
                    typeof t[0] == "function"
                        ? t[0].call(a, n, this._render(a.children))
                        : t,
                u = this._makeDomArray(s, n < r);
            e(u, a.children, a);
        });
    };
}
function Ge(e, t, r, a, n) {
    var s, u;
    const o = [t, r, ...a],
        l = t === 0 ? null : e[t - 1],
        c = t + r >= e.length ? null : e[t + r];
    for (let d = 0; d < a.length; ++d) {
        const h = a[d],
            f = h.parent;
        if (f) {
            const p = f.children.indexOf(h);
            p > -1 && (f.children.splice(p, 1), n === f && t > p && o[0]--);
        }
        (h.parent = n),
            h.prev &&
                (h.prev.next =
                    (s = h.next) !== null && s !== void 0 ? s : null),
            h.next &&
                (h.next.prev =
                    (u = h.prev) !== null && u !== void 0 ? u : null),
            (h.prev = d === 0 ? l : a[d - 1]),
            (h.next = d === a.length - 1 ? c : a[d + 1]);
    }
    return (
        l && (l.next = a[0]), c && (c.prev = a[a.length - 1]), e.splice(...o)
    );
}
function Xo(e) {
    return (Pe(e) ? e : this._make(e)).append(this), this;
}
function zo(e) {
    return (Pe(e) ? e : this._make(e)).prepend(this), this;
}
const jo = d0((e, t, r) => {
        Ge(t, t.length, 0, e, r);
    }),
    Ko = d0((e, t, r) => {
        Ge(t, 0, 0, e, r);
    });
function f0(e) {
    return function (t) {
        const r = this.length - 1,
            a = this.parents().last();
        for (let n = 0; n < this.length; n++) {
            const s = this[n],
                u =
                    typeof t == "function"
                        ? t.call(s, n, s)
                        : typeof t == "string" && !ga(t)
                        ? a.find(t).clone()
                        : t,
                [o] = this._makeDomArray(u, n < r);
            if (!o || !fe(o)) continue;
            let l = o,
                c = 0;
            for (; c < l.children.length; ) {
                const d = l.children[c];
                Q(d) ? ((l = d), (c = 0)) : c++;
            }
            e(s, l, [o]);
        }
        return this;
    };
}
const Zo = f0((e, t, r) => {
        const { parent: a } = e;
        if (!a) return;
        const n = a.children,
            s = n.indexOf(e);
        je([e], t), Ge(n, s, 0, r, a);
    }),
    Jo = f0((e, t, r) => {
        !fe(e) || (je(e.children, t), je(r, e));
    });
function ec(e) {
    return (
        this.parent(e)
            .not("body")
            .each((t, r) => {
                this._make(r).replaceWith(r.children);
            }),
        this
    );
}
function tc(e) {
    const t = this[0];
    if (t) {
        const r = this._make(
            typeof e == "function" ? e.call(t, 0, t) : e
        ).insertBefore(t);
        let a;
        for (let s = 0; s < r.length; s++) r[s].type === "tag" && (a = r[s]);
        let n = 0;
        for (; a && n < a.children.length; ) {
            const s = a.children[n];
            s.type === "tag" ? ((a = s), (n = 0)) : n++;
        }
        a && this._make(a).append(this);
    }
    return this;
}
function rc(...e) {
    const t = this.length - 1;
    return le(this, (r, a) => {
        const { parent: n } = r;
        if (!fe(r) || !n) return;
        const s = n.children,
            u = s.indexOf(r);
        if (u < 0) return;
        const o =
                typeof e[0] == "function"
                    ? e[0].call(r, a, this._render(r.children))
                    : e,
            l = this._makeDomArray(o, a < t);
        Ge(s, u + 1, 0, l, n);
    });
}
function ac(e) {
    typeof e == "string" && (e = this._make(e)), this.remove();
    const t = [];
    return (
        this._makeDomArray(e).forEach((r) => {
            const a = this.clone().toArray(),
                { parent: n } = r;
            if (!n) return;
            const s = n.children,
                u = s.indexOf(r);
            u < 0 || (Ge(s, u + 1, 0, a, n), t.push(...a));
        }),
        this._make(t)
    );
}
function nc(...e) {
    const t = this.length - 1;
    return le(this, (r, a) => {
        const { parent: n } = r;
        if (!fe(r) || !n) return;
        const s = n.children,
            u = s.indexOf(r);
        if (u < 0) return;
        const o =
                typeof e[0] == "function"
                    ? e[0].call(r, a, this._render(r.children))
                    : e,
            l = this._makeDomArray(o, a < t);
        Ge(s, u, 0, l, n);
    });
}
function sc(e) {
    const t = this._make(e);
    this.remove();
    const r = [];
    return (
        le(t, (a) => {
            const n = this.clone().toArray(),
                { parent: s } = a;
            if (!s) return;
            const u = s.children,
                o = u.indexOf(a);
            o < 0 || (Ge(u, o, 0, n, s), r.push(...n));
        }),
        this._make(r)
    );
}
function ic(e) {
    const t = e ? this.filter(e) : this;
    return (
        le(t, (r) => {
            Ze(r), (r.prev = r.next = r.parent = null);
        }),
        this
    );
}
function uc(e) {
    return le(this, (t, r) => {
        const { parent: a } = t;
        if (!a) return;
        const n = a.children,
            s = typeof e == "function" ? e.call(t, r, t) : e,
            u = this._makeDomArray(s);
        je(u, null);
        const o = n.indexOf(t);
        Ge(n, o, 1, u, a), u.includes(t) || (t.parent = t.prev = t.next = null);
    });
}
function oc() {
    return le(this, (e) => {
        !fe(e) ||
            (e.children.forEach((t) => {
                t.next = t.prev = t.parent = null;
            }),
            (e.children.length = 0));
    });
}
function cc(e) {
    if (e === void 0) {
        const t = this[0];
        return !t || !fe(t) ? null : this._render(t.children);
    }
    return le(this, (t) => {
        if (!fe(t)) return;
        t.children.forEach((a) => {
            a.next = a.prev = a.parent = null;
        });
        const r = Pe(e)
            ? e.toArray()
            : this._parse(`${e}`, this.options, !1, t).children;
        je(r, t);
    });
}
function lc() {
    return this._render(this);
}
function dc(e) {
    return e === void 0
        ? wt(this)
        : typeof e == "function"
        ? le(this, (t, r) => this._make(t).text(e.call(t, r, wt([t]))))
        : le(this, (t) => {
              if (!fe(t)) return;
              t.children.forEach((a) => {
                  a.next = a.prev = a.parent = null;
              });
              const r = new kt(`${e}`);
              je(r, t);
          });
}
function fc() {
    return this._make(_a(this.get()));
}
const hc = Object.freeze(
    Object.defineProperty(
        {
            __proto__: null,
            _makeDomArray: Qo,
            appendTo: Xo,
            prependTo: zo,
            append: jo,
            prepend: Ko,
            wrap: Zo,
            wrapInner: Jo,
            unwrap: ec,
            wrapAll: tc,
            after: rc,
            insertAfter: ac,
            before: nc,
            insertBefore: sc,
            remove: ic,
            replaceWith: uc,
            empty: oc,
            html: cc,
            toString: lc,
            text: dc,
            clone: fc,
        },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
function Ec(e, t) {
    if ((e != null && t != null) || (typeof e == "object" && !Array.isArray(e)))
        return le(this, (r, a) => {
            Q(r) && h0(r, e, t, a);
        });
    if (this.length !== 0) return E0(this[0], e);
}
function h0(e, t, r, a) {
    if (typeof t == "string") {
        const n = E0(e),
            s = typeof r == "function" ? r.call(e, a, n[t]) : r;
        s === "" ? delete n[t] : s != null && (n[t] = s),
            (e.attribs.style = pc(n));
    } else
        typeof t == "object" &&
            Object.keys(t).forEach((n, s) => {
                h0(e, n, t[n], s);
            });
}
function E0(e, t) {
    if (!e || !Q(e)) return;
    const r = mc(e.attribs.style);
    if (typeof t == "string") return r[t];
    if (Array.isArray(t)) {
        const a = {};
        return (
            t.forEach((n) => {
                r[n] != null && (a[n] = r[n]);
            }),
            a
        );
    }
    return r;
}
function pc(e) {
    return Object.keys(e).reduce(
        (t, r) => `${t}${t ? " " : ""}${r}: ${e[r]};`,
        ""
    );
}
function mc(e) {
    if (((e = (e || "").trim()), !e)) return {};
    const t = {};
    let r;
    for (const a of e.split(";")) {
        const n = a.indexOf(":");
        if (n < 1 || n === a.length - 1) {
            const s = a.trimEnd();
            s.length > 0 && r !== void 0 && (t[r] += `;${s}`);
        } else (r = a.slice(0, n).trim()), (t[r] = a.slice(n + 1).trim());
    }
    return t;
}
const Tc = Object.freeze(
        Object.defineProperty(
            { __proto__: null, css: Ec },
            Symbol.toStringTag,
            {
                value: "Module",
            }
        )
    ),
    vn = "input,select,textarea,keygen",
    bc = /%20/g,
    yn = /\r?\n/g;
function xc() {
    return this.serializeArray()
        .map(
            (r) =>
                `${encodeURIComponent(r.name)}=${encodeURIComponent(r.value)}`
        )
        .join("&")
        .replace(bc, "+");
}
function _c() {
    return this.map((e, t) => {
        const r = this._make(t);
        return Q(t) && t.name === "form"
            ? r.find(vn).toArray()
            : r.filter(vn).toArray();
    })
        .filter(
            '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
        )
        .map((e, t) => {
            var r;
            const a = this._make(t),
                n = a.attr("name"),
                s = (r = a.val()) !== null && r !== void 0 ? r : "";
            return Array.isArray(s)
                ? s.map((u) => ({
                      name: n,
                      value: u.replace(
                          yn,
                          `\r
`
                      ),
                  }))
                : {
                      name: n,
                      value: s.replace(
                          yn,
                          `\r
`
                      ),
                  };
        })
        .toArray();
}
const gc = Object.freeze(
    Object.defineProperty(
        { __proto__: null, serialize: xc, serializeArray: _c },
        Symbol.toStringTag,
        { value: "Module" }
    )
);
class qt {
    constructor(t, r, a) {
        if (((this.length = 0), (this.options = a), (this._root = r), t)) {
            for (let n = 0; n < t.length; n++) this[n] = t[n];
            this.length = t.length;
        }
    }
}
qt.prototype.cheerio = "[cheerio object]";
qt.prototype.splice = Array.prototype.splice;
qt.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(qt.prototype, Ou, Go, hc, Tc, gc);
function Ac(e, t) {
    return function r(a, n, s = !0) {
        if (a == null) throw new Error("cheerio.load() expects a string");
        const u = { ...Oa, ...ba(n) },
            o = e(a, u, s, null);
        class l extends qt {
            _make(h, f) {
                const m = c(h, f);
                return (m.prevObject = this), m;
            }
            _parse(h, f, m, p) {
                return e(h, f, m, p);
            }
            _render(h) {
                return t(h, this.options);
            }
        }
        function c(d, h, f = o, m) {
            if (d && Pe(d)) return d;
            const p = { ...u, ...ba(m) },
                x =
                    typeof f == "string"
                        ? [e(f, p, !1, null)]
                        : "length" in f
                        ? f
                        : [f],
                C = Pe(x) ? x : new l(x, null, p);
            if (((C._root = C), !d)) return new l(void 0, C, p);
            const S =
                    typeof d == "string" && ga(d)
                        ? e(d, p, !1, null).children
                        : Cc(d)
                        ? [d]
                        : Array.isArray(d)
                        ? d
                        : void 0,
                _ = new l(S, C, p);
            if (S) return _;
            if (typeof d != "string")
                throw new Error("Unexpected type of selector");
            let g = d;
            const A = h
                ? typeof h == "string"
                    ? ga(h)
                        ? new l([e(h, p, !1, null)], C, p)
                        : ((g = `${h} ${g}`), C)
                    : Pe(h)
                    ? h
                    : new l(Array.isArray(h) ? h : [h], C, p)
                : C;
            return A ? A.find(g) : _;
        }
        return (
            Object.assign(c, _u, {
                load: r,
                _root: o,
                _options: u,
                fn: l.prototype,
                prototype: l.prototype,
            }),
            c
        );
    };
}
function Cc(e) {
    return (
        !!e.name ||
        e.type === "root" ||
        e.type === "text" ||
        e.type === "comment"
    );
}
const Nc = new Set([
        65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
        327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
        655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
        917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
    ]),
    ce = "\uFFFD";
var E;
(function (e) {
    (e[(e.EOF = -1)] = "EOF"),
        (e[(e.NULL = 0)] = "NULL"),
        (e[(e.TABULATION = 9)] = "TABULATION"),
        (e[(e.CARRIAGE_RETURN = 13)] = "CARRIAGE_RETURN"),
        (e[(e.LINE_FEED = 10)] = "LINE_FEED"),
        (e[(e.FORM_FEED = 12)] = "FORM_FEED"),
        (e[(e.SPACE = 32)] = "SPACE"),
        (e[(e.EXCLAMATION_MARK = 33)] = "EXCLAMATION_MARK"),
        (e[(e.QUOTATION_MARK = 34)] = "QUOTATION_MARK"),
        (e[(e.NUMBER_SIGN = 35)] = "NUMBER_SIGN"),
        (e[(e.AMPERSAND = 38)] = "AMPERSAND"),
        (e[(e.APOSTROPHE = 39)] = "APOSTROPHE"),
        (e[(e.HYPHEN_MINUS = 45)] = "HYPHEN_MINUS"),
        (e[(e.SOLIDUS = 47)] = "SOLIDUS"),
        (e[(e.DIGIT_0 = 48)] = "DIGIT_0"),
        (e[(e.DIGIT_9 = 57)] = "DIGIT_9"),
        (e[(e.SEMICOLON = 59)] = "SEMICOLON"),
        (e[(e.LESS_THAN_SIGN = 60)] = "LESS_THAN_SIGN"),
        (e[(e.EQUALS_SIGN = 61)] = "EQUALS_SIGN"),
        (e[(e.GREATER_THAN_SIGN = 62)] = "GREATER_THAN_SIGN"),
        (e[(e.QUESTION_MARK = 63)] = "QUESTION_MARK"),
        (e[(e.LATIN_CAPITAL_A = 65)] = "LATIN_CAPITAL_A"),
        (e[(e.LATIN_CAPITAL_F = 70)] = "LATIN_CAPITAL_F"),
        (e[(e.LATIN_CAPITAL_X = 88)] = "LATIN_CAPITAL_X"),
        (e[(e.LATIN_CAPITAL_Z = 90)] = "LATIN_CAPITAL_Z"),
        (e[(e.RIGHT_SQUARE_BRACKET = 93)] = "RIGHT_SQUARE_BRACKET"),
        (e[(e.GRAVE_ACCENT = 96)] = "GRAVE_ACCENT"),
        (e[(e.LATIN_SMALL_A = 97)] = "LATIN_SMALL_A"),
        (e[(e.LATIN_SMALL_F = 102)] = "LATIN_SMALL_F"),
        (e[(e.LATIN_SMALL_X = 120)] = "LATIN_SMALL_X"),
        (e[(e.LATIN_SMALL_Z = 122)] = "LATIN_SMALL_Z"),
        (e[(e.REPLACEMENT_CHARACTER = 65533)] = "REPLACEMENT_CHARACTER");
})((E = E || (E = {})));
const me = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system",
};
function p0(e) {
    return e >= 55296 && e <= 57343;
}
function Ic(e) {
    return e >= 56320 && e <= 57343;
}
function Sc(e, t) {
    return (e - 55296) * 1024 + 9216 + t;
}
function m0(e) {
    return (
        (e !== 32 &&
            e !== 10 &&
            e !== 13 &&
            e !== 9 &&
            e !== 12 &&
            e >= 1 &&
            e <= 31) ||
        (e >= 127 && e <= 159)
    );
}
function T0(e) {
    return (e >= 64976 && e <= 65007) || Nc.has(e);
}
var O;
(function (e) {
    (e.controlCharacterInInputStream = "control-character-in-input-stream"),
        (e.noncharacterInInputStream = "noncharacter-in-input-stream"),
        (e.surrogateInInputStream = "surrogate-in-input-stream"),
        (e.nonVoidHtmlElementStartTagWithTrailingSolidus =
            "non-void-html-element-start-tag-with-trailing-solidus"),
        (e.endTagWithAttributes = "end-tag-with-attributes"),
        (e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus"),
        (e.unexpectedSolidusInTag = "unexpected-solidus-in-tag"),
        (e.unexpectedNullCharacter = "unexpected-null-character"),
        (e.unexpectedQuestionMarkInsteadOfTagName =
            "unexpected-question-mark-instead-of-tag-name"),
        (e.invalidFirstCharacterOfTagName =
            "invalid-first-character-of-tag-name"),
        (e.unexpectedEqualsSignBeforeAttributeName =
            "unexpected-equals-sign-before-attribute-name"),
        (e.missingEndTagName = "missing-end-tag-name"),
        (e.unexpectedCharacterInAttributeName =
            "unexpected-character-in-attribute-name"),
        (e.unknownNamedCharacterReference =
            "unknown-named-character-reference"),
        (e.missingSemicolonAfterCharacterReference =
            "missing-semicolon-after-character-reference"),
        (e.unexpectedCharacterAfterDoctypeSystemIdentifier =
            "unexpected-character-after-doctype-system-identifier"),
        (e.unexpectedCharacterInUnquotedAttributeValue =
            "unexpected-character-in-unquoted-attribute-value"),
        (e.eofBeforeTagName = "eof-before-tag-name"),
        (e.eofInTag = "eof-in-tag"),
        (e.missingAttributeValue = "missing-attribute-value"),
        (e.missingWhitespaceBetweenAttributes =
            "missing-whitespace-between-attributes"),
        (e.missingWhitespaceAfterDoctypePublicKeyword =
            "missing-whitespace-after-doctype-public-keyword"),
        (e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers =
            "missing-whitespace-between-doctype-public-and-system-identifiers"),
        (e.missingWhitespaceAfterDoctypeSystemKeyword =
            "missing-whitespace-after-doctype-system-keyword"),
        (e.missingQuoteBeforeDoctypePublicIdentifier =
            "missing-quote-before-doctype-public-identifier"),
        (e.missingQuoteBeforeDoctypeSystemIdentifier =
            "missing-quote-before-doctype-system-identifier"),
        (e.missingDoctypePublicIdentifier =
            "missing-doctype-public-identifier"),
        (e.missingDoctypeSystemIdentifier =
            "missing-doctype-system-identifier"),
        (e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier"),
        (e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier"),
        (e.cdataInHtmlContent = "cdata-in-html-content"),
        (e.incorrectlyOpenedComment = "incorrectly-opened-comment"),
        (e.eofInScriptHtmlCommentLikeText =
            "eof-in-script-html-comment-like-text"),
        (e.eofInDoctype = "eof-in-doctype"),
        (e.nestedComment = "nested-comment"),
        (e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment"),
        (e.eofInComment = "eof-in-comment"),
        (e.incorrectlyClosedComment = "incorrectly-closed-comment"),
        (e.eofInCdata = "eof-in-cdata"),
        (e.absenceOfDigitsInNumericCharacterReference =
            "absence-of-digits-in-numeric-character-reference"),
        (e.nullCharacterReference = "null-character-reference"),
        (e.surrogateCharacterReference = "surrogate-character-reference"),
        (e.characterReferenceOutsideUnicodeRange =
            "character-reference-outside-unicode-range"),
        (e.controlCharacterReference = "control-character-reference"),
        (e.noncharacterCharacterReference = "noncharacter-character-reference"),
        (e.missingWhitespaceBeforeDoctypeName =
            "missing-whitespace-before-doctype-name"),
        (e.missingDoctypeName = "missing-doctype-name"),
        (e.invalidCharacterSequenceAfterDoctypeName =
            "invalid-character-sequence-after-doctype-name"),
        (e.duplicateAttribute = "duplicate-attribute"),
        (e.nonConformingDoctype = "non-conforming-doctype"),
        (e.missingDoctype = "missing-doctype"),
        (e.misplacedDoctype = "misplaced-doctype"),
        (e.endTagWithoutMatchingOpenElement =
            "end-tag-without-matching-open-element"),
        (e.closingOfElementWithOpenChildElements =
            "closing-of-element-with-open-child-elements"),
        (e.disallowedContentInNoscriptInHead =
            "disallowed-content-in-noscript-in-head"),
        (e.openElementsLeftAfterEof = "open-elements-left-after-eof"),
        (e.abandonedHeadElementChild = "abandoned-head-element-child"),
        (e.misplacedStartTagForHeadElement =
            "misplaced-start-tag-for-head-element"),
        (e.nestedNoscriptInHead = "nested-noscript-in-head"),
        (e.eofInElementThatCanContainOnlyText =
            "eof-in-element-that-can-contain-only-text");
})((O = O || (O = {})));
const Rc = 1 << 16;
class vc {
    constructor(t) {
        (this.handler = t),
            (this.html = ""),
            (this.pos = -1),
            (this.lastGapPos = -2),
            (this.gapStack = []),
            (this.skipNextNewLine = !1),
            (this.lastChunkWritten = !1),
            (this.endOfChunkHit = !1),
            (this.bufferWaterline = Rc),
            (this.isEol = !1),
            (this.lineStartPos = 0),
            (this.droppedBufferSize = 0),
            (this.line = 1),
            (this.lastErrOffset = -1);
    }
    get col() {
        return (
            this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos)
        );
    }
    get offset() {
        return this.droppedBufferSize + this.pos;
    }
    getError(t) {
        const { line: r, col: a, offset: n } = this;
        return {
            code: t,
            startLine: r,
            endLine: r,
            startCol: a,
            endCol: a,
            startOffset: n,
            endOffset: n,
        };
    }
    _err(t) {
        this.handler.onParseError &&
            this.lastErrOffset !== this.offset &&
            ((this.lastErrOffset = this.offset),
            this.handler.onParseError(this.getError(t)));
    }
    _addGap() {
        this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos);
    }
    _processSurrogate(t) {
        if (this.pos !== this.html.length - 1) {
            const r = this.html.charCodeAt(this.pos + 1);
            if (Ic(r)) return this.pos++, this._addGap(), Sc(t, r);
        } else if (!this.lastChunkWritten)
            return (this.endOfChunkHit = !0), E.EOF;
        return this._err(O.surrogateInInputStream), t;
    }
    willDropParsedChunk() {
        return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
        this.willDropParsedChunk() &&
            ((this.html = this.html.substring(this.pos)),
            (this.lineStartPos -= this.pos),
            (this.droppedBufferSize += this.pos),
            (this.pos = 0),
            (this.lastGapPos = -2),
            (this.gapStack.length = 0));
    }
    write(t, r) {
        this.html.length > 0 ? (this.html += t) : (this.html = t),
            (this.endOfChunkHit = !1),
            (this.lastChunkWritten = r);
    }
    insertHtmlAtCurrentPos(t) {
        (this.html =
            this.html.substring(0, this.pos + 1) +
            t +
            this.html.substring(this.pos + 1)),
            (this.endOfChunkHit = !1);
    }
    startsWith(t, r) {
        if (this.pos + t.length > this.html.length)
            return (this.endOfChunkHit = !this.lastChunkWritten), !1;
        if (r) return this.html.startsWith(t, this.pos);
        for (let a = 0; a < t.length; a++)
            if ((this.html.charCodeAt(this.pos + a) | 32) !== t.charCodeAt(a))
                return !1;
        return !0;
    }
    peek(t) {
        const r = this.pos + t;
        return r >= this.html.length
            ? ((this.endOfChunkHit = !this.lastChunkWritten), E.EOF)
            : this.html.charCodeAt(r);
    }
    advance() {
        if (
            (this.pos++,
            this.isEol &&
                ((this.isEol = !1),
                this.line++,
                (this.lineStartPos = this.pos)),
            this.pos >= this.html.length)
        )
            return (this.endOfChunkHit = !this.lastChunkWritten), E.EOF;
        let t = this.html.charCodeAt(this.pos);
        return t === E.CARRIAGE_RETURN
            ? ((this.isEol = !0), (this.skipNextNewLine = !0), E.LINE_FEED)
            : t === E.LINE_FEED && ((this.isEol = !0), this.skipNextNewLine)
            ? (this.line--,
              (this.skipNextNewLine = !1),
              this._addGap(),
              this.advance())
            : ((this.skipNextNewLine = !1),
              p0(t) && (t = this._processSurrogate(t)),
              this.handler.onParseError === null ||
                  (t > 31 && t < 127) ||
                  t === E.LINE_FEED ||
                  t === E.CARRIAGE_RETURN ||
                  (t > 159 && t < 64976) ||
                  this._checkForProblematicCharacters(t),
              t);
    }
    _checkForProblematicCharacters(t) {
        m0(t)
            ? this._err(O.controlCharacterInInputStream)
            : T0(t) && this._err(O.noncharacterInInputStream);
    }
    retreat(t) {
        for (this.pos -= t; this.pos < this.lastGapPos; )
            (this.lastGapPos = this.gapStack.pop()), this.pos--;
        this.isEol = !1;
    }
}
var Z;
(function (e) {
    (e[(e.CHARACTER = 0)] = "CHARACTER"),
        (e[(e.NULL_CHARACTER = 1)] = "NULL_CHARACTER"),
        (e[(e.WHITESPACE_CHARACTER = 2)] = "WHITESPACE_CHARACTER"),
        (e[(e.START_TAG = 3)] = "START_TAG"),
        (e[(e.END_TAG = 4)] = "END_TAG"),
        (e[(e.COMMENT = 5)] = "COMMENT"),
        (e[(e.DOCTYPE = 6)] = "DOCTYPE"),
        (e[(e.EOF = 7)] = "EOF"),
        (e[(e.HIBERNATION = 8)] = "HIBERNATION");
})((Z = Z || (Z = {})));
function b0(e, t) {
    for (let r = e.attrs.length - 1; r >= 0; r--)
        if (e.attrs[r].name === t) return e.attrs[r].value;
    return null;
}
const Ue = new Uint16Array(
        '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'
            .split("")
            .map((e) => e.charCodeAt(0))
    ),
    yc = new Uint16Array(
        "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022"
            .split("")
            .map((e) => e.charCodeAt(0))
    );
var Br;
const Oc = new Map([
        [0, 65533],
        [128, 8364],
        [130, 8218],
        [131, 402],
        [132, 8222],
        [133, 8230],
        [134, 8224],
        [135, 8225],
        [136, 710],
        [137, 8240],
        [138, 352],
        [139, 8249],
        [140, 338],
        [142, 381],
        [145, 8216],
        [146, 8217],
        [147, 8220],
        [148, 8221],
        [149, 8226],
        [150, 8211],
        [151, 8212],
        [152, 732],
        [153, 8482],
        [154, 353],
        [155, 8250],
        [156, 339],
        [158, 382],
        [159, 376],
    ]),
    On =
        (Br = String.fromCodePoint) !== null && Br !== void 0
            ? Br
            : function (e) {
                  let t = "";
                  return (
                      e > 65535 &&
                          ((e -= 65536),
                          (t += String.fromCharCode(
                              ((e >>> 10) & 1023) | 55296
                          )),
                          (e = 56320 | (e & 1023))),
                      (t += String.fromCharCode(e)),
                      t
                  );
              };
function Lc(e) {
    var t;
    return (e >= 55296 && e <= 57343) || e > 1114111
        ? 65533
        : (t = Oc.get(e)) !== null && t !== void 0
        ? t
        : e;
}
var Ln;
(function (e) {
    (e[(e.NUM = 35)] = "NUM"),
        (e[(e.SEMI = 59)] = "SEMI"),
        (e[(e.ZERO = 48)] = "ZERO"),
        (e[(e.NINE = 57)] = "NINE"),
        (e[(e.LOWER_A = 97)] = "LOWER_A"),
        (e[(e.LOWER_F = 102)] = "LOWER_F"),
        (e[(e.LOWER_X = 120)] = "LOWER_X"),
        (e[(e.To_LOWER_BIT = 32)] = "To_LOWER_BIT");
})(Ln || (Ln = {}));
var we;
(function (e) {
    (e[(e.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
        (e[(e.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
        (e[(e.JUMP_TABLE = 127)] = "JUMP_TABLE");
})(we || (we = {}));
function x0(e, t, r, a) {
    const n = (t & we.BRANCH_LENGTH) >> 7,
        s = t & we.JUMP_TABLE;
    if (n === 0) return s !== 0 && a === s ? r : -1;
    if (s) {
        const l = a - s;
        return l < 0 || l >= n ? -1 : e[r + l] - 1;
    }
    let u = r,
        o = u + n - 1;
    for (; u <= o; ) {
        const l = (u + o) >>> 1,
            c = e[l];
        if (c < a) u = l + 1;
        else if (c > a) o = l - 1;
        else return e[l + n];
    }
    return -1;
}
var L;
(function (e) {
    (e.HTML = "http://www.w3.org/1999/xhtml"),
        (e.MATHML = "http://www.w3.org/1998/Math/MathML"),
        (e.SVG = "http://www.w3.org/2000/svg"),
        (e.XLINK = "http://www.w3.org/1999/xlink"),
        (e.XML = "http://www.w3.org/XML/1998/namespace"),
        (e.XMLNS = "http://www.w3.org/2000/xmlns/");
})((L = L || (L = {})));
var $e;
(function (e) {
    (e.TYPE = "type"),
        (e.ACTION = "action"),
        (e.ENCODING = "encoding"),
        (e.PROMPT = "prompt"),
        (e.NAME = "name"),
        (e.COLOR = "color"),
        (e.FACE = "face"),
        (e.SIZE = "size");
})(($e = $e || ($e = {})));
var xe;
(function (e) {
    (e.NO_QUIRKS = "no-quirks"),
        (e.QUIRKS = "quirks"),
        (e.LIMITED_QUIRKS = "limited-quirks");
})((xe = xe || (xe = {})));
var I;
(function (e) {
    (e.A = "a"),
        (e.ADDRESS = "address"),
        (e.ANNOTATION_XML = "annotation-xml"),
        (e.APPLET = "applet"),
        (e.AREA = "area"),
        (e.ARTICLE = "article"),
        (e.ASIDE = "aside"),
        (e.B = "b"),
        (e.BASE = "base"),
        (e.BASEFONT = "basefont"),
        (e.BGSOUND = "bgsound"),
        (e.BIG = "big"),
        (e.BLOCKQUOTE = "blockquote"),
        (e.BODY = "body"),
        (e.BR = "br"),
        (e.BUTTON = "button"),
        (e.CAPTION = "caption"),
        (e.CENTER = "center"),
        (e.CODE = "code"),
        (e.COL = "col"),
        (e.COLGROUP = "colgroup"),
        (e.DD = "dd"),
        (e.DESC = "desc"),
        (e.DETAILS = "details"),
        (e.DIALOG = "dialog"),
        (e.DIR = "dir"),
        (e.DIV = "div"),
        (e.DL = "dl"),
        (e.DT = "dt"),
        (e.EM = "em"),
        (e.EMBED = "embed"),
        (e.FIELDSET = "fieldset"),
        (e.FIGCAPTION = "figcaption"),
        (e.FIGURE = "figure"),
        (e.FONT = "font"),
        (e.FOOTER = "footer"),
        (e.FOREIGN_OBJECT = "foreignObject"),
        (e.FORM = "form"),
        (e.FRAME = "frame"),
        (e.FRAMESET = "frameset"),
        (e.H1 = "h1"),
        (e.H2 = "h2"),
        (e.H3 = "h3"),
        (e.H4 = "h4"),
        (e.H5 = "h5"),
        (e.H6 = "h6"),
        (e.HEAD = "head"),
        (e.HEADER = "header"),
        (e.HGROUP = "hgroup"),
        (e.HR = "hr"),
        (e.HTML = "html"),
        (e.I = "i"),
        (e.IMG = "img"),
        (e.IMAGE = "image"),
        (e.INPUT = "input"),
        (e.IFRAME = "iframe"),
        (e.KEYGEN = "keygen"),
        (e.LABEL = "label"),
        (e.LI = "li"),
        (e.LINK = "link"),
        (e.LISTING = "listing"),
        (e.MAIN = "main"),
        (e.MALIGNMARK = "malignmark"),
        (e.MARQUEE = "marquee"),
        (e.MATH = "math"),
        (e.MENU = "menu"),
        (e.META = "meta"),
        (e.MGLYPH = "mglyph"),
        (e.MI = "mi"),
        (e.MO = "mo"),
        (e.MN = "mn"),
        (e.MS = "ms"),
        (e.MTEXT = "mtext"),
        (e.NAV = "nav"),
        (e.NOBR = "nobr"),
        (e.NOFRAMES = "noframes"),
        (e.NOEMBED = "noembed"),
        (e.NOSCRIPT = "noscript"),
        (e.OBJECT = "object"),
        (e.OL = "ol"),
        (e.OPTGROUP = "optgroup"),
        (e.OPTION = "option"),
        (e.P = "p"),
        (e.PARAM = "param"),
        (e.PLAINTEXT = "plaintext"),
        (e.PRE = "pre"),
        (e.RB = "rb"),
        (e.RP = "rp"),
        (e.RT = "rt"),
        (e.RTC = "rtc"),
        (e.RUBY = "ruby"),
        (e.S = "s"),
        (e.SCRIPT = "script"),
        (e.SECTION = "section"),
        (e.SELECT = "select"),
        (e.SOURCE = "source"),
        (e.SMALL = "small"),
        (e.SPAN = "span"),
        (e.STRIKE = "strike"),
        (e.STRONG = "strong"),
        (e.STYLE = "style"),
        (e.SUB = "sub"),
        (e.SUMMARY = "summary"),
        (e.SUP = "sup"),
        (e.TABLE = "table"),
        (e.TBODY = "tbody"),
        (e.TEMPLATE = "template"),
        (e.TEXTAREA = "textarea"),
        (e.TFOOT = "tfoot"),
        (e.TD = "td"),
        (e.TH = "th"),
        (e.THEAD = "thead"),
        (e.TITLE = "title"),
        (e.TR = "tr"),
        (e.TRACK = "track"),
        (e.TT = "tt"),
        (e.U = "u"),
        (e.UL = "ul"),
        (e.SVG = "svg"),
        (e.VAR = "var"),
        (e.WBR = "wbr"),
        (e.XMP = "xmp");
})((I = I || (I = {})));
var i;
(function (e) {
    (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
        (e[(e.A = 1)] = "A"),
        (e[(e.ADDRESS = 2)] = "ADDRESS"),
        (e[(e.ANNOTATION_XML = 3)] = "ANNOTATION_XML"),
        (e[(e.APPLET = 4)] = "APPLET"),
        (e[(e.AREA = 5)] = "AREA"),
        (e[(e.ARTICLE = 6)] = "ARTICLE"),
        (e[(e.ASIDE = 7)] = "ASIDE"),
        (e[(e.B = 8)] = "B"),
        (e[(e.BASE = 9)] = "BASE"),
        (e[(e.BASEFONT = 10)] = "BASEFONT"),
        (e[(e.BGSOUND = 11)] = "BGSOUND"),
        (e[(e.BIG = 12)] = "BIG"),
        (e[(e.BLOCKQUOTE = 13)] = "BLOCKQUOTE"),
        (e[(e.BODY = 14)] = "BODY"),
        (e[(e.BR = 15)] = "BR"),
        (e[(e.BUTTON = 16)] = "BUTTON"),
        (e[(e.CAPTION = 17)] = "CAPTION"),
        (e[(e.CENTER = 18)] = "CENTER"),
        (e[(e.CODE = 19)] = "CODE"),
        (e[(e.COL = 20)] = "COL"),
        (e[(e.COLGROUP = 21)] = "COLGROUP"),
        (e[(e.DD = 22)] = "DD"),
        (e[(e.DESC = 23)] = "DESC"),
        (e[(e.DETAILS = 24)] = "DETAILS"),
        (e[(e.DIALOG = 25)] = "DIALOG"),
        (e[(e.DIR = 26)] = "DIR"),
        (e[(e.DIV = 27)] = "DIV"),
        (e[(e.DL = 28)] = "DL"),
        (e[(e.DT = 29)] = "DT"),
        (e[(e.EM = 30)] = "EM"),
        (e[(e.EMBED = 31)] = "EMBED"),
        (e[(e.FIELDSET = 32)] = "FIELDSET"),
        (e[(e.FIGCAPTION = 33)] = "FIGCAPTION"),
        (e[(e.FIGURE = 34)] = "FIGURE"),
        (e[(e.FONT = 35)] = "FONT"),
        (e[(e.FOOTER = 36)] = "FOOTER"),
        (e[(e.FOREIGN_OBJECT = 37)] = "FOREIGN_OBJECT"),
        (e[(e.FORM = 38)] = "FORM"),
        (e[(e.FRAME = 39)] = "FRAME"),
        (e[(e.FRAMESET = 40)] = "FRAMESET"),
        (e[(e.H1 = 41)] = "H1"),
        (e[(e.H2 = 42)] = "H2"),
        (e[(e.H3 = 43)] = "H3"),
        (e[(e.H4 = 44)] = "H4"),
        (e[(e.H5 = 45)] = "H5"),
        (e[(e.H6 = 46)] = "H6"),
        (e[(e.HEAD = 47)] = "HEAD"),
        (e[(e.HEADER = 48)] = "HEADER"),
        (e[(e.HGROUP = 49)] = "HGROUP"),
        (e[(e.HR = 50)] = "HR"),
        (e[(e.HTML = 51)] = "HTML"),
        (e[(e.I = 52)] = "I"),
        (e[(e.IMG = 53)] = "IMG"),
        (e[(e.IMAGE = 54)] = "IMAGE"),
        (e[(e.INPUT = 55)] = "INPUT"),
        (e[(e.IFRAME = 56)] = "IFRAME"),
        (e[(e.KEYGEN = 57)] = "KEYGEN"),
        (e[(e.LABEL = 58)] = "LABEL"),
        (e[(e.LI = 59)] = "LI"),
        (e[(e.LINK = 60)] = "LINK"),
        (e[(e.LISTING = 61)] = "LISTING"),
        (e[(e.MAIN = 62)] = "MAIN"),
        (e[(e.MALIGNMARK = 63)] = "MALIGNMARK"),
        (e[(e.MARQUEE = 64)] = "MARQUEE"),
        (e[(e.MATH = 65)] = "MATH"),
        (e[(e.MENU = 66)] = "MENU"),
        (e[(e.META = 67)] = "META"),
        (e[(e.MGLYPH = 68)] = "MGLYPH"),
        (e[(e.MI = 69)] = "MI"),
        (e[(e.MO = 70)] = "MO"),
        (e[(e.MN = 71)] = "MN"),
        (e[(e.MS = 72)] = "MS"),
        (e[(e.MTEXT = 73)] = "MTEXT"),
        (e[(e.NAV = 74)] = "NAV"),
        (e[(e.NOBR = 75)] = "NOBR"),
        (e[(e.NOFRAMES = 76)] = "NOFRAMES"),
        (e[(e.NOEMBED = 77)] = "NOEMBED"),
        (e[(e.NOSCRIPT = 78)] = "NOSCRIPT"),
        (e[(e.OBJECT = 79)] = "OBJECT"),
        (e[(e.OL = 80)] = "OL"),
        (e[(e.OPTGROUP = 81)] = "OPTGROUP"),
        (e[(e.OPTION = 82)] = "OPTION"),
        (e[(e.P = 83)] = "P"),
        (e[(e.PARAM = 84)] = "PARAM"),
        (e[(e.PLAINTEXT = 85)] = "PLAINTEXT"),
        (e[(e.PRE = 86)] = "PRE"),
        (e[(e.RB = 87)] = "RB"),
        (e[(e.RP = 88)] = "RP"),
        (e[(e.RT = 89)] = "RT"),
        (e[(e.RTC = 90)] = "RTC"),
        (e[(e.RUBY = 91)] = "RUBY"),
        (e[(e.S = 92)] = "S"),
        (e[(e.SCRIPT = 93)] = "SCRIPT"),
        (e[(e.SECTION = 94)] = "SECTION"),
        (e[(e.SELECT = 95)] = "SELECT"),
        (e[(e.SOURCE = 96)] = "SOURCE"),
        (e[(e.SMALL = 97)] = "SMALL"),
        (e[(e.SPAN = 98)] = "SPAN"),
        (e[(e.STRIKE = 99)] = "STRIKE"),
        (e[(e.STRONG = 100)] = "STRONG"),
        (e[(e.STYLE = 101)] = "STYLE"),
        (e[(e.SUB = 102)] = "SUB"),
        (e[(e.SUMMARY = 103)] = "SUMMARY"),
        (e[(e.SUP = 104)] = "SUP"),
        (e[(e.TABLE = 105)] = "TABLE"),
        (e[(e.TBODY = 106)] = "TBODY"),
        (e[(e.TEMPLATE = 107)] = "TEMPLATE"),
        (e[(e.TEXTAREA = 108)] = "TEXTAREA"),
        (e[(e.TFOOT = 109)] = "TFOOT"),
        (e[(e.TD = 110)] = "TD"),
        (e[(e.TH = 111)] = "TH"),
        (e[(e.THEAD = 112)] = "THEAD"),
        (e[(e.TITLE = 113)] = "TITLE"),
        (e[(e.TR = 114)] = "TR"),
        (e[(e.TRACK = 115)] = "TRACK"),
        (e[(e.TT = 116)] = "TT"),
        (e[(e.U = 117)] = "U"),
        (e[(e.UL = 118)] = "UL"),
        (e[(e.SVG = 119)] = "SVG"),
        (e[(e.VAR = 120)] = "VAR"),
        (e[(e.WBR = 121)] = "WBR"),
        (e[(e.XMP = 122)] = "XMP");
})((i = i || (i = {})));
const Dc = new Map([
    [I.A, i.A],
    [I.ADDRESS, i.ADDRESS],
    [I.ANNOTATION_XML, i.ANNOTATION_XML],
    [I.APPLET, i.APPLET],
    [I.AREA, i.AREA],
    [I.ARTICLE, i.ARTICLE],
    [I.ASIDE, i.ASIDE],
    [I.B, i.B],
    [I.BASE, i.BASE],
    [I.BASEFONT, i.BASEFONT],
    [I.BGSOUND, i.BGSOUND],
    [I.BIG, i.BIG],
    [I.BLOCKQUOTE, i.BLOCKQUOTE],
    [I.BODY, i.BODY],
    [I.BR, i.BR],
    [I.BUTTON, i.BUTTON],
    [I.CAPTION, i.CAPTION],
    [I.CENTER, i.CENTER],
    [I.CODE, i.CODE],
    [I.COL, i.COL],
    [I.COLGROUP, i.COLGROUP],
    [I.DD, i.DD],
    [I.DESC, i.DESC],
    [I.DETAILS, i.DETAILS],
    [I.DIALOG, i.DIALOG],
    [I.DIR, i.DIR],
    [I.DIV, i.DIV],
    [I.DL, i.DL],
    [I.DT, i.DT],
    [I.EM, i.EM],
    [I.EMBED, i.EMBED],
    [I.FIELDSET, i.FIELDSET],
    [I.FIGCAPTION, i.FIGCAPTION],
    [I.FIGURE, i.FIGURE],
    [I.FONT, i.FONT],
    [I.FOOTER, i.FOOTER],
    [I.FOREIGN_OBJECT, i.FOREIGN_OBJECT],
    [I.FORM, i.FORM],
    [I.FRAME, i.FRAME],
    [I.FRAMESET, i.FRAMESET],
    [I.H1, i.H1],
    [I.H2, i.H2],
    [I.H3, i.H3],
    [I.H4, i.H4],
    [I.H5, i.H5],
    [I.H6, i.H6],
    [I.HEAD, i.HEAD],
    [I.HEADER, i.HEADER],
    [I.HGROUP, i.HGROUP],
    [I.HR, i.HR],
    [I.HTML, i.HTML],
    [I.I, i.I],
    [I.IMG, i.IMG],
    [I.IMAGE, i.IMAGE],
    [I.INPUT, i.INPUT],
    [I.IFRAME, i.IFRAME],
    [I.KEYGEN, i.KEYGEN],
    [I.LABEL, i.LABEL],
    [I.LI, i.LI],
    [I.LINK, i.LINK],
    [I.LISTING, i.LISTING],
    [I.MAIN, i.MAIN],
    [I.MALIGNMARK, i.MALIGNMARK],
    [I.MARQUEE, i.MARQUEE],
    [I.MATH, i.MATH],
    [I.MENU, i.MENU],
    [I.META, i.META],
    [I.MGLYPH, i.MGLYPH],
    [I.MI, i.MI],
    [I.MO, i.MO],
    [I.MN, i.MN],
    [I.MS, i.MS],
    [I.MTEXT, i.MTEXT],
    [I.NAV, i.NAV],
    [I.NOBR, i.NOBR],
    [I.NOFRAMES, i.NOFRAMES],
    [I.NOEMBED, i.NOEMBED],
    [I.NOSCRIPT, i.NOSCRIPT],
    [I.OBJECT, i.OBJECT],
    [I.OL, i.OL],
    [I.OPTGROUP, i.OPTGROUP],
    [I.OPTION, i.OPTION],
    [I.P, i.P],
    [I.PARAM, i.PARAM],
    [I.PLAINTEXT, i.PLAINTEXT],
    [I.PRE, i.PRE],
    [I.RB, i.RB],
    [I.RP, i.RP],
    [I.RT, i.RT],
    [I.RTC, i.RTC],
    [I.RUBY, i.RUBY],
    [I.S, i.S],
    [I.SCRIPT, i.SCRIPT],
    [I.SECTION, i.SECTION],
    [I.SELECT, i.SELECT],
    [I.SOURCE, i.SOURCE],
    [I.SMALL, i.SMALL],
    [I.SPAN, i.SPAN],
    [I.STRIKE, i.STRIKE],
    [I.STRONG, i.STRONG],
    [I.STYLE, i.STYLE],
    [I.SUB, i.SUB],
    [I.SUMMARY, i.SUMMARY],
    [I.SUP, i.SUP],
    [I.TABLE, i.TABLE],
    [I.TBODY, i.TBODY],
    [I.TEMPLATE, i.TEMPLATE],
    [I.TEXTAREA, i.TEXTAREA],
    [I.TFOOT, i.TFOOT],
    [I.TD, i.TD],
    [I.TH, i.TH],
    [I.THEAD, i.THEAD],
    [I.TITLE, i.TITLE],
    [I.TR, i.TR],
    [I.TRACK, i.TRACK],
    [I.TT, i.TT],
    [I.U, i.U],
    [I.UL, i.UL],
    [I.SVG, i.SVG],
    [I.VAR, i.VAR],
    [I.WBR, i.WBR],
    [I.XMP, i.XMP],
]);
function br(e) {
    var t;
    return (t = Dc.get(e)) !== null && t !== void 0 ? t : i.UNKNOWN;
}
const F = i,
    Pc = {
        [L.HTML]: new Set([
            F.ADDRESS,
            F.APPLET,
            F.AREA,
            F.ARTICLE,
            F.ASIDE,
            F.BASE,
            F.BASEFONT,
            F.BGSOUND,
            F.BLOCKQUOTE,
            F.BODY,
            F.BR,
            F.BUTTON,
            F.CAPTION,
            F.CENTER,
            F.COL,
            F.COLGROUP,
            F.DD,
            F.DETAILS,
            F.DIR,
            F.DIV,
            F.DL,
            F.DT,
            F.EMBED,
            F.FIELDSET,
            F.FIGCAPTION,
            F.FIGURE,
            F.FOOTER,
            F.FORM,
            F.FRAME,
            F.FRAMESET,
            F.H1,
            F.H2,
            F.H3,
            F.H4,
            F.H5,
            F.H6,
            F.HEAD,
            F.HEADER,
            F.HGROUP,
            F.HR,
            F.HTML,
            F.IFRAME,
            F.IMG,
            F.INPUT,
            F.LI,
            F.LINK,
            F.LISTING,
            F.MAIN,
            F.MARQUEE,
            F.MENU,
            F.META,
            F.NAV,
            F.NOEMBED,
            F.NOFRAMES,
            F.NOSCRIPT,
            F.OBJECT,
            F.OL,
            F.P,
            F.PARAM,
            F.PLAINTEXT,
            F.PRE,
            F.SCRIPT,
            F.SECTION,
            F.SELECT,
            F.SOURCE,
            F.STYLE,
            F.SUMMARY,
            F.TABLE,
            F.TBODY,
            F.TD,
            F.TEMPLATE,
            F.TEXTAREA,
            F.TFOOT,
            F.TH,
            F.THEAD,
            F.TITLE,
            F.TR,
            F.TRACK,
            F.UL,
            F.WBR,
            F.XMP,
        ]),
        [L.MATHML]: new Set([
            F.MI,
            F.MO,
            F.MN,
            F.MS,
            F.MTEXT,
            F.ANNOTATION_XML,
        ]),
        [L.SVG]: new Set([F.TITLE, F.FOREIGN_OBJECT, F.DESC]),
        [L.XLINK]: new Set(),
        [L.XML]: new Set(),
        [L.XMLNS]: new Set(),
    };
function _0(e) {
    return (
        e === F.H1 ||
        e === F.H2 ||
        e === F.H3 ||
        e === F.H4 ||
        e === F.H5 ||
        e === F.H6
    );
}
const Bc = new Set([
    I.STYLE,
    I.SCRIPT,
    I.XMP,
    I.IFRAME,
    I.NOEMBED,
    I.NOFRAMES,
    I.PLAINTEXT,
]);
function kc(e, t) {
    return Bc.has(e) || (t && e === I.NOSCRIPT);
}
const wc = new Map([
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
var T;
(function (e) {
    (e[(e.DATA = 0)] = "DATA"),
        (e[(e.RCDATA = 1)] = "RCDATA"),
        (e[(e.RAWTEXT = 2)] = "RAWTEXT"),
        (e[(e.SCRIPT_DATA = 3)] = "SCRIPT_DATA"),
        (e[(e.PLAINTEXT = 4)] = "PLAINTEXT"),
        (e[(e.TAG_OPEN = 5)] = "TAG_OPEN"),
        (e[(e.END_TAG_OPEN = 6)] = "END_TAG_OPEN"),
        (e[(e.TAG_NAME = 7)] = "TAG_NAME"),
        (e[(e.RCDATA_LESS_THAN_SIGN = 8)] = "RCDATA_LESS_THAN_SIGN"),
        (e[(e.RCDATA_END_TAG_OPEN = 9)] = "RCDATA_END_TAG_OPEN"),
        (e[(e.RCDATA_END_TAG_NAME = 10)] = "RCDATA_END_TAG_NAME"),
        (e[(e.RAWTEXT_LESS_THAN_SIGN = 11)] = "RAWTEXT_LESS_THAN_SIGN"),
        (e[(e.RAWTEXT_END_TAG_OPEN = 12)] = "RAWTEXT_END_TAG_OPEN"),
        (e[(e.RAWTEXT_END_TAG_NAME = 13)] = "RAWTEXT_END_TAG_NAME"),
        (e[(e.SCRIPT_DATA_LESS_THAN_SIGN = 14)] = "SCRIPT_DATA_LESS_THAN_SIGN"),
        (e[(e.SCRIPT_DATA_END_TAG_OPEN = 15)] = "SCRIPT_DATA_END_TAG_OPEN"),
        (e[(e.SCRIPT_DATA_END_TAG_NAME = 16)] = "SCRIPT_DATA_END_TAG_NAME"),
        (e[(e.SCRIPT_DATA_ESCAPE_START = 17)] = "SCRIPT_DATA_ESCAPE_START"),
        (e[(e.SCRIPT_DATA_ESCAPE_START_DASH = 18)] =
            "SCRIPT_DATA_ESCAPE_START_DASH"),
        (e[(e.SCRIPT_DATA_ESCAPED = 19)] = "SCRIPT_DATA_ESCAPED"),
        (e[(e.SCRIPT_DATA_ESCAPED_DASH = 20)] = "SCRIPT_DATA_ESCAPED_DASH"),
        (e[(e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21)] =
            "SCRIPT_DATA_ESCAPED_DASH_DASH"),
        (e[(e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22)] =
            "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"),
        (e[(e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23)] =
            "SCRIPT_DATA_ESCAPED_END_TAG_OPEN"),
        (e[(e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24)] =
            "SCRIPT_DATA_ESCAPED_END_TAG_NAME"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25)] =
            "SCRIPT_DATA_DOUBLE_ESCAPE_START"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED = 26)] = "SCRIPT_DATA_DOUBLE_ESCAPED"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27)] =
            "SCRIPT_DATA_DOUBLE_ESCAPED_DASH"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28)] =
            "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29)] =
            "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30)] =
            "SCRIPT_DATA_DOUBLE_ESCAPE_END"),
        (e[(e.BEFORE_ATTRIBUTE_NAME = 31)] = "BEFORE_ATTRIBUTE_NAME"),
        (e[(e.ATTRIBUTE_NAME = 32)] = "ATTRIBUTE_NAME"),
        (e[(e.AFTER_ATTRIBUTE_NAME = 33)] = "AFTER_ATTRIBUTE_NAME"),
        (e[(e.BEFORE_ATTRIBUTE_VALUE = 34)] = "BEFORE_ATTRIBUTE_VALUE"),
        (e[(e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35)] =
            "ATTRIBUTE_VALUE_DOUBLE_QUOTED"),
        (e[(e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36)] =
            "ATTRIBUTE_VALUE_SINGLE_QUOTED"),
        (e[(e.ATTRIBUTE_VALUE_UNQUOTED = 37)] = "ATTRIBUTE_VALUE_UNQUOTED"),
        (e[(e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38)] =
            "AFTER_ATTRIBUTE_VALUE_QUOTED"),
        (e[(e.SELF_CLOSING_START_TAG = 39)] = "SELF_CLOSING_START_TAG"),
        (e[(e.BOGUS_COMMENT = 40)] = "BOGUS_COMMENT"),
        (e[(e.MARKUP_DECLARATION_OPEN = 41)] = "MARKUP_DECLARATION_OPEN"),
        (e[(e.COMMENT_START = 42)] = "COMMENT_START"),
        (e[(e.COMMENT_START_DASH = 43)] = "COMMENT_START_DASH"),
        (e[(e.COMMENT = 44)] = "COMMENT"),
        (e[(e.COMMENT_LESS_THAN_SIGN = 45)] = "COMMENT_LESS_THAN_SIGN"),
        (e[(e.COMMENT_LESS_THAN_SIGN_BANG = 46)] =
            "COMMENT_LESS_THAN_SIGN_BANG"),
        (e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47)] =
            "COMMENT_LESS_THAN_SIGN_BANG_DASH"),
        (e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48)] =
            "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"),
        (e[(e.COMMENT_END_DASH = 49)] = "COMMENT_END_DASH"),
        (e[(e.COMMENT_END = 50)] = "COMMENT_END"),
        (e[(e.COMMENT_END_BANG = 51)] = "COMMENT_END_BANG"),
        (e[(e.DOCTYPE = 52)] = "DOCTYPE"),
        (e[(e.BEFORE_DOCTYPE_NAME = 53)] = "BEFORE_DOCTYPE_NAME"),
        (e[(e.DOCTYPE_NAME = 54)] = "DOCTYPE_NAME"),
        (e[(e.AFTER_DOCTYPE_NAME = 55)] = "AFTER_DOCTYPE_NAME"),
        (e[(e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56)] =
            "AFTER_DOCTYPE_PUBLIC_KEYWORD"),
        (e[(e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57)] =
            "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"),
        (e[(e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58)] =
            "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"),
        (e[(e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59)] =
            "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"),
        (e[(e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60)] =
            "AFTER_DOCTYPE_PUBLIC_IDENTIFIER"),
        (e[(e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61)] =
            "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"),
        (e[(e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62)] =
            "AFTER_DOCTYPE_SYSTEM_KEYWORD"),
        (e[(e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63)] =
            "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"),
        (e[(e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64)] =
            "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"),
        (e[(e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65)] =
            "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"),
        (e[(e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66)] =
            "AFTER_DOCTYPE_SYSTEM_IDENTIFIER"),
        (e[(e.BOGUS_DOCTYPE = 67)] = "BOGUS_DOCTYPE"),
        (e[(e.CDATA_SECTION = 68)] = "CDATA_SECTION"),
        (e[(e.CDATA_SECTION_BRACKET = 69)] = "CDATA_SECTION_BRACKET"),
        (e[(e.CDATA_SECTION_END = 70)] = "CDATA_SECTION_END"),
        (e[(e.CHARACTER_REFERENCE = 71)] = "CHARACTER_REFERENCE"),
        (e[(e.NAMED_CHARACTER_REFERENCE = 72)] = "NAMED_CHARACTER_REFERENCE"),
        (e[(e.AMBIGUOUS_AMPERSAND = 73)] = "AMBIGUOUS_AMPERSAND"),
        (e[(e.NUMERIC_CHARACTER_REFERENCE = 74)] =
            "NUMERIC_CHARACTER_REFERENCE"),
        (e[(e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75)] =
            "HEXADEMICAL_CHARACTER_REFERENCE_START"),
        (e[(e.HEXADEMICAL_CHARACTER_REFERENCE = 76)] =
            "HEXADEMICAL_CHARACTER_REFERENCE"),
        (e[(e.DECIMAL_CHARACTER_REFERENCE = 77)] =
            "DECIMAL_CHARACTER_REFERENCE"),
        (e[(e.NUMERIC_CHARACTER_REFERENCE_END = 78)] =
            "NUMERIC_CHARACTER_REFERENCE_END");
})(T || (T = {}));
const _e = {
    DATA: T.DATA,
    RCDATA: T.RCDATA,
    RAWTEXT: T.RAWTEXT,
    SCRIPT_DATA: T.SCRIPT_DATA,
    PLAINTEXT: T.PLAINTEXT,
    CDATA_SECTION: T.CDATA_SECTION,
};
function yt(e) {
    return e >= E.DIGIT_0 && e <= E.DIGIT_9;
}
function Rt(e) {
    return e >= E.LATIN_CAPITAL_A && e <= E.LATIN_CAPITAL_Z;
}
function Mc(e) {
    return e >= E.LATIN_SMALL_A && e <= E.LATIN_SMALL_Z;
}
function qe(e) {
    return Mc(e) || Rt(e);
}
function Sa(e) {
    return qe(e) || yt(e);
}
function g0(e) {
    return e >= E.LATIN_CAPITAL_A && e <= E.LATIN_CAPITAL_F;
}
function A0(e) {
    return e >= E.LATIN_SMALL_A && e <= E.LATIN_SMALL_F;
}
function Hc(e) {
    return yt(e) || g0(e) || A0(e);
}
function Xt(e) {
    return e + 32;
}
function C0(e) {
    return (
        e === E.SPACE ||
        e === E.LINE_FEED ||
        e === E.TABULATION ||
        e === E.FORM_FEED
    );
}
function Fc(e) {
    return e === E.EQUALS_SIGN || Sa(e);
}
function Dn(e) {
    return C0(e) || e === E.SOLIDUS || e === E.GREATER_THAN_SIGN;
}
class Uc {
    constructor(t, r) {
        (this.options = t),
            (this.handler = r),
            (this.paused = !1),
            (this.inLoop = !1),
            (this.inForeignNode = !1),
            (this.lastStartTagName = ""),
            (this.active = !1),
            (this.state = T.DATA),
            (this.returnState = T.DATA),
            (this.charRefCode = -1),
            (this.consumedAfterSnapshot = -1),
            (this.currentCharacterToken = null),
            (this.currentToken = null),
            (this.currentAttr = { name: "", value: "" }),
            (this.preprocessor = new vc(r)),
            (this.currentLocation = this.getCurrentLocation(-1));
    }
    _err(t) {
        var r, a;
        (a = (r = this.handler).onParseError) === null ||
            a === void 0 ||
            a.call(r, this.preprocessor.getError(t));
    }
    getCurrentLocation(t) {
        return this.options.sourceCodeLocationInfo
            ? {
                  startLine: this.preprocessor.line,
                  startCol: this.preprocessor.col - t,
                  startOffset: this.preprocessor.offset - t,
                  endLine: -1,
                  endCol: -1,
                  endOffset: -1,
              }
            : null;
    }
    _runParsingLoop() {
        if (!this.inLoop) {
            for (this.inLoop = !0; this.active && !this.paused; ) {
                this.consumedAfterSnapshot = 0;
                const t = this._consume();
                this._ensureHibernation() || this._callState(t);
            }
            this.inLoop = !1;
        }
    }
    pause() {
        this.paused = !0;
    }
    resume(t) {
        if (!this.paused) throw new Error("Parser was already resumed");
        (this.paused = !1),
            !this.inLoop &&
                (this._runParsingLoop(), this.paused || t == null || t());
    }
    write(t, r, a) {
        (this.active = !0),
            this.preprocessor.write(t, r),
            this._runParsingLoop(),
            this.paused || a == null || a();
    }
    insertHtmlAtCurrentPos(t) {
        (this.active = !0),
            this.preprocessor.insertHtmlAtCurrentPos(t),
            this._runParsingLoop();
    }
    _ensureHibernation() {
        return this.preprocessor.endOfChunkHit
            ? (this._unconsume(this.consumedAfterSnapshot),
              (this.active = !1),
              !0)
            : !1;
    }
    _consume() {
        return this.consumedAfterSnapshot++, this.preprocessor.advance();
    }
    _unconsume(t) {
        (this.consumedAfterSnapshot -= t), this.preprocessor.retreat(t);
    }
    _reconsumeInState(t, r) {
        (this.state = t), this._callState(r);
    }
    _advanceBy(t) {
        this.consumedAfterSnapshot += t;
        for (let r = 0; r < t; r++) this.preprocessor.advance();
    }
    _consumeSequenceIfMatch(t, r) {
        return this.preprocessor.startsWith(t, r)
            ? (this._advanceBy(t.length - 1), !0)
            : !1;
    }
    _createStartTagToken() {
        this.currentToken = {
            type: Z.START_TAG,
            tagName: "",
            tagID: i.UNKNOWN,
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: [],
            location: this.getCurrentLocation(1),
        };
    }
    _createEndTagToken() {
        this.currentToken = {
            type: Z.END_TAG,
            tagName: "",
            tagID: i.UNKNOWN,
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: [],
            location: this.getCurrentLocation(2),
        };
    }
    _createCommentToken(t) {
        this.currentToken = {
            type: Z.COMMENT,
            data: "",
            location: this.getCurrentLocation(t),
        };
    }
    _createDoctypeToken(t) {
        this.currentToken = {
            type: Z.DOCTYPE,
            name: t,
            forceQuirks: !1,
            publicId: null,
            systemId: null,
            location: this.currentLocation,
        };
    }
    _createCharacterToken(t, r) {
        this.currentCharacterToken = {
            type: t,
            chars: r,
            location: this.currentLocation,
        };
    }
    _createAttr(t) {
        (this.currentAttr = { name: t, value: "" }),
            (this.currentLocation = this.getCurrentLocation(0));
    }
    _leaveAttrName() {
        var t, r;
        const a = this.currentToken;
        if (b0(a, this.currentAttr.name) === null) {
            if (
                (a.attrs.push(this.currentAttr),
                a.location && this.currentLocation)
            ) {
                const n =
                    (t = (r = a.location).attrs) !== null && t !== void 0
                        ? t
                        : (r.attrs = Object.create(null));
                (n[this.currentAttr.name] = this.currentLocation),
                    this._leaveAttrValue();
            }
        } else this._err(O.duplicateAttribute);
    }
    _leaveAttrValue() {
        this.currentLocation &&
            ((this.currentLocation.endLine = this.preprocessor.line),
            (this.currentLocation.endCol = this.preprocessor.col),
            (this.currentLocation.endOffset = this.preprocessor.offset));
    }
    prepareToken(t) {
        this._emitCurrentCharacterToken(t.location),
            (this.currentToken = null),
            t.location &&
                ((t.location.endLine = this.preprocessor.line),
                (t.location.endCol = this.preprocessor.col + 1),
                (t.location.endOffset = this.preprocessor.offset + 1)),
            (this.currentLocation = this.getCurrentLocation(-1));
    }
    emitCurrentTagToken() {
        const t = this.currentToken;
        this.prepareToken(t),
            (t.tagID = br(t.tagName)),
            t.type === Z.START_TAG
                ? ((this.lastStartTagName = t.tagName),
                  this.handler.onStartTag(t))
                : (t.attrs.length > 0 && this._err(O.endTagWithAttributes),
                  t.selfClosing && this._err(O.endTagWithTrailingSolidus),
                  this.handler.onEndTag(t)),
            this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(t) {
        this.prepareToken(t),
            this.handler.onComment(t),
            this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(t) {
        this.prepareToken(t),
            this.handler.onDoctype(t),
            this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(t) {
        if (this.currentCharacterToken) {
            switch (
                (t &&
                    this.currentCharacterToken.location &&
                    ((this.currentCharacterToken.location.endLine =
                        t.startLine),
                    (this.currentCharacterToken.location.endCol = t.startCol),
                    (this.currentCharacterToken.location.endOffset =
                        t.startOffset)),
                this.currentCharacterToken.type)
            ) {
                case Z.CHARACTER: {
                    this.handler.onCharacter(this.currentCharacterToken);
                    break;
                }
                case Z.NULL_CHARACTER: {
                    this.handler.onNullCharacter(this.currentCharacterToken);
                    break;
                }
                case Z.WHITESPACE_CHARACTER: {
                    this.handler.onWhitespaceCharacter(
                        this.currentCharacterToken
                    );
                    break;
                }
            }
            this.currentCharacterToken = null;
        }
    }
    _emitEOFToken() {
        const t = this.getCurrentLocation(0);
        t &&
            ((t.endLine = t.startLine),
            (t.endCol = t.startCol),
            (t.endOffset = t.startOffset)),
            this._emitCurrentCharacterToken(t),
            this.handler.onEof({ type: Z.EOF, location: t }),
            (this.active = !1);
    }
    _appendCharToCurrentCharacterToken(t, r) {
        if (this.currentCharacterToken)
            if (this.currentCharacterToken.type !== t)
                (this.currentLocation = this.getCurrentLocation(0)),
                    this._emitCurrentCharacterToken(this.currentLocation),
                    this.preprocessor.dropParsedChunk();
            else {
                this.currentCharacterToken.chars += r;
                return;
            }
        this._createCharacterToken(t, r);
    }
    _emitCodePoint(t) {
        const r = C0(t)
            ? Z.WHITESPACE_CHARACTER
            : t === E.NULL
            ? Z.NULL_CHARACTER
            : Z.CHARACTER;
        this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(t));
    }
    _emitChars(t) {
        this._appendCharToCurrentCharacterToken(Z.CHARACTER, t);
    }
    _matchNamedCharacterReference(t) {
        let r = null,
            a = 0,
            n = !1;
        for (
            let s = 0, u = Ue[0];
            s >= 0 && ((s = x0(Ue, u, s + 1, t)), !(s < 0));
            t = this._consume()
        ) {
            (a += 1), (u = Ue[s]);
            const o = u & we.VALUE_LENGTH;
            if (o) {
                const l = (o >> 14) - 1;
                if (
                    (t !== E.SEMICOLON &&
                    this._isCharacterReferenceInAttribute() &&
                    Fc(this.preprocessor.peek(1))
                        ? ((r = [E.AMPERSAND]), (s += l))
                        : ((r =
                              l === 0
                                  ? [Ue[s] & ~we.VALUE_LENGTH]
                                  : l === 1
                                  ? [Ue[++s]]
                                  : [Ue[++s], Ue[++s]]),
                          (a = 0),
                          (n = t !== E.SEMICOLON)),
                    l === 0)
                ) {
                    this._consume();
                    break;
                }
            }
        }
        return (
            this._unconsume(a),
            n &&
                !this.preprocessor.endOfChunkHit &&
                this._err(O.missingSemicolonAfterCharacterReference),
            this._unconsume(1),
            r
        );
    }
    _isCharacterReferenceInAttribute() {
        return (
            this.returnState === T.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
            this.returnState === T.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
            this.returnState === T.ATTRIBUTE_VALUE_UNQUOTED
        );
    }
    _flushCodePointConsumedAsCharacterReference(t) {
        this._isCharacterReferenceInAttribute()
            ? (this.currentAttr.value += String.fromCodePoint(t))
            : this._emitCodePoint(t);
    }
    _callState(t) {
        switch (this.state) {
            case T.DATA: {
                this._stateData(t);
                break;
            }
            case T.RCDATA: {
                this._stateRcdata(t);
                break;
            }
            case T.RAWTEXT: {
                this._stateRawtext(t);
                break;
            }
            case T.SCRIPT_DATA: {
                this._stateScriptData(t);
                break;
            }
            case T.PLAINTEXT: {
                this._statePlaintext(t);
                break;
            }
            case T.TAG_OPEN: {
                this._stateTagOpen(t);
                break;
            }
            case T.END_TAG_OPEN: {
                this._stateEndTagOpen(t);
                break;
            }
            case T.TAG_NAME: {
                this._stateTagName(t);
                break;
            }
            case T.RCDATA_LESS_THAN_SIGN: {
                this._stateRcdataLessThanSign(t);
                break;
            }
            case T.RCDATA_END_TAG_OPEN: {
                this._stateRcdataEndTagOpen(t);
                break;
            }
            case T.RCDATA_END_TAG_NAME: {
                this._stateRcdataEndTagName(t);
                break;
            }
            case T.RAWTEXT_LESS_THAN_SIGN: {
                this._stateRawtextLessThanSign(t);
                break;
            }
            case T.RAWTEXT_END_TAG_OPEN: {
                this._stateRawtextEndTagOpen(t);
                break;
            }
            case T.RAWTEXT_END_TAG_NAME: {
                this._stateRawtextEndTagName(t);
                break;
            }
            case T.SCRIPT_DATA_LESS_THAN_SIGN: {
                this._stateScriptDataLessThanSign(t);
                break;
            }
            case T.SCRIPT_DATA_END_TAG_OPEN: {
                this._stateScriptDataEndTagOpen(t);
                break;
            }
            case T.SCRIPT_DATA_END_TAG_NAME: {
                this._stateScriptDataEndTagName(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPE_START: {
                this._stateScriptDataEscapeStart(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPE_START_DASH: {
                this._stateScriptDataEscapeStartDash(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPED: {
                this._stateScriptDataEscaped(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPED_DASH: {
                this._stateScriptDataEscapedDash(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPED_DASH_DASH: {
                this._stateScriptDataEscapedDashDash(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
                this._stateScriptDataEscapedLessThanSign(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
                this._stateScriptDataEscapedEndTagOpen(t);
                break;
            }
            case T.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
                this._stateScriptDataEscapedEndTagName(t);
                break;
            }
            case T.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
                this._stateScriptDataDoubleEscapeStart(t);
                break;
            }
            case T.SCRIPT_DATA_DOUBLE_ESCAPED: {
                this._stateScriptDataDoubleEscaped(t);
                break;
            }
            case T.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
                this._stateScriptDataDoubleEscapedDash(t);
                break;
            }
            case T.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
                this._stateScriptDataDoubleEscapedDashDash(t);
                break;
            }
            case T.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
                this._stateScriptDataDoubleEscapedLessThanSign(t);
                break;
            }
            case T.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
                this._stateScriptDataDoubleEscapeEnd(t);
                break;
            }
            case T.BEFORE_ATTRIBUTE_NAME: {
                this._stateBeforeAttributeName(t);
                break;
            }
            case T.ATTRIBUTE_NAME: {
                this._stateAttributeName(t);
                break;
            }
            case T.AFTER_ATTRIBUTE_NAME: {
                this._stateAfterAttributeName(t);
                break;
            }
            case T.BEFORE_ATTRIBUTE_VALUE: {
                this._stateBeforeAttributeValue(t);
                break;
            }
            case T.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
                this._stateAttributeValueDoubleQuoted(t);
                break;
            }
            case T.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
                this._stateAttributeValueSingleQuoted(t);
                break;
            }
            case T.ATTRIBUTE_VALUE_UNQUOTED: {
                this._stateAttributeValueUnquoted(t);
                break;
            }
            case T.AFTER_ATTRIBUTE_VALUE_QUOTED: {
                this._stateAfterAttributeValueQuoted(t);
                break;
            }
            case T.SELF_CLOSING_START_TAG: {
                this._stateSelfClosingStartTag(t);
                break;
            }
            case T.BOGUS_COMMENT: {
                this._stateBogusComment(t);
                break;
            }
            case T.MARKUP_DECLARATION_OPEN: {
                this._stateMarkupDeclarationOpen(t);
                break;
            }
            case T.COMMENT_START: {
                this._stateCommentStart(t);
                break;
            }
            case T.COMMENT_START_DASH: {
                this._stateCommentStartDash(t);
                break;
            }
            case T.COMMENT: {
                this._stateComment(t);
                break;
            }
            case T.COMMENT_LESS_THAN_SIGN: {
                this._stateCommentLessThanSign(t);
                break;
            }
            case T.COMMENT_LESS_THAN_SIGN_BANG: {
                this._stateCommentLessThanSignBang(t);
                break;
            }
            case T.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
                this._stateCommentLessThanSignBangDash(t);
                break;
            }
            case T.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
                this._stateCommentLessThanSignBangDashDash(t);
                break;
            }
            case T.COMMENT_END_DASH: {
                this._stateCommentEndDash(t);
                break;
            }
            case T.COMMENT_END: {
                this._stateCommentEnd(t);
                break;
            }
            case T.COMMENT_END_BANG: {
                this._stateCommentEndBang(t);
                break;
            }
            case T.DOCTYPE: {
                this._stateDoctype(t);
                break;
            }
            case T.BEFORE_DOCTYPE_NAME: {
                this._stateBeforeDoctypeName(t);
                break;
            }
            case T.DOCTYPE_NAME: {
                this._stateDoctypeName(t);
                break;
            }
            case T.AFTER_DOCTYPE_NAME: {
                this._stateAfterDoctypeName(t);
                break;
            }
            case T.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
                this._stateAfterDoctypePublicKeyword(t);
                break;
            }
            case T.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
                this._stateBeforeDoctypePublicIdentifier(t);
                break;
            }
            case T.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
                this._stateDoctypePublicIdentifierDoubleQuoted(t);
                break;
            }
            case T.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
                this._stateDoctypePublicIdentifierSingleQuoted(t);
                break;
            }
            case T.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
                this._stateAfterDoctypePublicIdentifier(t);
                break;
            }
            case T.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
                this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
                break;
            }
            case T.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
                this._stateAfterDoctypeSystemKeyword(t);
                break;
            }
            case T.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
                this._stateBeforeDoctypeSystemIdentifier(t);
                break;
            }
            case T.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
                this._stateDoctypeSystemIdentifierDoubleQuoted(t);
                break;
            }
            case T.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
                this._stateDoctypeSystemIdentifierSingleQuoted(t);
                break;
            }
            case T.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
                this._stateAfterDoctypeSystemIdentifier(t);
                break;
            }
            case T.BOGUS_DOCTYPE: {
                this._stateBogusDoctype(t);
                break;
            }
            case T.CDATA_SECTION: {
                this._stateCdataSection(t);
                break;
            }
            case T.CDATA_SECTION_BRACKET: {
                this._stateCdataSectionBracket(t);
                break;
            }
            case T.CDATA_SECTION_END: {
                this._stateCdataSectionEnd(t);
                break;
            }
            case T.CHARACTER_REFERENCE: {
                this._stateCharacterReference(t);
                break;
            }
            case T.NAMED_CHARACTER_REFERENCE: {
                this._stateNamedCharacterReference(t);
                break;
            }
            case T.AMBIGUOUS_AMPERSAND: {
                this._stateAmbiguousAmpersand(t);
                break;
            }
            case T.NUMERIC_CHARACTER_REFERENCE: {
                this._stateNumericCharacterReference(t);
                break;
            }
            case T.HEXADEMICAL_CHARACTER_REFERENCE_START: {
                this._stateHexademicalCharacterReferenceStart(t);
                break;
            }
            case T.HEXADEMICAL_CHARACTER_REFERENCE: {
                this._stateHexademicalCharacterReference(t);
                break;
            }
            case T.DECIMAL_CHARACTER_REFERENCE: {
                this._stateDecimalCharacterReference(t);
                break;
            }
            case T.NUMERIC_CHARACTER_REFERENCE_END: {
                this._stateNumericCharacterReferenceEnd(t);
                break;
            }
            default:
                throw new Error("Unknown state");
        }
    }
    _stateData(t) {
        switch (t) {
            case E.LESS_THAN_SIGN: {
                this.state = T.TAG_OPEN;
                break;
            }
            case E.AMPERSAND: {
                (this.returnState = T.DATA),
                    (this.state = T.CHARACTER_REFERENCE);
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitCodePoint(t);
                break;
            }
            case E.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateRcdata(t) {
        switch (t) {
            case E.AMPERSAND: {
                (this.returnState = T.RCDATA),
                    (this.state = T.CHARACTER_REFERENCE);
                break;
            }
            case E.LESS_THAN_SIGN: {
                this.state = T.RCDATA_LESS_THAN_SIGN;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateRawtext(t) {
        switch (t) {
            case E.LESS_THAN_SIGN: {
                this.state = T.RAWTEXT_LESS_THAN_SIGN;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateScriptData(t) {
        switch (t) {
            case E.LESS_THAN_SIGN: {
                this.state = T.SCRIPT_DATA_LESS_THAN_SIGN;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _statePlaintext(t) {
        switch (t) {
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateTagOpen(t) {
        if (qe(t))
            this._createStartTagToken(),
                (this.state = T.TAG_NAME),
                this._stateTagName(t);
        else
            switch (t) {
                case E.EXCLAMATION_MARK: {
                    this.state = T.MARKUP_DECLARATION_OPEN;
                    break;
                }
                case E.SOLIDUS: {
                    this.state = T.END_TAG_OPEN;
                    break;
                }
                case E.QUESTION_MARK: {
                    this._err(O.unexpectedQuestionMarkInsteadOfTagName),
                        this._createCommentToken(1),
                        (this.state = T.BOGUS_COMMENT),
                        this._stateBogusComment(t);
                    break;
                }
                case E.EOF: {
                    this._err(O.eofBeforeTagName),
                        this._emitChars("<"),
                        this._emitEOFToken();
                    break;
                }
                default:
                    this._err(O.invalidFirstCharacterOfTagName),
                        this._emitChars("<"),
                        (this.state = T.DATA),
                        this._stateData(t);
            }
    }
    _stateEndTagOpen(t) {
        if (qe(t))
            this._createEndTagToken(),
                (this.state = T.TAG_NAME),
                this._stateTagName(t);
        else
            switch (t) {
                case E.GREATER_THAN_SIGN: {
                    this._err(O.missingEndTagName), (this.state = T.DATA);
                    break;
                }
                case E.EOF: {
                    this._err(O.eofBeforeTagName),
                        this._emitChars("</"),
                        this._emitEOFToken();
                    break;
                }
                default:
                    this._err(O.invalidFirstCharacterOfTagName),
                        this._createCommentToken(2),
                        (this.state = T.BOGUS_COMMENT),
                        this._stateBogusComment(t);
            }
    }
    _stateTagName(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this.state = T.BEFORE_ATTRIBUTE_NAME;
                break;
            }
            case E.SOLIDUS: {
                this.state = T.SELF_CLOSING_START_TAG;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentTagToken();
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.tagName += ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                r.tagName += String.fromCodePoint(Rt(t) ? Xt(t) : t);
        }
    }
    _stateRcdataLessThanSign(t) {
        t === E.SOLIDUS
            ? (this.state = T.RCDATA_END_TAG_OPEN)
            : (this._emitChars("<"),
              (this.state = T.RCDATA),
              this._stateRcdata(t));
    }
    _stateRcdataEndTagOpen(t) {
        qe(t)
            ? ((this.state = T.RCDATA_END_TAG_NAME),
              this._stateRcdataEndTagName(t))
            : (this._emitChars("</"),
              (this.state = T.RCDATA),
              this._stateRcdata(t));
    }
    handleSpecialEndTag(t) {
        if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
            return !this._ensureHibernation();
        this._createEndTagToken();
        const r = this.currentToken;
        switch (
            ((r.tagName = this.lastStartTagName),
            this.preprocessor.peek(this.lastStartTagName.length))
        ) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                return (
                    this._advanceBy(this.lastStartTagName.length),
                    (this.state = T.BEFORE_ATTRIBUTE_NAME),
                    !1
                );
            case E.SOLIDUS:
                return (
                    this._advanceBy(this.lastStartTagName.length),
                    (this.state = T.SELF_CLOSING_START_TAG),
                    !1
                );
            case E.GREATER_THAN_SIGN:
                return (
                    this._advanceBy(this.lastStartTagName.length),
                    this.emitCurrentTagToken(),
                    (this.state = T.DATA),
                    !1
                );
            default:
                return !this._ensureHibernation();
        }
    }
    _stateRcdataEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = T.RCDATA),
            this._stateRcdata(t));
    }
    _stateRawtextLessThanSign(t) {
        t === E.SOLIDUS
            ? (this.state = T.RAWTEXT_END_TAG_OPEN)
            : (this._emitChars("<"),
              (this.state = T.RAWTEXT),
              this._stateRawtext(t));
    }
    _stateRawtextEndTagOpen(t) {
        qe(t)
            ? ((this.state = T.RAWTEXT_END_TAG_NAME),
              this._stateRawtextEndTagName(t))
            : (this._emitChars("</"),
              (this.state = T.RAWTEXT),
              this._stateRawtext(t));
    }
    _stateRawtextEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = T.RAWTEXT),
            this._stateRawtext(t));
    }
    _stateScriptDataLessThanSign(t) {
        switch (t) {
            case E.SOLIDUS: {
                this.state = T.SCRIPT_DATA_END_TAG_OPEN;
                break;
            }
            case E.EXCLAMATION_MARK: {
                (this.state = T.SCRIPT_DATA_ESCAPE_START),
                    this._emitChars("<!");
                break;
            }
            default:
                this._emitChars("<"),
                    (this.state = T.SCRIPT_DATA),
                    this._stateScriptData(t);
        }
    }
    _stateScriptDataEndTagOpen(t) {
        qe(t)
            ? ((this.state = T.SCRIPT_DATA_END_TAG_NAME),
              this._stateScriptDataEndTagName(t))
            : (this._emitChars("</"),
              (this.state = T.SCRIPT_DATA),
              this._stateScriptData(t));
    }
    _stateScriptDataEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = T.SCRIPT_DATA),
            this._stateScriptData(t));
    }
    _stateScriptDataEscapeStart(t) {
        t === E.HYPHEN_MINUS
            ? ((this.state = T.SCRIPT_DATA_ESCAPE_START_DASH),
              this._emitChars("-"))
            : ((this.state = T.SCRIPT_DATA), this._stateScriptData(t));
    }
    _stateScriptDataEscapeStartDash(t) {
        t === E.HYPHEN_MINUS
            ? ((this.state = T.SCRIPT_DATA_ESCAPED_DASH_DASH),
              this._emitChars("-"))
            : ((this.state = T.SCRIPT_DATA), this._stateScriptData(t));
    }
    _stateScriptDataEscaped(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                (this.state = T.SCRIPT_DATA_ESCAPED_DASH), this._emitChars("-");
                break;
            }
            case E.LESS_THAN_SIGN: {
                this.state = T.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateScriptDataEscapedDash(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                (this.state = T.SCRIPT_DATA_ESCAPED_DASH_DASH),
                    this._emitChars("-");
                break;
            }
            case E.LESS_THAN_SIGN: {
                this.state = T.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.state = T.SCRIPT_DATA_ESCAPED),
                    this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = T.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t);
        }
    }
    _stateScriptDataEscapedDashDash(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                this._emitChars("-");
                break;
            }
            case E.LESS_THAN_SIGN: {
                this.state = T.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.SCRIPT_DATA), this._emitChars(">");
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.state = T.SCRIPT_DATA_ESCAPED),
                    this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = T.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t);
        }
    }
    _stateScriptDataEscapedLessThanSign(t) {
        t === E.SOLIDUS
            ? (this.state = T.SCRIPT_DATA_ESCAPED_END_TAG_OPEN)
            : qe(t)
            ? (this._emitChars("<"),
              (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPE_START),
              this._stateScriptDataDoubleEscapeStart(t))
            : (this._emitChars("<"),
              (this.state = T.SCRIPT_DATA_ESCAPED),
              this._stateScriptDataEscaped(t));
    }
    _stateScriptDataEscapedEndTagOpen(t) {
        qe(t)
            ? ((this.state = T.SCRIPT_DATA_ESCAPED_END_TAG_NAME),
              this._stateScriptDataEscapedEndTagName(t))
            : (this._emitChars("</"),
              (this.state = T.SCRIPT_DATA_ESCAPED),
              this._stateScriptDataEscaped(t));
    }
    _stateScriptDataEscapedEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = T.SCRIPT_DATA_ESCAPED),
            this._stateScriptDataEscaped(t));
    }
    _stateScriptDataDoubleEscapeStart(t) {
        if (
            this.preprocessor.startsWith(me.SCRIPT, !1) &&
            Dn(this.preprocessor.peek(me.SCRIPT.length))
        ) {
            this._emitCodePoint(t);
            for (let r = 0; r < me.SCRIPT.length; r++)
                this._emitCodePoint(this._consume());
            this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED;
        } else
            this._ensureHibernation() ||
                ((this.state = T.SCRIPT_DATA_ESCAPED),
                this._stateScriptDataEscaped(t));
    }
    _stateScriptDataDoubleEscaped(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED_DASH),
                    this._emitChars("-");
                break;
            }
            case E.LESS_THAN_SIGN: {
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                    this._emitChars("<");
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateScriptDataDoubleEscapedDash(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH),
                    this._emitChars("-");
                break;
            }
            case E.LESS_THAN_SIGN: {
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                    this._emitChars("<");
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitCodePoint(t);
        }
    }
    _stateScriptDataDoubleEscapedDashDash(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                this._emitChars("-");
                break;
            }
            case E.LESS_THAN_SIGN: {
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                    this._emitChars("<");
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.SCRIPT_DATA), this._emitChars(">");
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitChars(ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitCodePoint(t);
        }
    }
    _stateScriptDataDoubleEscapedLessThanSign(t) {
        t === E.SOLIDUS
            ? ((this.state = T.SCRIPT_DATA_DOUBLE_ESCAPE_END),
              this._emitChars("/"))
            : ((this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED),
              this._stateScriptDataDoubleEscaped(t));
    }
    _stateScriptDataDoubleEscapeEnd(t) {
        if (
            this.preprocessor.startsWith(me.SCRIPT, !1) &&
            Dn(this.preprocessor.peek(me.SCRIPT.length))
        ) {
            this._emitCodePoint(t);
            for (let r = 0; r < me.SCRIPT.length; r++)
                this._emitCodePoint(this._consume());
            this.state = T.SCRIPT_DATA_ESCAPED;
        } else
            this._ensureHibernation() ||
                ((this.state = T.SCRIPT_DATA_DOUBLE_ESCAPED),
                this._stateScriptDataDoubleEscaped(t));
    }
    _stateBeforeAttributeName(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.SOLIDUS:
            case E.GREATER_THAN_SIGN:
            case E.EOF: {
                (this.state = T.AFTER_ATTRIBUTE_NAME),
                    this._stateAfterAttributeName(t);
                break;
            }
            case E.EQUALS_SIGN: {
                this._err(O.unexpectedEqualsSignBeforeAttributeName),
                    this._createAttr("="),
                    (this.state = T.ATTRIBUTE_NAME);
                break;
            }
            default:
                this._createAttr(""),
                    (this.state = T.ATTRIBUTE_NAME),
                    this._stateAttributeName(t);
        }
    }
    _stateAttributeName(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
            case E.SOLIDUS:
            case E.GREATER_THAN_SIGN:
            case E.EOF: {
                this._leaveAttrName(),
                    (this.state = T.AFTER_ATTRIBUTE_NAME),
                    this._stateAfterAttributeName(t);
                break;
            }
            case E.EQUALS_SIGN: {
                this._leaveAttrName(), (this.state = T.BEFORE_ATTRIBUTE_VALUE);
                break;
            }
            case E.QUOTATION_MARK:
            case E.APOSTROPHE:
            case E.LESS_THAN_SIGN: {
                this._err(O.unexpectedCharacterInAttributeName),
                    (this.currentAttr.name += String.fromCodePoint(t));
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.currentAttr.name += ce);
                break;
            }
            default:
                this.currentAttr.name += String.fromCodePoint(
                    Rt(t) ? Xt(t) : t
                );
        }
    }
    _stateAfterAttributeName(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.SOLIDUS: {
                this.state = T.SELF_CLOSING_START_TAG;
                break;
            }
            case E.EQUALS_SIGN: {
                this.state = T.BEFORE_ATTRIBUTE_VALUE;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentTagToken();
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this._createAttr(""),
                    (this.state = T.ATTRIBUTE_NAME),
                    this._stateAttributeName(t);
        }
    }
    _stateBeforeAttributeValue(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.QUOTATION_MARK: {
                this.state = T.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
                break;
            }
            case E.APOSTROPHE: {
                this.state = T.ATTRIBUTE_VALUE_SINGLE_QUOTED;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.missingAttributeValue),
                    (this.state = T.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            default:
                (this.state = T.ATTRIBUTE_VALUE_UNQUOTED),
                    this._stateAttributeValueUnquoted(t);
        }
    }
    _stateAttributeValueDoubleQuoted(t) {
        switch (t) {
            case E.QUOTATION_MARK: {
                this.state = T.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
            }
            case E.AMPERSAND: {
                (this.returnState = T.ATTRIBUTE_VALUE_DOUBLE_QUOTED),
                    (this.state = T.CHARACTER_REFERENCE);
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.currentAttr.value += ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this.currentAttr.value += String.fromCodePoint(t);
        }
    }
    _stateAttributeValueSingleQuoted(t) {
        switch (t) {
            case E.APOSTROPHE: {
                this.state = T.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
            }
            case E.AMPERSAND: {
                (this.returnState = T.ATTRIBUTE_VALUE_SINGLE_QUOTED),
                    (this.state = T.CHARACTER_REFERENCE);
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.currentAttr.value += ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this.currentAttr.value += String.fromCodePoint(t);
        }
    }
    _stateAttributeValueUnquoted(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this._leaveAttrValue(), (this.state = T.BEFORE_ATTRIBUTE_NAME);
                break;
            }
            case E.AMPERSAND: {
                (this.returnState = T.ATTRIBUTE_VALUE_UNQUOTED),
                    (this.state = T.CHARACTER_REFERENCE);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._leaveAttrValue(),
                    (this.state = T.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter),
                    (this.currentAttr.value += ce);
                break;
            }
            case E.QUOTATION_MARK:
            case E.APOSTROPHE:
            case E.LESS_THAN_SIGN:
            case E.EQUALS_SIGN:
            case E.GRAVE_ACCENT: {
                this._err(O.unexpectedCharacterInUnquotedAttributeValue),
                    (this.currentAttr.value += String.fromCodePoint(t));
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this.currentAttr.value += String.fromCodePoint(t);
        }
    }
    _stateAfterAttributeValueQuoted(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this._leaveAttrValue(), (this.state = T.BEFORE_ATTRIBUTE_NAME);
                break;
            }
            case E.SOLIDUS: {
                this._leaveAttrValue(), (this.state = T.SELF_CLOSING_START_TAG);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._leaveAttrValue(),
                    (this.state = T.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingWhitespaceBetweenAttributes),
                    (this.state = T.BEFORE_ATTRIBUTE_NAME),
                    this._stateBeforeAttributeName(t);
        }
    }
    _stateSelfClosingStartTag(t) {
        switch (t) {
            case E.GREATER_THAN_SIGN: {
                const r = this.currentToken;
                (r.selfClosing = !0),
                    (this.state = T.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            case E.EOF: {
                this._err(O.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this._err(O.unexpectedSolidusInTag),
                    (this.state = T.BEFORE_ATTRIBUTE_NAME),
                    this._stateBeforeAttributeName(t);
        }
    }
    _stateBogusComment(t) {
        const r = this.currentToken;
        switch (t) {
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentComment(r);
                break;
            }
            case E.EOF: {
                this.emitCurrentComment(r), this._emitEOFToken();
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.data += ce);
                break;
            }
            default:
                r.data += String.fromCodePoint(t);
        }
    }
    _stateMarkupDeclarationOpen(t) {
        this._consumeSequenceIfMatch(me.DASH_DASH, !0)
            ? (this._createCommentToken(me.DASH_DASH.length + 1),
              (this.state = T.COMMENT_START))
            : this._consumeSequenceIfMatch(me.DOCTYPE, !1)
            ? ((this.currentLocation = this.getCurrentLocation(
                  me.DOCTYPE.length + 1
              )),
              (this.state = T.DOCTYPE))
            : this._consumeSequenceIfMatch(me.CDATA_START, !0)
            ? this.inForeignNode
                ? (this.state = T.CDATA_SECTION)
                : (this._err(O.cdataInHtmlContent),
                  this._createCommentToken(me.CDATA_START.length + 1),
                  (this.currentToken.data = "[CDATA["),
                  (this.state = T.BOGUS_COMMENT))
            : this._ensureHibernation() ||
              (this._err(O.incorrectlyOpenedComment),
              this._createCommentToken(2),
              (this.state = T.BOGUS_COMMENT),
              this._stateBogusComment(t));
    }
    _stateCommentStart(t) {
        switch (t) {
            case E.HYPHEN_MINUS: {
                this.state = T.COMMENT_START_DASH;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.abruptClosingOfEmptyComment), (this.state = T.DATA);
                const r = this.currentToken;
                this.emitCurrentComment(r);
                break;
            }
            default:
                (this.state = T.COMMENT), this._stateComment(t);
        }
    }
    _stateCommentStartDash(t) {
        const r = this.currentToken;
        switch (t) {
            case E.HYPHEN_MINUS: {
                this.state = T.COMMENT_END;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.abruptClosingOfEmptyComment),
                    (this.state = T.DATA),
                    this.emitCurrentComment(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInComment),
                    this.emitCurrentComment(r),
                    this._emitEOFToken();
                break;
            }
            default:
                (r.data += "-"),
                    (this.state = T.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateComment(t) {
        const r = this.currentToken;
        switch (t) {
            case E.HYPHEN_MINUS: {
                this.state = T.COMMENT_END_DASH;
                break;
            }
            case E.LESS_THAN_SIGN: {
                (r.data += "<"), (this.state = T.COMMENT_LESS_THAN_SIGN);
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.data += ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInComment),
                    this.emitCurrentComment(r),
                    this._emitEOFToken();
                break;
            }
            default:
                r.data += String.fromCodePoint(t);
        }
    }
    _stateCommentLessThanSign(t) {
        const r = this.currentToken;
        switch (t) {
            case E.EXCLAMATION_MARK: {
                (r.data += "!"), (this.state = T.COMMENT_LESS_THAN_SIGN_BANG);
                break;
            }
            case E.LESS_THAN_SIGN: {
                r.data += "<";
                break;
            }
            default:
                (this.state = T.COMMENT), this._stateComment(t);
        }
    }
    _stateCommentLessThanSignBang(t) {
        t === E.HYPHEN_MINUS
            ? (this.state = T.COMMENT_LESS_THAN_SIGN_BANG_DASH)
            : ((this.state = T.COMMENT), this._stateComment(t));
    }
    _stateCommentLessThanSignBangDash(t) {
        t === E.HYPHEN_MINUS
            ? (this.state = T.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH)
            : ((this.state = T.COMMENT_END_DASH), this._stateCommentEndDash(t));
    }
    _stateCommentLessThanSignBangDashDash(t) {
        t !== E.GREATER_THAN_SIGN && t !== E.EOF && this._err(O.nestedComment),
            (this.state = T.COMMENT_END),
            this._stateCommentEnd(t);
    }
    _stateCommentEndDash(t) {
        const r = this.currentToken;
        switch (t) {
            case E.HYPHEN_MINUS: {
                this.state = T.COMMENT_END;
                break;
            }
            case E.EOF: {
                this._err(O.eofInComment),
                    this.emitCurrentComment(r),
                    this._emitEOFToken();
                break;
            }
            default:
                (r.data += "-"),
                    (this.state = T.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateCommentEnd(t) {
        const r = this.currentToken;
        switch (t) {
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentComment(r);
                break;
            }
            case E.EXCLAMATION_MARK: {
                this.state = T.COMMENT_END_BANG;
                break;
            }
            case E.HYPHEN_MINUS: {
                r.data += "-";
                break;
            }
            case E.EOF: {
                this._err(O.eofInComment),
                    this.emitCurrentComment(r),
                    this._emitEOFToken();
                break;
            }
            default:
                (r.data += "--"),
                    (this.state = T.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateCommentEndBang(t) {
        const r = this.currentToken;
        switch (t) {
            case E.HYPHEN_MINUS: {
                (r.data += "--!"), (this.state = T.COMMENT_END_DASH);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.incorrectlyClosedComment),
                    (this.state = T.DATA),
                    this.emitCurrentComment(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInComment),
                    this.emitCurrentComment(r),
                    this._emitEOFToken();
                break;
            }
            default:
                (r.data += "--!"),
                    (this.state = T.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateDoctype(t) {
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this.state = T.BEFORE_DOCTYPE_NAME;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.BEFORE_DOCTYPE_NAME),
                    this._stateBeforeDoctypeName(t);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype), this._createDoctypeToken(null);
                const r = this.currentToken;
                (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingWhitespaceBeforeDoctypeName),
                    (this.state = T.BEFORE_DOCTYPE_NAME),
                    this._stateBeforeDoctypeName(t);
        }
    }
    _stateBeforeDoctypeName(t) {
        if (Rt(t))
            this._createDoctypeToken(String.fromCharCode(Xt(t))),
                (this.state = T.DOCTYPE_NAME);
        else
            switch (t) {
                case E.SPACE:
                case E.LINE_FEED:
                case E.TABULATION:
                case E.FORM_FEED:
                    break;
                case E.NULL: {
                    this._err(O.unexpectedNullCharacter),
                        this._createDoctypeToken(ce),
                        (this.state = T.DOCTYPE_NAME);
                    break;
                }
                case E.GREATER_THAN_SIGN: {
                    this._err(O.missingDoctypeName),
                        this._createDoctypeToken(null);
                    const r = this.currentToken;
                    (r.forceQuirks = !0),
                        this.emitCurrentDoctype(r),
                        (this.state = T.DATA);
                    break;
                }
                case E.EOF: {
                    this._err(O.eofInDoctype), this._createDoctypeToken(null);
                    const r = this.currentToken;
                    (r.forceQuirks = !0),
                        this.emitCurrentDoctype(r),
                        this._emitEOFToken();
                    break;
                }
                default:
                    this._createDoctypeToken(String.fromCodePoint(t)),
                        (this.state = T.DOCTYPE_NAME);
            }
    }
    _stateDoctypeName(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this.state = T.AFTER_DOCTYPE_NAME;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentDoctype(r);
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.name += ce);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                r.name += String.fromCodePoint(Rt(t) ? Xt(t) : t);
        }
    }
    _stateAfterDoctypeName(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentDoctype(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._consumeSequenceIfMatch(me.PUBLIC, !1)
                    ? (this.state = T.AFTER_DOCTYPE_PUBLIC_KEYWORD)
                    : this._consumeSequenceIfMatch(me.SYSTEM, !1)
                    ? (this.state = T.AFTER_DOCTYPE_SYSTEM_KEYWORD)
                    : this._ensureHibernation() ||
                      (this._err(O.invalidCharacterSequenceAfterDoctypeName),
                      (r.forceQuirks = !0),
                      (this.state = T.BOGUS_DOCTYPE),
                      this._stateBogusDoctype(t));
        }
    }
    _stateAfterDoctypePublicKeyword(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this.state = T.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            }
            case E.QUOTATION_MARK: {
                this._err(O.missingWhitespaceAfterDoctypePublicKeyword),
                    (r.publicId = ""),
                    (this.state = T.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case E.APOSTROPHE: {
                this._err(O.missingWhitespaceAfterDoctypePublicKeyword),
                    (r.publicId = ""),
                    (this.state = T.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.missingDoctypePublicIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.DATA),
                    this.emitCurrentDoctype(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingQuoteBeforeDoctypePublicIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBeforeDoctypePublicIdentifier(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.QUOTATION_MARK: {
                (r.publicId = ""),
                    (this.state = T.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case E.APOSTROPHE: {
                (r.publicId = ""),
                    (this.state = T.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.missingDoctypePublicIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.DATA),
                    this.emitCurrentDoctype(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingQuoteBeforeDoctypePublicIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateDoctypePublicIdentifierDoubleQuoted(t) {
        const r = this.currentToken;
        switch (t) {
            case E.QUOTATION_MARK: {
                this.state = T.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.publicId += ce);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.abruptDoctypePublicIdentifier),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    (this.state = T.DATA);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                r.publicId += String.fromCodePoint(t);
        }
    }
    _stateDoctypePublicIdentifierSingleQuoted(t) {
        const r = this.currentToken;
        switch (t) {
            case E.APOSTROPHE: {
                this.state = T.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.publicId += ce);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.abruptDoctypePublicIdentifier),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    (this.state = T.DATA);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                r.publicId += String.fromCodePoint(t);
        }
    }
    _stateAfterDoctypePublicIdentifier(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this.state = T.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
                break;
            }
            case E.GREATER_THAN_SIGN: {
                (this.state = T.DATA), this.emitCurrentDoctype(r);
                break;
            }
            case E.QUOTATION_MARK: {
                this._err(
                    O.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
                ),
                    (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case E.APOSTROPHE: {
                this._err(
                    O.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
                ),
                    (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingQuoteBeforeDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(r), (this.state = T.DATA);
                break;
            }
            case E.QUOTATION_MARK: {
                (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case E.APOSTROPHE: {
                (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingQuoteBeforeDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateAfterDoctypeSystemKeyword(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED: {
                this.state = T.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            }
            case E.QUOTATION_MARK: {
                this._err(O.missingWhitespaceAfterDoctypeSystemKeyword),
                    (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case E.APOSTROPHE: {
                this._err(O.missingWhitespaceAfterDoctypeSystemKeyword),
                    (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.missingDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.DATA),
                    this.emitCurrentDoctype(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingQuoteBeforeDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBeforeDoctypeSystemIdentifier(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.QUOTATION_MARK: {
                (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case E.APOSTROPHE: {
                (r.systemId = ""),
                    (this.state = T.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.missingDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.DATA),
                    this.emitCurrentDoctype(r);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.missingQuoteBeforeDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateDoctypeSystemIdentifierDoubleQuoted(t) {
        const r = this.currentToken;
        switch (t) {
            case E.QUOTATION_MARK: {
                this.state = T.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.systemId += ce);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.abruptDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    (this.state = T.DATA);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                r.systemId += String.fromCodePoint(t);
        }
    }
    _stateDoctypeSystemIdentifierSingleQuoted(t) {
        const r = this.currentToken;
        switch (t) {
            case E.APOSTROPHE: {
                this.state = T.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter), (r.systemId += ce);
                break;
            }
            case E.GREATER_THAN_SIGN: {
                this._err(O.abruptDoctypeSystemIdentifier),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    (this.state = T.DATA);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                r.systemId += String.fromCodePoint(t);
        }
    }
    _stateAfterDoctypeSystemIdentifier(t) {
        const r = this.currentToken;
        switch (t) {
            case E.SPACE:
            case E.LINE_FEED:
            case E.TABULATION:
            case E.FORM_FEED:
                break;
            case E.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(r), (this.state = T.DATA);
                break;
            }
            case E.EOF: {
                this._err(O.eofInDoctype),
                    (r.forceQuirks = !0),
                    this.emitCurrentDoctype(r),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(O.unexpectedCharacterAfterDoctypeSystemIdentifier),
                    (this.state = T.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBogusDoctype(t) {
        const r = this.currentToken;
        switch (t) {
            case E.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(r), (this.state = T.DATA);
                break;
            }
            case E.NULL: {
                this._err(O.unexpectedNullCharacter);
                break;
            }
            case E.EOF: {
                this.emitCurrentDoctype(r), this._emitEOFToken();
                break;
            }
        }
    }
    _stateCdataSection(t) {
        switch (t) {
            case E.RIGHT_SQUARE_BRACKET: {
                this.state = T.CDATA_SECTION_BRACKET;
                break;
            }
            case E.EOF: {
                this._err(O.eofInCdata), this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateCdataSectionBracket(t) {
        t === E.RIGHT_SQUARE_BRACKET
            ? (this.state = T.CDATA_SECTION_END)
            : (this._emitChars("]"),
              (this.state = T.CDATA_SECTION),
              this._stateCdataSection(t));
    }
    _stateCdataSectionEnd(t) {
        switch (t) {
            case E.GREATER_THAN_SIGN: {
                this.state = T.DATA;
                break;
            }
            case E.RIGHT_SQUARE_BRACKET: {
                this._emitChars("]");
                break;
            }
            default:
                this._emitChars("]]"),
                    (this.state = T.CDATA_SECTION),
                    this._stateCdataSection(t);
        }
    }
    _stateCharacterReference(t) {
        t === E.NUMBER_SIGN
            ? (this.state = T.NUMERIC_CHARACTER_REFERENCE)
            : Sa(t)
            ? ((this.state = T.NAMED_CHARACTER_REFERENCE),
              this._stateNamedCharacterReference(t))
            : (this._flushCodePointConsumedAsCharacterReference(E.AMPERSAND),
              this._reconsumeInState(this.returnState, t));
    }
    _stateNamedCharacterReference(t) {
        const r = this._matchNamedCharacterReference(t);
        if (!this._ensureHibernation())
            if (r) {
                for (let a = 0; a < r.length; a++)
                    this._flushCodePointConsumedAsCharacterReference(r[a]);
                this.state = this.returnState;
            } else
                this._flushCodePointConsumedAsCharacterReference(E.AMPERSAND),
                    (this.state = T.AMBIGUOUS_AMPERSAND);
    }
    _stateAmbiguousAmpersand(t) {
        Sa(t)
            ? this._flushCodePointConsumedAsCharacterReference(t)
            : (t === E.SEMICOLON && this._err(O.unknownNamedCharacterReference),
              this._reconsumeInState(this.returnState, t));
    }
    _stateNumericCharacterReference(t) {
        (this.charRefCode = 0),
            t === E.LATIN_SMALL_X || t === E.LATIN_CAPITAL_X
                ? (this.state = T.HEXADEMICAL_CHARACTER_REFERENCE_START)
                : yt(t)
                ? ((this.state = T.DECIMAL_CHARACTER_REFERENCE),
                  this._stateDecimalCharacterReference(t))
                : (this._err(O.absenceOfDigitsInNumericCharacterReference),
                  this._flushCodePointConsumedAsCharacterReference(E.AMPERSAND),
                  this._flushCodePointConsumedAsCharacterReference(
                      E.NUMBER_SIGN
                  ),
                  this._reconsumeInState(this.returnState, t));
    }
    _stateHexademicalCharacterReferenceStart(t) {
        Hc(t)
            ? ((this.state = T.HEXADEMICAL_CHARACTER_REFERENCE),
              this._stateHexademicalCharacterReference(t))
            : (this._err(O.absenceOfDigitsInNumericCharacterReference),
              this._flushCodePointConsumedAsCharacterReference(E.AMPERSAND),
              this._flushCodePointConsumedAsCharacterReference(E.NUMBER_SIGN),
              this._unconsume(2),
              (this.state = this.returnState));
    }
    _stateHexademicalCharacterReference(t) {
        g0(t)
            ? (this.charRefCode = this.charRefCode * 16 + t - 55)
            : A0(t)
            ? (this.charRefCode = this.charRefCode * 16 + t - 87)
            : yt(t)
            ? (this.charRefCode = this.charRefCode * 16 + t - 48)
            : t === E.SEMICOLON
            ? (this.state = T.NUMERIC_CHARACTER_REFERENCE_END)
            : (this._err(O.missingSemicolonAfterCharacterReference),
              (this.state = T.NUMERIC_CHARACTER_REFERENCE_END),
              this._stateNumericCharacterReferenceEnd(t));
    }
    _stateDecimalCharacterReference(t) {
        yt(t)
            ? (this.charRefCode = this.charRefCode * 10 + t - 48)
            : t === E.SEMICOLON
            ? (this.state = T.NUMERIC_CHARACTER_REFERENCE_END)
            : (this._err(O.missingSemicolonAfterCharacterReference),
              (this.state = T.NUMERIC_CHARACTER_REFERENCE_END),
              this._stateNumericCharacterReferenceEnd(t));
    }
    _stateNumericCharacterReferenceEnd(t) {
        if (this.charRefCode === E.NULL)
            this._err(O.nullCharacterReference),
                (this.charRefCode = E.REPLACEMENT_CHARACTER);
        else if (this.charRefCode > 1114111)
            this._err(O.characterReferenceOutsideUnicodeRange),
                (this.charRefCode = E.REPLACEMENT_CHARACTER);
        else if (p0(this.charRefCode))
            this._err(O.surrogateCharacterReference),
                (this.charRefCode = E.REPLACEMENT_CHARACTER);
        else if (T0(this.charRefCode))
            this._err(O.noncharacterCharacterReference);
        else if (
            m0(this.charRefCode) ||
            this.charRefCode === E.CARRIAGE_RETURN
        ) {
            this._err(O.controlCharacterReference);
            const r = wc.get(this.charRefCode);
            r !== void 0 && (this.charRefCode = r);
        }
        this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
            this._reconsumeInState(this.returnState, t);
    }
}
const N0 = new Set([
        i.DD,
        i.DT,
        i.LI,
        i.OPTGROUP,
        i.OPTION,
        i.P,
        i.RB,
        i.RP,
        i.RT,
        i.RTC,
    ]),
    Pn = new Set([
        ...N0,
        i.CAPTION,
        i.COLGROUP,
        i.TBODY,
        i.TD,
        i.TFOOT,
        i.TH,
        i.THEAD,
        i.TR,
    ]),
    zt = new Map([
        [i.APPLET, L.HTML],
        [i.CAPTION, L.HTML],
        [i.HTML, L.HTML],
        [i.MARQUEE, L.HTML],
        [i.OBJECT, L.HTML],
        [i.TABLE, L.HTML],
        [i.TD, L.HTML],
        [i.TEMPLATE, L.HTML],
        [i.TH, L.HTML],
        [i.ANNOTATION_XML, L.MATHML],
        [i.MI, L.MATHML],
        [i.MN, L.MATHML],
        [i.MO, L.MATHML],
        [i.MS, L.MATHML],
        [i.MTEXT, L.MATHML],
        [i.DESC, L.SVG],
        [i.FOREIGN_OBJECT, L.SVG],
        [i.TITLE, L.SVG],
    ]),
    qc = [i.H1, i.H2, i.H3, i.H4, i.H5, i.H6],
    Yc = [i.TR, i.TEMPLATE, i.HTML],
    $c = [i.TBODY, i.TFOOT, i.THEAD, i.TEMPLATE, i.HTML],
    Wc = [i.TABLE, i.TEMPLATE, i.HTML],
    Gc = [i.TD, i.TH];
class Vc {
    constructor(t, r, a) {
        (this.treeAdapter = r),
            (this.handler = a),
            (this.items = []),
            (this.tagIDs = []),
            (this.stackTop = -1),
            (this.tmplCount = 0),
            (this.currentTagId = i.UNKNOWN),
            (this.current = t);
    }
    get currentTmplContentOrNode() {
        return this._isInTemplate()
            ? this.treeAdapter.getTemplateContent(this.current)
            : this.current;
    }
    _indexOf(t) {
        return this.items.lastIndexOf(t, this.stackTop);
    }
    _isInTemplate() {
        return (
            this.currentTagId === i.TEMPLATE &&
            this.treeAdapter.getNamespaceURI(this.current) === L.HTML
        );
    }
    _updateCurrentElement() {
        (this.current = this.items[this.stackTop]),
            (this.currentTagId = this.tagIDs[this.stackTop]);
    }
    push(t, r) {
        this.stackTop++,
            (this.items[this.stackTop] = t),
            (this.current = t),
            (this.tagIDs[this.stackTop] = r),
            (this.currentTagId = r),
            this._isInTemplate() && this.tmplCount++,
            this.handler.onItemPush(t, r, !0);
    }
    pop() {
        const t = this.current;
        this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
            this.stackTop--,
            this._updateCurrentElement(),
            this.handler.onItemPop(t, !0);
    }
    replace(t, r) {
        const a = this._indexOf(t);
        (this.items[a] = r), a === this.stackTop && (this.current = r);
    }
    insertAfter(t, r, a) {
        const n = this._indexOf(t) + 1;
        this.items.splice(n, 0, r),
            this.tagIDs.splice(n, 0, a),
            this.stackTop++,
            n === this.stackTop && this._updateCurrentElement(),
            this.handler.onItemPush(
                this.current,
                this.currentTagId,
                n === this.stackTop
            );
    }
    popUntilTagNamePopped(t) {
        let r = this.stackTop + 1;
        do r = this.tagIDs.lastIndexOf(t, r - 1);
        while (
            r > 0 &&
            this.treeAdapter.getNamespaceURI(this.items[r]) !== L.HTML
        );
        this.shortenToLength(r < 0 ? 0 : r);
    }
    shortenToLength(t) {
        for (; this.stackTop >= t; ) {
            const r = this.current;
            this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1),
                this.stackTop--,
                this._updateCurrentElement(),
                this.handler.onItemPop(r, this.stackTop < t);
        }
    }
    popUntilElementPopped(t) {
        const r = this._indexOf(t);
        this.shortenToLength(r < 0 ? 0 : r);
    }
    popUntilPopped(t, r) {
        const a = this._indexOfTagNames(t, r);
        this.shortenToLength(a < 0 ? 0 : a);
    }
    popUntilNumberedHeaderPopped() {
        this.popUntilPopped(qc, L.HTML);
    }
    popUntilTableCellPopped() {
        this.popUntilPopped(Gc, L.HTML);
    }
    popAllUpToHtmlElement() {
        (this.tmplCount = 0), this.shortenToLength(1);
    }
    _indexOfTagNames(t, r) {
        for (let a = this.stackTop; a >= 0; a--)
            if (
                t.includes(this.tagIDs[a]) &&
                this.treeAdapter.getNamespaceURI(this.items[a]) === r
            )
                return a;
        return -1;
    }
    clearBackTo(t, r) {
        const a = this._indexOfTagNames(t, r);
        this.shortenToLength(a + 1);
    }
    clearBackToTableContext() {
        this.clearBackTo(Wc, L.HTML);
    }
    clearBackToTableBodyContext() {
        this.clearBackTo($c, L.HTML);
    }
    clearBackToTableRowContext() {
        this.clearBackTo(Yc, L.HTML);
    }
    remove(t) {
        const r = this._indexOf(t);
        r >= 0 &&
            (r === this.stackTop
                ? this.pop()
                : (this.items.splice(r, 1),
                  this.tagIDs.splice(r, 1),
                  this.stackTop--,
                  this._updateCurrentElement(),
                  this.handler.onItemPop(t, !1)));
    }
    tryPeekProperlyNestedBodyElement() {
        return this.stackTop >= 1 && this.tagIDs[1] === i.BODY
            ? this.items[1]
            : null;
    }
    contains(t) {
        return this._indexOf(t) > -1;
    }
    getCommonAncestor(t) {
        const r = this._indexOf(t) - 1;
        return r >= 0 ? this.items[r] : null;
    }
    isRootHtmlElementCurrent() {
        return this.stackTop === 0 && this.tagIDs[0] === i.HTML;
    }
    hasInScope(t) {
        for (let r = this.stackTop; r >= 0; r--) {
            const a = this.tagIDs[r],
                n = this.treeAdapter.getNamespaceURI(this.items[r]);
            if (a === t && n === L.HTML) return !0;
            if (zt.get(a) === n) return !1;
        }
        return !0;
    }
    hasNumberedHeaderInScope() {
        for (let t = this.stackTop; t >= 0; t--) {
            const r = this.tagIDs[t],
                a = this.treeAdapter.getNamespaceURI(this.items[t]);
            if (_0(r) && a === L.HTML) return !0;
            if (zt.get(r) === a) return !1;
        }
        return !0;
    }
    hasInListItemScope(t) {
        for (let r = this.stackTop; r >= 0; r--) {
            const a = this.tagIDs[r],
                n = this.treeAdapter.getNamespaceURI(this.items[r]);
            if (a === t && n === L.HTML) return !0;
            if (((a === i.UL || a === i.OL) && n === L.HTML) || zt.get(a) === n)
                return !1;
        }
        return !0;
    }
    hasInButtonScope(t) {
        for (let r = this.stackTop; r >= 0; r--) {
            const a = this.tagIDs[r],
                n = this.treeAdapter.getNamespaceURI(this.items[r]);
            if (a === t && n === L.HTML) return !0;
            if ((a === i.BUTTON && n === L.HTML) || zt.get(a) === n) return !1;
        }
        return !0;
    }
    hasInTableScope(t) {
        for (let r = this.stackTop; r >= 0; r--) {
            const a = this.tagIDs[r];
            if (this.treeAdapter.getNamespaceURI(this.items[r]) === L.HTML) {
                if (a === t) return !0;
                if (a === i.TABLE || a === i.TEMPLATE || a === i.HTML)
                    return !1;
            }
        }
        return !0;
    }
    hasTableBodyContextInTableScope() {
        for (let t = this.stackTop; t >= 0; t--) {
            const r = this.tagIDs[t];
            if (this.treeAdapter.getNamespaceURI(this.items[t]) === L.HTML) {
                if (r === i.TBODY || r === i.THEAD || r === i.TFOOT) return !0;
                if (r === i.TABLE || r === i.HTML) return !1;
            }
        }
        return !0;
    }
    hasInSelectScope(t) {
        for (let r = this.stackTop; r >= 0; r--) {
            const a = this.tagIDs[r];
            if (this.treeAdapter.getNamespaceURI(this.items[r]) === L.HTML) {
                if (a === t) return !0;
                if (a !== i.OPTION && a !== i.OPTGROUP) return !1;
            }
        }
        return !0;
    }
    generateImpliedEndTags() {
        for (; N0.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsThoroughly() {
        for (; Pn.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsWithExclusion(t) {
        for (; this.currentTagId !== t && Pn.has(this.currentTagId); )
            this.pop();
    }
}
const kr = 3;
var ye;
(function (e) {
    (e[(e.Marker = 0)] = "Marker"), (e[(e.Element = 1)] = "Element");
})((ye = ye || (ye = {})));
const Bn = { type: ye.Marker };
class Qc {
    constructor(t) {
        (this.treeAdapter = t), (this.entries = []), (this.bookmark = null);
    }
    _getNoahArkConditionCandidates(t, r) {
        const a = [],
            n = r.length,
            s = this.treeAdapter.getTagName(t),
            u = this.treeAdapter.getNamespaceURI(t);
        for (let o = 0; o < this.entries.length; o++) {
            const l = this.entries[o];
            if (l.type === ye.Marker) break;
            const { element: c } = l;
            if (
                this.treeAdapter.getTagName(c) === s &&
                this.treeAdapter.getNamespaceURI(c) === u
            ) {
                const d = this.treeAdapter.getAttrList(c);
                d.length === n && a.push({ idx: o, attrs: d });
            }
        }
        return a;
    }
    _ensureNoahArkCondition(t) {
        if (this.entries.length < kr) return;
        const r = this.treeAdapter.getAttrList(t),
            a = this._getNoahArkConditionCandidates(t, r);
        if (a.length < kr) return;
        const n = new Map(r.map((u) => [u.name, u.value]));
        let s = 0;
        for (let u = 0; u < a.length; u++) {
            const o = a[u];
            o.attrs.every((l) => n.get(l.name) === l.value) &&
                ((s += 1), s >= kr && this.entries.splice(o.idx, 1));
        }
    }
    insertMarker() {
        this.entries.unshift(Bn);
    }
    pushElement(t, r) {
        this._ensureNoahArkCondition(t),
            this.entries.unshift({ type: ye.Element, element: t, token: r });
    }
    insertElementAfterBookmark(t, r) {
        const a = this.entries.indexOf(this.bookmark);
        this.entries.splice(a, 0, { type: ye.Element, element: t, token: r });
    }
    removeEntry(t) {
        const r = this.entries.indexOf(t);
        r >= 0 && this.entries.splice(r, 1);
    }
    clearToLastMarker() {
        const t = this.entries.indexOf(Bn);
        t >= 0 ? this.entries.splice(0, t + 1) : (this.entries.length = 0);
    }
    getElementEntryInScopeWithTagName(t) {
        const r = this.entries.find(
            (a) =>
                a.type === ye.Marker ||
                this.treeAdapter.getTagName(a.element) === t
        );
        return r && r.type === ye.Element ? r : null;
    }
    getElementEntry(t) {
        return this.entries.find(
            (r) => r.type === ye.Element && r.element === t
        );
    }
}
function kn(e) {
    return { nodeName: "#text", value: e, parentNode: null };
}
const Xe = {
        createDocument() {
            return {
                nodeName: "#document",
                mode: xe.NO_QUIRKS,
                childNodes: [],
            };
        },
        createDocumentFragment() {
            return { nodeName: "#document-fragment", childNodes: [] };
        },
        createElement(e, t, r) {
            return {
                nodeName: e,
                tagName: e,
                attrs: r,
                namespaceURI: t,
                childNodes: [],
                parentNode: null,
            };
        },
        createCommentNode(e) {
            return { nodeName: "#comment", data: e, parentNode: null };
        },
        appendChild(e, t) {
            e.childNodes.push(t), (t.parentNode = e);
        },
        insertBefore(e, t, r) {
            const a = e.childNodes.indexOf(r);
            e.childNodes.splice(a, 0, t), (t.parentNode = e);
        },
        setTemplateContent(e, t) {
            e.content = t;
        },
        getTemplateContent(e) {
            return e.content;
        },
        setDocumentType(e, t, r, a) {
            const n = e.childNodes.find((s) => s.nodeName === "#documentType");
            if (n) (n.name = t), (n.publicId = r), (n.systemId = a);
            else {
                const s = {
                    nodeName: "#documentType",
                    name: t,
                    publicId: r,
                    systemId: a,
                    parentNode: null,
                };
                Xe.appendChild(e, s);
            }
        },
        setDocumentMode(e, t) {
            e.mode = t;
        },
        getDocumentMode(e) {
            return e.mode;
        },
        detachNode(e) {
            if (e.parentNode) {
                const t = e.parentNode.childNodes.indexOf(e);
                e.parentNode.childNodes.splice(t, 1), (e.parentNode = null);
            }
        },
        insertText(e, t) {
            if (e.childNodes.length > 0) {
                const r = e.childNodes[e.childNodes.length - 1];
                if (Xe.isTextNode(r)) {
                    r.value += t;
                    return;
                }
            }
            Xe.appendChild(e, kn(t));
        },
        insertTextBefore(e, t, r) {
            const a = e.childNodes[e.childNodes.indexOf(r) - 1];
            a && Xe.isTextNode(a)
                ? (a.value += t)
                : Xe.insertBefore(e, kn(t), r);
        },
        adoptAttributes(e, t) {
            const r = new Set(e.attrs.map((a) => a.name));
            for (let a = 0; a < t.length; a++)
                r.has(t[a].name) || e.attrs.push(t[a]);
        },
        getFirstChild(e) {
            return e.childNodes[0];
        },
        getChildNodes(e) {
            return e.childNodes;
        },
        getParentNode(e) {
            return e.parentNode;
        },
        getAttrList(e) {
            return e.attrs;
        },
        getTagName(e) {
            return e.tagName;
        },
        getNamespaceURI(e) {
            return e.namespaceURI;
        },
        getTextNodeContent(e) {
            return e.value;
        },
        getCommentNodeContent(e) {
            return e.data;
        },
        getDocumentTypeNodeName(e) {
            return e.name;
        },
        getDocumentTypeNodePublicId(e) {
            return e.publicId;
        },
        getDocumentTypeNodeSystemId(e) {
            return e.systemId;
        },
        isTextNode(e) {
            return e.nodeName === "#text";
        },
        isCommentNode(e) {
            return e.nodeName === "#comment";
        },
        isDocumentTypeNode(e) {
            return e.nodeName === "#documentType";
        },
        isElementNode(e) {
            return Object.prototype.hasOwnProperty.call(e, "tagName");
        },
        setNodeSourceCodeLocation(e, t) {
            e.sourceCodeLocation = t;
        },
        getNodeSourceCodeLocation(e) {
            return e.sourceCodeLocation;
        },
        updateNodeSourceCodeLocation(e, t) {
            e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
        },
    },
    I0 = "html",
    Xc = "about:legacy-compat",
    zc = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
    S0 = [
        "+//silmaril//dtd html pro v0r11 19970101//",
        "-//as//dtd html 3.0 aswedit + extensions//",
        "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
        "-//ietf//dtd html 2.0 level 1//",
        "-//ietf//dtd html 2.0 level 2//",
        "-//ietf//dtd html 2.0 strict level 1//",
        "-//ietf//dtd html 2.0 strict level 2//",
        "-//ietf//dtd html 2.0 strict//",
        "-//ietf//dtd html 2.0//",
        "-//ietf//dtd html 2.1e//",
        "-//ietf//dtd html 3.0//",
        "-//ietf//dtd html 3.2 final//",
        "-//ietf//dtd html 3.2//",
        "-//ietf//dtd html 3//",
        "-//ietf//dtd html level 0//",
        "-//ietf//dtd html level 1//",
        "-//ietf//dtd html level 2//",
        "-//ietf//dtd html level 3//",
        "-//ietf//dtd html strict level 0//",
        "-//ietf//dtd html strict level 1//",
        "-//ietf//dtd html strict level 2//",
        "-//ietf//dtd html strict level 3//",
        "-//ietf//dtd html strict//",
        "-//ietf//dtd html//",
        "-//metrius//dtd metrius presentational//",
        "-//microsoft//dtd internet explorer 2.0 html strict//",
        "-//microsoft//dtd internet explorer 2.0 html//",
        "-//microsoft//dtd internet explorer 2.0 tables//",
        "-//microsoft//dtd internet explorer 3.0 html strict//",
        "-//microsoft//dtd internet explorer 3.0 html//",
        "-//microsoft//dtd internet explorer 3.0 tables//",
        "-//netscape comm. corp.//dtd html//",
        "-//netscape comm. corp.//dtd strict html//",
        "-//o'reilly and associates//dtd html 2.0//",
        "-//o'reilly and associates//dtd html extended 1.0//",
        "-//o'reilly and associates//dtd html extended relaxed 1.0//",
        "-//sq//dtd html 2.0 hotmetal + extensions//",
        "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
        "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
        "-//spyglass//dtd html 2.0 extended//",
        "-//sun microsystems corp.//dtd hotjava html//",
        "-//sun microsystems corp.//dtd hotjava strict html//",
        "-//w3c//dtd html 3 1995-03-24//",
        "-//w3c//dtd html 3.2 draft//",
        "-//w3c//dtd html 3.2 final//",
        "-//w3c//dtd html 3.2//",
        "-//w3c//dtd html 3.2s draft//",
        "-//w3c//dtd html 4.0 frameset//",
        "-//w3c//dtd html 4.0 transitional//",
        "-//w3c//dtd html experimental 19960712//",
        "-//w3c//dtd html experimental 970421//",
        "-//w3c//dtd w3 html//",
        "-//w3o//dtd w3 html 3.0//",
        "-//webtechs//dtd mozilla html 2.0//",
        "-//webtechs//dtd mozilla html//",
    ],
    jc = [
        ...S0,
        "-//w3c//dtd html 4.01 frameset//",
        "-//w3c//dtd html 4.01 transitional//",
    ],
    Kc = new Set([
        "-//w3o//dtd w3 html strict 3.0//en//",
        "-/w3c/dtd html 4.0 transitional/en",
        "html",
    ]),
    R0 = [
        "-//w3c//dtd xhtml 1.0 frameset//",
        "-//w3c//dtd xhtml 1.0 transitional//",
    ],
    Zc = [
        ...R0,
        "-//w3c//dtd html 4.01 frameset//",
        "-//w3c//dtd html 4.01 transitional//",
    ];
function wn(e, t) {
    return t.some((r) => e.startsWith(r));
}
function Jc(e) {
    return (
        e.name === I0 &&
        e.publicId === null &&
        (e.systemId === null || e.systemId === Xc)
    );
}
function el(e) {
    if (e.name !== I0) return xe.QUIRKS;
    const { systemId: t } = e;
    if (t && t.toLowerCase() === zc) return xe.QUIRKS;
    let { publicId: r } = e;
    if (r !== null) {
        if (((r = r.toLowerCase()), Kc.has(r))) return xe.QUIRKS;
        let a = t === null ? jc : S0;
        if (wn(r, a)) return xe.QUIRKS;
        if (((a = t === null ? R0 : Zc), wn(r, a))) return xe.LIMITED_QUIRKS;
    }
    return xe.NO_QUIRKS;
}
const Mn = { TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml" },
    tl = "definitionurl",
    rl = "definitionURL",
    al = new Map(
        [
            "attributeName",
            "attributeType",
            "baseFrequency",
            "baseProfile",
            "calcMode",
            "clipPathUnits",
            "diffuseConstant",
            "edgeMode",
            "filterUnits",
            "glyphRef",
            "gradientTransform",
            "gradientUnits",
            "kernelMatrix",
            "kernelUnitLength",
            "keyPoints",
            "keySplines",
            "keyTimes",
            "lengthAdjust",
            "limitingConeAngle",
            "markerHeight",
            "markerUnits",
            "markerWidth",
            "maskContentUnits",
            "maskUnits",
            "numOctaves",
            "pathLength",
            "patternContentUnits",
            "patternTransform",
            "patternUnits",
            "pointsAtX",
            "pointsAtY",
            "pointsAtZ",
            "preserveAlpha",
            "preserveAspectRatio",
            "primitiveUnits",
            "refX",
            "refY",
            "repeatCount",
            "repeatDur",
            "requiredExtensions",
            "requiredFeatures",
            "specularConstant",
            "specularExponent",
            "spreadMethod",
            "startOffset",
            "stdDeviation",
            "stitchTiles",
            "surfaceScale",
            "systemLanguage",
            "tableValues",
            "targetX",
            "targetY",
            "textLength",
            "viewBox",
            "viewTarget",
            "xChannelSelector",
            "yChannelSelector",
            "zoomAndPan",
        ].map((e) => [e.toLowerCase(), e])
    ),
    nl = new Map([
        [
            "xlink:actuate",
            { prefix: "xlink", name: "actuate", namespace: L.XLINK },
        ],
        [
            "xlink:arcrole",
            { prefix: "xlink", name: "arcrole", namespace: L.XLINK },
        ],
        ["xlink:href", { prefix: "xlink", name: "href", namespace: L.XLINK }],
        ["xlink:role", { prefix: "xlink", name: "role", namespace: L.XLINK }],
        ["xlink:show", { prefix: "xlink", name: "show", namespace: L.XLINK }],
        ["xlink:title", { prefix: "xlink", name: "title", namespace: L.XLINK }],
        ["xlink:type", { prefix: "xlink", name: "type", namespace: L.XLINK }],
        ["xml:base", { prefix: "xml", name: "base", namespace: L.XML }],
        ["xml:lang", { prefix: "xml", name: "lang", namespace: L.XML }],
        ["xml:space", { prefix: "xml", name: "space", namespace: L.XML }],
        ["xmlns", { prefix: "", name: "xmlns", namespace: L.XMLNS }],
        ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: L.XMLNS }],
    ]),
    sl = new Map(
        [
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "clipPath",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "foreignObject",
            "glyphRef",
            "linearGradient",
            "radialGradient",
            "textPath",
        ].map((e) => [e.toLowerCase(), e])
    ),
    il = new Set([
        i.B,
        i.BIG,
        i.BLOCKQUOTE,
        i.BODY,
        i.BR,
        i.CENTER,
        i.CODE,
        i.DD,
        i.DIV,
        i.DL,
        i.DT,
        i.EM,
        i.EMBED,
        i.H1,
        i.H2,
        i.H3,
        i.H4,
        i.H5,
        i.H6,
        i.HEAD,
        i.HR,
        i.I,
        i.IMG,
        i.LI,
        i.LISTING,
        i.MENU,
        i.META,
        i.NOBR,
        i.OL,
        i.P,
        i.PRE,
        i.RUBY,
        i.S,
        i.SMALL,
        i.SPAN,
        i.STRONG,
        i.STRIKE,
        i.SUB,
        i.SUP,
        i.TABLE,
        i.TT,
        i.U,
        i.UL,
        i.VAR,
    ]);
function ul(e) {
    const t = e.tagID;
    return (
        (t === i.FONT &&
            e.attrs.some(
                ({ name: a }) =>
                    a === $e.COLOR || a === $e.SIZE || a === $e.FACE
            )) ||
        il.has(t)
    );
}
function v0(e) {
    for (let t = 0; t < e.attrs.length; t++)
        if (e.attrs[t].name === tl) {
            e.attrs[t].name = rl;
            break;
        }
}
function y0(e) {
    for (let t = 0; t < e.attrs.length; t++) {
        const r = al.get(e.attrs[t].name);
        r != null && (e.attrs[t].name = r);
    }
}
function Xa(e) {
    for (let t = 0; t < e.attrs.length; t++) {
        const r = nl.get(e.attrs[t].name);
        r &&
            ((e.attrs[t].prefix = r.prefix),
            (e.attrs[t].name = r.name),
            (e.attrs[t].namespace = r.namespace));
    }
}
function ol(e) {
    const t = sl.get(e.tagName);
    t != null && ((e.tagName = t), (e.tagID = br(e.tagName)));
}
function cl(e, t) {
    return (
        t === L.MATHML &&
        (e === i.MI || e === i.MO || e === i.MN || e === i.MS || e === i.MTEXT)
    );
}
function ll(e, t, r) {
    if (t === L.MATHML && e === i.ANNOTATION_XML) {
        for (let a = 0; a < r.length; a++)
            if (r[a].name === $e.ENCODING) {
                const n = r[a].value.toLowerCase();
                return n === Mn.TEXT_HTML || n === Mn.APPLICATION_XML;
            }
    }
    return (
        t === L.SVG && (e === i.FOREIGN_OBJECT || e === i.DESC || e === i.TITLE)
    );
}
function dl(e, t, r, a) {
    return (
        ((!a || a === L.HTML) && ll(e, t, r)) ||
        ((!a || a === L.MATHML) && cl(e, t))
    );
}
const fl = "hidden",
    hl = 8,
    El = 3;
var b;
(function (e) {
    (e[(e.INITIAL = 0)] = "INITIAL"),
        (e[(e.BEFORE_HTML = 1)] = "BEFORE_HTML"),
        (e[(e.BEFORE_HEAD = 2)] = "BEFORE_HEAD"),
        (e[(e.IN_HEAD = 3)] = "IN_HEAD"),
        (e[(e.IN_HEAD_NO_SCRIPT = 4)] = "IN_HEAD_NO_SCRIPT"),
        (e[(e.AFTER_HEAD = 5)] = "AFTER_HEAD"),
        (e[(e.IN_BODY = 6)] = "IN_BODY"),
        (e[(e.TEXT = 7)] = "TEXT"),
        (e[(e.IN_TABLE = 8)] = "IN_TABLE"),
        (e[(e.IN_TABLE_TEXT = 9)] = "IN_TABLE_TEXT"),
        (e[(e.IN_CAPTION = 10)] = "IN_CAPTION"),
        (e[(e.IN_COLUMN_GROUP = 11)] = "IN_COLUMN_GROUP"),
        (e[(e.IN_TABLE_BODY = 12)] = "IN_TABLE_BODY"),
        (e[(e.IN_ROW = 13)] = "IN_ROW"),
        (e[(e.IN_CELL = 14)] = "IN_CELL"),
        (e[(e.IN_SELECT = 15)] = "IN_SELECT"),
        (e[(e.IN_SELECT_IN_TABLE = 16)] = "IN_SELECT_IN_TABLE"),
        (e[(e.IN_TEMPLATE = 17)] = "IN_TEMPLATE"),
        (e[(e.AFTER_BODY = 18)] = "AFTER_BODY"),
        (e[(e.IN_FRAMESET = 19)] = "IN_FRAMESET"),
        (e[(e.AFTER_FRAMESET = 20)] = "AFTER_FRAMESET"),
        (e[(e.AFTER_AFTER_BODY = 21)] = "AFTER_AFTER_BODY"),
        (e[(e.AFTER_AFTER_FRAMESET = 22)] = "AFTER_AFTER_FRAMESET");
})(b || (b = {}));
const pl = {
        startLine: -1,
        startCol: -1,
        startOffset: -1,
        endLine: -1,
        endCol: -1,
        endOffset: -1,
    },
    O0 = new Set([i.TABLE, i.TBODY, i.TFOOT, i.THEAD, i.TR]),
    Hn = {
        scriptingEnabled: !0,
        sourceCodeLocationInfo: !1,
        treeAdapter: Xe,
        onParseError: null,
    };
class L0 {
    constructor(t, r, a = null, n = null) {
        (this.fragmentContext = a),
            (this.scriptHandler = n),
            (this.currentToken = null),
            (this.stopped = !1),
            (this.insertionMode = b.INITIAL),
            (this.originalInsertionMode = b.INITIAL),
            (this.headElement = null),
            (this.formElement = null),
            (this.currentNotInHTML = !1),
            (this.tmplInsertionModeStack = []),
            (this.pendingCharacterTokens = []),
            (this.hasNonWhitespacePendingCharacterToken = !1),
            (this.framesetOk = !0),
            (this.skipNextNewLine = !1),
            (this.fosterParentingEnabled = !1),
            (this.options = { ...Hn, ...t }),
            (this.treeAdapter = this.options.treeAdapter),
            (this.onParseError = this.options.onParseError),
            this.onParseError && (this.options.sourceCodeLocationInfo = !0),
            (this.document = r != null ? r : this.treeAdapter.createDocument()),
            (this.tokenizer = new Uc(this.options, this)),
            (this.activeFormattingElements = new Qc(this.treeAdapter)),
            (this.fragmentContextID = a
                ? br(this.treeAdapter.getTagName(a))
                : i.UNKNOWN),
            this._setContextModes(
                a != null ? a : this.document,
                this.fragmentContextID
            ),
            (this.openElements = new Vc(this.document, this.treeAdapter, this));
    }
    static parse(t, r) {
        const a = new this(r);
        return a.tokenizer.write(t, !0), a.document;
    }
    static getFragmentParser(t, r) {
        const a = { ...Hn, ...r };
        t != null || (t = a.treeAdapter.createElement(I.TEMPLATE, L.HTML, []));
        const n = a.treeAdapter.createElement("documentmock", L.HTML, []),
            s = new this(a, n, t);
        return (
            s.fragmentContextID === i.TEMPLATE &&
                s.tmplInsertionModeStack.unshift(b.IN_TEMPLATE),
            s._initTokenizerForFragmentParsing(),
            s._insertFakeRootElement(),
            s._resetInsertionMode(),
            s._findFormInFragmentContext(),
            s
        );
    }
    getFragment() {
        const t = this.treeAdapter.getFirstChild(this.document),
            r = this.treeAdapter.createDocumentFragment();
        return this._adoptNodes(t, r), r;
    }
    _err(t, r, a) {
        var n;
        if (!this.onParseError) return;
        const s = (n = t.location) !== null && n !== void 0 ? n : pl,
            u = {
                code: r,
                startLine: s.startLine,
                startCol: s.startCol,
                startOffset: s.startOffset,
                endLine: a ? s.startLine : s.endLine,
                endCol: a ? s.startCol : s.endCol,
                endOffset: a ? s.startOffset : s.endOffset,
            };
        this.onParseError(u);
    }
    onItemPush(t, r, a) {
        var n, s;
        (s = (n = this.treeAdapter).onItemPush) === null ||
            s === void 0 ||
            s.call(n, t),
            a && this.openElements.stackTop > 0 && this._setContextModes(t, r);
    }
    onItemPop(t, r) {
        var a, n;
        if (
            (this.options.sourceCodeLocationInfo &&
                this._setEndLocation(t, this.currentToken),
            (n = (a = this.treeAdapter).onItemPop) === null ||
                n === void 0 ||
                n.call(a, t, this.openElements.current),
            r)
        ) {
            let s, u;
            this.openElements.stackTop === 0 && this.fragmentContext
                ? ((s = this.fragmentContext), (u = this.fragmentContextID))
                : ({ current: s, currentTagId: u } = this.openElements),
                this._setContextModes(s, u);
        }
    }
    _setContextModes(t, r) {
        const a =
            t === this.document ||
            this.treeAdapter.getNamespaceURI(t) === L.HTML;
        (this.currentNotInHTML = !a),
            (this.tokenizer.inForeignNode =
                !a && !this._isIntegrationPoint(r, t));
    }
    _switchToTextParsing(t, r) {
        this._insertElement(t, L.HTML),
            (this.tokenizer.state = r),
            (this.originalInsertionMode = this.insertionMode),
            (this.insertionMode = b.TEXT);
    }
    switchToPlaintextParsing() {
        (this.insertionMode = b.TEXT),
            (this.originalInsertionMode = b.IN_BODY),
            (this.tokenizer.state = _e.PLAINTEXT);
    }
    _getAdjustedCurrentElement() {
        return this.openElements.stackTop === 0 && this.fragmentContext
            ? this.fragmentContext
            : this.openElements.current;
    }
    _findFormInFragmentContext() {
        let t = this.fragmentContext;
        for (; t; ) {
            if (this.treeAdapter.getTagName(t) === I.FORM) {
                this.formElement = t;
                break;
            }
            t = this.treeAdapter.getParentNode(t);
        }
    }
    _initTokenizerForFragmentParsing() {
        if (
            !(
                !this.fragmentContext ||
                this.treeAdapter.getNamespaceURI(this.fragmentContext) !==
                    L.HTML
            )
        )
            switch (this.fragmentContextID) {
                case i.TITLE:
                case i.TEXTAREA: {
                    this.tokenizer.state = _e.RCDATA;
                    break;
                }
                case i.STYLE:
                case i.XMP:
                case i.IFRAME:
                case i.NOEMBED:
                case i.NOFRAMES:
                case i.NOSCRIPT: {
                    this.tokenizer.state = _e.RAWTEXT;
                    break;
                }
                case i.SCRIPT: {
                    this.tokenizer.state = _e.SCRIPT_DATA;
                    break;
                }
                case i.PLAINTEXT: {
                    this.tokenizer.state = _e.PLAINTEXT;
                    break;
                }
            }
    }
    _setDocumentType(t) {
        const r = t.name || "",
            a = t.publicId || "",
            n = t.systemId || "";
        if (
            (this.treeAdapter.setDocumentType(this.document, r, a, n),
            t.location)
        ) {
            const u = this.treeAdapter
                .getChildNodes(this.document)
                .find((o) => this.treeAdapter.isDocumentTypeNode(o));
            u && this.treeAdapter.setNodeSourceCodeLocation(u, t.location);
        }
    }
    _attachElementToTree(t, r) {
        if (this.options.sourceCodeLocationInfo) {
            const a = r && { ...r, startTag: r };
            this.treeAdapter.setNodeSourceCodeLocation(t, a);
        }
        if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(t);
        else {
            const a = this.openElements.currentTmplContentOrNode;
            this.treeAdapter.appendChild(a, t);
        }
    }
    _appendElement(t, r) {
        const a = this.treeAdapter.createElement(t.tagName, r, t.attrs);
        this._attachElementToTree(a, t.location);
    }
    _insertElement(t, r) {
        const a = this.treeAdapter.createElement(t.tagName, r, t.attrs);
        this._attachElementToTree(a, t.location),
            this.openElements.push(a, t.tagID);
    }
    _insertFakeElement(t, r) {
        const a = this.treeAdapter.createElement(t, L.HTML, []);
        this._attachElementToTree(a, null), this.openElements.push(a, r);
    }
    _insertTemplate(t) {
        const r = this.treeAdapter.createElement(t.tagName, L.HTML, t.attrs),
            a = this.treeAdapter.createDocumentFragment();
        this.treeAdapter.setTemplateContent(r, a),
            this._attachElementToTree(r, t.location),
            this.openElements.push(r, t.tagID),
            this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(a, null);
    }
    _insertFakeRootElement() {
        const t = this.treeAdapter.createElement(I.HTML, L.HTML, []);
        this.options.sourceCodeLocationInfo &&
            this.treeAdapter.setNodeSourceCodeLocation(t, null),
            this.treeAdapter.appendChild(this.openElements.current, t),
            this.openElements.push(t, i.HTML);
    }
    _appendCommentNode(t, r) {
        const a = this.treeAdapter.createCommentNode(t.data);
        this.treeAdapter.appendChild(r, a),
            this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(a, t.location);
    }
    _insertCharacters(t) {
        let r, a;
        if (
            (this._shouldFosterParentOnInsertion()
                ? (({ parent: r, beforeElement: a } =
                      this._findFosterParentingLocation()),
                  a
                      ? this.treeAdapter.insertTextBefore(r, t.chars, a)
                      : this.treeAdapter.insertText(r, t.chars))
                : ((r = this.openElements.currentTmplContentOrNode),
                  this.treeAdapter.insertText(r, t.chars)),
            !t.location)
        )
            return;
        const n = this.treeAdapter.getChildNodes(r),
            s = a ? n.lastIndexOf(a) : n.length,
            u = n[s - 1];
        if (this.treeAdapter.getNodeSourceCodeLocation(u)) {
            const { endLine: l, endCol: c, endOffset: d } = t.location;
            this.treeAdapter.updateNodeSourceCodeLocation(u, {
                endLine: l,
                endCol: c,
                endOffset: d,
            });
        } else
            this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(u, t.location);
    }
    _adoptNodes(t, r) {
        for (
            let a = this.treeAdapter.getFirstChild(t);
            a;
            a = this.treeAdapter.getFirstChild(t)
        )
            this.treeAdapter.detachNode(a), this.treeAdapter.appendChild(r, a);
    }
    _setEndLocation(t, r) {
        if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
            const a = r.location,
                n = this.treeAdapter.getTagName(t),
                s =
                    r.type === Z.END_TAG && n === r.tagName
                        ? {
                              endTag: { ...a },
                              endLine: a.endLine,
                              endCol: a.endCol,
                              endOffset: a.endOffset,
                          }
                        : {
                              endLine: a.startLine,
                              endCol: a.startCol,
                              endOffset: a.startOffset,
                          };
            this.treeAdapter.updateNodeSourceCodeLocation(t, s);
        }
    }
    shouldProcessStartTagTokenInForeignContent(t) {
        if (!this.currentNotInHTML) return !1;
        let r, a;
        return (
            this.openElements.stackTop === 0 && this.fragmentContext
                ? ((r = this.fragmentContext), (a = this.fragmentContextID))
                : ({ current: r, currentTagId: a } = this.openElements),
            t.tagID === i.SVG &&
            this.treeAdapter.getTagName(r) === I.ANNOTATION_XML &&
            this.treeAdapter.getNamespaceURI(r) === L.MATHML
                ? !1
                : this.tokenizer.inForeignNode ||
                  ((t.tagID === i.MGLYPH || t.tagID === i.MALIGNMARK) &&
                      !this._isIntegrationPoint(a, r, L.HTML))
        );
    }
    _processToken(t) {
        switch (t.type) {
            case Z.CHARACTER: {
                this.onCharacter(t);
                break;
            }
            case Z.NULL_CHARACTER: {
                this.onNullCharacter(t);
                break;
            }
            case Z.COMMENT: {
                this.onComment(t);
                break;
            }
            case Z.DOCTYPE: {
                this.onDoctype(t);
                break;
            }
            case Z.START_TAG: {
                this._processStartTag(t);
                break;
            }
            case Z.END_TAG: {
                this.onEndTag(t);
                break;
            }
            case Z.EOF: {
                this.onEof(t);
                break;
            }
            case Z.WHITESPACE_CHARACTER: {
                this.onWhitespaceCharacter(t);
                break;
            }
        }
    }
    _isIntegrationPoint(t, r, a) {
        const n = this.treeAdapter.getNamespaceURI(r),
            s = this.treeAdapter.getAttrList(r);
        return dl(t, n, s, a);
    }
    _reconstructActiveFormattingElements() {
        const t = this.activeFormattingElements.entries.length;
        if (t) {
            const r = this.activeFormattingElements.entries.findIndex(
                    (n) =>
                        n.type === ye.Marker ||
                        this.openElements.contains(n.element)
                ),
                a = r < 0 ? t - 1 : r - 1;
            for (let n = a; n >= 0; n--) {
                const s = this.activeFormattingElements.entries[n];
                this._insertElement(
                    s.token,
                    this.treeAdapter.getNamespaceURI(s.element)
                ),
                    (s.element = this.openElements.current);
            }
        }
    }
    _closeTableCell() {
        this.openElements.generateImpliedEndTags(),
            this.openElements.popUntilTableCellPopped(),
            this.activeFormattingElements.clearToLastMarker(),
            (this.insertionMode = b.IN_ROW);
    }
    _closePElement() {
        this.openElements.generateImpliedEndTagsWithExclusion(i.P),
            this.openElements.popUntilTagNamePopped(i.P);
    }
    _resetInsertionMode() {
        for (let t = this.openElements.stackTop; t >= 0; t--)
            switch (
                t === 0 && this.fragmentContext
                    ? this.fragmentContextID
                    : this.openElements.tagIDs[t]
            ) {
                case i.TR:
                    this.insertionMode = b.IN_ROW;
                    return;
                case i.TBODY:
                case i.THEAD:
                case i.TFOOT:
                    this.insertionMode = b.IN_TABLE_BODY;
                    return;
                case i.CAPTION:
                    this.insertionMode = b.IN_CAPTION;
                    return;
                case i.COLGROUP:
                    this.insertionMode = b.IN_COLUMN_GROUP;
                    return;
                case i.TABLE:
                    this.insertionMode = b.IN_TABLE;
                    return;
                case i.BODY:
                    this.insertionMode = b.IN_BODY;
                    return;
                case i.FRAMESET:
                    this.insertionMode = b.IN_FRAMESET;
                    return;
                case i.SELECT:
                    this._resetInsertionModeForSelect(t);
                    return;
                case i.TEMPLATE:
                    this.insertionMode = this.tmplInsertionModeStack[0];
                    return;
                case i.HTML:
                    this.insertionMode = this.headElement
                        ? b.AFTER_HEAD
                        : b.BEFORE_HEAD;
                    return;
                case i.TD:
                case i.TH:
                    if (t > 0) {
                        this.insertionMode = b.IN_CELL;
                        return;
                    }
                    break;
                case i.HEAD:
                    if (t > 0) {
                        this.insertionMode = b.IN_HEAD;
                        return;
                    }
                    break;
            }
        this.insertionMode = b.IN_BODY;
    }
    _resetInsertionModeForSelect(t) {
        if (t > 0)
            for (let r = t - 1; r > 0; r--) {
                const a = this.openElements.tagIDs[r];
                if (a === i.TEMPLATE) break;
                if (a === i.TABLE) {
                    this.insertionMode = b.IN_SELECT_IN_TABLE;
                    return;
                }
            }
        this.insertionMode = b.IN_SELECT;
    }
    _isElementCausesFosterParenting(t) {
        return O0.has(t);
    }
    _shouldFosterParentOnInsertion() {
        return (
            this.fosterParentingEnabled &&
            this._isElementCausesFosterParenting(this.openElements.currentTagId)
        );
    }
    _findFosterParentingLocation() {
        for (let t = this.openElements.stackTop; t >= 0; t--) {
            const r = this.openElements.items[t];
            switch (this.openElements.tagIDs[t]) {
                case i.TEMPLATE:
                    if (this.treeAdapter.getNamespaceURI(r) === L.HTML)
                        return {
                            parent: this.treeAdapter.getTemplateContent(r),
                            beforeElement: null,
                        };
                    break;
                case i.TABLE: {
                    const a = this.treeAdapter.getParentNode(r);
                    return a
                        ? { parent: a, beforeElement: r }
                        : {
                              parent: this.openElements.items[t - 1],
                              beforeElement: null,
                          };
                }
            }
        }
        return { parent: this.openElements.items[0], beforeElement: null };
    }
    _fosterParentElement(t) {
        const r = this._findFosterParentingLocation();
        r.beforeElement
            ? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement)
            : this.treeAdapter.appendChild(r.parent, t);
    }
    _isSpecialElement(t, r) {
        const a = this.treeAdapter.getNamespaceURI(t);
        return Pc[a].has(r);
    }
    onCharacter(t) {
        if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
            Gd(this, t);
            return;
        }
        switch (this.insertionMode) {
            case b.INITIAL:
                It(this, t);
                break;
            case b.BEFORE_HTML:
                Ot(this, t);
                break;
            case b.BEFORE_HEAD:
                Lt(this, t);
                break;
            case b.IN_HEAD:
                Dt(this, t);
                break;
            case b.IN_HEAD_NO_SCRIPT:
                Pt(this, t);
                break;
            case b.AFTER_HEAD:
                Bt(this, t);
                break;
            case b.IN_BODY:
            case b.IN_CAPTION:
            case b.IN_CELL:
            case b.IN_TEMPLATE:
                P0(this, t);
                break;
            case b.TEXT:
            case b.IN_SELECT:
            case b.IN_SELECT_IN_TABLE:
                this._insertCharacters(t);
                break;
            case b.IN_TABLE:
            case b.IN_TABLE_BODY:
            case b.IN_ROW:
                wr(this, t);
                break;
            case b.IN_TABLE_TEXT:
                F0(this, t);
                break;
            case b.IN_COLUMN_GROUP:
                cr(this, t);
                break;
            case b.AFTER_BODY:
                lr(this, t);
                break;
            case b.AFTER_AFTER_BODY:
                Jt(this, t);
                break;
        }
    }
    onNullCharacter(t) {
        if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
            Wd(this, t);
            return;
        }
        switch (this.insertionMode) {
            case b.INITIAL:
                It(this, t);
                break;
            case b.BEFORE_HTML:
                Ot(this, t);
                break;
            case b.BEFORE_HEAD:
                Lt(this, t);
                break;
            case b.IN_HEAD:
                Dt(this, t);
                break;
            case b.IN_HEAD_NO_SCRIPT:
                Pt(this, t);
                break;
            case b.AFTER_HEAD:
                Bt(this, t);
                break;
            case b.TEXT:
                this._insertCharacters(t);
                break;
            case b.IN_TABLE:
            case b.IN_TABLE_BODY:
            case b.IN_ROW:
                wr(this, t);
                break;
            case b.IN_COLUMN_GROUP:
                cr(this, t);
                break;
            case b.AFTER_BODY:
                lr(this, t);
                break;
            case b.AFTER_AFTER_BODY:
                Jt(this, t);
                break;
        }
    }
    onComment(t) {
        if (((this.skipNextNewLine = !1), this.currentNotInHTML)) {
            Ra(this, t);
            return;
        }
        switch (this.insertionMode) {
            case b.INITIAL:
            case b.BEFORE_HTML:
            case b.BEFORE_HEAD:
            case b.IN_HEAD:
            case b.IN_HEAD_NO_SCRIPT:
            case b.AFTER_HEAD:
            case b.IN_BODY:
            case b.IN_TABLE:
            case b.IN_CAPTION:
            case b.IN_COLUMN_GROUP:
            case b.IN_TABLE_BODY:
            case b.IN_ROW:
            case b.IN_CELL:
            case b.IN_SELECT:
            case b.IN_SELECT_IN_TABLE:
            case b.IN_TEMPLATE:
            case b.IN_FRAMESET:
            case b.AFTER_FRAMESET:
                Ra(this, t);
                break;
            case b.IN_TABLE_TEXT:
                St(this, t);
                break;
            case b.AFTER_BODY:
                Al(this, t);
                break;
            case b.AFTER_AFTER_BODY:
            case b.AFTER_AFTER_FRAMESET:
                Cl(this, t);
                break;
        }
    }
    onDoctype(t) {
        switch (((this.skipNextNewLine = !1), this.insertionMode)) {
            case b.INITIAL:
                Nl(this, t);
                break;
            case b.BEFORE_HEAD:
            case b.IN_HEAD:
            case b.IN_HEAD_NO_SCRIPT:
            case b.AFTER_HEAD:
                this._err(t, O.misplacedDoctype);
                break;
            case b.IN_TABLE_TEXT:
                St(this, t);
                break;
        }
    }
    onStartTag(t) {
        (this.skipNextNewLine = !1),
            (this.currentToken = t),
            this._processStartTag(t),
            t.selfClosing &&
                !t.ackSelfClosing &&
                this._err(t, O.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
    _processStartTag(t) {
        this.shouldProcessStartTagTokenInForeignContent(t)
            ? Vd(this, t)
            : this._startTagOutsideForeignContent(t);
    }
    _startTagOutsideForeignContent(t) {
        switch (this.insertionMode) {
            case b.INITIAL:
                It(this, t);
                break;
            case b.BEFORE_HTML:
                Il(this, t);
                break;
            case b.BEFORE_HEAD:
                Rl(this, t);
                break;
            case b.IN_HEAD:
                Oe(this, t);
                break;
            case b.IN_HEAD_NO_SCRIPT:
                Ol(this, t);
                break;
            case b.AFTER_HEAD:
                Dl(this, t);
                break;
            case b.IN_BODY:
                Ee(this, t);
                break;
            case b.IN_TABLE:
                dt(this, t);
                break;
            case b.IN_TABLE_TEXT:
                St(this, t);
                break;
            case b.IN_CAPTION:
                vd(this, t);
                break;
            case b.IN_COLUMN_GROUP:
                Ka(this, t);
                break;
            case b.IN_TABLE_BODY:
                gr(this, t);
                break;
            case b.IN_ROW:
                Ar(this, t);
                break;
            case b.IN_CELL:
                Ld(this, t);
                break;
            case b.IN_SELECT:
                Y0(this, t);
                break;
            case b.IN_SELECT_IN_TABLE:
                Pd(this, t);
                break;
            case b.IN_TEMPLATE:
                kd(this, t);
                break;
            case b.AFTER_BODY:
                Md(this, t);
                break;
            case b.IN_FRAMESET:
                Hd(this, t);
                break;
            case b.AFTER_FRAMESET:
                Ud(this, t);
                break;
            case b.AFTER_AFTER_BODY:
                Yd(this, t);
                break;
            case b.AFTER_AFTER_FRAMESET:
                $d(this, t);
                break;
        }
    }
    onEndTag(t) {
        (this.skipNextNewLine = !1),
            (this.currentToken = t),
            this.currentNotInHTML
                ? Qd(this, t)
                : this._endTagOutsideForeignContent(t);
    }
    _endTagOutsideForeignContent(t) {
        switch (this.insertionMode) {
            case b.INITIAL:
                It(this, t);
                break;
            case b.BEFORE_HTML:
                Sl(this, t);
                break;
            case b.BEFORE_HEAD:
                vl(this, t);
                break;
            case b.IN_HEAD:
                yl(this, t);
                break;
            case b.IN_HEAD_NO_SCRIPT:
                Ll(this, t);
                break;
            case b.AFTER_HEAD:
                Pl(this, t);
                break;
            case b.IN_BODY:
                _r(this, t);
                break;
            case b.TEXT:
                bd(this, t);
                break;
            case b.IN_TABLE:
                Ht(this, t);
                break;
            case b.IN_TABLE_TEXT:
                St(this, t);
                break;
            case b.IN_CAPTION:
                yd(this, t);
                break;
            case b.IN_COLUMN_GROUP:
                Od(this, t);
                break;
            case b.IN_TABLE_BODY:
                va(this, t);
                break;
            case b.IN_ROW:
                q0(this, t);
                break;
            case b.IN_CELL:
                Dd(this, t);
                break;
            case b.IN_SELECT:
                $0(this, t);
                break;
            case b.IN_SELECT_IN_TABLE:
                Bd(this, t);
                break;
            case b.IN_TEMPLATE:
                wd(this, t);
                break;
            case b.AFTER_BODY:
                G0(this, t);
                break;
            case b.IN_FRAMESET:
                Fd(this, t);
                break;
            case b.AFTER_FRAMESET:
                qd(this, t);
                break;
            case b.AFTER_AFTER_BODY:
                Jt(this, t);
                break;
        }
    }
    onEof(t) {
        switch (this.insertionMode) {
            case b.INITIAL:
                It(this, t);
                break;
            case b.BEFORE_HTML:
                Ot(this, t);
                break;
            case b.BEFORE_HEAD:
                Lt(this, t);
                break;
            case b.IN_HEAD:
                Dt(this, t);
                break;
            case b.IN_HEAD_NO_SCRIPT:
                Pt(this, t);
                break;
            case b.AFTER_HEAD:
                Bt(this, t);
                break;
            case b.IN_BODY:
            case b.IN_TABLE:
            case b.IN_CAPTION:
            case b.IN_COLUMN_GROUP:
            case b.IN_TABLE_BODY:
            case b.IN_ROW:
            case b.IN_CELL:
            case b.IN_SELECT:
            case b.IN_SELECT_IN_TABLE:
                M0(this, t);
                break;
            case b.TEXT:
                xd(this, t);
                break;
            case b.IN_TABLE_TEXT:
                St(this, t);
                break;
            case b.IN_TEMPLATE:
                W0(this, t);
                break;
            case b.AFTER_BODY:
            case b.IN_FRAMESET:
            case b.AFTER_FRAMESET:
            case b.AFTER_AFTER_BODY:
            case b.AFTER_AFTER_FRAMESET:
                ja(this, t);
                break;
        }
    }
    onWhitespaceCharacter(t) {
        if (
            this.skipNextNewLine &&
            ((this.skipNextNewLine = !1), t.chars.charCodeAt(0) === E.LINE_FEED)
        ) {
            if (t.chars.length === 1) return;
            t.chars = t.chars.substr(1);
        }
        if (this.tokenizer.inForeignNode) {
            this._insertCharacters(t);
            return;
        }
        switch (this.insertionMode) {
            case b.IN_HEAD:
            case b.IN_HEAD_NO_SCRIPT:
            case b.AFTER_HEAD:
            case b.TEXT:
            case b.IN_COLUMN_GROUP:
            case b.IN_SELECT:
            case b.IN_SELECT_IN_TABLE:
            case b.IN_FRAMESET:
            case b.AFTER_FRAMESET:
                this._insertCharacters(t);
                break;
            case b.IN_BODY:
            case b.IN_CAPTION:
            case b.IN_CELL:
            case b.IN_TEMPLATE:
            case b.AFTER_BODY:
            case b.AFTER_AFTER_BODY:
            case b.AFTER_AFTER_FRAMESET:
                D0(this, t);
                break;
            case b.IN_TABLE:
            case b.IN_TABLE_BODY:
            case b.IN_ROW:
                wr(this, t);
                break;
            case b.IN_TABLE_TEXT:
                H0(this, t);
                break;
        }
    }
}
function ml(e, t) {
    let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(
        t.tagName
    );
    return (
        r
            ? e.openElements.contains(r.element)
                ? e.openElements.hasInScope(t.tagID) || (r = null)
                : (e.activeFormattingElements.removeEntry(r), (r = null))
            : w0(e, t),
        r
    );
}
function Tl(e, t) {
    let r = null,
        a = e.openElements.stackTop;
    for (; a >= 0; a--) {
        const n = e.openElements.items[a];
        if (n === t.element) break;
        e._isSpecialElement(n, e.openElements.tagIDs[a]) && (r = n);
    }
    return (
        r ||
            (e.openElements.shortenToLength(a < 0 ? 0 : a),
            e.activeFormattingElements.removeEntry(t)),
        r
    );
}
function bl(e, t, r) {
    let a = t,
        n = e.openElements.getCommonAncestor(t);
    for (let s = 0, u = n; u !== r; s++, u = n) {
        n = e.openElements.getCommonAncestor(u);
        const o = e.activeFormattingElements.getElementEntry(u),
            l = o && s >= El;
        !o || l
            ? (l && e.activeFormattingElements.removeEntry(o),
              e.openElements.remove(u))
            : ((u = xl(e, o)),
              a === t && (e.activeFormattingElements.bookmark = o),
              e.treeAdapter.detachNode(a),
              e.treeAdapter.appendChild(u, a),
              (a = u));
    }
    return a;
}
function xl(e, t) {
    const r = e.treeAdapter.getNamespaceURI(t.element),
        a = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
    return e.openElements.replace(t.element, a), (t.element = a), a;
}
function _l(e, t, r) {
    const a = e.treeAdapter.getTagName(t),
        n = br(a);
    if (e._isElementCausesFosterParenting(n)) e._fosterParentElement(r);
    else {
        const s = e.treeAdapter.getNamespaceURI(t);
        n === i.TEMPLATE &&
            s === L.HTML &&
            (t = e.treeAdapter.getTemplateContent(t)),
            e.treeAdapter.appendChild(t, r);
    }
}
function gl(e, t, r) {
    const a = e.treeAdapter.getNamespaceURI(r.element),
        { token: n } = r,
        s = e.treeAdapter.createElement(n.tagName, a, n.attrs);
    e._adoptNodes(t, s),
        e.treeAdapter.appendChild(t, s),
        e.activeFormattingElements.insertElementAfterBookmark(s, n),
        e.activeFormattingElements.removeEntry(r),
        e.openElements.remove(r.element),
        e.openElements.insertAfter(t, s, n.tagID);
}
function za(e, t) {
    for (let r = 0; r < hl; r++) {
        const a = ml(e, t);
        if (!a) break;
        const n = Tl(e, a);
        if (!n) break;
        e.activeFormattingElements.bookmark = a;
        const s = bl(e, n, a.element),
            u = e.openElements.getCommonAncestor(a.element);
        e.treeAdapter.detachNode(s), u && _l(e, u, s), gl(e, n, a);
    }
}
function Ra(e, t) {
    e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function Al(e, t) {
    e._appendCommentNode(t, e.openElements.items[0]);
}
function Cl(e, t) {
    e._appendCommentNode(t, e.document);
}
function ja(e, t) {
    if (((e.stopped = !0), t.location)) {
        const r = e.fragmentContext ? 0 : 2;
        for (let a = e.openElements.stackTop; a >= r; a--)
            e._setEndLocation(e.openElements.items[a], t);
        if (!e.fragmentContext && e.openElements.stackTop >= 0) {
            const a = e.openElements.items[0],
                n = e.treeAdapter.getNodeSourceCodeLocation(a);
            if (
                n &&
                !n.endTag &&
                (e._setEndLocation(a, t), e.openElements.stackTop >= 1)
            ) {
                const s = e.openElements.items[1],
                    u = e.treeAdapter.getNodeSourceCodeLocation(s);
                u && !u.endTag && e._setEndLocation(s, t);
            }
        }
    }
}
function Nl(e, t) {
    e._setDocumentType(t);
    const r = t.forceQuirks ? xe.QUIRKS : el(t);
    Jc(t) || e._err(t, O.nonConformingDoctype),
        e.treeAdapter.setDocumentMode(e.document, r),
        (e.insertionMode = b.BEFORE_HTML);
}
function It(e, t) {
    e._err(t, O.missingDoctype, !0),
        e.treeAdapter.setDocumentMode(e.document, xe.QUIRKS),
        (e.insertionMode = b.BEFORE_HTML),
        e._processToken(t);
}
function Il(e, t) {
    t.tagID === i.HTML
        ? (e._insertElement(t, L.HTML), (e.insertionMode = b.BEFORE_HEAD))
        : Ot(e, t);
}
function Sl(e, t) {
    const r = t.tagID;
    (r === i.HTML || r === i.HEAD || r === i.BODY || r === i.BR) && Ot(e, t);
}
function Ot(e, t) {
    e._insertFakeRootElement(),
        (e.insertionMode = b.BEFORE_HEAD),
        e._processToken(t);
}
function Rl(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.HEAD: {
            e._insertElement(t, L.HTML),
                (e.headElement = e.openElements.current),
                (e.insertionMode = b.IN_HEAD);
            break;
        }
        default:
            Lt(e, t);
    }
}
function vl(e, t) {
    const r = t.tagID;
    r === i.HEAD || r === i.BODY || r === i.HTML || r === i.BR
        ? Lt(e, t)
        : e._err(t, O.endTagWithoutMatchingOpenElement);
}
function Lt(e, t) {
    e._insertFakeElement(I.HEAD, i.HEAD),
        (e.headElement = e.openElements.current),
        (e.insertionMode = b.IN_HEAD),
        e._processToken(t);
}
function Oe(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.BASE:
        case i.BASEFONT:
        case i.BGSOUND:
        case i.LINK:
        case i.META: {
            e._appendElement(t, L.HTML), (t.ackSelfClosing = !0);
            break;
        }
        case i.TITLE: {
            e._switchToTextParsing(t, _e.RCDATA);
            break;
        }
        case i.NOSCRIPT: {
            e.options.scriptingEnabled
                ? e._switchToTextParsing(t, _e.RAWTEXT)
                : (e._insertElement(t, L.HTML),
                  (e.insertionMode = b.IN_HEAD_NO_SCRIPT));
            break;
        }
        case i.NOFRAMES:
        case i.STYLE: {
            e._switchToTextParsing(t, _e.RAWTEXT);
            break;
        }
        case i.SCRIPT: {
            e._switchToTextParsing(t, _e.SCRIPT_DATA);
            break;
        }
        case i.TEMPLATE: {
            e._insertTemplate(t),
                e.activeFormattingElements.insertMarker(),
                (e.framesetOk = !1),
                (e.insertionMode = b.IN_TEMPLATE),
                e.tmplInsertionModeStack.unshift(b.IN_TEMPLATE);
            break;
        }
        case i.HEAD: {
            e._err(t, O.misplacedStartTagForHeadElement);
            break;
        }
        default:
            Dt(e, t);
    }
}
function yl(e, t) {
    switch (t.tagID) {
        case i.HEAD: {
            e.openElements.pop(), (e.insertionMode = b.AFTER_HEAD);
            break;
        }
        case i.BODY:
        case i.BR:
        case i.HTML: {
            Dt(e, t);
            break;
        }
        case i.TEMPLATE: {
            Je(e, t);
            break;
        }
        default:
            e._err(t, O.endTagWithoutMatchingOpenElement);
    }
}
function Je(e, t) {
    e.openElements.tmplCount > 0
        ? (e.openElements.generateImpliedEndTagsThoroughly(),
          e.openElements.currentTagId !== i.TEMPLATE &&
              e._err(t, O.closingOfElementWithOpenChildElements),
          e.openElements.popUntilTagNamePopped(i.TEMPLATE),
          e.activeFormattingElements.clearToLastMarker(),
          e.tmplInsertionModeStack.shift(),
          e._resetInsertionMode())
        : e._err(t, O.endTagWithoutMatchingOpenElement);
}
function Dt(e, t) {
    e.openElements.pop(), (e.insertionMode = b.AFTER_HEAD), e._processToken(t);
}
function Ol(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.BASEFONT:
        case i.BGSOUND:
        case i.HEAD:
        case i.LINK:
        case i.META:
        case i.NOFRAMES:
        case i.STYLE: {
            Oe(e, t);
            break;
        }
        case i.NOSCRIPT: {
            e._err(t, O.nestedNoscriptInHead);
            break;
        }
        default:
            Pt(e, t);
    }
}
function Ll(e, t) {
    switch (t.tagID) {
        case i.NOSCRIPT: {
            e.openElements.pop(), (e.insertionMode = b.IN_HEAD);
            break;
        }
        case i.BR: {
            Pt(e, t);
            break;
        }
        default:
            e._err(t, O.endTagWithoutMatchingOpenElement);
    }
}
function Pt(e, t) {
    const r =
        t.type === Z.EOF
            ? O.openElementsLeftAfterEof
            : O.disallowedContentInNoscriptInHead;
    e._err(t, r),
        e.openElements.pop(),
        (e.insertionMode = b.IN_HEAD),
        e._processToken(t);
}
function Dl(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.BODY: {
            e._insertElement(t, L.HTML),
                (e.framesetOk = !1),
                (e.insertionMode = b.IN_BODY);
            break;
        }
        case i.FRAMESET: {
            e._insertElement(t, L.HTML), (e.insertionMode = b.IN_FRAMESET);
            break;
        }
        case i.BASE:
        case i.BASEFONT:
        case i.BGSOUND:
        case i.LINK:
        case i.META:
        case i.NOFRAMES:
        case i.SCRIPT:
        case i.STYLE:
        case i.TEMPLATE:
        case i.TITLE: {
            e._err(t, O.abandonedHeadElementChild),
                e.openElements.push(e.headElement, i.HEAD),
                Oe(e, t),
                e.openElements.remove(e.headElement);
            break;
        }
        case i.HEAD: {
            e._err(t, O.misplacedStartTagForHeadElement);
            break;
        }
        default:
            Bt(e, t);
    }
}
function Pl(e, t) {
    switch (t.tagID) {
        case i.BODY:
        case i.HTML:
        case i.BR: {
            Bt(e, t);
            break;
        }
        case i.TEMPLATE: {
            Je(e, t);
            break;
        }
        default:
            e._err(t, O.endTagWithoutMatchingOpenElement);
    }
}
function Bt(e, t) {
    e._insertFakeElement(I.BODY, i.BODY),
        (e.insertionMode = b.IN_BODY),
        xr(e, t);
}
function xr(e, t) {
    switch (t.type) {
        case Z.CHARACTER: {
            P0(e, t);
            break;
        }
        case Z.WHITESPACE_CHARACTER: {
            D0(e, t);
            break;
        }
        case Z.COMMENT: {
            Ra(e, t);
            break;
        }
        case Z.START_TAG: {
            Ee(e, t);
            break;
        }
        case Z.END_TAG: {
            _r(e, t);
            break;
        }
        case Z.EOF: {
            M0(e, t);
            break;
        }
    }
}
function D0(e, t) {
    e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function P0(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertCharacters(t),
        (e.framesetOk = !1);
}
function Bl(e, t) {
    e.openElements.tmplCount === 0 &&
        e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function kl(e, t) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    r &&
        e.openElements.tmplCount === 0 &&
        ((e.framesetOk = !1), e.treeAdapter.adoptAttributes(r, t.attrs));
}
function wl(e, t) {
    const r = e.openElements.tryPeekProperlyNestedBodyElement();
    e.framesetOk &&
        r &&
        (e.treeAdapter.detachNode(r),
        e.openElements.popAllUpToHtmlElement(),
        e._insertElement(t, L.HTML),
        (e.insertionMode = b.IN_FRAMESET));
}
function Ml(e, t) {
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._insertElement(t, L.HTML);
}
function Hl(e, t) {
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        _0(e.openElements.currentTagId) && e.openElements.pop(),
        e._insertElement(t, L.HTML);
}
function Fl(e, t) {
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._insertElement(t, L.HTML),
        (e.skipNextNewLine = !0),
        (e.framesetOk = !1);
}
function Ul(e, t) {
    const r = e.openElements.tmplCount > 0;
    (!e.formElement || r) &&
        (e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._insertElement(t, L.HTML),
        r || (e.formElement = e.openElements.current));
}
function ql(e, t) {
    e.framesetOk = !1;
    const r = t.tagID;
    for (let a = e.openElements.stackTop; a >= 0; a--) {
        const n = e.openElements.tagIDs[a];
        if (
            (r === i.LI && n === i.LI) ||
            ((r === i.DD || r === i.DT) && (n === i.DD || n === i.DT))
        ) {
            e.openElements.generateImpliedEndTagsWithExclusion(n),
                e.openElements.popUntilTagNamePopped(n);
            break;
        }
        if (
            n !== i.ADDRESS &&
            n !== i.DIV &&
            n !== i.P &&
            e._isSpecialElement(e.openElements.items[a], n)
        )
            break;
    }
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._insertElement(t, L.HTML);
}
function Yl(e, t) {
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._insertElement(t, L.HTML),
        (e.tokenizer.state = _e.PLAINTEXT);
}
function $l(e, t) {
    e.openElements.hasInScope(i.BUTTON) &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilTagNamePopped(i.BUTTON)),
        e._reconstructActiveFormattingElements(),
        e._insertElement(t, L.HTML),
        (e.framesetOk = !1);
}
function Wl(e, t) {
    const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(I.A);
    r &&
        (za(e, t),
        e.openElements.remove(r.element),
        e.activeFormattingElements.removeEntry(r)),
        e._reconstructActiveFormattingElements(),
        e._insertElement(t, L.HTML),
        e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Gl(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, L.HTML),
        e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Vl(e, t) {
    e._reconstructActiveFormattingElements(),
        e.openElements.hasInScope(i.NOBR) &&
            (za(e, t), e._reconstructActiveFormattingElements()),
        e._insertElement(t, L.HTML),
        e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Ql(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, L.HTML),
        e.activeFormattingElements.insertMarker(),
        (e.framesetOk = !1);
}
function Xl(e, t) {
    e.treeAdapter.getDocumentMode(e.document) !== xe.QUIRKS &&
        e.openElements.hasInButtonScope(i.P) &&
        e._closePElement(),
        e._insertElement(t, L.HTML),
        (e.framesetOk = !1),
        (e.insertionMode = b.IN_TABLE);
}
function B0(e, t) {
    e._reconstructActiveFormattingElements(),
        e._appendElement(t, L.HTML),
        (e.framesetOk = !1),
        (t.ackSelfClosing = !0);
}
function k0(e) {
    const t = b0(e, $e.TYPE);
    return t != null && t.toLowerCase() === fl;
}
function zl(e, t) {
    e._reconstructActiveFormattingElements(),
        e._appendElement(t, L.HTML),
        k0(t) || (e.framesetOk = !1),
        (t.ackSelfClosing = !0);
}
function jl(e, t) {
    e._appendElement(t, L.HTML), (t.ackSelfClosing = !0);
}
function Kl(e, t) {
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._appendElement(t, L.HTML),
        (e.framesetOk = !1),
        (t.ackSelfClosing = !0);
}
function Zl(e, t) {
    (t.tagName = I.IMG), (t.tagID = i.IMG), B0(e, t);
}
function Jl(e, t) {
    e._insertElement(t, L.HTML),
        (e.skipNextNewLine = !0),
        (e.tokenizer.state = _e.RCDATA),
        (e.originalInsertionMode = e.insertionMode),
        (e.framesetOk = !1),
        (e.insertionMode = b.TEXT);
}
function ed(e, t) {
    e.openElements.hasInButtonScope(i.P) && e._closePElement(),
        e._reconstructActiveFormattingElements(),
        (e.framesetOk = !1),
        e._switchToTextParsing(t, _e.RAWTEXT);
}
function td(e, t) {
    (e.framesetOk = !1), e._switchToTextParsing(t, _e.RAWTEXT);
}
function Fn(e, t) {
    e._switchToTextParsing(t, _e.RAWTEXT);
}
function rd(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, L.HTML),
        (e.framesetOk = !1),
        (e.insertionMode =
            e.insertionMode === b.IN_TABLE ||
            e.insertionMode === b.IN_CAPTION ||
            e.insertionMode === b.IN_TABLE_BODY ||
            e.insertionMode === b.IN_ROW ||
            e.insertionMode === b.IN_CELL
                ? b.IN_SELECT_IN_TABLE
                : b.IN_SELECT);
}
function ad(e, t) {
    e.openElements.currentTagId === i.OPTION && e.openElements.pop(),
        e._reconstructActiveFormattingElements(),
        e._insertElement(t, L.HTML);
}
function nd(e, t) {
    e.openElements.hasInScope(i.RUBY) &&
        e.openElements.generateImpliedEndTags(),
        e._insertElement(t, L.HTML);
}
function sd(e, t) {
    e.openElements.hasInScope(i.RUBY) &&
        e.openElements.generateImpliedEndTagsWithExclusion(i.RTC),
        e._insertElement(t, L.HTML);
}
function id(e, t) {
    e._reconstructActiveFormattingElements(),
        v0(t),
        Xa(t),
        t.selfClosing
            ? e._appendElement(t, L.MATHML)
            : e._insertElement(t, L.MATHML),
        (t.ackSelfClosing = !0);
}
function ud(e, t) {
    e._reconstructActiveFormattingElements(),
        y0(t),
        Xa(t),
        t.selfClosing ? e._appendElement(t, L.SVG) : e._insertElement(t, L.SVG),
        (t.ackSelfClosing = !0);
}
function Un(e, t) {
    e._reconstructActiveFormattingElements(), e._insertElement(t, L.HTML);
}
function Ee(e, t) {
    switch (t.tagID) {
        case i.I:
        case i.S:
        case i.B:
        case i.U:
        case i.EM:
        case i.TT:
        case i.BIG:
        case i.CODE:
        case i.FONT:
        case i.SMALL:
        case i.STRIKE:
        case i.STRONG: {
            Gl(e, t);
            break;
        }
        case i.A: {
            Wl(e, t);
            break;
        }
        case i.H1:
        case i.H2:
        case i.H3:
        case i.H4:
        case i.H5:
        case i.H6: {
            Hl(e, t);
            break;
        }
        case i.P:
        case i.DL:
        case i.OL:
        case i.UL:
        case i.DIV:
        case i.DIR:
        case i.NAV:
        case i.MAIN:
        case i.MENU:
        case i.ASIDE:
        case i.CENTER:
        case i.FIGURE:
        case i.FOOTER:
        case i.HEADER:
        case i.HGROUP:
        case i.DIALOG:
        case i.DETAILS:
        case i.ADDRESS:
        case i.ARTICLE:
        case i.SECTION:
        case i.SUMMARY:
        case i.FIELDSET:
        case i.BLOCKQUOTE:
        case i.FIGCAPTION: {
            Ml(e, t);
            break;
        }
        case i.LI:
        case i.DD:
        case i.DT: {
            ql(e, t);
            break;
        }
        case i.BR:
        case i.IMG:
        case i.WBR:
        case i.AREA:
        case i.EMBED:
        case i.KEYGEN: {
            B0(e, t);
            break;
        }
        case i.HR: {
            Kl(e, t);
            break;
        }
        case i.RB:
        case i.RTC: {
            nd(e, t);
            break;
        }
        case i.RT:
        case i.RP: {
            sd(e, t);
            break;
        }
        case i.PRE:
        case i.LISTING: {
            Fl(e, t);
            break;
        }
        case i.XMP: {
            ed(e, t);
            break;
        }
        case i.SVG: {
            ud(e, t);
            break;
        }
        case i.HTML: {
            Bl(e, t);
            break;
        }
        case i.BASE:
        case i.LINK:
        case i.META:
        case i.STYLE:
        case i.TITLE:
        case i.SCRIPT:
        case i.BGSOUND:
        case i.BASEFONT:
        case i.TEMPLATE: {
            Oe(e, t);
            break;
        }
        case i.BODY: {
            kl(e, t);
            break;
        }
        case i.FORM: {
            Ul(e, t);
            break;
        }
        case i.NOBR: {
            Vl(e, t);
            break;
        }
        case i.MATH: {
            id(e, t);
            break;
        }
        case i.TABLE: {
            Xl(e, t);
            break;
        }
        case i.INPUT: {
            zl(e, t);
            break;
        }
        case i.PARAM:
        case i.TRACK:
        case i.SOURCE: {
            jl(e, t);
            break;
        }
        case i.IMAGE: {
            Zl(e, t);
            break;
        }
        case i.BUTTON: {
            $l(e, t);
            break;
        }
        case i.APPLET:
        case i.OBJECT:
        case i.MARQUEE: {
            Ql(e, t);
            break;
        }
        case i.IFRAME: {
            td(e, t);
            break;
        }
        case i.SELECT: {
            rd(e, t);
            break;
        }
        case i.OPTION:
        case i.OPTGROUP: {
            ad(e, t);
            break;
        }
        case i.NOEMBED: {
            Fn(e, t);
            break;
        }
        case i.FRAMESET: {
            wl(e, t);
            break;
        }
        case i.TEXTAREA: {
            Jl(e, t);
            break;
        }
        case i.NOSCRIPT: {
            e.options.scriptingEnabled ? Fn(e, t) : Un(e, t);
            break;
        }
        case i.PLAINTEXT: {
            Yl(e, t);
            break;
        }
        case i.COL:
        case i.TH:
        case i.TD:
        case i.TR:
        case i.HEAD:
        case i.FRAME:
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD:
        case i.CAPTION:
        case i.COLGROUP:
            break;
        default:
            Un(e, t);
    }
}
function od(e, t) {
    if (
        e.openElements.hasInScope(i.BODY) &&
        ((e.insertionMode = b.AFTER_BODY), e.options.sourceCodeLocationInfo)
    ) {
        const r = e.openElements.tryPeekProperlyNestedBodyElement();
        r && e._setEndLocation(r, t);
    }
}
function cd(e, t) {
    e.openElements.hasInScope(i.BODY) &&
        ((e.insertionMode = b.AFTER_BODY), G0(e, t));
}
function ld(e, t) {
    const r = t.tagID;
    e.openElements.hasInScope(r) &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilTagNamePopped(r));
}
function dd(e) {
    const t = e.openElements.tmplCount > 0,
        { formElement: r } = e;
    t || (e.formElement = null),
        (r || t) &&
            e.openElements.hasInScope(i.FORM) &&
            (e.openElements.generateImpliedEndTags(),
            t
                ? e.openElements.popUntilTagNamePopped(i.FORM)
                : r && e.openElements.remove(r));
}
function fd(e) {
    e.openElements.hasInButtonScope(i.P) || e._insertFakeElement(I.P, i.P),
        e._closePElement();
}
function hd(e) {
    e.openElements.hasInListItemScope(i.LI) &&
        (e.openElements.generateImpliedEndTagsWithExclusion(i.LI),
        e.openElements.popUntilTagNamePopped(i.LI));
}
function Ed(e, t) {
    const r = t.tagID;
    e.openElements.hasInScope(r) &&
        (e.openElements.generateImpliedEndTagsWithExclusion(r),
        e.openElements.popUntilTagNamePopped(r));
}
function pd(e) {
    e.openElements.hasNumberedHeaderInScope() &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilNumberedHeaderPopped());
}
function md(e, t) {
    const r = t.tagID;
    e.openElements.hasInScope(r) &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilTagNamePopped(r),
        e.activeFormattingElements.clearToLastMarker());
}
function Td(e) {
    e._reconstructActiveFormattingElements(),
        e._insertFakeElement(I.BR, i.BR),
        e.openElements.pop(),
        (e.framesetOk = !1);
}
function w0(e, t) {
    const r = t.tagName,
        a = t.tagID;
    for (let n = e.openElements.stackTop; n > 0; n--) {
        const s = e.openElements.items[n],
            u = e.openElements.tagIDs[n];
        if (a === u && (a !== i.UNKNOWN || e.treeAdapter.getTagName(s) === r)) {
            e.openElements.generateImpliedEndTagsWithExclusion(a),
                e.openElements.stackTop >= n &&
                    e.openElements.shortenToLength(n);
            break;
        }
        if (e._isSpecialElement(s, u)) break;
    }
}
function _r(e, t) {
    switch (t.tagID) {
        case i.A:
        case i.B:
        case i.I:
        case i.S:
        case i.U:
        case i.EM:
        case i.TT:
        case i.BIG:
        case i.CODE:
        case i.FONT:
        case i.NOBR:
        case i.SMALL:
        case i.STRIKE:
        case i.STRONG: {
            za(e, t);
            break;
        }
        case i.P: {
            fd(e);
            break;
        }
        case i.DL:
        case i.UL:
        case i.OL:
        case i.DIR:
        case i.DIV:
        case i.NAV:
        case i.PRE:
        case i.MAIN:
        case i.MENU:
        case i.ASIDE:
        case i.BUTTON:
        case i.CENTER:
        case i.FIGURE:
        case i.FOOTER:
        case i.HEADER:
        case i.HGROUP:
        case i.DIALOG:
        case i.ADDRESS:
        case i.ARTICLE:
        case i.DETAILS:
        case i.SECTION:
        case i.SUMMARY:
        case i.LISTING:
        case i.FIELDSET:
        case i.BLOCKQUOTE:
        case i.FIGCAPTION: {
            ld(e, t);
            break;
        }
        case i.LI: {
            hd(e);
            break;
        }
        case i.DD:
        case i.DT: {
            Ed(e, t);
            break;
        }
        case i.H1:
        case i.H2:
        case i.H3:
        case i.H4:
        case i.H5:
        case i.H6: {
            pd(e);
            break;
        }
        case i.BR: {
            Td(e);
            break;
        }
        case i.BODY: {
            od(e, t);
            break;
        }
        case i.HTML: {
            cd(e, t);
            break;
        }
        case i.FORM: {
            dd(e);
            break;
        }
        case i.APPLET:
        case i.OBJECT:
        case i.MARQUEE: {
            md(e, t);
            break;
        }
        case i.TEMPLATE: {
            Je(e, t);
            break;
        }
        default:
            w0(e, t);
    }
}
function M0(e, t) {
    e.tmplInsertionModeStack.length > 0 ? W0(e, t) : ja(e, t);
}
function bd(e, t) {
    var r;
    t.tagID === i.SCRIPT &&
        ((r = e.scriptHandler) === null ||
            r === void 0 ||
            r.call(e, e.openElements.current)),
        e.openElements.pop(),
        (e.insertionMode = e.originalInsertionMode);
}
function xd(e, t) {
    e._err(t, O.eofInElementThatCanContainOnlyText),
        e.openElements.pop(),
        (e.insertionMode = e.originalInsertionMode),
        e.onEof(t);
}
function wr(e, t) {
    if (O0.has(e.openElements.currentTagId))
        switch (
            ((e.pendingCharacterTokens.length = 0),
            (e.hasNonWhitespacePendingCharacterToken = !1),
            (e.originalInsertionMode = e.insertionMode),
            (e.insertionMode = b.IN_TABLE_TEXT),
            t.type)
        ) {
            case Z.CHARACTER: {
                F0(e, t);
                break;
            }
            case Z.WHITESPACE_CHARACTER: {
                H0(e, t);
                break;
            }
        }
    else Yt(e, t);
}
function _d(e, t) {
    e.openElements.clearBackToTableContext(),
        e.activeFormattingElements.insertMarker(),
        e._insertElement(t, L.HTML),
        (e.insertionMode = b.IN_CAPTION);
}
function gd(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertElement(t, L.HTML),
        (e.insertionMode = b.IN_COLUMN_GROUP);
}
function Ad(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertFakeElement(I.COLGROUP, i.COLGROUP),
        (e.insertionMode = b.IN_COLUMN_GROUP),
        Ka(e, t);
}
function Cd(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertElement(t, L.HTML),
        (e.insertionMode = b.IN_TABLE_BODY);
}
function Nd(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertFakeElement(I.TBODY, i.TBODY),
        (e.insertionMode = b.IN_TABLE_BODY),
        gr(e, t);
}
function Id(e, t) {
    e.openElements.hasInTableScope(i.TABLE) &&
        (e.openElements.popUntilTagNamePopped(i.TABLE),
        e._resetInsertionMode(),
        e._processStartTag(t));
}
function Sd(e, t) {
    k0(t) ? e._appendElement(t, L.HTML) : Yt(e, t), (t.ackSelfClosing = !0);
}
function Rd(e, t) {
    !e.formElement &&
        e.openElements.tmplCount === 0 &&
        (e._insertElement(t, L.HTML),
        (e.formElement = e.openElements.current),
        e.openElements.pop());
}
function dt(e, t) {
    switch (t.tagID) {
        case i.TD:
        case i.TH:
        case i.TR: {
            Nd(e, t);
            break;
        }
        case i.STYLE:
        case i.SCRIPT:
        case i.TEMPLATE: {
            Oe(e, t);
            break;
        }
        case i.COL: {
            Ad(e, t);
            break;
        }
        case i.FORM: {
            Rd(e, t);
            break;
        }
        case i.TABLE: {
            Id(e, t);
            break;
        }
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD: {
            Cd(e, t);
            break;
        }
        case i.INPUT: {
            Sd(e, t);
            break;
        }
        case i.CAPTION: {
            _d(e, t);
            break;
        }
        case i.COLGROUP: {
            gd(e, t);
            break;
        }
        default:
            Yt(e, t);
    }
}
function Ht(e, t) {
    switch (t.tagID) {
        case i.TABLE: {
            e.openElements.hasInTableScope(i.TABLE) &&
                (e.openElements.popUntilTagNamePopped(i.TABLE),
                e._resetInsertionMode());
            break;
        }
        case i.TEMPLATE: {
            Je(e, t);
            break;
        }
        case i.BODY:
        case i.CAPTION:
        case i.COL:
        case i.COLGROUP:
        case i.HTML:
        case i.TBODY:
        case i.TD:
        case i.TFOOT:
        case i.TH:
        case i.THEAD:
        case i.TR:
            break;
        default:
            Yt(e, t);
    }
}
function Yt(e, t) {
    const r = e.fosterParentingEnabled;
    (e.fosterParentingEnabled = !0), xr(e, t), (e.fosterParentingEnabled = r);
}
function H0(e, t) {
    e.pendingCharacterTokens.push(t);
}
function F0(e, t) {
    e.pendingCharacterTokens.push(t),
        (e.hasNonWhitespacePendingCharacterToken = !0);
}
function St(e, t) {
    let r = 0;
    if (e.hasNonWhitespacePendingCharacterToken)
        for (; r < e.pendingCharacterTokens.length; r++)
            Yt(e, e.pendingCharacterTokens[r]);
    else
        for (; r < e.pendingCharacterTokens.length; r++)
            e._insertCharacters(e.pendingCharacterTokens[r]);
    (e.insertionMode = e.originalInsertionMode), e._processToken(t);
}
const U0 = new Set([
    i.CAPTION,
    i.COL,
    i.COLGROUP,
    i.TBODY,
    i.TD,
    i.TFOOT,
    i.TH,
    i.THEAD,
    i.TR,
]);
function vd(e, t) {
    const r = t.tagID;
    U0.has(r)
        ? e.openElements.hasInTableScope(i.CAPTION) &&
          (e.openElements.generateImpliedEndTags(),
          e.openElements.popUntilTagNamePopped(i.CAPTION),
          e.activeFormattingElements.clearToLastMarker(),
          (e.insertionMode = b.IN_TABLE),
          dt(e, t))
        : Ee(e, t);
}
function yd(e, t) {
    const r = t.tagID;
    switch (r) {
        case i.CAPTION:
        case i.TABLE: {
            e.openElements.hasInTableScope(i.CAPTION) &&
                (e.openElements.generateImpliedEndTags(),
                e.openElements.popUntilTagNamePopped(i.CAPTION),
                e.activeFormattingElements.clearToLastMarker(),
                (e.insertionMode = b.IN_TABLE),
                r === i.TABLE && Ht(e, t));
            break;
        }
        case i.BODY:
        case i.COL:
        case i.COLGROUP:
        case i.HTML:
        case i.TBODY:
        case i.TD:
        case i.TFOOT:
        case i.TH:
        case i.THEAD:
        case i.TR:
            break;
        default:
            _r(e, t);
    }
}
function Ka(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.COL: {
            e._appendElement(t, L.HTML), (t.ackSelfClosing = !0);
            break;
        }
        case i.TEMPLATE: {
            Oe(e, t);
            break;
        }
        default:
            cr(e, t);
    }
}
function Od(e, t) {
    switch (t.tagID) {
        case i.COLGROUP: {
            e.openElements.currentTagId === i.COLGROUP &&
                (e.openElements.pop(), (e.insertionMode = b.IN_TABLE));
            break;
        }
        case i.TEMPLATE: {
            Je(e, t);
            break;
        }
        case i.COL:
            break;
        default:
            cr(e, t);
    }
}
function cr(e, t) {
    e.openElements.currentTagId === i.COLGROUP &&
        (e.openElements.pop(),
        (e.insertionMode = b.IN_TABLE),
        e._processToken(t));
}
function gr(e, t) {
    switch (t.tagID) {
        case i.TR: {
            e.openElements.clearBackToTableBodyContext(),
                e._insertElement(t, L.HTML),
                (e.insertionMode = b.IN_ROW);
            break;
        }
        case i.TH:
        case i.TD: {
            e.openElements.clearBackToTableBodyContext(),
                e._insertFakeElement(I.TR, i.TR),
                (e.insertionMode = b.IN_ROW),
                Ar(e, t);
            break;
        }
        case i.CAPTION:
        case i.COL:
        case i.COLGROUP:
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD: {
            e.openElements.hasTableBodyContextInTableScope() &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE),
                dt(e, t));
            break;
        }
        default:
            dt(e, t);
    }
}
function va(e, t) {
    const r = t.tagID;
    switch (t.tagID) {
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD: {
            e.openElements.hasInTableScope(r) &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE));
            break;
        }
        case i.TABLE: {
            e.openElements.hasTableBodyContextInTableScope() &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE),
                Ht(e, t));
            break;
        }
        case i.BODY:
        case i.CAPTION:
        case i.COL:
        case i.COLGROUP:
        case i.HTML:
        case i.TD:
        case i.TH:
        case i.TR:
            break;
        default:
            Ht(e, t);
    }
}
function Ar(e, t) {
    switch (t.tagID) {
        case i.TH:
        case i.TD: {
            e.openElements.clearBackToTableRowContext(),
                e._insertElement(t, L.HTML),
                (e.insertionMode = b.IN_CELL),
                e.activeFormattingElements.insertMarker();
            break;
        }
        case i.CAPTION:
        case i.COL:
        case i.COLGROUP:
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD:
        case i.TR: {
            e.openElements.hasInTableScope(i.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE_BODY),
                gr(e, t));
            break;
        }
        default:
            dt(e, t);
    }
}
function q0(e, t) {
    switch (t.tagID) {
        case i.TR: {
            e.openElements.hasInTableScope(i.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE_BODY));
            break;
        }
        case i.TABLE: {
            e.openElements.hasInTableScope(i.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE_BODY),
                va(e, t));
            break;
        }
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD: {
            (e.openElements.hasInTableScope(t.tagID) ||
                e.openElements.hasInTableScope(i.TR)) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = b.IN_TABLE_BODY),
                va(e, t));
            break;
        }
        case i.BODY:
        case i.CAPTION:
        case i.COL:
        case i.COLGROUP:
        case i.HTML:
        case i.TD:
        case i.TH:
            break;
        default:
            Ht(e, t);
    }
}
function Ld(e, t) {
    const r = t.tagID;
    U0.has(r)
        ? (e.openElements.hasInTableScope(i.TD) ||
              e.openElements.hasInTableScope(i.TH)) &&
          (e._closeTableCell(), Ar(e, t))
        : Ee(e, t);
}
function Dd(e, t) {
    const r = t.tagID;
    switch (r) {
        case i.TD:
        case i.TH: {
            e.openElements.hasInTableScope(r) &&
                (e.openElements.generateImpliedEndTags(),
                e.openElements.popUntilTagNamePopped(r),
                e.activeFormattingElements.clearToLastMarker(),
                (e.insertionMode = b.IN_ROW));
            break;
        }
        case i.TABLE:
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD:
        case i.TR: {
            e.openElements.hasInTableScope(r) &&
                (e._closeTableCell(), q0(e, t));
            break;
        }
        case i.BODY:
        case i.CAPTION:
        case i.COL:
        case i.COLGROUP:
        case i.HTML:
            break;
        default:
            _r(e, t);
    }
}
function Y0(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.OPTION: {
            e.openElements.currentTagId === i.OPTION && e.openElements.pop(),
                e._insertElement(t, L.HTML);
            break;
        }
        case i.OPTGROUP: {
            e.openElements.currentTagId === i.OPTION && e.openElements.pop(),
                e.openElements.currentTagId === i.OPTGROUP &&
                    e.openElements.pop(),
                e._insertElement(t, L.HTML);
            break;
        }
        case i.INPUT:
        case i.KEYGEN:
        case i.TEXTAREA:
        case i.SELECT: {
            e.openElements.hasInSelectScope(i.SELECT) &&
                (e.openElements.popUntilTagNamePopped(i.SELECT),
                e._resetInsertionMode(),
                t.tagID !== i.SELECT && e._processStartTag(t));
            break;
        }
        case i.SCRIPT:
        case i.TEMPLATE: {
            Oe(e, t);
            break;
        }
    }
}
function $0(e, t) {
    switch (t.tagID) {
        case i.OPTGROUP: {
            e.openElements.stackTop > 0 &&
                e.openElements.currentTagId === i.OPTION &&
                e.openElements.tagIDs[e.openElements.stackTop - 1] ===
                    i.OPTGROUP &&
                e.openElements.pop(),
                e.openElements.currentTagId === i.OPTGROUP &&
                    e.openElements.pop();
            break;
        }
        case i.OPTION: {
            e.openElements.currentTagId === i.OPTION && e.openElements.pop();
            break;
        }
        case i.SELECT: {
            e.openElements.hasInSelectScope(i.SELECT) &&
                (e.openElements.popUntilTagNamePopped(i.SELECT),
                e._resetInsertionMode());
            break;
        }
        case i.TEMPLATE: {
            Je(e, t);
            break;
        }
    }
}
function Pd(e, t) {
    const r = t.tagID;
    r === i.CAPTION ||
    r === i.TABLE ||
    r === i.TBODY ||
    r === i.TFOOT ||
    r === i.THEAD ||
    r === i.TR ||
    r === i.TD ||
    r === i.TH
        ? (e.openElements.popUntilTagNamePopped(i.SELECT),
          e._resetInsertionMode(),
          e._processStartTag(t))
        : Y0(e, t);
}
function Bd(e, t) {
    const r = t.tagID;
    r === i.CAPTION ||
    r === i.TABLE ||
    r === i.TBODY ||
    r === i.TFOOT ||
    r === i.THEAD ||
    r === i.TR ||
    r === i.TD ||
    r === i.TH
        ? e.openElements.hasInTableScope(r) &&
          (e.openElements.popUntilTagNamePopped(i.SELECT),
          e._resetInsertionMode(),
          e.onEndTag(t))
        : $0(e, t);
}
function kd(e, t) {
    switch (t.tagID) {
        case i.BASE:
        case i.BASEFONT:
        case i.BGSOUND:
        case i.LINK:
        case i.META:
        case i.NOFRAMES:
        case i.SCRIPT:
        case i.STYLE:
        case i.TEMPLATE:
        case i.TITLE:
            Oe(e, t);
            break;
        case i.CAPTION:
        case i.COLGROUP:
        case i.TBODY:
        case i.TFOOT:
        case i.THEAD:
            (e.tmplInsertionModeStack[0] = b.IN_TABLE),
                (e.insertionMode = b.IN_TABLE),
                dt(e, t);
            break;
        case i.COL:
            (e.tmplInsertionModeStack[0] = b.IN_COLUMN_GROUP),
                (e.insertionMode = b.IN_COLUMN_GROUP),
                Ka(e, t);
            break;
        case i.TR:
            (e.tmplInsertionModeStack[0] = b.IN_TABLE_BODY),
                (e.insertionMode = b.IN_TABLE_BODY),
                gr(e, t);
            break;
        case i.TD:
        case i.TH:
            (e.tmplInsertionModeStack[0] = b.IN_ROW),
                (e.insertionMode = b.IN_ROW),
                Ar(e, t);
            break;
        default:
            (e.tmplInsertionModeStack[0] = b.IN_BODY),
                (e.insertionMode = b.IN_BODY),
                Ee(e, t);
    }
}
function wd(e, t) {
    t.tagID === i.TEMPLATE && Je(e, t);
}
function W0(e, t) {
    e.openElements.tmplCount > 0
        ? (e.openElements.popUntilTagNamePopped(i.TEMPLATE),
          e.activeFormattingElements.clearToLastMarker(),
          e.tmplInsertionModeStack.shift(),
          e._resetInsertionMode(),
          e.onEof(t))
        : ja(e, t);
}
function Md(e, t) {
    t.tagID === i.HTML ? Ee(e, t) : lr(e, t);
}
function G0(e, t) {
    var r;
    if (t.tagID === i.HTML) {
        if (
            (e.fragmentContext || (e.insertionMode = b.AFTER_AFTER_BODY),
            e.options.sourceCodeLocationInfo &&
                e.openElements.tagIDs[0] === i.HTML)
        ) {
            e._setEndLocation(e.openElements.items[0], t);
            const a = e.openElements.items[1];
            a &&
                !(
                    !(
                        (r = e.treeAdapter.getNodeSourceCodeLocation(a)) ===
                            null || r === void 0
                    ) && r.endTag
                ) &&
                e._setEndLocation(a, t);
        }
    } else lr(e, t);
}
function lr(e, t) {
    (e.insertionMode = b.IN_BODY), xr(e, t);
}
function Hd(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.FRAMESET: {
            e._insertElement(t, L.HTML);
            break;
        }
        case i.FRAME: {
            e._appendElement(t, L.HTML), (t.ackSelfClosing = !0);
            break;
        }
        case i.NOFRAMES: {
            Oe(e, t);
            break;
        }
    }
}
function Fd(e, t) {
    t.tagID === i.FRAMESET &&
        !e.openElements.isRootHtmlElementCurrent() &&
        (e.openElements.pop(),
        !e.fragmentContext &&
            e.openElements.currentTagId !== i.FRAMESET &&
            (e.insertionMode = b.AFTER_FRAMESET));
}
function Ud(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.NOFRAMES: {
            Oe(e, t);
            break;
        }
    }
}
function qd(e, t) {
    t.tagID === i.HTML && (e.insertionMode = b.AFTER_AFTER_FRAMESET);
}
function Yd(e, t) {
    t.tagID === i.HTML ? Ee(e, t) : Jt(e, t);
}
function Jt(e, t) {
    (e.insertionMode = b.IN_BODY), xr(e, t);
}
function $d(e, t) {
    switch (t.tagID) {
        case i.HTML: {
            Ee(e, t);
            break;
        }
        case i.NOFRAMES: {
            Oe(e, t);
            break;
        }
    }
}
function Wd(e, t) {
    (t.chars = ce), e._insertCharacters(t);
}
function Gd(e, t) {
    e._insertCharacters(t), (e.framesetOk = !1);
}
function V0(e) {
    for (
        ;
        e.treeAdapter.getNamespaceURI(e.openElements.current) !== L.HTML &&
        !e._isIntegrationPoint(
            e.openElements.currentTagId,
            e.openElements.current
        );

    )
        e.openElements.pop();
}
function Vd(e, t) {
    if (ul(t)) V0(e), e._startTagOutsideForeignContent(t);
    else {
        const r = e._getAdjustedCurrentElement(),
            a = e.treeAdapter.getNamespaceURI(r);
        a === L.MATHML ? v0(t) : a === L.SVG && (ol(t), y0(t)),
            Xa(t),
            t.selfClosing ? e._appendElement(t, a) : e._insertElement(t, a),
            (t.ackSelfClosing = !0);
    }
}
function Qd(e, t) {
    if (t.tagID === i.P || t.tagID === i.BR) {
        V0(e), e._endTagOutsideForeignContent(t);
        return;
    }
    for (let r = e.openElements.stackTop; r > 0; r--) {
        const a = e.openElements.items[r];
        if (e.treeAdapter.getNamespaceURI(a) === L.HTML) {
            e._endTagOutsideForeignContent(t);
            break;
        }
        const n = e.treeAdapter.getTagName(a);
        if (n.toLowerCase() === t.tagName) {
            (t.tagName = n), e.openElements.shortenToLength(r);
            break;
        }
    }
}
function Q0(e, t) {
    return function (a) {
        let n,
            s = 0,
            u = "";
        for (; (n = e.exec(a)); )
            s !== n.index && (u += a.substring(s, n.index)),
                (u += t.get(n[0].charCodeAt(0))),
                (s = n.index + 1);
        return u + a.substring(s);
    };
}
const Xd = Q0(
        /["&\u00A0]/g,
        new Map([
            [34, "&quot;"],
            [38, "&amp;"],
            [160, "&nbsp;"],
        ])
    ),
    zd = Q0(
        /[&<>\u00A0]/g,
        new Map([
            [38, "&amp;"],
            [60, "&lt;"],
            [62, "&gt;"],
            [160, "&nbsp;"],
        ])
    ),
    jd = new Set([
        I.AREA,
        I.BASE,
        I.BASEFONT,
        I.BGSOUND,
        I.BR,
        I.COL,
        I.EMBED,
        I.FRAME,
        I.HR,
        I.IMG,
        I.INPUT,
        I.KEYGEN,
        I.LINK,
        I.META,
        I.PARAM,
        I.SOURCE,
        I.TRACK,
        I.WBR,
    ]);
function Kd(e, t) {
    return (
        t.treeAdapter.isElementNode(e) &&
        t.treeAdapter.getNamespaceURI(e) === L.HTML &&
        jd.has(t.treeAdapter.getTagName(e))
    );
}
const Zd = { treeAdapter: Xe, scriptingEnabled: !0 };
function Jd(e, t) {
    const r = { ...Zd, ...t };
    return X0(e, r);
}
function ef(e, t) {
    let r = "";
    const a =
            t.treeAdapter.isElementNode(e) &&
            t.treeAdapter.getTagName(e) === I.TEMPLATE &&
            t.treeAdapter.getNamespaceURI(e) === L.HTML
                ? t.treeAdapter.getTemplateContent(e)
                : e,
        n = t.treeAdapter.getChildNodes(a);
    if (n) for (const s of n) r += X0(s, t);
    return r;
}
function X0(e, t) {
    return t.treeAdapter.isElementNode(e)
        ? tf(e, t)
        : t.treeAdapter.isTextNode(e)
        ? af(e, t)
        : t.treeAdapter.isCommentNode(e)
        ? nf(e, t)
        : t.treeAdapter.isDocumentTypeNode(e)
        ? sf(e, t)
        : "";
}
function tf(e, t) {
    const r = t.treeAdapter.getTagName(e);
    return `<${r}${rf(e, t)}>${Kd(e, t) ? "" : `${ef(e, t)}</${r}>`}`;
}
function rf(e, { treeAdapter: t }) {
    let r = "";
    for (const a of t.getAttrList(e)) {
        if (((r += " "), !a.namespace)) r += a.name;
        else
            switch (a.namespace) {
                case L.XML: {
                    r += `xml:${a.name}`;
                    break;
                }
                case L.XMLNS: {
                    a.name !== "xmlns" && (r += "xmlns:"), (r += a.name);
                    break;
                }
                case L.XLINK: {
                    r += `xlink:${a.name}`;
                    break;
                }
                default:
                    r += `${a.prefix}:${a.name}`;
            }
        r += `="${Xd(a.value)}"`;
    }
    return r;
}
function af(e, t) {
    const { treeAdapter: r } = t,
        a = r.getTextNodeContent(e),
        n = r.getParentNode(e),
        s = n && r.isElementNode(n) && r.getTagName(n);
    return s && r.getNamespaceURI(n) === L.HTML && kc(s, t.scriptingEnabled)
        ? a
        : zd(a);
}
function nf(e, { treeAdapter: t }) {
    return `<!--${t.getCommentNodeContent(e)}-->`;
}
function sf(e, { treeAdapter: t }) {
    return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
}
function uf(e, t) {
    return L0.parse(e, t);
}
function of(e, t, r) {
    typeof e == "string" && ((r = t), (t = e), (e = null));
    const a = L0.getFragmentParser(e, r);
    return a.tokenizer.write(t, !0), a.getFragment();
}
function qn(e) {
    return new kt(e);
}
function Yn(e) {
    const t = e.includes('"') ? "'" : '"';
    return t + e + t;
}
function cf(e, t, r) {
    let a = "!DOCTYPE ";
    return (
        e && (a += e),
        t ? (a += ` PUBLIC ${Yn(t)}`) : r && (a += " SYSTEM"),
        r && (a += ` ${Yn(r)}`),
        a
    );
}
const it = {
    isCommentNode: fr,
    isElementNode: Q,
    isTextNode: De,
    createDocument() {
        const e = new ze([]);
        return (e["x-mode"] = xe.NO_QUIRKS), e;
    },
    createDocumentFragment() {
        return new ze([]);
    },
    createElement(e, t, r) {
        const a = Object.create(null),
            n = Object.create(null),
            s = Object.create(null);
        for (let o = 0; o < r.length; o++) {
            const l = r[o].name;
            (a[l] = r[o].value), (n[l] = r[o].namespace), (s[l] = r[o].prefix);
        }
        const u = new ka(e, a, []);
        return (
            (u.namespace = t),
            (u["x-attribsNamespace"] = n),
            (u["x-attribsPrefix"] = s),
            u
        );
    },
    createCommentNode(e) {
        return new Da(e);
    },
    appendChild(e, t) {
        const r = e.children[e.children.length - 1];
        r && ((r.next = t), (t.prev = r)), e.children.push(t), (t.parent = e);
    },
    insertBefore(e, t, r) {
        const a = e.children.indexOf(r),
            { prev: n } = r;
        n && ((n.next = t), (t.prev = n)),
            (r.prev = t),
            (t.next = r),
            e.children.splice(a, 0, t),
            (t.parent = e);
    },
    setTemplateContent(e, t) {
        it.appendChild(e, t);
    },
    getTemplateContent(e) {
        return e.children[0];
    },
    setDocumentType(e, t, r, a) {
        const n = cf(t, r, a);
        let s = e.children.find((u) => xa(u) && u.name === "!doctype");
        s
            ? (s.data = n != null ? n : null)
            : ((s = new Pa("!doctype", n)), it.appendChild(e, s)),
            (s["x-name"] = t != null ? t : void 0),
            (s["x-publicId"] = r != null ? r : void 0),
            (s["x-systemId"] = a != null ? a : void 0);
    },
    setDocumentMode(e, t) {
        e["x-mode"] = t;
    },
    getDocumentMode(e) {
        return e["x-mode"];
    },
    detachNode(e) {
        if (e.parent) {
            const t = e.parent.children.indexOf(e),
                { prev: r, next: a } = e;
            (e.prev = null),
                (e.next = null),
                r && (r.next = a),
                a && (a.prev = r),
                e.parent.children.splice(t, 1),
                (e.parent = null);
        }
    },
    insertText(e, t) {
        const r = e.children[e.children.length - 1];
        r && De(r) ? (r.data += t) : it.appendChild(e, qn(t));
    },
    insertTextBefore(e, t, r) {
        const a = e.children[e.children.indexOf(r) - 1];
        a && De(a) ? (a.data += t) : it.insertBefore(e, qn(t), r);
    },
    adoptAttributes(e, t) {
        for (let r = 0; r < t.length; r++) {
            const a = t[r].name;
            typeof e.attribs[a] > "u" &&
                ((e.attribs[a] = t[r].value),
                (e["x-attribsNamespace"][a] = t[r].namespace),
                (e["x-attribsPrefix"][a] = t[r].prefix));
        }
    },
    getFirstChild(e) {
        return e.children[0];
    },
    getChildNodes(e) {
        return e.children;
    },
    getParentNode(e) {
        return e.parent;
    },
    getAttrList(e) {
        return e.attributes;
    },
    getTagName(e) {
        return e.name;
    },
    getNamespaceURI(e) {
        return e.namespace;
    },
    getTextNodeContent(e) {
        return e.data;
    },
    getCommentNodeContent(e) {
        return e.data;
    },
    getDocumentTypeNodeName(e) {
        var t;
        return (t = e["x-name"]) !== null && t !== void 0 ? t : "";
    },
    getDocumentTypeNodePublicId(e) {
        var t;
        return (t = e["x-publicId"]) !== null && t !== void 0 ? t : "";
    },
    getDocumentTypeNodeSystemId(e) {
        var t;
        return (t = e["x-systemId"]) !== null && t !== void 0 ? t : "";
    },
    isDocumentTypeNode(e) {
        return xa(e) && e.name === "!doctype";
    },
    setNodeSourceCodeLocation(e, t) {
        t && ((e.startIndex = t.startOffset), (e.endIndex = t.endOffset)),
            (e.sourceCodeLocation = t);
    },
    getNodeSourceCodeLocation(e) {
        return e.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(e, t) {
        t.endOffset != null && (e.endIndex = t.endOffset),
            (e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t });
    },
};
function lf(e, t, r, a) {
    const n = {
        scriptingEnabled:
            typeof t.scriptingEnabled == "boolean" ? t.scriptingEnabled : !0,
        treeAdapter: it,
        sourceCodeLocationInfo: t.sourceCodeLocationInfo,
    };
    return r ? uf(e, n) : of(a, e, n);
}
const df = { treeAdapter: it };
function ff(e) {
    const t = "length" in e ? e : [e];
    for (let a = 0; a < t.length; a += 1) {
        const n = t[a];
        Ke(n) && Array.prototype.splice.call(t, a, 1, ...n.children);
    }
    let r = "";
    for (let a = 0; a < t.length; a += 1) {
        const n = t[a];
        r += Jd(n, df);
    }
    return r;
}
var $;
(function (e) {
    (e[(e.Tab = 9)] = "Tab"),
        (e[(e.NewLine = 10)] = "NewLine"),
        (e[(e.FormFeed = 12)] = "FormFeed"),
        (e[(e.CarriageReturn = 13)] = "CarriageReturn"),
        (e[(e.Space = 32)] = "Space"),
        (e[(e.ExclamationMark = 33)] = "ExclamationMark"),
        (e[(e.Number = 35)] = "Number"),
        (e[(e.Amp = 38)] = "Amp"),
        (e[(e.SingleQuote = 39)] = "SingleQuote"),
        (e[(e.DoubleQuote = 34)] = "DoubleQuote"),
        (e[(e.Dash = 45)] = "Dash"),
        (e[(e.Slash = 47)] = "Slash"),
        (e[(e.Zero = 48)] = "Zero"),
        (e[(e.Nine = 57)] = "Nine"),
        (e[(e.Semi = 59)] = "Semi"),
        (e[(e.Lt = 60)] = "Lt"),
        (e[(e.Eq = 61)] = "Eq"),
        (e[(e.Gt = 62)] = "Gt"),
        (e[(e.Questionmark = 63)] = "Questionmark"),
        (e[(e.UpperA = 65)] = "UpperA"),
        (e[(e.LowerA = 97)] = "LowerA"),
        (e[(e.UpperF = 70)] = "UpperF"),
        (e[(e.LowerF = 102)] = "LowerF"),
        (e[(e.UpperZ = 90)] = "UpperZ"),
        (e[(e.LowerZ = 122)] = "LowerZ"),
        (e[(e.LowerX = 120)] = "LowerX"),
        (e[(e.OpeningSquareBracket = 91)] = "OpeningSquareBracket");
})($ || ($ = {}));
var B;
(function (e) {
    (e[(e.Text = 1)] = "Text"),
        (e[(e.BeforeTagName = 2)] = "BeforeTagName"),
        (e[(e.InTagName = 3)] = "InTagName"),
        (e[(e.InSelfClosingTag = 4)] = "InSelfClosingTag"),
        (e[(e.BeforeClosingTagName = 5)] = "BeforeClosingTagName"),
        (e[(e.InClosingTagName = 6)] = "InClosingTagName"),
        (e[(e.AfterClosingTagName = 7)] = "AfterClosingTagName"),
        (e[(e.BeforeAttributeName = 8)] = "BeforeAttributeName"),
        (e[(e.InAttributeName = 9)] = "InAttributeName"),
        (e[(e.AfterAttributeName = 10)] = "AfterAttributeName"),
        (e[(e.BeforeAttributeValue = 11)] = "BeforeAttributeValue"),
        (e[(e.InAttributeValueDq = 12)] = "InAttributeValueDq"),
        (e[(e.InAttributeValueSq = 13)] = "InAttributeValueSq"),
        (e[(e.InAttributeValueNq = 14)] = "InAttributeValueNq"),
        (e[(e.BeforeDeclaration = 15)] = "BeforeDeclaration"),
        (e[(e.InDeclaration = 16)] = "InDeclaration"),
        (e[(e.InProcessingInstruction = 17)] = "InProcessingInstruction"),
        (e[(e.BeforeComment = 18)] = "BeforeComment"),
        (e[(e.CDATASequence = 19)] = "CDATASequence"),
        (e[(e.InSpecialComment = 20)] = "InSpecialComment"),
        (e[(e.InCommentLike = 21)] = "InCommentLike"),
        (e[(e.BeforeSpecialS = 22)] = "BeforeSpecialS"),
        (e[(e.SpecialStartSequence = 23)] = "SpecialStartSequence"),
        (e[(e.InSpecialTag = 24)] = "InSpecialTag"),
        (e[(e.BeforeEntity = 25)] = "BeforeEntity"),
        (e[(e.BeforeNumericEntity = 26)] = "BeforeNumericEntity"),
        (e[(e.InNamedEntity = 27)] = "InNamedEntity"),
        (e[(e.InNumericEntity = 28)] = "InNumericEntity"),
        (e[(e.InHexEntity = 29)] = "InHexEntity");
})(B || (B = {}));
function ke(e) {
    return (
        e === $.Space ||
        e === $.NewLine ||
        e === $.Tab ||
        e === $.FormFeed ||
        e === $.CarriageReturn
    );
}
function jt(e) {
    return e === $.Slash || e === $.Gt || ke(e);
}
function $n(e) {
    return e >= $.Zero && e <= $.Nine;
}
function hf(e) {
    return (e >= $.LowerA && e <= $.LowerZ) || (e >= $.UpperA && e <= $.UpperZ);
}
function Ef(e) {
    return (e >= $.UpperA && e <= $.UpperF) || (e >= $.LowerA && e <= $.LowerF);
}
var Le;
(function (e) {
    (e[(e.NoValue = 0)] = "NoValue"),
        (e[(e.Unquoted = 1)] = "Unquoted"),
        (e[(e.Single = 2)] = "Single"),
        (e[(e.Double = 3)] = "Double");
})(Le || (Le = {}));
const Te = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    CdataEnd: new Uint8Array([93, 93, 62]),
    CommentEnd: new Uint8Array([45, 45, 62]),
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
};
class pf {
    constructor({ xmlMode: t = !1, decodeEntities: r = !0 }, a) {
        (this.cbs = a),
            (this.state = B.Text),
            (this.buffer = ""),
            (this.sectionStart = 0),
            (this.index = 0),
            (this.baseState = B.Text),
            (this.isSpecial = !1),
            (this.running = !0),
            (this.offset = 0),
            (this.currentSequence = void 0),
            (this.sequenceIndex = 0),
            (this.trieIndex = 0),
            (this.trieCurrent = 0),
            (this.entityResult = 0),
            (this.entityExcess = 0),
            (this.xmlMode = t),
            (this.decodeEntities = r),
            (this.entityTrie = t ? yc : Ue);
    }
    reset() {
        (this.state = B.Text),
            (this.buffer = ""),
            (this.sectionStart = 0),
            (this.index = 0),
            (this.baseState = B.Text),
            (this.currentSequence = void 0),
            (this.running = !0),
            (this.offset = 0);
    }
    write(t) {
        (this.offset += this.buffer.length), (this.buffer = t), this.parse();
    }
    end() {
        this.running && this.finish();
    }
    pause() {
        this.running = !1;
    }
    resume() {
        (this.running = !0),
            this.index < this.buffer.length + this.offset && this.parse();
    }
    getIndex() {
        return this.index;
    }
    getSectionStart() {
        return this.sectionStart;
    }
    stateText(t) {
        t === $.Lt || (!this.decodeEntities && this.fastForwardTo($.Lt))
            ? (this.index > this.sectionStart &&
                  this.cbs.ontext(this.sectionStart, this.index),
              (this.state = B.BeforeTagName),
              (this.sectionStart = this.index))
            : this.decodeEntities &&
              t === $.Amp &&
              (this.state = B.BeforeEntity);
    }
    stateSpecialStartSequence(t) {
        const r = this.sequenceIndex === this.currentSequence.length;
        if (
            !(r ? jt(t) : (t | 32) === this.currentSequence[this.sequenceIndex])
        )
            this.isSpecial = !1;
        else if (!r) {
            this.sequenceIndex++;
            return;
        }
        (this.sequenceIndex = 0),
            (this.state = B.InTagName),
            this.stateInTagName(t);
    }
    stateInSpecialTag(t) {
        if (this.sequenceIndex === this.currentSequence.length) {
            if (t === $.Gt || ke(t)) {
                const r = this.index - this.currentSequence.length;
                if (this.sectionStart < r) {
                    const a = this.index;
                    (this.index = r),
                        this.cbs.ontext(this.sectionStart, r),
                        (this.index = a);
                }
                (this.isSpecial = !1),
                    (this.sectionStart = r + 2),
                    this.stateInClosingTagName(t);
                return;
            }
            this.sequenceIndex = 0;
        }
        (t | 32) === this.currentSequence[this.sequenceIndex]
            ? (this.sequenceIndex += 1)
            : this.sequenceIndex === 0
            ? this.currentSequence === Te.TitleEnd
                ? this.decodeEntities &&
                  t === $.Amp &&
                  (this.state = B.BeforeEntity)
                : this.fastForwardTo($.Lt) && (this.sequenceIndex = 1)
            : (this.sequenceIndex = Number(t === $.Lt));
    }
    stateCDATASequence(t) {
        t === Te.Cdata[this.sequenceIndex]
            ? ++this.sequenceIndex === Te.Cdata.length &&
              ((this.state = B.InCommentLike),
              (this.currentSequence = Te.CdataEnd),
              (this.sequenceIndex = 0),
              (this.sectionStart = this.index + 1))
            : ((this.sequenceIndex = 0),
              (this.state = B.InDeclaration),
              this.stateInDeclaration(t));
    }
    fastForwardTo(t) {
        for (; ++this.index < this.buffer.length + this.offset; )
            if (this.buffer.charCodeAt(this.index - this.offset) === t)
                return !0;
        return (this.index = this.buffer.length + this.offset - 1), !1;
    }
    stateInCommentLike(t) {
        t === this.currentSequence[this.sequenceIndex]
            ? ++this.sequenceIndex === this.currentSequence.length &&
              (this.currentSequence === Te.CdataEnd
                  ? this.cbs.oncdata(this.sectionStart, this.index, 2)
                  : this.cbs.oncomment(this.sectionStart, this.index, 2),
              (this.sequenceIndex = 0),
              (this.sectionStart = this.index + 1),
              (this.state = B.Text))
            : this.sequenceIndex === 0
            ? this.fastForwardTo(this.currentSequence[0]) &&
              (this.sequenceIndex = 1)
            : t !== this.currentSequence[this.sequenceIndex - 1] &&
              (this.sequenceIndex = 0);
    }
    isTagStartChar(t) {
        return this.xmlMode ? !jt(t) : hf(t);
    }
    startSpecial(t, r) {
        (this.isSpecial = !0),
            (this.currentSequence = t),
            (this.sequenceIndex = r),
            (this.state = B.SpecialStartSequence);
    }
    stateBeforeTagName(t) {
        if (t === $.ExclamationMark)
            (this.state = B.BeforeDeclaration),
                (this.sectionStart = this.index + 1);
        else if (t === $.Questionmark)
            (this.state = B.InProcessingInstruction),
                (this.sectionStart = this.index + 1);
        else if (this.isTagStartChar(t)) {
            const r = t | 32;
            (this.sectionStart = this.index),
                !this.xmlMode && r === Te.TitleEnd[2]
                    ? this.startSpecial(Te.TitleEnd, 3)
                    : (this.state =
                          !this.xmlMode && r === Te.ScriptEnd[2]
                              ? B.BeforeSpecialS
                              : B.InTagName);
        } else
            t === $.Slash
                ? (this.state = B.BeforeClosingTagName)
                : ((this.state = B.Text), this.stateText(t));
    }
    stateInTagName(t) {
        jt(t) &&
            (this.cbs.onopentagname(this.sectionStart, this.index),
            (this.sectionStart = -1),
            (this.state = B.BeforeAttributeName),
            this.stateBeforeAttributeName(t));
    }
    stateBeforeClosingTagName(t) {
        ke(t) ||
            (t === $.Gt
                ? (this.state = B.Text)
                : ((this.state = this.isTagStartChar(t)
                      ? B.InClosingTagName
                      : B.InSpecialComment),
                  (this.sectionStart = this.index)));
    }
    stateInClosingTagName(t) {
        (t === $.Gt || ke(t)) &&
            (this.cbs.onclosetag(this.sectionStart, this.index),
            (this.sectionStart = -1),
            (this.state = B.AfterClosingTagName),
            this.stateAfterClosingTagName(t));
    }
    stateAfterClosingTagName(t) {
        (t === $.Gt || this.fastForwardTo($.Gt)) &&
            ((this.state = B.Text),
            (this.baseState = B.Text),
            (this.sectionStart = this.index + 1));
    }
    stateBeforeAttributeName(t) {
        t === $.Gt
            ? (this.cbs.onopentagend(this.index),
              this.isSpecial
                  ? ((this.state = B.InSpecialTag), (this.sequenceIndex = 0))
                  : (this.state = B.Text),
              (this.baseState = this.state),
              (this.sectionStart = this.index + 1))
            : t === $.Slash
            ? (this.state = B.InSelfClosingTag)
            : ke(t) ||
              ((this.state = B.InAttributeName),
              (this.sectionStart = this.index));
    }
    stateInSelfClosingTag(t) {
        t === $.Gt
            ? (this.cbs.onselfclosingtag(this.index),
              (this.state = B.Text),
              (this.baseState = B.Text),
              (this.sectionStart = this.index + 1),
              (this.isSpecial = !1))
            : ke(t) ||
              ((this.state = B.BeforeAttributeName),
              this.stateBeforeAttributeName(t));
    }
    stateInAttributeName(t) {
        (t === $.Eq || jt(t)) &&
            (this.cbs.onattribname(this.sectionStart, this.index),
            (this.sectionStart = -1),
            (this.state = B.AfterAttributeName),
            this.stateAfterAttributeName(t));
    }
    stateAfterAttributeName(t) {
        t === $.Eq
            ? (this.state = B.BeforeAttributeValue)
            : t === $.Slash || t === $.Gt
            ? (this.cbs.onattribend(Le.NoValue, this.index),
              (this.state = B.BeforeAttributeName),
              this.stateBeforeAttributeName(t))
            : ke(t) ||
              (this.cbs.onattribend(Le.NoValue, this.index),
              (this.state = B.InAttributeName),
              (this.sectionStart = this.index));
    }
    stateBeforeAttributeValue(t) {
        t === $.DoubleQuote
            ? ((this.state = B.InAttributeValueDq),
              (this.sectionStart = this.index + 1))
            : t === $.SingleQuote
            ? ((this.state = B.InAttributeValueSq),
              (this.sectionStart = this.index + 1))
            : ke(t) ||
              ((this.sectionStart = this.index),
              (this.state = B.InAttributeValueNq),
              this.stateInAttributeValueNoQuotes(t));
    }
    handleInAttributeValue(t, r) {
        t === r || (!this.decodeEntities && this.fastForwardTo(r))
            ? (this.cbs.onattribdata(this.sectionStart, this.index),
              (this.sectionStart = -1),
              this.cbs.onattribend(
                  r === $.DoubleQuote ? Le.Double : Le.Single,
                  this.index
              ),
              (this.state = B.BeforeAttributeName))
            : this.decodeEntities &&
              t === $.Amp &&
              ((this.baseState = this.state), (this.state = B.BeforeEntity));
    }
    stateInAttributeValueDoubleQuotes(t) {
        this.handleInAttributeValue(t, $.DoubleQuote);
    }
    stateInAttributeValueSingleQuotes(t) {
        this.handleInAttributeValue(t, $.SingleQuote);
    }
    stateInAttributeValueNoQuotes(t) {
        ke(t) || t === $.Gt
            ? (this.cbs.onattribdata(this.sectionStart, this.index),
              (this.sectionStart = -1),
              this.cbs.onattribend(Le.Unquoted, this.index),
              (this.state = B.BeforeAttributeName),
              this.stateBeforeAttributeName(t))
            : this.decodeEntities &&
              t === $.Amp &&
              ((this.baseState = this.state), (this.state = B.BeforeEntity));
    }
    stateBeforeDeclaration(t) {
        t === $.OpeningSquareBracket
            ? ((this.state = B.CDATASequence), (this.sequenceIndex = 0))
            : (this.state = t === $.Dash ? B.BeforeComment : B.InDeclaration);
    }
    stateInDeclaration(t) {
        (t === $.Gt || this.fastForwardTo($.Gt)) &&
            (this.cbs.ondeclaration(this.sectionStart, this.index),
            (this.state = B.Text),
            (this.sectionStart = this.index + 1));
    }
    stateInProcessingInstruction(t) {
        (t === $.Gt || this.fastForwardTo($.Gt)) &&
            (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
            (this.state = B.Text),
            (this.sectionStart = this.index + 1));
    }
    stateBeforeComment(t) {
        t === $.Dash
            ? ((this.state = B.InCommentLike),
              (this.currentSequence = Te.CommentEnd),
              (this.sequenceIndex = 2),
              (this.sectionStart = this.index + 1))
            : (this.state = B.InDeclaration);
    }
    stateInSpecialComment(t) {
        (t === $.Gt || this.fastForwardTo($.Gt)) &&
            (this.cbs.oncomment(this.sectionStart, this.index, 0),
            (this.state = B.Text),
            (this.sectionStart = this.index + 1));
    }
    stateBeforeSpecialS(t) {
        const r = t | 32;
        r === Te.ScriptEnd[3]
            ? this.startSpecial(Te.ScriptEnd, 4)
            : r === Te.StyleEnd[3]
            ? this.startSpecial(Te.StyleEnd, 4)
            : ((this.state = B.InTagName), this.stateInTagName(t));
    }
    stateBeforeEntity(t) {
        (this.entityExcess = 1),
            (this.entityResult = 0),
            t === $.Number
                ? (this.state = B.BeforeNumericEntity)
                : t === $.Amp ||
                  ((this.trieIndex = 0),
                  (this.trieCurrent = this.entityTrie[0]),
                  (this.state = B.InNamedEntity),
                  this.stateInNamedEntity(t));
    }
    stateInNamedEntity(t) {
        if (
            ((this.entityExcess += 1),
            (this.trieIndex = x0(
                this.entityTrie,
                this.trieCurrent,
                this.trieIndex + 1,
                t
            )),
            this.trieIndex < 0)
        ) {
            this.emitNamedEntity(), this.index--;
            return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        const r = this.trieCurrent & we.VALUE_LENGTH;
        if (r) {
            const a = (r >> 14) - 1;
            if (!this.allowLegacyEntity() && t !== $.Semi) this.trieIndex += a;
            else {
                const n = this.index - this.entityExcess + 1;
                n > this.sectionStart && this.emitPartial(this.sectionStart, n),
                    (this.entityResult = this.trieIndex),
                    (this.trieIndex += a),
                    (this.entityExcess = 0),
                    (this.sectionStart = this.index + 1),
                    a === 0 && this.emitNamedEntity();
            }
        }
    }
    emitNamedEntity() {
        if (((this.state = this.baseState), this.entityResult === 0)) return;
        switch ((this.entityTrie[this.entityResult] & we.VALUE_LENGTH) >> 14) {
            case 1: {
                this.emitCodePoint(
                    this.entityTrie[this.entityResult] & ~we.VALUE_LENGTH
                );
                break;
            }
            case 2: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                break;
            }
            case 3:
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]),
                    this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
        }
    }
    stateBeforeNumericEntity(t) {
        (t | 32) === $.LowerX
            ? (this.entityExcess++, (this.state = B.InHexEntity))
            : ((this.state = B.InNumericEntity), this.stateInNumericEntity(t));
    }
    emitNumericEntity(t) {
        const r = this.index - this.entityExcess - 1;
        r + 2 + Number(this.state === B.InHexEntity) !== this.index &&
            (r > this.sectionStart && this.emitPartial(this.sectionStart, r),
            (this.sectionStart = this.index + Number(t)),
            this.emitCodePoint(Lc(this.entityResult))),
            (this.state = this.baseState);
    }
    stateInNumericEntity(t) {
        t === $.Semi
            ? this.emitNumericEntity(!0)
            : $n(t)
            ? ((this.entityResult = this.entityResult * 10 + (t - $.Zero)),
              this.entityExcess++)
            : (this.allowLegacyEntity()
                  ? this.emitNumericEntity(!1)
                  : (this.state = this.baseState),
              this.index--);
    }
    stateInHexEntity(t) {
        t === $.Semi
            ? this.emitNumericEntity(!0)
            : $n(t)
            ? ((this.entityResult = this.entityResult * 16 + (t - $.Zero)),
              this.entityExcess++)
            : Ef(t)
            ? ((this.entityResult =
                  this.entityResult * 16 + ((t | 32) - $.LowerA + 10)),
              this.entityExcess++)
            : (this.allowLegacyEntity()
                  ? this.emitNumericEntity(!1)
                  : (this.state = this.baseState),
              this.index--);
    }
    allowLegacyEntity() {
        return (
            !this.xmlMode &&
            (this.baseState === B.Text || this.baseState === B.InSpecialTag)
        );
    }
    cleanup() {
        this.running &&
            this.sectionStart !== this.index &&
            (this.state === B.Text ||
            (this.state === B.InSpecialTag && this.sequenceIndex === 0)
                ? (this.cbs.ontext(this.sectionStart, this.index),
                  (this.sectionStart = this.index))
                : (this.state === B.InAttributeValueDq ||
                      this.state === B.InAttributeValueSq ||
                      this.state === B.InAttributeValueNq) &&
                  (this.cbs.onattribdata(this.sectionStart, this.index),
                  (this.sectionStart = this.index)));
    }
    shouldContinue() {
        return this.index < this.buffer.length + this.offset && this.running;
    }
    parse() {
        for (; this.shouldContinue(); ) {
            const t = this.buffer.charCodeAt(this.index - this.offset);
            switch (this.state) {
                case B.Text: {
                    this.stateText(t);
                    break;
                }
                case B.SpecialStartSequence: {
                    this.stateSpecialStartSequence(t);
                    break;
                }
                case B.InSpecialTag: {
                    this.stateInSpecialTag(t);
                    break;
                }
                case B.CDATASequence: {
                    this.stateCDATASequence(t);
                    break;
                }
                case B.InAttributeValueDq: {
                    this.stateInAttributeValueDoubleQuotes(t);
                    break;
                }
                case B.InAttributeName: {
                    this.stateInAttributeName(t);
                    break;
                }
                case B.InCommentLike: {
                    this.stateInCommentLike(t);
                    break;
                }
                case B.InSpecialComment: {
                    this.stateInSpecialComment(t);
                    break;
                }
                case B.BeforeAttributeName: {
                    this.stateBeforeAttributeName(t);
                    break;
                }
                case B.InTagName: {
                    this.stateInTagName(t);
                    break;
                }
                case B.InClosingTagName: {
                    this.stateInClosingTagName(t);
                    break;
                }
                case B.BeforeTagName: {
                    this.stateBeforeTagName(t);
                    break;
                }
                case B.AfterAttributeName: {
                    this.stateAfterAttributeName(t);
                    break;
                }
                case B.InAttributeValueSq: {
                    this.stateInAttributeValueSingleQuotes(t);
                    break;
                }
                case B.BeforeAttributeValue: {
                    this.stateBeforeAttributeValue(t);
                    break;
                }
                case B.BeforeClosingTagName: {
                    this.stateBeforeClosingTagName(t);
                    break;
                }
                case B.AfterClosingTagName: {
                    this.stateAfterClosingTagName(t);
                    break;
                }
                case B.BeforeSpecialS: {
                    this.stateBeforeSpecialS(t);
                    break;
                }
                case B.InAttributeValueNq: {
                    this.stateInAttributeValueNoQuotes(t);
                    break;
                }
                case B.InSelfClosingTag: {
                    this.stateInSelfClosingTag(t);
                    break;
                }
                case B.InDeclaration: {
                    this.stateInDeclaration(t);
                    break;
                }
                case B.BeforeDeclaration: {
                    this.stateBeforeDeclaration(t);
                    break;
                }
                case B.BeforeComment: {
                    this.stateBeforeComment(t);
                    break;
                }
                case B.InProcessingInstruction: {
                    this.stateInProcessingInstruction(t);
                    break;
                }
                case B.InNamedEntity: {
                    this.stateInNamedEntity(t);
                    break;
                }
                case B.BeforeEntity: {
                    this.stateBeforeEntity(t);
                    break;
                }
                case B.InHexEntity: {
                    this.stateInHexEntity(t);
                    break;
                }
                case B.InNumericEntity: {
                    this.stateInNumericEntity(t);
                    break;
                }
                default:
                    this.stateBeforeNumericEntity(t);
            }
            this.index++;
        }
        this.cleanup();
    }
    finish() {
        this.state === B.InNamedEntity && this.emitNamedEntity(),
            this.sectionStart < this.index && this.handleTrailingData(),
            this.cbs.onend();
    }
    handleTrailingData() {
        const t = this.buffer.length + this.offset;
        this.state === B.InCommentLike
            ? this.currentSequence === Te.CdataEnd
                ? this.cbs.oncdata(this.sectionStart, t, 0)
                : this.cbs.oncomment(this.sectionStart, t, 0)
            : this.state === B.InNumericEntity && this.allowLegacyEntity()
            ? this.emitNumericEntity(!1)
            : this.state === B.InHexEntity && this.allowLegacyEntity()
            ? this.emitNumericEntity(!1)
            : this.state === B.InTagName ||
              this.state === B.BeforeAttributeName ||
              this.state === B.BeforeAttributeValue ||
              this.state === B.AfterAttributeName ||
              this.state === B.InAttributeName ||
              this.state === B.InAttributeValueSq ||
              this.state === B.InAttributeValueDq ||
              this.state === B.InAttributeValueNq ||
              this.state === B.InClosingTagName ||
              this.cbs.ontext(this.sectionStart, t);
    }
    emitPartial(t, r) {
        this.baseState !== B.Text && this.baseState !== B.InSpecialTag
            ? this.cbs.onattribdata(t, r)
            : this.cbs.ontext(t, r);
    }
    emitCodePoint(t) {
        this.baseState !== B.Text && this.baseState !== B.InSpecialTag
            ? this.cbs.onattribentity(t)
            : this.cbs.ontextentity(t);
    }
}
const st = new Set([
        "input",
        "option",
        "optgroup",
        "select",
        "button",
        "datalist",
        "textarea",
    ]),
    ne = new Set(["p"]),
    Wn = new Set(["thead", "tbody"]),
    Gn = new Set(["dd", "dt"]),
    Vn = new Set(["rt", "rp"]),
    mf = new Map([
        ["tr", new Set(["tr", "th", "td"])],
        ["th", new Set(["th"])],
        ["td", new Set(["thead", "th", "td"])],
        ["body", new Set(["head", "link", "script"])],
        ["li", new Set(["li"])],
        ["p", ne],
        ["h1", ne],
        ["h2", ne],
        ["h3", ne],
        ["h4", ne],
        ["h5", ne],
        ["h6", ne],
        ["select", st],
        ["input", st],
        ["output", st],
        ["button", st],
        ["datalist", st],
        ["textarea", st],
        ["option", new Set(["option"])],
        ["optgroup", new Set(["optgroup", "option"])],
        ["dd", Gn],
        ["dt", Gn],
        ["address", ne],
        ["article", ne],
        ["aside", ne],
        ["blockquote", ne],
        ["details", ne],
        ["div", ne],
        ["dl", ne],
        ["fieldset", ne],
        ["figcaption", ne],
        ["figure", ne],
        ["footer", ne],
        ["form", ne],
        ["header", ne],
        ["hr", ne],
        ["main", ne],
        ["nav", ne],
        ["ol", ne],
        ["pre", ne],
        ["section", ne],
        ["table", ne],
        ["ul", ne],
        ["rt", Vn],
        ["rp", Vn],
        ["tbody", Wn],
        ["tfoot", Wn],
    ]),
    Tf = new Set([
        "area",
        "base",
        "basefont",
        "br",
        "col",
        "command",
        "embed",
        "frame",
        "hr",
        "img",
        "input",
        "isindex",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
    ]),
    Qn = new Set(["math", "svg"]),
    Xn = new Set([
        "mi",
        "mo",
        "mn",
        "ms",
        "mtext",
        "annotation-xml",
        "foreignobject",
        "desc",
        "title",
    ]),
    bf = /\s|\//;
class xf {
    constructor(t, r = {}) {
        var a, n, s, u, o;
        (this.options = r),
            (this.startIndex = 0),
            (this.endIndex = 0),
            (this.openTagStart = 0),
            (this.tagname = ""),
            (this.attribname = ""),
            (this.attribvalue = ""),
            (this.attribs = null),
            (this.stack = []),
            (this.foreignContext = []),
            (this.buffers = []),
            (this.bufferOffset = 0),
            (this.writeIndex = 0),
            (this.ended = !1),
            (this.cbs = t != null ? t : {}),
            (this.lowerCaseTagNames =
                (a = r.lowerCaseTags) !== null && a !== void 0
                    ? a
                    : !r.xmlMode),
            (this.lowerCaseAttributeNames =
                (n = r.lowerCaseAttributeNames) !== null && n !== void 0
                    ? n
                    : !r.xmlMode),
            (this.tokenizer = new (
                (s = r.Tokenizer) !== null && s !== void 0 ? s : pf
            )(this.options, this)),
            (o = (u = this.cbs).onparserinit) === null ||
                o === void 0 ||
                o.call(u, this);
    }
    ontext(t, r) {
        var a, n;
        const s = this.getSlice(t, r);
        (this.endIndex = r - 1),
            (n = (a = this.cbs).ontext) === null ||
                n === void 0 ||
                n.call(a, s),
            (this.startIndex = r);
    }
    ontextentity(t) {
        var r, a;
        const n = this.tokenizer.getSectionStart();
        (this.endIndex = n - 1),
            (a = (r = this.cbs).ontext) === null ||
                a === void 0 ||
                a.call(r, On(t)),
            (this.startIndex = n);
    }
    isVoidElement(t) {
        return !this.options.xmlMode && Tf.has(t);
    }
    onopentagname(t, r) {
        this.endIndex = r;
        let a = this.getSlice(t, r);
        this.lowerCaseTagNames && (a = a.toLowerCase()), this.emitOpenTag(a);
    }
    emitOpenTag(t) {
        var r, a, n, s;
        (this.openTagStart = this.startIndex), (this.tagname = t);
        const u = !this.options.xmlMode && mf.get(t);
        if (u)
            for (
                ;
                this.stack.length > 0 &&
                u.has(this.stack[this.stack.length - 1]);

            ) {
                const o = this.stack.pop();
                (a = (r = this.cbs).onclosetag) === null ||
                    a === void 0 ||
                    a.call(r, o, !0);
            }
        this.isVoidElement(t) ||
            (this.stack.push(t),
            Qn.has(t)
                ? this.foreignContext.push(!0)
                : Xn.has(t) && this.foreignContext.push(!1)),
            (s = (n = this.cbs).onopentagname) === null ||
                s === void 0 ||
                s.call(n, t),
            this.cbs.onopentag && (this.attribs = {});
    }
    endOpenTag(t) {
        var r, a;
        (this.startIndex = this.openTagStart),
            this.attribs &&
                ((a = (r = this.cbs).onopentag) === null ||
                    a === void 0 ||
                    a.call(r, this.tagname, this.attribs, t),
                (this.attribs = null)),
            this.cbs.onclosetag &&
                this.isVoidElement(this.tagname) &&
                this.cbs.onclosetag(this.tagname, !0),
            (this.tagname = "");
    }
    onopentagend(t) {
        (this.endIndex = t), this.endOpenTag(!1), (this.startIndex = t + 1);
    }
    onclosetag(t, r) {
        var a, n, s, u, o, l;
        this.endIndex = r;
        let c = this.getSlice(t, r);
        if (
            (this.lowerCaseTagNames && (c = c.toLowerCase()),
            (Qn.has(c) || Xn.has(c)) && this.foreignContext.pop(),
            this.isVoidElement(c))
        )
            !this.options.xmlMode &&
                c === "br" &&
                ((n = (a = this.cbs).onopentagname) === null ||
                    n === void 0 ||
                    n.call(a, "br"),
                (u = (s = this.cbs).onopentag) === null ||
                    u === void 0 ||
                    u.call(s, "br", {}, !0),
                (l = (o = this.cbs).onclosetag) === null ||
                    l === void 0 ||
                    l.call(o, "br", !1));
        else {
            const d = this.stack.lastIndexOf(c);
            if (d !== -1)
                if (this.cbs.onclosetag) {
                    let h = this.stack.length - d;
                    for (; h--; )
                        this.cbs.onclosetag(this.stack.pop(), h !== 0);
                } else this.stack.length = d;
            else
                !this.options.xmlMode &&
                    c === "p" &&
                    (this.emitOpenTag("p"), this.closeCurrentTag(!0));
        }
        this.startIndex = r + 1;
    }
    onselfclosingtag(t) {
        (this.endIndex = t),
            this.options.xmlMode ||
            this.options.recognizeSelfClosing ||
            this.foreignContext[this.foreignContext.length - 1]
                ? (this.closeCurrentTag(!1), (this.startIndex = t + 1))
                : this.onopentagend(t);
    }
    closeCurrentTag(t) {
        var r, a;
        const n = this.tagname;
        this.endOpenTag(t),
            this.stack[this.stack.length - 1] === n &&
                ((a = (r = this.cbs).onclosetag) === null ||
                    a === void 0 ||
                    a.call(r, n, !t),
                this.stack.pop());
    }
    onattribname(t, r) {
        this.startIndex = t;
        const a = this.getSlice(t, r);
        this.attribname = this.lowerCaseAttributeNames ? a.toLowerCase() : a;
    }
    onattribdata(t, r) {
        this.attribvalue += this.getSlice(t, r);
    }
    onattribentity(t) {
        this.attribvalue += On(t);
    }
    onattribend(t, r) {
        var a, n;
        (this.endIndex = r),
            (n = (a = this.cbs).onattribute) === null ||
                n === void 0 ||
                n.call(
                    a,
                    this.attribname,
                    this.attribvalue,
                    t === Le.Double
                        ? '"'
                        : t === Le.Single
                        ? "'"
                        : t === Le.NoValue
                        ? void 0
                        : null
                ),
            this.attribs &&
                !Object.prototype.hasOwnProperty.call(
                    this.attribs,
                    this.attribname
                ) &&
                (this.attribs[this.attribname] = this.attribvalue),
            (this.attribvalue = "");
    }
    getInstructionName(t) {
        const r = t.search(bf);
        let a = r < 0 ? t : t.substr(0, r);
        return this.lowerCaseTagNames && (a = a.toLowerCase()), a;
    }
    ondeclaration(t, r) {
        this.endIndex = r;
        const a = this.getSlice(t, r);
        if (this.cbs.onprocessinginstruction) {
            const n = this.getInstructionName(a);
            this.cbs.onprocessinginstruction(`!${n}`, `!${a}`);
        }
        this.startIndex = r + 1;
    }
    onprocessinginstruction(t, r) {
        this.endIndex = r;
        const a = this.getSlice(t, r);
        if (this.cbs.onprocessinginstruction) {
            const n = this.getInstructionName(a);
            this.cbs.onprocessinginstruction(`?${n}`, `?${a}`);
        }
        this.startIndex = r + 1;
    }
    oncomment(t, r, a) {
        var n, s, u, o;
        (this.endIndex = r),
            (s = (n = this.cbs).oncomment) === null ||
                s === void 0 ||
                s.call(n, this.getSlice(t, r - a)),
            (o = (u = this.cbs).oncommentend) === null ||
                o === void 0 ||
                o.call(u),
            (this.startIndex = r + 1);
    }
    oncdata(t, r, a) {
        var n, s, u, o, l, c, d, h, f, m;
        this.endIndex = r;
        const p = this.getSlice(t, r - a);
        this.options.xmlMode || this.options.recognizeCDATA
            ? ((s = (n = this.cbs).oncdatastart) === null ||
                  s === void 0 ||
                  s.call(n),
              (o = (u = this.cbs).ontext) === null ||
                  o === void 0 ||
                  o.call(u, p),
              (c = (l = this.cbs).oncdataend) === null ||
                  c === void 0 ||
                  c.call(l))
            : ((h = (d = this.cbs).oncomment) === null ||
                  h === void 0 ||
                  h.call(d, `[CDATA[${p}]]`),
              (m = (f = this.cbs).oncommentend) === null ||
                  m === void 0 ||
                  m.call(f)),
            (this.startIndex = r + 1);
    }
    onend() {
        var t, r;
        if (this.cbs.onclosetag) {
            this.endIndex = this.startIndex;
            for (
                let a = this.stack.length;
                a > 0;
                this.cbs.onclosetag(this.stack[--a], !0)
            );
        }
        (r = (t = this.cbs).onend) === null || r === void 0 || r.call(t);
    }
    reset() {
        var t, r, a, n;
        (r = (t = this.cbs).onreset) === null || r === void 0 || r.call(t),
            this.tokenizer.reset(),
            (this.tagname = ""),
            (this.attribname = ""),
            (this.attribs = null),
            (this.stack.length = 0),
            (this.startIndex = 0),
            (this.endIndex = 0),
            (n = (a = this.cbs).onparserinit) === null ||
                n === void 0 ||
                n.call(a, this),
            (this.buffers.length = 0),
            (this.bufferOffset = 0),
            (this.writeIndex = 0),
            (this.ended = !1);
    }
    parseComplete(t) {
        this.reset(), this.end(t);
    }
    getSlice(t, r) {
        for (; t - this.bufferOffset >= this.buffers[0].length; )
            this.shiftBuffer();
        let a = this.buffers[0].slice(
            t - this.bufferOffset,
            r - this.bufferOffset
        );
        for (; r - this.bufferOffset > this.buffers[0].length; )
            this.shiftBuffer(),
                (a += this.buffers[0].slice(0, r - this.bufferOffset));
        return a;
    }
    shiftBuffer() {
        (this.bufferOffset += this.buffers[0].length),
            this.writeIndex--,
            this.buffers.shift();
    }
    write(t) {
        var r, a;
        if (this.ended) {
            (a = (r = this.cbs).onerror) === null ||
                a === void 0 ||
                a.call(r, new Error(".write() after done!"));
            return;
        }
        this.buffers.push(t),
            this.tokenizer.running &&
                (this.tokenizer.write(t), this.writeIndex++);
    }
    end(t) {
        var r, a;
        if (this.ended) {
            (a = (r = this.cbs).onerror) === null ||
                a === void 0 ||
                a.call(r, new Error(".end() after done!"));
            return;
        }
        t && this.write(t), (this.ended = !0), this.tokenizer.end();
    }
    pause() {
        this.tokenizer.pause();
    }
    resume() {
        for (
            this.tokenizer.resume();
            this.tokenizer.running && this.writeIndex < this.buffers.length;

        )
            this.tokenizer.write(this.buffers[this.writeIndex++]);
        this.ended && this.tokenizer.end();
    }
    parseChunk(t) {
        this.write(t);
    }
    done(t) {
        this.end(t);
    }
}
function _f(e, t) {
    const r = new Ri(void 0, t);
    return new xf(r, t).end(e), r.root;
}
const gf = Vo((e, t, r, a) =>
        t.xmlMode || t._useHtmlParser2 ? _f(e, t) : lf(e, t, r, a)
    ),
    ee = Ac(gf, (e, t) => (t.xmlMode || t._useHtmlParser2 ? hr(e, t) : ff(e)));
ee([]);
class TVNAnimeService extends AnimeService {
    constructor() {
        super({
            name: "AnimeTVN",
            id: "tvn",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://animetvn4.com",
            quality: ["720p"],
            logo: "https://animetvn4.com/images/logo.png",
        });
        Ne(this, "csrf");
        this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "User-Agent",
                            operation: "set",
                            value: "yayaya",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["api-plhq.playhbq.xyz"],
                    resourceTypes: [
                        browser.declarativeNetRequest.ResourceType
                            .XMLHTTPREQUEST,
                    ],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                },
                condition: {
                    regexFilter: "^https://(.*)/stream/v5/(.*).html",
                    resourceTypes: [
                        browser.declarativeNetRequest.ResourceType
                            .XMLHTTPREQUEST,
                    ],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                },
                condition: {
                    requestDomains: ["m3u8-plhq.playhbq.xyz"],
                    resourceTypes: [
                        browser.declarativeNetRequest.ResourceType
                            .XMLHTTPREQUEST,
                    ],
                },
            },
        ];
    }
    async getAnimeId(r) {
        var n;
        const a = await this.totalSearch(r);
        return {
            data: (n = a == null ? void 0 : a[0]) == null ? void 0 : n.id,
        };
    }
    async loadEpisodes(r) {
        const n = await (
                await fetch(`${this.url}/thong-tin-phim/f${r}-a.html`)
            ).text(),
            u = ee(n)(".play-now").attr("href"),
            l = await (await fetch(u)).text(),
            c = ee(l);
        return c(".svep")
            .toArray()
            .flatMap((h) => {
                const f = c(h),
                    m = f.find(".svname").text().trim();
                return f
                    .find("a")
                    .toArray()
                    .map((x) => {
                        var A, v;
                        const C = c(x),
                            S =
                                (A = C.attr("id").split("_")[1]) == null
                                    ? void 0
                                    : A.toString(),
                            _ = C.text().trim(),
                            g =
                                (v = Me(_, "Full")) == null
                                    ? void 0
                                    : v.toString();
                        return !S || !g
                            ? null
                            : { section: m, id: S, number: g };
                    })
                    .filter(Boolean);
            });
    }
    async loadVideoServers(r) {
        await this.getCookiesAndCSRF();
        const a = ["TVN", "FB", "LOT"],
            s = await (
                await fetch(`${this.url}/ajax/getExtraLinks`, {
                    method: "post",
                    body: `epid=${r}`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-csrf-token": this.csrf,
                    },
                })
            ).json();
        return s != null && s.success
            ? s == null
                ? void 0
                : s.links
                      .map((o) => {
                          const l = o.name.split("-")[1];
                          return {
                              embed: "",
                              name: l,
                              extraData: { id: o.id.toString(), link: o.link },
                          };
                      })
                      .filter((o) => a.includes(o.name))
            : [];
    }
    async getCookiesAndCSRF() {
        if (this.csrf) return this.csrf;
        const a = await (await fetch(this.url)).text(),
            s = ee(a)("meta[name='csrf-token']").attr("content");
        this.csrf = s;
    }
    async loadVideoContainer(r, a) {
        const { id: n, link: s } = a,
            o = await (
                await fetch(`${this.url}/ajax/getExtraLink`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-csrf-token": this.csrf,
                    },
                    body: Ei({ id: n, link: s }),
                })
            ).json();
        if (r.name === "TVN") {
            const c = await (await fetch(o.link)).text(),
                d = ge(c, 'var idUser_enc = "', '"'),
                h = ge(c, 'var idfile_enc = "', '"');
            console.log(d, h);
            const f = `https://api-plhq.playhbq.xyz/apiv4/${d}/${h}`,
                p = await (
                    await fetch(f, {
                        method: "post",
                        body: `referrer=${encodeURIComponent(
                            this.url
                        )}&typeend=html`,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    })
                ).json();
            return p != null && p.data
                ? { videos: [{ file: { url: p == null ? void 0 : p.data } }] }
                : null;
        }
        if (r.name === "FB") {
            const d = (await (await fetch(o.link)).text())
                    .replace(/(\r\n|\n|\r)/gm, "")
                    .replace(/ +/g, ""),
                h = await er(ge(d, '"sources":', ",height"));
            return { videos: h.map((f) => ({ file: { url: f.file } })) };
        }
        if (r.name === "LOT") {
            const c = await (await fetch(o.link)).text(),
                d = ge(c, "Player('", "')"),
                h = atob(d);
            return { videos: [{ file: { url: h } }] };
        }
    }
    async search(r) {
        await this.getCookiesAndCSRF();
        const n = await (
                await fetch(`${this.url}/ajax/search`, {
                    method: "POST",
                    body: `key=${encodeURIComponent(r)}`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-csrf-token": this.csrf,
                    },
                })
            ).text(),
            s = ee(n);
        return s(".search-list .item")
            .map((l, c) => {
                const d = s(c).find("a.image"),
                    h = d.attr("href"),
                    f = d.find("img.thumb").attr("src"),
                    m = d.find("h3.title").text().trim(),
                    p = h.split(/f(\d+)-/)[1];
                return { thumbnail: f, title: m, id: p };
            })
            .get();
    }
}
var z0 = { exports: {} };
function Cf(e) {
    throw new Error(
        'Could not dynamically require "' +
            e +
            '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
    );
}
var Mr = { exports: {} };
const Nf = {},
    If = Object.freeze(
        Object.defineProperty(
            { __proto__: null, default: Nf },
            Symbol.toStringTag,
            { value: "Module" }
        )
    ),
    Sf = wu(If);
var zn;
function J() {
    return (
        zn ||
            ((zn = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a();
                })(j, function () {
                    var r =
                        r ||
                        (function (a, n) {
                            var s;
                            if (
                                (typeof window < "u" &&
                                    window.crypto &&
                                    (s = window.crypto),
                                typeof self < "u" &&
                                    self.crypto &&
                                    (s = self.crypto),
                                typeof globalThis < "u" &&
                                    globalThis.crypto &&
                                    (s = globalThis.crypto),
                                !s &&
                                    typeof window < "u" &&
                                    window.msCrypto &&
                                    (s = window.msCrypto),
                                !s &&
                                    typeof j < "u" &&
                                    j.crypto &&
                                    (s = j.crypto),
                                !s && typeof Cf == "function")
                            )
                                try {
                                    s = Sf;
                                } catch {}
                            var u = function () {
                                    if (s) {
                                        if (
                                            typeof s.getRandomValues ==
                                            "function"
                                        )
                                            try {
                                                return s.getRandomValues(
                                                    new Uint32Array(1)
                                                )[0];
                                            } catch {}
                                        if (typeof s.randomBytes == "function")
                                            try {
                                                return s
                                                    .randomBytes(4)
                                                    .readInt32LE();
                                            } catch {}
                                    }
                                    throw new Error(
                                        "Native crypto module could not be used to get secure random number."
                                    );
                                },
                                o =
                                    Object.create ||
                                    (function () {
                                        function _() {}
                                        return function (g) {
                                            var A;
                                            return (
                                                (_.prototype = g),
                                                (A = new _()),
                                                (_.prototype = null),
                                                A
                                            );
                                        };
                                    })(),
                                l = {},
                                c = (l.lib = {}),
                                d = (c.Base = (function () {
                                    return {
                                        extend: function (_) {
                                            var g = o(this);
                                            return (
                                                _ && g.mixIn(_),
                                                (!g.hasOwnProperty("init") ||
                                                    this.init === g.init) &&
                                                    (g.init = function () {
                                                        g.$super.init.apply(
                                                            this,
                                                            arguments
                                                        );
                                                    }),
                                                (g.init.prototype = g),
                                                (g.$super = this),
                                                g
                                            );
                                        },
                                        create: function () {
                                            var _ = this.extend();
                                            return (
                                                _.init.apply(_, arguments), _
                                            );
                                        },
                                        init: function () {},
                                        mixIn: function (_) {
                                            for (var g in _)
                                                _.hasOwnProperty(g) &&
                                                    (this[g] = _[g]);
                                            _.hasOwnProperty("toString") &&
                                                (this.toString = _.toString);
                                        },
                                        clone: function () {
                                            return this.init.prototype.extend(
                                                this
                                            );
                                        },
                                    };
                                })()),
                                h = (c.WordArray = d.extend({
                                    init: function (_, g) {
                                        (_ = this.words = _ || []),
                                            g != n
                                                ? (this.sigBytes = g)
                                                : (this.sigBytes =
                                                      _.length * 4);
                                    },
                                    toString: function (_) {
                                        return (_ || m).stringify(this);
                                    },
                                    concat: function (_) {
                                        var g = this.words,
                                            A = _.words,
                                            v = this.sigBytes,
                                            y = _.sigBytes;
                                        if ((this.clamp(), v % 4))
                                            for (var D = 0; D < y; D++) {
                                                var P =
                                                    (A[D >>> 2] >>>
                                                        (24 - (D % 4) * 8)) &
                                                    255;
                                                g[(v + D) >>> 2] |=
                                                    P <<
                                                    (24 - ((v + D) % 4) * 8);
                                            }
                                        else
                                            for (var Y = 0; Y < y; Y += 4)
                                                g[(v + Y) >>> 2] = A[Y >>> 2];
                                        return (this.sigBytes += y), this;
                                    },
                                    clamp: function () {
                                        var _ = this.words,
                                            g = this.sigBytes;
                                        (_[g >>> 2] &=
                                            4294967295 << (32 - (g % 4) * 8)),
                                            (_.length = a.ceil(g / 4));
                                    },
                                    clone: function () {
                                        var _ = d.clone.call(this);
                                        return (
                                            (_.words = this.words.slice(0)), _
                                        );
                                    },
                                    random: function (_) {
                                        for (var g = [], A = 0; A < _; A += 4)
                                            g.push(u());
                                        return new h.init(g, _);
                                    },
                                })),
                                f = (l.enc = {}),
                                m = (f.Hex = {
                                    stringify: function (_) {
                                        for (
                                            var g = _.words,
                                                A = _.sigBytes,
                                                v = [],
                                                y = 0;
                                            y < A;
                                            y++
                                        ) {
                                            var D =
                                                (g[y >>> 2] >>>
                                                    (24 - (y % 4) * 8)) &
                                                255;
                                            v.push((D >>> 4).toString(16)),
                                                v.push((D & 15).toString(16));
                                        }
                                        return v.join("");
                                    },
                                    parse: function (_) {
                                        for (
                                            var g = _.length, A = [], v = 0;
                                            v < g;
                                            v += 2
                                        )
                                            A[v >>> 3] |=
                                                parseInt(_.substr(v, 2), 16) <<
                                                (24 - (v % 8) * 4);
                                        return new h.init(A, g / 2);
                                    },
                                }),
                                p = (f.Latin1 = {
                                    stringify: function (_) {
                                        for (
                                            var g = _.words,
                                                A = _.sigBytes,
                                                v = [],
                                                y = 0;
                                            y < A;
                                            y++
                                        ) {
                                            var D =
                                                (g[y >>> 2] >>>
                                                    (24 - (y % 4) * 8)) &
                                                255;
                                            v.push(String.fromCharCode(D));
                                        }
                                        return v.join("");
                                    },
                                    parse: function (_) {
                                        for (
                                            var g = _.length, A = [], v = 0;
                                            v < g;
                                            v++
                                        )
                                            A[v >>> 2] |=
                                                (_.charCodeAt(v) & 255) <<
                                                (24 - (v % 4) * 8);
                                        return new h.init(A, g);
                                    },
                                }),
                                x = (f.Utf8 = {
                                    stringify: function (_) {
                                        try {
                                            return decodeURIComponent(
                                                escape(p.stringify(_))
                                            );
                                        } catch {
                                            throw new Error(
                                                "Malformed UTF-8 data"
                                            );
                                        }
                                    },
                                    parse: function (_) {
                                        return p.parse(
                                            unescape(encodeURIComponent(_))
                                        );
                                    },
                                }),
                                C = (c.BufferedBlockAlgorithm = d.extend({
                                    reset: function () {
                                        (this._data = new h.init()),
                                            (this._nDataBytes = 0);
                                    },
                                    _append: function (_) {
                                        typeof _ == "string" &&
                                            (_ = x.parse(_)),
                                            this._data.concat(_),
                                            (this._nDataBytes += _.sigBytes);
                                    },
                                    _process: function (_) {
                                        var g,
                                            A = this._data,
                                            v = A.words,
                                            y = A.sigBytes,
                                            D = this.blockSize,
                                            P = D * 4,
                                            Y = y / P;
                                        _
                                            ? (Y = a.ceil(Y))
                                            : (Y = a.max(
                                                  (Y | 0) - this._minBufferSize,
                                                  0
                                              ));
                                        var N = Y * D,
                                            R = a.min(N * 4, y);
                                        if (N) {
                                            for (var w = 0; w < N; w += D)
                                                this._doProcessBlock(v, w);
                                            (g = v.splice(0, N)),
                                                (A.sigBytes -= R);
                                        }
                                        return new h.init(g, R);
                                    },
                                    clone: function () {
                                        var _ = d.clone.call(this);
                                        return (
                                            (_._data = this._data.clone()), _
                                        );
                                    },
                                    _minBufferSize: 0,
                                }));
                            c.Hasher = C.extend({
                                cfg: d.extend(),
                                init: function (_) {
                                    (this.cfg = this.cfg.extend(_)),
                                        this.reset();
                                },
                                reset: function () {
                                    C.reset.call(this), this._doReset();
                                },
                                update: function (_) {
                                    return (
                                        this._append(_), this._process(), this
                                    );
                                },
                                finalize: function (_) {
                                    _ && this._append(_);
                                    var g = this._doFinalize();
                                    return g;
                                },
                                blockSize: 16,
                                _createHelper: function (_) {
                                    return function (g, A) {
                                        return new _.init(A).finalize(g);
                                    };
                                },
                                _createHmacHelper: function (_) {
                                    return function (g, A) {
                                        return new S.HMAC.init(_, A).finalize(
                                            g
                                        );
                                    };
                                },
                            });
                            var S = (l.algo = {});
                            return l;
                        })(Math);
                    return r;
                });
            })(Mr)),
        Mr.exports
    );
}
var Hr = { exports: {} },
    jn;
function Cr() {
    return (
        jn ||
            ((jn = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.Base,
                                o = s.WordArray,
                                l = (n.x64 = {});
                            (l.Word = u.extend({
                                init: function (c, d) {
                                    (this.high = c), (this.low = d);
                                },
                            })),
                                (l.WordArray = u.extend({
                                    init: function (c, d) {
                                        (c = this.words = c || []),
                                            d != a
                                                ? (this.sigBytes = d)
                                                : (this.sigBytes =
                                                      c.length * 8);
                                    },
                                    toX32: function () {
                                        for (
                                            var c = this.words,
                                                d = c.length,
                                                h = [],
                                                f = 0;
                                            f < d;
                                            f++
                                        ) {
                                            var m = c[f];
                                            h.push(m.high), h.push(m.low);
                                        }
                                        return o.create(h, this.sigBytes);
                                    },
                                    clone: function () {
                                        for (
                                            var c = u.clone.call(this),
                                                d = (c.words =
                                                    this.words.slice(0)),
                                                h = d.length,
                                                f = 0;
                                            f < h;
                                            f++
                                        )
                                            d[f] = d[f].clone();
                                        return c;
                                    },
                                }));
                        })(),
                        r
                    );
                });
            })(Hr)),
        Hr.exports
    );
}
var Fr = { exports: {} },
    Kn;
function Rf() {
    return (
        Kn ||
            ((Kn = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function () {
                            if (typeof ArrayBuffer == "function") {
                                var a = r,
                                    n = a.lib,
                                    s = n.WordArray,
                                    u = s.init,
                                    o = (s.init = function (l) {
                                        if (
                                            (l instanceof ArrayBuffer &&
                                                (l = new Uint8Array(l)),
                                            (l instanceof Int8Array ||
                                                (typeof Uint8ClampedArray <
                                                    "u" &&
                                                    l instanceof
                                                        Uint8ClampedArray) ||
                                                l instanceof Int16Array ||
                                                l instanceof Uint16Array ||
                                                l instanceof Int32Array ||
                                                l instanceof Uint32Array ||
                                                l instanceof Float32Array ||
                                                l instanceof Float64Array) &&
                                                (l = new Uint8Array(
                                                    l.buffer,
                                                    l.byteOffset,
                                                    l.byteLength
                                                )),
                                            l instanceof Uint8Array)
                                        ) {
                                            for (
                                                var c = l.byteLength,
                                                    d = [],
                                                    h = 0;
                                                h < c;
                                                h++
                                            )
                                                d[h >>> 2] |=
                                                    l[h] << (24 - (h % 4) * 8);
                                            u.call(this, d, c);
                                        } else u.apply(this, arguments);
                                    });
                                o.prototype = s;
                            }
                        })(),
                        r.lib.WordArray
                    );
                });
            })(Fr)),
        Fr.exports
    );
}
var Ur = { exports: {} },
    Zn;
function vf() {
    return (
        Zn ||
            ((Zn = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.WordArray,
                                u = a.enc;
                            (u.Utf16 = u.Utf16BE =
                                {
                                    stringify: function (l) {
                                        for (
                                            var c = l.words,
                                                d = l.sigBytes,
                                                h = [],
                                                f = 0;
                                            f < d;
                                            f += 2
                                        ) {
                                            var m =
                                                (c[f >>> 2] >>>
                                                    (16 - (f % 4) * 8)) &
                                                65535;
                                            h.push(String.fromCharCode(m));
                                        }
                                        return h.join("");
                                    },
                                    parse: function (l) {
                                        for (
                                            var c = l.length, d = [], h = 0;
                                            h < c;
                                            h++
                                        )
                                            d[h >>> 1] |=
                                                l.charCodeAt(h) <<
                                                (16 - (h % 2) * 16);
                                        return s.create(d, c * 2);
                                    },
                                }),
                                (u.Utf16LE = {
                                    stringify: function (l) {
                                        for (
                                            var c = l.words,
                                                d = l.sigBytes,
                                                h = [],
                                                f = 0;
                                            f < d;
                                            f += 2
                                        ) {
                                            var m = o(
                                                (c[f >>> 2] >>>
                                                    (16 - (f % 4) * 8)) &
                                                    65535
                                            );
                                            h.push(String.fromCharCode(m));
                                        }
                                        return h.join("");
                                    },
                                    parse: function (l) {
                                        for (
                                            var c = l.length, d = [], h = 0;
                                            h < c;
                                            h++
                                        )
                                            d[h >>> 1] |= o(
                                                l.charCodeAt(h) <<
                                                    (16 - (h % 2) * 16)
                                            );
                                        return s.create(d, c * 2);
                                    },
                                });
                            function o(l) {
                                return (
                                    ((l << 8) & 4278255360) |
                                    ((l >>> 8) & 16711935)
                                );
                            }
                        })(),
                        r.enc.Utf16
                    );
                });
            })(Ur)),
        Ur.exports
    );
}
var qr = { exports: {} },
    Jn;
function pt() {
    return (
        Jn ||
            ((Jn = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.WordArray,
                                u = a.enc;
                            u.Base64 = {
                                stringify: function (l) {
                                    var c = l.words,
                                        d = l.sigBytes,
                                        h = this._map;
                                    l.clamp();
                                    for (var f = [], m = 0; m < d; m += 3)
                                        for (
                                            var p =
                                                    (c[m >>> 2] >>>
                                                        (24 - (m % 4) * 8)) &
                                                    255,
                                                x =
                                                    (c[(m + 1) >>> 2] >>>
                                                        (24 -
                                                            ((m + 1) % 4) *
                                                                8)) &
                                                    255,
                                                C =
                                                    (c[(m + 2) >>> 2] >>>
                                                        (24 -
                                                            ((m + 2) % 4) *
                                                                8)) &
                                                    255,
                                                S = (p << 16) | (x << 8) | C,
                                                _ = 0;
                                            _ < 4 && m + _ * 0.75 < d;
                                            _++
                                        )
                                            f.push(
                                                h.charAt(
                                                    (S >>> (6 * (3 - _))) & 63
                                                )
                                            );
                                    var g = h.charAt(64);
                                    if (g) for (; f.length % 4; ) f.push(g);
                                    return f.join("");
                                },
                                parse: function (l) {
                                    var c = l.length,
                                        d = this._map,
                                        h = this._reverseMap;
                                    if (!h) {
                                        h = this._reverseMap = [];
                                        for (var f = 0; f < d.length; f++)
                                            h[d.charCodeAt(f)] = f;
                                    }
                                    var m = d.charAt(64);
                                    if (m) {
                                        var p = l.indexOf(m);
                                        p !== -1 && (c = p);
                                    }
                                    return o(l, c, h);
                                },
                                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            };
                            function o(l, c, d) {
                                for (var h = [], f = 0, m = 0; m < c; m++)
                                    if (m % 4) {
                                        var p =
                                                d[l.charCodeAt(m - 1)] <<
                                                ((m % 4) * 2),
                                            x =
                                                d[l.charCodeAt(m)] >>>
                                                (6 - (m % 4) * 2),
                                            C = p | x;
                                        (h[f >>> 2] |= C << (24 - (f % 4) * 8)),
                                            f++;
                                    }
                                return s.create(h, f);
                            }
                        })(),
                        r.enc.Base64
                    );
                });
            })(qr)),
        qr.exports
    );
}
var Yr = { exports: {} },
    es;
function yf() {
    return (
        es ||
            ((es = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.WordArray,
                                u = a.enc;
                            u.Base64url = {
                                stringify: function (l, c = !0) {
                                    var d = l.words,
                                        h = l.sigBytes,
                                        f = c ? this._safe_map : this._map;
                                    l.clamp();
                                    for (var m = [], p = 0; p < h; p += 3)
                                        for (
                                            var x =
                                                    (d[p >>> 2] >>>
                                                        (24 - (p % 4) * 8)) &
                                                    255,
                                                C =
                                                    (d[(p + 1) >>> 2] >>>
                                                        (24 -
                                                            ((p + 1) % 4) *
                                                                8)) &
                                                    255,
                                                S =
                                                    (d[(p + 2) >>> 2] >>>
                                                        (24 -
                                                            ((p + 2) % 4) *
                                                                8)) &
                                                    255,
                                                _ = (x << 16) | (C << 8) | S,
                                                g = 0;
                                            g < 4 && p + g * 0.75 < h;
                                            g++
                                        )
                                            m.push(
                                                f.charAt(
                                                    (_ >>> (6 * (3 - g))) & 63
                                                )
                                            );
                                    var A = f.charAt(64);
                                    if (A) for (; m.length % 4; ) m.push(A);
                                    return m.join("");
                                },
                                parse: function (l, c = !0) {
                                    var d = l.length,
                                        h = c ? this._safe_map : this._map,
                                        f = this._reverseMap;
                                    if (!f) {
                                        f = this._reverseMap = [];
                                        for (var m = 0; m < h.length; m++)
                                            f[h.charCodeAt(m)] = m;
                                    }
                                    var p = h.charAt(64);
                                    if (p) {
                                        var x = l.indexOf(p);
                                        x !== -1 && (d = x);
                                    }
                                    return o(l, d, f);
                                },
                                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                                _safe_map:
                                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
                            };
                            function o(l, c, d) {
                                for (var h = [], f = 0, m = 0; m < c; m++)
                                    if (m % 4) {
                                        var p =
                                                d[l.charCodeAt(m - 1)] <<
                                                ((m % 4) * 2),
                                            x =
                                                d[l.charCodeAt(m)] >>>
                                                (6 - (m % 4) * 2),
                                            C = p | x;
                                        (h[f >>> 2] |= C << (24 - (f % 4) * 8)),
                                            f++;
                                    }
                                return s.create(h, f);
                            }
                        })(),
                        r.enc.Base64url
                    );
                });
            })(Yr)),
        Yr.exports
    );
}
var $r = { exports: {} },
    ts;
function mt() {
    return (
        ts ||
            ((ts = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.WordArray,
                                o = s.Hasher,
                                l = n.algo,
                                c = [];
                            (function () {
                                for (var x = 0; x < 64; x++)
                                    c[x] =
                                        (a.abs(a.sin(x + 1)) * 4294967296) | 0;
                            })();
                            var d = (l.MD5 = o.extend({
                                _doReset: function () {
                                    this._hash = new u.init([
                                        1732584193, 4023233417, 2562383102,
                                        271733878,
                                    ]);
                                },
                                _doProcessBlock: function (x, C) {
                                    for (var S = 0; S < 16; S++) {
                                        var _ = C + S,
                                            g = x[_];
                                        x[_] =
                                            (((g << 8) | (g >>> 24)) &
                                                16711935) |
                                            (((g << 24) | (g >>> 8)) &
                                                4278255360);
                                    }
                                    var A = this._hash.words,
                                        v = x[C + 0],
                                        y = x[C + 1],
                                        D = x[C + 2],
                                        P = x[C + 3],
                                        Y = x[C + 4],
                                        N = x[C + 5],
                                        R = x[C + 6],
                                        w = x[C + 7],
                                        H = x[C + 8],
                                        W = x[C + 9],
                                        V = x[C + 10],
                                        K = x[C + 11],
                                        ue = x[C + 12],
                                        re = x[C + 13],
                                        se = x[C + 14],
                                        ae = x[C + 15],
                                        k = A[0],
                                        U = A[1],
                                        q = A[2],
                                        M = A[3];
                                    (k = h(k, U, q, M, v, 7, c[0])),
                                        (M = h(M, k, U, q, y, 12, c[1])),
                                        (q = h(q, M, k, U, D, 17, c[2])),
                                        (U = h(U, q, M, k, P, 22, c[3])),
                                        (k = h(k, U, q, M, Y, 7, c[4])),
                                        (M = h(M, k, U, q, N, 12, c[5])),
                                        (q = h(q, M, k, U, R, 17, c[6])),
                                        (U = h(U, q, M, k, w, 22, c[7])),
                                        (k = h(k, U, q, M, H, 7, c[8])),
                                        (M = h(M, k, U, q, W, 12, c[9])),
                                        (q = h(q, M, k, U, V, 17, c[10])),
                                        (U = h(U, q, M, k, K, 22, c[11])),
                                        (k = h(k, U, q, M, ue, 7, c[12])),
                                        (M = h(M, k, U, q, re, 12, c[13])),
                                        (q = h(q, M, k, U, se, 17, c[14])),
                                        (U = h(U, q, M, k, ae, 22, c[15])),
                                        (k = f(k, U, q, M, y, 5, c[16])),
                                        (M = f(M, k, U, q, R, 9, c[17])),
                                        (q = f(q, M, k, U, K, 14, c[18])),
                                        (U = f(U, q, M, k, v, 20, c[19])),
                                        (k = f(k, U, q, M, N, 5, c[20])),
                                        (M = f(M, k, U, q, V, 9, c[21])),
                                        (q = f(q, M, k, U, ae, 14, c[22])),
                                        (U = f(U, q, M, k, Y, 20, c[23])),
                                        (k = f(k, U, q, M, W, 5, c[24])),
                                        (M = f(M, k, U, q, se, 9, c[25])),
                                        (q = f(q, M, k, U, P, 14, c[26])),
                                        (U = f(U, q, M, k, H, 20, c[27])),
                                        (k = f(k, U, q, M, re, 5, c[28])),
                                        (M = f(M, k, U, q, D, 9, c[29])),
                                        (q = f(q, M, k, U, w, 14, c[30])),
                                        (U = f(U, q, M, k, ue, 20, c[31])),
                                        (k = m(k, U, q, M, N, 4, c[32])),
                                        (M = m(M, k, U, q, H, 11, c[33])),
                                        (q = m(q, M, k, U, K, 16, c[34])),
                                        (U = m(U, q, M, k, se, 23, c[35])),
                                        (k = m(k, U, q, M, y, 4, c[36])),
                                        (M = m(M, k, U, q, Y, 11, c[37])),
                                        (q = m(q, M, k, U, w, 16, c[38])),
                                        (U = m(U, q, M, k, V, 23, c[39])),
                                        (k = m(k, U, q, M, re, 4, c[40])),
                                        (M = m(M, k, U, q, v, 11, c[41])),
                                        (q = m(q, M, k, U, P, 16, c[42])),
                                        (U = m(U, q, M, k, R, 23, c[43])),
                                        (k = m(k, U, q, M, W, 4, c[44])),
                                        (M = m(M, k, U, q, ue, 11, c[45])),
                                        (q = m(q, M, k, U, ae, 16, c[46])),
                                        (U = m(U, q, M, k, D, 23, c[47])),
                                        (k = p(k, U, q, M, v, 6, c[48])),
                                        (M = p(M, k, U, q, w, 10, c[49])),
                                        (q = p(q, M, k, U, se, 15, c[50])),
                                        (U = p(U, q, M, k, N, 21, c[51])),
                                        (k = p(k, U, q, M, ue, 6, c[52])),
                                        (M = p(M, k, U, q, P, 10, c[53])),
                                        (q = p(q, M, k, U, V, 15, c[54])),
                                        (U = p(U, q, M, k, y, 21, c[55])),
                                        (k = p(k, U, q, M, H, 6, c[56])),
                                        (M = p(M, k, U, q, ae, 10, c[57])),
                                        (q = p(q, M, k, U, R, 15, c[58])),
                                        (U = p(U, q, M, k, re, 21, c[59])),
                                        (k = p(k, U, q, M, Y, 6, c[60])),
                                        (M = p(M, k, U, q, K, 10, c[61])),
                                        (q = p(q, M, k, U, D, 15, c[62])),
                                        (U = p(U, q, M, k, W, 21, c[63])),
                                        (A[0] = (A[0] + k) | 0),
                                        (A[1] = (A[1] + U) | 0),
                                        (A[2] = (A[2] + q) | 0),
                                        (A[3] = (A[3] + M) | 0);
                                },
                                _doFinalize: function () {
                                    var x = this._data,
                                        C = x.words,
                                        S = this._nDataBytes * 8,
                                        _ = x.sigBytes * 8;
                                    C[_ >>> 5] |= 128 << (24 - (_ % 32));
                                    var g = a.floor(S / 4294967296),
                                        A = S;
                                    (C[(((_ + 64) >>> 9) << 4) + 15] =
                                        (((g << 8) | (g >>> 24)) & 16711935) |
                                        (((g << 24) | (g >>> 8)) & 4278255360)),
                                        (C[(((_ + 64) >>> 9) << 4) + 14] =
                                            (((A << 8) | (A >>> 24)) &
                                                16711935) |
                                            (((A << 24) | (A >>> 8)) &
                                                4278255360)),
                                        (x.sigBytes = (C.length + 1) * 4),
                                        this._process();
                                    for (
                                        var v = this._hash, y = v.words, D = 0;
                                        D < 4;
                                        D++
                                    ) {
                                        var P = y[D];
                                        y[D] =
                                            (((P << 8) | (P >>> 24)) &
                                                16711935) |
                                            (((P << 24) | (P >>> 8)) &
                                                4278255360);
                                    }
                                    return v;
                                },
                                clone: function () {
                                    var x = o.clone.call(this);
                                    return (x._hash = this._hash.clone()), x;
                                },
                            }));
                            function h(x, C, S, _, g, A, v) {
                                var y = x + ((C & S) | (~C & _)) + g + v;
                                return ((y << A) | (y >>> (32 - A))) + C;
                            }
                            function f(x, C, S, _, g, A, v) {
                                var y = x + ((C & _) | (S & ~_)) + g + v;
                                return ((y << A) | (y >>> (32 - A))) + C;
                            }
                            function m(x, C, S, _, g, A, v) {
                                var y = x + (C ^ S ^ _) + g + v;
                                return ((y << A) | (y >>> (32 - A))) + C;
                            }
                            function p(x, C, S, _, g, A, v) {
                                var y = x + (S ^ (C | ~_)) + g + v;
                                return ((y << A) | (y >>> (32 - A))) + C;
                            }
                            (n.MD5 = o._createHelper(d)),
                                (n.HmacMD5 = o._createHmacHelper(d));
                        })(Math),
                        r.MD5
                    );
                });
            })($r)),
        $r.exports
    );
}
var Wr = { exports: {} },
    rs;
function Za() {
    return (
        rs ||
            ((rs = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.WordArray,
                                u = n.Hasher,
                                o = a.algo,
                                l = [],
                                c = (o.SHA1 = u.extend({
                                    _doReset: function () {
                                        this._hash = new s.init([
                                            1732584193, 4023233417, 2562383102,
                                            271733878, 3285377520,
                                        ]);
                                    },
                                    _doProcessBlock: function (d, h) {
                                        for (
                                            var f = this._hash.words,
                                                m = f[0],
                                                p = f[1],
                                                x = f[2],
                                                C = f[3],
                                                S = f[4],
                                                _ = 0;
                                            _ < 80;
                                            _++
                                        ) {
                                            if (_ < 16) l[_] = d[h + _] | 0;
                                            else {
                                                var g =
                                                    l[_ - 3] ^
                                                    l[_ - 8] ^
                                                    l[_ - 14] ^
                                                    l[_ - 16];
                                                l[_] = (g << 1) | (g >>> 31);
                                            }
                                            var A =
                                                ((m << 5) | (m >>> 27)) +
                                                S +
                                                l[_];
                                            _ < 20
                                                ? (A +=
                                                      ((p & x) | (~p & C)) +
                                                      1518500249)
                                                : _ < 40
                                                ? (A +=
                                                      (p ^ x ^ C) + 1859775393)
                                                : _ < 60
                                                ? (A +=
                                                      ((p & x) |
                                                          (p & C) |
                                                          (x & C)) -
                                                      1894007588)
                                                : (A +=
                                                      (p ^ x ^ C) - 899497514),
                                                (S = C),
                                                (C = x),
                                                (x = (p << 30) | (p >>> 2)),
                                                (p = m),
                                                (m = A);
                                        }
                                        (f[0] = (f[0] + m) | 0),
                                            (f[1] = (f[1] + p) | 0),
                                            (f[2] = (f[2] + x) | 0),
                                            (f[3] = (f[3] + C) | 0),
                                            (f[4] = (f[4] + S) | 0);
                                    },
                                    _doFinalize: function () {
                                        var d = this._data,
                                            h = d.words,
                                            f = this._nDataBytes * 8,
                                            m = d.sigBytes * 8;
                                        return (
                                            (h[m >>> 5] |=
                                                128 << (24 - (m % 32))),
                                            (h[(((m + 64) >>> 9) << 4) + 14] =
                                                Math.floor(f / 4294967296)),
                                            (h[(((m + 64) >>> 9) << 4) + 15] =
                                                f),
                                            (d.sigBytes = h.length * 4),
                                            this._process(),
                                            this._hash
                                        );
                                    },
                                    clone: function () {
                                        var d = u.clone.call(this);
                                        return (
                                            (d._hash = this._hash.clone()), d
                                        );
                                    },
                                }));
                            (a.SHA1 = u._createHelper(c)),
                                (a.HmacSHA1 = u._createHmacHelper(c));
                        })(),
                        r.SHA1
                    );
                });
            })(Wr)),
        Wr.exports
    );
}
var Gr = { exports: {} },
    as;
function j0() {
    return (
        as ||
            ((as = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    return (
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.WordArray,
                                o = s.Hasher,
                                l = n.algo,
                                c = [],
                                d = [];
                            (function () {
                                function m(S) {
                                    for (var _ = a.sqrt(S), g = 2; g <= _; g++)
                                        if (!(S % g)) return !1;
                                    return !0;
                                }
                                function p(S) {
                                    return ((S - (S | 0)) * 4294967296) | 0;
                                }
                                for (var x = 2, C = 0; C < 64; )
                                    m(x) &&
                                        (C < 8 && (c[C] = p(a.pow(x, 1 / 2))),
                                        (d[C] = p(a.pow(x, 1 / 3))),
                                        C++),
                                        x++;
                            })();
                            var h = [],
                                f = (l.SHA256 = o.extend({
                                    _doReset: function () {
                                        this._hash = new u.init(c.slice(0));
                                    },
                                    _doProcessBlock: function (m, p) {
                                        for (
                                            var x = this._hash.words,
                                                C = x[0],
                                                S = x[1],
                                                _ = x[2],
                                                g = x[3],
                                                A = x[4],
                                                v = x[5],
                                                y = x[6],
                                                D = x[7],
                                                P = 0;
                                            P < 64;
                                            P++
                                        ) {
                                            if (P < 16) h[P] = m[p + P] | 0;
                                            else {
                                                var Y = h[P - 15],
                                                    N =
                                                        ((Y << 25) |
                                                            (Y >>> 7)) ^
                                                        ((Y << 14) |
                                                            (Y >>> 18)) ^
                                                        (Y >>> 3),
                                                    R = h[P - 2],
                                                    w =
                                                        ((R << 15) |
                                                            (R >>> 17)) ^
                                                        ((R << 13) |
                                                            (R >>> 19)) ^
                                                        (R >>> 10);
                                                h[P] =
                                                    N +
                                                    h[P - 7] +
                                                    w +
                                                    h[P - 16];
                                            }
                                            var H = (A & v) ^ (~A & y),
                                                W = (C & S) ^ (C & _) ^ (S & _),
                                                V =
                                                    ((C << 30) | (C >>> 2)) ^
                                                    ((C << 19) | (C >>> 13)) ^
                                                    ((C << 10) | (C >>> 22)),
                                                K =
                                                    ((A << 26) | (A >>> 6)) ^
                                                    ((A << 21) | (A >>> 11)) ^
                                                    ((A << 7) | (A >>> 25)),
                                                ue = D + K + H + d[P] + h[P],
                                                re = V + W;
                                            (D = y),
                                                (y = v),
                                                (v = A),
                                                (A = (g + ue) | 0),
                                                (g = _),
                                                (_ = S),
                                                (S = C),
                                                (C = (ue + re) | 0);
                                        }
                                        (x[0] = (x[0] + C) | 0),
                                            (x[1] = (x[1] + S) | 0),
                                            (x[2] = (x[2] + _) | 0),
                                            (x[3] = (x[3] + g) | 0),
                                            (x[4] = (x[4] + A) | 0),
                                            (x[5] = (x[5] + v) | 0),
                                            (x[6] = (x[6] + y) | 0),
                                            (x[7] = (x[7] + D) | 0);
                                    },
                                    _doFinalize: function () {
                                        var m = this._data,
                                            p = m.words,
                                            x = this._nDataBytes * 8,
                                            C = m.sigBytes * 8;
                                        return (
                                            (p[C >>> 5] |=
                                                128 << (24 - (C % 32))),
                                            (p[(((C + 64) >>> 9) << 4) + 14] =
                                                a.floor(x / 4294967296)),
                                            (p[(((C + 64) >>> 9) << 4) + 15] =
                                                x),
                                            (m.sigBytes = p.length * 4),
                                            this._process(),
                                            this._hash
                                        );
                                    },
                                    clone: function () {
                                        var m = o.clone.call(this);
                                        return (
                                            (m._hash = this._hash.clone()), m
                                        );
                                    },
                                }));
                            (n.SHA256 = o._createHelper(f)),
                                (n.HmacSHA256 = o._createHmacHelper(f));
                        })(Math),
                        r.SHA256
                    );
                });
            })(Gr)),
        Gr.exports
    );
}
var Vr = { exports: {} },
    ns;
function Of() {
    return (
        ns ||
            ((ns = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), j0());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.WordArray,
                                u = a.algo,
                                o = u.SHA256,
                                l = (u.SHA224 = o.extend({
                                    _doReset: function () {
                                        this._hash = new s.init([
                                            3238371032, 914150663, 812702999,
                                            4144912697, 4290775857, 1750603025,
                                            1694076839, 3204075428,
                                        ]);
                                    },
                                    _doFinalize: function () {
                                        var c = o._doFinalize.call(this);
                                        return (c.sigBytes -= 4), c;
                                    },
                                }));
                            (a.SHA224 = o._createHelper(l)),
                                (a.HmacSHA224 = o._createHmacHelper(l));
                        })(),
                        r.SHA224
                    );
                });
            })(Vr)),
        Vr.exports
    );
}
var Qr = { exports: {} },
    ss;
function K0() {
    return (
        ss ||
            ((ss = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), Cr());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.Hasher,
                                u = a.x64,
                                o = u.Word,
                                l = u.WordArray,
                                c = a.algo;
                            function d() {
                                return o.create.apply(o, arguments);
                            }
                            var h = [
                                    d(1116352408, 3609767458),
                                    d(1899447441, 602891725),
                                    d(3049323471, 3964484399),
                                    d(3921009573, 2173295548),
                                    d(961987163, 4081628472),
                                    d(1508970993, 3053834265),
                                    d(2453635748, 2937671579),
                                    d(2870763221, 3664609560),
                                    d(3624381080, 2734883394),
                                    d(310598401, 1164996542),
                                    d(607225278, 1323610764),
                                    d(1426881987, 3590304994),
                                    d(1925078388, 4068182383),
                                    d(2162078206, 991336113),
                                    d(2614888103, 633803317),
                                    d(3248222580, 3479774868),
                                    d(3835390401, 2666613458),
                                    d(4022224774, 944711139),
                                    d(264347078, 2341262773),
                                    d(604807628, 2007800933),
                                    d(770255983, 1495990901),
                                    d(1249150122, 1856431235),
                                    d(1555081692, 3175218132),
                                    d(1996064986, 2198950837),
                                    d(2554220882, 3999719339),
                                    d(2821834349, 766784016),
                                    d(2952996808, 2566594879),
                                    d(3210313671, 3203337956),
                                    d(3336571891, 1034457026),
                                    d(3584528711, 2466948901),
                                    d(113926993, 3758326383),
                                    d(338241895, 168717936),
                                    d(666307205, 1188179964),
                                    d(773529912, 1546045734),
                                    d(1294757372, 1522805485),
                                    d(1396182291, 2643833823),
                                    d(1695183700, 2343527390),
                                    d(1986661051, 1014477480),
                                    d(2177026350, 1206759142),
                                    d(2456956037, 344077627),
                                    d(2730485921, 1290863460),
                                    d(2820302411, 3158454273),
                                    d(3259730800, 3505952657),
                                    d(3345764771, 106217008),
                                    d(3516065817, 3606008344),
                                    d(3600352804, 1432725776),
                                    d(4094571909, 1467031594),
                                    d(275423344, 851169720),
                                    d(430227734, 3100823752),
                                    d(506948616, 1363258195),
                                    d(659060556, 3750685593),
                                    d(883997877, 3785050280),
                                    d(958139571, 3318307427),
                                    d(1322822218, 3812723403),
                                    d(1537002063, 2003034995),
                                    d(1747873779, 3602036899),
                                    d(1955562222, 1575990012),
                                    d(2024104815, 1125592928),
                                    d(2227730452, 2716904306),
                                    d(2361852424, 442776044),
                                    d(2428436474, 593698344),
                                    d(2756734187, 3733110249),
                                    d(3204031479, 2999351573),
                                    d(3329325298, 3815920427),
                                    d(3391569614, 3928383900),
                                    d(3515267271, 566280711),
                                    d(3940187606, 3454069534),
                                    d(4118630271, 4000239992),
                                    d(116418474, 1914138554),
                                    d(174292421, 2731055270),
                                    d(289380356, 3203993006),
                                    d(460393269, 320620315),
                                    d(685471733, 587496836),
                                    d(852142971, 1086792851),
                                    d(1017036298, 365543100),
                                    d(1126000580, 2618297676),
                                    d(1288033470, 3409855158),
                                    d(1501505948, 4234509866),
                                    d(1607167915, 987167468),
                                    d(1816402316, 1246189591),
                                ],
                                f = [];
                            (function () {
                                for (var p = 0; p < 80; p++) f[p] = d();
                            })();
                            var m = (c.SHA512 = s.extend({
                                _doReset: function () {
                                    this._hash = new l.init([
                                        new o.init(1779033703, 4089235720),
                                        new o.init(3144134277, 2227873595),
                                        new o.init(1013904242, 4271175723),
                                        new o.init(2773480762, 1595750129),
                                        new o.init(1359893119, 2917565137),
                                        new o.init(2600822924, 725511199),
                                        new o.init(528734635, 4215389547),
                                        new o.init(1541459225, 327033209),
                                    ]);
                                },
                                _doProcessBlock: function (p, x) {
                                    for (
                                        var C = this._hash.words,
                                            S = C[0],
                                            _ = C[1],
                                            g = C[2],
                                            A = C[3],
                                            v = C[4],
                                            y = C[5],
                                            D = C[6],
                                            P = C[7],
                                            Y = S.high,
                                            N = S.low,
                                            R = _.high,
                                            w = _.low,
                                            H = g.high,
                                            W = g.low,
                                            V = A.high,
                                            K = A.low,
                                            ue = v.high,
                                            re = v.low,
                                            se = y.high,
                                            ae = y.low,
                                            k = D.high,
                                            U = D.low,
                                            q = P.high,
                                            M = P.low,
                                            oe = Y,
                                            ie = N,
                                            pe = R,
                                            z = w,
                                            Tt = H,
                                            rt = W,
                                            Nr = V,
                                            bt = K,
                                            Re = ue,
                                            Ae = re,
                                            $t = se,
                                            xt = ae,
                                            Wt = k,
                                            _t = U,
                                            Ir = q,
                                            gt = M,
                                            ve = 0;
                                        ve < 80;
                                        ve++
                                    ) {
                                        var Ie,
                                            He,
                                            Gt = f[ve];
                                        if (ve < 16)
                                            (He = Gt.high = p[x + ve * 2] | 0),
                                                (Ie = Gt.low =
                                                    p[x + ve * 2 + 1] | 0);
                                        else {
                                            var en = f[ve - 15],
                                                at = en.high,
                                                At = en.low,
                                                J0 =
                                                    ((at >>> 1) | (At << 31)) ^
                                                    ((at >>> 8) | (At << 24)) ^
                                                    (at >>> 7),
                                                tn =
                                                    ((At >>> 1) | (at << 31)) ^
                                                    ((At >>> 8) | (at << 24)) ^
                                                    ((At >>> 7) | (at << 25)),
                                                rn = f[ve - 2],
                                                nt = rn.high,
                                                Ct = rn.low,
                                                ei =
                                                    ((nt >>> 19) | (Ct << 13)) ^
                                                    ((nt << 3) | (Ct >>> 29)) ^
                                                    (nt >>> 6),
                                                an =
                                                    ((Ct >>> 19) | (nt << 13)) ^
                                                    ((Ct << 3) | (nt >>> 29)) ^
                                                    ((Ct >>> 6) | (nt << 26)),
                                                nn = f[ve - 7],
                                                ti = nn.high,
                                                ri = nn.low,
                                                sn = f[ve - 16],
                                                ai = sn.high,
                                                un = sn.low;
                                            (Ie = tn + ri),
                                                (He =
                                                    J0 +
                                                    ti +
                                                    (Ie >>> 0 < tn >>> 0
                                                        ? 1
                                                        : 0)),
                                                (Ie = Ie + an),
                                                (He =
                                                    He +
                                                    ei +
                                                    (Ie >>> 0 < an >>> 0
                                                        ? 1
                                                        : 0)),
                                                (Ie = Ie + un),
                                                (He =
                                                    He +
                                                    ai +
                                                    (Ie >>> 0 < un >>> 0
                                                        ? 1
                                                        : 0)),
                                                (Gt.high = He),
                                                (Gt.low = Ie);
                                        }
                                        var ni = (Re & $t) ^ (~Re & Wt),
                                            on = (Ae & xt) ^ (~Ae & _t),
                                            si =
                                                (oe & pe) ^
                                                (oe & Tt) ^
                                                (pe & Tt),
                                            ii =
                                                (ie & z) ^ (ie & rt) ^ (z & rt),
                                            ui =
                                                ((oe >>> 28) | (ie << 4)) ^
                                                ((oe << 30) | (ie >>> 2)) ^
                                                ((oe << 25) | (ie >>> 7)),
                                            cn =
                                                ((ie >>> 28) | (oe << 4)) ^
                                                ((ie << 30) | (oe >>> 2)) ^
                                                ((ie << 25) | (oe >>> 7)),
                                            oi =
                                                ((Re >>> 14) | (Ae << 18)) ^
                                                ((Re >>> 18) | (Ae << 14)) ^
                                                ((Re << 23) | (Ae >>> 9)),
                                            ci =
                                                ((Ae >>> 14) | (Re << 18)) ^
                                                ((Ae >>> 18) | (Re << 14)) ^
                                                ((Ae << 23) | (Re >>> 9)),
                                            ln = h[ve],
                                            li = ln.high,
                                            dn = ln.low,
                                            Ce = gt + ci,
                                            Fe =
                                                Ir +
                                                oi +
                                                (Ce >>> 0 < gt >>> 0 ? 1 : 0),
                                            Ce = Ce + on,
                                            Fe =
                                                Fe +
                                                ni +
                                                (Ce >>> 0 < on >>> 0 ? 1 : 0),
                                            Ce = Ce + dn,
                                            Fe =
                                                Fe +
                                                li +
                                                (Ce >>> 0 < dn >>> 0 ? 1 : 0),
                                            Ce = Ce + Ie,
                                            Fe =
                                                Fe +
                                                He +
                                                (Ce >>> 0 < Ie >>> 0 ? 1 : 0),
                                            fn = cn + ii,
                                            di =
                                                ui +
                                                si +
                                                (fn >>> 0 < cn >>> 0 ? 1 : 0);
                                        (Ir = Wt),
                                            (gt = _t),
                                            (Wt = $t),
                                            (_t = xt),
                                            ($t = Re),
                                            (xt = Ae),
                                            (Ae = (bt + Ce) | 0),
                                            (Re =
                                                (Nr +
                                                    Fe +
                                                    (Ae >>> 0 < bt >>> 0
                                                        ? 1
                                                        : 0)) |
                                                0),
                                            (Nr = Tt),
                                            (bt = rt),
                                            (Tt = pe),
                                            (rt = z),
                                            (pe = oe),
                                            (z = ie),
                                            (ie = (Ce + fn) | 0),
                                            (oe =
                                                (Fe +
                                                    di +
                                                    (ie >>> 0 < Ce >>> 0
                                                        ? 1
                                                        : 0)) |
                                                0);
                                    }
                                    (N = S.low = N + ie),
                                        (S.high =
                                            Y +
                                            oe +
                                            (N >>> 0 < ie >>> 0 ? 1 : 0)),
                                        (w = _.low = w + z),
                                        (_.high =
                                            R +
                                            pe +
                                            (w >>> 0 < z >>> 0 ? 1 : 0)),
                                        (W = g.low = W + rt),
                                        (g.high =
                                            H +
                                            Tt +
                                            (W >>> 0 < rt >>> 0 ? 1 : 0)),
                                        (K = A.low = K + bt),
                                        (A.high =
                                            V +
                                            Nr +
                                            (K >>> 0 < bt >>> 0 ? 1 : 0)),
                                        (re = v.low = re + Ae),
                                        (v.high =
                                            ue +
                                            Re +
                                            (re >>> 0 < Ae >>> 0 ? 1 : 0)),
                                        (ae = y.low = ae + xt),
                                        (y.high =
                                            se +
                                            $t +
                                            (ae >>> 0 < xt >>> 0 ? 1 : 0)),
                                        (U = D.low = U + _t),
                                        (D.high =
                                            k +
                                            Wt +
                                            (U >>> 0 < _t >>> 0 ? 1 : 0)),
                                        (M = P.low = M + gt),
                                        (P.high =
                                            q +
                                            Ir +
                                            (M >>> 0 < gt >>> 0 ? 1 : 0));
                                },
                                _doFinalize: function () {
                                    var p = this._data,
                                        x = p.words,
                                        C = this._nDataBytes * 8,
                                        S = p.sigBytes * 8;
                                    (x[S >>> 5] |= 128 << (24 - (S % 32))),
                                        (x[(((S + 128) >>> 10) << 5) + 30] =
                                            Math.floor(C / 4294967296)),
                                        (x[(((S + 128) >>> 10) << 5) + 31] = C),
                                        (p.sigBytes = x.length * 4),
                                        this._process();
                                    var _ = this._hash.toX32();
                                    return _;
                                },
                                clone: function () {
                                    var p = s.clone.call(this);
                                    return (p._hash = this._hash.clone()), p;
                                },
                                blockSize: 1024 / 32,
                            }));
                            (a.SHA512 = s._createHelper(m)),
                                (a.HmacSHA512 = s._createHmacHelper(m));
                        })(),
                        r.SHA512
                    );
                });
            })(Qr)),
        Qr.exports
    );
}
var Xr = { exports: {} },
    is;
function Lf() {
    return (
        is ||
            ((is = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), Cr(), K0());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.x64,
                                s = n.Word,
                                u = n.WordArray,
                                o = a.algo,
                                l = o.SHA512,
                                c = (o.SHA384 = l.extend({
                                    _doReset: function () {
                                        this._hash = new u.init([
                                            new s.init(3418070365, 3238371032),
                                            new s.init(1654270250, 914150663),
                                            new s.init(2438529370, 812702999),
                                            new s.init(355462360, 4144912697),
                                            new s.init(1731405415, 4290775857),
                                            new s.init(2394180231, 1750603025),
                                            new s.init(3675008525, 1694076839),
                                            new s.init(1203062813, 3204075428),
                                        ]);
                                    },
                                    _doFinalize: function () {
                                        var d = l._doFinalize.call(this);
                                        return (d.sigBytes -= 16), d;
                                    },
                                }));
                            (a.SHA384 = l._createHelper(c)),
                                (a.HmacSHA384 = l._createHmacHelper(c));
                        })(),
                        r.SHA384
                    );
                });
            })(Xr)),
        Xr.exports
    );
}
var zr = { exports: {} },
    us;
function Df() {
    return (
        us ||
            ((us = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), Cr());
                })(j, function (r) {
                    return (
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.WordArray,
                                o = s.Hasher,
                                l = n.x64,
                                c = l.Word,
                                d = n.algo,
                                h = [],
                                f = [],
                                m = [];
                            (function () {
                                for (var C = 1, S = 0, _ = 0; _ < 24; _++) {
                                    h[C + 5 * S] =
                                        (((_ + 1) * (_ + 2)) / 2) % 64;
                                    var g = S % 5,
                                        A = (2 * C + 3 * S) % 5;
                                    (C = g), (S = A);
                                }
                                for (var C = 0; C < 5; C++)
                                    for (var S = 0; S < 5; S++)
                                        f[C + 5 * S] =
                                            S + ((2 * C + 3 * S) % 5) * 5;
                                for (var v = 1, y = 0; y < 24; y++) {
                                    for (var D = 0, P = 0, Y = 0; Y < 7; Y++) {
                                        if (v & 1) {
                                            var N = (1 << Y) - 1;
                                            N < 32
                                                ? (P ^= 1 << N)
                                                : (D ^= 1 << (N - 32));
                                        }
                                        v & 128
                                            ? (v = (v << 1) ^ 113)
                                            : (v <<= 1);
                                    }
                                    m[y] = c.create(D, P);
                                }
                            })();
                            var p = [];
                            (function () {
                                for (var C = 0; C < 25; C++) p[C] = c.create();
                            })();
                            var x = (d.SHA3 = o.extend({
                                cfg: o.cfg.extend({ outputLength: 512 }),
                                _doReset: function () {
                                    for (
                                        var C = (this._state = []), S = 0;
                                        S < 25;
                                        S++
                                    )
                                        C[S] = new c.init();
                                    this.blockSize =
                                        (1600 - 2 * this.cfg.outputLength) / 32;
                                },
                                _doProcessBlock: function (C, S) {
                                    for (
                                        var _ = this._state,
                                            g = this.blockSize / 2,
                                            A = 0;
                                        A < g;
                                        A++
                                    ) {
                                        var v = C[S + 2 * A],
                                            y = C[S + 2 * A + 1];
                                        (v =
                                            (((v << 8) | (v >>> 24)) &
                                                16711935) |
                                            (((v << 24) | (v >>> 8)) &
                                                4278255360)),
                                            (y =
                                                (((y << 8) | (y >>> 24)) &
                                                    16711935) |
                                                (((y << 24) | (y >>> 8)) &
                                                    4278255360));
                                        var D = _[A];
                                        (D.high ^= y), (D.low ^= v);
                                    }
                                    for (var P = 0; P < 24; P++) {
                                        for (var Y = 0; Y < 5; Y++) {
                                            for (
                                                var N = 0, R = 0, w = 0;
                                                w < 5;
                                                w++
                                            ) {
                                                var D = _[Y + 5 * w];
                                                (N ^= D.high), (R ^= D.low);
                                            }
                                            var H = p[Y];
                                            (H.high = N), (H.low = R);
                                        }
                                        for (var Y = 0; Y < 5; Y++)
                                            for (
                                                var W = p[(Y + 4) % 5],
                                                    V = p[(Y + 1) % 5],
                                                    K = V.high,
                                                    ue = V.low,
                                                    N =
                                                        W.high ^
                                                        ((K << 1) |
                                                            (ue >>> 31)),
                                                    R =
                                                        W.low ^
                                                        ((ue << 1) |
                                                            (K >>> 31)),
                                                    w = 0;
                                                w < 5;
                                                w++
                                            ) {
                                                var D = _[Y + 5 * w];
                                                (D.high ^= N), (D.low ^= R);
                                            }
                                        for (var re = 1; re < 25; re++) {
                                            var N,
                                                R,
                                                D = _[re],
                                                se = D.high,
                                                ae = D.low,
                                                k = h[re];
                                            k < 32
                                                ? ((N =
                                                      (se << k) |
                                                      (ae >>> (32 - k))),
                                                  (R =
                                                      (ae << k) |
                                                      (se >>> (32 - k))))
                                                : ((N =
                                                      (ae << (k - 32)) |
                                                      (se >>> (64 - k))),
                                                  (R =
                                                      (se << (k - 32)) |
                                                      (ae >>> (64 - k))));
                                            var U = p[f[re]];
                                            (U.high = N), (U.low = R);
                                        }
                                        var q = p[0],
                                            M = _[0];
                                        (q.high = M.high), (q.low = M.low);
                                        for (var Y = 0; Y < 5; Y++)
                                            for (var w = 0; w < 5; w++) {
                                                var re = Y + 5 * w,
                                                    D = _[re],
                                                    oe = p[re],
                                                    ie =
                                                        p[
                                                            ((Y + 1) % 5) +
                                                                5 * w
                                                        ],
                                                    pe =
                                                        p[
                                                            ((Y + 2) % 5) +
                                                                5 * w
                                                        ];
                                                (D.high =
                                                    oe.high ^
                                                    (~ie.high & pe.high)),
                                                    (D.low =
                                                        oe.low ^
                                                        (~ie.low & pe.low));
                                            }
                                        var D = _[0],
                                            z = m[P];
                                        (D.high ^= z.high), (D.low ^= z.low);
                                    }
                                },
                                _doFinalize: function () {
                                    var C = this._data,
                                        S = C.words;
                                    this._nDataBytes * 8;
                                    var _ = C.sigBytes * 8,
                                        g = this.blockSize * 32;
                                    (S[_ >>> 5] |= 1 << (24 - (_ % 32))),
                                        (S[
                                            ((a.ceil((_ + 1) / g) * g) >>> 5) -
                                                1
                                        ] |= 128),
                                        (C.sigBytes = S.length * 4),
                                        this._process();
                                    for (
                                        var A = this._state,
                                            v = this.cfg.outputLength / 8,
                                            y = v / 8,
                                            D = [],
                                            P = 0;
                                        P < y;
                                        P++
                                    ) {
                                        var Y = A[P],
                                            N = Y.high,
                                            R = Y.low;
                                        (N =
                                            (((N << 8) | (N >>> 24)) &
                                                16711935) |
                                            (((N << 24) | (N >>> 8)) &
                                                4278255360)),
                                            (R =
                                                (((R << 8) | (R >>> 24)) &
                                                    16711935) |
                                                (((R << 24) | (R >>> 8)) &
                                                    4278255360)),
                                            D.push(R),
                                            D.push(N);
                                    }
                                    return new u.init(D, v);
                                },
                                clone: function () {
                                    for (
                                        var C = o.clone.call(this),
                                            S = (C._state =
                                                this._state.slice(0)),
                                            _ = 0;
                                        _ < 25;
                                        _++
                                    )
                                        S[_] = S[_].clone();
                                    return C;
                                },
                            }));
                            (n.SHA3 = o._createHelper(x)),
                                (n.HmacSHA3 = o._createHmacHelper(x));
                        })(Math),
                        r.SHA3
                    );
                });
            })(zr)),
        zr.exports
    );
}
var jr = { exports: {} },
    os;
function Pf() {
    return (
        os ||
            ((os = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    /** @preserve
			(c) 2012 by Cédric Mesnil. All rights reserved.

			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/ return (
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.WordArray,
                                o = s.Hasher,
                                l = n.algo,
                                c = u.create([
                                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                    13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12,
                                    0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15,
                                    8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11,
                                    10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
                                    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11,
                                    6, 15, 13,
                                ]),
                                d = u.create([
                                    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1,
                                    10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14,
                                    15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14,
                                    6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4,
                                    1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
                                    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0,
                                    3, 9, 11,
                                ]),
                                h = u.create([
                                    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15,
                                    6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7,
                                    12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14,
                                    9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11,
                                    12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
                                    5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12,
                                    13, 14, 11, 8, 5, 6,
                                ]),
                                f = u.create([
                                    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14,
                                    14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7,
                                    12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6,
                                    14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8,
                                    11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15,
                                    8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5,
                                    15, 13, 11, 11,
                                ]),
                                m = u.create([
                                    0, 1518500249, 1859775393, 2400959708,
                                    2840853838,
                                ]),
                                p = u.create([
                                    1352829926, 1548603684, 1836072691,
                                    2053994217, 0,
                                ]),
                                x = (l.RIPEMD160 = o.extend({
                                    _doReset: function () {
                                        this._hash = u.create([
                                            1732584193, 4023233417, 2562383102,
                                            271733878, 3285377520,
                                        ]);
                                    },
                                    _doProcessBlock: function (y, D) {
                                        for (var P = 0; P < 16; P++) {
                                            var Y = D + P,
                                                N = y[Y];
                                            y[Y] =
                                                (((N << 8) | (N >>> 24)) &
                                                    16711935) |
                                                (((N << 24) | (N >>> 8)) &
                                                    4278255360);
                                        }
                                        var R = this._hash.words,
                                            w = m.words,
                                            H = p.words,
                                            W = c.words,
                                            V = d.words,
                                            K = h.words,
                                            ue = f.words,
                                            re,
                                            se,
                                            ae,
                                            k,
                                            U,
                                            q,
                                            M,
                                            oe,
                                            ie,
                                            pe;
                                        (q = re = R[0]),
                                            (M = se = R[1]),
                                            (oe = ae = R[2]),
                                            (ie = k = R[3]),
                                            (pe = U = R[4]);
                                        for (var z, P = 0; P < 80; P += 1)
                                            (z = (re + y[D + W[P]]) | 0),
                                                P < 16
                                                    ? (z += C(se, ae, k) + w[0])
                                                    : P < 32
                                                    ? (z += S(se, ae, k) + w[1])
                                                    : P < 48
                                                    ? (z += _(se, ae, k) + w[2])
                                                    : P < 64
                                                    ? (z += g(se, ae, k) + w[3])
                                                    : (z +=
                                                          A(se, ae, k) + w[4]),
                                                (z = z | 0),
                                                (z = v(z, K[P])),
                                                (z = (z + U) | 0),
                                                (re = U),
                                                (U = k),
                                                (k = v(ae, 10)),
                                                (ae = se),
                                                (se = z),
                                                (z = (q + y[D + V[P]]) | 0),
                                                P < 16
                                                    ? (z += A(M, oe, ie) + H[0])
                                                    : P < 32
                                                    ? (z += g(M, oe, ie) + H[1])
                                                    : P < 48
                                                    ? (z += _(M, oe, ie) + H[2])
                                                    : P < 64
                                                    ? (z += S(M, oe, ie) + H[3])
                                                    : (z +=
                                                          C(M, oe, ie) + H[4]),
                                                (z = z | 0),
                                                (z = v(z, ue[P])),
                                                (z = (z + pe) | 0),
                                                (q = pe),
                                                (pe = ie),
                                                (ie = v(oe, 10)),
                                                (oe = M),
                                                (M = z);
                                        (z = (R[1] + ae + ie) | 0),
                                            (R[1] = (R[2] + k + pe) | 0),
                                            (R[2] = (R[3] + U + q) | 0),
                                            (R[3] = (R[4] + re + M) | 0),
                                            (R[4] = (R[0] + se + oe) | 0),
                                            (R[0] = z);
                                    },
                                    _doFinalize: function () {
                                        var y = this._data,
                                            D = y.words,
                                            P = this._nDataBytes * 8,
                                            Y = y.sigBytes * 8;
                                        (D[Y >>> 5] |= 128 << (24 - (Y % 32))),
                                            (D[(((Y + 64) >>> 9) << 4) + 14] =
                                                (((P << 8) | (P >>> 24)) &
                                                    16711935) |
                                                (((P << 24) | (P >>> 8)) &
                                                    4278255360)),
                                            (y.sigBytes = (D.length + 1) * 4),
                                            this._process();
                                        for (
                                            var N = this._hash,
                                                R = N.words,
                                                w = 0;
                                            w < 5;
                                            w++
                                        ) {
                                            var H = R[w];
                                            R[w] =
                                                (((H << 8) | (H >>> 24)) &
                                                    16711935) |
                                                (((H << 24) | (H >>> 8)) &
                                                    4278255360);
                                        }
                                        return N;
                                    },
                                    clone: function () {
                                        var y = o.clone.call(this);
                                        return (
                                            (y._hash = this._hash.clone()), y
                                        );
                                    },
                                }));
                            function C(y, D, P) {
                                return y ^ D ^ P;
                            }
                            function S(y, D, P) {
                                return (y & D) | (~y & P);
                            }
                            function _(y, D, P) {
                                return (y | ~D) ^ P;
                            }
                            function g(y, D, P) {
                                return (y & P) | (D & ~P);
                            }
                            function A(y, D, P) {
                                return y ^ (D | ~P);
                            }
                            function v(y, D) {
                                return (y << D) | (y >>> (32 - D));
                            }
                            (n.RIPEMD160 = o._createHelper(x)),
                                (n.HmacRIPEMD160 = o._createHmacHelper(x));
                        })(),
                        r.RIPEMD160
                    );
                });
            })(jr)),
        jr.exports
    );
}
var Kr = { exports: {} },
    cs;
function Ja() {
    return (
        cs ||
            ((cs = 1),
            (function (e, t) {
                (function (r, a) {
                    e.exports = a(J());
                })(j, function (r) {
                    (function () {
                        var a = r,
                            n = a.lib,
                            s = n.Base,
                            u = a.enc,
                            o = u.Utf8,
                            l = a.algo;
                        l.HMAC = s.extend({
                            init: function (c, d) {
                                (c = this._hasher = new c.init()),
                                    typeof d == "string" && (d = o.parse(d));
                                var h = c.blockSize,
                                    f = h * 4;
                                d.sigBytes > f && (d = c.finalize(d)),
                                    d.clamp();
                                for (
                                    var m = (this._oKey = d.clone()),
                                        p = (this._iKey = d.clone()),
                                        x = m.words,
                                        C = p.words,
                                        S = 0;
                                    S < h;
                                    S++
                                )
                                    (x[S] ^= 1549556828), (C[S] ^= 909522486);
                                (m.sigBytes = p.sigBytes = f), this.reset();
                            },
                            reset: function () {
                                var c = this._hasher;
                                c.reset(), c.update(this._iKey);
                            },
                            update: function (c) {
                                return this._hasher.update(c), this;
                            },
                            finalize: function (c) {
                                var d = this._hasher,
                                    h = d.finalize(c);
                                d.reset();
                                var f = d.finalize(
                                    this._oKey.clone().concat(h)
                                );
                                return f;
                            },
                        });
                    })();
                });
            })(Kr)),
        Kr.exports
    );
}
var Zr = { exports: {} },
    ls;
function Bf() {
    return (
        ls ||
            ((ls = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), Za(), Ja());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.Base,
                                u = n.WordArray,
                                o = a.algo,
                                l = o.SHA1,
                                c = o.HMAC,
                                d = (o.PBKDF2 = s.extend({
                                    cfg: s.extend({
                                        keySize: 128 / 32,
                                        hasher: l,
                                        iterations: 1,
                                    }),
                                    init: function (h) {
                                        this.cfg = this.cfg.extend(h);
                                    },
                                    compute: function (h, f) {
                                        for (
                                            var m = this.cfg,
                                                p = c.create(m.hasher, h),
                                                x = u.create(),
                                                C = u.create([1]),
                                                S = x.words,
                                                _ = C.words,
                                                g = m.keySize,
                                                A = m.iterations;
                                            S.length < g;

                                        ) {
                                            var v = p.update(f).finalize(C);
                                            p.reset();
                                            for (
                                                var y = v.words,
                                                    D = y.length,
                                                    P = v,
                                                    Y = 1;
                                                Y < A;
                                                Y++
                                            ) {
                                                (P = p.finalize(P)), p.reset();
                                                for (
                                                    var N = P.words, R = 0;
                                                    R < D;
                                                    R++
                                                )
                                                    y[R] ^= N[R];
                                            }
                                            x.concat(v), _[0]++;
                                        }
                                        return (x.sigBytes = g * 4), x;
                                    },
                                }));
                            a.PBKDF2 = function (h, f, m) {
                                return d.create(m).compute(h, f);
                            };
                        })(),
                        r.PBKDF2
                    );
                });
            })(Zr)),
        Zr.exports
    );
}
var Jr = { exports: {} },
    ds;
function et() {
    return (
        ds ||
            ((ds = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), Za(), Ja());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.Base,
                                u = n.WordArray,
                                o = a.algo,
                                l = o.MD5,
                                c = (o.EvpKDF = s.extend({
                                    cfg: s.extend({
                                        keySize: 128 / 32,
                                        hasher: l,
                                        iterations: 1,
                                    }),
                                    init: function (d) {
                                        this.cfg = this.cfg.extend(d);
                                    },
                                    compute: function (d, h) {
                                        for (
                                            var f,
                                                m = this.cfg,
                                                p = m.hasher.create(),
                                                x = u.create(),
                                                C = x.words,
                                                S = m.keySize,
                                                _ = m.iterations;
                                            C.length < S;

                                        ) {
                                            f && p.update(f),
                                                (f = p.update(d).finalize(h)),
                                                p.reset();
                                            for (var g = 1; g < _; g++)
                                                (f = p.finalize(f)), p.reset();
                                            x.concat(f);
                                        }
                                        return (x.sigBytes = S * 4), x;
                                    },
                                }));
                            a.EvpKDF = function (d, h, f) {
                                return c.create(f).compute(d, h);
                            };
                        })(),
                        r.EvpKDF
                    );
                });
            })(Jr)),
        Jr.exports
    );
}
var ea = { exports: {} },
    fs;
function he() {
    return (
        fs ||
            ((fs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), et());
                })(j, function (r) {
                    r.lib.Cipher ||
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.Base,
                                o = s.WordArray,
                                l = s.BufferedBlockAlgorithm,
                                c = n.enc;
                            c.Utf8;
                            var d = c.Base64,
                                h = n.algo,
                                f = h.EvpKDF,
                                m = (s.Cipher = l.extend({
                                    cfg: u.extend(),
                                    createEncryptor: function (N, R) {
                                        return this.create(
                                            this._ENC_XFORM_MODE,
                                            N,
                                            R
                                        );
                                    },
                                    createDecryptor: function (N, R) {
                                        return this.create(
                                            this._DEC_XFORM_MODE,
                                            N,
                                            R
                                        );
                                    },
                                    init: function (N, R, w) {
                                        (this.cfg = this.cfg.extend(w)),
                                            (this._xformMode = N),
                                            (this._key = R),
                                            this.reset();
                                    },
                                    reset: function () {
                                        l.reset.call(this), this._doReset();
                                    },
                                    process: function (N) {
                                        return this._append(N), this._process();
                                    },
                                    finalize: function (N) {
                                        N && this._append(N);
                                        var R = this._doFinalize();
                                        return R;
                                    },
                                    keySize: 128 / 32,
                                    ivSize: 128 / 32,
                                    _ENC_XFORM_MODE: 1,
                                    _DEC_XFORM_MODE: 2,
                                    _createHelper: (function () {
                                        function N(R) {
                                            return typeof R == "string" ? Y : y;
                                        }
                                        return function (R) {
                                            return {
                                                encrypt: function (w, H, W) {
                                                    return N(H).encrypt(
                                                        R,
                                                        w,
                                                        H,
                                                        W
                                                    );
                                                },
                                                decrypt: function (w, H, W) {
                                                    return N(H).decrypt(
                                                        R,
                                                        w,
                                                        H,
                                                        W
                                                    );
                                                },
                                            };
                                        };
                                    })(),
                                }));
                            s.StreamCipher = m.extend({
                                _doFinalize: function () {
                                    var N = this._process(!0);
                                    return N;
                                },
                                blockSize: 1,
                            });
                            var p = (n.mode = {}),
                                x = (s.BlockCipherMode = u.extend({
                                    createEncryptor: function (N, R) {
                                        return this.Encryptor.create(N, R);
                                    },
                                    createDecryptor: function (N, R) {
                                        return this.Decryptor.create(N, R);
                                    },
                                    init: function (N, R) {
                                        (this._cipher = N), (this._iv = R);
                                    },
                                })),
                                C = (p.CBC = (function () {
                                    var N = x.extend();
                                    (N.Encryptor = N.extend({
                                        processBlock: function (w, H) {
                                            var W = this._cipher,
                                                V = W.blockSize;
                                            R.call(this, w, H, V),
                                                W.encryptBlock(w, H),
                                                (this._prevBlock = w.slice(
                                                    H,
                                                    H + V
                                                ));
                                        },
                                    })),
                                        (N.Decryptor = N.extend({
                                            processBlock: function (w, H) {
                                                var W = this._cipher,
                                                    V = W.blockSize,
                                                    K = w.slice(H, H + V);
                                                W.decryptBlock(w, H),
                                                    R.call(this, w, H, V),
                                                    (this._prevBlock = K);
                                            },
                                        }));
                                    function R(w, H, W) {
                                        var V,
                                            K = this._iv;
                                        K
                                            ? ((V = K), (this._iv = a))
                                            : (V = this._prevBlock);
                                        for (var ue = 0; ue < W; ue++)
                                            w[H + ue] ^= V[ue];
                                    }
                                    return N;
                                })()),
                                S = (n.pad = {}),
                                _ = (S.Pkcs7 = {
                                    pad: function (N, R) {
                                        for (
                                            var w = R * 4,
                                                H = w - (N.sigBytes % w),
                                                W =
                                                    (H << 24) |
                                                    (H << 16) |
                                                    (H << 8) |
                                                    H,
                                                V = [],
                                                K = 0;
                                            K < H;
                                            K += 4
                                        )
                                            V.push(W);
                                        var ue = o.create(V, H);
                                        N.concat(ue);
                                    },
                                    unpad: function (N) {
                                        var R =
                                            N.words[(N.sigBytes - 1) >>> 2] &
                                            255;
                                        N.sigBytes -= R;
                                    },
                                });
                            s.BlockCipher = m.extend({
                                cfg: m.cfg.extend({ mode: C, padding: _ }),
                                reset: function () {
                                    var N;
                                    m.reset.call(this);
                                    var R = this.cfg,
                                        w = R.iv,
                                        H = R.mode;
                                    this._xformMode == this._ENC_XFORM_MODE
                                        ? (N = H.createEncryptor)
                                        : ((N = H.createDecryptor),
                                          (this._minBufferSize = 1)),
                                        this._mode && this._mode.__creator == N
                                            ? this._mode.init(
                                                  this,
                                                  w && w.words
                                              )
                                            : ((this._mode = N.call(
                                                  H,
                                                  this,
                                                  w && w.words
                                              )),
                                              (this._mode.__creator = N));
                                },
                                _doProcessBlock: function (N, R) {
                                    this._mode.processBlock(N, R);
                                },
                                _doFinalize: function () {
                                    var N,
                                        R = this.cfg.padding;
                                    return (
                                        this._xformMode == this._ENC_XFORM_MODE
                                            ? (R.pad(
                                                  this._data,
                                                  this.blockSize
                                              ),
                                              (N = this._process(!0)))
                                            : ((N = this._process(!0)),
                                              R.unpad(N)),
                                        N
                                    );
                                },
                                blockSize: 128 / 32,
                            });
                            var g = (s.CipherParams = u.extend({
                                    init: function (N) {
                                        this.mixIn(N);
                                    },
                                    toString: function (N) {
                                        return (N || this.formatter).stringify(
                                            this
                                        );
                                    },
                                })),
                                A = (n.format = {}),
                                v = (A.OpenSSL = {
                                    stringify: function (N) {
                                        var R,
                                            w = N.ciphertext,
                                            H = N.salt;
                                        return (
                                            H
                                                ? (R = o
                                                      .create([
                                                          1398893684,
                                                          1701076831,
                                                      ])
                                                      .concat(H)
                                                      .concat(w))
                                                : (R = w),
                                            R.toString(d)
                                        );
                                    },
                                    parse: function (N) {
                                        var R,
                                            w = d.parse(N),
                                            H = w.words;
                                        return (
                                            H[0] == 1398893684 &&
                                                H[1] == 1701076831 &&
                                                ((R = o.create(H.slice(2, 4))),
                                                H.splice(0, 4),
                                                (w.sigBytes -= 16)),
                                            g.create({ ciphertext: w, salt: R })
                                        );
                                    },
                                }),
                                y = (s.SerializableCipher = u.extend({
                                    cfg: u.extend({ format: v }),
                                    encrypt: function (N, R, w, H) {
                                        H = this.cfg.extend(H);
                                        var W = N.createEncryptor(w, H),
                                            V = W.finalize(R),
                                            K = W.cfg;
                                        return g.create({
                                            ciphertext: V,
                                            key: w,
                                            iv: K.iv,
                                            algorithm: N,
                                            mode: K.mode,
                                            padding: K.padding,
                                            blockSize: N.blockSize,
                                            formatter: H.format,
                                        });
                                    },
                                    decrypt: function (N, R, w, H) {
                                        (H = this.cfg.extend(H)),
                                            (R = this._parse(R, H.format));
                                        var W = N.createDecryptor(
                                            w,
                                            H
                                        ).finalize(R.ciphertext);
                                        return W;
                                    },
                                    _parse: function (N, R) {
                                        return typeof N == "string"
                                            ? R.parse(N, this)
                                            : N;
                                    },
                                })),
                                D = (n.kdf = {}),
                                P = (D.OpenSSL = {
                                    execute: function (N, R, w, H) {
                                        H || (H = o.random(64 / 8));
                                        var W = f
                                                .create({ keySize: R + w })
                                                .compute(N, H),
                                            V = o.create(
                                                W.words.slice(R),
                                                w * 4
                                            );
                                        return (
                                            (W.sigBytes = R * 4),
                                            g.create({ key: W, iv: V, salt: H })
                                        );
                                    },
                                }),
                                Y = (s.PasswordBasedCipher = y.extend({
                                    cfg: y.cfg.extend({ kdf: P }),
                                    encrypt: function (N, R, w, H) {
                                        H = this.cfg.extend(H);
                                        var W = H.kdf.execute(
                                            w,
                                            N.keySize,
                                            N.ivSize
                                        );
                                        H.iv = W.iv;
                                        var V = y.encrypt.call(
                                            this,
                                            N,
                                            R,
                                            W.key,
                                            H
                                        );
                                        return V.mixIn(W), V;
                                    },
                                    decrypt: function (N, R, w, H) {
                                        (H = this.cfg.extend(H)),
                                            (R = this._parse(R, H.format));
                                        var W = H.kdf.execute(
                                            w,
                                            N.keySize,
                                            N.ivSize,
                                            R.salt
                                        );
                                        H.iv = W.iv;
                                        var V = y.decrypt.call(
                                            this,
                                            N,
                                            R,
                                            W.key,
                                            H
                                        );
                                        return V;
                                    },
                                }));
                        })();
                });
            })(ea)),
        ea.exports
    );
}
var ta = { exports: {} },
    hs;
function kf() {
    return (
        hs ||
            ((hs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.mode.CFB = (function () {
                            var a = r.lib.BlockCipherMode.extend();
                            (a.Encryptor = a.extend({
                                processBlock: function (s, u) {
                                    var o = this._cipher,
                                        l = o.blockSize;
                                    n.call(this, s, u, l, o),
                                        (this._prevBlock = s.slice(u, u + l));
                                },
                            })),
                                (a.Decryptor = a.extend({
                                    processBlock: function (s, u) {
                                        var o = this._cipher,
                                            l = o.blockSize,
                                            c = s.slice(u, u + l);
                                        n.call(this, s, u, l, o),
                                            (this._prevBlock = c);
                                    },
                                }));
                            function n(s, u, o, l) {
                                var c,
                                    d = this._iv;
                                d
                                    ? ((c = d.slice(0)), (this._iv = void 0))
                                    : (c = this._prevBlock),
                                    l.encryptBlock(c, 0);
                                for (var h = 0; h < o; h++) s[u + h] ^= c[h];
                            }
                            return a;
                        })()),
                        r.mode.CFB
                    );
                });
            })(ta)),
        ta.exports
    );
}
var ra = { exports: {} },
    Es;
function wf() {
    return (
        Es ||
            ((Es = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.mode.CTR = (function () {
                            var a = r.lib.BlockCipherMode.extend(),
                                n = (a.Encryptor = a.extend({
                                    processBlock: function (s, u) {
                                        var o = this._cipher,
                                            l = o.blockSize,
                                            c = this._iv,
                                            d = this._counter;
                                        c &&
                                            ((d = this._counter = c.slice(0)),
                                            (this._iv = void 0));
                                        var h = d.slice(0);
                                        o.encryptBlock(h, 0),
                                            (d[l - 1] = (d[l - 1] + 1) | 0);
                                        for (var f = 0; f < l; f++)
                                            s[u + f] ^= h[f];
                                    },
                                }));
                            return (a.Decryptor = n), a;
                        })()),
                        r.mode.CTR
                    );
                });
            })(ra)),
        ra.exports
    );
}
var aa = { exports: {} },
    ps;
function Mf() {
    return (
        ps ||
            ((ps = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    /** @preserve
                     * Counter block mode compatible with  Dr Brian Gladman fileenc.c
                     * derived from CryptoJS.mode.CTR
                     * Jan Hruby jhruby.web@gmail.com
                     */ return (
                        (r.mode.CTRGladman = (function () {
                            var a = r.lib.BlockCipherMode.extend();
                            function n(o) {
                                if (((o >> 24) & 255) === 255) {
                                    var l = (o >> 16) & 255,
                                        c = (o >> 8) & 255,
                                        d = o & 255;
                                    l === 255
                                        ? ((l = 0),
                                          c === 255
                                              ? ((c = 0),
                                                d === 255 ? (d = 0) : ++d)
                                              : ++c)
                                        : ++l,
                                        (o = 0),
                                        (o += l << 16),
                                        (o += c << 8),
                                        (o += d);
                                } else o += 1 << 24;
                                return o;
                            }
                            function s(o) {
                                return (
                                    (o[0] = n(o[0])) === 0 && (o[1] = n(o[1])),
                                    o
                                );
                            }
                            var u = (a.Encryptor = a.extend({
                                processBlock: function (o, l) {
                                    var c = this._cipher,
                                        d = c.blockSize,
                                        h = this._iv,
                                        f = this._counter;
                                    h &&
                                        ((f = this._counter = h.slice(0)),
                                        (this._iv = void 0)),
                                        s(f);
                                    var m = f.slice(0);
                                    c.encryptBlock(m, 0);
                                    for (var p = 0; p < d; p++)
                                        o[l + p] ^= m[p];
                                },
                            }));
                            return (a.Decryptor = u), a;
                        })()),
                        r.mode.CTRGladman
                    );
                });
            })(aa)),
        aa.exports
    );
}
var na = { exports: {} },
    ms;
function Hf() {
    return (
        ms ||
            ((ms = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.mode.OFB = (function () {
                            var a = r.lib.BlockCipherMode.extend(),
                                n = (a.Encryptor = a.extend({
                                    processBlock: function (s, u) {
                                        var o = this._cipher,
                                            l = o.blockSize,
                                            c = this._iv,
                                            d = this._keystream;
                                        c &&
                                            ((d = this._keystream = c.slice(0)),
                                            (this._iv = void 0)),
                                            o.encryptBlock(d, 0);
                                        for (var h = 0; h < l; h++)
                                            s[u + h] ^= d[h];
                                    },
                                }));
                            return (a.Decryptor = n), a;
                        })()),
                        r.mode.OFB
                    );
                });
            })(na)),
        na.exports
    );
}
var sa = { exports: {} },
    Ts;
function Ff() {
    return (
        Ts ||
            ((Ts = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.mode.ECB = (function () {
                            var a = r.lib.BlockCipherMode.extend();
                            return (
                                (a.Encryptor = a.extend({
                                    processBlock: function (n, s) {
                                        this._cipher.encryptBlock(n, s);
                                    },
                                })),
                                (a.Decryptor = a.extend({
                                    processBlock: function (n, s) {
                                        this._cipher.decryptBlock(n, s);
                                    },
                                })),
                                a
                            );
                        })()),
                        r.mode.ECB
                    );
                });
            })(sa)),
        sa.exports
    );
}
var ia = { exports: {} },
    bs;
function Uf() {
    return (
        bs ||
            ((bs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.pad.AnsiX923 = {
                            pad: function (a, n) {
                                var s = a.sigBytes,
                                    u = n * 4,
                                    o = u - (s % u),
                                    l = s + o - 1;
                                a.clamp(),
                                    (a.words[l >>> 2] |=
                                        o << (24 - (l % 4) * 8)),
                                    (a.sigBytes += o);
                            },
                            unpad: function (a) {
                                var n = a.words[(a.sigBytes - 1) >>> 2] & 255;
                                a.sigBytes -= n;
                            },
                        }),
                        r.pad.Ansix923
                    );
                });
            })(ia)),
        ia.exports
    );
}
var ua = { exports: {} },
    xs;
function qf() {
    return (
        xs ||
            ((xs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.pad.Iso10126 = {
                            pad: function (a, n) {
                                var s = n * 4,
                                    u = s - (a.sigBytes % s);
                                a.concat(r.lib.WordArray.random(u - 1)).concat(
                                    r.lib.WordArray.create([u << 24], 1)
                                );
                            },
                            unpad: function (a) {
                                var n = a.words[(a.sigBytes - 1) >>> 2] & 255;
                                a.sigBytes -= n;
                            },
                        }),
                        r.pad.Iso10126
                    );
                });
            })(ua)),
        ua.exports
    );
}
var oa = { exports: {} },
    _s;
function Yf() {
    return (
        _s ||
            ((_s = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.pad.Iso97971 = {
                            pad: function (a, n) {
                                a.concat(
                                    r.lib.WordArray.create([2147483648], 1)
                                ),
                                    r.pad.ZeroPadding.pad(a, n);
                            },
                            unpad: function (a) {
                                r.pad.ZeroPadding.unpad(a), a.sigBytes--;
                            },
                        }),
                        r.pad.Iso97971
                    );
                });
            })(oa)),
        oa.exports
    );
}
var ca = { exports: {} },
    gs;
function $f() {
    return (
        gs ||
            ((gs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.pad.ZeroPadding = {
                            pad: function (a, n) {
                                var s = n * 4;
                                a.clamp(),
                                    (a.sigBytes += s - (a.sigBytes % s || s));
                            },
                            unpad: function (a) {
                                for (
                                    var n = a.words,
                                        s = a.sigBytes - 1,
                                        s = a.sigBytes - 1;
                                    s >= 0;
                                    s--
                                )
                                    if (
                                        (n[s >>> 2] >>> (24 - (s % 4) * 8)) &
                                        255
                                    ) {
                                        a.sigBytes = s + 1;
                                        break;
                                    }
                            },
                        }),
                        r.pad.ZeroPadding
                    );
                });
            })(ca)),
        ca.exports
    );
}
var la = { exports: {} },
    As;
function Wf() {
    return (
        As ||
            ((As = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (r.pad.NoPadding = {
                            pad: function () {},
                            unpad: function () {},
                        }),
                        r.pad.NoPadding
                    );
                });
            })(la)),
        la.exports
    );
}
var da = { exports: {} },
    Cs;
function Gf() {
    return (
        Cs ||
            ((Cs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), he());
                })(j, function (r) {
                    return (
                        (function (a) {
                            var n = r,
                                s = n.lib,
                                u = s.CipherParams,
                                o = n.enc,
                                l = o.Hex,
                                c = n.format;
                            c.Hex = {
                                stringify: function (d) {
                                    return d.ciphertext.toString(l);
                                },
                                parse: function (d) {
                                    var h = l.parse(d);
                                    return u.create({ ciphertext: h });
                                },
                            };
                        })(),
                        r.format.Hex
                    );
                });
            })(da)),
        da.exports
    );
}
var fa = { exports: {} },
    Ns;
function Vf() {
    return (
        Ns ||
            ((Ns = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), pt(), mt(), et(), he());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.BlockCipher,
                                u = a.algo,
                                o = [],
                                l = [],
                                c = [],
                                d = [],
                                h = [],
                                f = [],
                                m = [],
                                p = [],
                                x = [],
                                C = [];
                            (function () {
                                for (var g = [], A = 0; A < 256; A++)
                                    A < 128
                                        ? (g[A] = A << 1)
                                        : (g[A] = (A << 1) ^ 283);
                                for (var v = 0, y = 0, A = 0; A < 256; A++) {
                                    var D =
                                        y ^
                                        (y << 1) ^
                                        (y << 2) ^
                                        (y << 3) ^
                                        (y << 4);
                                    (D = (D >>> 8) ^ (D & 255) ^ 99),
                                        (o[v] = D),
                                        (l[D] = v);
                                    var P = g[v],
                                        Y = g[P],
                                        N = g[Y],
                                        R = (g[D] * 257) ^ (D * 16843008);
                                    (c[v] = (R << 24) | (R >>> 8)),
                                        (d[v] = (R << 16) | (R >>> 16)),
                                        (h[v] = (R << 8) | (R >>> 24)),
                                        (f[v] = R);
                                    var R =
                                        (N * 16843009) ^
                                        (Y * 65537) ^
                                        (P * 257) ^
                                        (v * 16843008);
                                    (m[D] = (R << 24) | (R >>> 8)),
                                        (p[D] = (R << 16) | (R >>> 16)),
                                        (x[D] = (R << 8) | (R >>> 24)),
                                        (C[D] = R),
                                        v
                                            ? ((v = P ^ g[g[g[N ^ P]]]),
                                              (y ^= g[g[y]]))
                                            : (v = y = 1);
                                }
                            })();
                            var S = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                                _ = (u.AES = s.extend({
                                    _doReset: function () {
                                        var g;
                                        if (
                                            !(
                                                this._nRounds &&
                                                this._keyPriorReset ===
                                                    this._key
                                            )
                                        ) {
                                            for (
                                                var A = (this._keyPriorReset =
                                                        this._key),
                                                    v = A.words,
                                                    y = A.sigBytes / 4,
                                                    D = (this._nRounds = y + 6),
                                                    P = (D + 1) * 4,
                                                    Y = (this._keySchedule =
                                                        []),
                                                    N = 0;
                                                N < P;
                                                N++
                                            )
                                                N < y
                                                    ? (Y[N] = v[N])
                                                    : ((g = Y[N - 1]),
                                                      N % y
                                                          ? y > 6 &&
                                                            N % y == 4 &&
                                                            (g =
                                                                (o[g >>> 24] <<
                                                                    24) |
                                                                (o[
                                                                    (g >>> 16) &
                                                                        255
                                                                ] <<
                                                                    16) |
                                                                (o[
                                                                    (g >>> 8) &
                                                                        255
                                                                ] <<
                                                                    8) |
                                                                o[g & 255])
                                                          : ((g =
                                                                (g << 8) |
                                                                (g >>> 24)),
                                                            (g =
                                                                (o[g >>> 24] <<
                                                                    24) |
                                                                (o[
                                                                    (g >>> 16) &
                                                                        255
                                                                ] <<
                                                                    16) |
                                                                (o[
                                                                    (g >>> 8) &
                                                                        255
                                                                ] <<
                                                                    8) |
                                                                o[g & 255]),
                                                            (g ^=
                                                                S[
                                                                    (N / y) | 0
                                                                ] << 24)),
                                                      (Y[N] = Y[N - y] ^ g));
                                            for (
                                                var R = (this._invKeySchedule =
                                                        []),
                                                    w = 0;
                                                w < P;
                                                w++
                                            ) {
                                                var N = P - w;
                                                if (w % 4) var g = Y[N];
                                                else var g = Y[N - 4];
                                                w < 4 || N <= 4
                                                    ? (R[w] = g)
                                                    : (R[w] =
                                                          m[o[g >>> 24]] ^
                                                          p[
                                                              o[
                                                                  (g >>> 16) &
                                                                      255
                                                              ]
                                                          ] ^
                                                          x[
                                                              o[(g >>> 8) & 255]
                                                          ] ^
                                                          C[o[g & 255]]);
                                            }
                                        }
                                    },
                                    encryptBlock: function (g, A) {
                                        this._doCryptBlock(
                                            g,
                                            A,
                                            this._keySchedule,
                                            c,
                                            d,
                                            h,
                                            f,
                                            o
                                        );
                                    },
                                    decryptBlock: function (g, A) {
                                        var v = g[A + 1];
                                        (g[A + 1] = g[A + 3]),
                                            (g[A + 3] = v),
                                            this._doCryptBlock(
                                                g,
                                                A,
                                                this._invKeySchedule,
                                                m,
                                                p,
                                                x,
                                                C,
                                                l
                                            );
                                        var v = g[A + 1];
                                        (g[A + 1] = g[A + 3]), (g[A + 3] = v);
                                    },
                                    _doCryptBlock: function (
                                        g,
                                        A,
                                        v,
                                        y,
                                        D,
                                        P,
                                        Y,
                                        N
                                    ) {
                                        for (
                                            var R = this._nRounds,
                                                w = g[A] ^ v[0],
                                                H = g[A + 1] ^ v[1],
                                                W = g[A + 2] ^ v[2],
                                                V = g[A + 3] ^ v[3],
                                                K = 4,
                                                ue = 1;
                                            ue < R;
                                            ue++
                                        ) {
                                            var re =
                                                    y[w >>> 24] ^
                                                    D[(H >>> 16) & 255] ^
                                                    P[(W >>> 8) & 255] ^
                                                    Y[V & 255] ^
                                                    v[K++],
                                                se =
                                                    y[H >>> 24] ^
                                                    D[(W >>> 16) & 255] ^
                                                    P[(V >>> 8) & 255] ^
                                                    Y[w & 255] ^
                                                    v[K++],
                                                ae =
                                                    y[W >>> 24] ^
                                                    D[(V >>> 16) & 255] ^
                                                    P[(w >>> 8) & 255] ^
                                                    Y[H & 255] ^
                                                    v[K++],
                                                k =
                                                    y[V >>> 24] ^
                                                    D[(w >>> 16) & 255] ^
                                                    P[(H >>> 8) & 255] ^
                                                    Y[W & 255] ^
                                                    v[K++];
                                            (w = re),
                                                (H = se),
                                                (W = ae),
                                                (V = k);
                                        }
                                        var re =
                                                ((N[w >>> 24] << 24) |
                                                    (N[(H >>> 16) & 255] <<
                                                        16) |
                                                    (N[(W >>> 8) & 255] << 8) |
                                                    N[V & 255]) ^
                                                v[K++],
                                            se =
                                                ((N[H >>> 24] << 24) |
                                                    (N[(W >>> 16) & 255] <<
                                                        16) |
                                                    (N[(V >>> 8) & 255] << 8) |
                                                    N[w & 255]) ^
                                                v[K++],
                                            ae =
                                                ((N[W >>> 24] << 24) |
                                                    (N[(V >>> 16) & 255] <<
                                                        16) |
                                                    (N[(w >>> 8) & 255] << 8) |
                                                    N[H & 255]) ^
                                                v[K++],
                                            k =
                                                ((N[V >>> 24] << 24) |
                                                    (N[(w >>> 16) & 255] <<
                                                        16) |
                                                    (N[(H >>> 8) & 255] << 8) |
                                                    N[W & 255]) ^
                                                v[K++];
                                        (g[A] = re),
                                            (g[A + 1] = se),
                                            (g[A + 2] = ae),
                                            (g[A + 3] = k);
                                    },
                                    keySize: 256 / 32,
                                }));
                            a.AES = s._createHelper(_);
                        })(),
                        r.AES
                    );
                });
            })(fa)),
        fa.exports
    );
}
var ha = { exports: {} },
    Is;
function Qf() {
    return (
        Is ||
            ((Is = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), pt(), mt(), et(), he());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.WordArray,
                                u = n.BlockCipher,
                                o = a.algo,
                                l = [
                                    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42,
                                    34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19,
                                    11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31,
                                    23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6,
                                    61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12,
                                    4,
                                ],
                                c = [
                                    14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
                                    23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
                                    41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33,
                                    48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36,
                                    29, 32,
                                ],
                                d = [
                                    1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21,
                                    23, 25, 27, 28,
                                ],
                                h = [
                                    {
                                        0: 8421888,
                                        268435456: 32768,
                                        536870912: 8421378,
                                        805306368: 2,
                                        1073741824: 512,
                                        1342177280: 8421890,
                                        1610612736: 8389122,
                                        1879048192: 8388608,
                                        2147483648: 514,
                                        2415919104: 8389120,
                                        2684354560: 33280,
                                        2952790016: 8421376,
                                        3221225472: 32770,
                                        3489660928: 8388610,
                                        3758096384: 0,
                                        4026531840: 33282,
                                        134217728: 0,
                                        402653184: 8421890,
                                        671088640: 33282,
                                        939524096: 32768,
                                        1207959552: 8421888,
                                        1476395008: 512,
                                        1744830464: 8421378,
                                        2013265920: 2,
                                        2281701376: 8389120,
                                        2550136832: 33280,
                                        2818572288: 8421376,
                                        3087007744: 8389122,
                                        3355443200: 8388610,
                                        3623878656: 32770,
                                        3892314112: 514,
                                        4160749568: 8388608,
                                        1: 32768,
                                        268435457: 2,
                                        536870913: 8421888,
                                        805306369: 8388608,
                                        1073741825: 8421378,
                                        1342177281: 33280,
                                        1610612737: 512,
                                        1879048193: 8389122,
                                        2147483649: 8421890,
                                        2415919105: 8421376,
                                        2684354561: 8388610,
                                        2952790017: 33282,
                                        3221225473: 514,
                                        3489660929: 8389120,
                                        3758096385: 32770,
                                        4026531841: 0,
                                        134217729: 8421890,
                                        402653185: 8421376,
                                        671088641: 8388608,
                                        939524097: 512,
                                        1207959553: 32768,
                                        1476395009: 8388610,
                                        1744830465: 2,
                                        2013265921: 33282,
                                        2281701377: 32770,
                                        2550136833: 8389122,
                                        2818572289: 514,
                                        3087007745: 8421888,
                                        3355443201: 8389120,
                                        3623878657: 0,
                                        3892314113: 33280,
                                        4160749569: 8421378,
                                    },
                                    {
                                        0: 1074282512,
                                        16777216: 16384,
                                        33554432: 524288,
                                        50331648: 1074266128,
                                        67108864: 1073741840,
                                        83886080: 1074282496,
                                        100663296: 1073758208,
                                        117440512: 16,
                                        134217728: 540672,
                                        150994944: 1073758224,
                                        167772160: 1073741824,
                                        184549376: 540688,
                                        201326592: 524304,
                                        218103808: 0,
                                        234881024: 16400,
                                        251658240: 1074266112,
                                        8388608: 1073758208,
                                        25165824: 540688,
                                        41943040: 16,
                                        58720256: 1073758224,
                                        75497472: 1074282512,
                                        92274688: 1073741824,
                                        109051904: 524288,
                                        125829120: 1074266128,
                                        142606336: 524304,
                                        159383552: 0,
                                        176160768: 16384,
                                        192937984: 1074266112,
                                        209715200: 1073741840,
                                        226492416: 540672,
                                        243269632: 1074282496,
                                        260046848: 16400,
                                        268435456: 0,
                                        285212672: 1074266128,
                                        301989888: 1073758224,
                                        318767104: 1074282496,
                                        335544320: 1074266112,
                                        352321536: 16,
                                        369098752: 540688,
                                        385875968: 16384,
                                        402653184: 16400,
                                        419430400: 524288,
                                        436207616: 524304,
                                        452984832: 1073741840,
                                        469762048: 540672,
                                        486539264: 1073758208,
                                        503316480: 1073741824,
                                        520093696: 1074282512,
                                        276824064: 540688,
                                        293601280: 524288,
                                        310378496: 1074266112,
                                        327155712: 16384,
                                        343932928: 1073758208,
                                        360710144: 1074282512,
                                        377487360: 16,
                                        394264576: 1073741824,
                                        411041792: 1074282496,
                                        427819008: 1073741840,
                                        444596224: 1073758224,
                                        461373440: 524304,
                                        478150656: 0,
                                        494927872: 16400,
                                        511705088: 1074266128,
                                        528482304: 540672,
                                    },
                                    {
                                        0: 260,
                                        1048576: 0,
                                        2097152: 67109120,
                                        3145728: 65796,
                                        4194304: 65540,
                                        5242880: 67108868,
                                        6291456: 67174660,
                                        7340032: 67174400,
                                        8388608: 67108864,
                                        9437184: 67174656,
                                        10485760: 65792,
                                        11534336: 67174404,
                                        12582912: 67109124,
                                        13631488: 65536,
                                        14680064: 4,
                                        15728640: 256,
                                        524288: 67174656,
                                        1572864: 67174404,
                                        2621440: 0,
                                        3670016: 67109120,
                                        4718592: 67108868,
                                        5767168: 65536,
                                        6815744: 65540,
                                        7864320: 260,
                                        8912896: 4,
                                        9961472: 256,
                                        11010048: 67174400,
                                        12058624: 65796,
                                        13107200: 65792,
                                        14155776: 67109124,
                                        15204352: 67174660,
                                        16252928: 67108864,
                                        16777216: 67174656,
                                        17825792: 65540,
                                        18874368: 65536,
                                        19922944: 67109120,
                                        20971520: 256,
                                        22020096: 67174660,
                                        23068672: 67108868,
                                        24117248: 0,
                                        25165824: 67109124,
                                        26214400: 67108864,
                                        27262976: 4,
                                        28311552: 65792,
                                        29360128: 67174400,
                                        30408704: 260,
                                        31457280: 65796,
                                        32505856: 67174404,
                                        17301504: 67108864,
                                        18350080: 260,
                                        19398656: 67174656,
                                        20447232: 0,
                                        21495808: 65540,
                                        22544384: 67109120,
                                        23592960: 256,
                                        24641536: 67174404,
                                        25690112: 65536,
                                        26738688: 67174660,
                                        27787264: 65796,
                                        28835840: 67108868,
                                        29884416: 67109124,
                                        30932992: 67174400,
                                        31981568: 4,
                                        33030144: 65792,
                                    },
                                    {
                                        0: 2151682048,
                                        65536: 2147487808,
                                        131072: 4198464,
                                        196608: 2151677952,
                                        262144: 0,
                                        327680: 4198400,
                                        393216: 2147483712,
                                        458752: 4194368,
                                        524288: 2147483648,
                                        589824: 4194304,
                                        655360: 64,
                                        720896: 2147487744,
                                        786432: 2151678016,
                                        851968: 4160,
                                        917504: 4096,
                                        983040: 2151682112,
                                        32768: 2147487808,
                                        98304: 64,
                                        163840: 2151678016,
                                        229376: 2147487744,
                                        294912: 4198400,
                                        360448: 2151682112,
                                        425984: 0,
                                        491520: 2151677952,
                                        557056: 4096,
                                        622592: 2151682048,
                                        688128: 4194304,
                                        753664: 4160,
                                        819200: 2147483648,
                                        884736: 4194368,
                                        950272: 4198464,
                                        1015808: 2147483712,
                                        1048576: 4194368,
                                        1114112: 4198400,
                                        1179648: 2147483712,
                                        1245184: 0,
                                        1310720: 4160,
                                        1376256: 2151678016,
                                        1441792: 2151682048,
                                        1507328: 2147487808,
                                        1572864: 2151682112,
                                        1638400: 2147483648,
                                        1703936: 2151677952,
                                        1769472: 4198464,
                                        1835008: 2147487744,
                                        1900544: 4194304,
                                        1966080: 64,
                                        2031616: 4096,
                                        1081344: 2151677952,
                                        1146880: 2151682112,
                                        1212416: 0,
                                        1277952: 4198400,
                                        1343488: 4194368,
                                        1409024: 2147483648,
                                        1474560: 2147487808,
                                        1540096: 64,
                                        1605632: 2147483712,
                                        1671168: 4096,
                                        1736704: 2147487744,
                                        1802240: 2151678016,
                                        1867776: 4160,
                                        1933312: 2151682048,
                                        1998848: 4194304,
                                        2064384: 4198464,
                                    },
                                    {
                                        0: 128,
                                        4096: 17039360,
                                        8192: 262144,
                                        12288: 536870912,
                                        16384: 537133184,
                                        20480: 16777344,
                                        24576: 553648256,
                                        28672: 262272,
                                        32768: 16777216,
                                        36864: 537133056,
                                        40960: 536871040,
                                        45056: 553910400,
                                        49152: 553910272,
                                        53248: 0,
                                        57344: 17039488,
                                        61440: 553648128,
                                        2048: 17039488,
                                        6144: 553648256,
                                        10240: 128,
                                        14336: 17039360,
                                        18432: 262144,
                                        22528: 537133184,
                                        26624: 553910272,
                                        30720: 536870912,
                                        34816: 537133056,
                                        38912: 0,
                                        43008: 553910400,
                                        47104: 16777344,
                                        51200: 536871040,
                                        55296: 553648128,
                                        59392: 16777216,
                                        63488: 262272,
                                        65536: 262144,
                                        69632: 128,
                                        73728: 536870912,
                                        77824: 553648256,
                                        81920: 16777344,
                                        86016: 553910272,
                                        90112: 537133184,
                                        94208: 16777216,
                                        98304: 553910400,
                                        102400: 553648128,
                                        106496: 17039360,
                                        110592: 537133056,
                                        114688: 262272,
                                        118784: 536871040,
                                        122880: 0,
                                        126976: 17039488,
                                        67584: 553648256,
                                        71680: 16777216,
                                        75776: 17039360,
                                        79872: 537133184,
                                        83968: 536870912,
                                        88064: 17039488,
                                        92160: 128,
                                        96256: 553910272,
                                        100352: 262272,
                                        104448: 553910400,
                                        108544: 0,
                                        112640: 553648128,
                                        116736: 16777344,
                                        120832: 262144,
                                        124928: 537133056,
                                        129024: 536871040,
                                    },
                                    {
                                        0: 268435464,
                                        256: 8192,
                                        512: 270532608,
                                        768: 270540808,
                                        1024: 268443648,
                                        1280: 2097152,
                                        1536: 2097160,
                                        1792: 268435456,
                                        2048: 0,
                                        2304: 268443656,
                                        2560: 2105344,
                                        2816: 8,
                                        3072: 270532616,
                                        3328: 2105352,
                                        3584: 8200,
                                        3840: 270540800,
                                        128: 270532608,
                                        384: 270540808,
                                        640: 8,
                                        896: 2097152,
                                        1152: 2105352,
                                        1408: 268435464,
                                        1664: 268443648,
                                        1920: 8200,
                                        2176: 2097160,
                                        2432: 8192,
                                        2688: 268443656,
                                        2944: 270532616,
                                        3200: 0,
                                        3456: 270540800,
                                        3712: 2105344,
                                        3968: 268435456,
                                        4096: 268443648,
                                        4352: 270532616,
                                        4608: 270540808,
                                        4864: 8200,
                                        5120: 2097152,
                                        5376: 268435456,
                                        5632: 268435464,
                                        5888: 2105344,
                                        6144: 2105352,
                                        6400: 0,
                                        6656: 8,
                                        6912: 270532608,
                                        7168: 8192,
                                        7424: 268443656,
                                        7680: 270540800,
                                        7936: 2097160,
                                        4224: 8,
                                        4480: 2105344,
                                        4736: 2097152,
                                        4992: 268435464,
                                        5248: 268443648,
                                        5504: 8200,
                                        5760: 270540808,
                                        6016: 270532608,
                                        6272: 270540800,
                                        6528: 270532616,
                                        6784: 8192,
                                        7040: 2105352,
                                        7296: 2097160,
                                        7552: 0,
                                        7808: 268435456,
                                        8064: 268443656,
                                    },
                                    {
                                        0: 1048576,
                                        16: 33555457,
                                        32: 1024,
                                        48: 1049601,
                                        64: 34604033,
                                        80: 0,
                                        96: 1,
                                        112: 34603009,
                                        128: 33555456,
                                        144: 1048577,
                                        160: 33554433,
                                        176: 34604032,
                                        192: 34603008,
                                        208: 1025,
                                        224: 1049600,
                                        240: 33554432,
                                        8: 34603009,
                                        24: 0,
                                        40: 33555457,
                                        56: 34604032,
                                        72: 1048576,
                                        88: 33554433,
                                        104: 33554432,
                                        120: 1025,
                                        136: 1049601,
                                        152: 33555456,
                                        168: 34603008,
                                        184: 1048577,
                                        200: 1024,
                                        216: 34604033,
                                        232: 1,
                                        248: 1049600,
                                        256: 33554432,
                                        272: 1048576,
                                        288: 33555457,
                                        304: 34603009,
                                        320: 1048577,
                                        336: 33555456,
                                        352: 34604032,
                                        368: 1049601,
                                        384: 1025,
                                        400: 34604033,
                                        416: 1049600,
                                        432: 1,
                                        448: 0,
                                        464: 34603008,
                                        480: 33554433,
                                        496: 1024,
                                        264: 1049600,
                                        280: 33555457,
                                        296: 34603009,
                                        312: 1,
                                        328: 33554432,
                                        344: 1048576,
                                        360: 1025,
                                        376: 34604032,
                                        392: 33554433,
                                        408: 34603008,
                                        424: 0,
                                        440: 34604033,
                                        456: 1049601,
                                        472: 1024,
                                        488: 33555456,
                                        504: 1048577,
                                    },
                                    {
                                        0: 134219808,
                                        1: 131072,
                                        2: 134217728,
                                        3: 32,
                                        4: 131104,
                                        5: 134350880,
                                        6: 134350848,
                                        7: 2048,
                                        8: 134348800,
                                        9: 134219776,
                                        10: 133120,
                                        11: 134348832,
                                        12: 2080,
                                        13: 0,
                                        14: 134217760,
                                        15: 133152,
                                        2147483648: 2048,
                                        2147483649: 134350880,
                                        2147483650: 134219808,
                                        2147483651: 134217728,
                                        2147483652: 134348800,
                                        2147483653: 133120,
                                        2147483654: 133152,
                                        2147483655: 32,
                                        2147483656: 134217760,
                                        2147483657: 2080,
                                        2147483658: 131104,
                                        2147483659: 134350848,
                                        2147483660: 0,
                                        2147483661: 134348832,
                                        2147483662: 134219776,
                                        2147483663: 131072,
                                        16: 133152,
                                        17: 134350848,
                                        18: 32,
                                        19: 2048,
                                        20: 134219776,
                                        21: 134217760,
                                        22: 134348832,
                                        23: 131072,
                                        24: 0,
                                        25: 131104,
                                        26: 134348800,
                                        27: 134219808,
                                        28: 134350880,
                                        29: 133120,
                                        30: 2080,
                                        31: 134217728,
                                        2147483664: 131072,
                                        2147483665: 2048,
                                        2147483666: 134348832,
                                        2147483667: 133152,
                                        2147483668: 32,
                                        2147483669: 134348800,
                                        2147483670: 134217728,
                                        2147483671: 134219808,
                                        2147483672: 134350880,
                                        2147483673: 134217760,
                                        2147483674: 134219776,
                                        2147483675: 0,
                                        2147483676: 133120,
                                        2147483677: 2080,
                                        2147483678: 131104,
                                        2147483679: 134350848,
                                    },
                                ],
                                f = [
                                    4160749569, 528482304, 33030144, 2064384,
                                    129024, 8064, 504, 2147483679,
                                ],
                                m = (o.DES = u.extend({
                                    _doReset: function () {
                                        for (
                                            var S = this._key,
                                                _ = S.words,
                                                g = [],
                                                A = 0;
                                            A < 56;
                                            A++
                                        ) {
                                            var v = l[A] - 1;
                                            g[A] =
                                                (_[v >>> 5] >>>
                                                    (31 - (v % 32))) &
                                                1;
                                        }
                                        for (
                                            var y = (this._subKeys = []), D = 0;
                                            D < 16;
                                            D++
                                        ) {
                                            for (
                                                var P = (y[D] = []),
                                                    Y = d[D],
                                                    A = 0;
                                                A < 24;
                                                A++
                                            )
                                                (P[(A / 6) | 0] |=
                                                    g[(c[A] - 1 + Y) % 28] <<
                                                    (31 - (A % 6))),
                                                    (P[4 + ((A / 6) | 0)] |=
                                                        g[
                                                            28 +
                                                                ((c[A + 24] -
                                                                    1 +
                                                                    Y) %
                                                                    28)
                                                        ] <<
                                                        (31 - (A % 6)));
                                            P[0] = (P[0] << 1) | (P[0] >>> 31);
                                            for (var A = 1; A < 7; A++)
                                                P[A] =
                                                    P[A] >>> ((A - 1) * 4 + 3);
                                            P[7] = (P[7] << 5) | (P[7] >>> 27);
                                        }
                                        for (
                                            var N = (this._invSubKeys = []),
                                                A = 0;
                                            A < 16;
                                            A++
                                        )
                                            N[A] = y[15 - A];
                                    },
                                    encryptBlock: function (S, _) {
                                        this._doCryptBlock(S, _, this._subKeys);
                                    },
                                    decryptBlock: function (S, _) {
                                        this._doCryptBlock(
                                            S,
                                            _,
                                            this._invSubKeys
                                        );
                                    },
                                    _doCryptBlock: function (S, _, g) {
                                        (this._lBlock = S[_]),
                                            (this._rBlock = S[_ + 1]),
                                            p.call(this, 4, 252645135),
                                            p.call(this, 16, 65535),
                                            x.call(this, 2, 858993459),
                                            x.call(this, 8, 16711935),
                                            p.call(this, 1, 1431655765);
                                        for (var A = 0; A < 16; A++) {
                                            for (
                                                var v = g[A],
                                                    y = this._lBlock,
                                                    D = this._rBlock,
                                                    P = 0,
                                                    Y = 0;
                                                Y < 8;
                                                Y++
                                            )
                                                P |=
                                                    h[Y][
                                                        ((D ^ v[Y]) & f[Y]) >>>
                                                            0
                                                    ];
                                            (this._lBlock = D),
                                                (this._rBlock = y ^ P);
                                        }
                                        var N = this._lBlock;
                                        (this._lBlock = this._rBlock),
                                            (this._rBlock = N),
                                            p.call(this, 1, 1431655765),
                                            x.call(this, 8, 16711935),
                                            x.call(this, 2, 858993459),
                                            p.call(this, 16, 65535),
                                            p.call(this, 4, 252645135),
                                            (S[_] = this._lBlock),
                                            (S[_ + 1] = this._rBlock);
                                    },
                                    keySize: 64 / 32,
                                    ivSize: 64 / 32,
                                    blockSize: 64 / 32,
                                }));
                            function p(S, _) {
                                var g =
                                    ((this._lBlock >>> S) ^ this._rBlock) & _;
                                (this._rBlock ^= g), (this._lBlock ^= g << S);
                            }
                            function x(S, _) {
                                var g =
                                    ((this._rBlock >>> S) ^ this._lBlock) & _;
                                (this._lBlock ^= g), (this._rBlock ^= g << S);
                            }
                            a.DES = u._createHelper(m);
                            var C = (o.TripleDES = u.extend({
                                _doReset: function () {
                                    var S = this._key,
                                        _ = S.words;
                                    if (
                                        _.length !== 2 &&
                                        _.length !== 4 &&
                                        _.length < 6
                                    )
                                        throw new Error(
                                            "Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192."
                                        );
                                    var g = _.slice(0, 2),
                                        A =
                                            _.length < 4
                                                ? _.slice(0, 2)
                                                : _.slice(2, 4),
                                        v =
                                            _.length < 6
                                                ? _.slice(0, 2)
                                                : _.slice(4, 6);
                                    (this._des1 = m.createEncryptor(
                                        s.create(g)
                                    )),
                                        (this._des2 = m.createEncryptor(
                                            s.create(A)
                                        )),
                                        (this._des3 = m.createEncryptor(
                                            s.create(v)
                                        ));
                                },
                                encryptBlock: function (S, _) {
                                    this._des1.encryptBlock(S, _),
                                        this._des2.decryptBlock(S, _),
                                        this._des3.encryptBlock(S, _);
                                },
                                decryptBlock: function (S, _) {
                                    this._des3.decryptBlock(S, _),
                                        this._des2.encryptBlock(S, _),
                                        this._des1.decryptBlock(S, _);
                                },
                                keySize: 192 / 32,
                                ivSize: 64 / 32,
                                blockSize: 64 / 32,
                            }));
                            a.TripleDES = u._createHelper(C);
                        })(),
                        r.TripleDES
                    );
                });
            })(ha)),
        ha.exports
    );
}
var Ea = { exports: {} },
    Ss;
function Xf() {
    return (
        Ss ||
            ((Ss = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), pt(), mt(), et(), he());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.StreamCipher,
                                u = a.algo,
                                o = (u.RC4 = s.extend({
                                    _doReset: function () {
                                        for (
                                            var d = this._key,
                                                h = d.words,
                                                f = d.sigBytes,
                                                m = (this._S = []),
                                                p = 0;
                                            p < 256;
                                            p++
                                        )
                                            m[p] = p;
                                        for (var p = 0, x = 0; p < 256; p++) {
                                            var C = p % f,
                                                S =
                                                    (h[C >>> 2] >>>
                                                        (24 - (C % 4) * 8)) &
                                                    255;
                                            x = (x + m[p] + S) % 256;
                                            var _ = m[p];
                                            (m[p] = m[x]), (m[x] = _);
                                        }
                                        this._i = this._j = 0;
                                    },
                                    _doProcessBlock: function (d, h) {
                                        d[h] ^= l.call(this);
                                    },
                                    keySize: 256 / 32,
                                    ivSize: 0,
                                }));
                            function l() {
                                for (
                                    var d = this._S,
                                        h = this._i,
                                        f = this._j,
                                        m = 0,
                                        p = 0;
                                    p < 4;
                                    p++
                                ) {
                                    (h = (h + 1) % 256), (f = (f + d[h]) % 256);
                                    var x = d[h];
                                    (d[h] = d[f]),
                                        (d[f] = x),
                                        (m |=
                                            d[(d[h] + d[f]) % 256] <<
                                            (24 - p * 8));
                                }
                                return (this._i = h), (this._j = f), m;
                            }
                            a.RC4 = s._createHelper(o);
                            var c = (u.RC4Drop = o.extend({
                                cfg: o.cfg.extend({ drop: 192 }),
                                _doReset: function () {
                                    o._doReset.call(this);
                                    for (var d = this.cfg.drop; d > 0; d--)
                                        l.call(this);
                                },
                            }));
                            a.RC4Drop = s._createHelper(c);
                        })(),
                        r.RC4
                    );
                });
            })(Ea)),
        Ea.exports
    );
}
var pa = { exports: {} },
    Rs;
function zf() {
    return (
        Rs ||
            ((Rs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), pt(), mt(), et(), he());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.StreamCipher,
                                u = a.algo,
                                o = [],
                                l = [],
                                c = [],
                                d = (u.Rabbit = s.extend({
                                    _doReset: function () {
                                        for (
                                            var f = this._key.words,
                                                m = this.cfg.iv,
                                                p = 0;
                                            p < 4;
                                            p++
                                        )
                                            f[p] =
                                                (((f[p] << 8) | (f[p] >>> 24)) &
                                                    16711935) |
                                                (((f[p] << 24) | (f[p] >>> 8)) &
                                                    4278255360);
                                        var x = (this._X = [
                                                f[0],
                                                (f[3] << 16) | (f[2] >>> 16),
                                                f[1],
                                                (f[0] << 16) | (f[3] >>> 16),
                                                f[2],
                                                (f[1] << 16) | (f[0] >>> 16),
                                                f[3],
                                                (f[2] << 16) | (f[1] >>> 16),
                                            ]),
                                            C = (this._C = [
                                                (f[2] << 16) | (f[2] >>> 16),
                                                (f[0] & 4294901760) |
                                                    (f[1] & 65535),
                                                (f[3] << 16) | (f[3] >>> 16),
                                                (f[1] & 4294901760) |
                                                    (f[2] & 65535),
                                                (f[0] << 16) | (f[0] >>> 16),
                                                (f[2] & 4294901760) |
                                                    (f[3] & 65535),
                                                (f[1] << 16) | (f[1] >>> 16),
                                                (f[3] & 4294901760) |
                                                    (f[0] & 65535),
                                            ]);
                                        this._b = 0;
                                        for (var p = 0; p < 4; p++)
                                            h.call(this);
                                        for (var p = 0; p < 8; p++)
                                            C[p] ^= x[(p + 4) & 7];
                                        if (m) {
                                            var S = m.words,
                                                _ = S[0],
                                                g = S[1],
                                                A =
                                                    (((_ << 8) | (_ >>> 24)) &
                                                        16711935) |
                                                    (((_ << 24) | (_ >>> 8)) &
                                                        4278255360),
                                                v =
                                                    (((g << 8) | (g >>> 24)) &
                                                        16711935) |
                                                    (((g << 24) | (g >>> 8)) &
                                                        4278255360),
                                                y =
                                                    (A >>> 16) |
                                                    (v & 4294901760),
                                                D = (v << 16) | (A & 65535);
                                            (C[0] ^= A),
                                                (C[1] ^= y),
                                                (C[2] ^= v),
                                                (C[3] ^= D),
                                                (C[4] ^= A),
                                                (C[5] ^= y),
                                                (C[6] ^= v),
                                                (C[7] ^= D);
                                            for (var p = 0; p < 4; p++)
                                                h.call(this);
                                        }
                                    },
                                    _doProcessBlock: function (f, m) {
                                        var p = this._X;
                                        h.call(this),
                                            (o[0] =
                                                p[0] ^
                                                (p[5] >>> 16) ^
                                                (p[3] << 16)),
                                            (o[1] =
                                                p[2] ^
                                                (p[7] >>> 16) ^
                                                (p[5] << 16)),
                                            (o[2] =
                                                p[4] ^
                                                (p[1] >>> 16) ^
                                                (p[7] << 16)),
                                            (o[3] =
                                                p[6] ^
                                                (p[3] >>> 16) ^
                                                (p[1] << 16));
                                        for (var x = 0; x < 4; x++)
                                            (o[x] =
                                                (((o[x] << 8) | (o[x] >>> 24)) &
                                                    16711935) |
                                                (((o[x] << 24) | (o[x] >>> 8)) &
                                                    4278255360)),
                                                (f[m + x] ^= o[x]);
                                    },
                                    blockSize: 128 / 32,
                                    ivSize: 64 / 32,
                                }));
                            function h() {
                                for (
                                    var f = this._X, m = this._C, p = 0;
                                    p < 8;
                                    p++
                                )
                                    l[p] = m[p];
                                (m[0] = (m[0] + 1295307597 + this._b) | 0),
                                    (m[1] =
                                        (m[1] +
                                            3545052371 +
                                            (m[0] >>> 0 < l[0] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[2] =
                                        (m[2] +
                                            886263092 +
                                            (m[1] >>> 0 < l[1] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[3] =
                                        (m[3] +
                                            1295307597 +
                                            (m[2] >>> 0 < l[2] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[4] =
                                        (m[4] +
                                            3545052371 +
                                            (m[3] >>> 0 < l[3] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[5] =
                                        (m[5] +
                                            886263092 +
                                            (m[4] >>> 0 < l[4] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[6] =
                                        (m[6] +
                                            1295307597 +
                                            (m[5] >>> 0 < l[5] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[7] =
                                        (m[7] +
                                            3545052371 +
                                            (m[6] >>> 0 < l[6] >>> 0 ? 1 : 0)) |
                                        0),
                                    (this._b = m[7] >>> 0 < l[7] >>> 0 ? 1 : 0);
                                for (var p = 0; p < 8; p++) {
                                    var x = f[p] + m[p],
                                        C = x & 65535,
                                        S = x >>> 16,
                                        _ =
                                            ((((C * C) >>> 17) + C * S) >>>
                                                15) +
                                            S * S,
                                        g =
                                            (((x & 4294901760) * x) | 0) +
                                            (((x & 65535) * x) | 0);
                                    c[p] = _ ^ g;
                                }
                                (f[0] =
                                    (c[0] +
                                        ((c[7] << 16) | (c[7] >>> 16)) +
                                        ((c[6] << 16) | (c[6] >>> 16))) |
                                    0),
                                    (f[1] =
                                        (c[1] +
                                            ((c[0] << 8) | (c[0] >>> 24)) +
                                            c[7]) |
                                        0),
                                    (f[2] =
                                        (c[2] +
                                            ((c[1] << 16) | (c[1] >>> 16)) +
                                            ((c[0] << 16) | (c[0] >>> 16))) |
                                        0),
                                    (f[3] =
                                        (c[3] +
                                            ((c[2] << 8) | (c[2] >>> 24)) +
                                            c[1]) |
                                        0),
                                    (f[4] =
                                        (c[4] +
                                            ((c[3] << 16) | (c[3] >>> 16)) +
                                            ((c[2] << 16) | (c[2] >>> 16))) |
                                        0),
                                    (f[5] =
                                        (c[5] +
                                            ((c[4] << 8) | (c[4] >>> 24)) +
                                            c[3]) |
                                        0),
                                    (f[6] =
                                        (c[6] +
                                            ((c[5] << 16) | (c[5] >>> 16)) +
                                            ((c[4] << 16) | (c[4] >>> 16))) |
                                        0),
                                    (f[7] =
                                        (c[7] +
                                            ((c[6] << 8) | (c[6] >>> 24)) +
                                            c[5]) |
                                        0);
                            }
                            a.Rabbit = s._createHelper(d);
                        })(),
                        r.Rabbit
                    );
                });
            })(pa)),
        pa.exports
    );
}
var ma = { exports: {} },
    vs;
function jf() {
    return (
        vs ||
            ((vs = 1),
            (function (e, t) {
                (function (r, a, n) {
                    e.exports = a(J(), pt(), mt(), et(), he());
                })(j, function (r) {
                    return (
                        (function () {
                            var a = r,
                                n = a.lib,
                                s = n.StreamCipher,
                                u = a.algo,
                                o = [],
                                l = [],
                                c = [],
                                d = (u.RabbitLegacy = s.extend({
                                    _doReset: function () {
                                        var f = this._key.words,
                                            m = this.cfg.iv,
                                            p = (this._X = [
                                                f[0],
                                                (f[3] << 16) | (f[2] >>> 16),
                                                f[1],
                                                (f[0] << 16) | (f[3] >>> 16),
                                                f[2],
                                                (f[1] << 16) | (f[0] >>> 16),
                                                f[3],
                                                (f[2] << 16) | (f[1] >>> 16),
                                            ]),
                                            x = (this._C = [
                                                (f[2] << 16) | (f[2] >>> 16),
                                                (f[0] & 4294901760) |
                                                    (f[1] & 65535),
                                                (f[3] << 16) | (f[3] >>> 16),
                                                (f[1] & 4294901760) |
                                                    (f[2] & 65535),
                                                (f[0] << 16) | (f[0] >>> 16),
                                                (f[2] & 4294901760) |
                                                    (f[3] & 65535),
                                                (f[1] << 16) | (f[1] >>> 16),
                                                (f[3] & 4294901760) |
                                                    (f[0] & 65535),
                                            ]);
                                        this._b = 0;
                                        for (var C = 0; C < 4; C++)
                                            h.call(this);
                                        for (var C = 0; C < 8; C++)
                                            x[C] ^= p[(C + 4) & 7];
                                        if (m) {
                                            var S = m.words,
                                                _ = S[0],
                                                g = S[1],
                                                A =
                                                    (((_ << 8) | (_ >>> 24)) &
                                                        16711935) |
                                                    (((_ << 24) | (_ >>> 8)) &
                                                        4278255360),
                                                v =
                                                    (((g << 8) | (g >>> 24)) &
                                                        16711935) |
                                                    (((g << 24) | (g >>> 8)) &
                                                        4278255360),
                                                y =
                                                    (A >>> 16) |
                                                    (v & 4294901760),
                                                D = (v << 16) | (A & 65535);
                                            (x[0] ^= A),
                                                (x[1] ^= y),
                                                (x[2] ^= v),
                                                (x[3] ^= D),
                                                (x[4] ^= A),
                                                (x[5] ^= y),
                                                (x[6] ^= v),
                                                (x[7] ^= D);
                                            for (var C = 0; C < 4; C++)
                                                h.call(this);
                                        }
                                    },
                                    _doProcessBlock: function (f, m) {
                                        var p = this._X;
                                        h.call(this),
                                            (o[0] =
                                                p[0] ^
                                                (p[5] >>> 16) ^
                                                (p[3] << 16)),
                                            (o[1] =
                                                p[2] ^
                                                (p[7] >>> 16) ^
                                                (p[5] << 16)),
                                            (o[2] =
                                                p[4] ^
                                                (p[1] >>> 16) ^
                                                (p[7] << 16)),
                                            (o[3] =
                                                p[6] ^
                                                (p[3] >>> 16) ^
                                                (p[1] << 16));
                                        for (var x = 0; x < 4; x++)
                                            (o[x] =
                                                (((o[x] << 8) | (o[x] >>> 24)) &
                                                    16711935) |
                                                (((o[x] << 24) | (o[x] >>> 8)) &
                                                    4278255360)),
                                                (f[m + x] ^= o[x]);
                                    },
                                    blockSize: 128 / 32,
                                    ivSize: 64 / 32,
                                }));
                            function h() {
                                for (
                                    var f = this._X, m = this._C, p = 0;
                                    p < 8;
                                    p++
                                )
                                    l[p] = m[p];
                                (m[0] = (m[0] + 1295307597 + this._b) | 0),
                                    (m[1] =
                                        (m[1] +
                                            3545052371 +
                                            (m[0] >>> 0 < l[0] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[2] =
                                        (m[2] +
                                            886263092 +
                                            (m[1] >>> 0 < l[1] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[3] =
                                        (m[3] +
                                            1295307597 +
                                            (m[2] >>> 0 < l[2] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[4] =
                                        (m[4] +
                                            3545052371 +
                                            (m[3] >>> 0 < l[3] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[5] =
                                        (m[5] +
                                            886263092 +
                                            (m[4] >>> 0 < l[4] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[6] =
                                        (m[6] +
                                            1295307597 +
                                            (m[5] >>> 0 < l[5] >>> 0 ? 1 : 0)) |
                                        0),
                                    (m[7] =
                                        (m[7] +
                                            3545052371 +
                                            (m[6] >>> 0 < l[6] >>> 0 ? 1 : 0)) |
                                        0),
                                    (this._b = m[7] >>> 0 < l[7] >>> 0 ? 1 : 0);
                                for (var p = 0; p < 8; p++) {
                                    var x = f[p] + m[p],
                                        C = x & 65535,
                                        S = x >>> 16,
                                        _ =
                                            ((((C * C) >>> 17) + C * S) >>>
                                                15) +
                                            S * S,
                                        g =
                                            (((x & 4294901760) * x) | 0) +
                                            (((x & 65535) * x) | 0);
                                    c[p] = _ ^ g;
                                }
                                (f[0] =
                                    (c[0] +
                                        ((c[7] << 16) | (c[7] >>> 16)) +
                                        ((c[6] << 16) | (c[6] >>> 16))) |
                                    0),
                                    (f[1] =
                                        (c[1] +
                                            ((c[0] << 8) | (c[0] >>> 24)) +
                                            c[7]) |
                                        0),
                                    (f[2] =
                                        (c[2] +
                                            ((c[1] << 16) | (c[1] >>> 16)) +
                                            ((c[0] << 16) | (c[0] >>> 16))) |
                                        0),
                                    (f[3] =
                                        (c[3] +
                                            ((c[2] << 8) | (c[2] >>> 24)) +
                                            c[1]) |
                                        0),
                                    (f[4] =
                                        (c[4] +
                                            ((c[3] << 16) | (c[3] >>> 16)) +
                                            ((c[2] << 16) | (c[2] >>> 16))) |
                                        0),
                                    (f[5] =
                                        (c[5] +
                                            ((c[4] << 8) | (c[4] >>> 24)) +
                                            c[3]) |
                                        0),
                                    (f[6] =
                                        (c[6] +
                                            ((c[5] << 16) | (c[5] >>> 16)) +
                                            ((c[4] << 16) | (c[4] >>> 16))) |
                                        0),
                                    (f[7] =
                                        (c[7] +
                                            ((c[6] << 8) | (c[6] >>> 24)) +
                                            c[5]) |
                                        0);
                            }
                            a.RabbitLegacy = s._createHelper(d);
                        })(),
                        r.RabbitLegacy
                    );
                });
            })(ma)),
        ma.exports
    );
}
(function (e, t) {
    (function (r, a, n) {
        e.exports = a(
            J(),
            Cr(),
            Rf(),
            vf(),
            pt(),
            yf(),
            mt(),
            Za(),
            j0(),
            Of(),
            K0(),
            Lf(),
            Df(),
            Pf(),
            Ja(),
            Bf(),
            et(),
            he(),
            kf(),
            wf(),
            Mf(),
            Hf(),
            Ff(),
            Uf(),
            qf(),
            Yf(),
            $f(),
            Wf(),
            Gf(),
            Vf(),
            Qf(),
            Xf(),
            zf(),
            jf()
        );
    })(j, function (r) {
        return r;
    });
})(z0);
const Be = z0.exports,
    ys =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    Kf = "https://anitaku.to",
    Zf = "https://playtaku.online/streaming.php",
    ut = {
        key: Be.enc.Utf8.parse("37911490979715163134003223491201"),
        second_key: Be.enc.Utf8.parse("54674138327930866480207815084989"),
        iv: Be.enc.Utf8.parse("3134003223491201"),
    };
function Jf(e) {
    const t = Be.enc.Utf8.stringify(
        Be.AES.decrypt(e.data, ut.second_key, { iv: ut.iv })
    );
    return JSON.parse(t);
}
async function eh(e, t) {
    const r = Be.AES.encrypt(t, ut.key, { iv: ut.iv }),
        a = e("script[data-name='episode']").data().value,
        n = Be.AES.decrypt(a, ut.key, { iv: ut.iv }).toString(Be.enc.Utf8);
    return "id=" + r + "&alias=" + t + "&" + n;
}
const th = async (e) => {
    const t = [],
        r = [];
    try {
        let a, n, s;
        if (e.includes("episode")) {
            const p = await (await fetch(Kf + "/" + e)).text();
            (n = ee(p)),
                (a = n("#load_anime > div > div > iframe").attr("src")),
                (s = new URL(a));
        } else s = new URL(`${Zf}?id=${e}`);
        const o = await (
                await fetch(s.href, { headers: { "User-Agent": ys } })
            ).text(),
            l = ee(o),
            c = await eh(l, s.searchParams.get("id")),
            h = await (
                await fetch(
                    `
      ${s.protocol}//${s.hostname}/encrypt-ajax.php?${c}`,
                    {
                        headers: {
                            "User-Agent": ys,
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    }
                )
            ).json(),
            f = Jf(h);
        return f.source
            ? (f.source.forEach((m) => t.push(m)),
              f.source_bk.forEach((m) => r.push(m)),
              { Referer: s.href, sources: t, sources_bk: r })
            : { error: "No source found" };
    } catch (a) {
        return { error: a };
    }
};
class GogoAnimeService extends AnimeService {
    constructor() {
        super({
            name: "Gogo",
            id: "gogo",
            languages: ["English"],
            isNSFW: !1,
            url: "https://anitaku.so",
            quality: ["720p"],
            logo: "https://cdn.gogocdn.net/files/gogo/img/favicon.ico",
        });
    }
    async search(t) {
        const a = await (
            await fetch(
                `https://ajax.gogocdn.net/site/loadAjaxSearch?keyword=${encodeURIComponent(
                    t
                )}&id=-1&link_web=http%3A%2F%2Fwww7.gogoanime.me%2F`
            )
        ).json();
        if (!(a != null && a.content)) return [];
        const n = a.content,
            s = ee(n);
        return s(".list_search_ajax")
            .toArray()
            .map((o) => {
                const l = s(o),
                    c = l.find("a").attr("href").split("/").pop().trim(),
                    d = l.text(),
                    h = l
                        .find(".thumbnail-recent_search")
                        .attr("style")
                        .match(/url\("(.*?)"/)[1];
                return { id: c, title: d, thumbnail: h };
            });
    }
    async getAnimeId(t) {
        var u;
        const a = await (
                await fetch(
                    `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/anime/${t.id}.json`
                )
            ).json(),
            n =
                (u = a == null ? void 0 : a.Sites) == null
                    ? void 0
                    : u.Gogoanime;
        return n ? { data: Object.keys(n)[0] } : void 0;
    }
    async loadEpisodes(t) {
        const a = await (await fetch(`${this.url}/category/${t}`)).text(),
            s = ee(a)("#movie_id").attr("value");
        if (!s) return [];
        const o = await (
                await fetch(
                    `https://ajax.gogocdn.net/ajax/load-list-episode?ep_start=0&ep_end=10000&id=${s}`
                )
            ).text(),
            l = ee(o);
        return l("#episode_related li")
            .toArray()
            .map((d) => {
                const h = l(d).find("a").attr("href").trim().replace("/", ""),
                    f = Me(l(d).find(".name").text(), "Full").toString();
                return { id: h, number: f };
            })
            .sort((d, h) => Number(d.number) - Number(h.number));
    }
    async loadVideoServers(t) {
        return [{ embed: "", name: "default", extraData: { episodeId: t } }];
    }
    async loadVideoContainer(t) {
        var o;
        const r =
            (o = t == null ? void 0 : t.extraData) == null
                ? void 0
                : o.episodeId;
        if (!r) return null;
        const { Referer: a, sources: n, sources_bk: s } = await th(r),
            u = [...n, ...s].map((l) => ({
                file: { url: l.file, headers: { referer: a } },
                format: ya.CONTAINER,
                quality: l.label,
            }));
        return u != null && u.length ? { videos: u } : null;
    }
}
class MangaService extends BaseAnimeMangaService {
    async getMangaId(t) {
        throw new Error("Method not implemented.");
    }
    async loadChapters(t, r) {
        throw new Error("Method not implemented.");
    }
    async loadImages(t, r) {
        throw new Error("Method not implemented.");
    }
}
class BlogtruyenMangaService extends MangaService {
    constructor() {
        super({
            name: "BlogTheoYeuCau",
            id: "blogtruyen",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://blogtruyen.vn",
            logo: "https://blogtruyen.vn/Content/logo.png",
        }),
            (this.rules = [
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "User-Agent",
                                operation: "set",
                                value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0",
                            },
                        ],
                    },
                    condition: { requestDomains: ["blogtruyen.vn"] },
                },
            ]);
    }
    async getMangaId(t) {
        var a;
        const r = async (n) => {
            const u = await (
                await fetch(
                    "https://blogtruyen.vn/ajax/Search/AjaxQuickSearch",
                    {
                        body: `keyword=${encodeURIComponent(n)}`,
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded",
                        },
                    }
                )
            ).text();
            return u.includes("Kh\xF4ng t\xECm th\u1EA5y")
                ? null
                : ee(u)(".item-result:first-child").data("id");
        };
        if (
            !(t != null && t.title) ||
            !(
                (a = Object.keys(t == null ? void 0 : t.title)) != null &&
                a.length
            )
        )
            return { data: null };
        for (const [n, s] of Object.entries(t.title)) {
            const u = await r(s);
            if (u) return { data: u };
        }
        return { data: null };
    }
    async loadChapters(t) {
        const a = await (await fetch(`https://blogtruyen.vn/${t}/`)).text(),
            n = ee(a);
        return n("#list-chapters p")
            .toArray()
            .map((u) => {
                var d;
                const o = n(u).attr("id").replace("chapter-", ""),
                    l = n(u)
                        .find("a")
                        .attr("href")
                        .split("/")
                        .filter(Boolean)
                        .pop(),
                    c = (d = Me(l, "Unknown")) == null ? void 0 : d.toString();
                return { id: o, number: c, extra: { slug: l } };
            });
    }
    async loadImages(t, r) {
        if (!(r != null && r.slug)) return [];
        const n = await (
                await fetch(`https://blogtruyen.vn/c${t}/${r.slug}`)
            ).text(),
            s = ee(n);
        return s("article#content img")
            .toArray()
            .map((o) => {
                const c = s(o).attr("src");
                return { url: c };
            })
            .filter((o) => {
                var l;
                return !(
                    (l = o == null ? void 0 : o.url) != null &&
                    l.includes("bannerblogtruyen1")
                );
            });
    }
    async search(t) {
        const a = await (
            await fetch("https://blogtruyen.vn/ajax/Search/AjaxQuickSearch", {
                body: `keyword=${encodeURIComponent(t)}`,
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            })
        ).text();
        if (a.includes("Kh\xF4ng t\xECm th\u1EA5y")) return [];
        const n = ee(a);
        return n(".item-result")
            .toArray()
            .map((u) => {
                const o = n(u),
                    l = o.data("id"),
                    c = o.text().trim();
                return { id: l, title: c, thumbnail: "" };
            });
    }
}
class AHAnimeService extends AnimeService {
    constructor() {
        super({
            name: "AnimeHay",
            id: "ah",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "a",
            quality: ["720p"],
            logo: "a/themes/img/logo.png",
        });
        Ne(this, "baseURL");
        Ne(this, "hasGotBaseURL");
        (this.rules = [
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Origin",
                            operation: "set",
                            value: "https://suckplayer.xyz",
                        },
                    ],
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                },
                condition: {
                    regexFilter: "https://suck",
                    requestMethods: ["get"],
                    resourceTypes: [
                        browser.declarativeNetRequest.ResourceType
                            .XMLHTTPREQUEST,
                        browser.declarativeNetRequest.ResourceType.MEDIA,
                    ],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                    requestHeaders: [
                        {
                            header: "Origin",
                            operation: "remove",
                        },
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://thenoobpro16.shop",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)thenoobpro(.*).shop(.*)",
                    resourceTypes: [
                        browser.declarativeNetRequest.ResourceType
                            .XMLHTTPREQUEST,
                        browser.declarativeNetRequest.ResourceType.MEDIA,
                    ],
                },
            },
            {
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        {
                            header: "Access-Control-Allow-Origin",
                            operation: "set",
                            value: "*",
                        },
                        {
                            header: "Access-Control-Allow-Methods",
                            operation: "set",
                            value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                        },
                    ],
                },
                condition: {
                    regexFilter: "(.*)rapovideo(.*).xyz(.*)",
                    resourceTypes: [
                        browser.declarativeNetRequest.ResourceType
                            .XMLHTTPREQUEST,
                        browser.declarativeNetRequest.ResourceType.MEDIA,
                    ],
                },
            },
        ]),
            (this.baseURL = ""),
            (this.hasGotBaseURL = !1);
    }
    async getBaseURL() {
        if (this.hasGotBaseURL) return;
        const a = await (await fetch("https://animehay.tv")).text();
        let s = ee(a)(".bt-link").attr("href");
        !s ||
            (s.endsWith("/") && (s = s.slice(0, -1)),
            (this.baseURL = s),
            (this.hasGotBaseURL = !0));
    }
    async getAnimeId(r) {
        var n;
        await this.getBaseURL();
        const a = await this.totalSearch(r);
        return {
            data: (n = a == null ? void 0 : a[0]) == null ? void 0 : n.id,
        };
    }
    async loadEpisodes(r) {
        await this.getBaseURL();
        const n = await (
                await fetch(`${this.baseURL}/thong-tin-phim/a-${r}.html`)
            ).text(),
            s = ee(n);
        return s(".list-item-episode > a")
            .toArray()
            .map((o) => {
                var f;
                const l = s(o),
                    c =
                        (l.attr("href").match(/-(\d+)\.html$/) || [])[1] ||
                        null,
                    d = l.text().trim(),
                    h = (f = Me(d, "Full")) == null ? void 0 : f.toString();
                return !c || !h ? null : { id: c, number: h };
            });
    }
    async loadVideoServers(r) {
        await this.getBaseURL();
        const n = await (
                await fetch(`${this.baseURL}/xem-phim/a-${r}.html`)
            ).text(),
            s = new RegExp(`(?<=['"(])(https?:\\/\\/\\S+)(?=['")])`, "gi"),
            u = n.matchAll(s),
            o = [];
        for (const l of u) {
            const c = l[0];
            let d = "";
            if (c.includes("cdninstagram.com")) d = "FBO";
            else if (c.includes("suckplayer.xyz")) d = "VPRO";
            else if (c.includes("rapovideo.xyz")) d = "Tik";
            else continue;
            o.push({ embed: "", name: d, extraData: { link: c } });
        }
        return o;
    }
    async loadVideoContainer(r) {
        await this.getBaseURL();
        const { link: a } = r.extraData;
        if (r.name === "FBO" || r.name === "Tik")
            return { videos: [{ quality: "720p", file: { url: a } }] };
        if (r.name === "VPRO") {
            const n = await this.getFirePlayerUrl(a);
            return { videos: [{ quality: "720p", file: { url: n.url } }] };
        }
    }
    async getFirePlayerUrl(r) {
        const a = r.split("/")[4],
            n = new URLSearchParams();
        return (
            n.append("r", this.baseURL),
            n.append("hash", a),
            {
                url: (
                    await (
                        await fetch(
                            `https://suckplayer.xyz/player/index.php?data=${a}&do=getVideo`,
                            {
                                method: "POST",
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Content-Type":
                                        "application/x-www-form-urlencoded",
                                },
                                body: n,
                            }
                        )
                    ).json()
                ).securedLink,
            }
        );
    }
    async search(r) {
        await this.getBaseURL();
        const n = await (
            await fetch(`${this.baseURL}/api`, {
                headers: { "content-type": "application/json" },
                referrer: this.baseURL,
                body: `{"action":"live_search","keyword":"${r}"}`,
                method: "POST",
            })
        ).json();
        if (!(n != null && n.result)) return [];
        const s = ee(n.result);
        return s(`a[href^="${this.baseURL}"]`)
            .map((l, c) => {
                const d = s(c).attr("href"),
                    h = s(c).find("img").attr("src"),
                    f = s(c).find(".fw-500").text().trim(),
                    m = sh(d);
                return { thumbnail: h, title: f, id: m };
            })
            .get();
    }
}
function sh(e) {
    const t = e.split("/");
    return t[t.length - 1].split("-").slice(-1)[0].replace(".html", "");
}
class MangaDexMangaService extends MangaService {
    constructor() {
        super({
            name: "MangaDex",
            id: "mangadex",
            languages: ["English"],
            isNSFW: !1,
            url: "https://mangadex.org",
            logo: "https://mangadex.org/favicon.ico",
        }),
            (this.rules = [
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "Referer",
                                operation: "set",
                                value: "https://mangadex.org",
                            },
                        ],
                        responseHeaders: [
                            {
                                header: "Access-Control-Allow-Origin",
                                operation: "set",
                                value: "*",
                            },
                            {
                                header: "Access-Control-Allow-Methods",
                                operation: "set",
                                value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                            },
                        ],
                    },
                    condition: {
                        regexFilter: "mangadex.org/covers",
                        resourceTypes: [
                            browser.declarativeNetRequest.ResourceType
                                .XMLHTTPREQUEST,
                            browser.declarativeNetRequest.ResourceType.IMAGE,
                        ],
                    },
                },
            ]);
    }
    async getMangaId(t) {
        var u;
        const a = await (
                await fetch(
                    `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/manga/${t.id}.json`
                )
            ).json(),
            n =
                (u = a == null ? void 0 : a.Sites) == null
                    ? void 0
                    : u.Mangadex;
        return n ? { data: Object.keys(n)[0] } : void 0;
    }
    async loadChapters(t) {
        const r = [];
        let n = 1;
        const s = async () => {
            var c, d, h, f, m;
            const o = await (
                await fetch(
                    `https://api.mangadex.org/manga/${t}/feed?limit=${500}&order[volume]=desc&order[chapter]=desc&offset=${
                        (n - 1) * 500
                    }&translatedLanguage[]=en&includes[]=scanlation_group`
                )
            ).json();
            if (!((c = o == null ? void 0 : o.data) != null && c.length))
                return [];
            const l = [];
            for (const p of o.data) {
                if (
                    ((d = p == null ? void 0 : p.attributes) == null
                        ? void 0
                        : d.translatedLanguage) !== "en" ||
                    ((h = p == null ? void 0 : p.attributes) == null
                        ? void 0
                        : h.externalUrl) !== null
                )
                    continue;
                const x =
                    (f = p.relationships) == null
                        ? void 0
                        : f.find((C) => C.type === "scanlation_group");
                l.push({
                    id: p.id,
                    number: p.attributes.chapter || "Oneshot",
                    title: p.attributes.title,
                    section:
                        (m = x == null ? void 0 : x.attributes) == null
                            ? void 0
                            : m.name,
                });
            }
            if ((r.push(...(l || [])), n * 500 < o.total)) return n++, s();
        };
        return await s(), r;
    }
    async loadImages(t) {
        var r, a;
        try {
            const s = await (
                await fetch(`https://api.mangadex.org//at-home/server/${t}`)
            ).json();
            return (a =
                (r = s == null ? void 0 : s.chapter) == null
                    ? void 0
                    : r.data) != null && a.length
                ? s.chapter.data.map((o) => ({
                      url: `${s.baseUrl}/data/${s.chapter.hash}/${o}`,
                      headers: { referer: "https://mangadex.org/" },
                  }))
                : [];
        } catch {
            return [];
        }
    }
    async search(t) {
        var n;
        const a = await (
            await fetch(
                `https://api.mangadex.org/manga?title=${encodeURIComponent(
                    t
                )}&limit=50&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`
            )
        ).json();
        return (n = a == null ? void 0 : a.data) != null && n.length
            ? a.data.map((s) => {
                  var d, h;
                  const u =
                          (d = s.relationships) == null
                              ? void 0
                              : d.find((f) => f.type === "cover_art"),
                      o =
                          (h = u == null ? void 0 : u.attributes) == null
                              ? void 0
                              : h.fileName,
                      l = `https://mangadex.org/covers/${s.id}/${o}`,
                      c = (() => {
                          var _, g;
                          const f =
                                  (_ = s == null ? void 0 : s.attributes) ==
                                  null
                                      ? void 0
                                      : _.title,
                              m = Object.keys(f);
                          if (f != null && f.en)
                              return f == null ? void 0 : f.en;
                          const p =
                                  (g = s == null ? void 0 : s.attributes) ==
                                  null
                                      ? void 0
                                      : g.altTitle,
                              x =
                                  p == null
                                      ? void 0
                                      : p.find((A) =>
                                            A == null ? void 0 : A.en
                                        );
                          if (x != null && x.en)
                              return x == null ? void 0 : x.en;
                          if (f != null && f[m == null ? void 0 : m[0]])
                              return f[m[0]];
                          const C = p == null ? void 0 : p[0],
                              S = Object.keys(C);
                          return C[S == null ? void 0 : S[0]];
                      })();
                  return { id: s.id, title: c, thumbnail: l };
              })
            : [];
    }
}
class nettruyenMangaService extends MangaService {
    constructor() {
        super({
            name: "NetTruyen",
            id: "nettruyen",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://www.nettruyenbb.com",
            logo: "https://st.nettruyenbb.com/data/logos/logo-nettruyen.png",
        });
    }
    async getMangaId(t) {
        var a;
        const r = async (n) => {
            const u = await (
                    await fetch(
                        `${
                            this.url
                        }/Comic/Services/SuggestSearch.ashx?q=${encodeURI(n)}`
                    )
                ).text(),
                d = ee(u)("li:first-child")
                    .find("a")
                    .attr("href")
                    .split("/")
                    .filter(Boolean)
                    .pop();
            return { id: d.split("-").filter(Boolean).pop(), slug: d };
        };
        if (
            !(t != null && t.title) ||
            !(
                (a = Object.keys(t == null ? void 0 : t.title)) != null &&
                a.length
            )
        )
            return { data: null };
        for (const [n, s] of Object.entries(t.title)) {
            const u = await r(s);
            if (!!u) return { data: u.id, extraData: { slug: u.slug } };
        }
        return { data: null };
    }
    async loadChapters(t, r) {
        if (!(r != null && r.slug)) return [];
        const n = await (
                await fetch(`${this.url}/truyen-tranh/${r.slug}`)
            ).text(),
            s = ee(n);
        return s("div.chapter")
            .toArray()
            .map((o) => {
                var h;
                const l = s(o).find("a"),
                    c =
                        (h = Me(l.text().trim(), "Unknown")) == null
                            ? void 0
                            : h.toString(),
                    d = l.data("id").toString();
                return { id: d, number: c, extra: { slug: r.slug } };
            });
    }
    async loadImages(t, r) {
        if (!(r != null && r.slug)) return [];
        try {
            const a = r.slug.split("-"),
                n = a.slice(0, a.length - 1).join("-"),
                u = await (
                    await fetch(`${this.url}/truyen-tranh/${n}/chap-0/${t}`)
                ).text(),
                o = ee(u);
            return o(".page-chapter")
                .toArray()
                .map((c) => {
                    const d = o(c).find("img"),
                        h = d.data("original") || d.attr("src");
                    return {
                        url: ["http", "https"].some((p) => h.includes(p))
                            ? h
                            : `https:${h}`,
                        headers: { referer: this.url },
                    };
                });
        } catch {
            return [];
        }
    }
    async search(t) {
        const a = await (
                await fetch(
                    `${
                        this.url
                    }/Comic/Services/SuggestSearch.ashx?q=${encodeURI(t)}`
                )
            ).text(),
            n = ee(a);
        return n("li")
            .toArray()
            .map((u) => {
                const o = n(u),
                    c = o
                        .find("a")
                        .attr("href")
                        .split("/")
                        .filter(Boolean)
                        .pop(),
                    d = c.split("-").filter(Boolean).pop(),
                    h = o.find("h3").text().trim(),
                    f = o.find("img").attr("src");
                return { id: d, extra: { slug: c }, title: h, thumbnail: f };
            });
    }
}
class MangaDexVNMangaService extends MangaService {
    constructor() {
        super({
            name: "MangaDex VN",
            id: "mangadexvn",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://mangadex.org",
            logo: "https://mangadex.org/favicon.ico",
        });
    }
    async getMangaId(t) {
        var u;
        const a = await (
                await fetch(
                    `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/manga/${t.id}.json`
                )
            ).json(),
            n =
                (u = a == null ? void 0 : a.Sites) == null
                    ? void 0
                    : u.Mangadex;
        return n ? { data: Object.keys(n)[0] } : void 0;
    }
    async loadChapters(t) {
        const r = [];
        let n = 1;
        const s = async () => {
            var c, d, h, f, m;
            const o = await (
                await fetch(
                    `https://api.mangadex.org/manga/${t}/feed?limit=${500}&order[volume]=desc&order[chapter]=desc&offset=${
                        (n - 1) * 500
                    }&translatedLanguage[]=vi&includes[]=scanlation_group`
                )
            ).json();
            if (!((c = o == null ? void 0 : o.data) != null && c.length))
                return [];
            const l = [];
            for (const p of o.data) {
                if (
                    ((d = p == null ? void 0 : p.attributes) == null
                        ? void 0
                        : d.translatedLanguage) !== "vi" ||
                    ((h = p == null ? void 0 : p.attributes) == null
                        ? void 0
                        : h.externalUrl) !== null
                )
                    continue;
                const x =
                    (f = p.relationships) == null
                        ? void 0
                        : f.find((C) => C.type === "scanlation_group");
                l.push({
                    id: p.id,
                    number: p.attributes.chapter || "Oneshot",
                    title: p.attributes.title,
                    section:
                        (m = x == null ? void 0 : x.attributes) == null
                            ? void 0
                            : m.name,
                });
            }
            if ((r.push(...(l || [])), n * 500 < o.total)) return n++, s();
        };
        return await s(), r;
    }
    async loadImages(t) {
        var r, a;
        try {
            const s = await (
                await fetch(`https://api.mangadex.org//at-home/server/${t}`)
            ).json();
            return (a =
                (r = s == null ? void 0 : s.chapter) == null
                    ? void 0
                    : r.data) != null && a.length
                ? s.chapter.data.map((o) => ({
                      url: `${s.baseUrl}/data/${s.chapter.hash}/${o}`,
                      headers: { referer: "https://mangadex.org/" },
                  }))
                : [];
        } catch {
            return [];
        }
    }
    async search(t) {
        var n;
        const a = await (
            await fetch(
                `https://api.mangadex.org/manga?title=${encodeURIComponent(
                    t
                )}&limit=50&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`
            )
        ).json();
        return (n = a == null ? void 0 : a.data) != null && n.length
            ? a.data.map((s) => {
                  var d, h;
                  const u =
                          (d = s.relationships) == null
                              ? void 0
                              : d.find((f) => f.type === "cover_art"),
                      o =
                          (h = u == null ? void 0 : u.attributes) == null
                              ? void 0
                              : h.fileName,
                      l = `https://mangadex.org/covers/${s.id}/${o}`,
                      c = (() => {
                          var _, g;
                          const f =
                                  (_ = s == null ? void 0 : s.attributes) ==
                                  null
                                      ? void 0
                                      : _.title,
                              m = Object.keys(f);
                          if (f != null && f.en)
                              return f == null ? void 0 : f.en;
                          const p =
                                  (g = s == null ? void 0 : s.attributes) ==
                                  null
                                      ? void 0
                                      : g.altTitle,
                              x =
                                  p == null
                                      ? void 0
                                      : p.find((A) =>
                                            A == null ? void 0 : A.en
                                        );
                          if (x != null && x.en)
                              return x == null ? void 0 : x.en;
                          if (f != null && f[m == null ? void 0 : m[0]])
                              return f[m[0]];
                          const C = p == null ? void 0 : p[0],
                              S = Object.keys(C);
                          return C[S == null ? void 0 : S[0]];
                      })();
                  return { id: s.id, title: c, thumbnail: l };
              })
            : [];
    }
}
class BlogtruyenmoiMangaService extends MangaService {
    constructor() {
        super({
            name: "BlogTruyenMoi",
            id: "blogtruyenmoi",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://blogtruyenmoi.com",
            logo: "https://blogtruyen.vn/Content/logo.png",
        }),
            (this.rules = [
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "User-Agent",
                                operation: "set",
                                value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0",
                            },
                        ],
                    },
                    condition: { requestDomains: ["blogtruyenmoi.com"] },
                },
            ]);
    }
    async getMangaId(t) {
        var a;
        const r = async (n) => {
            const u = await (
                await fetch(
                    "https://blogtruyenmoi.com/ajax/Search/AjaxQuickSearch",
                    {
                        body: `keyword=${encodeURIComponent(n)}`,
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded",
                        },
                    }
                )
            ).text();
            return u.includes("Kh\xF4ng t\xECm th\u1EA5y")
                ? null
                : ee(u)(".item-result:first-child").data("id");
        };
        if (
            !(t != null && t.title) ||
            !(
                (a = Object.keys(t == null ? void 0 : t.title)) != null &&
                a.length
            )
        )
            return { data: null };
        for (const [n, s] of Object.entries(t.title)) {
            const u = await r(s);
            if (u) return { data: u };
        }
        return { data: null };
    }
    async loadChapters(t) {
        const a = await (await fetch(`https://blogtruyenmoi.com/${t}/`)).text(),
            n = ee(a);
        return n("#list-chapters p")
            .toArray()
            .map((u) => {
                var d;
                const o = n(u).attr("id").replace("chapter-", ""),
                    l = n(u)
                        .find("a")
                        .attr("href")
                        .split("/")
                        .filter(Boolean)
                        .pop(),
                    c =
                        (d = Me(l.replace(t, ""), "Unknown")) == null
                            ? void 0
                            : d.toString();
                return { id: o, number: c, extra: { slug: l } };
            });
    }
    async loadImages(t, r) {
        if (!(r != null && r.slug)) return [];
        const n = await (
                await fetch(`https://blogtruyenmoi.com/c${t}/${r.slug}`)
            ).text(),
            s = ee(n);
        return s("article#content img")
            .toArray()
            .map((o) => {
                const c = s(o).attr("src");
                return {
                    url: c,
                    headers: { referer: "https://blogtruyenmoi.com" },
                };
            })
            .filter((o) => {
                var l;
                return !(
                    (l = o == null ? void 0 : o.url) != null &&
                    l.includes("bannerblogtruyen1")
                );
            });
    }
    async search(t) {
        const a = await (
            await fetch(
                "https://blogtruyenmoi.com/ajax/Search/AjaxQuickSearch",
                {
                    body: `keyword=${encodeURIComponent(t)}`,
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                }
            )
        ).text();
        if (a.includes("Kh\xF4ng t\xECm th\u1EA5y")) return [];
        const n = ee(a);
        return n(".item-result")
            .toArray()
            .map((u) => {
                const o = n(u),
                    l = o.data("id"),
                    c = o.text().trim();
                return { id: l, title: c, thumbnail: "" };
            });
    }
}
var Z0 = ((e) => ((e.VTT = "vtt"), (e.ASS = "ass"), (e.SRT = "srt"), e))(
    Z0 || {}
);
const AddRule = (newRules, t) =>
        new Promise((r) => {
            browser.declarativeNetRequest.getDynamicRules(async (existRules) => {
                existRules = JSON.parse(
                    JSON.stringify(existRules, (_, v) => { return v ?? undefined; })
                );

                const n = existRules.map((d) => d.id),
                    s = Math.max(...n);
                let currentRuleId = n != null && n.length ? s : 0;
                const o = [...newRules, ...existRules],
                    c = removeDuplicates(o.filter(Boolean), (d, h) =>
                        compareNestedObjects(d.condition, h.condition)
                            ? compareNestedObjects(d.action, h.action)
                            : false
                    ).map((d) => ({ ...d, id: ++currentRuleId }));

                console.log("adding new rules", c),
                    await browser.declarativeNetRequest.updateDynamicRules({
                        addRules: c,
                        ...t,
                    }),
                    console.log("added rules"),
                    r(null);
            });
        }),
    clearRules = () =>
        new Promise((e) => {
            browser.declarativeNetRequest.getDynamicRules(async (t) => {
                const r = t.map((a) => a.id);
                await browser.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: r,
                }),
                    e(null);
            });
        }),
    Os = { 4: "vidstreaming", 1: "vidcloud", 5: "streamsb", 3: "streamtape" },
    Kt = "https://aniwatch-api-72oo.onrender.com";
class ZoroAnimeService extends AnimeService {
    constructor() {
        super({
            name: "Zoro",
            id: "zoro",
            languages: ["English"],
            isNSFW: !1,
            url: "https://kaido.to/",
            quality: ["1080p", "720p"],
            logo: "https://kaido.to/images/favicon.png?v=0.1",
        }),
            (this.isHardsubbed = !1);
    }
    async search(t) {
        var n;
        if (!t) return [];
        if (t === "null") return [];
        const a = await (
            await fetch(`${Kt}/anime/search?q=` + encodeURIComponent(t))
        ).json();
        return (n = a == null ? void 0 : a.animes) == null
            ? void 0
            : n.map((s) => ({ id: s.id, thumbnail: s.poster, title: s.name }));
    }
    async getAnimeId(t) {
        var a;
        const r = await this.totalSearch(t);
        return {
            data: (a = r == null ? void 0 : r[0]) == null ? void 0 : a.id,
        };
    }
    async loadEpisodes(t) {
        var n;
        const a = await (await fetch(`${Kt}/anime/episodes/` + t)).json();
        return (n = a == null ? void 0 : a.episodes) == null
            ? void 0
            : n.map((s) => ({
                  id: s.episodeId.replace("?ep=", "questionmarkep="),
                  number: s.number.toString(),
                  title: s.title,
                  isFiller: s.isFiller,
              }));
    }
    async loadVideoServers(t, r) {
        const a = t.replace("questionmarkep=", "?ep="),
            s = await (
                await fetch(`${Kt}/anime/servers?episodeId=` + a)
            ).json(),
            u = s.sub.map((l) => {
                const c = Os[l.serverId] || "vidcloud";
                return {
                    name: `sub-${c}`,
                    embed: "",
                    extraData: {
                        id: a,
                        serverName: c.toString(),
                        category: "sub",
                    },
                };
            }),
            o = s.dub.map((l) => {
                const c = Os[l.serverId] || "vidcloud";
                return {
                    name: `dub-${c}`,
                    embed: "",
                    extraData: {
                        id: a,
                        serverName: c.toString(),
                        category: "dub",
                    },
                };
            });
        return [...u, ...o];
    }
    async loadVideoContainer(t) {
        var c, d;
        const r = t.extraData.id,
            a = t.extraData.serverName,
            n = t.extraData.category,
            u = await (
                await fetch(
                    `${Kt}/anime/episode-srcs?id=${r}&server=${a}&category=${n}`
                )
            ).json(),
            o = { videos: [], subtitles: [], timestamps: [] },
            l =
                (c = u == null ? void 0 : u.tracks) == null
                    ? void 0
                    : c
                          .filter((h) => h.kind === "captions")
                          .map((h) => ({
                              file: { url: h.file },
                              language: h.label,
                          }));
        return (
            (o.subtitles = l),
            u != null &&
                u.intro &&
                o.timestamps.push({
                    type: "Intro",
                    startTime: u.intro.start,
                    endTime: u.intro.end,
                }),
            u != null &&
                u.outro &&
                o.timestamps.push({
                    type: "Outro",
                    startTime: u.outro.start,
                    endTime: u.outro.end,
                }),
            Array.isArray(u == null ? void 0 : u.sources) &&
                (await AddRule(
                    u.sources.map((h) => ({
                        priority: 1,
                        action: {
                            type: "modifyHeaders",
                            requestHeaders: [
                                {
                                    header: "Referer",
                                    operation: "set",
                                    value: new URL(h.url).origin,
                                },
                            ],
                            responseHeaders: [
                                {
                                    header: "Access-Control-Allow-Origin",
                                    operation: "set",
                                    value: "*",
                                },
                                {
                                    header: "Access-Control-Allow-Methods",
                                    operation: "set",
                                    value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                                },
                            ],
                        },
                        condition: {
                            requestDomains: [new URL(h.url).hostname],
                        },
                    }))
                ),
                (d = u == null ? void 0 : u.sources) == null ||
                    d.forEach((h) => {
                        o.videos.push({ file: { url: h.url }, format: h.type });
                    })),
            o
        );
    }
}
class MangakatanaMangaService extends MangaService {
    constructor() {
        super({
            name: "MangaKatana",
            id: "mangakatana",
            languages: ["English"],
            isNSFW: !1,
            url: "https://mangakatana.com",
            logo: "https://mangakatana.com/static/img/fav.png",
        }),
            (this.rules = [
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "Referer",
                                operation: "set",
                                value: "https://mangadex.org",
                            },
                        ],
                        responseHeaders: [
                            {
                                header: "Access-Control-Allow-Origin",
                                operation: "set",
                                value: "*",
                            },
                            {
                                header: "Access-Control-Allow-Methods",
                                operation: "set",
                                value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                            },
                        ],
                    },
                    condition: {
                        regexFilter: "mangadex.org/covers",
                        resourceTypes: [
                            browser.declarativeNetRequest.ResourceType
                                .XMLHTTPREQUEST,
                            browser.declarativeNetRequest.ResourceType.IMAGE,
                        ],
                    },
                },
            ]);
    }
    async getMangaId(t) {
        var a;
        const r = await this.totalSearch(t);
        return {
            data: (a = r == null ? void 0 : r[0]) == null ? void 0 : a.id,
        };
    }
    async loadChapters(t) {
        const a = await (
                await fetch(`https://mangakatana.com/manga/${t}`)
            ).text(),
            n = ee(a);
        return n('.uk-table tr[data-jump="0"]')
            .toArray()
            .map((o) => {
                var m;
                const d = n(o)
                        .find(".chapter a")
                        .attr("href")
                        .split("/")
                        .filter(Boolean)
                        .pop(),
                    h = n(o).find(".chapter a").text(),
                    f = (m = Me(d, "Unknown")) == null ? void 0 : m.toString();
                return { id: d, number: f, title: h, extra: { mangaId: t } };
            });
    }
    async loadImages(t, r) {
        if (!(r != null && r.mangaId)) return [];
        try {
            const n = await (
                    await fetch(
                        `https://mangakatana.com/manga/${r.mangaId}/${t}`
                    )
                ).text(),
                s = "[" + ge(n, "var thzq=[", ",]") + "]";
            return JSON.parse(s.replaceAll("'", '"')).map((o) => ({ url: o }));
        } catch (a) {
            return console.log(a), [];
        }
    }
    async search(t) {
        const r = {
                Accept: "*/*",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            a = `s=${encodeURIComponent(t)}&search_by=book_name`,
            s = await (
                await fetch("https://mangakatana.com/", {
                    method: "POST",
                    body: a,
                    headers: r,
                })
            ).text(),
            u = ee(s);
        return u(".item")
            .toArray()
            .map((l) => {
                const c = u(l).find("img").attr("src"),
                    d = u(l).find(".title").text();
                return {
                    id: u(l).find(".title").attr("href").split("/").pop(),
                    thumbnail: c,
                    title: d,
                };
            });
    }
}
class BatoMangaService extends MangaService {
    constructor() {
        super({
            name: "Bato",
            id: "bato",
            languages: ["English"],
            isNSFW: !1,
            url: "https://bato.to",
            logo: "https://bato.to/public-assets/img/favicon.ico",
        });
    }
    async getMangaId(t) {
        var a;
        const r = await this.totalSearch(t);
        return {
            data: (a = r == null ? void 0 : r[0]) == null ? void 0 : a.id,
        };
    }
    async loadChapters(t) {
        const a = await (await fetch(`${this.url}/title/${t}-a`)).text(),
            n = ee(a);
        return n("[name=chapter-list] .px-2.py-2")
            .toArray()
            .map((o) => {
                var p;
                const l = n(o).find(".space-x-1:first"),
                    h = l
                        .find("a")
                        .attr("href")
                        .split("/")
                        .filter(Boolean)
                        .pop()
                        .split("-")[0],
                    f = l.find("a").text(),
                    m =
                        (p = Me(f.split("Chapter")[1], "Unknown")) == null
                            ? void 0
                            : p.toString();
                return { id: h, number: m, title: f, extra: { mangaId: t } };
            });
    }
    async loadImages(t, r) {
        if (!(r != null && r.mangaId)) return [];
        try {
            const n = await (await fetch(`${this.url}/chapter/${t}`)).text(),
                s = await er(ge(n, "const batoPass = ", ";")),
                u = ge(n, 'const batoWord = "', '";');
            console.log(u, s);
            const o = await er(ge(n, "const imgHttpLis = ", ";")),
                l = JSON.parse(Be.AES.decrypt(u, s).toString(Be.enc.Utf8));
            return o.map((d, h) => ({ url: `${d}?${l[h]}` }));
        } catch (a) {
            return console.log(a), [];
        }
    }
    async search(t) {
        var u, o;
        const a = await (
                await fetch(`${this.url}/apo/`, {
                    method: "POST",
                    body: JSON.stringify({
                        query: `
  query get_content_searchComic($select: SearchComic_Select) {
    get_content_searchComic(
      select: $select
    ) {
      reqPage reqSize reqSort reqWord
      newPage
      paging { 
  total pages page init size skip limit
 }
      items {
        id
        data {
          
id
dbStatus
isNormal
isHidden
isDeleted

dateCreate datePublic dateModify
dateUpload dateUpdate

name
slug
altNames

authors
artists
genres

origLang tranLang

uploadStatus
originalStatus

originalPubFrom
originalPubTill

readDirection

urlPath

urlCover600
urlCover300
urlCoverOri

disqusId



stat_is_hot
stat_is_new

stat_count_follows
stat_count_reviews
stat_count_post_child 
stat_count_post_reply

stat_count_mylists

stat_count_votes
stat_count_notes
stat_count_emotions {
  field count
}
stat_count_statuss {
  field count
}
stat_count_scores {
  field count
}
stat_count_views {
  field count
}

stat_score_avg
stat_score_bay
stat_score_val

stat_count_chapters_normal
stat_count_chapters_others



          
        }
        
        

        
        

        
    last_chapterNodes(amount:1) {
      
  id
  data {
    

  id comicId

  dbStatus
  isNormal
  isHidden
  isDeleted
  isFinal
  
  dateCreate
  datePublic
  dateModify

  volNum
  chaNum
  dname
  title
  urlPath

  count_images

  stat_is_new

  stat_count_post_child
  stat_count_post_reply
  stat_count_views_login
  stat_count_views_guest
  
  userId
  userNode {
    
  id 
  data {
    
id
name
uniq
avatarUrl 
urlPath

dateCreate
dateOnline

gender 
birth{y m d}

stat_count_comics_normal
stat_count_comics_others

stat_count_comics_uploaded
stat_count_comics_modified

stat_count_chapters_normal
stat_count_chapters_others

stat_count_comment_createds
stat_count_comment_receives

stat_count_forum_child
stat_count_forum_reply

stat_count_views_guest
stat_count_views_login

stat_count_following
stat_count_followers

stat_warnings_unread
stat_warnings_readed

count_reviews

is_adm is_mod is_vip
is_verified is_deleted
is_trusted is_muted is_warned is_banned

  }

  }

  }

    }
  

        
        
      }
    }
  }
  `,
                        variables: {
                            select: {
                                page: 1,
                                size: 30,
                                where: "browse",
                                word: t,
                            },
                        },
                        operationName: "get_content_searchComic",
                    }),
                    headers: { "content-type": "application/json" },
                })
            ).json(),
            n =
                (o =
                    (u = a == null ? void 0 : a.data) == null
                        ? void 0
                        : u.get_content_searchComic) == null
                    ? void 0
                    : o.items;
        return n != null && n.length
            ? n.map((l) => {
                  const c = l.data,
                      d = c.name,
                      h = c.id,
                      f = c.urlCoverOri;
                  return { id: h, thumbnail: f, title: d };
              })
            : [];
    }
}
class AniplayAnimeService extends AnimeService {
    constructor() {
        super({
            name: "Aniplay",
            id: "aniplay",
            languages: ["Italiano"],
            isNSFW: !1,
            url: "https://aniplay.co/",
            quality: ["1080p", "720p"],
            logo: "https://aniplay.co/favicon.ico?v=1.0.2",
        }),
            (this.isHardsubbed = !1);
    }
    async search(t, r) {
        try {
            const n = await (
                    await fetch(
                        `https://aniplay.co/api/anime/advanced-search?page=0&size=36&query=${t}`
                    )
                ).json(),
                s = n.filter((l) =>
                    l.listWebsites.some((c) =>
                        c.url.match(
                            new RegExp(
                                `https://anilist\\.co/anime/${r.id}(?![0-9])`
                            )
                        )
                    )
                ),
                u = n.filter(
                    (l) =>
                        !l.listWebsites.some((c) =>
                            c.url.match(
                                new RegExp(
                                    `https://anilist\\.co/anime/${r.id}(?![0-9])`
                                )
                            )
                        )
                );
            return s
                .map((l) => ({
                    id: l.id.toString(),
                    thumbnail: l.verticalImages[0].imageFull,
                    title: l.title,
                }))
                .concat(
                    u.map((l) => ({
                        id: l.id.toString(),
                        thumbnail: l.verticalImages[0].imageFull,
                        title: l.title,
                    }))
                );
        } catch (a) {
            return console.error("Error occurred during API request:", a), [];
        }
    }
    async getAnimeId(t) {
        var r;
        try {
            const a = await this.totalSearch(t);
            return {
                data: (r = a == null ? void 0 : a[0]) == null ? void 0 : r.id,
            };
        } catch (a) {
            throw (
                (console.error("Error occurred while getting anime ID:", a), a)
            );
        }
    }
    async loadEpisodes(t) {
        try {
            const r = `https://aniplay.co/api/anime/${t}`,
                n = await (await fetch(r)).json();
            let s = [];
            if (n && n.seasons && n.seasons.length > 0) {
                const u = n.seasons.map(async (o) => {
                    try {
                        const c = await (
                            await fetch(`${r}/season/${o.id}`)
                        ).json();
                        Array.isArray(c) &&
                            c.length > 0 &&
                            c
                                .filter(
                                    (d) =>
                                        (d == null
                                            ? void 0
                                            : d.episodeNumber) !== void 0
                                )
                                .forEach((d) => {
                                    const h = parseInt(d.episodeNumber, 10);
                                    isNaN(h) ||
                                        s.push({
                                            id: d.id.toString(),
                                            number: h.toString(),
                                            title: d.title,
                                            section: o.name,
                                            extra: { animeId: t },
                                        });
                                });
                    } catch (l) {
                        console.error(
                            "Error occurred while fetching season data:",
                            l
                        );
                    }
                });
                await Promise.all(u);
            } else
                n &&
                    n.episodes &&
                    n.episodes.length > 0 &&
                    n.episodes
                        .filter(
                            (u) =>
                                (u == null ? void 0 : u.episodeNumber) !==
                                void 0
                        )
                        .forEach((u) => {
                            const o = parseInt(u.episodeNumber, 10);
                            isNaN(o) ||
                                s.push({
                                    id: u.id.toString(),
                                    number: o.toString(),
                                    title: u.title,
                                    extra: { animeId: t },
                                });
                        });
            return s;
        } catch (r) {
            throw (console.error("Error occurred during API request:", r), r);
        }
    }
    async loadVideoServers(t) {
        try {
            const r = `https://aniplay.co/api/episode/${t}`;
            return [{ embed: "", name: "default", extraData: { link: r } }];
        } catch (r) {
            throw (console.error("Error loading video servers:", r), r);
        }
    }
    async loadVideoContainer(t) {
        try {
            const { link: r } = t.extraData,
                a = await fetch(r);
            if (!a.ok) throw new Error("Network response was not ok");
            return { videos: [{ file: { url: (await a.json()).videoUrl } }] };
        } catch (r) {
            throw (console.error("Error loading video container:", r), r);
        }
    }
}
const ph = (e) => er(e.trim().replace("eval", ""));
class hhhayAnimeService extends AnimeService {
    constructor() {
        super({
            name: "HHHay",
            id: "hhhay",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://hhhay.tv",
            quality: ["720p", "1080p"],
            logo: "a/themes/img/logo.png",
        }),
            (this.rules = [
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "X-Requested-With",
                                operation: "set",
                                value: "XMLHttpRequest",
                            },
                        ],
                        responseHeaders: [
                            {
                                header: "Access-Control-Allow-Origin",
                                operation: "set",
                                value: "*",
                            },
                            {
                                header: "Access-Control-Allow-Methods",
                                operation: "set",
                                value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                            },
                        ],
                    },
                    condition: { regexFilter: "https://hhhay.tv" },
                },
            ]);
    }
    async getAnimeId(t) {
        var a, n;
        const r = await this.totalSearch(t);
        return {
            data: (a = r == null ? void 0 : r[0]) == null ? void 0 : a.id,
            extraData:
                (n = r == null ? void 0 : r[0]) == null ? void 0 : n.extra,
        };
    }
    async loadEpisodes(t, r) {
        const n = await (await fetch(`${this.url}/${t}`)).text(),
            s = ee(n);
        return s("#listsv-1 > li")
            .toArray()
            .map((o) => {
                var f, m;
                const l = s(o),
                    c =
                        (f = l.find("a").attr("href")) == null
                            ? void 0
                            : f.split("/").slice(-1)[0].replace(".html", ""),
                    d = l.text().trim(),
                    h = (m = Me(d, "Full")) == null ? void 0 : m.toString();
                return !c || !h
                    ? null
                    : {
                          id: c + "-" + r.postId,
                          number: h,
                          extra: { animeId: t, postId: r.postId },
                      };
            })
            .filter(Boolean);
    }
    async loadVideoServers(t, r) {
        var c;
        if (!r.animeId) throw new Error("Missing animeId");
        if (!r.postId) throw new Error("Missing postId");
        const a = t.split("-").slice(0, 2).join("-"),
            s = await (
                await fetch(
                    `${this.url}/wp-content/themes/linhminazmovies/player.php?episode_slug=${a}&server_id=1&subsv_id=&post_id=${r.postId}&custom_var=`
                )
            ).json(),
            u = (c = s == null ? void 0 : s.data) == null ? void 0 : c.sources;
        return u
            ? [
                  {
                      embed: ee(u)("iframe").attr("src"),
                      name: "SV 1",
                      extraData: r,
                  },
              ]
            : [];
    }
    async loadVideoContainer(t) {
        const a = await (await fetch(t.embed)).text(),
            n =
                "eval(function(p,a,c,k,e,d)" +
                ge(a, "<script>eval(function(p,a,c,k,e,d)", "</script>");
        if (!n) throw new Error("Cannot find packed code");
        const s = await ph(n),
            u = ge(s, 'window.kaken="', '"'),
            o = new URL(t.embed).origin;
        if (!u) throw new Error("Cannot find kaken code");
        const c = await (await fetch(`${o}/api/?${u}`)).json(),
            d = c == null ? void 0 : c.sources;
        if (!d) throw new Error("Cannot find sources");
        return {
            videos: d.map((h) => ({ file: { url: h.file }, format: ya.HLS })),
        };
    }
    async search(t) {
        const r = await fetch(
            `${this.url}/search/${encodeURIComponent(t).replaceAll(
                "%20",
                "+"
            )}`,
            { headers: { "content-type": "application/json" } }
        );
        if (r.redirected) {
            const o = r.url,
                l = await r.text();
            if (!l) return [];
            const d = ee(l)("#bookmark"),
                h = d.data("post_id"),
                f = d.data("thumbnail"),
                m = d.data("title");
            return [
                {
                    id: o.split("/").slice(-1)[0],
                    title: m,
                    thumbnail: f,
                    extra: { postId: h },
                },
            ];
        }
        const a = await r.text();
        if (!a) return [];
        const n = ee(a);
        return n(".halim_box article")
            .toArray()
            .map((o) => {
                const l = n(o),
                    c = l.find("a").attr("href").split("/").slice(-1)[0],
                    d = l.find("img").data("src"),
                    h = l.find(".entry-title").text().trim(),
                    f = l
                        .attr("class")
                        .split(" ")
                        .slice(-1)[0]
                        .split("-")
                        .slice(-1)[0];
                return { id: c, title: h, thumbnail: d, extra: { postId: f } };
            });
    }
}
class SudatchiAnimeService extends AnimeService {
    constructor() {
        super({
            name: "Sudatchi",
            id: "sudatchi",
            languages: ["English"],
            isNSFW: !1,
            url: "https://sudatchi.com",
            quality: ["1080p", "720p"],
            logo: "https://sudatchi.com/favicon.ico",
        }),
            (this.isHardsubbed = !1),
            (this.rules = [
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        responseHeaders: [
                            {
                                header: "Access-Control-Allow-Origin",
                                operation: "set",
                                value: "*",
                            },
                            {
                                header: "Access-Control-Allow-Methods",
                                operation: "set",
                                value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                            },
                        ],
                        requestHeaders: [
                            {
                                header: "Origin",
                                value: "https://sudatchi.com/",
                                operation: "set",
                            },
                            {
                                header: "Referer",
                                value: "https://sudatchi.com/",
                                operation: "set",
                            },
                        ],
                    },
                    condition: {
                        regexFilter: "https://sudatchi.com/",
                        requestMethods: ["get"],
                        resourceTypes: [
                            browser.declarativeNetRequest.ResourceType
                                .XMLHTTPREQUEST,
                        ],
                    },
                },
                {
                    priority: 1,
                    action: {
                        type: "modifyHeaders",
                        responseHeaders: [
                            {
                                header: "Access-Control-Allow-Origin",
                                operation: "set",
                                value: "*",
                            },
                            {
                                header: "Access-Control-Allow-Methods",
                                operation: "set",
                                value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                            },
                        ],
                    },
                    condition: {
                        regexFilter: "https://github.com/",
                        requestMethods: ["get"],
                        resourceTypes: [
                            browser.declarativeNetRequest.ResourceType
                                .XMLHTTPREQUEST,
                        ],
                    },
                },
            ]);
    }
    async search(t) {
        var s;
        if (!t) return [];
        if (t === "null") return [];
        const r = encodeURIComponent(t),
            n = await (
                await fetch(
                    `${this.url}/api/directory?page=1&genres=&years=&types=&status=&title=${r}&category=`
                )
            ).json();
        return (s = n == null ? void 0 : n.animes) != null && s.length
            ? n.animes.map((u) => ({
                  id: u.slug,
                  title: u.titleEnglish || u.titleRomanji || u.titleJapanese,
                  thumbnail: `https://ipfs.animeui.com/ipfs/${u.imgUrl}`,
                  extra: { anilistId: u.anilistId.toString() },
              }))
            : [];
    }
    async getAnimeId(t) {
        var n, s;
        const r = await this.totalSearch(t),
            a = r.find((u) => {
                var o;
                return (
                    Number((o = u.extra) == null ? void 0 : o.anilistId) ===
                    t.id
                );
            });
        return a
            ? { data: a.id, extraData: a.extra }
            : {
                  data: (n = r == null ? void 0 : r[0]) == null ? void 0 : n.id,
                  extraData:
                      (s = r == null ? void 0 : r[0]) == null
                          ? void 0
                          : s.extra,
              };
    }
    async loadEpisodes(t) {
        var o, l, c, d;
        const a = await (await fetch(`${this.url}/anime/${t}`)).text(),
            n = ge(
                a,
                '<script id="__NEXT_DATA__" type="application/json">',
                "</script>"
            );
        if (!n) return [];
        const s = JSON.parse(n);
        return (d =
            (c =
                (l =
                    (o = s == null ? void 0 : s.props) == null
                        ? void 0
                        : o.pageProps) == null
                    ? void 0
                    : l.animeData) == null
                ? void 0
                : c.Episodes) != null && d.length
            ? s.props.pageProps.animeData.Episodes.map((h) => ({
                  id: `${t}-${h.id}`,
                  number: h.number.toString(),
                  extra: {
                      number: h.number.toString(),
                      animeId: t,
                      episodeId: h.id.toString(),
                  },
              }))
            : [];
    }
    async loadVideoServers(t, r) {
        const a = r == null ? void 0 : r.number,
            n = r == null ? void 0 : r.animeId,
            s = r == null ? void 0 : r.episodeId;
        return !a || !n
            ? []
            : [
                  {
                      embed: "",
                      name: "Server",
                      extraData: { number: a, animeId: n, episodeId: s },
                  },
              ];
    }
    async loadVideoContainer(t) {
        var x, C, S, _, g, A, v, y, D, P, Y, N;
        const r =
                (x = t == null ? void 0 : t.extraData) == null
                    ? void 0
                    : x.number,
            a =
                (C = t == null ? void 0 : t.extraData) == null
                    ? void 0
                    : C.animeId,
            n =
                (S = t == null ? void 0 : t.extraData) == null
                    ? void 0
                    : S.episodeId,
            s = { videos: [], fonts: [], subtitles: [], timestamps: [] },
            o = await (
                await fetch(`${this.url}/api/streams?episodeId=${n}`)
            ).json();
        if (!(o != null && o.url)) return s;
        s.videos.push({ file: { url: `${this.url}/${o.url}` } });
        const c = await (await fetch(`${this.url}/watch/${a}/${r}`)).text(),
            d = ge(
                c,
                '<script id="__NEXT_DATA__" type="application/json">',
                "</script>"
            );
        if (!d) return s;
        const h = JSON.parse(d);
        if (!h) return s;
        const f = JSON.parse(
            (A =
                (g =
                    (_ = h == null ? void 0 : h.props) == null
                        ? void 0
                        : _.pageProps) == null
                    ? void 0
                    : g.episodeData) == null
                ? void 0
                : A.subtitlesJson
        );
        f != null &&
            f.length &&
            (s.subtitles = f.map((R) => {
                let w = "";
                return (
                    R.url.startsWith("/subtitles")
                        ? (w = `https://sudatchi.com${R.url}`)
                        : (w = `https://gboesk298le91ct41kibaonc7o.ingress.akashprovid.com${R.url}`),
                    {
                        file: { url: w },
                        language: R.SubtitlesName.name,
                        format: Z0.ASS,
                    }
                );
            }));
        const m =
                (D =
                    (y =
                        (v = h == null ? void 0 : h.props) == null
                            ? void 0
                            : v.pageProps) == null
                        ? void 0
                        : y.episodeData) == null
                    ? void 0
                    : D.episode.openingStartsAt,
            p =
                (N =
                    (Y =
                        (P = h == null ? void 0 : h.props) == null
                            ? void 0
                            : P.pageProps) == null
                        ? void 0
                        : Y.episodeData) == null
                    ? void 0
                    : N.episode.openingEndsAt;
        return (
            p &&
                m &&
                (s.timestamps = [{ startTime: m, endTime: p, type: "OP" }]),
            (s.fonts = [
                {
                    file: {
                        url: "https://github.com/justrajdeep/fonts/raw/master/Arial.ttf",
                    },
                    name: "Arial",
                },
                {
                    file: {
                        url: "https://github.com/justrajdeep/fonts/raw/master/Arial%20Bold.ttf",
                    },
                    name: "Arial",
                },
                {
                    file: {
                        url: "https://github.com/justrajdeep/fonts/raw/master/Times%20New%20Roman.ttf",
                    },
                    name: "Times New Roman",
                },
                {
                    file: {
                        url: "https://github.com/justrajdeep/fonts/raw/master/Trebuchet%20MS.ttf",
                    },
                    name: "Trebuchet MS",
                },
                {
                    file: {
                        url: "https://github.com/justrajdeep/fonts/raw/master/Tahoma.ttf",
                    },
                    name: "Tahoma",
                },
                {
                    file: {
                        url: "https://github.com/hoangvu12/kaguya-fonts/raw/master/AdobeArabic-Regular.ttf",
                    },
                    name: "Adobe Arabic",
                },
            ]),
            s
        );
    }
}
class ophimAnimeService extends AnimeService {
    constructor() {
        super({
            name: "OPhim",
            id: "ophim",
            languages: ["Ti\u1EBFng Vi\u1EC7t"],
            isNSFW: !1,
            url: "https://ophim.cc",
            quality: ["720p", "1080p"],
            logo: "a/themes/img/logo.png",
        });
    }
    async getAnimeId(t) {
        var a, n;
        const r = await this.totalSearch(t);
        return {
            data: (a = r == null ? void 0 : r[0]) == null ? void 0 : a.id,
            extraData:
                (n = r == null ? void 0 : r[0]) == null ? void 0 : n.extra,
        };
    }
    async loadEpisodes(t) {
        var o, l, c, d;
        const a = await (await fetch(`${this.url}/phim/${t}`)).text(),
            n = ge(
                a,
                '<script id="__NEXT_DATA__" type="application/json">',
                "</script>"
            ),
            s = JSON.parse(n),
            u =
                (c =
                    (l =
                        (o = s == null ? void 0 : s.props) == null
                            ? void 0
                            : o.pageProps) == null
                        ? void 0
                        : l.data) == null
                    ? void 0
                    : c.item;
        return (d = u == null ? void 0 : u.episodes) != null && d.length
            ? u == null
                ? void 0
                : u.episodes.flatMap((h) =>
                      h.server_data.map((f) => ({
                          id: `${t}-${xh(h.server_name)}-${f.slug}`,
                          number: f.name,
                          section: h.server_name,
                          extra: { stream: f.link_m3u8 },
                      }))
                  )
            : [];
    }
    async loadVideoServers(t, r) {
        return [{ embed: "", name: "Server", extraData: r }];
    }
    async loadVideoContainer(t) {
        return { videos: [{ file: { url: t.extraData.stream } }] };
    }
    async search(t) {
        var o, l, c;
        const a = await (
                await fetch(
                    `${this.url}/tim-kiem?keyword=${encodeURIComponent(
                        t
                    ).replaceAll("%20", "+")}`
                )
            ).text(),
            n = ge(
                a,
                '<script id="__NEXT_DATA__" type="application/json">',
                "</script>"
            ),
            s = JSON.parse(n),
            u =
                (c =
                    (l =
                        (o = s == null ? void 0 : s.props) == null
                            ? void 0
                            : o.pageProps) == null
                        ? void 0
                        : l.data) == null
                    ? void 0
                    : c.items;
        return u != null && u.length
            ? u.map((d) => {
                  const h = `http://img.ophim1.com/uploads/movies/${d.poster_url}`;
                  return {
                      id: d.slug,
                      title: d.name || d.origin_name,
                      thumbnail: `${
                          this.url
                      }/_next/image?url=${encodeURIComponent(h)}&w=384&q=75`,
                  };
              })
            : [];
    }
}
const xh = (e) =>
        e
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/&/g, "-and-")
            .replace(/[\s\W-]+/g, "-"),
    AnimeServices = {
        gogo: new GogoAnimeService(),
        tvn: new TVNAnimeService(),
        ah: new AHAnimeService(),
        zoro: new ZoroAnimeService(),
        aniplay: new AniplayAnimeService(),
        hhhay: new hhhayAnimeService(),
        sudatchi: new SudatchiAnimeService(),
        ophim: new ophimAnimeService(),
    },
    MangaServices = {
        mangadex: new MangaDexMangaService(),
        mangadexvn: new MangaDexVNMangaService(),
        blogtruyen: new BlogtruyenMangaService(),
        blogtruyenmoi: new BlogtruyenmoiMangaService(),
        nettruyen: new nettruyenMangaService(),
        mangakatana: new MangakatanaMangaService(),
        bato: new BatoMangaService(),
    };
export { AnimeServices, AddRule, clearRules, Ah as d, getHostname, MangaServices };
