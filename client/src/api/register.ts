type RegisterData = {
    email: string,
    password: string,
  };
  
export const register = async (data: RegisterData) =>  fetch("http://localhost:3000/users/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });