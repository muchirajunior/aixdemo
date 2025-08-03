import OpenAI from "openai";
import { OPENAI_API_KEY, SAP_COOKIE, SAP_SERVICE_LAYER_URL} from "../config";

export async function myagent(message:String) :  Promise<{
    data : String,
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
            tools:[
                {
                    type: 'function',
                    function: {
                        name: 'fetchData',
                        description: 'Fetch data from SAP Service later',
                        parameters: {
                            type: 'object',
                            properties: {
                                routeQuery: {
                                    type: 'string',
                                    description: 'The route query path to fetch data from SAP'
                                }
                            },
                            required: ['routeQuery']
                        },
                    }
                }
            ]
         }); 
         
         return {
            data: response.choices[0].message.content ?? '',
            error: null
        };
    } catch (error : any) {
        return {
            data: '',
            error: error.toString()
        };
    }
    
}

export async function fetchData(routeQuery: string) : Promise<any>{
    try {
        console.log(routeQuery);
        
        const response =  await fetch(
            `${SAP_SERVICE_LAYER_URL}${routeQuery}`,{
                headers:{
                    'Cookie':SAP_COOKIE
                }
            }
        )
        return response.json();
    } catch (error) {
        return {error: error}
    }
}
