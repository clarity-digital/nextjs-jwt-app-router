import fetchClient from "@/lib/fetch-client";

function authService() {
  async function login(
    credentials: { email?: string; password?: string } | undefined
  ): Promise<Response> {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/login",
      body: JSON.stringify(credentials),
    });

    return response;
  }

  async function register(formData: FormData): Promise<Response> {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/register",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    return response;
  }

  async function refresh(token: string): Promise<Response> {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/refresh",
      token: token,
    });

    return response;
  }

  async function logout(token: string): Promise<Response> {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/logout",
      token: token,
    });

    return response;
  }

  async function requestPasswordReset(formData: FormData): Promise<Response> {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/forgot-password",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    return response;
  }

  async function passwordReset(formData: FormData): Promise<Response> {
    const response = await fetchClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/reset-password",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    return response;
  }

  async function changePassword(formData: FormData): Promise<Response> {
    const response = await fetchClient({
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/change-password",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    return response;
  }

  return {
    login,
    register,
    refresh,
    logout,
    requestPasswordReset,
    passwordReset,
    changePassword,
  };
}

export default authService;
