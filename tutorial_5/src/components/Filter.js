import React from 'react';

export default class Filter extends React.Component{
     constructor(props){
        super(props);
            this.state = {
            select: "nothing"
        }
    }
    
    selectOption(event) {
        this.props.callback(event.target.value);
    }
    
    render(){
		// Render JSX
		return (
            <div>	
                <span style={{marginRight: '1.5em'}}>Filter</span>
                <select id="pick-filter" onChange={this.selectOption.bind(this)}>
            
                    <option value="all">
                        All 
                    </option>

                    <option value="completed">
                        Completed 
                    </option>

                    <option value="uncompleted">
                        Uncompleted 
                    </option>

                </select>
            
            </div>
        );
    }
    
}