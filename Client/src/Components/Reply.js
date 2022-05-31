import { React, useState } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import ReplyList from "./ReplyList";

function Reply(props) {
    const [comment, setComment] = useState();

    console.log(props.postID);
    console.log(props.value);
    const parentID = props.postID;

    const addComment = (event) => {
        event.preventDefault();

        const variables = {
            comment: comment,
            responseTo: parentID
        }

        axios.post('http://localhost:5000/addComment', variables)
            .then((res) => {
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
            </Card><br/>
            <p id="viewReplies">View Replies</p> 
            <ReplyList parentID={parentID}/>
        </div>
    );
}

export default Reply;