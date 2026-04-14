import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function App(){

const [topic,setTopic]=useState("")
const [minutes,setMinutes]=useState("")
const [result,setResult]=useState("")
const [score,setScore]=useState(0)
const [loading,setLoading]=useState(false)
const [history,setHistory]=useState([])

const [activeTab,setActiveTab]=useState("analyze")

const [todo,setTodo]=useState("")
const [todoList,setTodoList]=useState(()=>JSON.parse(localStorage.getItem("todoList"))||[])

const [weekPlan,setWeekPlan]=useState("")
const [weekList,setWeekList]=useState(()=>JSON.parse(localStorage.getItem("weekList"))||[])

const [journal,setJournal]=useState("")
const [journalEntries,setJournalEntries]=useState(()=>JSON.parse(localStorage.getItem("journalEntries"))||[])

const [mode,setMode]=useState("dark")
const [timer,setTimer]=useState(1500) // 25 min
const [running,setRunning]=useState(false)
const [streak,setStreak]=useState(0)
useEffect(()=>{

let interval

if(running){

interval=setInterval(()=>{

setTimer(prev=>{

if(prev<=0){

setRunning(false)
setStreak(s=>s+1)
return 1500
}

return prev-1
})

},1000)

}

return ()=>clearInterval(interval)

},[running])
useEffect(()=>{
localStorage.setItem("todoList",JSON.stringify(todoList))
},[todoList])

useEffect(()=>{
localStorage.setItem("weekList",JSON.stringify(weekList))
},[weekList])

useEffect(()=>{
localStorage.setItem("journalEntries",JSON.stringify(journalEntries))
},[journalEntries])


const analyzeStudy = async () => {

setLoading(true)

const response = await fetch(
"https://oycpak45zw3mv7yjhlk4qmgoja0ecouf.lambda-url.eu-north-1.on.aws/",
{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ topic, minutes })
}
)

const data = await response.json()

setResult(data.message)

const extractedScore=parseInt(data.message.match(/\d+/)[0])
setScore(extractedScore*10)

setHistory([{topic,minutes},...history.slice(0,2)])

setLoading(false)
}


const addTodo=()=>{
if(todo==="")return
setTodoList([...todoList,todo])
setTodo("")
}

const addWeek=()=>{
if(weekPlan==="")return
setWeekList([...weekList,weekPlan])
setWeekPlan("")
}

const addJournal=()=>{
if(journal==="")return
setJournalEntries([{text:journal,date:new Date().toLocaleDateString()},...journalEntries])
setJournal("")
}


return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#141e30,#243b55)",
fontFamily:"Poppins, sans-serif",
color:"white"
}}>

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
style={{
background:"rgba(0,0,0,0.55)",
padding:"40px",
borderRadius:"18px",
width:"380px",
backdropFilter:"blur(14px)"
}}
>

<div style={{textAlign:"center"}}>
<h1>💻 FocusPing</h1>
<p style={{opacity:0.7,fontSize:"13px"}}>Focus smarter • Study calmer</p>
</div>


{/* Tabs */}
<div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>

<button onClick={()=>setMode(mode==="dark"?"light":"dark")}>
🌗 Theme
</button>

<button onClick={()=>setRunning(!running)}>
{running ? "Pause Timer" : "Start Timer"}
</button>

</div>

<p style={{textAlign:"center"}}>
⏳ {Math.floor(timer/60)}:{String(timer%60).padStart(2,"0")}
</p>

<p style={{textAlign:"center"}}>
🔥 Streak: {streak}
</p>

<div style={{
display:"flex",
justifyContent:"space-between",
marginTop:"18px"
}}>

<button onClick={()=>setActiveTab("analyze")}>🧠</button>
<button onClick={()=>setActiveTab("todo")}>✅</button>
<button onClick={()=>setActiveTab("week")}>📅</button>
<button onClick={()=>setActiveTab("journal")}>📓</button>

</div>


{/* ANALYZE */}

{activeTab==="analyze" &&(

<div>

<input
placeholder="Study Topic"
value={topic}
onChange={(e)=>setTopic(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"20px"}}
/>

<input
placeholder="Minutes Studied"
value={minutes}
onChange={(e)=>setMinutes(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"10px"}}
/>

<button
onClick={analyzeStudy}
style={{marginTop:"12px",width:"100%",padding:"10px"}}
>
{loading ? "Analyzing..." : "Analyze Study"}
</button>


{result &&(
<>
<p style={{marginTop:"18px"}}>{result}</p>

<div style={{background:"#333",height:"8px",borderRadius:"6px"}}>
<motion.div
animate={{width:score+"%"}}
style={{height:"8px",background:"#4ade80"}}
/>
</div>
</>
)}


{history.length>0 &&(

<div style={{marginTop:"20px"}}>
<h3>Recent Sessions</h3>

{history.map((h,i)=>(
<p key={i}>{h.topic} • {h.minutes} min</p>
))}

</div>

)}

</div>
)}



{/* TODO */}

{activeTab==="todo" &&(

<div>

<input
placeholder="New Task"
value={todo}
onChange={(e)=>setTodo(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"20px"}}
/>

<button
onClick={addTodo}
style={{marginTop:"10px",width:"100%",padding:"10px"}}
>
Add Task
</button>

<div style={{marginTop:"15px"}}>

{todoList.map((t,i)=>(
<p key={i}>• {t}</p>
))}

</div>

</div>

)}



{/* WEEKLY */}

{activeTab==="week" &&(

<div>

<input
placeholder="Weekly Goal"
value={weekPlan}
onChange={(e)=>setWeekPlan(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"20px"}}
/>

<button
onClick={addWeek}
style={{marginTop:"10px",width:"100%",padding:"10px"}}
>
Add Goal
</button>

<div style={{marginTop:"15px"}}>

{weekList.map((w,i)=>(
<p key={i}>📌 {w}</p>
))}

</div>

</div>

)}



{/* JOURNAL */}

{activeTab==="journal" &&(

<div>

<textarea
placeholder="Write today's study reflection..."
value={journal}
onChange={(e)=>setJournal(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"20px"}}
/>

<button
onClick={addJournal}
style={{marginTop:"10px",width:"100%",padding:"10px"}}
>
Save Entry
</button>

<div style={{marginTop:"15px"}}>

{journalEntries.map((j,i)=>(
<div key={i} style={{marginBottom:"10px"}}>
<p style={{fontSize:"12px",opacity:0.7}}>{j.date}</p>
<p>{j.text}</p>
</div>
))}

</div>

</div>

)}


<p style={{
textAlign:"center",
marginTop:"25px",
fontSize:"12px",
opacity:0.6
}}>
© 2026 FocusPing • Developed by Ananditha ⚡
</p>

</motion.div>

</div>

)

}

export default App