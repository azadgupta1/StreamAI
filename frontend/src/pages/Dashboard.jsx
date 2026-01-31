import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard(){
    const navigate = useNavigate();

    return(

        <div className="min-h-screen space-y-50">
            <h1 className="flex items-center justify-center text-2xl text-red-600">StreamAI</h1>

            <div className="flex flex-col items-center justify-center space-y-10">

                <button onClick={() => navigate('/start')} className="px-4 py-2 border">
                    Go Live
                </button>   
                

                <button onClick={() => navigate('/view')} className="px-4 py-2 border">
                    Watch Stream
                </button>
            </div>
        </div>
    )
}