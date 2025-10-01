import React from "react";

const ButtonWhite = ({label, onclick}) => {
    const baseClasses = "bg-white hover:bg-zinc-200 text-sky-900 h-12 w-65 rounded-4xl text-2xl font-semibold mt-5 {className}" 
    return (
        <div className="flex flex-col justify-center items-center">
        <button onclick={onclick} className={baseClasses}>
            {label}
        </button>
        </div>
    );
};

export default ButtonWhite;