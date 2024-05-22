import { i as e, y as t } from '../../lit-element-2409d5fe.js';
import { o as i } from '../../class-map-8d921948.js';
import { D as l } from '../dt-text/dt-text.js';
import '../../directive-de55b00a.js';
import '../dt-form-base.js';
import '../../dt-base.js';
import '../../lit-localize-763e4978.js';
import '../dt-label/dt-label.js';
import '../../icons/dt-spinner.js';
import '../../icons/dt-checkmark.js';
import '../../icons/dt-exclamation-circle.js';
window.customElements.define(
  'dt-comm-channel',
  class extends l {
    static get styles() {
      return [
        ...super.styles,
        e`:host{display:block}.label-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;align-items:center}.add-btn{background-color:transparent;border:none}.add-icon{color:var(--dt-comm-channel-add-btn-color,var(--success-color));height:1.75rem;margin:0 1rem}.input-group{display:flex;list-style-type:none;margin:0;padding:0}.input-group li{display:flex;width:100%;flex-direction:row;align-content:center;justify-content:center;align-items:center}#path0_fill{fill:red}.delete-button{background-color:transparent;border:none}.delete-button svg{width:100%;height:20px}`,
      ];
    }
    static get properties() {
      return { ...super.properties, value: { type: Array, reflect: !0 } };
    }
    _addClick() {
      const e = {
        verified: !1,
        value: '',
        key: `new-${this.name}-${Math.floor(100 * Math.random())}`,
      };
      (this.value = [...this.value, e]), this.requestUpdate();
    }
    _deleteField(e) {
      const t = this.value.findIndex((t) => t.key === e.key);
      -1 !== t && this.value.splice(t, 1),
        (this.value = [...this.value]),
        this.requestUpdate();
    }
    labelTemplate() {
      return this.label
        ? t`<dt-label ?private="${this.private}" privateLabel="${this.privateLabel}" iconAltText="${this.iconAltText}" icon="${this.icon}">${this.icon ? null : t`<slot name="icon-start" slot="icon-start"></slot>`} ${this.label}</dt-label><button class="add-btn" @click="${this._addClick}"><svg class="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4z"></path></svg></button>`
        : '';
    }
    _inputFieldTemplate(e) {
      const l =
        e.key === `new-${this.name}-0`
          ? ''
          : t`<button class="delete-button" @click="${() => this._deleteField(e)}"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path id="path0_fill" fill-rule="evenodd" d="M 14 7C 14 10.866 10.866 14 7 14C 3.13403 14 0 10.866 0 7C 0 3.13401 3.13403 0 7 0C 10.866 0 14 3.13401 14 7ZM 9.51294 3.51299L 7 6.01299L 4.48706 3.51299L 3.5 4.49999L 6.01294 6.99999L 3.5 9.49999L 4.48706 10.487L 7 7.98699L 9.5 10.5L 10.4871 9.51299L 7.98706 6.99999L 10.5 4.49999L 9.51294 3.51299Z"/></svg></button>`;
      return t`<div class="input-group"><input id="${e.key}" name="${this.name}" aria-label="${this.label}" type="${this.type || 'text'}" placeholder="${this.placeholder}" ?disabled="${this.disabled}" ?required="${this.required}" class="${i(this.classes)}" .value="${e.value || ''}" @change="${this._change}" novalidate @keyup="${this.implicitFormSubmit}"> ${l} ${this.touched && this.invalid ? t`<dt-exclamation-circle class="icon-overlay alert"></dt-exclamation-circle>` : null} ${this.error ? t`<dt-icon icon="mdi:alert-circle" class="icon-overlay alert" tooltip="${this.error}" size="2rem"></dt-icon>` : null} ${this.loading ? t`<dt-spinner class="icon-overlay"></dt-spinner>` : null} ${this.saved ? t`<dt-checkmark class="icon-overlay success"></dt-checkmark>` : null}</div>`;
    }
    _setFormValue(e) {
      super._setFormValue(e),
        this.internals.setFormValue(JSON.stringify(e)),
        (this.value = [...this.value]);
    }
    _change(e) {
      const t = e.target.id,
        { value: i } = e.target,
        l = this.value;
      this.value.find(
        (e, s) =>
          e.key === t && ((l[s] = { verified: !1, value: i, key: t }), !0),
      );
      const s = new CustomEvent('change', {
        detail: { field: this.name, oldValue: this.value, newValue: l },
      });
      (this.value = l), this._setFormValue(this.value), this.dispatchEvent(s);
    }
    _renderInputFields() {
      return this.value
        ? t`${this.value.map((e) => this._inputFieldTemplate(e))}`
        : ((this.value = [
            { verified: !1, value: '', key: `new-${this.name}-0` },
          ]),
          this._inputFieldTemplate(this.value[0]));
    }
    render() {
      return t`<div class="label-wrapper">${this.labelTemplate()}</div>${this._renderInputFields()}`;
    }
  },
);
//# sourceMappingURL=dt-comm-channel.js.map
