
import axios from "axios";

const API_URL = "http://localhost:8000/api";  // Adjust this to match your Django backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  confirmPassword?: string;  // Only used in frontend validation
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    // Add other user fields as needed
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/token/", credentials);
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    }
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const { confirmPassword, ...signupData } = credentials;
    const response = await api.post<AuthResponse>("/register/", signupData);
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    }
    return response.data;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  },

  getCurrentToken(): string | null {
    return localStorage.getItem("token");
  },
};
