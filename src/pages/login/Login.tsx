import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LineChart, ArrowRight } from 'lucide-react';
import { Card, Input, Button } from '../../components';
import { generateAuthCode, saveAuthCode } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate and save auth code
      const authCode = generateAuthCode();
      saveAuthCode(authCode);
      
      // Redirect to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#1a1b1e]">
      <div className="w-full max-w-[min(400px,90%)] mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 neu-convex rounded-2xl mb-3 sm:mb-4 transform hover:scale-105 transition-transform duration-200">
            <LineChart className="h-8 w-8 sm:h-10 sm:w-10 text-gray-200" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2">TradePro</h1>
          <p className="text-sm sm:text-base text-gray-400">Welcome back! Please login to continue.</p>
        </div>

        {/* Login Form */}
        <Card variant="convex" className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <Input
              label="Email"
              type="email"
              icon={User}
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />

            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                size="md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-200 border-t-transparent" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;