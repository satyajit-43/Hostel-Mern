import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function RoomAllocation() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [appliedRoom, setAppliedRoom] = useState(null);

  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("student"));

    // Fetch rooms that are available
    fetch("http://localhost:3000/api/room/available")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAvailableRooms(data.rooms);
        }
      });

    // Fetch student's current room request if any
    fetch("http://localhost:3000/api/allocation/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.allocation) {
          setAppliedRoom(data.allocation.room);
        }
      });
  }, []);

  const applyForRoom = (roomId) => {
    let student = JSON.parse(localStorage.getItem("student"));

    fetch("http://localhost:3000/api/allocation/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id, room: roomId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Applied for room successfully!");
          setAppliedRoom(roomId);
        } else {
          toast.error(data.message || "Failed to apply.");
        }
      });
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center max-h-screen overflow-y-auto">
      <h1 className="text-black dark:text-white font-bold text-5xl">Room Allocation</h1>
      <p className="text-black dark:text-white text-xl text-center px-5 sm:p-0">
        Apply for available rooms.
      </p>

      <div className="w-full max-w-md p-4 border rounded-lg shadow sm:p-8 bg-slate-300 dark:bg-neutral-950 dark:border-neutral-900 drop-shadow-xl overflow-y-auto max-h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-black dark:text-white">
            Available Rooms
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-700">
            {availableRooms.map((room) => (
              <li className="py-3 sm:py-4" key={room._id}>
                <div className="flex items-center justify-between space-x-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-black dark:text-white">
                      Room No: {room.number}
                    </p>
                    <p className="text-sm truncate text-black dark:text-gray-400">
                      Capacity: {room.capacity} | Occupied: {room.occupants.length}
                    </p>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={appliedRoom === room._id}
                    onClick={() => applyForRoom(room._id)}
                  >
                    {appliedRoom === room._id ? "Applied" : "Apply"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer theme="dark" />
    </div>
  );
}

export default RoomAllocation;
