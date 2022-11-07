import {LitElement, html, customElement, property, css, CSSResult} from 'lit-element';
import {
  adminIcon,
  apdIcon,
  dashIcon,
  externalIcon,
  famIcon,
  fmIcon,
  pmpIcon,
  powerBiIcon,
  pseaIcon,
  tpmIcon,
  tripsIcon,
  unppIcon,
  appsIcon,
  storageIcon
} from './app-selector-icons';
import '@material/mwc-icon-button';
import '@material/mwc-icon';
import {EtoolsUser, UserGroup} from '@unicef-polymer/etools-types';
import {getTranslation} from './utils/translation-helper';

export enum Applications {
  PMP = 'pmp',
  T2F = 't2f',
  TPM = 'tpm',
  AP = 'ap',
  PSEA = 'psea',
  FM = 'fm',
  APD = 'apd',
  DASH = 'dash',
  ADMIN = 'admin'
}

export enum GROUPS {
  TPM = 'Third Party Monitor',
  USER = 'UNICEF User',
  AUDITOR = 'Auditor',
  CO_ADMINISTRATOR = 'Country Office Administrator'
}

@customElement('etools-app-selector')
export class AppSelector extends LitElement {
  // language=css
  static styles: CSSResult = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 73px;
      height: 60px;
      align-items: center;
      justify-content: center;
      border-right: 1px solid var(--light-divider-color, rgba(255, 255, 255, 0.12));
    }

    :host(.opened) {
      background: #ffffff;
    }

    mwc-icon-button {
      color: var(--header-secondary-text-color, rgba(255, 255, 255, 0.7));
    }
    :host(.opened) mwc-icon-button {
      color: var(--dark-primary-text-color, rgba(0, 0, 0, 0.87));
    }

    .dropdown {
      position: absolute;
      left: 0;
      top: 60px;
      box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
        0 8px 10px -5px rgba(0, 0, 0, 0.4);
      background-color: #ffffff;
      transition: 0.3s;
      transform-origin: top;
      transform: scaleY(0);
      z-index: 90;
    }

    :host(.opened) .dropdown {
      transform: scaleY(1);
    }

    .apps-select {
      position: absolute;
      background: var(--primary-element-background, #ffffff);
      top: 60px;
      z-index: 100;
      padding: 0;
    }

    .content-wrapper {
      display: flex;
      align-items: stretch;
      flex-direction: row;
      padding: 5px;
      box-sizing: border-box;
      font-size: 14px;
      white-space: nowrap;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      width: 179px;
      align-items: center;
    }

    .content-wrapper:hover {
      background: var(--app-selector-item-hover-color, #eeeeee);
    }

    .app-title {
      font-size: 13px;
      font-weight: 500;
      padding-left: 6px;
      padding-right: 6px;
      line-height: 1.2;
      cursor: pointer;
      white-space: normal;
      display: block;
      justify-content: center;
      max-width: 116px;
    }

    .etools-apps {
      width: 360px;
    }

    svg #adminIcon path.option,
    svg #externalIcon path.option {
      fill: var(--light-theme-secondary-color, #cccccc);
    }

    #externalIcon {
      min-width: 16px;
    }

    .admin {
      background: #eeeeee;
      display: flex;
      align-items: center;
      padding-left: 4px;
    }

    a,
    a:link,
    a:visited,
    a:hover,
    a:active {
      color: var(--app-selector-text-color, rgba(0, 0, 0, 0.87));
      text-decoration: none;
    }

    .module-group {
      border-right: 1px solid rgba(0, 0, 0, 0.12);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .module-group-title {
      text-transform: capitalize;
      font-weight: 450;
      padding: 6px;
      background: #eeeeee;
      font-size: 12px;
      border-right: 1px solid var(--divider-color);
      border-left: 1px solid var(--divider-color);
      display: flex;
      color: #444444;
    }

    .datamart #storageIcon path {
      fill: var(--light-theme-secondary-color, rgba(0, 0, 0, 0.54));
    }

    paper-icon-button.apps-button {
      @apply --layout-horizontal;
      width: 24px;
      height: 24px;
      padding: var(--app-selector-button-padding, 18px 24px 18px 24px);
      color: var(--header-secondary-text-color, rgba(255, 255, 255, 0.7));
      border-right: 1px solid var(--light-divider-color, rgba(255, 255, 255, 0.12));
      z-index: 100;
      box-sizing: content-box !important;
    }
  `;

  @property({type: String, attribute: 'language'}) language: string = '';
  @property({type: String}) iconTitle: string = '';
  @property({type: String}) baseSite: string = window.location.origin;
  @property({type: Array}) allowedAps: Applications[] = [];
  set user(user: EtoolsUser) {
    this.setPermissions(user);
  }

  private appPermissionsByGroup: Map<Applications, string[]> = new Map([
    [Applications.DASH, [GROUPS.USER]],
    [Applications.PMP, [GROUPS.USER]],
    [Applications.T2F, [GROUPS.USER]],
    [Applications.TPM, [GROUPS.USER, GROUPS.TPM]],
    [Applications.AP, [GROUPS.USER, GROUPS.AUDITOR]],
    [Applications.APD, [GROUPS.USER]],
    [Applications.FM, [GROUPS.USER, GROUPS.TPM]]
  ]);

  render(): unknown {
    return html`
      <mwc-icon-button .title="${this.iconTitle}" @click="${this.toggleMenu}"> ${appsIcon} </mwc-icon-button>

      <div class="dropdown">
        <div class="etools-apps">
          <span class="module-group-title">${getTranslation(this.language, 'PROGRAMME_MANAGEMENT')}</span>
          <div class="module-group">
            <a
              class="content-wrapper"
              @click="${this.goToPage}"
              href="https://www.unpartnerportal.org/login"
              target="_blank"
            >
              ${unppIcon}
              <div class="app-title">${getTranslation(this.language, 'UN_PARTNER_PORTAL')}</div>
              ${externalIcon}
            </a>
            ${this.checkAllowedApps([Applications.PMP])
              ? html`
                  <a class="content-wrapper" @click="${this.goToPage}" href="${this.baseSite}/${Applications.PMP}/">
                    ${pmpIcon}
                    <div class="app-title">${getTranslation(this.language, 'PARTNERSHIP_MANAGEMENT')}</div>
                  </a>
                `
              : ''}
          </div>

          ${this.checkAllowedApps([Applications.T2F, Applications.AP, Applications.TPM, Applications.PSEA])
            ? html`
                <span class="module-group-title">${getTranslation(this.language, 'MONITORING_ASSURANCE')}</span>
                <div class="module-group">
                  ${this.checkAllowedApps([Applications.T2F])
                    ? html`
                        <a
                          class="content-wrapper"
                          @click="${this.goToPage}"
                          href="${this.baseSite}/${Applications.T2F}/"
                        >
                          ${tripsIcon}
                          <div class="app-title">${getTranslation(this.language, 'TRIP_MANAGEMENT')}</div>
                        </a>
                      `
                    : ''}
                  ${this.checkAllowedApps([Applications.TPM])
                    ? html`
                        <a
                          class="content-wrapper"
                          @click="${this.goToPage}"
                          href="${this.baseSite}/${Applications.TPM}/"
                        >
                          ${tpmIcon}
                          <div class="app-title">${getTranslation(this.language, 'THIRD_PARTY_MONITORING')}</div>
                        </a>
                      `
                    : ''}
                  ${this.checkAllowedApps([Applications.AP])
                    ? html`
                        <a
                          class="content-wrapper"
                          @click="${this.goToPage}"
                          href="${this.baseSite}/${Applications.AP}/"
                        >
                          ${famIcon}
                          <div class="app-title">${getTranslation(this.language, 'FINANCIAL_ASSURANCE')}</div>
                        </a>
                      `
                    : ''}
                  ${this.checkAllowedApps([Applications.PSEA])
                    ? html`
                        <a
                          class="content-wrapper"
                          @click="${this.goToPage}"
                          href="${this.baseSite}/${Applications.PSEA}/"
                        >
                          ${pseaIcon}
                          <div class="app-title">${getTranslation(this.language, 'PSEA_ASSURANCE')}</div>
                        </a>
                      `
                    : ''}
                  ${this.checkAllowedApps([Applications.FM])
                    ? html`
                        <a
                          class="content-wrapper"
                          @click="${this.goToPage}"
                          href="${this.baseSite}/${Applications.FM}/"
                        >
                          ${fmIcon}
                          <div class="app-title">${getTranslation(this.language, 'FIELD_MONITORING')}</div>
                        </a>
                      `
                    : ''}
                </div>
              `
            : ''}

          <span class="module-group-title">${getTranslation(this.language, 'DASHBOARDS_ANALYTICS')}</span>
          <div class="module-group">
            ${this.checkAllowedApps([Applications.APD])
              ? html`
                  <a class="content-wrapper" @click="${this.goToPage}" href="${this.baseSite}/${Applications.APD}/">
                    ${apdIcon}
                    <div class="app-title">${getTranslation(this.language, 'ACTION_POINTS')}</div>
                  </a>
                `
              : ''}
            ${this.checkAllowedApps([Applications.DASH])
              ? html`
                  <a class="content-wrapper" @click="${this.goToPage}" href="${this.baseSite}/${Applications.DASH}/">
                    ${dashIcon}
                    <div class="app-title">${getTranslation(this.language, 'DASHBOARDS')}</div>
                  </a>
                `
              : ''}

            <a
              class="content-wrapper"
              target="_blank"
              href="https://app.powerbi.com/groups/me/apps/2c83563f-d6fc-4ade-9c10-bbca57ed1ece/reports/5e60ab16-cce5-4c21-8620-de0c4c6415de/ReportSectionfe8562e6ef8c4eddcb52"
            >
              ${powerBiIcon}
              <span class="app-title"
                >${getTranslation(this.language, 'IMPLEMENTATION_INTELLIGENCE')} (I<sup>2</sup>)</span
              >
              ${externalIcon}
            </a>

            <a class="datamart content-wrapper" href="https://datamart.unicef.io" target="_blank">
              ${storageIcon}
              <div class="app-title">${getTranslation(this.language, 'DATAMART')}</div>
              ${externalIcon}
            </a>
          </div>
        </div>

        ${this.checkAllowedApps([Applications.ADMIN])
          ? html`
              <a class="admin" href="${this.baseSite}/${Applications.ADMIN}/">
                ${adminIcon}
                <div class="app-title">${getTranslation(this.language, 'ADMIN')}</div>
              </a>
            `
          : ''}
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('tap', () => {
      if (this.classList.contains('opened')) {
        this.classList.remove('opened');
      }
    });

    if (!this.iconTitle) {
      this.iconTitle = getTranslation(this.language, 'APP_SELECTOR');
    }

    document.addEventListener('language-changed', this.handleLanguageChange.bind(this));
    this.addEventListener('tap', (e: Event) => e.stopPropagation());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('language-changed', this.handleLanguageChange.bind(this));
  }

  handleLanguageChange(e: any) {
    this.language = e.detail.language;
  }

  /**
   * Toggles the menu opened and closed
   *
   */
  toggleMenu(): void {
    this.classList.contains('opened') ? this.classList.remove('opened') : this.classList.add('opened');
  }

  checkAllowedApps(applications: Applications[]): boolean {
    return applications.some((application: Applications) => this.allowedAps.includes(application));
  }

  // [ch14186], https://github.com/unicef-polymer/etools-app-selector/pull/54/files
  goToPage(e: any): void {
    const path: string = (e.target! as HTMLElement).closest('a')?.getAttribute('href') || '';
    if (!e.detail.sourceEvent.ctrlKey && !e.detail.sourceEvent.metaKey) {
      window.location.href = path;
    }
  }

  private setPermissions(user: EtoolsUser): void {
    if (!user) {
      this.allowedAps = [];
      return;
    }
    // check admin app
    const allowedApplications: Applications[] = [];
    const isAdmin: boolean = Boolean(
      user?.is_superuser === 'True' || user?.groups.find(({name}: UserGroup) => name === GROUPS.CO_ADMINISTRATOR)
    );
    if (isAdmin) {
      allowedApplications.push(Applications.ADMIN);
    }
    // check psea app
    const isTPM: boolean = user.groups.some(({name}: UserGroup) => name === GROUPS.TPM);
    if (!isTPM) {
      allowedApplications.push(Applications.PSEA);
    }
    // check other apps
    for (const [application, groups] of this.appPermissionsByGroup) {
      const appAllowed: boolean = user.groups.some(({name}: UserGroup) => groups.includes(name));
      if (appAllowed) {
        allowedApplications.push(application);
      }
    }
    this.allowedAps = allowedApplications;
  }
}
