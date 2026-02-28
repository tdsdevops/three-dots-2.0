import axios from "axios";

const getAxiosInstance = () => {
  const getAxios = axios.create({
    baseURL: "https://zfjafyfqhpjhvdufvsbp.supabase.co/functions/v1/",
  });

  return getAxios;
};
const useAxios = () => {
  const useAxiosData = getAxiosInstance();
  return useAxiosData;
};

export default useAxios;
