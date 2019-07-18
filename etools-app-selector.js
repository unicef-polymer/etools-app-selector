import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/color.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import {dashIcon, pmpIcon, tripsIcon, famIcon, tpmIcon,
        apdIcon, adminIcon, etoolsLogo, unppLogo} from './app-selector-icons.js';


/**
 * `etools-app-selector`
 *
 * App selector menu
 *
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 * @demo demo/index.html
 */
class EtoolsAppSelector extends PolymerElement {
  static get template() {
    // language=HTML
    return html`
      <custom-style>
        <style is="custom-style" include="paper-material-styles">
          :host {
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
            @apply --layout-center;
            min-height: 60px;
            padding: 24px 4px;
            box-sizing: border-box;
            font-size: 14px;
            text-align: center;
            white-space: nowrap;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            border-right: 1px solid rgba(0, 0, 0, 0.12);
          }

          .content-wrapper-2 {
            @apply --layout-center;
            display: flex;
            height: 37px;
            box-sizing: border-box;
            font-size: 12px;
            white-space: nowrap;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            border-right: 1px solid rgba(0, 0, 0, 0.12);
          }

          paper-icon-button.panel-icon {
            width: 72px;
            height: 72px;
            padding: 0;
          }

          iron-icon.unpp-icon {
            height: 32px;
            width: 104px;
          }

          .panel {
            width: 120px;
          }

          .panel:hover {
            background: var(--app-selector-item-hover-color, #eeeeee);
          }

          .app-title {
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 500;
            padding-top: 6px;
            text-align: center;
            line-height: 1.2;
            cursor: pointer;
            white-space: normal;
          }

          iron-icon.bottom-icon {
            --iron-icon-height: 20px;
            --iron-icon-width: 20px;
            --iron-icon-fill-color: #9e9e9e;
            padding-right: 4px;
          }

          .weight-500 {
            font-weight: 500;
            padding-right: 4px;
          }

          .display-flex {
            display: flex;
            align-items: center;
          }
          
          .etools-apps {
            width: 360px;
            display: flex;
            flex-flow: wrap;
          }

          .unpp-section {
            background-color: rgb(76, 121, 179);
            display: flex;
            align-items: center;
            width: 240px;
            height: 100%;
          }

          .logo {
            width: 104px;
            height: 32px;
            margin-right: 8px;
            margin-left: 8px;
          }

          .top-content {
            display: flex;
            height: 56px;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          }

          .admin {
            width: 240px;
            padding-left: 12px
          }
          
          svg #adminIcon path.option {
            fill: var(--light-theme-secondary-color, #cccccc);
          }
          
          a, a:link, a:visited, a:hover, a:active {
            color: var(--app-selector-text-color, rgba(0, 0, 0, 0.87));
            text-decoration: none;
          }

        </style>
      </custom-style>

      <div class="container" id="etools-selector">
        <paper-icon-button on-tap="toggleMenu" class$="apps-button [[opened]]" icon="apps"></paper-icon-button>
        <iron-collapse id="selector" class="apps-select">
          <div class="paper-material" elevation="5">
            <div class="top-content">
              <div class="panel">
                <span class="logo">${etoolsLogo}</span>
              </div>
              <a class="unpp-section"
                 href="https://www.unpartnerportal.org/login" target="_blank">
                <span class="logo">${unppLogo}</span>
              </a>
            </div>
            
            <div class="etools-apps">
                <template is="dom-if" if="[[_hasPermission('dash', user)]]">
                  <a class="content-wrapper panel" href="[[baseSite]]/dash/">
                      ${dashIcon}
                    <div class="app-title">Dashboards</div>
                  </a>
                </template>
          
                <template is="dom-if" if="[[_hasPermission('pmp', user)]]">
                  <a class="content-wrapper panel" href="[[baseSite]]/pmp/">
                      ${pmpIcon}
                    <div class="app-title">Partnership Management</div>
                  </a>
                </template>
          
                <template is="dom-if" if="[[_hasPermission('t2f', user)]]">
                  <a class="content-wrapper panel" href="[[baseSite]]/t2f/">
                      ${tripsIcon}
                    <div class="app-title">Trip Management</div>
                  </a>
                </template>
          
                <template is="dom-if" if="[[_hasPermission('fam', user)]]">
                  <a class="content-wrapper panel" href="[[baseSite]]/ap/">
                      ${famIcon}
                    <div class="app-title">Financial Assurance</div>
                  </a>
                </template>
          
                <template is="dom-if" if="[[_hasPermission('tpm', user)]]">
                  <a class="content-wrapper panel" href="[[baseSite]]/tpm/">
                      ${tpmIcon}
                    <div class="app-title">Third Party Monitoring</div>
                  </a>
                </template>
          
                <template is="dom-if" if="[[_hasPermission('apd', user)]]">
                  <a class="content-wrapper panel" href="[[baseSite]]/apd/">
                      ${apdIcon}
                    <div class="app-title">Action Points</div>
                  </a>
                </template>
            </div>
            
            <div class="content-wrapper-2">
              <a class="display-flex admin" href="[[baseSite]]/admin/">
                  ${adminIcon}
                <span class="weight-500">ADMIN</span>(Permission Required)
              </a>
              <!-- DATAMART ICON TO BE ENABLED WHEN BUSINESS REQUESTS -->
              <!-- <a class="datamart"><iron-icon class="bottom-icon" icon="device:storage"></iron-icon>
                <a href="https://datamart.unicef.io" target="_blank">
                  <span class="weight-500">DATAMART</span>
                </a>
              </a> -->
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
      user: {
        type: Object
      },
      appPermissionsByGroup: {
        type: Object,
        value: {
          dash: ['UNICEF User'],
          pmp: ['UNICEF User'],
          t2f: ['UNICEF User'],
          tpm: ['UNICEF User', 'Third Party Monitor'],
          fam: ['UNICEF User', 'Auditor'],
          apd: ['UNICEF User']
        }
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
  // TODO - method doesn't seem to be needed anymore, remove when 100% confirmed
  goToPage(e) {
    if(e && e.model && e.model.app && e.model.app.url) {
      let path = window.location.origin + '/' + e.model.app.url + '/';
      this.manageClickEvent(e, path);
    }
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

  _isInPath(path, prop, value) {
    path = path || [];
    for (var i = 0; i < path.length; i++) {
      if (path[i][prop] === value) {
        return true;
      }
    }
    return false;
  }

  _hasPermission(appName, user) {
    // checks if user object is populated
    if (Object.entries(user).length === 0 && user.constructor === Object) {return false;}
    let allowedGroups = this.appPermissionsByGroup[appName];
    return user.groups.some(group => allowedGroups.indexOf(group.name) > -1);
  }
}

customElements.define(EtoolsAppSelector.is, EtoolsAppSelector);
