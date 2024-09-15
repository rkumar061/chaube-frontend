import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigator = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // localStorage.setItem("token", "1234");
    fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);

          // window.location.href = "/admin/dashboard";
          //   navigator("/admin/dashboard");
          if (data.role === "admin") {
            navigator("/admin/dashboard");
          } else if (data.role === "user") {
            navigator("/agent/dashboard");
          }
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // window.location.href = "/admin/dashboard";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      navigator("/admin/dashboard");
    }
    if (token && role === "user") {
      navigator("/agent/dashboard");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full mt-1"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
