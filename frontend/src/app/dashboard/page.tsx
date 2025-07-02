'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import PropertyCard from '../components/PropertyCard';
import Image from 'next/image';

interface DecodedToken {
  id: number;
  email?: string;
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        setUserEmail(decoded.email ?? null);
      }
    } catch (err) {
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <>
      {/* HEADER */}
      <header className="relative w-full h-[321px] md:h-[321px] lg:h-[360px] xl:h-[300px] overflow-hidden">
        <Image
        src="/Amaibackground.jpg"
        alt="Amaia Background"
        fill
        priority
        className="object-cover scale-[1.7] object-[80%_40%]"
      />
        <div className="absolute inset-0 bg-white/80 backdrop-brightness-75 pointer-events-none" />
        <div className="absolute z-10 top-[98px] left-[236px] text-left max-w-[671px]">
          <h1 className="text-[28px] sm:text-[32px] md:text-[50px] lg:text-[48px] font-extrabold text-[#1D3461]">
            Amaia Scapes Laguna
          </h1>
          <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[31px] font-extrabold tracking-[0.3em] mt-1 uppercase text-[#007366]">
            Property List
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-[#1D3461] py-10 px-4 relative">
        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          className="absolute top-5 right-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full z-10"
        >
          Logout
        </button>

        {/* Property Cards */}
        <div className="mx-auto w-full max-w-[1061px] space-y-8">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </>
  );
}
