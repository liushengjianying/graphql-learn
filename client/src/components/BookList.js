import React from 'react'
import BookDetails from './BookDetails'
import { graphql } from 'react-apollo'
import { getBooksQuery } from "../queries/queries";

class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }

    getId = (e) => {
        console.log(e.target.id);
        this.setState({
            selected: e.target.id
        })
    };

    displayBooks() {
        let data = this.props.data;
        if (data.loading) {
            return (<div>Loading books...</div>)
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} id={book.id} onClick={this.getId}>{book.name}</li>
                )
            })
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected}/>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)