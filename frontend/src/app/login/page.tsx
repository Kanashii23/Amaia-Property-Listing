'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
//for login
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
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#007E66] px-4">
      <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-5"
        >
          {/* 🔷 Logo + Welcome Back with tighter spacing */}
          <div className="space-y-2 text-center">
            <Image
              src="/Matchmo.png"
              alt="Matchmo Logo"
              width={180}
              height={40}
              priority
              className="mx-auto"
            />
            <h2 className={`text-2xl font-bold text-[#009879] ${montserrat.className}`}>
              Welcome Back
            </h2>
          </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
             placeholder-gray-300 text-black focus:outline-none focus:ring-0 focus:border-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
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


        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#009879] text-white font-bold py-2 rounded-full hover:bg-[#007E66] transition"
        >
          Login
        </button>

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
