"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Buttons from "./button";

type InputProps = {
    type?: "email" | "password" | "checkbox" | "text" | "file" | "number";
    placeholder?: string;
    className?: string;
    value?: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: any;
};

const InputBox = ({
    type,
    placeholder,
    className,
    value,
    name,
    onChange,
    onBlur,
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative">
            <Input
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className={className}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                {...props}
            />
            {
                type === "password" &&
                <Buttons
                    className="!absolute !right-0 !top-0 !h-full !p-0 bg-transparent min-w-[45px]"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <LuEyeOff className="h-5 w-5" />
                    ) : (
                        <LuEye className="h-5 w-5" />
                    )}
                </Buttons>
            }
        </div>
    );
};

export default InputBox;
