import { i as t, y as e } from '../../lit-element-2409d5fe.js';
import { i as o } from '../../style-map-ac85d91b.js';
import { D as r } from '../../dt-base.js';
import '../dt-label/dt-label.js';
import '../../directive-de55b00a.js';
import '../../lit-localize-763e4978.js';
window.customElements.define(
  'dt-copy-text',
  class extends r {
    static get styles() {
      return t`:root{font-size:inherit}.copy-text{--dt-form-text-color:#575757;display:flex;align-items:center;position:relative;width:calc(100% + 20px)}.copy-text__input{flex:1}.copy_icon{cursor:copy;font-size:16px;display:block;transform:translate(-24px,-5px);width:20px}:host([dir=rtl]) .copy_icon{transform:translate(24px,-5px)}`;
    }
    static get properties() {
      return {
        value: { type: String },
        success: { type: Boolean },
        error: { type: Boolean },
      };
    }
    get inputStyles() {
      return this.success
        ? {
            '--dt-text-border-color':
              'var(--copy-text-success-color, var(--success-color))',
            '--dt-form-text-color':
              'var( --copy-text-success-color, var(--success-color))',
            color: 'var( --copy-text-success-color, var(--success-color))',
          }
        : this.error
          ? {
              '---dt-text-border-color':
                'var(--copy-text-alert-color, var(--alert-color))',
              '--dt-form-text-color':
                'var(--copy-text-alert-color, var(--alert-color))',
            }
          : {};
    }
    get icon() {
      return this.success ? 'ic:round-check' : 'ic:round-content-copy';
    }
    async copy() {
      try {
        (this.success = !1),
          (this.error = !1),
          await navigator.clipboard.writeText(this.value),
          (this.success = !0),
          (this.error = !1);
      } catch (t) {
        console.log(t), (this.success = !1), (this.error = !0);
      }
    }
    render() {
      return e`<div class="copy-text" style="${o(this.inputStyles)}"><dt-text class="copy-text__input" value="${this.value}" disabled="disabled"></dt-text><dt-icon class="copy_icon" icon="${this.icon}" @click="${this.copy}"></dt-icon></div>`;
    }
  },
);
//# sourceMappingURL=dt-copy-text.js.map
