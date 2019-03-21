import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export class MyCard extends React.Component {


    render () {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>

                        <a onClick={this.toggle} className="btn btn1"> LOL </a>

                    </CardBody>
                </Card>
            </div>
        );
    }
}