import Link from "next/link";
import { BookOpenText } from "lucide-react";
import SignUpForm from "./_components/SignUpForm";

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center px-4 py-8">
      {/* Bookify Brand Logo */}
      <Link href="/" className="flex items-center gap-2 mb-6">
        <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
          <BookOpenText className="w-7 h-7" />
        </div>
        <span className="text-3xl font-bold tracking-tight text-white">
          Book<span className="text-blue-500">ify</span>
        </span>
      </Link>

      {/* Card Container - Width barano hoyeche max-w-xl e */}
      <div className="w-full max-w-xl bg-[#1e293b]/80 border border-slate-700/60 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white mb-6 text-left">
          Create an account
        </h1>
        <SignUpForm />
      </div>
    </section>
  );
}