export const environment = {
  production: true,
  auth: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ayaSovM5b',
    clientId: '5horhs63js18skpcdjpnldrjvp',
    redirectUrl: 'http://certichain.ddns.net',
    postLogoutRedirectUri: 'http://certichain.ddns.net',
    logoutUrl: 'https://us-east-1ayasovm5b.auth.us-east-1.amazoncognito.com/logout',
    scope: 'email openid phone'
  }
};
