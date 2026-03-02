import { ArrowDown } from "lucide-react";

interface TransitionBridgeProps {
  text: string;
  subtext: string;
}

export default function TransitionBridge({ text, subtext }: TransitionBridgeProps) {
  return (
    <div className="relative flex flex-col items-center justify-center bg-bg-soft px-4 py-8 sm:py-10">
      <ArrowDown className="reveal w-6 h-6 text-orange-400 mb-3" />
      <h3 className="reveal reveal-delay-1 text-xl sm:text-2xl font-bold text-text text-center">
        {text}
      </h3>
      <p className="reveal reveal-delay-2 mt-2 text-base text-text-secondary text-center max-w-lg">
        {subtext}
      </p>
    </div>
  );
}
