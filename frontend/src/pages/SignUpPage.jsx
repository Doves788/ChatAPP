import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [fd, sfd] = useState({ fullName: "", email: "", password: "" });
  const { signup: su, isSigningUp: isu } = useAuthStore();

  const hs = (e) => {
    e.preventDefault();
    su(fd);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left Side - Signup Form */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400">Sign up for a new FlowChatt account</p>
                </div>

                <form onSubmit={hs} className="space-y-5">
                  <div>
                    <label className="auth-input-label text-slate-300 text-sm font-medium mb-2 block">Full Name</label>
                    <div className="relative flex items-center">
                      <UserIcon className="absolute left-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={fd.fullName}
                        onChange={(e) => sfd({ ...fd, fullName: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="auth-input-label text-slate-300 text-sm font-medium mb-2 block">Email</label>
                    <div className="relative flex items-center">
                      <MailIcon className="absolute left-3 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={fd.email}
                        onChange={(e) => sfd({ ...fd, email: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="yourmail@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="auth-input-label text-slate-300 text-sm font-medium mb-2 block">Password</label>
                    <div className="relative flex items-center">
                      <LockIcon className="absolute left-3 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={fd.password}
                        onChange={(e) => sfd({ ...fd, password: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 flex justify-center items-center shadow-lg shadow-blue-500/20 mt-2" 
                    type="submit" 
                    disabled={isu}
                  >
                    {isu ? (
                      <LoaderIcon className="w-6 h-6 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Image & Benefits */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-8 bg-gradient-to-bl from-slate-800/40 to-transparent">
              <div className="w-full max-w-lg flex flex-col items-center">
                <img
                  src="/signup.png"
                  alt="Flow Your Work"
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl shadow-blue-500/10 mb-8 hover:scale-[1.02] transition-transform duration-300 border border-slate-700/50"
                />
                
                <div className="text-center w-full">
                  <h3 className="text-xl font-medium text-blue-400 mb-4">Connect Your Crew, Flow Your Work</h3>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm rounded-full border border-blue-500/20 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                      Live Data Streams
                    </span>
                    <span className="px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm rounded-full border border-blue-500/20">
                      Custom Channels
                    </span>
                    <span className="px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm rounded-full border border-blue-500/20">
                      Unified Workflows
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;