import './Dashboard.css';

import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import Units from './components/Units/Units.tsx';
import AddForm from './components/AddForm/AddForm.tsx';
import Logout from './components/Logout/Logout.tsx';
import EditForm from './components/EditForm/EditForm.tsx';
import ModeSwitch from './components/ModeSwitch/ModeSwitch.tsx';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const jsonUserID = JSON.parse(localStorage.getItem('userId'));
    const { editMode } = useSelector((state: RootState) => state.edit);

    useEffect(() => {
        if (jsonUserID === null || jsonUserID === "") {
            navigate('/');
        }
    }, []);

    return (
        <section className='dashBoard'>
            {!(jsonUserID === null || jsonUserID === "") ? (
                <Row>
                    <Units />
                    <Col md={4}>
                        <Logout />
                        {editMode ? <EditForm /> : <AddForm />}
                        <ModeSwitch />
                    </Col>
                </Row>
            ) : null}
        </section>
    );
}

export default Dashboard;