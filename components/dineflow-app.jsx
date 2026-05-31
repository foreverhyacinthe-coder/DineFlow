import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  analytics,
  billing,
  images,
  kitchenBoard,
  menuItems,
  operations,
  overview,
  publicMenu,
  reservations,
  staff,
} from "../data/dineflow-data";
import "./dineflow.css";

const API_ROOT = import.meta.env.VITE_API_URL || "";

function useApiData(endpoint, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_ROOT}/api/${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API ${endpoint} returned ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (isMounted) {
          setData(payload);
        }
      })
      .catch(() => {
        if (isMounted) {
          setData(fallback);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint, fallback]);

  return data;
}

const iconPaths = {
  alert: (
    <>
      <path d="M10.3 3.1 1.8 17.4a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.1a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  cart: (
    <>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2 2h3l2.4 12.3a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6l1.4-7.4H6" />
    </>
  ),
  check: (
    <>
      <path d="M20 6 9 17l-5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  creditCard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),
  flame: (
    <>
      <path d="M8.5 14.5A4 4 0 0 0 12 21a5 5 0 0 0 5-5c0-2.5-1.5-4.5-3.5-6 .2 2-1 3-2.2 3.7C10 11 11 7.5 7 4c.4 3-2 5.3-2 8.2 0 1.5.7 2.8 1.8 3.7" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 1 1 5.8 1c-.6 1.2-1.8 1.6-2.4 2.4-.4.5-.5 1-.5 1.6" />
      <path d="M12 18h.01" />
    </>
  ),
  inbox: (
    <>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="m5.5 5.1-3.3 7.1A3 3 0 0 0 2 13.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5a3 3 0 0 0-.2-1.3l-3.3-7.1A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1Z" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  map: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  package: (
    <>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  settings: (
    <>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.3 7A2 2 0 1 1 7.1 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1A1.7 1.7 0 0 0 19.4 9c.2.6.8 1 1.6 1h.1a2 2 0 1 1 0 4H21c-.8 0-1.4.4-1.6 1Z" />
    </>
  ),
  star: (
    <>
      <path d="m12 2 3 6 6.6 1-4.8 4.7 1.1 6.6L12 17.2l-5.9 3.1 1.1-6.6L2.4 9 9 8l3-6Z" />
    </>
  ),
  table: (
    <>
      <path d="M4 10h16" />
      <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="M6 10v10" />
      <path d="M18 10v10" />
    </>
  ),
  team: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  trend: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M20 16.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5" />
    </>
  ),
  utensils: (
    <>
      <path d="M4 2v8" />
      <path d="M8 2v8" />
      <path d="M6 2v20" />
      <path d="M18 2a4 4 0 0 0-4 4v6a2 2 0 0 0 2 2h2v8" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 7H5a2 2 0 0 0 0 4h15v8H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13v4" />
      <path d="M16 14h.01" />
    </>
  ),
};

function Icon({ name, size = 18, strokeWidth = 2 }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      {iconPaths[name] || iconPaths.grid}
    </svg>
  );
}

function Logo({ subline = "Kitchen Admin", premium = false }) {
  return (
    <Link className="brand-lockup" to="/dashboard">
      <span className="brand-mark">
        <Icon name="utensils" size={18} strokeWidth={2.4} />
      </span>
      <span>
        <strong>DineFlow</strong>
        <small>{premium ? "Premium Management" : subline}</small>
      </span>
    </Link>
  );
}

function SearchBox({ placeholder = "Search operations..." }) {
  return (
    <label className="search-box">
      <Icon name="search" size={17} />
      <input type="search" placeholder={placeholder} />
    </label>
  );
}

function PrimaryButton({ children, to, icon = "arrowRight", type = "button" }) {
  const className = "btn btn-primary";
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
        <Icon name={icon} size={17} />
      </Link>
    );
  }

  return (
    <button className={className} type={type}>
      {children}
      <Icon name={icon} size={17} />
    </button>
  );
}

function SecondaryButton({ children, to, icon, tone = "" }) {
  const content = (
    <>
      {icon ? <Icon name={icon} size={16} /> : null}
      {children}
    </>
  );

  if (to) {
    return (
      <Link className={`btn btn-secondary ${tone}`} to={to}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`btn btn-secondary ${tone}`} type="button">
      {content}
    </button>
  );
}

function ImagePanel({ image, children, className = "" }) {
  return (
    <section
      className={`image-panel ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="image-shade" />
      <div className="image-content">{children}</div>
    </section>
  );
}

function AuthShell({ children, image, mode }) {
  return (
    <main className={`auth-layout auth-${mode}`}>
      <section className="auth-form-panel">
        <Logo subline={mode === "register" ? "Restaurant OS" : "Kitchen Admin"} />
        {children}
      </section>
      <ImagePanel image={image} className="auth-visual">
        {mode === "register" ? (
          <>
            <div className="glass-quote">
              <div className="stars">★★★★★</div>
              <p>
                "DineFlow has completely transformed how we orchestrate service
                at Le Jardin. Real-time insight keeps the kitchen calm when the
                room is full."
              </p>
              <div className="avatar-row">
                <span className="avatar avatar-photo">MV</span>
                <span>
                  <strong>Chef Marco Valesquez</strong>
                  <small>3 Michelin Stars, Executive Director</small>
                </span>
              </div>
            </div>
            <div className="auth-metrics">
              <MetricMini icon="clock" value="99.9%" label="Platform Uptime" />
              <MetricMini icon="trend" value="1.2s" label="Sync Latency" />
            </div>
            <span className="live-pill">
              <i />
              Live operations active
            </span>
          </>
        ) : (
          <div className="brand-card">
            <strong>DINEFLOW</strong>
            <span>Manage. Serve. Grow.</span>
          </div>
        )}
      </ImagePanel>
    </main>
  );
}

function MetricMini({ icon, value, label }) {
  return (
    <div className="metric-mini">
      <Icon name={icon} size={20} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell image={images.chicken} mode="login">
      <div className="auth-copy">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access the kitchen admin dashboard.</p>
      </div>

      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/dashboard");
        }}
      >
        <Field label="Email Address" icon="mail">
          <input type="email" placeholder="chef@dineflow.com" />
        </Field>
        <Field label="Password" action="Forgot password?">
          <input type={showPassword ? "text" : "password"} placeholder="••••••••" />
          <button
            className="input-icon-button"
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name="eye" size={16} />
          </button>
        </Field>
        <label className="check-row">
          <input type="checkbox" />
          <span>Remember this device for 30 days</span>
        </label>
        <PrimaryButton type="submit">Sign In to Dashboard</PrimaryButton>
      </form>

      <div className="auth-divider">or continue with</div>
      <div className="social-grid">
        <button type="button">G Google</button>
        <button type="button">Apple</button>
      </div>
      <p className="auth-footnote">
        Don't have an account? <Link to="/register">Request Access</Link>
      </p>
    </AuthShell>
  );
}

export function CreateAccountPage() {
  const navigate = useNavigate();

  return (
    <AuthShell image={images.burger} mode="register">
      <div className="auth-copy">
        <h1>Create your account</h1>
        <p>Step 1 of 2: Enterprise Details</p>
      </div>

      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/dashboard");
        }}
      >
        <Field label="Restaurant Name">
          <input type="text" placeholder="The Silver Palate" />
        </Field>
        <Field label="Owner Name">
          <input type="text" placeholder="Julianne Moore" />
        </Field>
        <Field label="Email Address">
          <input type="email" placeholder="julianne@dineflow.com" />
        </Field>
        <div className="field-grid">
          <Field label="Password">
            <input type="password" placeholder="••••••••" />
          </Field>
          <Field label="Confirm Password">
            <input type="password" placeholder="••••••••" />
          </Field>
        </div>
        <label className="check-row">
          <input type="checkbox" />
          <span>
            I agree to the <a href="#terms">Terms of Service</a> and{" "}
            <a href="#privacy">Privacy Policy</a>.
          </span>
        </label>
        <PrimaryButton type="submit">Create Account</PrimaryButton>
      </form>

      <p className="auth-footnote">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </AuthShell>
  );
}

function Field({ label, action, icon, children }) {
  return (
    <label className="field">
      <span className="field-label">
        <span>{label}</span>
        {action ? <a href="#recover">{action}</a> : null}
      </span>
      <span className="input-shell">
        {children}
        {icon ? (
          <span className="input-static-icon">
            <Icon name={icon} size={16} />
          </span>
        ) : null}
      </span>
    </label>
  );
}

const adminNav = [
  { label: "Overview", to: "/dashboard", icon: "grid" },
  { label: "Orders", to: "/orders", icon: "calendar" },
  { label: "Clients", to: "/clients", icon: "team" },
  { label: "Menu", to: "/menu", icon: "utensils" },
  { label: "Analytics", to: "/analytics", icon: "trend" },
  { label: "Kitchen Ops", to: "/kitchen", icon: "flame" },
  { label: "Staff", to: "/staff", icon: "package" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

function AdminShell({
  children,
  title,
  subtitle,
  search = "Search orders, dishes, or staff...",
  actionLabel = "Add Entry",
  actionTo = "/menu/new",
  user = "Alex Sterling",
  role = "Manager",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-shell">
      {open ? (
        <button
          className="mobile-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <Logo />
        <nav>
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={() => setOpen(false)}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <PrimaryButton to="/orders" icon="plus">
            Quick Order
          </PrimaryButton>
          <SecondaryButton icon="help">Support</SecondaryButton>
          <SecondaryButton icon="logout" tone="danger">
            Log Out
          </SecondaryButton>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button menu-toggle"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Icon name="menu" />
          </button>
          <SearchBox placeholder={search} />
          <div className="topbar-actions">
            {actionTo ? (
              <PrimaryButton to={actionTo} icon="plus">
                {actionLabel}
              </PrimaryButton>
            ) : null}
            <button className="icon-button" type="button" aria-label="Notifications">
              <Icon name="bell" />
            </button>
            <div className="user-chip">
              <span>
                <strong>{user}</strong>
                <small>{role}</small>
              </span>
              <span className="avatar">AS</span>
            </div>
          </div>
        </header>

        <main className="page">
          <div className="page-head">
            <div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function StatCard({ stat }) {
  return (
    <Card className={`stat-card tone-${stat.tone}`}>
      <div className="stat-top">
        <span className="icon-tile">
          <Icon name={stat.icon} size={18} />
        </span>
        <span className="badge">{stat.delta}</span>
      </div>
      <small>{stat.label}</small>
      <strong>{stat.value}</strong>
    </Card>
  );
}

function makePath(values, width = 560, height = 190) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height * 0.72) - 18;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function LineChart({ primary, secondary, labels, id = "chart" }) {
  const width = 560;
  const height = 220;
  const primaryPath = makePath(primary, width, 170);
  const secondaryPath = secondary ? makePath(secondary, width, 170) : "";
  const fillPath = `0,180 ${primaryPath} ${width},180`;

  return (
    <svg className="line-chart" viewBox={`0 0 ${width} ${height}`} role="img">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0a5f49" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0a5f49" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160].map((line) => (
        <line key={line} x1="0" y1={line} x2={width} y2={line} />
      ))}
      <polygon points={fillPath} fill={`url(#${id}-fill)`} />
      {secondary ? (
        <polyline className="line-secondary" points={secondaryPath} />
      ) : null}
      <polyline className="line-primary" points={primaryPath} />
      {labels.map((label, index) => (
        <text key={label} x={(index / (labels.length - 1)) * width} y="210">
          {label}
        </text>
      ))}
    </svg>
  );
}

function DonutChart() {
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 120 120" className="donut">
        <circle cx="60" cy="60" r="42" />
        <circle className="dine" cx="60" cy="60" r="42" />
        <circle className="delivery" cx="60" cy="60" r="42" />
        <circle className="dessert" cx="60" cy="60" r="42" />
      </svg>
      <div>
        <strong>$42.5k</strong>
        <span>Total</span>
      </div>
    </div>
  );
}

function HeatMap({ rows = ["Monday", "Friday", "Sunday"], compact = false }) {
  const cells = compact ? 24 : 42;
  return (
    <div className={`heatmap ${compact ? "compact" : ""}`}>
      {rows.map((row, rowIndex) => (
        <div className="heatmap-row" key={row}>
          <span>{row}</span>
          {Array.from({ length: cells / rows.length }).map((_, index) => {
            const intensity =
              ((index + 1) * (rowIndex + 2) + rowIndex) % 6;
            return (
              <i
                key={`${row}-${index}`}
                style={{ "--heat": `${0.12 + intensity * 0.13}` }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function OverviewPage() {
  const data = useApiData("overview", overview);
  const dishes = useApiData("menu", menuItems);
  const topDishes = useMemo(
    () => [...dishes].sort((a, b) => b.orders - a.orders).slice(0, 4),
    [dishes],
  );

  return (
    <AdminShell
      title="Executive Overview"
      subtitle="Real-time performance metrics for Main Kitchen"
    >
      <div className="stats-grid">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="dashboard-grid">
        <Card className="chart-card">
          <div className="section-title">
            <div>
              <h2>Revenue vs Orders</h2>
              <p>Performance trend over last 24 hours</p>
            </div>
            <div className="legend">
              <span className="dot green" />
              Revenue
              <span className="dot amber" />
              Orders
            </div>
          </div>
          <LineChart
            id="overview"
            primary={data.chart.revenue}
            secondary={data.chart.orders}
            labels={data.chart.labels}
          />
        </Card>

        <Card className="activity-card">
          <div className="section-title compact">
            <h2>Live Activity</h2>
            <span className="badge hot">Live</span>
          </div>
          <div className="activity-list">
            {data.activity.map((item) => (
              <article key={item.title} className={`activity tone-${item.tone}`}>
                <span className="icon-tile">
                  <Icon name={item.icon} size={17} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.meta}</p>
                  <small>{item.time}</small>
                </div>
              </article>
            ))}
          </div>
          <SecondaryButton>View All History</SecondaryButton>
        </Card>
      </div>

      <Card>
        <div className="section-title">
          <div>
            <h2>Top Performing Dishes</h2>
            <p>Menu popularity based on sales volume</p>
          </div>
          <div className="segmented">
            <button className="active" type="button">
              Volume
            </button>
            <button type="button">Revenue</button>
          </div>
        </div>
        <div className="dish-grid">
          {topDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} rank={index + 1} compact />
          ))}
        </div>
      </Card>
    </AdminShell>
  );
}

function DishCard({ dish, rank, compact = false, customer = false }) {
  return (
    <article className={`dish-card ${compact ? "compact" : ""}`}>
      <div className="dish-image" style={{ backgroundImage: `url(${dish.image})` }}>
        {rank ? <span className="image-badge">#{rank} Popular</span> : null}
        {customer ? <span className="rating">★ {dish.rating}</span> : null}
        {dish.status === "Out of Stock" ? <span className="sold-out">Sold Out</span> : null}
      </div>
      <div className="dish-body">
        <div className="dish-head">
          <h3>{customer ? dish.shortName || dish.name : dish.name}</h3>
          <strong>${dish.price.toFixed(2)}</strong>
        </div>
        <p>{dish.description}</p>
        {compact ? (
          <>
            <div className="dish-meta">
              <span>{dish.orders} orders</span>
              <span>{dish.satisfaction}% Satisfaction</span>
            </div>
            <div className="progress">
              <i style={{ width: `${dish.satisfaction}%` }} />
            </div>
          </>
        ) : (
          <button className="btn btn-primary full" type="button">
            <Icon name="cart" size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}

export function MenuManagerPage() {
  const dishes = useApiData("menu", menuItems);
  const [category, setCategory] = useState("All Items");
  const categories = ["All Items", "Appetizers", "Mains", "Drinks"];
  const visible =
    category === "All Items"
      ? dishes.slice(0, 4)
      : dishes.filter((dish) => dish.category === category);
  const mostProfitable = dishes.reduce((best, item) =>
    item.margin > best.margin ? item : best,
  );

  return (
    <AdminShell
      title="Live Menu Management"
      subtitle="Configure your offerings and availability in real-time."
      search="Search menu items..."
    >
      <div className="menu-layout">
        <div>
          <div className="tabs">
            {categories.map((item) => (
              <button
                className={category === item ? "active" : ""}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {visible.map((dish) => (
              <MenuCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
        <aside className="insights-panel">
          <h2>Menu Insights</h2>
          <Card className="insight-card">
            <span className="icon-tile tone-green">
              <Icon name="trend" size={18} />
            </span>
            <small>Most profitable</small>
            <strong>{mostProfitable.name}</strong>
            <div className="metric-row">
              <span>Margin</span>
              <b>{mostProfitable.margin}%</b>
            </div>
            <div className="progress mint">
              <i style={{ width: `${mostProfitable.margin}%` }} />
            </div>
          </Card>
          <Card className="insight-card warning">
            <span className="icon-tile tone-rose">
              <Icon name="alert" size={18} />
            </span>
            <small>Low volume</small>
            <strong>Quinoa Bowl</strong>
            <p>Orders dropped by 12% this week. Consider a lunchtime promotion.</p>
            <SecondaryButton>Apply Promo</SecondaryButton>
          </Card>
          <div className="updates">
            <h3>Live Updates</h3>
            <p>
              <b>Price Change</b>
              Salmon Fillet increased by $2.00
            </p>
            <p>
              <b>Inventory Alert</b>
              King Crab marked as Sold Out
            </p>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

function MenuCard({ dish }) {
  const out = dish.status === "Out of Stock";

  return (
    <article className={`menu-card ${out ? "disabled" : ""}`}>
      <div className="menu-image" style={{ backgroundImage: `url(${dish.image})` }}>
        <span>${dish.price.toFixed(2)}</span>
        {out ? <b>Sold Out</b> : null}
      </div>
      <div className="menu-info">
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <div className="stock-row">
          <span>{dish.status}</span>
          <button className={`toggle ${out ? "" : "on"}`} type="button" aria-label="Toggle stock">
            <i />
          </button>
        </div>
      </div>
    </article>
  );
}

export function OperationsPage() {
  const data = useApiData("operations", operations);

  return (
    <AdminShell
      title="Live Operations"
      subtitle="Real-time status of all active dining tables."
      search="Search orders, tables, or servers..."
      user="Chef Julian"
      role="Head of Kitchen"
    >
      <div className="ops-layout">
        <div>
          <div className="tabs compact-tabs">
            {data.tabs.map((tab, index) => (
              <button className={index === 0 ? "active" : ""} key={tab} type="button">
                {tab}
              </button>
            ))}
          </div>
          <div className="ticket-grid">
            {data.tickets.map((ticket) => (
              <TicketCard key={`${ticket.table}-${ticket.elapsed}`} ticket={ticket} />
            ))}
          </div>
        </div>
        <aside className="right-rail">
          <Card>
            <h2>Kitchen Status</h2>
            <div className="station-list">
              {data.stations.map(([name, load]) => (
                <div key={name}>
                  <div>
                    <span>{name}</span>
                    <b>{load}% Load</b>
                  </div>
                  <div className="progress">
                    <i style={{ width: `${load}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="heat-label">
              <span>Heat Map</span>
              <small>Live Intensity</small>
            </div>
            <HeatMap rows={["Station A", "Station B", "Station C"]} compact />
          </Card>
          <Card className="insight-photo" style={{ backgroundImage: `url(${images.kitchen})` }}>
            <div>
              <span>Operational Insight</span>
              <p>Traffic is 12% higher than last Tuesday. Consider opening prep overflow.</p>
              <Link to="/staff">Staff Rota <Icon name="arrowRight" size={15} /></Link>
            </div>
          </Card>
        </aside>
      </div>
    </AdminShell>
  );
}

function TicketCard({ ticket }) {
  return (
    <Card className={`ticket-card tone-${ticket.tone} ${ticket.featured ? "featured" : ""}`}>
      <div className="ticket-head">
        <small>Table #{ticket.table}</small>
        <span />
      </div>
      <h3>{ticket.state}</h3>
      <div className="ticket-items">
        {ticket.items.map(([name, station]) => (
          <p key={name}>
            <span>{name}</span>
            <b>{station}</b>
          </p>
        ))}
      </div>
      <div className="ticket-foot">
        <span>
          <Icon name="clock" size={15} />
          {ticket.elapsed} elapsed
        </span>
        <button type="button">{ticket.action}</button>
      </div>
    </Card>
  );
}

export function KitchenOpsPage() {
  const board = useApiData("kitchen", kitchenBoard);

  return (
    <AdminShell
      title="Kitchen Ops"
      subtitle="Kanban view for receiving, preparation, cooking, and ready orders."
      search="Search operations..."
      actionLabel="Quick Action"
      user="Daniel K."
      role="Administrator"
    >
      <div className="kpi-row">
        {[
          ["Avg. prep time", "12:45", "clock"],
          ["Active chefs", "08/12", "team"],
          ["Critical items", "02", "alert"],
          ["Kitchen load", "78%", "trend"],
        ].map(([label, value, icon]) => (
          <Card className="kpi-card" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <Icon name={icon} size={22} />
          </Card>
        ))}
      </div>
      <div className="kanban">
        {board.map((column) => (
          <section className="kanban-column" key={column.title}>
            <header>
              <h2>
                <Icon name={column.icon} size={20} />
                {column.title}
              </h2>
              <span>{column.count}</span>
            </header>
            {column.tickets.map((ticket) => (
              <article
                className={`kitchen-ticket ${ticket.active ? "active" : ""} ${
                  ticket.danger ? "danger" : ""
                } ${ticket.complete ? "complete" : ""}`}
                key={`${ticket.id}-${ticket.table}`}
              >
                <div className="ticket-line">
                  <strong>{ticket.id} - {ticket.table}</strong>
                  <span>{ticket.time}</span>
                </div>
                {ticket.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
                {ticket.note ? <small>{ticket.note}</small> : null}
                <div className="ticket-line bottom">
                  <span>{ticket.chef || "Priority"}</span>
                  {ticket.action ? <button type="button">{ticket.action}</button> : <Icon name="check" />}
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </AdminShell>
  );
}

export function AnalyticsPage() {
  const data = useApiData("analytics", analytics);

  return (
    <AdminShell
      title="Performance Analytics"
      subtitle="Last data sync: just now"
      search="Search analytics..."
      actionLabel="Export Report"
      actionTo={null}
    >
      <div className="stats-grid">
        {data.stats.map(([label, value, delta]) => (
          <Card className="analytics-stat" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <span className={delta.startsWith("-") ? "negative" : ""}>{delta}</span>
            <MiniBars />
          </Card>
        ))}
      </div>
      <div className="analytics-layout">
        <Card className="chart-card">
          <div className="section-title">
            <div>
              <h2>Revenue Velocity</h2>
              <p>Daily transaction volume vs projection</p>
            </div>
            <span className="badge">All Locations</span>
          </div>
          <LineChart
            id="velocity"
            primary={data.velocity}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          />
        </Card>
        <Card>
          <h2>Menu Popularity</h2>
          <div className="popularity-list">
            {data.popularity.map(([label, share]) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <b>{share}% Share</b>
                </div>
                <div className="progress">
                  <i style={{ width: `${share * 2.2}%` }} />
                </div>
              </div>
            ))}
          </div>
          <SecondaryButton>View Full Menu Analytics</SecondaryButton>
        </Card>
        <Card>
          <h2>Occupancy Heatmap</h2>
          <HeatMap rows={["Mon", "Wed", "Fri", "Sat"]} compact />
        </Card>
        <Card>
          <h2>Demand Forecast</h2>
          <div className="forecast-grid">
            <span>
              Expected covers <b>284</b>
            </span>
            <span>
              Staffing need <b>High</b>
            </span>
          </div>
          <div className="recommendation">
            <Icon name="trend" size={17} />
            <p>
              Saturday dinner service is projected to peak 45 minutes earlier
              than usual. Advise moving bridge shift to 4:15 PM.
            </p>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}

function MiniBars() {
  return (
    <div className="mini-bars">
      {[22, 34, 28, 41, 35, 57].map((height, index) => (
        <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

export function StaffPage() {
  const data = useApiData("staff", staff);

  return (
    <AdminShell
      title="Staff Management Hub"
      subtitle="Oversee your kitchen brigade and administrative personnel efficiency."
      search="Search staff, shifts, or roles..."
      actionLabel="Add Entry"
    >
      <div className="stats-grid">
        {data.stats.map(([label, value, delta, tone]) => (
          <Card className={`staff-stat tone-${tone}`} key={label}>
            <span className="icon-tile">
              <Icon name={label.includes("Staff") ? "team" : label.includes("Pending") ? "alert" : "trend"} />
            </span>
            <small>{label}</small>
            <strong>{value}</strong>
            <span className="badge">{delta}</span>
          </Card>
        ))}
      </div>

      <Card>
        <div className="section-title">
          <h2>Staff Roster</h2>
          <SecondaryButton icon="filter">All Departments</SecondaryButton>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Activity</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.roster.map(([name, role, status, last, score]) => (
                <tr key={name}>
                  <td>
                    <span className="avatar small">{initials(name)}</span>
                    <span>
                      <strong>{name}</strong>
                      <small>{name.toLowerCase().replace(" ", ".")}@dineflow.com</small>
                    </span>
                  </td>
                  <td><span className="pill">{role}</span></td>
                  <td><span className="status-dot" /> {status}</td>
                  <td>{last}</td>
                  <td>
                    <div className="progress">
                      <i style={{ width: `${score}%` }} />
                    </div>
                    {score}%
                  </td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="split-grid">
        <Card className="staff-distribution">
          <div className="section-title">
            <div>
              <h2>Staff Distribution</h2>
              <p>Breakdown by brigade category</p>
            </div>
            <Link to="/analytics">View Trends <Icon name="arrowRight" size={14} /></Link>
          </div>
          <div className="distribution-bars">
            {["Kitchen", "Servers", "Bar", "Admin", "Logistics"].map((label, index) => (
              <span key={label}>
                <i style={{ height: `${30 + index * 12}%` }} />
                {label}
              </span>
            ))}
          </div>
        </Card>
        <ImagePanel image={images.restaurant} className="event-card">
          <span className="badge hot">Internal News</span>
          <h2>Staff Gala 2024</h2>
          <p>Annual celebration scheduled for December 15th.</p>
          <SecondaryButton>RSVP Details</SecondaryButton>
        </ImagePanel>
      </div>
    </AdminShell>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function SettingsBillingPage() {
  const data = useApiData("billing", billing);

  return (
    <AdminShell
      title="Settings & Billing"
      subtitle="Manage subscription, invoices, restaurant identity, and operating details."
      search="Search billing history..."
      actionTo={null}
      user="Jameson O'Hara"
      role="Owner"
    >
      <div className="billing-hero">
        <Card className="plan-card">
          <span className="eyebrow">Current Tier</span>
          <span className="badge active-sub">Active Subscription</span>
          <h2>{data.tier}</h2>
          <p>
            Full access to advanced analytics, priority support, and unlimited
            staff members. Your next renewal is on {data.renewal}.
          </p>
          <div className="button-row">
            <PrimaryButton icon="arrowRight">Upgrade to Enterprise</PrimaryButton>
            <SecondaryButton>Manage Plan</SecondaryButton>
          </div>
          <strong className="plan-price">{data.amount}</strong>
        </Card>
        <Card className="payment-card">
          <small>Default Method</small>
          <h3>Visa Business</h3>
          <p>•••• •••• •••• 8842</p>
          <div>
            <span>Expiry <b>12 / 26</b></span>
            <span>Cardholder <b>Jameson O'Hara</b></span>
          </div>
          <SecondaryButton icon="creditCard">Edit Payment Method</SecondaryButton>
        </Card>
      </div>

      <Card>
        <div className="section-title">
          <div>
            <h2>Billing History</h2>
            <p>Download and manage your past service invoices.</p>
          </div>
          <SecondaryButton icon="download">Export All (CSV)</SecondaryButton>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.invoices.map(([id, date, amount, status]) => (
                <tr key={id}>
                  <td><strong>{id}</strong></td>
                  <td>{date}</td>
                  <td>{amount}</td>
                  <td><span className="status-dot" /> {status}</td>
                  <td><SecondaryButton icon="download">View PDF</SecondaryButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <RestaurantProfileCard />
    </AdminShell>
  );
}

function RestaurantProfileCard() {
  return (
    <Card className="profile-card">
      <ImagePanel image={images.restaurant} className="profile-cover">
        <span className="brand-mark large">
          <Icon name="utensils" size={28} />
        </span>
        <div>
          <h2>The Emerald Grove</h2>
          <p>Fine Dining - Contemporary Cuisine</p>
        </div>
        <SecondaryButton icon="edit">Update Cover</SecondaryButton>
      </ImagePanel>
      <div className="profile-grid">
        <div>
          <h3>Restaurant Details</h3>
          <p><b>Cuisine Type</b> Contemporary French, Seafood</p>
          <p><b>Email Address</b> reservations@emeraldgrove.com</p>
        </div>
        <div>
          <h3>Business Hours</h3>
          <p><b>Mon - Fri</b> 11:00 AM - 10:00 PM</p>
          <p><b>Saturday</b> 10:00 AM - 11:30 PM</p>
          <p><b>Sunday</b> Closed</p>
        </div>
        <div>
          <h3>Location</h3>
          <div className="map-tile" style={{ backgroundImage: `url(${images.map})` }}>
            <span className="brand-mark"><Icon name="utensils" size={17} /></span>
          </div>
          <p>1248 North Michigan Avenue, Chicago, IL</p>
        </div>
      </div>
    </Card>
  );
}

export function ReservationsPage() {
  const data = useApiData("reservations", reservations);

  return (
    <AdminShell
      title="Upcoming"
      subtitle="24 guests scheduled for October 24, 2023 dinner shift."
      search="Search tables or guests..."
      user="Chef Julian"
      role="Floor Manager"
    >
      <div className="reservation-layout">
        <aside className="reservation-list">
          {data.upcoming.map(([time, name, people, table, tag]) => (
            <Card key={`${time}-${name}`} className={tag.includes("VIP") ? "selected" : ""}>
              <strong>{time}</strong>
              <h3>{name}</h3>
              <p>{people} - {table}</p>
              <span>{tag}</span>
            </Card>
          ))}
        </aside>
        <Card className="floor-plan">
          <div className="tabs floor-tabs">
            <button className="active" type="button">Main Dining</button>
            <button type="button">Garden Terrace</button>
            <button type="button">Bar Lounge</button>
          </div>
          <div className="legend">
            <span className="dot muted" /> Available
            <span className="dot amber" /> Reserved
            <span className="dot green" /> Occupied
          </div>
          <div className="floor-area">
            <span className="pass-label">Kitchen Pass</span>
            <span className="entrance-label">Entrance</span>
            <span className="maintenance">Booth Section A<br />Under Maintenance</span>
            {data.tables.map((table) => (
              <button
                className={`table-node ${table.status}`}
                key={table.id}
                style={{ left: `${table.x}%`, top: `${table.y}%` }}
                type="button"
              >
                <strong>{table.id}</strong>
                <small>{table.seats} seats</small>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}

export function ClientsPage() {
  const data = useApiData("analytics", analytics);

  return (
    <AdminShell
      title="Guest Intelligence"
      subtitle="Loyalty, customer behavior, and member health across DineFlow."
      search="Search clients..."
      actionLabel="Reserve Table"
      actionTo="/orders"
    >
      <div className="analytics-layout clients-layout">
        <Card>
          <h2>Customer Loyalty Stats</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Total Spend</th>
                  <th>Visit Count</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.loyalty.map(([name, member, spend, visits, status]) => (
                  <tr key={name}>
                    <td>
                      <span className="avatar small">{initials(name)}</span>
                      <span>
                        <strong>{name}</strong>
                        <small>{member}</small>
                      </span>
                    </td>
                    <td>{spend}</td>
                    <td>{visits}</td>
                    <td>{status === "At Risk" ? "Yesterday" : "2 days ago"}</td>
                    <td><span className="pill">{status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h2>Revenue by Category</h2>
          <DonutChart />
          <ul className="category-list">
            <li><span className="dot green" /> Main Course <b>45%</b></li>
            <li><span className="dot amber" /> Beverages <b>30%</b></li>
            <li><span className="dot mint" /> Desserts <b>25%</b></li>
          </ul>
        </Card>
        <Card className="wide">
          <h2>Order Density Heatmap</h2>
          <HeatMap />
        </Card>
      </div>
    </AdminShell>
  );
}

export function NewMenuItemPage() {
  return (
    <AdminShell
      title="Create New Menu Item"
      subtitle="Menu Manager - Add New Item"
      search="Cuisine, restaurant, or dish"
      actionLabel="Publish Item"
      actionTo={null}
    >
      <div className="builder-layout">
        <div className="form-stack">
          <Card>
            <h2>General Information</h2>
            <Field label="Food Name">
              <input placeholder="e.g. Truffle Infused Risotto" />
            </Field>
            <Field label="Description">
              <textarea placeholder="Describe the flavors, ingredients, and textures..." />
            </Field>
            <div className="field-grid">
              <Field label="Category">
                <select defaultValue="Main Course">
                  <option>Main Course</option>
                  <option>Appetizer</option>
                  <option>Dessert</option>
                </select>
              </Field>
              <Field label="Prep Time (mins)">
                <input defaultValue="20" />
              </Field>
            </div>
          </Card>
          <Card>
            <h2>Pricing & Inventory</h2>
            <div className="field-grid">
              <Field label="Price ($)">
                <input placeholder="$ 24.00" />
              </Field>
              <Field label="Tax Rate (%)">
                <input defaultValue="8.5" />
              </Field>
            </div>
          </Card>
          <Card>
            <h2>Media Assets</h2>
            <div className="dropzone">
              <Icon name="upload" size={34} />
              <strong>Click or drag & drop high-res food photography</strong>
              <small>Recommended: 1200 x 800px - JPG or PNG</small>
            </div>
          </Card>
        </div>
        <aside>
          <p className="preview-label">Live Customer Preview</p>
          <DishCard dish={menuItems[3]} customer />
          <Card className="tip-card">
            <Icon name="trend" />
            <div>
              <strong>DineFlow Tip</strong>
              <p>High-quality photos increase menu item conversion by up to 27%.</p>
            </div>
          </Card>
        </aside>
      </div>
    </AdminShell>
  );
}

export function CustomerMenuPage() {
  const dishes = useApiData("menu", menuItems);
  const [fulfillment, setFulfillment] = useState("Delivery");

  return (
    <main className="public-shell order-shell">
      <PublicTopbar />
      <section className="public-main">
        <div className="customer-content">
          <div className="public-head">
            <div>
              <h1>Explore Our Menu</h1>
              <p>Hand-crafted perfection delivered to your doorstep.</p>
            </div>
            <div className="segmented">
              {["Delivery", "Pickup"].map((item) => (
                <button
                  className={fulfillment === item ? "active" : ""}
                  key={item}
                  type="button"
                  onClick={() => setFulfillment(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="category-chips">
            {["All Dishes", "Appetizers", "Mains", "Drinks", "Desserts"].map((chip, index) => (
              <button className={index === 0 ? "active" : ""} key={chip} type="button">
                <Icon name={index === 0 ? "utensils" : "filter"} size={15} />
                {chip}
              </button>
            ))}
          </div>
          <div className="customer-grid">
            {dishes.slice(0, 4).map((dish) => (
              <DishCard key={dish.id} dish={dish} customer />
            ))}
          </div>
        </div>
        <CartPanel />
      </section>
    </main>
  );
}

function CartPanel() {
  return (
    <aside className="cart-panel">
      <div className="section-title compact">
        <h2>My Cart</h2>
        <span className="badge mint">3 Items</span>
      </div>
      <div className="cart-items">
        {[
          ["Signature Truffle Burger", "No onions, extra sauce", "$18.50", images.burger],
          ["Garden Margherita", "Standard", "$32.00", menuItems[4].image],
        ].map(([name, note, price, image], index) => (
          <article key={name}>
            <span style={{ backgroundImage: `url(${image})` }} />
            <div>
              <strong>{name}</strong>
              <small>{note}</small>
              <div className="quantity">- <b>{index + 1}</b> +</div>
            </div>
            <b>{price}</b>
          </article>
        ))}
      </div>
      <div className="cart-total">
        <p><span>Subtotal</span><b>$50.50</b></p>
        <p><span>Delivery Fee</span><b>$2.99</b></p>
        <strong><span>Total</span><b>$53.49</b></strong>
        <PrimaryButton>Go to Checkout</PrimaryButton>
      </div>
    </aside>
  );
}

function PublicTopbar() {
  return (
    <header className="public-topbar">
      <Link className="wordmark" to="/">DineFlow</Link>
      <nav>
        <NavLink to="/customer-menu">Menu</NavLink>
        <NavLink to="/orders">Reservations</NavLink>
        <NavLink to="/discover">Explore</NavLink>
      </nav>
      <SearchBox placeholder="Search dishes..." />
      <Link className="btn btn-primary" to="/login">Login</Link>
    </header>
  );
}

export function RestaurantMenuPage() {
  return (
    <main className="public-shell restaurant-menu">
      <PublicTopbar />
      <section className="public-main">
        <div className="customer-content">
          <ImagePanel image={images.restaurant} className="restaurant-hero">
            <span className="badge mint">Open until 11:00 PM</span>
            <h1>The Emerald Grove</h1>
            <p>Curated seasonal excellence where culinary precision meets organic luxury.</p>
          </ImagePanel>
          <div className="category-chips">
            {["Appetizers", "Mains", "Drinks", "Desserts"].map((chip, index) => (
              <button className={index === 0 ? "active" : ""} key={chip} type="button">
                <Icon name="utensils" size={15} />
                {chip}
              </button>
            ))}
          </div>
          <div className="customer-grid two">
            {menuItems.slice(3, 7).map((dish) => (
              <DishCard key={dish.id} dish={dish} customer />
            ))}
          </div>
        </div>
        <CartPanel />
      </section>
    </main>
  );
}

export function DiscoverPage() {
  return (
    <main className="public-shell discover-shell">
      <PublicTopbar />
      <section className="discover-hero">
        <h1>Find your next culinary obsession.</h1>
        <p>
          Curated dining experiences from innovative kitchens, delivered or
          reserved with precision.
        </p>
        <div className="hero-search">
          <SearchBox placeholder="What are you craving?" />
          <PrimaryButton icon="map">Explore Nearby</PrimaryButton>
        </div>
      </section>
      <div className="category-chips discover-filters">
        {["All Filters", "Ratings 4.5+", "Price: High to Low", "Under 2 miles", "Open Now"].map((chip, index) => (
          <button className={index === 0 ? "active" : ""} key={chip} type="button">
            {chip}
          </button>
        ))}
      </div>
      <section className="restaurant-section">
        <div className="section-title">
          <div>
            <h2>Trending Restaurants</h2>
            <p>The most sought-after tables in your city right now.</p>
          </div>
          <Link to="/restaurant">View leaderboard <Icon name="arrowRight" size={14} /></Link>
        </div>
        <div className="restaurant-grid featured">
          {publicMenu.restaurants.slice(0, 2).map((restaurant) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          ))}
        </div>
      </section>
      <section className="restaurant-section">
        <h2>Nearby Favorites</h2>
        <div className="restaurant-grid small">
          {publicMenu.restaurants.slice(2).map((restaurant) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} small />
          ))}
        </div>
      </section>
    </main>
  );
}

function RestaurantCard({ restaurant, small = false }) {
  return (
    <Link
      className={`restaurant-card ${small ? "small" : ""}`}
      to="/restaurant"
      style={{ backgroundImage: `url(${restaurant.image})` }}
    >
      <span className="badge mint">{small ? restaurant.rating : "Featured Venue"}</span>
      <div>
        <strong>{restaurant.name}</strong>
        <p>{restaurant.meta}</p>
      </div>
    </Link>
  );
}

export function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <Logo subline="Restaurant OS" />
        <nav>
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
        </nav>
        <div>
          <Link to="/login">Login</Link>
          <Link className="trial-button" to="/register">Start Free Trial</Link>
        </div>
      </header>
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="live-pill"><i /> Next-gen restaurant OS</span>
          <h1>Master the Art of Modern Hospitality</h1>
          <p>
            The unified command center for restaurants. Streamline operations,
            boost kitchen efficiency, and delight guests with data-driven precision.
          </p>
          <div className="landing-actions">
            <PrimaryButton to="/register">Start Your Free Trial</PrimaryButton>
            <SecondaryButton to="/dashboard" icon="arrowRight">Watch Demo</SecondaryButton>
          </div>
          <div className="landing-stats">
            <span><strong>15%</strong> Efficiency Increase</span>
            <span><strong>4.9/5</strong> Guest Rating</span>
            <span><strong>2.4k+</strong> Active Venues</span>
          </div>
        </div>
        <div className="dashboard-preview">
          <div className="browser-bar">
            <i /><i /><i />
            <span>restaurant.dineflow.app</span>
          </div>
          <div className="preview-content">
            <div className="preview-side">
              {["Overview", "Orders", "Inventory", "Analytics", "Staff"].map((item, index) => (
                <span className={index === 0 ? "active" : ""} key={item}>{item}</span>
              ))}
            </div>
            <div className="preview-main">
              <div className="preview-cards">
                <span><b>$987</b> Today's Revenue</span>
                <span><b>$853</b> Total Orders</span>
                <span><b>36</b> Avg Prep</span>
              </div>
              <LineChart id="landing" primary={overview.chart.revenue} labels={["Jan", "Feb", "Mar", "Apr", "May"]} />
              <div className="preview-table">
                {["Beef Burger", "Pan-Seared Salmon", "Truffle Gnocchi"].map((item) => (
                  <p key={item}><span>{item}</span><b>Completed</b></p>
                ))}
              </div>
            </div>
          </div>
          <div className="floating-card live">
            <Icon name="trend" />
            <span>Live now</span>
            <strong>Optimal (82%)</strong>
            <div className="progress mint"><i style={{ width: "82%" }} /></div>
          </div>
          <div className="floating-card guest">
            <span className="avatar">JD</span>
            <strong>Guest Satisfaction</strong>
            <small>Seamless reservation recovery handled automatically.</small>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DineFlowApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<CreateAccountPage />} />
      <Route path="/dashboard" element={<OverviewPage />} />
      <Route path="/orders" element={<ReservationsPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/menu" element={<MenuManagerPage />} />
      <Route path="/menu/new" element={<NewMenuItemPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/kitchen" element={<KitchenOpsPage />} />
      <Route path="/operations" element={<OperationsPage />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/settings" element={<SettingsBillingPage />} />
      <Route path="/customer-menu" element={<CustomerMenuPage />} />
      <Route path="/restaurant" element={<RestaurantMenuPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
    </Routes>
  );
}
