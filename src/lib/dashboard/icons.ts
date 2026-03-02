import {
  LayoutDashboard,
  Puzzle,
  CreditCard,
  Settings,
  MessageSquareMore,
  Phone,
  Gift,
  Store,
  ClipboardList,
  Package,
  BarChart3,
  Users,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Puzzle,
  CreditCard,
  Settings,
  MessageSquareMore,
  Phone,
  Gift,
  Store,
  ClipboardList,
  Package,
  BarChart3,
  Users,
  Smartphone,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? LayoutDashboard;
}
