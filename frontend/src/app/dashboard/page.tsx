'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import PropertyCard from '../components/PropertyCard';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface DecodedToken {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  exp: number;
  iat: number;
}

const properties = [
  { type: 'Amaia Laguna', model: 'Aria', location: 'Laguna', area: '50sqm', price: '2.2 M', availability: 'Ready for Occupancy' },
  { type: 'Amaia Steps', model: 'Breeze', location: 'Cavite', area: '45sqm', price: '1.8 M', availability: 'Pre-Selling' },
  { type: 'Amaia Skies', model: 'Cloud', location: 'Manila', area: '60sqm', price: '3.1 M', availability: 'Ready for Occupancy' },
  { type: 'Amaia Series', model: 'Luxe', location: 'Quezon City', area: '55sqm', price: '2.5 M', availability: 'Few Units Left' },
  { type: 'Amaia Scapes', model: 'Duo', location: 'Batangas', area: '52sqm', price: '2.0 M', availability: 'Available' },
  { type: 'Amaia Homes', model: 'Solo', location: 'Pampanga', area: '48sqm', price: '1.9 M', availability: 'Pre-Selling' },
];

export default function Dashboard() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        setUserInfo({
          firstName: decoded.firstName ?? '',
          lastName: decoded.lastName ?? '',
        });
      }
    } catch (err) {
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleToggleArrow = () => {
    setShowLogout(false); // Hide logout when collapsing
    setShowName((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return null;

  return (
    <>
      {/* HEADER */}
      <header className="relative w-full h-[160px] sm:h-[300px] lg:h-[360px] overflow-hidden">
        <Image
          src="/Amaibackground.jpg"
          alt="Amaia Background"
          fill
          priority
          className="object-cover scale-[2.1] sm:scale-[1.7] object-[80%_40%]"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-brightness-75 pointer-events-none" />

       {/* Title */}
        <div className="absolute z-10 top-[80px] w-full px-4 text-center sm:text-left sm:w-auto sm:left-[236px] max-w-[671px] mx-auto">
          <h1 className="text-[22px] sm:text-[28px] md:text-[50px] font-extrabold text-[#1D3461]">
            Amaia Scapes Laguna
          </h1>
          <p className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[28px] font-extrabold tracking-[0.2em] mt-1 uppercase text-[#007366]">
            Property List
          </p>
        </div>


        {/* Arrow + Name + Logout */}
        {userInfo && (
          <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-2">
            {/* Arrow Toggle */}
            <button
              onClick={handleToggleArrow}
              className="bg-white border border-[#007366] text-[#007366] px-3 py-1 rounded-full text-sm hover:bg-[#007366] hover:text-white transition"
            >
              {showName ? '<' : '>'}
            </button>

            {/* Animate Name */}
            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  {/* Name Box */}
                  <button
                    onClick={() => setShowLogout((prev) => !prev)}
                    className="bg-white border border-[#007366] text-[#007366] font-semibold px-4 py-2 rounded-md shadow hover:bg-[#007366] hover:text-white transition text-sm sm:text-base w-full"
                  >
                    {userInfo.firstName} {userInfo.lastName}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animate Logout Box */}
            <AnimatePresence>
              {showLogout && showName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <button
                    onClick={handleLogout}
                    className="bg-white border border-[#ff4d4d] text-[#ff4d4d] hover:bg-[#ff4d4d] hover:text-white font-semibold px-4 py-2 rounded-md shadow transition text-sm sm:text-base w-full"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="min-h-screen bg-[#1D3461] py-10 px-4 sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1061px] space-y-8 mt-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </main>
    </>
  );
}
