import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Helper to get cookies since js-cookie is not installed
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// For Protected Pages (Dashboard, Profile, etc.)
export const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = getCookie('token'); 
      if (!token) {
        // If not logged in, redirect to sign-up
        router.replace('/sign-up');
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    // Show a loading state or nothing while checking
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

// For Auth Pages (Sign-Up, Login)
export const withoutAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const token = getCookie('token'); 
      if (token) {
        // If already logged in, redirect to dashboard
        router.replace('/dashboard');
      } else {
        setIsChecking(false);
      }
    }, [router]);

    if (isChecking) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
