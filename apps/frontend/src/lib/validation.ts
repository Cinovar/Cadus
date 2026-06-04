export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== parseInt(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === parseInt(digits[10]);
};

export const validateLogin = (login: string, typeLogin: string, password: string) => {
  const errors: { login?: string; password?: string } = {};

  if (!login.trim()) {
    errors.login = "E-mail ou CPF é obrigatório";
  } else {
    if (typeLogin === "cpf" && !validateCPF(login)) errors.login = "CPF inválido";
    if (typeLogin === "email" && !validateEmail(login)) {
      const possibleCpfRegex = /^[0-9]+(?:\.[0-9]+)?(?:-[0-9]+)?$/;
      // Checa se o usuário colocou só dígitos contendo ou não . ou -
      // Para dar uma mensagem mais esclarecedora ao usuário
      errors.login = `E-mail ${possibleCpfRegex.test(login) ? "ou CPF " : ""}inválido`;
    }
  }

  if (!password.trim()) errors.password = "Senha é obrigatória";

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
