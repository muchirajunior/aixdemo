import { useState } from "react"
import { getData } from "./agent";

export default function AgentChat (){
    const [message,setMessage] = useState("Hello how can i assist you")
    const [input,setInput] = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false);
    // const [error,setError] = useState('')

    async function submit(){
        if(input.length>5){
            setLoading(true);
            const res = await getData(input);
            setResponse(res.toString());
            setMessage(input);
            setInput('');
            setLoading(false)
        }
        
    }

    return  (
        <div className="container">
            <div className="w-100"  style={{ height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
                <h1 className="">Agent Mode</h1>
                <hr />
                <div className="bg-primary text-white rounded shadow p-2 mb-3 float-end" style={{maxWidth:400}}>{message} </div>
                <br />
                {/* {
                    error.length > 0 && <div className="alert alert-danger" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                } */}
                <br />
                <div className="card shadow-sm rounded my-2 p-2 w-75  float-start">
                    {response}
                </div>

            </div>
            <div className="d-flex" style={{height:50}}>
                <input type="text" value={input} onChange={(v)=>setInput(v.currentTarget.value)} className="form-control" placeholder="Type your message" />
                {loading ? <span className="spinner-border" /> : <button type="submit" className="btn btn-primary" onClick={submit}>Send</button>}
            </div>
        </div>
    )
}