export const getProgress = (): number => {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("progress")) || 0;
};

export const setProgress = (step: number) => {
  localStorage.setItem("progress", step.toString());
};
