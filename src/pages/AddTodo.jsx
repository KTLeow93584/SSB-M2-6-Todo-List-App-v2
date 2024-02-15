import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { UseTaskListAddContext } from '../contexts/TaskListContext.jsx';

export default function AddTodo() {
    const appendTaskToList = UseTaskListAddContext();
    const navigate = useNavigate();

    return (
        <Container fluid>
            <div className="bg-info mx-2 rounded">
                {RenderHeader()}
                {RenderForm(appendTaskToList, navigate)}
            </div>
        </Container>
    );
}

function RenderHeader() {
    return (
        <Row className="ms-3">
            <Col className="col-12 mt-2">
                <h2 className="fw-bold">Add Todo</h2>
            </Col>
        </Row>
    );
}

function RenderForm(appendTaskToList, navigate) {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskIsCompleted, setTaskIsCompleted] = useState(false);

    function onSubmitNewTask(event) {
        event.preventDefault();

        const newTask = {
            id: Date.now(),
            name: taskName,
            description: taskDescription,
            isCompleted: taskIsCompleted
        };

        // Debug
        //console.log("New Task.", newTask);

        appendTaskToList(newTask);
        navigate('/');
    }
    return (
        <Row className="mx-3" onSubmit={(event) => onSubmitNewTask(event)}>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="form-task-title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" placeholder="Enter task name"
                        onChange={(event) => setTaskName(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-task-description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required type="text" placeholder="Enter task description"
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