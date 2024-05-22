/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  e =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s = Symbol(),
  i = new WeakMap();
class n {
  constructor(t, e, i) {
    if (((this._$cssResult$ = !0), i !== s))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.',
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = i.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          e && i.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const o = (t, ...e) => {
    const i =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, s, i) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(s) +
              t[i + 1],
            t[0],
          );
    return new n(i, t, s);
  },
  r = e
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return ((t) =>
                new n('string' == typeof t ? t : t + '', void 0, s))(e);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var l;
const h = window,
  a = h.trustedTypes,
  d = a ? a.emptyScript : '',
  c = h.reactiveElementPolyfillSupport,
  u = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? d : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let s = t;
      switch (e) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  p = (t, e) => e !== t && (e == e || t == t),
  $ = { attribute: !0, type: String, converter: u, reflect: !1, hasChanged: p };
class v extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u();
  }
  static addInitializer(t) {
    var e;
    (null !== (e = this.h) && void 0 !== e) || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, s) => {
        const i = this._$Ep(s, e);
        void 0 !== i && (this._$Ev.set(i, s), t.push(i));
      }),
      t
    );
  }
  static createProperty(t, e = $) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        i = this.getPropertyDescriptor(t, s, e);
      void 0 !== i && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const n = this[t];
        (this[e] = i), this.requestUpdate(t, n, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || $;
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of e) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) e.unshift(r(t));
    } else void 0 !== t && e.push(r(t));
    return e;
  }
  static _$Ep(t, e) {
    const s = e.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
        ? s
        : 'string' == typeof t
          ? t.toLowerCase()
          : void 0;
  }
  u() {
    var t;
    (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (t = this.constructor.h) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var e, s;
    (null !== (e = this._$ES) && void 0 !== e ? e : (this._$ES = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var e;
    null === (e = this._$ES) ||
      void 0 === e ||
      e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var s;
    const i =
      null !== (s = this.shadowRoot) && void 0 !== s
        ? s
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((s, i) => {
        e
          ? (s.adoptedStyleSheets = i.map((t) =>
              t instanceof CSSStyleSheet ? t : t.styleSheet,
            ))
          : i.forEach((e) => {
              const i = document.createElement('style'),
                n = t.litNonce;
              void 0 !== n && i.setAttribute('nonce', n),
                (i.textContent = e.cssText),
                s.appendChild(i);
            });
      })(i, this.constructor.elementStyles),
      i
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$ES) ||
        void 0 === t ||
        t.forEach((t) => {
          var e;
          return null === (e = t.hostConnected) || void 0 === e
            ? void 0
            : e.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((t) => {
        var e;
        return null === (e = t.hostDisconnected) || void 0 === e
          ? void 0
          : e.call(t);
      });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e, s = $) {
    var i;
    const n = this.constructor._$Ep(t, s);
    if (void 0 !== n && !0 === s.reflect) {
      const o = (
        void 0 !==
        (null === (i = s.converter) || void 0 === i ? void 0 : i.toAttribute)
          ? s.converter
          : u
      ).toAttribute(e, s.type);
      (this._$El = t),
        null == o ? this.removeAttribute(n) : this.setAttribute(n, o),
        (this._$El = null);
    }
  }
  _$AK(t, e) {
    var s;
    const i = this.constructor,
      n = i._$Ev.get(t);
    if (void 0 !== n && this._$El !== n) {
      const t = i.getPropertyOptions(n),
        o =
          'function' == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !==
                (null === (s = t.converter) || void 0 === s
                  ? void 0
                  : s.fromAttribute)
              ? t.converter
              : u;
      (this._$El = n),
        (this[n] = o.fromAttribute(e, t.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, e, s) {
    let i = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || p)(
        this[t],
        e,
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          !0 === s.reflect &&
            this._$El !== t &&
            (void 0 === this._$EC && (this._$EC = new Map()),
            this._$EC.set(t, s)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((t, e) => (this[e] = t)), (this._$Ei = void 0));
    let e = !1;
    const s = this._$AL;
    try {
      (e = this.shouldUpdate(s)),
        e
          ? (this.willUpdate(s),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostUpdate) || void 0 === e
                  ? void 0
                  : e.call(t);
              }),
            this.update(s))
          : this._$Ek();
    } catch (t) {
      throw ((e = !1), this._$Ek(), t);
    }
    e && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    null === (e = this._$ES) ||
      void 0 === e ||
      e.forEach((t) => {
        var e;
        return null === (e = t.hostUpdated) || void 0 === e
          ? void 0
          : e.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC &&
      (this._$EC.forEach((t, e) => this._$EO(e, this[e], t)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;
(v.finalized = !0),
  (v.elementProperties = new Map()),
  (v.elementStyles = []),
  (v.shadowRootOptions = { mode: 'open' }),
  null == c || c({ ReactiveElement: v }),
  (null !== (l = h.reactiveElementVersions) && void 0 !== l
    ? l
    : (h.reactiveElementVersions = [])
  ).push('1.4.1');
const A = window,
  f = A.trustedTypes,
  g = f ? f.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  y = `lit$${(Math.random() + '').slice(9)}$`,
  m = '?' + y,
  E = `<${m}>`,
  S = document,
  b = (t = '') => S.createComment(t),
  C = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  w = Array.isArray,
  x = (t) =>
    w(t) || 'function' == typeof (null == t ? void 0 : t[Symbol.iterator]),
  U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  P = /-->/g,
  H = />/g,
  O = RegExp(
    '>|[ \t\n\f\r](?:([^\\s"\'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r"\'`<>=]|("|\')|))|$)',
    'g',
  ),
  N = /'/g,
  T = /"/g,
  R = /^(?:script|style|textarea|title)$/i,
  M = (
    (t) =>
    (e, ...s) => ({ _$litType$: t, strings: e, values: s })
  )(1),
  k = Symbol.for('lit-noChange'),
  L = Symbol.for('lit-nothing'),
  j = new WeakMap(),
  B = S.createTreeWalker(S, 129, null, !1),
  z = (t, e) => {
    const s = t.length - 1,
      i = [];
    let n,
      o = 2 === e ? '<svg>' : '',
      r = U;
    for (let e = 0; e < s; e++) {
      const s = t[e];
      let l,
        h,
        a = -1,
        d = 0;
      for (; d < s.length && ((r.lastIndex = d), (h = r.exec(s)), null !== h); )
        (d = r.lastIndex),
          r === U
            ? '!--' === h[1]
              ? (r = P)
              : void 0 !== h[1]
                ? (r = H)
                : void 0 !== h[2]
                  ? (R.test(h[2]) && (n = RegExp('</' + h[2], 'g')), (r = O))
                  : void 0 !== h[3] && (r = O)
            : r === O
              ? '>' === h[0]
                ? ((r = null != n ? n : U), (a = -1))
                : void 0 === h[1]
                  ? (a = -2)
                  : ((a = r.lastIndex - h[2].length),
                    (l = h[1]),
                    (r = void 0 === h[3] ? O : '"' === h[3] ? T : N))
              : r === T || r === N
                ? (r = O)
                : r === P || r === H
                  ? (r = U)
                  : ((r = O), (n = void 0));
      const c = r === O && t[e + 1].startsWith('/>') ? ' ' : '';
      o +=
        r === U
          ? s + E
          : a >= 0
            ? (i.push(l), s.slice(0, a) + '$lit$' + s.slice(a) + y + c)
            : s + y + (-2 === a ? (i.push(void 0), e) : c);
    }
    const l = o + (t[s] || '<?>') + (2 === e ? '</svg>' : '');
    if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
      throw Error('invalid template strings array');
    return [void 0 !== g ? g.createHTML(l) : l, i];
  };
class D {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0,
      o = 0;
    const r = t.length - 1,
      l = this.parts,
      [h, a] = z(t, e);
    if (
      ((this.el = D.createElement(h, s)),
      (B.currentNode = this.el.content),
      2 === e)
    ) {
      const t = this.el.content,
        e = t.firstChild;
      e.remove(), t.append(...e.childNodes);
    }
    for (; null !== (i = B.nextNode()) && l.length < r; ) {
      if (1 === i.nodeType) {
        if (i.hasAttributes()) {
          const t = [];
          for (const e of i.getAttributeNames())
            if (e.endsWith('$lit$') || e.startsWith(y)) {
              const s = a[o++];
              if ((t.push(e), void 0 !== s)) {
                const t = i.getAttribute(s.toLowerCase() + '$lit$').split(y),
                  e = /([.?@])?(.*)/.exec(s);
                l.push({
                  type: 1,
                  index: n,
                  name: e[2],
                  strings: t,
                  ctor:
                    '.' === e[1] ? J : '?' === e[1] ? Z : '@' === e[1] ? F : q,
                });
              } else l.push({ type: 6, index: n });
            }
          for (const e of t) i.removeAttribute(e);
        }
        if (R.test(i.tagName)) {
          const t = i.textContent.split(y),
            e = t.length - 1;
          if (e > 0) {
            i.textContent = f ? f.emptyScript : '';
            for (let s = 0; s < e; s++)
              i.append(t[s], b()),
                B.nextNode(),
                l.push({ type: 2, index: ++n });
            i.append(t[e], b());
          }
        }
      } else if (8 === i.nodeType)
        if (i.data === m) l.push({ type: 2, index: n });
        else {
          let t = -1;
          for (; -1 !== (t = i.data.indexOf(y, t + 1)); )
            l.push({ type: 7, index: n }), (t += y.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function I(t, e, s = t, i) {
  var n, o, r, l;
  if (e === k) return e;
  let h =
    void 0 !== i
      ? null === (n = s._$Co) || void 0 === n
        ? void 0
        : n[i]
      : s._$Cl;
  const a = C(e) ? void 0 : e._$litDirective$;
  return (
    (null == h ? void 0 : h.constructor) !== a &&
      (null === (o = null == h ? void 0 : h._$AO) ||
        void 0 === o ||
        o.call(h, !1),
      void 0 === a ? (h = void 0) : ((h = new a(t)), h._$AT(t, s, i)),
      void 0 !== i
        ? ((null !== (r = (l = s)._$Co) && void 0 !== r ? r : (l._$Co = []))[
            i
          ] = h)
        : (s._$Cl = h)),
    void 0 !== h && (e = I(t, h._$AS(t, e.values), h, i)),
    e
  );
}
class V {
  constructor(t, e) {
    (this.u = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const {
        el: { content: s },
        parts: i,
      } = this._$AD,
      n = (
        null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e
          ? e
          : S
      ).importNode(s, !0);
    B.currentNode = n;
    let o = B.nextNode(),
      r = 0,
      l = 0,
      h = i[0];
    for (; void 0 !== h; ) {
      if (r === h.index) {
        let e;
        2 === h.type
          ? (e = new W(o, o.nextSibling, this, t))
          : 1 === h.type
            ? (e = new h.ctor(o, h.name, h.strings, this, t))
            : 6 === h.type && (e = new G(o, this, t)),
          this.u.push(e),
          (h = i[++l]);
      }
      r !== (null == h ? void 0 : h.index) && ((o = B.nextNode()), r++);
    }
    return n;
  }
  p(t) {
    let e = 0;
    for (const s of this.u)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, e), (e += s.strings.length - 2))
          : s._$AI(t[e])),
        e++;
  }
}
class W {
  constructor(t, e, s, i) {
    var n;
    (this.type = 2),
      (this._$AH = L),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = s),
      (this.options = i),
      (this._$Cm =
        null === (n = null == i ? void 0 : i.isConnected) || void 0 === n || n);
  }
  get _$AU() {
    var t, e;
    return null !==
      (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== e
      ? e
      : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = I(this, t, e)),
      C(t)
        ? t === L || null == t || '' === t
          ? (this._$AH !== L && this._$AR(), (this._$AH = L))
          : t !== this._$AH && t !== k && this.g(t)
        : void 0 !== t._$litType$
          ? this.$(t)
          : void 0 !== t.nodeType
            ? this.T(t)
            : x(t)
              ? this.k(t)
              : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  g(t) {
    this._$AH !== L && C(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(S.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    var e;
    const { values: s, _$litType$: i } = t,
      n =
        'number' == typeof i
          ? this._$AC(t)
          : (void 0 === i.el && (i.el = D.createElement(i.h, this.options)), i);
    if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === n)
      this._$AH.p(s);
    else {
      const t = new V(n, this),
        e = t.v(this.options);
      t.p(s), this.T(e), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = j.get(t.strings);
    return void 0 === e && j.set(t.strings, (e = new D(t))), e;
  }
  k(t) {
    w(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let s,
      i = 0;
    for (const n of t)
      i === e.length
        ? e.push((s = new W(this.O(b()), this.O(b()), this, this.options)))
        : (s = e[i]),
        s._$AI(n),
        i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const e = t.nextSibling;
      t.remove(), (t = e);
    }
  }
  setConnected(t) {
    var e;
    void 0 === this._$AM &&
      ((this._$Cm = t),
      null === (e = this._$AP) || void 0 === e || e.call(this, t));
  }
}
class q {
  constructor(t, e, s, i, n) {
    (this.type = 1),
      (this._$AH = L),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = n),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = L);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (void 0 === n)
      (t = I(this, t, e, 0)),
        (o = !C(t) || (t !== this._$AH && t !== k)),
        o && (this._$AH = t);
    else {
      const i = t;
      let r, l;
      for (t = n[0], r = 0; r < n.length - 1; r++)
        (l = I(this, i[s + r], e, r)),
          l === k && (l = this._$AH[r]),
          o || (o = !C(l) || l !== this._$AH[r]),
          l === L ? (t = L) : t !== L && (t += (null != l ? l : '') + n[r + 1]),
          (this._$AH[r] = l);
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === L
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class J extends q {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === L ? void 0 : t;
  }
}
const K = f ? f.emptyScript : '';
class Z extends q {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== L
      ? this.element.setAttribute(this.name, K)
      : this.element.removeAttribute(this.name);
  }
}
class F extends q {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    var s;
    if ((t = null !== (s = I(this, t, e, 0)) && void 0 !== s ? s : L) === k)
      return;
    const i = this._$AH,
      n =
        (t === L && i !== L) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      o = t !== L && (i === L || n);
    n && this.element.removeEventListener(this.name, this, i),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, s;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (e = this.options) || void 0 === e ? void 0 : e.host) &&
            void 0 !== s
            ? s
            : this.element,
          t,
        )
      : this._$AH.handleEvent(t);
  }
}
class G {
  constructor(t, e, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const Q = {
    P: '$lit$',
    A: y,
    M: m,
    C: 1,
    L: z,
    R: V,
    D: x,
    V: I,
    I: W,
    H: q,
    N: Z,
    U: F,
    B: J,
    F: G,
  },
  X = A.litHtmlPolyfillSupport;
null == X || X(D, W),
  (null !== (_ = A.litHtmlVersions) && void 0 !== _
    ? _
    : (A.litHtmlVersions = [])
  ).push('2.4.0');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y, tt;
class et extends v {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) ||
        (e.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, e, s) => {
        var i, n;
        const o =
          null !== (i = null == s ? void 0 : s.renderBefore) && void 0 !== i
            ? i
            : e;
        let r = o._$litPart$;
        if (void 0 === r) {
          const t =
            null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n
              ? n
              : null;
          o._$litPart$ = r = new W(
            e.insertBefore(b(), t),
            t,
            void 0,
            null != s ? s : {},
          );
        }
        return r._$AI(t), r;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return k;
  }
}
(et.finalized = !0),
  (et._$litElement$ = !0),
  null === (Y = globalThis.litElementHydrateSupport) ||
    void 0 === Y ||
    Y.call(globalThis, { LitElement: et });
const st = globalThis.litElementPolyfillSupport;
null == st || st({ LitElement: et }),
  (null !== (tt = globalThis.litElementVersions) && void 0 !== tt
    ? tt
    : (globalThis.litElementVersions = [])
  ).push('3.2.2');
export { Q as L, L as b, o as i, et as s, k as x, M as y };
//# sourceMappingURL=lit-element-2409d5fe.js.map
