import react from 'react';
import TermButton from './TermButton';
import { terms } from '../utilities/courseUtils';
//import { useUserState } from '../utilities/firebase';
import { useUserState, signInWithGoogle, SignOut } from '../utilities/firebase';


const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => SignOut()
      }>
    Sign Out
  </button>
);

const TermSelector = ({term, setTerm}) =>{
  const [user] = useUserState();
  return(

  <div className="btn-toolbar justify-content-between">
    <div className='btn-grup'>
    { 
      Object.values(terms).map(value => (
        <TermButton key={value} 
        term={value} 
        checked={value === term} 
        setTerm={setTerm}
        />
      ))
    }
    </div>
    {/* Llamado al componente "SingIn" */}
    {user ? <SignOutButton/> : <SignInButton/>}
    {/*<SignInButton/>*/}
  </div>
);
};

export default TermSelector;