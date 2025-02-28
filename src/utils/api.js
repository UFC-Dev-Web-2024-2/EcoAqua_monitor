import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json", // Garante que enviamos JSON
    Accept: "application/json", // Garante que aceitamos JSON na resposta
  },
});

export async function getSensor() {
  const jwt = localStorage.getItem("token");
  const sensorId = localStorage.getItem("sensorId");
  console.log("sensorId", sensorId);
  try {
    const response = await api.get("/sensors", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        filters: {
          sensorId: {
            $eq: sensorId, // Substitua 123 pelo ID desejado
          },
        },
      },
    });
    console.log("Sensores:", response.data.data[response.data.data.length - 1]);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar sensores:", error);
    throw error; // Para capturar o erro onde a função for chamada
  }
}
export async function getNotification() {
  const jwt = localStorage.getItem("token");
  const sensorId = localStorage.getItem("sensorId");
  console.log("sensorId", sensorId);
  try {
    const response = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        filters: {
          sensorId: {
            $eq: sensorId, // Substitua 123 pelo ID desejado
          },
        },
      },
    });
    console.log("notifications:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar sensores:", error);
    throw error; // Para capturar o erro onde a função for chamada
  }
}

export async function login({ email, password }) {
  try {
    const res = await api.post("/auth/local", {
      identifier: email,
      password: password,
    });
    const { jwt } = res.data;

    // const user = await getUser({ jwt });

    console.log(res.data);
    console.log("JWT:", jwt);
    const user = res.data.user;

    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.id);
    localStorage.setItem("sensorId", user.sensor);
    //localStorage.setItem("role", res.data.role.name);
    localStorage.setItem("token", jwt);
    console.log("Login efetuado com sucesso!");

    console.log("Redirecionando para a página inicial...");
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error; // Para capturar o erro onde a função for chamada
  }
}

async function getUser({ jwt }) {
  const res = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      populate: "*",
    },
  });
  return res.data;
}

async function updateUserSensorId({ jwt, id, sensor }) {
  const res = await api.put(
    `/users/${id}`,
    { sensor },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}

export async function register({ email, password, username, sensorId }) {
  let res = null;
  try {
    res = await api.post("/auth/local/register", {
      username: username,
      email: email,
      password: password,
    });
    console.log("Res:", res);
    console.log("Res.data:", res.data);
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error; // Para capturar o erro onde a função for chamada
  }

  const { jwt } = res.data;
  const { id } = res.data.user;

  console.log("ID:", id);
  console.log("jwt ID:", jwt);
  setTimeout(() => {
    res = updateUserSensorId({ jwt, id, sensor: sensorId });
  }, 1000);

  // res = await updateUserSensorId({ jwt, id, sensor: sensorId });
  // console.log("Res:", res);
  // console.log("Res.data:", res.data);

  console.log(res.data);

  localStorage.setItem("username", res.data.username);
  localStorage.setItem("sensorId", res.data.sensor);
  //localStorage.setItem("role", res.data.role.name);
  localStorage.setItem("token", jwt);
  console.log("Login efetuado com sucesso!");

  console.log("Redirecionando para a página inicial...");
}

export async function googleLogin() {
  console.log("Google");
  const res = await api.get("/connect/google");
  console.log(res.data);
  console.log("Google");
}

// export function handleLogout() {
//   localStorage.removeItem("authToken"); // Remove o token de autenticação
//   navigate("/login"); // Redireciona para login
// }
