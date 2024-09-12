import React, { createContext, useState, useContext, ReactNode } from 'react';
import { completeAuthentication, completeRegistration, startAuthentication, startRegistration } from 'src/api/webauthn';
import { PublicKeyCredentialCreationOptions, PublicKeyCredentialRequestOptions, PublicKeyCredential } from 'src/types/webauthn';

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
  register: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility to convert base64 to Uint8Array
const base64ToUint8Array = (base64String: string): Uint8Array => {
  const decodedString = atob(base64String);
  const bytes = new Uint8Array(decodedString.length);
  for (let i = 0; i < decodedString.length; i++) {
    bytes[i] = decodedString.charCodeAt(i);
  }
  return bytes;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Register function
  const register = async () => {
    try {
      const registrationOptions: PublicKeyCredentialCreationOptions = await startRegistration();

      if (!navigator.credentials) {
        throw new Error('WebAuthn is not supported in this browser.');
      }

      const credential = await navigator.credentials.create({ publicKey: registrationOptions });

      if (credential) {
        await completeRegistration(credential as PublicKeyCredential);
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  // Updated authenticate function
  const authenticate = async () => {
    try {
      // Start authentication process
      const authenticationOptions: PublicKeyCredentialRequestOptions = await startAuthentication();

      // Convert challenge from base64 to Uint8Array
      authenticationOptions.challenge = base64ToUint8Array(authenticationOptions.challenge as unknown as string);

      if (!navigator.credentials) {
        throw new Error('WebAuthn is not supported in this browser.');
      }

      // Start WebAuthn authentication
      const assertion = await navigator.credentials.get({ publicKey: authenticationOptions });

      if (assertion) {
        const response = await completeAuthentication(assertion as PublicKeyCredential);
        setIsAuthenticated(response.success);
      } else {
        throw new Error('Authentication failed. Please try again.');
      }

    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
