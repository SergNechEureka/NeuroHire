import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL as string;

interface LoginFormProps {
  onLogin: (token: string) => void;
}

export function useLoginForm({ onLogin }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);

            const response = await axios.post(
                `${API_URL}auth/jwt/login`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const { access_token } = response.data;
            if (access_token) {
                localStorage.setItem("access_token", access_token);
                onLogin(access_token);
            } else {
                setError("No access token returned");
            }
        } catch (e: any) {
                setError(e.response?.data?.detail || "Login failed");
        } finally {
        setLoading(false);
        }
    };
    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        loading,
        handleSubmit
    };
}