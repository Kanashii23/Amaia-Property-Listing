'use client';
import Image from "next/image";

interface PropertyCardProps {
  type: string;
  model: string;
  location: string;
  area: string;
  price: string;
  availability: string;
}

export default function PropertyCard({
  type,
  model,
  location,
  area,
  price,
  availability,
}: PropertyCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl md:rounded-4xl shadow-md overflow-hidden">
      {/* Scrollable Info Section */}
      <div className="overflow-x-auto">
        <div className="flex min-w-[600px] md:grid md:grid-cols-6 gap-4 p-4 md:p-8 text-sm md:text-base font-medium text-gray-800 text-center">
          <div className="flex-1 min-w-[120px]">
            <p className="font-bold text-black mb-2">Property Type</p>
            <p>{type}</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-bold text-black mb-2">Model</p>
            <p>{model}</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-bold text-black mb-2">Location</p>
            <p>{location}</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-bold text-black mb-2">Area</p>
            <p>{area}</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-bold text-black mb-2">Price</p>
            <p>{price}</p>
          </div>
          <div className="flex-1 min-w-[120px]">
            <p className="font-bold text-black mb-2 text-center">Availability</p>
            <p
              className="text-green-700 text-center whitespace-nowrap leading-tight"
              style={{
                fontSize: 'clamp(10px, 2.5vw, 16px)', // ⬅️ min 10px, max 16px, scales on screen size
              }}
            >
              {availability}
            </p>
          </div>    
        </div>
      </div>

      {/* Footer Section */}
         <div className="bg-[#007366] px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between w-full">

          {/* Left: View Property Map */}
          <div className="flex items-center gap-2 text-white text-sm sm:text-base whitespace-nowrap">
            <Image src="/Vector.svg" alt="Location Icon" width={20} height={20} />
            <span className="truncate">View Property Map</span>
          </div>

          {/* Right: View Details Button */}
          <button className="bg-[#F6BE00] hover:bg-yellow-400 text-black font-bold py-[6px] px-3 sm:px-5 rounded-full text-xs sm:text-sm md:text-base whitespace-nowrap transition">
            View Property Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
