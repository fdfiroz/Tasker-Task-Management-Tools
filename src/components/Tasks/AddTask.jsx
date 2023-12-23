import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
  Option,
  Select,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";


const AddTask = ({open, setOpen, toDoRefetch}) => {
  const {user} = useAuth();
  const axios = useAxios();
  const { register, handleSubmit, reset } = useForm();

const [status, setStatus] = useState("");
const [priority, setPriority] = useState("");

  const onSubmit = async (data) => {
    data.assignedTo = user?.email;
    data.status = status;
    data.priority = priority;
    const res = await axios.post("/create-new-task", data);
    if (res.data.acknowledged) {
      toDoRefetch();
      reset();
      setOpen(!open)
      toast.success('Task Added');
    }
    console.log(data)
    

  };
  return (
    <>
        <Dialog
        size="sm"
        open={open}
        handler={()=>setOpen(!open)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start ">
        <Typography className="mb-1" variant="h4">
              Add Task
            </Typography>
        </DialogHeader>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={()=>setOpen(!open)}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
        <DialogBody >
        <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Add a new task to your board.
          </Typography>
          <div className="grid gap-6">
            <Input name="dueDate" type="date" label="Due Date"  {...register("dueDate")}/>
            <Input name="title" label="Task Name"  {...register("title")}/>
            <Textarea name="description" label="Description" {...register("description")}/>
            <Select name="status" size="md" label="Status" onChange={(e)=>setStatus(e)}>
                <Option value="incomplete" >Incomplete</Option>
                <Option value="ongoing">Ongoing</Option>
                <Option value="completed">Completed</Option>
            </Select>
            <Select name="priority" size="md" label="Priority" onChange={(e)=>setPriority(e)}>
                <Option value="High" >High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
         
          <Button type="submit"  variant="gradient" color="green" className="mr-1">
            <span>Confirm</span>
          </Button>
          <Button
            variant="text" color="red" onClick={()=>setOpen(!open)} 
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default AddTask