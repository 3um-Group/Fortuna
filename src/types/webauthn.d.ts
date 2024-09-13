// src/types/webauthn.d.ts

// PublicKeyCredentialCreationOptions for registration
interface PublicKeyCredentialCreationOptions {
    challenge: Uint8Array | ArrayBuffer;
    rp: {
      name: string;
      id?: string;
    };
    user: {
      id: Uint8Array;
      name: string;
      displayName: string;
    };
    pubKeyCredParams: Array<{
      type: 'public-key';
      alg: number;
    }>;
    authenticatorSelection?: {
      authenticatorAttachment?: 'platform' | 'cross-platform';
      residentKey?: 'required' | 'preferred' | 'discouraged';
      userVerification?: 'required' | 'preferred' | 'discouraged';
    };
    attestation?: 'none' | 'indirect' | 'direct' | 'enterprise';
    timeout?: number;
    excludeCredentials?: Array<{
      id: Uint8Array;
      type: 'public-key';
    }>;
  }
  
  // PublicKeyCredentialRequestOptions for authentication
  interface PublicKeyCredentialRequestOptions {
    challenge: Uint8Array | ArrayBuffer;
    timeout?: number;
    rpId?: string;
    allowCredentials?: Array<{
      id: Uint8Array;
      type: 'public-key';
      transports?: Array<'usb' | 'nfc' | 'ble' | 'internal'>;
    }>;
    userVerification?: 'required' | 'preferred' | 'discouraged';
  }
  
  // Extend the Credential interface to include public-key credentials
  interface PublicKeyCredential extends Credential {
    rawId: ArrayBuffer;
    response: AuthenticatorAttestationResponse | AuthenticatorAssertionResponse;
    clientExtensionResults: () => AuthenticationExtensionsClientOutputs;
  }
  
  // AuthenticatorAttestationResponse used during registration
  interface AuthenticatorAttestationResponse {
    clientDataJSON: ArrayBuffer;
    attestationObject: ArrayBuffer;
  }
  
  // AuthenticatorAssertionResponse used during authentication
  interface AuthenticatorAssertionResponse {
    clientDataJSON: ArrayBuffer;
    authenticatorData: ArrayBuffer;
    signature: ArrayBuffer;
    userHandle?: ArrayBuffer;
  }
  
  // Exported types for use in other parts of the application
  export {
    PublicKeyCredentialCreationOptions,
    PublicKeyCredentialRequestOptions,
    PublicKeyCredential,
    AuthenticatorAttestationResponse,
    AuthenticatorAssertionResponse,
  };
  