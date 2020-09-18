const LRU = require("lru-cache");
import fetch from "isomorphic-fetch";

const options = {
  max: 500,
  length: function(n, key) {
    return n * 2 + key.length;
  },
  maxAge: 1000 * 60 * 60
};

const cache = LRU(options);

function set(key, value) {
  cache.set(key, value);
}

export async function get({ type = "news", id, name, page = "1" }) {
  const allowed = ["news", "new", "show", "ask", "jobs"];

  if (type === "new") {
    type = "newest";
  }

  if (type === "top") {
    type = "news";
  }

  const endpointBase = `https://node-hnapi.herokuapp.com/`;
  let endpointPath = `${type}?page=${page}`;

  if (id) {
    endpointPath = `item/${id}`;
  } else if (name) {
    endpointPath = `user/${name}`;
  }

  const endpoint = `${endpointBase}${endpointPath}`;

  const storedResponse = cache.get(endpoint);

  if (typeof storedResponse !== "undefined") {
    return storedResponse;
  }

  const res = await fetch(endpoint);
  const json = await res.json();
  set(endpoint, json);

  return json;
}
