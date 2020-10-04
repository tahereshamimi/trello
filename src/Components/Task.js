import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import ModalContainer from "./ModalComponent";

export default class Task extends React.Component {
    constructor() {
        super();
        this.state = {
            modalShow: false
        }
    }

    render() {
        return (
            <>
                <Draggable

                    draggableId={this.props.task.id}
                    index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <div className={"task"}
                             onClick={() =>this.setState({modalShow:true})}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             ref={provided.innerRef}
                             // isDragging={snapshot.isDragging}
                        >
                            {this.props.task.content}
                        </div>
                    )}
                </Draggable>
                <ModalContainer
                    task={this.props.task}
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow:false})}
                />
            </>
        )
    }
}
