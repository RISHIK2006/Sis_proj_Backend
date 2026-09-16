"use client";

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ChatMessage from "../../components/ChatMessage";
import { apiFetch } from "../../lib/api";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "Hi! I'm RideSync AI. I can help you find rides, estimate fares, and answer questions about the app.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { sender: "user", message: text }]);
    setInput("");
    setLoading(true);

    try {
      const data = await apiFetch("/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: data.response || "No response received." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: err.message || "Sorry, I could not reach the AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout
      title="AI Assistant"
      subtitle="Get smart ride recommendations and instant help."
    >
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <div
            style={{
              minHeight: "400px",
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
              />
            ))}
          </div>

          <hr />

          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ask RideSync AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
