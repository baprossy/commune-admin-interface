// Types pour les documents
export interface Document {
  name: string;
  price: string;
  time: string;
  icon: string;
}

// Types pour les demandes
export interface MyDemand {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'ready';
  requestDate: string;
  expectedDate: string;
  price: string;
  reference: string;
}

// Types pour les paiements
export interface MyPayment {
  id: string;
  type: string;
  amount: string;
  method: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

// Types pour les rendez-vous
export interface MyAppointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  reason: string;
}

// Types pour les onglets
export type TabType = 'overview' | 'demands' | 'payments' | 'appointments';
