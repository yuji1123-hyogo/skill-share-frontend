export const formatQueryFnResponse = async (apiCall) => {

  try {
    const data = await apiCall(); 
    return { data };
  } catch (error) {
    console.error("error in queryFn", error);
    throw  error ;
  }
};
