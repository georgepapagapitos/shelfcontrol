import { Card, TextField, Typography } from '@material-ui/core';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

function Scanner({isbn, setIsbn}) {

  const handleScan = (event) => {
   setIsbn((event.currentTarget.value).replace(/\D/g, ''));
  }

  return (
    <center>
    <Typography component="span" gutterBottom variant="h4" align="center">
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