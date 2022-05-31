import { React, useState, useEffect } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import ReportDescription from './ReportDescription';

function ReplyList(props) {
    const [replyList, setReplyList] = useState([]);
    const [openReport, setOpenReport] = useState(false);

    const reportWindow = () => {
        setOpenReport(!openReport);
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getComments").then((response) => {
            setReplyList(response.data);
            console.log(response.data);
        })
    }, [])

    return (
        <div>
            <div className='commentList'>
                {replyList.filter((reply) => reply.responseTo === props.parentID && reply.isVisible === true).map((replies) => {
                    return (
                        <div >
                            <Card className="comment">
                                <div>
                                    <div className="avatar">
                                        <Image src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" fluid="true" roundedCircle="true"></Image>
                                    </div>
                                    <p id="userName" style={{ fontWeight: "bold" }}>{replies._id}</p>
                                </div>
                                <p>{replies.comment}</p>

                                <div className='buttons'>
                                    <Button className="button" variant="outline-secondary" size="sm" onClick={() => reportWindow()}>Report</Button>
                                </div>
                            </Card>

                            {openReport &&
                                <ReportDescription commentID={replies._id} />
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReplyList;