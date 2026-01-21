"use client"

import { content } from "@/config/content";
import { phoneRegex } from "@/utils/helpers/regex";
import { Input } from "@heroui/input";
import { useState, useEffect } from "react";

interface PhoneInputProps {
    value: string;
    onChange: (value: any) => void;
    name: string;
    label?: string;
    required?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    isClearable?: boolean;
    className?: string;
    placeholder?: string
}

export default function PhoneInput(props: PhoneInputProps) {
    const {
        value, onChange, name, className, label = content.phoneNumber, required = false,
        isDisabled = false, isRequired = false, isClearable = false, placeholder = undefined
    } = props;

    const [error, setError] = useState("");


    useEffect(() => {
        if (!value && required) {
            setError(content.requiredPhoneNumber);
        } else if (value && !phoneRegex.test(value)) {
            setError(content.invalidPhoneNumber);
        } else {
            setError("");
        }
    }, [value, required]);

    return (
        <>
            <Input
                name={name}
                label={label}
                placeholder={placeholder || "09123456789"}
                value={value}
                onChange={onChange}
                isInvalid={!!error}
                errorMessage={error}
                isDisabled={isDisabled}
                isRequired={isRequired}
                isClearable={isClearable}
                className={className}
            />
        </>
    );
}
