import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import Favcard from './Favcard'
export class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: process.env.REACT_APP_HOST,
      favArray: [],
      show: false,
      title: '',
      description: '',
      score: '',
      slug: '',
    }
  }

  componentDidMount = async () => {

    const arrData = await axios.get(`${this.state.url}/anime/fav`)
    this.setState({ favArray: arrData.data })

  }

  deleteData = async (slug) => {

    const arrData = await axios.delete(`${this.state.url}/anime/fav/${slug}`)
    this.setState({ favArray: arrData.data })
    // window.location.reload();

  }
  updateData = async () => {
    const body = {
      title: this.state.title,
      description: this.state.description,
      score: this.state.score,

    }

    await axios.put(`${this.state.url}/anime/fav/${this.state.slug}`, body)
    // window.location.reload();

  }

  formUbdateShow = (title,
    description,
    score,
    slug) => {
    this.setState({
      show: true,
      title: title,
      description: description,
      score: score,
      slug: slug,
    })

  }

  render() {
    return (
      <div>
        hi from fav
        <Favcard favArray={this.state.favArray} deleteData={this.deleteData} formUbdateShow={this.formUbdateShow} />

        {this.state.show && <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>anime title</Form.Label>
            <Form.Control type="text" value={this.state.title} onChange={(e) => {
              this.setState({ title: e.target.value })

            }} />
            <Form.Label>anime description</Form.Label>
            <Form.Control type="text" value={this.state.description} onChange={(e) => {
              this.setState({ description: e.target.value })

            }} />
            <Form.Label>anime score</Form.Label>
            <Form.Control type="text" value={this.state.score} onChange={(e) => {
              this.setState({ score: e.target.value })

            }} />

          </Form.Group>

          <Button variant="primary" onClick={this.updateData}>
            Submit
  </Button>
        </Form>



        }
      </div>
    )
  }
}

export default Favorites
