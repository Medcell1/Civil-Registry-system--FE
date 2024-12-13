
"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createUser } from "@/actions/user";
import { useToast } from "./use-toast"
const roles = ["Supervisor", "Analytical"];

export default function UserForm() {
    const { toast } = useToast()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(roles[0]);
    const [district, setDistrict] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser({ name, email, role, district });
            toast({
                title: "User created Successful",
            }); 
            setOpen(false);
        } catch (error) {
            toast({
                title: `User created error : ${error} `,
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white">Add New User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter user name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter user email"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium">
                            Role
                        </label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-full p-2 border rounded">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="district" className="block text-sm font-medium">
                            District
                        </label>
                        <input
                            id="district"
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter district"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="mt-4">Create User</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
