// Mock CRM data — will be replaced by Supabase queries later

export type OrderStatus = "en_attente" | "en_preparation" | "prete";

export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: OrderStatus;
  time: string;
  channel: "whatsapp" | "web" | "telephone" | "surplace";
}

export const mockOrders: Order[] = [
  {
    id: "CMD-001",
    customer: "Marie L.",
    items: ["Bowl Méditerranéen", "Limonade maison"],
    total: 16.5,
    status: "en_attente",
    time: "12:34",
    channel: "whatsapp",
  },
  {
    id: "CMD-002",
    customer: "Thomas D.",
    items: ["Wrap Poulet Caesar", "Frites patate douce"],
    total: 14.9,
    status: "en_attente",
    time: "12:31",
    channel: "web",
  },
  {
    id: "CMD-003",
    customer: "Sophie M.",
    items: ["Salade Niçoise", "Eau gazeuse"],
    total: 13.5,
    status: "en_preparation",
    time: "12:28",
    channel: "telephone",
  },
  {
    id: "CMD-004",
    customer: "Lucas R.",
    items: ["Bowl Thaï", "Smoothie Mangue"],
    total: 18.0,
    status: "en_preparation",
    time: "12:25",
    channel: "whatsapp",
  },
  {
    id: "CMD-005",
    customer: "Camille B.",
    items: ["Burger Veggie", "Coleslaw"],
    total: 15.5,
    status: "en_preparation",
    time: "12:22",
    channel: "surplace",
  },
  {
    id: "CMD-006",
    customer: "Antoine P.",
    items: ["Bowl Saumon", "Thé glacé"],
    total: 19.5,
    status: "prete",
    time: "12:15",
    channel: "web",
  },
  {
    id: "CMD-007",
    customer: "Julie F.",
    items: ["Wrap Falafel"],
    total: 11.0,
    status: "prete",
    time: "12:10",
    channel: "whatsapp",
  },
];

export interface StockCategory {
  name: string;
  items: StockItem[];
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  min: number;
  status: "ok" | "low" | "critical";
}

export const mockStockCategories: StockCategory[] = [
  {
    name: "Bases",
    items: [
      { id: "s1", name: "Riz vinaigré", quantity: 8, unit: "kg", min: 3, status: "ok" },
      { id: "s2", name: "Quinoa", quantity: 4, unit: "kg", min: 2, status: "ok" },
      { id: "s3", name: "Nouilles soba", quantity: 1.5, unit: "kg", min: 2, status: "low" },
      { id: "s4", name: "Pain pita", quantity: 25, unit: "pcs", min: 10, status: "ok" },
      { id: "s5", name: "Tortilla wrap", quantity: 5, unit: "pcs", min: 15, status: "critical" },
    ],
  },
  {
    name: "Protéines",
    items: [
      { id: "s6", name: "Poulet grillé", quantity: 5, unit: "kg", min: 3, status: "ok" },
      { id: "s7", name: "Saumon frais", quantity: 2, unit: "kg", min: 2, status: "low" },
      { id: "s8", name: "Tofu mariné", quantity: 3, unit: "kg", min: 1.5, status: "ok" },
      { id: "s9", name: "Falafel", quantity: 40, unit: "pcs", min: 20, status: "ok" },
      { id: "s10", name: "Crevettes", quantity: 1, unit: "kg", min: 2, status: "critical" },
    ],
  },
  {
    name: "Toppings",
    items: [
      { id: "s11", name: "Avocat", quantity: 15, unit: "pcs", min: 8, status: "ok" },
      { id: "s12", name: "Edamame", quantity: 2, unit: "kg", min: 1, status: "ok" },
      { id: "s13", name: "Mangue fraîche", quantity: 3, unit: "kg", min: 2, status: "ok" },
      { id: "s14", name: "Concombre", quantity: 10, unit: "pcs", min: 5, status: "ok" },
      { id: "s15", name: "Tomates cerises", quantity: 1.5, unit: "kg", min: 2, status: "low" },
    ],
  },
  {
    name: "Croustillants",
    items: [
      { id: "s16", name: "Graines de sésame", quantity: 1, unit: "kg", min: 0.5, status: "ok" },
      { id: "s17", name: "Cacahuètes", quantity: 0.8, unit: "kg", min: 0.5, status: "ok" },
      { id: "s18", name: "Oignons frits", quantity: 0.3, unit: "kg", min: 0.5, status: "critical" },
      { id: "s19", name: "Chips de crevette", quantity: 50, unit: "pcs", min: 20, status: "ok" },
    ],
  },
  {
    name: "Sauces",
    items: [
      { id: "s20", name: "Sauce soja", quantity: 3, unit: "L", min: 1, status: "ok" },
      { id: "s21", name: "Sauce sriracha", quantity: 1.5, unit: "L", min: 0.5, status: "ok" },
      { id: "s22", name: "Vinaigrette sésame", quantity: 0.4, unit: "L", min: 0.5, status: "low" },
      { id: "s23", name: "Sauce teriyaki", quantity: 2, unit: "L", min: 1, status: "ok" },
    ],
  },
];

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

export const mockDailyRevenue: DailyRevenue[] = [
  { date: "Lun", revenue: 520, orders: 35 },
  { date: "Mar", revenue: 480, orders: 32 },
  { date: "Mer", revenue: 610, orders: 41 },
  { date: "Jeu", revenue: 590, orders: 39 },
  { date: "Ven", revenue: 780, orders: 52 },
  { date: "Sam", revenue: 920, orders: 61 },
  { date: "Dim", revenue: 850, orders: 57 },
];

export interface TopMenu {
  name: string;
  count: number;
  revenue: number;
}

export const mockTopMenus: TopMenu[] = [
  { name: "Bowl Méditerranéen", count: 87, revenue: 1218 },
  { name: "Bowl Thaï", count: 72, revenue: 1296 },
  { name: "Wrap Poulet Caesar", count: 65, revenue: 968.5 },
  { name: "Salade Niçoise", count: 58, revenue: 783 },
  { name: "Bowl Saumon", count: 51, revenue: 994.5 },
];

export interface HistoryOrder {
  id: string;
  date: string;
  customer: string;
  items: string[];
  total: number;
  status: "livree" | "annulee" | "remboursee";
  channel: "whatsapp" | "web" | "telephone" | "surplace";
}

export const mockHistoryOrders: HistoryOrder[] = [
  { id: "CMD-098", date: "01/03/2026 12:45", customer: "Marie L.", items: ["Bowl Méditerranéen", "Limonade"], total: 16.5, status: "livree", channel: "whatsapp" },
  { id: "CMD-097", date: "01/03/2026 12:30", customer: "Thomas D.", items: ["Wrap Caesar"], total: 12.9, status: "livree", channel: "web" },
  { id: "CMD-096", date: "01/03/2026 12:15", customer: "Lucas R.", items: ["Bowl Thaï", "Smoothie"], total: 18.0, status: "livree", channel: "telephone" },
  { id: "CMD-095", date: "01/03/2026 11:50", customer: "Camille B.", items: ["Burger Veggie"], total: 13.5, status: "annulee", channel: "surplace" },
  { id: "CMD-094", date: "01/03/2026 11:30", customer: "Sophie M.", items: ["Salade Niçoise", "Eau"], total: 14.5, status: "livree", channel: "web" },
  { id: "CMD-093", date: "28/02/2026 20:15", customer: "Antoine P.", items: ["Bowl Saumon"], total: 17.5, status: "livree", channel: "whatsapp" },
  { id: "CMD-092", date: "28/02/2026 19:45", customer: "Julie F.", items: ["Wrap Falafel", "Frites"], total: 15.0, status: "remboursee", channel: "web" },
  { id: "CMD-091", date: "28/02/2026 19:00", customer: "Pierre G.", items: ["Bowl Méditerranéen"], total: 14.0, status: "livree", channel: "telephone" },
];

