import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../CSS/ProfileCSS.module.css';

export default function Profile({isAuth, setAlert, setUserData, userData}) {

    const [name, setName]= useState(userData.userName)
    const [email, setEmail]= useState(userData.userEmail)
    const [age, setAge]= useState(userData.userAge)
    const [gender, setGender]= useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuth){
            navigate('/login');
        }
    }, [isAuth, navigate])

    const handleName=(event) =>{
        setName(event.target.value)
    }

    const handleEmail=(event) =>{
        setEmail(event.target.value)
    }

    const handleAge=(event) =>{
        setAge(event.target.value)
    }

    const handleGender=(event) =>{
        setGender(event.target.value)
    }

    const update = async()=>{
        setLoading(true);

        const updateApi=`https://aatmagyan-1.herokuapp.com/users/updateUser/${userData._id}`;
  
        const jsonData={
            "userName": name,
            "userAge":age,
            "userEmail":email,
            "isMale": true
        };
    
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
        };

        try{
            const authData = await fetch(updateApi, requestOptions);
            let jsonAuthData = await authData.json();
            console.log(jsonAuthData);
            localStorage.setItem("userData", JSON.stringify(jsonAuthData));
            setUserData(JSON.stringify(jsonAuthData));
            navigate('/');
        }catch(e){
            setAlert("Failed to update", "danger");
            console.log(e);
        }
        
        setLoading(false);
    }

    
  return (
    <div className={`container-fluid ${styles.container}`}>
        <div className="row row-cols-1 row-cols-lg-2">

            <div className={`col offset-lg-0 col-lg-4 mt-4 mb-4 ${styles.box1}`}>
                <div className="card text-center container" style={{"width": "15rem"}}>
                    <img src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" className="card-img-top rounded-circle rounded m-auto d-block" alt="..." style={{"height": "7rem", "width": "7rem"}}/>
                    <div className="card-body">
                        <Link to='/'><p className="fs-6 text-decoration-underline">Change picture</p></Link>
                        <p className="card-title h4 fw-semibold">{userData.userName}</p>
                        <p className='text-secondary small fw-light'>Joined in 2022</p>
                    </div>
                </div>
            </div>

            <div className={`col offset-lg-0 col-lg-7 mt-4 mb-5 ${styles.box2}`}>
                <div className="row g-3 mx-auto row-cols-lg-2">
                    <div className="col-lg-8">
                        <label htmlFor="validationCustom01" className="form-label">Name</label>
                        <input type="text" value={name} onChange={handleName} className="form-control" id="validationCustom01" required/>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="validationCustom02" className="form-label">Email</label>
                        <input type="text" value={email} onChange={handleEmail} className="form-control" id="validationCustom02" required/>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="validationCustom04" className="form-label">Age</label>
                        <input type="text" value={age} onChange={handleAge} className="form-control" id="validationCustom04" required/>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="validationCustom05" className="form-label">Select Gender</label>
                        <select className="form-select"  defaultValue={gender} onChange={handleGender} id="validationCustom05" required>
                        <option value={""} disabled={true}>Choose...</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Other"}>Other</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" disabled={loading} onClick={update}>Save</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
