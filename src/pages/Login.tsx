import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Login successful", description: "Welcome back" });
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      toast({ title: "Login failed", description: err?.message || String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-md shadow-sm">
        <h2 className="text-2xl font-serif gold-text mb-4">Sign in</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-sm"
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="gold-gradient text-primary-foreground px-4 py-2 rounded-sm"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <a href="/register" className="text-sm text-primary underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
