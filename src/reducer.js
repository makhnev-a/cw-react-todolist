export const ADD_TODOLIST = 'TodoAPP/TodoList/ADD-TODOLIST';
export const DELETE_TODOLIST = 'TodoAPP/TodoList/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoAPP/TodoList/DELETE-TASK';
export const ADD_TASK = 'TodoAPP/TodoList/ADD-TASK';
export const UPDATE_TASK = 'TodoAPP/TodoList/UPDATE-TASK';

const initialState = {
    "todolists": [
        {
            "id": 0, "title": "every day",
            tasks: [
                {"title": "css11", "isDone": false, "priority": "low", "id": 0},
                {"title": "js", "isDone": false, "priority": "low", "id": 1},
                {"title": "react", "isDone": false, "priority": "low", "id": 2},
                {"title": "sasasa", "isDone": false, "priority": "low", "id": 3},
                {"title": "yoaa", "isDone": false, "priority": "low", "id": 4},
                {"title": "sddsdsds", "isDone": false, "priority": "low", "id": 5}]
        },
        {"id": 1, "title": "tomorrow", tasks: []},
        {"id": 2, "title": "weewwe`", tasks: []},
        {"id": 3, "title": "dddd", tasks: []}
    ]
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id != action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id != action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    console.log("reducer: ", action);
    return state;
}

export const addTodoListAc = (todolist) => {
    return {
        type: ADD_TODOLIST,
        newTodolist: todolist
    };
};

export const addTaskAc = (newTask, todolistId) => {
    return {
        type: ADD_TASK,
        newTask,
        todolistId
    };
};

export const updateTaskAc = (taskId, obj, todolistId) => {
    return {
        type: UPDATE_TASK,
        taskId,
        obj,
        todolistId
    }
};

export const deleteTodolistAc = (todolistId) => {
    return {
        type: DELETE_TODOLIST,
        todolistId: todolistId
    };
};

export const deleteTaskAc = (todolistId, taskId) => {
    return {
        type: DELETE_TASK,
        todolistId,
        taskId
    };
};