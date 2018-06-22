import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/color.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import './app-selector-icons.js';


/**
 * `etools-app-selector`
 *
 * App selector menu
 *
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
class EtoolsAppSelector extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <custom-style>
        <style is="custom-style" include="paper-material-styles">
          :host {
            display: inline-block;
            position: relative;
            color: var(--dark-primary-text-color, rgba(0, 0, 0, 0.87));

            --paper-icon-button: {
              box-sizing: content-box !important;
            };
          }

          paper-icon-button.apps-button {
            @apply --layout-horizontal;
            width: 24px;
            height: 24px;
            padding: 18px 24px 18px 24px;
            color: var(--header-secondary-text-color, rgba(255, 255, 255, 0.7));
            border-right: 1px solid var(--light-divider-color, rgba(255, 255, 255, 0.12));
            z-index: 100;
            box-sizing: content-box !important;
          }

          paper-icon-button.icon-opened {
            background: #ffffff;
            color: var(--dark-primary-text-color, rgba(0, 0, 0, 0.87));
          }

          .container {
            @apply --layout-vertical;
            position: relative;
          }

          .apps-select {
            position: absolute;
            background: var(--primary-element-background, #FFFFFF);
            top: 60px;
            z-index: 100;
            padding: 0;
          }

          .content-wrapper {
            @apply --layout-horizontal;
            @apply --layout-center;
            min-height: 60px;
            padding: 24px;
            box-sizing: border-box;
            font-size: 14px;
            white-space: nowrap;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            border-right: 1px solid rgba(0, 0, 0, 0.12);
          }

          .content-wrapper:nth-child(2) {
            flex-grow: 1;
          }

          .content-wrapper > a {
            align-items: center;
          }

          paper-icon-button.panel-icon {
            width: 85px;
            height: 85px;
            padding: 0;
          }

          .panel {
            width: 266px;
          }

          .panel:nth-child(2) {
            border-right: none;
          }

          .panel:hover {
            background: var(--app-selector-item-hover-color, #e8e8e8);
          }

          .panel-row {
            @apply --layout-horizontal;
          }

          .app-title {
            font-size: 16px;
            text-transform: uppercase;
            font-weight: 500;
            margin-left: 16px;
            line-height: 1.2;
            cursor: pointer;
            white-space: normal;
          }

          .app-outer {
            width: 532px;
            display: block;
          }

          .app-inner {
            display: flex;
            flex-flow: wrap;
          }

          a, a:link, a:visited, a:hover, a:active {
            color: var(--app-selector-text-color, rgba(0, 0, 0, 0.87));
            text-decoration: none;
          }

        </style>
      </custom-style>
      <div class="container" id="etools-selector">
        <paper-icon-button on-tap="toggleMenu" class\$="apps-button [[opened]]" icon="apps"></paper-icon-button>
        <iron-collapse id="selector" class="apps-select">
          <div class="paper-material" elevation="5">
            <div class="content-wrapper">
              Select an application or repository
            </div>
            <div class="app-outer">
              <div class="app-inner">
                <template is="dom-repeat" items="[[menuOptions]]" as="app">
                  <div class="panel-row">
                    <div class="content-wrapper panel">
                      <a on-tap="goToPage" href="[[baseSite]]/[[app.url]]/">
                        <paper-icon-button class="panel-icon"
                                           icon="[[app.icon]]"></paper-icon-button>
                      </a>
                      <a on-tap="goToPage" href="[[baseSite]]/[[app.url]]/">
                        <div class="app-title">[[app.title]]</div>
                      </a>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </iron-collapse>
      </div>
    `;
  }

  static get is() {
    return 'etools-app-selector';
  }

  static get properties() {
    return {

      baseSite: {
        type: String,
        value: window.location.origin
      },

      /**
       * Class name toggle variable.
       * Used for styling when dropdown open/closed
       */
      opened: {
        type: String,
        value: ''
      },

      /**
       * Show or hide Auditor Portal (temp solution)
       *
       */
      showAp: {
        type: Boolean,
        value: false,
        observer: '_addApPanel'
      },

      /**
       * Dropdown menu items to display.
       *
       * Example object structure:
       *
       *     menuOptions = [{
      *       title: 'Dashboard',
      *       icon: 'app-selector-icons: dashIcon',
      *       url: 'dash'
      *     }]
       *
       * @type (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object)
       */

      menuOptions: {
        type: Array,
        value: [
          {
            title: 'Dashboards',
            icon: 'app-selector-icons:dashIcon',
            url: 'dash'
          },
          {
            title: 'Partnership Management',
            icon: 'app-selector-icons:pmpIcon',
            url: 'pmp'
          },
          {
            title: 'Trip Management',
            icon: 'app-selector-icons:tripsIcon',
            url: 't2f'
          },
          {
            title: 'Admin (Permission Required)',
            icon: 'app-selector-icons:adminIcon',
            url: 'admin'
          }
        ],
        notify: true
      }
    };
  }

  ready() {
    super.ready();
    if (this.showAp) {
      this._addApPanel();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onCaptureClick.bind(this), true);
  }

  /**
   * Toggles the menu opened and closed
   *
   */
  toggleMenu() {
    this.$.selector.toggle();
    if (this.opened) {
      this.opened = '';
    } else {
      this.opened = 'icon-opened';
    }
  }

  /**
   * Navigate window to path if ctrl/command are not pressed
   */
  manageClickEvent(e, path) {
    if (!e.detail.sourceEvent.ctrlKey && !e.detail.sourceEvent.metaKey) {
      window.location.href = path;
    }
  }

  /**
   * Change location to target app url found in menuOptions array items.
   * Url prop of item should just be app name
   *
   * Example:
   *
   *  `app.url="admin" will change location to 'http://myBaseUrlAndPort/admin/' `
   *
   */
  goToPage(e) {
    let path = window.location.origin + '/' + e.model.app.url + '/';
    this.manageClickEvent(e, path);
  }

  /**
   * Determine if click is outside of menu, close if true
   *
   */
  _onCaptureClick(e) {
    if (!this._isInPath(e.composedPath(), 'id', 'etools-selector')) {
      if (this.$.selector.opened) {
        this.toggleMenu();
      }
    }
  }

  /**
   * Add Auditor Portal as a menu option when bool passed as a prop
   *
   */
  _addApPanel(show) {
    if (show) {
      this.splice('menuOptions', 3, 0, {
        title: 'Auditor Portal',
        icon: 'app-selector-icons:auditor',
        url: 'ap'
      });
    }
  }

  _isInPath(path, prop, value) {
    path = path || [];
    for (var i = 0; i < path.length; i++) {
      if (path[i][prop] === value) {
        return true;
      }
    }
    return false;
  }
}

customElements.define(EtoolsAppSelector.is, EtoolsAppSelector);
