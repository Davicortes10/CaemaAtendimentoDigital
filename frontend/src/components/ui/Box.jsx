import React from "react";

const Box = ({ label, onClick, className = '' }) => {
    
    const baseClasses = `
        bg-white 
        hover:bg-zinc-200 
        text-sky-950 
        w-64 h-64 
        rounded-2xl 
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

export default Box;