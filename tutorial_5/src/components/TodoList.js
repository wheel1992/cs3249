import React from 'react';
import Filter from './Filter';


//Component : Title 
//Prop : todoCount
const Title = React.createClass({	
	render: function() {
		  return (
			<div>
			   <div>
				  <h1>to-do ({this.props.todoCount})</h1>
			   </div>
			</div>
		 );
	}
});

//Component: TodoForm
//Prop : addTodo
const TodoForm = React.createClass({
	render: function() {
		let input;
		return (
			    <form onSubmit={(e) => {
					e.preventDefault();
					this.props.addTodo(input.value);
					input.value = '';
				}}>
					<input  ref={node => {input = node;}}/>
					<br />
				</form>
		);
	}
});

// Todo list individual item
const Todo =  React.createClass({
    
    getInitialState() {
        return {
          isCompleted : false 
        };
    },
    
	render: function() {
		 return (
			<li>
                <input type="checkbox" name="item" checked={this.props.todo.isCompleted} onChange={() => {
                    
                    this.setState({
                        isCompleted: !this.state.isCompleted // flip boolean value
                    });
             
                    this.props.todo.isCompleted = this.state.isCompleted;
                    console.log(this.props.todo.isCompleted);
                    
                }}/>
             
				<a href="#" className="list-group-item" onClick={() => {this.props.remove(this.props.todo.key)}}>ID :{this.props.todo.key} / Text : {this.props.todo.text}</a>
			</li>
		);
	}
});

const TodoList = React.createClass({
	render: function() {
		// Map through the todos
		const todoNode = this.props.todos.map((todo) => {
			return (<Todo todo={todo} key={todo.key} remove={this.props.remove}/>);
		});
		
		return (
			<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>
		);
  }
}); 

// Container Component
// Todo Id
window.id = 0;
// Temporary array for local DB
var todos = new Array();

class TodoApp extends React.Component{
	constructor(props){
		// Pass props to parent class
		super(props);
		// Set initial state
		this.state = {
			data: [],
            backupData : []
		}
	}
	
	// Lifecycle method
	// When the component is mounted, this method will be called automatically
	// Please have a look at the site as below
	// https://facebook.github.io/react/docs/react-component.html#componentdidmount
	componentDidMount(){
		// Make HTTP reques with Axios
		// Set state with result
		this.setState({data:todos});
        this.setState({backupData:todos});
	}
	
	// Add todo handler
	addTodo(val){
		// Assemble data
		const todo = {
            text : val,
            key : (new Date()).getTime(),
            isCompleted : false
        }
		// Update data
		todos.push(todo);
		// Set the state value by using the local DB array
		this.setState({data: todos});
        this.setState({backupData: todos});
	}
  
	// Handle remove
	handleRemove(key){
		// Filter all todos except the one to be removed
		const remainder = this.state.data.filter((todo) => {
			if(todo.key !== key) return todo;
		});
	
		// Replace the local DB array with new DB array excluding the removed item
		todos = remainder;
		// Update state with filter
		this.setState({data: todos});
        
        
        // do the same filter for backupData
        var leftover = this.state.backupData.filter((todo) => {
			if(todo.key !== key) return todo;
		});

		todos = leftover;
		this.setState({backupData: todos});

	}
    
    onFilterPicked(selectedOption) {
        // console.log("hello " + selectedOption);

        var filteredTodo;
        
        if (selectedOption === "all") {
            filteredTodo = this.state.backupData.filter((todo) => {
                return (this.state.backupData.indexOf(todo) === -1);
            });
            
            todos = this.state.backupData;
        } else {
            var isCompleted = false;
            if (selectedOption === "completed") isCompleted = true;

            filteredTodo = this.state.backupData.filter((todo) => {
                if (todo.isCompleted == isCompleted) return todo;
            });
            
            todos = filteredTodo;
            console.log("filteredTodo.length = " + filteredTodo.length); 
        }
 
       
        this.setState({data: todos});
    }
 
	render(){
		// Render JSX
		return (
		<div>
			<Title
				//passing state date to a child as props
				todoCount={this.state.data.length}
			/>
			<TodoForm
				//passing state date to a child as props
				addTodo={this.addTodo.bind(this)}
			/>
            
            <Filter 
                callback={(selectedOption) => this.onFilterPicked(selectedOption)}
            />
            
			<TodoList 
				//passing state date to a child as props
				todos={this.state.data} 
				remove={this.handleRemove.bind(this)}
			/>
		</div>
    );
  }
}

export default TodoApp;
