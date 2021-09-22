import React from 'react';
import Room from './Room';


export default function RoomsList({rooms}) {
    
    return (
        <section className = "roomslist">
            <div className = "roomslist-center">
                {
                    rooms.map((item , index) => {
                        return <Room key = {item.id} room = {item} />
                    })
                }
            </div>
        </section>
    )
}
