import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Spin, Timeline, Popover, Select } from 'antd';
import TimeItem from '../component/TimeItem';
import { route } from 'next/dist/server/router';

const { Option } = Select;


const AnyReactComponent = ({ name }: any) => {
    const content = (
        <div>
            {name}
        </div>
    )
    return (
        <Popover content={content}>
            <FaMapMarkerAlt size={20} color="red" />
    </Popover>
    )
    
}

const Home: NextPage = () => {

    const [sort, setSort] = useState(1)
    const [data, setData] = useState([])
    const [routeData, setRouteData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [lat, setLat] = useState(40.0175444)
    const [lng, setLng] = useState(-105.2833481)
    const [timeTaken, setTimeTaken] = useState(0.0)
    const [dist, setDist] = useState(500)
    const [budget, setBudget] = useState(100)

    const typeOfSorts = ['quick-sort', 'merge-sort', 'heap-sort']

    const defaultProps = {
        center: {
            lat: 40.0175444,
            lng: -105.2833481
        },
        zoom: 15
    };

    useEffect(() => {
        recoordinate({
            lat: lat,
            lng: lng
        })
    }, [dist, budget])

    // const takeTime = () => {
    //     setTimeout(() => {
    //         if (is)
    //     })
    // }

    const getRoute = async (plat, plng) => {
        setIsLoading(true)

        const { data } = await axios.get(`http://localhost:8080/filter-sort/budget/route?originLat=${plat}&originLong=${plng}&maxDist=${dist}&budget=${budget}`)
        setRouteData(data)
        setIsLoading(false)

    }

    // const sortDestinations = async () => {
    //     setIsLoading(true)
    //     getRoute(lat, lng)
    //     const { data } = await axios.get(`http://localhost:8080/filter-sort/${typeOfSorts[sort]}?originLat=${lat}&originLong=${lng}&maxDist=500`)
    //     setData(data.destinations)
    //     setIsLoading(false)
    // }

    const recoordinate = async (obj: any) => {
        setLat(obj.lat)
        setLng(obj.lng)
        // const { data } = await axios.get(`http://localhost:8080/filter-sort/${typeOfSorts[sort]}?originLat=${obj.lat}&originLong=${obj.lng}&maxDist=500`)
        getRoute(obj.lat, obj.lng)
        // setData(data.destinations)
    }

    const handleBudget = (value) => {
        setBudget(value)
    }

    const handleDistance = (value) => {
        setDist(value)
    }

    return (
        <div>
            <div className="flex flex-col items-center w-full">
                <h1 className="flex flex-row justify-center text-8xl w-full text-center">
                    Bar Crawl 1.0
                </h1>
                <h2 className="text-gray-500 text-xl">
                    Your one stop solution to get drunk while being broke
                </h2>

                <div className="flex flex-row w-full justify-center gap-10 mt-10">
                    <div className="flex flex-row gap-1 items-left">
                        <span className="text-gray-500 text-lg">
                            Budget
                        </span>
                        <Select defaultValue={100} onChange={handleBudget}>
                            <Option value={50}>
                                50
                            </Option>
                            <Option value={100}>
                                100
                            </Option>
                            <Option value={150}>
                                150
                            </Option>
                            <Option value={200}>
                                200
                            </Option>
                        </Select>
                    </div>

                    <div className="flex flex-row gap-1 items-left">
                        <span className="text-gray-500 text-lg">
                            Max Distance
                        </span>
                        <Select defaultValue={500} onChange={handleDistance}>
                        <Option value={400}>
                                400
                            </Option>
                            <Option value={500}>
                                500
                            </Option>
                            <Option value={600}>
                                600
                            </Option>
                            <Option value={700}>
                                700
                            </Option>
                        </Select>
                    </div>
                </div>
            </div>

            {/* <div className="w-full flex flex-row justify-center gap-10 text-xl">
                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md" onClick={() => { setSort(0); sortDestinations() }}>
                    Quick Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md" onClick={() => { setSort(1); sortDestinations() }}>
                    Merge Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md" onClick={() => { setSort(2); sortDestinations() }}>
                    Heap Sort
                </button>
            </div> */}

            <div className="flex flex-col items-center gap-10 py-10">
                {
                    isLoading &&
                    <div className="flex flex-row gap-2 items-center">
                        <Spin />
                    </div>
                }
                <div className="w-96 h-96">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        onClick={recoordinate}
                    >
                        {
                            routeData && routeData.map((item, index) => {
                                return (
                                    <AnyReactComponent
                                        name={item.name}
                                        key={index}
                                        lat={item.latitude}
                                        lng={item.longitude} />
                                )
                            })
                        }
                    </GoogleMapReact>
                </div>

                <Timeline
                    mode="left">
                    {
                        routeData && routeData.map((item: any, index) => {
                            return (
                                <Timeline.Item>
                                    <TimeItem
                                        name={item.name}
                                        distance={item.distance}
                                        address={item.address}
                                        num={item.review_count}
                                        stars={item.stars}
                                        city={item.city}
                                        state={item.state}
                                        lat={item.latitude}
                                        lng={item.longitude} />
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
            </div>
        </div>
    )
}

export default Home
