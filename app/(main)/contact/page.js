"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon, Loader2, Send } from "lucide-react";

export default function ContactUsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        e.target.reset(); // Clear form fields
        toast({
          variant: "success",
          description: (
            <div className="flex items-center gap-2">
              <CircleCheckIcon className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{typeof data === "string" ? data : "Message sent successfully!"}</span>
            </div>
          ),
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50/50 dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Illustration */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              How can we help you?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-8 max-w-md">
              Have questions or feedback? Reach out to us and our support team will respond as soon as possible.
            </p>
            <div className="w-full max-w-md relative aspect-square">
              <Image
                src="https://img.freepik.com/free-vector/contact-concept-landing-page_23-2148203331.jpg?t=st=1735399211~exp=1735402811~hmac=1a2ebaf5e73b985caa561c794e868a3cd126f4c0da999a70309e7028ae3a9bef&w=740"
                alt="Contact Support Illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="bg-white dark:bg-[#162231] shadow-xl border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Contact Us
                </h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                  Fill out the form below and we will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-[#2A384C] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-[#2A384C] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    name="message"
                    rows={4}
                    placeholder="Type your message here..."
                    className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#2A384C] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto min-w-[160px] h-12 px-8 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-70 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}