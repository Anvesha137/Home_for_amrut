import { SignInButton, SignUpButton, SignedOut } from '@clerk/clerk-react';
import { Button } from './ui/button';

export function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-rose-900 p-6 text-center">
          <div className="text-4xl mb-2">🌾</div>
          <h1 className="text-2xl font-bold text-white">Home for Amrut</h1>
          <p className="text-rose-200 mt-1">Premium Makhana Experience</p>
        </div>
        
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Our Store</h2>
            <p className="text-gray-600 mt-2">
              Sign in to access your account and explore our premium makhana collection
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <SignedOut>
              <div className="flex flex-col gap-4">
                <SignInButton mode="modal">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6 text-lg">
                    Sign In
                  </Button>
                </SignInButton>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>
                
                <SignUpButton mode="modal">
                  <Button 
                    variant="outline" 
                    className="w-full border-rose-300 text-rose-700 hover:bg-rose-50 py-6 text-lg"
                  >
                    Create Account
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{' '}
              <a href="#" className="text-rose-600 hover:text-rose-800">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-rose-600 hover:text-rose-800">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}