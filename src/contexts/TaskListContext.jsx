// ============================================================
import { useContext, createContext } from 'react';
import useLocalStorage from "use-local-storage";
// ============================================================
const TaskListGetContext = createContext([]);
export function UseTaskListGetContext() {
    return useContext(TaskListGetContext);
}

const TaskListAddContext = createContext(null);
export function UseTaskListAddContext() {
    return useContext(TaskListAddContext);
}

const TaskListModifyContext = createContext(null);
export function UseTaskListModifyContext() {
    return useContext(TaskListModifyContext);
}

const TaskListDeleteContext = createContext(null);
export function UseTaskListDeleteContext() {
    return useContext(TaskListDeleteContext);
}
// ============================================================
export function RenderTaskListContext({ children }) {
    const [taskList, setTaskList] = useLocalStorage("Tasks", []);

    function addNewTask(task) {
        const newTaskList = [...taskList, task];
        setTaskList(newTaskList);
    }

    function modifyTask(task) {
        const foundTaskIndex = taskList.findIndex((taskIter) => taskIter.id === task.id);
        taskList[foundTaskIndex] = task;

        setTaskList([...taskList]);
    }

    function deleteTask(task) {
        const foundTaskIndex = taskList.findIndex((taskIter) => taskIter.id === task.id);
        taskList.splice(foundTaskIndex, 1);

        setTaskList([...taskList]);
    }

    return (
        <TaskListGetContext.Provider value={taskList}>
            <TaskListAddContext.Provider value={(newTask) => addNewTask(newTask)}>
                <TaskListDeleteContext.Provider value={(task) => deleteTask(task)}>
                    <TaskListModifyContext.Provider value={(task) => modifyTask(task)}>
                        {children}
                    </TaskListModifyContext.Provider>
                </TaskListDeleteContext.Provider>
            </TaskListAddContext.Provider>
        </TaskListGetContext.Provider>
    );
}
// ============================================================