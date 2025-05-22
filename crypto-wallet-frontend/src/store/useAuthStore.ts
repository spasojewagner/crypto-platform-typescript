import { create } from "zustand";
import { axiosInstance } from "../http/index";

// Types for user and authentication state
export interface AuthUser {
  _id: string;
  email: string;
  fullName: string;
  invitation?: string;
  terms?: boolean;
  isAuthenticated?: boolean;
  profilePic?: string;
}

export interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;

  // Actions
  checkAuth: () => Promise<void>;
  register: (data: {
    email: string;
    fullName: string;
    password: string;
    invitation?: string;
    terms: boolean;
  }) => Promise<{ success: boolean; message: string }>;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    fullName?: string;
    email?: string;
    profilePic?: string;
  }) => Promise<{ success: boolean; message: string }>;
  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  return {
    authUser: null,
    isSigningUp: false, 
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,

    // Authentication check - rely on HttpOnly cookies
    checkAuth: async () => {
      set({ isCheckingAuth: true });
      
      try {
        const res = await axiosInstance.get("/api/auth/check");


        set({ authUser: res.data.user });
      } catch (error: any) {
        console.log("Error in checkAuth:", error);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    // User registration
    register: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/api/auth/register", data);
        const { user } = res.data;
        
        // Set user in state - token is handled by HttpOnly cookie
        set({ authUser: user });
        
        return { success: true, message: "Registration successful" };
      } catch (error: any) {
        console.error("Error in register:", error);
        return { 
          success: false, 
          message: error.response?.data?.error || "Registration failed" 
        };
      } finally {
        set({ isSigningUp: false });
      }
    },

    // User login
    login: async (credentials) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/api/auth/login", credentials);
        const { user } = res.data;
        
        // Set user in state - token is handled by HttpOnly cookie
        set({ authUser: user });
        
        return { success: true, message: "Login successful" };
      } catch (error: any) {
        console.error("Error in login:", error);
        return { 
          success: false, 
          message: error.response?.data?.error || "Login failed" 
        };
      } finally {
        set({ isLoggingIn: false });
      }
    },

    // User logout
    logout: async () => {
      try {
        await axiosInstance.post("/api/auth/logout");
      } catch (error) {
        console.error("Error in logout API call:", error);
      } finally {
        // Clear state regardless of API call success
        set({ authUser: null });
      }
    },

    // Profile update
    updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/api/auth/update-profile", data);
        const { user } = res.data;
        set({ authUser: user });
        return { success: true, message: "Profile successfully updated" };
      } catch (error: any) {
        // Handle unauthorized errors by clearing auth state
        if (error.response?.status === 401) {
          set({ authUser: null });
          return { 
            success: false, 
            message: "Session expired. Please log in again." 
          };
        }
        
        console.error("Error in updateProfile:", error);
        return { 
          success: false, 
          message: error.response?.data?.error || "Profile update failed" 
        };
      } finally {
        set({ isUpdatingProfile: false });
      }
    },

    // Manual cleanup function
    clearAuthState: () => {
      console.log('Manually clearing auth state');
      set({ authUser: null });
    }
  };
});