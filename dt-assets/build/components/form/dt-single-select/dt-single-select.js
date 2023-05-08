import{i as e,y as t}from"../../lit-element-2409d5fe.js";import{D as o}from"../dt-form-base.js";import"../../icons/dt-spinner.js";import"../../icons/dt-checkmark.js";import"../../dt-base.js";import"../../lit-localize-763e4978.js";import"../dt-label/dt-label.js";window.customElements.define("dt-single-select",class extends o{static get styles(){return[...super.styles,e`:host{position:relative}select{appearance:none;background-color:var(--dt-form-background-color,#fefefe);background-image:linear-gradient(45deg,transparent 50%,var(--dt-single-select-text-color) 50%),linear-gradient(135deg,var(--dt-single-select-text-color) 50%,transparent 50%);background-position:calc(100% - 20px) calc(1em + 2px),calc(100% - 15px) calc(1em + 2px),calc(100% - 2.5em) .5em;background-size:5px 5px,5px 5px,1px 1.5em;background-repeat:no-repeat;border:1px solid var(--dt-form-border-color,#cacaca);border-radius:0;color:var(--dt-single-select-text-color,#0a0a0a);font-family:var(--font-family,sans-serif);font-size:1rem;font-weight:300;height:2.5rem;line-height:1.5;margin:0 0 1rem;padding:.53rem;padding-inline-end:1.6rem;transition:border-color .25s ease-in-out;transition:box-shadow .5s,border-color .25s ease-in-out;box-sizing:border-box;width:100%;text-transform:none}[dir=rtl] select{background-position:15px calc(1em + 2px),20px calc(1em + 2px),2.5em .5em}select.color-select{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: white'></polygon></svg>");background-color:var(--dt-form-border-color,#cacaca);border:none;border-radius:10px;color:var(--dt-single-select-text-color-inverse,#fff);font-weight:700;text-shadow:rgb(0 0 0 / 45%) 0 0 6px}.icon-overlay{inset-inline-end:2.5rem}`]}static get properties(){return{...super.properties,placeholder:{type:String},options:{type:Array},value:{type:String,reflect:!0},color:{type:String,state:!0},onchange:{type:String}}}updateColor(){if(this.value&&this.options){const e=this.options.filter((e=>e.id===this.value));e&&e.length&&(this.color=e[0].color)}}isColorSelect(){return(this.options||[]).reduce(((e,t)=>e||t.color),!1)}willUpdate(e){super.willUpdate(e),e.has("value")&&this.updateColor()}_change(e){const t=new CustomEvent("change",{detail:{field:this.name,oldValue:this.value,newValue:e.target.value}});this.value=e.target.value,this.dispatchEvent(t)}render(){return t`${this.labelTemplate()}<div class="container" dir="${this.RTL?"rtl":"ltr"}"><select name="${this.name}" aria-label="${this.name}" @change="${this._change}" class="${this.isColorSelect()?"color-select":""}" style="background-color:${this.color}" ?disabled="${this.disabled}"><option disabled="disabled" selected="selected" hidden value="">${this.placeholder}</option>${this.options&&this.options.map((e=>t`<option value="${e.id}" ?selected="${e.id===this.value}">${e.label}</option>`))}</select> ${this.loading?t`<dt-spinner class="icon-overlay"></dt-spinner>`:null} ${this.saved?t`<dt-checkmark class="icon-overlay success"></dt-checkmark>`:null}</div>`}});
