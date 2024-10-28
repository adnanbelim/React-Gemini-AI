// This API take from Google AI studio (just search gemini api)
// const api_key = 'AIzaSyDFMP4Qi9g8_9zHYmy8sYdNVldN64Gaum8';

// This all code available on Google AI Studio (need to some changes like parameter)
// !!! Install dependacies - npm i @google/generative-ai

// change keywork like const => import and require => from

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
}  from "@google/generative-ai";

const apiKey = 'AIzaSyDFMP4Qi9g8_9zHYmy8sYdNVldN64Gaum8';
const genAI = new GoogleGenerativeAI(apiKey); // write here our api constant

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// give here our input  parameter 
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    // Also write here out input parameter
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    // we return out response
    return result.response.text();
}

export default run;