import { i as t, y as e } from '../../lit-element-2409d5fe.js';
import { o as i } from '../../class-map-8d921948.js';
import { D as r } from '../../dt-base.js';
import './dt-church-health-circle-icon.js';
import '../../directive-de55b00a.js';
import '../../lit-localize-763e4978.js';
window.customElements.define(
  'dt-church-health-circle',
  class extends r {
    static get styles() {
      return t`.health-circle__container{--d:55px;--rel:1;--r:calc(1 * var(--d) / var(--tan));--s:calc(3 * var(--r));margin:1rem auto;display:flex;justify-content:center;align-items:baseline;padding-top:100%;height:0;position:relative;overflow:visible}.health-circle{display:block;border-radius:100%;border:3px #a9a9a9 dashed;max-width:100%;position:absolute;transform:translate(-50%,-50%);left:50%;top:50%;width:100%;height:100%}@media (max-width:519px){.health-circle__container{--d:40px}.health-circle{max-width:300px;max-height:300px}}@media (max-width:400px){.health-circle__container{--d:30px}.health-circle{max-width:250px;max-height:250px}}@media (max-width:321px){.health-circle__container{--d:25px}.health-circle{max-width:225px;max-height:225px}}.health-circle__grid{display:inline-block;position:relative;height:100%;width:100%;margin-left:auto;margin-right:auto;position:relative;width:var(--s);max-width:100%}.health-circle--committed{border:3px #4caf50 solid!important}dt-church-health-icon{position:absolute;border-radius:100%;font-size:16px;color:#000;text-align:center;font-style:italic;cursor:pointer;top:50%;left:50%;margin:calc(-.5 * var(--d));width:var(--d);height:var(--d);--az:calc(var(--i) * 1turn / var(--m));transform:rotate(var(--az)) translate(var(--r)) rotate(calc(-1 * var(--az)))}`;
    }
    static get properties() {
      return {
        groupId: { type: Number },
        group: { type: Object, reflect: !1 },
        settings: { type: Object, reflect: !1 },
        errorMessage: { type: String, attribute: !1 },
        missingIcon: { type: String },
        handleSave: { type: Function },
      };
    }
    get metrics() {
      const t = this.settings || [];
      if (!Object.values(t).length) return [];
      return Object.entries(t).filter(([t, e]) => 'church_commitment' !== t);
    }
    get isCommited() {
      return (
        !!this.group &&
        !!this.group.health_metrics &&
        this.group.health_metrics.includes('church_commitment')
      );
    }
    connectedCallback() {
      super.connectedCallback(), this.fetch();
    }
    adoptedCallback() {
      this.distributeItems();
    }
    updated() {
      this.distributeItems();
    }
    async fetch() {
      try {
        const t = [this.fetchSettings(), this.fetchGroup()];
        let [e, i] = await Promise.all(t);
        (this.settings = e),
          (this.post = i),
          e || (this.errorMessage = 'Error loading settings'),
          i || (this.errorMessage = 'Error loading group');
      } catch (t) {
        console.error(t);
      }
    }
    fetchGroup() {
      if (this.group) return Promise.resolve(this.group);
      fetch(`/wp-json/dt-posts/v2/groups/${this.groupId}`).then((t) =>
        t.json(),
      );
    }
    fetchSettings() {
      return this.settings
        ? Promise.resolve(this.settings)
        : fetch('/wp-json/dt-posts/v2/groups/settings').then((t) => t.json());
    }
    findMetric(t) {
      const e = this.metrics.find((e) => e.key === t);
      return e ? e.value : null;
    }
    render() {
      if (!this.group || !this.metrics.length)
        return e`<dt-spinner></dt-spinner>`;
      const t = this.group.health_metrics || [];
      return (
        this.errorMessage &&
          e`<dt-alert type="error">${this.errorMessage}</dt-alert>`,
        e`<div class="health-circle__wrapper"><div class="health-circle__container"><div class="${i({ 'health-circle': !0, 'health-circle--committed': this.isCommited })}"><div class="health-circle__grid">${this.metrics.map(([i, r], s) => e`<dt-church-health-icon key="${i}" .group="${this.group}" .metric="${r}" .active="${-1 !== t.indexOf(i)}" .style="--i: ${s + 1}" .missingIcon="${this.missingIcon}" .handleSave="${this.handleSave}"></dt-church-health-icon>`)}</div></div></div><dt-toggle name="church-commitment" label="${this.settings.church_commitment.label}" requiredmessage="" icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" iconalttext="Icon Alt Text" privatelabel="" @click="${this.toggleClick}" ?checked="${this.isCommited}"></dt-toggle></div>`
      );
    }
    distributeItems() {
      const t = this.renderRoot.querySelector('.health-circle__container');
      let e = t.querySelectorAll('dt-church-health-icon').length,
        i = Math.tan(Math.PI / e);
      t.style.setProperty('--m', e),
        t.style.setProperty('--tan', +i.toFixed(2));
    }
    async toggleClick(t) {
      const { handleSave: e } = this;
      if (!e) return;
      let i = this.renderRoot.querySelector('dt-toggle'),
        r = i.toggleAttribute('checked');
      this.group.health_metrics || (this.group.health_metrics = []);
      const s = {
        health_metrics: {
          values: [{ value: 'church_commitment', delete: !r }],
        },
      };
      try {
        await e(this.group.ID, s);
      } catch (t) {
        return i.toggleAttribute('checked', !r), void console.error(t);
      }
      r
        ? this.group.health_metrics.push('church_commitment')
        : this.group.health_metrics.pop('church_commitment'),
        this.requestUpdate();
    }
    _isChecked() {
      return Object.hasOwn(this.group, 'health_metrics') &&
        this.group.health_metrics.includes('church_commitment')
        ? (this.isChurch = !0)
        : (this.isChurch = !1);
    }
  },
);
//# sourceMappingURL=dt-church-health-circle.js.map
