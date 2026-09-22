'use client';
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
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Transaction({ transactions = [] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Transactions</h1>
        <p className="text-xs text-slate-500 mt-1">Review your payment history and download invoices.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
        <Table className="w-full text-left">
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200/80">
              <TableHead className="font-semibold text-slate-700 py-3.5">Room Name</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5">Date</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5">Method</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5">Transaction ID</TableHead>
              <TableHead className="font-semibold text-slate-700 py-3.5 text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.length > 0 ? (
              transactions.map((tx) => (
                <TableRow key={tx._id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none">
                  <TableCell className="font-semibold text-slate-800">{tx.roomName}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{format(new Date(tx.checkin), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase text-[11px] font-semibold bg-amber-50/50 text-amber-700 border-amber-200">
                      {tx.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">{tx.transactionId}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                      <Link target="_blank" href={`${tx.invoiceUrl}`}>
                        Invoice <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-slate-400">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}