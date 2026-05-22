export type MaskType = 'cpf' | 'phone' | 'date' | 'currency';

export function onlyDigits(value: string): string {
  return (value || '').replace(/\D/g, '');
}

export function maskCpf(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 3) {
    return d;
  }
  if (d.length <= 6) {
    return `${d.slice(0, 3)}.${d.slice(3)}`;
  }
  if (d.length <= 9) {
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  }
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function unmaskCpf(value: string): string {
  return onlyDigits(value).slice(0, 11);
}

export function maskPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length === 0) {
    return '';
  }
  if (d.length <= 2) {
    return `(${d}`;
  }
  if (d.length <= 6) {
    return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  }
  if (d.length <= 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function maskDate(value: string): string {
  const d = onlyDigits(value).slice(0, 8);
  if (d.length <= 2) {
    return d;
  }
  if (d.length <= 4) {
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  }
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/** Exibe valor monetário a partir de dígitos (centavos) ou número. */
export function maskCurrencyInput(value: string | number): string {
  if (value == null || value === '') {
    return '';
  }
  if (typeof value === 'number' && !isNaN(value)) {
    return formatCurrencyNumber(value);
  }
  const digits = onlyDigits(String(value));
  if (!digits) {
    return '';
  }
  const num = parseInt(digits, 10) / 100;
  return formatCurrencyNumber(num);
}

export function parseCurrency(value: string): number {
  const digits = onlyDigits(value);
  if (!digits) {
    return null;
  }
  return parseInt(digits, 10) / 100;
}

export function formatCurrencyNumber(value: number): string {
  if (value == null || isNaN(value)) {
    return '';
  }
  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
