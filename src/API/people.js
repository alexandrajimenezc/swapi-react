export async function getPeople(page) {
  try {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    if (!res.ok) {
      throw new NetworkError();
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCharacter(id = 1) {
  try {
    const res = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!res.ok) {
      throw new NetworkError();
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export async function searchCharacter(name) {
  try {
    const res = await fetch(`https://swapi.dev/api/people/?search=${name}`);
    if (!res.ok) {
      throw new NetworkError();
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

class NetworkError extends Error {
  constructor() {
    super("Network Error");
  }
}
