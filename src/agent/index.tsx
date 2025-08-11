import { useState } from "react"
import { getData , loginToSAP} from "./agent";

export default function AgentChat (){
    const [message,setMessage] = useState("Hello how can i assist you")
    const [input,setInput] = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false);

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

   const handleLogin = async () => {
    try {
        setLoading(true)
        await loginToSAP();
        setLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

    return  (
        <div className="container">
            <div className="w-100"  style={{ height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
                <div className="d-flex align-items-center">
                   <span className="flex-fill fs-2" > Agent Mode</span>

                    {loading ? <span className="spinner-border"></span> : <button className="btn btn-primary" onClick={()=>handleLogin()}>Login to SAP</button>} 
                 </div>
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