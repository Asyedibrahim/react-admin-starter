import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    RiLogoutBoxLine,
    RiMenu2Line,
    RiNotification3Line,
    RiArrowDownSLine,
    RiUser3Line,
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../config/axios";
import { signOutSuccess } from "../redux/user/userSlice";
import { useAlert } from "../context/AlertProvider";

interface HeaderProps {
    onMenuClick: () => void;
    userName?: string;
    userRole?: string;
    profilePath?: string;
}

export default function Header({
    onMenuClick,
    userName = "Administrator",
    userRole = "Admin",
    profilePath = "/admin/settings",
}: HeaderProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [profileOpen, setProfileOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const { confirm } = useAlert();

    // Generate page title dynamically from the current route
    const currentPage = location.pathname
        .split("/")
        .filter(Boolean)
        .pop()
        ?.replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()) || "Dashboard";

    const confirmLogout = async () => {
        const result = await confirm({
            title: "Are you sure?",
            description: "You will be logged out of your account.",
            type: "warning",
            confirmText: "Yes, log out",
            cancelText: "Cancel",
        });

        if (!result) return;

        try {
            setLoggingOut(true);

            const { data } = await api.post("/auth/logout");

            dispatch(signOutSuccess(data));

            toast.success("Logged out successfully!");

            navigate("/login", { replace: true });
        } catch (error: unknown) {
            const message =
                (error as {
                    response?: { data?: { message?: string } };
                }).response?.data?.message ||
                "Something went wrong.";

            toast.error(message);
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8"
        >
            {/* Left Section */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                    className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600 lg:hidden"
                >
                    <RiMenu2Line size={22} />
                </button>

                <div className="min-w-0">
                    <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                        <span>Workspace</span>
                        <span>/</span>
                        <span className="font-medium text-indigo-600">
                            {currentPage}
                        </span>
                    </div>

                    <h2 className="truncate text-lg font-bold text-slate-900 sm:mt-1 sm:text-xl">
                        {currentPage}
                    </h2>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                >
                    <RiNotification3Line size={22} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
                </button>

                <div className="hidden h-9 w-px bg-slate-200 sm:block" />

                {/* Profile */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        aria-expanded={profileOpen}
                        className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50 sm:gap-3 sm:px-2"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <RiUser3Line size={21} />
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold text-slate-800">
                                {userName}
                            </p>
                            <p className="text-xs text-slate-400">
                                {userRole}
                            </p>
                        </div>

                        <RiArrowDownSLine
                            size={18}
                            className={`hidden text-slate-400 transition-transform sm:block ${profileOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    <AnimatePresence>
                        {profileOpen && (
                            <>
                                {/* Outside Click */}
                                <button
                                    type="button"
                                    aria-label="Close profile menu"
                                    className="fixed inset-0 z-40 cursor-default"
                                    onClick={() => setProfileOpen(false)}
                                />

                                {/* Dropdown */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.97,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.97,
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/60"
                                >
                                    <div className="border-b border-slate-100 px-3 py-3">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {userName}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {userRole}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate(profilePath);
                                        }}
                                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                                    >
                                        <RiUser3Line size={18} />
                                        My Profile
                                    </button>

                                    <button
                                        type="button"
                                        disabled={loggingOut}
                                        onClick={confirmLogout}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                                    >
                                        <RiLogoutBoxLine size={18} />
                                        {loggingOut
                                            ? "Logging out..."
                                            : "Logout"}
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
}
