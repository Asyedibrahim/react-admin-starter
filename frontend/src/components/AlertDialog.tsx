import { AnimatePresence, motion } from "framer-motion";
import {
    RiAlertLine,
    RiCheckLine,
    RiCloseLine,
    RiErrorWarningLine,
    RiInformationLine,
    RiLoader4Line,
} from "react-icons/ri";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertDialogProps {
    isOpen: boolean;
    type?: AlertType;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    showCancel?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const alertStyles = {
    success: {
        icon: RiCheckLine,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    },
    error: {
        icon: RiErrorWarningLine,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-600",
        button: "bg-rose-600 hover:bg-rose-700 shadow-rose-200",
    },
    warning: {
        icon: RiAlertLine,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        button: "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200",
    },
    info: {
        icon: RiInformationLine,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
    },
};

export default function AlertDialog({
    isOpen,
    type = "warning",
    title,
    description,
    confirmText = "Continue",
    cancelText = "Cancel",
    isLoading = false,
    showCancel = true,
    onConfirm,
    onCancel,
}: AlertDialogProps) {
    const style = alertStyles[type];
    const Icon = style.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(event) => {
                        if (event.target === event.currentTarget && !isLoading) {
                            onCancel();
                        }
                    }}
                >
                    <motion.div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 28,
                        }}
                        className="w-full max-w-105 overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-slate-900/20"
                    >
                        {/* Close Button */}
                        {!isLoading && (
                            <button
                                type="button"
                                onClick={onCancel}
                                aria-label="Close dialog"
                                className="absolute hidden"
                            >
                                <RiCloseLine />
                            </button>
                        )}

                        <div className="px-7 pb-7 pt-8 text-center">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.08,
                                    type: "spring",
                                    stiffness: 300,
                                }}
                                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${style.iconBg}`}
                            >
                                <Icon
                                    size={34}
                                    className={style.iconColor}
                                />
                            </motion.div>

                            {/* Content */}
                            <h2
                                id="alert-dialog-title"
                                className="mt-5 text-xl font-bold tracking-tight text-slate-900"
                            >
                                {title}
                            </h2>

                            {description && (
                                <p
                                    id="alert-dialog-description"
                                    className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500"
                                >
                                    {description}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                                {showCancel && (
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={onCancel}
                                        className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                    >
                                        {cancelText}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={onConfirm}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-70 ${style.button}`}
                                >
                                    {isLoading && (
                                        <RiLoader4Line className="animate-spin" size={18} />
                                    )}

                                    {isLoading ? "Please wait..." : confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
