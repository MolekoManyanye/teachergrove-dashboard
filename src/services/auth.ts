
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

export interface Course {
  id: string;
  subject: string;
  grade: {
    level: number;
    section: string;
  };
}

export interface UserDetails {
  id: string;
  username: string;
  role: "Student" | "Teacher" | "Admin";
  first_name?: string;
  last_name?: string;
  courses?: Course[];  // For students
  subjects?: Course[]; // For teachers
  grade?: {
    level: number;
    section: string;
  };
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: UserDetails;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/token/", credentials);
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      
      // Fetch user details
      const userDetails = await this.getUserDetails(credentials.username);
      localStorage.setItem("userRole", userDetails.role);
      localStorage.setItem("userId", userDetails.id);
    }
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const { confirmPassword, ...signupData } = credentials;
    const response = await api.post<AuthResponse>("/register/", signupData);
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      
      // Fetch user details after signup
      const userDetails = await this.getUserDetails(signupData.username);
      localStorage.setItem("userRole", userDetails.role);
      localStorage.setItem("userId", userDetails.id);
    }
    return response.data;
  },

  async getUserDetails(id: string): Promise<UserDetails> {
    const token = this.getCurrentToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await api.get<UserDetails>(`/users/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
  },

  getCurrentToken(): string | null {
    return localStorage.getItem("token");
  },

  getUserRole(): string | null {
    return localStorage.getItem("userRole");
  },

  getDashboardRoute(): string {
    const role = this.getUserRole();
    switch (role) {
      case "Teacher":
        return "/teacher";
      case "Student":
        return "/student";
      case "Admin":
        return "/school-management";
      default:
        return "/login";
    }
  },
};
