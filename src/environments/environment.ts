export const environment = {
  production: false,
  apiUrl: 'https://ll24ffjgfl.execute-api.us-east-1.amazonaws.com',
  auth: {
    // Propiedades oidc-client
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ayaSovM5b',
    clientId: '5horhs63js18skpcdjpnldrjvp',
    redirectUrl: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    logoutUrl: 'https://us-east-1ayasovm5b.auth.us-east-1.amazoncognito.com/logout',
    scope: 'email openid phone',
    
    // Propiedades Amazon Cognito SDK
    region: 'us-east-1',
    userPoolId: 'us-east-1_ayaSovM5b'
  }
};
