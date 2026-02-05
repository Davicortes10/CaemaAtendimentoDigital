import { useCallback, useRef } from 'react';

export const useVoiceAnnouncement = () => {
  const isSpeakingRef = useRef(false);

  const announce = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to find a Portuguese voice
    const voices = window.speechSynthesis.getVoices();
    const portugueseVoice = voices.find(
      voice => voice.lang.startsWith('pt') || voice.lang.includes('BR')
    );
    
    if (portugueseVoice) {
      utterance.voice = portugueseVoice;
    }
    
    utterance.onstart = () => {
      isSpeakingRef.current = true;
    };
    
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    
    utterance.onerror = () => {
      isSpeakingRef.current = false;
    };
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const announceTicket = useCallback((ticketNumber: string, boothName: string, customerName: string) => {
    const text = `Senha ${ticketNumber}, ${boothName}. ${customerName}, dirija-se ao ${boothName}.`;
    announce(text);
  }, [announce]);

  return { announce, announceTicket };
};
