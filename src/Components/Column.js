import React from 'react'
import Task from './Task'
import {Droppable} from 'react-beautiful-dnd';
import {addCard} from "../redux/cards/actions.js";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";


class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newInput: '',
            showInput: false
        }
    }

    //set new card input in state
    onKeyPressHandler = e => {
        this.setState({newInput: e.target.value})
        if (e.key === 'Enter') {
            this.addCardHandler()
        }
    };
    toggleInput = () => {
        this.setState(prevState => ({
            showInput: !prevState.showInput,
            newInput: ''
        }));
    }
    //call addCard action and reset input after adding
    addCardHandler = () => {
        this.props.addCard({
            title: this.state.newInput,
            column: this.props.column.id
        })
        this.setState({newInput: ""});
        this.toggleInput()
    }

    render() {
        return (
            <div className={"column-container"}>
                <h1>{this.props.column.title}</h1>
                <Droppable droppableId={this.props.column.id} type="TASK">
                    {(provided, snapshot) => (
                        <>

                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                // isDraggingOver={snapshot.isDraggingOver}
                            >
                                {this.props.tasks.map((task, index) => {
                                        return (<Task key={task.id} task={task} index={index}/>)
                                    }
                                )}
                                {provided.placeholder}
                            </div>
                            {!this.state.showInput ?
                                //show button to add card
                                <p className={"addCardInput pointer"} onClick={() => {
                                    this.toggleInput()
                                }}>+ Add another card</p>
                                :
                                //show inputs and adding buttons for card
                                <>
                                    <textarea className={"taskInput"}
                                              placeholder={"add new card"}
                                              onKeyPress={this.onKeyPressHandler}
                                              value={this.state.newInput}
                                              onChange={(e) => this.setState({newInput: e.target.value})}

                                    />
                                    <Button variant="success" onClick={() => {
                                        this.addCardHandler()
                                    }}
                                            className={"addCardButton"}>Add card</Button>
                                    <Button className={"addCardButton"} variant="outline-danger"
                                            onClick={() => this.toggleInput()}>close</Button>
                                </>
                            }


                        </>
                    )}
                </Droppable>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        initialState: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCard: (card) => dispatch(addCard(card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Column)