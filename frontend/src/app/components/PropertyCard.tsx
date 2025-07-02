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
    <div className="w-full bg-white rounded-4xl shadow-md overflow-hidden">
      <div className="p-8 grid grid-cols-6 text-sm md:text-base font-medium text-gray-800">
        <div className = "text-center">
          <p className="font-bold text-black-500 mb-8">Property Type</p>
          <p>{type}</p>
        </div>
        <div className = "text-center">
          <p className="font-bold text-black-500 mb-8">Model</p>
          <p>{model}</p>
        </div>
        <div className = "text-center">
          <p className="font-bold text-black-500 mb-8">Location</p>
          <p>{location}</p>
        </div>
        <div className = "text-center">
          <p className="font-bold text-black-500 mb-8">Area</p>
          <p>{area}</p>
        </div>
        <div className = "text-center">
          <p className="font-bold text-black-500 mb-8">Price</p>
          <p>{price}</p>
        </div>
        <div className = "text-center">
          <p className="font-bold text-black-500 mb-8">Availability</p>
          <p className="text-green-700 font">{availability}</p>
        </div>
      </div>

      <div className="bg-[#007366] flex justify-between items-center px-6 py-2">
        <div className="flex items-center text-white gap-4 text-sm md:text-base font ml-10">
          <Image src="/Vector.svg" alt="Location Icon" width={25} height={20} />
          <span className="text-white">View Property Map</span>
        </div>
        <button className="bg-[#F6BE00] hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full text-sm md:text-23 mr-[20px]">
          View Property Full Details
        </button>
      </div>
    </div>
  );
}
