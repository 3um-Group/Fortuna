export const oauthConfigs: Record<TestGroup, OAuthConfig> = {
    control: {
        clientId: process.env.REACT_APP_OAUTH_CLIENT_ID_CONTROL!,
        clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET_CONTROL!,
        redirectUri: `${window.location.origin}/auth/callback`,
        scope: ['email', 'profile'],
        authEndpoint: 'https://auth.example.com/authorize',
        tokenEndpoint: 'https://auth.example.com/token'
    },
    variant: {
        clientId: process.env.REACT_APP_OAUTH_CLIENT_ID_VARIANT!,
        clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET_VARIANT!,
        redirectUri: `${window.location.origin}/auth/callback`,
        scope: ['email', 'profile', 'additional_scope'],
        authEndpoint: 'https://auth-beta.example.com/authorize',
        tokenEndpoint: 'https://auth-beta.example.com/token'
    }
};