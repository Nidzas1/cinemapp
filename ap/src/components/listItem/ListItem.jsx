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
      {index=="0"?
       <img src="https://richardlangworth.com/wp-content/uploads/2017/12/darkest-hour-poster-2.jpg" alt="" />
       : index=="1"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       : index=="2"? <img src="https://scoutlife.org/wp-content/uploads/2011/04/movies-featured.jpg?w=650" alt="" />
       : index=="3"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       : index=="4"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       : index=="5"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       : index=="6"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       : index=="7"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       : index=="8"? <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
       :  <img src="https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1" alt="" />
      
      }
       
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

