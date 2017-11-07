class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ""
		};

		const melbourne = { lat: -37.811263, lng: 144.963151 };
		this.location = melbourne;

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				this.initMap();
			});
		}
		else {
			this.initMap();
		}
	}

	initMap() {
		const container = ReactDOM.findDOMNode(this).children[0];
		const options = {
			center: this.location,
			zoom: 15
		};

		const map = new google.maps.Map(container, options);
		const marker = new google.maps.Marker({
			position: this.location,
			map: map
		});
	}

	submitNote(location, note) {
		const url = "/notes";
		const payload = {
			latitude: location.lat,
			longitude: location.lng,
			remark: note
		};

		//const data = new FormData();
		//data.append("json", JSON.stringify(payload));

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		};

		console.log(options);

		fetch(url, options)
			.then(response => { })
			.catch(error => console.error(error))
		;
	}

	handleTextChange(e) {
		const newText = e.currentTarget.value;

		this.setState({
			text: newText
		});
	}

	handleKeyUp(e) {
		if (e.key !== "Enter") {
			return;
		}

		e.currentTarget.blur();

		this.submitNote(this.location, this.state.text);
	}

	render() {
		return (
			<div className="fullHeight">
				<div className="fullHeight"></div>
				<div className="menu">
					<input
						type="text"
						value={this.state.text}
						onChange={this.handleTextChange}
						onKeyUp={this.handleKeyUp}
						placeholder="enter note here..." />
				</div>
			</div>
		);
	}
}