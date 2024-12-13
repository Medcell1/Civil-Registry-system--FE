"use client";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import axiosInstance from "@/utils/axiosInstance"
import { District, User } from "@/app/@types"

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [districts, setDistricts] = useState<District[]>([])
  const [open, setOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'SUPERVISOR',
    district: ''
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user")
        setUsers(response.data)
      } catch (error) {
        console.error(error)
        setError("Failed to fetch users. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    const fetchDistricts = async () => {
      try {
        const response = await axiosInstance.get("/districts")
        setDistricts(response.data)
      } catch (error) {
        console.error(error)
        setError("Failed to fetch districts. Please try again later.")
      }
    }

    fetchUsers()
    fetchDistricts()
  }, [])

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
        districtId: newUser.district,
      })
      setUsers([...users, response.data])
      setOpen(false)
      setNewUser({ username: '', password: '', role: 'SUPERVISOR', district: '' })
    } catch (error) {
      console.error(error)
      setError("Failed to add user. Please try again later.")
    }
  }

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="text-white">{error}</div>
      </div>
    )
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <div className="flex items-center space-x-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Add New User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new user.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUPERVISOR">SUPERVISOR</SelectItem>
                        <SelectItem value="ANALYTICS">ANALYTICS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="district" className="text-right">
                      District
                    </Label>
                    <Select
                      value={newUser.district}
                      onValueChange={(value) => setNewUser({ ...newUser, district: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district: District) => (
                          <SelectItem key={district._id} value={district._id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit}>Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Table>
          <TableCaption>A list of all users in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>District</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user._id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.district.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
