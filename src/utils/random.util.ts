export const getRandomNumber = (a: number, b: number): number => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};
