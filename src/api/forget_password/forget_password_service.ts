const ForgetPasswordtService = async (payload: { client_id: string; email_address: string }) => {
  const { client_id, email_address } = payload;
  try {
    console.log("ForgetPasswordtService called with:", client_id, email_address);
    return { success: true, message: "Link send successful", data: null };
  } catch (error) {
    return {
      success: false,
      message: `CRM List Unsuccessful ${error}`,
      data: null,
    };
  }
};

export default ForgetPasswordtService;
