import { Popover, Rate } from 'antd'

interface props {
    stars: number
    num: number
    distance: number
    name: string
    address: string
    city: string
    state: string
    lat: number
    lng: number
}

const TimeItem = (props: props) => {
    const content = (
        <div className="flex flex-col gap-1">
            <div>
                {props.num} reviews
            </div>
            <Rate allowHalf defaultValue={props.stars} disabled />
            <div>
                Distance: {props.distance}m
            </div>
            <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${props.lat}%2C${props.lng}`} rel="noopener noreferrer"className="bg-blue-500 hover:bg-blue-700 text-center text-white hover:text-white px-4 py-2 rounded-md">
                Directions
            </a>
        </div>
    )
    return (
        <Popover content={content} title={"Details"}>
            <div className="flex flex-col items-start gap-1 whitespace-nowrap cursor-pointer text-left">
                <span>
                    {props.name}
                </span>
                <span className="text-gray-500">
                    {props.address}
                </span>
                <span className="text-gray-500">
                    {props.city}
                </span>
                <span className="text-gray-500">
                    {props.state}
                </span>
            </div>
        </Popover>
    )
}

export default TimeItem