import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "../components/Tasks/TaskCard";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { Button, Card, Chip, List, ListItem, Typography } from "@material-tailwind/react";
import AddTask from "../components/Tasks/AddTask";
import Swal from "sweetalert2";

const Tasks = () => {
  const { user, loading } = useAuth();
  const axios = useAxios();
  const isMobile = window.innerWidth < 780;
  const [toDos, setToDos] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const handelAddTask = () => {
    setAddTaskOpen(!addTaskOpen)
  }
  
  const { data: toDoList, refetch: toDoRefetch } = useQuery({
    queryKey: ["allToDoTasks", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const data = await axios.get(
        `/all-to-do-tasks?email=${user?.email}`);
      return data.data;
    },
  });

  useEffect(() => {
    const filteredToDos = toDoList?.filter(
      (task) => task.status === "incomplete"
    );
    const filteredOngoing = toDoList?.filter(
      (task) => task.status === "ongoing"
    );
    const filteredCompleted = toDoList?.filter(
      (task) => task.status === "completed"
    );

    setToDos(filteredToDos);
    setOngoing(filteredOngoing);
    setCompleted(filteredCompleted);
  }, [toDoList]);
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Do you want to Delete Task?",
      showDenyButton: true,
      confirmButtonText: "Delete Now",
      denyButtonText: `Don't Delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`/delete-task/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Task Deleted");
        toDoRefetch();
      }
    });
      } else if (result.isDenied) {
        toast.error("Task are not Deleted")
      }
    });

   
  };

  const statuses = ["incomplete", "ongoing", "completed"];
  const statusChange = (id, newStatus) => {
    axios
      .put(`/update-task-status/${id}`, { status: newStatus })
      .then(async (res) => {
        if (res.data.modifiedCount > 0) {
          const taskResponse = await axios.get(`/view-task/${id}`);
          const {dueDate} = taskResponse.data;
          const remaining = Math.ceil(
            (new Date(dueDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )
          toast.success(`${newStatus === 'incomplete' ? `Task moved to To-Do List` : ``} ${newStatus === 'ongoing' ? `Task moved to Ongoing List` : ``} ${newStatus === 'completed' ? `Task moved to Complete List` : ``}. Deadline: ${remaining > 0 ? remaining : -(remaining)} ${remaining >= 0 && remaining <= 1 ? 'day left' : ''}${remaining > 1 ? 'days left' : ''}${remaining < 0 && remaining >= -1 ? 'day passed' : ''}${remaining <-1 ? 'days passed' : ''}`)
          toDoRefetch();
        }
      });
  };
  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <div className="max-w-[1440px] mx-auto px-10 mb-10">
          <div className="py-2  w-full flex items-center justify-between px-5 shadow-xl my-3 rounded-lg">
            <p className=" font-bold text-2xl">Tasks</p>
            <div className="flex items-center gap-4">
              <Button size="md" variant="gradient" className="rounded-full" onClick={handelAddTask}>
                + Add Task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {statuses.map((status, index) => (
              <Section
                key={index}
                status={status}
                tasks={toDoList}
                toDos={toDos}
                ongoing={ongoing}
                completed={completed}
                handleRemove={handleRemove}
                axios={axios}
                toDoList={toDoList}
                toDoRefetch={toDoRefetch}
                statusChange={statusChange}
              ></Section>
            ))}
          </div>
        </div>
      </DndProvider>
      <AddTask open={addTaskOpen} setOpen={setAddTaskOpen} toDoRefetch={toDoRefetch} />
    </>
  );
};

export default Tasks;

const Section = ({status,tasks,toDos, ongoing,completed,handleRemove, axios, toDoList, toDoRefetch, statusChange}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "todo";
  let bg;
  let textColor;
  let tasksToMap = toDos;
  if (status === "incomplete") {
    text = "To-Do";
    bg = 'bg-gradient-to-r from-[#4E65FF] to-[#A1C4FD]'
    textColor = 'text-white'
    tasksToMap = toDos;
  }
  if (status === "ongoing") {
    text = "Ongoing";
    bg = 'bg-gradient-to-r from-[#FF61D2] to-[#FE9090]'
    textColor = 'text-white'
    tasksToMap = ongoing;
  }
  if (status === "completed") {
    text = "Completed";
    bg = 'bg-gradient-to-r from-[#02AABD] to-[#00CDAC]'
    textColor = 'text-white'
    tasksToMap = completed;
  }
  const addItemToSection = (id) => {
    axios
      .put(`/update-task-status/${id}`, { status: status })
      .then(async (res) => {
        if (res.data.modifiedCount > 0) {
          const taskResponse = await axios.get(`/view-task/${id}`);
          const {dueDate} = taskResponse.data;
          const remaining = Math.ceil(
            (new Date(dueDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )
          toast.success(`${status === 'incomplete' ? `Task moved to To-Do List` : ``} ${status === 'ongoing' ? `Task moved to Ongoing List` : ``} ${status === 'completed' ? `Task moved to Completed List` : ``}. Deadline: ${remaining > 0 ? remaining : -(remaining)} ${remaining >= 0 && remaining <= 1 ? 'day left' : ''}${remaining > 1 ? 'days left' : ''}${remaining < 0 && remaining >= -1 ? 'day passed' : ''}${remaining <-1 ? 'days passed' : ''}`)
          toDoRefetch();
        }
      });
  };
  return (
    <div
      ref={drop}
      className={`w-full min-h-[300px] shadow-xl pb-5 rounded-lg ${
        isOver ? "bg-violet-100" : ""
      }`}
    >
      <Header text={text} bg={bg} textColor={textColor} count={tasksToMap?.length}></Header>
      <Card className={`flex flex-col justify-center items-center gap-6 mt-5 h`}>
        {tasksToMap?.length > 0 &&
          tasksToMap?.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              handleRemove={handleRemove}
              statusChange={statusChange}
              toDoRefetch={toDoRefetch}
            ></TaskCard>
          ))}
        {tasksToMap?.length === 0 && (
          <div className="flex w-full min-h-[200px] justify-center items-center">
            <img src={"https://img.icons8.com/ios/50/000000/select-none.png"} />
          </div>
        )}
      </Card>
    </div>
  );
};

const Header = ({ text, count, bg, textColor }) => {
  return (
    <List className={`text-center font-medium py-2 rounded-lg  ${bg} ${textColor} text-xl`}>
      <ListItem   className="flex justify-center items-center gap-3">
        <Typography variant="h5">{text}</Typography>
        <Chip variant="gradient" value={count||0} className="rounded-full" />

      </ListItem>
    </List>
  );
};