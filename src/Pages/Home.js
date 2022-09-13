import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../CSS/HomeCSS.module.css'

export default function Home({isAuth}) {
  const [questions, setQuestions] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if(!isAuth){
      navigate('/login');
    }
    const getQuestions = async()=>{
        let questionsApi = `https://aatmagyan-1.herokuapp.com/questions/getQuestions`;
        let questionsData = await fetch(questionsApi);
        let jsonQuestionsData = await questionsData.json();
        setQuestions(jsonQuestionsData);
    }
    getQuestions()
    
  }, [isAuth, navigate])

  return (
    <>
      {(questions.length===0 && 
          <div className='text-center'>
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}


      {questions.map((e)=>{
          return (<div key={e._id}>
            <div className={styles.fab}><Link type="button" to="/addQuestion" className="btn btn-light">Add Question</Link></div>
            {e.questionData}
          </div>)
      })}
    </>
  )

  
}
