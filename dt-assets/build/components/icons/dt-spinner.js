import { s as e, i as r } from '../lit-element-2409d5fe.js';
window.customElements.define(
  'dt-spinner',
  class extends e {
    static get styles() {
      return r`@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}:host::before{content:'';animation:spin 1s linear infinite;border:.25rem solid var(--dt-spinner-color-1,#919191);border-radius:50%;border-top-color:var(--dt-spinner-color-2,#000);display:inline-block;height:1rem;width:1rem}`;
    }
  },
);
//# sourceMappingURL=dt-spinner.js.map
