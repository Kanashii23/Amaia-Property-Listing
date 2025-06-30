import Image from "next/image";
import { Montserrat } from "next/font/google";
import PropertyCard from "./PropertyCard";

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif', 'Montserrat'],
});

const properties = [
  {
    type: "Amaia Laguna",
    model: "Aria",
    location: "Laguna",
    area: "50sqm",
    price: "2.2 M",
    availability: "Ready for Occupancy",
  },
  {
    type: "Amaia Steps",
    model: "Breeze",
    location: "Cavite",
    area: "45sqm",
    price: "1.8 M",
    availability: "Pre-Selling",
  },
  {
    type: "Amaia Skies",
    model: "Cloud",
    location: "Manila",
    area: "60sqm",
    price: "3.1 M",
    availability: "Ready for Occupancy",
  },
  {
    type: "Amaia Series",
    model: "Luxe",
    location: "Quezon City",
    area: "55sqm",
    price: "2.5 M",
    availability: "Few Units Left",
  },
  {
    type: "Amaia Scapes",
    model: "Duo",
    location: "Batangas",
    area: "52sqm",
    price: "2.0 M",
    availability: "Available",
  },
  {
    type: "Amaia Homes",
    model: "Solo",
    location: "Pampanga",
    area: "48sqm",
    price: "1.9 M",
    availability: "Pre-Selling",
  },
];

export default function Header() {
  return (
    <>
      <header className="relative w-full h-[321px] md:h-[321px] lg:h-[360px] xl:h-[300px] overflow-hidden">
         <Image
            src="/AmaiBackground.jpg"
            alt="Background"
            fill
            priority
            className="object-cover scale-[1.7] object-[80%_40%]"
          />
         {/* For white picture */}
        <div className="absolute inset-0 bg-white/80 backdrop-brightness-75 pointer-events-none" /> 
       

        <div className="absolute z-10 top-[98px] left-[236px] text-left max-w-[671px]">
          <h1 className="text-[28px] sm:text-[32px] md:text-[50px] lg:text-[48px] font-extrabold" style={{ color: "#1D3461" }}>
            Amaia Scapes Laguna
          </h1>
          <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[31px] font-extrabold tracking-[0.3em] mt-1 uppercase" style={{ color: "#007366" }}>
            Property List
          </p>
        </div>
      </header>

      {/* BLUE BACKGROUND starts here */}
      <div className="relative bg-[#1D3461] pt-20 pb-10 px-4">
      <div className="mx-auto w-full max-w-[1061px] space-y-8">
    {properties.map((property, index) => (
      <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
    </>
  );
}