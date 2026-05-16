import BookingCard from '@/Componetn/BookingCard';
import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = async({ params }) => {
    const {id} = await params
    console.log(id)
    const tokenObj = await auth.api.getToken({
        headers: await headers()
    });
    const token = tokenObj.token
    console.log(token)
    
    const res = await fetch(`https://wender-server.vercel.app/user/${id}`, {
      headers:{
         authorization: `Bearer ${token}`
      }
    });
    const data = await res.json()
     return (
        <div className='mx-auto container'>
           <div className='flex justify-between mt-4'>
           <Link href={'/'}> <Button variant='outline border-none' className={'rounded-none'}>Back to Home</Button></Link>
            <div className='flex gap-2'>
                <Button variant='outline' className={'rounded-none border-black'}>Edit</Button>
                <Button variant='danger' className={'rounded-none '}>Cancel</Button>
            </div>
           </div>
           <Image className='w-full h-150 mt-4' src={data.imageUrl} width={200} height={200} alt='image'></Image>
           <div className='flex justify-between'>
            <div>
                <p>{data.country}</p>
                <h1>{data.category}</h1>
                <h2>{data.duration}</h2>
            </div>
            <BookingCard data = {data}></BookingCard>
           </div>
        </div>
    );
};

export default page;