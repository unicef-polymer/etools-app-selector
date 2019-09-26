import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/color.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import {dashIcon, pmpIcon, tripsIcon, famIcon, tpmIcon,
        apdIcon, adminIcon, etoolsLogo, unppLogo, pseaIcon, powerBiIcon} from './app-selector-icons.js';

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
            @apply --layout-horizontal;
            padding: 4px 4px;
            box-sizing: border-box;
            font-size: 14px;
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

          */ paper-icon-button.panel-icon {
            width: 36px;
            height: 36px;
            padding: 0;
          } /*

          iron-icon.unpp-icon {
            height: 32px;
            width: 104px;
          }

          .panel {
            width: 100%;
          }

          .panel:hover {
            background: var(--app-selector-item-hover-color, #eeeeee);
          }

          .app-title {
            font-size: 14px;
            text-transform: uppercase;
            font-weight: 500;
            padding-left: 6px;
            line-height: 1.2;
            cursor: pointer;
            white-space: normal;
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-width: 116px;
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
            font-size: 12px;
          }

          .display-flex {
            display: flex;
            align-items: center;
          }

          .etools-apps {
            width: 320px;
            display: flex;
            flex-flow: wrap;
          }

          .unpp-section {
            display: flex;
            align-items: center;
            width: 160px;
            min-height: 42px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          }

          .logo {
            width: 104px;
            height: 32px;
            margin-right: 8px;
            margin-left: 8px;
          }

          */ .top-content {
            display: flex;
            height: 56px;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          } /*

          .admin {
            padding-left: 12px
          }

          svg #adminIcon path.option {
            fill: var(--light-theme-secondary-color, #cccccc);
          }

          a, a:link, a:visited, a:hover, a:active {
            color: var(--app-selector-text-color, rgba(0, 0, 0, 0.87));
            text-decoration: none;
          }

          .module-group {
            width: 160px;
          }

          .module-group-title {
            text-transform: uppercase;
            font-weight: 500;
            padding-left: 6px;
            background: var(--divider-color);
            font-size: 12px;
            color: black;
          }
        </style>
      </custom-style>

      <div class="container" id="etools-selector">
        <paper-icon-button on-tap="toggleMenu" class$="apps-button [[opened]]" icon="apps"></paper-icon-button>
        <iron-collapse id="selector" class="apps-select">
          <div class="paper-material" elevation="5">
            <!-- <div class="top-content">
              <div class="panel">
                <span class="logo">${etoolsLogo}</span>
              </div>
            </div> -->

            <div class="etools-apps">
              <div class="module-group">
                <div id="programmeManagementGroup">
                <div class="module-group-title">Programme Management</div>
                  <template is="dom-if" if="[[_hasPermission('dash', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/dash/">
                      ${dashIcon}
                      <div class="app-title">Dashboards</div>
                    </a>
                  </template>

                  <template is="dom-if" if="[[_hasPermission('pmp', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/pmp/">
                      ${pmpIcon}
                      <div class="app-title">Partnership Management</div>
                    </a>
                  </template>

                  <template is="dom-if" if="[[_hasPermission('apd', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/apd/">
                      ${apdIcon}
                      <div class="app-title">Action Points</div>
                    </a>
                  </template>
                </div>

                <div id="assuranceGroup">
                  <div class="module-group-title">Assurance</div>
                  <template is="dom-if" if="[[_hasPermission('fam', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/ap/">
                      ${famIcon}
                      <div class="app-title">Financial Assurance</div>
                    </a>
                  </template>

                  <template is="dom-if" if="[[_hasPermission('psea', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/psea/">
                      ${pseaIcon}
                      <div class="app-title">PSEA</div>
                    </a>
                  </template>
                </div>
              </div>
                
              <div class="module-group">
                <div id="monitoringGroup">
                  <div class="module-group-title">Monitoring</div>
                  <template is="dom-if" if="[[_hasPermission('tpm', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/tpm/">
                      ${tpmIcon}
                      <div class="app-title">Third Party Monitoring</div>
                    </a>
                  </template>

                  <template is="dom-if" if="[[_hasPermission('t2f', user)]]">
                    <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/t2f/">
                      ${tripsIcon}
                      <div class="app-title">Trip Management</div>
                    </a>
                  </template>
                </div>

                <div id="externalToolsGroup">
                  <div class="module-group-title">External Tools</div>
                  <a class="unpp-section"
                    href="https://www.unpartnerportal.org/login" target="_blank">
                    <span class="logo">${unppLogo}</span>
                  </a>
                  <a class="content-wrapper panel" on-tap="goToPage" href$="[[baseSite]]/t2f/">
                    ${powerBiIcon}
                    <div class="app-title">eToolsNOW</div>
                  </a>
                </div>

                <template is="dom-if" if="[[isAdmin]]">
                  <div id="adminGroup">
                    <div class="module-group-title">Admin</div>
                      <a class="display-flex admin" href="[[baseSite]]/admin/">
                          ${adminIcon}
                        <span class="weight-500">ADMIN</span>
                      </a>
                      <!-- DATAMART ICON TO BE ENABLED WHEN BUSINESS REQUESTS -->
                      <!-- <a class="datamart"><iron-icon class="bottom-icon" icon="device:storage"></iron-icon>
                        <a href="https://datamart.unicef.io" target="_blank">
                          <span class="weight-500">DATAMART</span>
                        </a>
                      </a> -->
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

      isAdmin: {
        type: Boolean,
        value: false
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
        type: Object,
        observer: 'checkIsAdmin',
        value: {}
      },
      appPermissionsByGroup: {
        type: Object,
        value: {
          dash: ['UNICEF User'],
          pmp: ['UNICEF User'],
          t2f: ['UNICEF User'],
          tpm: ['UNICEF User', 'Third Party Monitor'],
          fam: ['UNICEF User', 'Auditor'],
          apd: ['UNICEF User'],
          psea: ['all']
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

  goToPage(e) {
    let path = e.target.closest('a').getAttribute('href');
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
    if (allowedGroups.indexOf('all') > -1) { return true;}
    return user.groups.some(group => allowedGroups.indexOf(group.name) > -1);
  }

  checkIsAdmin() {
    if (!this.user || (Object.entries(this.user).length === 0 && this.user.constructor === Object)) { return false; }
    let isAdmin = this.user.is_superuser === 'True' ||
      this.user.groups.find(group => group.name === 'Country Office Administrator');
    this.set('isAdmin', isAdmin);
  }
}

customElements.define(EtoolsAppSelector.is, EtoolsAppSelector);
