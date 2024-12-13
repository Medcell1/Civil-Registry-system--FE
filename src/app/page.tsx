import { Metadata } from "next"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Authentication | Civil Registry of Cotonou",
  description: "Authentication for Civil Registry of Cotonou",
}

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-full bg-zinc-900 lg:block lg:w-1/2">
        <div className="flex h-full flex-col justify-between p-8 text-white">
          <div className="flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <h1 className="text-2xl">Civil Registry of Cotonou</h1>
          </div>
     
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your credentials to access the Civil Registry system
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}

