import { React, useState, useEffect } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import ReportDescription from './ReportDescription';

function ReplyList(props) {
    const [replyList, setReplyList] = useState([]);
    const [openReport, setOpenReport] = useState(false);
    const [selected, setSelected] = useState();

    // Open report window 
    const reportWindow = (id) => {
        setSelected(id);
        setOpenReport(!openReport);
    }

    // Retrieve all comments
    useEffect(() => {
        axios.get("http://localhost:5000/getComments").then((response) => {
            setReplyList(response.data);
            console.log(response.data);
        })
    }, [])

    //Filter replies which belong to the parent comment
    const filteredList = replyList.filter((reply) => reply.responseTo === props.parentID && reply.isVisible === true)
    
    return (
        <div>
            <div className='commentList'>
                
                {(filteredList.map((replies) => {
                    return (
                        <div >
                            <Card className="comment">
                                <div>
                                    <div className="avatar">
                                        <Image src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" fluid="true" roundedCircle="true"></Image>
                                    </div>
                                    <p className="userName" style={{ fontWeight: "bold" }}>{replies._id}</p>
                                    <p className="dateTime">{replies.time}</p>
                                </div>
                                <p>{replies.comment}</p>

                                <div className='buttons'>
                                    <Button className="button" variant="outline-secondary" size="sm" onClick={() => reportWindow(replies._id)}>Report</Button>
                                </div>
                            </Card>

                            {(selected === replies._id) ?
                                openReport &&
                                <ReportDescription commentID={replies._id} /> : null
                            }
                        </div>
                    );
                })
                )}
            </div>
        </div >
    );
}

export default ReplyList;