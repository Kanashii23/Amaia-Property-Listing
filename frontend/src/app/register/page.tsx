'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const getEmail = () => `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !password || !confirm) {
      return setError('Please fill in all fields.');
    }

    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    if (password.length < 8) {
      return setError('Password should be at least 8 characters.');
    }

    try {
      const email = getEmail();
      const res = await fetch('http://localhost:3000/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, confirmPassword: confirm }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#007E66] px-4 sm:px-6 lg:px-8 ${montserrat.className}`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-md w-full space-y-5"
      >
        {/* Matchmo Logo */}
        <div className="flex justify-center">
          <Image src="/Matchmo.png" alt="Matchmo Logo" width={120} height={50} priority />
        </div>

        <h2 className="text-2xl font-bold text-[#009879] text-center">Create Account</h2>

        <div>
          <label className="text-sm font-semibold text-gray-700">First Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
              placeholder-gray-300 text-black focus:outline-none focus:ring-0 focus:border-gray-400"
            placeholder="Juan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Last Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
              placeholder-gray-300 text-black focus:outline-none focus:ring-0 focus:border-gray-400"
            placeholder="Dela Cruz"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
              placeholder="Password"
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

        <div>
          <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
          <input
            type={showPass ? 'text' : 'password'}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm 
              placeholder-gray-300 text-black focus:outline-none focus:ring-0 focus:border-gray-400"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#009879] text-white font-bold py-2 rounded-full hover:bg-[#007E66] transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#009879] font-semibold underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
