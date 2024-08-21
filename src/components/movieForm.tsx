"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';
import { LuUpload } from 'react-icons/lu';
import InputBox from './input';
import Buttons from './button';
import { MovieCardProps } from './movieCard';

const validationSchema = Yup.object({
    title: Yup.string().required('Name is required'),
    publishedYear: Yup.string().required('Published year is required'),
    poster: Yup.string().required("Image is required"),
});

const MovieForm = ({ isEditing, handleSubmit , movieData }: { isEditing: boolean, handleSubmit: (values: MovieCardProps) => void , movieData?: MovieCardProps}) => {


    React.useEffect(() => {
        if(movieData) {
            formik.setValues({
                title: movieData.title ?? '',
                publishedYear: movieData.publishedYear ?? '',
                poster: movieData.poster ?? '',
            });
            setFileName(movieData.poster ?? '');        
        }
    }, [movieData]);

    const [fileName, setFileName] = useState( movieData?.poster ?? '' );
    const formik = useFormik({
        initialValues: {
            title: '',
            publishedYear:'',
            poster: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            handleSubmit(values);
        },
        
    });

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmitForm = (event: any) => {
        event.preventDefault();
        if(!formik.isValid){
            toast.warning("Please fill all fields",{
                autoClose: 1000
            });
            return
        }
        formik.handleSubmit();
    };


    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        
        if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
            formik.setFieldError('poster', 'You can only add jpg and png format');
            return;
        }
        if (file) {
            const fileString = await toBase64(file).then((data) => data as string)
            setFileName(fileString);
            formik.setFieldValue('poster', fileString);
        } else {
            setFileName('');
            formik.setFieldValue('poster', '');
        }
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <div className='grid sm:grid-cols-2 gap-6'>
                <div>
                    <div className={`relative sm:max-w-[473px] w-full aspect-square bg-[#224957] border-dashed border-2  ${formik.errors.poster && formik.touched.poster ? ' border-red-500' : 'border-white'} rounded-[10px] flex items-center justify-center sm:order-1 order-2`}>
                        {fileName ? (
                            <div className='relative h-full w-full'>
                                <Image alt="movie" src={fileName} height={500} width={500} className='aspect-square h-full w-full' />
                                <Buttons onClick={() => {setFileName(''), formik.setFieldValue('poster', '') , formik.setTouched({poster: true})}} className='absolute top-1 right-2 !p-0 h-6 w-6 min-w-min rounded-full text-lg mt-1.5 bg-[#092C39] !cursor-pointer'><IoClose /></Buttons>
                            </div>
                        ) : (
                            <>
                                <div className='flex flex-col items-center gap-2'>
                                    <LuUpload />
                                    <p className="text-sm">Drop an image here</p>
                                </div>
                                <input
                                    name='poster'
                                    onChange={handleFileChange}
                                    onBlur={formik.handleBlur}
                                    value={fileName}
                                    type='file'
                                    className="h-full w-full opacity-0 absolute cursor-pointer "
                                />
                            </>
                        )}
                    </div>
                    {formik.errors.poster && formik.touched.poster && (
                        <div className="text-red-500 text-base mt-1 px-1">{formik.errors.poster}</div>
                    )}
                </div>
                <div className='sm:max-w-[362px] sm:order-2 order-1'>
                    <div className='space-y-6'>
                        <div>
                            <InputBox placeholder='Title' type='text' name='title' onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} className={`${formik.errors.title && formik.touched.title ? 'rounded-[10px] border-2 border-red-500' : ''}`} />
                            {formik.errors.title && formik.touched.title && (
                                <div className="text-red-500 text-sm mt-1 px-1">{formik.errors.title}</div>
                            )}
                        </div>

                        <div>
                            <InputBox placeholder='Publishing year' type='number' name='publishedYear' onChange={formik.handleChange} value={formik.values.publishedYear} onBlur={formik.handleBlur} className={`sm:max-w-[216px] ${formik.errors.publishedYear && formik.touched.publishedYear ? 'rounded-[10px] border-2 border-red-500' : ''}`} />

                            {formik.errors.publishedYear && formik.touched.publishedYear && (
                                <div className="text-red-500 text-sm mt-1 px-1">{formik.errors.publishedYear}</div>
                            )}
                        </div>
                    </div>
                    <div className='sm:flex gap-4 sm:mt-16 mt-10 hidden'>
                        <Buttons variant='outline' className='w-full' onClick={(e) =>{formik.handleReset(e) ; setFileName('')}}>Cancel</Buttons>
                        <Buttons className='w-full' type='submit' >{isEditing ? "Update" : "Submit"}</Buttons>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 sm:mt-16 mt-10 sm:hidden'>
                <Buttons variant='outline' className='w-full' onClick={(e) =>{formik.handleReset(e) , setFileName('')}}>Cancel</Buttons>
                <Buttons className='w-full' type='submit'  >{isEditing ? "Update" : "Submit"}</Buttons>
            </div>
        </form>
    );
};

export default MovieForm;