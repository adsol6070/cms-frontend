import axiosInstances from "./axiosInstance";

const getAxiosInstance = (product) => {
  return axiosInstances[product];
};

export default getAxiosInstance;
