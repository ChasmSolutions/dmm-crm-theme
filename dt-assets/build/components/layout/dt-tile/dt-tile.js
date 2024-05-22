import { i as e, b as t, y as o } from '../../lit-element-2409d5fe.js';
import { D as r } from '../../dt-base.js';
import '../../lit-localize-763e4978.js';
window.customElements.define(
  'dt-tile',
  class extends r {
    static get styles() {
      return e`:host{font-family:var(--dt-tile-font-family,var(--font-family));font-size:var(--dt-tile-font-size,14px);font-weight:var(--dt-tile-font-weight,700);overflow:hidden;text-overflow:ellipsis}section{background-color:var(--dt-tile-background-color,#fefefe);border-top:var(--dt-tile-border-top,1px solid #cecece);border-bottom:var(--dt-tile-border-bottom,1px solid #cecece);border-right:var(--dt-tile-border-right,1px solid #cecece);border-left:var(--dt-tile-border-left,1px solid #cecece);border-radius:var(--dt-tile-border-radius,10px);box-shadow:var(--dt-tile-box-shadow,0 2px 4px rgb(0 0 0 / 25%));padding:1rem;margin:var(--dt-tile-margin,0)}h3{line-height:1.4;margin:var(--dt-tile-header-margin,0 0 .5rem 0);text-rendering:optimizeLegibility;font-family:var(--dt-tile-font-family,var(--font-family));font-style:normal;font-weight:var(--dt-tile-header-font-weight,300)}.section-header{color:var(--dt-tile-header-color,#3f729b);font-size:1.5rem;display:flex;text-transform:var(--dt-tile-header-text-transform,capitalize);justify-content:var(--dt-tile-header-justify-content)}.section-body{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));column-gap:1.4rem;transition:height 1s ease 0s;height:auto}.section-body.collapsed{height:0!important;overflow:hidden}button.toggle{margin-inline-end:0;margin-inline-start:auto;background:0 0;border:none}.chevron::before{border-color:var(--dt-tile-header-color,var(--primary-color));border-style:solid;border-width:2px 2px 0 0;content:'';display:inline-block;height:1em;width:1em;left:.15em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:top}.chevron.down:before{top:0;transform:rotate(135deg)}`;
    }
    static get properties() {
      return {
        title: { type: String },
        expands: { type: Boolean },
        collapsed: { type: Boolean },
      };
    }
    get hasHeading() {
      return this.title || this.expands;
    }
    _toggle() {
      this.collapsed = !this.collapsed;
    }
    renderHeading() {
      return this.hasHeading
        ? o`<h3 class="section-header">${this.title} ${this.expands ? o`<button @click="${this._toggle}" class="toggle chevron ${this.collapsed ? 'down' : 'up'}"> </button>` : null}</h3>`
        : t;
    }
    render() {
      return o`<section>${this.renderHeading()}<div class="section-body ${this.collapsed ? 'collapsed' : null}"><slot></slot></div></section>`;
    }
  },
);
//# sourceMappingURL=dt-tile.js.map
