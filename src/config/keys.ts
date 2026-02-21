/**
 * Strict.Dev - Public Client Keys
 *
 * Estas keys sao client-side por design e ficam visiveis no browser.
 * NAO sao secrets -- a seguranca e feita server-side:
 *   - GA4: dados pertencem a conta Google, a key so identifica a property
 *   - Web3Forms: protegido por domain whitelist no painel web3forms.com
 *
 * Para alterar, editar os valores abaixo e fazer rebuild.
 */

/** Google Analytics 4 Measurement ID */
export const GA4_MEASUREMENT_ID = "G-D6X8BXE242";

/** Web3Forms public access key (https://web3forms.com/dashboard) */
export const WEB3FORMS_ACCESS_KEY = "737d2200-e240-459a-8c60-51b179397982";
