const fib = (n: number, memo: Record<number, number> = {}): number => {
  if (memo[n]) return memo[n];
  if (n <= 2) return 1;
  const result: number = fib(n - 1, memo) + fib(n - 2, memo);
  memo[n] = result;
  return result;
};
