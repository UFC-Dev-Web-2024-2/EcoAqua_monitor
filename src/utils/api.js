import axios from "axios";
import { differenceInMinutes, differenceInHours } from "date-fns";

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
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("sensorIdGet", user.sensor);
  console.log("jwt", jwt);
  try {
    const response = await api.get("/sensors", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        filters: {
          sensorId: {
            $eq: user.sensor, // Substitua 123 pelo ID desejado
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
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("sensorId", user.sensor);
  try {
    const response = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: {
        filters: {
          sensorId: {
            $eq: user.sensor, // Substitua 123 pelo ID desejado
          },
        },
        sort: ["createdAt:desc"],
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

    localStorage.setItem("user", JSON.stringify(res.data.user));
    //localStorage.setItem("role", res.data.role.name);
    localStorage.setItem("token", jwt);
    console.log("Login efetuado com sucesso!");

    console.log("Redirecionando para a página inicial...");
    getReadingTime();
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error; // Para capturar o erro onde a função for chamada
  }
}

async function getUser() {
  const jwt = localStorage.getItem("token");
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
async function getReadingTime() {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await api.get("/reading-timers", {
    params: {
      filters: {
        sensorId: {
          $eq: user.sensor, // Substitua 123 pelo ID desejado
        },
      },
    },
  });
  console.log("Res:", res.data);
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...user,
      sensorTime: res.data.data[0].sensorTimer,
      aeratorTime: res.data.data[0].aeratorTimer,
      idTimer: res.data.data[0].id,
    })
  );
}

async function updateUserSensorId({ sensor }) {
  const jwt = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await api.put(
    `/users/${user.id}`,
    { sensor },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}

export async function updateAeratorSensorTime(aerator, sensorTimer) {
  const jwt = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("aerator", aerator);
  console.log("sensorTimer", sensorTimer);
  const data = {
    data: {
      aeratorTimer: aerator,
      sensorTimer: sensorTimer,
    },
  };
  const res = await api.put(`/reading-timers/${user.idTimer}`, {
    body: data,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  console.log("Res:", res.data);
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...user,
      sensorTime: res.data.sensorTimer,
      aeratorTime: res.data.aeratorTimer,
    })
  );
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

  const { jwt } = res.data.jwt;
  const { user } = res.data.user;

  console.log("ID:", user.id);
  console.log("jwt ID:", jwt);
  setTimeout(() => {
    res = updateUserSensorId({ jwt, id: user.id, sensor: sensorId });
  }, 1000);

  console.log(res.data);

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", jwt);
}

export async function googleLogin() {
  console.log("Google");
  const res = await api.get("/connect/google");
  console.log(res.data);
  console.log("Google");
}
export function dateTime(createdAt) {
  const notificationDateTime = new Date(createdAt);
  const now = new Date();
  const diffMinutes = differenceInMinutes(now, notificationDateTime);
  const diffHours = differenceInHours(now, notificationDateTime);

  if (diffMinutes < 60) {
    return `Há ${diffMinutes} minutos`;
  } else {
    return `Há ${diffHours} horas`;
  }
}
