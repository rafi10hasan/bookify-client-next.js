import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Transaction from "../components/Transaction";
export const dynamic = "force-dynamic";

export default async function transactionPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  let transactionData;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/${session.id}`);
    transactionData = await response.json();
  } catch (error) {
    throw new Error(error);
  }
  return (
    <div className="px-4 py-2">
      <h1 className="text-deep-cyan text-xl font-semibold mb-2">Your Transaction...</h1>
      {transactionData.length > 0 ? (
        <Transaction transactions={transactionData} />
      ) : (
        <p>no transaction found</p>
      )}
    </div>
  );
}
