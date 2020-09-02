import api from "./api";

export async function LogIn(email: String, passwd: String) {
  const response = await api.get("/user-login", {
    params: {
      email,
      passwd,
    },
  });

  return response.data;
}
