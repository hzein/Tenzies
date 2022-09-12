import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    
    function getdotColor(position){
        switch(position) {
            case 1:
                if(props.value !== 1){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
            case 2:
                return props.isHeld ? "#59E391" : "white"
            case 3:
                if(props.value === 4 || props.value === 5 || props.value === 6){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
            case 4:
                if(props.value === 6){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
            case 5:
                if(props.value === 1 || props.value === 3 || props.value === 5){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
            case 6:
                if(props.value === 6){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
            case 7:
                if(props.value === 4 || props.value === 5 || props.value === 6){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
            case 8:
                return props.isHeld ? "#59E391" : "white"
            case 9:
                if(props.value !== 1 ){
                    return "#2B283A"
                }  else {
                    return props.isHeld ? "#59E391" : "white"
                }
        }
    }
    
    return (
        <div 
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <div className="layer">
                <div 
                    style={{backgroundColor: getdotColor(1)}}
                    className="dot">
                </div>
                <div 
                    style={{backgroundColor: getdotColor(2)}} 
                    className="dot">
                </div>
                <div 
                    style={{backgroundColor: getdotColor(3)}} 
                    className="dot">
                </div>
                </div>
            <div className="layer">
                <div 
                      style={{backgroundColor: getdotColor(4)}} 
                      className="dot">
                </div>
                <div 
                    style={{backgroundColor: getdotColor(5)}} 
                    className="dot">
                </div>
                  <div 
                    style={{backgroundColor: getdotColor(6)}}
                    className="dot">
                </div>
                </div>
            <div className="layer">
                <div 
                      style={{backgroundColor: getdotColor(7)}}
                      className="dot">
                    </div>
                <div 
                    style={{backgroundColor: getdotColor(8)}}
                    className="dot">
                </div>
                  <div 
                    style={{backgroundColor: getdotColor(9)}}
                    className="dot">
                </div>
                </div>
        </div>
       )
}