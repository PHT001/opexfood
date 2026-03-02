import type { ChatMessage } from "@/lib/demo-data";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 chat-bubble-enter`}
    >
      <div className={`flex gap-2 max-w-[85%] ${isBot ? "" : "flex-row-reverse"}`}>
        {/* Avatar (bot only) */}
        {isBot && (
          <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
            VR
          </div>
        )}

        <div>
          {/* Text bubble */}
          {message.text && (
            <div
              className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                isBot
                  ? "bg-white border border-border rounded-2xl rounded-tl-md text-text"
                  : "gradient-primary text-white rounded-2xl rounded-tr-md"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Menu card */}
          {message.type === "menu-card" && message.items && (
            <div className="mt-2 bg-white border border-border rounded-2xl rounded-tl-md overflow-hidden">
              {message.items.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3.5 py-2.5 ${
                    i > 0 ? "border-t border-border-light" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm font-medium text-text">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-orange-600">
                    {item.price.toFixed(2)}&euro;
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Order summary */}
          {message.type === "order-summary" && message.order && (
            <div className="mt-2 bg-white border border-border rounded-2xl rounded-tl-md p-3.5">
              {message.order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-text">
                    {item.qty}x {item.name}
                  </span>
                  <span className="text-text-secondary">
                    {item.price.toFixed(2)}&euro;
                  </span>
                </div>
              ))}
              <div className="border-t border-border-light mt-2 pt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-text">Total</span>
                <span className="text-sm font-bold text-orange-600">
                  {message.order.total.toFixed(2)}&euro;
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                <span>⏱</span>
                <span>Pret dans {message.order.estimatedTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
