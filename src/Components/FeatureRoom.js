import React, { Component } from 'react';
import {RoomContext} from '../context';
import Title from './Title';
import Room from './Room';
import Loading from './Loading';

export default class FeatureRoom extends Component {

    static contextType = RoomContext //giá trị sẽ là this.context
    
    render() {

        let {featuredRooms : rooms , loading} = this.context;
        rooms = rooms.map(room => {
            return <Room key = {room.id} room = {room} />
        })

        console.log(rooms)


        return (
            <section className = "featured-rooms">
                <Title title = "featured rooms" />
                <div className = "featured-rooms-center">
                    {loading ? <Loading /> : rooms}
                </div>
            </section>
        )
    }
}
