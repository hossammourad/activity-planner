export const addQueryParamToURL = (key: string, value: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(key, value);
  window.location.search = String(urlParams);
};

export const uuidInQueryParam = new URLSearchParams(window.location.search).get("uuid");

export const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export const updateFavoritesInLocalStorage = (favorites: string[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const goToOrigin = () => {
  window.location.href = window.location.origin
}
