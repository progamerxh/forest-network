import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../Actions/PostAction'
import ReactDOM from 'react-dom';
class ContentEditable extends Component {
    constructor(props) {
        super(props);
        this.emitChange = this.emitChange.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }
    emitChange() {
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
    render() {
        return <div
            placeholder={"Just write it..."}
            className="text"
            onInput={this.emitChange}
            onBlur={this.emitChange}
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: this.props.html }}></div>;
    }
}
class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taglist: [],
            tagtext: '',
            text: '',
            file: null,
            previewImgUrl: null,
            isShowTag: false,
        };
        this.submitPostHandler = this.submitPostHandler.bind(this);
        this.submitTagHandler = this.submitTagHandler.bind(this);
        this.tagHandleChange = this.tagHandleChange.bind(this);
        this.textHandleChange = this.textHandleChange.bind(this);
        this.removeFileHandler = this.removeFileHandler.bind(this);
    }
    generatePreviewImgUrl(file, callback) {
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = e => callback(reader.result);
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return
        }
        this.generatePreviewImgUrl(file, previewImgUrl => {
            this.setState({ file, previewImgUrl });
        })
    }
    submitTagHandler(e) {
        e.preventDefault();
        const taglist = [...this.state.taglist, this.state.tagtext];
        this.setState({ taglist, tagtext: '' });
    }
    submitPostHandler() {
        if (this.state.text.trim() === "" && this.state.file === null)
            return;
        const post = {
            avatarUrl: this.props.auth.avatarUrl,
            displayName: this.props.auth.displayName,
            content: {
                text: this.state.text,
                photoUrl: "",
                taglist: this.state.taglist,
                timeuploaded: new Date(),
            },
            interaction: {
                faves: null,
                comments: null,
                shares: null,
            }
        };
        this.props.dispatch(submitPost(post));
        this.setState({ file: null, previewImgUrl: null, text: '', tagtext: '', taglist: [] });
    }
    textHandleChange(e) {
        this.setState({ text: e.target.value });
    }
    tagHandleChange(e) {
        this.setState({ tagtext: e.target.value });
    }
    removeFileHandler() {
        this.setState({ file: null, previewImgUrl: null });
    }
    removeTagHandler(index) {
        const taglist = this.state.taglist;
        taglist.splice(index, 1);
        this.setState({ taglist });
    }
    render() {
        return <div className="mid upload">
            <div className="user">
                <img className="avt" src={this.props.auth.avatarUrl} ></img>
                <div className="infor">
                    <div className="coin">
                        <i className="fa fa-gg-circle" ></i>
                        {this.props.auth.coin}
                    </div>
                </div>
            </div>
            <div className="content">
                <ContentEditable
                    html={this.state.html}
                    onChange={this.textHandleChange}  >
                </ContentEditable>
                {(this.state.isShowTag || this.state.taglist.length > 0) ? (
                    <div className="addtag" >
                        <table >
                            <tbody>
                                <tr>
                                    <td className="taglabel">Tag</td>
                                    <td className="">
                                        <div className="taglist">
                                            {this.state.taglist.map((tag, index) => {
                                                return <span key={index} className="tagitem">
                                                    {tag}
                                                    <i className="fa fa-times"
                                                        onClick={() => { this.removeTagHandler(index) }
                                                        }
                                                    ></i>
                                                </span>
                                            })
                                            }
                                            {(this.state.isShowTag) ?
                                                (
                                                    <form onSubmit={this.submitTagHandler}>
                                                        <input
                                                            onChange={this.tagHandleChange}
                                                            value={this.state.tagtext}
                                                            type="text"
                                                            placeholder="Put some tags..."
                                                        ></input>
                                                    </form>
                                                ) : (null)
                                            }

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (null)
                }

                {(this.state.previewImgUrl) ? (
                    <div className="previewimage">
                        <img className="photo" src={this.state.previewImgUrl} />
                        <i className="fa fa-times"
                            onClick={this.removeFileHandler}
                        ></i>
                    </div>
                ) : null
                }
                <div className="interaction">
                    <div className="hover uploadphoto">
                        <a >
                            <input id="uploadimage" type="file" onChange={this.fileChangedHandler} />
                            <label htmlFor="uploadimage">
                                <i className="fa fa-picture-o" ></i>
                                Upload photo
                        </label>
                        </a>
                    </div>
                    <div className="hover tag">
                        <a onClick={() => { this.setState({ isShowTag: !this.state.isShowTag }) }} >
                            <i className="fa fa-tag" ></i>
                            Add tag
                    </a>
                    </div>
                </div>
                <div onClick={this.submitPostHandler} className="post">
                    Post
            </div>
            </div>
        </div>
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};
export default connect(
    mapStateToProps
)(UploadForm)