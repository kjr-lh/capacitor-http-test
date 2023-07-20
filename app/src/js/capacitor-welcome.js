import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Camera } from '@capacitor/camera';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <form>
            <input id="file-input" type="file" name="file" />    
        </form>
        <button id="upload-as-file">Upload as file</button>
        <button id="upload-as-formdata">Upload as FormData</button>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;
      const host = Capacitor.getPlatform() === 'ios' ? 'localhost' : '10.0.2.2';

      self.shadowRoot.querySelector('#upload-as-file').addEventListener('click', async () => {
        console.log('uploading as file');

        const fileInput = self.shadowRoot.querySelector('#file-input');
        const file = fileInput.files[0];

        await fetch(`http://${host}:3030/upload/file`, {
          method: 'POST',
          body: file,
        });
      });

      self.shadowRoot.querySelector('#upload-as-formdata').addEventListener('click', async () => {
        console.log('uploading as file');

        const fileInput = self.shadowRoot.querySelector('#file-input');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('test', 'value');
        formData.append('file', file, file.name);

        await fetch(`http://${host}:3030/upload/formdata`, {
          method: 'POST',
          body: formData,
        });
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
