"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Buttons from './button';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import DeleteModal from './deleteModal';

 export type MovieCardProps = {
    id?: string | number;
    title?:string;
    poster?:string;
    publishedYear?: string;
};

const MovieCard = ( props : {movie : MovieCardProps}) => {
    const router = useRouter();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | number | undefined>("");
    
    return (
        <div className='group bg-[#092C39] hover:bg-[#082935]/[0.55] rounded-xl sm:p-2 sm:pb-4 transition duration-500'>
            <DeleteModal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen} id={deleteId} />
            <div className='relative overflow-hidden'>
                <Image src={props.movie.poster ?? ""} alt='movie' height={400} width={300} className='sm:h-[300px] h-[180px] sm:rounded-xl rounded-t-xl sm:mb-4 mb-3 w-full' />
                <div className='absolute top-3 right-3 opacity-0 translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition duration-500'>
                    <Buttons className='!p-0 h-8 w-8 min-w-min rounded-full text-base bg-[#092C39]' onClick={() => router.push(`/movie/${props.movie.id}`)}><FiEdit /></Buttons>
                    <Buttons className='!p-0 h-8 w-8 min-w-min rounded-full text-lg mt-1.5 bg-[#092C39]' onClick={() => {setIsDeleteOpen(true); setDeleteId(props.movie.id)}}><RiDeleteBinLine /></Buttons>
                </div>
            </div>
            <h6 className='sm:text-xl text-base font-medium mb-2 sm:px-2 px-3'>{props.movie.title}</h6>
            <p className='text-sm sm:px-2 sm:py-0 pt-0 p-3'>{props.movie.publishedYear}</p>
        </div>
    );
};

export default MovieCard;