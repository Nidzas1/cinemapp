import "./featured.scss"
import welcome from "../../images/welcome.png";
const Featured = () => {
  return (
    <div className="featured">
        <img src="https://t4.ftcdn.net/jpg/00/92/82/47/360_F_92824780_60mM0MW8H3bdTfyPHaaavjyXtqDa1Asx.jpg" alt="" />
        <div className="info">
           <img src={welcome} alt="" />
            
        </div>
     </div>
  )
}

export default Featured