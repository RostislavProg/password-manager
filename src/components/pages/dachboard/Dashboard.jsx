import './Dashboard.css';
import { useEffect } from "react";

import { Row, Col } from 'react-bootstrap';
import Units from './components/Units/Units';
import AddForm from './components/AddForm/AddForm';
import Logout from './components/Logout/Logout';
import EditForm from './components/EditForm/EditForm';
import ModeSwitch from './components/ModeSwitch/ModeSwitch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Dashboard = () => {

    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const { editMode } = useSelector((state) => state.edit)

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/")
        }
    }, [])

    return (
        <section className='dashBoard'>
            {isAuthenticated ? (
                <Row>
                    <Units />
                    <Col md={4}>
                        <Logout />
                        {editMode ? <EditForm/> : <AddForm />}
                        <ModeSwitch />
                    </Col>
                </Row>
                ) : null}
        </section>
    );
  }
  
export default Dashboard;