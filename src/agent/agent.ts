import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config";

export async function myagent(message:String) :  Promise<{
    data : String | null,
    error: String | null
}> {
    try {
        const token =  OPENAI_API_KEY; 
         const client = new OpenAI({
             apiKey: token,
             dangerouslyAllowBrowser:true,
         });
 
         const response = await client.chat.completions.create({
             model: "gpt-4.1",
             messages: [
                {
                    role: "system",
                    content: "You are a helpful assitant for SAP workflow. Everying you do goes through SAP Service layer that witll be provided so make sure to utilize it to make querries and provide answers",
                },
                {
                    role: "user",
                    content: message.toString(),
                },
            ],
         }); 
         return {
            data: response.choices[0].message.content,
            error: null
        };
    } catch (error : any) {
        return {
            data: null,
            error: error.toString()
        };
    }
    
}
