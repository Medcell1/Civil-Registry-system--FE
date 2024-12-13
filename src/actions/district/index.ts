"use server";

import axiosInstance from "@/utils/axiosInstance";

export const getDistricts = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Error fetching users" };
  }
};

