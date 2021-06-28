
const App = React.createClass({
    render: () => {
        return (
            <div onKeyUp={keyUpSpace} id="game-app">
                <Game />
            </div>
        );
    }
});
const Game = React.createClass({
    render: () => {
        return (
            <div className="background-app">
                <Bird />
                <Pipe_Top />
                <Pipe_Bottom />
                <Foreground />
                <Scores />
                <ButtonMusic />
                <Tutorial />
            </div>
        )
    }
});
const Bird = React.createClass({
    render: () => {
        return (
            <div className="bird"></div>
        )
    }
});
const Pipe_Top = React.createClass({
    render: () => {
        return (
            <div className="pipe-top-item">
                <div className="pipe-top"></div>
            </div>
        )
    }

});
const Pipe_Bottom = React.createClass({
    render: () => {
        return (
            <div className="pipe-bottom-item">
                <div className="pipe-bottom"></div>
            </div>
        )
    }

});
const Foreground = React.createClass({
    render: () => {
        return (
            <div className="foreground"></div>
        )
    }

});
const Scores = React.createClass({
    render: () => {
        return (
            <div className="scores">
                <b>Scores: <i>0</i></b>
            </div>
        )
    }

});
const Tutorial = React.createClass({
    render: () => {
        return (
            <div className="tutorial row">
                <div className="col-md-6">
                    <tr>
                        <td>Space: </td>
                        <td>Bird fly up</td>
                    </tr>
                    <tr>
                        <td>Numpad Enter: </td>
                        <td>Turn on/off the music</td>
                    </tr>
                </div>
                <div className="col-md-6">
                    <tr>
                        <td>Arrow Up: </td>
                        <td>Bird fly up faster</td>
                    </tr>
                    <tr>
                        <td>Arrow Down: </td>
                        <td>Bird fly down</td>
                    </tr>
                </div>
            </div>
        )
    }

});
const ButtonMusic = React.createClass({
    render: () => {
        return (
            <button type="button" className="btn btn-primary btn-music">Turn off music</button>
        )
    }

});
//Render thông tin vào html
ReactDOM.render(
    <div>
        <App />
    </div>
    , document.querySelector("#root"));