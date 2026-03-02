interface PhoneMockupProps {
  children: React.ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: 320, maxWidth: "90vw" }}>
      {/* Clean card — no phone frame */}
      <div className="relative bg-white rounded-2xl shadow-xl shadow-black/8 border border-slate-200/60 overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            VR
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">Votre Restaurant</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
              <span className="text-[10px] text-white/80">En ligne</span>
            </div>
          </div>
        </div>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3" style={{ height: 440 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
