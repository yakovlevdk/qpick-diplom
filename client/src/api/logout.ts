
export const Logout = async () => {
    return await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include",
      });
  } 
  