import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomRequests() {
  const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchRequests = async () => {
    const response = await fetch("http://localhost:3000/api/roomallocation/pending", {
      method: "GET",
    });
    const data = await response.json();

    if (data.success) {
      setRequests(data.requests);
    } else {
      toast.error("Failed to fetch requests.");
    }
  };

  const handleApprove = async (id) => {
    const response = await fetch(`http://localhost:3000/api/roomallocation/approve/${id}`, {
      method: "POST",
    });
    const data = await response.json();

    if (data.success) {
      toast.success("Request approved!");
      setApproved([...approved, id]);
      setRequests(requests.filter((r) => r._id !== id));
    } else {
      toast.error("Approval failed!");
    }
  };

  const handleReject = async (id) => {
    const response = await fetch(`http://localhost:3000/api/roomallocation/reject/${id}`, {
      method: "POST",
    });
    const data = await response.json();

    if (data.success) {
      toast.success("Request rejected.");
      setRejected([...rejected, id]);
      setRequests(requests.filter((r) => r._id !== id));
    } else {
      toast.error("Rejection failed!");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-10 pt-32 items-center justify-start overflow-auto">
      <h1 className="text-black dark:text-white font-bold text-5xl">
        Room Allocation Requests
      </h1>

      <div className="w-full max-w-4xl bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl overflow-auto">
        {requests.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No pending requests.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {requests.map((req) => (
              <li key={req._id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-black dark:text-white">
                    {req.student.name} — Room {req.room.number}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CMS ID: {req.student.cms_id} | Course: {req.student.course}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    onClick={() => handleApprove(req._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(req._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default RoomRequests;
