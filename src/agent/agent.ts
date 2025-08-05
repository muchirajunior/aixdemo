import OpenAI from "openai";
import { OPENAI_API_KEY, SAP_COOKIE, SAP_SERVICE_LAYER_URL} from "../config";

export async function myagent(message:String) :  Promise<String> {
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
         
         return response.choices[0].message.content ?? '';
    } catch (error : any) {
        return  error.toString();
    }
    
}

export async function getData(message: String) :  Promise<String>{
    try {
        var query = await myagent(`${message}, Give back only the query string starting with /route?params`);
        if(query.length == 0 || !query.startsWith('/')){return query ?? 'Error fetching query'};
        var data = await fetchData(query);
        var reponse = await myagent(
            `Here is user message ${message}, here is the reponse. ${data.toString()}, i need a nice formatted summary response to show on chat`
        );

        return reponse;

    } catch (error: any) {
        return error .toString();
    }
}

export async function fetchData(routeQuery: String) : Promise<any>{
    try {
        console.log(routeQuery);
        
        const response = await fetch(
            `${SAP_SERVICE_LAYER_URL}${routeQuery}`, {
                headers: {
                    'Cookie': SAP_COOKIE,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors' // Explicitly enable CORS
            }
        ).then((d)=>d.json());
        console.log(response);
        return  response;
    } catch (error) {
        console.log('error fetching data from :: ', error);
        
        return {error: error}
    }
}
