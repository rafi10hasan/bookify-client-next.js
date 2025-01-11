'use client'

import { useToast } from "@/hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";
import Image from "next/image";

export default function ContactUsPage(){
   const {toast} = useToast()
    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json", // Set the content type for JSON
          },
          body: JSON.stringify(contactData)
      })
      if(response.ok){
          const data = await response.json()
          toast({
              variant: "success",
              description: (
                <div className="flex items-center">
                <CircleCheckIcon className="mr-2" />
                <span>{data}</span>
              </div>
              ),
              })
      }
      } catch (error) {
        throw new Error(error)
      }
        
    }

    return (
        <section className="light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 py-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
              <h2 className="text-2xl leading-none md:text-[45px] font-bold mb-6">
                How can we help you?
              </h2>
              <div className="md:pt-6">
                    <Image src="https://img.freepik.com/free-vector/contact-concept-landing-page_23-2148203331.jpg?t=st=1735399211~exp=1735402811~hmac=1a2ebaf5e73b985caa561c794e868a3cd126f4c0da999a70309e7028ae3a9bef&w=740" alt="contact" className="w-full" width={300} height={300} />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="bg-white dark:bg-[#162231] shadow-xl rounded-2xl p-6 md:p-12">
                <h2 className="text-2xl md:text-[45px] leading-none font-bold mb-4">Contact Us</h2>
                <p className="text-lg mb-12">We list your menu online, help you process orders.</p>

                <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      className="min-h-[48px] leading-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border border-transparent rounded-xl focus:outline-none focus:border focus:border-[#86b7fe] w-full px-5"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      name="email"
                      type="email"
                      className="min-h-[48px] leading-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border border-transparent rounded-xl focus:outline-none focus:border focus:border-[#86b7fe] w-full px-5"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      name="message"
                      className="min-h-[48px] leading-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border border-transparent rounded-xl focus:outline-none focus:border focus:border-[#86b7fe] w-full px-5"
                      placeholder="Enter Message"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="text-start">
                    <button
                      type="submit"
                      className="bg-deep-cyan hover:bg-opacity-90 text-white px-8 py-3 rounded mb-4"
                    >
                      Submit
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