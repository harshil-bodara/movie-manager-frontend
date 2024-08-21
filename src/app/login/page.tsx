'use client';
import React from 'react';
import Link from 'next/link';
import { Checkbox } from '@nextui-org/checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axiosClient from '@/utils/axiosClient';
import Buttons from '@/components/button';
import InputBox from '@/components/input';
import { setCookie } from '@/utils/Cookie';
// Define validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
        await axiosClient.post('/auth/login', values).then((res) => {
            if(res.data.error) {
                toast.error(res.data.message, {
                  autoClose: 2000,
                })
                return
            }
            else{
                setCookie('token', res.data.data.token)
                router.push('/')
                toast.success(res.data.message, {
                  position: 'top-right',
                  autoClose: 2000,
                })

            }
          
        })
    
    },
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[428px] mx-auto px-6">
      <p className='text-center font-semibold sm:text-[64px] text-5xl mb-10'>
        Sign in
      </p>
      <form className="w-full space-y-6" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputBox
            placeholder='Email'
            type='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full ${formik.errors.email && formik.touched.email ? 'rounded-[10px] border-2 border-red-500' : ''}`}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm mt-1 px-1">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <InputBox
            placeholder='Password'
            type='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`w-full ${formik.errors.password && formik.touched.password ? 'rounded-[10px] border-2 border-red-500' : ''}`}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm mt-1 px-1">{formik.errors.password}</div>
          )}
        </div>
        <div className="flex-row flex items-center justify-between gap-3 mb-4">
          <Checkbox className='checkbox'>Remember me</Checkbox>
          <Link href="#" className="text-sm block text-right hover:underline">
            Forgot password?
          </Link>
        </div>
        <Buttons type="submit" className="w-full" disabled={!formik.isValid}>
          {formik.isSubmitting ? 'Submitting...' : 'Login'}
        </Buttons>
      </form>
    </div>
  );
};

export default Login;
