import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const BookingPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
   
    const userId = session?.session?.userId
    const res = await fetch(`https://wender-server.vercel.app/booing/${userId}`);
    const bookings = await res.json();
    console.log(bookings)

    return (
        <div>
           <h2>My Booking</h2>
           <p>Manage and view your upcoming travel plans</p>
           {
            bookings.map(booking => <div key={booking._id}> 
             <div>
                <Image></Image>
             </div>
             <div></div>
             </div>)
           }
        </div>
    );
};

export default BookingPage;