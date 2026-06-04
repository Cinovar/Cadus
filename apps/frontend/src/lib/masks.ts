const regexNomeBR = /[^A-Za-záàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇkKwWyY'\s]/g;

const particulas = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'von', 'van']);

export const sanitizeName = (value: string): string =>
  value.replace(regexNomeBR, '');

export const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const formatCEP = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

export const formatName = (name: string): string =>
  name
    .split(/(\s+)/)
    .map((part, index) => {
      if (!part.trim()) return part;
      if (index > 0 && particulas.has(part.toLowerCase())) {
        return part.toLowerCase();
      }

      const characters = Array.from(part);
      const [first = '', ...rest] = characters;
      return `${first.toLocaleUpperCase('pt-BR')}${rest.join('').toLocaleLowerCase('pt-BR')}`;
    })
    .join('');

export const getFirstName = (name: string): string =>
  formatName((name || '').trim().split(' ')[0]);

export const fetchAddress = async (cep: string) => {
  const digits = cep.replace(/\D/g, '');
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return {
      rua: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      estado: data.uf || '',
    };
  } catch {
    return null;
  }
};