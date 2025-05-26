// components/ChatForm.tsx
import React, { useRef, FormEvent, useState } from 'react';
import { ChatFormProps } from './ChatBot';

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!inputRef.current) return;
    
    const userMessage = inputRef.current.value.trim();
    
    if (!userMessage) return;
    
    inputRef.current.value = "";
    setHasValue(false);
    
    // Dodaj korisničku poruku
    const newChatHistory = [...chatHistory, { role: "user" as const, text: userMessage }];
    setChatHistory(newChatHistory);
    
    // Dodaj "Thinking..." poruku
    setTimeout(() => {
      setChatHistory(history => [...history, { role: "model" as const, text: 'Thinking...' }]);
      generateBotResponse(newChatHistory);
    }, 100);
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      setHasValue(inputRef.current.value.trim() !== '');
    }
  };

  return (
    <form 
      className="flex items-center bg-white outline  outline-gray-300 shadow-sm focus-within:outline-2 focus-within:outline-indigo-600"
      onSubmit={handleSubmitForm}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask me something"
        className="border-none outline-none bg-transparent h-12 px-4 text-sm flex-1"
        onChange={handleInputChange}
        required
      />
      <button 
        type="submit" 
        className={`h-9 w-9 border-none outline-none cursor-pointer mr-1.5 text-white flex-shrink-0 text-lg rounded-full bg-indigo-600 transition-all duration-200 hover:bg-indigo-700 ${
          hasValue ? 'block' : 'hidden'
        }`}
      >
        →
      </button>
    </form>
  );
};

export default ChatForm;