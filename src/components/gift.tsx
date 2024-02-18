import React from 'react';
import "../App.css"; 
import { GiftRegistryCards } from '../components/cards/giftRegistry';
import Typography from "@mui/material/Typography";

export const GiftRegistry: React.FC = () => {
  return (<>
  <div className="registry" style={{ padding: 30, height: "100%"}}>

  <Typography
              gutterBottom
              id="htx-title"
              component="div"
              align="center"
              
            >
              Our Registry
              <p style={{ fontSize: 20, marginTop: 0}}><em>Please know that your presence at our wedding is the greatest gift of all, <br></br> 
                However, if you wish to honor us with a gift, we ahve registered at the following stores: </em></p>
            </Typography>
  <GiftRegistryCards />
  </div>
  </>);
};