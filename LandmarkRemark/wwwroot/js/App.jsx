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
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleLocationError = this.handleLocationError.bind(this);
	}

	componentDidMount() {
		if (navigator.geolocation) {
			const options = {
				enableHighAccuracy: true,
				maximumAge: 5000
			};

			navigator.geolocation.getCurrentPosition(
				this.handleLocationChange,
				this.handleLocationError,
				options);

			this.watchNumber = navigator.geolocation.watchPosition(
				this.handleLocationChange,
				this.handleLocationError,
				options);
		}
		else {
			this.initMap();
		}
	}

	componentWillUnmount() {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(this.watchNumber);
		}
	}

	initMap() {
		if (this.map) {
			this.map.panTo(this.location);
			this.locationMarker.setPosition(this.location);
			return;
		}

		const container = ReactDOM.findDOMNode(this).children[0];
		const options = {
			center: this.location,
			zoom: 15
		};

		this.map = new google.maps.Map(container, options);
		this.locationMarker = new google.maps.Marker({
			position: this.location,
			map: this.map,
			optimized: false,
			icon: {
				url: "/assets/location-marker.svg",
				anchor: new google.maps.Point(50, 50)
			}
		});
	}

	createMarker(position) {
		const marker = new google.maps.Marker({
			position: position,
			map: this.map,
			animation: google.maps.Animation.DROP
		});
	}

	submitNote(position, note) {
		const url = "/notes";
		const payload = {
			latitude: position.lat,
			longitude: position.lng,
			remarks: note
		};

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
			.then(response => {
				console.log(response);
				this.createMarker(position);
			})
			.catch(error => console.error(error));
	}

	handleLocationChange(location) {
		this.location = {
			lat: location.coords.latitude,
			lng: location.coords.longitude
		};

		this.initMap();
	}

	handleLocationError(error) {
		alert(`Error '${error.code}': ${error.message}`);
		this.initMap();
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