import { useEffect, useState } from "react";
import axios from "../../api/axios";
import StatsCard from "../../components/courier/StatsCard";

const CourierDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/courier/stats");
      setStats(res.data.summary);
      setError(null);
    } catch (err) {
      console.error(err);
      // Set default stats if the endpoint returns 422 or other errors
      setStats({
        total_deliveries: 0,
        completed_deliveries: 0,
        active_deliveries: 0,
        todays_deliveries: 0,
        success_rate: 0,
      });
      setError(err?.response?.data?.message || "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center mt-10">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Warning: </strong> {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Deliveries"
          value={stats?.total_deliveries || 0}
        />
        <StatsCard title="Completed" value={stats?.completed_deliveries || 0} />
        <StatsCard
          title="Active Deliveries"
          value={stats?.active_deliveries || 0}
        />
        <StatsCard
          title="Today's Deliveries"
          value={stats?.todays_deliveries || 0}
        />
      </div>
    </div>
  );
};

export default CourierDashboard;
