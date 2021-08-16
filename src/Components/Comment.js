import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      openReply: false,
      commentContent: '',
      showToast: false,
    };

    this.like = this.like.bind(this);
    this.report = this.report.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  like(e) {
    e.preventDefault();
    this.setState((state) => ({
      liked: !state.liked,
    }));
  }

  // API request to post reply for the comments
  createComment() {
    fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        postId: this.props.postId,
        email: "check@gmail.com",
        body: this.state.commentContent,
        name: "qwerty",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ openReply: false, commentContent: "" });
        toast("Commented Successfully");
        console.log(json);
      });
  }

  report(e) {
    e.preventDefault();
    alert("Thank you for your report, our team will investigate this comment.");
  }

  render() {
    return (
      <div className="mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-12">
            <div className="d-flex flex-column comment-section">
              <div className="bg-white p-2">
                <div className="d-flex flex-row user-info">
                  <img
                    className="rounded-circle"
                    src="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
                    width="60
                    "
                  />
                  <div className="d-flex flex-column justify-content-start ml-2">
                    <span className="d-block font-weight-bold name">
                      {this.props.author.toLowerCase()}
                    </span>
                    <span className="date text-black-50">Commented</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="comment-text">{this.props.body}</p>
                </div>
              </div>
              <div className="bg-white">
                <div className="d-flex flex-row fs-12">
                  <div className="like p-2 cursor">
                    <i className="far fa-thumbs-up"></i>
                    <span className="ml-1">
                    <a className="link" href="#" onClick={this.like}>
                        {this.state.liked ? "Liked" : "Like"}
                      </a>
                    </span>
                  </div>
                  <div className="like p-2 cursor">
                    <i className="far fa-comment"></i>
                    <span className="ml-1">
                      <a
                        className="link"
                        href="#"
                        onClick={() => {
                          this.setState({ openReply: true });
                        }}
                      >
                        Reply
                      </a>
                    </span>
                  </div>
                  <div className="like p-2 cursor">
                    <i className="far fa-flag"></i>
                    <span className="ml-1">
                      <a className="link" href="#" onClick={this.report}>
                        Report
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              {/* Conditional Check to open text box to reply for a comment */}
              {this.state.openReply && (
                <div className="bg-light p-2">
                  <div className="d-flex flex-row align-items-start">
                    <div className='col-md-2'>
                    <img
                      className="rounded-circle"
                      src="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
                      width="120"
                    />
                    </div>
                    <div className='col-md-9'>
                    <label className="form-label">{this.props.author}-reply</label>
                    <textarea
                      className="form-control ml-1 shadow-none textarea"
                      value={this.state.commentContent}
                      onChange={(event) => {
                        this.setState({ commentContent: event.target.value });
                      }}
                    ></textarea>
                    </div>
                  </div>
                  <div className="mt-2" style={{ float: "right" }}>
                    <button
                    className={`btn btn-success btn-sm shadow-none  ${(this.state.commentContent).trim().length === 0 ? "disabled" : ""}`}
                    
                      type="button"
                      onClick={() => this.createComment()}
                    >
                      Post comment
                    </button>
                    <button
                      className="btn btn-danger btn-sm shadow-none"
                      type="button"
                      onClick={() => this.setState({ openReply: false })}
                      style={{ marginLeft: "2px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
