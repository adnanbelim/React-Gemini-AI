import React, { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    // State Variables
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResults(true);

        let response = prompt !== undefined ? await run(prompt) : await run(input);
        response = response || ""; // Fallback to empty string

        setRecentPrompt(prompt || input);
        setPrevPrompts(prev => [...prev, input]);

        // Write logic for (**) to bold words
        let responseArray = response.split("**");
        let newResponse = ""; // Initialize as an empty string
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        // Single star (*) convert to <br/>
        let newResponse2 = newResponse.split("*").join("</br>");

        // Loop for delayed text
        let newResponse3 = newResponse2.split(" ");
        for (let i = 0; i < newResponse3.length; i++) {
            const nextWord = newResponse3[i];
            delayPara(i, nextWord + " ");
        }

        setResultData(newResponse2); // Set the final formatted response
        setLoading(false);
        setInput("");
    };

    const contextValues = {
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResults,
        loading,
        resultData,
        newChat,
    };

    return (
        <Context.Provider value={contextValues}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
