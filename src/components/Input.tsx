import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps {
    id: string,
    title: string,
    register: UseFormRegisterReturn,
    error?: string,
    isPassword?: boolean,
}

export const Input = ({id, title, register, error, isPassword = false}: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center gap-3 border-b border-gray-100 py-3">
                <label htmlFor={id} className="min-w-[60px] font-semibold text-gray-600">
                    {title}
                </label>
                <input id={id} {...register} className="bg-gray-100 text-gray-800 border border-1 border-gray-200 p-1 rounded" type={isPassword ? "password" : "text"}/>
            </div>
            {error && <span className="text-red-600">{error}</span>}
        </div>
    )
}
