var contacts = [
        {
            key: 1,
            name: "James K Nelson",
            email: "james@jamesknelson.com",
            description: "Front-end Unicorn"
        },
        {
            key: 2,
            name: "Jim",
            email: "jim@example.com"
        },
        {
            key: 3,
            name: "Joe"
        }
    ],
    Contact = React.createClass({
        render: function() {
            return (
                React.createElement('li', {className:'Contact'},
                    React.createElement('h2', {
                        className:'Contact-name'
                    }, this.props.name),
                    React.createElement('a', {
                        href:'mailto:' + this.props.email,
                        className: 'Contact-email'
                    }, this.props.email),
                    React.createElement('p', {
                        className: 'Contact-description'
                    }, this.props.description)
                )
            );
        }
    }),
    ContactForm = React.createClass({
        propTypes: {
            value: React.PropTypes.object.isRequired,
            onChange: React.PropTypes.func.isRequired,
            onSubmit: React.PropTypes.func.isRequired
        },
        onSubmit: function(e) {
            e.preventDefault();
            this.props.onSubmit();
        },
        onNameChange: function(e) {
            this.props.value.name = e.target.value;
            this.props.onChange(this.props.value);
        },
        onEmailChange: function(e) {
            this.props.value.email = e.target.value;
            this.props.onChange(this.props.value);
        },
        onDescriptionChange: function(e) {
            this.props.value.description = e.target.value;
            this.props.onChange(this.props.value);
        },
        render: function() {
            return (
                React.createElement('form', {
                    onSubmit: this.onSubmit
                },
                    React.createElement('input', {
                        type: 'text',
                        value: this.props.value.name,
                        placeholder: 'Name',
                        onChange: this.onNameChange
                    }),
                    React.createElement('input', {
                        type: 'email',
                        value: this.props.value.email,
                        placeholder: 'Email',
                        onChange: this.onEmailChange
                    }),
                    React.createElement('textarea', {
                        value: this.props.value.description,
                        placeholder: 'Description',
                        onChange: this.onDescriptionChange
                    }),
                    React.createElement('button', {
                        type: 'submit'
                    }, 'Submit')
                )
            );
        }
    }),
    ContactAppView = React.createClass({
        propTypes: {
            onNewContactChange: React.PropTypes.func.isRequired,
            onContactFormSubmit: React.PropTypes.func.isRequired
        },
        onFormChange: function(value) {
            this.props.onNewContactChange(value);
        },
        render: function() {
            var Contacts = this.props.contacts
                .filter(function(c) {
                    return !!c.email;
                })
                .map(function(c) {
                    return React.createElement(Contact, c);
                });

            return (
                React.createElement('div', {},
                    React.createElement('h1', {}, 'Contacts'),
                    React.createElement('ul', {}, Contacts),
                    React.createElement(ContactForm, {
                        value: this.props.newContact,
                        onChange: this.onFormChange,
                        onSubmit: this.props.onContactFormSubmit
                    })
                )
            );
        }
    }),
    state = {};

setState({
    contacts: contacts,
    newContact: {}
});

function setState(newState) {
    Object.assign(state, newState);

    ReactDOM.render(
        React.createElement(ContactAppView, Object.assign({}, state, {
            onNewContactChange: updateNewContact,
            onContactFormSubmit: submitNewContact
        })),
        document.getElementById('react-app')
    );
}

function updateNewContact(contact) {
    setState({ newContact: contact });
}

function submitNewContact() {
    if (!state.newContact.name || !state.newContact.email) {
        return;
    }
    
    state.newContact.key = state.contacts.length + 1;

    setState({
        contacts: state.contacts.concat(state.newContact),
        newContact: {}
    });
}
