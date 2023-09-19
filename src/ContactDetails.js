import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function ContactDetails(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [prop, setProp] = React.useState(false);
  
  
  useEffect( () => {
    
    if(location.state && location.state.userContact){
        setProp(true);
      }else{
        setProp(false);
        navigate(`/`);
        
       
      }
  }, [location.state, navigate]);



  

  if(prop){
    return (
        <div>
          <h2>Contact Details</h2>
          <p>Name: {location.state.userContact.name}</p>
          <p>Email: {location.state.userContact.email}</p>
          <button onClick={()=> navigate(`/`,{
            state: {
                cs: location.state.cs,
                fcs: location.state.fcs
            }
          })}>Back</button>
          {/* Display more contact details */}
        </div>
      );
  }else{
    
  }
  


}

export default ContactDetails;
