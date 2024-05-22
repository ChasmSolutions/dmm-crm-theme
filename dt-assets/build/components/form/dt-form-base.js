import { i as t, y as e } from '../lit-element-2409d5fe.js';
import { D as i } from '../dt-base.js';
import './dt-label/dt-label.js';
import '../lit-localize-763e4978.js';
class a extends i {
  static get formAssociated() {
    return !0;
  }
  static get styles() {
    return [
      t`.input-group{position:relative}.input-group.disabled{background-color:var(--disabled-color)}.icon-overlay{position:absolute;inset-inline-end:2rem;top:0;height:100%;display:flex;justify-content:center;align-items:center}.icon-overlay.alert{color:var(--alert-color);cursor:pointer}.icon-overlay.success{color:var(--success-color)}`,
    ];
  }
  static get properties() {
    return {
      ...super.properties,
      name: { type: String },
      label: { type: String },
      icon: { type: String },
      iconAltText: { type: String },
      private: { type: Boolean },
      privateLabel: { type: String },
      disabled: { type: Boolean },
      required: { type: Boolean },
      requiredMessage: { type: String },
      touched: { type: Boolean, state: !0 },
      invalid: { type: Boolean, state: !0 },
      error: { type: String },
      loading: { type: Boolean },
      saved: { type: Boolean },
    };
  }
  get _field() {
    return this.shadowRoot.querySelector('input, textarea, select');
  }
  get _focusTarget() {
    return this._field;
  }
  constructor() {
    super(),
      (this.touched = !1),
      (this.invalid = !1),
      (this.internals = this.attachInternals()),
      this.addEventListener('invalid', () => {
        (this.touched = !0), this._validateRequired();
      });
  }
  firstUpdated(...t) {
    super.firstUpdated(...t);
    const e = a._jsonToFormData(this.value, this.name);
    this.internals.setFormValue(e), this._validateRequired();
  }
  static _buildFormData(t, e, i) {
    if (!e || 'object' != typeof e || e instanceof Date || e instanceof File) {
      const a = e ?? '';
      t.append(i, a);
    } else
      Object.keys(e).forEach((a) => {
        this._buildFormData(t, e[a], i ? `${i}[${a}]` : a);
      });
  }
  static _jsonToFormData(t, e) {
    const i = new FormData();
    return a._buildFormData(i, t, e), i;
  }
  _setFormValue(t) {
    const e = a._jsonToFormData(t, this.name);
    this.internals.setFormValue(e, t),
      this._validateRequired(),
      (this.touched = !0);
  }
  _validateRequired() {}
  labelTemplate() {
    return this.label
      ? e`<dt-label ?private="${this.private}" privateLabel="${this.privateLabel}" iconAltText="${this.iconAltText}" icon="${this.icon}">${this.icon ? null : e`<slot name="icon-start" slot="icon-start"></slot>`} ${this.label}</dt-label>`
      : '';
  }
  render() {
    return e`${this.labelTemplate()}<slot></slot>`;
  }
}
export { a as D };
//# sourceMappingURL=dt-form-base.js.map
