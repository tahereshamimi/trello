import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {addComment, addDescription} from "../redux/cards/actions.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl,faWindowMaximize, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import Task from "./Task";

function ModalContainer(props) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState(props.task.description)
    const [editMode, setEditMode] = useState(false)
    const [comment,setComment]=useState("")
    const addDescriptionHandler = () => {
        dispatch(addDescription({
            description,
            taskId:props.task.id
        }))
        if(editMode){
            setEditMode(false)
        }
    }
    const addCommentHandler=()=>{
        dispatch(addComment({
            comment,
            taskId:props.task.id
        }))
        setComment("")
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <FontAwesomeIcon icon={faWindowMaximize} className={"mr-2"}/>
                    {props.task.content}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    <FontAwesomeIcon icon={faAlignJustify} className={"mr-2"}/>
                    <span>Description</span>
                </h4>
                {/*show description detail if have description, and show input if dont have description*/}
                {props.task.description && !editMode ?
                    <p onClick={()=>{setEditMode(true)}} className={"pl-5 pt-3"}>
                        {props.task.description}
                    </p>
                    :
                    <>
                        <textarea
                            className="modal-desciption"
                            value={description}
                            placeholder={"add description"}
                        onChange={(e)=>{setDescription(e.target.value)}}/>
                        <Button variant="success"
                                onClick={(e) => {
                                    addDescriptionHandler(e)
                                }}
                                className={"addCardButton"}>
                            {editMode && props.task.description?"Edit":"Add Description"}
                        </Button>
                        {editMode && props.task.description?
                            <Button variant="outline-danger" onClick={()=>setEditMode(false)}>cancel</Button>:""
                        }

                    </>

                }

                <h4 className={"pt-4"}>
                    <FontAwesomeIcon icon={faListUl} className={"mr-2"}/>
                    <span>Activity</span>
                </h4>
                <input className={"commentInput"} placeholder={"add comment"} onChange={(e)=>{setComment(e.target.value)}} value={comment}/>
                <Button variant="success" disabled={!comment} onClick={addCommentHandler}>save</Button>

                {props.task.comments?props.task.comments.map((comment, index) => {
                        return (<div className={"task mt-2"}>{comment}</div>)
                    }
                ):""}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalContainer