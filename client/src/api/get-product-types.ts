export const getProductTypes = async () =>
    await fetch("http://localhost:3000/types", {
      method: "GET",
      credentials: "include",
    }).then((loadedTypes) => loadedTypes.json());
  