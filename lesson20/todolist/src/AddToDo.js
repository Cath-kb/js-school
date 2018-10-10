import React from "react";
import { connect } from "react-redux";

import { addTodo } from './ToDoList';
import {getFilterValue} from "./ToDoList/store";

class AddToDo extends React.Component {
  state = {
    name: '',
  };

  addToDo = event => {
    event.preventDefault();
    this.props.addToDo({
      name: this.state.name,
      completed: this.props.completed,
    });
    this.setState({
      name: '',
    })
  };

  handleChangeName = ({ target }) => {
    this.setState({name: target.value});
  };

  render() {
    if (!this.props.isVisible) return null;

    return <div className="row">
      <div className="col-sm-12">
        <form className="form-inline mt-4">
          <div className="form-group">
            <label htmlFor="newTask" className="sr-only">New Task</label>
            <input
              type="text"
              placeholder="New Task"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </div>
          <button
            type="submit"
            className="ml-3 btn btn-primary"
            onClick={this.addToDo}
            disabled={!this.state.name.trim()}
          >
            Add
          </button>
        </form>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  completed: getFilterValue(state) === 'completed',
  isVisible: getFilterValue(state) !== 'deleted',
});

const handlers = {
  addToDo: addTodo,
};

export default connect(mapStateToProps, handlers)(AddToDo);
