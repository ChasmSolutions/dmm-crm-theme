import { i as t, y as e } from '../../lit-element-2409d5fe.js';
import { i } from '../../style-map-ac85d91b.js';
import { o as s } from '../../map-c0e24c36.js';
import { D as l } from '../dt-tags/dt-tags.js';
import '../../directive-de55b00a.js';
import '../dt-multi-select/dt-multi-select.js';
import '../../lit-localize-763e4978.js';
import '../dt-form-base.js';
import '../../dt-base.js';
import '../dt-label/dt-label.js';
import '../mixins/hasOptionsList.js';
import '../../icons/dt-spinner.js';
import '../../icons/dt-checkmark.js';
window.customElements.define(
  'dt-location',
  class extends l {
    static get properties() {
      return {
        ...super.properties,
        filters: { type: Array },
        mapboxKey: { type: String },
        dtMapbox: { type: Object },
      };
    }
    static get styles() {
      return [
        ...super.styles,
        t`.input-group{display:flex}.field-container{position:relative}select{border:1px solid var(--dt-form-border-color,#cacaca);outline:0}.selected-option>:first-child{max-width:calc(var(--container-width) - var(--select-width) - var(--container-padding) - var(--option-padding) - var(--option-button) - 8px)}`,
      ];
    }
    _clickOption(t) {
      if (t.target && t.target.value) {
        const e = t.target.value,
          i = this.filteredOptions.reduce(
            (t, i) => (t || i.id !== e ? t : i),
            null,
          );
        this._select(i);
      }
    }
    _clickAddNew(t) {
      if (t.target) {
        this._select({
          id: t.target.dataset?.label,
          label: t.target.dataset?.label,
          isNew: !0,
        });
        const e = this.shadowRoot.querySelector('input');
        e && (e.value = '');
      }
    }
    _keyboardSelectOption() {
      this.activeIndex > -1 &&
        (this.activeIndex + 1 > this.filteredOptions.length
          ? this._select({ id: this.query, label: this.query, isNew: !0 })
          : this._select(this.filteredOptions[this.activeIndex]));
    }
    _remove(t) {
      if (t.target && t.target.dataset && t.target.dataset.value) {
        const e = new CustomEvent('change', {
          detail: { field: this.name, oldValue: this.value },
        });
        (this.value = (this.value || []).map((e) => {
          const i = { ...e };
          return e.id === t.target.dataset.value && (i.delete = !0), i;
        })),
          (e.detail.newValue = this.value),
          this.dispatchEvent(e),
          this.open && this.shadowRoot.querySelector('input').focus();
      }
    }
    updated() {
      super.updated();
      const t = this.shadowRoot.querySelector('.input-group'),
        e = t.style.getPropertyValue('--select-width'),
        i = this.shadowRoot.querySelector('select');
      !e &&
        i?.clientWidth > 0 &&
        t.style.setProperty('--select-width', `${i.clientWidth}px`);
    }
    _filterOptions() {
      const t = (this.value || []).filter((t) => !t.delete).map((t) => t?.id);
      if (this.options?.length)
        this.filteredOptions = (this.options || []).filter(
          (e) =>
            !t.includes(e.id) &&
            (!this.query ||
              e.label
                .toLocaleLowerCase()
                .includes(this.query.toLocaleLowerCase())),
        );
      else {
        (this.loading = !0), (this.filteredOptions = []);
        const e = this,
          i = this.shadowRoot.querySelector('select'),
          s = new CustomEvent('load', {
            bubbles: !0,
            detail: {
              field: this.name,
              query: this.query,
              filter: i?.value,
              onSuccess: (i) => {
                (e.loading = !1),
                  (e.filteredOptions = i.filter((e) => !t.includes(e.id)));
              },
              onError: (t) => {
                console.warn(t), (e.loading = !1);
              },
            },
          });
        this.dispatchEvent(s);
      }
      return this.filteredOptions;
    }
    _renderOption(t, i) {
      return e`<li tabindex="-1"><button value="${t.id}" type="button" data-label="${t.label}" @click="${this._clickOption}" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}" @touchend="${this._touchEnd}" tabindex="-1" class="${this.activeIndex > -1 && this.activeIndex === i ? 'active' : ''}">${t.label}</button></li>`;
    }
    _renderSelectedOptions() {
      return (this.value || [])
        .filter((t) => !t.delete)
        .map(
          (t) =>
            e`<div class="selected-option"><a href="${t.link}" ?disabled="${this.disabled}" alt="${t.status ? t.status.label : t.label}">${t.label}</a> <button @click="${this._remove}" ?disabled="${this.disabled}" data-value="${t.id}">x</button></div>`,
        );
    }
    render() {
      const t = {
        display: this.open ? 'block' : 'none',
        top: `${this.containerHeight}px`,
      };
      return this.mapboxKey
        ? e`${this.labelTemplate()}<div id="mapbox-wrapper"><div id="mapbox-autocomplete" class="mapbox-autocomplete input-group" data-autosubmit="true" data-add-address="true"><input id="mapbox-search" type="text" name="mapbox_search" class="input-group-field" autocomplete="off" dir="auto" placeholder="Search Location"><div class="input-group-button"><button id="mapbox-spinner-button" class="button hollow" style="display:none;border-color:#d3d3d3"><span style="border-radius:50%;width:24px;height:24px;border:.25rem solid #d3d3d3;border-top-color:#000;animation:spin 1s infinite linear;display:inline-block"></span></button> <button id="mapbox-clear-autocomplete" class="button alert input-height delete-button-style mapbox-delete-button" type="button" title="Clear" style="display:none">×</button></div><div id="mapbox-autocomplete-list" class="mapbox-autocomplete-items"></div></div><div id="location-grid-meta-results"></div></div>`
        : e`${this.labelTemplate()}<div class="input-group ${this.disabled ? 'disabled' : ''}"><div class="field-container" @click="${this._focusInput}" @keydown="${this._focusInput}">${this._renderSelectedOptions()} <input type="text" placeholder="${this.placeholder}" @focusin="${this._inputFocusIn}" @blur="${this._inputFocusOut}" @keydown="${this._inputKeyDown}" @keyup="${this._inputKeyUp}" ?disabled="${this.disabled}"> ${this.loading ? e`<dt-spinner class="icon-overlay"></dt-spinner>` : null} ${this.saved ? e`<dt-checkmark class="icon-overlay success"></dt-checkmark>` : null}</div><select class="filter-list" ?disabled="${this.disabled}">${s(this.filters, (t) => e`<option value="${t.id}">${t.label}</option>`)}</select><ul class="option-list" style="${i(t)}">${this._renderOptions()}</ul></div>`;
    }
  },
);
//# sourceMappingURL=dt-location.js.map
