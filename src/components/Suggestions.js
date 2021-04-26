
  
import React from 'react'

const Suggestions = (props) => {
  const options = props.results != undefined && props.results.length > 0 ? props.results.map((r,index) => (
    <div key={r.imdbID+index} style={styles.Row}>
        <img src={r.Poster} alt="No image" width="50" height="50" style={styles.Img} />
        <div style={styles.Title}>
        <text>{r.Title} ({r.Year})</text>
        </div>
    </div>
  )) : props.text == undefined || props.text.length == 0 ? '' : 'No results found';

  return <div>{options}</div>
}

const styles = {
Row: {
    flexDirection: 'row',
    width: '100%',
},

Img: {
    display: 'inline-block',
    flex: 1,
},

Title: {
    display: 'inline-block', 
    verticalAlign:'top',
    marginTop:'20px',
    marginLeft:'10px', 
    flex:1,
}
}
export default Suggestions