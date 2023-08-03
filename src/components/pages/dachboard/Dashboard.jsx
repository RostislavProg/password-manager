import '../../../styles/Dashboard.css';

import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrent, saveUnits } from '../../../redux/actions/actions';
import Units from './components/Units';
import AddForm from './components/AddForm';
import ChangeForm from './components/ChangeForm';


const Dashboard = () => {

    useEffect(() => {
        if (localStorage.getItem('currentAccount') === null || localStorage.getItem('currentAccount') === "null") {
            navigate('/');
        }else{
            dispatch(changeCurrent());
            dispatch(changeCurrent());
        }
    }, []);

    const accounts = useSelector(state => state.accountsReducer.accounts); 
    const currentAccount = useSelector(state => state.accountsReducer.currentAccount); 
    const currentUnits = useSelector(state => state.changeUnitsReducer.units); 
    const changeState = useSelector(state => state.addOrChangeReducer.changeState);
    const [name, setName] = useState("");

    useEffect(()=>{
        setName(accounts[currentAccount].name)
    },[currentAccount])

    useEffect(() => {
        if (currentUnits.length > 0) {
            dispatch(saveUnits(currentUnits));
        }
    }, [currentUnits]);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogOut = () => {
        localStorage.setItem('currentAccount', JSON.stringify(null));
        navigate('/');
    }

    return (
        <section className='dashBoard'>
            <Row>
                <Units />
                <Col md={4}>
                    <div className="logOut">
                    <span>{name}</span>
                    <Button onClick={handleLogOut}>log out</Button>
                    </div>
                    {changeState ? <ChangeForm/> : <AddForm />}
                </Col>
            </Row>
        </section>
    );
  }
  
export default Dashboard;