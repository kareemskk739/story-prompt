import { useState,useEffect } from 'react'
import './App.css'
import { AiFillLike,AiTwotoneDislike,AiOutlineLike ,AiOutlineDislike} from "react-icons/ai";
import Login from './Login';
import { useAuth0 } from "@auth0/auth0-react";
import { BallTriangle } from  'react-loader-spinner'



function App() {
  const { user, isAuthenticated,logout} = useAuth0();
   const[prompt,setPrompt]=useState("")
   const[h3,setH3]=useState("")
   const[text,setText]=useState("")
   const[like,setLike]=useState(false)
   const[disLike,setDisLike]=useState(false)
   const [loading,setLoading]=useState(false)
   async function getDetails(){
    setLoading(true)
    const response=await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": prompt}],
      "temperature": 0.7
    })
    })
    const data = await response.json();
  
    if (data.choices && data.choices.length>0){
    setLoading(false)
    setText(data.choices[0].message.content)
    }
    else{
      setText("An error occured please try again.....")
    }
   }
   
   const createButton=()=>{
      
   }
   const handleSubmit=(e)=>{
    setText("")
    e.preventDefault()
    getDetails()
    setH3(prompt)
    setPrompt("")
   
   }
  
  

  return (
    <div >
       {!isAuthenticated&&<div style={{fontFamily:"sans-serif"}}>
         Welcome to story generator app please login/Signup to continue
         <Login/>
      </div>}
     
    
   
    {isAuthenticated?<div className='home'>
      <h3>Welcome {user.name}</h3>  
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
      <h1>Story generator from ai through Story Prompt </h1>
     <form onSubmit={handleSubmit} className='my-form'>
     <textarea placeholder='enter a story prompt to generate from ai' onChange={e=>setPrompt(e.target.value)} value={prompt} >
     </textarea>  
     <button type='submit'>submit</button>
     </form>
     {loading&&<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>}
     
     <div className="story" >
        {text?<h4>Story Generated for "{h3}" Prompt</h4>:null}
        <p style={{fontFamily:"serif"}}>{text}</p>
        <div className="likes">
        {text?<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"200px "}}>

        {like?<AiFillLike onClick={()=>{setLike(!like)}}/>:<AiOutlineLike onClick={()=>{setLike(!like)
         alert("you upvoted this story")}} />}
        <p>upvote</p>
        {disLike?<AiTwotoneDislike onClick={()=>setDisLike(!disLike)}/>:<AiOutlineDislike onClick={()=>{setDisLike(!disLike)
        alert("you disliked this story")}}/>}
        <p>dislike</p>
      
        </div >
        :null}
        </div>
     </div>
      </div>:null}
    </div>
  )
}

export default App
