import logo from '../assets/images/platform.jpg';

const PlatformIntroduction = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-lg overflow-hidden md:flex">
        {/* Text */}
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-200 mb-6 pb-4 border-b border-gray-700">
            Platform Introduction
          </h1>
          <div className="text-gray-300 space-y-4">
            <p>
              LWEX Exchange Global Professional Station, an innovative digital asset trading platform 
              serving global professional trading users, is committed to discovering high-quality 
              innovative digital asset investment opportunities. Currently, it provides more than 40 
              digital asset product trading and investment services. Headquartered in the United States, 
              it is operated by the LWEX Exchange global professional station team.
            </p>
            <p>
              LWEX Exchange is the world's leading blockchain asset financial service provider. It has 
              provided high-quality services to millions of users from more than 130 countries around 
              the world. We have independent offices in Singapore, South Korea, Hong Kong, and other 
              countries and regions. Transaction business and operations center.
            </p>
            <p>
              LWEX Exchange and its sub-brands are in a leading position in the world in terms of 
              technology platforms, product lines, security risk control systems, operations and 
              customer service systems.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={logo}
            alt="Platform overview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformIntroduction;
