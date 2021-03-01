import axios from "axios";

const getAllTodo = ()=>{
    const options = {
        url: 'https://todo-teste-api.herokuapp.com/',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin' : '*'
        },
      };

    return axios(options).then((data)=>{
        return data;
    }).catch((erro)=>{ console.error(erro) })
}

const deleteTodo = (data)=>{
  const options = {
      url: 'https://todo-teste-api.herokuapp.com/',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin' : '*'
      },
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        priority: data.priority
      }
    };

  return axios(options).then((data)=>{
      return data;
  }).catch((erro)=>{ console.error(erro) })
}
const updateTodo = (data)=>{
  console.log(data)
  const options = {
      url: 'https://todo-teste-api.herokuapp.com/',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin' : '*'
      },
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        priority: data.priority
      }
    };

  return axios(options).then((data)=>{
      return data;
  }).catch((erro)=>{ console.error(erro) })
}

const createTodo = (data)=>{
  console.log(data)
  const options = {
      url: 'https://todo-teste-api.herokuapp.com/',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin' : '*'
      },
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority
      }
    };

  return axios(options).then((data)=>{
      return data;
  }).catch((erro)=>{ console.error(erro) })
}


export {getAllTodo, deleteTodo, updateTodo, createTodo};