import { i as e, y as t } from '../../lit-element-2409d5fe.js';
import { D as i } from '../dt-form-base.js';
import '../../dt-base.js';
import '../../lit-localize-763e4978.js';
import '../dt-label/dt-label.js';
class r extends i {
  static get styles() {
    return [
      ...super.styles,
      e`input{color:var(--dt-form-text-color,#000);appearance:none;background-color:var(--dt-form-background-color,#cecece);border:1px solid var(--dt-form-border-color,#cacaca);border-radius:0;box-shadow:var(--dt-form-input-box-shadow,inset 0 1px 2px hsl(0deg 0 4% / 10%));box-sizing:border-box;display:inline-flex;font-family:inherit;font-size:1rem;font-weight:300;height:2.5rem;line-height:1.5;padding:var(--dt-form-padding,.5333333333rem);transition:var(--dt-form-transition,box-shadow .5s,border-color .25s ease-in-out);width:100%}.input-group button:disabled,input:disabled,input[readonly],textarea:disabled,textarea[readonly]{background-color:var(--dt-form-disabled-background-color,#e6e6e6);cursor:not-allowed}input::-webkit-calendar-picker-indicator{color:red}.input-group{position:relative;display:inline-flex;margin:0 0 1.0666666667rem;width:100%}.input-group .input-group-button{font-size:.75rem;line-height:1em;display:inline-flex}.input-group .button{display:inline-block;background:var(--dt-form-background-color,#cecece);border:1px solid var(--dt-form-border-color,#cecece);color:var(--alert-color,#cc4b37);align-self:stretch;font-size:1rem;height:auto;padding:0 1em;margin:0}.input-group .button:hover:not([disabled]){background-color:var(--alert-color,#cc4b37);color:var(--text-color-inverse,#fefefe)}.icon-overlay{inset-inline-end:5rem}`,
    ];
  }
  static get properties() {
    return {
      ...super.properties,
      id: { type: String },
      value: { type: String, reflect: !0 },
      timestamp: {
        converter: (e) => {
          let t = Number(e);
          if ((t < 1e12 && (t *= 1e3), t)) return t;
        },
        reflect: !0,
      },
      onchange: { type: String },
    };
  }
  updateTimestamp(e) {
    const t = new Date(e).getTime(),
      i = t / 1e3,
      r = new CustomEvent('change', {
        detail: { field: this.name, oldValue: this.timestamp, newValue: i },
      });
    (this.timestamp = t),
      (this.value = e),
      this._setFormValue(e),
      this.dispatchEvent(r);
  }
  _change(e) {
    this.updateTimestamp(e.target.value);
  }
  clearInput() {
    this.updateTimestamp('');
  }
  showDatePicker() {
    this.shadowRoot.querySelector('input').showPicker();
  }
  render() {
    return (
      this.timestamp
        ? (this.value = new Date(this.timestamp).toISOString().substring(0, 10))
        : this.value && (this.timestamp = new Date(this.value).getTime()),
      t`${this.labelTemplate()}<div class="input-group"><input id="${this.id}" class="input-group-field dt_date_picker" type="date" autocomplete="off" .placeholder="${new Date().toISOString().substring(0, 10)}" .value="${this.value}" .timestamp="${this.date}" ?disabled="${this.disabled}" @change="${this._change}" @click="${this.showDatePicker}"> <button id="${this.id}-clear-button" class="button alert clear-date-button" data-inputid="${this.id}" title="Delete Date" type="button" ?disabled="${this.disabled}" @click="${this.clearInput}">x</button> ${(this.touched && this.invalid) || this.error ? t`<dt-exclamation-circle class="icon-overlay alert"></dt-exclamation-circle>` : null} ${this.loading ? t`<dt-spinner class="icon-overlay"></dt-spinner>` : null} ${this.saved ? t`<dt-checkmark class="icon-overlay success"></dt-checkmark>` : null}</div>`
    );
  }
}
window.customElements.define('dt-date', r);
export { r as D };
//# sourceMappingURL=dt-date.js.map
