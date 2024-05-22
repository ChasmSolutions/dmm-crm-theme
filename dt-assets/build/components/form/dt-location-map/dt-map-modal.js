import { i as t, y as e } from '../../lit-element-2409d5fe.js';
import { m as a } from '../../lit-localize-763e4978.js';
import { D as i } from '../../dt-base.js';
import '../../layout/dt-modal/dt-modal.js';
import '../../class-map-8d921948.js';
import '../../directive-de55b00a.js';
import '../../style-map-ac85d91b.js';
window.customElements.define(
  'dt-map-modal',
  class extends i {
    static get properties() {
      return {
        ...super.properties,
        title: { type: String },
        isOpen: { type: Boolean },
        canEdit: { type: Boolean, state: !0 },
        metadata: { type: Object },
        center: { type: Array },
        mapboxToken: { type: String, attribute: 'mapbox-token' },
      };
    }
    static get styles() {
      return [t`.map{width:100%;min-width:50vw;min-height:50dvb}`];
    }
    constructor() {
      super(),
        this.addEventListener('open', (t) => {
          this.shadowRoot
            .querySelector('dt-modal')
            .dispatchEvent(new Event('open')),
            (this.isOpen = !0);
        }),
        this.addEventListener('close', (t) => {
          this.shadowRoot
            .querySelector('dt-modal')
            .dispatchEvent(new Event('close')),
            (this.isOpen = !1);
        });
    }
    connectedCallback() {
      if (
        (super.connectedCallback(),
        (this.canEdit = !this.metadata),
        window.mapboxgl)
      )
        this.initMap();
      else {
        let t = document.createElement('script');
        (t.src = 'https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js'),
          (t.onload = this.initMap.bind(this)),
          document.body.appendChild(t),
          console.log('injected script');
      }
    }
    initMap() {
      if (!this.isOpen || !window.mapboxgl || !this.mapboxToken) return;
      const t = this.shadowRoot.querySelector('#map');
      if (t && !this.map) {
        (this.map = new window.mapboxgl.Map({
          accessToken: this.mapboxToken,
          container: t,
          style: 'mapbox://styles/mapbox/streets-v12',
          minZoom: 1,
        })),
          this.map.on('load', () => this.map.resize()),
          this.center &&
            this.center.length &&
            (this.map.setCenter(this.center), this.map.setZoom(15));
        const e = new mapboxgl.NavigationControl();
        this.map.addControl(e, 'bottom-right'),
          this.addPinFromMetadata(),
          this.map.on('click', (t) => {
            this.canEdit &&
              (this.marker
                ? this.marker.setLngLat(t.lngLat)
                : (this.marker = new mapboxgl.Marker()
                    .setLngLat(t.lngLat)
                    .addTo(this.map)));
          });
      }
    }
    addPinFromMetadata() {
      if (this.metadata) {
        const { lng: t, lat: e, level: a } = this.metadata;
        let i = 15;
        'admin0' === a
          ? (i = 3)
          : 'admin1' === a
            ? (i = 6)
            : 'admin2' === a && (i = 10),
          this.map &&
            (this.map.setCenter([t, e]),
            this.map.setZoom(i),
            (this.marker = new mapboxgl.Marker()
              .setLngLat([t, e])
              .addTo(this.map)));
      }
    }
    updated(t) {
      window.mapboxgl &&
        (t.has('metadata') &&
          this.metadata &&
          this.metadata.lat &&
          this.addPinFromMetadata(),
        t.has('isOpen') && this.isOpen && this.initMap());
    }
    onClose(t) {
      'button' === t?.detail?.action &&
        this.marker &&
        this.dispatchEvent(
          new CustomEvent('submit', {
            detail: { location: this.marker.getLngLat() },
          }),
        );
    }
    render() {
      return e`<dt-modal .title="${this.metadata?.label}" ?isopen="${this.isOpen}" hideButton @close="${this.onClose}"><div slot="content"><div class="map" id="map"></div></div>${this.canEdit ? e`<div slot="close-button">${a('Save')}</div>` : null}</dt-modal><link href="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css" rel="stylesheet">`;
    }
  },
);
//# sourceMappingURL=dt-map-modal.js.map
