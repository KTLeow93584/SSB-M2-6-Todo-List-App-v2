import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { UseTaskListGetContext, UseTaskListModifyContext } from '../contexts/TaskListContext.jsx';

export default function EditTodo() {

    return (
        <Container fluid>
            <div className="bg-info mx-2 rounded">
                {RenderHeader()}
                {RenderForm()}
            </div>
        </Container>
    );
}

function RenderHeader() {
    return (
        <Row className="ms-3">
            <Col className="col-12 mt-2">
                <h2 className="fw-bold">Modify an Existing Todo Task</h2>
            </Col>
        </Row>
    );
}

function RenderForm() {
    const location = useLocation();
    const taskList = UseTaskListGetContext();
    const task = taskList.find((taskIter) => taskIter.id === location.state.id);

    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskIsCompleted, setTaskIsCompleted] = useState(task.isCompleted);

    const modifyTask = UseTaskListModifyContext();
    const navigate = useNavigate();

    function onSubmitModifiedTask(event) {
        event.preventDefault();

        const newTask = {
            id: task.id,
            name: taskName,
            description: taskDescription,
            isCompleted: taskIsCompleted
        };

        // Debug
        //console.log("Modify Task.", newTask);

        modifyTask(newTask);
        navigate('/');
    }
    return (
        <Row className="mx-3" onSubmit={(event) => onSubmitModifiedTask(event)}>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="form-task-title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" placeholder="Enter task name"
                        defaultValue={taskName}
                        onChange={(event) => setTaskName(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-task-description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required type="text" placeholder="Enter task description"
                        defaultValue={taskDescription}
                        onChange={(event) => setTaskDescription(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-task-description">
                    <Form.Check type="checkbox" id="form-task-completed" label="Mark as Completed"
                        checked={taskIsCompleted}
                        onChange={(event) => setTaskIsCompleted(event.target.checked)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Row>
    );
}