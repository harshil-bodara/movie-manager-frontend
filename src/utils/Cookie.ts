"use server";
import { cookies } from 'next/headers'


export const setCookie = (name: string, value: string) => {
        cookies().set(name, value)
}

export const getCookie = (name: string) => {
        return cookies().get(name)?.value
}

export const deleteCookie = (name: string) => {
        cookies().delete(name)
}

