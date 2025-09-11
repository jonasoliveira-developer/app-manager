import { RegisterOptions, UseFormRegister } from "react-hook-form";

export interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    disabled?:boolean
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
    
}

export function Input({name, type, placeholder, disabled, register, rules, error}: InputProps) {


    return (
          <>
              < input
                className="w-full border-2 outline-defaultDarkGreen rounded h-11 px-2" 
                id={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...register(name,rules)}

             />
             {error && <p className="text-red-500 my-1">{error}</p>}
          </>
    )
}