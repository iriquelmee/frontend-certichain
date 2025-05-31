import { PassedInitialConfig } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: environment.auth.authority,
    redirectUrl: environment.auth.redirectUrl,
    clientId: environment.auth.clientId,
    scope: environment.auth.scope,
    responseType: 'code'
  }
}
