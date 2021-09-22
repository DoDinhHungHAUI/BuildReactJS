import React, { Component } from 'react';
import items from './data'

const RoomContext = React.createContext();//khởi tạo một context object

//<RoomContext.Provider value = {}

export default class RoomProvider extends Component {

    state = {
        rooms : [],//Danh Sách phòng bao gồm fields , images , id
        sortedRooms : [],//Sắp xếp phòng
        featuredRooms : [],
        loading : true,
        type : 'all',
        capacity : 1,
        price : 0,
        minPrice : 0,
        maxPrice : 0,
        minSize : 0,
        maxSize : 0,
        breakfast : false,
        pets : false
    }

    //lấy dữ liệu (getData)

    componentDidMount(){
        let rooms = this.formatData(items);{/* cái rooms này chứa tất cả những dữ liệu cần thiết để render lên dao diện */}

        let featuredRooms = rooms.filter(room => room.featured === true);

        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms , 
            featuredRooms,
            sortedRooms : rooms,
            loading : false,
            price : maxPrice,
            maxPrice,
            maxSize
        })
    }


    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => 
                image.fields.file.url
            );

            let room = {...item.fields , images , id}

            return room;//trả về một cái object

        })

        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }



    handleChange = event => {

        const target = event.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name
        this.setState({
            [name] : value
        } , this.filterRooms)
    }

    filterRooms = () =>{
        let{
            rooms , type , capacity , price , minSize , maxSize , breakfast , pets
        }= this.state;

        //get rooms
        let tempRooms = [...rooms];

        //transform value

        capacity = parseInt(capacity);
        price = parseInt(price);

        //filter by type
        if(type !== 'all')
        {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //filter by capacity

        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by price

        tempRooms = tempRooms.filter(room => room.price <= price);
       
        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        //filter by breakfast

        if(breakfast)
        {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        //change state
        this.setState({
            sortedRooms : tempRooms
        })
    }

    render() {
    
        return (
            <RoomContext.Provider value = {{...this.state , getRoom : this.getRoom , handleChange : this.handleChange}}>
                {this.props.children} {/*  Lấy Giá Trị Context  */}
            </RoomContext.Provider>
        )
    }
}


const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context = {value } />}
        </RoomConsumer>
    }
}

export{RoomProvider , RoomConsumer , RoomContext}