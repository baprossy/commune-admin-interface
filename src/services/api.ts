const API_BASE_URL = 'http://192.168.1.29:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Citizen {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

interface Payment {
  id: number;
  citizen_id: number;
  type: string;
  amount: number;
  status: string;
  created_at: string;
}

interface PaymentType {
  id: number;
  name: string;
  description: string;
  amount: number;
}

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Citizens API
  static async getCitizens(): Promise<ApiResponse<Citizen[]>> {
    return this.request<Citizen[]>('/citizens');
  }

  static async getCitizen(id: number): Promise<ApiResponse<Citizen>> {
    return this.request<Citizen>(`/citizens/${id}`);
  }

  static async createCitizen(citizen: Omit<Citizen, 'id' | 'created_at'>): Promise<ApiResponse<Citizen>> {
    return this.request<Citizen>('/citizens', {
      method: 'POST',
      body: JSON.stringify(citizen),
    });
  }

  static async updateCitizen(id: number, citizen: Partial<Citizen>): Promise<ApiResponse<Citizen>> {
    return this.request<Citizen>(`/citizens/${id}`, {
      method: 'PUT',
      body: JSON.stringify(citizen),
    });
  }

  static async deleteCitizen(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/citizens/${id}`, {
      method: 'DELETE',
    });
  }

  // Payments API
  static async getPayments(): Promise<ApiResponse<Payment[]>> {
    return this.request<Payment[]>('/payments');
  }

  static async getPayment(id: number): Promise<ApiResponse<Payment>> {
    return this.request<Payment>(`/payments/${id}`);
  }

  static async createPayment(payment: Omit<Payment, 'id' | 'created_at'>): Promise<ApiResponse<Payment>> {
    return this.request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  static async getPaymentTypes(): Promise<ApiResponse<PaymentType[]>> {
    return this.request<PaymentType[]>('/payment-types');
  }

  static async getPaymentStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/payment-stats');
  }

  // Dashboard Stats
  static async getDashboardStats(): Promise<ApiResponse<{
    totalCitizens: number;
    totalPayments: number;
    totalRevenue: number;
    totalDocuments: number;
    recentActivities: any[];
    monthlyData: any[];
  }>> {
    return this.request('/dashboard-stats');
  }

  // Test connection
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

export default ApiService;
