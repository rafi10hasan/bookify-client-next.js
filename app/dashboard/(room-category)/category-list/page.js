"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategoryForm from "../_components/CategoryForm";

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState({});
  const [value, setValue] = useState("");
  const [parentId, setParentId] = useState(null);

  const { toast } = useToast();

    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/categories/all`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        throw new Error(error)
      }
    
    };
    

  useEffect(()=>{
    fetchCategories()
  },[])
  const handleOperation = async () => {
    let url;
    let method;

    if (title === "add category" || title === "add sub category") {
  
      url = "http://localhost:5000/categories/add";
      method = "POST";
    }

    if (title === "edit category" || title === "edit sub category") {
      url = `http://localhost:5000/categories/update/${editingCategory._id}`;
      method = "PATCH";
    }

  try{
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title:value,parentCategory:parentId}),
    });
      
    if(response.ok){
        const {message} = await response.json();
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>{message}</span>
            </div>
          ),
        });
        fetchCategories()
        setDialogOpen(false)
        setParentId(null);
        setValue("")
    }
  }catch(err){
    throw new Error(err)
  }
   
  };

  const handleDeleteOperation = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const {message} = await response.json()
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>{message}</span>
            </div>
          ),
        });
        fetchCategories()
      } else {
        alert("Failed to delete category.");
      }
    } catch (err) {
      throw new Error(err)
    }
  };
  
  const handleDelete = async(id)=>{
    handleDeleteOperation(id)
  } 

  const handleSubDelte = async (id) => {
    handleDeleteOperation(id)
  };
 

  const handleCreate = async () => {
    setDialogOpen(true);
    setTitle("add category");
    setParentId(null)
  };

  const handleSubCreate = async (id) => {
    setDialogOpen(true);
    setTitle("add sub category");
    setParentId(id);
  };

  const handleEdit = async (id) => {
    setDialogOpen(true);
    setTitle("edit category");
    const categoryInfo = categories.find((cat) => cat._id === id);
    setEditingCategory(categoryInfo);
    setParentId(null)
  };

  const handleSubEdit = async (parentId, subId) => {
    setDialogOpen(true);
    setTitle("edit sub category");
    const categoryInfo = categories.find((cat) => cat._id === parentId);
    const subCategoryInfo = categoryInfo.subcategories.find((sub) => sub._id === subId);
    setEditingCategory(subCategoryInfo);
    setParentId(parentId)
  };

  
  return (
     <>
      <CategoryForm
        categories={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCreate={handleCreate}
        onSubCreate={handleSubCreate}
        onSubEdit={handleSubEdit}
        onSubDelete={handleSubDelte}
      />

      {
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-deep-cyan">{title}</DialogTitle>
              <DialogDescription>
                Make changes to your category Click save when youre done.
              </DialogDescription>
            </DialogHeader>
         
              <div className="flex flex-col gap-4">
                <Label htmlFor="name" className="font-semibold">
                 Category Name
                </Label>
                <Input
                  id="name"
                  defaultValue={
                    title.includes("edit") || title.includes("Edit") ? editingCategory.title : value
                  }
                  onChange={(e) => setValue(e.target.value)}
                  className="col-span-3"
                />
              </div>
            
            <DialogFooter>
              <Button onClick={handleOperation}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    </>
  );
}
