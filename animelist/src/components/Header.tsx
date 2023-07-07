import { useEffect, useState } from "react";
import { Badge, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
function Header() {
    return (
    <div className="App-header">
        <ToggleButtonGroup type="radio" name="options">
        <Link to="/">
            <ToggleButton variant="outline-light" id="tbg-radio-1" value={1}>
                <b>Anime List</b>
            </ToggleButton></Link>
        <Link to="/collection">
            <ToggleButton variant="outline-light" id="tbg-radio-2" value={2}>
                <b>Collections </b>
            </ToggleButton></Link>
      </ToggleButtonGroup>
    </div>
    );
  }
  
  export default Header;