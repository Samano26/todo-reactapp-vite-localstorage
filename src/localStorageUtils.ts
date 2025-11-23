export const saveData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const getData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return [];
  }
};

export const deleteData = (key: string) => {
  localStorage.removeItem(key);
};
