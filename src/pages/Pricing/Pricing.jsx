import React, { useState } from "react";
import { plans } from "../../constant/index.js"; // Adjust the path as needed

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    stayingWith: "",
    profession: "",
    dateOfVisit: "",
    timeSlot: "",
  });

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedPlan(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      stayingWith: "",
      profession: "",
      dateOfVisit: "",
      timeSlot: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", {
      plan: selectedPlan,
      ...formData,
    });

    alert("Subscription form submitted successfully!");
    handleCancel();
  };

  return (
    <div className="min-h-screen bg- text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Find your ideal property with our flexible subscription options.
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

              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

       {/* Modal */}
{showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-4xl relative text-black">
      <button
        onClick={handleCancel}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
      >
        &times;
      </button>
      <h2 className="text-2xl text-white font-bold mb-6">{selectedPlan?.title} Subscription</h2>
      
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-white">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            placeholder="Email ID"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            placeholder="Phone Number"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Staying with</label>
          <select
            name="stayingWith"
            value={formData.stayingWith}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            required
          >
            <option value="">Select option</option>
            <option>Friends</option>
            <option>Family</option>
            <option>Alone</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-white">Profession</label>
          <select
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            required
          >
            <option value="">Select profession</option>
            <option>Student</option>
            <option>Working Professional</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-white">Date of Visit</label>
          <input
            type="date"
            name="dateOfVisit"
            value={formData.dateOfVisit}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-white">Time Slot</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-white"
            required
          > 
            <option value="">Select time slot</option>
            <option>10:00 AM - 12:00 PM</option>
            <option>12:00 PM - 2:00 PM</option>
            <option>2:00 PM - 4:00 PM</option>
            <option>4:00 PM - 6:00 PM</option>
          </select>
        </div>

        {/* Full-width Submit + Cancel buttons */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
          >
            {selectedPlan?.buttonText || "Get Started"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Pricing;
