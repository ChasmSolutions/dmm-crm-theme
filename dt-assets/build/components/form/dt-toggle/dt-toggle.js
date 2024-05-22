import { i as e, y as o } from '../../lit-element-2409d5fe.js';
import { D as t } from '../dt-form-base.js';
import '../../dt-base.js';
import '../../lit-localize-763e4978.js';
import '../dt-label/dt-label.js';
window.customElements.define(
  'dt-toggle',
  class extends t {
    static get styles() {
      return [
        ...super.styles,
        e`:host{display:inline-block}.Toggle{display:flex;flex-wrap:wrap;align-items:center;position:relative;margin-bottom:1em;cursor:pointer;gap:1ch}button.Toggle{border:0;padding:0;background-color:transparent;font:inherit}.Toggle__input{position:absolute;opacity:0;width:100%;height:100%}.Toggle__display{--offset:0.25em;--diameter:1.2em;display:inline-flex;align-items:center;justify-content:space-around;box-sizing:content-box;width:calc(var(--diameter) * 2 + var(--offset) * 2);height:calc(var(--diameter) + var(--offset) * 2);border:.1em solid rgb(0 0 0 / .2);position:relative;border-radius:100vw;background-color:var(--dt-toggle-background-color-off,#ecf5fc);transition:250ms}.Toggle__display::before{content:'';z-index:2;position:absolute;top:50%;left:var(--offset);box-sizing:border-box;width:var(--diameter);height:var(--diameter);border:.1em solid rgb(0 0 0 / .2);border-radius:50%;background-color:#fff;transform:translate(0,-50%);will-change:transform;transition:inherit}.Toggle:focus .Toggle__display,.Toggle__input:focus+.Toggle__display{outline:1px dotted #212121;outline:1px auto -webkit-focus-ring-color;outline-offset:2px}.Toggle:focus,.Toggle:focus:not(:focus-visible) .Toggle__display,.Toggle__input:focus:not(:focus-visible)+.Toggle__display{outline:0}.Toggle[aria-pressed=true] .Toggle__display,.Toggle__input:checked+.Toggle__display{background-color:var(--primary-color)}.Toggle[aria-pressed=true] .Toggle__display::before,.Toggle__input:checked+.Toggle__display::before{transform:translate(100%,-50%)}.Toggle[disabled] .Toggle__display,.Toggle__input:disabled+.Toggle__display{opacity:.6;filter:grayscale(40%);cursor:not-allowed}[dir=rtl] .Toggle__display::before{left:auto;right:var(--offset)}[dir=rtl] .Toggle[aria-pressed=true]+.Toggle__display::before,[dir=rtl] .Toggle__input:checked+.Toggle__display::before{transform:translate(-100%,-50%)}.Toggle__icon{display:inline-block;width:1em;height:1em;color:inherit;fill:currentcolor;vertical-align:middle;overflow:hidden}.Toggle__icon--cross{color:var(--alert-color);font-size:65%}.Toggle__icon--checkmark{color:var(--success-color)}`,
      ];
    }
    static get properties() {
      return {
        ...super.properties,
        id: { type: String },
        checked: { type: Boolean, reflect: !0 },
        onchange: { type: String },
        hideIcons: { type: Boolean, default: !0 },
      };
    }
    constructor() {
      super(), (this.hideIcons = !1);
    }
    onChange(e) {
      const o = new CustomEvent('change', {
        detail: {
          field: this.name,
          oldValue: this.checked,
          newValue: e.target.checked,
        },
      });
      (this.checked = e.target.checked),
        this._setFormValue(this.checked),
        this.dispatchEvent(o);
    }
    render() {
      const e = o`<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="Toggle__icon Toggle__icon--checkmark"><path d="M6.08471 10.6237L2.29164 6.83059L1 8.11313L6.08471 13.1978L17 2.28255L15.7175 1L6.08471 10.6237Z" fill="currentcolor" stroke="currentcolor"/></svg>`,
        t = o`<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="Toggle__icon Toggle__icon--cross"><path d="M11.167 0L6.5 4.667L1.833 0L0 1.833L4.667 6.5L0 11.167L1.833 13L6.5 8.333L11.167 13L13 11.167L8.333 6.5L13 1.833L11.167 0Z" fill="currentcolor"/></svg>`;
      return o`<label class="Toggle" for="${this.id}" dir="${this.RTL ? 'rtl' : 'ltr'}">${this.label} <input type="checkbox" name="${this.id}" id="${this.id}" class="Toggle__input" ?checked="${this.checked}" @click="${this.onChange}" ?disabled="${this.disabled}"> <span class="Toggle__display" hidden>${this.hideIcons ? o`` : o`${e} ${t}`}</span></label>`;
    }
  },
);
//# sourceMappingURL=dt-toggle.js.map
