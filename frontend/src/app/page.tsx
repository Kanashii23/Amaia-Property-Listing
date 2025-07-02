'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // 👈 Redirects to login page on load
  }, [router]);

  return null; // Nothing is shown; instant redirect
}
