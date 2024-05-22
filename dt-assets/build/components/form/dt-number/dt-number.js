import { i as e, y as t } from '../../lit-element-2409d5fe.js';
import { l as r } from '../../if-defined-11ddebeb.js';
import { D as o } from '../dt-form-base.js';
import { A as a } from '../../dt-base.js';
import '../dt-label/dt-label.js';
import '../../lit-localize-763e4978.js';
window.customElements.define(
  'dt-number',
  class extends o {
    static get styles() {
      return [
        ...super.styles,
        e`input{color:var(--dt-form-text-color,#000);appearance:none;background-color:var(--dt-form-background-color,#fff);border:1px solid var(--dt-form-border-color,#ccc);border-radius:0;box-shadow:var(--dt-form-input-box-shadow,inset 0 1px 2px hsl(0deg 0 4% / 10%));box-sizing:border-box;display:block;font-family:inherit;font-size:1rem;font-weight:300;height:2.5rem;line-height:1.5;margin:0 0 1.0666666667rem;padding:var(--dt-form-padding,.5333333333rem);transition:var(--dt-form-transition,box-shadow .5s,border-color .25s ease-in-out)}input:disabled,input[readonly],textarea:disabled,textarea[readonly]{background-color:var(--dt-form-disabled-background-color,#e6e6e6);cursor:not-allowed}input:invalid{border-color:var(--dt-form-invalid-border-color,#dc3545)}`,
      ];
    }
    static get properties() {
      return {
        ...super.properties,
        id: { type: String },
        value: { type: String, reflect: !0 },
        oldValue: { type: String },
        min: { type: Number },
        max: { type: Number },
        loading: { type: Boolean },
        saved: { type: Boolean },
        onchange: { type: String },
      };
    }
    connectedCallback() {
      super.connectedCallback(), (this.oldValue = this.value);
    }
    _checkValue(e) {
      return !(e < this.min || e > this.max);
    }
    async onChange(e) {
      if (this._checkValue(e.target.value)) {
        const t = new CustomEvent('change', {
          detail: {
            field: this.name,
            oldValue: this.value,
            newValue: e.target.value,
          },
          bubbles: !0,
          composed: !0,
        });
        (this.value = e.target.value),
          this._field.setCustomValidity(''),
          this.dispatchEvent(t),
          (this.api = new a(this.nonce, `${this.apiRoot}`));
      } else e.currentTarget.value = '';
    }
    handleError(e = 'An error occurred.') {
      let t = e;
      t instanceof Error
        ? (console.error(t), (t = t.message))
        : console.error(t),
        (this.error = t),
        this._field.setCustomValidity(t),
        (this.invalid = !0),
        (this.value = this.oldValue);
    }
    render() {
      return t`${this.labelTemplate()} <input id="${this.id}" name="${this.name}" aria-label="${this.label}" type="number" ?disabled="${this.disabled}" class="text-input" .value="${this.value}" min="${r(this.min)}" max="${r(this.max)}" @change="${this.onChange}">`;
    }
  },
);
//# sourceMappingURL=dt-number.js.map
