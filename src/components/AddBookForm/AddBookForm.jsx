import { Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';


function AddBookForm() {
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
  }

  return (
    <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            variant="outlined"
            label="Author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <div>
            <Button type="submit" variant="contained" size="large" color="primary">
              Submit
            </Button>
          </div>
    </form>
  )
}

export default AddBookForm
