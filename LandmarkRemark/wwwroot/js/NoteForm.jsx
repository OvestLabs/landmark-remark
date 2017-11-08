class NoteForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			remarks: "",
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleRemarkChange = this.handleRemarkChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	handleUsernameChange(e) {
		const newValue = e.currentTarget.value;

		this.setState({
			username: newValue
		});
	}

	handleRemarkChange(e) {
		const newValue = e.currentTarget.value;

		this.setState({
			remarks: newValue
		});
	}

	handleKeyUp(e) {
		if (e.key !== "Enter") {
			return;
		}

		const username = this.state.username.trim();
		const remarks = this.state.remarks.trim();

		if (username === "" || remarks === "") {
			return;
		}

		e.currentTarget.blur();

		const data = {
			username: this.state.username,
			remarks: this.state.remarks
		}

		this.setState({
			remarks: ""
		});

		if (typeof this.props.onCreateNote === "function") {
			this.props.onCreateNote(data);
		}
	}

	render() {
		return (
			<div className="note-form centered-content">
				<input
					className="username"
					type="text"
					value={this.state.username}
					onChange={this.handleUsernameChange}
					onKeyUp={this.handleKeyUp}
					placeholder="Your username" />
				<input
					type="text"
					value={this.state.remarks}
					onChange={this.handleRemarkChange}
					onKeyUp={this.handleKeyUp}
					placeholder="Location remarks..." />
			</div>
		);
	}
};

NoteForm.defaultProps = {
	onCreateNote: function () { },
};