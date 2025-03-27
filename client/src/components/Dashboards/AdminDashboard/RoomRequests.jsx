import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomAllocation() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  const getUnallocatedStudents = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const res = await fetch("http://localhost:3000/api/student/unallocated", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel }),
    });
    const data = await res.json();
    if (data.success) {
      setStudents(data.students);
    } else {
      toast.error("Failed to fetch students");
    }
  };

  const getAvailableRooms = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const res = await fetch("http://localhost:3000/api/room/available", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel }),
    });
    const data = await res.json();
    if (data.success) {
      setRooms(data.rooms);
    } else {
      toast.error("Failed to fetch rooms");
    }
  };

  const assignRoom = async (studentId, roomId) => {
    const res = await fetch("http://localhost:3000/api/room/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, roomId }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Room assigned successfully!");
      setStudents(students.filter((s) => s._id !== studentId));
      getAvailableRooms();
    } else {
      toast.error(data.message || "Assignment failed");
    }
  };

  useEffect(() => {
    getUnallocatedStudents();
    getAvailableRooms();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-10 pt-32 items-center justify-start overflow-auto">
      <h1 className="text-black dark:text-white font-bold text-5xl">Room Allocation</h1>

      <div className="flex flex-wrap justify-center gap-10">
        <div className="bg-white dark:bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-96 max-h-96 overflow-auto">
          <span className="text-black dark:text-white font-bold text-xl">Unallocated Students</span>
          <ul className="divide-y divide-gray-700 text-black dark:text-white">
            {students.length === 0
              ? "All students allocated!"
              : students.map((student) => (
                  <li className="py-3 px-2 hover:bg-neutral-700 transition-all" key={student._id}>
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <p className="text-sm truncate text-gray-400">CMS: {student.cms_id}</p>
                    <select
                      className="mt-2 p-1 rounded text-sm bg-neutral-800 text-white"
                      onChange={(e) => assignRoom(student._id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Select Room</option>
                      {rooms.map((room) => (
                        <option key={room._id} value={room._id}>
                          Room {room.room_no} ({room.type}) - {room.capacity - room.occupants.length} left
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-96 max-h-96 overflow-auto">
          <span className="text-black dark:text-white font-bold text-xl">Available Rooms</span>
          <ul className="divide-y divide-gray-700 text-black dark:text-white">
            {rooms.length === 0
              ? "No available rooms!"
              : rooms.map((room) => (
                  <li className="py-3 px-2" key={room._id}>
                    <p className="text-sm font-medium">Room {room.room_no} - {room.type}</p>
                    <p className="text-sm text-gray-400">Available slots: {room.capacity - room.occupants.length}</p>
                  </li>
                ))}
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}

export default RoomAllocation;
