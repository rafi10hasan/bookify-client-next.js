import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Transaction from "../components/Transaction";

export const dynamic = "force-dynamic";

export default async function TransactionPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  let transactionData = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transaction/${session.id}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      transactionData = await response.json();
    }
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }

  return <Transaction transactions={transactionData} />;
}