import './Home.css';

import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { UseTaskListGetContext, UseTaskListDeleteContext } from '../contexts/TaskListContext';

export default function Home() {
    const taskList = UseTaskListGetContext();
    const deleteTask = UseTaskListDeleteContext();
    const navigate = useNavigate();

    return (
        <Container>
            <h1 className="my-3">Your TODOs are as follows:</h1>
            <Row>
                {taskList.length > 0 ? RenderTasks(taskList, deleteTask, navigate) : RenderEmptyTaskSection()}
            </Row>
        </Container>
    );
}

function RenderEmptyTaskSection() {
    return (
        <Col className="col-12">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title className="task-checkbox-title">
                        Let&apos;s Begin!
                    </Card.Title>

                    <Card className="my-2 task-description-container">
                        <Card.Text className="ms-2 my-1 task-description-text">
                            To add a New Task, simply click on the &quot;<b>Add New Todo</b>&quot; located at the top right of the page!
                        </Card.Text>
                    </Card>
                </Card.Body>
            </Card>
        </Col>
    );
}

function RenderTasks(taskList, deleteTask, navigate) {
    return taskList.map((task, iter) => RenderTask(task, iter, deleteTask, navigate));
}

function RenderTask(task, listPosition, deleteTask, navigate) {
    function modifyTask(taskID) {
        navigate('/edit', { state: { id: taskID } });
    }

    return (
        <Col key={`task-${listPosition}`} className="col-6">
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title className="task-checkbox-title">
                        {task.name}
                    </Card.Title>

                    <Card className="my-2 task-description-container">
                        <Card.Text className="ms-2 my-1 task-description-text">
                            {task.description}
                        </Card.Text>
                    </Card>

                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <Card.Text className="ms-2 my-1 task-status-header-text">
                            Status:&nbsp;
                        </Card.Text>
                        <Badge bg={task.isCompleted ? "success" : "danger"}
                            className="task-checkbox-text">{!task.isCompleted && "Not "} Completed
                        </Badge>

                        <Button variant="primary" className="ms-3 btn-sm rounded"
                            onClick={() => modifyTask(task.id)}>
                            Modify
                        </Button>

                        <Button variant="secondary" className="ms-3 btn-sm rounded"
                            onClick={() => deleteTask(task)}>
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}