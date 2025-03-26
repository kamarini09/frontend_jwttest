import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [method, setMethod] = useState("localStorage");
  const [token, setToken] = useState("");

  const login = async () => {
    if (method === "cookie") {
      localStorage.removeItem("jwt");
      setToken("Stored in HTTP-only cookie");
    }

    try {
      const res = await axios.post(`http://localhost:3000/auth/login?method=${method}`, {}, { withCredentials: true });

      if (method === "localStorage") {
        localStorage.setItem("jwt", res.data.token);
        setToken(res.data.token);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setToken("Login failed");
    }
  };

  const testAuth = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/protected", {}, { withCredentials: true });
      alert(res.data);
    } catch (err) {
      alert("❌ Unauthorized");
    }
  };

  const logout = async () => {
    localStorage.removeItem("jwt");
    await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
    alert("Logged out");
    setToken("");
  };

  return (
    <div>
      <h2>Login</h2>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="localStorage">localStorage</option>
        <option value="cookie">HTTP-only Cookie</option>
      </select>
      <button onClick={login}>Login</button>
      <button onClick={testAuth}>Test Protected Route</button>
      <button onClick={logout}>Logout</button>
      <p>
        <strong>JWT:</strong> {token}
      </p>
    </div>
  );
}
