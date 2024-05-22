import { i as t, y as e } from '../../lit-element-2409d5fe.js';
import { c as i } from '../../repeat-1a2b8966.js';
import { D as a } from '../dt-form-base.js';
import './dt-location-map-item.js';
import '../../directive-de55b00a.js';
import '../../dt-base.js';
import '../../lit-localize-763e4978.js';
import '../dt-label/dt-label.js';
import '../../style-map-ac85d91b.js';
import '../../icons/dt-icon.js';
import './dt-map-modal.js';
import '../../layout/dt-modal/dt-modal.js';
import '../../class-map-8d921948.js';
window.customElements.define(
  'dt-location-map',
  class extends a {
    static get properties() {
      return {
        ...super.properties,
        placeholder: { type: String },
        value: { type: Array, reflect: !0 },
        locations: { type: Array, state: !0 },
        open: { type: Boolean, state: !0 },
        onchange: { type: String },
        mapboxToken: { type: String, attribute: 'mapbox-token' },
        googleToken: { type: String, attribute: 'google-token' },
      };
    }
    static get styles() {
      return [
        ...super.styles,
        t`:host{font-family:Helvetica,Arial,sans-serif}.input-group{display:flex}.field-container{position:relative}`,
      ];
    }
    constructor() {
      super(), (this.value = []), (this.locations = [{ id: Date.now() }]);
    }
    _setFormValue(t) {
      super._setFormValue(t), this.internals.setFormValue(JSON.stringify(t));
    }
    willUpdate(...t) {
      super.willUpdate(...t),
        this.value &&
          this.value.filter((t) => !t.id) &&
          (this.value = [
            ...this.value.map((t) => ({ ...t, id: t.grid_meta_id })),
          ]),
        this.updateLocationList();
    }
    firstUpdated(...t) {
      super.firstUpdated(...t),
        this.internals.setFormValue(JSON.stringify(this.value));
    }
    updated(t) {
      if (t.has('value')) {
        const e = t.get('value');
        e && e?.length !== this.value?.length && this.focusNewLocation();
      }
      if (t.has('locations')) {
        const e = t.get('locations');
        e && e?.length !== this.locations?.length && this.focusNewLocation();
      }
    }
    focusNewLocation() {
      const t = this.shadowRoot.querySelectorAll('dt-location-map-item');
      t && t.length && t[t.length - 1].dispatchEvent(new Event('autofocus'));
    }
    updateLocationList() {
      this.disabled || (!this.open && this.value && this.value.length)
        ? (this.locations = [...(this.value || []).filter((t) => t.label)])
        : ((this.open = !0),
          (this.locations = [
            ...(this.value || []).filter((t) => t.label),
            { id: Date.now() },
          ]));
    }
    selectLocation(t) {
      const e = new CustomEvent('change', {
          detail: { field: this.name, oldValue: this.value },
        }),
        i = { ...t.detail.metadata, id: Date.now() };
      (this.value = [...(this.value || []).filter((t) => t.label), i]),
        this.updateLocationList(),
        (e.detail.newValue = this.value),
        this.dispatchEvent(e),
        this._setFormValue(this.value);
    }
    deleteItem(t) {
      const e = new CustomEvent('change', {
          detail: { field: this.name, oldValue: this.value },
        }),
        i = t.detail?.metadata,
        a = i?.grid_meta_id;
      (this.value = a
        ? (this.value || []).filter((t) => t.grid_meta_id !== a)
        : (this.value || []).filter((t) => t.lat !== i.lat && t.lng !== i.lng)),
        this.updateLocationList(),
        (e.detail.newValue = this.value),
        this.dispatchEvent(e),
        this._setFormValue(this.value);
    }
    addNew() {
      (this.open = !0), this.updateLocationList();
    }
    renderItem(t) {
      return e`<dt-location-map-item placeholder="${this.placeholder}" .metadata="${t}" mapbox-token="${this.mapboxToken}" google-token="${this.googleToken}" @delete="${this.deleteItem}" @select="${this.selectLocation}" ?disabled="${this.disabled}"></dt-location-map-item>`;
    }
    render() {
      return (
        this.value,
        e`${this.labelTemplate()} ${i(
          this.locations || [],
          (t) => t.id,
          (t, e) => this.renderItem(t, e),
        )} ${this.open ? null : e`<button @click="${this.addNew}">Add New</button>`}`
      );
    }
  },
);
//# sourceMappingURL=dt-location-map.js.map
