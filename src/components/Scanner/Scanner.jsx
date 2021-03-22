import { Paper, TextField, Typography } from '@material-ui/core';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import Swal from 'sweetalert2';

function Scanner({isbn, setIsbn}) {



  return (
    <div className="container">

    <Typography gutterBottom variant="h4" align="center">
      Scan ISBN or enter manually
    </Typography>
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
      <TextField placeholder="ISBN" value={isbn}></TextField>


    </div>

  )
}

export default Scanner;