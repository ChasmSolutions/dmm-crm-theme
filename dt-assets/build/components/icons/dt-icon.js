import { i as t, y as e } from '../lit-element-2409d5fe.js';
import { D as n } from '../dt-base.js';
import '../lit-localize-763e4978.js';
/**
 * (c) Iconify
 *
 * For the full copyright and license information, please view the license.txt
 * files at https://github.com/iconify/iconify
 *
 * Licensed under MIT.
 *
 * @license MIT
 * @version 1.0.2
 */ const o = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  i = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  r = Object.freeze({ ...o, ...i }),
  s = Object.freeze({ ...r, body: '', hidden: !1 }),
  c = Object.freeze({ width: null, height: null }),
  a = Object.freeze({ ...c, ...i });
const l = /[\s,]+/;
const u = { ...a, preserveAspectRatio: '' };
function f(t) {
  const e = { ...u },
    n = (e, n) => t.getAttribute(e) || n;
  var o;
  return (
    (e.width = n('width', null)),
    (e.height = n('height', null)),
    (e.rotate = (function (t, e = 0) {
      const n = t.replace(/^-?[0-9.]*/, '');
      function o(t) {
        for (; t < 0; ) t += 4;
        return t % 4;
      }
      if ('' === n) {
        const e = parseInt(t);
        return isNaN(e) ? 0 : o(e);
      }
      if (n !== t) {
        let e = 0;
        switch (n) {
          case '%':
            e = 25;
            break;
          case 'deg':
            e = 90;
        }
        if (e) {
          let i = parseFloat(t.slice(0, t.length - n.length));
          return isNaN(i) ? 0 : ((i /= e), i % 1 == 0 ? o(i) : 0);
        }
      }
      return e;
    })(n('rotate', ''))),
    (o = e),
    n('flip', '')
      .split(l)
      .forEach((t) => {
        switch (t.trim()) {
          case 'horizontal':
            o.hFlip = !0;
            break;
          case 'vertical':
            o.vFlip = !0;
        }
      }),
    (e.preserveAspectRatio = n(
      'preserveAspectRatio',
      n('preserveaspectratio', ''),
    )),
    e
  );
}
const d = /^[a-z0-9]+(-[a-z0-9]+)*$/,
  p = (t, e, n, o = '') => {
    const i = t.split(':');
    if ('@' === t.slice(0, 1)) {
      if (i.length < 2 || i.length > 3) return null;
      o = i.shift().slice(1);
    }
    if (i.length > 3 || !i.length) return null;
    if (i.length > 1) {
      const t = i.pop(),
        n = i.pop(),
        r = { provider: i.length > 0 ? i[0] : o, prefix: n, name: t };
      return e && !h(r) ? null : r;
    }
    const r = i[0],
      s = r.split('-');
    if (s.length > 1) {
      const t = { provider: o, prefix: s.shift(), name: s.join('-') };
      return e && !h(t) ? null : t;
    }
    if (n && '' === o) {
      const t = { provider: o, prefix: '', name: r };
      return e && !h(t, n) ? null : t;
    }
    return null;
  },
  h = (t, e) =>
    !!t &&
    !(
      ('' !== t.provider && !t.provider.match(d)) ||
      !((e && '' === t.prefix) || t.prefix.match(d)) ||
      !t.name.match(d)
    );
function g(t, e) {
  const n = (function (t, e) {
    const n = {};
    !t.hFlip != !e.hFlip && (n.hFlip = !0),
      !t.vFlip != !e.vFlip && (n.vFlip = !0);
    const o = ((t.rotate || 0) + (e.rotate || 0)) % 4;
    return o && (n.rotate = o), n;
  })(t, e);
  for (const o in s)
    o in i
      ? o in t && !(o in n) && (n[o] = i[o])
      : o in e
        ? (n[o] = e[o])
        : o in t && (n[o] = t[o]);
  return n;
}
function m(t, e, n) {
  const o = t.icons,
    i = t.aliases || Object.create(null);
  let r = {};
  function s(t) {
    r = g(o[t] || i[t], r);
  }
  return s(e), n.forEach(s), g(t, r);
}
function b(t, e) {
  const n = [];
  if ('object' != typeof t || 'object' != typeof t.icons) return n;
  t.not_found instanceof Array &&
    t.not_found.forEach((t) => {
      e(t, null), n.push(t);
    });
  const o = (function (t, e) {
    const n = t.icons,
      o = t.aliases || Object.create(null),
      i = Object.create(null);
    return (
      (e || Object.keys(n).concat(Object.keys(o))).forEach(function t(e) {
        if (n[e]) return (i[e] = []);
        if (!(e in i)) {
          i[e] = null;
          const n = o[e] && o[e].parent,
            r = n && t(n);
          r && (i[e] = [n].concat(r));
        }
        return i[e];
      }),
      i
    );
  })(t);
  for (const i in o) {
    const r = o[i];
    r && (e(i, m(t, i, r)), n.push(i));
  }
  return n;
}
const y = { provider: '', aliases: {}, not_found: {}, ...o };
function v(t, e) {
  for (const n in e) if (n in t && typeof t[n] != typeof e[n]) return !1;
  return !0;
}
function x(t) {
  if ('object' != typeof t || null === t) return null;
  const e = t;
  if ('string' != typeof e.prefix || !t.icons || 'object' != typeof t.icons)
    return null;
  if (!v(t, y)) return null;
  const n = e.icons;
  for (const t in n) {
    const e = n[t];
    if (!t.match(d) || 'string' != typeof e.body || !v(e, s)) return null;
  }
  const o = e.aliases || Object.create(null);
  for (const t in o) {
    const e = o[t],
      i = e.parent;
    if (!t.match(d) || 'string' != typeof i || (!n[i] && !o[i]) || !v(e, s))
      return null;
  }
  return e;
}
const w = Object.create(null);
function k(t, e) {
  const n = w[t] || (w[t] = Object.create(null));
  return (
    n[e] ||
    (n[e] = (function (t, e) {
      return {
        provider: t,
        prefix: e,
        icons: Object.create(null),
        missing: new Set(),
      };
    })(t, e))
  );
}
function j(t, e) {
  return x(e)
    ? b(e, (e, n) => {
        n ? (t.icons[e] = n) : t.missing.add(e);
      })
    : [];
}
function _(t, e) {
  let n = [];
  return (
    ('string' == typeof t ? [t] : Object.keys(w)).forEach((t) => {
      ('string' == typeof t && 'string' == typeof e
        ? [e]
        : Object.keys(w[t] || {})
      ).forEach((e) => {
        const o = k(t, e);
        n = n.concat(
          Object.keys(o.icons).map(
            (n) => ('' !== t ? '@' + t + ':' : '') + e + ':' + n,
          ),
        );
      });
    }),
    n
  );
}
let A = !1;
function S(t) {
  return 'boolean' == typeof t && (A = t), A;
}
function O(t) {
  const e = 'string' == typeof t ? p(t, !0, A) : t;
  if (e) {
    const t = k(e.provider, e.prefix),
      n = e.name;
    return t.icons[n] || (t.missing.has(n) ? null : void 0);
  }
}
function C(t, e) {
  const n = p(t, !0, A);
  if (!n) return !1;
  return (function (t, e, n) {
    try {
      if ('string' == typeof n.body) return (t.icons[e] = { ...n }), !0;
    } catch (t) {}
    return !1;
  })(k(n.provider, n.prefix), n.name, e);
}
function E(t, e) {
  if ('object' != typeof t) return !1;
  if (('string' != typeof e && (e = t.provider || ''), A && !e && !t.prefix)) {
    let e = !1;
    return (
      x(t) &&
        ((t.prefix = ''),
        b(t, (t, n) => {
          n && C(t, n) && (e = !0);
        })),
      e
    );
  }
  const n = t.prefix;
  if (!h({ provider: e, prefix: n, name: 'a' })) return !1;
  return !!j(k(e, n), t);
}
function I(t) {
  return !!O(t);
}
function M(t) {
  const e = O(t);
  return e ? { ...r, ...e } : null;
}
function T(t, e) {
  t.forEach((t) => {
    const n = t.loaderCallbacks;
    n && (t.loaderCallbacks = n.filter((t) => t.id !== e));
  });
}
let F = 0;
const N = Object.create(null);
function P(t, e) {
  N[t] = e;
}
function R(t) {
  return N[t] || N[''];
}
var z = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1,
};
function L(t, e, n, o) {
  const i = t.resources.length,
    r = t.random ? Math.floor(Math.random() * i) : t.index;
  let s;
  if (t.random) {
    let e = t.resources.slice(0);
    for (s = []; e.length > 1; ) {
      const t = Math.floor(Math.random() * e.length);
      s.push(e[t]), (e = e.slice(0, t).concat(e.slice(t + 1)));
    }
    s = s.concat(e);
  } else s = t.resources.slice(r).concat(t.resources.slice(0, r));
  const c = Date.now();
  let a,
    l = 'pending',
    u = 0,
    f = null,
    d = [],
    p = [];
  function h() {
    f && (clearTimeout(f), (f = null));
  }
  function g() {
    'pending' === l && (l = 'aborted'),
      h(),
      d.forEach((t) => {
        'pending' === t.status && (t.status = 'aborted');
      }),
      (d = []);
  }
  function m(t, e) {
    e && (p = []), 'function' == typeof t && p.push(t);
  }
  function b() {
    (l = 'failed'),
      p.forEach((t) => {
        t(void 0, a);
      });
  }
  function y() {
    d.forEach((t) => {
      'pending' === t.status && (t.status = 'aborted');
    }),
      (d = []);
  }
  function v() {
    if ('pending' !== l) return;
    h();
    const o = s.shift();
    if (void 0 === o)
      return d.length
        ? void (f = setTimeout(() => {
            h(), 'pending' === l && (y(), b());
          }, t.timeout))
        : void b();
    const i = {
      status: 'pending',
      resource: o,
      callback: (e, n) => {
        !(function (e, n, o) {
          const i = 'success' !== n;
          switch (((d = d.filter((t) => t !== e)), l)) {
            case 'pending':
              break;
            case 'failed':
              if (i || !t.dataAfterTimeout) return;
              break;
            default:
              return;
          }
          if ('abort' === n) return (a = o), void b();
          if (i) return (a = o), void (d.length || (s.length ? v() : b()));
          if ((h(), y(), !t.random)) {
            const n = t.resources.indexOf(e.resource);
            -1 !== n && n !== t.index && (t.index = n);
          }
          (l = 'completed'),
            p.forEach((t) => {
              t(o);
            });
        })(i, e, n);
      },
    };
    d.push(i), u++, (f = setTimeout(v, t.rotate)), n(o, e, i.callback);
  }
  return (
    'function' == typeof o && p.push(o),
    setTimeout(v),
    function () {
      return {
        startTime: c,
        payload: e,
        status: l,
        queriesSent: u,
        queriesPending: d.length,
        subscribe: m,
        abort: g,
      };
    }
  );
}
function Q(t) {
  const e = { ...z, ...t };
  let n = [];
  function o() {
    n = n.filter((t) => 'pending' === t().status);
  }
  return {
    query: function (t, i, r) {
      const s = L(e, t, i, (t, e) => {
        o(), r && r(t, e);
      });
      return n.push(s), s;
    },
    find: function (t) {
      return n.find((e) => t(e)) || null;
    },
    setIndex: (t) => {
      e.index = t;
    },
    getIndex: () => e.index,
    cleanup: o,
  };
}
function $(t) {
  let e;
  if ('string' == typeof t.resources) e = [t.resources];
  else if (((e = t.resources), !(e instanceof Array && e.length))) return null;
  return {
    resources: e,
    path: t.path || '/',
    maxURL: t.maxURL || 500,
    rotate: t.rotate || 750,
    timeout: t.timeout || 5e3,
    random: !0 === t.random,
    index: t.index || 0,
    dataAfterTimeout: !1 !== t.dataAfterTimeout,
  };
}
const D = Object.create(null),
  q = ['https://api.simplesvg.com', 'https://api.unisvg.com'],
  U = [];
for (; q.length > 0; )
  1 === q.length || Math.random() > 0.5 ? U.push(q.shift()) : U.push(q.pop());
function J(t, e) {
  const n = $(e);
  return null !== n && ((D[t] = n), !0);
}
function B(t) {
  return D[t];
}
function H() {
  return Object.keys(D);
}
function G() {}
D[''] = $({ resources: ['https://api.iconify.design'].concat(U) });
const V = Object.create(null);
function K(t, e, n) {
  let o, i;
  if ('string' == typeof t) {
    const e = R(t);
    if (!e) return n(void 0, 424), G;
    i = e.send;
    const r = (function (t) {
      if (!V[t]) {
        const e = B(t);
        if (!e) return;
        const n = { config: e, redundancy: Q(e) };
        V[t] = n;
      }
      return V[t];
    })(t);
    r && (o = r.redundancy);
  } else {
    const e = $(t);
    if (e) {
      o = Q(e);
      const n = R(t.resources ? t.resources[0] : '');
      n && (i = n.send);
    }
  }
  return o && i ? o.query(e, i, n)().abort : (n(void 0, 424), G);
}
function W(t, e) {
  try {
    return t.getItem(e);
  } catch (t) {}
}
function X(t, e, n) {
  try {
    return t.setItem(e, n), !0;
  } catch (t) {}
}
function Y(t, e) {
  try {
    t.removeItem(e);
  } catch (t) {}
}
function Z(t, e) {
  return X(t, 'iconify-count', e.toString());
}
function tt(t) {
  return parseInt(W(t, 'iconify-count')) || 0;
}
const et = { local: !0, session: !0 },
  nt = { local: new Set(), session: new Set() };
let ot = !1;
let it = 'undefined' == typeof window ? {} : window;
function rt(t) {
  const e = t + 'Storage';
  try {
    if (it && it[e] && 'number' == typeof it[e].length) return it[e];
  } catch (t) {}
  et[t] = !1;
}
function st(t, e) {
  const n = rt(t);
  if (!n) return;
  const o = W(n, 'iconify-version');
  if ('iconify2' !== o) {
    if (o) {
      const t = tt(n);
      for (let e = 0; e < t; e++) Y(n, 'iconify' + e.toString());
    }
    return X(n, 'iconify-version', 'iconify2'), void Z(n, 0);
  }
  const i = Math.floor(Date.now() / 36e5) - 168,
    r = (t) => {
      const o = 'iconify' + t.toString(),
        r = W(n, o);
      if ('string' == typeof r) {
        try {
          const n = JSON.parse(r);
          if (
            'object' == typeof n &&
            'number' == typeof n.cached &&
            n.cached > i &&
            'string' == typeof n.provider &&
            'object' == typeof n.data &&
            'string' == typeof n.data.prefix &&
            e(n, t)
          )
            return !0;
        } catch (t) {}
        Y(n, o);
      }
    };
  let s = tt(n);
  for (let e = s - 1; e >= 0; e--)
    r(e) || (e === s - 1 ? (s--, Z(n, s)) : nt[t].add(e));
}
function ct() {
  if (!ot) {
    ot = !0;
    for (const t in et)
      st(t, (t) => {
        const e = t.data,
          n = k(t.provider, e.prefix);
        if (!j(n, e).length) return !1;
        const o = e.lastModified || -1;
        return (
          (n.lastModifiedCached = n.lastModifiedCached
            ? Math.min(n.lastModifiedCached, o)
            : o),
          !0
        );
      });
  }
}
function at(t, e) {
  function n(n) {
    let o;
    if (!et[n] || !(o = rt(n))) return;
    const i = nt[n];
    let r;
    if (i.size) i.delete((r = Array.from(i).shift()));
    else if (((r = tt(o)), !Z(o, r + 1))) return;
    const s = {
      cached: Math.floor(Date.now() / 36e5),
      provider: t.provider,
      data: e,
    };
    return X(o, 'iconify' + r.toString(), JSON.stringify(s));
  }
  ot || ct(),
    (e.lastModified &&
      !(function (t, e) {
        const n = t.lastModifiedCached;
        if (n && n >= e) return n === e;
        if (((t.lastModifiedCached = e), n))
          for (const n in et)
            st(n, (n) => {
              const o = n.data;
              return (
                n.provider !== t.provider ||
                o.prefix !== t.prefix ||
                o.lastModified === e
              );
            });
        return !0;
      })(t, e.lastModified)) ||
      (Object.keys(e.icons).length &&
        (e.not_found && delete (e = Object.assign({}, e)).not_found,
        n('local') || n('session')));
}
function lt() {}
function ut(t) {
  t.iconsLoaderFlag ||
    ((t.iconsLoaderFlag = !0),
    setTimeout(() => {
      (t.iconsLoaderFlag = !1),
        (function (t) {
          t.pendingCallbacksFlag ||
            ((t.pendingCallbacksFlag = !0),
            setTimeout(() => {
              t.pendingCallbacksFlag = !1;
              const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
              if (!e.length) return;
              let n = !1;
              const o = t.provider,
                i = t.prefix;
              e.forEach((e) => {
                const r = e.icons,
                  s = r.pending.length;
                (r.pending = r.pending.filter((e) => {
                  if (e.prefix !== i) return !0;
                  const s = e.name;
                  if (t.icons[s])
                    r.loaded.push({ provider: o, prefix: i, name: s });
                  else {
                    if (!t.missing.has(s)) return (n = !0), !0;
                    r.missing.push({ provider: o, prefix: i, name: s });
                  }
                  return !1;
                })),
                  r.pending.length !== s &&
                    (n || T([t], e.id),
                    e.callback(
                      r.loaded.slice(0),
                      r.missing.slice(0),
                      r.pending.slice(0),
                      e.abort,
                    ));
              });
            }));
        })(t);
    }));
}
const ft = (t, e) => {
    const n = (function (t, e = !0, n = !1) {
        const o = [];
        return (
          t.forEach((t) => {
            const i = 'string' == typeof t ? p(t, e, n) : t;
            i && o.push(i);
          }),
          o
        );
      })(t, !0, S()),
      o = (function (t) {
        const e = { loaded: [], missing: [], pending: [] },
          n = Object.create(null);
        t.sort((t, e) =>
          t.provider !== e.provider
            ? t.provider.localeCompare(e.provider)
            : t.prefix !== e.prefix
              ? t.prefix.localeCompare(e.prefix)
              : t.name.localeCompare(e.name),
        );
        let o = { provider: '', prefix: '', name: '' };
        return (
          t.forEach((t) => {
            if (
              o.name === t.name &&
              o.prefix === t.prefix &&
              o.provider === t.provider
            )
              return;
            o = t;
            const i = t.provider,
              r = t.prefix,
              s = t.name,
              c = n[i] || (n[i] = Object.create(null)),
              a = c[r] || (c[r] = k(i, r));
            let l;
            l =
              s in a.icons
                ? e.loaded
                : '' === r || a.missing.has(s)
                  ? e.missing
                  : e.pending;
            const u = { provider: i, prefix: r, name: s };
            l.push(u);
          }),
          e
        );
      })(n);
    if (!o.pending.length) {
      let t = !0;
      return (
        e &&
          setTimeout(() => {
            t && e(o.loaded, o.missing, o.pending, lt);
          }),
        () => {
          t = !1;
        }
      );
    }
    const i = Object.create(null),
      r = [];
    let s, c;
    return (
      o.pending.forEach((t) => {
        const { provider: e, prefix: n } = t;
        if (n === c && e === s) return;
        (s = e), (c = n), r.push(k(e, n));
        const o = i[e] || (i[e] = Object.create(null));
        o[n] || (o[n] = []);
      }),
      o.pending.forEach((t) => {
        const { provider: e, prefix: n, name: o } = t,
          r = k(e, n),
          s = r.pendingIcons || (r.pendingIcons = new Set());
        s.has(o) || (s.add(o), i[e][n].push(o));
      }),
      r.forEach((t) => {
        const { provider: e, prefix: n } = t;
        i[e][n].length &&
          (function (t, e) {
            t.iconsToLoad
              ? (t.iconsToLoad = t.iconsToLoad.concat(e).sort())
              : (t.iconsToLoad = e),
              t.iconsQueueFlag ||
                ((t.iconsQueueFlag = !0),
                setTimeout(() => {
                  t.iconsQueueFlag = !1;
                  const { provider: e, prefix: n } = t,
                    o = t.iconsToLoad;
                  let i;
                  delete t.iconsToLoad,
                    o &&
                      (i = R(e)) &&
                      i.prepare(e, n, o).forEach((n) => {
                        K(e, n, (e) => {
                          if ('object' != typeof e)
                            n.icons.forEach((e) => {
                              t.missing.add(e);
                            });
                          else
                            try {
                              const n = j(t, e);
                              if (!n.length) return;
                              const o = t.pendingIcons;
                              o &&
                                n.forEach((t) => {
                                  o.delete(t);
                                }),
                                at(t, e);
                            } catch (t) {
                              console.error(t);
                            }
                          ut(t);
                        });
                      });
                }));
          })(t, i[e][n]);
      }),
      e
        ? (function (t, e, n) {
            const o = F++,
              i = T.bind(null, n, o);
            if (!e.pending.length) return i;
            const r = { id: o, icons: e, callback: t, abort: i };
            return (
              n.forEach((t) => {
                (t.loaderCallbacks || (t.loaderCallbacks = [])).push(r);
              }),
              i
            );
          })(e, o, r)
        : lt
    );
  },
  dt = (t) =>
    new Promise((e, n) => {
      const o = 'string' == typeof t ? p(t, !0) : t;
      o
        ? ft([o || t], (i) => {
            if (i.length && o) {
              const t = O(o);
              if (t) return void e({ ...r, ...t });
            }
            n(t);
          })
        : n(t);
    });
function pt(t, e) {
  const n = 'string' == typeof t ? p(t, !0, !0) : null;
  if (!n) {
    const e = (function (t) {
      try {
        const e = 'string' == typeof t ? JSON.parse(t) : t;
        if ('string' == typeof e.body) return { ...e };
      } catch (t) {}
    })(t);
    return { value: t, data: e };
  }
  const o = O(n);
  if (void 0 !== o || !n.prefix) return { value: t, name: n, data: o };
  const i = ft([n], () => e(t, n, O(n)));
  return { value: t, name: n, loading: i };
}
function ht(t) {
  return t.hasAttribute('inline');
}
let gt = !1;
try {
  gt = 0 === navigator.vendor.indexOf('Apple');
} catch (t) {}
const mt = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  bt = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function yt(t, e, n) {
  if (1 === e) return t;
  if (((n = n || 100), 'number' == typeof t)) return Math.ceil(t * e * n) / n;
  if ('string' != typeof t) return t;
  const o = t.split(mt);
  if (null === o || !o.length) return t;
  const i = [];
  let r = o.shift(),
    s = bt.test(r);
  for (;;) {
    if (s) {
      const t = parseFloat(r);
      isNaN(t) ? i.push(r) : i.push(Math.ceil(t * e * n) / n);
    } else i.push(r);
    if (((r = o.shift()), void 0 === r)) return i.join('');
    s = !s;
  }
}
function vt(t, e) {
  const n = { ...r, ...t },
    o = { ...a, ...e },
    i = { left: n.left, top: n.top, width: n.width, height: n.height };
  let s = n.body;
  [n, o].forEach((t) => {
    const e = [],
      n = t.hFlip,
      o = t.vFlip;
    let r,
      c = t.rotate;
    switch (
      (n
        ? o
          ? (c += 2)
          : (e.push(
              'translate(' +
                (i.width + i.left).toString() +
                ' ' +
                (0 - i.top).toString() +
                ')',
            ),
            e.push('scale(-1 1)'),
            (i.top = i.left = 0))
        : o &&
          (e.push(
            'translate(' +
              (0 - i.left).toString() +
              ' ' +
              (i.height + i.top).toString() +
              ')',
          ),
          e.push('scale(1 -1)'),
          (i.top = i.left = 0)),
      c < 0 && (c -= 4 * Math.floor(c / 4)),
      (c %= 4),
      c)
    ) {
      case 1:
        (r = i.height / 2 + i.top),
          e.unshift('rotate(90 ' + r.toString() + ' ' + r.toString() + ')');
        break;
      case 2:
        e.unshift(
          'rotate(180 ' +
            (i.width / 2 + i.left).toString() +
            ' ' +
            (i.height / 2 + i.top).toString() +
            ')',
        );
        break;
      case 3:
        (r = i.width / 2 + i.left),
          e.unshift('rotate(-90 ' + r.toString() + ' ' + r.toString() + ')');
    }
    c % 2 == 1 &&
      (i.left !== i.top && ((r = i.left), (i.left = i.top), (i.top = r)),
      i.width !== i.height &&
        ((r = i.width), (i.width = i.height), (i.height = r))),
      e.length && (s = '<g transform="' + e.join(' ') + '">' + s + '</g>');
  });
  const c = o.width,
    l = o.height,
    u = i.width,
    f = i.height;
  let d, p;
  null === c
    ? ((p = null === l ? '1em' : 'auto' === l ? f : l), (d = yt(p, u / f)))
    : ((d = 'auto' === c ? u : c),
      (p = null === l ? yt(d, f / u) : 'auto' === l ? f : l));
  return {
    attributes: {
      width: d.toString(),
      height: p.toString(),
      viewBox:
        i.left.toString() +
        ' ' +
        i.top.toString() +
        ' ' +
        u.toString() +
        ' ' +
        f.toString(),
    },
    body: s,
  };
}
let xt = (() => {
  let t;
  try {
    if (((t = fetch), 'function' == typeof t)) return t;
  } catch (t) {}
})();
function wt(t) {
  xt = t;
}
function kt() {
  return xt;
}
const jt = {
  prepare: (t, e, n) => {
    const o = [],
      i = (function (t, e) {
        const n = B(t);
        if (!n) return 0;
        let o;
        if (n.maxURL) {
          let t = 0;
          n.resources.forEach((e) => {
            const n = e;
            t = Math.max(t, n.length);
          });
          const i = e + '.json?icons=';
          o = n.maxURL - t - n.path.length - i.length;
        } else o = 0;
        return o;
      })(t, e),
      r = 'icons';
    let s = { type: r, provider: t, prefix: e, icons: [] },
      c = 0;
    return (
      n.forEach((n, a) => {
        (c += n.length + 1),
          c >= i &&
            a > 0 &&
            (o.push(s),
            (s = { type: r, provider: t, prefix: e, icons: [] }),
            (c = n.length)),
          s.icons.push(n);
      }),
      o.push(s),
      o
    );
  },
  send: (t, e, n) => {
    if (!xt) return void n('abort', 424);
    let o = (function (t) {
      if ('string' == typeof t) {
        const e = B(t);
        if (e) return e.path;
      }
      return '/';
    })(e.provider);
    switch (e.type) {
      case 'icons': {
        const t = e.prefix,
          n = e.icons.join(',');
        o += t + '.json?' + new URLSearchParams({ icons: n }).toString();
        break;
      }
      case 'custom': {
        const t = e.uri;
        o += '/' === t.slice(0, 1) ? t.slice(1) : t;
        break;
      }
      default:
        return void n('abort', 400);
    }
    let i = 503;
    xt(t + o)
      .then((t) => {
        const e = t.status;
        if (200 === e) return (i = 501), t.json();
        setTimeout(() => {
          n(
            (function (t) {
              return 404 === t;
            })(e)
              ? 'abort'
              : 'next',
            e,
          );
        });
      })
      .then((t) => {
        'object' == typeof t && null !== t
          ? setTimeout(() => {
              n('success', t);
            })
          : setTimeout(() => {
              404 === t ? n('abort', t) : n('next', i);
            });
      })
      .catch(() => {
        n('next', i);
      });
  },
};
function _t(t, e) {
  switch (t) {
    case 'local':
    case 'session':
      et[t] = e;
      break;
    case 'all':
      for (const t in et) et[t] = e;
  }
}
function At() {
  let t;
  P('', jt), S(!0);
  try {
    t = window;
  } catch (t) {}
  if (t) {
    if ((ct(), void 0 !== t.IconifyPreload)) {
      const e = t.IconifyPreload,
        n = 'Invalid IconifyPreload syntax.';
      'object' == typeof e &&
        null !== e &&
        (e instanceof Array ? e : [e]).forEach((t) => {
          try {
            ('object' != typeof t ||
              null === t ||
              t instanceof Array ||
              'object' != typeof t.icons ||
              'string' != typeof t.prefix ||
              !E(t)) &&
              console.error(n);
          } catch (t) {
            console.error(n);
          }
        });
    }
    if (void 0 !== t.IconifyProviders) {
      const e = t.IconifyProviders;
      if ('object' == typeof e && null !== e)
        for (const t in e) {
          const n = 'IconifyProviders[' + t + '] is invalid.';
          try {
            const o = e[t];
            if ('object' != typeof o || !o || void 0 === o.resources) continue;
            J(t, o) || console.error(n);
          } catch (t) {
            console.error(n);
          }
        }
    }
  }
  return {
    enableCache: (t) => _t(t, !0),
    disableCache: (t) => _t(t, !1),
    iconExists: I,
    getIcon: M,
    listIcons: _,
    addIcon: C,
    addCollection: E,
    calculateSize: yt,
    buildIcon: vt,
    loadIcons: ft,
    loadIcon: dt,
    addAPIProvider: J,
    _api: {
      getAPIConfig: B,
      setAPIModule: P,
      sendAPIQuery: K,
      setFetch: wt,
      getFetch: kt,
      listAPIProviders: H,
    },
  };
}
function St(t, e) {
  let n =
    -1 === t.indexOf('xlink:')
      ? ''
      : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const t in e) n += ' ' + t + '="' + e[t] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + '>' + t + '</svg>';
}
const Ot = { 'background-color': 'currentColor' },
  Ct = { 'background-color': 'transparent' },
  Et = { image: 'var(--svg)', repeat: 'no-repeat', size: '100% 100%' },
  It = { '-webkit-mask': Ot, mask: Ot, background: Ct };
for (const t in It) {
  const e = It[t];
  for (const n in Et) e[t + '-' + n] = Et[n];
}
function Mt(t) {
  return t + (t.match(/^[-0-9.]+$/) ? 'px' : '');
}
function Tt(t, e) {
  const n = e.icon.data,
    o = e.customisations,
    i = vt(n, o);
  o.preserveAspectRatio &&
    (i.attributes.preserveAspectRatio = o.preserveAspectRatio);
  const s = e.renderedMode;
  let c;
  if ('svg' === s)
    c = (function (t) {
      const e = document.createElement('span');
      return (e.innerHTML = St(t.body, t.attributes)), e.firstChild;
    })(i);
  else
    c = (function (t, e, n) {
      const o = document.createElement('span');
      let i = t.body;
      -1 !== i.indexOf('<a') && (i += '\x3c!-- ' + Date.now() + ' --\x3e');
      const r = t.attributes,
        s =
          'url("data:image/svg+xml,' +
          ((l = St(i, { ...r, width: e.width + '', height: e.height + '' })),
          l
            .replace(/"/g, "'")
            .replace(/%/g, '%25')
            .replace(/#/g, '%23')
            .replace(/</g, '%3C')
            .replace(/>/g, '%3E')
            .replace(/\s+/g, ' ') + '")'),
        c = o.style,
        a = {
          '--svg': s,
          width: Mt(r.width),
          height: Mt(r.height),
          ...(n ? Ot : Ct),
        };
      var l;
      for (const t in a) c.setProperty(t, a[t]);
      return o;
    })(i, { ...r, ...n }, 'mask' === s);
  const a = Array.from(t.childNodes).find((t) => {
    const e = t.tagName && t.tagName.toUpperCase();
    return 'SPAN' === e || 'SVG' === e;
  });
  a
    ? 'SPAN' === c.tagName && a.tagName === c.tagName
      ? a.setAttribute('style', c.getAttribute('style'))
      : t.replaceChild(c, a)
    : t.appendChild(c);
}
function Ft(t, e) {
  let n = Array.from(t.childNodes).find(
    (t) => t.hasAttribute && t.hasAttribute('data-style'),
  );
  n ||
    ((n = document.createElement('style')),
    n.setAttribute('data-style', 'data-style'),
    t.appendChild(n)),
    (n.textContent =
      ':host{display:inline-block;vertical-align:' +
      (e ? '-0.125em' : '0') +
      '}span,svg{display:block}');
}
function Nt(t, e, n) {
  return {
    rendered: !1,
    inline: e,
    icon: t,
    lastRender: n && (n.rendered ? n : n.lastRender),
  };
}
(function (t = 'iconify-icon') {
  let e, n;
  try {
    (e = window.customElements), (n = window.HTMLElement);
  } catch (t) {
    return;
  }
  if (!e || !n) return;
  const o = e.get(t);
  if (o) return o;
  const i = ['icon', 'mode', 'inline', 'width', 'height', 'rotate', 'flip'],
    r = class extends n {
      _shadowRoot;
      _state;
      _checkQueued = !1;
      constructor() {
        super();
        const t = (this._shadowRoot = this.attachShadow({ mode: 'open' })),
          e = ht(this);
        Ft(t, e), (this._state = Nt({ value: '' }, e)), this._queueCheck();
      }
      static get observedAttributes() {
        return i.slice(0);
      }
      attributeChangedCallback(t) {
        if ('inline' === t) {
          const t = ht(this),
            e = this._state;
          t !== e.inline && ((e.inline = t), Ft(this._shadowRoot, t));
        } else this._queueCheck();
      }
      get icon() {
        const t = this.getAttribute('icon');
        if (t && '{' === t.slice(0, 1))
          try {
            return JSON.parse(t);
          } catch (t) {}
        return t;
      }
      set icon(t) {
        'object' == typeof t && (t = JSON.stringify(t)),
          this.setAttribute('icon', t);
      }
      get inline() {
        return ht(this);
      }
      set inline(t) {
        this.setAttribute('inline', t ? 'true' : null);
      }
      restartAnimation() {
        const t = this._state;
        if (t.rendered) {
          const e = this._shadowRoot;
          if ('svg' === t.renderedMode)
            try {
              return void e.lastChild.setCurrentTime(0);
            } catch (t) {}
          Tt(e, t);
        }
      }
      get status() {
        const t = this._state;
        return t.rendered
          ? 'rendered'
          : null === t.icon.data
            ? 'failed'
            : 'loading';
      }
      _queueCheck() {
        this._checkQueued ||
          ((this._checkQueued = !0),
          setTimeout(() => {
            this._check();
          }));
      }
      _check() {
        if (!this._checkQueued) return;
        this._checkQueued = !1;
        const t = this._state,
          e = this.getAttribute('icon');
        if (e !== t.icon.value) return void this._iconChanged(e);
        if (!t.rendered) return;
        const n = this.getAttribute('mode'),
          o = f(this);
        (t.attrMode !== n ||
          (function (t, e) {
            for (const n in u) if (t[n] !== e[n]) return !0;
            return !1;
          })(t.customisations, o)) &&
          this._renderIcon(t.icon, o, n);
      }
      _iconChanged(t) {
        const e = pt(t, (t, e, n) => {
          const o = this._state;
          if (o.rendered || this.getAttribute('icon') !== t) return;
          const i = { value: t, name: e, data: n };
          i.data ? this._gotIconData(i) : (o.icon = i);
        });
        e.data
          ? this._gotIconData(e)
          : (this._state = Nt(e, this._state.inline, this._state));
      }
      _gotIconData(t) {
        (this._checkQueued = !1),
          this._renderIcon(t, f(this), this.getAttribute('mode'));
      }
      _renderIcon(t, e, n) {
        const o = (function (t, e) {
            switch (e) {
              case 'svg':
              case 'bg':
              case 'mask':
                return e;
            }
            return 'style' === e || (!gt && -1 !== t.indexOf('<a'))
              ? -1 === t.indexOf('currentColor')
                ? 'bg'
                : 'mask'
              : 'svg';
          })(t.data.body, n),
          i = this._state.inline;
        Tt(
          this._shadowRoot,
          (this._state = {
            rendered: !0,
            icon: t,
            inline: i,
            customisations: e,
            attrMode: n,
            renderedMode: o,
          }),
        );
      }
    };
  i.forEach((t) => {
    t in r.prototype ||
      Object.defineProperty(r.prototype, t, {
        get: function () {
          return this.getAttribute(t);
        },
        set: function (e) {
          this.setAttribute(t, e);
        },
      });
  });
  const s = At();
  for (const t in s) r[t] = r.prototype[t] = s[t];
  return e.define(t, r), r;
})() || At();
window.customElements.define(
  'dt-icon',
  class extends n {
    static get styles() {
      return t`:root{font-size:inherit;color:inherit;display:inline-flex;width:fit-content;height:fit-content;position:relative}.tooltip{position:absolute;right:20px;top:-50%;min-width:max-content;border:solid 1px currentcolor;background-color:var(--dt-form-background-color,var(--surface-1));padding:.25rem;border-radius:.25rem;text-align:end;z-index:1;display:block}.tooltip:before{position:absolute;right:.7rem;top:1.45rem;content:" ";border-width:.25rem;border-style:solid;border-color:transparent transparent currentcolor transparent}.tooltip[hidden]{display:none}`;
    }
    static get properties() {
      return {
        ...super.properties,
        icon: { type: String },
        tooltip: { type: String },
        tooltip_open: { type: Boolean },
        size: { type: String },
      };
    }
    _showTooltip() {
      this.tooltip_open ? (this.tooltip_open = !1) : (this.tooltip_open = !0);
    }
    render() {
      const t = this.tooltip
        ? e`<div class="tooltip" ?hidden="${this.tooltip_open}">${this.tooltip}</div>`
        : null;
      return e`<iconify-icon icon="${this.icon}" width="${this.size}" @click="${this._showTooltip}"></iconify-icon>${t}`;
    }
  },
);
//# sourceMappingURL=dt-icon.js.map
