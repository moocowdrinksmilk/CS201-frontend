import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'
// @ts-ignore
import GoogleMapReact from 'google-map-react';

const Home: NextPage = () => {

    const [sort, setSort] = useState(0)
    const [data, setData] = useState([])

    const typeOfSorts = ['quick-sort', 'merge-sort', 'heap-sort']

    const sortDestinations = async () => {
        const res = await axios.get(`http://localhost:8080/${typeOfSorts[sort]}/merge-sort?originLat=40.0175444&originLong=-105.2833481&maxDist=500`)

    }
    return (
        <div>
            <h1 className="flex flex-row justify-center text-8xl w-full text-center">
                Bar Crawl 1.0
            </h1>
            <h2>
                Efficient crawler
            </h2>

            <div className="w-full flex flex-row justify-center gap-10 text-xl">
                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md">
                    Quick Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md">
                    Merge Sort
                </button>

                <button className="bg-yellow-300 hover:bg-yellow-200 hover:shadow-md px-4 py-2 rounded-md">
                    Heap Sort
                </button>
            </div> 

            <div className="flex flex-col items-center gap-10">

            </div>
        </div>
    )
}

export default Home
