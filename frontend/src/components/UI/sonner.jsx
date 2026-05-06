import { useTheme } from "../../context/ThemeContext"
import { Toaster as Sonner } from "sonner";
import { CircleCheck, Info, AlertTriangle, XOctagon, Loader2 } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      closeButton
      icons={{
        success: (
          <CircleCheck className="size-4 text-rose-600" />
        ),
        info: (
          <Info className="size-4 text-red-600" />
        ),
        warning: (
          <AlertTriangle className="size-4 text-amber-600" />
        ),
        error: (
          <XOctagon className="size-4 text-red-500" />
        ),
        loading: (
          <Loader2 className="size-4 animate-spin text-slate-400" />
        ),
      }}
      style={{
        "--error-bg": "rgba(255, 230, 230, 0.8)",
        "--error-text": "#ff0000",
        "--error-border": "#ff0000",
        "--success-bg": "rgba(255, 241, 242, 0.8)",
        "--success-text": "#4c0519",
        "--success-border": "rgba(254, 205, 211, 0.6)",
      }}
      toastOptions={{
        style: {
          borderRadius: '12px',
        },
        classNames: {
          toast: "toast !flex !items-center !gap-3 !min-w-[320px] !bg-[var(--card-bg)] !border-[var(--card-border)] !backdrop-blur-xl !shadow-2xl !font-sans !border-[1px] !py-3 !px-4 !text-inherit",
          title: "!text-inherit !font-bold !text-sm",
          description: "!text-inherit !opacity-80 !text-[11px]",
          actionButton: "!bg-red-600 !text-white !rounded-lg",
          cancelButton: "!bg-[var(--input-bg)] !text-[var(--text-secondary)] !rounded-lg",
          closeButton: "!bg-white/80 !border-red-200 !text-red-500 hover:!text-red-700 hover:!bg-red-50 !rounded-full",
          error: "!bg-red-50/80 !text-red-500 !border-red-300/60 !shadow-[0_8px_32px_rgba(239,68,68,0.15)]",
          success: "!bg-rose-50/80 !text-rose-950 !border-rose-200/60 !shadow-[0_8px_32px_rgba(244,63,94,0.15)]",
        },
      }}
      {...props} />
  );
}

export { Toaster }
