import React from "react";

const ButtonWhite = ({label, onclick}) => {
    const baseClasses = "bg-white text-sky-900 w-3xs h-10 rounded-2xl text-4xl font-semibold mt-5" 
    return (
        <div className="flex flex-col justify-center items-center">
        <button onclick={onclick} className={baseClasses}>
            {label}
        </button>
        </div>
    );
};

export default ButtonWhite;