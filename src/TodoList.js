import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    ADD_TASK,
    addTaskAc,
    DELETE_TASK,
    DELETE_TODOLIST, deleteTaskAc,
    deleteTodolistAc,
    UPDATE_TASK,
    updateTaskAc
} from "./reducer";

class TodoList extends React.Component {

    state = {
        filterValue: "All"
    };

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();

    }

    addTask = (newText) => {
        let newTask = {
            id: (new Date()).getTime(),
            title: newText,
            isDone: false,
            priority: "low"
        };

        this.props.addTask(newTask, this.props.id);
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    }

    changeTask = (taskId, obj) => {
        this.props.updateTask(taskId, obj, this.props.id);
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone});
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id);
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id);
    }

    render = () => {
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle
                        title={this.props.title}
                        onDelete={this.deleteTodolist}
                    />
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks
                    changeStatus={this.changeStatus}
                    changeTitle={this.changeTitle}
                    deleteTask={this.deleteTask}
                    tasks={this.props.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}
                />
                <TodoListFooter
                    changeFilter={this.changeFilter}
                    filterValue={this.state.filterValue}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            dispatch(addTaskAc(newTask, todolistId));
        },
        updateTask(taskId, obj, todolistId) {
            dispatch(updateTaskAc(taskId, obj, todolistId));
        },
        deleteTodolist: (todolistId) => {
            dispatch(deleteTodolistAc(todolistId))
        },
        deleteTask: (taskId, todolistId) => {
            dispatch(deleteTaskAc(taskId, todolistId))
        }
    }
}

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;

