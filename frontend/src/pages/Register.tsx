import { useState } from "react";
import type { ChangeEvent } from "react";
import { AxiosError } from "axios";
import {
    UserPlus,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    Loader2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import api from "../config/axios";

interface RegisterForm {
    email: string;
    password: string;
    role: string;
}

interface ApiError {
    message?: string;
}

const Register = () => {
    const [form, setForm] = useState<RegisterForm>({
        email: "",
        password: "",
        role: "staff",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("success");

    // Handle input changes
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle registration
    const handleSubmit = async (
        e: Parameters<
            NonNullable<React.ComponentProps<"form">["onSubmit"]>
        >[0]
    ) => {
        e.preventDefault();
        setMessage("");

        if (!form.email.trim() || !form.password || !form.role) {
            setMessageType("error");
            setMessage("Please fill in all fields.");
            return;
        }

        if (form.password.length < 6) {
            setMessageType("error");
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/register", form);

            setMessageType("success");
            setMessage(
                typeof response.data === "string"
                    ? response.data
                    : "User created successfully!"
            );

            setForm({
                email: "",
                password: "",
                role: "staff",
            });

            setShowPassword(false);

        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;

            setMessageType("error");

            if (axiosError.response?.status === 403) {
                setMessage("Email already exists. Please use another email.");
            } else {
                setMessage(
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Something went wrong. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-lg">

                {/* Header */}
                <div className="text-center mb-6">

                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 mb-3">
                        <UserPlus className="w-6 h-6 text-indigo-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Create an account
                    </h1>

                    <p className="text-slate-500 mt-2 text-sm">
                        Register a new user to get started.
                    </p>

                </div>

                {/* Registration card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 shadow-xl shadow-slate-200/60">

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email address
                            </label>

                            <div className="relative">

                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    minLength={6}
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-12 text-slate-900 text-sm placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>

                            </div>

                            <p className="text-xs text-slate-400 mt-2">
                                Use at least 6 characters.
                            </p>

                        </div>

                        {/* Role */}
                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                User role
                            </label>

                            <div className="relative">

                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />

                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="staff">Staff</option>
                                </select>

                            </div>

                        </div>

                        {/* Response message */}
                        {message && (
                            <div
                                role="alert"
                                className={`flex items-start gap-3 p-3 rounded-xl text-sm ${messageType === "success"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : "bg-red-50 text-red-600 border border-red-200"
                                    }`}
                            >

                                {messageType === "success" ? (
                                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                )}

                                <span>{message}</span>

                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                        >

                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Create account
                                </>
                            )}

                        </button>

                    </form>

                    {/* Card footer */}
                    <div className="mt-7 pt-6 border-t border-slate-100 text-center">

                        <p className="text-xs text-slate-500">
                            Secure user registration
                        </p>

                    </div>

                </div>

                {/* Copyright */}
                <p className="text-center text-xs text-slate-400 mt-6">
                    © {new Date().getFullYear()} All rights reserved.
                </p>

            </div>

        </div>
    );
};

export default Register;
