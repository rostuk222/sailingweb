import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CrewStore from '../store/Crew';

interface CrewListProps {
    handler: Function;
    handleClose: Function,
    showReg: boolean;
    isBoatReg: boolean;
    boatId: number;
}

// At runtime, Redux will merge together...
type CrewProps =
    CrewStore.CrewState // ... state we've requested from the Redux store
    & typeof CrewStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps & CrewListProps; // ... plus incoming routing parameters

type CrewLocalState = {
    [index: string]: any,
    id: number;
    name: string;
    email: string;
    role: string;
    age: number;
    certifiedUntil: Date;
    picture?: string;
};


class CrewList extends React.Component<CrewProps, CrewLocalState> {
    constructor(props: CrewProps) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            email: '',
            role: 'Captain',
            age: 0,
            certifiedUntil: new Date(),
            picture: ''
        };

        this.showCrewRegister = this.showCrewRegister.bind(this);
        this.closeRegister = this.closeRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    public componentWillReceiveProps(nextProps: CrewProps) {
        if (this.props.boatId !== nextProps.boatId) {
            this.props.requestCrew(nextProps.boatId);
        }
    }

    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public showCrewRegister() {
        this.props.handler();
        this.setState({ showReg: true });
    }

    public closeRegister() {
        this.props.handleClose();
        this.ensureDataFetched();
    }

    public handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const crewMember = {
            id: this.state.id,
            boatId: this.props.boatId,
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            age: this.state.age,
            certifiedUntil: this.state.certifiedUntil,
            picture: this.state.picture
        } as CrewStore.CrewMember;
        this.props.postCrew(crewMember);
        this.closeRegister();
    }

    public handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    public handleChangeSelect(evt: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            role: evt.target.value
        });
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.showReg && this.props.isBoatReg ? null :
                    <div><h1 id="tabelLabel">Crew</h1>
                        <p>List of crew members</p></div>}
                {this.props.showReg && !this.props.isBoatReg ? this.renderRegForm() : null}
                {this.props.showReg ? null : this.renderCrewControls()}
                {this.props.showReg ? null : this.renderBoatsTable()}
            </React.Fragment>
        );
    }

    public ensureDataFetched() {
        this.props.requestCrew(this.props.boatId);
    }

    private renderBoatsTable() {
        return (
            <div className="table-container">
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Role</th>
                            <th>Certificate expiration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.crew && this.props.crew.length ? this.props.crew.map((crew: CrewStore.CrewMember) =>
                            <tr key={crew.id}>
                                <td>{crew.picture}</td>
                                <td>{crew.name}</td>
                                <td>{crew.email}</td>
                                <td>{crew.age}</td>
                                <td>{crew.role}</td>
                                <td>{crew.certifiedUntil}</td>
                            </tr>
                        ) : <tr><div>Please add a crew member</div></tr>}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderCrewControls() {
        return (
            <div className="d-flex justify-content-between add-button">
                <div className='btn btn-outline-secondary btn-sm' onClick={this.showCrewRegister}>Add crew member</div>
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
                        <span>Email</span>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span>Crew role</span>
                        <select name="role" value={this.state.role} onChange={this.handleChangeSelect}>
                            <option value="Captain">Captain</option>
                            <option value="Deckcadet">Deck cadet</option>
                            <option value="ChiefEngineer">Chief Engineer</option>
                            <option value="Motorman">Motorman</option>
                        </select>
                    </label>
                    <label>
                        <span> Age</span>
                        <input type="number" name="age" value={this.state.age} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span> Certificate expiration date</span>
                        <input type="text" name="certifiedUntil" value={this.state.certifiedUntil.toLocaleDateString()} onChange={this.handleChange} />
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
    (state: ApplicationState) => state.crew, // Selects which state properties are merged into the component's props
    CrewStore.actionCreators // Selects which action creators are merged into the component's props
)(CrewList as any);
