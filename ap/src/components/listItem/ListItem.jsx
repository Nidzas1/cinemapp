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
       <img src=" https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4LOBdltP7rNDmLqOn9_Ak2lTNbmWP8K8-4RHSb5m6j2UyBw-p" alt="" />
       : index=="1"? <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSu_HQf7Sgkij6NptUWlEKf6V9n5bC5cL1JfGFNylGC8VnfN_-N" alt="" />
       : index=="2"? <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSHXnPFszcpNapxaCWUSBl3LZezeb-9X_HUKcefCmNZfbPZzmZ5" alt="" />
       : index=="3"? <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR2mpTrHRvKv-EP4lJLyi2USjKRTtOoy5Hen_j3XhMV5jrjQzxY" alt="" />
       : index=="4"? <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_GqhfWoRljq6gxIUpX26YoSGe3PVKZaUF2MEIV7vSVq0sSbA5" alt="" />
       : index=="5"? <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQvgDcYi5ux-HI__DXXFScylyswVeu0DfMC7owmTYfei9kOtZP2" alt="" />
       : index=="6"? <img src="https://dx35vtwkllhj9.cloudfront.net/universalstudios/nope/images/gallery/image1.jpg" alt="" />
       : index=="7"? <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsCOutAlEgJqoCBlWwQv2_JouNTHegA5KnsfRPGeB6_tZlelyk" alt="" />
       : index=="8"? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJApnr9b8RCQjrOr0YpzqMTY1xXWNrfWHgq0VvNxVNUaG9XyrV" alt="" />
       :  <img src="https://richardlangworth.com/wp-content/uploads/2017/12/darkest-hour-poster-2.jpg" alt="" />
      
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

