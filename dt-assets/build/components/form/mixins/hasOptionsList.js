import { y as t } from '../../lit-element-2409d5fe.js';
import { m as e } from '../../lit-localize-763e4978.js';
const i = (i) =>
  class extends i {
    constructor() {
      super(),
        (this.activeIndex = -1),
        (this.filteredOptions = []),
        (this.detectTap = !1);
    }
    static get properties() {
      return {
        ...super.properties,
        value: { type: Array, reflect: !0 },
        query: { type: String, state: !0 },
        options: { type: Array },
        filteredOptions: { type: Array, state: !0 },
        open: { type: Boolean, state: !0 },
        activeIndex: { type: Number, state: !0 },
        containerHeight: { type: Number, state: !0 },
        loading: { type: Boolean },
      };
    }
    willUpdate(t) {
      if (
        (super.willUpdate(t),
        t &&
          !this.containerHeight &&
          this.shadowRoot.children &&
          this.shadowRoot.children.length)
      ) {
        const t = this.shadowRoot.querySelector('.input-group');
        t && (this.containerHeight = t.offsetHeight);
      }
    }
    updated() {
      this._scrollOptionListToActive();
      const t = this.shadowRoot.querySelector('.input-group');
      !t.style.getPropertyValue('--container-width') &&
        t.clientWidth > 0 &&
        t.style.setProperty('--container-width', `${t.clientWidth}px`);
    }
    _select() {
      console.error('Must implement `_select(value)` function');
    }
    static _focusInput(t) {
      t.target === t.currentTarget &&
        t.target.getElementsByTagName('input')[0].focus();
    }
    _inputFocusIn(t) {
      (t.relatedTarget &&
        ['BUTTON', 'LI'].includes(t.relatedTarget.nodeName)) ||
        ((this.open = !0), (this.activeIndex = -1));
    }
    _inputFocusOut(t) {
      (t.relatedTarget &&
        ['BUTTON', 'LI'].includes(t.relatedTarget.nodeName)) ||
        (this.open = !1);
    }
    _inputKeyDown(t) {
      switch (t.keyCode || t.which) {
        case 8:
          '' === t.target.value
            ? (this.value = this.value.slice(0, -1))
            : (this.open = !0);
          break;
        case 38:
          (this.open = !0), this._listHighlightPrevious();
          break;
        case 40:
          (this.open = !0), this._listHighlightNext();
          break;
        case 9:
          this.activeIndex < 0 ? (this.open = !1) : t.preventDefault(),
            this._keyboardSelectOption();
          break;
        case 13:
          this._keyboardSelectOption();
          break;
        case 27:
          (this.open = !1), (this.activeIndex = -1);
          break;
        default:
          this.open = !0;
      }
    }
    _inputKeyUp(t) {
      this.query = t.target.value;
    }
    _scrollOptionListToActive() {
      const t = this.shadowRoot.querySelector('.option-list'),
        e = this.shadowRoot.querySelector('button.active');
      if (t && e) {
        const i = e.offsetTop,
          s = e.offsetTop + e.clientHeight,
          o = t.scrollTop;
        s > t.scrollTop + t.clientHeight
          ? t.scrollTo({ top: s - t.clientHeight, behavior: 'smooth' })
          : i < o && t.scrollTo({ top: i, behavior: 'smooth' });
      }
    }
    _touchStart(t) {
      t.target && (this.detectTap = !1);
    }
    _touchMove(t) {
      t.target && (this.detectTap = !0);
    }
    _touchEnd(t) {
      this.detectTap ||
        (t.target && t.target.value && this._clickOption(t),
        (this.detectTap = !1));
    }
    _keyboardSelectOption() {
      this.activeIndex > -1 &&
        (this.activeIndex + 1 > this.filteredOptions.length
          ? this._select(this.query)
          : this._select(this.filteredOptions[this.activeIndex].id),
        this._clearSearch());
    }
    _clickOption(t) {
      t.target &&
        t.target.value &&
        (this._select(t.target.value), this._clearSearch());
    }
    _clickAddNew(t) {
      t.target && (this._select(t.target.dataset?.label), this._clearSearch());
    }
    _clearSearch() {
      const t = this.shadowRoot.querySelector('input');
      t && (t.value = '');
    }
    _listHighlightNext() {
      this.allowAdd
        ? (this.activeIndex = Math.min(
            this.filteredOptions.length,
            this.activeIndex + 1,
          ))
        : (this.activeIndex = Math.min(
            this.filteredOptions.length - 1,
            this.activeIndex + 1,
          ));
    }
    _listHighlightPrevious() {
      this.activeIndex = Math.max(0, this.activeIndex - 1);
    }
    _renderOption(e, i) {
      return t`<li tabindex="-1"><button value="${e.id}" type="button" data-label="${e.label}" @click="${this._clickOption}" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}" @touchend="${this._touchEnd}" tabindex="-1" class="${this.activeIndex > -1 && this.activeIndex === i ? 'active' : ''}">${e.label}</button></li>`;
    }
    _baseRenderOptions() {
      return this.filteredOptions.length
        ? this.filteredOptions.map((t, e) => this._renderOption(t, e))
        : this.loading
          ? t`<li><div>${e('Loading options...')}</div></li>`
          : t`<li><div>${e('No Data Available')}</div></li>`;
    }
    _renderOptions() {
      let i = this._baseRenderOptions();
      return (
        this.allowAdd &&
          this.query &&
          (Array.isArray(i) || (i = [i]),
          i.push(
            t`<li tabindex="-1"><button data-label="${this.query}" @click="${this._clickAddNew}" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}" @touchend="${this._touchEnd}" class="${this.activeIndex > -1 && this.activeIndex >= this.filteredOptions.length ? 'active' : ''}">${e('Add')} "${this.query}"</button></li>`,
          )),
        i
      );
    }
  };
export { i as H };
//# sourceMappingURL=hasOptionsList.js.map
