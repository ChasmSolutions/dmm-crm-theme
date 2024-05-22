import { s as t, i as e } from '../lit-element-2409d5fe.js';
window.customElements.define(
  'dt-checkmark',
  class extends t {
    static get styles() {
      return e`@keyframes fadeOut{0%{opacity:1}75%{opacity:1}100%{opacity:0}}:host{margin-top:-.25rem}:host::before{content:'';transform:rotate(45deg);height:1rem;width:.5rem;opacity:0;color:inherit;border-bottom:var(--dt-checkmark-width) solid currentcolor;border-right:var(--dt-checkmark-width) solid currentcolor;animation:fadeOut 4s}`;
    }
  },
);
//# sourceMappingURL=dt-checkmark.js.map
