import { PublicKeyCredentialCreationOptions, PublicKeyCredential } from 'src/types/webauthn';

export const startRegistration = async (): Promise<PublicKeyCredentialCreationOptions> => {
  const response = await fetch('/api/webauthn/register/challenge', {
    method: 'POST',
    credentials: 'include'
  });
  return await response.json();
};

export const completeRegistration = async (credential: PublicKeyCredential) => {
  const response = await fetch('/api/webauthn/register', {
    method: 'POST',
    body: JSON.stringify(credential),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
};

export const startAuthentication = async (): Promise<PublicKeyCredentialCreationOptions> => {
  const response = await fetch('/api/webauthn/authenticate/challenge', {
    method: 'POST',
    credentials: 'include'
  });
  return await response.json();
};

export const completeAuthentication = async (assertion: PublicKeyCredential) => {
  const response = await fetch('/api/webauthn/authenticate', {
    method: 'POST',
    body: JSON.stringify(assertion),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
};
