export const getUsers = async () =>
  await fetch("http://localhost:3000/users").then((res) => res.json());
