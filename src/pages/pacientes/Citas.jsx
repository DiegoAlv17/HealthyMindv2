import React from "react";
import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";
import {format} from "date-fns";

const dataCitas = [
  {
    id: "1",
    psychologistId: "1",
    psychologistName: "Dr. Sarah Johnson",
    psychologistAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    date: new Date(Date.now() + 86400000), // Tomorrow
    status: "scheduled",
    notes: "Follow-up session",
  },
  {
    id: "2",
    psychologistId: "2",
    psychologistName: "Dr. Michael Chen",
    psychologistAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    status: "scheduled",
  },
];

export function Citas() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Appointments</h1>
        <p className="text-gray-600">Manage your upcoming and past sessions</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Appointments
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {dataCitas.map((appointment) => (
              <div key={appointment.id} className="p-4">
                <div className="flex items-start">
                  <img
                    src={appointment.psychologistAvatar}
                    alt={appointment.psychologistName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {appointment.psychologistName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          appointment.status === "scheduled"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        {format(appointment.date, "MMMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        {format(appointment.date, "h:mm a")}
                      </div>
                      {appointment.notes && (
                        <p className="text-gray-600">{appointment.notes}</p>
                      )}
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                        <Video className="h-5 w-5 mr-2" />
                        Join Session
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


