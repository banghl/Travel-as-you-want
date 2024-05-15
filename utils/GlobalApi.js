const axios = require("axios").default;

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
});

const createUser = (data) => axiosClient.post("user", data);
const getUser = () => axiosClient.get("/user");

const createPastTrip = (data) => axiosClient.post("/trip", data);
const getPastTrips = () => axiosClient.get("/trip");

export default {
  createUser,
  getUser,
  createPastTrip,
  getPastTrips,
};
