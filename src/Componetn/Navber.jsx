'use client'
import React from 'react';
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image';
import logo from '../../public/assets/Wanderlast.png'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
const Navber = () => {
    const {data: session} =   authClient.useSession();
    const user = session?.user
    const [open, setOpen] = useState(false)
    const logOutHandel = async () => {
        await authClient.signOut({
        callbackURL: "/",
});
};
    
    return (
        <nav className="w-full text-black bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold">
        <Image src={logo} width={200} height={200} alt='logo'></Image>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[17px]">
          <li>
            <Link
              href="/"
              className="hover:text-cyan-400 duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/destinations"
              className="hover:text-cyan-400 duration-300"
            >
              Destinations
            </Link>
          </li>

          <li>
            <Link
              href="/my-bookings"
              className="hover:text-cyan-400 duration-300"
            >
             My Bookings
            </Link>
          </li>

          <li>
            <Link
              href="/admin"
              className="hover:text-cyan-400 duration-300"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Button */}
        <div className='flex gap-1'>
           <Link href={'/profile'}> <button className="hidden md:block px-5 py-2 rounded-full duration-300">
          Profile
        </button></Link>
           <Link href={'/sinUp'}>
            <button className="hidden md:block px-5 py-2 rounded-full duration-300">
          Sin Up
        </button>
           </Link>
         
            {
                user? <Button onClick={logOutHandel}>LogOut</Button>: <Link href={'/login'}>Login</Link>
                }
         
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 px-6 pb-6">
          <ul className="flex flex-col gap-5 text-center text-lg">

            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>

            <Link href="/portfolio" onClick={() => setOpen(false)}>
              Portfolio
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-full duration-300">
              Login
            </button>

          </ul>
        </div>
      )}
    </nav>
    );
};

export default Navber;