import { BACKEND } from "@/config";

export async function getDataByPost(data: object, path: string) {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${BACKEND}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function getData(path: string) {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${BACKEND}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
