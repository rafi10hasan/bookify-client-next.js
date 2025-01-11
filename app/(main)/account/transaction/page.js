import { auth } from "@/auth.config";
import Transaction from "../components/Transaction";
export const dynamic = "force-dynamic"; 

export default async function transactionPage() {
  try {
    const session = await auth();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/${session.id}`);
    const transactionData = await response.json();
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
  } catch (error) {
    throw new Error(error);
  }
}
