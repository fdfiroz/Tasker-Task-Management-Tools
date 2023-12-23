import { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const UpdateTask = ({ open, setOpen, task, toDoRefetch }) => {
  const axios = useAxios();
  const [updateTask, setUpdateTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
    priority: task.priority,
  });

  useEffect(() => {
    const { _id, assignedTo, ...oldTask } = task
    setUpdateTask(oldTask)
  }, [task])
  console.log(updateTask)

  const onChange = (e) => {
    setUpdateTask({
      ...updateTask,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const  res = await axios.put(`/update-task/${task._id}`, updateTask);
    if (res.data.modifiedCount > 0) {
      toDoRefetch();
      setOpen(!open)
      toast.success('Task Updated');
    }
    console.log(res)
  }

  return (
    <>
      <Dialog

        open={open}
        handler={() => setOpen(!open)}
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
            onClick={() => setOpen(!open)}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
              Update your task details below.
            </Typography>
            <div className="grid gap-6">
              <Input onChange={onChange} value={updateTask.dueDate} name="dueDate" type="date" label="Due Date" />
              <Input onChange={onChange} value={updateTask.title} name="title" label="Task Name" />
              <Textarea onChange={onChange} value={updateTask.description} name="description" label="Description" />
              <Select
                onChange={(value) => {
                  console.log(value);
                  const e = {
                    target: {
                      name: "status",
                      value: value,
                    },
                  };
                  onChange(e);
                }}
                name="status" value={updateTask.status} size="md" label="Status">
                <Option value="incomplete" >Incomplete</Option>
                <Option value="ongoing">Ongoing</Option>
                <Option value="completed">Completed</Option>
              </Select>
              <Select
                onChange={(value) => {
                  console.log(value);
                  const e = {
                    target: {
                      name: "priority",
                      value: value,
                    },
                  };
                  onChange(e);
                }}
                name="priority" value={updateTask.priority} size="md" label="Priority">
                <Option value="High" >High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button type="submit" variant="gradient" color="green" className="mr-1">
              <span>Confirm</span>
            </Button>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpen(!open)}

            >
              <span>Cancel</span>
            </Button>

          </DialogFooter>
        </form>
      </Dialog>
    </>
  )
}

export default UpdateTask