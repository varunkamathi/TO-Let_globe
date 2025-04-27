import React from "react";
import { plans } from "../../constant/index.js"; // Adjust the path based on your folder structure

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Find your ideal property with our flexible subscription options.
          Whether you're looking for a free experience or premium support, we've
          got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-[#1a1f2e] rounded-2xl p-8 relative">
              {plan.badge && (
                <div className={plan.badgeStyle}>{plan.badge}</div>
              )}
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                <span className="text-gray-400 ml-1">{plan.period}</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <ul className="space-y-4 mb-8 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src={feature.icon}
                      alt="icon"
                      className="w-5 h-5 text-green-500 mr-3"
                    />
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
