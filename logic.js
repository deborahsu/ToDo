var date_utils = {
    months: ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
};

class ToDos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPriority: false
        }
        this.HandleClick = this.HandleClick.bind(this);
        this.HandleDone = this.HandleDone.bind(this);
        this.HandlePriority = this.HandlePriority.bind(this);

    }
    HandleClick(index) {
        this.props.clickHandler(index);
    }
    HandleDone(index) {
        this.props.clickasDone(index);
    }
    HandlePriority() {
        this.setState({
            isPriority: !this.state.isPriority
        })
    }


    render() {
        var background = this.state.isPriority ? "yellow" : "";




        return (
            <div>
                <h1>Tasks to do </h1>

                <ul>
                    {this.props.tasks.map((x, i) =>
                        <li className="items" key={i}>{`${x.name} on ${x.day}/${x.month}`}
                            <div className="buttonContainer">
                                <button className="done" onClick={() => this.HandleDone(i)}><i className="fas fa-check"></i></button>
                                <button className="priority" onClick={() => this.HandlePriority()}><i className="far fa-star" style={{ "backgroundColor": background }}></i></button>
                                <button className="delete" onClick={() => this.HandleClick(i)}>x</button>
                            </div>
                        </li>
                    )}
                </ul>

            </div>
        );
    }
}

class Done extends React.Component {
    constructor(props) {
        super(props);
        this.HandleMistake = this.HandleMistake.bind(this);
    }

    HandleMistake(index) {
        this.props.clickToDo(index);
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Tasks Done </h1>
                <ul>
                    {this.props.doneTasks.map((x, i) =>
                        <li className="items" key={i}>{`${x.name} on ${x.day}/${x.month} `}<button className="buttonToDo" onClick={() => this.HandleMistake(i)}>TO DO</button></li>
                    )}
                </ul>
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            donetasks: [],
            userInput: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this)
        this.MarkedasDone = this.MarkedasDone.bind(this);
        this.isMistake = this.isMistake.bind(this);
        this.deleteInput = this.deleteInput.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var new_task = {
            name: this.name.value,
            day: this.day.value,
            month: this.month.value,
        };

        this.state.tasks.push(new_task);
        this.setState({ tasks: this.state.tasks });
        this.deleteInput();

    }

    renderOptions(arr) {
        return arr.map(x => <option key={x} value={x}>{x}</option>);
    }

    deleteToDo(index) {
        event.preventDefault();
        const array = this.state.tasks;
        array.splice(index, 1);
        this.setState({
            tasks: array,
        })
    }
    MarkedasDone(index) {
        event.preventDefault();
        const array = this.state.donetasks;
        array.push(this.state.tasks[index])
        this.setState({
            donetasks: array,
        })
        this.deleteToDo(index);

    }
    isMistake(index) {
        const array = this.state.tasks;
        array.push(this.state.donetasks[index])
        var donearray = this.state.donetasks;
        donearray.splice(index, 1);
        this.setState({
            tasks: array,
            donetasks: donearray

        })
    }


    deleteInput() {
        document.getElementById("userInput").value = "";
    }






    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Deborah's TO DO List</h1>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <form onSubmit={this.handleSubmit}>
                                <input className="userinput" id="userInput" ref={input => this.name = input} placeholder="enter a new task" ></input>
                                <select ref={x => this.day = x}>
                                    {this.renderOptions(date_utils.days)}
                                </select>
                                <select ref={x => this.month = x}>
                                    {this.renderOptions(date_utils.months)}
                                </select>
                                <input type="submit" value="add" onClick={this.deleteInput}></input>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <ToDos tasks={this.state.tasks} clickasDone={this.MarkedasDone} clickHandler={this.deleteToDo} clickedasPriority={this.prioritize} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            {this.state.donetasks.length > 0 ? <Done doneTasks={this.state.donetasks} clickToDo={this.isMistake} /> : null
                            }


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

render();









