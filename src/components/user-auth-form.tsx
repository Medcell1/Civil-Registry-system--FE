"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "./use-toast"
import axiosInstance from "../utils/axiosInstance"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const target = event.target as typeof event.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value
    const password = target.password.value

    console.log("Sending Login request with:", { username, password });

    try {
      const response = await axiosInstance.post('/auth/login', { username, password });

      console.log("Login response:", response.data);

      localStorage.setItem('token', response.data.token)

      toast({
        title: "Login Successful",
        description: "Welcome back to the Civil Registry system.",
      })

      router.push('/dashboard')
    } catch (error: any) {
      console.error('Login failed:', error);

      if (error.response) {
        console.error("Error response:", error.response);
        toast({
          title: "Login Failed",
          description: error.response?.data?.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        })
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast({
          title: "Network Error",
          description: "Unable to reach the server. Please try again later.",
          variant: "destructive",
        })
      } else {
        console.error("Error message:", error.message);
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className={cn("mt-8 space-y-6", className)} {...props}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </Label>
          <div className="mt-1">
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}
