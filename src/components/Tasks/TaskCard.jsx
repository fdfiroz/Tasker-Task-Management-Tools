import { useDrag } from "react-dnd";
import { MdOutlineDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

import { Button, Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import UpdateTask from "./UpdateTask";
import { useState } from "react";
const TaskCard = ({ task, handleRemove,  statusChange }) => {
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
    const handleUpdate = ()=>{
        setUpdateTaskOpen(!updateTaskOpen)
    }
    
    const [{ isDragging }, drag] = useDrag(()=> ({
        type: 'task',
        item: {id: task._id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      const remaining = Math.ceil(
        (new Date(task.dueDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
      const statuses = ["incomplete", "ongoing", "completed"];
      const changeableStatuses = statuses.filter(item => item !== task.status)
      return (
        <>
        <Card ref={drag} className={`untouchable cursor-grab ${isDragging ? "opacity-50" : "opacity-100"}`}>
          <CardBody >
            <div className="flex gap-2 justify-end">
              <IconButton variant="outlined" size="sm"
                
                onClick={() => handleUpdate(task._id)}
              >
                <MdEditSquare className="text-xl " />
              </IconButton>
              <IconButton variant="outlined" size="sm"
                onClick={() => handleRemove(task._id)}
              >
                <MdOutlineDelete className="text-xl text-red-600" />
              </IconButton>
            </div>
            <Typography variant="h5" >{task.title}</Typography>
            <Typography variant="paragraph">{task.description}</Typography>
            <div className="flex justify-start items-center gap-2">
              <Typography variant="small" className={`${task.status !== 'completed' && remaining <= 2 && `text-red-600`} ${task.status !== 'completed' && remaining < 4 && remaining > 2 && `text-yellow-600`} ${task.status !== 'completed' && remaining > 4 && `text-green-600`} ${task.status === 'completed' && 'text-black'}`}>
                Deadline: {task.dueDate} (
                {remaining > 0 ? remaining : -(remaining)}{" "}
                {`${remaining >= 0 && remaining <= 1 ? 'day left' : ''}`}{`${remaining > 1 ? 'days left' : ''}`}{`${remaining < 0 && remaining >= -1 ? 'day passed' : ''}`}{`${remaining <-1 ? 'days passed' : ''}`}){" "}
              </Typography>
              {
                task.priority === 'Low' && <Typography variant="small">Priority: <span className="text-green-600">{task.priority}</span></Typography> 
              }
              {
                task.priority === 'Medium' && <Typography variant="small">Priority: <span className="text-yellow-600">{task.priority}</span></Typography> 
              }
              {
                task.priority === 'High' && <Typography variant="small"> Priority: <span className="text-red-600">{task.priority}</span></Typography> 
              }
              
            </div>
            <div className="flex gap-2 flex-row md:flex-col">
              {changeableStatuses.map((item,index) => (
                <Button size="sm" className="lg:hidden" onClick={() => statusChange(task._id, item)} key={index}>{item === 'incomplete' && 'Set to To-Do'} {item === 'ongoing' && 'Set to Ongoing'} {item === 'completed' && 'Set to completed'}</Button>
              ))}
            </div>
          </CardBody>
        </Card>
        <UpdateTask open={updateTaskOpen} setOpen={setUpdateTaskOpen} task={task}/>
        </>

      );
}

export default TaskCard