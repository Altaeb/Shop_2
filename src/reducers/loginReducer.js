const loginState= {
  	loginKey: "",
}
export default (state = loginState, action)=>{
	if(action.type == 'SET_LOGINKEY'){
		return { loginKey: action.payload.loginKey};
	}
	if(action.type == 'GET_LOGINKEY'){
		return {loginKey: state.loginKey};
	}
	return state;
}