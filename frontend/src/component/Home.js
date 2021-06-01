import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import ApiCard from './ApiCard'
export class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: process.env.REACT_APP_HOST,
      q: '',
      dataArray: [],

    }
  }

  getData = async () => {

    const arrData = await axios.get(`${this.state.url}/anime?q=${this.state.q}`)
    this.setState({ dataArray: arrData.data })
    console.log(this.state.dataArray);
  }

  addData = async (ele) => {

    await axios.post(`${this.state.url}/anime/fav`, ele)


  }

  render() {
    return (
      <div>
        hiii frome home

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>anime name</Form.Label>
            <Form.Control type="text" placeholder="Enter anime name" onChange={(e) => {
              this.setState({ q: e.target.value })
              console.log(this.state.q)
            }} />

          </Form.Group>

          <Button variant="primary" onClick={this.getData}>
            Submit
  </Button>
        </Form>
        <ApiCard dataArray={this.state.dataArray} addData={this.addData} />
      </div>
    )
  }
}

export default Home
