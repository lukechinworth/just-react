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
            onChange: React.PropTypes.func.isRequired
        },
        render: function() {
            return (
                React.createElement('form', {},
                    React.createElement('input', {
                        type: 'text',
                        value: this.props.value.name,
                        placeholder: 'Name',
                        onChange: function(syntheticEvent) {
                            this.props.value.name = syntheticEvent.target.value;
                            this.props.onChange(this.props.value);
                        }.bind(this)
                    }),
                    React.createElement('input', {
                        type: 'email',
                        value: this.props.value.email,
                        placeholder: 'Email',
                        onChange: function(syntheticEvent) {
                            this.props.value.email = syntheticEvent.target.value;
                            this.props.onChange(this.props.value);
                        }.bind(this)
                    }),
                    React.createElement('textarea', {
                        value: this.props.value.description,
                        placeholder: 'Description',
                        onChange: function(syntheticEvent) {
                            this.props.value.description = syntheticEvent.target.value;
                            this.props.onChange(this.props.value);
                        }.bind(this)
                    }),
                    React.createElement('button', {
                        type: 'submit'
                    }, 'Submit')
                )
            );
        }
    }),
    ContactView = React.createClass({
        propTypes: {
            onContactChange: React.PropTypes.func.isRequired
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
                        onChange: function(value) {
                            this.props.onContactChange(value);
                        }.bind(this)
                    })
                )
            );
        }
    });

ReactDOM.render(
    React.createElement(ContactView, {
        contacts: contacts,
        newContact: {},
        onContactChange: function(contact) {
            console.log(contact);
        }
    }),
    document.getElementById('react-app')
);
