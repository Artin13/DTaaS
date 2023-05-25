import { useState, useEffect, } from 'react';
import { getClientID, getAuthority, getURLforLIB } from '../envUtil';

export interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  post_logout_redirect_uri: string;
  automaticSilentRenew: boolean;
  loadUserInfo: boolean;
}

export const useOidcConfig = (): OidcConfig | null => {
  const [oidcConfig, setOidcConfig] = useState<OidcConfig | null>(null);

  useEffect(() => {
      const CLIENT_ID = getClientID() ?? '';
      const AUTH_AUTHORITY = getAuthority() ?? '';
      const LIB_URL = getURLforLIB() ?? '';

      const config: OidcConfig = {
        authority: AUTH_AUTHORITY.toString(),
        client_id: CLIENT_ID.toString(),
        redirect_uri: 'http://localhost:4000/library/',
        response_type: 'code',
        scope: 'openid profile read_user',
        post_logout_redirect_uri: LIB_URL.toString(),
        automaticSilentRenew: false,
        loadUserInfo: true,
      };
      setOidcConfig(config);
  }, []);

  return oidcConfig;
};


