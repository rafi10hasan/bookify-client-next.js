'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
export default function Transaction ({transactions}) {

  return (

    <div className="rounded-md border bg-gray-50">
      <Table className="w-full text-center font-medium border-collapse">
        <TableHeader >
          <TableRow>
            <TableHead className="border text-center font-semibold">Room Name</TableHead>
            <TableHead className="border text-center font-semibold">Booking Date</TableHead>
            <TableHead className="border text-center font-semibold">Payment Method</TableHead>
            <TableHead className="border text-center font-semibold">Transaction Id</TableHead>
            <TableHead className="border text-center font-semibold">invoice</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length && (
            transactions.map((transaction)=>(
                <TableRow className="text-center font-semibold" key={transaction._id}>
              <TableCell className="border">{transaction.roomName}</TableCell>
              <TableCell className="border">{format(transaction.checkin,"PPP")}</TableCell>
              <TableCell className="border"><Badge className="h-8 w-12 rounded-sm bg-deep-yellow">{transaction.paymentMethod}</Badge></TableCell>
              <TableCell className="border ">{transaction.transactionId}</TableCell>
              <TableCell className="border"><Button><Link target="_blank" href= {`${transaction.invoiceUrl}`}>see invoice</Link></Button></TableCell>  
            </TableRow>
            ))
           
          )}
        </TableBody>
      </Table>
    </div>
  
  );
}
