import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BURGER_BG =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80";
const CHICKEN_BG =
  "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=900&q=80";

const styles = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%; width: 100%;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── ROOT ── */
  .auth-root {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  /* ── LEFT PANEL ── */
  .left-panel {
    width: 46%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(20px, 4vh, 48px) clamp(24px, 4vw, 52px);
    position: relative;
    z-index: 2;
    overflow: hidden;
    flex-shrink: 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: clamp(16px, 2.5vh, 36px);
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: #1a3d2b;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .logo-icon svg { color: #fff; }
  .logo-name { font-size: 18px; font-weight: 700; color: #111; letter-spacing: -0.3px; }

  .form-heading { font-size: clamp(20px, 2.4vh, 28px); font-weight: 700; color: #111; margin-bottom: 3px; }
  .form-subheading { font-size: clamp(12px, 1.4vh, 14px); color: #777; margin-bottom: clamp(14px, 2vh, 28px); }

  .field { margin-bottom: clamp(10px, 1.4vh, 16px); }
  .field label { display: block; font-size: clamp(11px, 1.2vh, 13px); font-weight: 500; color: #333; margin-bottom: 5px; }
  .field input {
    width: 100%;
    padding: clamp(8px, 1.1vh, 11px) 14px;
    border: 1.5px solid #e8e8e8;
    border-radius: 8px;
    font-size: clamp(12px, 1.3vh, 14px); font-family: inherit;
    color: #111; background: #f9f9f9;
    outline: none; transition: border 0.2s;
  }
  .field input:focus { border-color: #1a3d2b; background: #fff; }
  .field input::placeholder { color: #bbb; }

  .field-row { display: flex; gap: 12px; }
  .field-row .field { flex: 1; }

  .field-icon-wrap { position: relative; }
  .field-icon-wrap input { padding-right: 38px; }
  .field-icon-wrap .icon {
    position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
    color: #aaa; cursor: pointer; display: flex;
  }

  .forgot {
    font-size: clamp(11px, 1.2vh, 13px); font-weight: 500;
    color: #c0392b; text-decoration: none; line-height: 1;
  }

  .checkbox-row {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: clamp(12px, 1.8vh, 22px);
    font-size: clamp(11px, 1.2vh, 13px); color: #555;
  }
  .checkbox-row input[type=checkbox] { accent-color: #1a3d2b; width: 14px; height: 14px; flex-shrink: 0; }
  .checkbox-row a { color: #1a3d2b; text-decoration: none; font-weight: 500; }

  .btn-primary {
    width: 100%;
    padding: clamp(10px, 1.3vh, 13px);
    background: #1a3d2b; color: #fff;
    border: none; border-radius: 8px;
    font-size: clamp(13px, 1.4vh, 15px); font-weight: 600; font-family: inherit;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.1s;
    margin-bottom: clamp(10px, 1.4vh, 16px);
    flex-shrink: 0;
  }
  .btn-primary:hover { background: #153323; }
  .btn-primary:active { transform: scale(0.99); }

  .alt-link { text-align: center; font-size: clamp(11px, 1.2vh, 13.5px); color: #777; }
  .alt-link a { color: #1a3d2b; font-weight: 600; text-decoration: none; }

  .divider {
    display: flex; align-items: center; gap: 10px;
    font-size: clamp(10px, 1.1vh, 12px); color: #aaa; letter-spacing: 0.08em;
    margin: clamp(8px, 1.2vh, 16px) 0;
    text-transform: uppercase;
  }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #ebebeb; }

  .social-row { display: flex; gap: 10px; margin-bottom: clamp(10px, 1.4vh, 20px); }
  .btn-social {
    flex: 1; padding: clamp(8px, 1vh, 10px) 12px;
    border: 1.5px solid #e0e0e0; border-radius: 8px;
    background: #fff; font-size: clamp(12px, 1.3vh, 14px); font-weight: 500;
    font-family: inherit; cursor: pointer; color: #222;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: background 0.15s, border-color 0.15s;
  }
  .btn-social:hover { background: #f5f5f5; border-color: #c5c5c5; }

  .footer-links { text-align: center; font-size: clamp(10px, 1.1vh, 12px); color: #aaa; margin-top: clamp(8px, 1.2vh, 16px); }
  .footer-links a { color: #aaa; text-decoration: none; margin: 0 8px; }
  .footer-links a:hover { color: #555; }

  .link-btn {
    background: none; border: none; padding: 0; cursor: pointer;
    font-family: inherit; font-size: inherit;
  }

  /* ── RIGHT PANEL ── */
  .right-panel {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .right-panel img.bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover; object-position: center;
  }
  .right-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 100%);
  }
  .right-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start;
    height: 100%; padding: clamp(20px, 3vw, 40px);
    gap: clamp(10px, 1.5vh, 16px);
  }

  /* Testimonial card */
  .testimonial-card {
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 14px;
    padding: clamp(14px, 2vh, 22px) clamp(14px, 2vw, 22px);
    max-width: 360px; width: 100%;
    color: #fff;
  }
  .stars { color: #4ade80; font-size: clamp(14px, 1.8vh, 18px); letter-spacing: 2px; margin-bottom: clamp(8px, 1vh, 12px); }
  .testimonial-text {
    font-size: clamp(11px, 1.3vh, 13.5px); line-height: 1.55; font-style: italic; font-weight: 500;
    margin-bottom: clamp(10px, 1.2vh, 14px);
  }
  .testimonial-author { display: flex; align-items: center; gap: 10px; }
  .author-avatar-placeholder {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg,#4ade80,#1a3d2b);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; color: #fff;
    border: 2px solid rgba(255,255,255,0.4); flex-shrink: 0;
  }
  .author-name { font-size: clamp(12px, 1.3vh, 14px); font-weight: 700; }
  .author-title { font-size: clamp(10px, 1.1vh, 12px); color: #4ade80; font-weight: 500; }

  /* Stats row */
  .stats-row { display: flex; gap: 10px; }
  .stat-card {
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 12px;
    padding: clamp(10px, 1.3vh, 14px) clamp(14px, 1.8vw, 22px);
    text-align: center; color: #fff;
  }
  .stat-icon { margin-bottom: 3px; display: flex; justify-content: center; }
  .stat-value { font-size: clamp(16px, 2vh, 20px); font-weight: 700; }
  .stat-label { font-size: clamp(9px, 1vh, 11px); color: rgba(255,255,255,0.7); margin-top: 2px; }

  /* Live badge */
  .live-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 20px; padding: 5px 13px;
    font-size: clamp(10px, 1.1vh, 12px); font-weight: 600; color: #fff;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .live-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
    animation: pulse 1.5s infinite; flex-shrink: 0;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
    50% { opacity: 0.8; box-shadow: 0 0 0 5px rgba(74,222,128,0); }
  }

  /* Brand card (sign in right panel) */
  .brand-card {
    background: rgba(255,255,255,0.9);
    border-radius: 16px;
    padding: clamp(20px, 3vh, 32px) clamp(24px, 3vw, 40px);
    text-align: center; max-width: 320px; width: 100%;
  }
  .brand-card .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 3vw, 34px); font-weight: 700;
    color: #1a3d2b; letter-spacing: 2px; margin-bottom: 6px;
  }
  .brand-card .brand-tagline {
    font-size: clamp(10px, 1.2vw, 13px); font-weight: 600;
    color: #555; letter-spacing: 3px; text-transform: uppercase;
  }
  .right-center {
    position: relative; z-index: 2;
    display: flex; align-items: center; justify-content: center;
    height: 100%; padding: 40px;
  }

  /* ── MOBILE: stack vertically, right panel becomes a top banner ── */
  @media (max-width: 640px) {
    .auth-root { flex-direction: column; }

    .left-panel {
      width: 100%;
      flex: 1;
      padding: 24px 24px 20px;
      overflow-y: auto;
      justify-content: flex-start;
    }

    .right-panel { 
      width: 100%; 
      height: 180px; 
      flex-shrink: 0;
      order: -1;
    }

    .right-content {
      padding: 16px 20px;
      gap: 10px;
      justify-content: flex-end;
    }

    .testimonial-card { max-width: 100%; padding: 12px 14px; }
    .testimonial-text { display: none; }
    .stats-row { gap: 8px; }
    .stat-card { padding: 8px 14px; }

    .right-center { padding: 20px; }
    .brand-card { padding: 16px 24px; }
    .brand-card .brand-name { font-size: 22px; }

    .field-row { flex-direction: column; gap: 0; }
    .logo { margin-bottom: 14px; }
    .form-subheading { margin-bottom: 14px; }
  }

  /* ── TABLET ── */
  @media (min-width: 641px) and (max-width: 900px) {
    .left-panel { width: 52%; padding: 32px 36px; }
    .testimonial-text { font-size: 12px; }
  }
`;

// ── Icons ──
const CutleryIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h1v5" />
  </svg>
);
const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const AtIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
  </svg>
);
const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4ade80"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ZapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4ade80"
    strokeWidth="2"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ── CREATE ACCOUNT PAGE ──
function CreateAccountPage({ onSwitch }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="auth-root">
      {/* Left */}
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">
            <CutleryIcon />
          </div>
          <span className="logo-name">DineFlow</span>
        </div>

        <h1 className="form-heading">Create your account</h1>
        <p className="form-subheading">Step 1 of 2: Enterprise Details</p>

        <div className="field">
          <label>Restaurant Name</label>
          <input type="text" placeholder="The Silver Palate" />
        </div>
        <div className="field">
          <label>Owner Name</label>
          <input type="text" placeholder="Julianne Moore" />
        </div>
        <div className="field">
          <label>Email Address</label>
          <input type="email" placeholder="julianne@dineflow.com" />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Password</label>
            <div className="field-icon-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
              />
              <span className="icon" onClick={() => setShowPass((p) => !p)}>
                <EyeIcon />
              </span>
            </div>
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <div className="field-icon-wrap">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
              />
              <span className="icon" onClick={() => setShowConfirm((p) => !p)}>
                <EyeIcon />
              </span>
            </div>
          </div>
        </div>

        <div className="checkbox-row">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </label>
        </div>

        <button className="btn-primary">
          Create Account <ArrowIcon />
        </button>

        <p className="alt-link">
          Already have an account?{" "}
          <button
            className="link-btn"
            style={{ color: "#1a3d2b", fontWeight: 600 }}
            onClick={onSwitch}
          >
            Sign In
          </button>
        </p>
      </div>

      {/* Right */}
      <div className="right-panel">
        <img className="bg" src={BURGER_BG} alt="Delicious food" />
        <div className="right-overlay" />
        <div className="right-content">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "DineFlow has completely transformed how we orchestrate service at
              Le Jardin. The precision and real-time insights allow my team to
              focus entirely on the culinary experience."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar-placeholder">MV</div>
              <div>
                <div className="author-name">Chef Marco Valesquez</div>
                <div className="author-title">
                  3 Michelin Stars, Executive Director
                </div>
              </div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon">
                <ClockIcon />
              </div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Platform Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <ZapIcon />
              </div>
              <div className="stat-value">1.2s</div>
              <div className="stat-label">Sync Latency</div>
            </div>
          </div>

          <div className="live-badge">
            <div className="live-dot" />
            Live Operations Active
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SIGN IN PAGE ──
function SignInPage({ onSwitch }) {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      setMessage("You have to enter your email and password");
      setShowMessage(true);
      return;
    }

    if (formData.email != "foreverhyacinthe@gmail.com") {
      setMessage("You have entered wrong email");
      setShowMessage(true);
      return;
    }

    if (formData.password != "forever@123") {
      setMessage("You have entered wrong password");
      setShowMessage(true);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-root">
      {/* Left */}
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">
            <CutleryIcon />
          </div>
          <span className="logo-name">DineFlow</span>
        </div>

        <h1 className="form-heading">Welcome Back</h1>
        <p className="form-subheading">
          Enter your credentials to access the kitchen admin dashboard.
        </p>

        <div className="field">
          <label>Email Address</label>
          <div className="field-icon-wrap">
            <input
              type="email"
              placeholder="chef@dineflow.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <span className="icon">
              <AtIcon />
            </span>
          </div>
        </div>

        <div className="field">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ marginBottom: 0 }}>Password</label>
            <a href="#" className="forgot">
              Forgot password?
            </a>
          </div>
          <div className="field-icon-wrap" style={{ marginTop: 6 }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span className="icon" onClick={() => setShowPass((p) => !p)}>
              <EyeIcon />
            </span>
          </div>
        </div>

        <div className="checkbox-row" style={{ marginTop: 4 }}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember this device for 30 days</label>
        </div>

        <button className="btn-primary" onClick={handleLogin}>
          Sign In to Dashboard <ArrowIcon />
        </button>
        {showMessage && <p style={{ color: "red" }}>{message}</p>}

        <div className="divider">or continue with</div>

        <div className="social-row">
          <button className="btn-social">
            <GoogleIcon /> Google
          </button>
          <button className="btn-social">
            <AppleIcon /> Apple
          </button>
        </div>

        <p className="alt-link" style={{ marginBottom: 24 }}>
          Don't have an account?{" "}
          <button
            className="link-btn"
            style={{ color: "#1a3d2b", fontWeight: 600 }}
            onClick={onSwitch}
          >
            Signup
          </button>
        </p>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      {/* Right */}
      <div className="right-panel">
        <img className="bg" src={CHICKEN_BG} alt="Delicious food" />
        <div className="right-overlay" />
        <div className="right-center">
          <div className="brand-card">
            <div className="brand-name">DINEFLOW</div>
            <div className="brand-tagline">Manage. Serve. Grow.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── APP ──
export default function DineflowAuth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      <style>{styles}</style>
      {isSignIn ? (
        <SignInPage onSwitch={() => setIsSignIn(false)} />
      ) : (
        <CreateAccountPage onSwitch={() => setIsSignIn(true)} />
      )}
    </>
  );
}
