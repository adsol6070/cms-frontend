import axios from "axios";

const axiosInstances = {
  CRM: axios.create({
    baseURL: process.env.VITE_CRM_BASE_URL,
  }),
};

export default axiosInstances;
