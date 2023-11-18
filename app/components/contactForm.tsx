"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  //read database

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSucces] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("email: ", email);
    console.log("Message: ", message);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        message: message,
      }),
    });

    const { success, errors } = await res.json();

    console.log(success);
    setSucces(success);

    if (success) {
      setFullname("");
      setEmail("");
      setMessage("");
      router.refresh();
    } else {
      setError(errors);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3">
        
          <button
            type="button"
            className="col-start-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => router.push("/datashow")}
          >
            Show All Data
          </button>
        
      </div>
      <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e, i) => (
            <div
              key={i}
              className={`${success ? "text-green-800" : "text-red-600"}
                    px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            id="fullname"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="message">Your Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="h-32"
            id="message"
            placeholder="Type Your Message Here..."
          ></textarea>
        </div>

        <button className="bg-green-700 p-3 text-white font-bold" type="submit">
          Send
        </button>
      </form>
    </>
  );
}
