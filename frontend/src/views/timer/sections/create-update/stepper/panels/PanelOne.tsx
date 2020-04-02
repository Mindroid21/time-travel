import React, { FunctionComponent, useState } from 'react';
// material
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// custom
import { CircularLoader } from './../../../../../../components/loaders/circular-loader/CircularLoader';
import { checkTitleExists } from '../../../../../../common/async/AsyncCalls';
import { getLocalStorageItem } from './../../../../../../common/helper/LocalStorageProvider';
import { NOTIFICATION_TYPE, SnackbarHelper } from '../../../../../../common/context/SnackbarHelper';

export interface IPanelOneData {
    title: string;
    description: string;
}

interface IPanelOneProps extends IPanelOneData {
    onSubmit: (data: IPanelOneData) => void;
}

export const PanelOne: FunctionComponent<IPanelOneProps> = (props): JSX.Element => {
    
    const { title, description, onSubmit } = props;
    // states
    const [timerTitle, setTimerTitle] = useState(title);
    const [timerDescription, setTimerDescription] = useState(description);
    const [isLoading, setLoading] = useState(false);
    const [isTitleButtonDisabled, toggleTitleButtonDisabled] = useState(true);
    const [ errorMsg, setErrorMsg] = useState('');
    const [ noticeType, setNoticeType] = useState<NOTIFICATION_TYPE>(NOTIFICATION_TYPE.ERROR);

    // event handlers
    const handleTimerTitleChange = (evt: any) => {
        if (evt.target.value !=='') {
            setTimerTitle (evt.target.value);
            toggleTitleButtonDisabled (false);
        } else {
            toggleTitleButtonDisabled (true);
        }
    };

    const handleTimerDescriptionChange = (evt: any) => {
        if (evt.target.value !=='') {
            setTimerDescription (evt.target.value);
        }
    };

    const handleNext = () => {
        setLoading(true);
        const token: string = getLocalStorageItem('token');
        checkTitleExists (token, timerTitle)
        .then((res: any) => {
            if (res.data) {
                console.log('Title exists!', res);
                setLoading(false);
                setErrorMsg(`Timer with similar title already exists!`);
            } else {
                console.log('Title does not exists!');
                onSubmit ({title: timerTitle, description: timerDescription});
            }
        })
        .catch((err: any)=> {
            console.log('Error checking title', err);
            onSubmit ({title: timerTitle, description: timerDescription});
        });
    };

    return (
        <React.Fragment>
        <SnackbarHelper type={noticeType} message={errorMsg}/>
        <CircularLoader display={isLoading} />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          required
          id="title"
          label="Enter Title"
          name="title"
          autoFocus
          defaultValue={timerTitle}
          onBlur={handleTimerTitleChange}/>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="description"
          label="Enter Description"
          name="description"
          autoComplete="description"
          autoFocus
          defaultValue={timerDescription}
          onBlur={handleTimerDescriptionChange}/>
            <Grid item xs={12} md={6}>
                <Button
                    disabled={isTitleButtonDisabled}
                    onClick={handleNext}
                    fullWidth
                    variant="contained"
                    color="secondary">
                        Next
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                    disabled={true}
                    fullWidth
                    variant="contained"
                    color="default">
                        Back
                </Button>
            </Grid>
      </React.Fragment>
    );
};