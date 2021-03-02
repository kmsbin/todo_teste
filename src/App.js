import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Badge, Row, Alert, Modal, ModalBody, ModalFooter, Card, Col, Input, } from 'reactstrap'
import './App.css';
import { getAllTodo, deleteTodo, updateTodo, createTodo } from "./services/api";
import { Scrollbars } from 'react-custom-scrollbars';
import toast, { Toaster } from 'react-hot-toast';
import CustomToast from './components/Toast'
import useTrait from "./components/useTrait";

// import "bootstrap";

function App() {

  const titleValue = useTrait(''); 
  const descValue = useTrait(''); 

  const [data, setData] = useState();
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [inputTitle, setInputTitle] = useState();
  const [inputDesc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const [indexUpdated, setIndexUpdated] = useState(0)


  const toggle = () => setOpen(!open);
  const handleSelectChange = ({ target: { value } }) => {
    setFocusAfterClose(JSON.parse(value));
  }

  const fetchDataList = async () => {
    const items = await getAllTodo();
    setData(items.data)
    console.log(items.data);
  }
  useEffect(() => {
    fetchDataList();
  }, [])
  let desc;
  let title;

  useEffect(()=>{

  })
  function returnList() {
    return data?.map((item, index) => {
      return <div className="rowItem container">
        <div className="row">

          {/* <div className="col-sm" >aggsa</div> */}
          <div className="col-sm checkbox-layout"> <Input type="checkbox" ></Input></div>
          <div className="todo col-sm">
            <div className="row">

              <div className="title text-truncate"> 
                <span style={{maxWidth: "10px"}} className="text-truncate">{item.title}</span>
              </div>
            </div>
            <div className="row">
              <div className="description"> <div className="text-truncate">  {item.description}</div></div>
            </div>

          </div>
          <Col className="badge-row col-md-auto justify-content-between">
            <div className="row-1 justify-content-between">

              <Button className="delete" key={item.id} onClick={() => {
                let isDelete = true;

                toast((t) => (
                  <span>
                    <span className="dialog-text">
                      Quer mesmo deletar o item {item.title} ?
                    </span>
                    <div className='flex-dialog'>
                      <button className="flex-item" onClick={() => {
                        isDelete = true
                        toast.dismiss(t.id)
                        let resp = deleteTodo({
                          id: item.id,
                          title: item.title,
                          description: item.description,
                          priority: item.priority
                        });
                        setData(data.filter((items) => { return item !== items }));

                      }}>
                        Sim
                        </button>

                      <button onClick={() => toast.dismiss()}>Não</button>

                    </div>
                  </span>
                ));
                if (isDelete) {

                }
              }} color="primary" size="sm" pill="true"></Button>

            </div>
            <div className="row-1 justify-content-between">

              <Button className="update badge badge-default badge-pill" onClick={() => {
                toast((t) => (
                  <span>
                    <span className="dialog-text">
                      Atualizar item: {item.title}
                    </span>
                    <div className='column-dialog'>
                      <div className='row-dialog'>
                        <input onChange={(evt) => { titleValue.set(evt.target.value)}} placeholder="novo titulo"  />
                        <input placeholder="nova descrição" onChange={(e)=>{descValue.set(e.target.value)}} className="mt-1" />
                      </div>
                      <div className='flex-dialog' onClick={() => {}}>
                        <Button className="flex-item" onClick={() => {
                          console.log(titleValue.get())
                          const title = titleValue.get();
                          const desc = descValue.get();
                          toast.dismiss()
                          if (title !== '' && desc !== '') {
                            
                            const newRow = {
                              id: data[indexUpdated].id,
                              title: title,
                              description: desc,
                              priority: data[indexUpdated].priority
                              
                            }
                            let resp = updateTodo(newRow);
                            resp.then(()=>{
                              // fetchDataList();
                              let newTodoData = data;
                              newTodoData[indexUpdated].title = title;
                              newTodoData[indexUpdated].description = desc;
                              setData(newTodoData);
                              titleValue.set('');

                            })
                            // setUpdateDesc('');
                            // setUpdateTitle('');
                          }
                         
                        
                        }}>
                        Sim
                          </Button>
                        <button onClick={() =>{ 
                          toast.dismiss()
                          }}>Não</button>
                        </div>

                    </div>
                  </span>
                ));
                
                // toggle();
                setIndexUpdated(index)

              }} >

              </Button>
            </div>

          </Col>
        </div>
      </div>

    })
  }

  return (
    <>
      
      <Card className='main'>
        <p>Lista de tarefas</p>
        <div className='card-table'>
          <div className='card-main'>
            <Scrollbars autoHide >
              {returnList()}
              <Alert>


              </Alert>
            </Scrollbars>
          </div>
          <div className="container-buttons">

            <Input 
              value={input} 
              className="in" 
              onChange={(evt) => { 
                setInput(evt.target.value); 
                setInputTitle(evt.target.value) 
              }} 
              placeholder="titulo" />
            <Input 
            value={description} 
            className="in" 
            onChange={(evt) => { 
              setDescription(evt.target.value); 
              setDesc(evt.target.value) }} 
            placeholder="descrição" />
            <Button
              onClick={() => {
                let resp = createTodo({
                  title: inputTitle,
                  description: inputDesc,
                  priority: 90
                })
                setInput('');
                setDescription('');
                toast.promise(resp, {
                  loading: 'Cadastrando...',
                  success: <b>Tarefa cadastrada</b>,
                  error: <b>Tarefa não cadastrada.</b>,
                })
                resp.then(() => {
                  fetchDataList();

                })

                console.log(resp)
              }}
              color="primary">adicionar</Button>
          </div>
        </div>
        {CustomToast()}
      </Card>
    </>
  );
}


export default App;
