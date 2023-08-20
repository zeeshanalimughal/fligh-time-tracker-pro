import { Schema } from "mongoose";


interface AirportDetails {
    code: string;
    code_icao: string;
    code_iata: string;
    code_lid: string | null;
    timezone: string;
    name: string;
    city: string;
    airport_info_url: string;
}

export interface FlightDetails {
    ident: string;
    ident_icao: string;
    ident_iata: string;
    fa_flight_id: string;
    operator: string;
    operator_icao: string;
    operator_iata: string;
    flight_number: string;
    registration: string;
    atc_ident: string | null;
    inbound_fa_flight_id: string;
    codeshares: string[];
    codeshares_iata: string[];
    blocked: boolean;
    diverted: boolean;
    cancelled: boolean;
    position_only: boolean;
    origin: AirportDetails;
    destination: AirportDetails;
    departure_delay: number;
    arrival_delay: number;
    filed_ete: number;
    foresight_predictions_available: boolean;
    scheduled_out: string;
    estimated_out: string;
    actual_out: string;
    scheduled_off: string;
    estimated_off: string;
    actual_off: string;
    scheduled_on: string;
    estimated_on: string;
    actual_on: string | null;
    scheduled_in: string;
    estimated_in: string;
    actual_in: string | null;
    progress_percent: number;
    status: string;
    aircraft_type: string;
    route_distance: number;
    filed_airspeed: number;
    filed_altitude: number | null;
    route: string | null;
    baggage_claim: string | null;
    seats_cabin_business: number | null;
    seats_cabin_coach: number | null;
    seats_cabin_first: number | null;
    gate_origin: string | null;
    gate_destination: string | null;
    terminal_origin: string | null;
    terminal_destination: string | null;
    type: string;
}






export interface IFlight {
    userId?: Schema.Types.ObjectId;
    ident?: string;
    ident_icao?: string;
    ident_iata?: string;
    fa_flight_id?: string;
    operator?: string;
    operator_icao?: string;
    operator_iata?: string;
    flight_number?: string;
    registration?: string;
    atc_ident?: string;
    inbound_fa_flight_id?: string;
    codeshares?: string[];
    codeshares_iata?: string[];
    blocked?: boolean;
    diverted?: boolean;
    cancelled?: boolean;
    position_only?: boolean;
    origin?: AirportDetails;
    destination?: AirportDetails;
    departure_delay?: number;
    arrival_delay?: number;
    filed_ete?: number;
    foresight_predictions_available?: boolean;
    scheduled_out?: string;
    estimated_out?: string;
    actual_out?: string;
    scheduled_off?: string;
    estimated_off?: string;
    actual_off?: string;
    scheduled_on?: string;
    estimated_on?: string;
    actual_on?: string;
    scheduled_in?: string;
    estimated_in?: string;
    actual_in?: string;
    progress_percent?: number;
    status?: string;
    aircraft_type?: string;
    route_distance?: number;
    filed_airspeed?: number;
    filed_altitude?: number;
    route?: string;
    baggage_claim?: string;
    seats_cabin_business?: number;
    seats_cabin_coach?: number;
    seats_cabin_first?: number;
    gate_origin?: string;
    gate_destination?: string;
    terminal_origin?: string;
    terminal_destination?: string;
    flight?: {
        date?: Date;
        flight_id?: string;
        aircraft_id?: string;
        aircraft_type?: string;
        from?: string;
        to?: string;
        out?: string[];
        in?: string[];
    };
    time?: {
        total_time?: Number;
        pic?: string;
        sic?: string;
        night?: Number;
        xc?: string;
        actual_inst?: string;
    };
    duty?: {
        on_duty?: string[];
        off_duty?: string[];
    };
    crew?: {
        pic_p1_crew?: string;
        sic_p2_crew?: string;
    };
    landings?: {
        day_t_o?: string;
        day_ldg?: string;
        night_t_o?: string;
        night_ldg?: string;
    };
    operations?: {
        apr?: string;
        count?: number;
        rwy?: string;
        icao?: string;
    }[];
    passengers?: string[];
    notes?: string;
}