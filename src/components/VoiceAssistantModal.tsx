'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Send, Bot, User, Waves } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { manageStoreWithVoice } from '@/ai/flows/manage-store-with-voice-commands';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export function VoiceAssistantModal({ isOpen, onClose, language }: { isOpen: boolean; onClose: () => void, language: string }) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSendCommand(transcript);
      };
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          toast({
            variant: 'destructive',
            title: 'Microphone Access Denied',
            description: 'Please enable microphone permissions in your browser settings to use the voice assistant.',
          });
        }
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }
  }, [toast]);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        try {
          recognitionRef.current.start();
        } catch(e) {
            console.error(e);
            if (!isListening) {
                recognitionRef.current.stop();
            }
        }
      }
    } else {
        toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: "Sorry, your browser doesn't support speech recognition.",
        });
    }
  };

  const handleSendCommand = async (command: string) => {
    if (!command.trim() || isLoading) return;

    const userMessage: Message = { text: command, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const lang = language.charAt(0).toUpperCase() + language.slice(1);
      const result = await manageStoreWithVoice({ 
          voiceCommand: command,
          language: lang as 'English' | 'Hindi' | 'Kannada'
      });
      const botMessage: Message = { text: result.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
        let errorMessageText = "Sorry, I couldn't understand that. Please try again.";
        if (error.message && error.message.includes('503')) {
            errorMessageText = "The service is temporarily unavailable. Please try again later.";
        }
        const errorMessage: Message = { text: errorMessageText, sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
        console.error("Error with voice command:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const suggestionChips = [
    "List my products",
    "How many orders do I have?",
    "I have 20 new pots"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="font-headline text-lg font-semibold">Voice Assistant</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X />
            </Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
             {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full">
                <Mic className="h-16 w-16 mb-4"/>
                <p>Tap the mic to start speaking</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                <Card className={msg.sender === 'user' ? 'bg-primary text-primary-foreground' : ''}>
                  <CardContent className="p-3">
                    <p>{msg.text}</p>
                  </CardContent>
                </Card>
                {msg.sender === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                  <Bot className="h-6 w-6 text-primary flex-shrink-0 animate-pulse" />
                  <Card><CardContent className="p-3">Karminetra is thinking...</CardContent></Card>
              </div>
            )}
          </div>
          
           {isListening && (
            <div className="flex items-center justify-center p-4">
                <Waves className="h-8 w-8 text-primary animate-pulse" />
                <p className="ml-2 text-muted-foreground">Listening...</p>
            </div>
          )}


          <div className="space-y-3 border-t p-4">
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map(chip => (
                <Badge key={chip} variant="outline" className="cursor-pointer" onClick={() => handleSendCommand(chip)}>
                  {chip}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Type or speak your command..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendCommand(inputValue)}
                disabled={isLoading || isListening}
              />
               <Button 
                size="icon" 
                onClick={handleMicClick} 
                disabled={isLoading}
                className={cn(isListening && 'bg-destructive hover:bg-destructive/90')}
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button size="icon" onClick={() => handleSendCommand(inputValue)} disabled={isLoading || isListening}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
