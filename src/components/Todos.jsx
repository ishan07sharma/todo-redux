import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import {removeTodo,updateTodo} from '../features/todo/todoSlice';



function Todos() {
    const todos=useSelector(state=>state.todos)
    const [isTodoEditable,setIsTodoEditable]=useState(false)
    const [todoMsg,setTodoMsg]=useState({})
    const dispatch=useDispatch()
    const editTodo=(e)=>{
      e.preventDefault()
      dispatch(updateTodo(todoMsg))
      setIsTodoEditable(false)
    }
    

    useEffect(() => {
      localStorage.setItem("todos",JSON.stringify(todoMsg))
      
    }, [todoMsg])

    useEffect(() => {
      const todos=JSON.parse(localStorage.getItem("todos"))
      if(todos){
        setTodoMsg(todos)
  
      }
  
    }, [])
    

    return (
        <>
        <div className='font-bold text-xl mt-4'>Todos</div>
        <ul className="list-none">
            {todos.map((todo) => (
              <li
                className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                key={todo.id}
              >   <div className='text-white'>
                  <button
                  onClick={()=>setIsTodoEditable(true)}
                  >
                  <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  </div>
                <div className='text-white'>{ !isTodoEditable?todo.text:
                <form onSubmit={(e)=>editTodo(e)}>
                <input  id={todo.id} className="bg-black" type="text" defaultValue={todo.text}
                  onChange={(e)=>setTodoMsg({id:e.target.id,text:e.target.value})} readOnly={!setIsTodoEditable}   >

                </input>
                </form>
                }
                </div>
                
                

                

                <button
                 onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </>
      )
    }


export default Todos