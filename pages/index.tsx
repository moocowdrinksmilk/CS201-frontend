import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Spin, Timeline } from 'antd';

const AnyReactComponent = ({ text }: any) => <FaMapMarkerAlt size={30} color="red" />;

const Home: NextPage = () => {

    const [sort, setSort] = useState(1)
    const [data, setData] = useState([])
    const [routeData, setRouteData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [lat, setLat] = useState(40.0175444)
    const [lng, setLng] = useState(-105.2833481)
    const [timeTaken, setTimeTaken] = useState(0.0)

    const typeOfSorts = ['quick-sort', 'merge-sort', 'heap-sort']

    const defaultProps = {
        center: {
            lat: 40.0175444,
            lng: -105.2833481
        },
        zoom: 11
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeTaken(() => timeTaken + 0.1);
        }, 100);

        return () => clearTimeout(timer)
    }, [])

    // const takeTime = () => {
    //     setTimeout(() => {
    //         if (is)
    //     })
    // }

    const getRoute = async (plat, plng ) => {
        const { data } = await axios.get(`http://localhost:8080/filter-sort/budget/route?originLat=${plat}&originLong=${plng}&maxDist=500&budget=100`)
        setRouteData(data)
    }

    const sortDestinations = async () => {
        setIsLoading(true)
        getRoute(lat, lng)
        const { data } = await axios.get(`http://localhost:8080/filter-sort/${typeOfSorts[sort]}?originLat=${lat}&originLong=${lng}&maxDist=500`)
        setData(data.destinations)
        setIsLoading(false)
    }

    const recoordinate = async (obj: any) => {
        console.log(obj);
        setIsLoading(true)
        setLat(obj.lat)
        setLng(obj.lng)
        const { data } = await axios.get(`http://localhost:8080/filter-sort/${typeOfSorts[sort]}?originLat=${obj.lat}&originLong=${obj.lng}&maxDist=500`)
        getRoute(obj.lat, obj.lng)
        setData(data.destinations)
        setIsLoading(false)
    }

    return (
        <div>
            <h1 className="flex flex-row justify-center text-8xl w-full text-center">
                Bar Crawl 1.0
            </h1>

            <div className="w-full flex flex-row justify-center gap-10 text-xl">
                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md">
                    Quick Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md" onClick={() => { setSort(1); sortDestinations() }}>
                    Merge Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md">
                    Heap Sort
                </button>
            </div>

            <div className="flex flex-col items-center gap-10 py-10">
                {
                    isLoading &&
                    <div className="flex flex-row gap-2 items-center">
                        <Spin />
                        <div>
                            {timeTaken}
                        </div>
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
                            data && data.map((item, index) => {
                                return (
                                    <AnyReactComponent
                                        key={index}
                                        lat={item.latitude}
                                        lng={item.longitude} />
                                )
                            })
                        }
                    </GoogleMapReact>
                </div>

                <Timeline
                mode="alternate">
                        {
                            routeData && routeData.map((item, index) => {
                                return (
                                    <Timeline.Item>
                                        <div className="flex flex-col items-start gap-1 w-64">
                                            <span>
                                                {item.name}
                                            </span>
                                            <span className="text-gray-500">
                                                {item.address}
                                            </span>
                                        </div>
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
