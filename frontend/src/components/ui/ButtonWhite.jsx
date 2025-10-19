import React from "react";

const ButtonWhite = ({ label, onClick, className = '', IconComponent }) => {
    const baseClasses = `
        bg-white hover:bg-zinc-200 text-sky-900
        rounded-2xl font-semibold
        w-xs h-12
        py-2 px-4 text-md
        flex items-center justify-center gap-2
    `;

    return (
        <div className="w-full max-w-xs mx-auto my-2">
            <button onClick={onClick} className={`${baseClasses} ${className}`}>
                {IconComponent && <IconComponent className="text-xl" />}
                {label}
            </button>
        </div>
    );
};

export default ButtonWhite;