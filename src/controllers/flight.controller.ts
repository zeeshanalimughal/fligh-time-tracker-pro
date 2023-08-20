import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpError';
import { callFlightAwareApi } from '../utils';
import { FlightDetails, IFlight } from '../interfaces';
import FlightDetailsModel from '../models/flight';

// GET FLIGHT OF USER AND SAVE DATA INTO DB
const getFlightOfUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filghtId: String = req.params.flightId;
        if (!filghtId) throw new HttpError({
            title: 'bad_request',
            detail: 'Flight Id is required',
            code: 400,
        });

        // Get the flight details from flightAware api with flight id.
        let data = await callFlightAwareApi(`/flights/${filghtId}`)
        const flight: [FlightDetails] = data?.flights
        if (!flight?.length) throw new HttpError({
            title: 'bad_request',
            detail: 'No Flight Found With Id ' + filghtId,
            code: 400,
        });


        // Convert ISO date strings to Date objects
        const departureTime: Date = new Date(flight[0].scheduled_out);
        const arrivalTime: Date = new Date(flight[0].scheduled_in);

        // Apply departure delay
        departureTime.setSeconds(departureTime.getSeconds() + flight[0].departure_delay);

        // Apply arrival delay
        arrivalTime.setSeconds(arrivalTime.getSeconds() + flight[0].arrival_delay);

        // Get local times for departure and arrival in their respective timezones
        const departureLocalTime: Date = new Date(departureTime.toLocaleString("en-US", { timeZone: flight[0].origin.timezone }));
        const arrivalLocalTime: Date = new Date(arrivalTime.toLocaleString("en-US", { timeZone: flight[0].destination.timezone }));

        // Calculate night time (in milliseconds)
        const isNightFlight: boolean = arrivalLocalTime.getHours() >= 18 || arrivalLocalTime.getHours() <= 6;
        const nightTime: number = isNightFlight ? (arrivalLocalTime.getTime() - departureLocalTime.getTime()) : 0;

        // Convert night time to seconds
        const nightTimeInSeconds: number = nightTime / 1000;

        // Calculate total flight time (in milliseconds)
        const totalFlightTime: number = arrivalTime.getTime() - departureTime.getTime();

        // Convert total flight time to seconds
        const totalFlightTimeInSeconds: number = totalFlightTime / 1000;

        const flightToSave: IFlight = {
            ...flight[0],
            time: {
                total_time: totalFlightTimeInSeconds,
                night: nightTimeInSeconds,
            }
        }

        const payload = req['tokenPayload'];
        const userId = payload['id'];
        const userFlight = await FlightDetailsModel.findOneAndUpdate({
            userId,
            fa_flight_id: filghtId
        }, {
            $set: flightToSave,
        }, { upsert: true, new: true })
        return res.send(userFlight)

    } catch (error) {
        next(error);
    }
};

// CREATE NEW FLIGHT WITH USER FLIGHT DETAILS
const createNewFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userFlight: IFlight = req.body
        const filghtId: String = userFlight.fa_flight_id;
        if (!filghtId) throw new HttpError({
            title: 'bad_request',
            detail: 'Flight Id is required',
            code: 400,
        });

        const payload = req['tokenPayload'];
        const userId = payload['id'];
        const flightUser = await FlightDetailsModel.findOneAndUpdate({
            userId,
            fa_flight_id: filghtId
        }, {
            $set: userFlight,
        }, { upsert: true, new: true })
        return res.send(flightUser)


    } catch (error) {
        next(error);
    }
};

//EXPORT
export default {
    createNewFlight,
    getFlightOfUser
};
