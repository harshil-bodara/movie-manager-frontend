"use client";
import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import MovieForm from '@/components/movieForm';
import { MovieCardProps } from '@/components/movieCard';
import axiosClient from '@/utils/axiosClient';
import { getCookie } from '@/utils/Cookie';

const Create = () => {
    const router = useRouter();
    const handleSubmit = async (value: MovieCardProps) => {
        await axiosClient.post('/movie', value, {
            headers: {
                Authorization: `Bearer ${await getCookie("token")}`,
            }
        }).then((res) => {
            if (!res.data.error) {
                toast.success(res.data.message, {
                    autoClose: 2000,
                })
                router.push('/')
            }
            else {
                toast.error(res.data.message, {
                    autoClose: 2000,
                })
                
            }
        }).catch((err) => {
            toast.error("Something went wrong", {
                autoClose: 2000,
            })
        })
    };
    return (
        <div className='min-h-screen'>
            <div className='sm:pt-[49px] pt-20 pb-[200px] max-w-[1248px] mx-auto px-6'>
                <div className='flex items-center gap-2 sm:mb-[50px] mb-20'>
                    <IoArrowBackCircleSharp className='sm:text-4xl text-xl cursor-pointer' onClick={() => router.back()}  />
                    <h1 className='sm:text-5xl text-[32px] font-semibold '>Create a new movie </h1>
                </div>
                <MovieForm isEditing={false} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Create;