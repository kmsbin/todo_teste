import React from 'react';
import { Button, } from 'reactstrap'
import '../App.css';
import { updateTodo} from "../services/api";
import toast from 'react-hot-toast';
import useTrait from "./useTrait";
import CustomToast from './Toast'



export default function UpdateToast(props) {
    let titleValue = useTrait('')
    let descValue = useTrait('')
    console.log()
    return (
    <>
    CustomToast()
    <Button className="update badge badge-default badge-pill" onClick={() => {
        // console.log('agfwadgasdg');
        // setprops.IndexUpdated(index)
        
        toast((t) => (
            <span>
              <span className="dialog-text">
                Quer mesmo deletar o item {props.item.title} ?
              </span>
              <div className='column-dialog'>
                <div className='row-dialog'>
                  <input onChange={(evt) => { titleValue.set(evt.target.value)}} placeholder="title"  />
                  <input placeholder="descrição" onChange={(e)=>{descValue.set(e.target.value)}} className="mt-1" />
                </div>
                <div className='flex-dialog' onClick={() => {}}>
                  <Button className="flex-item" onClick={() => {
                    console.log(titleValue.get())
                    const title = titleValue.get();
                    const desc = descValue.get();
                    toast.dismiss()
                    if (title !== '' && desc !== '') {
                      
                      const newRow = {
                        id: props.data[props.indexUpdated].id,
                        title: title,
                        description: desc,
                        priority: props.data[props.indexUpdated].priority
                        
                      }
                      let resp = updateTodo(newRow);
                      resp.then(()=>{
                        // fetchDataList();
                        let newTodoData = props.data;
                        newTodoData[props.indexUpdated].title = title;
                        newTodoData[props.indexUpdated].description = desc;
                        props.setData(newTodoData);
                        titleValue.set('');
    
                      })
                      // setUpdateDesc('');
                      // setUpdateTitle('');
                    }
                   
                  
                  }}>
                  Atualizar
                    </Button>
                  <button onClick={() =>{ 
                    toast.dismiss()
                    }}>Cancelar</button>
                  </div>
    
              </div>
            </span>
          ));    
        // toggle();

      }} >

      </Button>
    </>
      
      )
    
    
    
    
}