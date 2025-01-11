"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import accommodationColumn from "../_components/AccomodationColumn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableData from "../../_components/TableData";

export default function AccommodationListPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAcc, setSelectedAcc] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const fetchAccommodation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/accommodations`);
      const data = await response.json();
      setAccommodations(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAccommodation();
  }, []);

  const handleEdit = async (id) => {
    setDialogOpen(true);
    const acc = accommodations.find((acc) => acc._id === id);
    setSelectedAcc(acc);
  };

  const handleAccEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/accommodations/${selectedAcc?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTotalRooms: value }),
      });
      if (response.ok) {
        const { message } = await response.json();
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>{message}</span>
            </div>
          ),
        });
        setDialogOpen(false);
        fetchAccommodation();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const columns = accommodationColumn({
    onEdit: handleEdit,
  });
  return (
    <>
      <TableData columns={columns} data={accommodations} />;
      {
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-deep-cyan">Edit Accommodation </DialogTitle>
              <DialogDescription>
                Make changes to your category Click save when youre done.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Label htmlFor="name" className="font-semibold">
                Room Name
              </Label>
              <Input
                id="name"
                readOnly
                defaultValue={selectedAcc?.title}
                onChange={(e) => setValue(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="name" className="font-semibold">
                Available Room
              </Label>
              <Input
                type="number"
                id="name"
                min={0}
                defaultValue={selectedAcc?.totalRooms}
                onChange={(e) => setValue(e.target.value)}
                className="col-span-3"
              />
            </div>

            <DialogFooter>
              <Button onClick={handleAccEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    </>
  );
}
