import React from "react";

const ButtonWhite = ({label, onClick, className = '' }) => {
    const baseClasses = `
        bg-white 
        hover:bg-zinc-200 
        text-sky-900 
        h-12 w-64 
        rounded-4xl 
        text-2xl 
        font-semibold 
        mt-2
    `; 
    return (
        <div className="flex flex-col justify-center items-center">
        <button 
                onClick={onClick} 
                className={`${baseClasses} ${className}`}
            >
                {label}
        </button>
        </div>
    );
};

export default ButtonWhite;