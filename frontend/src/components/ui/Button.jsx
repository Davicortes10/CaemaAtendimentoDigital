import React from "react";

const Button = ({label, onclick}) => {
    const baseClasses = "bg-lime-500 hover:bg-lime-600 text-sky-900 w-sm h-20 rounded-2xl text-4xl font-semibold mt-5" 
    return (
        <div className="flex flex-col justify-center items-center">
        <button onclick={onclick} className={baseClasses}>
            {label}
        </button>
        </div>
    );
};

export default Button;