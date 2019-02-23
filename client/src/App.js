import React, { Component } from 'react';
import './App.css';
import { Header, Container, Segment, Form, Button } from 'semantic-ui-react';
import DataTable from './DataTable';
import hash from "string-hash";

class App extends Component {
  state = { url: '', submittedHash: ''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { url } = this.state

    this.setState({ submittedUrl: url })
  }

  generateRandomUrl = () => {
    let randomUrl = 'http://test.com/';
    const safeUrlCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  
    for (let i = 0; i < 50; i++){
      randomUrl += safeUrlCharacters.charAt(Math.floor(Math.random() * safeUrlCharacters.length));
    }
    this.setState({ url: randomUrl });
  }

  minify = () => {
    const { url } = this.state;
    fetch('/api/addUrl', {
      method: "POST",
      headers: {
      'Content-type': 'application/json'
      },
        body: JSON.stringify({submittedUrl: url})
      });
  }

  render() {
    const { url } = this.state
    return (
      <Container style={{marginTop: '2em'}}>
        <Header as='h5' content='Submitted By David Dunkovich'/>
        <Header as='h1' content='Remitly Project Assignment'/>
        <Segment padded='very' color='blue'>
          <Form>
            <Header as='h5'>Please enter in a long URL</Header>
            <Form.Input placeholder='ie. http://test.com/dwa976awfbn12kjbdasd!@#daw124' name='url' value={url} onChange={this.handleChange} />
            <Button content='Randomize Input' color='green' onClick={() => this.generateRandomUrl()}/>
            <Button content='Minify' color='blue' onClick={() => this.minify()}/>
          </Form>
        </Segment>
        <DataTable />
      </Container>
    );
  }
}

export default App;
