import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Image, } from 'react-bootstrap';
import Reply from './Reply';

function CommentList() {
    const [commentList, setCommentList] = useState([]);
    const [openReply, setOpenReply] = useState(false);

    // const updateCommentList = () => {
    //     setCommentList(commentList.concat(newComment));
    // }

    const displayReply = () => {
        setOpenReply(!openReply);
    }

    // const handleClick = (id) => {
    //     setSelectElement(id);
    //     console.log(id);
    // }

    useEffect(() => {
        axios.get("http://localhost:5000/getComments").then((response) => {
            setCommentList(response.data);
            console.log(response.data);
        })
    }, [])

    return (
        <div>
            <div className="commentList">
                {commentList.map((comments, index) => {
                    return (
                        <div>    
                            <Card className="comment">
                                <div>
                                    <div className="avatar">
                                        <Image src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" fluid="true" roundedCircle="true"></Image>
                                    </div>
                                    <p id="userName" style={{ fontWeight: "bold" }}>{comments._id}</p>
                                </div>
                                <p>{comments.comment}</p>
                                <div className="buttons">
                                    <Button className="button" variant="outline-secondary" size="sm" onClick={() => displayReply()}>Reply</Button>
                                    <Button className="button" variant="outline-secondary" size="sm">Report</Button>
                                </div>
                            </Card>

                            {openReply &&
                                < div >
                                    <Reply value={index} postID={comments._id} />
                                </div>
                            }

                            {/* {openReply === index ? (
                                <React.Fragment>
                                    <Reply postID={comments._id} />
                                </React.Fragment>
                            ) : null} */}

                        </div>

                    );
                })}

            </div>

        </div >

    );
}

export default CommentList;

