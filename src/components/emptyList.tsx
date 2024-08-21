"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Buttons from './button';

const EmptyList = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-screen px-6 space-y-10">
      <h1 className='sm:text-5xl text-[32px] font-semibold'>Your movie list is empty</h1>
      <Buttons type="submit" className="sm:w-auto w-full" onClick={() => router.push('/movie')} >
        Add a new movie
      </Buttons>
    </div>
  );
};

export default EmptyList;