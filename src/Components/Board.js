import React from 'react'
import {connect} from "react-redux";
import "../styles/boardStyle.scss"
import {DragDropContext} from 'react-beautiful-dnd'
import Column from './Column'
import {addCard} from "../redux/cards/actions";
import {addColumn} from "../redux/cards/actions";
import {Button} from "react-bootstrap";


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.initialState.tasks,
            columns: props.initialState.columns,
            columnOrder: props.initialState.columnOrder,
            newInput: '',
            showInput: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            tasks: nextProps.initialState.tasks,
            columns: nextProps.initialState.columns,
            columnOrder: nextProps.initialState.columnOrder,
        })
    }


    onDragEnd = result => {
        const {destination, source, draggableId} = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = this.state.columns[source.droppableId]
        const finish = this.state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState)
            return
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        this.setState(newState)
    }

    //set column input in state
    onKeyPressHandler = e => {
        this.setState({newInput: e.target.value})
        // check if enter Enter button to call addcolumn handler
        if (e.key === 'Enter') {
            this.addColumnHandler()
        }
    };

    //method to show and hide new column input
    toggleInput = () => {
        this.setState(prevState => ({
            showInput: !prevState.showInput,
            newInput: ''
        }));

    }

    //call addcoulmn action and reset input after adding
    addColumnHandler = () => {
        this.props.addColumn(this.state.newInput)
        this.setState({newInput: ""});
        this.toggleInput()
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={"board"}>
                    {
                        //map column depend of array of column order
                        this.props.initialState.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId]
                            const tasks = column.taskIds.map(
                                taskId => this.state.tasks[taskId]
                            )

                            return (
                                <Column key={column.id} column={column} tasks={tasks}/>
                            )
                        })}

                    {/* column for add new column*/}
                    <div className={"column-container"}>
                        {!this.state.showInput
                            ? <p className={"addCardInput pointer"}
                                 onClick={() => {
                                     this.toggleInput()
                                 }}
                            >
                                + Add another card
                            </p> :
                            <>
                            <textarea className={"taskInput"}
                                      placeholder={"add new Column"}
                                      onKeyPress={this.onKeyPressHandler}
                                      value={this.state.newInput}
                                      onChange={(e) => this.setState({newInput: e.target.value})}

                            />
                                <Button variant="success" onClick={() => {
                                    this.addColumnHandler()
                                }}
                                        className={"addCardButton"}>Add Column</Button>
                                <Button className={"addCardButton"} variant="outline-danger"
                                        onClick={() => this.toggleInput()}>close</Button>
                            </>
                        }

                    </div>


                </div>

            </DragDropContext>
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
        addCard: (card) => dispatch(addCard(card)),
        addColumn: (col) => dispatch(addColumn(col))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)

