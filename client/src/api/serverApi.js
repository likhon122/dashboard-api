// export const backendDomain = "https://profit-link.onrender.com";
export const backendDomain = "http://localhost:5000";
const ServerApi = {
  signUp: {
    url: `${backendDomain}/user/register`,
    method: "post"
  },
  verifyOtp: {
    url: `${backendDomain}/user/verify`,
    method: "post"
  },
  resendCode: {
    url: `${backendDomain}/user/resend-code`,
    method: "post"
  },
  forgotPassword: {
    url: `${backendDomain}/user/forgot-password`,
    method: "post"
  },
  resetPassword: {
    url: `${backendDomain}/user/reset-password`,
    method: "post"
  },
  login: {
    url: `${backendDomain}/auth/login`,
    method: "post"
  },
  verifyUser: {
    url: `${backendDomain}/auth/verify-user`,
    method: "get"
  },
  makeWithdrawal: {
    url: `${backendDomain}/withdraw`,
    method: "post"
  },
  getWithdrawalsDetails: {
    url: `${backendDomain}/admin/get-withdrawals`,
    method: "post"
  },
  addAdmin: {
    url: `${backendDomain}/admin/change-admin`,
    method: "post"
  },
  logout: {
    url: `${backendDomain}/auth/log-out`,
    method: "get"
  },
  priceLocus: {
    url: `${backendDomain}/price/LOCUS`,
    method: "get"
  },
  priceCRETA: {
    url: `${backendDomain}/price/CRETA`,
    method: "get"
  }
};

export default ServerApi;
