// components/ChatBot.tsx
import React, { useEffect, useRef, useState } from "react";
import ChatBotIcon from "./ChatBotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import Sidebar2 from "../../cryptowallet2/SideBar2";

// Tipovi
export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface ChatFormProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  generateBotResponse: (history: ChatMessage[]) => Promise<void>;
}

export interface ChatMessageProps {
  chat: ChatMessage;
}

// Tip za Gemini API response
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

const ChatBot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Ispravka: dodaj tip za HTMLDivElement
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (history: ChatMessage[]): Promise<void> => {
    // Dodaj "Thinking..." poruku
    // setChatHistory(prev => [...prev, { role: "model", text: "Thinking..." }]);

    // Funkcija za ažuriranje istorije
    const updateHistory = (text: string): void => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."), 
        { role: "model", text }
      ]);
    };

    try {
      // Formatiranje istorije chata za Gemini API
      const formattedHistory = history.map(({ role, text }) => ({
        role,
        parts: [{ text }]
      }));

      const requestOptions: RequestInit = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          contents: formattedHistory 
        })
      };

      // API poziv
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "API error occurred");
      }

      // Proveri da li postoji odgovor
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error("Invalid response format from API");
      }

      // Izvuci tekst odgovora
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")  // Uklanjanje markdown bold (**text**)
        .trim();
      
      updateHistory(apiResponseText);

    } catch (error) {
      console.error("Error generating bot response:", error);
      
      // Prikaži error poruku korisniku
      const errorMessage = error instanceof Error 
        ? `Greška: ${error.message}` 
        : "Došlo je do neočekivane greške. Molimo pokušajte ponovo.";
      
      updateHistory(errorMessage);
    }
  };

  // Ispravka: dodaj null check i ispravi sintaksu
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div>
        <Sidebar2 /> 
      </div>
      
      <div className="relative w-[420px] overflow-hidden bg-white rounded-2xl shadow-none">
        {/* Chat Header */}
        <div className="flex px-6 py-4 items-center justify-between bg-indigo-600">
          <div className="flex gap-3 items-center">
            <ChatBotIcon />
            <h2 className="text-white text-xl font-semibold">Chatbot</h2>
          </div>
          <button
            type="button"
            className="h-10 w-10 border-none outline-none text-white cursor-pointer text-3xl pt-0.5 -mr-2 bg-transparent transition-all duration-200 hover:bg-indigo-700 rounded"
            onClick={() => console.log('Close chatbot')}
          >
            ↓
          </button>
        </div>

        {/* Chat Body */}
        <div ref={chatBodyRef} className="flex flex-col gap-5 flex-1  h-[600px] overflow-y-auto px-6 py-6  scrollbar-thin scrollbar-thumb-purple-200">
          <div className="flex gap-3 items-center">
            <ChatBotIcon />
            <p className="px-4 py-3 max-w-3/4 break-words whitespace-pre-line text-sm bg-purple-50 rounded-xl rounded-bl-sm">
              Hey there! <br /> How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat Footer */}
        <div className="absolute bottom-0 w-full bg-white px-6 py-4 pb-5">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;