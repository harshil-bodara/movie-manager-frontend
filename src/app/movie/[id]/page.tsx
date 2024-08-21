"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import MovieForm from '@/components/movieForm'; 
import { MovieCardProps } from '@/components/movieCard';
import axiosClient from '@/utils/axiosClient';
import { getCookie } from '@/utils/Cookie';

const Edit = () => {
  const [movieData, setMovieData] = useState<MovieCardProps>();
  const router = useRouter();
  const params = useParams()
  const handleSubmit = async (value: MovieCardProps) => {
    const data = {
      id: params.id,
      ...value
    }
    await axiosClient.put('/movie', data, {
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
  
  const gerMovieData = async () => {
    await axiosClient.get(`/movie?id=${params.id}`, {
      headers: {
        Authorization: `Bearer ${await getCookie("token")}`,
      }
    }).then((res) => {
      if (!res.data.error) {
        setMovieData(res.data.data)
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
      return false
    })
  };

  useEffect(() => {
    gerMovieData()
  }, [])

  return (
    <div className='min-h-screen'>
      <div className='sm:pt-[49px] pt-20 pb-[200px] max-w-[1248px] mx-auto px-6'>
        <div className='flex items-center gap-2 sm:mb-[50px] mb-20'>
          <IoArrowBackCircleSharp className='sm:text-4xl text-xl cursor-pointer' onClick={() => router.back()} />
          <h1 className='sm:text-5xl text-[32px] font-semibold '>Edit </h1>
        </div>
        <MovieForm isEditing={true} handleSubmit={handleSubmit} movieData={movieData} />
      </div>
    </div>
  );
};

export default Edit;