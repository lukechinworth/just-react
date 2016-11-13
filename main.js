var el = React.createElement,
    cl = React.createClass,
    pt = React.PropTypes,
    CONTACT_TEMPLATE = {
        name: '',
        email: '',
        description: '',
        errors: {}
    },
    contacts = [
        {
            key: 1,
            name: "Bob",
            email: "bob@bbb.com",
            description: "Developer"
        },
        {
            key: 2,
            name: "Jim",
            email: "jim@jim.com",
            description: "Manager"
        },
        {
            key: 3,
            name: "Joe",
            email: "joe@joe.com"
        }
    ],
    Contact = cl({
        render: function() {
            return (
                el('li', {className:'Contact'},
                    el('h2', {
                        className:'Contact-name'
                    }, this.props.name),
                    el('a', {
                        href:'mailto:' + this.props.email,
                        className: 'Contact-email'
                    }, this.props.email),
                    el('p', {
                        className: 'Contact-description'
                    }, this.props.description)
                )
            );
        }
    }),
    ContactForm = cl({
        propTypes: {
            value: pt.object.isRequired,
            onChange: pt.func.isRequired,
            onSubmit: pt.func.isRequired
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
                el('form', {
                    className: 'ContactForm',
                    onSubmit: this.onSubmit
                },
                    el('input', {
                        type: 'text',
                        ref: 'name',
                        value: this.props.value.name,
                        placeholder: 'Name',
                        className: this.props.value.errors.name && 'ContactForm-error',
                        onChange: this.onNameChange,
                        autoFocus: true
                    }),
                    el('input', {
                        type: 'email',
                        ref: 'email',
                        value: this.props.value.email,
                        placeholder: 'Email',
                        className: this.props.value.errors.email && 'ContactForm-error',
                        onChange: this.onEmailChange
                    }),
                    el('textarea', {
                        value: this.props.value.description,
                        placeholder: 'Description',
                        onChange: this.onDescriptionChange
                    }),
                    el('button', {
                        type: 'submit'
                    }, 'Submit')
                )
            );
        },
        componentDidUpdate: function(prevProps) {
            if (Object.keys(this.props.value.errors).length) {
                if (this.props.value.errors.name) {
                    this.refs.name.focus();
                    return;
                }

                if (this.props.value.errors.email) {
                    this.refs.email.focus();
                    return;
                }
            }
        }
    }),
    ContactAppView = cl({
        propTypes: {
            contacts: pt.array.isRequired,
            newContact: pt.object.isRequired,
            onNewContactChange: pt.func.isRequired,
            onContactFormSubmit: pt.func.isRequired
        },
        onFormChange: function(value) {
            this.props.onNewContactChange(value);
        },
        render: function() {
            return (
                el('div', {},
                    el('h1', {}, 'Contacts'),
                    el('ul', {}, this.props.contacts.map(el.bind(null, Contact))),
                    el(ContactForm, {
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
    newContact: Object.assign({}, CONTACT_TEMPLATE)
});

function setState(newState) {
    Object.assign(state, newState);

    ReactDOM.render(
        el(ContactAppView, Object.assign({}, state, {
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
    var contact = Object.assign({}, state.newContact, {
        key: state.contacts.length + 1,
        errors: {}
    });

    if (! contact.name) {
        contact.errors.name = 'Contact name is required.'
    }

    if (! contact.email) {
        contact.errors.email = "Contact email address is required.";
    }

    if (! /.+@.+\..+/.test(contact.email)) {
        contact.errors.email = 'Please enter a valid email address.';
    }

    var newState = ! Object.keys(contact.errors).length
        ? {
            contacts: state.contacts.concat(contact),
            newContact: Object.assign({}, CONTACT_TEMPLATE)
        }
        : {
            newContact: contact
        };

    setState(newState);
}
