import React from "react";

const ButtonWhite = ({label, onClick, className = '' , IconComponent}) => {
    const baseClasses = `
        bg-white 
        hover:bg-zinc-200 
        text-sky-900 
        w-xs
        h-12
        rounded-4xl 
        font-semibold 
        mt-2
        w-xs
        flex flex-row items-center justify-center
    `; 
    return (
        <div className="w-1/4 flex flex-col justify-center items-center mx-3 my-3">
        <button 
                onClick={onClick} 
                className={`${baseClasses} ${className}`}
            >
                {IconComponent && ( 
                    <IconComponent className="text-2xl text-sky-900 mr-2"/>
                )}
                {label}
        </button>
        </div>
    );
};

export default ButtonWhite;