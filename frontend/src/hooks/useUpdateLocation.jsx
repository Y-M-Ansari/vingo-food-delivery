import axios from "axios"
import React, { useEffect } from "react"
import { serverUrl } from "../App"
import { useSelector } from "react-redux"

function useUpdateLocation() {

    const { userData } = useSelector(state => state.user)

    useEffect(() => {

        if (!userData) {
            return
        }

        const updateLocation = async (lat, lon) => {

            try {

                const result = await axios.post(
                    `${serverUrl}/api/user/update-location`,
                    {
                        lat,
                        lon
                    },
                    {
                        withCredentials: true
                    }
                )

                console.log("Location updated:", result.data)

            } catch (error) {

                console.error(
                    "Update location error:",
                    error?.response?.data || error.message
                )

            }
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {

                updateLocation(
                    pos.coords.latitude,
                    pos.coords.longitude
                )

            },
            (error) => {

                console.error(
                    "Geolocation error:",
                    error.message
                )

            }
        )

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }

    }, [userData?._id])

}

export default useUpdateLocation