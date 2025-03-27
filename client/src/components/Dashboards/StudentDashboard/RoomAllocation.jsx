import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomAllocation() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);

  // Fetch student info from localStorage
  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      setStudent(storedStudent);
    }
  }, []);

  // Fetch rooms for student's hostel
  useEffect(() => {
    const fetchRooms = async () => {
      if (!student) return;
      const res = await fetch("http://localhost:3000/api/room/hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: student.hostel }),
      });
      const data = await res.json();
      setRooms(data.rooms || []);
    };

    fetchRooms();
  }, [student]);

  const applyForRoom = async (room_no) => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/room/allocate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cms_id: student.cms_id,
        room_no,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Room applied successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      // Refresh room list
      const updatedStudent = await fetch(`http://localhost:3000/api/student/${student.cms_id}`).then(res => res.json());
      localStorage.setItem("student", JSON.stringify(updatedStudent));
      setStudent(updatedStudent);
    } else {
      toast.error(data.msg || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center md:p-0 px-10 max-h-screen overflow-y-auto pt-80 md:pt-80 lg:p-0">
      <h1 className="text-black dark:text-white font-bold text-5xl mt-10">Room Allocation</h1>

      <div className="flex gap-5 flex-wrap items-start justify-center">
        {/* LEFT - Student Current Room Info */}
        <div className="w-full md:w-80 max-w-md p-4 border rounded-lg shadow sm:p-8 bg-slate-300 dark:bg-neutral-950 dark:border-neutral-900 drop-shadow-xl overflow-y-auto">
          <h5 className="text-xl font-bold leading-none text-black dark:text-white mb-4">Your Room Info</h5>
          {student?.room_no ? (
            <p className="text-green-500 text-lg">You are allocated to Room #{student.room_no}</p>
          ) : (
            <p className="text-yellow-400 text-lg">No room allocated yet.</p>
          )}
        </div>

        {/* RIGHT - Room Cards */}
        <div className="w-full md:w-[40rem] max-h-[32rem] overflow-y-auto p-4 rounded-lg shadow bg-slate-300 dark:bg-neutral-950 dark:border-neutral-900">
          <h5 className="text-xl font-bold text-black dark:text-white mb-4">Available Rooms</h5>
          <div className="grid md:grid-cols-2 gap-4">
            {rooms.length === 0 ? (
              <p className="text-black dark:text-white">No rooms found.</p>
            ) : (
              rooms.map((room) => {
                const isFull = room.occupants.length >= room.capacity;
                const alreadyAssigned = student?.room_no === room.room_no;

                return (
                  <div
                    key={room._id}
                    className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow flex flex-col gap-2"
                  >
                    <h3 className="text-lg font-semibold text-black dark:text-white">Room #{room.room_no}</h3>
                    <p className="text-sm text-black dark:text-gray-300">Capacity: {room.capacity}</p>
                    <p className="text-sm text-black dark:text-gray-300">Occupied: {room.occupants.length}</p>
                    <p className={`text-sm font-semibold ${isFull ? "text-red-500" : "text-green-500"}`}>
                      {isFull ? "Full" : "Available"}
                    </p>
                    <button
                      disabled={loading || isFull || alreadyAssigned}
                      onClick={() => applyForRoom(room.room_no)}
                      className={`mt-2 w-full text-white rounded-lg px-4 py-2 text-sm ${
                        alreadyAssigned
                          ? "bg-gray-500 cursor-not-allowed"
                          : isFull
                          ? "bg-red-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {alreadyAssigned
                        ? "Already Assigned"
                        : isFull
                        ? "Room Full"
                        : loading
                        ? "Applying..."
                        : "Apply for Room"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default RoomAllocation;
