import { Button, Paper, Typography } from "@material-ui/core";

function AddBookInfo(props) {
  return (
    <div className="container">
      <Paper>
        <img src={props.bookCoverImage}></img>
        <Button variant="contained" color="primary">Confirm</Button>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="subtitle">{props.author}</Typography>
      </Paper>
    </div>
  )
}

export default AddBookInfo
