interface DesktopMockupProps {
  children: React.ReactNode;
}

export default function DesktopMockup({ children }: DesktopMockupProps) {
  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      <div className="rounded-xl border border-border shadow-soft-lg overflow-hidden bg-white">
        {/* Title bar */}
        <div className="h-9 bg-slate-50 border-b border-border flex items-center px-4 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white rounded-md px-3 py-0.5 text-[11px] text-text-muted border border-border max-w-[280px] truncate">
              app.opexfood.com/commandes
            </div>
          </div>
          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}
