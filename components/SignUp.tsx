import React, { useState } from 'react';

interface SignUpProps {
    onNavigateHome: () => void;
    onNavigateSignIn: () => void;
    onSignUp: (name: string, email: string, password: string) => { success: boolean, message: string };
}

const SignUp: React.FC<SignUpProps> = ({ onNavigateHome, onNavigateSignIn, onSignUp }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        const result = onSignUp(name, email, password);

        if (result.success) {
            setSuccessMessage(result.message);
            // Navigate to sign in after a short delay to let user read the message
            setTimeout(() => {
                onNavigateSignIn();
            }, 2000);
        } else {
            setError(result.message);
        }
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
                <h2 className="text-2xl font-bold text-center text-hit-dark mb-6 font-heading">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {successMessage && (
                         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{successMessage}</span>
                        </div>
                    )}
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-hit-gray">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-hit-red focus:border-hit-red"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-signup" className="block text-sm font-medium text-hit-gray">
                            Email Address
                        </label>
                        <input
                            id="email-signup"
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
                        <label htmlFor="password-signup"className="block text-sm font-medium text-hit-gray">
                            Password
                        </label>
                        <input
                            id="password-signup"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-hit-red focus:border-hit-red"
                            placeholder="••••••••"
                        />
                    </div>
                     <div>
                        <label htmlFor="confirm-password"className="block text-sm font-medium text-hit-gray">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-hit-red focus:border-hit-red"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-hit-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hit-red transition-colors mt-4"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-hit-gray">
                    Already have an account?{' '}
                    <a href="#" onClick={(e) => {e.preventDefault(); onNavigateSignIn()}} className="font-medium text-hit-red hover:text-red-500">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    </div>
  );
};

export default SignUp;