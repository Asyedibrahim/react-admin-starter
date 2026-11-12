import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import AlertDialog, { type AlertType } from "../components/AlertDialog";

interface AlertOptions {
    title: string;
    description?: string;
    type?: AlertType;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
}

interface AlertContextType {
    confirm: (options: AlertOptions) => Promise<boolean>;
    alert: (options: AlertOptions) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [dialog, setDialog] = useState<AlertOptions | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resolver = useRef<((value: boolean) => void) | null>(null);

    const closeDialog = useCallback((result: boolean) => {
        resolver.current?.(result);
        resolver.current = null;
        setDialog(null);
        setIsLoading(false);
    }, []);

    const confirm = useCallback((options: AlertOptions) => {
        return new Promise<boolean>((resolve) => {
            resolver.current?.(false);
            resolver.current = resolve;

            setDialog({
                ...options,
                showCancel: options.showCancel ?? true,
            });
        });
    }, []);

    const alert = useCallback((options: AlertOptions) => {
        return confirm({
            ...options,
            showCancel: false,
            confirmText: options.confirmText ?? "Okay",
        });
    }, [confirm]);

    useEffect(() => {
        if (!dialog) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isLoading) {
                closeDialog(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [dialog, isLoading, closeDialog]);

    return (
        <AlertContext.Provider value={{ confirm, alert }}>
            {children}

            <AlertDialog
                isOpen={!!dialog}
                type={dialog?.type}
                title={dialog?.title ?? ""}
                description={dialog?.description}
                confirmText={dialog?.confirmText}
                cancelText={dialog?.cancelText}
                showCancel={dialog?.showCancel}
                isLoading={isLoading}
                onCancel={() => closeDialog(false)}
                onConfirm={() => closeDialog(true)}
            />
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error(
            "useAlert must be used inside AlertProvider"
        );
    }

    return context;
}
