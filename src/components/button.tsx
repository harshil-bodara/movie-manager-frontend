"use client";
import React, { ReactNode } from "react";
import { Button } from "@nextui-org/react";

type ButtonProps = {
    variant?: "default" | "outline" | "danger";
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: "button" | "submit";
    className?: string;
};

const Buttons = ({
    variant = "default",
    children,
    onClick,
    disabled,
    type = "button",
    className,
    ...props
}: ButtonProps) => {
    const buttonClassNames = `
        flex items-center justify-center transition duration-300 gap-1.5 font-bold rounded-[10px] h-14 !text-white !opacity-100
        ${variant === "default" && "bg-primary py-2 px-7"}
        ${variant === "danger" && "bg-[#EB5757] py-2 px-7"}
        ${variant === "outline" && "border border-white bg-transparent py-2 px-7"}
        ${disabled && "!opacity-60 pointer-events-none"}
        ${className && className}
    `;

    return (
        <Button
            className={buttonClassNames}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </Button>
    );
};

export default Buttons;