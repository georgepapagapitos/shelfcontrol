import { Card, IconButton, TextField, Typography } from '@material-ui/core';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

function Scanner({isbn, setIsbn, setIsbnInput}) {

  const handleScan = (event) => {
   setIsbn((event.currentTarget.value).replace(/\D/g, ''));
   setIsbnInput(true);
  }

  return (
    <center>
    <Typography gutterBottom variant="h4" align="center">
      Scan ISBN or enter manually
    </Typography>
    <Card>
      <BarcodeScannerComponent
          width="100%"
          height={250}
          onUpdate={(err, result) => {
            if(result) {
              console.log('result', result)
              setIsbn(result.text);
            }
          }}
      />
    </Card>
      <TextField placeholder="ISBN" value={isbn} onChange={handleScan}></TextField>
    </center>

  )
}

export default Scanner;