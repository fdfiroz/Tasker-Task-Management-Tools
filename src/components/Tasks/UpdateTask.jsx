import React from "react";
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


const UpdateTask = ({open, setOpen}) => {
  return (
    <>
        <Dialog
        
        open={open}
        handler={()=>setOpen(!open)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
        <Typography className="mb-1" variant="h4">
              Update Task
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
        <form >
        <DialogBody>
        <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Update your task details below.
          </Typography>
          <div className="grid gap-6">
            <Input type="datetime-local" label="Due Date" />
            <Input label="Task Name" />
            <Textarea label="Description" />
            <Select defaultValue={"Todo"} size="md" label="Status">
                <Option value="Todo" >Todo</Option>
                <Option value="In-Progress">In-Progress</Option>
                <Option value="Completed">Completed</Option>
            </Select>
            <Select size="md" label="Priority">
                <Option value="High" >High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=>setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={()=>setOpen(!open)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default UpdateTask