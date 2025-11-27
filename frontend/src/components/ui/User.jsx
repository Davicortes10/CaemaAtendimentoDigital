import React from "react";
import ButtonWhite from "./ButtonWhite";
import { FaUser } from "react-icons/fa";

const User = () => {
    return (
        <div className='w-full max-w-5xl mx-auto flex flex-col items-center px-2'>
          <h3 className='w-full text-white text-2xl font-semibold'>
            <ButtonWhite
              className='text-2xl'
              IconComponent={FaUser}
              label={'Olá, Usuario!'}
            />
          </h3>
        </div>
    );
}

export default User