import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FormFieldWithLabel } from '@3um-group/atomic-sdk';

const Signup = () => {
  const { loginWithRedirect } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveToLocalStorage = async (userData: typeof formData) => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        company: userData.company,
        theme: 'light',
        lastLogin: new Date().toISOString()
      }));

      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_USER_DATA',
          payload: userData
        });
      }
    } catch (err) {
      console.error('Error saving to local storage:', err);
    }
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!formData.firstName) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName) {
      setError('Last name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      await saveToLocalStorage(formData);
      
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
        },
        appState: {
          returnTo: '/dashboard',
          metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company
          }
        }
      });
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormFieldWithLabel
          id={''}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
        />

        <FormFieldWithLabel
          id={''}
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="••••••••"
        />

        <FormFieldWithLabel
          id={''}
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="John"
        />

        <FormFieldWithLabel
          id={''}
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Doe"
        />

        <FormFieldWithLabel
          id={''}
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Company Name (Optional)"
        />

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <button 
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-lg"></span>
              Creating Account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;