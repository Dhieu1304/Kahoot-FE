const LOCAL_STORAGE = {
   ACCESS_TOKEN: "ACCESS_TOKEN",
   REFRESH_TOKEN: "REFRESH_TOKEN"
};

const setItem = (name, value) => {
   localStorage.setItem(name, value);
};

const getItem = (name) => {
   return localStorage.getItem(name);
};

const removeItem = (name) => {
   localStorage.removeItem(name);
};

export { LOCAL_STORAGE, setItem, getItem, removeItem };
