import { useState } from "react";
import OpenAI from 'openai';

export default  function ChatAgent(){
    const [message,setMessage] =  useState("")
    const [loading,setLoading] =  useState(false)

    async function getMessage(){
        setLoading(true);
        console.log(message);
                                        
        const token = process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? '';
        console.log('token :: ',token);
        const client = new OpenAI();
        client.apiKey = token;

        const response = await client.responses.create({
            model: "gpt-4.1",
            input: "Write a one-sentence bedtime story about a unicorn."
        }); 
        setLoading(false);
        setMessage('')
        setMessage(response.output_text);
    }
    return (
        <div className="container py-2">
            <div className="bg-white shadow-md rounded">
                <div className="bg-primary text-white rounded p-3">
                    <h5 className="mb-0">Chat</h5>
                </div>
                <div className="card-body" style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex justify-content-start">
                            <div className="bg-light rounded p-3">
                                <p className="mb-0">Hi there! How can I help you today?</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="bg-primary text-white rounded p-3">
                                <p className="mb-0">Hello! I have a question.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex align-items-center"> 
                    <div className="input-group" style={{height:50}}>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type your message..."
                            readOnly = {loading}
                            value={message}
                            onChange={(v)=>setMessage(v.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (message.length >3) {
                                        getMessage()
                                    }
                                }
                            }}                            
                        />
                    </div>
                    {loading ? <span className="ms-2 spinner-border" /> : <></>}
                    
                </div>
            </div>
        </div>
    );
}