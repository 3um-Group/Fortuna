type OAuthConfig = {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scope: string[];
    authEndpoint: string;
    tokenEndpoint: string;
  };
type TestGroup = 'control' | 'variant';