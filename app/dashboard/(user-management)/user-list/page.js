"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon, Plus, SquareX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TableData from "../../_components/TableData";
import createColumns from "../_components/UserColumn";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const addUserSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user","admin"],"role is required")
});

export default function UserManageMentPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role:""
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:5000/dashboard/users`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (data) => {
    try{
      const response = await fetch(`http://localhost:5000/auth/signup`,{
       method: "POST",
       headers:{
            "Content-Type": "application/json"
       },
       body: JSON.stringify(data)

      })
      if(response.status === 201){
       toast({
         variant: "success",
         description: (
           <div className="flex items-center">
             <CircleCheckIcon className="mr-2" />
             <span>user has been created successfully</span>
           </div>
         ),
       })
       setDialogOpen(false)
      }
      else{
       toast({
         variant: "warning",
         description: (
           <div className="flex items-center">
             <SquareX className="mr-2" />
             <span>user already exist</span>
           </div>
         ),
       })
      }
      

   }catch(err){
       throw new Error(err)
   }
  };

  const handleMakeAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/users/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "admin" }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, role: "admin" } : user))
        );
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>User promoted to admin! successfully</span>
            </div>
          ),
        });
      } else {
        toast({
          variant: "error",
          description: (
            <div className="flex items-center">
              <SquareX className="mr-2" />
              <span>Failed to update role</span>
            </div>
          ),
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>user deleted successfully</span>
            </div>
          ),
        });
        // alert("User deleted successfully!");
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      throw new Error(err)
    }
  };

  const columns = createColumns({
    onMakeAdmin: handleMakeAdmin,
    onDelete: handleDelete,
  });
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-deep-cyan">ADD USER</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>role</FormLabel>
                    <FormControl>
                    <Select onValueChange={(val) => field.onChange(val)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" {...field} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>select role</SelectLabel>
                              {Array.from(["user", "admin"], (item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full mt-2">
                <Button className="w-full bg-midnight" type="submit">
                  create user
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="flex justify-end w-full">
        <Button onClick={() => setDialogOpen(true)}>
          Add User
          <Plus />
        </Button>
      </div>
      <TableData columns={columns} data={users} />;
    </>
  );
}
