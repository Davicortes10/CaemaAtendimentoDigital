import React from 'react';

// Este componente aplica o fundo e o layout principal
const Layout = ({ children }) => {
    // Cores de fundo caema
    const backgroundClass = "[background-image:linear-gradient(to_bottom,#014888_84%,#0F70CE_100%)]";
    
    return (
        <div className={`min-h-screen flex flex-col items-center pt-10 w-full ${backgroundClass}`}>
            
    
            {children}
        </div>
    );
};

export default Layout;