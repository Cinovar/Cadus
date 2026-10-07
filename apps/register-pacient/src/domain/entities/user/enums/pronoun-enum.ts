const PronounEnum = {
  Ele   : "ELE/DELE",
  Ela   : "ELA/DELA",
  Elu   : "ELU/DELU",
  OUTRO : "OUTRO",
} as const;

export type PronounEnum = typeof PronounEnum[keyof typeof PronounEnum];