
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. How can I help you today? You can ask me about symptoms, conditions, or general health questions.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simulated AI responses based on keywords (would be replaced with actual AI backend)
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('headache')) {
      return "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or more serious conditions. If you're experiencing frequent headaches, consider tracking when they occur and what might be triggering them. Drink plenty of water, try to manage stress, and ensure you're getting adequate sleep. If headaches are severe, sudden, or accompanied by other symptoms like fever or stiff neck, you should seek medical attention.";
    } else if (input.includes('fever') || input.includes('temperature')) {
      return "Fever is often a sign that your body is fighting an infection. For adults, a temperature above 100.4°F (38°C) is generally considered a fever. Rest, stay hydrated, and you can take over-the-counter fever reducers if needed. If the fever persists for more than a few days, is very high (above 103°F or 39.4°C), or is accompanied by severe symptoms, please consult a healthcare provider.";
    } else if (input.includes('cough')) {
      return "Coughs can be caused by various conditions including common cold, allergies, asthma, or more serious respiratory infections. For a dry cough, staying hydrated and using cough drops may help. For a productive cough (with mucus), proper hydration is important to help clear the airways. If your cough persists for more than a few weeks, is severe, or you're coughing up blood, please seek medical attention.";
    } else if (input.includes('pain')) {
      return "I notice you mentioned pain. To provide better guidance, could you provide more details about the location, intensity, and duration of the pain? Also, are there any activities or movements that worsen or improve it?";
    } else if (input.includes('diabetes')) {
      return "Diabetes is a chronic condition that affects how your body processes blood sugar. Common symptoms include increased thirst, frequent urination, fatigue, and blurred vision. If you're concerned about diabetes, I recommend checking your risk factors and speaking with a healthcare provider who can order appropriate tests. Our diabetes prediction tool can also help assess your risk based on various factors.";
    } else if (input.includes('heart') || input.includes('cardiac')) {
      return "Heart health is crucial. Common heart-related symptoms include chest pain, shortness of breath, palpitations, and fatigue. If you're experiencing chest pain or pressure, especially if it radiates to your arm, jaw, or back, seek emergency medical attention immediately as it could be a sign of a heart attack. Our heart disease prediction tool can help assess your risk based on various factors.";
    } else if (input.includes('thank')) {
      return "You're welcome! I'm here to help with any health questions or concerns you may have. Remember, while I can provide general information, I'm not a substitute for professional medical advice.";
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you with your health questions today?";
    } else {
      return "Thank you for your message. To provide the most helpful information, could you please provide more specific details about your health concern or question? I'm here to help with information about symptoms, conditions, or general health advice.";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Health Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Chat with our AI to get information about symptoms, conditions, or general health advice.
        </p>
      </div>
      
      <Card className="border-none shadow-lg">
        <div className="h-[600px] flex flex-col">
          <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full health-gradient flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Health AI Assistant</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Available 24/7</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-health-primary text-white rounded-t-lg rounded-bl-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-t-lg rounded-br-lg'
                    } p-3`}
                  >
                    {message.sender === 'bot' && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-2 flex-shrink-0">
                        <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-2">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                placeholder="Type your health question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || input.trim() === ''} className="bg-health-primary">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Note: This is a demo AI. In a real application, this would connect to an advanced medical AI model.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
