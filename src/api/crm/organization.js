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
    disableOrganization: async (data) => {
      return axiosInstance.post("/organization/disable-tenant", data);
    },
    deleteOrganization: async (id) => {
      return axiosInstance.delete(`/organization/delete-tenant/${id}`);
    },
  };
};

export default organizationApi;
