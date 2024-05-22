import { s as t } from './lit-element-2409d5fe.js';
import { L as e, c as a } from './lit-localize-763e4978.js';
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s {
  constructor(t) {
    (this.__litLocalizeEventHandler = (t) => {
      'ready' === t.detail.status && this.host.requestUpdate();
    }),
      (this.host = t);
  }
  hostConnected() {
    window.addEventListener(e, this.__litLocalizeEventHandler);
  }
  hostDisconnected() {
    window.removeEventListener(e, this.__litLocalizeEventHandler);
  }
}
const r = (t) => t.addController(new s(t)),
  n = [
    'am_ET',
    'ar',
    'ar_MA',
    'bg_BG',
    'bn_BD',
    'bs_BA',
    'cs',
    'de_DE',
    'el',
    'en_US',
    'es_419',
    'es_ES',
    'fa_IR',
    'fr_FR',
    'hi_IN',
    'hr',
    'hu_HU',
    'id_ID',
    'it_IT',
    'ja',
    'ko_KR',
    'mk_MK',
    'mr',
    'my_MM',
    'ne_NP',
    'nl_NL',
    'pa_IN',
    'pl',
    'pt_BR',
    'ro_RO',
    'ru_RU',
    'sl_SI',
    'sr_BA',
    'sw',
    'th',
    'tl',
    'tr_TR',
    'uk',
    'vi',
    'zh_CN',
    'zh_TW',
  ],
  { getLocale: i, setLocale: o } = a({
    sourceLocale: 'en',
    targetLocales: n,
    loadLocale: (t) => import(`./generated/${t}.js`),
  });
class l {
  constructor(t, e = 'wp-json') {
    (this.nonce = t),
      (this.apiRoot = e.endsWith('/') ? `${e}` : `${e} + "/"`),
      (this.apiRoot = `/${e}/`.replace(/\/\//g, '/'));
  }
  async makeRequest(t, e, a, s = 'dt/v1/') {
    let r = s;
    r.endsWith('/') || e.startsWith('/') || (r += '/');
    const n = e.startsWith('http') ? e : `${this.apiRoot}${r}${e}`,
      i = {
        method: t,
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': this.nonce,
        },
      };
    'GET' !== t && (i.body = JSON.stringify(a));
    const o = await fetch(n, i),
      l = await o.json();
    if (!o.ok) {
      const t = new Error(l?.message || l.toString());
      throw (
        ((t.args = { status: o.status, statusText: o.statusText, body: l }), t)
      );
    }
    return l;
  }
  async makeRequestOnPosts(t, e, a = {}) {
    return this.makeRequest(t, e, a, 'dt-posts/v2/');
  }
  async getPost(t, e) {
    return this.makeRequestOnPosts('GET', `${t}/${e}`);
  }
  async createPost(t, e) {
    return this.makeRequestOnPosts('POST', t, e);
  }
  async updatePost(t, e, a) {
    return this.makeRequestOnPosts('POST', `${t}/${e}`, a);
  }
  async deletePost(t, e) {
    return this.makeRequestOnPosts('DELETE', `${t}/${e}`);
  }
  async listPostsCompact(t, e = '') {
    const a = new URLSearchParams({ s: e });
    return this.makeRequestOnPosts('GET', `${t}/compact?${a}`);
  }
  async getPostDuplicates(t, e, a) {
    return this.makeRequestOnPosts('GET', `${t}/${e}/all_duplicates`, a);
  }
  async getMultiSelectValues(t, e, a = '') {
    const s = new URLSearchParams({ s: a, field: e });
    return this.makeRequestOnPosts('GET', `${t}/multi-select-values?${s}`);
  }
  async transferContact(t, e) {
    return this.makeRequestOnPosts('POST', 'contacts/transfer', {
      contact_id: t,
      site_post_id: e,
    });
  }
  async transferContactSummaryUpdate(t, e) {
    return this.makeRequestOnPosts(
      'POST',
      'contacts/transfer/summary/send-update',
      { contact_id: t, update: e },
    );
  }
  async requestRecordAccess(t, e, a) {
    return this.makeRequestOnPosts('POST', `${t}/${e}/request_record_access`, {
      user_id: a,
    });
  }
  async createComment(t, e, a, s = 'comment') {
    return this.makeRequestOnPosts('POST', `${t}/${e}/comments`, {
      comment: a,
      comment_type: s,
    });
  }
  async updateComment(t, e, a, s, r = 'comment') {
    return this.makeRequestOnPosts('POST', `${t}/${e}/comments/${a}`, {
      comment: s,
      comment_type: r,
    });
  }
  async deleteComment(t, e, a) {
    return this.makeRequestOnPosts('DELETE', `${t}/${e}/comments/${a}`);
  }
  async getComments(t, e) {
    return this.makeRequestOnPosts('GET', `${t}/${e}/comments`);
  }
  async toggle_comment_reaction(t, e, a, s, r) {
    return this.makeRequestOnPosts('POST', `${t}/${e}/comments/${a}/react`, {
      user_id: s,
      reaction: r,
    });
  }
  async getPostActivity(t, e) {
    return this.makeRequestOnPosts('GET', `${t}/${e}/activity`);
  }
  async getSingleActivity(t, e, a) {
    return this.makeRequestOnPosts('GET', `${t}/${e}/activity/${a}`);
  }
  async revertActivity(t, e, a) {
    return this.makeRequestOnPosts('GET', `${t}/${e}/revert/${a}`);
  }
  async getPostShares(t, e) {
    return this.makeRequestOnPosts('GET', `${t}/${e}/shares`);
  }
  async addPostShare(t, e, a) {
    return this.makeRequestOnPosts('POST', `${t}/${e}/shares`, { user_id: a });
  }
  async removePostShare(t, e, a) {
    return this.makeRequestOnPosts('DELETE', `${t}/${e}/shares`, {
      user_id: a,
    });
  }
  async getFilters() {
    return this.makeRequest('GET', 'users/get_filters');
  }
  async saveFilters(t, e) {
    return this.makeRequest('POST', 'users/save_filters', {
      filter: e,
      postType: t,
    });
  }
  async deleteFilter(t, e) {
    return this.makeRequest('DELETE', 'users/save_filters', {
      id: e,
      postType: t,
    });
  }
  async searchUsers(t) {
    return this.makeRequest('GET', `users/get_users?s=${t}`);
  }
  async createUser(t) {
    return this.makeRequest('POST', 'users/create', t);
  }
  async advanced_search(t, e, a, s) {
    return this.makeRequest(
      'GET',
      'advanced_search',
      {
        query: t,
        postType: e,
        offset: a,
        post: s.post,
        comment: s.comment,
        meta: s.meta,
        status: s.status,
      },
      'dt-posts/v2/posts/search/',
    );
  }
}
!(function () {
  const t = new WeakMap(),
    e = new WeakMap(),
    a = new WeakMap(),
    s = new WeakMap(),
    r = new WeakMap(),
    n = new WeakMap(),
    i = new WeakMap(),
    o = new WeakMap(),
    l = new WeakMap(),
    c = new WeakMap(),
    d = new WeakMap(),
    u = new WeakMap(),
    m = new WeakMap(),
    h = { attributes: !0, attributeFilter: ['disabled'] },
    p = new MutationObserver((t) => {
      for (const e of t) {
        const t = e.target;
        if (t.constructor.formAssociated) {
          const e = t.hasAttribute('disabled');
          t.toggleAttribute('internals-disabled', e),
            e
              ? t.setAttribute('aria-disabled', 'true')
              : t.removeAttribute('aria-disabled'),
            t.formDisabledCallback && t.formDisabledCallback.apply(t, [e]);
        }
      }
    }),
    f = (t) => {
      a.get(t).forEach((t) => {
        t.remove();
      }),
        a.set(t, []);
    },
    g = (t, e) => {
      const s = document.createElement('input');
      return (
        (s.type = 'hidden'),
        (s.name = t.getAttribute('name')),
        t.after(s),
        a.get(e).push(s),
        s
      );
    },
    y = (t, e) => {
      if (e.length) {
        Array.from(e).forEach((e) =>
          e.addEventListener('click', t.focus.bind(t)),
        );
        let a = e[0].id;
        e[0].id || ((a = `${e[0].htmlFor}_Label`), (e[0].id = a)),
          t.setAttribute('aria-labelledby', a);
      }
    },
    E = (t) => {
      const e = Array.from(t.elements)
          .filter((t) => t.validity)
          .map((t) => t.validity.valid),
        a = o.get(t) || [],
        r = [
          ...e,
          ...Array.from(a)
            .filter((t) => t.isConnected)
            .map((t) => s.get(t).validity.valid),
        ].includes(!1);
      t.toggleAttribute('internals-invalid', r),
        t.toggleAttribute('internals-valid', !r);
    },
    w = (t) => {
      E(k(t.target));
    },
    b = (t) => {
      E(k(t.target));
    },
    v = (t) => {
      const e = o.get(t.target);
      e &&
        e.size &&
        e.forEach((t) => {
          t.constructor.formAssociated &&
            t.formResetCallback &&
            t.formResetCallback.apply(t);
        });
    },
    T = (t, e, a) => {
      if (e) {
        const r = o.get(e);
        if (r) r.add(t);
        else {
          const a = new Set();
          a.add(t),
            o.set(e, a),
            ((t) => {
              const e =
                ':is(:is(button, input)[type=submit], button:not([type])):not([disabled])';
              let a = `${e}:not([form])`;
              t.id && (a += `,${e}[form='${t.id}']`),
                t.addEventListener('click', (e) => {
                  if (e.target.closest(a)) {
                    const a = o.get(t);
                    if (t.noValidate) return;
                    a.size &&
                      Array.from(a)
                        .reverse()
                        .map((t) => s.get(t).reportValidity())
                        .includes(!1) &&
                      e.preventDefault();
                  }
                });
            })(e),
            e.addEventListener('reset', v),
            e.addEventListener('input', w),
            e.addEventListener('change', b);
        }
        n.set(e, { ref: t, internals: a }),
          t.constructor.formAssociated &&
            t.formAssociatedCallback &&
            setTimeout(() => {
              t.formAssociatedCallback.apply(t, [e]);
            }, 0),
          E(e);
      }
    },
    k = (t) => {
      let e = t.parentNode;
      return e && 'FORM' !== e.tagName && (e = k(e)), e;
    },
    R = (t, e, a = DOMException) => {
      if (!t.constructor.formAssociated) throw new a(e);
    },
    _ = (t, e, a) => {
      const r = o.get(t);
      return (
        r &&
          r.size &&
          r.forEach((t) => {
            s.get(t)[a]() || (e = !1);
          }),
        e
      );
    },
    O = (t) => {
      if (t.constructor.formAssociated) {
        const e = s.get(t),
          { labels: a, form: r } = e;
        y(t, a), T(t, r, e);
      }
    },
    $ = {
      ariaAtomic: 'aria-atomic',
      ariaAutoComplete: 'aria-autocomplete',
      ariaBusy: 'aria-busy',
      ariaChecked: 'aria-checked',
      ariaColCount: 'aria-colcount',
      ariaColIndex: 'aria-colindex',
      ariaColSpan: 'aria-colspan',
      ariaCurrent: 'aria-current',
      ariaDisabled: 'aria-disabled',
      ariaExpanded: 'aria-expanded',
      ariaHasPopup: 'aria-haspopup',
      ariaHidden: 'aria-hidden',
      ariaKeyShortcuts: 'aria-keyshortcuts',
      ariaLabel: 'aria-label',
      ariaLevel: 'aria-level',
      ariaLive: 'aria-live',
      ariaModal: 'aria-modal',
      ariaMultiLine: 'aria-multiline',
      ariaMultiSelectable: 'aria-multiselectable',
      ariaOrientation: 'aria-orientation',
      ariaPlaceholder: 'aria-placeholder',
      ariaPosInSet: 'aria-posinset',
      ariaPressed: 'aria-pressed',
      ariaReadOnly: 'aria-readonly',
      ariaRelevant: 'aria-relevant',
      ariaRequired: 'aria-required',
      ariaRoleDescription: 'aria-roledescription',
      ariaRowCount: 'aria-rowcount',
      ariaRowIndex: 'aria-rowindex',
      ariaRowSpan: 'aria-rowspan',
      ariaSelected: 'aria-selected',
      ariaSetSize: 'aria-setsize',
      ariaSort: 'aria-sort',
      ariaValueMax: 'aria-valuemax',
      ariaValueMin: 'aria-valuemin',
      ariaValueNow: 'aria-valuenow',
      ariaValueText: 'aria-valuetext',
      role: 'role',
    };
  class M {
    constructor() {
      (this.badInput = !1),
        (this.customError = !1),
        (this.patternMismatch = !1),
        (this.rangeOverflow = !1),
        (this.rangeUnderflow = !1),
        (this.stepMismatch = !1),
        (this.tooLong = !1),
        (this.tooShort = !1),
        (this.typeMismatch = !1),
        (this.valid = !0),
        (this.valueMissing = !1),
        Object.seal(this);
    }
  }
  const S = (t) => {
    let e = !0;
    for (let a in t) 'valid' !== a && !1 !== t[a] && (e = !1);
    return e;
  };
  function P(t) {
    const e = s.get(t),
      { form: a } = e;
    T(t, a, e), y(t, e.labels);
  }
  function A(t) {
    t.forEach((t) => {
      const { addedNodes: e, removedNodes: r } = t,
        n = Array.from(e),
        l = Array.from(r);
      n.forEach((t) => {
        if ((s.has(t) && t.constructor.formAssociated && P(t), c.has(t))) {
          const e = c.get(t);
          Object.keys($)
            .filter((t) => null !== e[t])
            .forEach((a) => {
              t.setAttribute($[a], e[a]);
            }),
            c.delete(t);
        }
        if ('form' === t.localName) {
          const e = o.get(t),
            a = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
              acceptNode: (t) =>
                !s.has(t) || e || e.has(t)
                  ? NodeFilter.FILTER_SKIP
                  : NodeFilter.FILTER_ACCEPT,
            });
          let r = a.nextNode();
          for (; r; ) P(r), (r = a.nextNode());
        }
      }),
        l.forEach((t) => {
          const e = s.get(t);
          if ((e && a.get(e) && f(e), i.has(t))) {
            i.get(t).disconnect();
          }
        });
    });
  }
  function L(t) {
    t.forEach((t) => {
      const { removedNodes: e } = t;
      e.forEach((e) => {
        const a = m.get(t.target);
        s.has(e) && O(e), a.disconnect();
      });
    });
  }
  new MutationObserver(A);
  const I = { childList: !0, subtree: !0 },
    x = new WeakMap();
  class F extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(t) {
      if ((super(), !t || !t.tagName || -1 === t.tagName.indexOf('-')))
        throw new TypeError('Illegal constructor');
      x.set(this, t);
    }
    add(t) {
      if (!/^--/.test(t) || 'string' != typeof t)
        throw new DOMException(
          `Failed to execute 'add' on 'CustomStateSet': The specified value ${t} must start with '--'.`,
        );
      const e = super.add(t),
        a = x.get(this);
      return (
        a.toggleAttribute(`state${t}`, !0), a.part && a.part.add(`state${t}`), e
      );
    }
    clear() {
      for (let [t] of this.entries()) this.delete(t);
      super.clear();
    }
    delete(t) {
      const e = super.delete(t),
        a = x.get(this);
      return (
        a.toggleAttribute(`state${t}`, !1),
        a.part && a.part.remove(`state${t}`),
        e
      );
    }
  }
  class q {
    constructor(r) {
      if (!r || !r.tagName || -1 === r.tagName.indexOf('-'))
        throw new TypeError('Illegal constructor');
      const n = r.getRootNode(),
        i = new M();
      (this.states = new F(r)),
        t.set(this, r),
        e.set(this, i),
        s.set(r, this),
        ((t, e) => {
          for (let a in $) {
            e[a] = null;
            let s = null;
            const r = $[a];
            Object.defineProperty(e, a, {
              get: () => s,
              set(a) {
                (s = a), t.isConnected ? t.setAttribute(r, a) : c.set(t, e);
              },
            });
          }
        })(r, this),
        ((t, e) => {
          a.set(e, []);
          const s = t.hasAttribute('disabled');
          t.toggleAttribute('internals-disabled', s), p.observe(t, h);
        })(r, this),
        Object.seal(this),
        O(r),
        n instanceof DocumentFragment &&
          ((t) => {
            const e = new MutationObserver(L);
            e.observe(t, { childList: !0 }), m.set(t, e);
          })(n);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const a = t.get(this);
      if (
        (R(
          a,
          "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        !this.willValidate)
      )
        return !0;
      const s = e.get(this);
      if (!s.valid) {
        const t = new Event('invalid', {
          bubbles: !1,
          cancelable: !0,
          composed: !1,
        });
        a.dispatchEvent(t);
      }
      return s.valid;
    }
    get form() {
      const e = t.get(this);
      let a;
      return (
        R(
          e,
          "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        !0 === e.constructor.formAssociated && (a = k(e)),
        a
      );
    }
    get labels() {
      const e = t.get(this);
      R(
        e,
        "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.",
      );
      const a = e.getAttribute('id'),
        s = e.getRootNode();
      return s && a ? s.querySelectorAll(`[for="${a}"]`) : [];
    }
    reportValidity() {
      const e = t.get(this);
      if (
        (R(
          e,
          "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        !this.willValidate)
      )
        return !0;
      const a = this.checkValidity(),
        s = u.get(this);
      if (s && !e.constructor.formAssociated)
        throw new DOMException(
          "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.",
        );
      return !a && s && (e.focus(), s.focus()), a;
    }
    setFormValue(e) {
      const a = t.get(this);
      if (
        (R(
          a,
          "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        f(this),
        null == e || e instanceof FormData)
      )
        null != e &&
          e instanceof FormData &&
          Array.from(e)
            .reverse()
            .forEach(([t, e]) => {
              if ('string' == typeof e) {
                const s = g(a, this);
                (s.name = t), (s.value = e);
              }
            });
      else if (a.getAttribute('name')) {
        g(a, this).value = e;
      }
      l.set(a, e);
    }
    setValidity(a, s, n) {
      const i = t.get(this);
      if (
        (R(
          i,
          "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        !a)
      )
        throw new TypeError(
          "Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.",
        );
      u.set(this, n);
      const o = e.get(this),
        l = {};
      for (const t in a) l[t] = a[t];
      var c;
      0 === Object.keys(l).length &&
        (((c = o).badInput = !1),
        (c.customError = !1),
        (c.patternMismatch = !1),
        (c.rangeOverflow = !1),
        (c.rangeUnderflow = !1),
        (c.stepMismatch = !1),
        (c.tooLong = !1),
        (c.tooShort = !1),
        (c.typeMismatch = !1),
        (c.valid = !0),
        (c.valueMissing = !1));
      const d = { ...o, ...l };
      delete d.valid;
      const { valid: m } = ((t, e, a) => (
        (t.valid = S(e)),
        Object.keys(e).forEach((a) => (t[a] = e[a])),
        a && E(a),
        t
      ))(o, d, this.form);
      if (!m && !s)
        throw new DOMException(
          "Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.",
        );
      r.set(this, m ? '' : s),
        i.toggleAttribute('internals-invalid', !m),
        i.toggleAttribute('internals-valid', m),
        i.setAttribute('aria-invalid', `${!m}`);
    }
    get shadowRoot() {
      const e = t.get(this),
        a = d.get(e);
      return a || null;
    }
    get validationMessage() {
      const e = t.get(this);
      return (
        R(
          e,
          "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        r.get(this)
      );
    }
    get validity() {
      const a = t.get(this);
      R(
        a,
        "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element.",
      );
      return e.get(this);
    }
    get willValidate() {
      const e = t.get(this);
      return (
        R(
          e,
          "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element.",
        ),
        !(
          e.disabled ||
          e.hasAttribute('disabled') ||
          e.hasAttribute('readonly')
        )
      );
    }
  }
  if (
    (function () {
      if (!window.ElementInternals || !HTMLElement.prototype.attachInternals)
        return !1;
      class t extends HTMLElement {
        constructor() {
          super(), (this.internals = this.attachInternals());
        }
      }
      const e = `element-internals-feature-detection-${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')}`;
      customElements.define(e, t);
      const a = new t();
      return [
        'shadowRoot',
        'form',
        'willValidate',
        'validity',
        'validationMessage',
        'labels',
        'setFormValue',
        'setValidity',
        'checkValidity',
        'reportValidity',
      ].every((t) => t in a.internals);
    })()
  ) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = F;
      const t = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function (...e) {
        const a = t.call(this, e);
        return (a.states = new F(this)), a;
      };
    }
  } else {
    (window.ElementInternals = q),
      (HTMLElement.prototype.attachInternals = function () {
        if (!this.tagName) return {};
        if (-1 === this.tagName.indexOf('-'))
          throw new Error(
            "Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.",
          );
        if (s.has(this))
          throw new DOMException(
            "DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.",
          );
        return new q(this);
      });
    const t = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (...e) {
      const a = t.apply(this, e),
        s = new MutationObserver(A);
      return (
        d.set(this, a),
        window.ShadyDOM ? s.observe(this, I) : s.observe(a, I),
        i.set(this, s),
        a
      );
    };
    new MutationObserver(A).observe(document.documentElement, I);
    const e = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = function (...t) {
      let a = e.apply(this, t);
      return _(this, a, 'checkValidity');
    };
    const a = HTMLFormElement.prototype.reportValidity;
    (HTMLFormElement.prototype.reportValidity = function (...t) {
      let e = a.apply(this, t);
      return _(this, e, 'reportValidity');
    }),
      window.CustomStateSet || (window.CustomStateSet = F);
  }
})();
class c extends t {
  static get properties() {
    return {
      RTL: { type: String },
      locale: { type: String },
      apiRoot: { type: String, reflect: !1 },
      postType: { type: String, reflect: !1 },
      postID: { type: String, reflect: !1 },
    };
  }
  get _focusTarget() {
    return this.shadowRoot.children[0] instanceof Element
      ? this.shadowRoot.children[0]
      : null;
  }
  constructor() {
    super(),
      r(this),
      this.addEventListener('focus', this._proxyFocus.bind(this));
  }
  connectedCallback() {
    super.connectedCallback(),
      (this.apiRoot = this.apiRoot
        ? `${this.apiRoot}/`.replace('//', '/')
        : '/'),
      (this.api = new l(this.nonce, this.apiRoot));
  }
  willUpdate(t) {
    if (void 0 === this.RTL) {
      const t = this.closest('[dir]');
      if (t) {
        const e = t.getAttribute('dir');
        e && (this.RTL = 'rtl' === e.toLowerCase());
      }
    }
    if (!this.locale) {
      const t = this.closest('[lang]');
      if (t) {
        const e = t.getAttribute('lang');
        e && (this.locale = e);
      }
    }
    if (t && t.has('locale') && this.locale)
      try {
        o(this.locale);
      } catch (t) {
        console.error(t);
      }
  }
  _proxyFocus() {
    this._focusTarget && this._focusTarget.focus();
  }
}
export { l as A, c as D };
//# sourceMappingURL=dt-base.js.map
