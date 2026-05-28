import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

// ─────────────────────────────────────────────
// Image constants — swap these for your own paths
// ─────────────────────────────────────────────
const BURGER_BG  = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80";
const CHICKEN_BG = "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=900&q=80";

// ─────────────────────────────────────────────
// SVG Icons
// ─────────────────────────────────────────────
const CutleryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h1v5"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const AtIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4"/>
    <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

// ─────────────────────────────────────────────
// Shared: Logo
// ─────────────────────────────────────────────
function Logo() {
  return (
    <div className="logo flex items-center gap-2.5">
      <div className="w-9 h-9 bg-[#1a3d2b] rounded-lg flex items-center justify-content-center flex-shrink-0 text-white flex justify-center">
        <CutleryIcon />
      </div>
      <span className="text-lg font-bold text-[#111] tracking-tight">DineFlow</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Shared: Right panel layout wrapper
// ─────────────────────────────────────────────
function RightPanel({ bgSrc, children, contentClass = "right-content flex flex-col justify-end items-start h-full" }) {
  return (
    <div className="right-panel relative flex-1 overflow-hidden">
      <img
        src={bgSrc}
        alt="Food background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="right-overlay absolute inset-0" />
      <div className={`relative z-10 ${contentClass}`}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CREATE ACCOUNT PAGE
// ─────────────────────────────────────────────
export function CreateAccountPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="auth-root flex h-screen w-screen overflow-hidden">

      {/* ── Left panel ── */}
      <div className="left-panel flex flex-col justify-center bg-white z-10 overflow-hidden flex-shrink-0 w-[46%]">
        <Logo />

        <h1 className="form-heading font-bold text-[#111] mb-1">Create your account</h1>
        <p className="form-subheading text-[#777]">Step 1 of 2: Enterprise Details</p>

        {/* Restaurant Name */}
        <div className="field">
          <label className="block font-medium text-[#333] mb-1.5">Restaurant Name</label>
          <input
            type="text"
            placeholder="The Silver Palate"
            className="auth-input w-full border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
          />
        </div>

        {/* Owner Name */}
        <div className="field">
          <label className="block font-medium text-[#333] mb-1.5">Owner Name</label>
          <input
            type="text"
            placeholder="Julianne Moore"
            className="auth-input w-full border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
          />
        </div>

        {/* Email */}
        <div className="field">
          <label className="block font-medium text-[#333] mb-1.5">Email Address</label>
          <input
            type="email"
            placeholder="julianne@dineflow.com"
            className="auth-input w-full border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
          />
        </div>

        {/* Password row */}
        <div className="field-row flex gap-3">
          <div className="field flex-1">
            <label className="block font-medium text-[#333] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="auth-input w-full pr-10 border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] cursor-pointer flex"
              >
                <EyeIcon />
              </button>
            </div>
          </div>
          <div className="field flex-1">
            <label className="block font-medium text-[#333] mb-1.5">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="auth-input w-full pr-10 border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] cursor-pointer flex"
              >
                <EyeIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Terms checkbox */}
        <div className="checkbox-row flex items-center gap-2 text-[#555]">
          <input
            type="checkbox"
            id="terms"
            className="w-3.5 h-3.5 flex-shrink-0 accent-[#1a3d2b]"
          />
          <label htmlFor="terms" className="text-[#555] cursor-pointer">
            I agree to the{" "}
            <a href="#" className="text-[#1a3d2b] font-medium no-underline hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-[#1a3d2b] font-medium no-underline hover:underline">Privacy Policy</a>.
          </label>
        </div>

        {/* Submit */}
        <button className="btn-primary w-full bg-[#1a3d2b] hover:bg-[#153323] active:scale-[0.99] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-none flex-shrink-0">
          Create Account <ArrowIcon />
        </button>

        <p className="alt-link text-center text-[#777]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#1a3d2b] font-semibold bg-transparent border-none cursor-pointer p-0 font-[inherit] text-[inherit]"
          >
            Sign In
          </button>
        </p>
      </div>

      {/* ── Right panel ── */}
      <RightPanel bgSrc={BURGER_BG}>
        {/* Testimonial */}
        <div className="testimonial-card glass rounded-2xl max-w-[360px] w-full text-white">
          <div className="stars text-[#4ade80] tracking-widest">★★★★★</div>
          <p className="testimonial-text italic font-medium leading-relaxed text-white/90">
            "DineFlow has completely transformed how we orchestrate service at Le Jardin.
            The precision and real-time insights allow my team to focus entirely on the culinary experience."
          </p>
          <div className="flex items-center gap-2.5">
            <div className="avatar-gradient w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white border-2 border-white/40 flex-shrink-0">
              MV
            </div>
            <div>
              <div className="author-name font-bold text-white">Chef Marco Valesquez</div>
              <div className="author-title text-[#4ade80] font-medium">3 Michelin Stars, Executive Director</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2.5">
          <div className="stat-card glass rounded-xl text-center text-white">
            <div className="flex justify-center mb-1"><ClockIcon /></div>
            <div className="stat-value font-bold">99.9%</div>
            <div className="stat-label text-white/70 mt-0.5">Platform Uptime</div>
          </div>
          <div className="stat-card glass rounded-xl text-center text-white">
            <div className="flex justify-center mb-1"><ZapIcon /></div>
            <div className="stat-value font-bold">1.2s</div>
            <div className="stat-label text-white/70 mt-0.5">Sync Latency</div>
          </div>
        </div>

        {/* Live badge */}
        <div className="live-badge glass-dark rounded-full px-3.5 py-1.5 inline-flex items-center gap-2 text-white font-semibold uppercase tracking-wider">
          <span className="live-dot w-2 h-2 rounded-full bg-[#4ade80] flex-shrink-0" />
          Live Operations Active
        </div>
      </RightPanel>
    </div>
  );
}

// ─────────────────────────────────────────────
// SIGN IN PAGE
// ─────────────────────────────────────────────
export function SignInPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="auth-root flex h-screen w-screen overflow-hidden">

      {/* ── Left panel ── */}
      <div className="left-panel flex flex-col justify-center bg-white z-10 overflow-hidden flex-shrink-0 w-[46%]">
        <Logo />

        <h1 className="form-heading font-bold text-[#111] mb-1">Welcome Back</h1>
        <p className="form-subheading text-[#777]">
          Enter your credentials to access the kitchen admin dashboard.
        </p>

        {/* Email */}
        <div className="field">
          <label className="block font-medium text-[#333] mb-1.5">Email Address</label>
          <div className="relative">
            <input
              type="email"
              placeholder="chef@dineflow.com"
              className="auth-input w-full pr-10 border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] flex pointer-events-none">
              <AtIcon />
            </span>
          </div>
        </div>

        {/* Password */}
        <div className="field">
          <div className="flex justify-between items-center mb-1.5">
            <label className="block font-medium text-[#333]">Password</label>
            <a href="#" className="forgot text-[#c0392b] font-medium no-underline hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              className="auth-input w-full pr-10 border border-[#e8e8e8] rounded-lg bg-[#f9f9f9] text-[#111] placeholder-[#bbb] transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPass(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] cursor-pointer flex bg-transparent border-none"
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="checkbox-row flex items-center gap-2 text-[#555] mt-1">
          <input
            type="checkbox"
            id="remember"
            className="w-3.5 h-3.5 flex-shrink-0 accent-[#1a3d2b]"
          />
          <label htmlFor="remember" className="cursor-pointer">Remember this device for 30 days</label>
        </div>

        {/* Submit */}
        <button className="btn-primary w-full bg-[#1a3d2b] hover:bg-[#153323] active:scale-[0.99] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border-none flex-shrink-0">
          Sign In to Dashboard <ArrowIcon />
        </button>

        {/* Divider */}
        <div className="divider-line text-[#aaa]">or continue with</div>

        {/* Social */}
        <div className="social-row flex gap-2.5">
          <button className="flex-1 border border-[#e0e0e0] rounded-lg bg-white text-[#222] font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-[#f5f5f5] hover:border-[#c5c5c5] transition-all duration-150">
            <GoogleIcon /> Google
          </button>
          <button className="flex-1 border border-[#e0e0e0] rounded-lg bg-white text-[#222] font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-[#f5f5f5] hover:border-[#c5c5c5] transition-all duration-150">
            <AppleIcon /> Apple
          </button>
        </div>

        <p className="alt-link text-center text-[#777] mb-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#1a3d2b] font-semibold bg-transparent border-none cursor-pointer p-0 font-[inherit] text-[inherit]"
          >
            Request Access
          </button>
        </p>

        <div className="footer-links text-center text-[#aaa]">
          <a href="#" className="text-[#aaa] no-underline mx-2 hover:text-[#555] transition-colors">Privacy Policy</a>
          <a href="#" className="text-[#aaa] no-underline mx-2 hover:text-[#555] transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* ── Right panel ── */}
      <RightPanel bgSrc={CHICKEN_BG} contentClass="right-center relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/90 rounded-2xl text-center max-w-[320px] w-full px-10 py-8">
          <div className="brand-name text-3xl font-bold text-[#1a3d2b] mb-1.5">DINEFLOW</div>
          <div className="text-[#555] font-semibold uppercase tracking-[3px] text-xs">Manage. Serve. Grow.</div>
        </div>
      </RightPanel>
    </div>
  );
}