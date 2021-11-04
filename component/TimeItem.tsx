import { Popover, Rate } from 'antd'

interface props {
    stars: number
    num: number
    distance: number
    name: string
    address: string
}

const TimeItem = (props: props) => {
    const content = (
        <div>
            <div>
                {props.num} reviews
            </div>
            <Rate allowHalf defaultValue={props.stars} disabled />
            <div>
                Distance: {props.distance}miles
            </div>
        </div>
    )
    return (
        <Popover content={content} title={"Details"}>
            <div className="flex flex-col items-start gap-1 w-64 cursor-pointer">
                <span>
                    {props.name}
                </span>
                <span className="text-gray-500">
                    {props.address}
                </span>
            </div>
        </Popover>
    )
}

export default TimeItem