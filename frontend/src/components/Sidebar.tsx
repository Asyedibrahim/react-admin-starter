import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
    RiDashboardLine,
    RiFolderLine,
    RiFileList3Line,
    RiBarChartBoxLine,
    RiSettings4Line,
    RiUser3Line,
    RiTeamLine,
} from "react-icons/ri";
import type { IconType } from "react-icons";

interface NavigationItem {
    name: string;
    path: string;
    icon: IconType;
}

interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

interface SidebarProps {
    appName?: string;
    logo?: string;
    navigation?: NavigationGroup[];
}

const defaultNavigation: NavigationGroup[] = [
    {
        title: "OVERVIEW",
        items: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: RiDashboardLine,
            },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            {
                name: "Users",
                path: "/users",
                icon: RiTeamLine,
            },
            {
                name: "Projects",
                path: "/projects",
                icon: RiFolderLine,
            },
            {
                name: "Documents",
                path: "/documents",
                icon: RiFileList3Line,
            },
        ],
    },
    {
        title: "ANALYTICS",
        items: [
            {
                name: "Reports",
                path: "/reports",
                icon: RiBarChartBoxLine,
            },
        ],
    },
    {
        title: "PREFERENCES",
        items: [
            {
                name: "Profile",
                path: "/profile",
                icon: RiUser3Line,
            },
            {
                name: "Settings",
                path: "/settings",
                icon: RiSettings4Line,
            },
        ],
    },
];

export default function Sidebar({
    appName = "Admin Panel",
    logo,
    navigation = defaultNavigation,
}: SidebarProps) {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">

            {/* Logo / Application Branding */}
            <div className="flex h-24 items-center gap-3 border-b border-slate-100 px-6">
                {logo ? (
                    <img
                        src={logo}
                        alt={`${appName} logo`}
                        className="h-12 w-12 shrink-0 object-contain"
                    />
                ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <RiDashboardLine size={26} />
                    </div>
                )}

                <div className="min-w-0">
                    <h1 className="truncate text-base font-bold tracking-tight text-slate-900">
                        {appName}
                    </h1>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                        Admin Dashboard
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
                {navigation.map((group, index) => (
                    <motion.div
                        key={group.title}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                    >
                        <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.15em] text-slate-400">
                            {group.title}
                        </p>

                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.path === "/dashboard"}
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                                ? "bg-indigo-50 text-indigo-600"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="sidebar-active"
                                                        className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-indigo-600"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 350,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}

                                                <Icon
                                                    size={20}
                                                    className={
                                                        isActive
                                                            ? "text-indigo-600"
                                                            : "text-slate-400 group-hover:text-indigo-600"
                                                    }
                                                />

                                                <span>{item.name}</span>

                                                {isActive && (
                                                    <motion.span
                                                        layoutId="active-dot"
                                                        className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </nav>

            {/* Bottom Status Card */}
            <div className="border-t border-slate-100 p-4">
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-violet-700 p-4 text-white">

                    {/* Decorative Accent */}
                    <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full border-12 border-white/10" />

                    <div className="relative">
                        <p className="text-sm font-bold">
                            {appName}
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-indigo-100">
                            Manage your workspace from one place.
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-indigo-100">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                            System Online
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-full bg-violet-300" />
                </div>
            </div>
        </aside>
    );
}