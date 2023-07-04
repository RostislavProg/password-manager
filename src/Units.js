import { Col } from 'react-bootstrap';
import SingleUnit from './SingleUnit';
import { useEffect } from 'react';
import { createUnits } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Units = () => {

    const dispatch = useDispatch();
    const accountUnits = useSelector(state => state.accountsReducer.currentUnits)
    const units = useSelector(state => state.changeUnitsReducer.units)
    const currentUnits = useSelector(state => state.accountsReducer.currentUnits)

    
    useEffect(() => {
        dispatch(createUnits(accountUnits));
    }, [currentUnits])
    

    return (
        <Col md={8}>
            <div className="units">
                {units.map(res => {
                    const unitName = res.unitName;
                    const unitLogin = res.unitLogin;
                    const unitPassword = res.unitPassword;
                    return <SingleUnit key={unitName} unitName={unitName} unitLogin={unitLogin} unitPassword={unitPassword} />;
                })}
            </div>
        </Col>
    );
}
  
export default Units;