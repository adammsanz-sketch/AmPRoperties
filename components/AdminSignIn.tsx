import React, { useState } from 'react';

interface AdminSignInProps {
    onNavigateHome: () => void;
    onNavigateSignUp: () => void;
}

const AdminSignIn: React.FC<AdminSignInProps> = ({ onNavigateHome, onNavigateSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would handle authentication here.
        console.log('Sign in attempt:', { email, password });
        alert('Check the console for sign-in data. This is a demo form.');
    };

  return (
    <div className="min-h-screen bg-hit-light-gray flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <a href="#" onClick={(e) => {e.preventDefault(); onNavigateHome()}} className="text-3xl font-bold text-hit-dark font-heading">
                    HIT PROPERTIES
                </a>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-hit-dark mb-6 font-heading">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-hit-gray">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-hit-red focus:border-hit-red"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-hit-gray">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-hit-red focus:border-hit-red"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-hit-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hit-red transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-hit-gray">
                    Don't have an account?{' '}
                    <a href="#" onClick={(e) => {e.preventDefault(); onNavigateSignUp()}} className="font-medium text-hit-red hover:text-red-500">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    </div>
  );
};

export default AdminSignIn;