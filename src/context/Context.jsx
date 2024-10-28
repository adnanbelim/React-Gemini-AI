import React, { createContext, useState } from 'react'
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
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResults(true);
        
        let response;
        if(prompt !== undefined)
        {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }else{
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        // setRecentPrompt(input);
        // setPrevPrompts(prev => [...prev, input]);
        // // this input value pass by Main.jsx input (onChange => setInput)
        // const response = await run(input);

        // write logic for (**) to bold word
        let responseArray = response.split("**");
        let newResponse;
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        // single star (*) convert to <br/>
        let newResponse2 = newResponse.split("*").join("</br>");

        //loop for delay text
        let newResponse3 = newResponse2.split(" ");
        for (let i = 0; i < newResponse3.length; i++) {
            const nextWord = newResponse3[i];
            delayPara(i, nextWord + " ");
        }
        setResultData(newResponse2);
        // after response data loading will be false
        setLoading(false);
        setInput("");
    }

    // onSent("What is React"); //just check api response output


    const contextValues = {
        onSent,
        input, setInput,
        recentPrompt, setRecentPrompt,
        prevPrompts, setPrevPrompts,
        showResults,
        loading,
        resultData,
        newChat,
    }

    return (
        <Context.Provider value={contextValues}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
