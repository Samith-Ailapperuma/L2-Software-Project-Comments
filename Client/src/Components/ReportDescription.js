import axios from "axios";
import { React, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

function ReportDescription(props) {
    const [description, setDescription] = useState();

    const reportComment = () => {
        axios.put(`http://localhost:5000/addReport/${props.commentID}`, {
            description
        }).then((res) => {
            console.log("Comment has been reported");
        }).catch((error) => {
            console.log(error.response);
        });
    }

    return (
        <div>
            <Card>
                <Form>
                    <Form.Group>
                        <Form.Control as="textarea"
                            rows={6}
                            placeholder="Enter reason for reporting comment"
                            value = {description}
                            onChange = {(event) => {setDescription(event.target.value)}}>
                        </Form.Control>
                        <Button variant="danger" onClick={() => {reportComment()}}>Report comment</Button>
                    </Form.Group>
                </Form>
            </Card>
        </div >
    );
}

export default ReportDescription;