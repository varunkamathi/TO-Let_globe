import warehouse from "../../../assets/home/service/warehouse.png";
import pg from "../../../assets/home/service/pg.png";
import flat from "../../../assets/home/service/flat.png";
import house from "../../../assets/home/service/house.png";
import shop from "../../../assets/home/service/shop.png";
import office from "../../../assets/home/service/office.png";

import ServiceCard from "./ServiceCard";

const Service = () => {
  const services = [
    {
      img: pg,
      title: "Paying Guest",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?residential=PG",
      description:
        "Find budget-friendly and convenient paying guest accommodations for a comfortable stay away from home",
    },
    {
      img: flat,
      title: "Flat",
      bg: "bg-[#CCB454]",
      path: "/property-listing?residential=Flat",
      description:
        "Discover a diverse range of apartments for rent, customize to suit your lifestyle and budget",
    },
    {
      img: house,
      title: "House",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?residential=House",
      description:
        "Search for your dream home, available for rent or sale, tailored to your lifestyle and preferences",
    },
    {
      img: shop,
      title: "Shop",
      bg: "bg-[#CCB454]",
      path: "/property-listing?commercial=Shop",
      description:
        "Explore a variety of retail spaces and shops available for lease, ideal for growing your business",
    },
    {
      img: office,
      title: "Office",
      bg: "bg-[#6CC1B6]",
      path: "/property-listing?commercial=Office",
      description:
        "Elevate your workspace and productivity with modern office spaces for rent, designed for success",
    },
    {
      img: warehouse,
      title: "Warehouse",
      bg: "bg-[#CCB454]",
      path: "/property-listing?commercial=Warehouse",
      description:
        "Secure the perfect godown space for rent, offering ample storage and logistics solutions",
    },
  ];

  return (
    <div className="w-full mx-auto max-lg:pt-0 max-lg:mt-0 px-6 sm:px-12 lg:px-20 lg:py-10 bg-black relative ">
      <div className="relative ">
        <h1 className="text-white font-medium text-[96px] leading-[144px] text-left sm:text-left w-full sm:w-[900px] mx-auto lg:absolute lg:w-[403px] lg:h-[107px] lg:left-[40px] lg:top-[117px] lg:whitespace-nowrap lg:text-[clamp(78px,5vw,96px)] max-lg:text-[47.88px] max-lg:text-center max-lg:leading-tight max-lg:mt-0 max-lg:top-0">
          Services
        </h1>

        <p className="text-[#C8A21C] font-[Poppins] font-medium text-[10px] sm:text-[12px] leading-[0px] text-left sm:text-left mt-[4px] w-full sm:w-[400px] mx-auto lg:absolute lg:w-[383px] lg:h-[18px] lg:left-[40px] lg:top-[234px] lg:whitespace-nowrap max-lg:text-[5.99px] max-lg:text-center max-lg:leading-tight max-lg:mb-10">
          SKIP THE MIDDLEMAN: RENT OR LEASE DIRECTLY ON TO-LET GLOBE
        </p>
      </div>

      {/* Mobile View - Add margin below the SKIP THE MIDDLEMAN text */}

      <div className="relative mt-[15px] sm:mt-[0] grid grid-cols-2 gap-x-8 gap-y-6 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:hidden">
        {services.map((service, index) => (
          <div key={index} className="w-full sm:w-[55%] m-0 p-0">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>

      <div className="relative hidden lg:flex justify-center flex-wrap lg:mt-[320px]">
        <div className="flex gap-0.5">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className="w-[277px] h-[280px] lg:w-[277px] lg:h-[280px] md:w-[169.88px] md:h-[126.34px] sm:w-[169.88px] sm:h-[126.34px] lg:m-[36.5px]"
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
        <div className="flex gap-0.5 -mt-8">
          {services.slice(3).map((service, index) => (
            <div
              key={index + 3}
              className="w-[277px] h-[280px] lg:w-[277px] lg:h-[280px] md:w-[169.88px] md:h-[126.34px] sm:w-[169.88px] sm:h-[126.34px] lg:m-[36.5px]"
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
