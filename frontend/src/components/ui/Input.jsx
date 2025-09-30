import React from "react";

const Input = ({label, placeholder, type = "text", value, onChange}) => {
    return(
        <div className="flex flex-col">
            <label className="text-white opacity-63 pb-1">
                {label}
            </label>
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-white h-20 rounded-2xl text-4xl font-semibold pl-4 text-gray-400 focus:ring-2 focus:ring-sky-600 focus:outline-none"
            />
        </div>
    );
};

export default Input;