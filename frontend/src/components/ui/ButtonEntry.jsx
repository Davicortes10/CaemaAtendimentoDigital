import React from "react";

const ButtonEntry = ({label, onClick}) => {
    const baseClasses = "bg-white hover:bg-zinc-200 text-sky-900 w-sm h-20 rounded-2xl text-2xl font-semibold mt-5" 
    return (
        <div className="flex flex-col justify-center items-center">
        <button onClick={onClick} className={baseClasses}>
            {label}
        </button>
        </div>
    );
};

export default ButtonEntry;