import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { useHistory } from "react-router";
import Swal from 'sweetalert2';
import { Button, Divider, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  button: {
    marginTop: 10
  },
  empty: {
      marginTop: 40,
      marginBottom: 40,
      maxWidth: 350,
      paddingTop: 25,
      paddingBottom: 25
    }
})

function CartView() {

  const cart = useSelector((store) => store.cart);

  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const date = moment().format();

  useEffect(() => {
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    })
  }, [])

  const handleRemove = (book) => {
    console.log('remove book from cart', book);
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {bookId: book.id}
    });
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: {isbn: book.isbn}
    });
  }

  const handleCheckout = (cart) => {
    console.log('in handlecheckout', cart, date);
    if(cart.length > 0) {
      Swal.fire({
        title: 'Are you ready to checkout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#f50057',
        confirmButtonText: 'Yes, checkout!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: 'CHECKOUT',
            payload: {
              cart: cart,
              date: date
            }
          })
          Swal.fire({
            title: 'Order complete!',
            confirmButtonColor: '#3f51b5',
            text: 'Your books will on their way soon!',
            icon: 'success'
          })
          history.push('/user');
        }
      })
    } else {
      Swal.fire(
        'Your cart is empty',
      )
    }
  }

  return (
    cart.length > 0 ?
    <div>
      <Typography gutterBottom variant="h3">Current Cart</Typography>
      <Divider />
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((book, i) => {
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {book.title}
                  </TableCell>
                  <TableCell align="left">
                    {book.author}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="secondary"  onClick={() => handleRemove(book)}><ClearIcon /></IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <Button className={classes.button} type="button" variant="outlined" color="primary" onClick={() => handleCheckout(cart)}>Checkout</Button>
      </div>
    </div>
    : <center><Typography className={classes.empty} variant="h4">Your Cart Is Empty!</Typography><Button color="secondary" variant="outlined" onClick={history.goBack}>Back</Button></center>
  )
}

export default CartView