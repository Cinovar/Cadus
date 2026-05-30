import { useState } from "react";
import { validateLogin } from "@/lib/validation";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLogin(email, password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    console.log("Login bem-sucedido:", { email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
  };
};
