import React from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Carousel from '@brainhubeu/react-carousel';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './fielddetailcarousel.scss'
import '@brainhubeu/react-carousel/lib/style.css';
/**
 *         <Card>
            <div className={"field-item"}>
                <CardContent className="card-content" style={{display: "inline-block"}}>
                    <CardMedia
                        className={"field-cover"}
                        image={coverImage? coverImage : "https://via.placeholder.com/100/100"}
                        title="Whatever image name"
                /> 
                </CardContent>
            </div>
            
        </Card>
 */ 
export default class FieldDetailCarousel extends React.Component {
    
    renderItem = ({coverImage, area}) => {
        return (
            <div key={id}>
                <img
                    style={{width: "50px", height: "50px"}}
                    src={coverImage? coverImage : "https://via.placeholder.com/50/50"}
                    alt={area}                    
                />
            </div>
        ) 
    }

    render() {
      const { items, onClick, onAdd } = this.props
      return (
        <ul className={"detail-list"}>
          { items && Array.isArray(items) && items.map((item, id) => (
            <a 
                onClick={e => onClick&&onClick(item)}
                key={id}
            >
            <li 
            >
                <img
                    style={{width: "50px", height: "50px"}}
                    src={item.coverImage? item.coverImage : "https://via.placeholder.com/50/50"}
                    alt={item.area}                    
                />
            </li>
        </a>
          ))}
            <a onClick={onAdd}>
            <AddCircleIcon 
                fontSize={"large"}
            />
            </a>
        </ul>
      )
    }
}
