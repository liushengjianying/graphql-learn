import React from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    displayAuthors = () => {
        let data = this.props.getAuthorQuery;
        console.log(this.props);
        if (data.loading) {
            return (<option>Loading Authors...</option>)
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    };

    changeVal = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({
            [name]: val
        });
    };

    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    };

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm}>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name='name' onChange={this.changeVal}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name='genre' onChange={this.changeVal}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name='authorId' onChange={this.changeVal}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

export default compose(
    // 命名区分this.props中的数据名字
    graphql(getAuthorQuery, { name: "getAuthorQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)