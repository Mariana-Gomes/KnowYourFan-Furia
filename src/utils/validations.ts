export const formatCpf = (cpf: string) => {
  const onlyNumbers = cpf.replace(/\D/g, "");

  if (onlyNumbers.length <= 3) {
    return onlyNumbers;
  }

  if (onlyNumbers.length <= 6) {
    return `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}`;
  }

  if (onlyNumbers.length <= 9) {
    return `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(
      3,
      6
    )}.${onlyNumbers.slice(6, 9)}`;
  }

  return `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(
    3,
    6
  )}.${onlyNumbers.slice(6, 9)}-${onlyNumbers.slice(9, 11)}`;
};

export function maskCep(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

export function formatPhone(value: string): string {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length <= 2) {
    return `(${onlyNumbers}`;
  } else if (onlyNumbers.length <= 6) {
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
  } else {
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(
      2,
      7
    )}-${onlyNumbers.slice(7, 11)}`;
  }
}

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i]) * (factor - i);
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcCheckDigit(cpf.substring(0, 9), 10);
  const digit2 = calcCheckDigit(cpf.substring(0, 10), 11);

  return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
}
