import {ADD_CARD} from "../types";
import {ADD_DESCRIPTION} from "../types";
import {ADD_COLUMN} from "../types";
import {ADD_COMMENT} from "../types";


export const addCard = (newCard) => {
    return {
        type: ADD_CARD,
        payload:newCard
    }
}
export const addDescription = (newDescription) => {
    return {
        type: ADD_DESCRIPTION,
        payload: {
            description:newDescription.description,
            taskId:newDescription.taskId
        }
    }
}
export const addColumn = (newColumn) => {
    return {
        type: ADD_COLUMN,
        payload: newColumn
    }
}
export const addComment = (newComment) => {
    return {
        type: ADD_COMMENT,
        payload: {
            comment:newComment.comment,
            taskId: newComment.taskId
        }
    }
}