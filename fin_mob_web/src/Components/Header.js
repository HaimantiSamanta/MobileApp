import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';

//******************************* 
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
   //         userName: undefined,

            //************************************ 
            isSignUpModalOpen: false,
			isLoginModalOpen: false,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
            formModalIsOpen: false
          //  username:undefined,
        //password:undefined

        }
    }

    componentDidMount() {
		const { place } = this.props;
		const header = document.querySelector('.navbar');
		if (typeof place !== 'undefined') {
			header.style.position = 'absolute';
			header.style.background = 'none';
			header.style.justifyContent = 'flex-end';
			header.style.paddingRight = '101px';
			document.querySelector('#navbar-icon').style.display = 'none';
		}
		Modal.setAppElement('body');
    }

    // componentDidMount() {
    //     const qs = queryString.parse(this.props.location.search);
    //     const { username, password } = qs;


    //     axios({
    //         method: 'POST',
    //         url: 'http://localhost:4475/login',
    //         headers: { 'Content-Type': 'application/json' },
    //         data: filterObj
    //     })
    //         .then(response => {
    //             this.setState({username: response.data.username, password})
    //         })
    //         .catch()
    // }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }



    //******************** 
    loginHandler = (event) => {
		const { email, password } = this.state;
		const query = {
			email,
			password,
		};
		axios({
			method: 'POST',
			url: `http://localhost:4475/login`,
			headers: { 'Content-Type': 'application/json' },
			data: query,
		})
			.then((result) => {
				if (result.data.status === true) {
					this.setState(
						{
							loginModalIsOpen: false,
							firstName: '',
							lastName: '',
							email: '',
							password: '',
							isLoggedIn: result.data.status,
						},
						() => {
							sessionStorage.setItem(
								'isLoggedIn',
								this.state.isLoggedIn
							);
							sessionStorage.setItem('name', result.data.name);
							console.log('setting session');
						}
					);
				}
			})
			.catch((error) => {
				console.log(error);
				alert('Incorrect email or password');
			});
		event.preventDefault();
	};

	cancelHandler = () => {
		this.setState({
			isSignUpModalOpen: false,
			loginModalIsOpen: false,
		});
	};
    //******************** 

    render() {
        const { loginModalIsOpen, isLoggedIn, userName ,formModalIsOpen,password} = this.state;
        //const {firstName,lastName,email,password,isSignUpModalOpen,isLoginModalOpen} = this.state;
        return (
            <div>
                <div className='header'>
                    <div className="header-logo" onClick={this.handleNavigate}>
                        <p>m!</p>
                    </div>
                    {isLoggedIn ? <div className="header-user">
                        <div className="login">{userName}</div>
                        <div className="signup" onClick={this.handleLogout}>Logout</div>
                    </div> :
                        <div className="header-user">
                            <div className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div className="signup">Create an account</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                    //************** 
                    onRequestClose={this.cancelHandler}
					onAfterClose={this.onModalClosed}
					shouldCloseOnOverlayClick={true}
                    //*************** 
                >
                   
                    <div>
                        <button className='btn btn-primary' 
                         onClick={() => {
                            this.handleModal('loginModalIsOpen', false);
                            this.handleModal('formModalIsOpen', true);
                        }}>Login with Credentails</button>
				
                        
                        <div>
                            <GoogleLogin
                                clientId="218786560807-b1mordc5g3nok3nmllh3b40cj34bn9iu.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('formModalIsOpen', false)}></div>
                        <form>
                            <label class="form-label">UserName</label>
                            <input style={{ width: '370px' }} type="text" placeholder="write your mail address" class="form-control" onChange={(event) => this.handleInputChange('name', event)} />
                            <label class="form-label">password</label>
                            <input type="text" placeholder="password" class="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                            <button class="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} onClick={this.loginHandler}>Proceed</button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);