import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                user_name: '',
                email: '',
                password: '',
                country:'',
                bio: '',
                is_male: '',
                age_between: ''

            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.user_name && user.email && user.password && user.country && user.bio && user.is_male && user.age_between ) {
            
            if (event.target.name === 'is_male' ){
               
                const value = event.target.name === 'is_male' ? event.target.checked : event.target.value;

            }else{
              
                this.props.register(user);

            }

        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.user_name ? ' has-error' : '')}>
                        <label htmlFor="user_name">Username</label>
                        <input type="text" className="form-control" name="user_name" value={user.user_name} onChange={this.handleChange} />
                        {submitted && !user.user_name &&
                            <div className="help-block">User Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>


                    <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>
                        <label htmlFor="country">Country</label>
                        <input type="text" className="form-control" name="country" value={user.country} onChange={this.handleChange} />
                        {submitted && !user.country &&
                            <div className="help-block">Country is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.bio ? ' has-error' : '')}>
                        <label htmlFor="bio">Bio</label>
                        <input type="text" className="form-control" name="bio" value={user.bio} onChange={this.handleChange} />
                        {submitted && !user.bio &&
                            <div className="help-block">Bio is required</div>
                        }
                    </div>


                    <div className={'form-group' + (submitted && !user.is_male ? ' has-error' : '')} onChange={this.handleChange} >
                        <label htmlFor="is_male">Gender</label>
                        <input type="radio" value="true" name="is_male"/> Male
                        <input type="radio" value="false" name="is_male"/> Female
                        {submitted && !user.is_male &&
                            <div className="help-block">Gender is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.bio ? ' has-error' : '')}>
                        <label htmlFor="age_between">Age</label>

                        <select name="age_between" value={user.age_between} onChange={this.handleChange} className="form-control" >
                        <option value="13 – 17">13 - 17 yearls old</option>
                        <option value="18 – 29">18 – 29 years old</option>
                        <option value="30 – 49">30 – 49 years old</option>
                        <option value="50 - ">+ 50 years old</option>

                        </select>



                        {submitted && !user.bio &&
                            <div className="help-block">Bio is required</div>
                        }
                    </div>



                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
