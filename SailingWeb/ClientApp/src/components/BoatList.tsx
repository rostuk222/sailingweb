import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as BoatsStore from '../store/Boats';
import CrewList from './CrewList';

// At runtime, Redux will merge together...
type BoatsProps =
    BoatsStore.BoatsState // ... state we've requested from the Redux store
    & typeof BoatsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps; // ... plus incoming routing parameters

type BoatsLocalState = {
    [index: string]: any,
    showReg: boolean,
    isBoatReg: boolean,
    rowClicked: number,
    prevRow: number,
    id: number,
    name: string,
    producer: string,
    buildNumber: string,
    loa: number,
    b: number,
    picture: string
};


class BoatList extends React.PureComponent<BoatsProps, BoatsLocalState> {
    constructor(props: BoatsProps) {
        super(props);
        this.state = {
            showReg: false,
            isBoatReg: true,
            rowClicked: 0,
            prevRow: 0,
            id: 0,
            name: '',
            producer: '',
            buildNumber: '',
            loa: 0.0,
            b: 0.0,
            picture: ''
        };

        this.showBoatRegister = this.showBoatRegister.bind(this);
        this.showCrewRegister = this.showCrewRegister.bind(this);
        this.closeRegister = this.closeRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.expandRow = this.expandRow.bind(this);
    }

  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
    }

    public expandRow(id: number) {
        this.setState({ rowClicked: id });
    }

    public showBoatRegister() {
        this.setState({ showReg: true, isBoatReg: true });
    }

    public showCrewRegister() {
        this.setState({ showReg: true, isBoatReg: false });
    }

    public closeRegister() {
        this.setState({ showReg: false, isBoatReg: true });
        this.ensureDataFetched();
    }

    public handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const boat = {
            id: this.state.id,
            name: this.state.name,
            producer: this.state.producer,
            buildNumber: this.state.buildNumber,
            loa: this.state.loa,
            b: this.state.b,
            picture: this.state.picture
        } as BoatsStore.Boat;
        this.props.postBoat(boat);
        this.closeRegister();
    }

    public handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            [evt.target.name]: evt.target.value
    });
}

    public render() {
        const crewProps = {
            handler: this.showCrewRegister,
            showReg: this.state.showReg,
            boatId: this.state.rowClicked,
            isBoatReg: this.state.isBoatReg,
            handleClose: this.closeRegister
        }
    return (
        <React.Fragment>
            {this.state.showReg && !this.state.isBoatReg ? null :
                <div><h1 id="tabelLabel">Boats</h1>
                    <p>List of boats with crew members</p></div>}
            {this.state.showReg ? null : this.renderBoatControls()}
            {this.state.showReg ? null : this.renderBoatsTable()}
            {this.state.showReg && this.state.isBoatReg ? this.renderRegForm() : null}
            {this.state.rowClicked > 0 ? <CrewList {...crewProps}></CrewList> : null}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
      this.props.requestBoats();
  }

    private renderBoatsTable() {
        return (
            <div className="table-container">
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
                <tr>
                    <th></th>
            <th>Image</th>
            <th>Name</th>
                    <th>Producer</th>
                    <th>Length</th>
                    <th>Height</th>
                    <th>Boat build-number</th>
          </tr>
            </thead>
                <tbody>
                {this.props.boats && this.props.boats.length ? this.props.boats.map((boat: BoatsStore.Boat) =>
                    <tr key={boat.id}>
                        <td onClick={() => this.expandRow(boat.id)}>&#8690;</td>
                        <td>{boat.picture}</td>
                            <td>{boat.name}</td>
                            <td>{boat.producer}</td>
                            <td>{boat.loa}</td>
                            <td>{boat.b}</td>
                            <td>{boat.buildNumber}</td>
                        </tr>
                    ) : <tr><div>Please add a boat</div></tr>}
                </tbody>
                </table>
                </div>
    );
  }

    private renderBoatControls() {
    return (
        <div className="d-flex justify-content-between add-button">
            <div className='btn btn-outline-secondary btn-sm' onClick={this.showBoatRegister}>Add boat</div>
        {this.props.isLoading && <span>Loading...</span>}
      </div>
    );
    }

    private renderRegForm() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <span>Name</span>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                        <span>Producer</span>
                <input type="text" name="producer" value={this.state.producer} onChange={this.handleChange} />
                </label>
                <label>
                        <span>Boat build-number</span>
                <input type="text" name="buildNumber" value={this.state.buildNumber} onChange={this.handleChange} />
                </label>
                <label>
                        <span> Boat length</span>
                <input type="number" name="loa" value={this.state.loa} onChange={this.handleChange} />
                </label>
                <label>
                        <span> Boat width</span>
                <input type="number" name="b" value={this.state.b} onChange={this.handleChange} />
                </label>
                <label>
                        <span>Picture url</span>
                <input type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />
                </label>
                    <input type="submit" value="Register" /><div className='btn btn-outline-secondary btn-sm close-button' onClick={this.closeRegister}>Close</div>
            </form>
                </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.boats, // Selects which state properties are merged into the component's props
    BoatsStore.actionCreators // Selects which action creators are merged into the component's props
)(BoatList as any);
