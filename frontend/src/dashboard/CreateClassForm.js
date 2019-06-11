import React, {useState} from 'react';
import {Button, Form, Message} from 'semantic-ui-react';

import {classCreateRequestor} from '../requests/requestBuilder';

export const CreateClassForm = props => {
    const [isFormOpen, toggleForm] = useState(false);
    const [className, setClassName] = useState('');
    const [createSuccess, showMessage] = useState(false);
    const [createFail, showError] = useState(false);

    const createClass = () => {
        for(var c in props.classes){
            if(props.classes[c].classname == className){
            showError(true);
            return;
            }
        }
        classCreateRequestor(className, localStorage.getItem('userid'))
            .then(response => {
            props.refreshClasses();
            showMessage(true);
            showError(false);
            })
            .catch(error => {
            console.error(error);
            });
        toggleForm(false);
    };

    return (
        <div>
            {isFormOpen ? (
                <Form inline inverted size="big">
                    <Form.Group>
                        <Form.Input
                            placeholder="Please enter a class name"
                            onChange={event => setClassName(event.target.value)}
                            width={6}
                        />
                        <Button inverted size="big" type="submit" onClick={createClass}>
                        Submit
                        </Button>
                        <Button id="cancel-btn" inverted size="big" onClick={() => toggleForm(false)}>
                        Cancel
                        </Button>
                    </Form.Group>
                </Form>
            ) : (
                <Button inverted size="big" onClick={() => {
                    toggleForm(true);
                    showMessage(false);
                }}>
                    Create class
                </Button>
            )}
            {createFail ? (
                <Message
                onDismiss={() => showError(false)}
                header='Class already exists.'
                error
                />
            ): ''}
            {createSuccess ? (
                <Message
                onDismiss={() => showMessage(false)}
                header='Success!'
                success
                />
            ): ''}
        </div>
    )
};

export default CreateClassForm;