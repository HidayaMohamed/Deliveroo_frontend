const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition">
      <div>
        <h4 className="text-gray-500 font-medium">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
