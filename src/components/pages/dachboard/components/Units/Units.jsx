import { useSelector } from 'react-redux';
import SingleUnit from '../SingleUnit/SingleUnit';
import { Col } from 'react-bootstrap';

import './Units.css';
import { useGetUser } from '../../../../../hooks/useGetUser';


const Units = () => {

    const {userContent} = useGetUser();
    const { editMode } = useSelector((state) => state.edit)

    return (
        <Col md={8}>
            <div className="units">
                {Object.keys(userContent).length > 0 ? userContent.map(res => {
                    const service = res.service;
                    const log = res.log;
                    const pass = res.pass;
                    const id = res.id;
                    return <SingleUnit key={id} service={service} log={log} pass={pass} id={id} editMode={editMode}/>;
                }) : null}
            </div>
        </Col>
    );
}
  
export default Units;