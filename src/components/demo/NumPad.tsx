"use client";

interface NumPadProps {
  digits: string[];
  activeDigitIndex: number;
  onDigitPress?: (digit: string) => void;
}

function formatPhone(digits: string[]): string {
  const raw = digits.join("");
  return raw.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

export default function NumPad({ digits, activeDigitIndex }: NumPadProps) {
  const displayDigits = digits.slice(0, Math.max(0, activeDigitIndex));
  const displayText = displayDigits.length > 0 ? formatPhone(displayDigits) : "";
  const placeholder = activeDigitIndex <= 0;

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

  const currentDigit = activeDigitIndex > 0 && activeDigitIndex <= digits.length
    ? digits[activeDigitIndex - 1]
    : null;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Display */}
      <div className="w-full bg-slate-50 rounded-lg px-2 py-2 text-center border border-border">
        <p className="text-[9px] text-text-muted font-medium">Numéro de téléphone</p>
        <p className={`text-lg font-mono font-bold tracking-wider ${placeholder ? "text-slate-300" : "text-text"}`}>
          {placeholder ? "__ __ __ __ __" : displayText}
        </p>
      </div>

      {/* NumPad grid */}
      <div className="grid grid-cols-3 gap-1 w-full max-w-[180px]">
        {keys.map((key, i) => {
          if (key === "") return <div key={i} />;
          const isActive = currentDigit === key;
          return (
            <button
              key={i}
              className={`h-8 rounded-md text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "gradient-primary text-white shadow-orange scale-95"
                  : "bg-white border border-border text-text"
              }`}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
