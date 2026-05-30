export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLogin = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    errors.email = "Email é obrigatório";
  } else if (!validateEmail(email)) {
    errors.email = "Email inválido";
  }

  if (!password.trim()) {
    errors.password = "Senha é obrigatória";
  } else if (!validatePassword(password)) {
    errors.password = "Senha deve ter no mínimo 6 caracteres";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validatePatientRegistration = (data: {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (!data.nome?.trim()) {
    errors.nome = "Nome é obrigatório";
  }

  if (!data.cpf?.trim()) {
    errors.cpf = "CPF é obrigatório";
  } else if (data.cpf.replace(/\D/g, "").length !== 11) {
    errors.cpf = "CPF deve ter 11 dígitos";
  }

  if (!data.email?.trim()) {
    errors.email = "Email é obrigatório";
  } else if (!validateEmail(data.email)) {
    errors.email = "Email inválido";
  }

  if (!data.telefone?.trim()) {
    errors.telefone = "Telefone é obrigatório";
  } else if (data.telefone.replace(/\D/g, "").length < 10) {
    errors.telefone = "Telefone inválido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
