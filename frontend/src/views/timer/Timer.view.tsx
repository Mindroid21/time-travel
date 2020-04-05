import React, { FunctionComponent, useState, useContext, useEffect, useCallback } from 'react';
// custom
import EmptyTimer from './sections/empty/EmptyTimer';
import AddNewTimer from './sections/create-update/add/AddNewTimer';
import { TimerContextProvider } from './context/TimerContext';
import { HeaderStateContext } from './../../components/header/context/HeaderContext';
import { CircularLoader } from './../../components/loaders/circular-loader/CircularLoader';
import { getAllTimers } from './../../common/async/AsyncCalls';
import { getLocalStorageItem } from './../../common/helper/LocalStorageProvider';
import { NOTIFICATION_TYPE, SnackbarHelper } from '../../common/context/SnackbarHelper';
import { TimerList } from './sections/list/TimerList';

const TimerView: FunctionComponent = () => {
    const [content, setContent] = useState<JSX.Element>(<CircularLoader display={true}/>);
    const headerContext = useContext(HeaderStateContext);
    // states
    const [ msg, setMsg] = useState('');
    const [ noticeType, setNoticeType] = useState<NOTIFICATION_TYPE>(NOTIFICATION_TYPE.ERROR);

    // life-cycle methods
    const loadTimerList = useCallback(() => {
        const token: string = getLocalStorageItem('token'); 
        getAllTimers(token)
        .then((res: any)=>{
            setNoticeType(NOTIFICATION_TYPE.SUCCESS);
            console.log('loaded timer ', res.data);
            if (res.data && res.data.length > 0) {
                setMsg(`Loaded Timers - ${res.data.length}`);
                setContent(<TimerList data={res.data}/>);
            } else {
                setContent(<EmptyTimer/>);
            }
            
        })
        .catch ((err: any)=>{
            setMsg('Error loading timers');
        });
    },[]);
    // side-effects
    useEffect(()=>{
        if (headerContext.timerPanelState === 0) {
            loadTimerList();
        } else if (headerContext.timerPanelState === 1) {
            setContent (
                <TimerContextProvider>
                    <AddNewTimer/>
                </TimerContextProvider>
            );
        }
    },[loadTimerList, headerContext]);
    
    return (
        <React.Fragment>
            <SnackbarHelper type={noticeType} message={msg}/>
                {content}
        </React.Fragment>
    );
};

export default TimerView;