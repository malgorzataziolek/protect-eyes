import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
	state = {
		status: 'off',
		time: 1200,
		timer: '',
	};

	step = () => {
		const newTime = this.state.time - 1;

		this.setState({
			time: newTime,
		});

		if (this.state.time === 0) {
			switch (this.state.status) {
				case 'work':
					this.setState({
						time: 20,
						status: 'rest',
					});
					break;
				case 'rest':
					this.setState({
						time: 1200,
						status: 'work',
					});
					break;
			}
		}
	};
	render() {
		const { status, time, timer } = this.state;

		function formatTime(time) {
			let minutes = Math.floor(time / 60);
			let seconds = Math.floor(time - minutes * 60);

			if (minutes < 10) minutes = '0' + minutes.toString();
			if (seconds < 10) seconds = '0' + seconds.toString();

			return minutes + ' : ' + seconds;
		}
		const startTimer = () => {
			this.setState({
				timer: setInterval(this.step, 1000),
				time: 1200,
				status: 'work',
			});
		};
		const stopTimer = () => {
			clearInterval(timer);
			this.setState({
				status: 'off',
			});
		};
		return (
			<div>
				<h1>Protect your eyes</h1>
				{status === 'off' && (
					<div>
						<p>
							According to optometrists in order to save your eyes, you should
							follow the 20/20/20. It means you should to rest your eyes every
							20 minutes for 20 seconds by looking more than 20 feet away.
						</p>
						<p>
							This app will help you track your time and inform you when it's
							time to rest.
						</p>
					</div>
				)}
				{status === 'work' && <img src='./images/work.png' />}
				{status === 'rest' && <img src='./images/rest.png' />}
				{status !== 'off' && <div className='timer'>{formatTime(time)}</div>}
				{status === 'off' && (
					<button onClick={() => startTimer()} className='btn'>
						Start
					</button>
				)}
				{status !== 'off' && (
					<button onClick={() => stopTimer()} className='btn'>
						Stop
					</button>
				)}
				<button onClick={() => window.close()} className='btn btn-close'>
					X
				</button>
			</div>
		);
	}
}

render(<App />, document.querySelector('#app'));
