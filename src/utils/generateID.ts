export const generateID = (prefix: string, lastID: string | null): string => {
  let nextNumber: number = 1;

  if (lastID && lastID.startsWith(prefix)) {
    const numericPart: number = parseInt(lastID.slice(prefix.length), 10);
    if (!isNaN(numericPart)) {
      nextNumber = numericPart + 1;
    }
  }

  const paddedNumber: string = String(nextNumber).padStart(3, '0');
  return `${prefix}${paddedNumber}`;
};
