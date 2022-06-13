import { React, useState } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

function Reply(props) {
    const [comment, setComment] = useState();

    console.log(props.postID);
    console.log(props.value);
    const parentID = props.parentID;

    // Add a reply to a parent comment
    const addComment = (event) => {
        event.preventDefault();

        let commentTime = new Date().toLocaleString();
        let responseTo = parentID

        axios.post('http://localhost:5000/addComment', {
            comment,
            responseTo,
            commentTime
        }).then((res) => {
            setComment("");
            console.log("Comment saved successfully");
        });
    }

    return (
        <div className="reply">
            <Card>
                <Form>
                    <p id="replyTo">Replying to {parentID}</p>
                    <Form.Group>
                        <Form.Control as="textarea"
                            value={comment}
                            placeholder="Add reply"
                            onChange={(event) => { setComment(event.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                    <Button className="float-end" variant="secondary" onClick={addComment}>Add reply</Button>
                </Form>
            </Card><br />            
        </div>
    );
}

export default Reply;