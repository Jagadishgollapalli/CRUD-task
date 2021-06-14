import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button ,Table,Form,FormGroup} from 'reactstrap';

const API_URL="https://jsonplaceholder.typicode.com/posts";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      id:"",
      userId:"",
      title:"",
      body:"",
      posts:[]
    };
  }
componentDidMount(){
  this.getPosts();
}
  //CREATE
  //Check JSON Placeholder url for Syntax 
  createPost=async()=>{
    const{data}= await axios.post(API_URL,
    {
    userId: this.state.userId,
    title: this.state.title,
    body: this.state.body
    });
    const posts=[...this.state.posts];
    posts.push(data);
    this.setState({posts});
  };
  //UPDATE
  UpdatePost=async()=>{
    const{data}= await axios.put(`${API_URL}/${this.state.id}`,
    {
    userId: this.state.userId,
    title: this.state.title,
    body: this.state.body
    });
    // console.log(data);
    const posts=[...this.state.posts];
    const postIndex=posts.findIndex(post=>post.id===this.state.id);
    posts[postIndex]=data;
    this.setState({posts});
  };

  //READ
getPosts=async()=>{
  const{data}= await axios.get(API_URL);
  this.setState({posts:data});
};

 //DELETE
  deletePost=async postId=>{
  await axios.delete(`${API_URL}/${postId}`);
  let posts=[...this.state.posts];
  posts=posts.filter(post =>post.id !== postId);
  this.setState({posts});
 };

 //HANDLE FUNCTION
handleChange=({target:{name,value}})=>{
  this.setState({[name]:value});
}
//ON - SUBMIT
handleSubmit=e=>{
  e.preventDefault();
  if(this.state.id){
    this.UpdatePost();
  }else{
    this.createPost();
  }
  this.setState({userId:'', title:'', body:''});
};

//SELECT-POST
selectPost=post=>{
  this.setState({...post});
}
  render () {
    return(
    <div>
      <h1> Fake API Data </h1>
      <Form onSubmit={this.handleSubmit}>
      {this.state.id && (
        <>
        <div>
        <label>POST ID:</label>
        <input 
        name="userId"
        type="text"value={this.state.id}disabled/>
        </div>
        </>
      )}
      <FormGroup>
        <div>
          <label>User Id:</label>      
          <input name="userId" type="text" value={this.state.userId} onChange={this.handleChange}/>
          </div>
          <br />
          <div>
          <label>Title:</label>
          <input name="title" type="text" value={this.state.title} onChange={this.handleChange}/>
          </div>
          <br />
          <div>
          <label>Body:</label>
          <input name="body" type="text" value={this.state.body} onChange={this.handleChange}/>
        </div>
        </FormGroup>
        <br />
        <div>
          <Button color='primary' type="submit">{this.state.id?'update':'Add'} Post</Button>
        </div>
      </Form>
      <br />
      <Table striped>
        <thead>
          <td>Id</td>
          <td>Title</td>
          <td>Body</td>
          <td>Action</td>
        </thead>
        <tbody>
            {this.state.posts.map(post=>{
              return(
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td><Button color="success" onClick={()=>this.selectPost(post)}>Edit</Button></td>
                  <td><Button color="danger" onClick={()=>this.deletePost(post.id)}>Delete</Button></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
    );
  }
  }
export default App;


