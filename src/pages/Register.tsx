import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiUrl, getJsonHeaders, readApiError } from "@/lib/api";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: getJsonHeaders(),
        body: JSON.stringify({ fullName: name, name, email, password, phone: "9999999999" }),
      });

      if (!res.ok) throw new Error(await readApiError(res, "Registration failed"));

      const payload = await res.json();

      toast({ title: "Registration successful", description: payload?.message || "You can now log in." });
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({ title: "Registration failed", description: err?.message || String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-md shadow-sm">
        <h2 className="text-2xl font-serif gold-text mb-4">Create account</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-background border border-border text-foreground rounded-sm"
          />
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
            <button disabled={loading} type="submit" className="gold-gradient text-primary-foreground px-4 py-2 rounded-sm">
              {loading ? "Creating..." : "Create account"}
            </button>
            <a href="/login" className="text-sm text-primary underline">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
