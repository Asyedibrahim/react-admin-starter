
import { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/user/userSlice";
import toast from "react-hot-toast";
import api from "../config/axios";
import type { AxiosError } from "axios";

interface LoginForm {
    email: string;
    password: string;
}

interface LoginProps {
    appName?: string;
    logo?: string;
    redirectPath?: string;
    registerPath?: string;
}

export default function Login({
    appName = "Admin Panel",
    logo,
    redirectPath = "/dashboard",
    registerPath = "/register",
}: LoginProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            dispatch(signInStart());

            const { data } = await api.post("/auth/login", formData);

            dispatch(signInSuccess(data));

            toast.success("Sign in successful!");

            navigate(redirectPath, { replace: true });
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;

            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong.";

            toast.error(message);
            dispatch(signInFailure(message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-112 w-md rounded-full bg-indigo-400/10 blur-3xl" />
                <div className="absolute -bottom-32 -right-24 h-112 w-md rounded-full bg-violet-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(#6366f108_1px,transparent_1px)] bg-size-[24px_24px]" />
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(79,70,229,0.08)] sm:p-9">

                {/* Top Accent */}
                <div className="absolute left-0 top-0 h-1.5 w-full bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-400" />

                {/* Branding */}
                <div className="mb-8 text-center">
                    <div className="mb-5 flex justify-center">
                        {logo ? (
                            <img
                                src={logo}
                                alt={`${appName} logo`}
                                className="h-24 w-24 object-contain"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                <FiLock size={34} />
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to access your account
                    </p>

                    <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-bold tracking-widest text-indigo-600">
                            {appName.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Email Address
                        </label>

                        <div className="relative">
                            <FiMail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <FiLock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                            >
                                {showPassword ? (
                                    <FiEyeOff size={18} />
                                ) : (
                                    <FiEye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="relative z-10">
                            {loading ? "Signing in..." : "Sign In"}
                        </span>
                    </button>
                </form>

                {/* Register Button */}
                <div className="mt-5 text-sm text-center flex items-center justify-between">
                    <p className="text-slate-500">
                        Don't have an account?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(registerPath)}
                        className="font-semibold text-indigo-600 transition-all hover:underline"
                    >
                        Create Account
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t border-slate-100 pt-5 text-center">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} {appName}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
