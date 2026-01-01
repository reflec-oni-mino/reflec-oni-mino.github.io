import { Theme, Typography } from '@mui/material';
import React from 'react';
import { formatMMSS } from './common';

type TimerProp = {
    time: number,
    theme: Theme,
    solved: boolean
}

const Timer = ({ time, theme, solved }: TimerProp): JSX.Element => {
    return (
        <Typography
            id={"timer"}
            variant={"h3"}
            sx={{
                width: theme.spacing(12),
                height: theme.spacing(5),
                paddingTop: theme.spacing(0.85),
                margin: `${theme.spacing(3)} auto 0 auto`,
                textAlign: "center",
                borderRadius: "4px 4px 0 0",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: solved ? "#ffffff" : "#d9dde0",
                borderBottomWidth: "0",
                "@media screen and (max-width:704px)": {
                    marginTop: theme.spacing(1)
                }
            }}
        >
            {formatMMSS(time)}
        </Typography>
    );
};

export default React.memo(Timer);