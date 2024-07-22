import getAxiosInstance from "../helper/axiosInstanceUtility";

const organizationApi = () => {
  const axiosInstance = getAxiosInstance("CRM");
  return {
    createOrganization: async (data) => {
      return axiosInstance.post("/organization/create", data);
    },
    getAllOrganizations: async () => {
      return axiosInstance.get("/organization/getOrganizations");
    },
    getOrganizationsSuperUsers: async () => {
      return axiosInstance.get("/organization/getSuperusers");
    },
  };
};

export default organizationApi;
