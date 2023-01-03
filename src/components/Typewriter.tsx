import React, { useState } from "react";

export const Typewriter = ({ messages, interval = 50, cursor = '▪' }: { messages: string[], interval: number, cursor: string }) => {
    const [message, setMessage] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    React.useEffect(() => {
        if (currentIndex === messages.length) {
            setCurrentIndex(0);
            setCurrentWordIndex(0);
            setMessage('');
            return;
        }

        const intervalId = setInterval(() => {
            const words = messages?.[currentIndex]?.split(' ');
            if (currentWordIndex === words?.length) {
                clearInterval(intervalId);
                if (currentIndex === messages.length - 1) {
                    return;
                }
                setTimeout(() => setCurrentIndex(currentIndex + 1), 1000);
                return;
            }

            setMessage((prevMessage) => prevMessage + words?.[currentWordIndex] + ' ');
            setCurrentWordIndex(currentWordIndex + 1);
        }, interval);

        return () => clearInterval(intervalId);
    }, [currentIndex, currentWordIndex, messages, interval]);

    return (
        <div className="text-base  antialiased tracking-wide ">
            {message}
            <span className="cursor">|</span>
        </div>
    );
};
