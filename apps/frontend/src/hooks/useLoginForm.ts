import { useState } from "react";
import { validateLogin } from "@/lib/validation";

export const useLoginForm = () => {
  const [login, setLogin] = useState("");
  const [typeLogin, setTypeLogin] = useState<"email" | "cpf">("email");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ login?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLogin(login, typeLogin, password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    console.log("Enviando informações de login ao backend:", { login, password });
  };

  return {
    login,
    setLogin,
    typeLogin,
    setTypeLogin,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
  };
};
