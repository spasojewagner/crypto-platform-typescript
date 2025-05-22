import React from 'react';
import { IoShieldCheckmark } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ServicesSection: React.FC = () => {
    const services: Service[] = [
        {
          id: 1,
          title: 'Security Guarantee',
          description:
            'Your assets are protected with industry-leading encryption and continuous monitoring to ensure maximum safety.',
          icon: <IoShieldCheckmark className="w-6 h-6 text-white" />
        },
        {
          id: 2,
          title: 'Powerful Search',
          description:
            'Quickly find the best trading opportunities with our real-time, advanced search and filtering tools.',
          icon: <FaSearch className="w-6 h-6 text-white" />
        },
        {
          id: 3,
          title: '24/7 Support',
          description:
            'Our dedicated customer care team is available around the clock to help you with any questions or issues.',
          icon: <FaHeart className="w-6 h-6 text-white" />
        }
      ];
  return (
    <section className=" text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">
            Services that we continue to improve
          </h2>
          <p className="text-lg mb-6">
            The best choice for buying and selling your crypto assets, with the various super friendly services we offer
          </p>
          <a
            href="#"
            className="inline-block text-indigo-400 hover:text-indigo-300 font-medium px-4 border-2 rounded-2xl w-45 p-3"
          >
            LET&apos;S GET STARTED
          </a>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-start bg-zinc-900 p-6 rounded-2xl shadow-md"
            >
              <div className="flex-none bg-indigo-600 rounded-full p-4 mr-4">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300  font-semibold ">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
