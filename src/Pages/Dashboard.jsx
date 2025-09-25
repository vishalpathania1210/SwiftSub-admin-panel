import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

 
 

export default function Dashboard() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <NavBar title='Dashboard' />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-lg">Card 1</div>
            <div className="p-6 bg-white shadow rounded-lg">Card 2</div>
            <div className="p-6 bg-white shadow rounded-lg">Card 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}
