import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import {FaMapMarkerAlt} from 'react-icons/fa'

const AnyReactComponent = ({ text }: any) => <FaMapMarkerAlt size={30} color="red" />;

const Home: NextPage = () => {

    const [sort, setSort] = useState(1)
    const [data, setData] = useState([])
    const  [isLoading, setIsLoading] = useState(false)
    const [lat, setLat] = useState(40.0175444)
    const [lng, setLng] = useState(-105.2833481)

    const typeOfSorts = ['quick-sort', 'merge-sort', 'heap-sort']

    const defaultProps = {
        center: {
          lat: 40.0175444,
          lng: -105.2833481
        },
        zoom: 11
      };
    

    const sortDestinations = async () => {
        const {data} = await axios.get(`http://localhost:8080/filter-sort/${typeOfSorts[sort]}?originLat=${lat}&originLong=${lng}&maxDist=500`)
        setData(data.destinations)
    }

    const recoordinate = async (obj: any) => {
        console.log(obj);
        setLat(obj.lat)
        setLng(obj.lng)
        const {data} = await axios.get(`http://localhost:8080/filter-sort/${typeOfSorts[sort]}?originLat=${lat}&originLong=${lng}&maxDist=500`)        
        setData(data.destinations)
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

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md" onClick={() => {setSort(1); sortDestinations()}}>
                    Merge Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md">
                    Heap Sort
                </button>
            </div>

            <div className="flex flex-col items-center gap-10 py-10">
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
            </div>
        </div>
    )
}

export default Home
