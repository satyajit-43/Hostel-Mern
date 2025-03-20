import React from 'react'


export default function Facility() {
  return (
    <section className="bg-white">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black">
        Our Facilities
      </h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-700 sm:text-xl">
        We aim to provide top-notch amenities to make your stay comfortable and secure.
      </p>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">🛏️ Spacious Rooms</h3>
          <p className="text-gray-700">Well-ventilated rooms with ample natural light and attached bathrooms.</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">🍽️ Mess Facility</h3>
          <p className="text-gray-700">Nutritious and hygienic food served three times a day.</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">📶 High-Speed Wi-Fi</h3>
          <p className="text-gray-700">24/7 internet access throughout the hostel premises.</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">🛡️ Security</h3>
          <p className="text-gray-700">CCTV surveillance and secure entry with biometric access.</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">🧺 Laundry Service</h3>
          <p className="text-gray-700">On-site laundry services available for all residents.</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-black">🎯 Recreation Area</h3>
          <p className="text-gray-700">Common room with games, books, and space to relax.</p>
        </div>
      </div>
    </div>
  </section>
  )
}
