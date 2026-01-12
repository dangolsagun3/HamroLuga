import Sidebar from "../../../component/ui/sidebar-page";
import StatCard from "../../../component/statchat-page";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-black">
          <StatCard title="Total Sales" value="Rs 30,50,000" />
          <StatCard title="Orders" value="1800" />
          <StatCard title="Products" value="950" />
          <StatCard title="Customers" value="420" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-black">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">#101</td>
                <td>Ram</td>
                <td>Rs 2500</td>
                <td className="text-green-600">Delivered</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">#102</td>
                <td>Sita</td>
                <td>Rs 1800</td>
                <td className="text-yellow-600">Pending</td>
              </tr>
              <tr>
                <td className="py-2">#103</td>
                <td>Hari</td>
                <td>Rs 3200</td>
                <td className="text-red-600">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
