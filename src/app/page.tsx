"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pagination, Spinner } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FiPlusCircle } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import axiosClient from '@/utils/axiosClient';
import MovieCard, { MovieCardProps } from '@/components/movieCard';
import { deleteCookie, getCookie } from '@/utils/Cookie';
import Buttons from '@/components/button';
import EmptyList from '@/components/emptyList';


export let hanDelete = ( id : string | number | undefined) => { };
const MovieList = () => {
    const [total, setTotal] = useState(0)
    const [movies, setMovies] = useState<MovieCardProps[]>([])
    const [numPages, setNumPages] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const calculateTotalPages = () => {
            const totalPages = Math.ceil( total/ 8);
            setNumPages(totalPages);
        }
        calculateTotalPages()
    }, [movies])
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();

    const handleLogout = () => {
        deleteCookie("token")
        router.push("/login")
    }
    

    const getMovies = async () => {

        try {
            setLoading(true)
            const token = await getCookie("token")
            if (!token) return
            router.push("/login")
            const { data } = await axiosClient.get(`/movie/getAll?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            setMovies(data.data.movies)
            setTotal(data.data.total)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getMovies()
    }, [page])

    hanDelete = async (id : string | number | undefined) => {
        await axiosClient
          .delete(`/movie?id=${id}`, {
            headers: {
              Authorization: `Bearer ${await getCookie("token")}`,
            },
          })
          .then((res) => {
            if (!res.data.error) {
              toast.success(res.data.message, {
                autoClose: 2000,
              });
              getMovies()
              
            } else {
              toast.error(res.data.message, {
                autoClose: 2000,
              });
            }
          })
          .catch((err) => {
            toast.error("Something went wrong", {
              autoClose: 2000,
            });
          });
      };




    return (
        <div className='min-h-screen'>
            
            {
                loading
                    ?
                    <div className='h-screen flex items-center justify-center '>
                        <Spinner color="white" size="lg" />
                    </div>
                    :
                    <>
                        {
                            movies.length === 0
                                ?
                                <EmptyList />
                                :
                                <div className='sm:pt-[50px] pt-20 pb-[220px] max-w-[1248px] mx-auto px-6'>
                                    <div className='sm:mb-[50px] mb-20 flex justify-between items-center'>
                                        <div className='flex gap-3 items-center'>
                                            <h1 className='sm:text-5xl text-[32px] font-semibold'>My movies</h1>
                                            <Link href="/movie">
                                                <FiPlusCircle className='sm:text-3xl text-xl sm:mt-2 mt-1' />
                                            </Link>
                                        </div>
                                        <Buttons onClick={handleLogout} className='flex gap-3 items-center bg-transparent'>
                                            <h6 className='text-base font-semibold sm:block hidden'>Logout</h6>
                                            <LuLogOut className='text-xl' />
                                        </Buttons>
                                    </div>
                                    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-6 gap-5 sm:mb-[50px] mb-20'>
                                        {movies.map((movie) => (
                                            <MovieCard movie={movie} />
                                        ))}
                                    </div>
                                    <Pagination loop showControls color="primary"  total={numPages} onChange={(page) => setPage(page)}  initialPage={page} className='flex justify-center pagination' />
                                </div>
                        }

                    </>
            }

        </div>
    );
};

export default MovieList;