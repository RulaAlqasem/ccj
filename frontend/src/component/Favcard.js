import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
export class Favcard extends Component {
  render() {
    return (
      <div>
        {this.props.favArray.map(ele => {
          return (<Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ele.image} />
            <Card.Body>
              <Card.Title>{ele.title}</Card.Title>
              <Card.Text>
                {ele.description}
              </Card.Text>
              <Card.Text>
                {ele.score}
              </Card.Text>
              <Button variant="primary" onClick={() => this.props.deleteData(ele.slug)}>delete</Button>
              <Button variant="primary" onClick={() => this.props.formUbdateShow(ele.title,
                ele.description,
                ele.score,
                ele.slug)}>update</Button>
            </Card.Body>
          </Card>)
        })}
      </div>
    )
  }
}

export default Favcard
