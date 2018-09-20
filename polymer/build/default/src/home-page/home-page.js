import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
/**
 * @customElement
 * @polymer
 */

class HomePage extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello there!</h2>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'home-page'
      }
    };
  }

}

window.customElements.define('home-page', HomePage);
