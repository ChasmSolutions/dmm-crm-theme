import { i as t, y as e } from '../../lit-element-2409d5fe.js';
import { m as i, s } from '../../lit-localize-763e4978.js';
import { o } from '../../map-c0e24c36.js';
import { c as r } from '../../repeat-1a2b8966.js';
import { l } from '../../if-defined-11ddebeb.js';
import { o as n } from '../../class-map-8d921948.js';
import { D as a, A as d } from '../../dt-base.js';
import '../../icons/dt-star.js';
import '../../directive-de55b00a.js';
window.customElements.define(
  'dt-list',
  class extends a {
    static get styles() {
      return t`:host{--number-of-columns:7;font-family:var(--dt-list-font-family,var(--font-family));font-size:var(--dt-list-font-size,15px);font-weight:var(--dt-list-font-weight,300);line-height:var(--dt-list-line-height,1.5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.section{container-type:inline-size;background-color:var(--dt-list-background-color,#fefefe);border:1px solid var(--dt-list-border-color,#f1f1f1);border-radius:var(--dt-list-border-radius,10px);box-shadow:var(--dt-list-box-shadow,0 2px 4px rgb(0 0 0 / 25%));padding:var(--dt-list-section-padding,1rem)}.header{display:flex;justify-content:flex-start;align-items:baseline;gap:var(--dt-list-header-gap,1.5em);flex-wrap:wrap}.section-header{color:var(--dt-list-header-color,var(--primary-color));font-size:1.5rem;display:inline-block;text-transform:capitalize}.toggleButton{color:var(--dt-list-header-color,var(--primary-color));font-size:1rem;background:0 0;border:var(--dt-list-toggleButton,.1em solid rgb(0 0 0 / .2));border-radius:.25em;padding:.25em .5em;cursor:pointer}.toggleButton svg{height:.9rem;transform:translateY(-2px);vertical-align:bottom;width:1rem;fill:var(--dt-list-header-color,var(--primary-color));stroke:var(--dt-list-header-color,var(--primary-color))}.list_action_section{background-color:var(--dt-list-action-section-background-color,#ecf5fc);border-radius:var(--dt-list-border-radius,10px);margin:var(--dt-list-action-section-margin,30px 0);padding:var(--dt-list-action-section-padding,20px)}.list_action_section_header{display:flex;flex-direction:row;justify-content:space-between}.close-button{outline:0;font-size:2.5em;line-height:1;color:var(--dt-list-action-close-button,var(--inactive-color));background:0 0;border:none;cursor:pointer}.fieldsList{list-style-type:none;column-count:1}.list-field-picker-item{list-style-type:none}.list-field-picker-item input{margin:1rem}.list-field-picker-item .dt-icon{height:var(--dt-list-field-picker-icon-size,1rem);width:var(--dt-list-field-picker-icon-size,1rem)}table{display:grid;border:1px solid var(--dt-list-border-color,#f1f1f1);border-top:0;border-collapse:collapse;min-width:100%;grid-template-columns:minmax(32px,.1fr) minmax(32px,.1fr) minmax(50px,.8fr)}table td:last-child{border-bottom:1px solid var(--dt-list-border-color,#f1f1f1);padding-bottom:2rem}tbody,thead,tr{display:contents}tr{cursor:pointer}tr:nth-child(2n + 1){background:#f1f1f1}tr:hover{background-color:var(--dt-list-hover-background-color,#ecf5fc)}tr a{color:var(--dt-list-link-color,var(--primary-color))}th{display:none}.column-name{pointer-events:none}#sort-arrows{grid-template-columns:4fr 1fr;display:flex;flex-direction:column;height:1.5em;justify-content:space-evenly}th.all span.sort-arrow-up{border-color:transparent transparent var(--dt-list-sort-arrow-color,grey) transparent;border-style:solid;border-width:0 .5em .5em .5em}th.all span.sort-arrow-down{content:'';border-color:var(--dt-list-sort-arrow-color,grey) transparent transparent;border-style:solid;border-width:.5em .5em 0}th.all span.sort-arrow-up.sortedBy{border-color:transparent transparent var(--dt-list-sort-arrow-color-highlight,#999) transparent}th.all span.sort-arrow-down.sortedBy{border-color:var(--dt-list-sort-arrow-color-highlight,#999) transparent transparent}td{border:0;grid-column:1/span 3;padding-inline-start:1em}td::before{content:attr(title) ': ';padding-inline-end:1em}td.no-title{grid-column:auto}td.line-count{padding-block-start:.8em;padding-inline-start:1em}td.bulk_edit_checkbox{grid-column:1/auto}td.no-title::before{content:'';padding-inline-end:.25em}td.bulk_edit_checkbox,th.bulk_edit_checkbox{grid-column:none}.bulk_edit_checkbox input{display:none}.bulk_editing td.bulk_edit_checkbox,.bulk_editing th.bulk_edit_checkbox{grid-column:1/auto}.bulk_editing .bulk_edit_checkbox input{display:initial}ul{margin:0;padding:0}ul li{list-style-type:none}input[type=checkbox]{margin:1rem}table{grid-template-columns:minmax(32px,.5fr) minmax(32px,.5fr) minmax(32px,.5fr) repeat(var(--number-of-columns,7),minmax(50px,1fr))}th{position:sticky;top:0;background:var(--dt-list-header-background-color,var(--dt-tile-background-color,#fefefe));text-align:start;justify-self:start;font-weight:400;font-size:1.1rem;color:var(--dt-list-header-color,#0a0a0a);white-space:pre-wrap;display:grid;place-items:center;grid-template-columns:2fr 1fr}th:last-child{border:0}td{display:flex;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-top:.5rem;padding-bottom:.5rem;padding-inline-start:0;color:var(--text-color-mid);border-bottom:1px solid var(--dt-list-border-color,#f1f1f1);grid-column:auto}td::before{content:'';display:none}`;
    }
    static get properties() {
      return {
        postType: { type: String },
        postTypeLabel: { type: String },
        postTypeSettings: { type: Object, attribute: !0 },
        posts: { type: Array },
        total: { type: Number },
        columns: { type: Array },
        sortedBy: { type: String },
        loading: { type: Boolean, default: !0 },
        offset: { type: Number },
        showArchived: { type: Boolean, default: !1 },
        showFieldsSelector: { type: Boolean, default: !1 },
        showBulkEditSelector: { type: Boolean, default: !1 },
        nonce: { type: String },
      };
    }
    constructor() {
      super(), (this.sortedBy = 'name');
    }
    firstUpdated() {
      this.nonce && !this.api && (this.api = new d(this.nonce));
    }
    async _getPosts(t = 0, e = 'name', i = 'desc') {
      (this.loading = !0), (this.filteredOptions = []);
      const s = encodeURI(
        `?offset=${t}&sortBy=${`${'desc' === i ? '-' : ''}${e}`}&offset=${t}${this.columns.map((t) => `&fields_to_return=${t}`).join('')}`,
      );
      return await this.api.makeRequestOnPosts('GET', `${this.postType}${s}`);
    }
    _headerClick(t) {
      const e = t.target.dataset.id;
      this._getPosts(this.offset ? this.offset : 0, e).then((t) => {
        (this.posts = t), (this.sortedBy = e);
      });
    }
    _bulkEdit() {
      this.showBulkEditSelector = !this.showBulkEditSelector;
    }
    _fieldsEdit() {
      this.showFieldsSelector = !this.showFieldsSelector;
    }
    _toggleShowArchived() {
      this.showArchived = !this.showArchived;
    }
    _sortArrowsClass(t) {
      return this.sortedBy === t ? 'sortedBy' : '';
    }
    _sortArrowsToggle(t) {
      return this.sortedBy !== `-${t}` ? `-${t}` : t;
    }
    _headerTemplate() {
      return e`<thead><tr><th id="bulk_edit_master" class="bulk_edit_checkbox"><input type="checkbox" name="bulk_send_app_id" id="bulk_edit_master_checkbox"></th><th></th>${o(this.columns, (t) => e`<th class="all" data-id="${this._sortArrowsToggle(t)}" @click="${this._headerClick}"><span class="column-name">${this.postTypeSettings[t].name}</span> <span id="sort-arrows"><span class="sort-arrow-up ${this._sortArrowsClass(`-${t}`)}" data-id="-${t}"></span> <span class="sort-arrow-down ${this._sortArrowsClass(t)}" data-id="${t}"></span></span></th>`)}</tr></thead>`;
    }
    _rowTemplate() {
      return o(this.posts, (t, i) =>
        this.showArchived ||
        (!this.showArchived && 'closed' !== t.overall_status.key)
          ? e`<tr class="dnd-moved" data-link="${this.posts.permalink}"><td class="bulk_edit_checkbox no-title"><input type="checkbox" name="bulk_edit_id" .value="${t.ID}"></td><td class="no-title line-count">${i + 1}.</td>${this._cellTemplate(t)}</tr>`
          : null,
      );
    }
    _cellTemplate(t) {
      return o(this.columns, (i) => {
        if (
          ['text', 'textarea', 'number'].includes(this.postTypeSettings[i].type)
        )
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}"><a href="${t[i]}" title="test">${t[i]}</a></td>`;
        if ('date' === this.postTypeSettings[i].type)
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}">${t[i].formatted}</td>`;
        if (
          'user_select' === this.postTypeSettings[i].type &&
          t[i] &&
          t[i].display
        )
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}">${l(t[i].display)}</td>`;
        if (
          'key_select' === this.postTypeSettings[i].type &&
          t[i] &&
          (t[i].label || t[i].name)
        )
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}">${t[i].label || t[i].name}</td>`;
        if (
          'multi_select' === this.postTypeSettings[i].type ||
          ('tags' === this.postTypeSettings[i].type && t[i] && t[i].length > 0)
        )
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}"><ul>${o(t[i], (t) => e`<li>${this.postTypeSettings[i].default[t].label}</li>`)}</ul></td>`;
        if (
          'location' === this.postTypeSettings[i].type ||
          'location_meta' === this.postTypeSettings[i].type
        )
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}">${l(t[i].label)}</td>`;
        if ('communication_channel' === this.postTypeSettings[i].type)
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}">${l(t[i].value)}</td>`;
        if ('connection' === this.postTypeSettings[i].type)
          return e`<td dir="auto" title="${this.postTypeSettings[i].name}">${l(t[i].value)}</td>`;
        if ('boolean' === this.postTypeSettings[i].type) {
          if ('favorite' === i)
            return e`<td dir="auto" title="${this.postTypeSettings[i].name}"><dt-star postID="${t.ID}" ?selected="${t.favorite}"></dt-star></td>`;
          if (!0 === this.postTypeSettings[i])
            return e`<td dir="auto" title="${this.postTypeSettings[i].name}">['✓']</td>`;
        }
        return e`<td dir="auto" title="${this.postTypeSettings[i].name}"></td>`;
      });
    }
    _fieldListIconTemplate(t) {
      return this.postTypeSettings[t].icon
        ? e`<img class="dt-icon" src="${this.postTypeSettings[t].icon}" alt="${this.postTypeSettings[t].name}">`
        : null;
    }
    _fieldsListTemplate() {
      return r(
        Object.keys(this.postTypeSettings).sort((t, e) => {
          const i = this.postTypeSettings[t].name.toUpperCase(),
            s = this.postTypeSettings[e].name.toUpperCase();
          return i < s ? -1 : i > s ? 1 : 0;
        }),
        (t) => t,
        (t) =>
          this.postTypeSettings[t].hidden
            ? null
            : e`<li class="list-field-picker-item"><label><input type="checkbox" id="${t}" name="${t}" .value="${t}" @change="${this._updateFields}" ?checked="${this.columns.includes(t)}"> ${this._fieldListIconTemplate(t)} ${this.postTypeSettings[t].name}</label></li>`,
      );
    }
    _fieldsSelectorTemplate() {
      return this.showFieldsSelector
        ? e`<div id="list_column_picker" class="list_field_picker list_action_section"><div class="list_action_section_header"><p style="font-weight:700">${i('Choose which fields to display as columns in the list')}</p><button class="close-button list-action-close-button" data-close="list_column_picker" aria-label="Close modal" type="button" @click="${this._fieldsEdit}"><span aria-hidden="true">×</span></button></div><ul class="fieldsList">${this._fieldsListTemplate()}</ul></div>`
        : null;
    }
    _updateFields(t) {
      const e = t.target.value,
        i = this.columns;
      i.includes(e)
        ? (i.filter((t) => t !== e), i.splice(i.indexOf(e), 1))
        : i.push(e),
        (this.columns = i),
        this.style.setProperty('--number-of-columns', this.columns.length - 1),
        this.requestUpdate();
    }
    _bulkSelectorTemplate() {
      return this.showBulkEditSelector
        ? e`<div id="bulk_edit_picker" class="list_action_section"><div class="list_action_section_header"><p style="font-weight:700">${i(s`Select all the ${this.postType} you want to update from the list, and update them below`)}</p><button class="close-button list-action-close-button" aria-label="Close modal" type="button" @click="${this._bulkEdit}"><span aria-hidden="true">×</span></button></div><ul class="fieldsList">This is where the bulk edit form will go.</ul></div>`
        : null;
    }
    connectedCallback() {
      super.connectedCallback(),
        this.posts ||
          this._getPosts().then((t) => {
            this.posts = t;
          });
    }
    render() {
      const t = { bulk_editing: this.showBulkEditSelector, hidden: !1 },
        o = e`<svg viewBox="0 0 100 100" fill="#000000" style="enable-background:new 0 0 100 100" xmlns="http://www.w3.org/2000/svg"><line style="stroke-linecap:round;paint-order:fill;fill:none;stroke-width:15px" x1="7.97" y1="50.199" x2="76.069" y2="50.128" transform="matrix(0.999999, 0.001017, -0.001017, 0.999999, 0.051038, -0.042708)"/><line style="stroke-linecap:round;stroke-width:15px" x1="7.97" y1="17.751" x2="92.058" y2="17.751"/><line style="stroke-linecap:round;stroke-width:15px" x1="7.97" y1="82.853" x2="42.343" y2="82.853"/><polygon style="stroke-linecap:round;stroke-miterlimit:1;stroke-linejoin:round;fill:#fff;paint-order:stroke;stroke-width:9px" points="22.982 64.982 33.592 53.186 50.916 70.608 82.902 21.308 95 30.85 52.256 95"/></svg>`,
        r = e`<svg height="100px" width="100px" fill="#000000" xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100" xml:space="preserve"><g><g i:extraneous="self"><g><path d="M94.4,63c0-5.7-3.6-10.5-8.6-12.5V7.3c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8v43.2c-5,1.9-8.6,6.8-8.6,12.5     s3.6,10.5,8.6,12.5v17.2c0,2.7,2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8V75.5C90.9,73.6,94.4,68.7,94.4,63z M81,66.7     c-2,0-3.7-1.7-3.7-3.7c0-2,1.7-3.7,3.7-3.7s3.7,1.7,3.7,3.7C84.7,65.1,83.1,66.7,81,66.7z"></path><path d="M54.8,24.5V7.3c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8v17.2c-5,1.9-8.6,6.8-8.6,12.5s3.6,10.5,8.6,12.5v43.2     c0,2.7,2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8V49.5c5-1.9,8.6-6.8,8.6-12.5S59.8,26.5,54.8,24.5z M50,40.7c-2,0-3.7-1.7-3.7-3.7     c0-2,1.7-3.7,3.7-3.7c2,0,3.7,1.7,3.7,3.7C53.7,39.1,52,40.7,50,40.7z"></path><path d="M23.8,50.5V7.3c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8v43.2c-5,1.9-8.6,6.8-8.6,12.5s3.6,10.5,8.6,12.5v17.2     c0,2.7,2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8V75.5c5-1.9,8.6-6.8,8.6-12.5S28.8,52.5,23.8,50.5z M19,66.7c-2,0-3.7-1.7-3.7-3.7     c0-2,1.7-3.7,3.7-3.7c2,0,3.7,1.7,3.7,3.7C22.7,65.1,21,66.7,19,66.7z"></path></g></g></g></svg>`;
      return e`<div class="section"><div class="header"><div class="section-header"><span class="section-header posts-header" style="display:inline-block">${i(s`${this.postTypeLabel ? this.postTypeLabel : this.postType} List`)}</span></div><span class="filter-result-text">${i(s`Showing 1 of ${this.total}`)}</span> <button class="bulkToggle toggleButton" id="bulk_edit_button" @click="${this._bulkEdit}">${o} ${i('Bulk Edit')}</button> <button class="fieldsToggle toggleButton" id="fields_edit_button" @click="${this._fieldsEdit}">${r} ${i('Fields')}</button><dt-toggle name="showArchived" label="${i('Show Archived')}" ?checked="${this.showArchived}" hideIcons onchange="${this._toggleShowArchived}" @click="${this._toggleShowArchived}"></dt-toggle></div>${this._fieldsSelectorTemplate()} ${this._bulkSelectorTemplate()}<table class="${n(t)}">${this._headerTemplate()} ${this.posts ? this._rowTemplate() : i('Loading')}</table></div>`;
    }
  },
);
//# sourceMappingURL=dt-list.js.map
