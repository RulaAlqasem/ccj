import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
export class ApiCard extends Component {
  render() {
    return (
      <div>
        {this.props.dataArray.map(ele => {
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
              <Button variant="primary" onClick={() => this.props.addData(ele)}>add to favorites</Button>
            </Card.Body>
          </Card>)
        })}

      </div>
    )
  }
}

export default ApiCard
