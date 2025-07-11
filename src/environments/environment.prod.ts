export const environment = {
  production: true,
  apiUrl: 'https://ll24ffjgfl.execute-api.us-east-1.amazonaws.com',
  auth: {
    // Propiedades para oidc-client
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ayaSovM5b',
    clientId: '5horhs63js18skpcdjpnldrjvp',
    redirectUrl: 'https://certichain.ddns.net',
    postLogoutRedirectUri: 'https://certichain.ddns.net',
    logoutUrl: 'https://us-east-1ayasovm5b.auth.us-east-1.amazoncognito.com/logout',
    scope: 'email openid phone',
    
    // Propiedades explícitas para Amazon Cognito SDK
    region: 'us-east-1',
    userPoolId: 'us-east-1_ayaSovM5b'
  }
};
