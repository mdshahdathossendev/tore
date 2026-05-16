'use client'
import React, { use, useState } from 'react';
import {Button, DateField, Label} from "@heroui/react";
import { authClient } from '@/lib/auth-client';

const BookingCard = ({data}) => {
    const [depserdate, setdepserdata] = useState(null)
    const {data: session} =   authClient.useSession();
    const user = session?.user;
   const hndlbokking = async () => {
  const bookingData = {
    userId: user?.id,
    userName: user?.name,
    destinationId: data?._id,
    price: data?.price,
    imageUrl: data?.imageUrl,
    country: data?.country,
    category: data?.category
  };
  const res = await fetch('http://localhost:5000/booing', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
  })
  const result = await res.json()

  console.log(bookingData);

};
    return (
        <div className='bg-white shadow p-4 mt-4 rounded-xl space-y-3'>
           <p>Starting from</p>
           <h2 className='text-4xl font-bold text-cyan-500'>${data.price}</h2>
           <p>Per person</p>
           <DateField
  label="Booking Date"
  aria-label="Booking Date"
  onChange={setdepserdata}
  className="w-[256px] mt-4"
  name="date"
>
  <DateField.Group>
    <DateField.Input>
      {(segment) => (
        <DateField.Segment segment={segment} />
      )}
    </DateField.Input>
  </DateField.Group>
</DateField>    
    <Button onClick={hndlbokking} className={'w-full rounded-none bg-cyan-500 mt-3'}>Book Now</Button>
        </div>
    );
};

export default BookingCard;