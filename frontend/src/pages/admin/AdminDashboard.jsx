import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
// import LoadingSpinner from "../components/LoadingSpinner";

const AdminDashboard = () => {
	const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });

	if (isLoading) return <LoadingSpinner size="lg" />;

	if (!authUser || !authUser.isAdmin) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
			<p className="text-slate-400 mb-6">
				Welcome, {authUser.fullName}! You have admin privileges.
			</p>

			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className="p-4 rounded-xl shadow bg-gray-900 border border-gray-700">
					<h2 className="text-lg font-semibold mb-2">Total Users</h2>
					<p className="text-3xl font-bold">123</p>
				</div>
				<div className="p-4 rounded-xl shadow bg-gray-900 border border-gray-700">
					<h2 className="text-lg font-semibold mb-2">Posts Reviewed</h2>
					<p className="text-3xl font-bold">456</p>
				</div>
				<div className="p-4 rounded-xl shadow bg-gray-900 border border-gray-700">
					<h2 className="text-lg font-semibold mb-2">Pending Reports</h2>
					<p className="text-3xl font-bold">7</p>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
