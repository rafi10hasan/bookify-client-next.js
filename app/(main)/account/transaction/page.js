import { auth } from "@/auth.config";
import Transaction from "../components/Transaction";

export default async function transactionPage(){
    const session = await auth();
    const response = await fetch(`http://localhost:5000/transaction/${session.id}`);
    const transactionData = await response.json();
    return (
        <div className="px-4 py-2">
        <h1 className="text-deep-cyan text-xl font-semibold mb-2">Your Transaction...</h1>
        {
            transactionData.length > 0 ? (
                  <Transaction transactions={transactionData}/>
            ):(
              <p>no transaction found</p>
            )
        }
        </div>
    );
}