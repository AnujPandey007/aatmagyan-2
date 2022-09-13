import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddQuestion({isAuth}) {
     
    const [question,setQuestion]=useState('')
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    

    useEffect(()=>{
        if(!isAuth){
            navigate('/login');
        }
    },[isAuth,navigate])

    const handleQuestion=(event)=>{
      setQuestion(event.target.value)
    }

    const addQuestionToDb= async()=>{
      if(question.length!==0){
        setLoading(true)
        const questionApi="https://aatmagyan-1.herokuapp.com/questions/addQuestion";

        const jsonData={ 
            "userId": "630f661cf36bb77fa6d19887",
            "questionData": question,
            "likes": 0,
            "isAnswered": false
          }
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
        };
        try{
            const authData = await fetch(questionApi, requestOptions);
            let jsonAuthData = await authData.json();
            console.log(jsonAuthData);
        }
        catch(e){
          console.log(e)  
        }
        setLoading(false)
      }
    }
    
  return (
    <div>
        <div className={`container my-3`}>
            <div className="mb-3">
                <input type="email" value={question} placeholder='Enter Your Question' onChange={handleQuestion} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <button className="btn btn-primary"disabled={loading} onClick={addQuestionToDb}>Submit</button>
        </div>
    </div>
  )
}
