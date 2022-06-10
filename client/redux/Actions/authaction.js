export const loginSuccess = (data) => {
  return {
    type: "LOG_IN_SUCCESS",
    data,
  };
};

export const loginFailure = (error) => {
  return {
    type: "LOG_IN_FAILURE",
    error,
  };
};
