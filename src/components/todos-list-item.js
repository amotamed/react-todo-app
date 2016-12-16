import React from "react";

export default class TodosListItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderActionSection () {
        if (this.state.isEditing) {
            return (
                <td>
                    <button onClick={this.editTask.bind(this)}>Save</button>
                    <button onClick={this.setEditState.bind(this, false)}>Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <button onClick={this.setEditState.bind(this, true)}>Edit</button>
                <button onClick={this.deleteTask.bind(this)}>Delete</button>
            </td>
        );
    }

    renderTask () {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            color: isCompleted ? "green" : "red"
          , cursor: "pointer"
        };

        if (this.state.isEditing) {
            return (
                <td>
                    <input ref="task" defaultValue={task} />
                </td>
            )
        }

        return (
            <td onClick={this.toggleTask.bind(this)} style={taskStyle}>{task}</td>
        )
    }

    render () {
        return (
            <tr>
                {this.renderTask()}
                {this.renderActionSection()}
            </tr>
        )
    }
    setEditState (isEditing) {
        this.setState({
            isEditing
        });
    }

    toggleTask () {
        this.props.toggleTask(this.props.id);
    }
    editTask () {
        this.props.editTask(this.props.id, this.refs.task.value);
        this.setState({
            isEditing: false
        });
    }
    deleteTask () {
        this.props.deleteTask(this.props.id);
    }
}
