import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
 
 

export default function Dashboard() {

  const data = [
    { name: 'Jan', Users: 4000 },
    { name: 'Feb', Users: 3000 },
    { name: 'Mar', Users: 2000 },
    { name: 'Apr', Users: 2780 },
    { name: 'May', Users: 1890 },
    { name: 'Jun', Users: 2390 },
    { name: 'Jul', Users: 3490 },
  ];

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6">
        <NavBar title='Dashboard' />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-lg">Card 1</div>
            <div className="p-6 bg-white shadow rounded-lg">Card 2</div>
            <div className="p-6 bg-white shadow rounded-lg">Card 3</div>
          </div>
          <div className="p-6 bg-white shadow rounded-lg h-64">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={data}>
<CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#F2632D" />
</BarChart>
</ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
