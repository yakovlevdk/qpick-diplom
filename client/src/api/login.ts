export const login  = async (JSONData: string) =>  await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSONData,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });