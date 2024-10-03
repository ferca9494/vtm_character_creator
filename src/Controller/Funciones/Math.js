export const porcentual = (data) => (data * 100).toFixed(2);

export const distribución_binomial = (k, n, p) =>
  combinatorio(n, k) * potencia(p, k) * potencia(1 - p, n - k);

export const combinatorio = (n, k) =>
  factorial(n) / (factorial(k) * factorial(n - k));

export const factorial = (n) => {
  if (n == 0) return 1;

  return factorial(n - 1) * n;
};

export const potencia = (b, p) => {
  let result = 1;
  for (let i = 0; i < p; i++) {
    result *= b;
  }
  return result;
};
