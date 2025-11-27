import React from "react";

const Box = ({ label, onClick, className = '', IconComponent }) => {
    const baseClasses = `
        bg-white 
        hover:bg-zinc-200 
        text-sky-950 rounded-2xl 
        font-semibold 
        overflow-hidden
        flex flex-col items-center justify-center 
        w-80 h-72
        py-10
        px-2
        border-1 border-sky-900
    `; 
    
    return (
        <div className="w-1/3 flex flex-col justify-center items-center mx-3">
            <button 
                onClick={onClick} 
                className={`${baseClasses} ${className}`}
            >
                {IconComponent && ( 
                    <IconComponent className="text-6xl text-sky-900 mb-4 mt-4"/>
                )}
                <span className="text-center">{label}</span> 
            </button>
        </div>
    );
};

export default Box;