import {ADD_CARD} from "../types"
import {ADD_DESCRIPTION} from "../types";
import {ADD_COLUMN} from "../types";
import {ADD_COMMENT} from "../types";

const initialState = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Take out the garbage', description: "description",comments:[]},
        'task-2': {id: 'task-2', content: 'Watch my favorite show', description: "description",comments:[]},
        'task-3': {id: 'task-3', content: 'Charge my phone', description: "description",comments:[]},
        'task-4': {id: 'task-4', content: 'Cook dinner', description: "description",comments:[]}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3']

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            let card = action.payload;
            let taskNumber = Object.keys(state.tasks).length + 1
            let taskId = 'task-' + taskNumber;

            //add new task to tasks list and to its column
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [taskId]:
                        {
                            id: taskId,
                            content: card.title
                        }
                },
                columns: {
                    ...state.columns,
                    [card.column]: {
                        ...state.columns[card.column],
                        taskIds: [...state.columns[card.column].taskIds, taskId]

                    }

                }
            }
        case ADD_DESCRIPTION:
            let id=action.payload.taskId
            return{
                ...state,
                tasks: {
                    ...state.tasks,
                    [id]:{
                        ...state.tasks[id],
                        description:action.payload.description
                    }
                }

            }
        case ADD_COLUMN:
            let colNumber = Object.keys(state.columns).length + 1
            let colId = 'column-' + colNumber;
            console.log(colId)
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [colId]:{
                        id: colId,
                        title: action.payload,
                        taskIds: []
                    }

                },
                columnOrder: [...state.columnOrder,colId]
            }
        case ADD_COMMENT:
            let CommentTaskId=action.payload.taskId
            let comment=action.payload.comment
            console.log(action.payload)
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [CommentTaskId]:{
                        ...state.tasks[CommentTaskId],
                        comments:[...state.tasks[CommentTaskId].comments,comment]
                    }

                }
            }
        default:
            return state

    }
}
export default reducer