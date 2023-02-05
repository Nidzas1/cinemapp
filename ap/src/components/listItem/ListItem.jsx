import "./listItem.scss"
import {PlayArrow, Add, ThumbUpOutlined, ThumbDownAltOutlined} from "@material-ui/icons";
import { useState } from "react";


export default function ListItem({index}) {

  const [isHovered, setIsHovered] = useState(false);
 
  return (
    
    <div className="listItem" 
    style={{left: isHovered && index*225-50 +index*2.5}}
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)}>
        <img src="https://richardlangworth.com/wp-content/uploads/2017/12/darkest-hour-poster-2.jpg" alt="" />
        <div className="itemInfo">
        
          <div className="icons">
            <PlayArrow className="icon"/>
            <Add className="icon"/>
            <ThumbUpOutlined className="icon"/>
            <ThumbDownAltOutlined className="icon"/>
          </div>

          <div className="itemInfoTop">
            <span>1 hour 14 mins</span>
            <span className="limit">+16</span>
            <span>2022</span>
          </div>
          <div className="desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Aspernatur animi aliquid odit accusamus eaque quaerat incidunt corporis. 
          </div>
          <div className="genre">Action</div>
        </div>
    </div>
  )
}

