interface TabletMockupProps {
  children: React.ReactNode;
}

export default function TabletMockup({ children }: TabletMockupProps) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 520 }}>
      {/* iPad shell — landscape */}
      <div
        className="relative bg-[#1a1a1a] rounded-[1.2rem] shadow-xl"
        style={{ padding: "10px 14px" }}
      >
        {/* Camera dot — right edge for landscape */}
        <div className="absolute top-1/2 right-[5px] -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-slate-700 border border-slate-600" />

        {/* Screen */}
        <div className="relative bg-white rounded-[0.6rem] overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-[9px] font-bold">
                VR
              </div>
              <div>
                <p className="text-xs font-semibold text-text">Votre Restaurant</p>
                <p className="text-[9px] text-text-muted">Programme Fidelite</p>
              </div>
            </div>
            <div className="text-[10px] text-text-muted font-medium">iPad</div>
          </div>

          {/* Content — landscape height */}
          <div className="relative overflow-hidden" style={{ height: 280 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
