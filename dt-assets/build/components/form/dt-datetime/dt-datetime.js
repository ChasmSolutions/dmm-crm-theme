import { y as t } from '../../lit-element-2409d5fe.js';
import { D as e } from '../dt-date/dt-date.js';
import '../dt-form-base.js';
import '../../dt-base.js';
import '../../lit-localize-763e4978.js';
import '../dt-label/dt-label.js';
window.customElements.define(
  'dt-datetime',
  class extends e {
    static get properties() {
      return { ...super.properties, tzoffset: { type: Number } };
    }
    constructor() {
      super(), (this.tzoffset = 6e4 * new Date().getTimezoneOffset());
    }
    render() {
      return (
        this.timestamp
          ? (this.value = new Date(this.timestamp - this.tzoffset)
              .toISOString()
              .substring(0, 16))
          : this.value && (this.timestamp = new Date(this.value).getTime()),
        t`${this.labelTemplate()}<div class="input-group"><input id="${this.id}" class="input-group-field dt_date_picker" type="datetime-local" autocomplete="off" .placeholder="${new Date().toISOString()}" .value="${this.value}" .timestamp="${this.date}" ?disabled="${this.disabled}" @change="${this._change}" @click="${this.showDatePicker}"> <button id="${this.id}-clear-button" class="button alert clear-date-button" data-inputid="${this.id}" title="Delete Date" type="button" ?disabled="${this.disabled}" @click="${this.clearInput}">x</button> ${(this.touched && this.invalid) || this.error ? t`<dt-exclamation-circle class="icon-overlay alert"></dt-exclamation-circle>` : null} ${this.loading ? t`<dt-spinner class="icon-overlay"></dt-spinner>` : null} ${this.saved ? t`<dt-checkmark class="icon-overlay success"></dt-checkmark>` : null}</div>`
      );
    }
  },
);
//# sourceMappingURL=dt-datetime.js.map
