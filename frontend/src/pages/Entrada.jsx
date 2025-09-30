import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Entrada = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic Validacion and Navigation
    if (inputValue.trim() === '') {
        alert("Por favor, preencha sua Matrícula ou CPF.");
    return;
  }
  // Navigate to Loading page
  navigate('/loading'); 
    };

  return (
    <Layout>
      <Logo />
      <h2 className="text-white text-5xl font-semibold pt-1 pb-7">
          Digite sua Matricula ou CPF!
        </h2>

        <form 
          onSubmit={handleSubmit}
          className="w-2xl"> 
          <Input 
            label="Matrícula ou CPF:"
            placeholder= "Ex: 12345678"
            value = {inputValue}
            onChange = {(e) => setInputValue(e.target.value)}
          />
          <Button 
            label={"Avançar"}
            onClick={() => {}}
            type="submit"
          />
        </form>
    </Layout>
  );
};

export default Entrada;