// Idea is to have a dashboard that shows an overview of tasks, projects, and upcoming deadlines.
// Most settings and navigation will be accessible from here via a sidebar or top navigation bar that moves in as needed.

import React from 'react';
import { Calendar, BarChart, ListCheck } from 'lucide-react';       

export default function Dashboard() {

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-4 rounded-lg flex items-center">
                    <Calendar className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
                        <p className="text-sm text-gray-600">3 tasks due this week</p>
                    </div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg flex items-center">
                    <BarChart className="w-6 h-6 text-green-600 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold">Productivity Stats</h2>
                        <p className="text-sm text-gray-600">You completed 5 tasks today</p>
                    </div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
                    <ListCheck className="w-6 h-6 text-yellow-600 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold">Pending Tasks</h2>
                        <p className="text-sm text-gray-600">8 tasks pending</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
    