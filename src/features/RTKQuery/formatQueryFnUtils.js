export const formatQueryFnResponse = async (apiCall) => {

  try {
    const data = await apiCall(); // ✅ `apiCall` は関数として実行される
    return { data };
  } catch (error) {
    console.error("error in queryFn", error);
    throw  error ;
  }
};
