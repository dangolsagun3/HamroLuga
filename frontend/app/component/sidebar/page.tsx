
const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">HamroLuga Admin</h1>

      <ul className="space-y-4">
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-400 cursor-pointer">Products</li>
        <li className="hover:text-blue-400 cursor-pointer">Orders</li>
        <li className="hover:text-blue-400 cursor-pointer">Customers</li>
        <li className="hover:text-blue-400 cursor-pointer">Analytics</li>
        <li className="hover:text-red-400 cursor-pointer">Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
