import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

function Leave() {
  const getSuggestions = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const response = await fetch("http://localhost:3000/api/suggestion/hostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostel._id }),
    });

    const data = await response.json();
    if (data.success) {
      setSuggestions(data.suggestions.filter((suggestion) => suggestion.status === "pending"));

    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const updateSuggestion = async (id) => {
    setLoader(true);
    const response = await fetch("http://localhost:3000/api/suggestion/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id,  status: "approved"}),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("Suggestion Approved", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      getSuggestions();
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    setLoader(false);
  };

  const [loader, setLoader] = useState(false)
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const toggleModal = (suggestion = {}) => {
    setModalData(suggestion);
    setShowModal((showModal) => !showModal);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Leave</h1>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[450px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Students</span>
        
      </div>
    </div>
  );
}

export default Leave;
