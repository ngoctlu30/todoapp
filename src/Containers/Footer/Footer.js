import React from 'react';

const footer = (props) => {
  return (
    <a style={{
      display: 'flex', justifyContent: "center",
      alignItems:"center",
      height: "100px",
      textDecoration: "none",
      backgroundColor: "rgb(160, 195, 228)",
      marginTop: "30px"
    }} target="_blank"  href="https://github.com/ngoctlu30">
      <strong>Veiw source on Github   &copy; ngoctlu30</strong>
    </a>
  )
}
export default footer;