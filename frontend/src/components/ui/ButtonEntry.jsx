import React from "react";

const ButtonEntry = ({ label, onClick, className = '' }) => {
    const baseClasses = `
        bg-white hover:bg-zinc-200 text-sky-900
        rounded-2xl font-semibold
        py-3 px-4 text-4xl
        w-full
        h-24
        flex items-center justify-center
    `;

    return (
        <div className="w-full my-2">
            <button onClick={onClick} className={`${baseClasses} ${className}`}>
                {label}
            </button>
        </div>
    );
};

export default ButtonEntry;