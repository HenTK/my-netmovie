import React from 'react'

export default function BookingBar() {
  return (
    <div style={{ width: "100%" }} className="">
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-secondary">
        Seats are booked
        </div>
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-dark">
        Seats not booked
        </div>
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-primary">
        Seats are being booked
        </div>
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-warning">
        VIP seats
        </div>
    </div>
  )
}
