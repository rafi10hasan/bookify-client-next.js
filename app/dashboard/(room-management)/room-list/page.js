"use client";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TableData from "../../_components/TableData";
import createRoomColumns from "../_components/RoomColumn";

export default function RoomListPage() {
  const [roomlist, setRoomList] = useState([]);
  const { toast } = useToast();

  const fetchRooms = async () => {
    const response = await fetch(`http://localhost:5000/rooms/roomlist`);
    const data = await response.json();
    setRoomList(data);
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5000/rooms/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          variant: "success",
          description: (
            <div className="flex items-center">
              <CircleCheckIcon className="mr-2" />
              <span>room deleted succesfully</span>
            </div>
          ),
        });
        fetchRooms()
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const columns = createRoomColumns({
    onDelete: handleDelete,
  });
  return <TableData columns={columns} data={roomlist} />;
}
