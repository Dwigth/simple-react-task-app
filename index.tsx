import React, { Component, useRef } from 'react';
import { render } from 'react-dom';
import './style.css';
//import 'bootswatch/dist/lumen/boostrap.min.css';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

interface AppProps {}

interface AppState {
  newTask: string;
  tasks: ITask[];
}

class App extends Component<AppProps, AppState> {
  taskInput: any;

  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      tasks: [],
    };

    this.taskInput = React.createRef<HTMLInputElement>(null);
  }

  setNewTask(task: string) {
    this.setState({
      newTask: task,
    });
  }

  addTask(name: string) {
    const newTasks = [...this.state.tasks, { name, done: false }];
    this.setState({
      tasks: newTasks,
    });
  }

  toggleDoneTask(i: number) {
    const newTasks = [...this.state.tasks];
    newTasks[i].done = !newTasks[i].done;
    this.setState({
      tasks: newTasks,
    });
  }

  removeTask(i: number) {
    const newTasks = [...this.state.tasks];
    newTasks.splice(i, 1);
    this.setState({
      tasks: newTasks,
    });
  }

  handleSubmit(e: FormElement) {
    e.preventDefault();
    this.addTask(this.state.newTask);
    this.setNewTask('');
    this.taskInput.current?.focus();
  }

  render() {
    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <input
                    type="text"
                    onChange={(e) => this.setNewTask(e.target.value)}
                    value={this.state.newTask}
                    className="form-control"
                    autoFocus
                    ref={this.taskInput}
                  />
                  <button className="btn btn-success btn-block mt-2">
                    Save
                  </button>
                </form>
              </div>
            </div>
            {this.state.tasks.map((t, i) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>
                  {t.name}
                </h2>
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.toggleDoneTask(i)}
                  >
                    {t.done ? '✓' : '✗'}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.removeTask(i)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
