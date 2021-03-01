import logo from './logo.svg';
import {Button,Row, Alert,Modal, ModalBody, ModalFooter, Card, Col, Input, Table } from 'reactstrap'
import './App.css';
import { Badge } from '@material-ui/core';
import { getAllTodo, deleteTodo, updateTodo, createTodo } from "./services/api";
import { Scrollbars } from 'react-custom-scrollbars';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [inputTitle, setInputTitle] = useState();
  const [inputDesc, setDesc] = useState("");
  const [updateTitle, setUpdateTitle] = useState();
  const [updateDesc, setUpdateDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const [indexUpdated, setIndexUpdated] = useState(0) 


  const toggle = () => setOpen(!open);
  const handleSelectChange = ({target: { value }}) => {
      setFocusAfterClose(JSON.parse(value));
  }


  useEffect(()=>{
    (async ()=>{
      const items = await getAllTodo();
      setData(items.data)
      console.log(items.data);
    }
    )()
  },[])


  return (
    <>
        <Modal className="custom-modal-style" isOpen={open}>
        <ModalBody>
          <h4>atualizar todo</h4>
          <Input onChange={(e)=>{ setUpdateTitle(e.target.value) }} placeholder="title" className="mt-1"/>
          <Input onChange={(e)=>{ setUpdateDesc(e.target.value) }} placeholder="descrição"  className="mt-1"/>
        </ModalBody>
        <ModalFooter>

            <Button onClick={()=>{
              if(updateTitle !== '' && updateDesc!=='') {

                const newRow = {
                  id: data[indexUpdated].id,
                  title: updateTitle,
                  description: updateDesc,
                  priority: data[indexUpdated].priority
                  
                }
                let resp = updateTodo(newRow);
                data[indexUpdated].title = updateTitle;
                data[indexUpdated].description = updateDesc;               
                toggle(); 
              }
              toggle();


            }} className="mt-1" color="primary">enviar</Button>
        </ModalFooter>
    </Modal>
    <Card className='main'>
            <div className='card-table'>
            <p>associados</p>
            <div className="table">
            <Scrollbars autoHide >
                <Table striped>
                {/* <thead>
                    <tr>
                        <th>Socio</th>
                        <th>Clube</th>
                        <th>Delete</th>
                    </tr>
                </thead> */}
                <tbody>
                { data?.map((item, index) => {
                    return <tr className="itemParent">
                      <td><Input type="checkbox" /></td>
                      <td className="container">
                        <tr className="title"> <h2> {item.title}</h2></tr>
                        <tr className="description"> <h6>{item.description}</h6></tr>  

                      </td>
                      <td>
                        <Col>
                        <Badge onClick={()=> {
                          let resp = deleteTodo({
                            id:item.id,
                            title: item.title,
                            description: item.description,
                            priority: item.priority
                          });
                          setData(data.filter((items)=>{return item !== items }));

                        }} className="btnDelete"color="primary">delete</Badge>
                        </Col>

                      </td>
                      <td >
                      <Badge onClick={()=>{
                        toggle();
                        setIndexUpdated(index)
  
                      }} className="btUpdate" color="warning">
                        update
                      </Badge>

                      </td>
                    </tr>
               
               })}



                {/* <tr>
                    <td>gfs</td>
                    <td>gfs</td>
                    <td>gfs</td>
                  </tr> */}
                </tbody>
                </Table>
                </Scrollbars>
            </div>
            <Row> 
              <Input onChange={(evt)=>{ setInputTitle(evt.target.value) }} placeholder="title" mt-1 ml-1 className="mt-3 ml-1" />
              <Input onChange={(evt)=>{ setDesc(evt.target.value) }} placeholder="description" className="mt-3" /> 
              <Button 
              onClick={()=>{ 
                let resp= createTodo({
                  title: inputTitle,
                  description: inputDesc,
                  priority: 90
                })
                console.log(resp)
               }}
              className="mt-3" color="primary">Add</Button>
            </Row>
            <Alert>


            </Alert>
            

            </div>
        </Card>
        </>
  );
}

export default App;
