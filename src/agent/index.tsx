import { useState } from "react"

export default function AgentChat (){
    const [message,setMessage] = useState("Hello how can i assist you")
    const [input,setInput] = useState("")

    async function submit(){
        setMessage(input);
        setInput('')
    }

    return  (
        <div className="container">
            <div className="w-100"  style={{ height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
                <h1 className="">Agent Mode</h1>
                <hr />
                <div className="w-100 bg-primary text-white rounded shadow p-2 mb-3 ">{message} </div>

            </div>
            <div className="d-flex" style={{height:50}}>
                <input type="text" value={input} onChange={(v)=>setInput(v.currentTarget.value)} className="form-control" placeholder="Type your message" />
                <button type="submit" className="btn btn-primary" onClick={submit}>Send</button>
            </div>
        </div>
    )
}