function authService() {
  async function login(
    credentials: { email?: string; password?: string } | undefined
  ): Promise<Response> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return response;
  }

  async function register(formData: FormData): Promise<Response> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    return response;
  }

  async function refresh(token: string): Promise<Response> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
    });

    return response;
  }

  async function logout(token: string): Promise<Response> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
    });

    return response;
  }

  async function requestPasswordReset(formData: FormData): Promise<Response> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/forgot-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
  };
}

export default authService;
