import { toast } from "react-toastify";
import { BASE_URL } from "../../../config/constant";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";

import Popup from "reactjs-popup";

import { API } from "../../../config/axios";

export default function MyProperties({ favouriteList = [] }) {
  const [myProperties, setMyProperties] = useState([]);
  const [localFavouriteList, setLocalFavouriteList] = useState(favouriteList);

  const [showOption, setShowOption] = useState(null);
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const toggleOption = (id) => {
    setShowOption((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const response = await API.get(
          `property/user/${authState.userData.id}`
        );
        const properties = response.data;
        // return response.data;
        setMyProperties(properties);
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    };
    fetchMyProperties();
  }, [authState]);

  const addToFavourites = async (propertyId) => {
    try {
      if (!authState?.userData?.id) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      console.log(authState.userData.id);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "user/addToFavourites",
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLocalFavouriteList((prevList) => {
          const updatedList = [...prevList, propertyId];

          setTimeout(() => toast.success("Added to favorites!"), 300); // Delay toast
          return updatedList;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to favorites");
    }
  };

  const removeFromFavourites = async (propertyId) => {
    try {
      if (!authState?.userData?.id) {
        toast.error("Login First!");
        return navigate("/login", { replace: true });
      }

      const token = localStorage.getItem("token");

      const response = await API.post(
        "user/removeFromFavourites",
        {
          userId: authState.userData.id,
          propertyId: propertyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLocalFavouriteList((prevList) =>
          prevList.filter((id) => id !== propertyId)
        );
        setTimeout(() => toast.success("Removed from favorites!"), 100);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from favorites");
    }
  };

  // share icons functionality
  const shareProperty = async (slug) => {
    const propertyUrl = `${window.location.origin}/property/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          url: propertyUrl,
        });
      } catch (error) {
        console.error("Error sahring ", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(propertyUrl);
        toast.success("Proprty link is coppied to your clipboard", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } catch (error) {
        console.error("Failed to copy ", error);
        toast.error("Failed to copy link", { theme: "dark" });
      }
    }
  };
  // Add Edit button and handleEdit function
  const handleEdit = (property) => {
    navigate(`/landlord-dashboard/edit-properties/${property._id}`);
  };

  // Handle Delete function
  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await fetch(`${BASE_URL}property/${propertyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete property");
      }

      toast.success("Property deleted successfully!");
      setMyProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const cards = myProperties.map((property) => (
    <div
      key={property._id}
      className=" bg-black p-4 rounded-md hover:cursor-pointer relative"
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt="Property"
          className="relative h-[200px] w-full object-cover rounded-md mb-4"
          onClick={() => navigate(`/property/${property.slug}`)}
        />
        <div
          className="absolute top-4 left-4 text-white/75 lg:text-white text-xs lg:text-base uppercase px-1 lg:px-3 py-1 rounded-md"
          style={{
            backgroundColor:
              property.availabilityStatus === "Available"
                ? "#236b62"
                : "#c71221",
            textTransform: "capitalize",
          }}
        >
          {property.availabilityStatus}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {property?.firstName} {property?.lastName}
        </h3>
        <div className="icon-box flex items-center justify-center">
          {/* Add to Favorite */}

          <Popup
            trigger={
              <button
                onClick={(e) => {
                  e.preventDefault();
                  localFavouriteList.includes(property._id)
                    ? removeFromFavourites(property._id)
                    : addToFavourites(property._id);
                }}
                className="group relative flex items-center justify-center p-1"
              >
                {localFavouriteList.includes(property._id) ? (
                  <FaHeart className="text-red-500 transition-all duration-300 group-hover:scale-110" />
                ) : (
                  <CiHeart className="text-red-500 transition-all duration-300 group-hover:text-red-800 group-hover:scale-110 bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px]" />
                )}
              </button>
            }
            position="top center"
            on="hover"
            arrow={true}
          >
            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
              {localFavouriteList.includes(property._id)
                ? "Remove from Favorite"
                : "Add to Favorite"}
            </div>
          </Popup>

          {/* SHARE PROPERTY ICON WITH FUNCTIONALITY */}
          <a
            href="#"
            className="relative"
            style={{ width: "25px", height: "25px", left: "8px" }}
            onClick={(event) => {
              event.preventDefault();
              shareProperty(property.slug);
            }}
          >
            <CiShare2
              className="card_icon bg-[#3E3E3E4D] mt-1 h-[20px] w-[20px] p-[3px]"
              style={{ color: "#40B5A8" }}
            />
          </a>

          {/* new code */}
          <div className="relative ml-[10px] ">
            {/* More Options (Three Dots) */}
            <button
              onClick={() => toggleOption(property._id)}
              className="p-1 rounded-md"
            >
              <MdMoreVert className="bg-[#3E3E3E4D] h-[20px] w-[20px] p-[3px] mt-1" />
            </button>
            {/* Dropdown Menu */}
            {showOption === property._id && (
              <div className="absolute right-0 mt-2 w-20 bg-white shadow-md rounded-md text-black overflow-hidden">
                <button
                  onClick={() => handleEdit(property)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property._id)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-gray-400">
        {property.locality}, {property.city}, India
      </p>
      <p className="text-gray-400 mt-1">Rs. {property.rent}</p>
    </div>
  ));

  return (
    <>
      <div className="mt-8">
        <h1 className="ml-4 text-3xl font-bold text-[#FFFFFF]">
          Your Properties
        </h1>
        {myProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards}
          </div>
        ) : (
          <div>
            <h6 className="text-white text-center text-3xl font-bold ">
              Your Properties!
            </h6>
            <h6 className="text-gray-400 text-center text-xl sm:text-3xl font-bold py-4">
              You have no properties yet!
            </h6>
          </div>
        )}
      </div>
    </>
  );
}
