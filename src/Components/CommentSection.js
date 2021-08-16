import React from "react";
import Comment from "./Comment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name:"",
          email:"",
          message:"",
          commentContent: "",
          showToast: false
        };
    
        this.postComments = this.postComments.bind(this);
      }
  
  // API request to POST comments
  postComments() {
    if((this.state.name) && (this.state.email) && (this.state.message) !== ""){
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        body: this.state.message,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({name: "",email:"",message:"" });
        toast("New Comment Created");
        console.log(json);
      });
    }else{
      toast('Please fill all fields')
    }
  }
  render() {
    return (
      <div className="CommentSection__container">
        <div className="row">
          <div className="col-sm-5 col-md-6 col-12 pb-4">
            {this.props.comments.map((comment) => {
              return (
                <Comment
                  body={comment.body}
                  author={comment.email}
                  postId={comment.postId}
                />
              );
            })}
          </div>
          <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
            <form id="algin-form">
              <div className="form-group">
                <h4>Leave a comment</h4> <label for="message">Message</label>
                <textarea
                  name="msg"
                  id=""
                  msg
                  cols="30"
                  rows="5"
                  className="form-control"
                  value={this.state.message}
                      onChange={(event) => {
                        this.setState({ message: event.target.value });
                      }}
                  required
                ></textarea>
              </div>
              <div className="form-group">
               
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="fullname"
                  className="form-control"
                  value={this.state.name}
                      onChange={(event) => {
                        this.setState({ name: event.target.value });
                      }}
                  required
                />
              </div>
              <div className="form-group">
                
                <label for="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  value={this.state.email}
                      onChange={(event) => {
                        this.setState({ email: event.target.value });
                      }}
                 required
                />
              </div>
              <div className="form-group mt-4 text-center">
            
                <button
                  type="button"
                  id="post"
                  className='btn btn-primary'
                  onClick={() => this.postComments()}
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentSection;
