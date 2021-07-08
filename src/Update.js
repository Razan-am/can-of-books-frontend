import React, { Component } from 'react'
import {Button,Modal} from "react-bootstrap"

export class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }}

    handleModal(){
        this.setState({show:!this.state.show})


    }
    
    

    render() {
        // console.log('sksajsaojasjasj',this.props.newNameBook)
        // console.log('sksajsaojasjasj',this.props.insetName)
  
        return (
            <div>
                <Button variant="warning" onClick={()=>{this.handleModal()}}>Update</Button>
                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>{this.props.newNameBook}</Modal.Header>
                    <Modal.Body>
                        <form className="update-form" onSubmit={(e)=>this.props.updateBook(e,this.props.book_id)}>
                            <label>Name:</label>
                            <input type="text" onChange={(e)=>this.props.insetName(e)} placeholder={this.props.newNameBook}></input><br></br>
                            <label>Decription:</label>
                            <input type="text" onChange={(e)=>this.props.insertDescription(e) } placeholder={this.props.newDescriptionBook}></input><br></br>
                            <label>Status:</label>
                            <input type="text" onChange={(e)=>this.props.insertStatus(e)}placeholder={this.props.newStatusBook}></input>
                            <br></br>
                            <button type="submit" onClick={()=>{this.handleModal()}}>Update Book</button>
                        </form>
                    </Modal.Body>
            </Modal>
            </div>
        )
    }
}

export default Update
