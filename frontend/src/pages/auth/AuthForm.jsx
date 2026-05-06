import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export const AuthForm = ({ onLogin }) => {
    const [searchParams] = useSearchParams();
    const [type, setType] = useState(searchParams.get("mode") === "signup" ? "signup" : "login");
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    // Separate states for Login and Signup to prevent cross-filling
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { login, register, loading, setError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const mode = searchParams.get("mode");
        if (mode === "signup") {
            setType("signup");
        } else if (mode === "login") {
            setType("login");
        }
    }, [searchParams]);

    const toggleType = (newType) => {
        if (newType !== type) {
            setType(newType);
            setTermsAccepted(false);
            setError(null);
            setShowPassword(false);
        }
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.id]: e.target.value });
    };

    const resetSignupForm = () => {
        setSignupData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setTermsAccepted(false);
    };

    const resetLoginForm = () => {
        setLoginData({
            email: "",
            password: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (type === "signup") {
            if (!termsAccepted) {
                toast.error("Please accept the terms and conditions");
                return;
            }
            if (signupData.password !== signupData.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            try {
                await register(signupData.name, signupData.email, signupData.password);
                toast.success("Account created successfully! Please login with your credentials.");
                
                // CLEAR Signup Form
                resetSignupForm();
                
                // SWITCH to Login Mode
                setType("login");
            } catch (err) {
                toast.error(err.message || "Registration failed");
            }
        } else {
            try {
                await login(loginData.email, loginData.password);
                toast.success("Login successful! Welcome back.");
                
                // CLEAR Login Form
                resetLoginForm();

                if (onLogin) {
                    onLogin();
                } else {
                    navigate("/dashboard");
                }
            } catch (err) {
                toast.error(err.message || "Login failed");
            }
        }
    };

    return (
        <div className="w-full max-w-[380px] mx-auto rounded-[2.5rem] p-4 sm:p-6 relative backdrop-blur-none transition-colors duration-500">
            <div className="flex flex-col items-center mb-5 sm:mb-6">
                <motion.h2
                    key={type + "-title"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-black text-lg sm:text-xl text-[var(--text-primary)] tracking-tight uppercase"
                >
                    {type === "login" ? "Welcome Back" : "Create account"}
                </motion.h2>
                <motion.p
                    key={type + "-desc"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[var(--text-secondary)] text-[10px] uppercase tracking-widest mt-1.5 max-w-sm text-center font-bold opacity-90"
                >
                    {type === "login"
                        ? "Secure session access"
                        : "Create and manage expenses freely and effectively"}
                </motion.p>
            </div>

            <div className="relative flex w-full h-10 bg-[var(--card-bg)] rounded-full p-1 mb-5 sm:mb-6 border border-[var(--card-border)]">
                <motion.div
                    className="absolute inset-y-1 bg-emerald-600 rounded-full shadow-lg shadow-emerald-600/20"
                    initial={false}
                    animate={{
                        x: type === "login" ? 0 : "100%",
                        width: "50%",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <button
                    onClick={() => toggleType("login")}
                    className={cn(
                        "relative z-10 flex-1 h-full text-[10px] font-black uppercase tracking-widest transition-colors duration-200",
                        type === "login" ? "text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                >
                    Login
                </button>
                <button
                    onClick={() => toggleType("signup")}
                    className={cn(
                        "relative z-10 flex-1 h-full text-[10px] font-black uppercase tracking-widest transition-colors duration-200",
                        type === "signup" ? "text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                >
                    Signup
                </button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={type}
                        initial={{ opacity: 0, x: type === "login" ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: type === "login" ? 10 : -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                    >
                        {type === "signup" ? (
                            <>
                                <LabelInputContainer>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" type="text" icon={HiOutlineUser} value={signupData.name} onChange={handleSignupChange} required />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" placeholder="name@example.com" type="email" icon={HiOutlineEnvelope} value={signupData.email} onChange={handleSignupChange} required />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative group">
                                        <Input
                                            id="password"
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            icon={HiOutlineLockClosed}
                                            value={signupData.password}
                                            onChange={handleSignupChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/60 hover:text-emerald-500 transition-colors z-30"
                                        >
                                            {showPassword ? <HiOutlineEyeSlash className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" placeholder="••••••••" type={showPassword ? "text" : "password"} icon={HiOutlineLockClosed} value={signupData.confirmPassword} onChange={handleSignupChange} required />
                                </LabelInputContainer>
                            </>
                        ) : (
                            <>
                                <LabelInputContainer>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" placeholder="name@example.com" type="email" icon={HiOutlineEnvelope} value={loginData.email} onChange={handleLoginChange} required />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative group">
                                        <Input
                                            id="password"
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            icon={HiOutlineLockClosed}
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/60 hover:text-emerald-500 transition-colors z-30"
                                        >
                                            {showPassword ? <HiOutlineEyeSlash className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </LabelInputContainer>
                            </>
                        )}

                        <div className="flex items-center justify-between px-1">
                            {type === "signup" ? (
                                <div
                                    className="flex items-center gap-2 group/check cursor-pointer"
                                    onClick={() => setTermsAccepted(!termsAccepted)}
                                >
                                    <div className={cn(
                                        "w-3.5 h-3.5 rounded-full border bg-[var(--card-bg)] flex items-center justify-center transition-all duration-200",
                                        termsAccepted ? "border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "border-[var(--card-border)] group-hover/check:border-emerald-500/50"
                                    )}>
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-200",
                                            termsAccepted ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover/check:opacity-40"
                                        )} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.15em] font-black text-[var(--text-secondary)] select-none opacity-90">
                                        I agree to <a href="#" className="text-emerald-500 hover:underline" onClick={(e) => e.stopPropagation()}>terms</a> and <a href="#" className="text-emerald-500 hover:underline" onClick={(e) => e.stopPropagation()}>conditions</a>
                                    </span>
                                </div>
                            ) : (
                                <div className="w-full flex justify-end">
                                    <button type="button" className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-500/80 hover:text-emerald-500 transition-colors">
                                        Forgot Password?
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    className="bg-emerald-600 relative group/btn block w-[92%] mx-auto text-white rounded-full h-10 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-500 active:scale-[0.98] mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Processing..." : (type === "login" ? "Login" : "Create Account")}
                    <BottomGradient />
                </button>

                <div className="relative py-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[var(--card-border)] opacity-80"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-[92%] mx-auto">
                    <button
                        className="relative group/btn flex items-center justify-center gap-2 px-3 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full h-10 transition-all hover:bg-[var(--card-bg)] active:scale-[0.98]"
                        type="button"
                    >
                        <FaGithub className="h-3.5 w-3.5 text-[var(--text-primary)]" />
                        <span className="text-[var(--text-primary)] text-[9px] font-black uppercase tracking-widest">
                            Github
                        </span>
                        <BottomGradient />
                    </button>
                    <button
                        className="relative group/btn flex items-center justify-center gap-2 px-3 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full h-10 transition-all hover:bg-[var(--card-bg)] active:scale-[0.98]"
                        type="button"
                    >
                        <FcGoogle className="h-3.5 w-3.5" />
                        <span className="text-[var(--text-primary)] text-[9px] font-black uppercase tracking-widest">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-1 w-full", className)}>
            {children}
        </div>
    );
};

const Label = ({ children, className, ...props }) => {
    return (
        <label
            className={cn(
                "text-[9px] uppercase tracking-[0.2em] font-black text-[var(--text-secondary)] ml-3 leading-none opacity-80",
                className
            )}
            {...props}
        >
            {children}
        </label>
    );
};

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
    return (
        <div className="relative group w-full">
            {Icon && (
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-500 transition-colors group-focus-within:text-emerald-400 z-10" />
            )}
            <input
                type={type}
                className={cn(
                    `flex h-10 w-full border border-[var(--card-border)] bg-[var(--input-bg)] text-[var(--text-primary)] rounded-full px-5 py-2 text-xs 
                placeholder:text-[var(--text-secondary)] placeholder:opacity-40
                focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-emerald-500/10 focus:border-emerald-500/40 focus:bg-[var(--card-bg)]
                disabled:cursor-not-allowed disabled:opacity-50
                transition duration-300`,
                    Icon && "pl-11",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});
Input.displayName = "Input";
