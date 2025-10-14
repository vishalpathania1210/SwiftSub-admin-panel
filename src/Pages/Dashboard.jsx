import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

export default function Dashboard() {

  // Dummy data for Users graph
  const data = [
    { name: 'Jan', Users: 120 },
    { name: 'Feb', Users: 210 },
    { name: 'Mar', Users: 150 },
    { name: 'Apr', Users: 300 },
    { name: 'May', Users: 250 },
    { name: 'Jun', Users: 400 },
    { name: 'Jul', Users: 350 },
  ];

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6">
        <NavBar title='Dashboard' />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-white shadow rounded-lg">Card 1</div>
            <div className="p-6 bg-white shadow rounded-lg">Card 2</div>
            <div className="p-6 bg-white shadow rounded-lg">Card 3</div>
          </div>

          {/* Users Line Graph */}
          <div className="p-6 bg-white shadow rounded-lg h-64">
            <h2 className="text-xl font-semibold mb-4">Users Growth Graph</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Smooth Line with orange color */}
                <Line 
                  type="monotone" 
                  dataKey="Users" 
                  stroke="#F2632D" 
                  strokeWidth={3} 
                  dot={{ r: 5 }} 
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
