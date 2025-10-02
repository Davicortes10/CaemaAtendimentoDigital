import React from "react";

const Box = ({ label, onClick, className = '', IconComponent }) => {
    
    const baseClasses = `
        bg-white 
        hover:bg-zinc-200 
        text-sky-950 
        w-64 h-64 
        rounded-2xl 
        text-2xl 
        font-semibold 
        mt-2
        flex flex-col items-center justify-center 
    `; 
    
    return (
        <div className="flex flex-col justify-center items-center">
            <button 
                onClick={onClick} 
                className={`${baseClasses} ${className}`}
            >
                {IconComponent && ( 
                    <IconComponent className="text-8xl text-sky-900 mb-4 mt-4"/>
                )}
                <span className="text-center">{label}</span> 
            </button>
        </div>
    );
};

export default Box;