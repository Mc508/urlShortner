import UrlForm from "../components/UrlForm";
import UserUrls from "../components/UserUrls";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">URL Shortener</h2>
        <UrlForm />
        <UserUrls/>
      </div>
    </div>
  );
};
export default Dashboard;
