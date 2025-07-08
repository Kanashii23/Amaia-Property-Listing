'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import jwtDecode from 'jwt-decode'; 
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

interface DecodedToken {
  id: number;
  email?: string;
  exp: number;
  iat: number;
}

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  // ✅ Redirect if token already valid
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          router.push('/dashboard');
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch {
      setError('Network error.');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-[#007E66] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md space-y-5"
      >
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Image
            src="/Matchmo.png"
            alt="Matchmo Logo"
            width={160}
            height={40}
            className="mx-auto"
          />
          <h2 className={`text-xl sm:text-2xl font-bold text-[#009879] ${montserrat.className}`}>
            Welcome Back
          </h2>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
            placeholder-gray-300 text-black focus:outline-none focus:ring-0 focus:border-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
              placeholder-gray-300 text-black focus:outline-none focus:ring-0 focus:border-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-xs text-[#009879] font-semibold"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#009879] text-white font-bold py-2 rounded-full hover:bg-[#00a88c] transition"
        >
          Login
        </button>

        {/*  Navigation */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#009879] font-semibold underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
