import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeaveForm() {
  const registerSuggestions = async (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    const response = await fetch("http://localhost:3000/api/leave/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({student: student._id, hostel: student.hostel, title, description: desc}),
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Suggestion registered successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    } else {
      toast.error("Suggestion registration failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    }
  };



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [type, setType] = useState("Personal");

  const types = ["Personal", "Medical", "Emergency", "Festival", "Others"];

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }
  function handlestartChange(e) {
    setLeaveDate(e.target.value);
  }
  function handleendChange(e) {
    setReturnDate(e.target.value);
  }
  function chngType(e) {
    setType(e.target.value);
  }

  const formTitle = {
    name: "Purpose of Leave",
    placeholder: "Reason",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  const startDate = {
    name: "leaving date",
    placeholder: "",
    req: true,
    type: "date",
    value: leaveDate,
    onChange: handlestartChange,
  };

  const endDate = {
    name: "return date",
    placeholder: "",
    req: true,
    type: "date",
    value: returnDate,
    onChange: handleendChange,
  };

  const leaveType = {
    name: "Leave type",
    placeholder: "Type...",
    req: true,
    type: "text",
    value: type,
    onChange: chngType,
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center max-h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-5xl mt-5">Leave Form</h1>
      <form
        method="POST"
        onSubmit={registerSuggestions}
        className="md:w-[30vw] w-full py-5 pb-7 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <Input field={formTitle} />
        <div>
        {/* <label
            htmlFor="suggestion"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Leave description
        </label>
          <textarea
            name="suggestion"
            placeholder="Description..."
            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={descChange}
            value={desc}
          ></textarea> */}


            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Leave type
            </label>
            <select
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
              onChange={chngType}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {type.toLowerCase() === "personal" ||
            type.toLowerCase() === "medical" ||
            type.toLowerCase() === "emergency" ||
            type.toLowerCase() === "festival" ? (
              <></>
            ) : (
              <div className="mt-5">
                <Input field={leaveType} />
              </div>
            )}

          <Input field={startDate} />
          <Input field={endDate} />

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />
    </div>
  );
}

export default LeaveForm;
