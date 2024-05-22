import { i as e, y as t } from '../../lit-element-2409d5fe.js';
import { o as i } from '../../class-map-8d921948.js';
import { D as r } from '../dt-form-base.js';
import '../../icons/dt-spinner.js';
import '../../icons/dt-checkmark.js';
import '../../icons/dt-exclamation-circle.js';
import '../../directive-de55b00a.js';
import '../../dt-base.js';
import '../../lit-localize-763e4978.js';
import '../dt-label/dt-label.js';
class a extends r {
  static get styles() {
    return [
      ...super.styles,
      e`input{color:var(--dt-form-text-color,#000);appearance:none;background-color:var(--dt-text-background-color,#fefefe);border:1px solid var(--dt-text-border-color,#fefefe);border-radius:var(--dt-text-border-radius,0);box-shadow:var(--dt-text-box-shadow,var(--dt-form-input-box-shadow,inset 0 1px 2px hsl(0deg 0 4% / 10%)));box-sizing:border-box;display:block;font-family:inherit;font-size:1rem;font-weight:300;height:2.5rem;line-height:1.5;margin:0 0 1.0666666667rem;padding:var(--dt-form-padding,.5333333333rem);transition:var(--dt-form-transition,box-shadow .5s,border-color .25s ease-in-out);width:100%}input:disabled,input[readonly],textarea:disabled,textarea[readonly]{background-color:var(--dt-text-disabled-background-color,var(--dt-form-disabled-background-color,#e6e6e6));cursor:copy}input:focus-visible,input:focus-within{outline:0}input::placeholder{color:var(--dt-text-placeholder-color,#999);text-transform:var(--dt-text-placeholder-transform,none);font-size:var(--dt-text-placeholder-font-size,1rem);font-weight:var(--dt-text-placeholder-font-weight,400);letter-spacing:var(--dt-text-placeholder-letter-spacing,normal)}input.invalid{border-color:var(--dt-text-border-color-alert,var(--alert-color))}`,
    ];
  }
  static get properties() {
    return {
      ...super.properties,
      id: { type: String },
      type: { type: String },
      maxlength: { type: Number },
      placeholder: { type: String },
      value: { type: String, reflect: !0 },
      onchange: { type: String },
    };
  }
  _change(e) {
    const t = new CustomEvent('change', {
      bubbles: !0,
      detail: {
        field: this.name,
        oldValue: this.value,
        newValue: e.target.value,
      },
    });
    (this.value = e.target.value),
      this._setFormValue(this.value),
      this.dispatchEvent(t);
  }
  implicitFormSubmit(e) {
    if (13 === (e.keyCode || e.which) && this.internals.form) {
      const e = this.internals.form.querySelector('button');
      e && e.click();
    }
  }
  _validateRequired() {
    const { value: e } = this,
      t = this.shadowRoot.querySelector('input');
    '' === e && this.required
      ? ((this.invalid = !0),
        this.internals.setValidity(
          { valueMissing: !0 },
          this.requiredMessage || 'This field is required',
          t,
        ))
      : ((this.invalid = !1), this.internals.setValidity({}));
  }
  get classes() {
    return { 'text-input': !0, invalid: this.touched && this.invalid };
  }
  render() {
    return t`${this.labelTemplate()}<div class="input-group"><input id="${this.id}" name="${this.name}" aria-label="${this.label}" type="${this.type || 'text'}" maxlength="${this.maxlength || '100'}" placeholder="${this.placeholder}" ?disabled="${this.disabled}" ?required="${this.required}" class="${i(this.classes)}" .value="${this.value || ''}" @change="${this._change}" novalidate @keyup="${this.implicitFormSubmit}"> ${this.touched && this.invalid ? t`<dt-exclamation-circle class="icon-overlay alert"></dt-exclamation-circle>` : null} ${this.error ? t`<dt-icon icon="mdi:alert-circle" class="icon-overlay alert" tooltip="${this.error}" size="2rem"></dt-icon>` : null} ${this.loading ? t`<dt-spinner class="icon-overlay"></dt-spinner>` : null} ${this.saved ? t`<dt-checkmark class="icon-overlay success"></dt-checkmark>` : null}</div>`;
  }
}
window.customElements.define('dt-text', a);
export { a as D };
//# sourceMappingURL=dt-text.js.map
