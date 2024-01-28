import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {StarIconDefaults} from './svg';

const CardHeader = (props) => {
  const {backgroundColor, backgroundImage, title, ...rest} = props;

  return (
    <Box
      {...rest}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      pl="30px"
      pr="30px"
      style={{
        display: "flex",
        backgroundImage: "url('img/blank-border-sm.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        backgroundColor,
        aspectRatio: "3/1",
      }}
    >
      <Typography variant="h3" style={{fontWeight: 'bold'}}>
        {title}
      </Typography>
    </Box>
  );
};

export default CardHeader;
