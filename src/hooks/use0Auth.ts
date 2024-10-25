// hooks/useOAuth.ts
import { useState, useEffect } from 'react';
import { getTestGroup } from '../utils/testGroups';
import { oauthConfigs } from '../config/oauth';

export const useOAuth = () => {
  const [config, setConfig] = useState<OAuthConfig>();
  const [testGroup, setTestGroup] = useState<TestGroup>();

  useEffect(() => {
    const group = getTestGroup();
    setTestGroup(group);
    setConfig(oauthConfigs[group]);
  }, []);

  const login = async () => {
    if (!config) return;

    // TODO: Track analytics for test group
    // analytics.track('oauth_login_started', { testGroup });

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scope.join(' '),
      state: crypto.randomUUID()
    });

    // Store state for CSRF protection
    sessionStorage.setItem('oauth_state', params.get('state')!);
    window.location.href = `${config.authEndpoint}?${params.toString()}`;
  };

  return { login, config, testGroup };

};