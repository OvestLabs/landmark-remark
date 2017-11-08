class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ""
		};

		const melbourne = { lat: -37.811263, lng: 144.963151 };
		this.location = melbourne;

		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleLocationError = this.handleLocationError.bind(this);
		this.handleMarkerMove = this.handleMarkerMove.bind(this);
		this.handleMarkerClick = this.handleMarkerClick.bind(this);
		this.handleCreateNote = this.handleCreateNote.bind(this);
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
		this.infoWindow = new google.maps.InfoWindow();
		this.locationMarker = new google.maps.Marker({
			position: this.location,
			map: this.map,
			optimized: false,
			zIndex: 0,
			icon: {
				url: "/assets/location-marker.svg",
				anchor: new google.maps.Point(50, 50)
			}
		});

		setTimeout(() => this.getNotes(), 250);
	}

	createMarker(note) {
		const position = {
			lat: note.latitude,
			lng: note.longitude
		};
		const marker = new google.maps.Marker({
			position: position,
			map: this.map,
			animation: google.maps.Animation.DROP,
			draggable: true
		});

		marker.note = note;

		const dragHandler = this.handleMarkerMove;
		const clickHandler = this.handleMarkerClick;

		google.maps.event.addListener(marker, "dragend", function (e) {
			dragHandler(marker, e);
		});

		google.maps.event.addListener(marker, "click", function(e) {
			clickHandler(marker, e);
		});
	}

	createMarkers(notes) {
		for (let i = 0; i < notes.length; i++) {
			const note = notes[i];
			const delay = 250 + i * 25;

			setTimeout(() => this.createMarker(note), delay);
		}
	}

	getNotes() {
		const url = "/notes";
		const options = {
			method: "GET",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			}
		};

		fetch(url, options)
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(json => this.createMarkers(json))
			.catch(error => console.error(error));
	}

	submitNote(note) {
		const url = "/notes";
		const options = {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(note)
		};

		console.log(options);

		fetch(url, options)
			.then(response => {
				console.log(response);
				//console.log(response.headers.get("location"));
				//response.headers.forEach((v, k) => console.log(k, v));
				return response.json();
			})
			.then(json => this.createMarker(json))
			.catch(error => console.error(error));
	}

	updateNote(marker, newNote) {
		const oldNote = marker.note;
		const url = `/notes/${oldNote.id}`;
		const options = {
			method: "PUT",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newNote)
		};

		console.log(options);

		fetch(url, options)
			.then(response => {
				console.log(response);
				marker.note = newNote;
			})
			.catch(error => console.error(error));
	}

	getUser(username, callback) {
		const url = `/users/${username}`;
		const options = {
			method: "GET",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			}
		};

		fetch(url, options)
			.then(response => {
				if (response.ok()) {
					return response.json();
				}
				return null;
			})
			.then(callback)
			.catch(error => callback(null));
	}

	createUser(username, callback) {
		const url = "/users";
		const user = {
			username: username
		};
		const options = {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		};

		fetch(url, options)
			.then(response => {
				if (response.status === 201) {
					return response.json();
				}

				return null;
			})
			.then(callback)
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

	handleMarkerMove(marker, e) {
		const latitude = e.latLng.lat();
		const longitude = e.latLng.lng();
		const newNote = Object.assign({}, marker.note);

		newNote.latitude = latitude;
		newNote.longitude = longitude;

		this.updateNote(marker, newNote);
	}

	handleMarkerClick(marker, e) {
		this.infoWindow.setContent(`<p style="max-width:200px">${marker.note.remarks}<p>`);
		this.infoWindow.open(this.map, marker);
	}

	handleCreateNote(note) {
		this.getUser(note.username, (existingUser) => {
			if (existingUser == null) {
				this.createUser(
					note.username,
					(newUser) => {
						const newNote = {
							userId: newUser.id,
							latitude: this.location.lat,
							longitude: this.location.lng,
							remarks: note.remarks
						};

						this.submitNote(newNote);
					});
			}
			else {
				const newNote = {
					userId: existingUser.id,
					latitude: this.location.lat,
					longitude: this.location.lng,
					remarks: note.remarks
				};

				this.submitNote(newNote);
			}
		});
	}

	render() {
		return (
			<div className="fullHeight">
				<div className="fullHeight"></div>
				<Menu onCreateNote={this.handleCreateNote} />
			</div>
		);
	}
}