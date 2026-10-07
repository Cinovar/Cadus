const GenderEnum = {
  Masculino     : "MASCULINO",
  Feminino      : "FEMININO",
  OUTRO         : "OUTRO",
  NAO_INFORMADO : "NAO_INFORMADO"
} as  const;


export type GenderEnum = typeof GenderEnum[keyof typeof GenderEnum];
