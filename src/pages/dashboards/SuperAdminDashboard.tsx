import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BedDouble, 
  CreditCard, 
  BarChart3, 
  Plus,
  TrendingUp,
  Calendar,
  Coffee
} from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: '156',
      change: '+12%',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Revenue',
      value: '$45,280',
      change: '+8%',
      icon: CreditCard,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      change: '+5%',
      icon: BedDouble,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Bar Sales',
      value: '$8,940',
      change: '+15%',
      icon: Coffee,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentBookings = [
    {
      id: '1',
      guest: 'John Smith',
      room: 'Deluxe Suite',
      checkIn: '2024-01-15',
      status: 'confirmed',
      amount: '$450'
    },
    {
      id: '2',
      guest: 'Sarah Johnson',
      room: 'Standard Room',
      checkIn: '2024-01-16',
      status: 'pending',
      amount: '$280'
    },
    {
      id: '3',
      guest: 'Michael Brown',
      room: 'Executive Suite',
      checkIn: '2024-01-17',
      status: 'confirmed',
      amount: '$680'
    }
  ];

  const quickActions = [
    { title: 'Add New Room', icon: Plus, color: 'bg-blue-500', href: '#' },
    { title: 'Manage Staff', icon: Users, color: 'bg-green-500', href: '#' },
    { title: 'View Analytics', icon: BarChart3, color: 'bg-purple-500', href: '#' },
    { title: 'Inventory', icon: Coffee, color: 'bg-orange-500', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your hotel overview.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.title}
                  href={action.href}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">View All</a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Room</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{booking.guest}</td>
                    <td className="py-4 px-4 text-gray-600">{booking.room}</td>
                    <td className="py-4 px-4 text-gray-600">{booking.checkIn}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;