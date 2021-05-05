import React, { Component } from 'react'
import Axios from 'axios'
import Modal from "react-modal";


class Home extends Component {

constructor(props) {
    super(props)

    this.state = {
         userList:[],
         show:false,

         modalUserID : '',
         modalID:"",
         modalTitle:'',
         modalBody:'',

    }
}

async componentDidMount(){
    try{
         const response = await Axios.get('https://jsonplaceholder.typicode.com/posts')

        this.setState({
            userList:response.data
        })
    }
    catch(err){
        throw err
    }
}
addCandidate=(id)=>{
   const userInfo = this.state.userList.find(p => p.id === id)

    this.setState({
        show:true,
        modalUserID : userInfo.userId,
         modalID:userInfo.id,
         modalTitle:userInfo.title,
         modalBody:userInfo.body,
    })
}

deleteCandidate = (id) =>{
    const deletedUserList = this.state.userList.filter(p=>p.id !== id)
    this.setState({
        userList:deletedUserList
    })
}
handleClose = ()=>{
    this.setState({
        show:false
    }) 
} 

submitForm = (e) => {
    e.preventDefault();

    const submitOutput = {
          id: this.state.modalID,
          title: this.state.modalTitle ,
          body: this.state.modalBody,
          userId: this.state.modalUserID 
        }
        
      console.log("Expected Output : ",submitOutput)
      this.setState({
        show:false
    })
 
  };
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSelected = (e)=>{
    this.setState({
        selected: e.target.checked,
      });
  }
    render() {
        if(this.state.visible){
            setTimeout(
                () => this.setState({ visible: false }), 
                2000
              );
        }
        
  
        const {userList,modalUserID,
            modalID,
            modalTitle,
            modalBody} = this.state
        return (
            <div>
                  <Modal
            isOpen={this.state.show}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: "grey",
              },
              content: {
                left: "25%",
                right: "25%",
              },
            }}
          >
            <button type="button" className="close" onClick={this.handleClose}>
              &times;
            </button>
            <form
              method="post"
              noValidate
              className="form-horizontal"
              onSubmit={this.submitForm}
              encType="multipart/form-data"
            >
              
              <div className="form-group">
                <div className="form-group">
                  <label
                    htmlFor="Name"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>userID</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="modalUserID"
                    value={modalUserID}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="Email"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Email</b>
                  </label>
                  <input
                    type="ID"
                    placeholder="Enter ID"
                    name="modalID"
                    value={modalID}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="Number"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Title</b>
                  </label>
                  <input
                    type="title"
                    placeholder="Enter Title"
                    name="modalTitle"
                    value={modalTitle}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="City"
                    className="col-sm-4 control-label text-center required"
                  >
                    <b>Body</b>
                  </label>
                  <textarea
                    type="body"
                    placeholder="Enter Body"
                    name="modalBody"
                    value={modalBody}
                    required
                    className="col-sm-4"
                    onChange={this.onchange}
                  />
                </div>
                
                
                
                <div className={`form-group`} style={{textAlign:'center'}}>
                  <button className="btn btn-success button-margin" type="submit">
                   Submit
                  </button>

                  <button
                    className="btn btn-danger button-margin"
                    onClick={this.handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </Modal>
                <div className="container">
  <h2>Data Table</h2>
  {/* <button onClick={this.addCandidate}>Add New Candidate</button>             */}
  <table className="table table-striped"  style={{border:'1px solid'}}>
    <thead className="bg-head">
      <tr>
      <th className="border-right">S.No</th>
        <th className="border-right">userID</th>
        <th className="border-right"> ID</th>
        <th className="border-right">title</th>
        <th className="border-right">body</th>
        <th className="border-right">Action</th>
        </tr>
    </thead>
    <tbody >
    {userList.map((can,index)=>
      <tr key ={can.id}>
      <td className="border-right">{index+1}</td>
        <td className="border-right">{can.userId}</td>
        <td className="border-right">{can.id}</td>
        <td className="border-right">{can.title}</td>
        <td className="border-right">{can.body}</td>
        <td style={{display:'flex'}}>
        <a
                                        className="text-primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit"
                                        style={{
                                          fontSize: "1.5rem",
                                          marginRight: "5px",
                                        }}
                                        data-original-title="Edit"
                                        onClick={ () => this.addCandidate(can.id)}
                                      >
                                        <i
                                          className="fa fa-edit"
                                          aria-hidden="true"
                                          dataaction="Edit"
                                        ></i>
                                      </a>
                                      <a
                                        className="text-danger"
                                        style={{ fontSize: "1.5rem" }}
                                      >
                                        <i
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Delete"
                                          className="fa fa-trash-o deleteicon"
                                          aria-hidden="true"
                                          data-original-title="Delete"
                                          onClick={ () => this.deleteCandidate(can.id)}
                                        ></i>
                                      </a></td>

      </tr>)}
    </tbody>
  </table>
</div>
            </div>
        )
    }
}

export default Home
