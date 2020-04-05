import React, { FunctionComponent } from 'react';
// material
import Typography from '@material-ui/core/Typography';
// custom
import SimpleCard from '../../../../components/card/simple/SimpleCard';

const EmptyTimer: FunctionComponent = () => {
    return (
        <SimpleCard>
            <Typography color="textSecondary" align="center">
              Click on <strong>Add New +</strong> to add Timer
            </Typography>
        </SimpleCard>
    );
};

export default EmptyTimer;