import React, { Component } from 'react'
import Table from './Table'
import UserForm from './UserForm'
import Info from './Info'
import ls from 'local-storage'
import './index.css'
import Container from 'react-bootstrap/Container';


class App extends Component {
    state = {
        readings: [],
    };

    UNSAFE_componentWillMount(){
        localStorage.getItem('readings') && this.setState({
            readings: JSON.parse(localStorage.getItem('readings')),
            isLoading: false 
        })
    }
    
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('readings', JSON.stringify(nextState.readings));
    }


    componentDidMount() {
        const rememberReadings = localStorage.getItem('rememberReadings');
        this.setState({rememberReadings});
    }

    removeReading = index => {
        const { readings } = this.state;
    
        this.setState({
            readings: readings.filter((reading, i) => { 
                return i !== index;
            })
        });
    }

    handleSubmit = reading => {
        this.setState({ readings: [...this.state.readings, reading] })
    }


    render () {
        const { readings } = this.state
        return (
            <Container className="container">
                <h1>Pulse Ox</h1>
                <UserForm 
                    handleSubmit={this.handleSubmit}
                />
                <Table  readingData={readings} removeReading={this.removeReading} />
                <Info />
            </Container>
        )
    }
}

export default App

