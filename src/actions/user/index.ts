"use server";

import { User } from "@/app/@types";
import axiosInstance from "@/utils/axiosInstance";



export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/user"); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const createUser = async (userData: {name: string, district: string; role: string; password: string;}) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Error creating user" };
  }
};




