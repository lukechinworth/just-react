var contacts = [
        {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
        {key: 2, name: "Jim", email: "jim@example.com"},
        {key: 3, name: "Joe"}
    ],
    Contact = React.createClass({
        render: function() {
            return (
                React.createElement('li', {className:'contact'},
                    React.createElement('h2', {className:'contact-name'}, this.props.name),
                    React.createElement('a', {href:'mailto:'+this.props.email}, this.props.email),
                    React.createElement('p', {}, this.props.description)
                )
            );
        }
    }),
    Contacts = contacts
        .filter(function(c) {
            return !!c.email;
        })
        .map(function(c) {
            return React.createElement(Contact, c);
        }),
    rootElement = React.createElement('div', {},
        React.createElement('h1', {}, 'Contacts'),
        React.createElement('ul', {}, Contacts)
    );

ReactDOM.render(rootElement, document.getElementById('react-app'));
