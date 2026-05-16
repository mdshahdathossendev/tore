
import { auth } from '@/lib/auth';
import { LocationArrow } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import { CalendarRange, LocateFixed } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = async() => {
    const tokenObj = await auth.api.getToken({
        headers: await headers()
    });
    const token = tokenObj.token;
    console.log(token);
    const res = await fetch('https://wender-server.vercel.app/user', {
        headers: {
            authorization:`Bearer ${token}`
        }
    });
    const datas =  await res.json();
    return (
        <div className='mx-auto container mt-4'>
            <h2 className='text-4xl font-bold'>Explore All Destination</h2>
            <p className='mt-2'>Find your perfect travel experience from our curated collection</p>
           <div className='grid grid-cols-3 gap-6 mt-6'>
             {
                datas.map(data => <div key={data._id}>
                    <Image className='w-full' src={data.imageUrl} width={200} height={200} alt='image'></Image>
                    <p className='flex items-center text-xl gap-2 opacity-50'><LocationArrow></LocationArrow> {data.country}</p>
                    <div className='flex justify-between text-2xl font-semibold my-2'>
                        <h2>{data.category}</h2>
                        <h2>{data.price}/<span className='font-normal opacity-40'>Person</span></h2>
                    </div>
                    <p className='flex gap-2'> <CalendarRange></CalendarRange> {data.departureDate}</p>
                   <Link href={`/detels/${data._id}`}> <Button variant='outline' className={'mt-2 '}>Book Now</Button></Link>
                </div>)
            }
           </div>
        </div>
    );
};

export default page;