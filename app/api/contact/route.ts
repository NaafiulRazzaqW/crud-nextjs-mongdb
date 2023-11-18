import connectDB from "../../_lib/mongodb";
import Contact from "../../models/contact";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Email, Min, Required } from "@/app/_lib/validator";

export async function POST(req: Request) {
  const data = await req.json();

  let errors = [];
  if (Email(data.email)) {
    errors.push("Email Tidak Sesuai Standart");
  }
  if (Required(data.fullname)) {
    errors.push("Nama Wajib Di isi");
  }
  if (Required(data.message)) {
    errors.push("Pesan Wajib Di isi");
  }
  if (Min(data.fullname, 2)) {
    errors.push("Nama Harus Lebih Dari 2");
  }
  if (errors.length !== 0) {
    return Response.json({
      success: false,
      errors: errors,
    });
  }
  const prisma = new PrismaClient();
  async function main() {
    await prisma.contact.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        message: data.message,
      },
    });
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  return Response.json({ success: true });
}

export async function GET() {
  const prisma = new PrismaClient();
  
   const connect=  await prisma.contact.findMany({
    select : {
        fullname: true,
        email: true,
        message: true
    }
   });
    await prisma.$disconnect();
   return Response.json({
    contacts : connect
  });



  
}
