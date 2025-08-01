export type TabType = 'overview' | 'demands' | 'payments' | 'appointments';

export interface MyDemand {
  id: string;
  type: string;
  date: string;
  status: 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';
  documents?: string[];
}

export interface MyPayment {
  id: string;
  type: string;
  amount: string;
  date: string;
  status: 'pending' | 'paid' | 'overdue' | 'completed' | 'failed' | 'processing';
  dueDate?: string;
  method?: string;
  reference?: string;
}

export interface MyAppointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location?: string;
  contact?: string;
  reason?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'demand' | 'payment' | 'appointment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface DashboardStats {
  pendingDemands: number;
  pendingPayments: number;
  upcomingAppointments: number;
  unreadNotifications: number;
}
