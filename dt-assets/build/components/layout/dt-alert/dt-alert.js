import { i as t, y as r } from '../../lit-element-2409d5fe.js';
import { o as e } from '../../class-map-8d921948.js';
import { D as o } from '../../dt-base.js';
import '../../directive-de55b00a.js';
import '../../lit-localize-763e4978.js';
window.customElements.define(
  'dt-alert',
  class extends o {
    static get styles() {
      return t`:host{display:block}.dt-alert{padding:var(--dt-alert-padding,10px);font-family:var(--dt-alert-font-family);font-size:var(--dt-alert-font-size,14px);font-weight:var(--dt-alert-font-weight,700);background-color:var(--dt-alert-context-background-color,var(--dt-alert-background-color));border:var(--dt-alert-border-width,1px) solid var(--dt-alert-context-border-color,var(--dt-alert-border-color));border-radius:var(--dt-alert-border-radius,10px);box-shadow:var(--dt-alert-box-shadow,0 2px 4px rgb(0 0 0 / 25%));color:var(--dt-alert-context-text-color,var(--dt-alert-text-color));text-rendering:optimizeLegibility;display:flex;gap:var(--dt-alert-gap,10px);justify-content:space-between;align-content:center;align-items:center;white-space:initial}.dt-alert.dt-alert--outline{background-color:transparent;color:var(--dt-alert-context-text-color,var(--text-color-inverse))}.dt-alert--primary:not(.dt-alert--outline){--dt-alert-context-border-color:var(--primary-color);--dt-alert-context-background-color:var(--primary-color);--dt-alert-context-text-color:var(--dt-alert-text-color-light)}.dt-alert--alert:not(.dt-alert--outline){--dt-alert-context-border-color:var(--alert-color);--dt-alert-context-background-color:var(--alert-color);--dt-alert-context-text-color:var(--dt-alert-text-color-light)}.dt-alert--caution:not(.dt-alert--outline){--dt-alert-context-border-color:var(--caution-color);--dt-alert-context-background-color:var(--caution-color);--dt-alert-context-text-color:var(--dt-alert-text-color-dark)}.dt-alert--success:not(.dt-alert--outline){--dt-alert-context-border-color:var(--success-color);--dt-alert-context-background-color:var(--success-color);--dt-alert-context-text-color:var(--dt-alert-text-color-light)}.dt-alert--inactive:not(.dt-alert--outline){--dt-alert-context-border-color:var(--inactive-color);--dt-alert-context-background-color:var(--inactive-color);--dt-alert-context-text-color:var(--dt-alert-text-color-light)}.dt-alert--disabled:not(.dt-alert--outline){--dt-alert-context-border-color:var(--disabled-color);--dt-alert-context-background-color:var(--disabled-color);--dt-alert-context-text-color:var(--dt-alert-text-color-dark)}.dt-alert--primary.dt-alert--outline{--dt-alert-context-border-color:var(--primary-color);--dt-alert-context-text-color:var(--primary-color)}.dt-alert--alert.dt-alert--outline{--dt-alert-context-border-color:var(--alert-color);--dt-alert-context-text-color:var(--alert-color)}.dt-alert--caution.dt-alert--outline{--dt-alert-context-border-color:var(--caution-color);--dt-alert-context-text-color:var(--caution-color)}.dt-alert--success.dt-alert--outline{--dt-alert-context-border-color:var(--success-color);--dt-alert-context-text-color:var(--success-color)}.dt-alert--inactive.dt-alert--outline{--dt-alert-context-border-color:var(--inactive-color)}.dt-alert--disabled.dt-alert--outline{--dt-alert-context-border-color:var(--disabled-color)}button.toggle{margin-inline-end:0;margin-inline-start:auto;background:0 0;border:none;color:inherit;cursor:pointer;display:flex;align-items:center}`;
    }
    static get properties() {
      return {
        context: { type: String },
        dismissable: { type: Boolean },
        timeout: { type: Number },
        hide: { type: Boolean },
        outline: { type: Boolean },
      };
    }
    get classes() {
      const t = { 'dt-alert': !0, 'dt-alert--outline': this.outline };
      return (t[`dt-alert--${this.context}`] = !0), t;
    }
    constructor() {
      super(), (this.context = 'default');
    }
    connectedCallback() {
      super.connectedCallback(),
        this.timeout &&
          setTimeout(() => {
            this._dismiss();
          }, this.timeout);
    }
    _dismiss() {
      this.hide = !0;
    }
    render() {
      if (this.hide) return r``;
      const t = r`<svg viewPort="0 0 12 12" version="1.1" width="12" height="12">xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="11" x2="11" y2="1" stroke="currentColor" stroke-width="2"/><line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" stroke-width="2"/></svg>`;
      return r`<div role="alert" class="${e(this.classes)}"><div><slot></slot></div>${this.dismissable ? r`<button @click="${this._dismiss}" class="toggle">${t}</button>` : null}</div>`;
    }
  },
);
//# sourceMappingURL=dt-alert.js.map
