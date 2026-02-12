import { useState, useEffect } from "react";
import { Search, ShieldCheck, Mail, Smartphone, Filter } from "lucide-react";
import api from "../../api";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data.users || []);
      } catch (err) {
        console.error("Registry fetch failed", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Header Controls */}
      <div className="flex flex-col xl:flex-row gap-8 justify-between">
        <div className="relative group flex-1 max-w-2xl">
          <Search
            className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Registry..."
            className="w-full pl-20 pr-10 py-6 bg-[#F8F7F4] rounded-full border-2 border-transparent focus:border-black outline-none font-black italic transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {["all", "customer", "courier", "admin"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[9px] transition-all whitespace-nowrap
                ${roleFilter === role ? "bg-[#EA580C] text-white shadow-lg" : "bg-white border text-neutral-400 hover:text-black"}`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-10 rounded-[60px] border border-neutral-100 group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
          >
            <div className="flex items-start gap-8 relative z-10">
              <div className="w-20 h-20 bg-black rounded-[30px] flex items-center justify-center text-white text-3xl font-black italic group-hover:bg-[#EA580C] transition-colors">
                {user.full_name?.[0]}
              </div>

              <div className="flex-1">
                <span className="px-3 py-1 bg-neutral-100 rounded text-[8px] font-black uppercase tracking-widest text-neutral-500 mb-2 inline-block">
                  {user.role}
                </span>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">
                  {user.full_name}
                </h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                    <Mail size={12} className="text-[#EA580C]" /> {user.email}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                    <Smartphone size={12} className="text-[#EA580C]" />{" "}
                    {user.phone || "No Contact"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                  Operational
                </span>
              </div>
              <button className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-300 hover:text-[#EA580C]">
                Manage Permissions →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
