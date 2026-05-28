import { useState } from "react";

const topDishes = [
  {
    name: "Pan-Seared Salmon",
    orders: 842,
    satisfaction: 92,
    badge: "#1 Popular",
    color: "bg-emerald-500",
    img: "🐟",
    bg: "from-emerald-900 to-slate-900",
  },
  {
    name: "Truffle Mushroom Pizza",
    orders: 715,
    satisfaction: 88,
    badge: null,
    color: "bg-amber-500",
    img: "🍕",
    bg: "from-amber-900 to-slate-900",
  },
  {
    name: "Signature Ribeye",
    orders: 642,
    satisfaction: 95,
    badge: null,
    color: "bg-red-500",
    img: "🥩",
    bg: "from-red-900 to-slate-900",
  },
  {
    name: "Hand-Crafted Pasta",
    orders: 520,
    satisfaction: 81,
    badge: null,
    color: "bg-yellow-500",
    img: "🍝",
    bg: "from-yellow-900 to-slate-900",
  },
];

const liveActivity = [
  {
    icon: "🍽",
    title: "New Order #4829",
    desc: "Table 12 • 4 Guests • $124.50",
    time: "2 minutes ago",
    dot: "bg-[#C9DE5F]",
    iconBg: "bg-[#1a2400]",
  },
  {
    icon: "⭐",
    title: "VIP Guest Arrived",
    desc: "Mr. Julian Thompson • Regular",
    time: "8 minutes ago",
    dot: "bg-amber-400",
    iconBg: "bg-amber-900/40",
  },
  {
    icon: "⚠️",
    title: "Inventory Alert",
    desc: "Sea Bass stock reaching critical (3 left)",
    time: "24 minutes ago",
    dot: "bg-red-400",
    iconBg: "bg-red-900/40",
  },
  {
    icon: "✅",
    title: "Check Completed",
    desc: "Table 04 settled their bill",
    time: "45 minutes ago",
    dot: "bg-slate-400",
    iconBg: "bg-slate-700/40",
  },
];

const navItems = [
  { icon: "▦", label: "Overview", active: true },
  { icon: "🛒", label: "Orders", active: false },
  { icon: "👥", label: "Clients", active: false },
  { icon: "🍽", label: "Menu", active: false },
  { icon: "📈", label: "Analytics", active: false },
  { icon: "👨‍🍳", label: "Staff", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

const stats = [
  {
    label: "DAILY REVENUE",
    value: "$14,842.00",
    badge: "+12.5%",
    badgeColor: "text-[#C9DE5F] bg-[#1a2a00]",
    icon: "💰",
    iconBg: "bg-[#1a2a00]",
  },
  {
    label: "TOTAL ORDERS",
    value: "318",
    badge: "+42 new",
    badgeColor: "text-blue-400 bg-blue-900/30",
    icon: "🛒",
    iconBg: "bg-blue-900/30",
  },
  {
    label: "CUSTOMER GROWTH",
    value: "2,491",
    badge: "+8%",
    badgeColor: "text-orange-400 bg-orange-900/30",
    icon: "📊",
    iconBg: "bg-orange-900/30",
  },
  {
    label: "TABLE OCCUPANCY",
    value: "84%",
    badge: "● Peak",
    badgeColor: "text-emerald-400 bg-emerald-900/30",
    icon: "🪑",
    iconBg: "bg-emerald-900/30",
  },
];

// Mini sparkline chart using SVG
function SparkLine({ color = "#C9DE5F" }) {
  const points = [20, 45, 30, 60, 40, 70, 55, 80, 65, 90, 75, 100];
  const max = Math.max(...points);
  const w = 180,
    h = 60;
  const pts = points
    .map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`)
    .join(" ");
  const fillPts = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill="url(#sparkFill)" />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Revenue chart using SVG
function RevenueChart({ activeMetric }) {
  const hours = ["08:00", "12:00", "04:00 PM", "08:00 PM", "12:00 AM"];
  const revenueData = [20, 35, 55, 75, 65, 80, 70, 90, 85, 95, 88, 75];
  const ordersData = [15, 28, 45, 60, 52, 68, 60, 78, 72, 82, 76, 62];
  const w = 560,
    h = 180;
  const normalize = (data) =>
    data
      .map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / 100) * h}`)
      .join(" ");

  const revPts = normalize(revenueData);
  const ordPts = normalize(ordersData);
  const revFill = `0,${h} ${revPts} ${w},${h}`;
  const ordFill = `0,${h} ${ordPts} ${w},${h}`;

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${w} ${h + 30}`}
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: 220 }}
      >
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9DE5F" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9DE5F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((y, i) => (
          <line
            key={i}
            x1={0}
            y1={h * (1 - y)}
            x2={w}
            y2={h * (1 - y)}
            stroke="#ffffff10"
            strokeWidth="1"
          />
        ))}
        {/* Revenue area */}
        {(activeMetric === "revenue" || activeMetric === "both") && (
          <>
            <polygon points={revFill} fill="url(#revGrad)" />
            <polyline
              points={revPts}
              fill="none"
              stroke="#C9DE5F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {/* Orders area */}
        {(activeMetric === "orders" || activeMetric === "both") && (
          <>
            <polygon points={ordFill} fill="url(#ordGrad)" />
            <polyline
              points={ordPts}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 3"
            />
          </>
        )}
        {/* X axis labels */}
        {hours.map((h_label, i) => (
          <text
            key={i}
            x={(i / (hours.length - 1)) * w}
            y={h + 22}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {h_label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function DineFlowDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState("both");
  const [dishFilter, setDishFilter] = useState("Volume");

  return (
    <div className="flex min-h-screen bg-[#F4F6F3] font-sans">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[168px] bg-white border-r border-gray-100 z-30 flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-[#1a2e00] flex items-center justify-center flex-shrink-0">
            <span className="text-[#C9DE5F] text-sm">🍴</span>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 leading-tight">
              DineFlow
            </p>
            <p className="text-[10px] text-gray-400 leading-tight">
              Kitchen Admin
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer
                ${
                  item.active
                    ? "bg-[#1a2e00] text-[#C9DE5F] font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }
              `}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Order CTA */}
        <div className="px-3 pb-4 space-y-2">
          <button className="w-full flex items-center justify-center gap-2 bg-[#C9DE5F] hover:bg-[#b8ce4a] text-[#1a2e00] font-bold text-sm py-2.5 rounded-xl transition-colors">
            <span>+</span>
            <span>Quick Order</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition-colors">
            <span>❓</span>
            <span>Support</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-500 text-sm rounded-xl hover:bg-red-50 transition-colors">
            <span>🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-3 flex items-center gap-4 sticky top-0 z-10">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="text-xl">☰</span>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search orders, dishes, or staff..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9DE5F] focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Add Entry Button */}
            <button className="hidden sm:flex items-center gap-2 bg-[#1a2e00] hover:bg-[#253d00] text-[#C9DE5F] font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
              <span>+</span>
              <span>Add Entry</span>
            </button>

            {/* Notification */}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9DE5F] rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  Alex Sterling
                </p>
                <p className="text-[10px] text-gray-400">Manager</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#C9DE5F] flex items-center justify-center font-bold text-sm text-[#1a2e00] flex-shrink-0">
                AS
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 overflow-x-hidden">
          {/* Page Title + Filter row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                Executive Overview
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Real-time performance metrics for Main Kitchen
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm">
                📅 Today
                <span className="text-gray-400">▾</span>
              </button>
              <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm">
                ⚙ Filter
              </button>
            </div>
          </div>

          {/* ===== STAT CARDS ===== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 lg:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center text-base`}
                  >
                    {stat.icon}
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-1 rounded-lg ${stat.badgeColor}`}
                  >
                    {stat.badge}
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* ===== CHART + LIVE ACTIVITY ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Revenue vs Orders Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Revenue vs Orders
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Performance trend over last 24 hours
                  </p>
                </div>
                {/* Legend toggles */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setActiveMetric(
                        activeMetric === "revenue" ? "both" : "revenue",
                      )
                    }
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#C9DE5F] inline-block" />
                    Revenue
                  </button>
                  <button
                    onClick={() =>
                      setActiveMetric(
                        activeMetric === "orders" ? "both" : "orders",
                      )
                    }
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" />
                    Orders
                  </button>
                </div>
              </div>
              <RevenueChart activeMetric={activeMetric} />
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">
                  Live Activity
                </h2>
                <span className="flex items-center gap-1.5 text-[11px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  LIVE
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {liveActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div
                      className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center text-sm flex-shrink-0 mt-0.5`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.dot} flex-shrink-0`}
                        />
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium py-2.5 rounded-xl transition-colors">
                View All History
              </button>
            </div>
          </div>

          {/* ===== TOP PERFORMING DISHES ===== */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Top Performing Dishes
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Menu popularity based on sales volume
                </p>
              </div>
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                {["Volume", "Revenue"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setDishFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      dishFilter === f
                        ? "bg-[#1a2e00] text-[#C9DE5F] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {topDishes.map((dish, i) => (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9DE5F] hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {/* Dish image area */}
                  <div
                    className={`relative h-36 lg:h-44 bg-gradient-to-br ${dish.bg} flex items-center justify-center`}
                  >
                    <span className="text-5xl lg:text-6xl">{dish.img}</span>
                    {dish.badge && (
                      <span className="absolute top-3 right-3 bg-[#C9DE5F] text-[#1a2e00] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {dish.badge}
                      </span>
                    )}
                    {/* Rank badge */}
                    <span className="absolute top-3 left-3 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      #{i + 1}
                    </span>
                  </div>

                  {/* Dish info */}
                  <div className="p-3 lg:p-4 bg-white">
                    <p className="font-bold text-gray-900 text-sm leading-tight mb-1 group-hover:text-[#1a2e00] transition-colors">
                      {dish.name}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        {dish.orders.toLocaleString()} orders
                      </span>
                      <span className="text-xs font-bold text-[#1a6b00]">
                        {dish.satisfaction}% Satisfaction
                      </span>
                    </div>
                    {/* Satisfaction bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dish.color} transition-all duration-500`}
                        style={{ width: `${dish.satisfaction}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== BOTTOM ROW: Quick Stats ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6">
            {/* Average Order Value */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-2">
                AVG ORDER VALUE
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">$46.68</p>
                <span className="text-xs font-semibold text-[#C9DE5F] bg-[#1a2a00] px-2 py-1 rounded-lg">
                  ↑ +3.2%
                </span>
              </div>
              <div className="mt-3">
                <SparkLine color="#C9DE5F" />
              </div>
            </div>

            {/* Kitchen Efficiency */}
            <div className="bg-[#1a2e00] rounded-2xl p-5 border border-transparent shadow-sm">
              <p className="text-[10px] font-semibold text-[#C9DE5F]/60 tracking-widest mb-2">
                KITCHEN EFFICIENCY
              </p>
              <div className="flex items-end justify-between mb-3">
                <p className="text-2xl font-bold text-[#C9DE5F]">94.2%</p>
                <span className="text-xs font-semibold text-[#C9DE5F] bg-[#C9DE5F]/20 px-2 py-1 rounded-lg">
                  Optimal
                </span>
              </div>
              <div className="w-full h-2 bg-[#C9DE5F]/20 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-[#C9DE5F] rounded-full" />
              </div>
              <p className="text-xs text-[#C9DE5F]/60 mt-2">
                Avg prep: 11.4 min / order
              </p>
            </div>

            {/* Today's Reservations */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-2">
                TODAY'S RESERVATIONS
              </p>
              <div className="flex items-end justify-between mb-3">
                <p className="text-2xl font-bold text-gray-900">28 / 32</p>
                <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                  87.5%
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${i < 28 ? "bg-[#C9DE5F]" : "bg-gray-100"}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">4 tables remaining</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
